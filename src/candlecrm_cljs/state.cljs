(ns candlecrm_cljs.state
  (:require [reagent.core :as r]
            [candlecrm_cljc.schema :as s]))

(defonce a
  (r/atom
   {:counters {s/person 0 s/email 0 s/email-from 0 s/email-to 0
               s/organization 0 :agenda 0}
    :page-lengths {s/person 20 s/email 20 :agenda 20 s/event 20
                   s/organization 20 s/location 50 s/building 50
                   :menu 50}
    :user {:username "Joe Bob Smith"}
    :tabid "agenda"
    :rows {s/person [] s/email [] s/organization []}
    :current-node nil
    :prop-filters {}
    :cal-events [{:title "event1" :start "2015-11-05" :end "2015-11-06"}
                 {:title "event2" :start "2015-11-25" :end "2015-11-29"}]
    :map-center {s/lat 37.953235 s/lng -122.433765}
    :map-zoom 3
    :map-markers {:data [] :objs [] :updated true :window nil :clicked nil}
    :rank-lists {s/event [] s/location []}
    :should-refresh {}
    :map-obj nil
    :input-meta {:type nil :attr-list nil}
    :ajax-chan nil
    :new-entity {}
    :new-entity-msg nil
    :edit-entity {}
    :edit-entity-msg nil
    :edit-node-map {}
    :search ""
    :search-results nil
    :delete-account {}
    :change-pwd {}
    :agenda-events []
    :loading false
    :notes-edit false
    :notes-text ""
    :scroll-lock false
    :upload-alert ""}))

(def tabname-types {"email" s/email "people" s/person
                    "orgs" s/organization "agenda" s/event})

(defn look [& args]
  (get-in @a args))

(defn agenda-pos []
  (* (look :counters s/event)
     (look :page-lengths s/event)))

(defn person-pos [type]
  (* (look :counters type)
     (look :page-lengths type)))

(defn email-pos []
  (* (look :counters s/email)
     (look :page-lengths s/email)))

(defn email-person-pos [link-type]
  (* (look :counters link-type)
     (look :page-lengths s/email)))

(defn update! [& args]
  (apply (partial swap! a update-in) args))

(defn set! [loc val]
  (apply (partial swap! a update-in) loc
         [(constantly val)]))

