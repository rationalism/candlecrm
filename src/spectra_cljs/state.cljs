(ns spectra_cljs.state
  (:require [reagent.core :as r]
            [spectra_cljc.schema :as s]))

(defonce a
  (r/atom
   {:counters {:people 0 :email 0 s/email-from 0 s/email-to 0}
    :page-lengths {:people 20 :email 20 s/event 50 s/location 50}
    :user {:username "Joe Bob Smith"}
    :tabid 1
    :people-rows []
    :email-rows []
    :current-node nil
    :prop-filters {}
    :cal-events [{:title "event1" :start "2015-11-05" :end "2015-11-06"}
                 {:title "event2" :start "2015-11-25" :end "2015-11-29"}]
    :map-center {s/lat 37.953235 s/lng -122.433765}
    :map-zoom 3
    :map-markers {:data [] :objs [] :updated true :window nil :clicked nil}
    :rank-lists {s/event [] s/location []}
    :map-obj nil
    :input-meta {:type nil :attr-list nil}
    :ajax-chan nil
    :new-entity {}
    :new-entity-msg nil
    :search ""
    :search-results nil
    :delete-account {}
    :change-pwd {}}))

(defn look [& args]
  (get-in @a args))

(defn person-pos []
  (* (look :counters :people)
     (look :page-lengths :people)))

(defn email-pos []
  (* (look :counters :email)
     (look :page-lengths :email)))

(defn email-person-pos [link-type]
  (* (look :counters link-type)
     (look :page-lengths :email)))

(defn update! [& args]
  (apply (partial swap! a update-in) args))

(defn set! [loc val]
  (apply (partial swap! a update-in) loc
         [(constantly val)]))

