(ns spectra_cljs.pages
  (:require [goog.dom :as dom]
            [goog.events :as events]
            [spectra_cljs.html :as html]
            [spectra_cljc.schema :as s]
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

(defn show-person [person]
  [html/show-person (-> person :center-node :data :name first)
                    (-> person :center-node :data)])

(defn show-email [email]
  [html/show-email (-> email :center-node :data :subject)
                   (-> email :center-node :data)])

(defn show-organization [organization]
  [html/show-organization (-> organization :center-node :data :name first)
                          (-> organization :center-node :data)])

(defn show-location [location]
  [html/show-location (-> location :center-node :data :name first)
                      (-> location :center-node :data)])

(defn show-event [event]
  [html/show-event (-> event :center-node :data :name first)
                   (-> event :center-node :data)])

(defn show-money [money]
  [html/show-money (-> money :center-node :data :name first)
                   (-> money :center-node :data)])

(def node-fn {s/person show-person s/email show-email
              s/organization show-organization s/location show-location
              s/event show-event s/money show-money})

(defn main-page []
  [:div
   [people-tab]
   [email-tab]
   [calendar-tab]
   [locations-tab]])

(defn node-page [node]
  [(get node-fn (:type node)) node])

(defn homepage []
  [:div
   [html/home-header]
   [html/home-content
    [html/user-welcome "" (state/look :user :email-addr)]
    (if (state/look :current-node)
      [node-page (state/look :current-node)]
      [main-page])
    [html/user-footer]]])

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
