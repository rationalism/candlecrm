(ns spectra.contacts
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.auth :as auth]
            [spectra.corenlp :as nlp]
            [spectra.datetime :as dt]
            [spectra.google :as google]
            [spectra.neo4j :as neo4j]
            [spectra.recon :as recon]
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

(defn names [contact]
  (cond-> []
    (and (.hasName contact)
         (.hasFullName (.getName contact)))
    (conj (.getValue (.getFullName (.getName contact))))
    (and (.hasName contact)
         (.hasAdditionalName (.getName contact)))
    (conj (.getValue (.getAdditionalName (.getName contact))))))

(defn emails [contact]
  (->> (.getEmailAddresses contact)
       (mapv #(.getAddress %))))

(defn phones [contact]
  (->> (.getPhoneNumbers contact)
       (mapv #(.getPhoneNumber %))))

(defn birthday [contact]
  (-> contact (.getBirthday)
      (.getWhen) dt/dates-in-text first))

(defn gender [contact]
  (-> contact (.getGender) (.toString)))

(defn occupation [contact]
  (-> contact (.getOccupation) (.toString)))

(defn addresses [contact]
  (->> contact (.getPostalAddresses)
       (map #(.getValue %))))

(defn websites [contact]
  (->> contact (.getWebsites)
       (map #(.getHref %))))

(defn organizations [contact]
  (->> contact (.getOrganizations)
       (map #(.getOrgName %))
       (map #(.getValue %))))

(defn contact-to-person [contact]
  (->> (emails contact)
       (recon/name-email-map (names contact))
       (map #(nlp/normalize-person (key %) (val %) s/person))
       recon/merge-nodes
       (conj [{s/phone-num (phones contact)
               s/birthday (birthday contact)
               s/gender (gender contact)
               s/occupation (occupation contact)
               s/mail-address (addresses contact)
               s/website (websites contact)
               s/org-member (organizations contact)}])
       (apply merge)))

(defn batch-insert! [user contacts]
  (->> contacts 
    (map contact-to-person)
    (map #(hash-map :props %))
    (map #(assoc % :labels (neo4j/person-labels user)))
    neo4j/batch-insert!))

(defn load-all-contacts! [user]
  (doall (batch-insert! user (all-contacts user)))
  :success)
