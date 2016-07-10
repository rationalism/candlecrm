(ns spectra.contacts
  (:require [spectra.auth :as auth]
            [spectra.common :refer :all]
            [spectra.datetime :as dt]
            [spectra.google :as google]
            [spectra.insert :as insert]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s])
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
    (conj (.getValue (.getFullName (.getName contact))))))

(defn emails [contact]
  (mapv #(.getAddress %) (.getEmailAddresses contact)))
  
(defn phones [contact]
  (mapv #(.getPhoneNumber %) (.getPhoneNumbers contact)))

(defn birthday [contact]
  (when-let [bdate (.getBirthday contact)]
    (-> bdate (.getWhen) dt/dates-in-text first)))

(defn gender [contact]
  (when-let [gend (.getGender contact)]
    (str gend)))

(defn occupation [contact]
  (when-let [occ (.getOccupation contact)]
    (str occ)))

(defn addresses [contact]
  (when-let [addrs (.getPostalAddresses contact)]
    (map #(.getValue %) addrs)))

(defn websites [contact]
  (when-let [sites (.getWebsites contact)]
    (map #(.getHref %) sites)))

(defn organizations [contact]
  (when-let [orgs (.getOrganizations contact)]
    (->> (map #(.getOrgName %) orgs) (remove nil?)
         (map #(.getValue %)))))

(defn filter-map [contact-map]
  (->> (filter #(-> % val not-nil-ext?) contact-map)
       (into {})))

(defn maybe-add [m k v]
  (if v (assoc m k v) m))

(defn contact->person [contact]
  (filter-map
   {s/type-label s/person
    s/s-name (names contact)
    s/email-addr (emails contact)
    s/phone-num (phones contact)
    s/birthday (birthday contact)
    s/gender (gender contact)
    s/occupation (occupation contact)
    s/website (websites contact)}))

(defn contact-graph [contact]
  (let [main-node (contact->person contact)]
    (loom/build-graph
     [main-node]
     (concat
      (->> contact addresses
           (map #(vector main-node
                         {s/type-label s/building s/street-addr %}
                         s/mail-address)))
      (->> contact organizations
           (map #(vector main-node
                         {s/type-label s/organization s/s-name %}
                         s/org-member)))))))

(defn batch-insert! [user contacts]
  (throw-info! "batch inserting contacts")
  (->> contacts (map contact-graph) loom/merge-graphs
       (#(insert/push-graph! % user s/contact-src))))

(defn load-all-contacts! [user]
  (->> user all-contacts (batch-insert! user)))
