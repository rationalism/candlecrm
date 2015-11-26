(ns spectra_cljs.ajax
  (:require
   [clojure.string :as str]
   [goog.dom :as dom]
   [cljs.core.async :as async  :refer (<! >! put! chan)]
   [taoensso.encore :as encore :refer ()]
   [taoensso.timbre :as timbre :refer-macros (tracef debugf infof warnf errorf)]
   [taoensso.sente  :as sente  :refer (cb-success?)]
   [spectra_cljs.ajax-demo :as ajax-demo]
   [spectra_cljc.schema :as s]
   [spectra_cljs.state :as state]
   [spectra_cljs.update :as u])
   ;; Optional, for Transit encoding:
   ;;[taoensso.sente.packers.transit :as sente-transit]
  (:require-macros
   [cljs.core.async.macros :as asyncm :refer (go go-loop)]))

;;;; Packer (client<->server serializtion format) config

;; (def packer (sente-transit/get-flexi-packer :edn)) ; Experimental, needs Transit dep
(def packer :edn) ; Default packer (no need for Transit dep)

;;;; Client-side setup

(let [rand-chsk-type :auto
      {:keys [chsk ch-recv send-fn state]}
      (sente/make-channel-socket! "/chsk" ; Note the same URL as before
        {:type   rand-chsk-type
         :packer packer})]
  (def chsk       chsk)
  (def ch-chsk    ch-recv) ; ChannelSocket's receive channel
  (def chsk-send! send-fn) ; ChannelSocket's send API fn
  (def chsk-state state))   ; Watchable, read-only atom

;;;; Routing handlers

;; So you'll want to define one server-side and one client-side
;; (fn event-msg-handler [ev-msg]) to correctly handle incoming events. How you
;; actually do this is entirely up to you. In this example we use a multimethod
;; that dispatches to a method based on the `event-msg`'s event-id. Some
;; alternatives include a simple `case`/`cond`/`condp` against event-ids, or
;;`core.match` against events.

;; This fills in initial email values
(defn chsk-init! []
  (u/update-emails! chsk-send!)
  (u/update-people! chsk-send!)
  (u/update-user! chsk-send!)
  (u/fetch-ranks! chsk-send! s/event)
  (u/fetch-ranks! chsk-send! s/location))

(defmulti event-msg-handler :id) ; Dispatch on event-id

;; Wrap for logging, catching, etc.:
(defn event-msg-handler*
  [{:as ev-msg :keys [id ?data event]}]
  (debugf "Event: %s" event)
  (event-msg-handler ev-msg))

(do ; Client-side methods
  (defmethod event-msg-handler :default ; Fallback
    [{:as ev-msg :keys [event]}]
    (debugf "Unhandled event: %s" event))
  
  (defmethod event-msg-handler :chsk/state
    [{:as ev-msg :keys [?data]}]
    (if (?data :first-open?)
      (do (debugf "Channel socket successfully established!")
          (chsk-init!))
      (debugf "Channel socket state change: %s" ?data)))
  
  (defmethod event-msg-handler :chsk/recv
    [{:as ev-msg :keys [?data]}]
    (debugf "Push event from server: %s" ?data))
  
  (defmethod event-msg-handler :chsk/handshake
    [{:as ev-msg :keys [?data]}]
    (let [[?uid ?csrf-token ?handshake-data] ?data]
      (debugf "Handshake: %s" ?data))))

(def router_ (atom nil))

(defn stop-router! []
  (when-let [stop-f @router_] (stop-f)))

(defn start-router! []
  (stop-router!)
  (reset! router_ (sente/start-chsk-router!
                   ch-chsk event-msg-handler*)))

(defn start! []
  (start-router!))
