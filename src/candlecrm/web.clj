(ns candlecrm.web
  (:require [compojure.core :refer [defroutes GET PUT POST DELETE ANY]]
            [compojure.route :as route]
            [ns-tracker.core :as ns-tracker]
            [ring.util.response :as resp]
            [ring.middleware.defaults :refer :all]
            [clojure.java.io :as io]
            [clojure.edn :as edn]
            [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm.common :refer :all]
            [candlecrm.ajax :as ajax]
            [candlecrm.auth :as auth]
            [candlecrm.datetime :as dt]
            [candlecrm.email :as email]
            [candlecrm.geocode :as geocode]
            [candlecrm.google :as google]
            [candlecrm.imap :as imap]
            [candlecrm.mlrecon :as mlrecon]
            [candlecrm.neo4j :as neo4j]
            [candlecrm.pages :as pages]
            [candlecrm.quartz :as quartz]
            [candlecrm.sendgrid :as sendgrid]
            [candlecrm.environ :as environ]
            [clojure.tools.nrepl.server :as nrepl-server]
            [cider.nrepl :refer (cider-nrepl-handler)])
  (:use [org.httpkit.server :only [run-server]])
  (:gen-class))

(defn logout [req]
  {:status 302
   :headers {"Location" "/"}
   :body ""
   :cookies {"token" {:value "" :http-only true
                      :secure true :max-age 0}}})

(defroutes app
  (GET "/" req
       (pages/homepage req))
  ;; TODO: Make this return an error message when credentials are invalid
  (GET "/contact.html" req
       (pages/contact req))
  (GET "/signup.html" req
       (pages/invite req))
  (GET "/login.html" req
       (pages/login-page req))
  (GET "/faq.html" req
       (pages/faq req))
  (GET "/YZm6sB.html" req
       (pages/signup-page req))
  (GET "/login" req
       (pages/login req))
  (GET "/reset-password.html" req
       (pages/reset-pwd req))
  (GET "/reset-confirm" req
       (pages/reset-confirm req))
  (GET "/app" req
       (pages/app-page req))
  (GET "/app/*" req
       (pages/app-page req))
  (GET "/chsk" req
       (ajax/ring-ajax-get-or-ws-handshake req))
  (POST "/chsk" req
        (ajax/ring-ajax-post req))
  (POST "/login-test" req
        (ajax/login! req))
  (POST "/request-reset" req
        (pages/request-reset req))
  (POST "/set-password" req
        (pages/set-password req))
  (POST "/request-invite" {{:keys [name email] :as params}
                           :params :as req}
        (pages/request-invite params))
  (POST "/create-account" {{:keys [username password confirm code] :as params}
                           :params :as req}
        (pages/create-account params))
  (POST "/login" {{:keys [username password] :as params}
                  :params :as req}
        (pages/login params))
  (GET "/logout" req
       (logout req))
  (GET "/switch" req
       (pages/switch-user req))
  (GET "/email" req
       (pages/email req))
  (GET "/init-account" req
       (pages/init-account req))
  (GET google/callback-url req
       (pages/google-auth req))
  (route/files "/resources/public/js" {:root "./resources/public/js"})
  (route/resources "/")
  (route/not-found (slurp (io/resource "public/404.html"))))

(defn form-params [req]
  (merge (:form-params req) (:multipart-params req)))

(defn csrf-token [{:keys [headers params] :as req}]
  (or (-> req form-params (get "__anti-forgery-token"))
      (get headers "x-csrf-token")
      (get headers "x-xsrf-token")
      (:csrf-token params)))

(defn middleware-config []
  (-> secure-site-defaults
      (assoc :proxy true)
      (assoc-in [:security :anti-forgery]
                {:read-token csrf-token
                 :error-handler pages/homepage})))

(defn unauthorized-handler []
  (fn [{:keys [uri]}]
    (-> (pages/login-needed uri)
        resp/response (resp/status 401))))

(defn wrap-neo4j-thread [handler]
  (fn [request]
    (neo4j/thread-wrap (handler request))))

(defn wrap-authentication [handler]
  (fn [request]
    (handler (->> (get-in request [:cookies "token" :value])
                  auth/user-from-token 
                  (assoc request :identity)))))

(def secure-app
  (-> app wrap-authentication
      wrap-neo4j-thread
      (wrap-defaults (middleware-config))))

(defn app-init! []
  (environ/set-env!)
  (log-setup!)
  (auth/load-keys!)
  (neo4j/graph-connect!)
  (neo4j/reset-session!)
  (sendgrid/init-server!)
  (dt/load-date-model!)
  (imap/make-parse-pool!)
  (email/make-nlp-pool!)
  (ajax/start-router!)
  (mlrecon/load-models!)
  (mlrecon/load-thresholds!)
  (geocode/define-context!)
  (quartz/reset-recon-run!)
  (quartz/start!)
  (throw-info! "Ready to start server")
  (nrepl-server/start-server
   :port 9998
   :handler cider-nrepl-handler))

(defn app-shutdown! []
  (imap/close-imap-lookup!))

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
        (when (= (name ns-sym) "candlecrm.ajax")
          (ajax/restart-ajax!)))
      (handler request))))

(defn set-property! [[k v]]
  (let [system (System/getProperties)]
    (.setProperty system (-> k name str/lower-case
                             (str/replace "-" ".")) v)))

(defn set-properties! []
  (when-let [prop-file (environ/env :prop-file)]
    (let [system (System/getProperties)]
      (->> prop-file slurp edn/read-string vals first
           (into []) (mapv set-property!)))))

(defn -main [& args]
  (set-properties!) (app-init!)
  (let [handler (if (in-dev?)
                  (wrap-reload #'secure-app)
                  secure-app)]
    (run-server handler {:port 3000})))
