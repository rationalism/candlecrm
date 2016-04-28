(ns spectra.web
  (:require [compojure.core :refer [defroutes GET PUT POST DELETE ANY]]
            [compojure.route :as route]
            [ns-tracker.core :as ns-tracker]
            [ring.util.response :as resp]
            [ring.middleware.defaults :refer :all]
            [clojure.java.io :as io]
            [spectra_cljc.schema :as s]
            [spectra.ajax :as ajax]
            [spectra.auth :as auth]
            [spectra.email :as email]
            [spectra.geocode :as geocode]
            [spectra.google :as google]
            [spectra.mlrecon :as mlrecon]
            [spectra.neo4j :as neo4j]
            [spectra.corenlp :as nlp]
            [spectra.pages :as pages]
            [spectra.quartz :as quartz]
            [spectra.sendgrid :as sendgrid]
            [spectra.weka :as weka]
            [environ.core :refer [env]]
            [clojure.tools.nrepl.server :as nrepl-server]
            [cider.nrepl :refer (cider-nrepl-handler)]
            [buddy.auth.middleware :refer (wrap-authentication)])
  (:use [org.httpkit.server :only [run-server]]))

(defn logout [req]
  (assoc (resp/redirect "/") :session nil))

(defn home-with-message [message]
  (assoc (resp/redirect "/") :flash message))

(defn html-wrapper [body]
  {:status 200
   :headers {"Content-Type" "text/html"}
   :body body})

(defn token-wrapper [token]
  {:status 200
   :body token})

(defroutes app
  (GET "/" req
       (if (:identity req)
         (resp/redirect "/app")
         (html-wrapper (pages/login req))))
  ;; TODO: Make this return an error message when credentials are invalid
  (GET "/login" req
       (html-wrapper (pages/login req)))
  (GET "/reset-password" req
       (html-wrapper (pages/reset-pwd req)))
  (GET "/reset-confirm" req
       (let [token (-> req :params :token)]
         (if-let [user (->> token (hash-map s/pwd-reset-token)
                            (neo4j/get-vertex s/user))]
           (html-wrapper (pages/new-password user token))
           (home-with-message "Error: Invalid reset link"))))
  (GET "/app" req
       (html-wrapper (pages/app-page req)))
  (GET "/ajax-test" req
       (html-wrapper (pages/ajax-test req)))
  (GET "/chsk" req
       (ajax/ring-ajax-get-or-ws-handshake req))
  (POST "/chsk" req
        (ajax/ring-ajax-post req))
  (POST "/login-test" req
        (ajax/login! req))
  (POST "/request-reset" req
        (auth/pwd-reset! req)
        (home-with-message "Password reset requested."))
  (POST "/set-password" req
        (if-let [user (->> req :params :token (hash-map s/pwd-reset-token)
                           (neo4j/get-vertex s/user))]
          (do (auth/set-password! user (:params req))
              (home-with-message "Password has been reset."))
          (home-with-message "Error: Invalid reset link")))
  (POST "/create-account" {{:keys [username password confirm] :as params} :params :as req}
        (if-let [err-msg (auth/new-user-check username password confirm)]
          (home-with-message err-msg)
          (->> [:username :password] (select-keys params)
               auth/create-user! auth/make-token
               (assoc (:session req) :identity)
               (assoc (resp/redirect "/gmail") :session))))
  (POST "/login" {{:keys [username password] :as params} :params :as req}
        (when-let [user-token (auth/login-handler params)]
          (->> user-token (assoc (:session req) :identity)
               (assoc (resp/redirect "/") :session))))
  (GET "/logout" req (logout req))
  (GET "/gmail" req
       (html-wrapper (pages/gmail req)))
  (GET "/init-account" req
       (let [user (-> req auth/user-from-req :data s/email-addr
                      auth/lookup-user)]
         (quartz/add-new-queue! user)
         (quartz/schedule-contacts! user)
         (home-with-message "Congrats! Authentication successful")))
  (GET google/callback-url req
       (let [auth-response (google/response-from-req req)
             user (auth/user-from-req req)]
         (if-let [auth-err (.getError auth-response)]
           (assoc (resp/redirect "/gmail") :flash auth-err)
           (if-let [token (google/get-token! (.getCode auth-response))]
             (do (google/write-token! user token)
                 (resp/redirect "/init-account"))
             (assoc (resp/redirect "/gmail")
                    :flash "Error: Could not get auth token")))))
  (POST "/load-emails" {{:keys [lower upper] :as params} :params :as req}
        (if-let [user (auth/user-from-req req)]
          (do (email/insert-raw-range!
               user (Integer/parseInt lower) (Integer/parseInt upper))
              (assoc (resp/redirect "/gmail") :flash "Congrats! Emails loaded"))
          (home-with-message "Error: Could not log in")))
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

(def secure-app
  (wrap-defaults
   (wrap-authentication app (auth/backend))
   (middleware-config)))

(defn app-init! []
  (sendgrid/init-server!)
  (email/make-parse-pool!)
  (email/make-nlp-pool!)
  (ajax/start!)
  (mlrecon/load-models!)
  (mlrecon/load-thresholds!)
  (geocode/define-context!)
  (quartz/start!)
  (println "Ready to start server")
  (nrepl-server/start-server
   :port 9998
   :handler cider-nrepl-handler))

(defn app-shutdown! []
  (email/close-imap-lookup!))

;; Modified version of https://github.com/ring-clojure/ring/
;; blob/master/ring-devel/src/ring/middleware/reload.clj
(defn wrap-reload
  {:arglists '([handler] [handler options])}
  [handler & [options]]
  (let [source-dirs (:dirs options ["src"])
        modified-namespaces (ns-tracker/ns-tracker source-dirs)]
    (fn [request]
      (doseq [ns-sym (modified-namespaces)]
        (require ns-sym :reload)
        (when (= (name ns-sym) "spectra.ajax")
          (ajax/restart-ajax!)))
      (handler request))))

(defn -main [& args]
  (app-init!)
  (let [handler (if (env :in-dev)
                  (wrap-reload #'secure-app)
                  secure-app)]
    (run-server handler {:port 3000})))
