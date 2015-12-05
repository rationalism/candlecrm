(ns spectra_cljs.update
  (:require [clojure.set :as set]
            [spectra_cljs.state :as state]
            [spectra_cljc.schema :as s]))

(def timeout timeout)

(defn send! [req update-fn]
  ((state/look :ajax-chan) req 5000 update-fn))

(defn update-rows! [rows-type]
  (fn [new-rows]
    (state/update! [rows-type] (constantly new-rows))))

(defn update-node-rows! [rows-type]
  (fn [new-rows]
    (state/update! [:current-node rows-type] (constantly new-rows))))

(defn fetch-rows! [rows-type req-type]
  (send! req-type (update-rows! rows-type)))

(defn fetch-node-rows! [rows-type req-type]
  (send! req-type (update-node-rows! rows-type)))

(defn people-req []
  [:pages/fetch-people
   {:start (state/person-pos)
    :limit (state/look :page-lengths :people)}])
  
(defn update-people! []
  (fetch-rows! :people-rows (people-req)))

(defn prev-fetch! [counter update-fn]
  (fn []
    (when (pos? (state/look :counters counter))
      (state/update! [:counters counter] dec)
      (update-fn))))

(defn next-fetch! [counter update-fn]
  (fn []
    (state/update! [:counters counter] inc)
    (update-fn)))

(defn email-req []
  [:pages/fetch-emails
   {:start (state/email-pos)
    :limit (state/look :page-lengths :email)}])

(defn email-person-req [link-type]
  [:pages/person-emails
   {:person-id (state/look :current-node :center-node :id)
    :link link-type
    :start (state/email-person-pos link-type)
    :limit (state/look :page-lengths :email)}])

(defn update-emails! []
  (fetch-rows! :email-rows (email-req)))

(defn update-emails-person! [link-type]
  (fetch-node-rows! link-type (email-person-req link-type)))

(defn update-user! []
  (send! [:update/user-data] 
         #(state/update! [:user] (constantly %))))

(defn node-req [id type]
  [:update/fetch-node
   {:id id :type type}])

(defn new-node [req type]
  (constantly (assoc {:center-node req} :type type)))

(defn update-node [type]
  (fn [req]
    (state/update! [:current-node] (new-node req type))
    (when (= type s/person)
      (update-emails-person! s/email-to)
      (update-emails-person! s/email-from))))

(defn go-node! [id type]
  (send! (node-req id type) (update-node type)))

(defn rel-map [rel-type]
  {:reltype rel-type
   :start 0 :limit (state/look :page-lengths rel-type)})

(defn people-ranked-req [rel-type]
  [:pages/people-ranked (rel-map rel-type)])

(defn new-rank-lists! [rel-type]
  (fn [new-ranks]
    (state/update! [:rank-lists rel-type] (constantly new-ranks))))

(defn fetch-ranks! [rel-type]
  (send! (people-ranked-req rel-type)
         (new-rank-lists! rel-type)))

(defn person-event-req [person-id]
  [:pages/person-events
   (assoc (rel-map s/event) :person-id person-id)])

(defn person-place-req [person-id]
  [:pages/person-places
   (assoc (rel-map s/location) :person-id person-id)])

(defn normalize-cal [cal]
  (-> cal (set/rename-keys {s/start-time :start})
      (assoc :title (str (:id cal)))))

(defn update-cal-rows! []
  (fn [new-rows]
    (->> new-rows (map normalize-cal) constantly
         (state/update! [:cal-events]))))

(defn normalize-loc [loc]
  {:title (-> loc s/s-name first)
   :position {s/lat (-> loc s/lat (js/parseFloat))
              s/lng (-> loc s/lng (js/parseFloat))}
   :id (:id loc)})

(defn update-loc-rows! []
  (fn [new-rows]
    (->> new-rows (map normalize-loc) constantly
         (state/update! [:map-markers :data]))
    (state/update! [:map-markers :updated] (constantly false))))

(defn map-markers [person-id]
  (send! (person-place-req person-id)
         (update-loc-rows!)))

(defn cal-events [person-id]
  (send! (person-event-req person-id)
         (update-cal-rows!)))

(defn rel-switch [person-id rel-type]
  (condp = rel-type
    s/event (cal-events person-id)
    s/location (map-markers person-id)
    nil))
