(ns clojure-getting-started.email
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [clojure-getting-started.database :as database]
            [clojure-getting-started.google :as google]
            [clojure-getting-started.graph :as graph]
            [clojure-getting-started.corenlp :as nlp]
            [clojure-getting-started.regex :as regex]
            [clojure-getting-started.schema :as schema]
            [environ.core :refer [env]])
  (:import [javax.mail Folder Message Message$RecipientType]))

(def inbox-folder-name "INBOX")
(def plain-type "TEXT/PLAIN")
(def html-type "TEXT/HTML")

(defn get-folder [store folder-name]
  (.getFolder store folder-name))

(defn get-inbox [store]
  (.getFolder store inbox-folder-name))

(defn open-folder-read! [folder]
  (.open folder (Folder/READ_ONLY)))

(defn message-count [folder]
  (.getMessageCount folder))

(defn inbox-count [store]
  (message-count (get-inbox store)))

(defn get-message [folder num]
  (.getMessage folder num))

(defn messages-in-range [folder begin end]
  (.getMessages folder begin end))

(defn decode-address [address]
  {:name (.getPersonal address)
   :email (.getAddress address)})

(defn decode-header [header]
  {(.getName header) (.getValue header)})

(defn subject [message]
  (.getSubject message))

(defn received-time [message]
  (.getReceivedDate message))

(defn sent-time [message]
  (.getSentDate message))

(defn decode-recipients [message]
  {:to (map decode-address (.getRecipients message Message$RecipientType/TO))
   :cc (map decode-address (.getRecipients message Message$RecipientType/CC))
   :bcc (map decode-address (.getRecipients message Message$RecipientType/BCC))})

(defn decode-sender [message]
  {:from (map decode-address (.getFrom message))})

(defn decode-replyto [message]
  {:reply-to (map decode-address (.getFrom message))})

(defn headers [message]
  (->> (.getAllHeaders message)
       enumeration-seq
       (map decode-header)
       (apply merge)))

(defn content [message]
  (.getContent message))

(defn get-parts [multipart]
  (map #(.getBodyPart multipart %)
       (range (.getCount multipart))))

(defn filter-text [text]
  (-> text
      (str/replace "\r\n" " ")
      (str/replace " > " " ")
      (str/replace #"\s+" " ")))

;; Assumes that message content contains only one
;; non-duplicative plain text part
(defn get-text-content [message]
  (-> (filter #(.contains (.getContentType %) plain-type)
              (get-parts (content message)))
      first
      .getContent
      filter-text))

(defn people-from-text [text]
  (distinct
   (concat
    (regex/find-email-people text)
    (regex/find-phone-people text)
    (nlp/nlp-people text))))

(defn full-parse [message]
  (let [subject-text (subject message)
        body-text (get-text-content message)
        full-text (str subject-text ". " body-text)]
    (merge
     {:time-received (received-time message)}
     {:time-sent (sent-time message)}
     {:subject subject-text}
     {:body body-text}
     (decode-recipients message)
     (decode-sender message)
     (decode-replyto message)
     {:people-mentioned (people-from-text full-text)})))
   
(defn define-imap-lookup []
  (def ^:dynamic *imap-lookup* {}))

;; TODO: support IMAP stores other than GMail
;; TODO: add failure checking for IMAP timing out
(defn fetch-imap-store [user]
  (if (contains? *imap-lookup* user)
    (*imap-lookup* user)
    (do (def ^:dynamic *imap-lookup*
          (assoc *imap-lookup* user
                 (-> user
                     google/lookup-token
                     google/get-access-token!
                     (google/get-imap-store!
                      (database/get-username user)))))
        (*imap-lookup* user))))

(defn insert-email! [user email]
  (let [email-link! (partial database/add-email-link! user email)
        parsed-email (full-parse email)
        new-email (graph/create-vertex!
                    graph/*graph* schema/email-type
                    [{:property schema/email-received :value (:time-received parsed-email)}
                     {:property schema/email-sent :value (:time-sent parsed-email)}
                     {:property schema/email-subject :value (:subject parsed-email)}
                     {:property schema/email-body :value (:body parsed-email)}])]
    (map (partial email-link! schema/email-to-edge) (:to parsed-email))
    (map (partial email-link! schema/email-cc-edge) (:cc parsed-email))
    (map (partial email-link! schema/email-bcc-edge) (:bcc parsed-email))
    (map (partial email-link! schema/email-from-edge) (:from parsed-email))
    (map (partial email-link! schema/email-replyto-edge) (:replyto parsed-email))
    (map (partial email-link! schema/email-mentions-edge) (:people-mentioned parsed-email))))
