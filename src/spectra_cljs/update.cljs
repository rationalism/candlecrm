(ns spectra_cljs.update
  (:require [spectra_cljs.ajax :as ajax]
            [spectra_cljs.state :as state]
            [spectra_cljc.schema :as s]))

(defn update-rows! [rows-type]
  (fn [new-rows]
    (state/update! [rows-type] (constantly new-rows))))

(defn fetch-rows! [rows-type req-type]
  (ajax/chsk-send! req-type 5000
                   (update-rows! rows-type)))

(defn people-req []
  [:pages/fetch-people
   {:start (state/person-pos)
    :limit (state/look :page-lengths :people)}])
  
(defn update-people! []
  (fetch-rows! :people-rows (people-req)))

(defn prev-people! []
  (fn []
    (when (< 0 (state/look :counters :people))
      (state/update! [:counters :people] dec)
      (update-people!))))

(defn next-people! []
  (fn []
    (state/update! [:counters :people] inc)
    (update-people!)))

(defn email-req []
  [:pages/fetch-emails
   {:start (state/email-pos)
    :limit (state/look [:page-lengths :people])}])
  
(defn update-emails! []
  (fetch-rows! :email-rows (email-req)))

(defn prev-emails! []
  (fn []
    (when (< 0 (state/look :counters :email))
      (state/update! [:counters :email] dec)
      (update-emails!))))

(defn next-emails! []
  (fn []
    (state/update! [:counters :email] inc)
    (update-emails!)))

