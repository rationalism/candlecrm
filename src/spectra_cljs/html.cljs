(ns spectra_cljs.html
  (:require [clojure.string :as str]
            [spectra_cljs.ajax :as ajax]
            [spectra_cljc.schema :as s]
            [spectra_cljs.state :as state]
            [spectra_cljs.update :as u]
            [reagent.core :as r]
            [jayq.core :as jq])
  (:use [jayq.core :only [$]]))

;; TODO: Reorganize this by page

(defn user-welcome [flash username]
  [:div {:class "columns small-12"}
   [:h3 "Success! You are logged in now"]
   [:h3 (str "Welcome. Your username is: " username)]
   [:span {:style {:padding "0 0 0 10px" :color "red"}} flash]])

(defn set-tab-fn [tab-num]
  (fn []
    (state/update! [:tabid] (constantly tab-num))
    (state/update! [:current-node] (constantly nil))))

(defn header-tab [num name]
  [:td>h2>a {:href "#" :on-click (set-tab-fn num)
             :id (str "set-tab-" num)} name])

(defn home-header []
  [:div.home-header>table>tr.tab-row
   [header-tab 1 "People"]
   [header-tab 2 "Emails"]
   [header-tab 3 "Calendar"]
   [header-tab 4 "Locations"]])

(defn node-link [text id type]
  [:a.go-node
   {:href "#" :on-click #(u/go-node! ajax/chsk-send! id type)}
   text])

(defn home-content [& content]
  (into [:div.home-content] content))

(defn user-footer []
  [:div {:class "columns small-12"}
   [:p [:a {:href "/gmail"} "Connect to GMail here"]]
   [:p [:a {:href "/logout"} "Logout here"]]])

(defn person-link [person attr]
  [node-link (person attr) (person :id) s/person])

(defn person-cell [person attr]
  [:td (if (= s/s-name attr)
         [person-link person attr]
         (person attr))])

(defn person-row [person]
  [:tr (for [attr s/person-attrs]
         ^{:key attr}
         [person-cell person attr])])

(defn people-table []
  [:div {:class "columns small-12"}
   [:table {:id "people-table"}
    [:thead {:id "people-header"}
     (for [attr s/person-attrs]
       ^{:key attr}
       [:td (get s/attr-names attr)])]
    [:tbody {:id "people-rows"}
     (for [p-row (state/look :people-rows)]
       ^{:key p-row}
       [person-row p-row])]]
   [:a {:href "#" :on-click (u/prev-people! ajax/chsk-send!)
        :id "prev-people-page"} "<-- Previous"]
   [:a {:href "#" :on-click (u/next-people! ajax/chsk-send!)
        :id "next-people-page"} "Next -->"]])

(def email-attrs {s/email-sent "Date"
                  s/email-subject "Subject"})

(defn email-link [email attr]
  [node-link (email attr) (email :id) s/email])

(defn email-cell [email attr]
  [:td (if (= s/email-subject attr)
         [email-link email attr]
         (email attr))])

(defn email-row [email]
  [:tr (for [attr (keys email-attrs)]
         ^{:key attr}
         [email-cell email attr])])

(defn email-table []
  [:div
   [:table {:id "email-table"}
    [:thead {:id "email-header"}
     (for [attr email-attrs]
       ^{:key attr} [:td attr])]
    [:tbody {:id "email-rows"}
     (for [e-row (state/look :email-rows)]
       ^{:key (:id e-row)}
       [email-row e-row])]]
   [:a {:href "#" :on-click (u/prev-emails! ajax/chsk-send!)
        :id "prev-email-page"} "<-- Previous"]
   [:a {:href "#" :on-click (u/next-emails! ajax/chsk-send!)
        :id "next-email-page"} "Next -->"]])

(defn calendar-load! []
  (.fullCalendar ($ :#calendar)))

(defn calendar []
  (r/create-class
   {:component-did-mount #(calendar-load!)
    :display-name "calendar-tab"
    :reagent-render
    (fn []
      [:div#calendar
       [:h2 "Calendar goes here"]])}))

(defn map-did-mount [this]
  (let [map-canvas (r/dom-node this)
        map-options (clj->js {"center" (google.maps.LatLng. -34.397, 150.644)
                              "zoom" 8})]
        (js/google.maps.Map. map-canvas map-options)))

(defn location-html []
  [:div#locations {:style {:height "300px"}}
   [:h2 "Map goes here"]])

(defn locations []
  (r/create-class {:reagent-render location-html
                   :component-did-mount map-did-mount}))

(defn login-needed [uri]
  [:h2 "You do not have sufficient privileges to access " uri])

(defn string-item [item prop]
  (cond (coll? item) (str/join ", " item)
        (= prop s/date-time) item
        :else item))

(defn info-item [item]
  [:p.infoitem (str (-> item key s/attr-names) ": "
                    (-> item val (string-item (key item))))])

(defn show-person [person-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str person-name " (Person)")]
   (map info-item attrs)
   [:h3.infotitle (str "Emails to " person-name)]
   [email-table]
   [:h3.infotitle (str "Emails from " person-name)]
   [email-table]])

(defn show-email [email-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str email-name " (Email)")]
   (map info-item attrs)])

(defn show-organization [organization-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str organization-name " (Organization)")]
   (map info-item attrs)])

(defn show-location [location-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str location-name " (Location)")]
   (map info-item attrs)])

(defn show-event [event-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str event-name " (Event)")]
   (map info-item attrs)])

(defn show-money [money-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str money-name " (Finance)")]
   (map info-item attrs)])

(defn unauthorized-error []
  [:h2 "Error: Access to this page is unauthorized."])

(defn not-found-error []
  [:div {:class "columns small-12"}
   [:h2 "Error: No such object can be found."]])
