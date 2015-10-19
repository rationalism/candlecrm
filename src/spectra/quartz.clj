(ns spectra.quartz
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [clojurewerkz.quartzite.scheduler :as qs]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn start! []
  (let [s (-> (qs/initialize) qs/start)]))
