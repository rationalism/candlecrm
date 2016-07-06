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
            EntityMentionFactory ExtractionObject
            RelationMention RelationMentionFactory
            MachineReadingAnnotations$EntityMentionsAnnotation
            MachineReadingAnnotations$RelationMentionsAnnotation]
           [java.util Properties] [java.util.logging Level]))

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

(def rel-sentences (atom []))

(defn save-rels [filename]
  (weka/serialize @rel-sentences filename))

(defn load-rels [filename]
  (->> filename weka/deserialize
       (reset! rel-sentences)))

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

(defn get-tree [sentence]
  (.get sentence TreeCoreAnnotations$TreeAnnotation))

(defn get-coref [parsed-text]
  (.get parsed-text
        edu.stanford.nlp.hcoref.CorefCoreAnnotations$CorefChainAnnotation))

(defn get-relations [parsed-text]
  (.get parsed-text MachineReadingAnnotations$RelationMentionsAnnotation))

(defn relation-mentions [sentence]
  (.get sentence MachineReadingAnnotations$EntityMentionsAnnotation))

(defn true-case [token]
  (.get token CoreAnnotations$TrueCaseTextAnnotation))

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

(defn number-items [items]
  (zipmap (map inc (range (count items)))
          items))

(defn ner-graph [reftime entity]
  (when-let [node-type (-> entity .getType s/schema-map s/entity-map)]
    (-> {s/type-label node-type}
        (merge {s/link-text (.getExtentString entity)})
        (merge {s/hash-code (str "hc" (.hashCode entity))})
        (merge (condp some [node-type]
                 #{s/event}
                 (let [node-dates (-> entity .getExtentString
                                      (dt/dates-in-text reftime))]
                   (condp = (count node-dates)
                     1 {s/event-begin (first node-dates)}
                     2 {s/event-begin (first node-dates)
                        s/event-end (second node-dates)}
                     {s/date-time node-dates}))
                 #{s/person s/organization}
                 (-> entity .getExtentString regex/parse-name-email)
                 {(-> entity .getType s/schema-map s/label-correct)
                  (.getExtentString entity)}))
        vector (loom/build-graph []))))

(defn add-link [g node]
  (loom/add-edge g [{s/type-label s/hyperlink
                     s/link-id (s/hash-code node)}
                    node s/link-to]))

(defnc add-links [g]
  (reduce add-link g (loom/nodes g)))

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

(defnp library-annotate-all [annotation]
  (->> (get-sentences annotation)
       (map library-annotate)
       (.set annotation CoreAnnotations$SentencesAnnotation))
  annotation)

(defn remove-bad-dates [mentions]
  (remove #(and (-> % .getType s/schema-map (= s/date-time))
                (->> % .getExtentString dt/dates-in-text empty?)
                #_(->> % .getExtentString dt/is-bad-date?))
          mentions))

(defn entity-mentions [sentence]
  (->> sentence relation-mentions remove-bad-dates))

(defn relation-id [relation]
  (mapcat (juxt #(.getHeadTokenStart %)
                #(.getHeadTokenEnd %))
          (.getEntityMentionArgs relation)))

(defn cross-relations [[a b]]
  (for [fm a sm b]
    (blank-relation fm sm)))

(defn split-relations [sentence]
  (let [type-map (->> sentence entity-mentions
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
  (->> sentence entity-mentions
       (map #(ner-graph reftime %))
       (remove nil?) loom/merge-graphs))

(defn has-rel-candidates? [sentence]
  (let [rel-set (->> s/relation-types keys (map set) set)
        rel-map (->> s/relation-types keys (apply concat) distinct
                     (mapv #(vector % %)) (into {}))
        nodes (->> sentence entity-mentions
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
  (->> doc get-sentences
       (map #(find-relations models %))
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

(defnc relation-graph [ner-graph relation]
  (let [rel-type (-> relation .getType s/relation-map)
        graph-map (->> ner-graph loom/nodes (mapkeys s/hash-code))
        old-node (->> relation .getEntityMentionArgs
                      first .hashCode (str "hc") graph-map)]
    (if (some #{rel-type} s/is-attr)
      (->> relation .getEntityMentionArgs second .getExtentString
           vector (hash-map rel-type) (merge-with concat old-node)
           (loom/replace-node ner-graph old-node))
      (->> relation .getEntityMentionArgs reverse
           (map #(str "hc" (.hashCode %))) (map graph-map)
           (cons rel-type) reverse vec vector
           (loom/add-edges ner-graph)))))

(defnc relations-graph [ner-graph relations]
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

(defnc fpp-replace [models author text]
  (->> text (sentence-split models) (map get-tokens)
       (map first) (map #(.beginPosition %))
       (mapcat #(repeat 2 %)) (cons 0)
       (partition-all 2) (map #(apply subs text %))
       (fpp-merge author)))

(defn strip-parens [text]
  (replace-all text ["(" ")"]))

(defn hash-brackets [code text]
  (str "<node " code ">" text "</node>"))

(defn url-brackets [url]
  (str "<url>" url "</url>"))

(defn mention-chars [mention]
  (let [tokens (-> mention .getSentence get-tokens vec)]
    [(->> mention .getExtentTokenStart (nth tokens) .beginPosition)
     (->> mention .getExtentTokenEnd dec (nth tokens) .endPosition)]))

(defn mention-link [mention]
  (if (-> mention .getType s/schema-map (= s/webpage))
    (->> mention .getExtentString url-brackets)
    (->> mention .getExtentString
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

(defnc add-hyperlinks [annotation mentions]
  (let [mmap (switch-map annotation mentions)]
    (->> mmap (mapcat second) (cons 0) (partition-all 2)
         (map #(apply (partial subs (.toString annotation)) %))
         (interleave (cons "" (map switch-val mmap)))
         (str/join ""))))

(defnc sentence-graph [reftime sent-pair]
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

(defnc run-nlp-ner [models text]
  (->> text (run-nlp (:ner models))
       library-annotate-all
       (run-annotate (:mention models))
       (run-annotate (:entity models))))

(defnp sentence-parse [models text]
  (->> (update text 1 strip-parens)
       (apply (partial fpp-replace models))
       (run-nlp-ner models) get-sentences))

(defnc run-nlp-default [models text]
  (->> text (run-nlp-ner models)
       get-sentences nlp-graph))

(defn make-link? [mention]
  (let [m-type (-> mention .getType s/schema-map)]
    (or (s/entity-map m-type)
        (= m-type s/webpage))))

(defn is-fpp-mention? [author mention]
  (and (= 0 (.getHeadTokenStart mention))
       (= author (.getValue mention))))

(defnc run-nlp-full [models author reftime text]
  (let [new-text (->> text strip-parens
                      (fpp-replace models author))
        sentences (run-nlp-ner models new-text)]
    [(->> sentences (find-all-relations models) 
          get-sentences (nlp-graph reftime))
     (->> sentences get-sentences (mapcat entity-mentions)
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
