(ns candlecrm.insert
  (:require [clojure.string :as str]
            [clojure-csv.core :as csv]
            [candlecrm.common :refer :all]
            [candlecrm.datetime :as dt]
            [candlecrm.loom :as loom]
            [candlecrm.neo4j :as neo4j]
            [candlecrm_cljc.schema :as s]
            [candlecrm.environ :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(def insert-csv-block 100)
(def preprocess-labels {s/nogeocode s/building})

(defn create-cypher [user label]
  {:pre [user label]}
  (str "CREATE (root:" (neo4j/prop-label user label)
       ":" (neo4j/esc-token s/norecon)
       ") RETURN ID(root)"))

(defn insert-nodes! [g user]
  (let [fulls (remove #(contains? % :id) (loom/nodes g))
        emptys (filter #(contains? % :id) (loom/nodes g))]
    (->> (map s/type-label fulls)
         (map #(create-cypher user %)) 
         neo4j/cypher-combined-tx 
         (apply concat) (map vals)
         (apply concat) (zipmap fulls)
         (merge (mapvals :id emptys)))))

(defn prop-cypher [user source id prop val]
  (if (coll? val)
    (mapcat #(prop-cypher user source id prop %) val)
    (when (and val (not= val ""))
      [[(str "MATCH (a) WHERE ID(a) = {id}"
             " MERGE (b:" (neo4j/prop-label user prop)
             " {" (neo4j/esc-token s/value) ": {v}"
             "}) CREATE (a)-[r:" (neo4j/esc-token prop)
             " {src" source ": {cnt}}]->(b)")
        {:id id :v (catch-dates val) :cnt 1}]])))

(defn id-pair-cypher [id-pair user source]
  (->> (apply dissoc (key id-pair) s/exclude-upload)
       (mapcat #(prop-cypher user source (val id-pair)
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

(defn edge-cypher [[e1 e2 e3] id-map]
  (link-cypher (id-map e1) (id-map e2) e3))

(defn add-label-query [label ids]
  (if (and ids (not (empty? ids)))
    [[(str "MATCH (root) WHERE ID(root) IN {ids} SET root:"
           (neo4j/esc-token label))
      {:ids ids}]] []))

(defn add-process-labels [id-map]
  (->> (remove #(-> % first :id) id-map)
       (group-by #(-> % first s/type-label))
       (compose-maps preprocess-labels)
       (fmapl #(map second %)) (into [])
       (mapcat #(apply add-label-query %))))

(defnp push-graph!
  ([g user source]
   (push-graph! g user source []))
  ([g user source pre-queries]
   (let [id-map (insert-nodes! g user)]
     (->> [pre-queries (add-process-labels id-map)
           (mapcat #(id-pair-cypher % user source) id-map)
           (map #(edge-cypher % id-map) (loom/edges g))]
          (apply concat) neo4j/cypher-combined-tx)
     (vals id-map))))

(defn push-entities! [coll user source]
  (push-graph! (loom/build-graph coll [])
               user source))

(defn new-resp [id type]
  {:id id s/type-label type})

(defn decode-date [coll]
  (->> coll (remove empty?)
       (map #(ffirst (dt/unix-dates % (dt/now))))))

(defn decode-dates [m]
  (->> m (into [])
       (map (fn [[k v]] (if (some #{k} s/date-times)
                          [[k (decode-date v)]] [[k v]])))
       (mapv vec) (map #(into {} %)) (apply merge)))

(defn relation-string [link]
  (->> s/relation-map (into [])
       (drop-while (fn [[k v]] (not= v link))) ffirst))

(defn relation-type [s]
  (->> s/relation-types (into [])
       (drop-while (fn [[k v]] (not (some #{s} v))))
       ffirst second))

(defn link-type [link]
  (->> link relation-string relation-type s/entity-map))

(defn new-links [node [k v]]
  (map #(vector node {(second k) % s/type-label (link-type (first k))}
                (first k)) v))

(defn split-map [m]
  [(->> m keys (remove coll?) (select-keys m))
   (->> m keys (filter coll?) (select-keys m))])

(defn new-entity-graph [fields links]
  (let [new-node (decode-dates fields)
        new-links (->> links (into [])
                       (mapcat #(new-links new-node %)))]
    (-> new-node vector (loom/build-graph new-links))))

(defn new-entity! [user {:keys [fields add-links]}]
  (-> (new-entity-graph fields add-links)
      (push-graph! user s/edit-src) first
      (new-resp (s/type-label fields))))

(defn push-contacts! [user {:keys [columns]}]
  (let [contact-data (@neo4j/upload-cache user)]
    (->> contact-data rest 
         (map #(zipvec columns (map vector %))) 
         (map #(map (fn [v] (apply hash-map v)) %)) 
         (map #(apply merge-with concat %))
         (map #(assoc % :label s/person)) (map split-map) 
         (map #(apply new-entity-graph %)) loom/merge-graphs 
         (#(push-graph! % user s/contact-src))))
  (swap! neo4j/upload-cache dissoc user))

(defn vals-query [attrs]
  (str "MATCH (root)-[r:" attrs
       "]->(v) WHERE ID(root) = {id}"
       " AND v." (neo4j/esc-token s/value)
       " IS NOT NULL"))

(defn drop-link-query [id1 [id2 link]]
  [(str "MATCH (r1)-[l:" (neo4j/esc-token link)
        "]-(r2) WHERE ID(r1) = {id1}"
        " AND ID(r2) = {id2} DELETE l")
   {:id1 id1 :id2 id2}])

(defn unwind-links [[[l1 l2] ids]]
  (->> ids (map :id) (map #(vector % l1))))

(defn edit-entity! [user {:keys [fields add-links delete-links]}]
  (let [attrs (->> (dissoc fields :id :type :label) keys
                   (map neo4j/esc-token) (str/join "|"))
        id (:id fields)]
    (->> add-links (into []) (mapcat #(new-links {:id id} %))
         (loom/build-graph []) (#(push-graph! % user s/edit-src)))
    (->> delete-links (mapcat unwind-links)
         (map #(drop-link-query id %)) neo4j/cypher-combined-tx)
    (->> (-> fields (dissoc :id :type :label) 
             (fmap vals) decode-dates (hash-map id) first
             (id-pair-cypher user s/edit-src))
         (concat
          [[(str "MATCH (root) WHERE ID(root) = {id}"
                 " SET root:" (neo4j/esc-token s/norecon))
            {:id id}]
           [(str "MATCH (root) WHERE ID(root) = {id}"
                 " REMOVE root:" (neo4j/esc-token s/recon))
            {:id id}]
           [(str (vals-query attrs) " WITH v MATCH (v)<--(x)"
                 " WITH v, count(x) as n WHERE n = {limit} DETACH DELETE v")
            {:id id :limit 1}]
           [(str (vals-query attrs) " DELETE r")
            {:id id}]])
         neo4j/cypher-combined-tx)
    (new-resp id (s/type-label fields))))

(defn edit-tags! [user {:keys [id label tags]}]
  (neo4j/cypher-query
   [(str "MATCH (root)-[r:" (neo4j/esc-token s/tag)
         "]->(t:" (neo4j/prop-label user s/tag)
         ") WHERE ID(root) = {id} DELETE r")
    {:id id}])
  (-> {{s/tag tags} id} first
      (id-pair-cypher user s/edit-src)
      neo4j/cypher-combined-tx)
  {:id id :label label})
