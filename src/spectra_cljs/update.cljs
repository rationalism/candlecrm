(ns spectra_cljs.update
  (:require [spectra_cljs.state :as state]))

(defn update-rows! [rows-type]
  (fn [new-rows]
    (state/update! [rows-type] (constantly new-rows))))

(defn fetch-rows! [chsk-send! rows-type req-type]
  (chsk-send! req-type 5000 (update-rows! rows-type)))

(defn people-req []
  [:pages/fetch-people
   {:start (state/person-pos)
    :limit (state/look :page-lengths :people)}])
  
(defn update-people! [chsk-send!]
  (fetch-rows! chsk-send! :people-rows (people-req)))

(defn prev-people! [chsk-send!]
  (fn []
    (when (< 0 (state/look :counters :people))
      (state/update! [:counters :people] dec)
      (update-people! chsk-send!))))

(defn next-people! [chsk-send!]
  (fn []
    (state/update! [:counters :people] inc)
    (update-people! chsk-send!)))

(defn email-req []
  [:pages/fetch-emails
   {:start (state/email-pos)
    :limit (state/look :page-lengths :email)}])
  
(defn update-emails! [chsk-send!]
  (fetch-rows! chsk-send! :email-rows (email-req)))

(defn prev-emails! [chsk-send!]
  (fn []
    (when (< 0 (state/look :counters :email))
      (state/update! [:counters :email] dec)
      (update-emails! chsk-send!))))

(defn next-emails! [chsk-send!]
  (fn []
    (state/update! [:counters :email] inc)
    (update-emails! chsk-send!)))

(defn update-user! [chsk-send!]
  (chsk-send! [:update/user-data] 5000
              #(state/update! [:user] (constantly %))))

(defn node-req [id type]
  [:update/fetch-node
   {:id id :type type}])

(defn new-node [req type]
  (constantly {:center-node (assoc req :type type))})

(defn go-node! [chsk-send! id type]
  (chsk-send! (node-req id type) 5000
              #(state/update! [:current-node]
                              (new-node % type))))
