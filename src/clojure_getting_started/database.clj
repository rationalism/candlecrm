(ns clojure-getting-started.database
  (:require [clojure.java.io :as io]
            [clojure-getting-started.email :as email]
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
    (graph/create-edge! target-graph user new-person schema/person-owns-edge)))

(defn add-email-link! [user email link-type person]
  (let [old-people (distinct
                    (concat
                     (person-from-property user schema/email-address-type (:email person))
                     (person-from-property user schema/name-type (:name person))
                     (person-from-property user schema/phone-num-type (:phone person))))
        new-person (if (zero? (count old-people))
                     (create-person! user person)
                     (first old-people))]
    (graph/create-edge! target-graph email new-person link-type)))

(defn insert-email! [user email]
  (let [target-graph graph/*graph*
        email-link! (partial add-email-link! user email)
        parsed-email (email/full-parse email)
        new-email (graph/create-vertex!
                    target-graph schema/email-type
                    [{:property schema/email-received :value (:time-received parsed-email)}
                     {:property schema/email-sent :value (:time-sent parsed-email)}
                     {:property schema/email-subject :value (:subject parsed-email)}
                     {:property schema/email-body :value (:body parsed-email)}])]
    (map (partial email-link! schema/email-to-edge) (:to parsed-email))
    (map (partial email-link! schema/email-cc-edge) (:cc parsed-email))
    (map (partial email-link! schema/email-bcc-edge) (:bcc parsed-email))
    (map (partial email-link! schema/email-from-edge) (:from parsed-email))
    (map (partial email-link! schema/email-replyto-edge) (:replyto parsed-email))
    (map (partial email-link! schema/email-mentions-edge) (:people-mentioned parsed-email))))

;; Composite index query from https://github.com/orientechnologies/orientdb/issues/4862
(defn person-from-property [user property value]
  (graph/sql-command!
   graph/*graph*
   (str "SELECT expand( outV() ) FROM "
        schema/user-owns-edge
        " LET "
        schema/user-type
        " = SELECT FROM "
        schema/user-type
        " WHERE "
        schema/email-address-type
        " = '"
        (get-username user)
        "' LET "
        schema/person-type
        " = SELECT FROM "
        schema/person-type
        " WHERE "
        property
        " = '"
        value
        "' WHERE out = $"
        schema/user-type
        " AND in = $"
        schema/person-type)))
