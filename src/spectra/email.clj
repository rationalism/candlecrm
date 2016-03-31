(ns spectra.email
  (:require [clojure.string :as str]
            [crypto.random :as rnd]
            [spectra.async :as async]
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

;; Global variables
(def inbox-folder-name "[Gmail]/All Mail")
(def plain-type "text/plain")
(def html-type "text/html")
(def multi-type "multipart")
(def parse-threads 6)
(def nlp-threads 6)
(def batch-size 100)

(defonce parse-channel (atom nil))
(defonce nlp-channel (atom nil))

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
      [0] (->> arrows (map first) (map count)))))

(defn count-min-depth [lines]
  (->> lines count-depth (apply min)))

(defn count-max-depth [lines]
  (->> lines count-depth (apply max)))

(defn merge-lines [lines]
  (str/join "\r\n" lines))

(defn in-block? [lines index f]
  (cond (neg? index) false
        (>= index (count lines)) false
        :else (f (count-nested (nth lines index)))))

(defn email-body-nodes [chain]
  (->> chain loom/nodes
       (filter #(contains? % s/email-body))))

(defn find-bottom [chain]
  (->> chain email-body-nodes
       (remove #(loom/out-edge-label chain % s/email-reply))
       first))

(defn find-top [chain]
  (->> chain email-body-nodes
       (remove #(loom/in-edge-label chain % s/email-reply))
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

;; Arbitrary date: 1960-01-02 05:11:48.874
(def ref-date (java.util.Date. -315514073744))

(defn sent-date [line]
  (->> (dt/dates-in-text line ref-date)
       (remove dt/has-ms?)
       (remove #(= "1960" (dt/format-year %)))))

(defn find-header-vals [marks models lines]
  (let [header-lines (->> [0 (:end-header marks) lines]
                          (apply com/slice)
                          (str/join " "))]
    (when (not= " " header-lines)
      (-> (assoc-if-found marks s/email-sent (sent-date header-lines))
          (assoc-if-found :email-from-addr (regex/find-email-addrs header-lines))
          (assoc-if-found :email-from-name (->> header-lines (nlp/run-nlp-default models)
                                                nlp/nlp-names (map first)))))))

(defn find-end-header [marks sep-model lines]
  (->> lines (first-body sep-model)
       (assoc marks :end-header)))

(defn find-end-body [marks sep-model lines]
  (->> lines (drop (:end-header marks))
       (first-header sep-model) (+ (:end-header marks))
       (assoc marks :end-body)))

(defn remove-arrow [line depth]
  (str/replace-first line (str/join (repeat depth ">"))
                     (str/join (repeat (dec depth) ">"))))

(defn has-full-arrows? [line depth]
  (if (< (count line) depth) false
      (->> ">" (repeat depth) (apply str)
           (= (subs line 0 depth)))))

(defn remove-arrows [lines]
  (let [depth (count-max-depth lines)]
    (map #(if (has-full-arrows? % 1)
            (remove-arrow % depth) %)
         lines)))

(defn start-tail [marks lines]
  (assoc marks :start-tail
         (if (= 0 (count-max-depth lines))
           (count lines)
           (-> (fn [x] (in-block? (rseq (vec lines)) x zero?))
               (drop-while (range))
               first (- )
               (+ (count lines))))))

(defn chain-lines [chain]
  (-> chain find-top s/email-body))

(defnp find-marks [models depth chain]
  (let [lines (chain-lines chain)]
    (-> {:depth depth s/email-sent nil :email-from-name nil
         :email-from-addr nil}
        (find-end-header (:sep models) lines)
        (find-end-body (:sep models) lines)
        (start-tail lines)
        (find-header-vals (:nlp models) lines))))

(defn remove-arrows-if [lines]
  (if (<= 1 (count-min-depth lines))
    (remove-arrows lines) lines))

(defn new-top [marks chain]
  (let [new-slice (com/slice (:end-body marks) (:start-tail marks)
                             (chain-lines chain))]
    {s/email-body (remove-arrows-if new-slice)}))

(defn end-bottom [chain]
  {s/email-body (-> chain chain-lines merge-lines)
   s/type-label s/email})

(defn sub-email [marks lines]
  {s/email-sent (-> marks s/email-sent)
   s/type-label s/email
   s/email-body (merge-lines (remove-arrows-if lines))})

(defn make-new-node [marks chain]
  (let [lines (chain-lines chain)]
    (->> (com/slice (:start-tail marks) (count lines) lines)
         (concat (com/slice (:end-header marks) (:end-body marks) lines))
         (sub-email marks))))

(defn dec-depth [chain]
  (->> remove-arrows (update (find-top chain) s/email-body)
       (loom/replace-node chain (find-top chain))))

(defn maybe-add-edges [chain new-node email-from]
  (if email-from
    (loom/add-edges chain [[new-node email-from s/email-from]])
    chain))

(defn maybe-add-top [new-chain old-chain marks new-node]
  (if (> (:depth marks) 0)
    (loom/add-edges new-chain [[(new-top marks old-chain)
                                new-node s/email-reply]])
    new-chain))

(defn split-email [marks chain]
  (let [new-node (make-new-node marks chain)
        email-from (header->person marks)]
    (-> chain
        (loom/replace-node (find-top chain) new-node)
        (maybe-add-edges new-node email-from)
        (maybe-add-top chain marks new-node))))

(defn recursive-split [models depth chain]
  (if (>= depth 0)
    (recur models (dec depth)
           (-> models (find-marks depth chain)
               (split-email chain)))
    chain))

(defn start-email-graph [body]
  (loom/build-graph [{s/email-body body}] []))

(defnp raw-msg-chain [body models]
  (let [lines (str/split-lines body)]
    (recursive-split models (count-max-depth lines)
                     (start-email-graph lines))))

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
       (filter #(second %))
       (loom/add-edges chain)))

(defn replace-subject [subject chain node]
  (loom/replace-node
   chain node
   (assoc node s/email-subject subject)))

(defn infer-subject [chain]
  (reduce (partial replace-subject
                   (-> chain find-top s/email-subject))
          chain (->> chain loom/nodes
                     (filter #(loom/out-edge-label chain % s/email-from)))))

(defn merge-bottom-headers [chain headers]
  (as-> chain $
    (loom/merge-graphs [$ headers])
    (loom/replace-node $ (find-bottom chain)
                       (merge (find-bottom chain)
                              (-> headers loom/top-nodes first)))
    (loom/replace-node $ (-> headers loom/top-nodes first)
                       (find-bottom $))))

(defnp message-fetch [folder message]
  (vector (get-text-recursive message)
          (headers-fetch message folder)))

(defnp full-parse [message models]
  (try (-> message first
           regex/strip-javascript
           (raw-msg-chain models)
           (merge-bottom-headers (headers-parse (second message)))
           infer-email-chain infer-subject)
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

(defn use-nlp [models message chain]
  (if (com/nil-or-empty? (s/email-body message)) chain
      (as-> (->> (s/email-body message)
                 (nlp/run-nlp-full models (author-name chain message))
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

(defn use-nlp-graph [models g]
  (reduce (partial use-nlp models)
          (recon/filter-memory g s/email) g))

(defn graph-from-id [models id]
  (let [vals (->> [[s/email-body] [s/email-from s/s-name]]
                  (mlrecon/fetch-paths id) (map first))
        message {s/type-label s/email :id id s/email-body (first vals)}]
    (->> [message {s/s-name (second vals)} s/email-from]
         vector (loom/build-graph [])
         (use-nlp models message))))

(defn delete-email-body! [id]
  (->> ["MATCH (root)-[:" (neo4j/esc-token s/email-body)
        "]->(b) WHERE ID(root) = " id
        " DETACH DELETE b"]
       (apply str) vector
       neo4j/cypher-combined-tx))

(defn run-email-nlp! [models email]
  (let [graph (->> email :id (graph-from-id models))]
    (-> email :id delete-email-body!)
    (-> (loom/remove-nodes
         graph (->> (loom/select-edges graph s/email-from)
                    (map second)))
        (insert/push-graph! (s/user email)))))

(defn push-email-nlp! []
  (let [emails (queries/email-for-nlp batch-size)]
    (when (not (empty? emails))
      (println "run email nlp")
      (dorun (pmap #(-> % :id (neo4j/remove-label! s/nonlp)) emails))
      (dorun (pmap @nlp-channel emails)))))

(defn nlp-models-fn []
  {:ner ((nlp/get-ner-fn))
   :mention ((nlp/get-mention-fn))
   :token ((nlp/get-tokenize-fn))})

(defn make-nlp-pool! []
  (->> {:name "email-nlp" :process run-email-nlp!
        :param-gen nlp-models-fn
        :callback identity :num-threads nlp-threads}
       async/create-pool!
       (reset! nlp-channel)))

(defn parse-and-insert! [models message-and-user]
  (-> message-and-user :message
      (full-parse models) 
      (insert/push-graph! (:user message-and-user))))

(defn parse-models-fn []
  {:sep ((weka/email-sep-model-fn))
   :nlp {:ner ((nlp/get-ner-fn))
         :mention ((nlp/get-mention-fn))}})

(defn make-parse-pool! []
  (->> {:name "email-parse" :process parse-and-insert!
        :param-gen parse-models-fn
        :callback identity :num-threads parse-threads}
       async/create-pool!
       (reset! parse-channel)))

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

(defn date-graphs [user start limit]
  (->> (queries/emails-with-dates user start limit)
       (map #(get-in % [:data :body]))
       (map regex/strip-tags)
       (map nlp/run-nlp-openie)))
