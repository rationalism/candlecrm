(ns spectra_cljs.html
  (:require [clojure.string :as str]
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
    (state/update! [:tabid] (constantly tab-num))))

(defn home-header []
  [:div.home-header>table>tr.tab-row
   [:td>h2>a {:href "#" :on-click (set-tab-fn 1)
              :id "set-tab-1"} "People"]
   [:td>h2>a {:href "#" :on-click (set-tab-fn 2)
              :id "set-tab-2"} "Emails"]
   [:td>h2>a {:href "#" :on-click (set-tab-fn 3)
              :id "set-tab-3"} "Calendar"]])

(defn home-content [& content]
  (into [:div.home-content] content))

(defn user-footer []
  [:div {:class "columns small-12"}
   [:p [:a {:href "/gmail"} "Connect to GMail here"]]
   [:p [:a {:href "/logout"} "Logout here"]]])

(defn person-link [person attr]
  [:a {:href (str "/person/" (person :id))}
   (person attr)])

(defn person-cell [person attr]
  [:td (if (= s/name attr)
         (person-link person attr)
         (person attr))])

(defn person-row [person]
  [:tr (map #(person-cell person %) s/person-attrs)])

(defn init-people []
  [:div#init-people
   (do (if (state/look :ajax-live)
         (u/update-people!)
         :unloaded)
       nil)])

(defn people-table []
  [:div {:class "columns small-12"}
   [init-people]
   [:table {:id "people-table"}
    [:thead {:id "people-header"}
     (for [attr s/person-attrs]
       ^{:key attr}
       [:td (get s/attr-names attr)])]
    [:tbody {:id "people-rows"}
     (for [p-row (state/look :people-rows)]
       ^{:key p-row}
       (person-row p-row))]]
   [:a {:href "#" :on-click (u/prev-people!)
        :id "prev-people-page"} "<-- Previous"]
   [:a {:href "#" :on-click (u/next-people!)
        :id "next-people-page"} "Next -->"]])

(def email-attrs {s/email-sent "Date"
                  s/email-subject "Subject"})

(defn email-link [email attr]
  [:a {:href (str "/email/" (email :id))}
   (email attr)])

(defn email-cell [email attr]
  [:td (if (= s/email-subject attr)
         (email-link email attr)
         (email attr))])

(defn email-row [email]
  [:tr (map #(email-cell email %) email-attrs)])

(defn init-emails []
  [:div#init-emails
   (do (if (state/look :ajax-live)
         (u/update-emails!)
         :unloaded)
       nil)])

(defn email-table []
  [:div
   [init-emails]
   [:table {:id "email-table"}
    [:thead {:id "email-header"}
     (for [attr email-attrs]
       ^{:key attr} [:td attr])]
    [:tbody {:id "email-rows"}
     (for [e-row (state/look :email-rows)]
       ^{:key e-row}
       (email-row e-row))]]
   [:a {:href "#" :on-click (u/prev-emails!)
        :id "prev-email-page"} "<-- Previous"]
   [:a {:href "#" :on-click (u/next-emails!)
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

(defn gmail-setup [flash username auth-url]
  [:div {:class "columns small-12"}
   [:h2 "Connect your account to GMail"]
   [:p [:span {:style {:padding "0 0 0 10px" :color "red"}} flash]]
   [:h3 (str "Welcome. Your username is: " username)]
   [:h3 [:a {:href auth-url} "Connect to GMail"]]])

(defn gmail-finished [flash username email-total]
  [:div {:class "columns small-12"}
   [:h2 "Congrats - your account is connected to GMail."]
   [:p [:span {:style {:padding "0 0 0 10px" :color "red"}} flash]]
   [:h3 (str "Welcome. Your username is: " username)]
   [:h3 (str "The number of emails in your inbox is: " email-total)]
   [:h3 "Load emails into database: "
    [:small "(Enter a range of emails in your inbox to load.)"]]
   [:div.row
    [:form {:method "POST" :action "load-emails" :class "columns small-4"}
     [:div.row "Start with: " [:input {:type "text" :name "lower" :required "required"}]]
     [:div.row "End with: " [:input {:type "text" :name "upper" :required "required"}]]
      [:div.row
       [:input {:type "submit" :class "button" :value "Load"}]
       [:span {:style {:padding "0 0 0 10px" :color "red"}} flash]]]]
   [:a {:href "/"} "Return home"]
   [:p "Currently disabled - do this via Ajax calls"]])

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
   (email-table)
   [:h3.infotitle (str "Emails from " person-name)]
   (email-table)])

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
