(ns spectra.imap
  (:require [clojure.string :as str]
            [spectra.async :as async]
            [spectra.auth :as auth]
            [spectra.common :refer :all]
            [spectra.corenlp :as nlp]
            [spectra.datetime :as dt]
            [spectra.google :as google]
            [spectra.insert :as insert]
            [spectra.loom :as loom]
            [spectra.regex :as regex]
            [spectra.reply :as reply]
            [spectra_cljc.schema :as s]
            [spectra.weka :as weka]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [javax.mail FetchProfile Folder
            Message Message$RecipientType]
           [javax.mail.internet InternetAddress]
           [com.sun.mail.imap IMAPFolder$FetchProfileItem]
           [org.jsoup Jsoup]))

;; Global variables
(def inbox-folder-name "[Gmail]/All Mail")
(def plain-type "text/plain")
(def html-type "text/html")
(def multi-type "multipart")

(def parse-threads 6)
(def batch-size 12)

(defonce parse-channel (atom nil))

(def email-domains [".com" ".edu" ".org" ".net"])
(def email-name-blacklist ["linkedin.com"])

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
  (let [messages (messages-in-range folder begin end)]
    (.fetch folder messages (fetch-profile-all))
    (into [] messages)))

(defn subject [message]
  (let [subject (.getSubject message)]
    (if (nil-or-empty? subject)
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

(defnc refresh-inbox [user]
  (-> user google/lookup-token google/get-access-token!
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

(defn email-body-nodes [chain]
  (filter #(contains? % s/email-body)
          (loom/nodes chain)))

(defn find-bottom [chain]
  (->> chain email-body-nodes
       (remove #(loom/out-edge-label chain % s/email-reply))
       first))

(defn find-top [chain]
  (->> chain email-body-nodes
       (remove #(loom/in-edge-label chain % s/email-reply))
       first))

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
       (map #(make-to % chain)) (filter #(second %))
       (loom/add-edges chain)))

(defn replace-subject [subject chain node]
  (loom/replace-node
   chain node
   (assoc node s/email-subject subject)))

(defn infer-subject [chain]
  (reduce (partial replace-subject
                   (-> chain find-bottom s/email-subject))
          chain (->> chain loom/nodes
                     (filter #(-> % s/type-label (= s/email))))))

(defn merge-bottom-headers [chain headers]
  (as-> chain $
    (loom/merge-graphs [$ headers])
    (loom/replace-node $ (find-bottom chain)
                       (merge (find-bottom chain)
                              (-> headers loom/top-nodes first)))
    (loom/replace-node $ (-> headers loom/top-nodes first)
                       (find-bottom $))))

(defn chain-lines [chain]
  (-> chain find-top s/email-body))

(defn count-min-depth [lines]
  (->> lines reply/count-depth (apply min)))

(defn count-max-depth [lines]
  (->> lines reply/count-depth (apply max)))

(defn remove-arrows [num lines]
  (map #(str/replace-first
         % (apply str (repeat num ">")) "")
       lines))

(defn remove-arrows-if [lines]
  (remove-arrows (count-min-depth lines) lines))

(defn new-top [{:keys [end-body start-tail]} chain]
  (let [new-slice (slice end-body start-tail (chain-lines chain))]
    {s/email-body (remove-arrows-if new-slice)}))

(defn maybe-add-edges [chain new-node email-from]
  (if email-from
    (loom/add-edges chain [[new-node email-from s/email-from]])
    chain))

(defn maybe-add-top [new-chain old-chain marks new-node]
  (if (> (:depth marks) 0)
    (loom/add-edges new-chain [[(new-top marks old-chain)
                                new-node s/email-reply]])
    new-chain))

(defn merge-lines [lines]
  (str/join "\r\n" lines))

(defn sub-email [marks lines]
  {s/email-sent (-> marks s/email-sent)
   s/type-label s/email
   s/email-body (merge-lines (remove-arrows-if lines))})

(defn make-new-node [{:keys [start-tail end-header end-body]
                      :as marks} chain]
  (let [lines (chain-lines chain)]
    (->> (slice start-tail (count lines) lines)
         (concat (slice end-header end-body lines))
         (sub-email marks))))

(defn maybe-add [m k v]
  (if v (assoc m k v) m))

(defn header->person [{:keys [email-from-name email-from-addr]}]
  (when (or email-from-name email-from-addr)
    (-> (assoc {} s/type-label s/person)
        (maybe-add s/s-name email-from-name)
        (maybe-add s/email-addr email-from-addr))))

(defn split-email [marks chain]
  (let [new-node (make-new-node marks chain)
        email-from (header->person marks)]
    (-> chain
        (loom/replace-node (find-top chain) new-node)
        (maybe-add-edges new-node email-from)
        (maybe-add-top chain marks new-node))))

(defn loc-distance [header email]
  (let [pos (str/last-index-of header email)]
    (fn [pair]
      (update (vec pair) 0
              #(-> % (- pos) Math/abs)))))

(defn name-locations [header name]
  (loop [locations nil remainder header]
    (if-let [loc (str/index-of remainder name)]
      (recur (if locations
               (conj locations (+ loc (last locations) (count name)))
               [loc])
             (subs remainder (+ loc (count name))))
      (->> name (repeat (count locations))
           (zipvec locations)))))

(defn pick-name [header models email]
  (when email
    (->> header (nlp/run-nlp-default models) nlp/nlp-names
         (mapcat #(name-locations header %))
         (map (loc-distance header email))
         (sort-by first) first second)))

;; Arbitrary date: 1960-01-02 05:11:48.874
(def ref-date (java.util.Date. -315514073744))

(defn sent-date [line]
  (->> (dt/dates-in-text line ref-date)
       (remove dt/has-ms?)
       (remove #(= "1960" (dt/format-year %)))))

(defn header-parse [header models]
  (let [date (-> header sent-date last)
        email (-> header regex/find-email-addrs last)
        name (pick-name header models email)]
    (merge (if date {s/email-sent date} {})
           (if email {:email-from-addr email} {})
           (if name {:email-from-name name} {}))))

(defn join-lines [lines]
  (reduce #(str/replace %1 %2 (str %2 " "))
          (str/join "" lines)
          email-domains))

(defn find-header-vals [marks models lines]
  (let [header-lines (->> [0 (:end-header marks) lines]
                          (apply slice) join-lines)]
    (if (empty? header-lines) marks
        (merge marks (header-parse header-lines models)))))

(defn first-header [sep-model lines]
  (if (or (nil? lines) (empty? lines))
    0 (loop [cnt 0]
        (cond (= cnt (count lines)) (count lines)
              (weka/is-header? sep-model (nth lines cnt)) cnt
              :else (recur (inc cnt))))))

(defn first-body [sep-model lines]
  (if (or (nil? lines) (empty? lines))
    0 (loop [cnt 0]
        (cond (= cnt (count lines)) (count lines)
              (not (weka/is-header? sep-model (nth lines cnt))) cnt
              :else (recur (inc cnt))))))

(defn find-end-header [marks sep-model lines]
  (->> lines (first-body sep-model)
       (assoc marks :end-header)))

(defn find-end-body [{:keys [end-header] :as marks}
                     sep-model lines]
  (->> (drop end-header lines)
       (first-header sep-model) (+ end-header)
       (assoc marks :end-body)))

(defn count-nested [text]
  (count (first (re-seq #"^>+" text))))

(defn in-block? [lines index f]
  (cond (neg? index) false
        (>= index (count lines)) false
        :else (f (count-nested (nth lines index)))))

(defn start-tail [marks lines]
  (assoc marks :start-tail
         (if (= 0 (count-max-depth lines))
           (count lines)
           (-> (fn [x] (in-block? (rseq (vec lines)) x zero?))
               (drop-while (range))
               first (- )
               (+ (count lines))))))

(defnp find-marks [{:keys [sep nlp]} depth chain]
  (let [lines (chain-lines chain)]
    (-> {:depth depth s/email-sent nil :email-from-name nil
         :email-from-addr nil}
        (find-end-header sep lines)
        (find-end-body sep lines)
        (start-tail lines)
        (find-header-vals nlp lines))))

(defn recursive-split [models depth chain]
  (if (>= depth 0)
    (recur models
           (-> chain chain-lines count-max-depth
               (min (dec depth)))
           (-> models (find-marks depth chain)
               (split-email chain)))
    chain))

(defn start-email-graph [body]
  (loom/build-graph [{s/email-body body}] []))

(defn full-email-graph [body]
  (loom/build-graph [{s/email-body (merge-lines body)
                      s/type-label s/email}] []))

(defnp raw-msg-chain [body models]
  (let [lines (str/split-lines body)
        depth (count-max-depth lines)]
    (if (> depth 0)
      (recursive-split models depth (start-email-graph lines))
      (full-email-graph lines))))

(defn make-headers [pair root]
  (map #(vector root % (key pair)) (val pair)))

(defn blacklist-check [m email addr]
  (if (->> email-name-blacklist
           (map #(.contains email %))
           (some identity)) m
      (maybe-add m s/s-name (.getPersonal addr))))

(defn addr-person [addr]
  (let [email-addr (.getAddress addr)]
    (-> (assoc {} s/type-label s/person)
        (maybe-add s/email-addr email-addr)
        (blacklist-check email-addr addr))))

(defn decode-addr-map [addr-map]
  (fmap addr-map #(map addr-person %)))

(defn headers-parse [[params nodes]]
  (->> nodes (apply merge) decode-addr-map 
       (mapcat #(make-headers % params))
       (loom/build-graph [params])))

(defnc full-parse [[message headers] models]
  (-> message regex/strip-javascript
      (raw-msg-chain models)
      (merge-bottom-headers headers)
      infer-email-chain infer-subject))

(defn parse! [models {:keys [message user]}]
  [(full-parse message models) user s/email-src])

(defn make-parse-pool! []
  (->> {:name "email-parse" :process parse!
        :param-gen reply/parse-models-fn
        :callback #(apply insert/push-graph! %)
        :num-threads parse-threads}
       async/create-pool!
       (reset! parse-channel)))

(defnc get-recipients [message field]
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

(defnp headers-fetch [message folder]
  (vector {s/email-received (received-time message)
           s/email-sent (sent-time message)
           s/email-subject (subject message)
           s/email-uid (get-uid folder message)}
          [(decode-recipients message)
           (decode-sender message)
           (decode-replyto message)]))

(defnp get-text-recursive [message]
  (let [c-type (-> message content-type str/lower-case)]
    (cond
      (.contains c-type plain-type)
      [{:text (content message)}]
      (.contains c-type multi-type)
      (->> message content get-parts
           (mapcat get-text-recursive))
      (.contains c-type html-type)
      (->> message content Jsoup/parse .text
           (hash-map :html) vector)
      :else [""])))

(defn get-text [message]
  (let [parts (get-text-recursive message)
        mapjoin #(->> % (mapcat vals) (str/join ""))]
    (condp = (->> parts (mapcat keys) distinct set)
      #{:text} (mapjoin parts)
      #{:html} (mapjoin parts)
      #{:text :html} (->> parts (group-by (comp first keys))
                          :text mapjoin)
      "")))

(defnp message-fetch [folder message]
  (let [message-text (get-text message)]
    (vector (if (or (nil? message-text) (empty? message-text))
              "(No body)" message-text)
            (headers-parse (headers-fetch message folder)))))

(defn train-messages [user n]
  (let [folder (fetch-imap-folder user)
        max-n (last-uid folder)
        rand-gen #(-> max-n (* 0.25) int rand-int)]
    (->> rand-gen (repeatedly n)
         (map #(-> max-n (* 0.75) int (+ %)))
         (pmap #(get-message folder %)) (remove nil?)
         (map get-text) (mapcat str/split-lines)
         (map #(vector % "b")) (map prn-str)
         (str/join ""))))

(defn try-parse [user n]
  (let [folder (fetch-imap-folder user)
        message (first (fetch-messages folder n n))]
    (when message
      (->> message (message-fetch folder)
           (#(update % 0 str/split-lines))
           (apply reply/reply-parse (reply/parse-models-fn))))))

(defn insert-raw-range! [user lower upper]
  (let [folder (fetch-imap-folder user)]
    (->> (fetch-messages folder lower upper)
         (pmap #(->> (message-fetch folder %)
                     (hash-map :user user :message)
                     (@parse-channel)))
         dorun)))

(defn insert-one-email! [user email-num]
  (insert-raw-range! user email-num email-num))

(defn insert-first-n! [user n]
  (let [limit (last-uid (fetch-imap-folder user))]
    (insert-raw-range! user (- limit n) limit)))
