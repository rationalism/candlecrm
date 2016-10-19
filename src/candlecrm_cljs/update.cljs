(ns candlecrm_cljs.update
  (:require [clojure.set :as set]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljc.schema :as s]
            [cljs-http.client :as http]))

(def timeout timeout)
(def token-element "__anti-forgery-token")

(defn csrf-token []
  (.-value (.getElementById js/document token-element)))

(defn scroll-pos []
  (.-pageYOffset js/window))

(defn scroll-pos-rev []
  (- (.-scrollHeight (.-body js/document))
     (.-innerHeight js/window) (scroll-pos)))

(defn get-first [node attr]
  (->> (get node attr) (into [])
       (sort-by second >)
       ffirst))

(defn send! [req update-fn]
  ((state/look :ajax-chan) req 5000 update-fn))

(defn log-req [message]
  [:alert/warn-log {:message message}])

(defn alert-log! [message]
  (send! (log-req message) (constantly :logged)))

(defn column-req [coldata]
  [:edit/push-contacts {:columns coldata}])

(defn contacts-ready! [_resp]
  (state/set! [:tabid] "people")
  (state/set! [:upload-col-map] {}))

(defn push-columns! [coldata]
  (send! (column-req coldata) contacts-ready!))

(defn people-req [type]
  [:pages/fetch-people
   {:start (state/person-pos type) :type type
    :limit (state/look :page-lengths type)}])

(defn set-people! [type rows]
  {:pre [(coll? rows)]}
  (state/set! [:rows type] rows))

(defn update-people! [type]
  (send! (people-req type) (partial set-people! type)))

(defn agenda-req []
  [:pages/fetch-agenda
   {:start (state/agenda-pos)
    :limit (state/look :page-lengths s/event)}])

(defn set-agenda! [rows]
  {:pre [(coll? rows)]}
  (state/set! [:agenda-events] rows))

(defn update-agenda! []
  (send! (agenda-req) set-agenda!))

(defn refresh-req []
  [:update/refresh-email])

(defn refresh-email! []
  (send! (refresh-req) identity))

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
    :limit (state/look :page-lengths s/email)}])

(defn email-person-req [link-type]
  [:pages/person-emails
   {:person-id (state/look :current-node :center-node :id)
    :link link-type
    :start (state/email-person-pos link-type)
    :limit (state/look :page-lengths s/email)}])

(defn set-emails! [rows]
  {:pre [(coll? rows)]}
  (state/set! [:rows s/email] rows))

(defn update-emails! []
  (send! (email-req) set-emails!))

(defn email-callback [link-type]
  (fn [resp]
    (state/set! [:current-node link-type] resp)
    (state/set! [:tabid] "node")))

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

(defn update-emails-node! [type]
  (when (= type s/person)
    (update-emails-person! s/email-to)
    (update-emails-person! s/email-from)))

(defn update-node []
  (fn [req]
    (state/set! [:current-node] (new-node req (s/type-label req)))
    (state/set! [:prop-filters] {})
    (state/set! [:notes-edit] false)
    (state/set! [:tabid] "node")
    (update-emails-node! (s/type-label req))))

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
   :start 0 :limit (state/look :page-lengths :menu)})

(defn people-ranked-req [rel-type]
  [:pages/people-ranked (rel-map rel-type)])

(defn person-event-req [person-id]
  [:pages/person-events
   (assoc (rel-map s/event) :person-id person-id)])

(defn person-place-req [person-id]
  [:pages/person-places
   (assoc (rel-map s/building) :person-id person-id)])

(defn get-begin [cal]
  (if-let [begin (get-first cal [s/event-begin])]
    begin (->> (get cal [s/date-time]) sort first)))

(defn normalize-cal [cal]
  (-> (assoc cal :start (get-begin cal))
      (assoc :end (get-first cal [s/event-end]))
      (assoc :url (str "/app/node/event/" (:id cal)))
      (dissoc [s/event-begin] [s/event-end])
      (assoc :title
             (get-first (get-first cal [s/link-to s/text-mentions s/email-subject])
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

(defn devectorize [m]
  (->> m (into [])
       (remove #(and (coll? (first %)) (> (count (first %)) 1)))
       (map (fn [[k v]] [(if (coll? k) (first k) k) v]))
       (mapv vec) (into {})))

(defn find-delete-links [names name-map]
  (->> name-map keys (remove #(some #{%} (vals names))) (map name-map)))

(defn find-add-links [names name-map]
  (->> names vals (remove empty?) (remove #(contains? name-map %))))

(defn link-keys [cache]
  (->> cache state/look keys (filter coll?)
       (filter #(= 2 (count %)))))

(defn find-new-links []
  (->> (map #(find-add-links
              (state/look :new-entity %) {})
            (link-keys :new-entity)) 
       (zipmap (link-keys :new-entity))))

(defn add-req []
  [:edit/add-entity
   {:fields (-> :new-entity state/look devectorize strip-ids)
    :add-links (find-new-links)}])

(defn find-links [link-fn]
  (->> (map #(link-fn (state/look :edit-entity %)
                      (state/look :edit-node-map %))
            (link-keys :edit-entity)) 
       (zipmap (link-keys :edit-entity))))

(defn edit-req []
  [:edit/edit-entity
   {:fields (-> :edit-entity state/look devectorize)
    :add-links (find-links find-add-links)
    :delete-links (find-links find-delete-links)}])

(defn new-entity-confirm! [resp]
  (state/set! [:new-entity] {})
  (state/set! [:new-entity-msg] resp))

(defn add-entity! []
  (send! (add-req) new-entity-confirm!))

(defn edit-entity-confirm! [resp]
  (state/set! [:edit-entity-msg] resp)
  (go-node! (:id resp) (:label resp)))

(defn edit-entity! []
  (send! (edit-req) edit-entity-confirm!))

(defn search-req [query]
  [:update/search {:query query}])

(defn list-search-results! [resp]
  (state/set! [:search-results] resp))

(defn run-search! [query]
  (send! (search-req query) list-search-results!))

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
  (condp = (s/type-label resp)
    s/person (update-people! s/person)
    s/organization (update-people! s/organization)
    s/email (update-emails!)
    s/event (do (update-agenda!) (fetch-ranks! s/event false))
    s/building (fetch-ranks! s/building false)
    :success))

(defn delete-entity! []
  (send! (delete-req) confirm-delete))

(defn change-pwd-req []
  [:update/change-password
   (-> :change-pwd state/look
       (select-keys [:password :confirm]))])

(defn confirm-changed [resp]
  (js/alert "Password changed")
  (state/set! [:tabid] "people"))

(defn change-password! []
  (send! (change-pwd-req) confirm-changed))

(defn update-switch! [tabname]
  (condp = tabname
    "email" (update-emails!)
    "people" (update-people! s/person)
    "orgs" (update-people! s/organization)
    "agenda" (update-agenda!)
    "node" (update-emails-node!
            (state/look :current-node :center-node :label)) 
    nil))

(defn update-tables! []
  (when (not (state/look :loading))
    (state/set! [:loading] true)
    (js/setTimeout #(state/set! [:loading] false) 1000)
    (if (< (scroll-pos) 200)
      (update-switch! (state/look :tabid))
      (when-let [refresh-key (state/tabname-types (state/look :tabid))]
        (state/update! [:should-refresh] assoc refresh-key true)))
    (fetch-ranks! s/event false)
    (fetch-ranks! s/building false)))

(defn notes-req []
  [:edit/edit-notes
   {:notes (state/look :notes-text)
    :node (state/look :current-node :center-node)}])

(defn new-notes [resp]
  (state/set! [:notes-edit] false)
  (state/set! [:notes-text] "")
  (go-node! (:id resp) (:label resp)))

(defn edit-notes! []
  (send! (notes-req) new-notes))

(defn upload-file! [file]
  (http/post "/upload"
             {:multipart-params [["upload-file" file]]
              :headers {"x-csrf-token" (csrf-token)}}))
