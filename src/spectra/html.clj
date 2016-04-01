(ns spectra.html
  (:require [environ.core :refer [env]]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [spectra_cljc.schema :as s]
            [ring.util.anti-forgery :refer :all]))

;; TODO: Reorganize this by page
;; TODO: Add CDN local fallback in case something fails
(def goog-jquery "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js")
(def goog-maps (str "https://maps.googleapis.com/maps/api/js?v=3&key="
                    (env :gmaps-api-key)))

(defn pure-css []
  [:link {:rel "stylesheet"
          :href "/css/pure-release-0.6.0/pure-min.css"}])

(defn viewport []
  [:meta {:name "viewport"
          :content "width=device-width, initial-scale=1"}]) 

(defn login-box [content]
  [:div {:class "pure-g"}
   [:div {:class "pure-u-1-8"}]
   (into [:div#content {:class "pure-u-3-4"}]
         content)])

(defn app-box [content]
  [:div {:class "pure-g"}
   (into [:div#content {:class "pure-u-1-1"}]
         content)])

(defn header-box []
  [:div#page-header {:class "pure-g"}
   [:div {:class "pure-u-1-12"}]
   [:div {:class "pure-u-5-6"}
    [:h1 "Spectra"]]])

(defn footer-box []
  [:div#page-footer {:class "pure-g"}
   [:div {:class "pure-u-1-12"}]
   [:div {:class "pure-u-5-6"}
    [:p "© 2016 Alyssa Vance"]]])

(defn base-template [& content]
  (html5 {:lang "en"}
         [:head [:title "Spectra"]
          (pure-css) (viewport)
          (include-css "/css/main.css")]
         [:body
          (header-box)
          (login-box content)
          (footer-box)
          (include-js goog-jquery)
          (include-js "/js/login.js")]))

(defn app-template [& content]
  (html5 {:lang "en"}
         [:head [:title "Spectra"]
          (pure-css) (viewport)
          (include-css "/css/fullcalendar.min.css")
          (include-css "/css/main.css")]
         [:body
          (header-box)
          (app-box content)
          (footer-box)
          (include-js goog-maps)
          (include-js goog-jquery)
          (include-js "https://code.highcharts.com/highcharts.js")
          (include-js "/js/libs/moment.min.js")
          (include-js "/js/libs/fullcalendar-2.6.1/fullcalendar.js")
          (include-js "/js/main.js")]))
          ;[:script "google.maps.core.main();"]]))

(defn signup-form [flash]
  [:div {:class "row"}
   [:div
    [:span flash]
    [:div.row
     [:form {:method "POST" :action "create-account"
             :class "pure-form pure-form-aligned" :id "signupForm" :novalidate ""}
      [:fieldset
       (anti-forgery-field)
       [:legend [:h2 "Sign up"]]
       [:div.pure-control-group
        [:label {:for "signupUsername"} "Email "]
        [:input {:type "text" :name "username"
                 :id "signupUsername" :required "required"}]]
       [:div.pure-control-group
        [:label {:for "signupPassword"} "Password "]
        [:input {:type "password" :name "password"
                 :id "signupPassword" :required "required"}]]
       [:div.pure-control-group
        [:label {:for "signupConfirm"} "Confirm "]
        [:input {:type "password" :name "confirm"
                 :id "signupConfirm" :required "required"}]]
       [:div.pure-controls
        [:input {:class "pure-button pure-button-primary"
                 :value "Sign up" :type "submit"}]
        [:span {:style "padding:0 0 0 10px;color:red;"
                :id "signupError"} flash]]]]]]])

(defn login-form []
  [:div
   [:form {:method "POST" :action "login" :class "pure-form pure-form-aligned"
           :id "loginForm" :novalidate ""}
    [:fieldset
     (anti-forgery-field)
     [:legend [:h2 "Log in"]]
     [:div.pure-control-group
      [:label {:for "loginUsername"} "Email "]
      [:input {:type "text" :name "username"
               :id "loginUsername"}]]
     [:div.pure-control-group
      [:label {:for "loginPassword"} "Password "]
      [:input {:type "password" :name "password"
               :id "loginPassword"}]]
     [:div.pure-controls
      [:input {:class "pure-button pure-button-primary"
               :value "Login" :type "submit"}]
      [:a {:id "pass-reset-link" :href "/reset-password"}
       "(Forgot password?)"]
      [:span {:style "padding:0 0 0 10px;color:red;"
              :id "loginError"}]]]]])

(defn reset-pwd []
  [:div
   [:form {:method "POST" :action "request-reset"
           :class "pure-form pure-form-aligned"
           :id "resetPassForm" :novalidate ""}
    [:fieldset
     (anti-forgery-field)
     [:legend [:h2 "Reset password"]]
     [:div.pure-control-group
      [:label {:for "resetUsername"} "Email "]
      [:input {:type "text" :name "username"
               :id "resetUsername"}]]
     [:div.pure-controls
      [:input {:class "pure-button pure-button-primary"
               :value "Request reset" :type "submit"}]]]]])

(defn new-password [user token]
  [:div
   [:form {:method "POST" :action "set-password"
           :class "pure-form pure-form-aligned"
           :id "changePassForm" :novalidate ""}
    [:fieldset
     (anti-forgery-field)
     [:legend [:h2 "Set a new password for "
               (-> user :data s/email-addr)]]
     [:input {:type "hidden" :name "reset-token"
              :id "setPwdToken" :required "required"
              :value token}]
     [:div.pure-control-group
      [:label {:for "setPwd"} "New password "]
      [:input {:type "password" :name "password"
               :id "setPwd" :required "required"}]]
     [:div.pure-control-group
      [:label {:for "setPwdConfirm"} "Confirm new password "]
      [:input {:type "password" :name "confirm"
               :id "setPwdConfirm" :required "required"}]]
     [:div.pure-controls
      [:input {:class "pure-button pure-button-primary"
               :value "Set new password" :type "submit"}]]]]])

(defn login-needed [uri]
  [:h2 "You do not have sufficient privileges to access " uri])

(defn unauthorized-error []
  [:h2 "Error: Access to this page is unauthorized."])

(defn not-found-error []
  [:div
   [:h2 "Error: No such object can be found."]])

(defn gmail-setup [flash username auth-url]
  [:div
   [:h2 "Set up your account by connecting your email"]
   [:p [:span {:style {:padding "0 0 0 10px" :color "red"}} flash]]
   [:h3 (str "Your email address is: " username)]
   [:h3 "Select an email provider"]
   [:a {:class "pure-button pure-button-primary" :href auth-url}
    [:h3 "GMail"]]])

(defn gmail-finished [flash username email-total]
  [:div
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
  [:div
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
