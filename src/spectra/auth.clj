(ns spectra.auth
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [environ.core :refer [env]]
            [clj-time.core :as clj-time]
            [spectra.recon :as recon]
            [spectra.neo4j :as neo4j]
            [spectra.regex :as regex]
            [spectra.schema :as s]
            [cemerick.friend :as friend]
            (cemerick.friend [workflows :as workflows]
                             [credentials :as creds]))
  (:import java.net.URI
           [org.passay PasswordData PasswordValidator LengthRule]))

(defn create-user!
  [{:keys [username password admin] :as user-data}]
  (let [new-user
        (-> (dissoc user-data :admin)
            (assoc :identity username
                   :password (creds/hash-bcrypt password)))]
   (recon/add-user-graph! new-user)
   new-user))

(defn lookup-user [username]
  (when-let [user (neo4j/get-vertex s/user {s/email-addr username})] user))

(defn get-username [user]
  (neo4j/get-property user s/email-addr))

(defn get-user-pwd [username]
  (let [user (lookup-user username)]
    (if user
      {:username username :password (neo4j/get-property user s/pwd-hash)}
      nil)))

(defn get-user-obj [friend-map]
  (if friend-map
    (lookup-user (:current friend-map))
    nil))

(defn user-from-req [req]
  (get-user-obj (friend/identity req)))

(defn list-users []
  (neo4j/get-vertices-class s/user))

(defn delete-user! [user]
  (neo4j/cypher-query (str "MATCH (a)-[r*1..6]->m WHERE ID(a) = "
                           (:id user)
                           " FOREACH(rel in r | DELETE rel) DELETE a, m")))

(defn auth-user [credentials]
  (let [user (neo4j/get-vertex s/email-addr (:username credentials))
        unauthed [false {:flash "Invalid username or password"}]]
    (if user
      (if (= (:password credentials) (:password user))            
        [true {:user (dissoc user :password)}]                           
        unauthed)
      unauthed)))

(defn new-user-check [username password confirm]
  (cond
    (str/blank? username) "Email address blank"
    (str/blank? password) "Password blank"
    (not= password confirm) "Passwords don't match"
    (lookup-user username) "This user already exists"
    (not (regex/one-email? username)) "Not a valid email address"
    :else
    (let [validator (PasswordValidator. [(LengthRule. 8 64)])
          result (.validate validator (PasswordData. password))]
      (if (.isValid result) nil
          (str/join " " (.getMessages validator result))))))
