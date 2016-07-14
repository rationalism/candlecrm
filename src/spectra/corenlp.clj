(ns spectra.corenlp
  (:require [clojure.set :as cset]
            [clojure.string :as str]
            [clojure.java.io :as io]
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
           [edu.stanford.nlp.ling CoreLabel
            CoreAnnotations$SentencesAnnotation
            CoreAnnotations$MentionsAnnotation
            CoreAnnotations$NamedEntityTagAnnotation
            CoreAnnotations$EntityTypeAnnotation
            CoreAnnotations$TokensAnnotation
            CoreAnnotations$PartOfSpeechAnnotation
            CoreAnnotations$LemmaAnnotation
            CoreAnnotations$TrueCaseTextAnnotation
            CoreAnnotations$CharacterOffsetBeginAnnotation]
           [edu.stanford.nlp.naturalli
            NaturalLogicAnnotations$RelationTriplesAnnotation]
           [edu.stanford.nlp.trees
            TreeCoreAnnotations$TreeAnnotation]
           [edu.stanford.nlp.dcoref
            CorefCoreAnnotations$CorefChainAnnotation]
           [edu.stanford.nlp.ie.machinereading BasicEntityExtractor
            BasicRelationExtractor BasicRelationFeatureFactory
            GenericDataSetReader MachineReading]
           [edu.stanford.nlp.ie.machinereading.structure
            EntityMentionFactory EntityMention ExtractionObject
            RelationMention RelationMentionFactory Span
            MachineReadingAnnotations$EntityMentionsAnnotation
            MachineReadingAnnotations$RelationMentionsAnnotation]
           [java.util Properties] [java.util.logging Level]
           [org.ahocorasick.trie Trie]))

(defn coreference? []
  (= "true" (env :coreference)))

(def fpp-join " said: ")

(def sentence-annotators ["tokenize" "ssplit"])
(def token-annotators ["tokenize" "ssplit" "pos" "lemma"])
(def ner-annotators (concat token-annotators ["ner"]))
(def mention-annotators ["entitymentions"])
(def full-annotators
  (concat ner-annotators
          (if (coreference?) ["parse" "dcoref"] [])
          ["depparse" "natlog" "openie"]))
(def parse-annotators ["parse"])
(def coref-annotators ["dcoref"])
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

(def relation-features
  ["arg_words" "arg_type" "dependency_path_lowlevel"  "dependency_path_words"
   "surface_path_POS" "entities_between_args" "full_tree_path"
   "dependency_path_POS_unigrams" "dependency_path_word_n_grams"
   "dependency_path_POS_n_grams" "dependency_path_edge_lowlevel_n_grams"
   "dependency_path_edge-node-edge-grams_lowlevel"
   "dependency_path_node-edge-node-grams_lowlevel"
   "dependency_path_directed_bigrams" "dependency_path_edge_unigrams"
   "same_head" "entity_counts"])

(def pronoun-parts ["PRP" "PRP$"])

(def models-dir (str (env :home-dir) "resources/models"))
(def rel-model-dir (str models-dir "/relations"))
(def bad-relation-threshold 0.9)

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
     (.setProperty "ssplit.newlineIsSentenceBreak" "never")
     (.setProperty "dcoref.maxdist" "3")
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
  (fn [] (make-pipeline annotators shift-parse-model)))

(defn get-ner-fn []
  (get-copy-fn ner-annotators))

(defn get-mention-fn []
  (get-copy-fn mention-annotators))

(defn get-tokenize-fn []
  (get-copy-fn sentence-annotators))

(defn get-parse-fn []
  (get-copy-fn parse-annotators))

(defn get-coref-fn []
  (get-copy-fn coref-annotators))

(defn rel-from-file [filename]
  (doto (BasicRelationExtractor/load filename)
    (.setLoggerLevel Level/WARNING)))

(defn serialize-rel-models [dir models]
  (mapv #(.save (val %) (->> % key (map name) (interpose "_")
                             (apply str) (str dir "/")))
        models))

(defonce rel-sentences (atom []))

(defn save-rels [filename]
  (serialize @rel-sentences filename))

(defn load-rels [filename]
  (->> filename deserialize (reset! rel-sentences)))

(defn types-from-dirnames [dirnames]
  (->> (str/split (last dirnames) #"_")
       (mapv keyword)))

(defn deserialize-rel-models [dir]
  (->> dir io/file file-seq rest (map #(.getCanonicalPath %))
       (map (juxt #(str/split % #"/") rel-from-file))
       (map #(update % 0 types-from-dirnames))
       (into {})))

(defn get-rel-fn []
  (fn [] (deserialize-rel-models rel-model-dir)))

;; Use this like a pipeline, as prep for relation extractor
(defn entity-extractor []
  (doto (BasicEntityExtractor. nil false nil false
                               (EntityMentionFactory. ) true)
    (.setLoggerLevel Level/WARNING)))

(defnp run-nlp [pipeline text]
  (let [parsed-text (Annotation. text)]
    (.annotate pipeline parsed-text)
    parsed-text))

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

(defn get-tag [token]
  (.get token CoreAnnotations$NamedEntityTagAnnotation))

(defn entity-type [entity]
  (.get entity CoreAnnotations$EntityTypeAnnotation))

(defn entity-mentions-raw [parsed-text]
  (.get parsed-text CoreAnnotations$MentionsAnnotation))

(defn get-tree [sentence]
  (.get sentence TreeCoreAnnotations$TreeAnnotation))

(defn get-coref [parsed-text]
  (.get parsed-text
        edu.stanford.nlp.hcoref.CorefCoreAnnotations$CorefChainAnnotation))

(defn get-relations [parsed-text]
  (.get parsed-text MachineReadingAnnotations$RelationMentionsAnnotation))

(defn relation-mentions [sentence]
  (.get sentence MachineReadingAnnotations$EntityMentionsAnnotation))

(defn set-mentions [sentence mentions]
  (.set sentence MachineReadingAnnotations$EntityMentionsAnnotation
        mentions)
  sentence)

(defn true-case [token]
  (.get token CoreAnnotations$TrueCaseTextAnnotation))

(defn offset-begin [sentence]
  (.get sentence CoreAnnotations$CharacterOffsetBeginAnnotation))

(defn get-text [annotation]
  (.originalText annotation))

(defn rel-annotate [sentence rel-model]
  (when rel-model
    (.annotateSentence rel-model sentence))
  sentence)

(defn set-rels [sentence rels]
  (.set sentence MachineReadingAnnotations$RelationMentionsAnnotation
        rels)
  sentence)

(defn set-rel-type [[rel type]]
  (.setType rel type)
  rel)

(defn make-doc [sentences]
  (let [doc (Annotation. )]
    (.set doc CoreAnnotations$SentencesAnnotation sentences)
    doc))

(defn add-heads [doc]
  (.preProcessSentences (GenericDataSetReader. ) doc)
  doc)

(defn feature-factory []
  (MachineReading/makeRelationFeatureFactory
   BasicRelationFeatureFactory
   (str/join "," relation-features)
   false))

(defn relation-extractor []
  (doto (MachineReading/makeRelationExtractor
         BasicRelationExtractor (feature-factory) false
         (RelationMentionFactory. ))
    (.setLoggerLevel Level/WARNING)))

(defn blank-relation [^ExtractionObject sub ^ExtractionObject obj]
  (RelationMention/createUnrelatedRelation
   (RelationMentionFactory. )
   (into-array [sub obj])))

(defn mention-chars [mention]
  (let [tokens (-> mention .getSentence get-tokens vec)]
    [(->> mention .getExtentTokenStart (nth tokens) .beginPosition)
     (->> mention .getExtentTokenEnd dec (nth tokens) .endPosition)]))

(defn mention-text [mention]
  (let [offset (-> mention .getSentence offset-begin)]
    (->> mention mention-chars (map #(- % offset))
         (apply subs (.toString (.getSentence mention))))))

(defn char-token-map [token]
  (zipmap (range (.beginPosition token)
                 (.endPosition token))
          (repeat (- (.endPosition token)
                     (.beginPosition token))
                  (dec (.index token)))))

(defn token-boundaries [bottom top token-map]
  (vector (token-map bottom) (token-map top)))

(defn normalize-map [token-map]
  (if (or (not token-map) (empty? token-map)) []
      (let [ks (keys token-map) b (apply min ks) e (apply max ks)]
        (loop [token-vec [] i b]
          (if (> i e) token-vec
              (recur (conj token-vec
                           [i (if-let [t (token-map i)] t
                                      (second (last token-vec)))])
                     (inc i)))))))

(defn sentence-token-map [sentence]
  (->> (get-tokens sentence) (map char-token-map)
       (apply merge) normalize-map (into {})))

(defn number-items [items]
  (zipmap (map inc (range (count items))) items))

(defn default-entity [entity]
  {(-> entity .getType s/schema-map s/label-correct)
   (mention-text entity)})

(defn ner-graph [reftime entity]
  (when-let [node-type (-> entity .getType s/schema-map s/entity-map)]
    (-> {s/type-label node-type}
        (merge {s/link-text (mention-text entity)})
        (merge {s/hash-code (str "hc" (.hashCode entity))})
        (merge (condp some [node-type]
                 #{s/event}
                 (let [node-dates (-> entity mention-text
                                      (dt/dates-in-text reftime))]
                   (condp = (count node-dates)
                     1 {s/event-begin (first node-dates)}
                     2 {s/event-begin (first node-dates)
                        s/event-end (second node-dates)}
                     {s/date-time node-dates}))
                 #{s/person s/organization}
                 (if (some #{(-> entity .getType s/schema-map)}
                           [s/person-name s/email-addr])
                   (-> entity mention-text regex/parse-name-email)
                   (default-entity entity))
                 (default-entity entity)))
        vector (loom/build-graph []))))

(defn add-link [g node]
  (loom/add-edge g [{s/type-label s/hyperlink
                     s/link-id (s/hash-code node)}
                    node s/link-to]))

(defn add-links [g]
  (reduce add-link g (loom/nodes g)))

(defn label-annotate [label class]
  (when-let [old-class (.ner label)]
    (when (or (some #{old-class} ["O" "NUMBER" "ORDINAL" "PERCENT"])
              (and (some #{old-class} ["DATE" "TIME" "ORGANIZATION"])
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

(defn emit-vec [offset emit]
  (->> emit ((juxt #(.getStart %) #(.getEnd %)))
       (mapv #(+ % offset)) (vector (.getKeyword emit))))

(defn emit-map [emits sentence]
  (->> emits (map #(emit-vec (offset-begin sentence) %))
       (group-by first) (fmapl #(map second %))))

(defn trie-boundaries [sentence words]
  (-> #(.addKeyword %1 %2)
      (reduce (.removeOverlaps (Trie/builder)) words)
      .build (.parseText (.toString sentence))
      (emit-map sentence)))

(defn token-pos-map [char-map pair]
  (->> pair key (map #(token-boundaries (first %) (second %) char-map))
       (mapcat #(range (first %) (inc (second %))))
       (map #(hash-map % (val pair)))
       (apply merge)))

(defn boundaries-map [sentence type-map]
  (let [boundaries (->> type-map keys (trie-boundaries sentence))]
    (zipmap (map boundaries (keys type-map)) (vals type-map))))

(defn class-map [sentence]
  (let [char-map (sentence-token-map sentence)]
    (->> sentence (.toString) library-map (boundaries-map sentence)
         (map #(token-pos-map char-map %)) (apply merge))))

(defn number-junk? [sentence]
  (let [c (-> sentence .toString count)]
    (and (> c 2000) (->> sentence .toString
                         (filter #(Character/isDigit %))
                         count (< (* c 0.25))))))

(defn library-annotate [sentence]
  (if (number-junk? sentence) sentence
      (sentence-annotate sentence (class-map sentence))))

(defnp library-annotate-all [annotation]
  (->> (get-sentences annotation)
       (map library-annotate)
       (.set annotation CoreAnnotations$SentencesAnnotation))
  annotation)

(defn remove-bad-dates [mentions]
  (remove #(and (-> % .getType s/schema-map (= s/date-time))
                (or (->> % mention-text dt/dates-in-text empty?)
                    (->> % mention-text dt/is-bad-date?)))
          mentions))

(defn is-bad-number? [mention]
  (if (-> mention .getType s/schema-map (not= s/number)) false
      (try (Double/parseDouble (mention-text mention)) false
           (catch Exception e
             true))))

(defn remove-bad-numbers [mentions]
  (remove is-bad-number? mentions))

(defn make-mention [mention n]
  (let [factory (EntityMentionFactory. )]
    (.constructEntityMention
     factory (EntityMention/makeUniqueId)
     (.getSentence mention) (Span. n (inc n))
     (Span. n (inc n)) (.getType mention) nil nil)))

(defn split-mention [mention]
  (when (some #{(-> mention .getType s/schema-map)} s/no-whitespace)
    (let [words (-> mention mention-text (str/split #"\s"))]
      (when (> (count words) 1)
        (let [factory (EntityMentionFactory. )]
          (->> mention ((juxt #(.getHeadTokenStart %)
                              #(.getHeadTokenEnd %)))
               (apply range) (mapv #(make-mention mention %))))))))

(defn split-multiples [mentions]
  (mapcat #(if-let [split (split-mention %)]
             split (vector %)) mentions))

(defn filter-mentions [texts mentions]
  (remove #(some #{(mention-text %)} texts) mentions))

(defn clean-sentences [to-remove sentences]
  (->> sentences (mapvals relation-mentions) 
       (fmapl remove-bad-dates) (fmapl remove-bad-numbers)
       (fmapl split-multiples) (fmapl #(filter-mentions to-remove %))
       (into []) (map #(set-mentions (first %) (second %)))))

(defn relation-id [relation]
  (mapcat (juxt #(.getHeadTokenStart %)
                #(.getHeadTokenEnd %))
          (.getEntityMentionArgs relation)))

(defn cross-relations [[a b]]
  (for [fm a sm b]
    (blank-relation fm sm)))

(defn split-relations [sentence]
  (let [type-map (->> sentence relation-mentions
                      (group-by #(-> % .getType s/schema-map)))
        rel-keys (keys s/relation-types)]
    (->> rel-keys (mapvals #(map type-map %))
         (filter #(not-any? nil? (val %))) (into {})
         (fmapl cross-relations)
         (fmapl #(set-rels (Annotation. sentence) %)))))

(defn combine-rels [sentences]
  (->> sentences (mapcat get-relations)
       (set-rels (first sentences))))

(defn cartesian-product
  ([coll] (cartesian-product coll []))
  ([coll sets]
   (if (empty? coll) (set sets)
       (->> coll rest (mapv #(hash-set (first coll) %))
            (concat sets) (recur (rest coll))))))

(defn all-ner-graph [reftime sentence]
  (->> sentence relation-mentions
       (map #(ner-graph reftime %))
       (remove nil?) loom/merge-graphs))

(defn has-rel-candidates? [sentence]
  (let [rel-set (->> s/relation-types keys (map set) set)
        rel-map (->> s/relation-types keys (apply concat) distinct
                     (mapv #(vector % %)) (into {}))
        nodes (->> sentence relation-mentions
                   (map #(.getType %)) (map s/schema-map))]
    (->> (map rel-map nodes) (remove nil?) distinct
         cartesian-product (cset/intersection rel-set)
         empty? not)))

(defn find-relations [models sentence]
  (if (has-rel-candidates? sentence)
    (let [rel-map (->> sentence vector make-doc
                       (run-annotate (:parse models))
                       add-heads get-sentences first
                       split-relations cset/map-invert)]
      (->> (compose-maps rel-map (:relation models))
           (map #(apply rel-annotate %)) combine-rels))
    sentence))

(defn find-all-relations [models doc]
  (->> doc (map #(find-relations models %))
       make-doc))

(defn gold-rel-map [sentence]
  (->> sentence get-relations
       (map (juxt relation-id #(.getType %)))
       (mapv vec) (into {})))

(defn add-goldens [sentence golden-map]
  (let [rels (get-relations sentence)]
    (doseq [r rels]
      (when-let [new-type (-> r relation-id golden-map)]
        (.setType r new-type)))
    (set-rels sentence rels)
    sentence))

(defn add-all-goldens [gold-sentence]
  (->> gold-sentence split-relations
       (fmapl #(add-goldens % (gold-rel-map gold-sentence)))))

(defn train-extractor [sentences]
  (let [extractor (relation-extractor)]
    (->> sentences make-doc add-heads
         (.train extractor))
    extractor))

(defn train-rel-models [sentences]
  (->> sentences (map add-all-goldens)
       (map #(fmap % vector))
       (apply merge-with into)
       (fmapl train-extractor)))

(defn prepare-rel-training [models sentences]
  (->> sentences (filter has-rel-candidates?)
       (map vector) (map make-doc)
       (pmap #(run-annotate (:parse models) %))
       (map get-sentences) (map first)
       make-doc add-heads get-sentences))

(defn relation-graph [ner-graph relation]
  (let [rel-type (-> relation .getType s/relation-map)
        graph-map (->> ner-graph loom/nodes (mapkeys s/hash-code))
        old-node (->> relation .getEntityMentionArgs
                      first .hashCode (str "hc") graph-map)]
    (if (some #{rel-type} s/is-attr)
      (->> relation .getEntityMentionArgs second mention-text
           vector (hash-map rel-type) (merge-with concat old-node)
           (loom/replace-node ner-graph old-node))
      (->> relation .getEntityMentionArgs reverse
           (map #(str "hc" (.hashCode %))) (map graph-map)
           (cons rel-type) reverse vec vector
           (loom/add-edges ner-graph)))))

(defn relations-graph [ner-graph relations]
  (->> relations (remove #(-> % (.getType) (= "_NR")))
       (reduce relation-graph ner-graph)))

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

(defn sentence-split [models text]
  (->> text (run-nlp (:token models))
       get-sentences))

(defn fpp-merge [author strings]
  (->> strings rest (map #(str author fpp-join %))
       (cons (first strings)) (str/join "")))

(defn fpp-replace [models author text]
  (->> text (sentence-split models) (map get-tokens)
       (map first) (map #(.beginPosition %))
       (mapcat #(repeat 2 %)) (cons 0)
       (partition-all 2) (map #(apply subs text %))
       (fpp-merge author)))

(defn strip-parens [text]
  (replace-all text ["(" ")" "<" ">"]))

(defn hash-brackets [code text]
  (str "<node " code ">" text "</node>"))

(defn url-brackets [url]
  (str "<url>" url "</url>"))

(defn mention-link [mention]
  (if (-> mention .getType s/schema-map (= s/webpage))
    (->> mention mention-text url-brackets)
    (->> mention mention-text
         (hash-brackets (str "hc" (.hashCode mention))))))

(defn switch-val [[param _]]
  (if (= (type param) Annotation) ""
      (mention-link param)))

(defn mention-map [mentions]
  (mapvals mention-chars mentions))

(defn first-token-pos [tokens]
  (->> tokens first .beginPosition))

(defn end-fpp-pos [tokens]
  (if (and (-> tokens first .value (= "said"))
           (-> tokens second .value (= ":")))
    (-> tokens second .endPosition inc)
    (recur (rest tokens))))

(defn sentence-map [sentences]
  (mapvals (comp (juxt first-token-pos end-fpp-pos) get-tokens)
           sentences))

(defn switch-map [annotation mentions]
  (->> annotation get-sentences sentence-map
       (merge (mention-map mentions))
       (sort-by second)))

(defn add-hyperlinks [annotation mentions]
  (let [mmap (switch-map annotation mentions)]
    (->> mmap (mapcat second) (cons 0) (partition-all 2)
         (map #(apply (partial subs (.toString annotation)) %))
         (interleave (cons "" (map switch-val mmap)))
         (str/join ""))))

(defn sentence-graph [reftime sent-pair]
  (->> sent-pair val ((juxt #(all-ner-graph reftime %) get-relations))
       (apply relations-graph) add-links))

(defn nlp-graph
  ([parsed-text]
   (nlp-graph (dt/now) parsed-text))
  ([reftime parsed-text]
   (->> parsed-text number-items
        (map #(sentence-graph reftime %))
        loom/merge-graphs)))

(defn capitalize-words [text]
  (->> (str/split text #" ")
       (map str/capitalize)
       (str/join " ")))

(defnp run-nlp-ner [models text]
  (->> text (run-nlp (:ner models))
       library-annotate-all
       (run-annotate (:mention models))
       (run-annotate (:entity models))))

(defnp sentence-parse [models [author text clean-dates]]
  (->> text strip-parens (fpp-replace models author)
       (run-nlp-ner models) get-sentences
       (clean-sentences clean-dates)))

(defnc run-nlp-default [models text]
  (->> text (run-nlp-ner models)
       get-sentences nlp-graph))

(defn make-link? [mention]
  (let [m-type (-> mention .getType s/schema-map)]
    (or (s/entity-map m-type)
        (= m-type s/webpage))))

(defn is-fpp-mention? [author mention]
  (and (= 0 (.getHeadTokenStart mention))
       (= author (mention-text mention))))

(defnc run-nlp-full [models author reftime clean-dates text]
  (let [new-text (->> text strip-parens
                      (fpp-replace models author))
        sentences (->> new-text (run-nlp-ner models)
                       get-sentences (clean-sentences clean-dates))]
    [(->> sentences (find-all-relations models) 
          get-sentences (nlp-graph reftime))
     (->> sentences (mapcat relation-mentions)
          (remove #(is-fpp-mention? author %)) (filter make-link?)
          (add-hyperlinks (run-nlp (:token models) new-text)))]))

(defn fix-punct [text]
  (str/replace text #" [,\.']" #(subs %1 1)))

(defn nlp-names [graph]
  (->> graph loom/nodes
       (filter #(some #{(s/type-label %)} [s/person s/organization]))
       (map s/link-text) distinct))

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
