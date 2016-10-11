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
   [:span "© 2016 CandleCRM"]
   [:div {:class "pull-xs-right"}
    [:a {:href "/terms.html"} "Terms of Service"]
    [:span " "]
    [:a {:href "/privacy.html"} "Privacy Policy"]]
   [:br][:br]])

(defn invite-form [flash]
  [:div {:class "row"}
   [:div {:class "col-md-12"}
    [:form {:method "POST" :action "request-invite"
            :class "" :id "inviteForm" :novalidate ""}
     [:fieldset {:class "form-group"}
      (anti-forgery-field)
      [:legend
       [:h3 "Request invite"]
       [:h6 (str "CandleCRM is in private beta. Request an invite if you'd"
                 " like to help us test it.")]]
      [:div {:class "col-md-8 col-lg-5 greyback"}
       [:div {:class "form-group"}
        [:label {:for "inviteName"} "Name "]
        [:input {:type "text" :name "name" :class "form-control"
                 :id "inviteName" :required "required"}]]
       [:div {:class "form-group"}
        [:label {:for "inviteEmail"} "Email address "]
        [:input {:type "email" :name "email" :class "form-control"
                 :id "inviteEmail" :required "required"}]]
       [:div {:class "form-group"}
        [:input {:class "btn btn-primary" 
                 :value "Submit" :type "submit"}]
        [:span {:style "padding:0 0 0 10px;color:red;"
                :id "signupError"} flash]]]]]]])

(defn invite-page [flash]
  [:div#homepage {:class "container"}
   [:div {:class "row"}
    [:div {:class "col-xs-12"}
     [:br] (invite-form flash)]]
   (footer-box)])

(defn contact-page []
  [:div#homepage {:class "container"}
   [:div {:class "row"}
    [:div {:class "col-xs-8"}
     [:br]
     [:h2 "Contact us"]
     [:p (str "If you have any questions about CandleCRM, please contact us"
              " at admin@candlecrm.com.")]]]
   (footer-box)])

(defn faq-page []
  [:div#homepage {:class "container"}
   [:div {:class "row"}
    [:div {:class "col-md-11"}
     [:br][:h2 "FAQ"][:br]
     [:h5
      [:ol#faqmenu
       [:li [:a {:href "#q1"} "What is CandleCRM?"]]
       [:li [:a {:href "#q2"} "How is CandleCRM different from other CRM software?"]]
       [:li [:a {:href "#q3"} "How much does CandleCRM cost?"]]
       [:li [:a {:href "#q4"} "What do I need to start using CandleCRM?"]]
       [:li [:a {:href "#q5"} "Does CandleCRM use encryption?"]]
       [:li [:a {:href "#q6"} "Can I use CandleCRM on my phone?"]]
       [:li [:a {:href "#q7"} "I think I found a problem with CandleCRM. What should I do?"]]]]

     [:hr]
     [:h4 {:id "q1"} "1. What is CandleCRM?"]
     [:ul (str "CandleCRM is customer relationship management, or \"CRM\", software."
               " It keeps track of things like who your customers are,"
               " how to contact them, and when your next meeting with"
               " each customer is. CandleCRM runs over the Internet, "
               " or 'in the cloud'. You can use CandleCRM from any computer "
               " or tablet with an Internet connection.")]
     [:h4 {:id "q2"} "2. How is CandleCRM different from other CRM software?"]
     [:ul (str "CandleCRM uses artificial intelligence (AI) to keep customer"
               " information up to date. For example, suppose you receive a new email"
               " from Bob Smith. Bob likes your new product, and wants to try it out."
               " Bob says that he lives in Dallas, Texas, and he wants to call you"
               " at 3 PM tomorrow.")]
     [:ul (str "When you receive Bob's email, CandleCRM will automatically \"read\""
               " it, with the latest in AI technology. It will create a new entry for Bob,"
               " or if you've talked to Bob before, it will update his existing entry."
               " It will record Bob's email address and phone number, and add Bob"
               " to a list of customers in Dallas. Finally, it automatically adds"
               " your call with Bob to tomorrow's agenda.")]
     [:h4 {:id "q3"} "3. How much does CandleCRM cost?"]
     [:ul (str "Right now, CandleCRM is free. We're still testing it out, so we'd"
               " like people to give it a try, and see if there are any bugs or other"
               " problems which we need to fix. When we're done testing, there will be"
               " a free trial, and then a small monthly fee to"
               " continue using CandleCRM after a trial period ends.")]
     [:h4 {:id "q4"} "4. What do I need to start using CandleCRM?"]
     [:ul (str "Right now, to use CandleCRM, you must have a GMail account. We"
               " know that many people use other email services, and"
               " we plan to add support for other email accounts very soon.")]
     [:h4 {:id "q5"} "5. Does CandleCRM use encryption?"]
     [:ul (str "Yes. Everything on the CandleCRM website is automatically encrypted with "
               " HTTPS/TLS/SSL. This encryption is recommended by security experts "
               " to keep your private data safe. For example, if you're using the WiFi"
               " at a coffee shop, encryption prevents others at the shop"
               " from snooping on your messages.")]
     [:h4 {:id "q6"} "6. Can I use CandleCRM on my phone?"]
     [:ul (str "Yes, but it might be harder to use on a small screen."
               " Unfortunately, we don't have an iOS or Android app ready yet."
               " Please check back later for updates on a new mobile version.")]
     [:h4 {:id "q7"} "7. I think I found a problem with CandleCRM. What should I do?"]
     [:ul (str "Please let us know immediately, by emailing us at bugs@candlecrm.com."
               " Try to include as much detail about the problem as you can."
               " If possible, take a screenshot of the page where the problem"
               " happened, and then email it to us as an attachment."
               " This makes it much easier for us to find and fix the bug.")]]]
   (footer-box)])

(defn homepage []
  [:div#homepage
   [:div {:class "jumbotron"}
    [:div {:class "container"}
     [:h1 {:class "display-3"} "A CRM that updates itself."]
     [:p (str "CandleCRM uses artificial intelligence (AI) to keep"
              " itself up-to-date, replacing manual data entry.")]
     [:p [:a {:class "btn btn-primary btn-lg" :href "/signup.html"
              :role "button"}
          "Try it out"]
      [:a {:class "btn btn-primary btn-lg btn-2" :href "/faq.html"
           :role "button"}
       "Learn more"]]]]
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
      [:h2 {:class "text-xs-center"} "Free trial"]
      [:p {:class "text-xs-center"}
       (str "CandleCRM is free while we beta test it. Check"
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
   [:a {:class "navbar-brand" :href "/"}
    "CandleCRM"]
   [:ul {:class "nav navbar-nav pull-xs-right"}
    (header-tab "" "Home" "/")
    (header-tab "" "FAQ" "/faq.html")
    (header-tab "" "Contact" "/contact.html")
    (header-tab "" "Sign Up" "/signup.html")
    (header-tab "" "Log In" "/login.html")]])

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
   [:div {:class "col-md-8 col-lg-5"}
    [:form {:method "POST" :action "create-account"
            :class "" :id "signupForm" :novalidate ""}
     [:fieldset {:class "form-group"}
      (anti-forgery-field)
      [:legend
       [:h3 "Sign up"]]
      [:p (str "CandleCRM is free while we beta test it. Please let us know"
               " about any errors or other issues you see.")]
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
       #_[:div {:class "form-group"}
          [:label {:for "signupCode"} "Invite code "]
          [:input {:type "text" :name "code" :class "form-control"
                   :id "signupCode" :required "required"}]]
       [:div {:class "form-group"}
        [:input {:class "btn btn-primary" 
                 :value "Sign up" :type "submit"}]
        [:span {:style "padding:0 0 0 10px;color:red;"
                :id "signupError"} flash]]]]]]])

(defn login-form []
  [:div {:class "row"}
   [:div {:class "col-md-8 col-lg-5"}
    [:form {:method "POST" :action "login"
            :id "loginForm" :novalidate ""}
     [:fieldset {:class "form-group"}
      (anti-forgery-field)
      [:legend [:h3 "Log in"]]
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
        [:a {:id "pass-reset-link" :href "/reset-password.html"
             :class "btn btn-primary"}
         "Forgot password?"]
        [:span {:style "padding:0 0 0 10px;color:red;"
                :id "loginError"}]]]]]]])

(defn reset-pwd [flash]
  [:div {:class "container"}
   [:div {:class "row"}
    [:div {:class "col-md-8 col-lg-5"}
     [:br]
     [:form {:method "POST" :action "request-reset"
             :id "resetPassForm" :novalidate ""}
      [:fieldset {:class "form-group"}
       (anti-forgery-field)
       [:legend [:h3 "Reset password"]]
       [:div {:class "greyback"}
        [:div {:class "form-group"}
         [:label {:for "resetUsername"} "Email "]
         [:input {:type "email" :name "username"
                  :id "resetUsername" :class "form-control"}]]
        [:div {:class "form-group"}
         [:input {:class "btn btn-primary"
                  :value "Request reset" :type "submit"}]
         [:span {:style "padding:0 0 0 10px;color:red;"
                 :id "signupError"} flash]]]]]]]])

(defn new-password [user token]
  [:div {:class "container"}
   [:div {:class "row"}
    [:div {:class "col-md-8 col-lg-5"} [:br]
     [:form {:method "POST" :action "set-password"
             :id "changePassForm" :novalidate ""}
      [:fieldset {:class "form-group"}
       (anti-forgery-field)
       [:legend [:h4 "Set a new password for "
                 (strip-quotes (str (.get user (name s/email-addr))))]]
       [:input {:type "hidden" :name "reset-token"
                :id "setPwdToken" :required "required"
                :value token}]
       [:div {:class "greyback"}
        [:div {:class "form-group"}
         [:label {:for "setPwd"} "New password "]
         [:input {:type "password" :name "password" :class "form-control"
                  :id "setPwd" :required "required"}]]
        [:div {:class "form-group"}
         [:label {:for "setPwdConfirm"} "Confirm new password "]
         [:input {:type "password" :name "confirm" :class "form-control"
                  :id "setPwdConfirm" :required "required"}]]
        [:div {:class "form-group"}
         [:input {:class "btn btn-primary"
                  :value "Set new password" :type "submit"}]]]]]]]])

(defn login-needed [uri]
  [:h2 "You do not have sufficient privileges to access " uri])

(defn unauthorized-error []
  [:h2 "Error: Access to this page is unauthorized."])

(defn not-found-error []
  [:div
   [:h2 "Error: No such object can be found."]])

(defn email-setup [flash username]
  [:div {:class "container"}
   [:div {:class "row"}
    [:div {:class "col-xs-8"}
     [:br] [:h3 "Welcome! Set up your account by connecting your email."]
     [:p [:span {:style {:padding "0 0 0 10px" :color "red"}} flash]]
     [:h6 (str "CandleCRM is in beta. Please let us know"
               " about any errors or problems you see.")][:br]
     [:div {:class "row"}
      [:div {:class "col-md-6"}
       [:div {:class "greyback"}
        [:h5 "Supported email providers:"][:br]
        [:a {:class "btn btn-primary btn-lg"
             :href "/google-approve" :role "button"}
         [:h5 [:b "GMail"]]]
        [:a {:class "btn btn-primary btn-lg"
             :href "/outlook-approve" :role "button"}
         [:h5 [:b "Outlook"]]]
        [:a {:class "btn btn-primary btn-lg"
             :href "/yahoo-approve" :role "button"}
         [:h5 [:b "Yahoo"]]]]]]]]
   [:br][:hr][:br]
   [:div {:class "container"}
    [:div {:class "row"}
     [:div {:class "col-md-4"}
      [:img {:class "img-fluid m-x-auto img-circle home-circle"
             :src "/images/encryption_logo.png"}]
      [:h2 {:class "text-xs-center"} "Security"]
      [:p {:class "text-xs-center"}
       (str "CandleCRM is encrypted with HTTPS/TLS/SSL, keeping your"
            " data safe from snooping. Our site is rated A+ by"
            " Qualys encryption security tests.")]]
     [:div {:class "col-md-4"}
      [:img {:class "img-fluid m-x-auto img-circle home-circle"
             :src "/images/privacy_logo.png"}]
      [:h2 {:class "text-xs-center"} "Privacy"]
      [:p {:class "text-xs-center"}
       (str "Your private data is kept confidential. We don't"
            " sell data to third parties, or use it for advertising."
            " Check out our privacy policy ")
       [:a {:href "/privacy.html"}
        "here"] "."]]
     [:div {:class "col-md-4"}
      [:img {:class "img-fluid m-x-auto img-circle home-circle"
             :src "/images/email_logo.png"}]
      [:h2 {:class "text-xs-center"} "Need help?"]
      [:p {:class "text-xs-center"}
       (str "Don't see your email service here?"
            " Let us know it's missing, by emailing us at admin@candlecrm.com."
            " We plan to add more options as the beta test continues.")]]]]
   (footer-box)])
