(ns candlecrm.oauth
  (:require [clojure.string :as str]
            [candlecrm.common :refer :all]
            [candlecrm_cljc.schema :as s]
            [candlecrm.environ :refer [env]])
  (:import [com.github.scribejava.core.builder ServiceBuilder]
           [com.github.scribejava.core.model Verb]
           [com.github.scribejava.apis LiveApi]))

(def outlook-scope
  "wl.imap wl.offline_access")

(def outlook-callback
  "/outlookauthcallback")

(defn yahoo-auth-url []
  "https://www.yahoo.com")

(defn outlook-service []
  (-> (ServiceBuilder. )
      (.apiKey (env :outlook-client-id))
      (.apiSecret (env :outlook-client-secret))
      (.scope outlook-scope)
      (.callback (full-callback-url outlook-callback))
      (.build (proxy [LiveApi] []
                (getAccessTokenVerb [] Verb/POST)))))

(defn outlook-auth-url []
  (.getAuthorizationUrl (outlook-service)))

(defn outlook-token [code]
  (-> (outlook-service) (.getAccessToken code)
      .getRefreshToken))

(defn refresh-outlook-token! [refresh-token]
  (-> (outlook-service)
      (.refreshAccessToken refresh-token)
      .getAccessToken))
