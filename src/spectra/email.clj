(ns spectra.email
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.auth :as auth]
            [spectra.common :as com]
            [spectra.recon :as recon]
            [spectra.datetime :as dt]
            [spectra.google :as google]
            [spectra.neo4j :as neo4j]
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
(def multi-type "multipart")

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
  {:from (first (map decode-address
                     (.getFrom message)))})

(defn decode-replyto [message]
  {:reply-to (map decode-address (.getReplyTo message))})

(defn headers [message]
  (->> (.getAllHeaders message)
       enumeration-seq
       (map decode-header)
       (apply merge)))

(defn content [message]
  (p :get-content
     (.getContent message)))

(defn content-type [message]
  (p :content-type
     (.getContentType message)))

(defn get-parts [multipart]
  (p :get-parts
     (map #(.getBodyPart multipart %)
          (range (.getCount multipart)))))

(defn strip-arrows [line num]
  (str/replace-first line (apply str (repeat num ">")) ""))

(defn count-nested [text]
  (count (first (re-seq #"^>+" text))))

(defn count-arrows [lines]
  (->> lines
       (map #(re-seq #"^>+" %))
       (filter #(not (nil? %)))))
  
(defn count-depth [lines]
  (let [arrows (count-arrows lines)]
    (if (or (nil? arrows) (empty? arrows))
      0
      (->> arrows
           (map first)
           (map count)
           (apply max)))))

(defn merge-lines [lines]
  (str/join "\r\n" lines))

(defn in-block? [lines index f]
  (cond (< @index 0) false
        (>= @index (count lines)) false
        :else (f (count-nested
                  (nth lines @index)))))

(defn split-email [lines depth]
  (def start-body (atom 0))
  (while (in-block? lines start-body
                    #(> depth %))
    (do (swap! start-body inc)))
  (def end-body (atom @start-body))
  (while (in-block? lines end-body
                    #(= depth %))
    (do (swap! end-body inc)))
  (def start-header (atom @start-body))
  (def header {:time-sent (atom nil) :from (atom nil)})
  (while (and (> @start-header 0)
              (not (and (deref (:time-sent header)) (deref (:from header)))))
    (do (swap! start-header dec)
        (let [this-line (nth lines @start-header)]
          (com/reset-if-found! (dt/dates-in-text this-line) header :time-sent)
          (com/merge-if-found! (regex/find-email-people this-line) header :from)
          (com/merge-if-found! (->> (nlp/run-nlp nlp/*pipeline* this-line)
                                    nlp/graph-entities
                                    nlp/nlp-people) header :from))))
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

(defn raw-msg-chain [body]
  (p :raw-msg-chain
     (let [lines (str/split-lines body)]
       (recursive-split lines
                        (count-depth lines)))))

(defn get-text-recursive [message]
  (p :get-text-recursive
     (cond
       (.contains (content-type message) plain-type)
       (content message)
       (.contains (content-type message) multi-type)
       (->> (-> message content get-parts)
            (map get-text-recursive)
            (filter #(not= "" %))
            (cons "")
            last)
       :else "")))

(defn people-from-text [text]
  (distinct
   (concat
    (p :email-regex (regex/find-email-people text))
    (p :phone-regex (regex/find-phone-people text))
    (nlp/nlp-people
     (p :nlp-text (nlp/graph-entities
                   (nlp/run-nlp nlp/*pipeline* text)))))))

(defn headers-parse [message]
  (merge
   {:time-received (received-time message)}
   {:time-sent (sent-time message)}
   {:subject (subject message)}
   (decode-recipients message)
   (decode-sender message)
   (decode-replyto message)))

(defn headers-for-last [raw-msgs headers]
  (update raw-msgs
          (dec (count raw-msgs))
          (merge (last raw-msgs) headers)))

(defn infer-email [pair]
  (assoc (nth pair 0) :to
         (list (:from
                (nth pair 1)))))

(defn infer-email-chain [messages]
  (conj
   (->> messages
        (partition 2 1)
        (map infer-email)
        (into []))
   (last messages)))

(defn infer-people [messages]
  (->> messages
       (map #(assoc % :people-mentioned
                    (people-from-text (:body %))))))

(defn infer-subject [messages]
  (->> messages
       (map #(assoc % :subject
                    (:subject (last messages))))
       (map #(assoc % :sub-hash
                    (com/end-hash (:subject %))))))

(defn message-inference [messages]
  (p :message-inference
     (-> messages
         infer-email-chain
         infer-people
         infer-subject)))

(defn full-parse [message]
  (try (as-> (-> message
                 get-text-recursive
                 raw-msg-chain) $
         (conj (into [] (drop-last $))
               (merge (last $)
                      (headers-parse message)))
         (message-inference $))
       (catch Exception e
         (do (prn "Email parse error")
             (prn e) {}))))

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

(defn refresh-inbox [user]
  (-> user google/lookup-token
      google/get-access-token!
      (google/get-imap-store! (auth/get-username user))
      get-inbox))
  
;; TODO: support IMAP stores other than GMail
(defn fetch-imap-folder [user]
  (def inbox (if (contains? *imap-lookup* user)
               (*imap-lookup* user)
               (refresh-inbox user)))
  (if (folder-open? inbox) nil
      (try (open-folder-read! inbox)
           (catch Exception e
             (do (def inbox (refresh-inbox user))
                 (open-folder-read! inbox)))))
  (update-imap-lookup! user inbox)
  inbox)

(defn has-valid-from? [parsed-email]
  (p :has-valid-from
     (let [from (:email (:from parsed-email))]
       (and (not (nil? from))
            (> (count from) 3)))))

(defn from-lookup [message user]
  (p :from-lookup
     (assoc message :from-database
             (recon/person-match
              user (:from message)))))

(defn already-found? [message]
  (p :already-found
     (let [from (:from-database message)]
       (if (or (nil? from) (empty? from))
         false
         (not (empty?
               (recon/lookup-old-email
                message from)))))))

(defn create-email! [parsed-email]
  (p :create-email
     (assoc parsed-email :email-vertex
            (neo4j/create-vertex!
             schema/email-type
             {schema/email-received (:time-received parsed-email)
              schema/email-sent (:time-sent parsed-email)
              schema/email-subject (:subject parsed-email)
              schema/email-sub-hash (:sub-hash parsed-email)
              schema/email-body (:body parsed-email)}))))

(defn create-link [parsed-email user]
  (p :create-link
     (assoc parsed-email :link
            (partial recon/add-email-link!
                     user (:email-vertex parsed-email)))))

;; TODO: Replace this with something more consistent
(def email-keys {:to schema/email-to-edge
                 :cc schema/email-cc-edge
                 :bcc schema/email-bcc-edge
                 :replyto schema/email-replyto-edge
                 :people-mentioned schema/email-mentions-edge})

(defn insert-links! [parsed-email keys]
  (p :insert-links
     ;; Only one "from" per email
     ((:link parsed-email) schema/email-from-edge
      (:from parsed-email))
     (doseq [k keys]
       (doseq [p ((key k) parsed-email)]
         ((:link parsed-email) (val k) p)))))

;; Assumes emails are already parsed
(defn insert-emails! [user emails]
  (p :insert-emails
     (try
       (dorun
        (->> emails
             (filter has-valid-from?)
             (pmap #(from-lookup % user))
             (filter #(not (already-found? %)))
             (pmap create-email!)
             (map #(create-link % user))
             (map #(insert-links! % email-keys))))
       (catch Exception e
         (do (prn "Email insertion error")
             (prn e) nil)))))
  
(defn insert-email-range! [user lower upper]
  (dorun
   (->> (messages-in-range (fetch-imap-folder user)
                           lower upper)
        (pmap full-parse)
        (map #(insert-emails! user %)))))
