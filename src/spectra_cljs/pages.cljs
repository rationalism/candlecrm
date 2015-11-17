(ns spectra_cljs.pages
  (:require [goog.dom :as dom]
            [goog.events :as events]
            [spectra_cljs.html :as html]
            [spectra_cljs.state :as state]
            [spectra_cljc.schema :as s]
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

(defn homepage []
  [:div
   (html/home-header)
   (html/home-content
    (html/user-welcome "" (state/look :user :username))
    (people-tab)
    (email-tab)
    (calendar-tab)
    (html/user-footer))])

(defn first-if-coll [coll]
  (if (coll? coll) (first coll) coll))

(defn first-table-vals [person]
  (->> person
       (map #(hash-map (key %)
                       (first-if-coll (val %))))
       (reduce merge)))

(defn node-attrs [node]
  (merge (:data node)
         (hash-map :id (:id node))))

(defn tablify-hits [hits]
  (->> (map node-attrs hits) 
       (remove #(empty? %))
       (filter #(contains? % s/name))
       (map first-table-vals)))

(defn show-person [person]
  (html/show-person (-> person :data :name first)
                    (-> person :data)))

(defn show-email [email]
  (html/show-email (-> email :data :name first)
                   (-> email :data)))

(defn show-organization [organization]
  (html/show-organization (-> organization :data :name first)
                          (-> organization :data)))

(defn show-location [location]
  (html/show-location (-> location :data :name first)
                      (-> location :data)))

(defn show-event [event]
  (html/show-event (-> event :data :name first)
                   (-> event :data)))

(defn show-money [money]
  (html/show-money (-> money :data :name first)
                   (-> money :data)))

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

(defn fetch-rows! [chsk-send! table req-type]
  (chsk-send! req-type 5000
              (fn [inner-html]
                (insert-table-body! (table-body table)
                                    inner-html))))

(defn people-req []
  [:pages/fetch-people
   {:start (state/person-pos)
    :limit (state/look :page-lengths :people)}])
  
(defn update-people! [chsk-send!]
  (when-let [people-table (dom/getElement "people-table")]
    (fetch-rows! chsk-send! people-table (people-req))))

(defn prev-people! [chsk-send!]
  (when (< 0 (state/look :counters :people))
    (state/update! [:counters :people] dec)
    (update-people! chsk-send!)))

(defn next-people! [chsk-send!]
  (state/update! [:counters :people] inc)
  (update-people! chsk-send!))

(defn email-req []
  [:pages/fetch-emails
   {:start (state/email-pos)
    :limit (state/look [:page-lengths :people])}])
  
(defn update-emails! [chsk-send!]
  (when-let [email-table (dom/getElement "email-table")]
    (fetch-rows! chsk-send! email-table (email-req))))

(defn prev-emails! [chsk-send!]
  (when (< 0 (state/look :counters :email))
    (state/update! [:counters :email] dec)
    (update-emails! chsk-send!)))

(defn next-emails! [chsk-send!]
  (state/update! [:counters :email] inc)
  (update-emails! chsk-send!))

(def listeners {"prev-people-page" prev-people!
                "next-people-page" next-people!
                "prev-email-page" prev-emails!
                "next-email-page" next-emails!})

(defn listen! [chsk-send!]
  (doseq [l listeners]
    (when-let [trigger (dom/getElement (key l))]
      (set! (.-onclick trigger)
            (partial (val l) chsk-send!)))))

(defn simple-component []
  [:div
   [:p "I am a component!"]
   [:p.someclass
    "I have " [:strong "bold"]
    [:span {:style {:color "red"}} " and red "] "text."]])

(defn render-all! []
  (r/render-component [homepage]
                      (dom/getElement "content")))
