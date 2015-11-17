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
    :ajax-live false}))

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
