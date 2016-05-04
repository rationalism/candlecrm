(ns spectra.async
  (:require [clojure.core.async :as async]
            [clojure.set :as set]
            [spectra.neo4j :as neo4j]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defonce store (atom {}))

(defn async-worker [pool-name]
  (let [pool-data (get @store pool-name)
        params ((get pool-data :param-gen))]
    (async/thread
      (neo4j/thread-wrap
       #(while true
          (let [data-in (async/<!! (get pool-data :in-chan))
                data-out ((get pool-data :process) params data-in)]
            (async/>!! (get pool-data :out-chan) data-out)))))))

(defn async-outfeed [pool-name]
  (let [pool-data (get @store pool-name)]
    (async/thread
      (while true
        (let [data-out (async/<!! (get pool-data :out-chan))]
          ((get pool-data :callback) data-out))))))

(defn create-pool! [params]
  {:pre [(= (set (keys params))
            #{:name :process :param-gen :callback :num-threads})]}
  (let [pn (:name params)]
    (->> {:in-chan (async/chan) :out-chan (async/chan)
          :param-gen (:param-gen params) :callback (:callback params)
          :process (:process params)}
         (swap! store assoc pn))
    (swap! store assoc-in [pn :workers] {})
    (doseq [n (range (:num-threads params))]
      (swap! store assoc-in [pn :workers n]
             (async-worker pn)))
    (swap! store assoc-in [pn :outfeed]
           (async-outfeed pn))
    (fn [data-in] (async/>!! (get-in @store [pn :in-chan])
                             data-in))))

(defn delete-pool! [pool-name]
  (swap! store dissoc pool-name))
