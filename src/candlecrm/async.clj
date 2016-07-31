(ns candlecrm.async
  (:require [clojure.core.async :as async]
            [clojure.set :as set]
            [candlecrm.common :refer :all]
            [candlecrm.neo4j :as neo4j]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defonce store (atom {}))
(defonce buf-size 10000)

(defn async-worker [pool-name]
  (let [pool-data (get @store pool-name)
        params ((get pool-data :param-gen))]
    (async/thread
      (neo4j/thread-wrap
       (while true
         (let [data-in (async/<!! (get pool-data :in-chan))]
           (try
             (let [data-out ((get pool-data :process) params data-in)]
               (async/>!! (get pool-data :out-chan) data-out))
             (catch Exception e
               (throw-error! (pr-str e))
               (async/>!! (get pool-data :out-chan) [])))))))))

(defn async-outfeed [pool-name]
  (let [pool-data (get @store pool-name)]
    (async/thread
      (while true
        (let [data-out (async/<!! (get pool-data :out-chan))]
          (try
            ((get pool-data :callback) data-out)
            (catch Exception e
              (throw-error! (pr-str e)))))))))

(defn create-pool! [{:keys [name process param-gen
                            callback num-threads]}]
  {:pre [name process param-gen callback num-threads]}
  (->> {:in-chan (async/chan 10000) :out-chan (async/chan)
        :param-gen param-gen :callback callback
        :process process}
       (swap! store assoc name))
  (swap! store assoc-in [name :workers] {})
  (doseq [n (range num-threads)]
    (swap! store assoc-in [name :workers n]
           (async-worker name)))
  (swap! store assoc-in [name :outfeed]
         (async-outfeed name))
  (fn [data-in] (async/>!! (get-in @store [name :in-chan])
                           data-in)))

(defn delete-pool! [pool-name]
  (swap! store dissoc pool-name))
