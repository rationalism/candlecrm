(ns spectra.corenlp
  (:require [clojure.string :as str]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra.loom :as loom]
            [spectra_cljc.schema :as s]
            [spectra.regex :as regex]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [edu.stanford.nlp.pipeline Annotation StanfordCoreNLP]
           [edu.stanford.nlp.ling
            CoreAnnotations$SentencesAnnotation
            CoreAnnotations$MentionsAnnotation
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
           [java.util Properties]))

(def sentence-annotators ["tokenize" "ssplit"])
(def token-annotators ["tokenize" "ssplit" "pos" "lemma"])
(def ner-annotators (concat token-annotators ["ner"]))
(def mention-annotators ["entitymentions"])
(def full-annotators
  (concat ner-annotators
          (if (env :coreference) ["parse" "dcoref"] [])
          ["depparse" "natlog" "openie"]))
(def openie-annotators ["depparse" "natlog" "openie"])
(def truecase-annotators
  (concat token-annotators ["truecase"]))

(def ner-model-dir "edu/stanford/nlp/models/ner/")
(def ner-models
  (map #(str ner-model-dir %)
       ["english.all.3class.distsim.crf.ser.gz"
        "english.muc.7class.distsim.crf.ser.gz"]))
        ;"english.math.resume.distsim.crf.ser.gz"]

;; Shift model supposed to be much faster, but takes much longer to load
(def shift-parse-model "edu/stanford/nlp/models/srparser/englishSR.ser.gz")
(def pcfg-parse-model "edu/stanford/nlp/models/lexparser/englishPCFG.ser.gz")

(def schema-map {"PERSON" s/person-name "LOCATION" s/loc-name
                 "ORGANIZATION" s/org-name "MONEY" s/amount
                 "DATETIME" s/date-time "EMAIL" s/email-addr
                 "PHONE" s/phone-num "TIMEINTERVAL" s/time-interval})

(def pronoun-parts ["PRP" "PRP$"])

(defn make-default-pipeline [annotators]
  (StanfordCoreNLP.
   (doto (Properties. )
     (.setProperty "annotators"
                   (str/join ", " annotators)))))

(defn make-pipeline [annotators parse-model]
  (StanfordCoreNLP.
   (doto (Properties. )
     (.setProperty "annotators" (str/join ", " annotators))
     (.setProperty "ner.applyNumericClassifiers" "false")
     (.setProperty "ner.useSUTime" "false")
     (.setProperty "ner.model" (str/join "," ner-models))
     (.setProperty "parse.model" parse-model)
                                        ;(.setProperty "openie.resolve_coref"
                                        ;              (if (env :coreference) "true" "false"))
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

(defonce letter-count (atom 0))

(defnp run-nlp [pipeline text]
  (try
    (swap! letter-count #(+ % (count text)))
    ;; Global var needed for mutating Java method
    (def parsed-text (Annotation. text))
    (.annotate pipeline parsed-text)
    parsed-text
    (catch Exception e
      (do (println "NLP parsing error on text:")
          (println text)
          (println "Error message:")
          (print e)))))

(defnp run-annotate [pipeline annotation]
  (.annotate pipeline annotation)
  annotation)

(defn get-tokens [words]
  (.get words CoreAnnotations$TokensAnnotation))

(defn get-sentences [parsed-text]
  (.get parsed-text CoreAnnotations$SentencesAnnotation))

(defn get-lemma [token]
  (.get token CoreAnnotations$LemmaAnnotation))

(defn get-triples [words]
  (.get words NaturalLogicAnnotations$RelationTriplesAnnotation))

(defn get-pos [token]
  (.get token CoreAnnotations$PartOfSpeechAnnotation))

(defn entity-type [entity]
  (.get entity CoreAnnotations$EntityTypeAnnotation))

(defn entity-mentions [parsed-text]
  (.get parsed-text CoreAnnotations$MentionsAnnotation))
  
(defn get-coref [parsed-text]
  (.get parsed-text CorefCoreAnnotations$CorefChainAnnotation))

(defn true-case [token]
  (.get token CoreAnnotations$TrueCaseTextAnnotation))

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
  (if (com/nil-or-empty? boundaries)
    (.get sentence CoreAnnotations$CharacterOffsetBeginAnnotation)
    (-> boundaries last second)))

(defn boundaries-detect [sentence word]
  (loop [text (str sentence)
         boundaries []]
    (let [pieces (->> word regex/regex-escape re-pattern (str/split text))]
      (if (= text (first pieces))
        boundaries
        (recur (->> pieces first count (+ (count word)) (subs text))
               (->> pieces first count (+ (last-boundaries boundaries sentence))
                    (boundary-vector word) (conj boundaries)))))))

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

(defn merge-coref [sentence corefs]
  {:sentence sentence
   :corefs corefs})

(defn blank-coref [sentence]
  {:sentence sentence
   :corefs '()})

(defn sentences [nlp-output]
  (map :sentence nlp-output))

(defn fill-in-corefs [candidate]
  (if (map? candidate)
    candidate (blank-coref candidate)))

(defn pronoun? [tokens]
  (cond
    (not= (count tokens) 1) false
    (some #(= % (-> tokens first get-pos))
          pronoun-parts) true
          :else false))

(defn pos-hash [pos-list]
  (->> pos-list
       (map #(mapv str %))
       (map #(str/join " " %))
       (str/join " ") com/sha1))

(defn tokens-pos [sent-num tokens]
  (map #(vector sent-num (.index %)) tokens))

(defn tokens-pos-map [sent-num tokens]
  (zipmap (->> tokens count inc (range 1)
               (map #(vector sent-num %)))
          (tokens-pos sent-num tokens)))

(defn tokens-str [tokens]
  (->> tokens (map #(.originalText %))
       (str/join " ")))

(defn mention-hash [mention]
  (->> (range (.startIndex mention)
              (.endIndex mention))
       (map str)
       (map #(str (.sentNum mention) " " %))
       (str/join " ") com/sha1))

(defn mention-nodes [nodes]
  (map #(.mentionSpan %) nodes))

(defn filter-singles [nodes]
  (if (< (count nodes) 2) '() nodes))

(defn chain-nodes [chain]
  (->> chain (.getMentionMap) vals
       (mapcat #(into '() %))
       mention-nodes filter-singles))

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
  (->> triples
       (map triple-graph)
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
  
(defn recursive-triples [models sent-num tokens]
  (->> tokens tokens-str
       (run-nlp (:ner models))
       (run-annotate (:mention models))
       (run-annotate (:openie models))
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

(defn remove-dupes [g dupes]
  (as-> g $
    (loom/remove-edges
     $ (->> dupes rest
            (mapcat #(loom/labeled-edges g % s/pos-map))))
    (reduce (fn [a b]
              (loom/replace-node
               a b (first dupes)))
            $ (rest dupes))))

(defn dedup-graph [g sent-num]
  (if-let [dupes (find-dupes g sent-num)]
    (reduce remove-dupes g dupes) g))

(defn highest-fanout [g]
  (->> (loom/nodes g)
       (filter tokens?)
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
   (com/compose-maps (pos-map-only g) pos-map)))

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
  (->> (loom/nodes g)
       (filter tokens?)
       (remove #(scanned? g %))
       (filter #(> (count %) 1))
       loom/sort-nodes
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

(defn string-vector [edge]
  (vector (stringify-node (first edge))
          (stringify-node (second edge))
          (nth edge 2)))

(defn stringify-graph [g]
  (loom/build-graph
   (map stringify-node (loom/nodes g))
   (->> g loom/multi-edges
        (map string-vector))))

(defn pronoun-node []
  (as-> "!PRONOUN!" $
    (hash-map (com/sha1 $) $)))

(defn pronoun-edge [node]
  [node (pronoun-node) s/has-type])

(defn pronoun-graph [nodes]
  (loom/build-graph nodes (map pronoun-edge nodes)))

(def label-correction {s/person-name s/s-name s/org-name s/s-name
                       s/loc-name s/s-name s/email-addr s/email-addr
                       s/phone-num s/phone-num s/date-time s/date-time
                       s/amount s/amount s/time-interval s/time-interval
                       s/url s/url})

(defn format-value [edge]
  (let [new-label (-> edge second label-correction)]
    (if (some #{new-label} s/repeated-attr)
      (vector (first edge)) (first edge))))

(defn label-edge [edge]
  {(label-correction (second edge)) (format-value edge)
   :label (s/attr-entity (second edge))})

(defn label-annotate [label class]
  (.setNER label class) label)

(defn tokens-annotate [tokens index class]
  (.set tokens index (-> tokens (.get index) (label-annotate class)))
  tokens)

(defn tokens-annotate-all [tokens class-map]
  (reduce #(tokens-annotate %1 (key %2) (val %2)) tokens class-map))

(defn sentence-annotate [sentence class-map]
  (->> class-map (tokens-annotate-all (get-tokens sentence))
       (.set sentence CoreAnnotations$TokensAnnotation))
  sentence)

(defn map-attr [attr coll]
  (->> coll (map #(hash-map % attr))
       (apply merge)))

(def attr-functions
  [[regex/find-email-addrs "EMAIL"] [regex/find-urls "URL"]
   [regex/find-phone-nums "PHONE"] [dt/find-intervals "TIMEINTERVAL"]
   [dt/find-dates "DATETIME"]])

(defn replace-all [text coll]
  (str/replace text (regex/regex-or coll) ""))

(defn strip-parens [text]
  (replace-all text ["(" ")"]))

(defn is-fpp? [token]
  (some #{(str/lower-case (.originalText token))}
        ["i" "me" "my" "mine" "myself"]))

(defn char-pos [token]
  [(.beginPosition token) (.endPosition token)])

(defn char-ends [text coll]
  (->> text count vector
       (concat [0] coll)))

(defn subs-vec [text pos]
  (subs text (first pos) (second pos)))

(defn swap-fpp [author token]
  (->> token (.originalText) str/lower-case
       (get {"i" author "me" author "my" (str author "'s")
             "mine" (str author "'s") "myself" "themselves"})))

(defn mesh-fpps [author fpps pieces]
  (interleave pieces
              (conj (mapv #(swap-fpp author %) fpps) "")))

(defn fpp-replace [models text author]
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
        (let [found ((-> attr-map first first) rem-text)]
          (recur (replace-all rem-text found)
                 (-> attr-map first second 
                     (map-attr found) (merge lib-map))
                 (rest attr-map))))))

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

(defnp sentence-graph [sent-pair]
  (-> (loom/merge-graphs
       [(-> sent-pair val get-triples triples-graph)
        (->> (entity-mentions (val sent-pair))
             (map ner-graph) (remove nil?)
             loom/merge-graphs)])
         ;(breakup-node (key sent-pair))
         ;trampoline recursion-cleanup
      (dedup-graph (key sent-pair))
      stringify-graph))

(defn shorten-node [node]
  (hash-map (subs (key node) 0 5)
            (val node)))

(defn shorten-nodes [nodes]
  (map #(shorten-node (first %)) nodes))

(defn shorten-edge [edge]
  (conj (map shorten-node (take 2 edge))
        (nth edge 2)))

(defn strip-nodes [nodes]
  (->> nodes (apply merge) vals))

(defn strip-edge [edge]
  (conj (->> (take 2 edge) (map vals) (map first))
        (nth edge 2)))

(defn strip-graph [g]
  (loom/build-graph
   (->> g loom/nodes strip-nodes)
   (->> g loom/multi-edges (map strip-edge))))

(defn lonely? [g pronoun]
  (as-> (loom/out-edges g pronoun) $
    (and (= (count $) 1)
         (= s/has-type (nth (first $) 2)))))

(defn find-pronouns [g]
  (->> (pronoun-node) (loom/up-nodes g)
       (filter #(loom/out-edge-label g % s/coref-is))))

(defn find-referent [g pronoun]
  (second (loom/out-edge-label g pronoun s/coref-is)))

(defn rewrite-edges [g pronoun]
  (->> (loom/out-edges g pronoun)
       (remove #(= s/coref-is (nth % 2)))
       (remove #(= s/has-type (nth % 2)))
       (map #(com/slice 1 3 %))
       (map #(into (vector (find-referent g pronoun)) %))))

(defn rewrite-pronouns [g]
  (as-> g $
    (loom/add-edges $
       (mapcat #(rewrite-edges g %) (find-pronouns g)))
    (loom/remove-nodes $
       (find-pronouns g))
    (loom/remove-nodes $
       (filter #(lonely? g %) (loom/up-nodes g (pronoun-node))))))

(defn sentences-text [sentences]
  (map str sentences))

(defn nlp-graph [parsed-text]
  (cond->
      (->> parsed-text get-sentences number-items
           (map sentence-graph) loom/merge-graphs)
    (env :coreference)
    (vector
     (-> parsed-text get-coref vals coref-graph))
    (env :coreference)
    loom/merge-graphs))

(defn capitalize-words [text]
  (->> (str/split text #" ")
       (map str/capitalize)
       (str/join " ")))

(defn run-nlp-default [models text]
  (try
    (->> text (run-nlp (:ner models))
         library-annotate-all
         (run-annotate (:mention models))
         nlp-graph)
    (catch Exception e
      (do (println "NLP parsing error on text:")
          (println text)
          (println "Error message:")
          (print e)))))

(defn run-nlp-full [models author text]
  (cond-> (->> (fpp-replace models (strip-parens text) author)
               (run-nlp (:ner models))
               library-annotate-all
               (run-annotate (:mention models))
               nlp-graph)
    (env :coreference) rewrite-pronouns))

(defn run-nlp-openie [models text]
  (-> text strip-parens ;; (fpp-replace models author)
      (run-nlp (:ner models))
      library-annotate-all
      (run-annotate (:mention models))
      (run-annotate (:openie models))
      nlp-graph))

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
