(ns spectra.quartz
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [clojurewerkz.quartzite.jobs :as jobs]
            [clojurewerkz.quartzite.schedule.simple :refer
             [schedule with-repeat-count with-interval-in-milliseconds]]
            [clojurewerkz.quartzite.scheduler :as qs]
            [clojurewerkz.quartzite.triggers :as triggers]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(jobs/defjob TestJob [ctx]
  (println "This is a test Quartz job"))

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
