(ns spectra.corenlp
  (:require [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra.datetime :as dt]
            [spectra.loom :as loom]
            [spectra_cljc.schema :as s]
            [spectra.regex :as regex]
            [spectra.weka :as weka]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [edu.stanford.nlp.pipeline Annotation StanfordCoreNLP]
           [edu.stanford.nlp.ling
            CoreAnnotations$SentencesAnnotation
            CoreAnnotations$MentionsAnnotation
            CoreAnnotations$NamedEntityTagAnnotation
            CoreAnnotations$EntityTypeAnnotation
            CoreAnnotations$TokensAnnotation
            CoreAnnotations$PartOfSpeechAnnotation
            CoreAnnotations$LemmaAnnotation
            CoreAnnotations$TrueCaseTextAnnotation
            CoreAnnotations$CharacterOffsetBeginAnnotation
            CoreLabel]
           [edu.stanford.nlp.naturalli
            NaturalLogicAnnotations$RelationTriplesAnnotation]
           [edu.stanford.nlp.dcoref
            CorefCoreAnnotations$CorefChainAnnotation]
           [edu.stanford.nlp.ie.machinereading.structure
            MachineReadingAnnotations$RelationMentionsAnnotation]
           [java.util Properties]))

(defn coreference? []
  (= "true" (env :coreference)))

(def sentence-annotators ["tokenize" "ssplit"])
(def token-annotators ["tokenize" "ssplit" "pos" "lemma"])
(def ner-annotators (concat token-annotators ["ner"]))
(def mention-annotators ["entitymentions"])
(def full-annotators
  (concat ner-annotators
          (if (coreference?) ["parse" "dcoref"] [])
          ["depparse" "natlog" "openie"]))
(def relation-annotators ["parse" "relation"])
(def openie-annotators ["depparse" "natlog" "openie"])
(def truecase-annotators
  (concat token-annotators ["truecase"]))

(def ner-model-dir "edu/stanford/nlp/models/ner/")
(def ner-models
  (map #(str ner-model-dir %)
       ["english.event.2class.crf.ser.gz"
        "english.all.3class.distsim.crf.ser.gz"
        "english.muc.7class.distsim.crf.ser.gz"]))

;; Does this only support one model??
(def relation-model-dir "edu/stanford/nlp/models/supervised_relation_extractor/")
(def relation-models
  (map #(str relation-model-dir %)
       ["event_relation_model.ser"]))

(def truecase-model "edu/stanford/nlp/models/truecase/truecasing.fast.qn.ser.gz")

;; Shift model supposed to be much faster, but takes much longer to load
(def shift-parse-model "edu/stanford/nlp/models/srparser/englishSR.ser.gz")
(def pcfg-parse-model "edu/stanford/nlp/models/lexparser/englishPCFG.ser.gz")

(def schema-map {"PERSON" s/person-name "LOCATION" s/loc-name
                 "ORGANIZATION" s/org-name "MONEY" s/amount
                 "DATETIME" s/date-time "EMAIL" s/email-addr
                 "DATE" s/date-time "TIME" s/date-time
                 "PHONE" s/phone-num "DURATION" s/duration
                 "ADDRESS" s/street-addr "EVENT" s/event-type
                 "ZIPCODE" s/zipcode "URL" s/webpage})

(def relation-map {"EventStart" s/start-time "EventStop" s/stop-time
                   "EventDuration" s/duration "EventAttend" s/event-attend
                   "EventFeatures" s/event-features "EventOrg" s/event-org
                   "EventLocation" s/event-loc "EventAddr" s/event-addr
                   "EventType" s/event-type "EventCost" s/event-cost
                   "EventWebsite" s/website "EventTime" s/event-time
                   "Live_In" s/location "Located_In" s/located-in
                   "OrgBased_In" s/location "Work_For" s/org-member})

(def pronoun-parts ["PRP" "PRP$"])

(defonce bad-relation-filter (atom nil))
(def models-dir (str (env :home-dir) "resources/models"))
(def bad-relation-file "event-scorer.dat")
(def bad-relation-threshold 0.9)

(defn load-relation-filter! []
  (->> bad-relation-file (str models-dir "/")
       weka/deserialize (reset! bad-relation-filter)))

(load-relation-filter!)

(defn make-default-pipeline [annotators]
  (StanfordCoreNLP.
   (doto (Properties. )
     (.setProperty "annotators"
                   (str/join ", " annotators))
     (.setProperty "truecase.model" truecase-model))))

(defn make-pipeline [annotators parse-model]
  (StanfordCoreNLP.
   (doto (Properties. )
     (.setProperty "annotators" (str/join ", " annotators))
     (.setProperty "ner.applyNumericClassifiers" "true")
     (.setProperty "ner.useSUTime" "true")
     (.setProperty "ner.markTimeRanges" "false")
     (.setProperty "ner.includeRange" "false")
     (.setProperty "ner.model" (str/join "," ner-models))
     (.setProperty "parse.model" parse-model)
     (.setProperty "parse.maxlen" "80")
     (.setProperty "sup.relation.model" (str/join "," relation-models))
     #_ (.setProperty "openie.resolve_coref"
                      (if (env :coreference) "true" "false"))
     (.setProperty "openie.triple.all_nominals" "true"))
   false))

(defn get-copy-fn [annotators]
  (fn [] (make-pipeline annotators pcfg-parse-model)))

(defn get-ner-fn []
  (get-copy-fn ner-annotators))

(defn get-mention-fn []
  (get-copy-fn mention-annotators))

(defn get-tokenize-fn []
  (get-copy-fn sentence-annotators))

(defn get-openie-fn []
  (get-copy-fn openie-annotators))

(defn get-relation-fn []
  (get-copy-fn relation-annotators))

(defn openie-models-fn []
  {:ner ((get-ner-fn))
   :mention ((get-mention-fn))
   :openie ((get-openie-fn))})

(defonce letter-count (atom 0))

(defnc run-nlp [pipeline text]
  (swap! letter-count #(+ % (count text)))
  (let [parsed-text (Annotation. text)]
    (.annotate pipeline parsed-text)
    parsed-text))

(defnp run-annotate [pipeline annotation]
  (.annotate pipeline annotation)
  annotation)

(defnc get-tokens [words]
  (.get words CoreAnnotations$TokensAnnotation))

(defnc get-sentences [parsed-text]
  (.get parsed-text CoreAnnotations$SentencesAnnotation))

(defn get-lemma [token]
  (.get token CoreAnnotations$LemmaAnnotation))

(defn get-triples [words]
  (.get words NaturalLogicAnnotations$RelationTriplesAnnotation))

(defn get-pos [token]
  (.get token CoreAnnotations$PartOfSpeechAnnotation))

(defn get-tag [token]
  (.get token CoreAnnotations$NamedEntityTagAnnotation))

(defn entity-type [entity]
  (.get entity CoreAnnotations$EntityTypeAnnotation))

(defn entity-mentions-raw [parsed-text]
  (.get parsed-text CoreAnnotations$MentionsAnnotation))
  
(defn get-coref [parsed-text]
  (.get parsed-text CorefCoreAnnotations$CorefChainAnnotation))

(defn get-relations [parsed-text]
  (.get parsed-text MachineReadingAnnotations$RelationMentionsAnnotation))

(defn true-case [token]
  (.get token CoreAnnotations$TrueCaseTextAnnotation))

(defn get-text [annotation]
  (.originalText annotation))

(defn char-token-map [token]
  (zipmap (range (.beginPosition token)
                 (.endPosition token))
          (repeat (- (.endPosition token)
                     (.beginPosition token))
                  (dec (.index token)))))

(defn token-boundaries [bottom top token-map]
  (let [sort-keys (-> token-map keys sort)]
    (vector (->> sort-keys (drop-while #(< % bottom))
                 first (get token-map))
            (->> sort-keys reverse (drop-while #(> % top))
                 first (get token-map)))))

(defn sentence-char-map [sentence]
  (->> (get-tokens sentence)
       (map char-token-map)
       (apply merge)))

(defn boundary-vector [word start]
  (vector start (+ start (count word))))

(defn last-boundaries [boundaries sentence]
  (if (nil-or-empty? boundaries)
    (.get sentence CoreAnnotations$CharacterOffsetBeginAnnotation)
    (-> boundaries last second)))

(defn boundaries-detect [sentence word]
  (loop [text (str sentence)
         boundaries []]
    (let [pieces (->> word regex/regex-escape re-pattern
                      (str/split text) first)]
      (if (not= text pieces)
        (recur (->> pieces count (+ (count word)) (subs text))
               (->> pieces count (+ (last-boundaries boundaries sentence))
                    (boundary-vector word) (conj boundaries)))
        boundaries))))

(defn chain-sentences [chain]
  (->> (keys (.getMentionMap chain))
       (map #(.getSource %))
       distinct))

(defn chain-maps [chain]
  (->> chain chain-sentences
       (map #(hash-map % [chain]))))

(defn bucket-coref [coref]
  (->> coref (mapcat chain-maps)
       (apply merge-with concat)))

(defn number-items [items]
  (zipmap (map inc (range (count items)))
          items))

(defn pronoun? [tokens]
  (cond
    (not= (count tokens) 1) false
    (some #(= % (-> tokens first get-pos))
          pronoun-parts) true
    :else false))

(defn pos-hash [pos-list]
  (->> (map #(mapv str %) pos-list)
       (map #(str/join " " %))
       (str/join " ") sha1))

(defn tokens-pos [sent-num tokens]
  (map #(vector sent-num (.index %)) tokens))

(defn tokens-pos-map [sent-num tokens]
  (zipmap (->> tokens count inc (range 1)
               (map #(vector sent-num %)))
          (tokens-pos sent-num tokens)))

(defn tokens-str [tokens]
  (->> tokens (map get-text) (str/join " ")))

(defn mention-hash [mention]
  (->> (range (.startIndex mention)
              (.endIndex mention))
       (map str)
       (map #(str (.sentNum mention) " " %))
       (str/join " ") sha1))

(defn filter-singles [nodes]
  (if (< (count nodes) 2) '() nodes))

(defn chain-nodes [chain]
  (->> chain (.getMentionMap) vals
       (mapcat #(into '() %))
       (map #(.mentionSpan %))
       filter-singles))

(defn root-node [chain]
  (as-> (.getRepresentativeMention chain) $
    (.mentionSpan $)))

(defn chain-edges [chain]
  (->> chain chain-nodes
       (map #(vector % (root-node chain) s/coref-is))
       (remove #(= (nth % 0) (nth % 1)))))

(defn chain-graph [chain]
  (loom/build-graph (chain-nodes chain)
                    (chain-edges chain)))

(defn coref-graph [coref]
  (loom/merge-graphs
   (map chain-graph coref)))

(defn ner-node [entity]
  (vec (get-tokens entity)))

(defn ner-edge [entity]
  (when-let [schema-type (-> entity entity-type schema-map)]
    (vector (ner-node entity) schema-type s/has-type)))

(defn ner-graph [entity]
  (when (ner-edge entity)
    (loom/build-graph (list (ner-node entity))
                      (list (ner-edge entity)))))

(defn triple-nodes [triple]
  (mapv vec [(.-subject triple) (.-object triple)]))
      
(defn triple-edge [triple]
  (conj (triple-nodes triple)
        (.relationLemmaGloss triple)))

(defn triple-graph [triple]
  (loom/build-graph (triple-nodes triple)
                    (list (triple-edge triple))))

(defn triples-graph [triples]
  (->> (map triple-graph triples)
       loom/merge-graphs))

(defn attach-pos-map [sent-num tokens g]
  (loom/attach-all
   g (loom/nodes g)
   (tokens-pos-map sent-num tokens)
   s/pos-map))

(defn recursive-graph [sent-num tokens triples]
  (when (seq triples)
    (->> triples triples-graph
         (attach-pos-map sent-num tokens))))
  
(defn recursive-triples [{:keys [ner mention openie]}
                         sent-num tokens]
  (->> tokens tokens-str (run-nlp ner)
       (run-annotate mention) (run-annotate openie)
       get-sentences first get-triples
       (recursive-graph sent-num tokens)))

(defn scanned? [g node]
  (-> (loom/labeled-edges g node s/scanned)
      (concat (loom/labeled-edges g node s/has-type))
      empty? not))

(defn tokens? [tokens]
  (cond (not (coll? tokens)) false
        :else (every? identity (map #(= CoreLabel (type %)) tokens))))

(defn pos-map-node [g node]
  (->> (loom/labeled-edges g node s/pos-map)
       (map #(nth % 1)) first))

(defn pos-map-only [g]
  (pos-map-node g (first (loom/nodes g))))
  
(defn node-hash [g node sent-num]
  (if-let [pos-map (pos-map-node g node)]
    (->> node (tokens-pos sent-num)
         (map pos-map) pos-hash)
    (pos-hash (tokens-pos sent-num node))))

(defn find-dupes [g sent-num]
  (->> (loom/nodes g) (filter tokens?)
       (group-by #(node-hash g % sent-num))
       vals (filter #(> (count %) 1))))

(defn remove-dupes [g [fdupes & rdupes]]
  (reduce (fn [a b]
            (loom/replace-node a b fdupes))
          (loom/remove-edges
           g (mapcat #(loom/labeled-edges g % s/pos-map)
                     rdupes))
          rdupes))

(defn dedup-graph [g sent-num]
  (if-let [dupes (find-dupes g sent-num)]
    (reduce remove-dupes g dupes) g))

(defn highest-fanout [g]
  (->> (loom/nodes g) (filter tokens?)
       (sort-by #(loom/count-downstream g %) >)
       first))

(defn attach-scanned [g edit]
  (loom/attach-all
   g (vector (first (keys edit)))
   "yes" s/scanned))

(defn scanned-edits [edits]
  (take-while #(-> % vals first nil?) edits))

(defn pos-map-edit [g pos-map]
  (loom/replace-node
   g (pos-map-only g)
   (compose-maps (pos-map-only g) pos-map)))

(declare edit-graph breakup-node)

(defn edit-graph [g sent-num edits]
  (cond
    (empty? edits) g
    (-> edits first vals first nil? not)
    (let [new-graph (-> edits first vals first)
          old-node (-> edits first keys first)]
      #(breakup-node 
        (-> (if-let [pos-map (pos-map-node g old-node)]
              (pos-map-edit new-graph pos-map)
              new-graph)
            vector
            (conj (loom/remove-edges
                   g (loom/labeled-edges
                      g old-node s/pos-map)))
            loom/merge-graphs
            (loom/replace-node
             old-node
             (highest-fanout new-graph))
            (dedup-graph sent-num))
        sent-num))
    :else #(breakup-node
            (reduce attach-scanned
                    g (scanned-edits edits))
            sent-num)))

(defn breakup-node-impl [g sent-num]
  (->> (loom/nodes g) (filter tokens?)
       (remove #(scanned? g %))
       (filter #(> (count %) 1)) loom/sort-nodes
       (map #(hash-map % (recursive-triples sent-num %)))))

(defn breakup-node [g sent-num]
  #(edit-graph g sent-num
               (breakup-node-impl g sent-num)))

(defn recursion-cleanup [g]
  (as-> g $
    (loom/remove-edges-label $ s/scanned)
    (loom/remove-edges-label $ s/pos-map)
    (loom/remove-nodes $ (loom/loners $))))

(defn stringify-node [node]
  (if (tokens? node) (tokens-str node) node))

(defn string-vector [[e1 e2 e3]]
  [(stringify-node e1) (stringify-node e2) e3])

(defn stringify-graph [g]
  (loom/build-graph
   (map stringify-node (loom/nodes g))
   (->> g loom/edges (map string-vector))))

(defn pronoun-node []
  (let [pr "!PRONOUN!"]
    (hash-map (sha1 pr) pr)))

(defn pronoun-edge [node]
  [node (pronoun-node) s/has-type])

(defn pronoun-graph [nodes]
  (->> (map pronoun-edge nodes)
       (loom/build-graph nodes)))

(def label-correction {s/person-name s/s-name s/org-name s/s-name
                       s/loc-name s/s-name s/email-addr s/email-addr
                       s/phone-num s/phone-num s/date-time s/date-time
                       s/amount s/amount s/time-interval s/time-interval
                       s/url s/url})

(defn format-value [[e1 e2]]
  (let [new-label (label-correction e2)]
    (if (some #{new-label} s/repeated-attr)
      (vector e1) e1)))

(defn label-edge [edge]
  {(label-correction (second edge)) (format-value edge)
   :label (s/attr-entity (second edge))})

(defn label-annotate [label class]
  (when-let [old-class (.ner label)]
    (when (or (some #{old-class} ["O" "NUMBER" "ORDINAL" "PERCENT"])
              (and (some #{old-class} ["DATE" "TIME"])
                   (= class "DATETIME")))
      (.setNER label class)))
  label)

(defn tokens-annotate [tokens index class]
  (.set tokens index
        (-> tokens (.get index) (label-annotate class)))
  tokens)

(defn tokens-annotate-all [tokens class-map]
  (reduce #(tokens-annotate %1 (key %2) (val %2))
          tokens class-map))

(defn sentence-annotate [sentence class-map]
  (->> class-map (tokens-annotate-all (get-tokens sentence))
       (.set sentence CoreAnnotations$TokensAnnotation))
  sentence)

(defn map-attr [attr coll]
  (->> (map #(hash-map % attr) coll)
       (apply merge)))

(def attr-functions
  [[regex/find-zipcode "ZIPCODE"] [regex/find-email-addrs "EMAIL"]
   [regex/find-urls "URL"] [regex/find-phone-nums "PHONE"]
   [dt/find-dates "DATETIME"]])

(defn replace-all [text coll]
  (str/replace text (regex/regex-or coll) ""))

(defn strip-parens [text]
  (replace-all text ["(" ")"]))

(defn is-fpp? [token]
  (some #{(str/lower-case (get-text token))}
        ["i" "me" "my" "mine" "myself" "i'm" "i'll" "i've"]))

(defn char-pos [token]
  [(.beginPosition token) (.endPosition token)])

(defn char-ends [text coll]
  (->> text count vector (concat [0] coll)))

(defn subs-vec [text [p1 p2]]
  (subs text p1 p2))

(defn swap-fpp [author token]
  (->> token get-text str/lower-case
       (get {"i" author "me" author "my" (str author "'s")
             "mine" (str author "'s") "myself" "themselves"
             "i'm" (str author " is") "i'll" (str author " will")
             "i've" (str author " has")})))

(defn mesh-fpps [author fpps pieces]
  (interleave pieces
              (conj (mapv #(swap-fpp author %) fpps) "")))

(defnc fpp-replace [models text author]
  (let [fpps (->> text (run-nlp (:token models))
                  get-tokens (filter is-fpp?))]
    (->> (mapcat char-pos fpps)
         (char-ends text) (partition 2)
         (map #(subs-vec text %))
         (mesh-fpps author fpps) (str/join ""))))

(defn library-map [text]
  (loop [rem-text text lib-map {}
         attr-map attr-functions]
    (if (empty? attr-map) lib-map
        (let [[[f1 f2] & rmap] attr-map
              found (f1 rem-text)]
          (recur (replace-all rem-text found)
                 (-> (map-attr f2 found)
                     (merge lib-map))
                 rmap)))))

(defn token-pos-map [sentence pair]
  (->> pair key (boundaries-detect sentence)
       (map #(assoc % 1 (dec (second %))))
       (map #(token-boundaries (first %) (second %)
                               (sentence-char-map sentence)))
       (mapcat #(range (first %) (inc (second %))))
       (map #(hash-map % (val pair)))
       (apply merge)))

(defn class-map [sentence]
  (->> sentence (.toString) library-map
       (map #(token-pos-map sentence %))
       (apply merge)))

(defn library-annotate [sentence]
  (sentence-annotate sentence (class-map sentence)))

(defn library-annotate-all [annotation]
  (->> (get-sentences annotation)
       (map library-annotate)
       (.set annotation CoreAnnotations$SentencesAnnotation))
  annotation)

(defn remove-bad-dates [nodes]
  (remove #(and (-> % entity-type schema-map (= s/date-time))
                (->> % get-tokens (map get-text)
                     (str/join " ") dt/is-bad-date?))
          nodes))

(defn entity-mentions [sentence]
  (remove-bad-dates (entity-mentions-raw sentence)))

(defn relation-odds [relation]
  (->> relation (.getTypeProbabilities) (.entrySet) set
       (map (juxt #(.getKey %) #(.getValue %)))
       (remove #(= (first %) "_NR"))
       (sort-by first)))

(defn relation-odds-map [token-map relation]
  (let [token (mapv second token-map)]
    (->> relation (.getEntityMentionArgs)
         (map #(.getHeadTokenStart %))
         (map #(nth token %))
         (concat (-> relation relation-odds vector)))))

(defn normalize-odds [rel-odds]
  (->> rel-odds (map first) (map #(map second %))
       (map #(apply + %)) sort last (/ 1.0)))

(defn relation-graph [relation]
  (->> relation (.getEntityMentionArgs) 
       (map #(.getExtentString %)) reverse
       (concat (-> relation (.getType) relation-map vector))
       reverse vec vector (loom/build-graph [])))

(defn relation-bad? [mult relation]
  (->> relation first (map second)
       (mapv #(* mult %)) (concat [mult])
       (weka/classify @bad-relation-filter)
       (> bad-relation-threshold)))

(defn relations-graph [relations]
  (println (/ (count relations) 2))
  (let [rel-odds (zipvec (map relation-odds relations) relations)]
    (->> (remove #(relation-bad? (normalize-odds rel-odds) %) rel-odds)
         (map second) (map relation-graph) loom/merge-graphs)))

(defnp sentence-graph [sent-pair]
  (-> (loom/merge-graphs
       [(-> sent-pair val get-relations relations-graph)
        (->> (entity-mentions (val sent-pair))
             (map ner-graph) (remove nil?)
             loom/merge-graphs)])
      #_ (breakup-node (key sent-pair))
      #_ trampoline #_ recursion-cleanup
      (dedup-graph (key sent-pair))
      stringify-graph))

(defn shorten-node [node]
  (hash-map (subs (key node) 0 5) (val node)))

(defn shorten-nodes [nodes]
  (map #(shorten-node (first %)) nodes))

(defn shorten-edge [edge]
  (conj (map shorten-node (take 2 edge))
        (third edge)))

(defn strip-nodes [nodes]
  (->> nodes (apply merge) vals))

(defn strip-edge [edge]
  (conj (->> (take 2 edge) (map vals) (map first))
        (third edge)))

(defn strip-graph [g]
  (loom/build-graph
   (->> g loom/nodes strip-nodes)
   (->> g loom/edges (map strip-edge))))

(defn lonely? [g pronoun]
  (let [edges (loom/out-edges g pronoun)]
    (and (= (count edges) 1)
         (= s/has-type (third (first edges))))))

(defn find-pronouns [g]
  (->> (pronoun-node) (loom/up-nodes g)
       (filter #(loom/out-edge-label g % s/coref-is))))

(defn find-referent [g pronoun]
  (second (loom/out-edge-label g pronoun s/coref-is)))

(defn rewrite-edges [g pronoun]
  (->> (loom/out-edges g pronoun)
       (remove #(= s/coref-is (third %)))
       (remove #(= s/has-type (third %)))
       (map #(slice 1 3 %))
       (map #(into (vector (find-referent g pronoun)) %))))

(defn rewrite-pronouns [g]
  (as-> g $
    (loom/add-edges
     $ (mapcat #(rewrite-edges g %) (find-pronouns g)))
    (loom/remove-nodes
     $ (find-pronouns g))
    (loom/remove-nodes
     $ (filter #(lonely? g %)
               (loom/up-nodes g (pronoun-node))))))

(defn count-schema [freq-count]
  (let [schema (->> schema-map vals distinct sort vec)]
    (zipmap schema
            (map #(if (contains? freq-count %)
                    (freq-count %) 0) schema))))

(defn parse-sentence? [sentence]
  (->> sentence vector number-items
       (map sentence-graph) first
       loom/edges (filter #(= (third %) s/has-type))
       (map second) frequencies count-schema
       sort (mapv second)))

(defn nlp-graph [parsed-text]
  (cond->
      (->> parsed-text number-items
           (map sentence-graph) loom/merge-graphs)
    (coreference?)
    (vector
     (-> parsed-text get-coref vals coref-graph))
    (coreference?)
    loom/merge-graphs))

(defn capitalize-words [text]
  (->> (str/split text #" ")
       (map str/capitalize)
       (str/join " ")))

(defnc run-nlp-ner [models text]
  (->> text (run-nlp (:ner models))
       library-annotate-all
       (run-annotate (:mention models))))

(defnc run-nlp-default [models text]
  (->> text (run-nlp-ner models)
       get-sentences nlp-graph))

(defnc run-nlp-full [models author text]
  (cond-> (->> (fpp-replace models (strip-parens text) author)
               (run-nlp-ner models)
               (run-annotate (:relation models))
               get-sentences nlp-graph)
    (coreference?) rewrite-pronouns))

(defn run-nlp-openie [{:keys [ner mention openie] :as models} text]
  (->> text (run-nlp-ner models) (run-annotate openie)
       get-sentences nlp-graph))

(defn fix-punct [text]
  (str/replace text #" [,\.']" #(subs %1 1)))

(defn nlp-names [graph]
  (->> (loom/select-edges graph s/has-type)
       (filter #(some #{(second %)} [s/person-name s/org-name]))
       distinct))

(defn correct-case [text]
  (->> (str/lower-case text)
       (run-nlp (make-default-pipeline truecase-annotators))
       get-sentences (mapcat get-tokens) (map true-case)
       (str/join " ") fix-punct))

(defn name-from-email [models email]
  (as-> (-> (str/split email #"@")
            first (str/replace #"[-\.\+]" " ")
            (str/replace #"[0-9]" "")) $
    (when (-> $ (str/split #" ") count (> 1))
      (->> $ capitalize-words (run-nlp-default models)
           nlp-names first))))

(defn openie-sentence [text]
  (let [models (openie-models-fn)]
    (run-nlp-openie models text)))
