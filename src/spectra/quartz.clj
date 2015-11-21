(ns spectra.quartz
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [clojurewerkz.quartzite.jobs :as jobs]
            [clojurewerkz.quartzite.schedule.simple :refer
             [schedule with-repeat-count with-interval-in-milliseconds]]
            [clojurewerkz.quartzite.scheduler :as qs]
            [clojurewerkz.quartzite.triggers :as triggers]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra.email :as email]
            [spectra.neo4j :as neo4j]
            [spectra.queries :as queries]
            [spectra_cljc.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(jobs/defjob TestJob [ctx]
  (println "This is a test Quartz job"))

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
  (if (queue-small? queue)
    (neo4j/delete-vertex! queue)
    (neo4j/set-property! queue s/queue-top
                         (- (-> queue :data s/queue-top) 10)))
  (neo4j/set-property! queue s/modified (dt/now)))

(defn email-time [email-num queue-user]
  (-> queue-user second
      email/fetch-imap-folder
      (email/get-message email-num)
      email/sent-time))

(defn queue-time [queue-user]
  [(-> queue-user first range-bottom (email-time queue-user))
   (-> queue-user first range-top (email-time queue-user))
   (-> queue-user first range-top inc (email-time queue-user))])

(defn scan-check [queue-user]
  (->> queue-user queue-time 
       (mapv #(queries/scan-overlaps (second queue-user) %))
       (mapv com/nil-or-empty?)))

(defn find-ranges [queue-user]
  (->> queue-user second queries/all-scanned
       (map #(:data %))
       (map #(select-keys % [s/start-time s/stop-time]))
       (map #(com/map-values % (keys %)
                             (->> queue-user second
                                  email/fetch-imap-folder
                                  (partial email/find-num))))))

(defn default-queue [user]
  {s/queue-bottom 0
   s/queue-top (-> user email/fetch-imap-folder
                   email/message-count)})

(defn wipe-and-insert! [user queues]
  (-> (str "MATCH (root:" s/email-queue
           ")-[:" (neo4j/cypher-esc-token s/has-queue)
           "]->(d:" s/user-queue
           ")<-[:" (neo4j/cypher-esc-token s/has-queue)
           "]-(u:" s/user 
           ") WHERE ID(u)= " (:id user)
           " DETACH DELETE d")
      neo4j/cypher-query)
  (dorun
   (->> (map #(assoc % s/modified (dt/now)) queues)
        (map #(hash-map :props %))
        (map #(assoc % :labels [s/user-queue]))
        neo4j/batch-insert!
        (map #(neo4j/create-edge! (queries/email-queue) % s/has-queue))
        (map #(neo4j/create-edge! user % s/has-queue)))))

(defn run-insertion! [queue-user]
  (email/insert-email-range! (second queue-user)
                             (range-bottom (first queue-user))
                             (range-top (first queue-user))))

(defn adjust-times! [queue-user]
  (if (= [true true false] (scan-check queue-user))
    (run-insertion! queue-user)
    (->> queue-user find-ranges
         (wipe-and-insert! (second queue-user)))))

(jobs/defjob EmailLoad [ctx]
  (let [queue-user (queries/next-email-queue)]
    (queue-reset! (first queue-user))
    (if (-> queue-user second queries/all-scanned count (= 0))
      (run-insertion! queue-user)
      (adjust-times! queue-user))))

(defn make-job [job-type job-name]
  (jobs/build
   (jobs/of-type job-type)
   (jobs/with-identity (jobs/key job-name))))

(defn periodic-trigger [interval limit name]
  (triggers/build
   (triggers/with-identity (triggers/key name))
   (triggers/start-now)
   (triggers/with-schedule
     (schedule
      (with-repeat-count limit)
      (with-interval-in-milliseconds interval)))))
  
(defn start! []
  (def ^:dynamic *scheduler*
    (-> (qs/initialize) qs/start))
  (qs/schedule *scheduler*
               (make-job TestJob "jobs.test.1")
               (periodic-trigger 2000 5 "triggers.1")))
