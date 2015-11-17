(ns spectra.web
  (:require [compojure.core :refer [defroutes GET PUT POST DELETE ANY]]
            [compojure.handler :refer [site]]
            [compojure.route :as route]
            [ring.util.response :as resp]
            [ring.middleware.defaults :refer :all]
            [ring.middleware.reload :as reload]
            [clojure.java.io :as io]
            [spectra.ajax :as ajax]
            [spectra.auth :as auth]
            [spectra.contacts :as contacts]
            [spectra.email :as email]
            [spectra.google :as google]
            [spectra.neo4j :as neo4j]
            [spectra.corenlp :as nlp]
            [spectra.pages :as pages]
            [spectra.quartz :as quartz]
            [spectra_cljc.schema :as s]
            [cemerick.friend :as friend]
            (cemerick.friend [workflows :as workflows]
                             [credentials :as creds])
            [environ.core :refer [env]]
            [clojure.tools.nrepl.server :as nrepl-server]
            [cider.nrepl :refer (cider-nrepl-handler)])
  (:use [org.httpkit.server :only [run-server]]))

(defn unauthorized-handler [req msg]
  {:status 401
   :body {:status :error
          :message (or msg "User not authorized")}})

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
       (if-let [user (auth/user-from-req req)]
         (resp/redirect "/app")
         (html-wrapper (pages/login req))))
  ;; TODO: Make this return an error message when credentials are invalid
  (GET "/login" req
       (html-wrapper (pages/login req)))
  (GET "/app" req
       (friend/authenticated
        (html-wrapper (pages/homepage req))))
  (GET "/ajax-test" req
       (html-wrapper (pages/ajax-test req)))
  (GET "/chsk" req
       (prn "received get chsk")
       (ajax/ring-ajax-get-or-ws-handshake req))
  (POST "/chsk" req
       (prn "received post chsk")
        (ajax/ring-ajax-post req))
  (POST "/login-test" req
        (ajax/login! req))
  (POST "/create-account" {{:keys [username password confirm] :as params} :params :as req}
        (if-let [err-msg (auth/new-user-check username password confirm)]
          (home-with-message err-msg)
          (let [user (auth/create-user! (select-keys params [:username :password]))]
            (friend/merge-authentication (resp/redirect "/gmail") user))))
  (GET "/logout" req (friend/logout* (logout req)))
  ;(GET "/gmail" req
  ;     (friend/authenticated
  ;      (html-wrapper (pages/gmail req))))
  (GET "/init-account" req
       (friend/authenticated
        (let [user (auth/user-from-req req)]
          (contacts/load-all-contacts! user)
          (email/insert-first-n! user 5)
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
  ;(GET "/person/:id" [id :as req]
  ;     (friend/authenticated
  ;      (html-wrapper (pages/show-node req id s/person))))
  ;(GET "/email/:id" [id :as req]
  ;     (friend/authenticated
  ;      (html-wrapper (pages/show-node req id s/email))))
  ;(GET "/organization/:id" [id :as req]
  ;     (friend/authenticated
  ;      (html-wrapper (pages/show-node req id s/organization))))
  ;(GET "/location/:id" [id :as req]
  ;     (friend/authenticated
  ;      (html-wrapper (pages/show-node req id s/location))))
  ;(GET "/event/:id" [id :as req]
  ;     (friend/authenticated
  ;      (html-wrapper (pages/show-node req id s/event))))
  ;(GET "/finance/:id" [id :as req]
  ;     (friend/authenticated
  ;      (html-wrapper (pages/show-node req id s/money))))

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
  (-> app
      friend-authenticate
      (wrap-defaults (middleware-config))))

(defn app-init! []
  (neo4j/define-graph!)
  (nlp/load-pipeline!)
  (ajax/start!)
  (quartz/start!)
  (email/define-imap-lookup)
  (println "Ready to start server")
  (nrepl-server/start-server
   :port 9998
   :handler cider-nrepl-handler))

(defn app-shutdown! []
  (email/close-imap-lookup!))

(defn -main [& args]
  (app-init!)
  (let [handler (if (env :in-dev)
                  (reload/wrap-reload (site #'secure-app)) 
                  (site secure-app))]
    (run-server handler {:port 3000})))
