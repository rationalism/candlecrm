(ns candlecrm.google
  (:require [candlecrm.environ :refer [env]]
            [clj-http.client :as client]
            [candlecrm.common :refer :all]
            [candlecrm.neo4j :as neo4j]
            [candlecrm_cljc.schema :as s])
  (:import [com.google.api.client.googleapis.auth.oauth2 GoogleAuthorizationCodeRequestUrl
            GoogleAuthorizationCodeTokenRequest GoogleCredential$Builder GoogleTokenResponse]
           [com.google.api.client.auth.oauth2 AuthorizationCodeResponseUrl
            TokenResponseException]
           [com.google.api.client.http.javanet NetHttpTransport]
           [com.google.api.client.json.jackson JacksonFactory]))

(def gmail-read-scope 
  "https://www.googleapis.com/auth/gmail.readonly")

(def contact-read-scope
  "https://www.googleapis.com/auth/contacts.readonly")

(def gmail-full-scope
  "https://mail.google.com/")

(def callback-url
  "/googleauthcallback")

(def revoke-url
  "https://accounts.google.com/o/oauth2/revoke")

(defn make-auth-url []
  (-> (GoogleAuthorizationCodeRequestUrl.
       (env :google-client-id)
       (full-callback-url callback-url)
       [gmail-full-scope contact-read-scope])
      (.setAccessType "offline")
      (.setApprovalPrompt "force")
      .build))

(defn make-response-url [req]
  (str (env :app-domain) (:uri req) "?"
       (:query-string req)))

(defn auth-response [url]
  (AuthorizationCodeResponseUrl. url))

(defn response-from-req [req]
  (auth-response (make-response-url req)))

(defnc get-token! [code]
  (let [token-response
        (.execute
         (GoogleAuthorizationCodeTokenRequest.
          (NetHttpTransport. )
          (JacksonFactory. )
          (env :google-client-id)
          (env :google-client-secret)
          code (full-callback-url callback-url)))]
    (.getRefreshToken token-response)))

(defn build-google-cred! [refresh-token]
  (doto (-> (GoogleCredential$Builder. )
            (.setTransport (NetHttpTransport. ))
            (.setJsonFactory (JacksonFactory. ))
            (.setClientSecrets (env :google-client-id)
                               (env :google-client-secret))
            .build
            (.setFromTokenResponse
             (.setRefreshToken (GoogleTokenResponse. )
                               refresh-token)))
    .refreshToken))

(defn get-access-token! [refresh-token]
  (-> refresh-token build-google-cred! .getAccessToken))

(defn revoke-access-token! [user token]
  (try
    (client/post revoke-url
                 {:form-params {:token token}})
    (catch Exception e
      (throw-warn! (str "Could not revoke token for user: " user)))))
