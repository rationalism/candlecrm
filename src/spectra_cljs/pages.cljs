(ns spectra_cljs.pages
  (:require [goog.dom :as dom]
            [goog.events :as events]
            [spectra_cljs.html :as html]
            [spectra_cljc.schema :as s]
            [spectra_cljs.state :as state]
            [spectra_cljs.update :as u] 
            [reagent.core :as r]
            [jayq.core :as jq])
  (:use [jayq.core :only [$]]))

(defn all-email-table []
  [:div
   [html/email-table [:email-rows] :email u/update-emails!]])

(defn tab-switch []
  (condp = (state/look :tabid)
    1 [:div#tab1.tab-show [html/people-table]]
    2 [:div#tab1.tab-show [all-email-table]]
    3 [:div#tab1.tab-show [html/calendar]]
    4 [:div#tab1.tab-show [html/locations]]
    5 [:div#tab1.tab-show [html/my-account]]
    [:div "Error: Page not found."]))

(defn show-person [person]
  [html/show-person (-> person :center-node :name first)
                    (:center-node person)])

(defn show-email [email]
  [html/show-email (-> email :center-node :subject)
                   (:center-node email)])

(defn show-organization [organization]
  [html/show-organization (-> organization :center-node :name first)
                          (:center-node organization)])

(defn show-location [location]
  [html/show-location (-> location :center-node :name first)
                      (:center-node location)])

(defn show-event [event]
  [html/show-event (-> event :center-node :name first)
                   (:center-node event)])

(defn show-money [money]
  [html/show-money (-> money :center-node :name first)
                   (:center-node money)])

(def node-fn {s/person show-person s/email show-email
              s/organization show-organization s/location show-location
              s/event show-event s/money show-money})

(defn main-page []
  [:div
   [tab-switch]])

(defn node-page [node]
  [(get node-fn (:type node)) node])

(defn homepage []
  [:div
   [html/home-header]
   [html/home-content
    [:h2 ""]
    (cond
      (state/look :current-node)
      [node-page (state/look :current-node)]
      (state/look :input-new :type)
      [html/new-entity (state/look :input-new :type)
       (state/look :input-new :attrs)]
      :else [main-page])]])

(defn insert-rows! [table n]
  (dotimes [i n]
    (-> table
        (.insertRow -1)
        (.insertCell -1)
        (.-innerHTML)
        (set! i))))

(defn render-all! []
  (r/render [homepage] (dom/getElement "content")))
