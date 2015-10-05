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

(defn reverse-edges [edges]
  (map #(vector (nth 1 %)
                (nth 0 %)
                (nth 2 %))
       edges))

(defn build-graph [nodes edges]
  (as-> (graph/weighted-digraph) $
    (apply graph/add-nodes $ nodes)
    (apply graph/add-edges $ edges)))

(defn subgraphs [g]
  (->> (galg/connected-components g)
       (map #(graph/subgraph g %))))

(defn merge-graphs [graphs]
  (apply graph/weighted-digraph graphs))

(defn display-graph [g]
  (gviz/view g))
