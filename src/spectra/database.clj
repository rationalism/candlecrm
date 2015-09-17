(ns spectra.database
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.graph :as graph]
            [spectra.schema :as schema]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn user-label [user]
  (str "user_" (:identity user)))

(defn create-user! [user]
  (graph/create-vertex!
   schema/user-type 
   {schema/email-address-type (:identity user)
    schema/pwd-hash-type (:password user)}))
  
(defn create-person! [user person]
  (graph/create-vertex!
   [schema/person-type (user-label user)]
   {schema/name-type [(:name person)]
    schema/email-address-type [(:email person)]
    schema/phone-num-type [(:phone person)]}))

(defn add-user-graph! [user]
  (let [new-user (create-user! user)
        new-person (create-person! new-user {:email (:identity user)})]
    (graph/create-edge! new-user new-person schema/user-person-edge)))

(defn person-from-props [user props]
   (graph/cypher-list (str "MATCH (root:" (graph/cypher-esc (user-label user))
                            ":" schema/person-type
                            " ) WHERE " (graph/cypher-props-coll props)
                            " RETURN root")))

(defn lookup-old-people [user person]
  (distinct
   (concat
    (person-from-props user {schema/email-address-type (:email person)})
    (person-from-props user {schema/phone-num-type (:phone person)})
    (person-from-props user {schema/name-type (:name person)}))))

(defn add-email-link! [user email link-type person]
  (let [old-people (lookup-old-people user person)
        ;; TODO: add reconciliation here
        new-person (if (zero? (count old-people))
                     (p :create-person (create-person! user person))
                     (first old-people))]
    (graph/create-edge! email new-person link-type)))

(defn list-entities [entity-class]
  (graph/get-vertices-class entity-class))

(defn expand-entity [entity properties]
  (merge
   (map #(assoc {} % (graph/get-property entity %))
        properties)))

(defn list-entities-full [entity-class properties]
  (let [entities (list-entities entity-class)]
    (map #(expand-entity % properties) entities)))
