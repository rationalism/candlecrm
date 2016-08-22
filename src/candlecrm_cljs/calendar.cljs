(ns candlecrm_cljs.calendar
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.node :as node]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :refer
             [add-ids add-new prev-next-box display-day
              get-first load-box]]
            [reagent.core :as r])
  (:use [jayq.core :only [$]]))

(defn cal-adjust
  ([param] (.fullCalendar ($ :#calendarbox) param))
  ([param1 param2] (.fullCalendar ($ :#calendarbox) param1 param2)))

(defn day-click [date jsevent view]
  (if (= "basicDay" (.-name view))
    (cal-adjust "changeView" "month") 
    (cal-adjust "changeView" "basicDay"))
  (cal-adjust "gotoDate" date))

(defn event-click [event jsevent view]
  (u/go-node! (.-id event) s/event))

(defn event-source [start end timezone callback]
  (-> :cal-events state/look clj->js callback))

(defn cal-params []
  (clj->js {:events event-source
            :dayClick day-click
            :eventClick event-click}))

(defn cal-add! [this]
  (cal-adjust (cal-params)))

(defn cal-render! [this]
  (cal-adjust "render")
  (when (= (state/look :tabid) 3)
    (cal-adjust "refetchEvents")))

(defn cal-html []
  (if (= (state/look :tabid) 3)
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

(defn agenda-events []
  (let [events (state/look :agenda-events)]
    (->> events (map #(get-first % [s/event-begin]))
         (map display-day) (map vector events)
         (partition-by second) (mapcat event-group))))

(defn display-agenda [event]
  (if (string? event) [:h2 event]
      [node/show-node (node/event-name event) event false]))

(defn agenda []
  [:div
   [:div
    [load-box] [add-new s/event]
    [prev-next-box :agenda u/update-agenda!
     (count (state/look :agenda-events)) :agenda]]
   (let [events (agenda-events)]
     (if (empty? events)
       [:h2 "No events loaded yet."]
       (for [event (add-ids events)]
         ^{:key (first event)}
         [display-agenda (second event)])))])
