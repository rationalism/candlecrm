(ns candlecrm.cluster
  (:require [clojure.string :as str]
            [candlecrm.common :refer :all]
            [candlecrm.loom :as loom]))

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
  (->> g loom/edges
       (map #(update % 2 prob-weight))
       (loom/build-graph (loom/nodes g))))

(defn filter-edge [node edge]
  [(if (= node (first edge))
     (second edge) (first edge))
   (third edge)])

(defn new-cluster [[c1 c2 c3] node]
  [(assoc c1 node c3) (assoc c2 c3 [node]) (inc c3)])

(defn sum-score [node-scores]
  [(ffirst node-scores)
   (->> node-scores (map second) (apply +))])

(defn check-best [[c1 c2 c3] node [b1 b2]]
  (if (pos? b2)
    (let [cluster-id (get c1 b1)]
      [(assoc c1 node cluster-id)
       (update c2 cluster-id #(conj % node))
       c3])
    (new-cluster [c1 c2 c3] node)))

(defn add-cluster [g [c1 c2 c3] node]
  (if-let [candidates
           (->> (loom/all-edges g node)
                (map #(filter-edge node %))
                (filter #(contains? c1 (first %)))
                seq)]
    (->> (map first candidates) (map c1) distinct (map c2)
         (map #(map (mapkeys first candidates) %))
         (map #(remove nil? %)) (map sum-score)
         (sort-by second >) first
         (check-best [c1 c2 c3] node))
    (new-cluster [c1 c2 c3] node)))

(defn vote-clustering [g]
  (->> g loom/nodes
       (reduce (partial add-cluster g) [{} {} 0])
       second vals))

(defn cluster-graph [clusters]
  (->> (map (fn [[fn & rn]]
              (map #(vector fn % 1) rn))
            clusters)
       (remove empty?) (apply concat)
       (loom/build-graph (apply concat clusters))))
