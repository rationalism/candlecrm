(ns spectra.loom
  (:require [clojure.java.io :as io]
            [loom.alg :as galg]
            [loom.graph :as graph]
            [loom.io :as gviz]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn weighted-edge [g edge]
  (conj edge (graph/weight g edge)))

(defn nodes [g]
  (graph/nodes g))
  
(defn edges [g]
  (graph/edges g))

(defn weighted-edges [g]
  (->> g edges (map #(weighted-edge g %))))

(defn out-edges [g node]
  (->> (graph/out-edges g node)
       (map #(weighted-edge g %))))

(defn in-edges [g node]
  (->> (graph/in-edges g node)
       (map #(weighted-edge g %))))

(defn out-edge-label [g node label]
  (->> (out-edges g node)
       (filter #(= (nth % 2) label))
       first))

(defn in-edge-label [g node label]
  (->> (in-edges g node)
       (filter #(= (nth % 2) label))
       first))

(defn fan-in [g node]
  (count (graph/in-edges g node)))

(defn fan-out [g node]
  (count (graph/out-edges g node)))

(defn top-nodes [g]
  (filter #(= 0 (fan-in g %))
          (nodes g)))

(defn bottom-nodes [g]
  (filter #(= 0 (fan-out g %))
          (nodes g)))
       
(defn add-nodes [g nodes]
  (apply graph/add-nodes g nodes))

(defn add-edges [g edges]
  (apply graph/add-edges g edges))

(defn loners [g]
  (galg/loners g))

(defn remove-nodes [g nodes]
  (apply graph/remove-nodes g nodes))

(defn remove-edges [g edges]
  (apply graph/remove-edges g edges))

(defn remove-edges-label [g label]
  (remove-edges
   g (filter #(= label (nth % 2))
             (weighted-edges g))))

(defn up-nodes [g node]
  (->> (graph/in-edges g node)
       (map first)))

(defn down-nodes [g node]
  (->> (graph/out-edges g node)
       (map first)))

(defn sort-nodes [g]
  (sort-by count > g))

(defn labeled-edges [g node label]
  (->> (out-edges g node)
       (filter #(= label (nth % 2)))))

(defn select-edges [g edge-type]
  (->> (weighted-edges g)
       (filter #(= edge-type (nth % 2)))))

(defn replace-node [g old-node new-node]
  (if (= old-node new-node) g
      (-> g
          (add-nodes [new-node])
          (add-edges (->> (out-edges g old-node)
                          (map #(assoc % 0 new-node))))
          (add-edges (->> (in-edges g old-node)
                          (map #(assoc % 1 new-node))))
          (remove-nodes [old-node]))))

(defn split-node [g old-node new-node-up new-node-down]
  (-> g
      (add-edges (->> (out-edges g old-node)
                      (map #(assoc % 0 new-node-down))))
      (add-edges (->> (in-edges g old-node)
                      (map #(assoc % 1 new-node-up))))
      (remove-nodes [old-node])))  

(defn crash-if-nil [g]
  (if (->> (nodes g) (filter nil?) count (not= 0))
    (/ 1 0) g))

(defn build-graph [nodes edges]
  (-> (graph/weighted-digraph)
      (add-nodes nodes)
      (add-edges edges)))

(defn reverse-edges [edges]
  (map #(assoc % 1 (% 0) 0 (% 1)) edges))

(defn reverse-graph [g]
   (build-graph (nodes g)
                (reverse-edges (weighted-edges g))))

(defn attach-all [g old-nodes new-node label]
  (-> g
      (add-nodes [new-node])
      (add-edges (->> old-nodes
                      (map vector)
                      (map #(assoc % 1 new-node))
                      (map #(assoc % 2 label))))))

(defn subgraphs [g]
  (->> (galg/connected-components g)
       (map #(graph/subgraph g %))))

(defn merge-graphs [graphs]
  (apply graph/weighted-digraph graphs))

(defn count-downstream [g node]
  (->> (galg/bf-span g node)
       vals
       (apply concat)
       distinct
       count))

(defn count-upstream [g node]
  (count-downstream (reverse-graph g) node))

(defn spider-path [g path node]
  (if (-> g (out-edges node) count (= 0))
    (conj path g)
    (let [edge (-> g (out-edges node) first)]
      (recur (remove-edges g [edge])
             (conj path edge)
             (second edge)))))

(defn spider-edges [g edges]
  (if (-> g weighted-edges count (= 0))
    edges (let [new-path (->> g nodes (sort-by (partial fan-out g) >)
                              first (spider-path g '()))]
            (recur (first new-path)
                   (->> new-path rest reverse (conj edges))))))

(defn display-graph [g]
  (gviz/view g))

(defn replace-inc [i g old-node]
  (swap! i inc)
  (replace-node g old-node @i))

(defn structure [g]
  (let [i (atom 0)]
    (-> replace-inc
        (partial i)
        (reduce g (nodes g)))))

(defn display-structure [g]
  (display-graph (structure g)))
