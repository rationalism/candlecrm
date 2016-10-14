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

(defn on-scroll [_e]
  (when (and (not (state/look :scroll-lock))
             (< (u/scroll-pos-rev) 200))
    (state/set! [:scroll-lock] true)
    (when-let [tabid (state/tabname-types (state/look :tabid))]
      (state/update! [:page-lengths tabid] inc 10)
      (u/update-switch! (state/look :tabid))
      (js/setTimeout #(on-scroll _e) 1500)))
  (state/set! [:scroll-lock] true))

(defn user-welcome [username]
  [:div
   [:h3 (str "Welcome. Your email is: " username)]])

(defn home-content [& content]
  [:div {:class "col-sm-9 offset-sm-3 col-md-10 offset-md-2 main"}
   (into [:div#main-page {:class ""}]
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
     [:form
      [:div {:class "form-group"}
       [:span.select-text "Select a person: "]
       [:select {:class (str "form-control people-list-" (name rel-type))
                 :on-change #(u/rel-switch (.. % -target -value) rel-type)}
        (for [person (add-ids (state/look :rank-lists rel-type))]
          ^{:key (first person)}
          [person-option (second person)])]]]]]])

(defn calendar []
  [:div#calendar
   [people-ranks s/event] [:br]
   [calendar/calendar-box]])

(defn locations []
  [:div#locations
   [people-ranks s/building] [:br]
   [map/map-box]])

(defn tab-class [num]
  (if (= num (state/look :tabid))
    "nav-item active"
    "nav-item"))

(defn header-tab [logo-class num name]
  [:li {:class (tab-class num)}
   [:a {:href (str "/app/" num) :class "nav-link"
        :id (str "set-tab-" num)}
    [:i {:class logo-class}]
    (str " " name)]])

(defn home-header []
  [:nav {:class "navbar navbar-dark navbar-fixed-top bg-inverse"}
   [:a {:class "navbar-brand" :href "/app"}
    "CandleCRM"]
   [:div#navbar
    [:nav {:class "nav navbar-nav pull-xs-right"}
     [:ul {:class "nav navbar-nav"}
      [header-tab "" "account" "My Account"]]]
    [:div {:class "form-inline pull-xs-right"}
     [search/search-box]]]])

(defn side-header []
  [:div {:class "col-sm-3 col-md-2 sidebar"}
   [:ul {:class "nav nav-sidebar"}
    [header-tab "fa fa-list-ul" "agenda" "Agenda"]
    [header-tab "fa fa-users" "people" "People"]
    [header-tab "fa fa-briefcase" "orgs" "Companies"]
    [header-tab "fa fa-envelope" "email" "Emails"]
    [header-tab "fa fa-calendar" "calendar" "Calendar"]
    [header-tab "fa fa-globe" "map" "Locations"]]])

(defn my-account []
  [:div
   [:h2 "My Account"]
   [user-welcome (state/look :user :email-addr)]
   [user/user-footer]])

(defn all-email-table []
  [:div
   [table/email-table [:rows s/email] s/email u/update-emails!]])

(defn show-node [node]
  [node/show-node (get-title node)
   (:center-node node) true])

(defn main-page []
  [:div
   (condp = (state/look :tabid)
     "people" [:div#tab1.tab-show [table/people-table s/person]]
     "email" [:div#tab2.tab-show [all-email-table]]
     "calendar" [:div#tab3.tab-show [calendar]]
     "map" [:div#tab4.tab-show [locations]]
     "account" [:div#tab5.tab-show [my-account]]
     "node" [show-node (state/look :current-node)]
     "add" (edit/add-form)
     "edit" (edit/edit-form)
     "search" [search/search-results]
     "agenda" [calendar/agenda]
     "orgs" [:div#tab11.tab-show [table/people-table s/organization]]
     [:div "Error: Page not found."])])

(defn homepage []
  [:div 
   [home-header]
   [:div {:class "container-fluid"}
    [:div {:class "row"}
     [side-header]
     [home-content
      [:h2 ""]
      [main-page]]]]])

(defn insert-rows! [table n]
  (dotimes [i n]
    (-> table
        (.insertRow -1)
        (.insertCell -1)
        (.-innerHTML)
        (set! i))))

(defn render-all! []
  (r/render [homepage] (dom/getElement "content")))
