(ns candlecrm.imap
  (:require [clojure.string :as str]
            [clojure.set :as cset]
            [candlecrm.async :as async]
            [candlecrm.auth :as auth]
            [candlecrm.common :refer :all]
            [candlecrm.corenlp :as nlp]
            [candlecrm.datetime :as dt]
            [candlecrm.google :as google]
            [candlecrm.index :as index]
            [candlecrm.insert :as insert]
            [candlecrm.loom :as loom]
            [candlecrm.neo4j :as neo4j]
            [candlecrm.regex :as regex]
            [candlecrm.reply :as reply]
            [candlecrm_cljc.schema :as s]
            [candlecrm.weka :as weka]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [javax.mail FetchProfile Folder
            Message Message$RecipientType]
           [javax.mail.internet InternetAddress]
           [com.sun.mail.imap IMAPFolder$FetchProfileItem]
           [org.jsoup Jsoup]
           [com.google.api.client.auth.oauth2
            TokenResponseException]))

;; Global variables
(def inbox-folder-name "[Gmail]/All Mail")
(def plain-type "text/plain")
(def html-type "text/html")
(def multi-type "multipart")

(def parse-threads 6)
(def batch-size 12)
(def archive-size 4000)

(defonce parse-channel (atom nil))
(defonce overload-locked (atom #{}))
(defonce message-queue (atom #{}))
(defonce empty-flag (atom false))

(def email-domains [".com" ".edu" ".org" ".net"])
(def email-name-blacklist ["linkedin.com"])

(defn get-folder [store folder-name]
  (.getFolder store folder-name))

(defn get-inbox [store]
  (.getFolder store inbox-folder-name))

(defn close-store! [store]
  (.close store))

(defn open-folder-read! [folder]
  (when folder
    (.open folder (Folder/READ_ONLY))))

(defn close-folder! [folder]
  (.close folder false))

(defn folder-open? [folder]
  (when folder
    (.isOpen folder)))

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
  (try
    (when-let [token (google/lookup-token user)]
      (-> token google/get-access-token!
          (google/get-imap-store! (auth/get-username user))
          get-inbox))
    (catch TokenResponseException e
      (throw-warn! (str "Error: Token invalid for user " user))
      (throw-warn! (str "Revoking token for user " user))
      (google/revoke-access-token! user)
      (google/delete-token! user) (auth/delete-queue! user)
      nil)))

;; TODO: support IMAP stores other than GMail
(defn fetch-imap-folder
  ([user] (fetch-imap-folder user false))
  ([user force-new]
   (let [inbox (atom nil)]
     (reset! inbox (if (and (not force-new)
                            (contains? @imap-lookup user))
                     (get @imap-lookup user)
                     (refresh-inbox user)))
     (when-not (folder-open? @inbox)
       (try (open-folder-read! @inbox)
            (catch Exception e
              (do (reset! inbox (refresh-inbox user))
                  (open-folder-read! @inbox)))))
     (update-imap-lookup! user @inbox)
     @inbox)))

(defnp content [message]
  (.getContent message))

(defnp content-type [message]
  (.getContentType message))

(defn min-one [n]
  (if (< n 1) 1 n))

(defn archive-load [user]
  (if (not user) 1
      (if-let [f (fetch-imap-folder user)]
        (-> f last-uid (- archive-size) min-one) 1)))

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

(defn chain-lines [chain]
  (-> chain find-top s/email-body))

(defn count-min-depth [lines]
  (->> lines regex/count-depth (apply min)))

(defn count-max-depth [lines]
  (->> lines regex/count-depth (apply max)))

(defn maybe-add [m k v]
  (if v (assoc m k v) m))

;; Arbitrary date: 1960-01-02 05:11:48.874
(def ref-date (java.util.Date. -315514073744))

(defn sent-date [line]
  (->> (dt/dates-in-text line ref-date)
       (remove dt/has-ms?)
       (remove #(= "1960" (dt/format-year %)))))

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

(defn graph-uid [graph]
  {:post [(integer? %)]}
  (->> graph loom/nodes reply/email-nodes
       (map s/email-uid) (remove nil?) first))

(defn queue-graph [graph]
  (swap! message-queue cset/difference #{(graph-uid graph)}))

(defn maybe-load [user graph]
  (if (contains? @overload-locked user)
    (do (Thread/sleep 300) (recur user graph))
    (if (->> graph loom/nodes
             (filter #(= (s/type-label %) s/email))
             count (> 5))
      (do (queue-graph graph) graph)
      (do (swap! overload-locked cset/union #{user})
          (reset! empty-flag true)
          (queue-graph graph) graph))))

(defn full-parse [[message headers] models user]
  (->> message regex/strip-javascript str/split-lines
       (reply/reply-parse models headers)
       (maybe-load user)))

(defn parse! [models {:keys [message user]}]
  [(full-parse message models user) user s/email-src])

(defn make-parse-pool! []
  (->> {:name "email-parse" :process parse!
        :param-gen reply/parse-models-fn
        :callback #(apply insert/push-graph! %)
        :num-threads parse-threads}
       async/create-pool!
       (reset! parse-channel)))

(defn new-queue-map [top-uid]
  {s/top-uid top-uid s/loaded-top top-uid
   s/loaded-bottom top-uid s/type-label s/email-queue
   s/modified (dt/now)})

(defn add-new-queue! [user]
  (when-let [folder (fetch-imap-folder user)]
    (-> folder last-uid new-queue-map vector
        (insert/push-entities! user s/meta-src)
        first neo4j/find-by-id
        (neo4j/create-edge! user s/user-queue))))

(defn reset-user! [username]
  (let [user (auth/lookup-user username)]
    (auth/delete-user-data! user)
    (auth/create-user-person! user)
    (add-new-queue! user)
    (index/make-constraints! user)
    (neo4j/set-property! user s/index-run true)))

(defn scroll-emails [user f]
  (when-let [userinbox (fetch-imap-folder user)]
    (loop [i (last-uid userinbox)]
      (println "Email number: " i)
      (when-let [m (get-message userinbox i)]
        (println "Parsing message number: " i)
        (f user m i))
      (recur (dec i)))))

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

(defnp headers-fetch [message folder]
  (vector {s/email-received (received-time message)
           s/email-sent (sent-time message)
           s/email-subject (subject message)
           s/email-uid (get-uid folder message)
           s/type-label s/email}
          [(decode-recipients message)
           (decode-sender message)
           (decode-replyto message)]))

(defn html-to-text [html]
  (-> html (str/replace #"(?i)</tr>" "</tr> br2n ")
      (str/replace #"(?i)<br[^>]*>" "br2n")
      (str/replace #"(?i)<p>" "<p> br2n ")
      (str/replace #"(?i)</p>" "</p> br2n ")
      Jsoup/parse .text
      (str/replace #"br2n" "\n")))

(defnp get-text-recursive [message]
  (let [c-type (-> message content-type str/lower-case)]
    (cond
      (.contains c-type plain-type)
      [{:text (content message)}]
      (.contains c-type multi-type)
      (->> message content get-parts
           (mapcat get-text-recursive))
      (.contains c-type html-type)
      (->> message content html-to-text
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
           (#(update % 0 str/split-lines)) reverse
           (apply reply/reply-parse (reply/parse-models-fn))))))

(defn add-queue [folder messages]
  (->> messages (map #(get-uid folder %)) (into #{})
       (swap! message-queue cset/union)) messages)

(defnc insert-raw-range! [user lower upper]
  (when-let [folder (fetch-imap-folder user)]
    (->> (fetch-messages folder lower upper) (add-queue folder)
         (pmap #(->> (message-fetch folder %)
                     (hash-map :user user :message)
                     (@parse-channel)))
         dorun)
    (neo4j/table-refresh! user)))

(defn insert-one-email! [user email-num]
  (insert-raw-range! user email-num email-num))

(defn insert-first-n! [user n]
  (let [limit (last-uid (fetch-imap-folder user))]
    (insert-raw-range! user (- limit n) limit)))
