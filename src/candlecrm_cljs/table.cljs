(ns candlecrm_cljs.table
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :as util]))

(def person-attrs
  {s/s-name "Name" s/email-addr "Email address"
   s/phone-num "Phone number" s/website "Website"})

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
  [:tr (for [attr (util/add-ids person-attrs)]
         ^{:key (first attr)}
         [person-cell person (first (second attr))])])

(defn people-table []
  [:div
   [util/prev-next-box :people u/update-people!
    (count (state/look :people-rows)) :people]
   [:p [util/add-new s/person]
    [util/load-box]]
   [:table {:id "people-table" :class "table"}
    [:thead {:id "people-header" :class "thead-inverse"}
     [:tr
      (for [attr (util/add-ids person-attrs)]
        ^{:key (first attr)}
        [:th {:class (name (first (second attr)))}
         (second (second attr))])]]
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
     [util/email-date-display (util/get-first email attr)]
     :else (util/get-first email attr))])

(defn email-row [email]
  [:tr (for [attr (-> email-attrs keys util/add-ids)]
         ^{:key (first attr)}
         [email-cell email (second attr)])])

(defn refresh-email []
  [:a {:href "#" :on-click #(u/refresh-email!) :id "email-refresh"
       :class "btn btn-primary new-button" :role "button"}
   [:i {:class "fa fa-refresh"}]
   (str " Refresh email ")])

(defn email-table [row-keys counter update-fn]
  [:div
   (when (= row-keys [:email-rows])
     [:div
      [util/prev-next-box counter update-fn
       (count (apply state/look row-keys)) :email]
      [:p [refresh-email]
       [util/load-box]]])
   [:table {:id "email-table" :class "table"}
    [:thead {:id "email-header" :class "thead-inverse"}
     [:tr
      (for [attr (util/add-ids email-attrs)]
        ^{:key (first attr)}
        [:th {:class (name (first (second attr)))}
         (second attr)])]]
    [:tbody {:id "email-rows"}
     (for [e-row (util/add-ids (apply state/look row-keys))]
       ^{:key (first e-row)}
       [email-row (second e-row)])]]])
