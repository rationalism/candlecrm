(ns spectra.recon
  (:require [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra.corenlp :as nlp]
            [spectra.datetime :as dt]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn map-node [node attr]
  (cond
    (nil? (attr node)) nil
    (empty? (attr node)) nil
    (coll? (attr node))
    (map #(vector % node) (attr node))
    :else (-> (attr node) (vector node) vector)))

(defn dupe-nodes [attr nodes]
  (->> (mapcat #(map-node % attr) nodes)
       (remove nil?) (sort-by first)
       (partition-by first)
       (remove #(< (count %) 2))
       (map #(map second %))))

(defn vectorize [node]
  (fmap node #(if (coll? %) % (vector %))))

(defn devectorize [node]
  (reduce
   (fn [m k] (update m k #(if (some #{k} s/repeated-attr) % (first %))))
   node (keys node)))

(defn distinct-all [m]
  (fmap m distinct))

(defn merge-nodes [nodes]
  (->> (map vectorize nodes)
       (apply merge-with concat)
       distinct-all devectorize))

(defn replace-dupes [g dupes]
  (reduce #(loom/replace-node %1 %2 (merge-nodes dupes)) g dupes))

(defn remove-dupes [g attr]
  (reduce replace-dupes g (dupe-nodes attr (loom/nodes g))))
