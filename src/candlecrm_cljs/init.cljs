(ns candlecrm_cljs.init
  (:require [clojure.string :as str]
            [accountant.core :as accountant]
            [secretary.core :as secretary]
            [goog.dom :as dom]
            [goog.events :as events]
            [candlecrm_cljs.ajax :as ajax]
            [candlecrm_cljs.pages :as pages]
            [candlecrm_cljs.routing :as routing]))

(defn init []
  ;; verify that js/document exists and that it has a getElementById
  ;; property
  (when (and js/document (.-getElementById js/document))
    (enable-console-print!)
    (ajax/start!)
    (pages/render-all!)))

;; initialize the HTML page in unobtrusive way
(set! (.-onload js/window) init)

;; configure history and URL routing
(accountant/configure-navigation!
 {:nav-handler #(secretary/dispatch! %)
  :path-exists? #(secretary/locate-route %)})
