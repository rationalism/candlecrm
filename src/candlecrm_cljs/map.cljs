(ns candlecrm_cljs.map
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.util :refer [node-link]]
            [reagent.core :as r]
            [goog.dom :as dom]
            [jayq.core :as jq])
  (:use [jayq.core :only [$]]))

(defn event-info-window []
  (let [marker (state/look :map-markers :clicked)]
    [:div#markerinfo>h3
     [node-link (:title marker) (:id marker) s/building]]))

(defn render-window []
  (r/render [event-info-window]
            (dom/getElement "window-info")))

(defn map-window []
  (let [window (js/google.maps.InfoWindow.
                (clj->js {"content" "<div id='window-info'></div>"}))]
    (.addListener window "domready" render-window)
    window))

(defn window-open [marker vars]
  (fn []
    (state/set! [:map-markers :clicked] vars)
    (.open (state/look :map-markers :window)
           (state/look :map-obj) marker)))

(defn map-marker [vars]
  (let [marker (google.maps.Marker. (clj->js vars))]
    (.addListener marker "click" (window-open marker vars))
    marker))

(defn wipe-markers [markers]
  (->> (map #(.setMap % nil) markers)
       (map #(constantly nil))
       (remove nil?) clj->js))

(defn new-markers [markers]
  (->> (state/look :map-markers :data)
       (map #(assoc % :map (state/look :map-obj)))
       (map map-marker)
       clj->js))

(defn markers-update []
  (state/update! [:map-markers :objs] wipe-markers)
  (state/update! [:map-markers :objs] new-markers)
  (state/set! [:map-markers :updated] true))

(defn map-did-mount [this]
  (->> (map state/look [:map-center :map-zoom])
       (zipmap [:center :zoom]) clj->js
       (js/google.maps.Map. (r/dom-node this))
       (state/set! [:map-obj]))
  (state/update! [:map-markers :window] map-window)
  (markers-update)
  (state/look :map-obj))

(defn location-html []
  (if (= (state/look :tabid) 4)
    [:div#mapbox {:style {:height "600px" :width "1000px"}}]
    [:div#mapbox {:style {:height "599px" :width "999px"}}]))

(defn resize-map [this]
  (when-not (state/look :map-markers :updated)
    (markers-update))
  (-> js/document (. (getElementById "mapbox"))
      (js/google.maps.event.trigger "resize")))

(defn map-box []
  (r/create-class {:reagent-render location-html
                   :component-did-mount map-did-mount
                   :component-did-update resize-map}))

