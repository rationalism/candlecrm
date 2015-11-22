(ns spectra.html
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [environ.core :refer [env]]
            [spectra.datetime :as dt]
            [spectra_cljc.schema :as s])
  (:use [hiccup.core] [hiccup.page]
        [ring.util.anti-forgery]))

;; TODO: Reorganize this by page
;; TODO: Add CDN local fallback in case something fails
(def goog-jquery "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js")
(def goog-maps (str "https://maps.googleapis.com/maps/api/js?v=3&key="
                    (env :gmaps-api-key)))

(defn base-template [& content]
  (html5 {:lang "en"}
         [:head [:title "Spectra"]
          (include-css "/css/screen.css")]
         [:body 
          (into [:div#content] content)
          (include-js goog-jquery)
          (include-js "/js/login.js")]))

(defn app-template [& content]
  (html5 {:lang "en"}
         [:head [:title "Spectra"]
          (include-css "/css/fullcalendar.min.css")
          (include-css "/css/screen.css")]
         [:body 
          (into [:div#content] content)
          (include-js goog-maps)
          (include-js goog-jquery)
          (include-js "/js/libs/moment.min.js")
          (include-js "/js/libs/fullcalendar-2.4.0/fullcalendar.js")
          (include-js "/js/main.js")]))
          ;[:script "google.maps.core.main();"]]))

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

(defn unauthorized-error []
  [:h2 "Error: Access to this page is unauthorized."])

(defn not-found-error []
  [:div {:class "columns small-12"}
   [:h2 "Error: No such object can be found."]])

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
