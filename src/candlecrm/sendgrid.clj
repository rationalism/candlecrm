(ns candlecrm.sendgrid
  (:require [clojure.string :as str]
            [candlecrm.common :refer :all]
            [candlecrm_cljc.schema :as s]
            [candlecrm.environ :refer [env]])
  (:import [com.sendgrid Content Email Mail
            Method Request SendGrid]))

(defonce sg-server (atom nil))

(defn init-server! []
  (->> :sendgrid-api env (SendGrid. )
       (reset! sg-server)))

(defn send-email! [email]
  (let [req (Request. )
        mail (Mail. (Email. (s/email-from email))
                    (s/email-subject email)
                    (Email. (s/email-to email))
                    (Content. "text/plain" (s/email-body email)))]
    (set! (. req method) Method/POST)
    (set! (. req endpoint) "mail/send")
    (set! (. req body) (.build mail))
    (.api @sg-server req)))
