(ns clojure-getting-started.database
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [clojure-getting-started.graph :as graph]
            [clojure-getting-started.schema :as schema]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn add-user-graph! [user]
  (let [target-graph graph/*graph*
        new-user (graph/create-vertex!
                  target-graph schema/user-type 
                  [{:property schema/email-address-type :value (:identity user)}
                   {:property schema/pwd-hash-type :value (:password user)}])
        new-person (graph/create-vertex!
                    target-graph schema/person-type
                    [{:property schema/email-address-type :value (:identity user)}])]
    (graph/create-edge! target-graph new-user new-person schema/user-person-edge)
    (graph/create-edge! target-graph new-user new-person schema/user-owns-edge)))

(defn get-username [user]
  (graph/get-property user schema/email-address-type))

(defn create-person! [user person]
  (let [target-graph graph/*graph*
        new-person (graph/create-vertex!
                    target-graph schema/person-type
                    [{:property schema/name-type :value (:name person)}
                     {:property schema/email-address-type :value (:email person)}
                     {:property schema/phone-num-type :value (:phone person)}])]
    (graph/create-edge! target-graph user new-person schema/user-owns-edge)
    new-person))

;; Composite index query from https://github.com/orientechnologies/orientdb/issues/4862
(defn person-from-property [user property value]
  (if (graph/no-value? value)
    []
    (let [sql (str
               "SELECT expand( inV() ) FROM "
               schema/user-owns-edge
               " LET "
               schema/user-type
               " = (SELECT FROM "
               schema/user-type
               " WHERE "
               schema/email-address-type
               " = '"
               (get-username user)
               "'), "
               schema/person-type
               " = (SELECT FROM "
               schema/person-type
               " WHERE "
               property
               " = '"
               (str/escape value {\' "", \" ""})
               "') WHERE out in $"
               schema/user-type
               " AND in in $"
               schema/person-type)]
      (p :person-lookup (graph/sql-command! graph/*graph* sql)))))

(defn add-email-link! [user email link-type person]
  (let [old-people (distinct
                    (concat
                     (person-from-property user schema/email-address-type (:email person))
                     (person-from-property user schema/name-type (:name person))
                     (person-from-property user schema/phone-num-type (:phone person))))
        ;; TODO: add reconciliation here
        new-person (if (zero? (count old-people))
                     (p :create-person (create-person! user person))
                     (first old-people))]
    (graph/create-edge! graph/*graph* email new-person link-type)))

(defn list-entities [entity-class]
  (graph/get-vertices-class graph/*graph* entity-class))

(defn expand-entity [entity properties]
  (merge
   (map #(assoc {} % (graph/get-property entity %))
        properties)))

(defn list-entities-full [entity-class properties]
  (let [entities (list-entities entity-class)]
    (map #(expand-entity % properties) entities)))
