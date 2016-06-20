(ns spectra.pages
  (:require [spectra.common :refer :all]
            [spectra.auth :as auth]
            [spectra.google :as google]
            [spectra.html :as html]
            [spectra.neo4j :as neo4j]
            [spectra.quartz :as quartz]
            [spectra_cljc.schema :as s]
            [ring.util.response :as resp]))

(defn home-with-message [message]
  (assoc (resp/redirect "/") :flash message))

(defn html-wrapper [body]
  {:status 200
   :headers {"Content-Type" "text/html"}
   :body body})

(defn token-cookie [url token]
  {:status 302
   :headers {"Location" url}
   :body ""
   :cookies {"token" {:value token :http-only true :secure true
                      :max-age (* 3600 auth/exp-hours)}}})

(defn login-form [{:keys [flash]}]
  (html-wrapper
   (html/base-template
    (html/signup-form flash)
    (html/login-form))))

(defn homepage [{:keys [identity] :as req}]
  (cond (not identity) (login-form req)
        (google/lookup-token identity)
        (resp/redirect "/app")
        :else (resp/redirect "/gmail")))

(defn app-page [{:keys [identity]}]
  (cond (not identity) (home-with-message "Logged out")
        (google/lookup-token identity)
        (html-wrapper (html/app-template))
        :else (resp/redirect "/gmail")))

(defn gmail [{:keys [identity flash]}]
  (html-wrapper
   (html/base-template
    (if (google/lookup-token identity)
      (resp/redirect "/app")
      (html/gmail-setup
       flash (auth/get-username identity)
       (google/make-auth-url))))))

(defn login-needed [uri]
  (html/base-template
   (html/login-needed uri)))

(defn reset-pwd [req]
  (html-wrapper
   (html/base-template
    (html/reset-pwd))))

(defn new-password [user token]
  (html/base-template
   (html/new-password user token)))

(defn google-auth [req]
  (let [auth-response (google/response-from-req req)
        user (:identity req)]
    (if-let [auth-err (.getError auth-response)]
      (assoc (resp/redirect "/gmail") :flash auth-err)
      (if-let [token (google/get-token! (.getCode auth-response))]
        (do (google/write-token! user token)
            (resp/redirect "/init-account"))
        (assoc (resp/redirect "/gmail")
               :flash "Error: Could not get auth token")))))

(defn reset-confirm [{{:keys [token]} :params}]
  (if-let [user (->> token (hash-map s/pwd-reset-token)
                     (neo4j/get-vertex-raw s/user))]
    (html-wrapper (new-password user token))
    (home-with-message "Error: Invalid reset link")))

(defn request-reset [req]
  (auth/pwd-reset! req)
  (home-with-message "Password reset requested."))

(defn set-password [{:keys [params]}]
  (if-let [user (->> params :token (hash-map s/pwd-reset-token)
                     (neo4j/get-vertex-raw s/user))]
    (do (auth/set-password! user params)
        (home-with-message "Password has been reset."))
    (home-with-message "Error: Invalid reset link")))

(defn create-account [params]
  (if-let [err-msg (apply auth/new-user-check
                          ((juxt :username :password :confirm) params))]
    (home-with-message err-msg)
    (->> [:username :password] (select-keys params)
         quartz/create-user! auth/make-token
         :token (token-cookie "/gmail"))))

(defn login [params]
  (if-let [user-token (auth/login-handler params)]
    (token-cookie "/app" (:token user-token))
    (home-with-message "Error: Could not login.")))

(defn init-account [{:keys [identity]}]
  (quartz/add-new-queue! identity)
  (quartz/schedule-contacts! identity)
  (home-with-message "Congrats! Authentication successful"))
