(ns candlecrm_cljs.routing
  (:require [clojure.string :as str]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [secretary.core :as secretary :refer-macros [defroute]]))

(defn update-scroll! [tabname]
  (when (state/look :should-refresh (state/tabname-types tabname))
    (u/update-switch! tabname)
    (state/update! [:should-refresh] dissoc
                   (state/tabname-types tabname))))

(defroute "/app" []
  (secretary/dispatch! "/app/agenda"))

(defroute "/app/:tabname" [tabname]
  (update-scroll! tabname)
  (state/set! [:upload-alert] "")
  (state/set! [:tabid] tabname)
  (u/alert-log! (str "Switch to tab '" tabname "'")))

(defroute "/app/node/:type/:id" [type id]
  (state/set! [:tabid] "node")
  (u/go-node! (js/parseInt id) (keyword type))
  (u/alert-log! (str "Switch to node " id " of type '" type "'")))

