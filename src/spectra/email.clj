(ns spectra.email
  (:require [clojure.string :as str]
            [crypto.random :as rnd]
            [spectra.auth :as auth]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra.google :as google]
            [spectra.insert :as insert]
            [spectra.loom :as loom]
            [spectra.mlrecon :as mlrecon]
            [spectra.neo4j :as neo4j]
            [spectra.corenlp :as nlp]
            [spectra.queries :as queries]
            [spectra.recon :as recon]
            [spectra.regex :as regex]
            [spectra.weka :as weka]
            [spectra_cljc.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [javax.mail FetchProfile Folder
            Message Message$RecipientType]
           [javax.mail.internet InternetAddress]
           [com.sun.mail.imap IMAPFolder$FetchProfileItem]))

(def inbox-folder-name "[Gmail]/All Mail")
(def plain-type "text/plain")
(def html-type "text/html")
(def multi-type "multipart")
(def batch-size 100)

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

(defn last-uid [folder]
  (dec (.getUIDNext folder)))

(defn inbox-count [store]
  (message-count (get-inbox store)))

(defn get-message [folder num]
  (.getMessageByUID folder num))

(defn fetch-profile-all []
  (doto (FetchProfile. )
    (.add IMAPFolder$FetchProfileItem/INTERNALDATE)
    (.add IMAPFolder$FetchProfileItem/HEADERS)
    (.add IMAPFolder$FetchProfileItem/MESSAGE)))

(defnp messages-in-range [folder begin end]
  (.getMessagesByUID folder begin end))

(defnp fetch-messages [folder begin end]
  (def q (messages-in-range folder begin end))
  (.fetch folder q (fetch-profile-all))
  (into [] q))
  
(defn subject [message]
  (let [subject (.getSubject message)]
    (if (com/nil-or-empty? subject)
      "(no subject)" subject)))

(defn received-time [message]
  (.getReceivedDate message))

(defn sent-time [message]
  (.getSentDate message))

(defn get-uid [folder message]
  (.getUID folder message))

(defn get-header [message header]
  (.getHeader message header))

(defonce imap-lookup (atom {}))

(defn update-imap-lookup! [user inbox]
  (swap! imap-lookup assoc user inbox))

(defn shut-folder! [folder]
  (let [store (folder-store folder)]
    (close-folder! folder)
    (close-store! store)))

(defn close-imap-lookup! []
  (->> (keys @imap-lookup)
       (map #(@imap-lookup %))
       (map shut-folder!))
  (reset! imap-lookup {}))

(defn refresh-inbox [user]
  (-> user google/lookup-token
      google/get-access-token!
      (google/get-imap-store! (auth/get-username user))
      get-inbox))

(defonce inbox (atom nil))

;; TODO: support IMAP stores other than GMail
(defn fetch-imap-folder [user]
  (reset! inbox (if (contains? @imap-lookup user)
                  (get @imap-lookup user)
                  (refresh-inbox user)))
  (when-not (folder-open? @inbox)
    (try (open-folder-read! @inbox)
         (catch Exception e
           (do (reset! inbox (refresh-inbox user))
               (open-folder-read! @inbox)))))
  (update-imap-lookup! user @inbox)
  @inbox)

(defnp content [message]
  (.getContent message))

(defnp content-type [message]
  (.getContentType message))

(defnp get-parts [multipart]
  (map #(.getBodyPart multipart %)
       (range (.getCount multipart))))

(defn import-label [chain edge]
  (loom/replace-node chain (first edge) (nlp/label-edge edge)))

(defn maybe-add [m k v]
  (if v (assoc m k v) m))

(defn addr-person [addr]
  (-> (assoc {} s/type-label s/person)
      (maybe-add s/s-name (.getPersonal addr))
      (maybe-add s/email-addr (.getAddress addr))))

(defn decode-addresses [addresses]
  (map addr-person addresses))

(defn decode-addr-map [addr-map]
  (reduce #(update %1 %2 decode-addresses)
          addr-map (keys addr-map)))

(defn decode-header [header]
  {(.getName header) (.getValue header)})

(defn get-recipients [message field]
  (.getRecipients message field))

(defn decode-recipients [message]
  {s/email-to (get-recipients message Message$RecipientType/TO)
   s/email-cc (get-recipients message Message$RecipientType/CC)
   s/email-bcc (get-recipients message Message$RecipientType/BCC)})

(defn parse-name-email [s]
  (-> s InternetAddress/parse))
  
(defn decode-sender [message]
  {s/email-from
   (if-let [orig-from (get-header message "X-Original-From")]
     (-> orig-from vec first parse-name-email)
     (.getFrom message))})

(defn decode-replyto [message]
  {s/email-replyto (.getReplyTo message)})

(defn headers [message]
  (->> (.getAllHeaders message)
       enumeration-seq
       (map decode-header)
       (apply merge)))

(defn strip-arrows [line num]
  (str/replace-first line (str/join (repeat num ">")) ""))

(defn count-nested [text]
  (count (first (re-seq #"^>+" text))))

(defn count-arrows [lines]
  (->> lines
       (map #(re-seq #"^>+" %))
       (remove nil?)))
  
(defn count-depth [lines]
  (let [arrows (count-arrows lines)]
    (if (or (nil? arrows) (empty? arrows))
      0 (->> arrows (map first) (map count) (apply max)))))

(defn merge-lines [lines]
  (str/join "\r\n" lines))

(defn in-block? [lines index f]
  (cond (neg? index) false
        (>= index (count lines)) false
        :else (f (count-nested (nth lines index)))))

(defn find-bottom [chain]
  (->> chain loom/nodes
       (filter #(contains? % s/email-body))
       (remove #(loom/out-edge-label chain % s/email-reply))
       first))

(defn header->person [header]
  (when (or (:email-from-name header)
            (:email-from-addr header))
    (-> (assoc {} s/type-label s/person)
        (maybe-add s/s-name (:email-from-name header))
        (maybe-add s/email-addr (:email-from-addr header)))))

(defn assoc-if-found [marks map-key coll]
  (if (or (nil? coll) (empty? coll)) marks
      (assoc marks map-key (first coll))))

(defn header-ready? [marks]  
  (or (neg? (:start-header marks))
      (and (s/email-sent marks)
           (or (:email-from-addr marks)
               (:email-from-name marks)))))
 
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

;; Arbitrary date: 1960-01-02 05:11:48.874
(def ref-date (java.util.Date. -315514073744))

(defn sent-date [line]
  (->> (dt/dates-in-text line ref-date)
       (remove dt/has-ms?)
       (remove #(= "1960" (dt/format-year %)))))

(defn find-header [lines marks line-num]
  (if (header-ready? marks) marks
      (let [this-line (nth lines line-num)]
        (-> (assoc marks :start-header line-num)
            (assoc-if-found s/email-sent (sent-date this-line))
            (assoc-if-found :email-from-addr (regex/find-email-addrs this-line))
            (assoc-if-found :email-from-name (->> this-line nlp/run-nlp-default
                                                  nlp/nlp-names first))))))

(defn find-start-header [marks lines]
  (reduce (partial find-header lines) marks
          (range (:start-body marks) -1 -1)))

(defn body-check [marks]
  (if (= (:start-header marks) (:start-body marks))
    (update marks :start-body inc) marks))

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

(defn depth-match? [marks chain]
  (if (zero? (:start-header marks)) false
      (= (dec (:depth marks))
         (-> chain chain-lines (nth (dec (:start-header marks)))
             vector count-depth))))

(defn remove-arrow [line depth]
  (str/replace-first line (str/join (repeat depth ">"))
                     (str/join (repeat (dec depth) ">"))))

(defn has-full-arrows? [line depth]
  (if (< (count line) depth) false
      (->> ">" (repeat depth) (apply str)
           (= (subs line 0 depth)))))

(defn remove-arrows [lines]
  (let [depth (count-depth lines)]
    (map #(if (has-full-arrows? % depth)
            (remove-arrow % depth) %)
         lines)))

(defn dec-depth [chain]
  (->> remove-arrows (update (find-bottom chain) s/email-body)
       (loom/replace-node chain (find-bottom chain))))

(defn maybe-add-edges [chain new-node email-from]
  (if email-from
    (loom/add-edges chain [[new-node email-from s/email-from]])
    chain))

(defn split-email [marks chain]
  (if (depth-match? marks chain)
    (let [new-node (make-new-node marks chain)
          email-from (header->person marks)]
      (-> chain
          (loom/replace-node (find-bottom chain) new-node)
          (maybe-add-edges new-node email-from)
          (loom/add-edges [[new-node (new-bottom marks chain) s/email-reply]])))
    (dec-depth chain)))
  
(defn recursive-split [depth chain]
  (if (<= depth 0)
    (loom/replace-node chain (find-bottom chain) (end-bottom chain))
    (recur (dec depth) (-> depth (find-marks chain) (split-email chain)))))

(defn start-email-graph [body]
  (loom/build-graph [{s/email-body body}] []))

(defnp raw-msg-chain [body]
  (-> body str/split-lines count-depth
      (recursive-split (start-email-graph
                        (str/split-lines body)))))

(defnp get-text-recursive [message]
  (let [c-type (-> message content-type str/lower-case)]
    (cond
      (.contains c-type plain-type)
      (content message)
      (.contains c-type multi-type)
      (->> message content get-parts
           (map get-text-recursive)
           (str/join ""))
      :else "")))

(defn make-headers [pair root]
  (map #(vector root % (key pair)) (val pair)))

(defnp headers-fetch [message folder]
  (vector {s/email-received (received-time message)
           s/email-sent (sent-time message)
           s/email-subject (subject message)
           s/email-uid (get-uid folder message)}
          [(decode-recipients message)
           (decode-sender message)
           (decode-replyto message)]))

(defn headers-parse [headers]
  (loom/build-graph
   [(first headers)]
   (->> (second headers) (apply merge)
        decode-addr-map
        (mapcat #(make-headers % (first headers))))))

(defn label-headers [graph]
  (let [message (->> graph loom/top-nodes first)]
    (->> (assoc message :label s/email-headers)
         (loom/replace-node graph message))))

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
   (assoc node s/email-subject subject)))

(defn infer-subject [chain]
  (reduce (partial replace-subject
                   (-> chain find-bottom s/email-subject))
          chain (->> chain loom/nodes
                     (filter #(loom/out-edge-label chain % s/email-from)))))

(defnp message-inference [chain]
  (-> chain
      infer-email-chain
      infer-subject))

(defn merge-bottom-headers [chain headers]
  (as-> chain $
    (loom/merge-graphs [$ headers])
    (loom/replace-node $ (find-bottom chain)
                       (merge (find-bottom chain)
                              (-> headers loom/top-nodes first)))
    (loom/replace-node $ (-> headers loom/top-nodes first)
                       (find-bottom $))))

(defnp message-fetch [message folder]
  (vector (get-text-recursive message)
          (headers-fetch message folder)))

(defnp full-parse [message]
  (try (-> message first
           regex/strip-javascript
           raw-msg-chain
           (merge-bottom-headers (headers-parse (second message)))
           message-inference)
       (catch Exception e
         (do (println "Email parse error")
             (print e) {}))))

(defn hash-brackets [m text]
  (str "<node " (get m text) ">" text "</node>"))

(defn hyperlink-text [text mentions]
  (if (com/nil-or-empty? mentions) text
      (str/replace text (-> mentions keys regex/regex-or)
                   (partial hash-brackets mentions))))

(defn mention-nodes [chain]
  (filter #(loom/out-edge-label chain % s/has-type) (loom/nodes chain)))

(defn hyperlink-nodes [chain]
  (filter #(loom/out-edge-label chain % s/link-to) (loom/nodes chain)))

(defn map-interval [interval]
  {s/start-time (first interval)
   s/stop-time (second interval)})

(defn normalize-event [event time-ref]
  (cond
    (contains? event s/date-time)
    (as-> event $
      (get $ s/date-time) (dt/dates-in-text $ time-ref)
      (first $) (assoc event s/start-time $)
      (dissoc $ s/date-time))
    (contains? event s/time-interval)
    (-> event (get s/time-interval) (dt/intervals-in-text time-ref)
        first map-interval (merge (dissoc event s/time-interval)))
    :else event))

(defn parse-datetime [chain event]
  (if (-> event s/date-time type (= java.util.Date)) chain
      (->> (loom/in-edge-label chain event s/email-mentions)
           first s/email-sent (normalize-event event)
           (loom/replace-node chain event))))

(defn author-name [chain message]
  (-> (loom/out-edge-label chain message s/email-from)
      second (get-in [:data s/s-name])))

(defn append-hyperlinks [chain]
  (->> chain mention-nodes
       (map #(vector {s/link-id (rnd/base64 6)
                      s/type-label s/hyperlink}
                     % s/link-to))
       (loom/add-edges chain)))

(defn link-pair [edge]
  (hash-map (-> edge second)
            (-> edge first s/link-id)))

(defn link-map [chain]
  (->> (loom/select-edges chain s/link-to)
       (map link-pair) (apply merge)))

(defn use-nlp [chain message]
  (if (com/nil-or-empty? (s/email-body message)) chain
      (as-> (->> (s/email-body message)
                 (nlp/run-nlp-full (author-name chain message))
                 append-hyperlinks (conj [chain])
                 loom/merge-graphs) $
        (loom/add-edges $ (->> $ hyperlink-nodes
                               (map #(vector message % s/has-link))))
        (loom/replace-node $ message
                           (->> (link-map $)
                                (hyperlink-text (s/email-body message))
                                (assoc message s/email-body)))
        (reduce import-label $ (loom/select-edges $ s/has-type))
        (reduce parse-datetime $ (->> $ loom/nodes
                                      (filter #(= s/event (:label %)))))
        (reduce recon/remove-dupes $ [s/email-addr s/phone-num s/s-name])
        (loom/remove-nodes $ (->> s/has-type (loom/select-edges $) (map second))))))

(defn use-nlp-graph [g]
  (reduce use-nlp g (recon/filter-memory g s/email)))

(defn insert-raw-range! [user lower upper]
  (let [folder (fetch-imap-folder user)]
    (->> (fetch-messages folder lower upper)
         (pmap #(message-fetch % folder))
         (pmap full-parse)
         (map #(insert/push-graph! % user)))))

(defn insert-one-email! [user email-num]
  (insert-raw-range! user email-num email-num))

(defn insert-first-n! [user n]
  (let [limit (last-uid (fetch-imap-folder user))]
    (insert-raw-range! user (- limit n) limit)))

(defn date-graphs [user start limit]
  (->> (queries/emails-with-dates user start limit)
       (map #(get-in % [:data :body]))
       (map regex/strip-tags)
       (map nlp/run-nlp-openie)))
