(ns spectra.cluster
  (:require [clojure.string :as str]
            [spectra.common :as com]
            [spectra.loom :as loom]))

(defn random-graph [n]
  (let [g (-> n range (loom/build-graph []))]
    (loop [g-edges g]
      (if (-> g-edges loom/subgraphs count (= 1))
        g-edges
        (let [new-edge [(rand-int n) (rand-int n) (rand)]]
          (cond (= (first new-edge) (second new-edge)) (recur g-edges)
                (loom/has-edge? g-edges new-edge) (recur g-edges)
                (loom/has-edge? g-edges [(second new-edge) (first new-edge)])
                (recur g-edges)
                :else (recur (loom/add-edge g-edges new-edge))))))))

(defn prob-weight [p]
  (/ (- (Math/log p) (Math/log (- 1.0 p)))
     2.0))

(defn prob-weights [g]
  (->> g loom/multi-edges
       (map #(update % 2 prob-weight))
       (loom/build-graph (loom/nodes g))))
