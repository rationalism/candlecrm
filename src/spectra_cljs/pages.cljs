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

(defn show-person [person]
  [html/show-person
   (when-let [name (html/get-first (:center-node person) s/s-name)]
     name)
   (html/get-first (:center-node person) s/email-addr)
   (:center-node person)])

(defn show-email [email]
  [html/show-email (-> email :center-node :subject first)
   (:center-node email)])

(defn show-organization [organization]
  [html/show-organization
   (-> organization :center-node :name first)
   (:center-node organization)])

(defn show-location [location]
  [html/show-location
   (-> location :center-node s/s-name first)
   (:center-node location)])

(defn show-event [event]
  [html/show-event
   (-> event :center-node s/s-name first)
   (:center-node event)])

(defn show-money [money]
  [html/show-money
   (-> money :center-node s/s-name first)
   (:center-node money)])

(def node-fn {s/person show-person s/email show-email
              s/organization show-organization s/location show-location
              s/event show-event s/money show-money})

(defn node-page [node]
  [(get node-fn (:type node)) node])

(defn main-page []
  [:div
   (condp = (state/look :tabid)
     1 [:div#tab1.tab-show [html/people-table]]
     2 [:div#tab2.tab-show [all-email-table]]
     3 [:div#tab3.tab-show [html/calendar]]
     4 [:div#tab4.tab-show [html/locations]]
     5 [:div#tab5.tab-show [html/my-account]]
     6 [node-page (state/look :current-node)]
     7 [html/entity-form "Add new person"
        (html/add-ids (s/person html/entity-attrs))
        [:new-entity]
        (html/submit-new-entity s/person)
        (when (state/look :new-entity-msg)
          [html/add-message])]
     8 [html/entity-form
        (str "Edit " (-> :current-node (state/look :type) name)
             " named " (-> (state/look :current-node :center-node s/s-name)
                           first second))
        (html/add-ids (s/person html/entity-attrs))
        [:current-node :center-node] #(u/edit-entity!)
        (when (state/look :edit-entity-msg)
          [html/edit-message])]
     9 [html/search-results]
     [:div "Error: Page not found."])])

(defn homepage []
  [:div
   [html/home-header]
   [html/home-content
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
