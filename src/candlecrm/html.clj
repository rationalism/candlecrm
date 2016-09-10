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
                     "4.0.0-alpha.4/css/bootstrap.min.css")}])

(defn jquery-js []
  [:script {:src "https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"
            :integrity "sha384-THPy051/pYDQGanwU6poAc/hOdQxjnOEXzbT+OuUAFqNqFjL+4IGLBgCJC3ZOShY"
            :crossorigin "anonymous"}])

(defn tether-js []
  [:script {:src "https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.min.js"
            :integrity "sha384-Plbmg8JY28KFelvJVai01l8WyZzrYWG825m+cZ0eDDS1f7d/js6ikvy1+X+guPIB"
            :crossorigin "anonymous"}])

(defn bootstrap-js []
  [:script {:src "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/js/bootstrap.min.js"}])

(defn font-awesome []
  [:script {:src "https://use.fontawesome.com/6cf2e50a67.js"}])

(defn charset []
  [:meta {:charset "utf-8"}])

(defn viewport []
  [:meta {:name "viewport"
          :content "width=device-width, initial-scale=1, shrink-to-fit=no"}]) 

(defn ie-render []
  [:meta {:http-equiv "x-ua-compatible" :content "ie-edge"}])

(defn footer-box []
  [:footer#copyright [:hr]
   [:p "© 2016 CandleCRM"]])

(defn contact-page []
  [:div#homepage {:class "container"}
   [:div {:class "row"}
    [:div {:class "col-xs-8"}
     [:br]
     [:h2 "Contact us"]
     [:p (str "If you're interested in trying CandleCRM, please contact us"
              " at admin@candlecrm.com.")]]]
   (footer-box)])

(defn homepage []
  [:div#homepage
   [:div {:class "jumbotron"}
    [:div {:class "container"}
     [:h1 {:class "display-3"} "A CRM that updates itself."]
     [:p (str "CandleCRM uses artificial intelligence (AI) to keep"
              " itself up-to-date, replacing manual data entry.")]
     [:p [:a {:class "btn btn-primary btn-lg" :href "/contact.html"
              :role "button"}
          "Contact us"]]]]
   [:div {:class "container"}
    [:div {:class "row"}
     [:div {:class "col-md-4"}
      [:img {:class "img-fluid m-x-auto img-circle home-circle"
             :src "/images/email_circle.jpg"}]
      [:h2 {:class "text-xs-center"} "Email integration"]
      [:p {:class "text-xs-center"}
       (str "CandleCRM can \"read\" emails, and figure out who your best"
            " customers are, what company they work for, when"
            " your next meeting with them is, and more. And when"
            " new emails arrive, it updates itself, seamlessly"
            " and automatically.")]]
     [:div {:class "col-md-4"}
      [:img {:class "img-fluid m-x-auto img-circle home-circle"
             :src "/images/relax.jpg"}]
      [:h2 {:class "text-xs-center"} "Easy to use"]
      [:p {:class "text-xs-center"}
       (str "Because your data is entered automatically, you can start"
            " using CandleCRM in under thirty seconds. Give it a try -"
            " just jump in and go.")]]
     [:div {:class "col-md-4"}
      [:img {:class "img-fluid m-x-auto img-circle home-circle"
             :src "/images/soon.jpg"}]
      [:h2 {:class "text-xs-center"} "Coming soon"]
      [:p {:class "text-xs-center"}
       (str "CandleCRM is in private beta. Check"
            " back soon for more updates!")]]]
    (footer-box)]])

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

(defn tab-class []
  "nav-item")

(defn header-tab [logo-class name link-to]
  [:li {:class (tab-class)}
   [:a {:href link-to :class "nav-link"}
    #_[:i {:class logo-class}]
    name]])

(defn home-header []
  [:nav#frontbar
   {:class "navbar navbar-static-top navbar-dark bg-inverse"}
   [:a {:class "navbar-brand" :href "#"}
    "CandleCRM"]
   [:ul {:class "nav navbar-nav pull-xs-right"}
    (header-tab "" "Home" "/")
    (header-tab "" "Log In" "/login.html")
    (header-tab "" "Contact" "/contact.html")]])

(defn base-template [& content]
  (html5 {:lang "en"}
         [:head [:title "CandleCRM"]
          (charset) (viewport) (ie-render)
          (bootstrap-css) (font-awesome)
          (include-css "/css/jumbotron.css")
          (include-css "/css/main.css")]
         [:body
          (home-header)
          (login-box content)
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
   [:div {:class "col-xs-5"}
    [:form {:method "POST" :action "create-account"
            :class "" :id "signupForm" :novalidate ""}
     [:fieldset {:class "form-group"}
      (anti-forgery-field)
      [:legend [:h2 "Sign up"]]
      [:div {:class "greyback"}
       [:div {:class "form-group"}
        [:label {:for "signupUsername"} "Email "]
        [:input {:type "email" :name "username" :class "form-control"
                 :id "signupUsername" :required "required"}]]
       [:div {:class "form-group"}
        [:label {:for "signupPassword"} "Password "]
        [:input {:type "password" :name "password" :class "form-control"
                 :id "signupPassword" :required "required"}]]
       [:div {:class "form-group"}
        [:label {:for "signupConfirm"} "Confirm "]
        [:input {:type "password" :name "confirm" :class "form-control"
                 :id "signupConfirm" :required "required"}]]
       [:div {:class "form-group"}
        [:input {:class "btn btn-primary" 
                 :value "Sign up" :type "submit"}]
        [:span {:style "padding:0 0 0 10px;color:red;"
                :id "signupError"} flash]]]]]]])

(defn login-form []
  [:div {:class "row"}
   [:div {:class "col-xs-5"}
    [:form {:method "POST" :action "login" :class ""
            :id "loginForm" :novalidate ""}
     [:fieldset {:class "form-group"}
      (anti-forgery-field)
      [:legend [:h2 "Log in"]]
      [:div {:class "greyback"}
       [:div {:class "form-group"}
        [:label {:for "loginUsername"} "Email "]
        [:input {:type "email" :name "username"
                 :id "loginUsername" :class "form-control"}]]
       [:div {:class "form-group"}
        [:label {:for "loginPassword"} "Password "]
        [:input {:type "password" :name "password"
                 :id "loginPassword" :class "form-control"}]]
       [:div {:class "form-group"}
        [:input {:class "btn btn-primary"
                 :value "Log in" :type "submit"}]
        [:a {:id "pass-reset-link" :href "/reset-password"
             :class "btn btn-primary"}
         "Forgot password?"]
        [:span {:style "padding:0 0 0 10px;color:red;"
                :id "loginError"}]]]]]]])

(defn reset-pwd []
  [:div
   [:form {:method "POST" :action "request-reset"
           :class ""
           :id "resetPassForm" :novalidate ""}
    [:fieldset {:class "form-group"}
     (anti-forgery-field)
     [:legend [:h2 "Reset password"]]
     [:div.
      [:label {:for "resetUsername"} "Email "]
      [:input {:type "email" :name "username"
               :id "resetUsername" :class "form-control"}]]
     [:div
      [:input {:class "btn btn-primary"
               :value "Request reset" :type "submit"}]]]]])

(defn new-password [user token]
  [:div
   [:form {:method "POST" :action "set-password"
           :class ""
           :id "changePassForm" :novalidate ""}
    [:fieldset {:class "form-group"}
     (anti-forgery-field)
     [:legend [:h2 "Set a new password for "
               (.get user (name s/email-addr))]]
     [:input {:type "hidden" :name "reset-token"
              :id "setPwdToken" :required "required"
              :value token}]
     [:div.
      [:label {:for "setPwd"} "New password "]
      [:input {:type "password" :name "password" :class "form-control"
               :id "setPwd" :required "required"}]]
     [:div.
      [:label {:for "setPwdConfirm"} "Confirm new password "]
      [:input {:type "password" :name "confirm" :class "form-control"
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
  [:div {:class "container"}
   [:div {:class "row"}
    [:div {:class "col-xs-8"}
     [:br] [:h3 "Welcome! Set up your account by connecting your email."]
     [:p [:span {:style {:padding "0 0 0 10px" :color "red"}} flash]]
     [:h5 (str "Your email address is: " username)]
     [:h5 "Select an email provider:"][:br]
     [:a {:class "btn btn-primary btn-lg" :href auth-url
          :role "button"}
      [:h5 "GMail"]]]]
   (footer-box)])
