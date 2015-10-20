(ns spectra.email
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.auth :as auth]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra.google :as google]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra.corenlp :as nlp]
            [spectra.recon :as recon]
            [spectra.regex :as regex]
            [spectra.schema :as s]
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
  {s/name (.getPersonal address)
   s/email-addr (.getAddress address)})

(defn decode-header [header]
  {(.getName header) (.getValue header)})

(defn subject [message]
  (.getSubject message))

(defn received-time [message]
  (.getReceivedDate message))

(defn sent-time [message]
  (.getSentDate message))

(defn get-recipients [message field]
  (map decode-address (.getRecipients message field)))

(defn decode-recipients [message]
  {s/email-to (get-recipients message Message$RecipientType/TO)
   s/email-cc (get-recipients message Message$RecipientType/CC)
   s/email-bcc (get-recipients message Message$RecipientType/BCC)})

(defn decode-sender [message]
  {s/email-from (map decode-address (.getFrom message))})

(defn decode-replyto [message]
  {s/email-replyto (map decode-address (.getReplyTo message))})

(defn headers [message]
  (->> (.getAllHeaders message)
       enumeration-seq
       (map decode-header)
       (apply merge)))

(defn content [message]
  (p :get-content
     (.getContent message)))

(defn content [message]
  (p :content
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

(defn find-bottom [chain]
  (->> chain loom/nodes
       (filter #(contains? % s/email-body))
       (filter #(not (loom/out-edge-label chain % s/email-reply)))
       first))

(defn split-email [depth chain]
  (let [bottom (find-bottom chain)
        lines (s/email-body bottom)]
    (def start-body (atom 0))
    (while (in-block? lines start-body #(> depth %))
      (do (swap! start-body inc)))
    (def end-body (atom @start-body))
    (while (in-block? lines end-body #(= depth %))
      (do (swap! end-body inc)))
    (def start-header (atom @start-body))
    (def header {s/email-sent (atom nil) s/email-from (atom nil)})
    (while (and (> @start-header 0)
                (not (and (deref (s/email-sent header))
                          (deref (s/email-from header)))))
      (do (swap! start-header dec)
          (let [this-line (nth lines @start-header)]
            (com/reset-if-found! (dt/dates-in-text this-line) header s/email-sent)
            (com/merge-if-found! (regex/find-email-people this-line) header s/email-from)
            ;; TODO: Use a less compute-intensive version of NLP here
            (com/merge-if-found! (->> (nlp/run-nlp nlp/*pipeline* this-line)
                                      nlp/graph-entities
                                      nlp/nlp-people) header s/email-from))))
    (let [new-node {s/email-sent (-> header s/email-sent deref)
                    s/type-label s/email
                    s/email-body (->> lines
                                      (com/slice @start-body @end-body)
                                      (map #(strip-arrows % depth))
                                      merge-lines)}]
      (-> chain
          (loom/replace-node bottom new-node)
          (loom/add-edges [[new-node (-> header s/email-from deref
                                         (assoc s/type-label s/person)) s/email-from]
                           [new-node {s/email-body (com/slice-not @start-header @end-body lines)}
                            s/email-reply]])))))

(defn recursive-split [depth chain]
  (if (<= depth 0)
    (loom/replace-node chain (find-bottom chain)
                       {s/email-body (-> chain find-bottom s/email-body merge-lines)
                        s/type-label s/email})
    (recur (dec depth) (split-email depth chain))))

(defn start-email-graph [body]
  (loom/build-graph [{s/email-body body}] []))

(defn raw-msg-chain [body]
  (p :raw-msg-chain
     (-> body
         str/split-lines
         count-depth
         (recursive-split (start-email-graph
                           (str/split-lines body))))))

(defn get-text-recursive [message]
  (p :get-text-recursive
     (cond
       (.contains (content message) plain-type)
       (content message)
       (.contains (content message) multi-type)
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

(defn make-headers [pair root]
  (map #(vector root % (-> pair key name)) (val pair)))

(defn headers-parse [message]
  (let [root {s/email-received (received-time message)
              s/email-sent (sent-time message)
              s/email-subject (subject message)}]
    (loom/build-graph
     [root]
     (->> [(decode-recipients message)
           (decode-sender message)
           (decode-replyto message)]
          (apply merge)
          (map #(make-headers % root))
          (apply concat)))))

(defn headers-for-last [raw-msgs headers]
  (update raw-msgs
          (dec (count raw-msgs))
          (merge (last raw-msgs) headers)))

(defn make-to [node chain]
  (vector node
          (as-> node $
            (loom/out-edge-label chain $ s/email-reply)
            (second $)
            (loom/out-edge-label chain $ s/email-from)
            (second $))
          s/email-to))

(defn infer-email-chain [chain]
  (loom/add-edges chain
                  (->> chain loom/nodes
                       (filter #(loom/out-edge-label chain % s/email-reply))
                       (map #(make-to % chain)))))

(defn replace-subject [subject chain node]
  (loom/replace-node
   chain node
   (assoc node s/email-subject subject
               s/email-sub-hash (com/end-hash subject))))

(defn infer-subject [chain]
  (reduce (partial replace-subject
                   (-> chain find-bottom s/email-subject))
          chain (->> chain loom/nodes
                     (filter #(loom/out-edge-label chain % s/email-from)))))

(defn message-inference [chain]
  (p :message-inference
     (-> chain
         infer-email-chain
         infer-subject)))

(defn merge-bottom-headers [chain headers]
  (as-> chain $
    (loom/merge-graphs [$ headers])
    (loom/replace-node $ (find-bottom chain)
                       (merge (find-bottom chain)
                              (-> headers loom/top-nodes first)))
    (loom/replace-node $ (-> headers loom/top-nodes first)
                       (find-bottom $))))

(defn full-parse [message]
  (try (-> message
           get-text-recursive
           raw-msg-chain
           (merge-bottom-headers (headers-parse message))
           message-inference)
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

(defn has-valid-from? [chain node]
  (when-let [from (loom/out-edge-label chain node s/email-from)]    
    (let [from (from second s/email)]
      (and (not (nil? from)) (> (count from) 3)))))

(defn remove-invalid-from [chain]
  (loom/remove-nodes chain (filter #(not (has-valid-from? chain %))
                                   (loom/nodes chain))))

(defn from-lookup [message user]
  (p :from-lookup
     (assoc message :from-database
             (recon/person-match
              user (s/email-from message)))))

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
             s/email
             (select-keys parsed-email
                          [s/email-received s/email-sent s/email-subject
                           s/email-sub-hash s/email-body])))))

(defn create-link [parsed-email user]
  (p :create-link
     (assoc parsed-email :link
            (partial recon/add-email-link!
                     user (:email-vertex parsed-email)))))

(def email-keys [s/email-to s/email-cc s/email-bcc
                 s/email-replyto s/email-mentions])

(defn insert-links! [parsed-email keys]
  (p :insert-links
     ;; Only one "from" per email
     ((:link parsed-email) s/email-from
      (s/email-from parsed-email))
     (doseq [k keys]
       (doseq [p (k parsed-email)]
         ((:link parsed-email) k p)))))

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
  (doall
   (->> (messages-in-range (fetch-imap-folder user)
                           lower upper)
        (pmap full-parse)
        (map #(insert-emails! user %))))
  :success)

(defn insert-first-n! [user n]
  (let [limit (message-count (fetch-imap-folder user))]
    (insert-email-range! user (- limit n) limit)))
