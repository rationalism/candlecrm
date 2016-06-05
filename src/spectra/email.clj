(ns spectra.email
  (:require [clojure.string :as str]
            [crypto.random :as rnd]
            [spectra.async :as async]
            [spectra.auth :as auth]
            [spectra.common :refer :all]
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
(def parse-threads 1)
(def nlp-threads 1)
(def batch-size 50)

(defonce parse-channel (atom nil))
(defonce nlp-channel (atom nil))

(def email-name-blacklist ["linkedin.com"])
(def email-domains [".com" ".edu" ".org" ".net"])

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

(defn import-label [chain edge]
  (if (-> edge first map? not)
    (loom/replace-node chain (first edge) (nlp/label-edge edge))
    chain))

(defn maybe-add [m k v]
  (if v (assoc m k v) m))

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

(defn decode-header [header]
  {(.getName header) (.getValue header)})

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

(defn headers [message]
  (->> (.getAllHeaders message) enumeration-seq
       (map decode-header) (apply merge)))

(defn strip-arrows [line num]
  (str/replace-first line (str/join (repeat num ">")) ""))

(defn count-nested [text]
  (count (first (re-seq #"^>+" text))))

(defn count-arrows [lines]
  (->> (map #(re-seq #"^>+" %) lines)
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

(defn header->person [{:keys [email-from-name email-from-addr]}]
  (when (or email-from-name email-from-addr)
    (-> (assoc {} s/type-label s/person)
        (maybe-add s/s-name email-from-name)
        (maybe-add s/email-addr email-from-addr))))

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

(defn join-lines [lines]
  (reduce #(str/replace %1 %2 (str %2 " "))
          (str/join "" lines)
          email-domains))

(defn name-locations [header name]
  (loop [locations nil remainder header]
    (if-let [loc (str/index-of remainder name)]
      (recur (if locations
               (conj locations (+ loc (last locations) (count name)))
               [loc])
             (subs remainder (+ loc (count name))))
      (->> name (repeat (count locations))
           (zipvec locations)))))

(defn loc-distance [header email]
  (let [pos (str/last-index-of header email)]
    (fn [pair]
      (update (vec pair) 0
              #(-> % (- pos) Math/abs)))))

(defn pick-name [header models email]
  (when email
    (->> header (nlp/run-nlp-default models)
         nlp/nlp-names (map first)
         (mapcat #(name-locations header %))
         (map (loc-distance header email))
         (sort-by first) first second)))

(defn header-parse [header models]
  (let [date (-> header sent-date last)
        email (-> header regex/find-email-addrs last)
        name (pick-name header models email)]
    (merge (if date {s/email-sent date} {})
           (if email {:email-from-addr email} {})
           (if name {:email-from-name name} {}))))

(defn find-header-vals [marks models lines]
  (let [header-lines (->> [0 (:end-header marks) lines]
                          (apply slice) join-lines)]
    (if (empty? header-lines) marks
        (merge marks (header-parse header-lines models)))))

(defn find-end-header [marks sep-model lines]
  (->> lines (first-body sep-model)
       (assoc marks :end-header)))

(defn find-end-body [{:keys [end-header] :as marks}
                     sep-model lines]
  (->> (drop end-header lines)
       (first-header sep-model) (+ end-header)
       (assoc marks :end-body)))

(defn remove-arrows [num lines]
  (map #(str/replace-first
         % (apply str (repeat num ">")) "")
       lines))

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

(defnp find-marks [{:keys [sep nlp]} depth chain]
  (let [lines (chain-lines chain)]
    (-> {:depth depth s/email-sent nil :email-from-name nil
         :email-from-addr nil}
        (find-end-header sep lines)
        (find-end-body sep lines)
        (start-tail lines)
        (find-header-vals nlp lines))))

(defn remove-arrows-if [lines]
  (remove-arrows (count-min-depth lines) lines))

(defn new-top [{:keys [end-body start-tail]} chain]
  (let [new-slice (slice end-body start-tail (chain-lines chain))]
    {s/email-body (remove-arrows-if new-slice)}))

(defn end-bottom [chain]
  {s/email-body (-> chain chain-lines merge-lines)
   s/type-label s/email})

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
    (recur models
           (-> chain chain-lines count-max-depth
               (min (dec depth)))
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

(defnp message-fetch [folder message]
  (let [message-text (get-text-recursive message)]
    (vector (if (or (nil? message-text) (empty? message-text))
              "(No body)" message-text)
            (headers-fetch message folder))))

(defnc full-parse [message models]
  (-> message first regex/strip-javascript
      (raw-msg-chain models)
      (merge-bottom-headers (headers-parse (second message)))
      infer-email-chain infer-subject))

(defn hash-brackets [m text]
  (str "<node " (get m text) ">" text "</node>"))

(defn hyperlink-text [text mentions]
  (if (nil-or-empty? mentions) text
      (str/replace text (-> mentions keys regex/regex-or)
                   (partial hash-brackets mentions))))

(defn mention-nodes [chain]
  (filter #(loom/out-edge-label chain % s/has-type)
          (loom/nodes chain)))

(defn hyperlink-nodes [chain]
  (filter #(loom/out-edge-label chain % s/link-to)
          (loom/nodes chain)))

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
      second (.get (name s/s-name))))

(defn append-hyperlinks [chain]
  (->> chain mention-nodes
       (map #(vector {s/link-id (rnd/base64 6)
                      s/type-label s/hyperlink}
                     % s/link-to))
       (loom/add-edges chain)))

(defn link-pair [[e1 e2]]
  (hash-map e2 (s/link-id e1)))

(defn link-map [chain]
  (->> (loom/select-edges chain s/link-to)
       (map link-pair) (apply merge)))

(defn make-nlp-chain [models message chain]
  (when (-> message s/email-body nil-or-empty? not)
    (let [nlp-result
          (->> message s/email-body
               (nlp/run-nlp-full models (author-name chain message)))]
      (when (-> nlp-result loom/nodes empty? not)
        (->> nlp-result append-hyperlinks
             (conj [chain]) loom/merge-graphs)))))

(defn print-graph-nodes [g]
  (println "Printing graph nodes")
  (clojure.pprint/pprint (loom/nodes g))
  g)

(defn use-nlp [models message chain]
  (when-let [nlp-chain (make-nlp-chain models message chain)]
    (as-> nlp-chain $
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
      (loom/remove-nodes
       $ (->> s/has-type (loom/select-edges $) (map second))))))

(defn graph-from-id [models id]
  (let [vals (->> [[s/email-body] [s/email-from s/s-name]]
                  (mlrecon/fetch-paths id) (map first))
        message {s/type-label s/email :id id s/email-body (first vals)}]
    (->> [message {s/s-name (second vals)} s/email-from]
         vector (loom/build-graph [])
         (use-nlp models message))))

(defn body-query []
  (str "MATCH (root)-[r:" (neo4j/esc-token s/email-body)
       "]->(b) WHERE ID(root) = {id}"))

(defn delete-email-body [id]
  [[(str (body-query) " WITH b MATCH (b)<--(x)"
         " WITH b, count(x) as n WHERE n = {limit} DETACH DELETE b")
    {:id id :limit 1}]
   [(str (body-query) " DELETE r")
    {:id id}]])

(defn remove-nonlp [id]
  [(str "MATCH (root) WHERE ID(root) = {id}"
        " REMOVE root:" (neo4j/esc-token s/nonlp))
   {:id id}])

(defn run-email-nlp! [models {:keys [id] :as email}]
  (if-let [graph (graph-from-id models id)]
    (insert/push-graph!
     (loom/remove-nodes
      graph (->> (loom/select-edges graph s/email-from)
                 (map second)))
     (s/user email) s/nlp-src
     (conj (delete-email-body id) (remove-nonlp id)))
    (-> id remove-nonlp neo4j/cypher-query)))

(defn push-email-nlp! []
  (let [emails (queries/email-for-nlp batch-size)]
    (when (not (empty? emails))
      (println "run email nlp")
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

(defn parse! [models {:keys [message user]}]
  [(full-parse message models) user s/email-src])

(defn parse-models-fn []
  {:sep ((weka/email-sep-model-fn))
   :nlp {:ner ((nlp/get-ner-fn))
         :mention ((nlp/get-mention-fn))}})

(defn make-parse-pool! []
  (->> {:name "email-parse" :process parse!
        :param-gen parse-models-fn
        :callback #(apply insert/push-graph! %)
        :num-threads parse-threads}
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
       (map #(.get % "body"))
       (map regex/strip-tags)
       (map nlp/run-nlp-openie)))
