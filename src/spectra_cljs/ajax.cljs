(ns spectra-cljs.ajax
  (:require-macros
   [cljs.core.async.macros :as asyncm :refer (go go-loop)])
  (:require
   [cljs.core.async :as async :refer (<! >! put! chan)]
   [taoensso.sente  :as sente :refer (cb-success?)]))

;; Sente/AJAX boilerplate from https://github.com/ptaoussanis/sente
(let [{:keys [chsk ch-recv send-fn state]}
      (sente/make-channel-socket! "/chsk" ; Note the same path as before
       {:type :auto ; e/o #{:auto :ajax :ws}
       })]
  (def chsk       chsk)
  (def ch-chsk    ch-recv) ; ChannelSocket's receive channel
  (def chsk-send! send-fn) ; ChannelSocket's send API fn
  (def chsk-state state)   ; Watchable, read-only atom
  )

(defmulti event-msg-handler :id) ; Dispatch on event-id

;; Wrap for logging, catching, etc.:
(defn event-msg-handler* [{:as ev-msg :keys [id ?data event]}]
  (js/alert "An event has been received.")
  (.log js/console "Event: %s" event)
  (event-msg-handler ev-msg))

(do ; Client-side methods
  (defmethod event-msg-handler :default ; Fallback
    [{:as ev-msg :keys [event]}]
    (js/alert "An event has been received.")
    (.log js/console "Unhandled event: %s" event))
  
  (defmethod event-msg-handler :chsk/state
    [{:as ev-msg :keys [?data]}]
    (js/alert "An event has been received.")
    (if (= ?data {:first-open? true})
      (.log js/console "Channel socket successfully established!")
      (.log js/console "Channel socket state change: %s" ?data)))
      
  (defmethod event-msg-handler :chsk/recv
    [{:as ev-msg :keys [?data]}]
    (js/alert "An event has been received.")
    (.log js/console "Push event from server: %s" ?data))
  
  (defmethod event-msg-handler :chsk/handshake
    [{:as ev-msg :keys [?data]}]
    (js/alert "An event has been received.")
    (let [[?uid ?csrf-token ?handshake-data] ?data]
      (.log js/console "Handshake: %s" ?data))))

(def router_ (atom nil))

(defn stop-router! []
  (when-let [stop-f @router_] (stop-f)))

(defn start-router! []
  (stop-router!)
  (.log js/console "chsk-state")
  (.log js/console @chsk-state)
  (reset! router_ (sente/start-chsk-router!
                   ch-chsk event-msg-handler*))
  (sente/chsk-reconnect! chsk))
