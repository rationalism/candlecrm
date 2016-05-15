(ns spectra.insert
  (:require [clojure.string :as str]
            [clojure-csv.core :as csv]
            [spectra.common :refer :all]
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
  (let [fulls (remove #(contains? % :id) (loom/nodes g))
        emptys (filter #(contains? % :id) (loom/nodes g))]
    (->> (map s/type-label fulls)
         (map #(create-cypher user %))
         neo4j/cypher-combined-tx
         (apply concat) (map vals)
         (apply concat) (zipmap fulls)
         (merge (zipmap emptys (map :id emptys))))))

(defn prop-cypher [user id prop val]
  (if (coll? val)
    (mapcat #(prop-cypher user id prop %) val)
    (when (and val (not= val ""))
      [[(str "MATCH (a) WHERE ID(a) = {id}"
             " MERGE (b:" (neo4j/prop-label user prop)
             " {" (neo4j/esc-token s/value) ": {v}"
             "}) CREATE (a)-[r:" (neo4j/esc-token prop)
             "]->(b)")
        {:id id :v (dt/catch-dates val)}]])))

(defn id-pair-cypher [id-pair user]
  (->> (apply dissoc (key id-pair) s/exclude-upload)
       (mapcat #(prop-cypher user (val id-pair)
                             (key %) (val %)))))

(defn link-cypher [id1 id2 prop]
  (if (coll? prop)
    [(str "MATCH (a) WHERE ID(a) = {id1}"
          " WITH a MATCH (b) WHERE ID(b) = {id2}"
          " CREATE (a)-[r:" (neo4j/esc-token (:label prop))
          " {props}]->(b)")
     {:id1 id1 :id2 id2
      :props (-> prop (dissoc :label)
                 clojure.walk/stringify-keys
                 (java.util.HashMap. ))}]
    [(str "MATCH (a) WHERE ID(a) = {id1}"
          " WITH a MATCH (b) WHERE ID(b) = {id2}"
          " CREATE (a)-[r:" (neo4j/esc-token prop)
          "]->(b)")
     {:id1 id1 :id2 id2}]))

(defn edge-cypher [e id-map]
  (link-cypher (id-map (first e)) (id-map (second e))
               (nth e 2)))

(defn add-label-query [ids]
  (if ids
    [[(str "MATCH (root) WHERE ID(root) IN {ids}"
           " SET root:" (neo4j/esc-token s/nonlp))
      {:ids ids}]] []))

(defn add-nlp-labels [id-map]
  (->> (filter #(-> % first s/type-label (= s/email)) id-map)
       (remove #(-> % first :id))
       (map second) seq add-label-query))

(defnp push-graph!
  ([g user]
   (push-graph! g user []))
  ([g user pre-queries]
   (let [id-map (insert-nodes! g user)]
     (->> [pre-queries (add-nlp-labels id-map)
           (mapcat #(id-pair-cypher % user) id-map)
           (map #(edge-cypher % id-map) (loom/edges g))]
          (apply concat) neo4j/cypher-combined-tx)
     (vals id-map))))

(defn push-entities! [coll user]
  (push-graph! (loom/build-graph coll [])
               user))

(defn new-resp [id type]
  {:id id s/type-label type})

(defn new-entity! [user query-map]
  (-> query-map :fields vector
      (push-entities! user)
      first (new-resp (-> query-map :fields s/type-label))))

(defn vals-query [attrs]
  (str "MATCH (root)-[r:" attrs
       "]->(v) WHERE ID(root) = {id}"
       " AND v." (neo4j/esc-token s/value)
       " IS NOT NULL"))

(defn edit-entity! [user query-map]
  (let [fields (:fields query-map)
        attrs (->> (dissoc fields :id :type :label) keys
                   (map neo4j/esc-token) (str/join "|"))]
    (->> (-> fields (dissoc :id :type :label)
             (fmap vals) (hash-map (:id fields)) first
             (id-pair-cypher user))
         (concat
          [[(str "MATCH (root) WHERE ID(root) = {id}"
                 " SET root:" (neo4j/esc-token s/norecon))
            {:id (:id fields)}]
           [(str "MATCH (root) WHERE ID(root) = {id}"
                 " REMOVE root:" (neo4j/esc-token s/recon))
            {:id (:id fields)}]
           [(str (vals-query attrs) " WITH v MATCH (v)<--(x)"
                 " WITH v, count(x) as n WHERE n = {limit} DETACH DELETE v")
            {:id (:id fields) :limit 1}]
           [(str (vals-query attrs) " DELETE r")
            {:id (:id fields)}]])
         neo4j/cypher-combined-tx)))


