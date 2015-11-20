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
            [spectra.queries :as queries]
            [spectra.recon :as recon]
            [spectra.regex :as regex]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [javax.mail Folder Message Message$RecipientType]))

(def inbox-folder-name "[Gmail]/All Mail")
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
  (let [subject (.getSubject message)]
    (if (com/nil-or-empty? subject)
      "(no subject)" subject)))

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

(defn decode-addresses [addresses]
  (map #(nlp/normalize-person (.getPersonal %)
                              (.getAddress %)
                              s/person)
       addresses))

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

(defn decode-sender [message]
  {s/email-from (.getFrom message)})

(defn decode-replyto [message]
  {s/email-replyto (.getReplyTo message)})

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
       (remove #(nil? %))))
  
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
       (remove #(loom/out-edge-label chain % s/email-reply))
       first))

(defn header->person [header]
  (when (or (:email-from-name header)
            (:email-from-addr header))
    (nlp/normalize-person
     (:email-from-name header)
     (:email-from-addr header)
     s/person)))

(defn assoc-if-found [marks map-key coll]
  (if (or (nil? coll) (empty? coll)) marks
      (assoc marks map-key (first coll))))

(defn header-ready? [marks]  
  (or (< (:start-header marks) 0)
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
  (if (= 0 (:start-header marks)) false
      (= (dec (:depth marks))
         (-> chain chain-lines (nth (dec (:start-header marks)))
             vector count-depth))))

(defn remove-arrow [line depth]
  (str/replace-first line (apply str (repeat depth ">"))
                     (apply str (repeat (dec depth) ">"))))

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
  (->> (update (find-bottom chain) s/email-body remove-arrows)
       (loom/replace-node chain (find-bottom chain))))
      
(defn split-email [marks chain]
  (if (depth-match? marks chain)
    (let [new-node (make-new-node marks chain)
          email-from (header->person marks)]
      (cond-> chain
        true (loom/replace-node (find-bottom chain) new-node)
        email-from (loom/add-edges [[new-node email-from s/email-from]])
        true (loom/add-edges [[new-node (new-bottom marks chain) s/email-reply]])))
    (dec-depth chain)))
  
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
            (remove #(= "" %))
            (cons "") last)
       :else "")))

(defn make-headers [pair root]
  (map #(vector root % (-> pair key)) (val pair)))

(defn headers-fetch [message]
  (vector {s/email-received (received-time message)
           s/email-sent (sent-time message)
           s/email-subject (subject message)}
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
    (->> (s/email-subject message) com/end-hash
         (assoc message :label s/email-headers s/email-sub-hash)
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

(defn message-fetch [message]
  (vector (get-text-recursive message)
          (headers-fetch message)))

(defn full-parse [message]
  (p :full-parse
     (try (-> message first
              regex/strip-javascript
              raw-msg-chain
              (merge-bottom-headers (headers-parse (second message)))
              message-inference)
          (catch Exception e
            (do (prn "Email parse error")
                (prn e) {})))))

(defn hash-brackets [text]
  (str "<node " (com/sha1 text) ">" text "</node>"))

(defn hyperlink-text [text mentions]
  (if (com/nil-or-empty? mentions) text
      (str/replace text (regex/regex-or mentions) #(hash-brackets %1))))

(defn mention-nodes [chain]
  (->> (loom/nodes chain)
       (filter #(loom/out-edge-label chain % s/has-type))))

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

(defn parse-person [chain node]
  (if (or (s/email-addr node) (s/s-name node))
    (->> (s/email-addr node)
         (recon/name-email-map (s/s-name node))
         (map #(nlp/normalize-person (key %) (val %) (:label node)))
         recon/merge-nodes
         (loom/replace-node chain node))
    chain))

(defn author-name [chain message]
  (-> (loom/out-edge-label chain message s/email-from)
      second (get-in [:data s/s-name])))

(defn use-nlp [chain message]
  (if (com/nil-or-empty? (s/email-body message)) chain
      (as-> (->> (s/email-body message)
                 (nlp/run-nlp-full (author-name chain message))
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
        (reduce parse-person $
                (->> (loom/nodes $)
                     (filter #(some #{(:label %)} [s/person s/organization]))))
        (reduce recon/remove-dupes $ [s/email-addr s/phone-num s/s-name])
        (loom/remove-nodes $ (->> s/has-type (loom/select-edges $) (map second))))))
  
(def url-map {s/person "person" s/email "email"
              s/organization "organization" s/location "location"
              s/money "finance" s/event "event"
              s/webpage "webpage"})

(defn add-hyperlink [g edge]
  (loom/replace-node
   g (first edge)
   (assoc (first edge) :hyperlink
          (str "{:type "(-> edge first :label url-map)
               " :id " (-> edge second :id)
               "}"))))

(defn make-hyperlinks [g]
  (reduce add-hyperlink g (loom/select-edges g :database-match)))

(defn switch-hyperlinks [text link-map]
  (if (com/nil-or-empty? link-map) text
      (str/replace text (-> link-map keys regex/regex-or) #(link-map %1))))

(defn switch-message [g message]
  (if (com/nil-or-empty? (s/email-body message)) g
      (->> (loom/labeled-edges g message s/email-mentions)
           (map second)
           (map #(hash-map (:hash %) (:hyperlink %)))
           (apply merge)
           (switch-hyperlinks (:body message))
           (assoc message :body)
           (loom/replace-node g message))))

(defn nodes-of-edges [edges]
  (-> (map second edges)
      (conj (first (first edges)))))

(defn insert-links! [g]
  (p :insert-links
     (as-> g $
       (reduce #(loom/replace-node %1 %2 (:id %2)) $ (loom/nodes $))
       (loom/remove-edges $ (neo4j/find-links (loom/multi-edges $)))
       (loom/spider-edges $ '())
       (map #(neo4j/make-links-query (nodes-of-edges %) %) $)
       (neo4j/cypher-combined-tx $))))

(defn link-people [g user]
  (->> [s/person s/organization]
       (recon/merged-props g)
       (recon/labeled-people-orgs user)
       (recon/link-people g)))

(defn merge-old-people! [g user]
  (p :merge-old-people
     (-> (link-people g user) recon/merge-graph!
         (recon/load-new! s/person [s/person (neo4j/user-label user)])
         (recon/load-new! s/organization [s/organization (neo4j/user-label user)]))))

(defn use-nlp-graph [g]
  (->> (recon/filter-memory g s/email)
       (reduce use-nlp g)))

(defn switch-message-graph [g]
  (->> (recon/filter-memory g s/email)
       (reduce switch-message g)))

(defn link-new-all [g user]
  (reduce #(recon/link-new! %1 %2 [%2 (neo4j/user-label user)])
          g [s/person s/organization s/location
             s/event s/money s/webpage]))

(defn link-by-prop [g user]
  (reduce #(recon/link-one-prop %1 (key %2) (val %2) user)
          g s/recon-attrs))

(defn merge-and-recon [block-size attrs graphs]
  (->> (partition-all 10 graphs)
       (map loom/merge-graphs)
       (map #(reduce recon/remove-dupes % attrs))))

;; Assumes emails are already parsed
(defn insert-emails! [user emails]
  (p :insert-emails
     (try
       (dorun
        (-> (merge-old-people! emails user)
            (recon/find-old-messages s/email)
            use-nlp-graph
            (link-people user)
            (link-by-prop user)
            (link-new-all user)
            make-hyperlinks switch-message-graph
            (recon/delete-headers! user)
            (recon/link-new! s/email [s/email (neo4j/user-label user)])
            recon/merge-graph! insert-links!))
       (catch Exception e
         (do (prn "Email insertion error")
             (prn e) nil)))))
  
(defn insert-email-range! [user lower upper]
  (doall
   (->> (messages-in-range (fetch-imap-folder user) lower upper)
        (pmap message-fetch)
        (map full-parse)
        (map #(insert-emails! user %))))
  :success)

(defn insert-one-email! [user email-num]
  (insert-email-range! user email-num email-num))
4
(defn insert-first-n! [user n]
  (let [limit (message-count (fetch-imap-folder user))]
    (insert-email-range! user (- limit n) limit)))

;; Assumes emails are already parsed
(defn insert-headers! [user headers]
  (p :insert-headers
     (try
       (dorun
        (-> (merge-old-people! headers user)
            (recon/find-old-messages s/email-headers)
            (recon/load-new! s/email-headers [s/email-headers (neo4j/user-label user)])
            insert-links!))
       (catch Exception e
         (do (prn "Email insertion error")
             (prn e) nil)))))

(defn insert-headers-range! [user lower upper]
  (doall
   (->> (messages-in-range (fetch-imap-folder user) lower upper)
        (pmap headers-fetch)
        (map headers-parse)
        (map label-headers)
        (map #(insert-headers! user %))))
  :success)

(defn date-graphs [user start limit]
  (->> (queries/emails-with-dates user start limit)
       (map #(get-in % [:data :body]))
       (map regex/strip-tags)
       (map nlp/run-nlp-openie)))
