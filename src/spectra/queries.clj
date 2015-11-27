(ns spectra.queries
  (:require [clojure.java.io :as io]
            [clojure.set :as set]
            [clojure.string :as str]
            [spectra.auth :as auth]
            [spectra.common :as com]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn first-if-coll [coll]
  (if (coll? coll) (first coll) coll))

(defn first-table-vals [person]
  (->> person
       (map #(hash-map (key %)
                       (first-if-coll (val %))))
       (reduce merge)))

(defn node-attrs [node]
  (merge (:data node)
         (hash-map :id (:id node))))

(defn tablify-hits [hits]
  (->> (map node-attrs hits) 
       (remove #(empty? %))
       (map first-table-vals)))

(defn person-from-user [user start limit]
  (-> (str "MATCH (root:" (neo4j/cypher-esc (neo4j/user-label user))
           ":" s/person
           ") RETURN root"
           " ORDER BY root." (neo4j/cypher-esc-token s/s-name)
           "[0] SKIP " start " LIMIT " limit)
      neo4j/cypher-list tablify-hits))

(defn emails-from-user [user start limit]
  (-> (str "MATCH (root:" (neo4j/cypher-esc (neo4j/user-label user))
           ":" s/email
           ") RETURN root ORDER BY root." (neo4j/cypher-esc-token s/email-sent)
           " DESC SKIP " start " LIMIT " limit)
      neo4j/cypher-list tablify-hits))

(defn emails-linked [user query-map]
  (-> (str "MATCH (root:" (neo4j/cypher-esc (neo4j/user-label user))
           ":" s/email
           ")-[:" (neo4j/cypher-esc-token (:link query-map))
           "]->(p:" s/person
           ") WHERE ID(p)=" (:person-id query-map)
           " RETURN root ORDER BY root." (neo4j/cypher-esc-token s/email-sent)
           " DESC SKIP " (:start query-map) " LIMIT " (:limit query-map))
      neo4j/cypher-list tablify-hits))

(defn emails-with-dates [user start limit]
  (-> (str "MATCH (root:" (neo4j/cypher-esc (neo4j/user-label user))
           ":" s/email
           ")-[:" (neo4j/cypher-esc-token s/email-mentions)
           "]->(d:" s/event
           ") RETURN root ORDER BY root." (neo4j/cypher-esc-token s/email-sent)
           " DESC SKIP " start " LIMIT " limit)
      neo4j/cypher-list tablify-hits))

(defn user-data-public [user]
  (-> user (get :data)
      (dissoc s/pwd-hash) (dissoc s/google-token)))

(defn node-by-id [user id type]
  (-> (neo4j/node-from-id user id type)
      (get :data)))

(defn email-queue []
  (-> (str "MATCH (root:" s/email-queue
           ") RETURN root LIMIT 1")
      neo4j/cypher-list first))

(defn next-email-queue []
  (-> (str "MATCH (root:" s/email-queue
           ")-[:" (neo4j/cypher-esc-token s/has-queue)
           "]->(q:" s/user-queue
           ")<-[:" (neo4j/cypher-esc-token s/has-queue)
           "]-(u:" s/user 
           ") RETURN q, u ORDER BY q." (neo4j/cypher-esc-token s/modified)
           " LIMIT 1")
      neo4j/cypher-query first
      (set/rename-keys {"q" :queue "u" :user})))

(defn all-scanned [user]
  (-> (str "MATCH (root:" s/user
           ")-[:" (neo4j/cypher-esc-token s/scanned)
           "]->(s:" s/time-scanned
           ") WHERE ID(root)= " (:id user)
           " RETURN s")
      neo4j/cypher-list))

(defn scan-overlaps [user time]
  (-> (str "MATCH (root:" s/user
           ")-[:" (neo4j/cypher-esc-token s/scanned)
           "]->(s:" s/time-scanned
           ") WHERE ID(root)= " (:id user)
           " AND s." (neo4j/cypher-esc-token s/start-time)
           " < " time
           " AND s." (neo4j/cypher-esc-token s/stop-time)
           " > " time " RETURN s")
      neo4j/cypher-list))

(defn escape-rels [rels]
  (->> (map neo4j/cypher-esc-token rels)
       (map #(str ":" %))
       (str/join "|")))

(defn reltype-query [user reltype]
  (let [user-label (neo4j/cypher-esc (neo4j/user-label user))]
    (str "MATCH (root:" user-label
         ":" s/person
         ")<-[" (escape-rels [s/email-to s/email-from s/email-mentions])
         "]-(em:" user-label
         ":" s/email
         ")-[:" (neo4j/cypher-esc-token s/email-mentions)
         "]->(ev:" user-label
         ":" reltype)))

(defn people-by-reltype [user reltype start limit]
  (-> (str (reltype-query user reltype)
           ") WITH root, count(ev) as cev RETURN root ORDER BY cev "
           " DESC SKIP " start " LIMIT " limit)
      neo4j/cypher-list tablify-hits))

(defn person-related [user query-map]
  (-> (str (reltype-query user (:reltype query-map))
           ") WHERE ID(root)=" (:person-id query-map)
           " RETURN ev DESC SKIP " (:start query-map)
           " LIMIT " (:limit query-map))
      neo4j/cypher-list tablify-hits))
