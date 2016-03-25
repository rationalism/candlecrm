(ns spectra.insert
  (:require [clojure.string :as str]
            [clojure-csv.core :as csv]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(def insert-csv-block 100)

(defn create-cypher [user label]
  {:pre [user label]}
  (str "CREATE (root:" (neo4j/prop-label user label)
       ":" (neo4j/esc-token s/norecon)
       ") RETURN ID(root)"))

(defnp insert-nodes! [g user]
  (let [n (loom/nodes g)]
    (zipmap n
            (->> (map s/type-label n)
                 (map #(create-cypher user %))
                 neo4j/cypher-combined-tx
                 (map first) (map vals)
                 (map first) (map second)
                 (map first)))))

(defn prop-cypher [user id prop val]
  (if (coll? val)
    (mapcat #(prop-cypher user id prop %) val)
    (when (and val (not= val ""))
      [(str "MATCH (a) WHERE ID(a) = " id
            " MERGE (b:" (neo4j/prop-label user prop)
            " {" (neo4j/esc-token s/value) ": "
            (neo4j/esc-val val) "}) CREATE (a)-[r:"
            (neo4j/esc-token prop)
            "]->(b)")])))

(defn id-pair-cypher [user id-pair]
  (->> (apply dissoc (key id-pair) s/exclude-upload)
       (mapcat #(prop-cypher user (val id-pair)
                             (key %) (val %)))))

(defn link-cypher [id1 id2 prop]
  (str "MATCH (a) WHERE ID(a) = " id1
       " WITH a MATCH (b) WHERE ID(b) = " id2
       " CREATE (a)-[r:" (neo4j/esc-token prop)
       "]->(b)"))

(defn edge-cypher [e id-map]
  (link-cypher (id-map (first e)) (id-map (second e))
               (nth e 2)))

(defnp push-graph! [g user]
  (let [id-map (insert-nodes! g user)]
    (->> (mapcat #(id-pair-cypher user %) id-map)
         neo4j/cypher-combined-tx)
    (->> g loom/multi-edges
         (map #(edge-cypher % id-map))
         neo4j/cypher-combined-tx)
    (vals id-map)))

(defn push-entities! [coll user]
  (push-graph! (loom/build-graph coll [])
               user))

(defn new-resp [id type]
  {:id id s/type-label type})

(defn new-entity! [user query-map]
  (-> query-map :fields vector
      (push-entities! user)
      first (new-resp (-> query-map :fields s/type-label))))

(defn vals-query [id attrs]
  (str "MATCH (root)-[r:`" attrs
       "`]->(v) WHERE ID(root) = " id
       " AND v." (neo4j/esc-token s/value)
       " IS NOT NULL"))

(defn edit-entity! [user query-map]
  (let [fields (:field query-map)
        attrs (->> (dissoc fields :id :type) keys
                   (map name) (str/join "|"))]
    (neo4j/cypher-query-raw
     (str (vals-query (:id fields) attrs) " WITH v MATCH (v)<--(x)"
          " WITH v, count(x) as n WHERE n = 1 DETACH DELETE v"))
    (neo4j/cypher-query-raw
     (str (vals-query (:id fields) attrs) " DELETE r"))
    ))

(defn load-csv [filename]
  (let [csv-lines (-> filename slurp csv/parse-csv)]
    (->> csv-lines (drop 1)
         (map #(zipmap (->> csv-lines first (map keyword)) %)))))

(defonce blk-count (atom 0))

(defn blk-print [blk]
  (swap! blk-count #(+ % (count blk)))
  (println "Finished loading item:" @blk-count))

(defn import-csv! [user type filename]
  (reset! blk-count 0)
  (->> filename load-csv
       (map #(assoc % s/type-label type))
       (partition-all insert-csv-block)
       (map #(loom/build-graph % []))
       (map #(push-graph! % user))
       (map blk-print)
       dorun))
