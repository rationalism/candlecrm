(ns spectra.recon
  (:require [clojure.string :as str]
            [spectra.common :as com]
            [spectra.corenlp :as nlp]
            [spectra.datetime :as dt]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn expand-entity [entity properties]
  (->> properties
       (map #(assoc {} % (neo4j/get-property entity %)))
       (apply merge)))

(defn lookup-hash [prop-name node]
  (->> node key :data prop-name
       (map #(hash-map % (hash-map (key node) (val node))))
       (apply merge)))

(defn filter-type [g type-name]
  (->> (loom/nodes g)
       (filter #(= (s/type-label %) type-name))))

(defn filter-memory [g type-name]
  (->> (filter-type g type-name)
       (filter #(nil? (:data %)))
       (remove #(loom/out-edge-label g % :database-match))))

(defn name-email-map [names emails]
  (cond
    (> (count names) (count emails))
    (as-> (count names) $
      (- $ (count emails)) (repeat $ nil)
      (reduce conj emails $)
      (zipmap names $))
    (< (count names) (count emails))
    (as-> (count emails) $
      (- $ (count names)) (repeat $ nil)
      (reduce conj names $)
      (zipmap $ emails))
    :else (zipmap names emails)))

(defn map-node [node attr]
  (cond
    (nil? (attr node)) nil
    (empty? (attr node)) nil
    (coll? (attr node))
    (map #(vector % node) (attr node))
    :else (-> (attr node) (vector node) vector)))

(defn dupe-nodes [attr nodes]
  (->> (mapcat #(map-node % attr) nodes)
       (remove nil?)
       (sort-by first)
       (partition-by first)
       (remove #(< (count %) 2))
       (map #(map second %))))

(defn vectorize [node]
  (reduce
   (fn [m k] (update m k #(if (coll? %) % (vector %))))
   node (keys node)))

(defn devectorize [node]
  (reduce
   (fn [m k] (update m k #(if (some #{k} s/repeated-attr) % (first %))))
   node (keys node)))

(defn distinct-all [m]
  (reduce #(update %1 %2 distinct) m (keys m)))

(defn merge-nodes [nodes]
  (->> (map vectorize nodes)
       (apply merge-with concat)
       distinct-all
       devectorize))

(defn replace-dupes [g dupes]
  (reduce #(loom/replace-node %1 %2 (merge-nodes dupes)) g dupes))

(defn remove-dupes [g attr]
  (reduce replace-dupes g (dupe-nodes attr (loom/nodes g))))
