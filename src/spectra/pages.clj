(ns spectra.pages
  (:require [spectra.auth :as auth]
            [spectra.email :as email]
            [spectra.google :as google]
            [spectra.html :as html]))

(defn login [req]
  (html/base-template
   (html/signup-form (:flash req))
   (html/login-form)))

(defn app-page [req]
  (html/app-template))

(defn gmail [req]
  (let [user (auth/user-from-token req)]
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

(defn ajax-test [req]
  (html/base-template
   (html/ajax-test)))

(defn reset-pwd [req]
  (html/base-template
   (html/reset-pwd)))

(defn new-password [user token]
  (html/base-template
   (html/new-password user token)))
