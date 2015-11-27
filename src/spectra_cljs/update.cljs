(ns spectra_cljs.update
  (:require [spectra_cljs.state :as state]))

(defn update-rows! [rows-type]
  (fn [new-rows]
    (state/update! [rows-type] (constantly new-rows))))

(defn update-node-rows! [rows-type]
  (fn [new-rows]
    (state/update! [:current-node rows-type] (constantly new-rows))))

(defn fetch-rows! [chsk-send! rows-type req-type]
  (chsk-send! req-type 5000 (update-rows! rows-type)))

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
   {:person-id (state/look :current-node :id)
    :link link-type
    :start (state/email-person-pos link-type)
    :limit (state/look :page-lengths :email)}])

(defn update-emails! [chsk-send!]
  (fetch-rows! chsk-send! :email-rows (email-req)))

(defn update-emails-person! [link-type chsk-send!]
  (fetch-rows! chsk-send! link-type (email-person-req link-type)))

(defn update-user! [chsk-send!]
  (chsk-send! [:update/user-data] 5000
              #(state/update! [:user] (constantly %))))

(defn node-req [id type]
  [:update/fetch-node
   {:id id :type type}])

(defn new-node [req type]
  (constantly (assoc {:center-node req} :type type)))

(defn go-node! [chsk-send! id type]
  (chsk-send! (node-req id type) 5000
              #(state/update! [:current-node]
                              (new-node % type))))

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

(defn person-rels-req [person-id rel-type]
  [:pages/person-related
   (assoc (rel-map rel-type) :person-id person-id)])
