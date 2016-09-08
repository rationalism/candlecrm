(ns candlecrm.html
  (:require [candlecrm.environ :refer [env]]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [candlecrm.common :refer :all]
            [candlecrm_cljc.schema :as s]
            [ring.util.anti-forgery :refer :all]))

;; TODO: Reorganize this by page
;; TODO: Add CDN local fallback in case something fails
(def goog-jquery "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js")

(defn goog-maps []
  (str "https://maps.googleapis.com/maps/api/js?v=3&key="
       (env :gmaps-api-key)))

(defn bootstrap-css []
  [:link {:rel "stylesheet"
          :href (str "https://maxcdn.bootstrapcdn.com/bootstrap/"
                     "4.0.0-alpha.4/css/bootstrap.min.css")
          :integrity "2hfp1SzUoho7/TsGGGDaFdsuuDL0LX2hnUp6VkX3CUQ2K4K+xjboZdsXyp4oUHZj"
          :crossorigin "anonymous"}])

(defn jquery-js []
  [:script {:src "https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"
            :integrity "sha384-THPy051/pYDQGanwU6poAc/hOdQxjnOEXzbT+OuUAFqNqFjL+4IGLBgCJC3ZOShY"
            :crossorigin "anonymous"}])

(defn tether-js []
  [:script {:src "https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.min.js"
            :integrity "sha384-Plbmg8JY28KFelvJVai01l8WyZzrYWG825m+cZ0eDDS1f7d/js6ikvy1+X+guPIB"
            :crossorigin "anonymous"}])

(defn bootstrap-js []
  [:script {:src "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/js/bootstrap.min.js"
            :integrity "VjEeINv9OSwtWFLAtmc4JCtEJXXBub00gtSnszmspDLCtC0I4z4nqz7rEFbIZLLU"
            :crossorigin "anonymous"}])

(defn font-awesome []
  [:script {:src "https://use.fontawesome.com/6cf2e50a67.js"}])

(defn charset []
  [:meta {:charset "utf-8"}])

(defn viewport []
  [:meta {:name "viewport"
          :content "width=device-width, initial-scale=1, shrink-to-fit=no"}]) 

(defn ie-render []
  [:meta {:http-equiv "x-ua-compatible" :content "ie-edge"}])

(defn contact-page []
  [:div
   [:h2 "Contact us"]
   [:p (str "If you're interested in CandleCRM, feel free to contact us"
            " at admin@candlecrm.com.")]])

(defn homepage []
  [:div {:class ""}
   [:h2 "The CRM That Updates Itself"] [:hr]
   [:p (str "CandleCRM is the only CRM that uses artificial"
            " intelligence (AI) to replace manual data entry."
            " CandleCRM can \"read\" emails, and figure out who your best"
            " customers are, what company they work for, when"
            " your next meeting with them is, and more. And when"
            " new emails arrive, it updates itself, seamlessly"
            " and automatically.")]
   [:p (str "Because your data is entered automatically, you can start"
            " using CandleCRM in under thirty seconds. Give it a try -"
            " just jump in and go.")]
   [:p (str "CandleCRM is currently in private beta. Check"
            " back soon for more updates!")]])

(defn login-box [content]
  [:div {:class ""}
   [:div {:class ""}]
   (into [:div#content {:class ""}]
         content)])

(defn app-box [content]
  [:div {:class ""}
   (into [:div#content {:class ""}]
         content)])

(defn header-box []
  [:div#page-header {:class ""}
   [:div {:class ""}]
   [:div {:class "main-logo"}
    [:img {:src "/candlecrm_logo.png" :class ""}]]])

(defn footer-box []
  [:div#page-footer {:class ""}
   [:div {:class ""}]
   [:div#main-page {:class ""}
    [:p "© 2016 CandleCRM"]]])

(defn tab-class []
  "")

(defn header-tab [logo-class name link-to]
  [:li {:class (tab-class)}
   [:h3
    [:a {:href link-to :class ""}
     [:i {:class logo-class}]
     (str "  " name)]]])

(defn home-header []
  [:div#menu-bar {:class ""}
   [:div {:class ""}]
   [:div {:class ""}
    [:div {:class "menu-icons"}
     [:ul {:class ""}
      (header-tab "fa fa-home" "Home" "/")
      (header-tab "fa fa-sign-in" "Log In" "/login.html")
      (header-tab "fa fa-envelope" "Contact" "/contact.html")]]]])

(defn base-template [& content]
  (html5 {:lang "en"}
         [:head [:title "CandleCRM"]
          (charset) (viewport) (ie-render)
          (bootstrap-css) (font-awesome)
          (include-css "/css/main.css")]
         [:body
          (home-header)
          (login-box content)
          (footer-box)
          (jquery-js) (tether-js) (bootstrap-js)
          (include-js "/js/login.js")]))

(defn app-template [& content]
  (html5 {:lang "en"}
         [:head [:title "CandleCRM"]
          (charset) (viewport) (ie-render)
          (bootstrap-css) (font-awesome)
          (include-css "/css/dashboard.css")
          (include-css "/css/fullcalendar.min.css")
          (include-css "/css/main.css")]
         [:body
          (app-box content)
          (include-js (goog-maps))
          (jquery-js) (tether-js) (bootstrap-js)
          (include-js "https://code.highcharts.com/highcharts.js")
          (include-js "/js/libs/moment.min.js")
          (include-js "/js/libs/fullcalendar-2.8.0/fullcalendar.js")
          (if (in-dev?)
            (include-js "/js/dev/main.js")
            (include-js "/js/main.js"))]))

(defn signup-form [flash]
  [:div {:class "row"}
   [:div
    [:div.row
     [:form {:method "POST" :action "create-account"
             :class "" :id "signupForm" :novalidate ""}
      [:fieldset
       (anti-forgery-field)
       [:legend [:h2 "Sign up"]]
       [:div.
        [:label {:for "signupUsername"} "Email "]
        [:input {:type "text" :name "username"
                 :id "signupUsername" :required "required"}]]
       [:div.
        [:label {:for "signupPassword"} "Password "]
        [:input {:type "password" :name "password"
                 :id "signupPassword" :required "required"}]]
       [:div.
        [:label {:for "signupConfirm"} "Confirm "]
        [:input {:type "password" :name "confirm"
                 :id "signupConfirm" :required "required"}]]
       [:div
        [:input {:class "btn btn-primary" 
                 :value "Sign up" :type "submit"}]
        [:span {:style "padding:0 0 0 10px;color:red;"
                :id "signupError"} flash]]]]]]])

(defn login-form []
  [:div
   [:form {:method "POST" :action "login" :class ""
           :id "loginForm" :novalidate ""}
    [:fieldset
     (anti-forgery-field)
     [:legend [:h2 "Log in"]]
     [:div.
      [:label {:for "loginUsername"} "Email "]
      [:input {:type "text" :name "username"
               :id "loginUsername"}]]
     [:div.
      [:label {:for "loginPassword"} "Password "]
      [:input {:type "password" :name "password"
               :id "loginPassword"}]]
     [:div
      [:input {:class "btn btn-primary"
               :value "Login" :type "submit"}]
      [:a {:id "pass-reset-link" :href "/reset-password"}
       "(Forgot password?)"]
      [:span {:style "padding:0 0 0 10px;color:red;"
              :id "loginError"}]]]]])

(defn reset-pwd []
  [:div
   [:form {:method "POST" :action "request-reset"
           :class ""
           :id "resetPassForm" :novalidate ""}
    [:fieldset
     (anti-forgery-field)
     [:legend [:h2 "Reset password"]]
     [:div.
      [:label {:for "resetUsername"} "Email "]
      [:input {:type "text" :name "username"
               :id "resetUsername"}]]
     [:div
      [:input {:class "btn btn-primary"
               :value "Request reset" :type "submit"}]]]]])

(defn new-password [user token]
  [:div
   [:form {:method "POST" :action "set-password"
           :class ""
           :id "changePassForm" :novalidate ""}
    [:fieldset
     (anti-forgery-field)
     [:legend [:h2 "Set a new password for "
               (.get user (name s/email-addr))]]
     [:input {:type "hidden" :name "reset-token"
              :id "setPwdToken" :required "required"
              :value token}]
     [:div.
      [:label {:for "setPwd"} "New password "]
      [:input {:type "password" :name "password"
               :id "setPwd" :required "required"}]]
     [:div.
      [:label {:for "setPwdConfirm"} "Confirm new password "]
      [:input {:type "password" :name "confirm"
               :id "setPwdConfirm" :required "required"}]]
     [:div
      [:input {:class "btn btn-primary"
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
   [:a {:class "" :href auth-url}
    [:h3 "GMail"]]])
