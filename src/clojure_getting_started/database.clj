(ns clojure-getting-started.database
  (:require [clojure.java.io :as io]
            [clojure-getting-started.graph :as graph]
            [clojure-getting-started.schema :as schema]
            [environ.core :refer [env]]))

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

(defn create-person! [user props]
  (let [target-graph graph/*graph*
        new-person (graph/create-vertex!
                    target-graph schema/person-type
                    [{:property schema/name-type :value (:name user)}
                     {:property schema/email-address-type :value (:email user)}
                     {:property schema/phone-num-type :value (:phone user)}])]
    (graph/create-edge! target-graph user new-person schema/user-owns-edge)))

;; Composite index query from https://github.com/orientechnologies/orientdb/issues/4862
(defn person-from-property [user property value]
  (let [sql (str
             "SELECT expand( outV() ) FROM "
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
             value
             "') WHERE out = $"
             schema/user-type
             " AND in = $"
             schema/person-type)]
    (prn "This is person-from-property dogs")
    (prn sql)
    (graph/sql-command! graph/*graph* sql)))

(defn add-email-link! [user email link-type person]
  (let [old-people (distinct
                    (concat
                     (person-from-property user schema/email-address-type (:email person))
                     (person-from-property user schema/name-type (:name person))
                     (person-from-property user schema/phone-num-type (:phone person))))
        ;; TODO: add reconciliation here
        new-person (if (zero? (count old-people))
                     (create-person! user person)
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
