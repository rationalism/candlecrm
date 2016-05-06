(ns spectra.auth
  (:require [clojure.string :as str]
            [environ.core :refer [env]]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra.google :as google]
            [spectra.index :as index]
            [spectra.insert :as insert]
            [spectra.neo4j :as neo4j]
            [spectra.regex :as regex]
            [spectra.sendgrid :as sendgrid]
            [spectra_cljc.schema :as s]
            [crypto.random :as random]
            [clj-time.core :refer [hours from-now]]
            [buddy.auth.backends.token :refer (jwe-backend)]
            [buddy.hashers :as hashers]
            [buddy.sign.jwe :as jwe]
            [buddy.core.keys :as keys])
  (:import java.net.URI
           [org.passay PasswordData PasswordValidator LengthRule]))

(def encryption {:alg :rsa-oaep :enc :a192gcm})
(def hash-alg {:alg :bcrypt+blake2b-512})
(def pubkey (keys/public-key "pubkey.pem"))
(def privkey (keys/private-key "privkey.pem" (env :privkey-pwd)))
(def exp-hours 3)

(defn hash-pwd [query-map]
  (-> query-map :password (hashers/encrypt hash-alg)))

(defn lookup-user [username]
  (when-let [user (neo4j/get-vertex s/user {s/email-addr username})]
    user))

(defn find-user [email password]
  (when-let [user (lookup-user email)]
    (when (->> "pwd-hash" (.get user) (.asObject)
               (hashers/check password))
      user)))

(defn user-from-token [token]
  (when token
    (try (-> token (jwe/decrypt privkey encryption)
             :user :id neo4j/find-by-id)
         (catch clojure.lang.ExceptionInfo e
           (prn (str "Error: Bad token - " token " - " e))
           nil))))

(defn make-token [user]
  {:token
   (jwe/encrypt {:user {:id (.id user)}
                 :exp (-> exp-hours hours from-now)}
                pubkey encryption)})

(defn user-vertex! [email-addr pwd-hash]
  (->> [(str "CREATE (u:" (neo4j/esc-token s/user) " {"
             (neo4j/esc-token s/email-addr) ": {email}, "
             (neo4j/esc-token s/pwd-hash) ": {pwdhash}, "
             (neo4j/esc-token s/recon-run) ": {reconrun}, "
             (neo4j/esc-token s/index-run) ": {indexrun}})"
             " RETURN u")
        {:email email-addr :pwdhash pwd-hash
         :reconrun false :indexrun false}]
       neo4j/cypher-query first vals first))

(defn user-person [email]
  [{s/type-label s/person s/email-addr email}])

(defn user-person-edge! [person user]
  (neo4j/create-edge! user person s/user-person))

(defn create-user!
  [{:keys [username password] :as user-data}]
  (let [user (user-vertex! username (hashers/encrypt password hash-alg))]
    (-> username user-person
        (insert/push-entities! user)
        first neo4j/find-by-id
        (user-person-edge! user))
    user))

(defn get-username [user]
  (neo4j/get-property user s/email-addr))

(defn list-users []
  (neo4j/get-vertices-class (name s/user)))

(defn delete-entity! [user query-map]
  (let [id (:id query-map)]
    (when (neo4j/node-exists? user id (:type query-map))
      (neo4j/delete-id! id))))

(defn delete-user! [user]
  (when (google/lookup-token user)
    (google/revoke-access-token! user))
  (when (neo4j/get-property user s/index-run)
    (index/drop-constraints! user))
  (index/delete-all! user)
  (->> [s/email-queue s/loaded-top s/loaded-bottom
        s/top-uid s/modified]
       (map #(neo4j/prop-label user %))
       (map neo4j/delete-class!) dorun)
  (neo4j/delete-id! (.id user)))

(defn password-check [password confirm]
  (cond
    (str/blank? password) "Password blank"
    (not= password confirm) "Passwords don't match"
    :else
    (let [validator (PasswordValidator. [(LengthRule. 8 64)])
          result (.validate validator (PasswordData. password))]
      (when-not (.isValid result)
        (str/join " " (.getMessages validator result))))))

(defn new-user-check [username password confirm]
  (cond
    (str/blank? username) "Email address blank"
    (lookup-user username) "This user already exists"
    (not (regex/one-email? username)) "Not a valid email address"
    :else (password-check password confirm)))

(defn pwd-reset-email [token]
  (->> ["Hello. You have requested a password reset on Spectra."
        ""
        "To reset your password, just follow this link:"
        ""
        (str (env :app-domain) "/reset-confirm?token=" token)
        ""
        "This link will expire after 60 minutes."]
       (str/join "\n")))

(defn pwd-reset! [req]
  (let [reset-token (random/base32 30)]
    (when-let [user (-> req :params :username lookup-user)]
      (neo4j/set-property! user s/pwd-reset-token reset-token)
      (neo4j/set-property! user s/modified (dt/now))
      (sendgrid/send-email!
       {s/email-subject "Password reset"
        s/email-body (pwd-reset-email reset-token)
        s/email-from "alyssamvance@gmail.com"
        s/email-to (-> req :params :username)}))))

(defn set-password! [user params]
  (if-let [err-msg (password-check (:password params) (:confirm params))]
    err-msg
    (do (neo4j/delete-property! user s/pwd-reset-token)
        (->> params hash-pwd
             (neo4j/set-property! user s/pwd-hash)))))

(defn login-handler [query-map]
  (when-let [record (find-user (:username query-map)
                               (:password query-map))]
    (make-token record)))
