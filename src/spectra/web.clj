(ns spectra.web
  (:require [compojure.core :refer [defroutes GET PUT POST DELETE ANY]]
            [compojure.route :as route]
            [ring.util.response :as resp]
            [ring.middleware.defaults :refer :all]
            [ring.middleware.reload :as reload]
            [clojure.java.io :as io]
            [spectra.ajax :as ajax]
            [spectra.auth :as auth]
            [spectra.email :as email]
            [spectra.geocode :as geocode]
            [spectra.google :as google]
            [spectra.neo4j :as neo4j]
            [spectra.corenlp :as nlp]
            [spectra.pages :as pages]
            [spectra.quartz :as quartz]
            [spectra.weka :as weka]
            [cemerick.friend :as friend]
            (cemerick.friend [workflows :as workflows]
                             [credentials :as creds])
            [environ.core :refer [env]]
            [clojure.tools.nrepl.server :as nrepl-server]
            [cider.nrepl :refer (cider-nrepl-handler)])
  (:use [org.httpkit.server :only [run-server]]))

(defn logout [req]
  (assoc (resp/redirect "/") :session nil))

(defn home-with-message [message]
  (assoc (resp/redirect "/") :flash message))

(defn html-wrapper [body]
  {:status 200
   :headers {"Content-Type" "text/html"}
   :body body})

(defroutes app
  (GET "/" req
       (if (auth/user-from-req req)
         (resp/redirect "/app")
         (html-wrapper (pages/login req))))
  ;; TODO: Make this return an error message when credentials are invalid
  (GET "/login" req
       (html-wrapper (pages/login req)))
  (GET "/app" req
       (friend/authenticated
        (html-wrapper (pages/app-page req))))
  (GET "/ajax-test" req
       (html-wrapper (pages/ajax-test req)))
  (GET "/chsk" req
       (ajax/ring-ajax-get-or-ws-handshake req))
  (POST "/chsk" req
        (ajax/ring-ajax-post req))
  (POST "/login-test" req
        (ajax/login! req))
  (POST "/create-account" {{:keys [username password confirm] :as params} :params :as req}
        (if-let [err-msg (auth/new-user-check username password confirm)]
          (home-with-message err-msg)
          (->> [:username :password] (select-keys params)
               auth/create-user! auth/friend-user
               (friend/merge-authentication (resp/redirect "/gmail")))))
  (GET "/logout" req (friend/logout* (logout req)))
  (GET "/gmail" req
       (friend/authenticated
        (html-wrapper (pages/gmail req))))
  (GET "/init-account" req
       (friend/authenticated
        (let [user (auth/user-from-req req)]
          (quartz/wipe-and-insert! user (quartz/default-queue user))
;          (quartz/schedule-contacts! user)
          (home-with-message "Congrats! Authentication successful"))))
  (GET google/callback-url req
       (friend/authenticated
        (let [auth-response (google/response-from-req req)
              user (auth/user-from-req req)]
          (if-let [auth-err (.getError auth-response)]
            (assoc (resp/redirect "/gmail") :flash auth-err)
            (if-let [token (google/get-token! (.getCode auth-response))]
              (do (google/write-token! user token)
                  (resp/redirect "/init-account"))
              (assoc (resp/redirect "/gmail")
                     :flash "Error: Could not get auth token"))))))
  (POST "/load-emails" {{:keys [lower upper] :as params} :params :as req}
        (friend/authenticated
         (if-let [user (auth/user-from-req req)]
           (do (email/insert-email-range!
                user (Integer/parseInt lower) (Integer/parseInt upper))
               (assoc (resp/redirect "/gmail") :flash "Congrats! Emails loaded"))
           (home-with-message "Error: Could not log in"))))
  (route/files "/resources/public/js" {:root "./resources/public/js"})
  (route/resources "/")
  (route/not-found (slurp (io/resource "public/404.html"))))

(defn form-params [req]
  (merge (:form-params req)
         (:multipart-params req)))

(defn csrf-token [req]
  (or (-> req form-params (get "__anti-forgery-token"))
      (-> req :headers (get "x-csrf-token"))
      (-> req :headers (get "x-xsrf-token"))
      (-> req :params :csrf-token)))

(defn middleware-config []
  (-> secure-site-defaults
      (assoc :proxy true)
      (assoc-in [:security :anti-forgery]
                {:read-token csrf-token})))

(defn unauthorized-handler []
  (fn [uri]
    (-> (pages/login-needed (:uri uri))
        resp/response
        (resp/status 401))))

(defn friend-authenticate [app]
  (friend/authenticate app
   {:allow-anon? true
    :login-uri "/login"
    :default-landing-uri "/"
    :unauthorized-handler unauthorized-handler
    :credential-fn (partial creds/bcrypt-credential-fn auth/get-user-pwd)
    :workflows [(workflows/interactive-form)]}))

(def secure-app
  (wrap-defaults (friend-authenticate app) (middleware-config)))

(defn app-init! []
  (neo4j/define-graph!)
  (nlp/load-pipeline!)
  (ajax/start!)
  (geocode/define-context!)
  (quartz/start!)
  (println "Ready to start server")
  (nrepl-server/start-server
   :port 9998
   :handler cider-nrepl-handler))

(defn app-shutdown! []
  (email/close-imap-lookup!))

(defn -main [& args]
  (app-init!)
  (let [handler (if (env :in-dev)
                  (reload/wrap-reload #'secure-app)
                  secure-app)]
    (run-server handler {:port 3000})))
