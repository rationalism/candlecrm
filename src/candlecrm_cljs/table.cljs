(ns candlecrm_cljs.table
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :as util]))

(def entity-attrs
  {s/person [s/s-name s/email-addr s/phone-num
             s/website]})

(def email-attrs {s/email-sent "Date"
                  s/email-subject "Subject"})

(defn person-link [person attr]
  [util/node-link
   (if-let [name (util/get-first person attr)]
     name "(No name)")
   (person :id) s/person])

(defn new-entity-switch [type]
  (state/set! [:input-meta :type] type)
  (state/set! [:input-meta :attr-list]
              (type entity-attrs))
  (doseq [attr (type entity-attrs)]
    (state/set! [:new-entity attr] {0 ""}))
  (state/set! [:tabid] 7))

(defn person-site [person attr]
  [:a {:href (util/get-first person attr)}
   (util/get-first person attr)])

(defn person-cell [person attr]
  [:td (condp = attr
         s/s-name [person-link person attr]
         s/website [person-site person attr]
         (util/get-first person attr))])

(defn person-row [person]
  [:tr (for [attr (util/add-ids (s/person entity-attrs))]
         ^{:key (first attr)}
         [person-cell person (second attr)])])

(defn prev-next-box [counter update-fn num-rows row-type]
  [:div.prev-next
   (when (> (state/look :counters counter) 0)
     [:a {:href "#" :on-click (u/prev-fetch! counter update-fn)
          :class "prev-email-page pure-button"} "<-- Previous"])
   (when (= num-rows (state/look :page-lengths row-type))
     [:a {:href "#" :on-click (u/next-fetch! counter update-fn)
          :class "next-email-page pure-button"} "Next -->"])])

(defn people-table []
  [:div
   [prev-next-box :people u/update-people!
    (count (state/look :people-rows)) :people]
   [:p [:a {:href "#" :on-click #(new-entity-switch s/person)
            :id "add-new-person" :class "pure-button"} "Add new person"]
    [:span (if (state/look :loading) "  (Loading...)" "")]]
   [:table {:id "people-table" :class "pure-table pure-table-horizontal"}
    [:thead {:id "people-header"}
     [:tr
      (for [attr (util/add-ids (s/person entity-attrs))]
        ^{:key (first attr)}
        [:td (get s/attr-names (second attr))])]]
    [:tbody {:id "people-rows"}
     (for [p-row (-> :people-rows state/look util/add-ids)]
       ^{:key (first p-row)}
       [person-row (second p-row)])]]])

(defn email-link [email attr]
  [util/node-link (->> email attr (sort-by second >) ffirst)
   (email :id) s/email])

(defn email-cell [email attr]
  [:td (cond
         (= s/email-subject attr) [email-link email attr]
         (some #{attr} s/date-times)
         [util/date-display (util/get-first email attr)]
         :else (util/get-first email attr))])

(defn email-row [email]
  [:tr (for [attr (-> email-attrs keys util/add-ids)]
         ^{:key (first attr)}
         [email-cell email (second attr)])])

(defn email-table [row-keys counter update-fn]
  [:div
   [prev-next-box counter update-fn
    (count (apply state/look row-keys)) :email]
   [:table {:id "email-table" :class "pure-table pure-table-horizontal"}
    [:thead {:id "email-header"}
     [:tr
      (for [attr (util/add-ids email-attrs)]
        ^{:key (first attr)}
        [:td (second attr)])]]
    [:tbody {:id "email-rows"}
     (for [e-row (util/add-ids (apply state/look row-keys))]
       ^{:key (first e-row)}
       [email-row (second e-row)])]]])
