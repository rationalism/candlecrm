(ns spectra_cljs.update
  (:require [spectra_cljs.state :as state]
            [spectra_cljc.schema :as s]))

(defn update-rows! [rows-type]
  (fn [new-rows]
    (state/update! [rows-type] (constantly new-rows))))

(defn update-node-rows! [rows-type]
  (fn [new-rows]
    (state/update! [:current-node rows-type] (constantly new-rows))))

(defn fetch-rows! [chsk-send! rows-type req-type]
  (chsk-send! req-type 5000 (update-rows! rows-type)))

(defn fetch-node-rows! [chsk-send! rows-type req-type]
  (chsk-send! req-type 5000 (update-node-rows! rows-type)))

(defn people-req []
  [:pages/fetch-people
   {:start (state/person-pos)
    :limit (state/look :page-lengths :people)}])
  
(defn update-people! [chsk-send!]
  (fetch-rows! chsk-send! :people-rows (people-req)))

(defn prev-fetch! [counter update-fn chsk-send!]
  (fn []
    (when (< 0 (state/look :counters counter))
      (state/update! [:counters counter] dec)
      (update-fn chsk-send!))))

(defn next-fetch! [counter update-fn chsk-send!]
  (fn []
    (state/update! [:counters counter] inc)
    (update-fn chsk-send!)))

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

(defn update-emails! [chsk-send!]
  (fetch-rows! chsk-send! :email-rows (email-req)))

(defn update-emails-person! [link-type chsk-send!]
  (fetch-node-rows! chsk-send! link-type (email-person-req link-type)))

(defn update-user! [chsk-send!]
  (chsk-send! [:update/user-data] 5000
              #(state/update! [:user] (constantly %))))

(defn node-req [id type]
  [:update/fetch-node
   {:id id :type type}])

(defn new-node [req type]
  (constantly (assoc {:center-node req} :type type)))

(defn update-node [chsk-send! type]
  (fn [req]
    (state/update! [:current-node] (new-node req type))
    (when (= type s/person)
      (update-emails-person! s/email-to chsk-send!)
      (update-emails-person! s/email-from chsk-send!))))

(defn go-node! [chsk-send! id type]
  (chsk-send! (node-req id type) 5000
              (update-node chsk-send! type)))

(defn rel-map [rel-type]
  {:reltype rel-type
   :start 0 :limit (state/look :page-lengths rel-type)})

(defn people-ranked-req [rel-type]
  [:pages/people-ranked (rel-map rel-type)])

(defn new-rank-lists! [rel-type]
  (fn [new-ranks]
    (state/update! [:rank-lists rel-type] (constantly new-ranks))))

(defn fetch-ranks! [chsk-send! rel-type]
  (chsk-send! (people-ranked-req rel-type) 5000
              (new-rank-lists! rel-type)))

(defn person-event-req [person-id]
  [:pages/person-events
   (assoc (rel-map s/event) :person-id person-id)])

(defn person-place-req [person-id]
  [:pages/person-places
   (assoc (rel-map s/location) :person-id person-id)])

