(ns spectra.email
  (:require [clojure.string :as str]
            [clojure.set :as cset]
            [crypto.random :as rnd]
            [spectra.async :as async]
            [spectra.common :refer :all]
            [spectra.datetime :as dt]
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
             :refer (pspy pspy* profile defnp p p*)]))

(def nlp-threads 1)
(def batch-size 50)

(defonce nlp-channel (atom nil))

(defn import-label [chain edge]
  (if (-> edge first map? not)
    (loom/replace-node chain (first edge) (nlp/label-edge edge))
    chain))

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

(defn nlp-models-fn []
  {:ner ((nlp/get-ner-fn))
   :mention ((nlp/get-mention-fn))
   :token ((nlp/get-tokenize-fn))
   :parse ((nlp/get-parse-fn))
   :entity (nlp/entity-extractor)})

(defn fetch-body [id]
  (->> [[s/email-body] [s/email-from s/s-name]]
       (mlrecon/fetch-paths id) (map first)))

(defn email-sentences [n]
  (let [models (nlp-models-fn)]
    (->> (queries/email-for-nlp n)
         (map :id) (map fetch-body) (map vec) distinct
         (pmap (comp nlp/get-sentences
                     #(nlp/run-annotate (:entity models) %)
                     #(nlp/run-annotate (:mention models) %)
                     nlp/library-annotate-all
                     #(nlp/run-nlp (:ner models) %)
                     #(apply (partial nlp/fpp-replace models) %)
                     #(update % 0 nlp/strip-parens)))
         (apply concat) shuffle vec)))

(defn get-tokens [s]
  (->> s nlp/get-tokens (map nlp/get-text)))

(defn split-no-tag [tokens]
  (if (-> tokens first nlp/get-tag (= "O"))
    (partition 1 tokens) (list tokens)))

(defn group-tag [tokens]
  (->> tokens first nlp/get-tag))

(defn group-pos [tokens]
  (->> tokens (map nlp/get-pos) (str/join "/")))

(defn group-text [tokens]
  (->> tokens (map #(.originalText %)) (str/join "/")))

(defn roth-sentence [[id sentence]]
  (let [token-groups (->> sentence nlp/get-tokens (partition-by nlp/get-tag)
                          (mapcat split-no-tag))]
    (->> (map (juxt (constantly id) group-tag group-pos group-text)
              token-groups)
         (zipmap (-> token-groups count range)))))

(def roth-tag-map {"DATE" "DATETIME" "ZIPCODE" "LOCATION"})

(defn roth-swap [tag]
  (if-let [new-tag (roth-tag-map tag)]
    new-tag tag))

(defn roth-print [[k v]]
  (->> [(first v) (roth-swap (second v)) k "O" (third v)
        (if (= (second v) "URL") "URLURLURL" (fourth v))
        "O" "O" "O"]
       (str/join "\t")))

(defn roth-display [sentence]
  (let [rep-slash #(str/replace % #"/" " ")]
    (->> sentence sort (map second) (map fourth) (map rep-slash)
         (str/join " ") (str "Sentence: ") println)
    (->> sentence sort (remove #(-> % second second (= "O")))
         (map #(str (first %) ": " (rep-slash (fourth (second %)))
                    " (" (second (second %)) ")"))
         (str/join "\n") println)))

(defn add-ids [coll]
  (-> coll count range (zipvec coll)))

(defn mention-display [sentence]
  (->> sentence (.toString) (str "Sentence: ") println)
  (->> sentence nlp/relation-mentions
       (map (juxt #(.getValue %) #(.getType %)))
       (map #(str (first %) " (" (second %) ")"))
       add-ids (map #(str (first %) ": " (second %)))
       (str/join "\n") println))

(defn cartesian-product
  ([coll] (cartesian-product coll []))
  ([coll sets]
   (if (empty? coll) (set sets)
       (->> coll rest (map #(hash-set (first coll) %))
            (concat sets) (recur (rest coll))))))

(defn event-sentences [sentences]
  (let [rel-set (->> s/relation-types keys (map set) set)
        rel-map (->> s/relation-types keys (apply concat) distinct
                     (mapv #(vector % %)) (into {}))
        models (nlp-models-fn)]
    (->> sentences nlp/number-items
         (map (juxt nlp/sentence-graph identity))
         (remove #(some #{s/email-addr}
                        (loom/nodes (first %))))
         (remove #(->> % first loom/nodes (map rel-map)
                       (remove nil?) distinct cartesian-product
                       (cset/intersection rel-set) empty?))
         (map second) (mapv second) distinct
         (map vector) (map nlp/make-doc)
         (pmap #(nlp/run-annotate (:parse models) %))
         (map nlp/get-sentences) (mapv first))))

(defn addr-sentences [sentences]
  (->> sentences (map get-tokens) distinct
       (filter #(->> % (str/join " ") regex/might-have-addr?))))

(defn number-tokens [tokens]
  (->> tokens count range (zipvec tokens)
       (map #(str "(" (second %) ")" (first %)))
       (str/join " ")))

(def abbr-map {"a" "ADDRESS" "e" "EVENT" "n" :next "q" :quit})

(def rel-map {"sta" "EventStart" "sto" "EventStop" "d" "EventDuration"
              "at" "EventAttend" "f" "EventFeatures" "o" "EventOrg"
              "l" "EventLocation" "ad" "EventAddr" "ty" "EventType"
              "i" "EventInterval" "c" "EventCost" "w" "EventWebsite"
              "ti" "EventTime" "li" "Live_In" "lo" "Located_In"
              "ob" "OrgBased_In" "wf" "Work_For" "pa" "PersonAddr"
              "oa" "OrgAddr" "ph" "PersonPhone" "op" "OrgPhone"
              "pw" "PersonWebsite" "ow" "OrgWebsite" "q" :quit "n" :next})

(defn translate-codes [s]
  (if (empty? s) nil
      (if (Character/isDigit (first s))
        (let [[s1 s2] (str/split s #" ")
              s3 (->> (str/split s1 #"-") reverse
                      (map #(Integer/parseInt %)))]
          (if (= 1 (count s3))
            {(first s3) (abbr-map s2)}
            (zipmap (range (second s3) (inc (first s3)))
                    (repeat (inc (apply - s3)) (abbr-map s2)))))
        (abbr-map s))))

(defn translate-rels [s]
  (let [codes (str/split s #" ")]
    (if (= 3 (count codes))
      (let [[c1 c2 c3] codes rel (rel-map c3)]
        (when rel
          [(Integer/parseInt c1) (Integer/parseInt c2) rel]))
      (when (= 1 (count codes))
        (-> codes first rel-map)))))

(def known-tokens (atom []))
(def rel-sentences (atom []))

(defn display-tokens
  ([tokens]
   (println "Next sentence:")
   (->> tokens number-tokens println)
   (display-tokens tokens {}))
  ([tokens tag-map]
   (println "Enter codes:")
   (let [resp (translate-codes (read-line))]
     (condp = resp
       nil (do (println "Error: Try again")
               (recur tokens tag-map))
       :next (map #(vector
                    %1 (if (contains? tag-map %2)
                         (tag-map %2) "O"))
                  tokens (range (count tokens)))
       :quit nil
       (recur tokens (merge tag-map resp))))))

(defn gather-traindata [sentences]
  (if (or (nil? sentences) (empty? sentences)) nil
      (when-let [resp (-> sentences first display-tokens)]
        (swap! known-tokens conj resp)
        (recur (rest sentences)))))

(defn display-sentence
  ([sentence]
   (mention-display sentence)
   (display-sentence sentence []))
  ([sentence rels]
   (println "Enter codes:")
   (let [resp (translate-rels (read-line))]
     (condp = resp
       nil (do (println "Error: Try again")
               (recur sentence rels))
       :next (vector sentence rels)
       :quit nil
       (recur sentence (conj rels resp))))))

(defn insert-rels [[sentence rels]]
  (let [mention-map (->> sentence nlp/relation-mentions
                         add-ids (into {}))]
    (->> rels (map #(update % 0 mention-map))
         (map #(update % 1 mention-map))
         (map #(vector (drop-last %) (last %)))
         (map #(update % 0 nlp/blank-relation))
         (map nlp/set-rel-type)
         (nlp/set-rels sentence))))

(defn gather-rels [sentences]
  (if (or (nil? sentences) (empty? sentences)) nil
      (when-let [resp (-> sentences first display-sentence)]
        (->> resp insert-rels
             (swap! rel-sentences conj))
        (recur (rest sentences)))))

(defn serialize-rel-models [dir models]
  (mapv #(.save (val %) (->> % key (map name) (interpose "_")
                             (apply str) (str dir "/")))
        models))

(defn tabline [[word tag]]
  (str word "\t" tag))

(defn spit-append [filename text]
  (spit filename (str "\n\n" text) :append true))

(defn write-traindata [filename]
  (->> @known-tokens (map #(map tabline %))
       (map #(str/join "\n" %))
       (str/join "\n\n") (spit-append filename))
  (def known-tokens (atom [])))

(defn add-line [s]
  (if (nil-or-empty? s) s (str s "\n")))

(defn write-roth [[k v]]
  (str (->> k sort (map roth-print) (str/join "\n")) "\n\n"
       (->> v (map #(str/join " " %))
            (str/join "\n") add-line)
       "\n"))

(defn save-rels [filename]
  (weka/serialize @rel-sentences filename))

(defn load-rels [filename]
  (->> filename weka/deserialize
       (reset! rel-sentences)))

(defn write-rels [filename]
  (->> @rel-sentences (map write-roth) 
       str/join (spit-append filename))
  (def rel-sentences (atom {})))

(defn insert-blank-rels [roth-group]
  (->> roth-group (partition-by first)
       (interpose [])))

(defn token-map [tokens]
  (let [letters (-> tokens first second)]
    (if (-> tokens ffirst (str/split #"/") count (= 1))
      [[letters (second tokens)]]
      (->> (str/split letters #"/")
           (map #(vector % (second tokens)))
           vec))))

(defn mention-token-map [sentence]
  (->> sentence (map third) map-int
       (zipvec (map #(vector (nth % 4) (nth % 5)) sentence))
       (mapcat token-map)))

(defn load-roth [filename]
  (->> (str/split (slurp filename) #"\n")
       (map #(str/split % #"\t")) (partition-by count)
       (remove #(-> % first count (<= 1)))
       (apply concat) (partition-by count)
       (mapcat #(if (-> % first count (= 9))
                  (insert-blank-rels %) (vector %)))
       (partition 2) (map vec)
       (map #(update % 0 mention-token-map))))

(defn known-rel-map [rels]
  (->> rels (map (juxt drop-last last))
       (map #(update % 0 map-int))
       (mapv vec) (into {})))

(defn make-nlp-chain [models message chain]
  (when (-> message s/email-body nil-or-empty? not)
    (let [nlp-result
          (->> message s/email-body
               (nlp/run-nlp-full models (author-name chain message)))]
      (when (-> nlp-result loom/nodes empty? not)
        (->> nlp-result append-hyperlinks
             (conj [chain]) loom/merge-graphs)))))

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
  (let [vals (fetch-body id)
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
      (throw-info! "run email nlp")
      (dorun (pmap @nlp-channel emails)))))

(defn make-nlp-pool! []
  (->> {:name "email-nlp" :process run-email-nlp!
        :param-gen nlp-models-fn
        :callback identity :num-threads nlp-threads}
       async/create-pool!
       (reset! nlp-channel)))
