(ns spectra.sendgrid
  (:require [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]])
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
