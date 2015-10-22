(ns spectra.contacts
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.auth :as auth]
            [spectra.recon :as recon]
            [spectra.google :as google]
            [spectra.neo4j :as neo4j]
            [spectra.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.google.gdata.client Query]
           [com.google.gdata.client.contacts ContactsService]
           [com.google.gdata.data.contacts ContactFeed]
           [java.net URL]))

(def google-full-url "https://www.google.com/m8/feeds/contacts/default/full")
(def app-name "Alyssa-Spectra-1")
(def result-limit 32767)

(defn all-contacts-query []
  (doto (Query. (URL. google-full-url))
    (.setMaxResults result-limit)))

(defn all-contacts [user]
  (.getEntries
   (.getFeed
    (doto (ContactsService. app-name)
      (.setOAuth2Credentials
       (-> user google/lookup-token
           google/build-google-cred!)))
    (all-contacts-query)
    ContactFeed)))

(defn contact-to-map [contact]
  {s/name
   (cond-> []
     (and (.hasName contact)
          (.hasFullName (.getName contact)))
     (conj (.getValue (.getFullName (.getName contact))))
     (and (.hasName contact)
          (.hasAdditionalName (.getName contact)))
     (conj (.getValue (.getAdditionalName (.getName contact)))))
   s/email-addr
   (->> (.getEmailAddresses contact)
        (mapv #(.getAddress %)))
   s/phone-num
   (->> (.getPhoneNumbers contact)
        (mapv #(.getPhoneNumber %)))})

(defn batch-insert! [user contacts]
  (->> contacts 
    (map contact-to-map)
    (map #(hash-map :props %))
    (map #(assoc % :labels (neo4j/person-labels user)))
    neo4j/batch-insert!))

(defn load-all-contacts! [user]
  (doall (batch-insert! user (all-contacts user)))
  :success)
