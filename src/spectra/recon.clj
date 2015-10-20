(ns spectra.recon
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra.neo4j :as neo4j]
            [spectra.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn user-label [user]
  (str "user_" (:id user)))

(defn create-user! [user]
  (neo4j/create-vertex!
   s/user 
   {s/email-addr (:identity user)
    s/pwd-hash (:password user)}))
  
(defn create-person! [user person]
  (neo4j/create-vertex!
   [s/person (user-label user)]
   (as-> person $
       (select-keys $ [s/name s/email-addr s/phone-num])
       (com/map-values $ (keys $) vector))))
       
(defn add-user-graph! [user]
  (let [new-user (create-user! user)
        new-person (create-person! new-user {s/email (:identity user)})]
    (neo4j/create-edge! new-user new-person s/user-person)))

(defn person-query [user filters]
  (neo4j/cypher-list (str "MATCH (root:" (neo4j/cypher-esc (user-label user))
                          ":" s/person
                          " ) WHERE " filters
                          " RETURN root")))

(defn people-from-props [user props]
  (person-query user (neo4j/cypher-props-any props)))

(defn person-from-props [user props]       
  (person-query user (neo4j/cypher-props-coll props)))

(defn person-from-id [user id]
   (neo4j/cypher-list (str "MATCH (root:" (neo4j/cypher-esc (user-label user))
                            ":" s/person
                            " ) WHERE ID(root)= " id
                            " RETURN root")))

(defn person-from-user [user start limit]
   (neo4j/cypher-list (str "MATCH (root:" (neo4j/cypher-esc (user-label user))
                            ":" s/person
                            ") RETURN root"
                            " ORDER BY root." (neo4j/cypher-esc-token s/name)
                            "[0] SKIP " start " LIMIT " limit)))

(def person-match-attrs
  [s/email-addr s/phone-num s/name])

(defn find-person [attr user person]
  (if (nil? person) nil
      (let [value (person attr)]
        (if (or (nil? value) (empty? value))
          nil
          (first (person-from-props
                  user {attr value}))))))

(defn person-match [user person]
  (p :person-match
     (first
      (conj (->> person-match-attrs
                 (mapv #(find-person % user person))
                 (filterv #(not (nil? %))))
            nil))))

;; For searching emails, in milliseconds
(def sent-tolerance 300000)

(defn lookup-old-email [message person-from]
  (if (or (nil? person-from)
          (empty? person-from)
          (nil? (:id person-from)))
    []
    (neo4j/cypher-list
     (str "MATCH (root:" s/email
          " " (neo4j/cypher-properties
               {s/email-sub-hash
                (com/end-hash (s/email-subject message))})
          ")-[:" (neo4j/cypher-esc-token s/email-from)
          "]->(f) WHERE ID (f)=" (:id person-from)
          " AND (root." (neo4j/cypher-esc-token s/email-sent)
          " < (" (dt/to-ms (s/email-sent message)) " + " sent-tolerance
          ")) AND (root." (neo4j/cypher-esc-token s/email-sent)
          " > (" (dt/to-ms (s/email-sent message)) " - " sent-tolerance 
          ")) RETURN root"))))

(defn recon-person! [old-person new-person]
  (doseq [param [s/name s/email-addr s/phone-num]]
    (if (nil? (new-person param))
      nil (neo4j/recon-property-list! old-person param
                                      (new-person param))))
  (neo4j/refresh-vertex old-person))

(defn add-email-link! [user email link person]
  (p :add-email-link
     (let [old-person (person-match user person)]
       (neo4j/create-edge!
        email
        (if (nil? old-person)
          (p :create-person (create-person! user person))
          (p :recon-person (recon-person! old-person person)))
        link))))

(defn list-entities [entity-class]
  (neo4j/get-vertices-class entity-class))

(defn expand-entity [entity properties]
  (merge
   (map #(assoc {} % (neo4j/get-property entity %))
        properties)))

(defn list-entities-full [entity-class properties]
  (let [entities (list-entities entity-class)]
    (map #(expand-entity % properties) entities)))

(defn lookup-hash [prop-name node]
  (->> node :data prop-name
       (map #(hash-map % node))
       (apply merge)))

(defn lookup-map [prop-name nodes]
  (->> nodes
       (map #(lookup-hash prop-name %))
       (apply merge)))
