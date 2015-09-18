(ns spectra.google
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.auth :as auth]
            [spectra.graph :as graph]
            [spectra.schema :as schema]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.google.api.client.googleapis.auth.oauth2 GoogleAuthorizationCodeRequestUrl
            GoogleAuthorizationCodeTokenRequest GoogleCredential$Builder GoogleTokenResponse]
           [com.google.api.client.auth.oauth2 AuthorizationCodeResponseUrl
            TokenResponseException]
           [com.google.api.client.http.javanet NetHttpTransport]
           [com.google.api.client.json.jackson JacksonFactory]
           [java.util Properties]
           [com.sun.mail.imap IMAPSSLStore]
           [javax.mail Session]))

(def gmail-read-scope 
  "https://www.googleapis.com/auth/gmail.readonly")

(def contact-read-scope
  "https://www.googleapis.com/auth/contacts.readonly")

(def gmail-full-scope
  "https://mail.google.com/")

(def callback-url
  "/googleauthcallback")

(defn full-callback-url []
  (str (env :app-domain) callback-url))

(defn make-auth-url []
  (-> (GoogleAuthorizationCodeRequestUrl.
       (env :google-client-id)
       (full-callback-url)
       [gmail-full-scope contact-read-scope])
      (.setAccessType "offline")
      .build))

(defn make-response-url [req]
  (str (env :app-domain)
       (:uri req)
       "?"
       (:query-string req)))

(defn auth-response [url]
  (AuthorizationCodeResponseUrl. url))

(defn get-token! [code]
  (try (let [token-response
             (.execute
              (GoogleAuthorizationCodeTokenRequest.
               (NetHttpTransport. )
               (JacksonFactory. )
               (env :google-client-id)
               (env :google-client-secret)
               code
               (full-callback-url)))]
         (.getRefreshToken token-response))
       (catch TokenResponseException e
         (do (prn "Exception caught when requesting a token")
             (prn "Type of exception is: ")
             (prn (.getMessage e))
             nil))))

(defn lookup-token [user]
  (graph/get-property user schema/google-token-type))

(defn write-token! [user token]
  (graph/set-property! user schema/google-token-type token))

(defn delete-token! [user]
  (graph/delete-property! user schema/google-token-type))

(defn build-google-cred! [refresh-token]
  (doto (-> (GoogleCredential$Builder. )
            (.setTransport (NetHttpTransport. ))
            (.setJsonFactory (JacksonFactory. ))
            (.setClientSecrets (env :google-client-id)
                               (env :google-client-secret))
            .build
            (.setFromTokenResponse
             (-> (GoogleTokenResponse. )
                 (.setRefreshToken refresh-token))))
    .refreshToken))

(defn get-access-token! [refresh-token]
  (.getAccessToken (build-google-cred! refresh-token)))

;; TODO: get the user's email via a Google API
(defn get-imap-store! [access-token email]
  (doto (-> (Session/getInstance
             (doto (Properties. )           
               (.put "mail.imap.ssl.enable" "true")
               (.put "mail.imap.sasl.enable" "true")
               (.put "mail.imap.sasl.mechanisms" "XOAUTH2")
               (.put "mail.imap.auth.login.disable" "true")
               (.put "mail.imap.auth.plain.disable" "true")))
            (.getStore "imap"))
    (.connect "imap.gmail.com" email access-token)))
