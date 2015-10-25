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

(defn subject [message]
  (.getSubject message))

(defn received-time [message]
  (.getReceivedDate message))

(defn sent-time [message]
  (.getSentDate message))

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

(defn import-label [chain edge]
  (loom/replace-node chain (first edge) (nlp/label-edge edge)))

(defn decode-address [address]
  (nlp/normalize-person (.getPersonal address)
                        (.getAddress address)
                        s/person))

(defn decode-header [header]
  {(.getName header) (.getValue header)})

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
      0 (->> arrows (map first) (map count) (apply max)))))

(defn merge-lines [lines]
  (str/join "\r\n" lines))

(defn in-block? [lines index f]
  (cond (< index 0) false
        (>= index (count lines)) false
        :else (f (count-nested (nth lines index)))))

(defn find-bottom [chain]
  (->> chain loom/nodes
       (filter #(contains? % s/email-body))
       (filter #(not (loom/out-edge-label chain % s/email-reply)))
       first))

(defn header-to-person [header]
  (nlp/normalize-person
   (-> header :email-from-name)
   (-> header :email-from-addr)
   s/person))

(defn assoc-if-found [marks map-key coll]
  (if (or (nil? coll) (empty? coll)) marks
      (assoc marks map-key (first coll))))

(defn header-ready? [marks]  
  (or (< (:start-header marks) 0)
      (s/email-sent marks)))
 
(defn sub-email [marks lines]
  {s/email-sent (-> marks s/email-sent)
   s/type-label s/email
   s/email-body (->> lines
                     (map #(strip-arrows % (:depth marks)))
                     merge-lines)})

(defn find-start-body [marks lines]
  (assoc marks :start-body
         (-> (fn [x] (in-block? lines x #(> (:depth marks) %)))
             (drop-while (range))
             first)))

(defn find-end-body [marks lines]
  (assoc marks :end-body
         (-> (fn [x] (in-block? lines x #(= (:depth marks) %)))
             (drop-while (drop (:start-body marks) (range)))
             first)))

;; 1960-01-02 05:11:48.874
(def ref-date (java.util.Date. -315514073744))

(defn sent-date [line]
  (->> (dt/dates-in-text line ref-date)
       (remove dt/has-ms?)
       (remove #(= "1960" (dt/format-year %)))))

(defn find-header [lines marks line-num]
  (if (header-ready? marks) marks
      (let [this-line (nth lines line-num)]
        (-> (assoc :start-header line-num)
            (assoc-if-found s/email-sent (sent-date this-line))
            (assoc-if-found :email-from-addr (regex/find-email-addrs this-line))
            (assoc-if-found :email-from-name (->> this-line nlp/run-nlp-default
                                                  nlp/nlp-names first))))))

(defn find-start-header [marks lines]
  (reduce (partial find-header lines) marks
          (range (:start-body marks) -1 -1)))

(defn body-check [marks]
  (if (= (:start-header marks) (:start-body marks))
    (assoc marks :start-body (-> marks :start-body inc))
    marks))

(defn chain-lines [chain]
  (-> chain find-bottom s/email-body))

(defn find-marks [depth chain]
  (let [lines (chain-lines chain)]
    (-> {:depth depth s/email-sent nil :email-from-name nil
         :email-from-addr nil :start-header 0}
        (find-start-body lines)
        (find-end-body lines)
        (find-start-header lines)))) 

(defn new-bottom [marks chain]
  {s/email-body
   (com/slice-not (:start-header marks) (:end-body marks)
                  (chain-lines chain))})

(defn end-bottom [chain]
  {s/email-body (-> chain chain-lines merge-lines)
   s/type-label s/email})

(defn make-new-node [marks chain]
  (sub-email marks (->> chain chain-lines
                        (com/slice (:start-body marks)
                                   (:end-body marks)))))

(defn split-email [marks chain]
  (let [new-node (make-new-node marks chain)]
    (-> (loom/replace-node chain (find-bottom chain) new-node)
        (loom/add-edges [[new-node (header-to-person marks) s/email-from]
                         [new-node (new-bottom marks chain) s/email-reply]]))))

(defn recursive-split [depth chain]
  (if (<= depth 0)
    (loom/replace-node chain (find-bottom chain) (end-bottom chain))
    (recur (dec depth) (-> depth (find-marks chain) (split-email chain)))))

(defn start-email-graph [body]
  (loom/build-graph [{s/email-body body}] []))

(defn raw-msg-chain [body]
  (p :raw-msg-chain
     (-> body str/split-lines count-depth
         (recursive-split (start-email-graph
                           (str/split-lines body))))))

(defn get-text-recursive [message]
  (p :get-text-recursive
     (cond
       (.contains (content-type message) plain-type)
       (content message)
       (.contains (content-type message) multi-type)
       (->> (-> message content get-parts)
            (map get-text-recursive)
            (filter #(not= "" %))
            (cons "") last)
       :else "")))

(defn make-headers [pair root]
  (map #(vector root % (-> pair key)) (val pair)))

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
  (->> chain loom/nodes
       (filter #(loom/out-edge-label chain % s/email-reply))
       (map #(make-to % chain))
       (loom/add-edges chain)))

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
  (p :full-parse
     (try (-> message
              get-text-recursive
              regex/strip-javascript
              raw-msg-chain
              (merge-bottom-headers (headers-parse message))
              message-inference)
          (catch Exception e
            (do (prn "Email parse error")
                (prn e) {})))))

(defn hash-brackets [text]
  (str "<a href='" (com/sha1 text) "'>" text "</a>"))

(defn hyperlink-text [text mentions]
  (reduce #(str/replace %1 %2 (hash-brackets %2))
          text mentions))

(defn mention-nodes [chain]
  (->> (loom/nodes chain)
       (filter #(loom/out-edge-label chain % s/has-type))))

(defn parse-datetime [chain event]
  (if (-> event s/date-time type (= java.util.Date)) chain
      (->> (loom/in-edge-label chain event s/email-mentions)
           first s/email-sent
           (dt/dates-in-text (s/date-time event))
           first (assoc event s/date-time)
           (loom/replace-node chain event))))

(defn parse-email-addr [chain node]
  (->> (s/email-addr node)
       (map #(nlp/normalize-person nil % s/person))
       nlp/merge-people
       (loom/replace-node chain node)))

(defn use-nlp [chain message]
  (as-> (->> (s/email-body message)
             (nlp/run-nlp nlp/*pipeline*)
             (conj [chain])
             loom/merge-graphs) $
    (loom/add-edges $ (->> (mention-nodes $)
                           (map #(vector message % s/email-mentions))))
    (loom/replace-node $ message
                       (->> (mention-nodes $)
                            (hyperlink-text (s/email-body message))
                            (assoc message s/email-body)))
    (reduce import-label $ (loom/select-edges $ s/has-type))
    (reduce parse-datetime $ (->> (loom/nodes $)
                                  (filter #(= s/event (:label %)))))
    (reduce parse-email-addr $
            (->> (loom/nodes $)
                 (filter #(and (s/email-addr %) (not (s/name %))))))
    (loom/remove-nodes $ (->> s/has-type (loom/select-edges $) (map second)))))

(def url-map {s/person "/person/" s/email "/email/"
              s/organization "/organization/" s/location "/location/"
              s/money "/finance/" s/event "/event/"})

(defn add-hyperlink [g edge]
  (loom/replace-node
   g (first edge)
   (assoc (first edge) :hyperlink
          (str (-> edge first :label url-map)
               (-> edge second :id)))))

(defn make-hyperlinks [g]
  (reduce add-hyperlink g (loom/select-edges g :database-match)))

(defn switch-hyperlinks [text link-map]
  (reduce #(str/replace %1 %2 (link-map %2))
          text (keys link-map)))

(defn switch-message [g message]
  (->> (loom/labeled-edges g message s/email-mentions)
       (map second)
       (map #(hash-map (:hash %) (:hyperlink %)))
       (apply merge)
       (switch-hyperlinks (:body message))
       (assoc message :body)
       (loom/replace-node g message)))

(defn nodes-of-edges [edges]
  (-> (map second edges)
      (conj (first (first edges)))))

;; Assumes emails are already parsed
(defn insert-emails! [user emails]
  (p :insert-emails
     (try
       (dorun
        (as-> emails $
          (recon/link-people $ (recon/labeled-people-orgs
                                user (recon/merged-props $ [s/person s/organization])))
          (recon/merge-graph! $)
          (recon/load-new! $ s/person [s/person (neo4j/user-label user)])
          (recon/load-new! $ s/organization [s/organization (neo4j/user-label user)])
          (recon/find-old-emails $)
          (reduce use-nlp $ (recon/filter-memory $ s/email))
          (recon/link-people $ (recon/labeled-people-orgs
                                user (recon/merged-props $ [s/person s/organization])))
          (recon/link-one-prop s/location s/name user $)
          (recon/link-one-prop s/event s/date-time user $)
          (recon/link-one-prop s/money s/amount user $)
          (reduce #(recon/link-new! %1 %2 [%2 (neo4j/user-label user)])
                  $ [s/person s/organization s/location s/event s/money])
          (make-hyperlinks $)
          (reduce switch-message $ (recon/filter-memory $ s/email))
          (recon/link-new! $ s/email [s/email (neo4j/user-label user)])
          (recon/merge-graph! $)
          (reduce #(loom/replace-node %1 %2 (:id %2)) $ (loom/nodes $))
          (loom/remove-edges $ (neo4j/find-links (loom/multi-edges $)))
          (loom/spider-edges $ '())
          (map #(neo4j/create-links! (nodes-of-edges %) %) $)))
       (catch Exception e
         (do (prn "Email insertion error")
             (prn e) nil)))))
  
(defn insert-email-range! [user lower upper]
  (doall
   (->> (messages-in-range (fetch-imap-folder user) lower upper)
        (pmap full-parse)
        (map #(insert-emails! user %))))
  :success)

(defn insert-one-email! [user email-num]
  (insert-email-range! user email-num email-num))

(defn insert-first-n! [user n]
  (let [limit (message-count (fetch-imap-folder user))]
    (insert-email-range! user (- limit n) limit)))
