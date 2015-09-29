(ns spectra.pages
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.auth :as auth]
            [spectra.database :as database]
            [spectra.email :as email]
            [spectra.google :as google]
            [spectra.html :as html]
            [cemerick.friend :as friend]))

(defn homepage [req]
  (if-let [user (auth/get-user-obj (friend/identity req))]
    (html/base-template
     (html/user-home (:flash req) (auth/get-username user)))
    (html/base-template
     (html/signup-form (:flash req))
     (html/login-form))))

(defn gmail [req]
  (let [user (auth/get-user-obj (friend/identity req))]
    (html/base-template
     (if (google/lookup-token user)
       (html/gmail-finished (:flash req)
                            (auth/get-username user)
                            (email/message-count
                             (email/fetch-imap-folder user)))
       (html/gmail-setup (:flash req)
                         (auth/get-username user)
                         (google/make-auth-url))))))

(defn login-needed [uri]
  (html/base-template
   (html/login-needed uri)))

(defn show-person [req id]
  (if-let [user (auth/get-user-obj (friend/identity req))]
    (if-let [person (-> user (database/person-from-id id) first)]
      (html/base-template
       (html/show-person (-> person :data :name)
                         (-> person :data)))
      (html/base-template (html/not-found-error)))
    (html/base-template (html/unauthorized-error))))
