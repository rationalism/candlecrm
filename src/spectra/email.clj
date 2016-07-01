(ns spectra.email
  (:require [clojure.string :as str]
            [clojure.set :as cset]
            [clojure.java.io :as io]
            [crypto.random :as rnd]
            [spectra.async :as async]
            [spectra.auth :as auth]
            [spectra.common :refer :all]
            [spectra.datetime :as dt]
            [spectra.insert :as insert]
            [spectra.loom :as loom]
            [spectra.mlrecon :as mlrecon]
            [spectra.neo4j :as neo4j]
            [spectra.corenlp :as nlp]
            [spectra.queries :as queries]
            [spectra.regex :as regex]
            [spectra.weka :as weka]
            [spectra_cljc.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(def nlp-threads 6)
(def batch-size 12)

(defonce nlp-channel (atom nil))

(defn author-name [chain message]
  (-> (loom/out-edge-label chain message s/email-from)
      second (.get (name s/s-name))))

(defn nlp-models-fn []
  {:ner ((nlp/get-ner-fn))
   :mention ((nlp/get-mention-fn))
   :token ((nlp/get-tokenize-fn))
   :parse ((nlp/get-parse-fn))
   :entity (nlp/entity-extractor)
   :relation ((nlp/get-rel-fn))
   :coref ((nlp/get-coref-fn))})

(defn fetch-body [id]
  (->> [[s/email-from s/s-name] [s/email-body]]
       (mlrecon/fetch-paths id) (map first)))

(defn email-sentences [n]
  (let [models (nlp-models-fn)]
    (->> (queries/email-for-nlp n)
         (map :id) (map fetch-body) (map vec) distinct
         (pmap #(nlp/sentence-parse models %))
         (apply concat) shuffle vec)))

(defn date-sentence? [sentence]
  (->> sentence nlp/all-ner-graph loom/nodes
       (mapv s/hash-code) (some #{s/date-time})))

(defn addr-sentence? [sentence]
  (-> sentence (str " ") regex/might-have-addr?))

(defn ner-sentences [sentences]
  (->> (filter date-sentence? sentences)
       (concat (filter addr-sentence? sentences))
       distinct shuffle))

(defn get-tokens [s]
  (->> s nlp/get-tokens (map nlp/get-text)))

(defn add-ids [coll]
  (-> coll count range (zipvec coll)))

(defn mention-display [sentence]
  (->> sentence (.toString) (str "Sentence: ") println)
  (->> sentence nlp/relation-mentions
       (map (juxt #(.getValue %) #(.getType %)))
       (map #(str (first %) " (" (second %) ")"))
       add-ids (map #(str (first %) ": " (second %)))
       (str/join "\n") println))

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
      (when-let [resp (->> sentences first nlp/get-tokens
                           (map nlp/get-text) display-tokens)]
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

(defn map-rel [mention-map rel]
  (->> rel drop-last (mapv mention-map)
       (apply nlp/blank-relation)
       (vector (last rel)) reverse))

;; This weird map is needed to avoid crazy serialization bug
(defn insert-rels [[sentence rels]]
  (let [mention-map (->> sentence nlp/relation-mentions
                         add-ids (into {}) (repeat (count rels)))]
    (->> (map map-rel mention-map rels)
         (map nlp/set-rel-type)
         (nlp/set-rels sentence))))

(defn gather-rels [sentences]
  (if (or (nil? sentences) (empty? sentences)) nil
      (when-let [resp (-> sentences first display-sentence)]
        (->> resp insert-rels
             (swap! nlp/rel-sentences conj))
        (recur (rest sentences)))))

(defn tabline [[word tag]]
  (str word "\t" tag))

(defn spit-append [filename text]
  (spit filename (str "\n\n" text) :append true))

(defn write-traindata [filename]
  (->> @known-tokens (map #(map tabline 
                                %))
       (map #(str/join "\n" %))
       (str/join "\n\n") (spit-append filename))
  (def known-tokens (atom [])))

(defn append-hyperlink [[graph message] link-node]
  [(loom/add-edge graph [message link-node s/email-mentions])
   message])

(defn append-hyperlinks [graph message]
  (->> graph loom/nodes
       (filter #(= s/hyperlink (s/type-label %)))
       (reduce append-hyperlink [graph message])
       first))

(defn link-message [graph message linked-text]
  (->> linked-text (assoc message s/email-body)
       (loom/replace-node graph message)))

(defn remove-metadata [graph node]
  (->> (dissoc node s/link-text s/hash-code)
       (loom/replace-node graph node)))

(defn remove-all-metadata [graph]
  (->> graph loom/nodes (filter #(contains? % s/hash-code))
       (reduce remove-metadata graph)))

(defn make-nlp-chain [models message chain]
  (when (-> message s/email-body nil-or-empty? not)
    (let [[graph linked-text]
          (->> message s/email-body
               (nlp/run-nlp-full models (author-name chain message)))]
      (when (-> graph loom/nodes empty? not)
        (-> (append-hyperlinks graph message)
            (link-message message linked-text)
            remove-all-metadata)))))

(defn graph-from-id [models id]
  (let [[name body] (fetch-body id)
        message {s/type-label s/email :id id s/email-body body}]
    (->> [message {s/s-name name} s/email-from]
         vector (loom/build-graph [])
         (make-nlp-chain models message))))

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
     graph (s/user email) s/nlp-src
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
