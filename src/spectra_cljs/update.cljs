(ns spectra_cljs.update
  (:require [clojure.set :as set]
            [spectra_cljs.state :as state]
            [spectra_cljc.schema :as s]))

(def timeout timeout)

(defn send! [req update-fn]
  ((state/look :ajax-chan) req 5000 update-fn))

(defn people-req []
  [:pages/fetch-people
   {:start (state/person-pos)
    :limit (state/look :page-lengths :people)}])
  
(defn update-people! []
  (send! (people-req) #(state/set! [:people-rows] %)))

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
  (send! (email-req) #(state/set! [:email-rows] %)))

(defn email-callback [link-type]
  (fn [resp]
    (state/set! [:current-node link-type] resp)
    (state/set! [:tabid] 6)))

(defn update-emails-person! [link-type]
  (send! (email-person-req link-type)
         (email-callback link-type)))

(defn update-user! []
  (send! [:update/user-data] #(state/set! [:user] %)))

(defn node-req [id type]
  [:update/fetch-node
   {:id id :type type}])

(defn new-node [req type]
  {:center-node req :type type})

(defn update-node [type]
  (fn [req]
    (state/set! [:current-node] (new-node req type))
    (state/set! [:tabid] 6)
    (when (= type s/person)
      (update-emails-person! s/email-to)
      (update-emails-person! s/email-from))))

(defn go-node! [id type]
  (send! (node-req id type) (update-node type)))

(defn key-req [key]
  [:update/key-link {:key key}])

(defn go-key! [key]
  (send! (key-req key) (update-node :fish)))

(defn rel-map [rel-type]
  {:reltype rel-type
   :start 0 :limit (state/look :page-lengths rel-type)})

(defn people-ranked-req [rel-type]
  [:pages/people-ranked (rel-map rel-type)])

(defn new-rank-lists! [rel-type]
  (fn [new-ranks]
    (state/set! [:rank-lists rel-type] new-ranks)))

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

(defn update-cal-rows! [new-rows]
  (->> new-rows (map normalize-cal) 
       (state/set! [:cal-events])))

(defn normalize-loc [loc]
  {:title (-> loc s/s-name first)
   :position {s/lat (-> loc s/lat (js/parseFloat))
              s/lng (-> loc s/lng (js/parseFloat))}
   :id (:id loc)})

(defn update-loc-rows! [new-rows]
  (->> new-rows (map normalize-loc)
       (state/set! [:map-markers :data]))
  (state/set! [:map-markers :updated] false))

(defn map-markers [person-id]
  (send! (person-place-req person-id) update-loc-rows!))

(defn cal-events [person-id]
  (send! (person-event-req person-id) update-cal-rows!))

(defn rel-switch [person-id rel-type]
  (condp = rel-type
    s/event (cal-events person-id)
    s/location (map-markers person-id)
    nil))

(defn strip-ids [m]
  (reduce #(update %1 %2 vals)
          m (remove #(= % s/type-label) (keys m))))

(defn add-req []
  [:edit/add-entity
   {:fields (-> :new-entity state/look strip-ids)}])

(defn edit-req []
  [:edit/edit-entity
   {:fields (state/look :current-node :center-node)}])

(defn new-entity-confirm! [resp]
  (state/set! [:new-entity] {})
  (state/set! [:new-entity-msg] resp))

(defn add-entity! []
  (send! (add-req) new-entity-confirm!))

(defn edit-entity-confirm! [resp]
  (state/set! [:edit-entity-msg] resp))

(defn edit-entity! []
  (send! (edit-req) edit-entity-confirm!))

(defn search-req []
  [:update/search
   {:query (state/look :search)}])

(defn list-search-results! [resp]
  (state/set! [:tabid] 9)
  (state/set! [:search-results] resp))

(defn run-search! []
  (send! (search-req) list-search-results!))
