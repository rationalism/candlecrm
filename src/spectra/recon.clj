(ns spectra.recon
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra.neo4j :as neo4j]
            [spectra.schema :as schema]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn user-label [user]
  (str "user_" (:id user)))

(defn create-user! [user]
  (neo4j/create-vertex!
   schema/user-type 
   {schema/email-address-type (:identity user)
    schema/pwd-hash-type (:password user)}))
  
(defn create-person! [user person]
  (neo4j/create-vertex!
   [schema/person-type (user-label user)]
   {schema/name-type [(:name person)]
    schema/email-address-type [(:email person)]
    schema/phone-num-type [(:phone person)]}))

(defn add-user-graph! [user]
  (let [new-user (create-user! user)
        new-person (create-person! new-user {:email (:identity user)})]
    (neo4j/create-edge! new-user new-person schema/user-person-edge)))

(defn person-from-props [user props]
   (neo4j/cypher-list (str "MATCH (root:" (neo4j/cypher-esc (user-label user))
                            ":" schema/person-type
                            " ) WHERE " (neo4j/cypher-props-coll props)
                            " RETURN root")))

(defn person-from-id [user id]
   (neo4j/cypher-list (str "MATCH (root:" (neo4j/cypher-esc (user-label user))
                            ":" schema/person-type
                            " ) WHERE ID(root)= " id
                            " RETURN root")))

(defn person-from-user [user]
   (neo4j/cypher-list (str "MATCH (root:" (neo4j/cypher-esc (user-label user))
                            ":" schema/person-type
                            " ) RETURN root")))

(def person-match-attrs
  [[:email schema/email-address-type]
   [:phone schema/phone-num-type]
   [:name schema/name-type]])

(defn find-person [attr user person]
  (if (nil? person) nil
      (let [value (person (nth attr 0))]
        (if (or (nil? value) (empty? value))
          nil
          (first (person-from-props
                  user {(nth attr 1) value}))))))

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
     (str "MATCH (root:" schema/email-type
          " " (neo4j/cypher-properties
               {schema/email-sub-hash
                (com/end-hash (:subject message))})
          ")-[:" (neo4j/cypher-esc-token schema/email-from-edge)
          "]->(f) WHERE ID (f)=" (:id person-from)
          " AND (root." (neo4j/cypher-esc-token schema/email-sent)
          " < (" (dt/to-ms (:time-sent message)) " + " sent-tolerance
          ")) AND (root." (neo4j/cypher-esc-token schema/email-sent)
          " > (" (dt/to-ms (:time-sent message)) " - " sent-tolerance 
          ")) RETURN root"))))

(defn recon-person! [old-person new-person]
  (doseq [param {:name schema/name-type
                 :email schema/email-address-type
                 :phone schema/phone-num-type}]
    (if (nil? (new-person (key param)))
      nil (neo4j/recon-property-list! old-person (val param)
                                      (new-person (key param)))))
  (neo4j/refresh-vertex old-person))

(defn add-email-link! [user email link-type person]
  (p :add-email-link
     (let [old-person (person-match user person)]
       (neo4j/create-edge!
        email
        (if (nil? old-person)
          (p :create-person (create-person! user person))
          (p :recon-person (recon-person! old-person person)))
        link-type))))

(defn list-entities [entity-class]
  (neo4j/get-vertices-class entity-class))

(defn expand-entity [entity properties]
  (merge
   (map #(assoc {} % (neo4j/get-property entity %))
        properties)))

(defn list-entities-full [entity-class properties]
  (let [entities (list-entities entity-class)]
    (map #(expand-entity % properties) entities)))
