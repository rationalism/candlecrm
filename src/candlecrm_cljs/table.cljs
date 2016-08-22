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

(defn person-site [person attr]
  [:a {:href (util/get-first person attr)}
   (util/get-first person attr)])

(defn person-cell [person attr]
  [:td {:class (name attr)}
   (condp = attr
     s/s-name [person-link person attr]
     s/website [person-site person attr]
     (util/get-first person attr))])

(defn person-row [person]
  [:tr (for [attr (util/add-ids (s/person entity-attrs))]
         ^{:key (first attr)}
         [person-cell person (second attr)])])

(defn people-table []
  [:div
   [util/prev-next-box :people u/update-people!
    (count (state/look :people-rows)) :people]
   [:p [:a {:href "#" :on-click #(util/new-entity-switch s/person)
            :id "add-new-person" :class "pure-button"} "Add new person"]
    [:span (if (state/look :loading) "  (Loading...)" "")]]
   [:table {:id "people-table" :class "pure-table pure-table-horizontal"}
    [:thead {:id "people-header"}
     [:tr
      (for [attr (util/add-ids (s/person entity-attrs))]
        ^{:key (first attr)}
        [:td {:class (name (second attr))}
         (get s/attr-names (second attr))])]]
    [:tbody {:id "people-rows"}
     (for [p-row (-> :people-rows state/look util/add-ids)]
       ^{:key (first p-row)}
       [person-row (second p-row)])]]])

(defn email-link [email attr]
  [util/node-link (->> email attr (sort-by second >) ffirst)
   (email :id) s/email])

(defn email-cell [email attr]
  [:td {:class (name attr)}
   (cond
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
   [util/prev-next-box counter update-fn
    (count (apply state/look row-keys)) :email]
   [:table {:id "email-table" :class "pure-table pure-table-horizontal"}
    [:thead {:id "email-header"}
     [:tr
      (for [attr (util/add-ids email-attrs)]
        ^{:key (first attr)}
        [:td {:class (name (first (second attr)))}
         (second attr)])]]
    [:tbody {:id "email-rows"}
     (for [e-row (util/add-ids (apply state/look row-keys))]
       ^{:key (first e-row)}
       [email-row (second e-row)])]]])

