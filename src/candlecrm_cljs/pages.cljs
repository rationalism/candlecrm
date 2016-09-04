(ns candlecrm_cljs.pages
  (:require [goog.dom :as dom]
            [goog.events :as events]
            [candlecrm_cljs.calendar :as calendar]
            [candlecrm_cljs.edit :as edit]
            [candlecrm_cljs.map :as map]
            [candlecrm_cljs.node :as node]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.search :as search]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.table :as table]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.user :as user]
            [candlecrm_cljs.util :refer
             [get-first add-ids add-new new-entity-switch
              load-box get-title]]
            [reagent.core :as r]
            [jayq.core :as jq])
  (:use [jayq.core :only [$]]))

(defn user-welcome [username]
  [:div
   [:h3 (str "Welcome. Your email is: " username)]])

(defn home-content [& content]
  [:div {:class "pure-g"}
   [:div {:class "pure-u-1-12"}]
   (into [:div#main-page {:class "pure-u-5-6"}]
         content)])

(defn person-option [person]
  [:option {:value (:id person)}
   (str (get-first person s/s-name)
        " (" (get-first person s/email-addr) ")")])

(defn people-ranks [rel-type]
  [:div#rank-box
   [:div#add-entity
    [add-new rel-type] [load-box]]
   [:div#people-ranks
    [:span
     [:span.select-text "Select a person: "]
     [:form {:class "pure-form"}
      [:select {:class (str "people-list-" (name rel-type))
                :on-change #(u/rel-switch (.. % -target -value) rel-type)}
       (for [person (add-ids (state/look :rank-lists rel-type))]
         ^{:key (first person)}
         [person-option (second person)])]]]]])

(defn calendar []
  [:div#calendar
   [people-ranks s/event] [:br]
   [calendar/calendar-box]])

(defn locations []
  [:div#locations
   [people-ranks s/building] [:br]
   [map/map-box]])

(defn set-tab-fn [tab-num]
  (fn []
    (state/set! [:tabid] tab-num)
    (state/set! [:current-node] nil)))

(defn tab-class [num]
  (if (= num (state/look :tabid))
    "pure-menu-item pure-menu-selected"
    "pure-menu-item"))

(defn header-tab [logo-class num name]
  [:li {:class (tab-class num)}
   [:h3>a
    {:href "#" :class "pure-menu-link"
     :on-click (set-tab-fn num)
     :id (str "set-tab-" num)}
    [:i {:class logo-class}]
    (str " " name)]])

(defn home-header []
  [:div#menu-bar {:class "pure-g"}
   [:div {:class "pure-u-1-12"}]
   [:div {:class "pure-u-7-12"}
    [:div {:class "pure-menu pure-menu-horizontal menu-icons"}
     [:ul {:class "pure-menu-list"}
      [header-tab "fa fa-list-ul" 10 "Agenda"]
      [header-tab "fa fa-users" 1 "People"]
      [header-tab "fa fa-envelope" 2 "Emails"]
      [header-tab "fa fa-calendar" 3 "Calendar"]
      [header-tab "fa fa-globe" 4 "Locations"]
      [header-tab "fa fa-cog" 5 "My Account"]]]]
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

(defn show-node [node]
  [node/show-node (get-title node)
   (:center-node node) true])

(defn main-page []
  [:div
   (condp = (state/look :tabid)
     1 [:div#tab1.tab-show [table/people-table]]
     2 [:div#tab2.tab-show [all-email-table]]
     3 [:div#tab3.tab-show [calendar]]
     4 [:div#tab4.tab-show [locations]]
     5 [:div#tab5.tab-show [my-account]]
     6 [show-node (state/look :current-node)]
     7 (edit/add-form)
     8 (edit/edit-form)
     9 [search/search-results]
     10 [calendar/agenda]
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
