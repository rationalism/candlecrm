(ns spectra.queries
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [spectra.auth :as auth]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]))

(defn first-if-coll [coll]
  (if (coll? coll) (first coll) coll))

(defn first-table-vals [person]
  (->> person
       (map #(hash-map (key %)
                       (first-if-coll (val %))))
       (reduce merge)))

(defn node-attrs [node]
  (merge (:data node) (hash-map :id (:id node))))

(defn tablify-hits [hits]
  (->> (map node-attrs hits)
       (remove empty?)
       (map first-table-vals)))

(defn person-from-user [user query-map]
  (-> (str "MATCH (root:" (neo4j/cypher-esc (neo4j/user-label user))
           ":" s/person ")<-[:" (neo4j/cypher-esc-token s/email-to)
           "]-(em:" s/email
           ") WITH root, count(em) as cem RETURN root ORDER BY cem"
           " SKIP " (:start query-map) " LIMIT " (:limit query-map))
      neo4j/cypher-list tablify-hits))

(defn emails-from-user [user query-map]
  (-> (str "MATCH (root:" (neo4j/cypher-esc (neo4j/user-label user))
           ":" s/email
           ") RETURN root ORDER BY root." (neo4j/cypher-esc-token s/email-sent)
           " DESC SKIP " (:start query-map) " LIMIT " (:limit query-map))
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

(defn user-data-public [user query-map]
  (-> user (get :data)
      (dissoc s/pwd-hash) (dissoc s/google-token)))

(defn node-by-id [user query-map]
  (-> user (neo4j/node-from-id (:id query-map) (:type query-map))
      node-attrs))

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
  (-> ["MATCH (root:" s/user
       ")-[:" (neo4j/cypher-esc-token s/scanned)
       "]->(s:" s/time-scanned
       ") WHERE ID(root)= " (:id user)
       " RETURN s"]
      str/join neo4j/cypher-list))

(defn scan-overlaps [user time]
  (-> ["MATCH (root:" s/user
       ")-[:" (neo4j/cypher-esc-token s/scanned)
       "]->(s:" s/time-scanned
       ") WHERE ID(root)= " (:id user)
       " AND s." (neo4j/cypher-esc-token s/start-time)
       " <= " time
       " AND s." (neo4j/cypher-esc-token s/stop-time)
       " >= " time " RETURN s"]
      str/join neo4j/cypher-list))

(defn escape-rels [rels]
  (->> (map neo4j/cypher-esc-token rels)
       (map #(str ":" %))
       (str/join "|")))

(defn rel-query [user]
  (let [user-label (neo4j/cypher-esc (neo4j/user-label user))]
    (str "MATCH (root:" user-label
         ":" s/person
         ")<-[" (escape-rels [s/email-to s/email-from s/email-mentions])
         "]-(em:" user-label
         ":" s/email
         ")-[:" (neo4j/cypher-esc-token s/email-mentions)
         "]->(ev:" user-label)))

(defn people-by-reltype [user query-map]
  (-> (str (rel-query user)
           ":" (:reltype query-map)
           ") WITH root, count(ev) as cev RETURN root ORDER BY cev "
           " DESC SKIP " (:start query-map) " LIMIT " (:limit query-map))
      neo4j/cypher-list tablify-hits))

(defn event-related [user query-map]
  (-> (str (rel-query user)
           ":" s/event
           ") WHERE ID(root)=" (:person-id query-map)
           " RETURN ev SKIP " (:start query-map)
           " LIMIT " (:limit query-map))
      neo4j/cypher-list tablify-hits))

(defn loc-related [user query-map]
  (->> (str (rel-query user)
            ":" s/location
            ")-[:" (neo4j/cypher-esc-token s/has-coord)
            "]->(g:" s/geocode
            ") WHERE ID(root)=" (:person-id query-map)
            " AND NOT (g." (neo4j/cypher-esc-token s/lat)
            " IS NULL) RETURN ev, g SKIP " (:start query-map)
            " LIMIT " (:limit query-map))
       neo4j/cypher-query
       (map #(update % "ev" node-attrs))
       (map #(update % "g" node-attrs))
       (map #(update-in % ["g"] dissoc :id))
       (map vals) (map #(apply merge %))
       distinct))

(defn bare-locations [limit]
  (-> ["MATCH (root:" s/location
       ") WHERE NOT (root)-[:" (neo4j/cypher-esc-token s/has-coord)
       "]->() RETURN root LIMIT " limit]
      str/join neo4j/cypher-list))
