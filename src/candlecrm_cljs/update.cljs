(ns candlecrm_cljs.update
  (:require [clojure.set :as set]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljc.schema :as s]))

(def timeout timeout)

(defn get-first [node attr]
  (->> (get node attr) (into [])
       (sort-by second >)
       ffirst))

(defn send! [req update-fn]
  ((state/look :ajax-chan) req 5000 update-fn))

(defn people-req []
  [:pages/fetch-people
   {:start (state/person-pos)
    :limit (state/look :page-lengths :people)}])

(defn set-people! [rows]
  {:pre [(coll? rows)]}
  (state/set! [:people-rows] rows))

(defn update-people! []
  (send! (people-req) set-people!))

(defn agenda-req []
  [:pages/fetch-agenda
   {:start (state/agenda-pos)
    :limit (state/look :page-lengths :agenda)}])

(defn set-agenda! [rows]
  {:pre [(coll? rows)]}
  (state/set! [:agenda-events] rows))

(defn update-agenda! []
  (send! (agenda-req) set-agenda!))

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

(defn set-emails! [rows]
  {:pre [(coll? rows)]}
  (state/set! [:email-rows] rows))

(defn update-emails! []
  (send! (email-req) set-emails!))

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

(defn update-node []
  (fn [req]
    (state/set! [:current-node] (new-node req (s/type-label req)))
    (state/set! [:prop-filters] {})
    (state/set! [:tabid] 6)
    (when (= (s/type-label req) s/person)
      (update-emails-person! s/email-to)
      (update-emails-person! s/email-from))))

(defn go-node! [id type]
  (send! (node-req id type) (update-node)))

(defn key-req [key]
  [:update/key-link
   {:id (state/look :current-node :center-node :id)
    :key key}])

(defn go-key! [key]
  (send! (key-req key) (update-node)))

(defn rel-map [rel-type]
  {:reltype rel-type
   :start 0 :limit (state/look :page-lengths rel-type)})

(defn people-ranked-req [rel-type]
  [:pages/people-ranked (rel-map rel-type)])

(defn person-event-req [person-id]
  [:pages/person-events
   (assoc (rel-map s/event) :person-id person-id)])

(defn person-place-req [person-id]
  [:pages/person-places
   (assoc (rel-map s/building) :person-id person-id)])

(defn normalize-cal [cal]
  (-> (assoc cal :start (get-first cal [s/event-begin]))
      (assoc :end (get-first cal [s/event-end]))
      (dissoc [s/event-begin] [s/event-end])
      (assoc :title
             (get-first (get-first cal [s/link-to s/email-mentions s/email-subject])
                        s/email-subject))))

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
  (when (not (empty? person-id))
    (send! (person-place-req person-id) update-loc-rows!)))

(defn cal-events [person-id]
  (when (not (empty? person-id))
    (send! (person-event-req person-id) update-cal-rows!)))

(defn rel-switch [person-id rel-type]
  (condp = rel-type
    s/event (cal-events person-id)
    s/building (map-markers person-id)
    nil))

(defn new-rank-lists! [rel-type is-init?]
  (fn [new-ranks]
    {:pre [(coll? new-ranks)]}
    (state/set! [:rank-lists rel-type] new-ranks)
    (when (> (rand-int 25) 10)
      (->> :rank-lists state/look s/event first :id str cal-events)
      (->> :rank-lists state/look s/building first :id str map-markers))))

(defn fetch-ranks! [rel-type is-init?]
  (send! (people-ranked-req rel-type)
         (new-rank-lists! rel-type is-init?)))

(defn strip-ids [m]
  (reduce #(update %1 %2 vals)
          m (remove #(= % s/type-label) (keys m))))

(defn add-req []
  [:edit/add-entity
   {:fields (-> :new-entity state/look strip-ids)}])

(defn links-to-delete [names name-map]
  (->> name-map keys (remove #(some #{%} (vals names))) (map name-map)))

(defn links-to-add [names name-map]
  (->> names vals (remove empty?) (remove #(contains? name-map %))))

(defn edit-req []
  [:edit/edit-entity
   {:fields (state/look :edit-entity)}])

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

(defn delete-account-req []
  [:update/delete-account
   {:confirmed (state/look :delete-account :confirm-button)}])

(defn delete-account! []
  (if (= "yes" (state/look :delete-account :confirm-button))
    (send! (delete-account-req) identity)
    (js/alert (str "Account not deleted. "
                   "Please select Yes to delete your account."))))

(defn delete-req []
  [:update/delete-entity
   {:id (state/look :current-node :center-node :id)
    :type (state/look :current-node :type)}])

(defn confirm-delete [resp]
  (js/alert "Entity deleted"))

(defn delete-entity! []
  (send! (delete-req) confirm-delete))

(defn change-pwd-req []
  [:update/change-password
   (-> :change-pwd state/look
       (select-keys [:password :confirm]))])

(defn confirm-changed [resp]
  (js/alert "Password changed")
  (state/set! [:tabid] 1))

(defn change-password! []
  (send! (change-pwd-req) confirm-changed))
