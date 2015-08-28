(ns clojure-getting-started.auth
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [environ.core :refer [env]]
            [clj-time.core :as clj-time]
            [clojure-getting-started.database :as database]
            [clojure-getting-started.graph :as graph]
            [clojure-getting-started.regex :as regex]
            [clojure-getting-started.schema :as schema]
            [cemerick.friend :as friend]
            (cemerick.friend [workflows :as workflows]
                             [credentials :as creds]))
  (:import java.net.URI
           [org.passay PasswordData PasswordValidator LengthRule]))

(defn resolve-uri
  [context uri]
  (let [context (if (instance? URI context) context (URI. context))]
    (.resolve context uri)))

(defn context-uri
  "Resolves a [uri] against the :context URI (if found) in the provided
   Ring request.  (Only useful in conjunction with compojure.core/context.)"
  [{:keys [context]} uri]
  (if-let [base (and context (str context "/"))]
    (str (resolve-uri base uri))
    uri))

(defn create-user!
  [{:keys [username password admin] :as user-data}]
  (let [new-user
        (-> (dissoc user-data :admin)
            (assoc :identity username
                   :password (creds/hash-bcrypt password)))]
   (database/add-user-graph! new-user)
   new-user))

(defn lookup-user [username]
  (graph/get-vertex graph/*graph* schema/user-type schema/email-address-type username))

(defn get-user-pwd [username]
  (let [user (lookup-user username)]
    (if user
      {:username username :password (graph/get-property user schema/pwd-hash-type)}
      nil)))

(defn get-user-obj [friend-map]
  (if friend-map
    (lookup-user (:current friend-map))
    nil))

(defn list-users []
  (graph/get-vertices-class graph/*graph* schema/user-type))

(defn delete-user! [username]
  (graph/delete-vertex! graph/*graph* (lookup-user username)))

(defn auth-user [credentials]
  (let [user (graph/get-vertex graph/*graph* schema/email-address-type (:username credentials))
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
