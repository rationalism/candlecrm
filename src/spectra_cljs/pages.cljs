(ns spectra_cljs.pages
  (:require [goog.dom :as dom]
            [goog.events :as events]
            [spectra_cljs.html :as html]
            [spectra_cljs.state :as state]
            [reagent.core :as r]
            [jayq.core :as jq])
  (:use [jayq.core :only [$]]))

(defn people-tab []
  (if (= (state/look :tabid) 1)
    [:div#tab1.tab-show [html/people-table]]
    [:div#tab1.tab-hide [html/people-table]]))

(defn email-tab []
  (if (= (state/look :tabid) 2)
    [:div#tab2.tab-show [html/email-table]]
    [:div#tab2.tab-hide [html/email-table]]))

(defn calendar-tab []
  (if (= (state/look :tabid) 3)
    [:div#tab3.tab-show [html/calendar]]
    [:div#tab3.tab-hide [html/calendar]]))

(defn locations-tab []
  (if (= (state/look :tabid) 4)
    [:div#tab4.tab-show [html/locations]]
    [:div#tab4.tab-hide [html/locations]]))

(defn main-page []
  [:div
   [people-tab]
   [email-tab]
   [calendar-tab]
   [locations-tab]])

(defn homepage []
  [:div
   [html/home-header]
   [html/home-content
    [html/user-welcome "" (state/look :user :username)]
    (if (state/look :current-node)
      [:h2 "here is some node"]
      [main-page])
    [html/user-footer]]])

(defn show-person [person]
  [html/show-person (-> person :data :name first)
                    (-> person :data)])

(defn show-email [email]
  [html/show-email (-> email :data :name first)
                   (-> email :data)])

(defn show-organization [organization]
  [html/show-organization (-> organization :data :name first)
                          (-> organization :data)])

(defn show-location [location]
  [html/show-location (-> location :data :name first)
                      (-> location :data)])

(defn show-event [event]
  [html/show-event (-> event :data :name first)
                   (-> event :data)])

(defn show-money [money]
  [html/show-money (-> money :data :name first)
                   (-> money :data)])

(defn insert-rows! [table n]
  (dotimes [i n]
    (-> table
        (.insertRow -1)
        (.insertCell -1)
        (.-innerHTML)
        (set! i))))

(defn insert-table-body! [body html]
  (set! (.-innerHTML body) html))

(defn table-body [table]
  (if (> (.-length (.-tBodies table)) 0)
    (first (array-seq (.-tBodies table))) nil))

(defn render-all! []
  (r/render-component [homepage]
                      (dom/getElement "content")))
