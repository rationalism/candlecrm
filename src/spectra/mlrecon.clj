(ns spectra.mlrecon
  (:require [clojure.string :as str]
            [spectra.common :as com]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn merge-link [link]
  (str "MATCH (a) WHERE ID(a) = " (first link)
       " WITH a MATCH (b) WHERE ID(b) = " (second link)
       " MERGE (a)-[:" (-> link (nth 2) neo4j/esc-token)
       "]->(b)"))

(defn swap-ids [old-id new-id l]
  (cond (= (first l) old-id)
        (assoc l 0 new-id)
        (= (second l) old-id)
        (assoc l 1 new-id)
        :else l))

(defn append-delete [old-id coll]
  (conj coll 
   (str "MATCH (root) WHERE ID(root) = " old-id
        " DETACH DELETE root")))

(defn merge-into! [old-id new-id]
  (->> old-id neo4j/all-links
       (map #(swap-ids old-id new-id %))
       (map merge-link)
       (append-delete old-id)
       (neo4j/cypher-combined-tx)))

(defn one-link [n1 n2 pred]
  (str "[:" (neo4j/esc-token pred)
       "]-(b" n2 "a" n1 ")-"))

(defn link-chain [n1 preds]
  (->> preds count range
       (map #(one-link n1 % (nth preds %)))
       str/join))

(defn match-chain [n1 preds]
  (str "OPTIONAL MATCH (root)" 
       "-" (->> preds drop-last (link-chain n1))
       "[:" (-> preds last neo4j/esc-token)
       "]->(a" n1 ")"))

(defn all-paths [paths]
  (->> paths count range
       (map #(match-chain % (nth paths %)))
       (str/join " ")))

(defn ret-vals [n]
  (str "RETURN "
       (->> n range
            (map #(str "a" % "." (neo4j/esc-token s/value)))
            (str/join ", "))))

(defn fetch-paths [id paths]
  (->> ["MATCH (root) WHERE ID(root) = " id
        " " (all-paths paths)
        " " (ret-vals (count paths))]
       (apply str) vector
       neo4j/cypher-combined-tx
       ffirst vals first second))