(ns spectra.cluster
  (:require [clojure.string :as str]
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
