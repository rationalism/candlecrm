(ns spectra.quartz
  (:require [clojurewerkz.quartzite.jobs :as jobs]
            [clojurewerkz.quartzite.schedule.simple :refer
             [schedule repeat-forever with-repeat-count
              with-interval-in-milliseconds]]
            [clojurewerkz.quartzite.scheduler :as qs]
            [clojurewerkz.quartzite.triggers :as triggers]
            [clojure.string :as str]
            [spectra.auth :as auth]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra.email :as email]
            [spectra.geocode :as geocode]
            [spectra.neo4j :as neo4j]
            [spectra.queries :as queries]
            [spectra_cljc.schema :as s]))

(defn queue-small? [queue]
  (< (- (-> queue :data s/queue-top)
        (-> queue :data s/queue-bottom))
     email/batch-size))

(defn range-top [queue]
  (-> queue :data s/queue-top))

(defn range-bottom [queue]
  (if (queue-small? queue)
    (-> queue :data s/queue-bottom)
    (-> queue :data s/queue-top (- email/batch-size))))

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
      email/sent-time dt/to-ms))

(defn queue-time [queue-user]
  [(-> queue-user :queue range-bottom (email-time queue-user))
   (-> queue-user :queue range-top (email-time queue-user))])

(defn queue-time-extra [queue-user]
  (conj (queue-time queue-user)
        (-> queue-user :queue range-top inc
            (email-time queue-user))))

(defn scan-check [user email-times]
  (->> email-times
       (mapv #(queries/scan-overlaps user %))
       (mapv com/nil-or-empty?)))

(defn find-ranges [queue-user]
  (->> queue-user :user queries/all-scanned
       (map :data)
       (map #(select-keys % [s/start-time s/stop-time]))
       (map #(com/map-values % (keys %)
                             (->> queue-user :user
                                  email/fetch-imap-folder
                                  (partial email/find-num))))))

(defn default-queue [user]
  (let [top (-> user email/fetch-imap-folder
                email/message-count)]
    {s/queue-bottom (- top 50)
     s/queue-top top}))

(defn create-edges! [user queue]
  (neo4j/create-edge! (queries/email-queue) queue s/has-queue)
  (neo4j/create-edge! user queue s/has-queue))
  
(defn wipe-and-insert! [user & queues]
  (-> ["MATCH (root:" s/email-queue
       ")-[:" (neo4j/cypher-esc-token s/has-queue)
       "]->(d:" s/user-queue
       ")<-[:" (neo4j/cypher-esc-token s/has-queue)
       "]-(u:" s/user 
       ") WHERE ID(u)= " (:id user)
       " DETACH DELETE d"]
      str/join neo4j/cypher-query)
  (->> (map #(assoc % s/modified (dt/now)) queues)
       (map #(hash-map :props %))
       (map #(assoc % :labels [s/user-queue]))
       neo4j/batch-insert!
       (map #(create-edges! user %)) dorun))

(defn run-insertion! [queue-user]
  (email/insert-email-range! (:user queue-user)
                             (range-bottom (:queue queue-user))
                             (range-top (:queue queue-user))))

(defn adjust-times! [queue-user]
  (let [email-times (queue-time-extra queue-user)]
    (if (= [true true false] (scan-check (:user queue-user) email-times))
      (do (run-insertion! queue-user) 
          (neo4j/set-property! (:queue queue-user)
                               s/start-time (first email-times)))
      (->> queue-user find-ranges
           (wipe-and-insert! (:user queue-user))))))

(defn new-time-scanned! [queue-user]
  (let [email-times (queue-time queue-user)
        new-node (->> email-times
                      (zipmap [s/start-time s/stop-time])
                      (neo4j/create-vertex! s/time-scanned))]
    (neo4j/create-edge! (:user queue-user) new-node s/scanned)))

(defn queue-pop! []
  (when-let [queue-user (queries/next-email-queue)]
    (queue-reset! (:queue queue-user))
    (if (-> queue-user :user email/fetch-imap-folder email/message-count
            (= (-> queue-user :queue :data s/queue-top)))
      (do (run-insertion! queue-user)
          (new-time-scanned! queue-user))
      (adjust-times! queue-user))))

(jobs/defjob EmailLoad [ctx]
  (queue-pop!))

(jobs/defjob NewGeocodes [ctx]
  (geocode/geocode-batch 10))

(jobs/defjob CachedGeocodes [ctx]
  (geocode/geocode-cached 20))

(defn make-job [job-type job-name]
  (jobs/build
   (jobs/of-type job-type)
   (jobs/with-identity (jobs/key job-name))))

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

(defonce scheduler (atom nil))

(defn start! []
  (reset! scheduler (qs/start (qs/initialize)))
;  (qs/schedule @scheduler
;               (make-job EmailLoad "jobs.email.load.1")
;               (periodic-trigger 15000 nil "email.trigger.1"))
  (qs/schedule @scheduler
               (make-job NewGeocodes "jobs.geocode.load.1")
               (periodic-trigger 5000 nil "geocode.trigger.1"))
  (qs/schedule @scheduler
               (make-job CachedGeocodes "jobs.geocode.insert.1")
               (periodic-trigger 5000 nil "geocode.trigger.2")))
