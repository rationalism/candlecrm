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
            [spectra.neo4j :as neo4j]
            [spectra.queries :as queries]
            [spectra_cljc.schema :as s]))

(def test-count 50)

(defn message-count [user]
  (-> user email/fetch-imap-folder email/message-count))
  
(defn queue-small? [queue]
  (< (- (-> queue :data s/queue-top)
        (-> queue :data s/queue-bottom))
     email/batch-size))

(defn range-top [queue]
  (-> queue :data s/queue-top))

(defn range-bottom [queue]
  (if (queue-small? queue)
    (-> queue :data s/queue-bottom)
    (-> queue :data s/queue-top (- email/batch-size) inc)))

(defn queue-reset! [queue]
  (neo4j/set-property! queue s/modified (dt/now))
  (if (queue-small? queue)
    (neo4j/delete-vertex! queue)
    (neo4j/set-property! queue s/queue-top
                         (- (-> queue :data s/queue-top) 10))))

(defn email-time [email-num queue-user]
  (-> queue-user :user
      email/fetch-imap-folder
      (email/get-message email-num)
      email/received-time dt/to-ms))

(defn queue-time [queue-user]
  [(-> queue-user :queue range-bottom (email-time queue-user))
   (-> queue-user :queue range-top (email-time queue-user))])

(defn queue-time-extra [queue-user]
  (conj (queue-time queue-user)
        (-> queue-user :queue range-top inc
            (email-time queue-user))))

(defn scan-check [user email-times]
  (->> email-times
       (mapv #(queries/scan-overlaps user %))))

(defn in-range [bounds]
  (range (first bounds) (inc (second bounds))))

(defn queue-ends [user excluded]
  (let [top-end (message-count user)]
    (-> (- top-end test-count)
        (range (inc top-end))
        set (cset/difference excluded))))

(defonce cnt (atom 0))

(defn count-up [n]
  (swap! cnt dec)
  (+ @cnt n))

(defn first-last [coll]
  [(first coll) (last coll)])

(defn find-ranges [user]
  (reset! cnt 0)
  [])
  
;  (let [folder (email/fetch-imap-folder user)]
;    (->> user queries/all-scanned
;         (map :data)
;         (mapcat (juxt s/start-time s/stop-time))
;         (map #(email/find-num folder %))
;         (partition 2) (mapcat in-range) set
;         (queue-ends user) (into []) sort
;         (partition-by count-up) 
;         (map first-last)
;         (map #(zipmap [s/queue-bottom s/queue-top] %)))))

(defn default-queue [user]
  (let [top (message-count user)]
    {s/queue-bottom (- top test-count)
     s/queue-top top}))

(defn create-edges! [user queue]
  (neo4j/create-edge! (queries/email-queue) queue s/has-queue)
  (neo4j/create-edge! user queue s/has-queue))
  
(defn wipe-and-insert! [user & queues]
  (-> ["MATCH (root:" s/email-queue
       ")-[:" (neo4j/esc-token s/has-queue)
       "]->(d:" s/user-queue
       ")<-[:" (neo4j/esc-token s/has-queue)
       "]-(u:" s/user 
       ") WHERE ID(u)= " (:id user)
       " DETACH DELETE d"]
      str/join neo4j/cypher-query)
  (->> (map #(assoc % s/modified (dt/now)) queues)
       (map #(hash-map :props %))
       (map #(assoc % :labels [s/user-queue]))
       neo4j/batch-insert!
       (map #(create-edges! user %)) dorun))

(defn refresh-queue! [user]
  (prn "refreshing queue")
  (apply wipe-and-insert! user (find-ranges user)))

(defn run-insertion! [queue-user]
  (prn "inserting emails")
  (email/insert-email-range! (:user queue-user)
                             (range-bottom (:queue queue-user))
                             (range-top (:queue queue-user))))

(defn adjust-times! [queue-user]
  (let [email-times (queue-time-extra queue-user)
        overlaps (scan-check (:user queue-user) email-times)]
    (if (= [true true false] (map com/nil-or-empty? overlaps))
      (do (run-insertion! queue-user) 
          (neo4j/set-property! (first (last overlaps))
                               s/start-time (first email-times)))
      (refresh-queue! (:user queue-user)))))

(defn new-time-scanned! [queue-user]
  (let [email-times (queue-time queue-user)
        new-node (->> email-times
                      (zipmap [s/start-time s/stop-time])
                      (neo4j/create-vertex! s/time-scanned))]
    (neo4j/create-edge! (:user queue-user) new-node s/scanned)))

(defn queue-pop! []
  (when-let [queue-user (queries/next-email-queue)]
    (queue-reset! (:queue queue-user))
    (if (= (message-count (:user queue-user))
           (-> queue-user :queue :data s/queue-top))
      (do (run-insertion! queue-user)
          (new-time-scanned! queue-user))
      (adjust-times! queue-user))))

(defn user-job [ctx]
  (-> ctx qc/from-job-data
      (get s/user) (get "id")
      neo4j/find-by-id))

(jobs/defjob EmailLoad [ctx]
  (queue-pop!))

(jobs/defjob NewGeocodes [ctx]
  (geocode/geocode-batch 10))

(jobs/defjob CachedGeocodes [ctx]
  (geocode/geocode-cached 20))

(jobs/defjob EmailRefresh [ctx]
  (doseq [user (auth/list-users)]
    (refresh-queue! user)))

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
               (once-trigger 20000 "jobs.contacts.trigger.1")))

(defn start! []
  (reset! scheduler (qs/start (qs/initialize)))
;  (qs/schedule @scheduler
;               (make-job EmailLoad "jobs.email.load.1")
;               (periodic-trigger 15000 nil "email.trigger.1"))
;  (qs/schedule @scheduler
;               (make-job EmailRefresh "jobs.email.load.2")
;               (periodic-trigger 3600000 nil "email.trigger.2"))
  (qs/schedule @scheduler
               (make-job NewGeocodes "jobs.geocode.load.1")
               (periodic-trigger 5000 nil "geocode.trigger.1"))
  (qs/schedule @scheduler
               (make-job CachedGeocodes "jobs.geocode.insert.1")
               (periodic-trigger 5000 nil "geocode.trigger.2")))
