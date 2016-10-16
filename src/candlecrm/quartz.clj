(ns candlecrm.quartz
  (:require [clojurewerkz.quartzite.jobs :as jobs]
            [clojurewerkz.quartzite.conversion :as qc]
            [clojurewerkz.quartzite.schedule.simple :refer
             [schedule repeat-forever with-repeat-count
              with-interval-in-milliseconds]]
            [clojurewerkz.quartzite.scheduler :as qs]
            [clojurewerkz.quartzite.triggers :as triggers]
            [clojure.set :as cset]
            [clojure.string :as str]
            [candlecrm.auth :as auth]
            [candlecrm.common :refer :all]
            [candlecrm.contacts :as contacts]
            [candlecrm.datetime :as dt]
            [candlecrm.email :as email]
            [candlecrm.geocode :as geocode]
            [candlecrm.google :as google]
            [candlecrm.imap :as imap]
            [candlecrm.index :as index]
            [candlecrm.insert :as insert]
            [candlecrm.mlrecon :as mlrecon]
            [candlecrm.neo4j :as neo4j]
            [candlecrm.queries :as queries]
            [candlecrm.selenium :as selenium]
            [candlecrm_cljc.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(def nonlp-insert-limit 600000)
(def queue-wait (* 1000 60 10))

(defn queue-new? [queue]
  (< (s/loaded-top queue) (s/top-uid queue)))

(defn range-top [queue]
  (if (queue-new? queue)
    (min (s/top-uid queue)
         (-> queue s/loaded-top (+ imap/batch-size) inc))
    (-> queue s/loaded-bottom)))

(defn range-bottom [user queue]
  (max (if (queue-new? queue) (s/loaded-top queue)
           (imap/archive-load user))
       (-> queue range-top (- imap/batch-size) inc)))

(defn queue-time-reset! [queue]
  (neo4j/update-vals! (:id queue) s/modified
                      (s/modified queue) (dt/now)))

(defn queue-reset! [user queue]
  (queue-time-reset! queue)
  (if (queue-new? queue)
    (neo4j/update-vals! (:id queue) s/loaded-top
                        (s/loaded-top queue) (range-top queue))
    (neo4j/update-vals! (:id queue) s/loaded-bottom
                        (s/loaded-bottom queue)
                        (dec (range-bottom user queue)))))

(defn refresh-queue! [user]
  (when-let [folder (imap/fetch-imap-folder user true)]
    (throw-info! "refreshing queue")
    (-> ["MATCH (root:" (neo4j/prop-label user s/top-uid)
         ")<-[:" (neo4j/esc-token s/top-uid)
         "]-(d:" (neo4j/prop-label user s/email-queue)
         ")-[:" (neo4j/esc-token s/user-queue)
         "]->(u:" (neo4j/esc-token s/user)
         ") WHERE ID(u) = " (.id user)
         " SET root.val = "
         (-> folder imap/last-uid str)]
        str/join neo4j/cypher-query)))

(defn refresh-request! [user _]
  (future (do (Thread/sleep 100)
              (refresh-queue! user)))
  :received)

(defn run-insertion! [queue user]
  (throw-info! "inserting emails")
  (imap/insert-raw-range!
   user (range-bottom user queue) (range-top queue)))

(defn queue-pop! []
  (neo4j/thread-wrap
   (let [{:keys [queue user]} (queries/next-email-queue)]
     (when (and queue (or (not @imap/empty-flag)
                          (empty? @imap/message-queue)))
       (reset! imap/empty-flag false)
       (if (< (queries/nonlp-count user) nonlp-insert-limit)
         (do (queue-reset! user queue) (run-insertion! queue user))
         (queue-time-reset! queue))))))

(defn reset-recon-run! []
  (neo4j/thread-wrap
   (->> (auth/list-users)
        (mapv #(neo4j/set-property! % s/recon-run false)))))

(defn maybe-run-recon! [[user class]]
  (when user
    (throw-info! "running recon")
    (neo4j/set-property! user s/recon-run true)
    (mlrecon/run-recon! user class)
    (neo4j/set-property! user s/recon-run false)
    (when (= class s/email)
      (swap! imap/overload-locked cset/difference #{user}))))

(defn remove-running [jobs]
  (if (empty? jobs) []
      (let [running-ids (queries/users-recon-running)]
        (remove #(some #{(first %)} running-ids) jobs))))

(defn debug-info [x]
  (mapv throw-info! x) x)

(defn run-recon! []
  (neo4j/thread-wrap
   (->> (queries/norecon-count-all) (map second) 
        (filter #(some #{(second %)}
                       (keys @mlrecon/recon-models)))
        (remove #(some #{(second %)}
                       mlrecon/recon-stop))
        remove-running 
        (map #(vector (neo4j/find-by-id
                       (first %)) (second %)))
        first maybe-run-recon!)))

(defn delete-reset-tokens! []
  (->> (queries/users-reset-tokens)
       (filter #(-> % (.get (name s/modified))
                    (- 3600000) (< (to-ms (dt/now)))))
       (run! #(neo4j/delete-property! % s/pwd-reset-token))))

(defn load-contacts! [user]
  (neo4j/thread-wrap
   (Thread/sleep 1000)
   (contacts/load-all-contacts! user)))

(defn clear-queue! []
  (when (->> @imap/message-queue vals (map to-ms)
             (map #(- (to-ms (dt/now)) % queue-wait))
             (filter neg?) empty?
             (and (not (empty? @imap/message-queue))))
    (throw-warn! (str "Resetting message queue: " @imap/message-queue))
    (reset! imap/message-queue {})))

;; Nils here allow for easy switching on/off
(jobs/defjob EmailLoad [ctx]
  (when :nil (queue-pop!)))

(jobs/defjob NewGeocodes [ctx]
  (neo4j/thread-wrap (when :nil (geocode/geocode-batch 10))))

(jobs/defjob ProcessRecon [ctx]
  (when :nil (run-recon!)))

(jobs/defjob ClearQueue [ctx]
  (when :nil (clear-queue!)))

(jobs/defjob EmailNLP [ctx]
  (neo4j/thread-wrap (when :nil (email/push-email-nlp!))))

(jobs/defjob EmailRefresh [ctx]
  (neo4j/thread-wrap
   (->> (auth/list-users)
        (remove #(->> % auth/lookup-token vals (every? nil?)))
        (mapv refresh-queue!))))

(jobs/defjob DeleteResetTokens [ctx]
  (neo4j/thread-wrap (delete-reset-tokens!)))

(defn user-job [ctx]
  (-> ctx qc/from-job-data (get "user")))

(jobs/defjob LoadContacts [ctx]
  (let [user (user-job ctx)]
    (load-contacts! user)))

(jobs/defjob MakeIndexes [ctx]
  (let [user (user-job ctx)]
    (neo4j/thread-wrap
     (index/make-constraints! user)
     (neo4j/set-property! user s/index-run true))))

(defn make-job
  ([job-type job-name]
   (make-job job-type job-name {}))
  ([job-type job-name job-data]
   (jobs/build
    (jobs/of-type job-type)
    (jobs/using-job-data job-data)
    (jobs/with-identity (jobs/key job-name)))))

(defn periodic-trigger [interval limit name]
  (triggers/build
   (triggers/with-identity (triggers/key name))
   (triggers/start-now)
   (triggers/with-schedule
     (if limit
       (schedule (with-repeat-count limit)
                 (with-interval-in-milliseconds interval))
       (schedule (repeat-forever)
                 (with-interval-in-milliseconds interval))))))

(defn once-trigger [delay name]
  (triggers/build
   (triggers/with-identity (triggers/key name))
   (triggers/start-at (dt/future-ms delay))
   (triggers/with-schedule
     (schedule (with-repeat-count 0)
               (with-interval-in-milliseconds 1)))))

(defonce scheduler (atom nil))

(defn schedule-contacts! [user]
  (qs/schedule @scheduler
               (make-job LoadContacts "jobs.contacts.load.1" {s/user user})
               (once-trigger 2000 "jobs.contacts.trigger.1")))

(defn schedule-indexing! [user]
  (qs/schedule @scheduler
               (make-job MakeIndexes "jobs.index.make.1" {s/user user})
               (once-trigger 2000 "jobs.index.trigger.1")))

(defn start! []
  (reset! scheduler (qs/start (qs/initialize)))
  (qs/schedule @scheduler
               (make-job EmailLoad "jobs.email.load.1")
               (periodic-trigger 2000 nil "email.trigger.1"))
  (qs/schedule @scheduler
               (make-job EmailRefresh "jobs.email.load.2")
               (periodic-trigger 3600000 nil "email.trigger.2"))
  (qs/schedule @scheduler
               (make-job NewGeocodes "jobs.geocode.load.1")
               (periodic-trigger 5000 nil "geocode.trigger.1"))
  (qs/schedule @scheduler
               (make-job ProcessRecon "jobs.recon.do.1")
               (periodic-trigger 2000 nil "recon.trigger.1"))
  (qs/schedule @scheduler
               (make-job EmailNLP "jobs.nlp.email.1")
               (periodic-trigger 15000 nil "nlp.trigger.1"))
  (qs/schedule @scheduler
               (make-job ClearQueue "jobs.queue.clear.1")
               (periodic-trigger 60000 nil "queue.trigger.1"))
  (qs/schedule @scheduler
               (make-job DeleteResetTokens "jobs.tokens.delete.1")
               (periodic-trigger 600000 nil "tokens.trigger.1")))

(defn stop! []
  (qs/shutdown @scheduler))

(defn restart! []
  (stop!) (start!))

(defn delete-user! [user]
  (stop!) (Thread/sleep 20000)
  (let [username (auth/get-username user)]
    (->> @imap/message-queue keys (filter #(= username (first %)))
         (swap! imap/message-queue #(apply dissoc %1 %2))))
  (auth/delete-user! user)
  (start!))

(defn delete-req! [user query-map]
  (when (= "yes" (:confirmed query-map))
    (delete-user! user)))

(defn create-user! [req]
  (let [user (auth/create-user! req)]
    (schedule-indexing! user) user))

(defn reset-all-users! []
  (stop!) (Thread/sleep 1000)
  (neo4j/drop-all-constraints!)
  (->> (auth/list-users) (map auth/get-username)
       (mapv imap/reset-user!))
  (reset! imap/message-queue {})
  (reset! imap/overload-locked #{})
  (reset! imap/empty-flag false)
  (Thread/sleep 1000) 
  (->> (auth/list-users) (mapv load-contacts!))
  :success)
