(ns spectra.html
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [environ.core :refer [env]]
            [spectra.datetime :as dt]
            [spectra.schema :as s])
  (:use [hiccup.core] [hiccup.page]
        [ring.util.anti-forgery]))

(defn base-template [& content]
  (html5 {:lang "en"}
         [:head [:title "Spectra"]
          (include-css "/css/screen.css")]
         [:body [:h1 "Hi there! Welcome :)"]
          (into [:div.content] content)
          (include-js "/js/main.js")]))

(defn user-welcome [flash username]
  [:div {:class "columns small-12"}
   [:h3 "Success! You are logged in now"]
   [:h3 (str "Welcome. Your username is: " username)]
   [:span {:style "padding:0 0 0 10px;color:red;"} flash]])

(defn user-footer []
  [:div {:class "columns small-12"}
   [:p [:a {:href "/gmail"} "Connect to GMail here"]]
   [:p [:a {:href "/logout"} "Logout here"]]])

(defn header-cell [attr] [:td attr])

(defn person-link [person attr]
  [:a {:href (str "/person/" (person :id))}
   (person attr)])

(defn person-cell [person attr]
  [:td (if (= s/name attr)
         (person-link person attr)
         (person attr))])

(defn person-row [person]
  (prn "person-row")
  [:tr (map #(person-cell person %) s/person-attrs)])

(defn people-table []
  [:div {:class "columns small-12"}
   [:table {:id "people-table"}
    [:thead {:id "people-header"}
     (->> s/person-attrs
          (map s/attr-names)
          (map header-cell))]
    [:tbody {:id "people-rows"}]]
   [:a {:href "#" :onclick "return false;"
        :id "prev-people-page"} "<-- Previous"]
   [:a {:href "#" :onclick "return false;"
        :id "next-people-page"} "Next -->"]])

(def email-attrs {s/email-sent "Date"
                  s/email-subject "Subject"})

(defn email-table []
  [:table {:id "email-table"}
   [:thead {:id "email-header"}
    (map header-cell email-attrs)]
   [:tbody {:id "email-rows"}]]
  [:a {:href "#" :onclick "return false;"
       :id "prev-email-page"} "<-- Previous"]
  [:a {:href "#" :onclick "return false;"
       :id "next-email-page"} "Next -->"])

(defn gmail-setup [flash username auth-url]
  [:div {:class "columns small-12"}
   [:h2 "Connect your account to GMail"]
   [:p [:span {:style "padding:0 0 0 10px;color:red;"} flash]]
   [:h3 (str "Welcome. Your username is: " username)]
   [:h3 [:a {:href auth-url} "Connect to GMail"]]])

(defn gmail-finished [flash username email-total]
  [:div {:class "columns small-12"}
   [:h2 "Congrats - your account is connected to GMail."]
   [:p [:span {:style "padding:0 0 0 10px;color:red;"} flash]]
   [:h3 (str "Welcome. Your username is: " username)]
   [:h3 (str "The number of emails in your inbox is: " email-total)]
   [:h3 "Load emails into database: "
    [:small "(Enter a range of emails in your inbox to load.)"]]
   [:div.row
    [:form {:method "POST" :action "load-emails" :class "columns small-4"}
     (anti-forgery-field)
     [:div.row "Start with: " [:input {:type "text" :name "lower" :required "required"}]]
     [:div.row "End with: " [:input {:type "text" :name "upper" :required "required"}]]
      [:div.row
       [:input {:type "submit" :class "button" :value "Load"}]
       [:span {:style "padding:0 0 0 10px;color:red;"} flash]]]]
   [:a {:href "/"} "Return home"]])

(defn homepage []
  [:h2 "This is the app's homepage"])

(defn signup-form [flash]
  [flash]
  [:div {:class "row"}
   [:div {:class "columns small-12"}
    [:h3 "Sign up "
     [:small "(Any user/pass combination will do, as you are creating a new account or profile.)"]]
    [:div.row
     [:form {:method "POST" :action "create-account" :class "columns small-4"
             :id "signupForm" :novalidate ""}
      (anti-forgery-field)
      [:div.row "Email " [:input {:type "text" :name "username"
                                  :id "signupUsername" :required "required"}]]
      [:div.row "Password " [:input {:type "password" :name "password"
                                     :id "signupPassword" :required "required"}]]
      [:div.row "Confirm " [:input {:type "password" :name "confirm"
                                    :id "signupConfirm" :required "required"}]]
      [:div.row
       [:input {:type "submit" :class "button" :value "Sign up"}]
       [:span {:style "padding:0 0 0 10px;color:red;"
               :id "signupError"} flash]]]]]])

(defn login-form []
  [:div {:class "columns small-12"}
   [:h3 "Login"]
   [:form {:method "POST" :action "login" :class "columns small-4"
           :id "loginForm" :novalidate ""}
    (anti-forgery-field)
    [:div.row "Email " [:input {:type "text" :name "username"
                                :id "loginUsername"}]]
    [:div.row "Password " [:input {:type "password" :name "password"
                                   :id "loginPassword"}]]
    [:div.row
     [:input {:type "submit" :class "button" :value "Login"}]
     [:span {:style "padding:0 0 0 10px;color:red;"
               :id "loginError"}]]]])

(defn login-needed [uri]
  [:h2 "You do not have sufficient privileges to access " uri])

(defn string-item [item prop]
  (cond (coll? item) (str/join ", " item)
        (= prop s/date-time) (dt/format-date item)
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

(defn ajax-test []
  [:div {:class "columns small-12"}
   [:h1 "Sente reference example"]
   [:p "An Ajax/WebSocket connection has been configured (random)."]
   [:hr]
   [:p [:strong "Step 1: "] "Open browser's JavaScript console."]
   [:p [:strong "Step 2: "] "Try: "
    [:button#btn1 {:type "button"} "chsk-send! (w/o reply)"]
    [:button#btn2 {:type "button"} "chsk-send! (with reply)"]]
   ;;
   [:p [:strong "Step 3: "] "See browser's console + nREPL's std-out." ]
   ;;
   [:hr]
   [:h2 "Login with a user-id"]
   [:p  "The server can use this id to send events to *you* specifically."]
   [:p [:input#input-login {:type :text :placeholder "User-id"}]
    [:button#btn-login {:type "button"} "Secure login!"]]])
