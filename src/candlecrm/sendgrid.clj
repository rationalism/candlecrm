(ns candlecrm.sendgrid
  (:require [clojure.string :as str]
            [candlecrm.common :refer :all]
            [candlecrm_cljc.schema :as s]
            [candlecrm.environ :refer [env]])
  (:import [com.sendgrid SendGrid SendGrid$Email]))

(def sg-server (atom nil))

(defn init-server! []
  (->> :sendgrid-api env
       (SendGrid. )
       (reset! sg-server)))

(defn send-email! [email]
  (.send @sg-server
         (doto (SendGrid$Email. )
           (.addTo (s/email-to email))
           (.setFrom (s/email-from email))
           (.setSubject (s/email-subject email))
           (.setText (s/email-body email)))))
