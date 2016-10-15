(ns candlecrm.pages
  (:require [candlecrm.common :refer :all]
            [candlecrm.environ :refer [env]]
            [candlecrm.auth :as auth]
            [candlecrm.google :as google]
            [candlecrm.html :as html]
            [candlecrm.imap :as imap]
            [candlecrm.neo4j :as neo4j]
            [candlecrm.oauth :as oauth]
            [candlecrm.privacy :as privacy]
            [candlecrm.quartz :as quartz]
            [candlecrm.regex :as regex]
            [candlecrm.sendgrid :as sendgrid]
            [candlecrm.terms :as terms]
            [candlecrm_cljc.schema :as s]
            [clojure.string :as str]
            [ring.util.response :as resp]))

(defn home-with-message [message]
  (assoc (resp/redirect "/login.html") :flash message))

(defn csrf-redirect [_req]
  (assoc (resp/redirect "/")))

(defn token-cookie [url token]
  {:status 302
   :headers {"Location" url}
   :body ""
   :cookies {"token" {:value token :http-only true :secure true
                      :max-age (* 3600 auth/exp-hours)}}})

(defn signup-form [{:keys [flash]}]
  (html-wrapper
   (html/base-template
    false [:div {:class "container"}
           [:div#login
            [:br] (html/signup-form flash)]
           (html/footer-box)])))

(defn login-form [{:keys [flash]}]
  (html-wrapper
   (html/base-template
    false [:div {:class "container"}
           [:div#login
            [:br] (html/login-form flash)]
           (html/footer-box)])))

(defn contact-form [_req]
  (html-wrapper
   (html/base-template
    false (html/contact-page))))

(defn faq-page [_req]
  (html-wrapper
   (html/base-template
    false (html/faq-page))))

(defn privacy-page [_req]
  (html-wrapper
   (html/base-template
    false (privacy/privacy-html))))

(defn tos-page [_req]
  (html-wrapper
   (html/base-template
    false (terms/tos-html))))

(defn homepage-form [_req]
  (html-wrapper
   (html/base-template
    false (html/homepage))))

(defn invite-form [{:keys [flash]}]
  (html-wrapper
   (html/base-template
    false (html/invite-page flash))))

(defn login-switch [identity req alt-page]
  (cond (not identity) (alt-page req)
        (->> identity auth/lookup-token vals (every? nil?))
        (resp/redirect "/email")
        :else (resp/redirect "/app")))

(defn signup-page [{:keys [identity] :as req}]
  (login-switch identity req signup-form))

(defn login-page [{:keys [identity] :as req}]
  (login-switch identity req login-form))

(defn contact [{:keys [identity] :as req}]
  (login-switch identity req contact-form))

(defn homepage [{:keys [identity] :as req}]
  (login-switch identity req homepage-form))

(defn invite [{:keys [identity] :as req}]
  (login-switch identity req invite-form))

(defn faq [{:keys [identity] :as req}]
  (login-switch identity req faq-page))

(defn app-page [{:keys [identity]}]
  (cond (not identity) (home-with-message "Logged out")
        (->> identity auth/lookup-token vals (every? nil?))
        (resp/redirect "/email")
        :else (html-wrapper (html/app-template))))

(defn email [{:keys [identity flash]}]
  (html-wrapper
   (html/base-template
    true (if (->> identity auth/lookup-token vals (every? nil?))
           (html/email-setup flash (auth/get-username identity))
           (resp/redirect "/app")))))

(defonce switch-target (atom nil))

(defn switch-to [email]
  (if-let [user (auth/lookup-user email)]
    (reset! switch-target user)
    (println "Error: User " email " not found.")))

(defn switch-user [{:keys [identity]}]
  (if (= identity (auth/get-me))
    (let [user-token (auth/make-token @switch-target)]
      (token-cookie "/app" (:token user-token)))
    (home-with-message "Error: Could not login.")))

(defn login-needed [uri]
  (html/base-template
   false (html/login-needed uri)))

(defn reset-pwd [{:keys [flash]}]
  (html-wrapper
   (html/base-template
    false (html/reset-pwd flash))))

(defn new-password [user token]
  (html/base-template
   false (html/new-password user token)))

(defn google-auth [req]
  (let [auth-response (google/response-from-req req)
        user (:identity req)]
    (if-let [auth-err (.getError auth-response)]
      (assoc (resp/redirect "/email") :flash auth-err)
      (if-let [token (google/get-token! (.getCode auth-response))]
        (do (neo4j/set-property! user s/google-token token)
            (throw-warn! (str "Add Google token for user: "
                              (auth/get-username user)))
            (resp/redirect "/init-account"))
        (do
          (imap/invalid-token user)
          (assoc (resp/redirect "/email")
                 :flash "Error: Could not get authorization. Please try again."))))))

(defn outlook-auth [user {:keys [code]}]
  (if-let [new-token (oauth/outlook-token code)]
    (do (neo4j/set-property! user s/outlook-token new-token)
        (throw-warn! (str "Add Outlook token for user: "
                          (auth/get-username user)))
        (resp/redirect "/init-account"))
    (assoc (resp/redirect "/email")
           :flash "Could not get Outlook authorization")))

(defn reset-confirm [{{:keys [token]} :params}]
  (if-let [user (->> token (hash-map s/pwd-reset-token)
                     (neo4j/get-vertex-raw s/user))]
    (html-wrapper (new-password user token))
    (home-with-message "Error: Invalid reset link")))

(defn request-reset [req]
  (auth/pwd-reset! req)
  (assoc (resp/redirect "/reset-password.html")
         :flash "Password reset requested."))

(defn set-password [{:keys [params]}]
  (if-let [user (->> params :token (hash-map s/pwd-reset-token)
                     (neo4j/get-vertex-raw s/user))]
    (do (auth/set-password! user params)
        (home-with-message "Password has been reset."))
    (home-with-message "Error: Invalid reset link")))

(defn create-account [params]
  (if-let [err-msg (apply auth/new-user-check
                          ((juxt :username :password :confirm) params))]
    (assoc (resp/redirect "/signup.html") :flash err-msg)
    (->> [:username :password] (select-keys params)
         quartz/create-user! auth/make-token
         :token (token-cookie "/email"))))

(defn login [params]
  (if-let [user-token (auth/login-handler params)]
    (token-cookie "/app" (:token user-token))
    (home-with-message "Error: Wrong username or password.")))

(defn init-account [{:keys [identity]}]
  (imap/add-new-queue! identity)
  (quartz/schedule-contacts! identity)
  (home-with-message "Congrats! Authentication successful"))

(defn request-invite [{:keys [name email]}]
  (assoc (resp/redirect "/signup.html") :flash
         (cond
           (str/blank? name) "Name blank"
           (str/blank? email) "Email blank"
           (not (regex/one-email? email))
           "Not a valid email address"
           :else
           (do (sendgrid/send-email!
                {s/email-from (env :test-acct-email)
                 s/email-to (env :test-acct-email)
                 s/email-subject "CandleCRM invite request"
                 s/email-body (str "There has been a CandleCRM invite request from:\n\n"
                                   "Name: " name "\n\nEmail: " email "\n\n")})
               "Invite requested"))))
