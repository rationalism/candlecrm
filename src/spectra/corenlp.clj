(ns spectra.corenlp
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra.schema :as s]
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
            CoreLabel]
           [edu.stanford.nlp.naturalli
            NaturalLogicAnnotations$RelationTriplesAnnotation]
           [edu.stanford.nlp.dcoref
            CorefCoreAnnotations$CorefChainAnnotation]
           [java.util Properties]))

(def sentence-annotators ["tokenize" "ssplit"])
(def token-annotators ["tokenize" "ssplit" "pos" "lemma"])
(def ner-annotators (concat token-annotators ["ner" "entitymentions"]))
(def full-annotators
  (concat ner-annotators
          (if (env :coreference) ["parse" "dcoref"] [])
          ["depparse" "natlog" "openie"]))
(def recurse-annotators
  (concat token-annotators ["depparse" "natlog" "openie"]))
(def truecase-annotators
  (concat token-annotators ["truecase"]))

(def ner-model-dir "edu/stanford/nlp/models/ner/")
(def ner-models
  (->> ["english.all.3class.distsim.crf.ser.gz"
        "english.muc.7class.distsim.crf.ser.gz"]
        ;"english.math.resume.distsim.crf.ser.gz"]
       (map #(str ner-model-dir %))))

;; Shift model supposed to be much faster, but takes much longer to load
(def shift-parse-model "edu/stanford/nlp/models/srparser/englishSR.ser.gz")
(def pcfg-parse-model "edu/stanford/nlp/models/lexparser/englishPCFG.ser.gz")

(def schema-map {"PERSON" s/person-name "DATE" s/date-time
                 "TIME" s/date-time "LOCATION" s/loc-name
                 "ORGANIZATION" s/org-name "MONEY" s/amount})

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
     (.setProperty "openie.triple.all_nominals" "true"))))

(defn load-pipeline! []
  (def ^:dynamic *pipeline*
    (make-pipeline ner-annotators pcfg-parse-model)))

(defn run-nlp-simple [pipeline text]
  ;; Global var needed for mutating Java method
  (def parsed-text (Annotation. text))
  (p :run-nlp (.annotate pipeline parsed-text))
  parsed-text)

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

(defn chain-sentences [chain]
  (->> (keys (.getMentionMap chain))
       (map #(.getSource %))
       distinct))

(defn chain-maps [chain]
  (->> chain chain-sentences
       (map #(hash-map % [chain]))))

(defn bucket-coref [coref]
  (->> (mapcat chain-maps coref)
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
  (->> (map #(.originalText %) tokens)
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
  (into [] (get-tokens entity)))

(defn ner-edge [entity]
  (when-let [schema-type (-> entity entity-type schema-map)]
    (vector (ner-node entity) schema-type s/has-type)))

(defn ner-graph [entity]
  (when (ner-edge entity)
    (loom/build-graph (list (ner-node entity))
                      (list (ner-edge entity)))))

(defn triple-nodes [triple]
  [(.-subject triple) (.-object triple)])

(defn triple-edge [triple]
  (assoc (triple-nodes triple)
         2 (.relationLemmaGloss triple)))

(defn triple-graph [triple]
  (loom/build-graph (triple-nodes triple)
                    (list (triple-edge triple))))

(defn triples-graph [triples]
  (->> triples
       (map #(triple-graph %))
       loom/merge-graphs))

(defn replace-val [map f]
  (assoc map (first (keys map))
         (f (first (vals map)))))

(defn attach-pos-map [sent-num tokens g]
  (loom/attach-all
   g (loom/nodes g)
   (tokens-pos-map sent-num tokens)
   s/pos-map))

(defn recursive-graph [sent-num tokens triples]
  (if (empty? triples)
    nil
    (->> triples triples-graph
         (attach-pos-map sent-num tokens))))
  
(defn recursive-triples [sent-num tokens]
  (->> tokens tokens-str
       (run-nlp-simple *pipeline*)
       get-sentences first get-triples
       (recursive-graph sent-num tokens)))

(defn scanned? [g node]
  (-> (loom/labeled-edges g node s/scanned)
      empty? not))

(defn tokens? [tokens]
  (cond (not (coll? tokens)) false
        :else (every? identity (map #(= CoreLabel (type %))
                                    tokens))))

(defn pos-map-node [g node]
  (->> (loom/labeled-edges g node s/pos-map)
       (map #(nth % 1)) first))

(defn pos-map-only [g]
  (pos-map-node g (first (loom/nodes g))))
  
(defn node-hash [g node sent-num]
  (if-let [pos-map (pos-map-node g node)]
    (->> node (tokens-pos sent-num)
         (map #(pos-map %)) pos-hash)
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

(declare edit-graph breakup-node)

(defn edit-graph [g sent-num edits]
  (cond
    (empty? edits) g
    (-> edits first vals first nil? not)
    (let [new-graph (-> edits first vals first)
          old-node (-> edits first keys first)]
      #(breakup-node 
        (-> (if-let [pos-map (pos-map-node g old-node)]
              (as-> new-graph $
                (loom/replace-node
                 $ (pos-map-only $)
                 (com/compose-maps (pos-map-only $) pos-map)))
              new-graph)
            vector
            (->> (loom/labeled-edges g old-node s/pos-map)
                 (loom/remove-edges g) conj)
            loom/merge-graphs
            (loom/replace-node
             old-node
             (->> (loom/nodes new-graph)
                  (filter tokens?)
                  (sort-by (fn [node]
                             (loom/count-downstream new-graph node))
                           >)
                  first))
            (dedup-graph sent-num))
        sent-num))
    :else #(breakup-node
            (reduce
             (fn [gr edit]
               (loom/attach-all
                gr (vector (first (keys edit)))
                "yes" s/scanned))
             g (take-while (fn [edit]
                             (-> edit vals first nil?))
                           edits))
            sent-num)))

(defn breakup-node [g sent-num]
  #(edit-graph
    g sent-num
    (->> (loom/nodes g)
         (filter tokens?)
         (remove (fn [x] (scanned? g x)))
         (filter (fn [x] (> (count x) 1)))
         loom/sort-nodes
         (map (fn [x] (hash-map x (recursive-triples
                                   sent-num x)))))))

(defn recursion-cleanup [g]
  (as-> g $
    (loom/remove-edges-label $ s/scanned)
    (loom/remove-edges-label $ s/pos-map)
    (loom/remove-nodes $ (loom/loners $))))

(defn stringify-node [node]
  (if (tokens? node)
    (tokens-str node) node))

(defn stringify-graph [g]
  (loom/build-graph
   (map stringify-node (loom/nodes g))
   (->> (loom/multi-edges g)
        (map #(assoc % 0 (stringify-node (nth % 0))))
        (map #(assoc % 1 (stringify-node (nth % 1)))))))

(defn pronoun-node []
  (as-> "!PRONOUN!" $
    (hash-map (com/sha1 $) $)))

(defn pronoun-edge [node]
  [node (pronoun-node) s/has-type])

(defn pronoun-graph [nodes]
  (loom/build-graph nodes (map pronoun-edge nodes)))

(def label-correction {s/person-name s/name s/org-name s/name
                       s/loc-name s/name s/email-addr s/email-addr
                       s/phone-num s/phone-num s/date-time s/date-time
                       s/amount s/amount})

(defn format-value [edge]
  (let [new-label (-> edge second label-correction)]
    (if (some #{new-label} s/repeated-attr)
      (vector (first edge)) (first edge))))

(defn label-edge [edge]
  (assoc
   {} (label-correction (second edge)) (format-value edge)
   :label (s/attr-entity (second edge))
   :hash (com/sha1 (first edge))))

(defn library-edge [text label]
  [text label s/has-type])

(defn library-ner [text]
  (loom/build-graph
   [] (concat
       (map #(library-edge % s/email-addr)
            (regex/find-email-addrs text))
       (map #(library-edge % s/phone-num)
            (regex/find-phone-nums text))
       (map #(library-edge % s/date-time)
            (dt/find-dates text)))))

(defn sentence-graph [sent-pair]
  (-> (loom/merge-graphs
       [(-> (get-triples (val sent-pair))
            triples-graph
            (breakup-node (key sent-pair))
            trampoline)
        (->> (entity-mentions (val sent-pair))
             (map #(ner-graph %))
             loom/merge-graphs)
        (-> sent-pair val .toString library-ner)])
      (dedup-graph (key sent-pair))
      recursion-cleanup
      stringify-graph))

(defn shorten-node [node]
  (hash-map (subs (key node) 0 5)
            (val node)))

(defn shorten-nodes [nodes]
  (map #(shorten-node (first %)) nodes))

(defn shorten-edge [edge]
  (-> (assoc edge 0 (shorten-node (nth edge 0)))
      (assoc 1 (shorten-node (nth edge 1)))))

(defn strip-nodes [nodes]
  (->> nodes (apply merge) vals))

(defn strip-edge [edge]
  (-> edge
      (assoc 0 (first (vals (nth edge 0))))
      (assoc 1 (first (vals (nth edge 1))))))

(defn strip-graph [g]
  (loom/build-graph
   (->> g loom/nodes strip-nodes)
   (->> g loom/multi-edges (map strip-edge))))

(defn lonely? [g pronoun]
  (as-> (loom/out-edges g pronoun) $
    (and (= (count $) 1)
         (= s/has-type (nth (first $) 2)))))

(defn find-pronouns [g]
  (->> (loom/up-nodes g (pronoun-node))
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
           (->> (find-pronouns g)
                (mapcat #(rewrite-edges g %))))
    (loom/remove-nodes $
           (find-pronouns g))
    (loom/remove-nodes $
           (->> (loom/up-nodes g (pronoun-node))
                (filter #(lonely? g %))))))

(defn sentences-text [sentences]
  (map #(.toString %) sentences))

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

(defn vectorize [node]
  (cond-> node
    (:label node) (assoc :label (-> node :label vector))
    (:hash node) (assoc :hash (-> node :hash vector))))

(defn devectorize [node]
  (cond-> node
    (:label node) (assoc :label (-> node :label first))
    (:hash node) (assoc :hash (-> node :hash first))))

(defn merge-people [people]
  (->> (map vectorize people)
       (apply merge-with concat)
       devectorize))

(defn run-nlp [pipeline text]
  (cond-> (run-nlp-simple pipeline text)
    true nlp-graph
    (env :coreference) rewrite-pronouns
    false strip-graph))

(defn run-nlp-default [text]
  (run-nlp *pipeline* text))

(defn fix-punct [text]
  (str/replace text #" [,\.']" #(subs %1 1)))

(defn nlp-names [graph]
  (->> (loom/select-edges graph s/has-type)
       (filter #(some #{(second %)} [s/person-name s/org-name]))
       distinct))

(defn correct-case [text]
  (->> (str/lower-case text)
       (run-nlp-simple (make-default-pipeline truecase-annotators))
       get-sentences (mapcat get-tokens) (map true-case)
       (str/join " ") fix-punct))

(defn name-from-email [email]
  (as-> (-> (str/split email #"@")
            first (str/replace #"[-\.\+]" " ")) $
    (when (-> $ (str/split #" ") count (> 1))
      (-> $ capitalize-words run-nlp-default nlp-names first))))

(defn normalize-person [name email default]
  (cond
    (and (com/nil-or-empty? name)
         (com/nil-or-empty? email))
    {:label default}
    (not (com/nil-or-empty? name))
    (if (com/nil-or-empty? email)
      (if-let [inferred-email (-> name regex/find-email-addrs first)]
        (if-let [parsed-name (-> name (regex/parse-name inferred-email)
                                 run-nlp-default nlp-names first)]
          (assoc (label-edge parsed-name) s/email-addr [inferred-email])
          {:label default s/email-addr [inferred-email]
           s/name (-> inferred-email regex/parse-name vector)})
        (if-let [parsed-name (-> name run-nlp-default nlp-names first)]
          (label-edge parsed-name) {:label default s/name [name]}))
      (if-let [parsed-name (-> name (regex/parse-name email)
                               run-nlp-default nlp-names first)]
        (assoc (label-edge parsed-name) s/email-addr [email])
        {:label default s/name [(regex/parse-name name email)] s/email-addr [email]}))
    :else
    (if-let [inferred-name (name-from-email email)]
      (assoc (label-edge inferred-name) s/email-addr [email])
      {:label default s/email-addr [email] :hash (com/sha1 email)})))

(defn triple-string [triple]
  (str/join "\t"
            [(.confidence triple)
             (.subjectLemmaGloss triple)
             (.relationLemmaGloss triple)
             (.objectLemmaGloss triple)]))

(defn print-triples [triples]
  (->> (map triple-string triples)
       (map #(print (str % "\n")))))
