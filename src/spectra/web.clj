(ns spectra.web
  (:require [compojure.core :refer [defroutes GET PUT POST DELETE ANY]]
            [compojure.handler :refer [site]]
            [compojure.route :as route]
            [ring.util.response :as resp]
            [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.auth :as auth]
            [spectra.email :as email]
            [spectra.google :as google]
            [spectra.graph :as graph]
            [spectra.corenlp :as nlp]
            [spectra.pages :as pages]
            [ring.adapter.jetty :as jetty]
            [ring.middleware.defaults :refer :all]
            [cemerick.friend :as friend]
            (cemerick.friend [workflows :as workflows]
                             [credentials :as creds])
            [environ.core :refer [env]]))

(defn unauthorized-handler [req msg]
  {:status 401
   :body {:status :error
          :message (or msg "User not authorized")}})

(defn logout [req]
  (assoc (resp/redirect "/") :session nil))

(defn home-with-message [message]
  (assoc (resp/redirect "/")
         :flash message))

(defn html-wrapper [body]
  {:status 200
   :headers {"Content-Type" "text/html"}
   :body body})

(defroutes app
  (GET "/" req
       (html-wrapper (pages/homepage req)))
  ;; TODO: Make this return an error message when credentials are invalid
  (GET "/login" req
       (html-wrapper (pages/homepage req)))
  (POST "/create-account" {{:keys [username password confirm] :as params} :params :as req}
        (if-let [err-msg (auth/new-user-check username password confirm)]
          (home-with-message err-msg)
          (let [user (auth/create-user! (select-keys params [:username :password]))]
            (friend/merge-authentication (home-with-message nil) user))))
  (GET "/logout" req (friend/logout* (logout req)))
  (GET "/gmail" req
       (friend/authenticated
        (html-wrapper (pages/gmail req))))
  (GET google/callback-url req
       (friend/authenticated
        (let [auth-response
              (google/auth-response
               (google/make-response-url req))]
          (if-let [auth-err (.getError auth-response)]
            (assoc (resp/redirect "/gmail") :flash auth-err)
            (if-let [token (google/get-token! (.getCode auth-response))]
              (do (let [user (auth/get-user-obj (friend/identity req))]
                    (google/write-token! user token))
                  (assoc (resp/redirect "/gmail")
                         :flash "Congrats! Authentication successful"))
              (assoc (resp/redirect "/gmail")
                     :flash "Error: Could not get auth token"))))))
  (POST "/load-emails" {{:keys [lower upper] :as params} :params :as req}
        (friend/authenticated
         (if-let [user (auth/get-user-obj (friend/identity req))]
           (do (email/insert-email-range!
                user (Integer/parseInt lower) (Integer/parseInt upper))
               (assoc (resp/redirect "/gmail") :flash "Congrats! Emails loaded"))
           (assoc (resp/redirect "/") :flash "Error: Could not log in"))))
  (route/resources "/")
  (route/not-found (slurp (io/resource "public/404.html"))))

(def secure-app
  (-> app
      (friend/authenticate
              {:allow-anon? true
               :login-uri "/login"
               :default-landing-uri "/"
               :unauthorized-handler #(-> (pages/login-needed (:uri %))
                                          resp/response
                                          (resp/status 401))
               :credential-fn (partial creds/bcrypt-credential-fn auth/get-user-pwd)
               :workflows [(workflows/interactive-form)]})
      (wrap-defaults (assoc secure-site-defaults
                            :proxy true))))

(defn app-init []
  (graph/define-graph!)
  (nlp/load-pipeline!)
  (email/define-imap-lookup))

(defn app-shutdown []
  (email/close-imap-lookup!))

