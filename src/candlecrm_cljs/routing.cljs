(ns candlecrm_cljs.routing
  (:require [clojure.string :as str]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [secretary.core :as secretary :refer-macros [defroute]]))

(defroute "/app/:tabname" [tabname]
  (u/alert-log! (str "Switch to tab " tabname))
  (state/set! [:tabid] tabname))

(defroute "/app/node/:type/:id" [type id]
  (u/alert-log! (str "Switch to node " id " of type " type))
  (state/set! [:tabid] "node")
  (u/go-node! (js/parseInt id) (keyword type)))

