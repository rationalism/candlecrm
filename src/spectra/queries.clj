(ns spectra.queries
  (:require [clojure.java.io :as io]
            [spectra.common :as com]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn person-from-user [user start limit]
  (neo4j/cypher-list (str "MATCH (root:" (neo4j/cypher-esc (neo4j/user-label user))
                          ":" s/person
                          ") RETURN root"
                          " ORDER BY root." (neo4j/cypher-esc-token s/name)
                          "[0] SKIP " start " LIMIT " limit)))

(defn emails-from-user [user start limit]
  (neo4j/cypher-list (str "MATCH (root:" (neo4j/cypher-esc (neo4j/user-label user))
                          ":" s/email
                          ") RETURN root ORDER BY root." (neo4j/cypher-esc-token s/email-sent)
                          " DESC SKIP " start " LIMIT " limit)))

(defn emails-with-dates [user start limit]
  (neo4j/cypher-list (str "MATCH (root:" (neo4j/cypher-esc (neo4j/user-label user))
                          ":" s/email
                          ")-[:" (neo4j/cypher-esc-token s/email-mentions)
                          "]->(d:" s/event
                          ") RETURN root ORDER BY root." (neo4j/cypher-esc-token s/email-sent)
                          " DESC SKIP " start " LIMIT " limit)))

(defn user-data-public [user]
  (-> user (get :data)
      (dissoc s/pwd-hash) (dissoc s/google-token)))
