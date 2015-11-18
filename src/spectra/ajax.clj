(ns spectra.ajax
  (:require
   [spectra.auth       :as auth]
   [spectra.queries    :as queries]
   [clojure.string     :as str]
   [ring.middleware.defaults]
   [compojure.core     :as comp :refer (defroutes GET POST)]
   [compojure.route    :as route]
   [hiccup.core        :as hiccup]
   [clojure.core.async :as async  :refer (<! <!! >! >!! put! chan go go-loop)]
   [taoensso.encore    :as encore :refer ()]
   [taoensso.timbre    :as timbre :refer (tracef debugf infof warnf errorf)]
   [taoensso.sente     :as sente]
   [org.httpkit.server :as http-kit]
   [taoensso.sente.server-adapters.http-kit :refer (sente-web-server-adapter)]))
;; Optional, for Transit encoding:
;;[taoensso.sente.packers.transit :as sente-transit]

;;;; Logging config
; (sente/set-logging-level! :trace) ; Uncomment for more logging

;;;; Packer (client<->server serializtion format) config

;; (def packer (sente-transit/get-flexi-packer :edn)) ; Experimental, needs Transit dep
(def packer :edn) ; Default packer (no need for Transit dep)

;;;; Server-side setup

(defn make-channel-socket! []
  (sente/make-channel-socket!
   sente-web-server-adapter
   {:packer packer
    :user-id-fn (fn [ring-req] (:client-id ring-req))}))

(let [{:keys [ch-recv send-fn ajax-post-fn ajax-get-or-ws-handshake-fn
              connected-uids]}
      (make-channel-socket!)]
  (def ring-ajax-post                ajax-post-fn)
  (def ring-ajax-get-or-ws-handshake ajax-get-or-ws-handshake-fn)
  (def ch-chsk                       ch-recv) ; ChannelSocket's receive channel
  (def chsk-send!                    send-fn) ; ChannelSocket's send API fn
  (def connected-uids                connected-uids)) ; Watchable, read-only atom

(defn login!
  "Here's where you'll add your server-side login/auth procedure (Friend, etc.).
  In our simplified example we'll just always successfully authenticate the user
  with whatever user-id they provided in the auth request."
  [ring-request]
  (let [{:keys [session params]} ring-request
        {:keys [user-id]} params]
    (debugf "Login request: %s" params)
    {:status 200 :session (assoc session :uid user-id)}))

(defmulti event-msg-handler :id) ; Dispatch on event-id

;; Wrap for logging, catching, etc.:
(defn event-msg-handler*
  [{:as ev-msg :keys [id ?data event]}]
  (debugf "Event: %s" event)
  (debugf "ID: %s" id)
  (event-msg-handler ev-msg))

(do ; Server-side methods
  (defmethod event-msg-handler :pages/fetch-people
    [{:as ev-msg :keys [event id ?data ring-req ?reply-fn send-fn]}]
    (when-let [user (auth/user-from-req ring-req)]
      (when ?reply-fn
        (?reply-fn (queries/person-from-user user (:start ?data) (:limit ?data))))))

  (defmethod event-msg-handler :pages/fetch-emails
    [{:as ev-msg :keys [event id ?data ring-req ?reply-fn send-fn]}]
    (when-let [user (auth/user-from-req ring-req)]
      (when ?reply-fn
        (?reply-fn (queries/emails-from-user user (:start ?data) (:limit ?data))))))
  
  (defmethod event-msg-handler :update/user-data
    [{:as ev-msg :keys [event id ?data ring-req ?reply-fn send-fn]}]
    (when-let [user (auth/user-from-req ring-req)]
      (when ?reply-fn
        (?reply-fn (queries/user-data-public user)))))
  
  (defmethod event-msg-handler :default ; Fallback
    [{:as ev-msg :keys [event id ?data ring-req ?reply-fn send-fn]}]
    (let [session (:session ring-req)
          uid     (:uid     session)]
      (debugf "Unhandled event: %s" event)
      (when ?reply-fn
        (?reply-fn {:umatched-event-as-echoed-from-from-server event})))))

;; Add your (defmethod event-msg-handler <event-id> [ev-msg] <body>)s here...

;;;; Example: broadcast server>user

;; As an example of push notifications, we'll setup a server loop to broadcast
;; an event to _all_ possible user-ids every 10 seconds:
(defn start-broadcaster! []
  (go-loop [i 0]
    (<! (async/timeout 10000))
    (println (format "Broadcasting server>user: %s" @connected-uids))
    (doseq [uid (:any @connected-uids)]
      (chsk-send! uid
        [:some/broadcast
         {:what-is-this "A broadcast pushed from server"
          :how-often    "Every 10 seconds"
          :to-whom uid
          :i i}]))
    (recur (inc i))))

; Note that this'll be fast+reliable even over Ajax!:
(defn test-fast-server>user-pushes []
  (doseq [uid (:any @connected-uids)]
    (doseq [i (range 100)]
      (chsk-send! uid [:fast-push/is-fast (str "hello " i "!!")]))))

(defonce router_ (atom nil))

(defn stop-router! []
  (when-let [stop-f @router_] (stop-f)))

(defn start-router! []
  (stop-router!)
  (reset! router_ (sente/start-chsk-router!
                   ch-chsk event-msg-handler*)))

(defn start! []
  (start-router!)
  (start-broadcaster!))
