(ns spectra.contacts
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.auth :as auth]
            [spectra.google :as google]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.google.gdata.client.contacts ContactsService]
           [com.google.gdata.data.contacts ContactFeed]
           [java.net URL]))

(def google-full-url "https://www.google.com/m8/feeds/contacts/default/full")
(def app-name "Alyssa-Spectra-1")

(defn all-contacts-feed! [user]
  (.getFeed
   (doto (ContactsService. app-name)
     (.setUserToken (-> user google/lookup-token
                        google/get-access-token!)))
   (URL. google-full-url)
   ContactFeed))
