(ns candlecrm_cljs.init
  (:require [clojure.string :as str]
            [accountant.core :as accountant]
            [secretary.core :as secretary]
            [goog.dom :as dom]
            [goog.events :as events]
            [goog.events.EventType :as EventType]
            [candlecrm_cljs.ajax :as ajax]
            [candlecrm_cljs.pages :as pages]
            [candlecrm_cljs.routing :as routing]))

;; configure history and URL routing
(defn configure-routing! []
  (accountant/configure-navigation!
   {:nav-handler #(secretary/dispatch! %)
    :path-exists? #(secretary/locate-route %)}))

(defn scroll-listen []
  (events/listen js/window EventType/SCROLL pages/on-scroll))

(defn init []
  ;; verify that js/document exists and that it has a getElementById
  ;; property
  (when (and js/document (.-getElementById js/document))
    (configure-routing!)
    (enable-console-print!)
    (scroll-listen)
    (ajax/start!)
    (pages/render-all!)))

;; initialize the HTML page in unobtrusive way
(set! (.-onload js/window) init)

