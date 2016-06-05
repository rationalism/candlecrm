(ns spectra_cljs.pages
  (:require [goog.dom :as dom]
            [goog.events :as events]
            [spectra_cljs.calendar :as calendar]
            [spectra_cljs.edit :as edit]
            [spectra_cljs.map :as map]
            [spectra_cljs.node :as node]
            [spectra_cljc.schema :as s]
            [spectra_cljs.search :as search]
            [spectra_cljs.state :as state]
            [spectra_cljs.table :as table]
            [spectra_cljs.update :as u]
            [spectra_cljs.user :as user]
            [spectra_cljs.util :refer [get-first add-ids]]
            [reagent.core :as r]
            [jayq.core :as jq])
  (:use [jayq.core :only [$]]))

(defn user-welcome [username]
  [:div
   [:h3 (str "Welcome. Your email is: " username)]])

(defn home-content [& content]
  [:div {:class "pure-g"}
   [:div {:class "pure-u-1-12"}]
   (into [:div {:class "pure-u-5-6"}]
         content)])

(defn person-option [person]
  [:option {:value (:id person)}
   (str (get-first person s/s-name)
        " (" (get-first person s/email-addr) ")")])

(defn people-ranks [rel-type]
  [:div>span "Select a person: "
   [:form {:class "pure-form"}
    [:select {:class (str "people-list-" rel-type " pure-input-1-2")
              :on-change #(u/rel-switch (.. % -target -value) rel-type)}
     (for [person (add-ids (state/look :rank-lists rel-type))]
       ^{:key (first person)}
       [person-option (second person)])]]])

(defn calendar []
  [:div#calendar
   [people-ranks s/event]
   [:br]
   [calendar/calendar-box]])

(defn locations []
  [:div#locations
   [people-ranks s/location]
   [:br]
   [map/map-box]])

(defn filter-display [attrs]
  (filter #(-> % key s/attr-names) attrs))

(defn set-tab-fn [tab-num]
  (fn []
    (state/set! [:tabid] tab-num)
    (state/set! [:current-node] nil)))

(defn tab-class [num]
  (if (= num (state/look :tabid))
    "pure-menu-item pure-menu-selected"
    "pure-menu-item"))

(defn header-tab [num name]
  [:li {:class (tab-class num)}
   [:h3>a
    {:href "#" :class "pure-menu-link"
     :on-click (set-tab-fn num)
     :id (str "set-tab-" num)} name]])

(defn home-header []
  [:div#menu-bar {:class "pure-g"}
   [:div {:class "pure-u-1-12"}]
   [:div {:class "pure-u-7-12"}
    [:div {:class "pure-menu pure-menu-horizontal menu-icons"}
     [:ul {:class "pure-menu-list"}
      [header-tab 1 "People"]
      [header-tab 2 "Emails"]
      [header-tab 3 "Calendar"]
      [header-tab 4 "Locations"]
      [header-tab 5 "My Account"]]]]
   [:div#right-menu {:class "pure-u-1-4"}
    [:div {:class "pure-menu pure-menu-horizontal menu-icons"}
     [search/search-box]]]])   

(defn my-account []
  [:div
   [:h2 "My Account"]
   [user-welcome (state/look :user :email-addr)]
   [user/user-footer]])

(defn all-email-table []
  [:div
   [table/email-table [:email-rows] :email u/update-emails!]])

(defn show-person [person]
  [node/show-person
   (when-let [name (get-first (:center-node person) s/s-name)]
     name)
   (get-first (:center-node person) s/email-addr)
   (:center-node person)])

(defn show-email [email]
  [node/show-email 
   (get-first (:center-node email) s/email-subject)
   (:center-node email)])

(defn show-organization [organization]
  [node/show-organization
   (-> organization :center-node :name first)
   (get-first (:center-node organization) s/s-name)
   (:center-node organization)])

(defn show-location [location]
  [node/show-location
   (get-first (:center-node location) s/s-name)
   (:center-node location)])

(defn show-event [event]
  [node/show-event
   (get-first (:center-node event) s/s-name)
   (:center-node event)])

(defn show-money [money]
  [node/show-money
   (get-first (:center-node money) s/s-name)
   (:center-node money)])

(def node-fn {s/person show-person s/email show-email
              s/organization show-organization s/location show-location
              s/event show-event s/money show-money})

(defn node-page [node]
  [(get node-fn (:type node)) node])

(defn main-page []
  [:div
   (condp = (state/look :tabid)
     1 [:div#tab1.tab-show [table/people-table]]
     2 [:div#tab2.tab-show [all-email-table]]
     3 [:div#tab3.tab-show [calendar]]
     4 [:div#tab4.tab-show [locations]]
     5 [:div#tab5.tab-show [my-account]]
     6 [node-page (state/look :current-node)]
     7 (edit/add-form)
     8 (edit/edit-form)
     9 [search/search-results]
     [:div "Error: Page not found."])])

(defn homepage []
  [:div
   [home-header]
   [home-content
    [:h2 ""]
    [main-page]]])

(defn insert-rows! [table n]
  (dotimes [i n]
    (-> table
        (.insertRow -1)
        (.insertCell -1)
        (.-innerHTML)
        (set! i))))

(defn render-all! []
  (r/render [homepage] (dom/getElement "content")))
