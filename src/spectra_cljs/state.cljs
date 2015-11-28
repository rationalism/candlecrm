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
    :cal-events [{:title "event1" :start "2015-11-05" :end "2015-11-06"}
                 {:title "event2" :start "2015-11-25" :end "2015-11-29"}]
    :map-center {s/lat 37.953235 s/lng -122.433765}
    :map-zoom 3
    :map-markers [{:position {s/lat 37.953 s/lng -122.434} :title "marker 1!"}
                  {:position {s/lat 38.053 s/lng -122.534} :title "marker 2!"}]
    :rank-lists {s/event [] s/location []}}))

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

