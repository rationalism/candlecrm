(ns clojure-getting-started.email
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [clojure-getting-started.database :as database]
            [clojure-getting-started.corenlp :as nlp]
            [clojure-getting-started.regex :as regex]
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
   
