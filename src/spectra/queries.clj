(ns spectra.queries
  (:require [clojure.java.io :as io]
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
           " ORDER BY root." (neo4j/cypher-esc-token s/name)
           "[0] SKIP " start " LIMIT " limit)
      neo4j/cypher-list tablify-hits))

(defn emails-from-user [user start limit]
  (-> (str "MATCH (root:" (neo4j/cypher-esc (neo4j/user-label user))
           ":" s/email
           ") RETURN root ORDER BY root." (neo4j/cypher-esc-token s/email-sent)
           " DESC SKIP " start " LIMIT " limit)
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
