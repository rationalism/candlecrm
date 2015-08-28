(ns clojure-getting-started.html
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]])
  (:use [hiccup.core] [hiccup.page]
        [ring.util.anti-forgery]))

(defn splash-body []
  (pr-str ["Hello Alyssa (template), " :from 'Heroku]))

(defn base-template [& content]
  (html5 {:lang "en"}
         [:head [:title "Welcome to guestbook"]
          (include-css "css/screen.css")]
         [:body [:h1 "Hi there! Welcome :)"]
          (into [:div.content] content)]))

(defn user-home [flash username]
  [:div {:class "columns small-12"}
   [:h3 "Success! You are logged in now"]
   [:h3 (str "Welcome. Your username is: " username)]
   [:span {:style "padding:0 0 0 10px;color:red;"} flash]
   [:p [:a {:href "/gmail"} "Connect to GMail here"]]
   [:p [:a {:href "/logout"} "Logout here"]]])

(defn gmail-setup [flash username auth-url]
  [:div {:class "columns small-12"}
   [:h2 "Connect your account to GMail"]
   [:p [:span {:style "padding:0 0 0 10px;color:red;"} flash]]
   [:h3 (str "Welcome. Your username is: " username)]
   [:a {:href auth-url} "Get started here"]])

(defn gmail-finished [flash username]
  [:div {:class "columns small-12"}
   [:h2 "Congrats - your account is connected to GMail."]
   [:p [:span {:style "padding:0 0 0 10px;color:red;"} flash]]
   [:h3 (str "Welcome. Your username is: " username)]
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
     [:form {:method "POST" :action "create-account" :class "columns small-4"}
      (anti-forgery-field)
      [:div.row "Email " [:input {:type "text" :name "username" :required "required"}]]
      [:div.row "Password " [:input {:type "password" :name "password" :required "required"}]]
      [:div.row "Confirm " [:input {:type "password" :name "confirm" :required "required"}]]
      [:div.row
       [:input {:type "submit" :class "button" :value "Sign up"}]
       [:span {:style "padding:0 0 0 10px;color:red;"} flash]]]]]])

(defn login-form []
  [:div {:class "columns small-12"}
   [:h3 "Login"]
   [:form {:method "POST" :action "login" :class "columns small-4"}
    (anti-forgery-field)
    [:div.row "Email " [:input {:type "text" :name "username"}]]
    [:div.row "Password " [:input {:type "password" :name "password"}]]
    [:div.row [:input {:type "submit" :class "button" :value "Login"}]]]])

(defn login-needed [uri]
  [:h2 "You do not have sufficient privileges to access " uri])
