(ns spectra.quartz
  (:require [clojurewerkz.quartzite.jobs :as jobs]
            [clojurewerkz.quartzite.conversion :as qc]
            [clojurewerkz.quartzite.schedule.simple :refer
             [schedule repeat-forever with-repeat-count
              with-interval-in-milliseconds]]
            [clojurewerkz.quartzite.scheduler :as qs]
            [clojurewerkz.quartzite.triggers :as triggers]
            [clojure.set :as cset]
            [clojure.string :as str]
            [spectra.auth :as auth]
            [spectra.common :as com]
            [spectra.contacts :as contacts]
            [spectra.datetime :as dt]
            [spectra.email :as email]
            [spectra.geocode :as geocode]
            [spectra.google :as google]
            [spectra.index :as index]
            [spectra.insert :as insert]
            [spectra.mlrecon :as mlrecon]
            [spectra.neo4j :as neo4j]
            [spectra.queries :as queries]
            [spectra_cljc.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(def nonlp-insert-limit 60)

(defn message-count [user]
  (-> user email/fetch-imap-folder email/message-count))

(defn queue-new? [queue]
  (< (s/loaded-top queue)
     (s/top-uid queue)))

(defn range-top [queue]
  (if (queue-new? queue)
    (min (s/top-uid queue)
         (-> queue s/loaded-top (+ email/batch-size) inc))
    (-> queue s/loaded-bottom)))

(defn range-bottom [queue]
  (max (if (queue-new? queue) (s/loaded-top queue) 270000)
       (-> queue range-top (- email/batch-size) inc)))

(defn queue-small? [queue]
  (< (- (range-top queue)
        (range-bottom queue))
     (dec email/batch-size)))

(defn queue-time-reset! [queue]
  (neo4j/update-vals! (:id queue) s/modified
                      (s/modified queue) (dt/now)))

(defn queue-reset! [queue]
  (queue-time-reset! queue)
  (if (queue-new? queue)
    (neo4j/update-vals! (:id queue) s/loaded-top
                        (s/loaded-top queue) (range-top queue))
    (neo4j/update-vals! (:id queue) s/loaded-bottom
                        (s/loaded-bottom queue) (range-bottom queue))))

(defn scan-check [user email-times]
  (->> email-times
       (mapv #(queries/scan-overlaps user %))))

(defn in-range [bounds]
  (range (first bounds) (inc (second bounds))))

(defonce cnt (atom 0))

(defn count-up [n]
  (swap! cnt dec)
  (+ @cnt n))

(defn first-last [coll]
  [(first coll) (last coll)])

(defn create-edges! [user queue]
  (neo4j/create-edge! (queries/email-queue) queue s/has-queue)
  (neo4j/create-edge! user queue s/has-queue))

(defn refresh-queue! [user]
  (println "refreshing queue")
  (-> ["MATCH (root:" (neo4j/prop-label user s/top-uid)
       ")<-[:" (neo4j/esc-token s/top-uid)
       "]-(d:" (neo4j/prop-label user s/email-queue)
       ")-[:" (neo4j/esc-token s/user-queue)
       "]->(u:" (neo4j/esc-token s/user)
       ") WHERE ID(u) = " (:id user)
       " SET root.val = "
       (-> user email/fetch-imap-folder email/last-uid str)]
      str/join neo4j/cypher-query dorun))

(defn run-insertion! [queue-user]
  (println "inserting emails")
  (email/insert-raw-range! (:user queue-user)
                           (range-bottom (:queue queue-user))
                           (range-top (:queue queue-user))))

(defn queue-pop! []
  (let [queue-user (queries/next-email-queue)]
    (when (:queue queue-user)
      (if (-> queue-user :user (queries/nonlp-count)
              (< nonlp-insert-limit))
        (do (queue-reset! (:queue queue-user))
            (run-insertion! queue-user))
        (queue-time-reset! (:queue queue-user))))))

(defn new-queue-map [top-uid]
  {s/top-uid top-uid
   s/loaded-top top-uid
   s/loaded-bottom top-uid
   s/type-label s/email-queue
   s/modified (dt/now)})

(defn add-new-queue! [user]
  (-> user email/fetch-imap-folder
      email/last-uid
      new-queue-map vector
      (insert/push-entities! user)
      first neo4j/find-by-id
      (neo4j/create-edge! user s/user-queue)))

(defn maybe-run-recon! [params]
  (when params
    (println "running recon")
    (neo4j/set-property! (first params) s/recon-run true)
    (apply mlrecon/run-recon! params)
    (neo4j/set-property! (first params) s/recon-run false)))

(defn remove-running [jobs]
  (let [running-ids (queries/users-recon-running)]
    (remove #(some #{(first %)} running-ids) jobs)))

(defn run-recon! []
  (->> (queries/norecon-count-all) (map second)
       (filter #(some #{(second %)}
                      (keys @mlrecon/recon-models)))
       remove-running
       (map #(vector (neo4j/find-by-id (first %)) (second %)))
       first maybe-run-recon!))

(defn delete-reset-tokens! []
  (->> (queries/users-reset-tokens)
       (filter #(-> % :data s/modified (- 3600000)
                    (< (dt/to-ms (dt/now)))))
       (map #(neo4j/delete-property! % s/pwd-reset-token))
       dorun))

;; Nils here allow for easy switching on/off
(jobs/defjob EmailLoad [ctx]
  (queue-pop!))

(jobs/defjob NewGeocodes [ctx]
  (geocode/geocode-batch 10))

(jobs/defjob CachedGeocodes [ctx]
  (geocode/geocode-cached 20))

(jobs/defjob ProcessRecon [ctx]
  (run-recon!))

(jobs/defjob EmailNLP [ctx]
  (email/push-email-nlp!))

(jobs/defjob EmailRefresh [ctx]
  (doseq [user (auth/list-users)]
    (refresh-queue! user)))

(jobs/defjob DeleteResetTokens [ctx]
  (delete-reset-tokens!))

(defn user-job [ctx]
  (-> ctx qc/from-job-data
      (get "user") (get "id")
      neo4j/find-by-id))

(jobs/defjob LoadContacts [ctx]
  (let [user (user-job ctx)]
    (contacts/load-all-contacts! user)))

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

(defn start! []
  (reset! scheduler (qs/start (qs/initialize)))
  (qs/schedule @scheduler
               (make-job EmailLoad "jobs.email.load.1")
               (periodic-trigger 1000 nil "email.trigger.1"))
  (qs/schedule @scheduler
               (make-job EmailRefresh "jobs.email.load.2")
               (periodic-trigger 3600000 nil "email.trigger.2"))
  (qs/schedule @scheduler
               (make-job NewGeocodes "jobs.geocode.load.1")
               (periodic-trigger 5000 nil "geocode.trigger.1"))
  (qs/schedule @scheduler
               (make-job CachedGeocodes "jobs.geocode.insert.1")
               (periodic-trigger 5000 nil "geocode.trigger.2"))
  (qs/schedule @scheduler
               (make-job ProcessRecon "jobs.recon.do.1")
               (periodic-trigger 1000 nil "recon.trigger.1"))
  (qs/schedule @scheduler
               (make-job EmailNLP "jobs.nlp.email.1")
               (periodic-trigger 1000 nil "nlp.trigger.1"))
  (qs/schedule @scheduler
               (make-job DeleteResetTokens "jobs.tokens.delete.1")
               (periodic-trigger 600000 nil "tokens.trigger.1")))

(defn restart! []
  (qs/shutdown @scheduler)
  (start!))

(defn delete-user! [user]
  (qs/shutdown @scheduler)
  (auth/delete-user! user)
  (start!))

(defn delete-req! [user query-map]
  (when (= "yes" (:confirmed query-map))
    (delete-user! user)))
