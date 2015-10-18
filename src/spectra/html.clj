(ns spectra.html
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.schema :as schema])
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

(def person-attrs {schema/name-type "Name"
                   schema/email-address-type "Email"
                   schema/phone-num-type "Phone number"})

(defn header-cell [attr]
  [:td (val attr)])

(defn person-link [person attr]
  [:a {:href (str "/person/" (person :id))}
   (person attr)])

(defn person-cell [person attr]
  [:td (if (= schema/name-type (key attr))
         (person-link person (key attr))
         (person (key attr)))])

(defn person-row [person]
  [:tr (map #(person-cell person %) person-attrs)])

(defn people-table []
  [:div {:class "columns small-12"}
   [:table {:id "people-table"}
    [:thead {:id "people-header"}
     (map header-cell person-attrs)]
    [:tbody {:id "people-rows"}]]
   [:a {:href "#" :onclick "return false;"
        :id "prev-people-page"} "<-- Previous"]
   [:a {:href "#" :onclick "return false;"
        :id "next-people-page"} "Next -->"]])

(defn gmail-setup [flash username auth-url]
  [:div {:class "columns small-12"}
   [:h2 "Connect your account to GMail"]
   [:p [:span {:style "padding:0 0 0 10px;color:red;"} flash]]
   [:h3 (str "Welcome. Your username is: " username)]
   [:a {:href auth-url} "Get started here"]])

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

(defn info-item [item]
  [:p.infoitem (str (key item) ": "
                    (val item))])

(defn show-person [person-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str person-name " (Person)")]
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
