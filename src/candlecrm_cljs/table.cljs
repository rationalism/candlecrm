(ns candlecrm_cljs.table
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :as util]))

(def person-attrs
  {s/person
   {s/s-name "Name" s/email-addr "Email address"
    s/phone-num "Phone number" s/website "Website"}
   s/organization
   {[s/s-name] "Name" [s/org-member s/s-name] "Members"
    [s/location s/s-name] "Location" [s/website] "Website"}})

(def email-attrs {s/email-sent "Date"
                  s/email-subject "Subject"})

(defn person-link [type person attr]
  [util/node-link
   (if-let [name (util/get-first person attr)]
     name "(No name)")
   (:id person) type])

(defn person-site [person attr]
  [:a {:href (util/get-first person attr)}
   (util/get-first person attr)])

(defn class-name [attr]
  (let [vars (first attr)]
    (if (coll? vars) (->> vars (map name) str/join) (name vars))))

(defn person-cell [type person attr]
  [:td {:class (class-name [attr])}
   (condp = attr
     s/s-name [person-link type person attr]
     [s/s-name] [person-link type person attr]
     s/website [person-site person attr]
     (let [cell (util/get-first person attr)]
       (if (not (map? cell)) cell
           [person-link (:label cell) cell s/s-name])))])

(defn person-row [type person]
  [:tr (for [attr (util/add-ids (type person-attrs))]
         ^{:key (first attr)}
         [person-cell type person (first (second attr))])])

(defn people-table [type]
  [:div
   [:div.prev-next
    [:input {:type "file" :id "contactcsv" :name "contactcsv"
             :class "inputfile" :on-change (js/alert "File uploaded")
             #_(dispatch [:save-rm-file :file (-> % .-target .-files (aget 0))])}]
    [:label {:for "contactcsv" :class "btn btn-primary"}
     "Upload contacts"]]
   [:p [util/add-new type]
    [util/load-box]]
   [:table {:id "people-table" :class "table table-hover"}
    [:thead {:id "people-header" :class "thead-inverse"}
     [:tr
      (for [attr (util/add-ids (type person-attrs))]
        ^{:key (first attr)}
        [:th {:class (class-name (second attr))}
         (second (second attr))])]]
    [:tbody {:id "people-rows"}
     (for [p-row (->> type (state/look :rows) util/add-ids)]
       ^{:key (first p-row)}
       [person-row type (second p-row)])]]])

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
  [:a {:href "javascript:;" :on-click #(u/refresh-email!) :id "email-refresh"
       :class "btn btn-primary new-button" :role "button"}
   [:i {:class "fa fa-refresh"}]
   (str " Refresh email ")])

(defn email-table [row-keys counter update-fn]
  [:div
   (when (= row-keys [:rows s/email])
     [:div
      [:p [refresh-email]
       [util/load-box]]])
   [:table {:id "email-table" :class "table table-hover"}
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
