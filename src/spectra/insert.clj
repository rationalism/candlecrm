(ns spectra.insert
  (:require [clojure.string :as str]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn create-cypher [user label]
    (str "CREATE (root:" (neo4j/prop-label user label)
         ") RETURN ID(root)"))

(defn insert-nodes! [g user]
  (let [n (loom/nodes g)]
    (zipmap n
     (->> (map s/type-label n)
          (map #(create-cypher user %))
          neo4j/cypher-combined-tx
          (map first) (map vals)
          (map first) (map second)
          (map first)))))

(defn prop-cypher [id user prop val]
  (if (coll? val)
    (map #(prop-cypher id user prop %) val)
    [(str "MATCH (a) WHERE ID(a) = " id
          " MERGE (b:" (neo4j/prop-label user prop)
          " {" (neo4j/cypher-esc-token s/value) ": '"
          (neo4j/cypher-esc val) "'}) CREATE (a)-[r:"
          (neo4j/cypher-esc-token prop)
          "]->(b) RETURN ID(b)")]))

(defn id-pair-cypher [user id-pair]
  (->> (apply dissoc (key id-pair) s/exclude-upload)
       (mapcat #(prop-cypher user (val id-pair)
                             (key %) (val %)))))

(defn link-cypher [id1 id2 prop]
  (str "MATCH (a),(b) WHERE ID(a) = " id1
       " AND ID(b) = " id2
       " CREATE (a)-[r:" (neo4j/cypher-esc-token prop)
       "]->(b) RETURN ID(a)"))

(defn edge-cypher [e id-map]
  (link-cypher (id-map (first e)) (id-map (second e))
               (nth e 2)))

(defn push-graph! [g user]
  (let [id-map (insert-nodes! g user)]
    (->> (mapcat #(id-pair-cypher user) id-map)
         neo4j/cypher-combined-tx)
    (->> g loom/multi-edges
         (map #(edge-cypher % id-map))
         neo4j/cypher-combined-tx)
    (vals id-map)))
