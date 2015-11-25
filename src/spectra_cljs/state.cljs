(ns spectra_cljs.state
  (:require [reagent.core :as r]))

(defonce a
  (r/atom
   {:counters {:people 0 :email 0}
    :page-lengths {:people 20 :email 20}
    :user {:username "Joe Bob Smith"}
    :tabid 1
    :people-rows []
    :email-rows []
    :current-node nil
    :cal-events [{:title "event1" :start "2015-11-05" :end "2015-11-06"}
                 {:title "event2" :start "2015-11-25" :end "2015-11-29"}]
    :map-center {:lat 37.953235 :lng -122.433765}
    :map-zoom 10
    :map-markers [{:position {:lat 37.953 :lng -122.434} :title "marker 1!"}
                  {:position {:lat 38.053 :lng -122.534} :title "marker 2!"}]}))

(defn look [& args]
  (get-in @a args))

(defn person-pos []
  (* (look :counters :people)
     (look :page-lengths :people)))

(defn email-pos []
  (* (look :counters :email)
     (look :page-lengths :email)))

(defn update! [& args]
  (apply (partial swap! a update-in) args))
