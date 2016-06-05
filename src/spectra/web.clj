(ns spectra.web
  (:require [compojure.core :refer [defroutes GET PUT POST DELETE ANY]]
            [compojure.route :as route]
            [ns-tracker.core :as ns-tracker]
            [ring.util.response :as resp]
            [ring.middleware.defaults :refer :all]
            [clojure.java.io :as io]
            [spectra_cljc.schema :as s]
            [spectra.common :refer :all]
            [spectra.ajax :as ajax]
            [spectra.auth :as auth]
            [spectra.email :as email]
            [spectra.geocode :as geocode]
            [spectra.google :as google]
            [spectra.mlrecon :as mlrecon]
            [spectra.pages :as pages]
            [spectra.quartz :as quartz]
            [spectra.sendgrid :as sendgrid]
            [environ.core :refer [env]]
            [clojure.tools.nrepl.server :as nrepl-server]
            [cider.nrepl :refer (cider-nrepl-handler)])
  (:use [org.httpkit.server :only [run-server]]))

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
  (GET "/login" req
       (pages/login req))
  (GET "/reset-password" req
       (pages/reset-pwd req))
  (GET "/reset-confirm" req
       (pages/reset-confirm req))
  (GET "/app" req
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
  (POST "/create-account" {{:keys [username password confirm] :as params}
                           :params :as req}
        (pages/create-account params))
  (POST "/login" {{:keys [username password] :as params}
                  :params :as req}
        (pages/login params))
  (GET "/logout" req
       (logout req))
  (GET "/gmail" req
       (pages/gmail req))
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
                {:read-token csrf-token})))

(defn unauthorized-handler []
  (fn [{:keys [uri]}]
    (-> (pages/login-needed uri)
        resp/response (resp/status 401))))

(defn wrap-authentication [handler]
  (fn [request]
    (handler (->> (get-in request [:cookies "token" :value])
                  auth/user-from-token 
                  (assoc request :identity)))))

(def secure-app
  (wrap-defaults
   (wrap-authentication app)
   (middleware-config)))

(defn app-init! []
  (neo4j/graph-connect!)
  (neo4j/reset-session!)
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
