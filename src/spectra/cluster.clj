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
  (loom/display-graph g)
  (->> g loom/multi-edges
       (map #(update % 2 prob-weight))
       (loom/build-graph (loom/nodes g))))

(defn filter-edge [node edge]
  [(if (= node (first edge))
     (second edge) (first edge))
   (nth edge 2)])

(defn new-cluster [clusters node]
  [(-> clusters first (assoc node (nth clusters 2)))
   (-> clusters second (assoc (nth clusters 2) [node]))
   (-> clusters (nth 2) inc)])

(defn sum-score [node-scores]
  [(ffirst node-scores)
   (->> node-scores (map second)
        (apply +))])

(defn check-best [clusters node best]
  (if (pos? (second best))
    (let [cluster-id (->> best first (get (first clusters)))]
      [(-> clusters first (assoc node cluster-id))
       (-> clusters second
           (update cluster-id #(conj % node)))
       (nth clusters 2)])
    (new-cluster clusters node)))

(defn add-cluster [g clusters node]
  (if-let [candidates
           (->> (loom/all-edges g node)
                (map #(filter-edge node %))
                (filter #(contains? (first clusters) (first %)))
                seq)]
    (->> (map first candidates)
         (map (first clusters))
         distinct (map (second clusters))
         (map #(map (zipmap (map first candidates)
                            candidates) %))
         (map #(remove nil? %)) (map sum-score)
         (sort-by second >) first
         (check-best clusters node))
    (new-cluster clusters node)))

(defn vote-clustering [g]
  (->> g loom/nodes
       (reduce (partial add-cluster g) [{} {} 0])
       second vals))

(defn cluster-graph [clusters]
  (->> clusters
       (map (fn [nodes]
              (map #(vector (first nodes) % 1)
                   (rest nodes))))
       (remove empty?) (apply concat)
       (loom/build-graph (apply concat clusters))))
