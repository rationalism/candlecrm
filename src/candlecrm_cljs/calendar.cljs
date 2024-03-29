(ns candlecrm_cljs.calendar
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.node :as node]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :refer
             [add-ids add-new display-day
              get-first load-box beam event-name]]
            [reagent.core :as r]
            [secretary.core :as secretary])
  (:use [jayq.core :only [$]]))

(defn debug-js [x]
  (js/alert x) x)

(defn cal-adjust
  ([param] (.fullCalendar ($ :#calendarbox) param))
  ([param1 param2] (.fullCalendar ($ :#calendarbox) param1 param2)))

(defn day-click [date jsevent view]
  (if (= "basicDay" (.-name view))
    (cal-adjust "changeView" "month") 
    (cal-adjust "changeView" "basicDay"))
  (cal-adjust "gotoDate" date))

(defn event-source [start end timezone callback]
  (-> :cal-events state/look clj->js callback))

(defn cal-params []
  (clj->js {:events event-source
            :dayClick day-click}))

(defn cal-add! [this]
  (cal-adjust (cal-params)))

(defn cal-render! [this]
  (cal-adjust "render")
  (when (= (state/look :tabid) "calendar")
    (cal-adjust "refetchEvents")))

(defn cal-html []
  (if (= (state/look :tabid) "calendar")
    [:div#calendarbox {:style {:width "100%"}}]
    [:div#calendarbox {:style {:width "99%"}}]))

(defn calendar-box []
  (r/create-class
   {:component-did-mount cal-add!
    :component-did-update cal-render!
    :display-name "calendar-tab"
    :reagent-render cal-html}))

(defn event-group [group]
  (->> group (map first)
       (concat (-> group first second vector))))

(defn pick-times [all-times]
  (let [present (->> all-times (map #(apply min %)) (apply max)
                     (min (.getTime (js/Date.))))]
    (loop [last present times all-times select-times []]
      (let [event-time (->> times first (remove #(< % last)) first)]
        (if (empty? times) select-times
            (recur event-time (rest times) (conj select-times event-time)))))))

(defn agenda-events []
  (let [events (state/look :agenda-events)]
    (->> events (map #(get % [s/event-begin])) (map keys) (map sort)
         pick-times (map display-day) (map vector events)
         (partition-by second) (mapcat event-group))))

(defn display-agenda [event]
  [:div 
   (if (string? event) [:h2 event]
       [node/show-node (event-name event false) event false])
   [:hr]])

(defn agenda []
  [:div
   [:div
    [add-new s/event] [load-box]]
   [:br]
   (let [events (agenda-events)]
     (if (empty? events)
       [:h2 "Loading events. Hang on, this might take a few seconds."]
       (for [event (add-ids events)]
         ^{:key (first event)}
         [display-agenda (second event)])))])
