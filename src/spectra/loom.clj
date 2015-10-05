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

(defn fan-in [g node]
  (count (graph/in-edges g node)))

(defn fan-out [g node]
  (count (graph/in-edges g node)))

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

(defn remove-nodes [g nodes]
  (apply graph/remove-nodes g nodes))

(defn up-nodes [g node]
  (->> (graph/in-edges g node)
       (map first)))

(defn down-nodes [g node]
  (->> (graph/out-edges g node)
       (map first)))

(defn sort-nodes [g]
  (sort-by count > (graph/nodes g)))

(defn replace-node [g old-node new-node]
  (-> g
      (add-nodes [new-node])
      (add-edges (->> (out-edges g old-node)
                      (map #(assoc % 0 new-node))))
      (add-edges (->> (in-edges g old-node)
                      (map #(assoc % 1 new-node))))
      (remove-nodes [old-node])))

(defn split-node [g old-node new-node-up new-node-down]
  (-> g
      (add-edges (->> (out-edges g old-node)
                      (map #(assoc % 0 new-node-down))))
      (add-edges (->> (in-edges g old-node)
                      (map #(assoc % 1 new-node-up))))
      (remove-nodes [old-node])))  

(defn build-graph [nodes edges]
  (-> (graph/weighted-digraph)
      (add-nodes nodes)
      (add-edges edges)))

(defn reverse-edges [edges]
  (map #(assoc % 1 (% 0) 0 (% 1)) edges))

(defn reverse-graph [g]
   (build-graph (nodes g)
                (reverse-edges (weighted-edges g))))

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

(defn display-graph [g]
  (gviz/view g))
