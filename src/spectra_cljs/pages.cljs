(ns spectra_cljs.pages
  (:require [goog.dom :as dom]
            [goog.events :as events]
            [spectra_cljs.html :as html]
            [spectra_cljc.schema :as s]
            [reagent.core :as r]))

(defonce state
  (r/atom
   {:counters {:people 0 :email 0}
    :page-lengths {:people 20 :email 20}
    :user {:username "Joe Bob Smith"}}))

(defn get-state [& args]
  (get-in @state args))

(defn person-pos []
  (* (get-state :counters :people)
     (get-state :page-lengths :people)))

(defn email-pos []
  (* (get-state :counters :email)
     (get-state :page-lengths :email)))

(defn homepage []
  [:div
   (html/home-header)
   (html/home-content
    (html/user-welcome "" (get-state :user :username))
    (html/people-table)
    (html/email-table)
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
   {:start (person-pos)
    :limit (get-state :page-lengths :people)}])
  
(defn update-people! [chsk-send!]
  (when-let [people-table (dom/getElement "people-table")]
    (fetch-rows! chsk-send! people-table (people-req))))

(defn prev-people! [chsk-send!]
  (when (< 0 (get-state :counters :people))
    (swap! state update-in [:counters :people] dec)
    (update-people! chsk-send!)))

(defn next-people! [chsk-send!]
  (swap! state update-in [:counters :people] inc)
  (update-people! chsk-send!))

(defn email-req []
  [:pages/fetch-emails
   {:start (email-pos)
    :limit (get-state [:page-lengths :people])}])
  
(defn update-emails! [chsk-send!]
  (when-let [email-table (dom/getElement "email-table")]
    (fetch-rows! chsk-send! email-table (email-req))))

(defn prev-emails! [chsk-send!]
  (when (< 0 (get-state :counters :email))
    (swap! state update-in [:counters :email] dec)
    (update-emails! chsk-send!)))

(defn next-emails! [chsk-send!]
  (swap! state update-in [:counters :email] inc)
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
  (r/render-component [simple-component]
                      (dom/getElement "content")))
