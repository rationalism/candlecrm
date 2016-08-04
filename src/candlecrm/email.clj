(ns candlecrm.email
  (:require [clojure.string :as str]
            [clojure.set :as cset]
            [clojure.java.io :as io]
            [crypto.random :as rnd]
            [candlecrm.async :as async]
            [candlecrm.auth :as auth]
            [candlecrm.common :refer :all]
            [candlecrm.datetime :as dt]
            [candlecrm.insert :as insert]
            [candlecrm.loom :as loom]
            [candlecrm.mlrecon :as mlrecon]
            [candlecrm.neo4j :as neo4j]
            [candlecrm.corenlp :as nlp]
            [candlecrm.queries :as queries]
            [candlecrm.regex :as regex]
            [candlecrm.reply :as reply]
            [candlecrm.weka :as weka]
            [candlecrm_cljc.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(def nlp-threads 6)
(def batch-size 12)

(defonce nlp-channel (atom nil))

(defn str-check [author]
  (if (string? author) author "Nobody"))

;; Otherwise, sentence splitter might think an
;; author's name was a break in the sentence
(defn strip-periods [author]
  (str/replace author #"\." " "))

(defn author-name [chain message]
  (-> (loom/out-edge-label chain message s/email-from)
      second s/s-name str-check strip-periods))

(defnp nlp-models-fn []
  {:ner ((nlp/get-ner-fn))
   :mention ((nlp/get-mention-fn))
   :token ((nlp/get-tokenize-fn))
   :parse ((nlp/get-parse-fn))
   :entity (nlp/entity-extractor)
   :relation ((nlp/get-rel-fn))
   :coref ((nlp/get-coref-fn))
   :sep ((weka/email-sep-model-fn))})

(defn find-name [[names addrs]]
  (->> (if (->> names vals first empty?) addrs names)
       vals first (sort-by second >) ffirst vector))

(defn find-email [data]
  (->> data (map vals) (map first)
       (map keys) (mapv first)))

(defnp fetch-body [id]
  (->> [[s/email-from s/s-name] [s/email-from s/email-addr]
        [s/email-body] [s/email-sent] [s/email-digest]]
       (mlrecon/fetch-paths-full id) 
       (map #(dissoc % :id s/type-label)) (partition-all 2)
       ((switch find-name find-email
                #(-> % first keys first nil? not vector)))
       (apply concat)))

(defnp clean-email [sep [author body sent-date is-digest?]]
  (if is-digest?
    (->> body str/split-lines (reply/header-dates sep)
         (conj [author body]))
    [author body []]))

(defn email-sentences [n]
  (let [models (nlp-models-fn)]
    (->> (queries/email-for-nlp n) (map :id) (map fetch-body)
         (map #(clean-email (:sep models) %))
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
       (map (juxt #(nlp/mention-text %) #(.getType %)))
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
              "fr" "EventFrequency" "pg" "PersonAge" "og" "OrgAge"
              "pw" "PersonWebsite" "ow" "OrgWebsite"
              "in" "LocInside" "q" :quit "n" :next})

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

(defn translate-rels [sentence s]
  (let [codes (str/split s #" ")]
    (if (= 3 (count codes))
      (let [[c1 c2 c3] codes rel (rel-map c3)
            ms (->> sentence nlp/relation-mentions vec)
            i1 (Integer/parseInt c1) i2 (Integer/parseInt c2)]
        (when (and rel (->> [i1 i2] (map #(nth ms %))
                            (map #(.getType %)) (map s/schema-map)
                            s/relation-types (some #{rel})))
          [i1 i2 rel]))
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
   (let [resp (translate-rels sentence (read-line))]
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
  (->> (assoc (dissoc message s/email-sent s/email-body)
              s/body-nlp linked-text)
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
          (nlp/run-nlp-full models (author-name chain message)
                            (s/email-sent message)
                            (s/email-digest message)
                            (s/email-body message))]
      (when (-> graph loom/nodes empty? not)
        (-> (append-hyperlinks graph message)
            (link-message message linked-text)
            remove-all-metadata)))))

(defn graph-from-id [models id]
  (let [[name body sent is-digest?] (fetch-body id)
        message {s/type-label s/email :id id s/email-body body
                 s/email-sent (java.util.Date. sent)
                 s/email-digest
                 (if (not is-digest?) []
                     (->> body str/split-lines
                          (reply/header-dates (:sep models))))}]
    (->> [message {s/s-name name} s/email-from]
         vector (loom/build-graph [])
         (make-nlp-chain models message))))

(defn run-email-nlp! [models {:keys [id user]}]
  (if-let [graph (graph-from-id models id)]
    (insert/push-graph! graph user s/nlp-src [])
    (let [[name body sent is-digest?] (fetch-body id)]
      (-> {:id id s/body-nlp body} vector
          (loom/build-graph [])
          (insert/push-graph! user s/nlp-src [])))))

(defn push-email-nlp! []
  (let [emails (queries/email-for-nlp batch-size)]
    (when (not (empty? emails))
      (throw-info! "run email nlp")
      (dorun (map @nlp-channel emails)))))

(defn make-nlp-pool! []
  (->> {:name "email-nlp" :process run-email-nlp!
        :param-gen nlp-models-fn
        :callback identity :num-threads nlp-threads}
       async/create-pool!
       (reset! nlp-channel)))
