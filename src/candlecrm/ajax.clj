(ns candlecrm.ajax
  (:require
   [candlecrm.auth       :as auth]
   [candlecrm.common    :refer :all]
   [candlecrm.email    :as email]
   [candlecrm.insert    :as insert]
   [candlecrm.neo4j     :as neo4j]
   [candlecrm.quartz    :as quartz]
   [candlecrm.queries    :as queries]
   [clojure.core.async :as async  :refer (<! <!! >! >!! put! chan go go-loop)]
   [taoensso.timbre    :as timbre :refer (tracef debugf infof warnf errorf)]
   [taoensso.sente     :as sente]
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
    :user-id-fn (fn [ring-req] (-> ring-req :identity .id))}))

(let [{:keys [ch-recv send-fn ajax-post-fn ajax-get-or-ws-handshake-fn
              connected-uids]}
      (make-channel-socket!)]
  (def ring-ajax-post                ajax-post-fn)
  (def ring-ajax-get-or-ws-handshake ajax-get-or-ws-handshake-fn)
  (def ch-chsk                       ch-recv) ; ChannelSocket's receive channel
  (def chsk-send!                    send-fn) ; ChannelSocket's send API fn
  (def connected-uids                connected-uids)) ; Watchable, read-only atom

(reset! neo4j/ajax-send! chsk-send!)

(defn login!
  "Here's where you'll add your server-side login/auth procedure (Friend, etc.).
  In our simplified example we'll just always successfully authenticate the user
  with whatever user-id they provided in the auth request."
  [ring-request]
  (let [{:keys [session params]} ring-request
        {:keys [user-id]} params]
    (debugf "Login request: %s" params)
    {:status 200 :session (assoc session :uid user-id)}))

(defn make-fetch-fn [specs]
  (fn [user req-map]
    (->> (get specs :keys)
         (select-keys req-map)
         ((:fn specs) user))))

(defn no-reply [event]
  (debugf "Unhandled event: %s" event)
  {:umatched-event-as-echoed-from-from-server event})

(def reply-map {:edit/add-entity {:fn insert/new-entity!
                                  :keys [:fields :add-links]}
                :edit/edit-entity {:fn insert/edit-entity!
                                   :keys [:fields :add-links :delete-links]}
                :edit/edit-notes {:fn email/edit-notes!
                                  :keys [:node :notes]}
                :pages/fetch-people {:fn queries/person-from-user
                                     :keys [:start :limit]}
                :pages/fetch-agenda {:fn queries/event-agenda
                                     :keys [:start :limit]}
                :pages/fetch-emails {:fn queries/emails-from-user
                                     :keys [:start :limit]}
                :pages/person-emails {:fn queries/emails-linked
                                      :keys [:person-id :link :start :limit]}
                :pages/people-ranked {:fn queries/people-by-reltype
                                      :keys [:reltype :start :limit]}
                :pages/person-events {:fn queries/event-related
                                      :keys [:person-id :start :limit]}
                :pages/person-places {:fn queries/loc-related
                                      :keys [:person-id :start :limit]}
                :update/delete-account {:fn quartz/delete-req!
                                        :keys [:confirmed]}
                :update/refresh-email {:fn quartz/refresh-request!
                                       :keys []}
                :update/user-data {:fn queries/user-data-public
                                   :keys []}
                :update/key-link {:fn queries/key-link
                                  :keys [:key :id]}
                :update/change-password {:fn auth/set-password!
                                         :keys [:password :confirm]}
                :update/fetch-node {:fn queries/node-by-id
                                    :keys [:id :type]}
                :update/delete-entity {:fn auth/delete-entity!
                                       :keys [:id :type]}
                :update/search {:fn queries/full-search
                                :keys [:query]}})

;; Wrap for logging, catching, etc.:
(defn event-msg-handler*
  [{:as ev-msg :keys [event id identity ?data ring-req ?reply-fn send-fn]}]
  (neo4j/thread-wrap
   (when-let [user (:identity ring-req)]
     (if-let [fetch-spec (get reply-map id)]
       (?reply-fn ((make-fetch-fn fetch-spec) user ?data))
       (when ?reply-fn (?reply-fn (no-reply event)))))))

;;;; Example: broadcast server>user

;; As an example of push notifications, we'll setup a server loop to broadcast
;; an event to _all_ possible user-ids every 10 seconds:
(defn start-broadcaster! []
  (go-loop [i 0]
    (<! (async/timeout 10000))
    (doseq [uid (:any @connected-uids)]
      (chsk-send! uid
                  [:some/broadcast
                   {:what-is-this "A broadcast pushed from server"
                    :how-often    "Every 10 seconds"
                    :to-whom uid
                    :i i}]))
    (recur (inc i))))

;;Note that this'll be fast+reliable even over Ajax!:
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

;; Restart Ajax when reloading the namespace
(defn restart-ajax! []
  (throw-info! "Restarting Ajax")
  (stop-router!)
  (start-router!)
  (start-broadcaster!))
