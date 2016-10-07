(ns candlecrm_cljs.routing
  (:require [clojure.string :as str]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [secretary.core :as secretary :refer-macros [defroute]]))

(defroute "/app/:tabname" [tabname]
  (state/set! [:tabid] tabname))

(defroute "/app/node/:type/:id" [type id]
  (state/set! [:tabid] "node")
  (u/go-node! (js/parseInt id) (keyword type)))

