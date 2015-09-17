(ns spectra.email
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.auth :as auth]
            [spectra.common :as com]
            [spectra.database :as database]
            [spectra.datetime :as datetime]
            [spectra.google :as google]
            [spectra.graph :as graph]
            [spectra.corenlp :as nlp]
            [spectra.regex :as regex]
            [spectra.schema :as schema]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [javax.mail Folder Message Message$RecipientType]))

(def inbox-folder-name "INBOX")
(def plain-type "TEXT/PLAIN")
(def html-type "TEXT/HTML")

(defn get-folder [store folder-name]
  (.getFolder store folder-name))

(defn get-inbox [store]
  (.getFolder store inbox-folder-name))

(defn close-store! [store]
  (.close store))

(defn open-folder-read! [folder]
  (.open folder (Folder/READ_ONLY)))

(defn close-folder! [folder]
  (.close folder false))

(defn folder-open? [folder]
  (.isOpen folder))

(defn folder-store [folder]
  (.getStore folder))

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

(defn strip-arrows [line num]
  (str/replace-first line (apply str (repeat num ">")) ""))

(defn count-nested [text]
  (count (first (re-seq #"^>+" text))))

(defn count-depth [lines]
  (->> lines
       (map #(re-seq #"^>+" %))
       (filter #(not (nil? %)))
       (map first)
       (map count)
       (apply max)))

(defn merge-lines [lines]
  (str/join "\r\n" lines))

(defn split-email [lines depth]
  (def start-body (atom 0))
  (while (> depth
            (count-nested (nth lines @start-body)))
    (do (swap! start-body inc)))
  (def end-body (atom @start-body))
  (while (= depth
            (count-nested (nth lines @end-body)))
    (do (swap! end-body inc)))
  (def start-header (atom (dec @start-body)))
  (def header {:time-sent (atom nil) :from (atom nil)})
  (while (and (>= @start-header 0)
              (not (and (deref (:time-sent header)) (deref (:from header)))))
    (do (let [this-line (nth lines @start-header)]
          (com/reset-if-found! (datetime/dates-in-text this-line) header :time-sent)
          (com/merge-if-found! (regex/find-email-people this-line) header :from)
          (com/merge-if-found! (->> (nlp/nlp-entities nlp/*pipeline* this-line)
                                    nlp/nlp-people) header :from)
          (swap! start-header dec))))
  (assoc (->> header (map com/de-atom) (into {}))
         :body (->> lines
                    (com/slice @start-body @end-body)
                    (map #(strip-arrows % depth))
                    merge-lines)
         :remainder (->> lines
                         (com/slice-not @start-header @end-body))))

(defn recursive-split [lines depth]
  (if (<= depth 0) (list {:body (merge-lines lines)})
      (let [split-body (split-email lines depth)]
        (conj (recursive-split (:remainder split-body)
                               (dec depth))
              (dissoc split-body :remainder)))))

;; Assumes that message content contains only one
;; non-duplicative plain text part
(defn get-text-content [message]
  (-> (filter #(.contains (.getContentType %) plain-type)
              (get-parts (content message)))
      first
      .getContent))

(defn people-from-text [text]
  (distinct
   (concat
    (p :email-regex (regex/find-email-people text))
    (p :phone-regex (regex/find-phone-people text))
    (nlp/nlp-people
     (p :nlp-text (nlp/nlp-entities nlp/*pipeline* text))))))

(defn headers-parse [message]
  (merge
   {:time-received (received-time message)}
   {:time-sent (sent-time message)}
   {:subject (subject message)}
   (decode-recipients message)
   (decode-sender message)
   (decode-replyto message)))

(defn full-parse [message]
  (let [subject-text (subject message)
        body-text (p :email-text (get-text-content message))
        full-text (str subject-text ". " body-text)]
    (merge
     (headers-parse message)
     {:body body-text}
     {:people-mentioned (people-from-text full-text)})))
   
(defn define-imap-lookup []
  (def ^:dynamic *imap-lookup* {}))

(defn update-imap-lookup! [user inbox]
  (def ^:dynamic *imap-lookup*
    (assoc *imap-lookup* user inbox)))

(defn shut-folder! [folder]
  (def store (folder-store folder))
  (close-folder! folder)
  (close-store! store))

(defn close-imap-lookup! []
  (->> (keys *imap-lookup*)
       (map #(*imap-lookup* %))
       (map shut-folder!))
  (define-imap-lookup))

;; TODO: support IMAP stores other than GMail
;; TODO: add failure checking for IMAP timing out
(defn fetch-imap-folder [user]
  (def inbox (if (contains? *imap-lookup* user)
               (*imap-lookup* user)
               (-> user google/lookup-token
                   google/get-access-token!
                   (google/get-imap-store! (auth/get-username user))
                   get-inbox)))
  (if (folder-open? inbox) nil (open-folder-read! inbox))
  (update-imap-lookup! user inbox)
  inbox)

(defn insert-email! [user email]
  (let [parsed-email (full-parse email)
        new-email (graph/create-vertex!
                   schema/email-type
                   {schema/email-received (:time-received parsed-email)
                    schema/email-sent (:time-sent parsed-email)
                    schema/email-subject (:subject parsed-email)
                    schema/email-body (:body parsed-email)})
        email-link! (partial database/add-email-link! user new-email)]
    (doseq [p (:to parsed-email)] (email-link! schema/email-to-edge p))
    (doseq [p (:cc parsed-email)] (email-link! schema/email-cc-edge p))
    (doseq [p (:bcc parsed-email)] (email-link! schema/email-bcc-edge p))
    (doseq [p (:from parsed-email)] (email-link! schema/email-from-edge p))
    (doseq [p (:replyto parsed-email)] (email-link! schema/email-replyto-edge p))
    (doseq [p (:people-mentioned parsed-email)] (email-link! schema/email-mentions-edge p))))
