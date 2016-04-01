(ns spectra.auth
  (:require [clojure.string :as str]
            [spectra.google :as google]
            [spectra.index :as index]
            [spectra.insert :as insert]
            [spectra.neo4j :as neo4j]
            [spectra.regex :as regex]
            [spectra.sendgrid :as sendgrid]
            [spectra_cljc.schema :as s]
            [cemerick.friend :as friend]
            (cemerick.friend [credentials :as creds]))
  (:import java.net.URI
           [org.passay PasswordData PasswordValidator LengthRule]))

(defn user-vertex! [email-addr pwd-hash]
  (neo4j/create-vertex! s/user 
   {s/email-addr email-addr
    s/pwd-hash pwd-hash}))

(defn friend-user [u]
  {:identity (get-in u (:data s/email-addr))})

(defn user-person [email]
  [{s/type-label s/person s/email-addr email}])

(defn user-person-edge! [person user]
  (neo4j/create-edge! user person s/user-person))

(defn create-user!
  [{:keys [username password] :as user-data}]
  (let [user (user-vertex! username (creds/hash-bcrypt password))]
    (-> username user-person
        (insert/push-entities! user)
        first neo4j/find-by-id
        (user-person-edge! user))
    (index/make-constraints! user)
    user))

(defn lookup-user [username]
  (when-let [user (neo4j/get-vertex s/user {s/email-addr username})]
    user))

(defn get-username [user]
  (neo4j/get-property user s/email-addr))

(defn get-user-pwd [username]
  (let [user (lookup-user username)]
    (when user
      {:username username
       :password (neo4j/get-property user s/pwd-hash)})))

(defn get-user-obj [friend-map]
  (when friend-map
    (:current friend-map)))

(defn user-from-req [req]
  (let [u (get-user-obj (friend/identity req))]
    (if (string? u) (lookup-user u) u)))

(defn list-users []
  (neo4j/get-vertices-class (name s/user)))

(defn delete-entity! [user query-map]
  (let [id (:id query-map)]
    (when (neo4j/node-exists? user id (:type query-map))
      (neo4j/delete-id! id))))

(defn delete-user! [user]
  (when (google/lookup-token user)
    (google/revoke-access-token! user))
  (index/delete-all! user)
  (index/drop-constraints! user)
  (->> [s/email-queue s/loaded-top s/loaded-bottom
        s/top-uid s/modified]
       (map #(neo4j/prop-label user %))
       (map neo4j/delete-class!) dorun)
  (neo4j/delete-id! (:id user)))

(defn delete-req! [user query-map]
  (when (= "yes" (:confirmed query-map))
    (delete-user! user)))

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
      (when-not (.isValid result)
        (str/join " " (.getMessages validator result))))))

(defn pwd-reset! [req]
  (println "A reset has been requested.")
  (println "Here is the request:")
  (println req))
