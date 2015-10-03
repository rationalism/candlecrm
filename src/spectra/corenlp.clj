(ns spectra.corenlp
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.common :as com]
            [spectra.graph :as graph]
            [spectra.regex :as regex]
            [loom.graph :as loom]
            [loom.io :as gviz]
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
            CoreAnnotations$LemmaAnnotation]
           [edu.stanford.nlp.naturalli
            NaturalLogicAnnotations$RelationTriplesAnnotation]
           [edu.stanford.nlp.dcoref
            CorefCoreAnnotations$CorefChainAnnotation]
           [java.util Properties]))

(def ner-annotators
  (concat ["tokenize" "ssplit" "pos" "lemma" "ner"]
          (if (env :coreference) ["parse" "dcoref"] [])
          ["depparse" "natlog" "openie" "entitymentions"]))

(def ner-model-file "edu/stanford/nlp/models/ner/english.all.3class.distsim.crf.ser.gz")

;; Shift model supposed to be much faster, but takes much longer to load
(def shift-parse-model "edu/stanford/nlp/models/srparser/englishSR.ser.gz")
(def pcfg-parse-model "edu/stanford/nlp/models/lexparser/englishPCFG.ser.gz")

(def misc-key "MISC")
(def number-key "NUMBER")
(def location-key "LOCATION")
(def person-key "PERSON")
(def date-key "DATE")
(def organization-key "ORGANIZATION")

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
     (.setProperty "ner.model" ner-model-file)
     (.setProperty "parse.model" parse-model)
     (.setProperty "openie.triple.all_nominals" "true"))))

(defn load-pipeline! []
  (def ^:dynamic *pipeline*
    (make-pipeline ner-annotators pcfg-parse-model)))

(defn chain-sentences [chain]
  (->> (keys (.getMentionMap chain))
       (map #(.getSource %))
       distinct))

(defn chain-maps [chain]
  (->> chain
       chain-sentences
       (map #(hash-map % [chain]))))

(defn bucket-coref [coref]
  (->> coref
       (map chain-maps)
       (apply concat)
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
    candidate
    (blank-coref candidate)))

(defn single-map [pair]
  {(key pair) (val pair)})

(defn split-map [m]
  (map single-map m))

(defn pronoun? [tokens]
  (cond
    (not= (count tokens) 1) false
    (some #(= % (-> tokens first
                    (.get CoreAnnotations$PartOfSpeechAnnotation)))
          pronoun-parts) true
          :else false))

(defn tokens-hash [sent-num tokens]
  (->> tokens
       (map #(.index %))
       (map str)
       (map #(str sent-num " " %))
       (str/join " ")
       com/sha1))

(defn mention-hash [mention]
  (->> (range (.startIndex mention)
              (.endIndex mention))
       (map str)
       (map #(str (.sentNum mention) " " %))
       (str/join " ")
       com/sha1))

(defn mention-nodes [nodes]
  (zipmap (map mention-hash nodes)
          (map #(.mentionSpan %) nodes)))

(defn filter-singles [nodes]
  (if (< (count nodes) 2)
    '() nodes))

(defn chain-nodes [chain]
  (->> chain
       (.getMentionMap)
       vals
       (map #(into '() %))
       (apply concat)
       mention-nodes
       split-map
       filter-singles))

(defn root-node [chain]
  (as-> (.getRepresentativeMention chain) $
    (hash-map (mention-hash $) (.mentionSpan $))))

(defn chain-edges [chain]
  (->> chain
       chain-nodes
       (map #(vector % (root-node chain) "!is!"))
       (filter #(not= (nth % 0)
                      (nth % 1)))))

(defn build-graph [nodes edges]
  (as-> (loom/weighted-digraph) $
    (apply loom/add-nodes $ nodes)
    (apply loom/add-edges $ edges)))

(defn chain-graph [chain]
  (build-graph (chain-nodes chain)
               (chain-edges chain)))

(defn coref-graph [coref]
  (apply loom/weighted-digraph
         (map chain-graph coref)))

(defn get-tokens [words]
  (.get words CoreAnnotations$TokensAnnotation))

(defn get-sentences [parsed-text]
  (.get parsed-text CoreAnnotations$SentencesAnnotation))

(defn get-lemma [token]
  (.get token CoreAnnotations$LemmaAnnotation))

(defn ner-node [entity sent-num]
  (hash-map (tokens-hash sent-num(get-tokens entity))
            (.toString entity)))

(defn ner-edge [entity sent-num]
  (vector (ner-node entity sent-num)
          (as-> (.get entity CoreAnnotations$EntityTypeAnnotation) $
            (hash-map (com/sha1 $) $))
            "!type!"))

(defn ner-graph [entity sent-num]
  (build-graph (list (ner-node entity sent-num))
               (list (ner-edge entity sent-num))))

(defn triple-nodes [triple sent-num]
  (split-map
   (zipmap
    (->> [(.-subject triple) (.-object triple)]
         (map #(tokens-hash sent-num %)))
    [(.subjectLemmaGloss triple) (.objectLemmaGloss triple)])))

(defn triple-edge [triple sent-num]
  (as-> (triple-nodes triple sent-num) $
    (vector (nth $ 0) (nth $ 1)
            (.relationLemmaGloss triple))))

(defn triple-graph [triple sent-num]
  (build-graph (triple-nodes triple sent-num)
               (list (triple-edge triple sent-num))))

(defn pronoun-node []
  (as-> "!PRONOUN!" $
    (hash-map (com/sha1 $) $)))

(defn pronoun-edge [node]
  [node (pronoun-node) "!type!"])

(defn pronoun-graph [nodes]
  (build-graph nodes (map pronoun-edge nodes)))

(defn sentence-graph [sent-pair]
  (loom/weighted-digraph
   (->> (.get (val sent-pair)
              NaturalLogicAnnotations$RelationTriplesAnnotation)
        (map #(triple-graph % (key sent-pair)))
        (apply loom/weighted-digraph))
   (->> (.get (val sent-pair)
              CoreAnnotations$MentionsAnnotation)
        (map #(ner-graph % (key sent-pair)))
        (apply loom/weighted-digraph))
   (->> (get-tokens (val sent-pair))
        (map list)
        (filter pronoun?)
        (map #(hash-map (tokens-hash (key sent-pair) %)
                        (.originalText (first %))))
        pronoun-graph)))

(defn shorten-node [node]
  (hash-map (subs (key node) 0 5)
            (val node)))

(defn shorten-nodes [nodes]
  (map #(shorten-node (first %)) nodes))

(defn weighted-edge [g edge]
  (conj edge (loom/weight g edge)))

(defn shorten-edge [edge]
  (vector (-> edge (nth 0) first shorten-node)
          (-> edge (nth 1) first shorten-node)
          (-> edge (nth 2))))

(defn strip-nodes [nodes]
  (->> nodes (apply merge) vals))

(defn strip-edge [edge]
  (vector (-> edge (nth 0) vals first)
          (-> edge (nth 1) vals first)
          (-> edge (nth 2))))

(defn strip-graph [g]
  (build-graph
   (->> g loom/nodes strip-nodes)
   (->> g loom/edges
        (map #(weighted-edge g %))
        (map strip-edge))))

(defn out-edges [g node]
  (->> (loom/out-edges g node)
       (map #(weighted-edge g %))))
  
(defn referenced? [g pronoun]
  (->> (out-edges g pronoun)
       (filter #(= "!is!" (nth % 2)))
       count
       (= 1)))

(defn up-nodes [g node]
  (->> (loom/in-edges g node)
       (map first)))

(defn lonely? [g pronoun]
  (as-> (out-edges g pronoun) $
    (and (= (count $) 1)
         (= "!type!"
            (nth (first $) 2)))))

(defn find-pronouns [g]
  (->> (up-nodes g (pronoun-node))
       (filter #(referenced? g %))))

(defn find-referent [g pronoun]
  (->> (out-edges g pronoun)
       (filter #(= "!is!" (nth % 2)))
       first second))

(defn rewrite-edges [g pronoun]
  (->> (out-edges g pronoun)
       (filter #(not= "!is!" (nth % 2)))
       (filter #(not= "!type!" (nth % 2)))
       (map #(com/slice 1 3 %))
       (map #(into (vector (find-referent g pronoun))
                   %))))

(defn rewrite-pronouns [g]
  (as-> g $
    (apply loom/add-edges $
           (->> g find-pronouns
                (map #(rewrite-edges g %))
                (apply concat)))
    (apply loom/remove-nodes $
           (find-pronouns g))
    (apply loom/remove-nodes $
           (->> (up-nodes g (pronoun-node))
                (filter #(lonely? g %))))))

(defn sentences-text [sentences]
  (map #(.toString %) sentences))

(defn nlp-graph [parsed-text]
  (cond->
      (->> parsed-text
           get-sentences
           number-items
           (map sentence-graph)
           (apply loom/weighted-digraph))
    (env :coreference)
    (loom/weighted-digraph
     (-> parsed-text
         (.get CorefCoreAnnotations$CorefChainAnnotation)
         vals
         coref-graph))))

(defn run-nlp-simple [pipeline text]
  ;; Global var needed for mutating Java method
  (def parsed-text (Annotation. text))
  (p :run-nlp (.annotate pipeline parsed-text))
  parsed-text)
  
(defn run-nlp [pipeline text]
  (cond-> (run-nlp-simple pipeline text)
    true nlp-graph
    (env :coreference) rewrite-pronouns
    true strip-graph))

(defn graph-entities [g]
  (if-let [entity-map
           (->> g loom/edges
                (map #(weighted-edge g %))
                (filter #(= "!type!" (nth % 2)))
                (map #(hash-map (nth % 1) (list (nth % 0))))
                (apply merge-with concat))]
    entity-map {}))

(defn nlp-people [entities]
  (->> (concat (entities person-key) (entities organization-key))
       (map regex/parse-name-email)
       distinct))

(defn triple-string [triple]
  (str/join "\t"
            [(.confidence triple)
             (.subjectLemmaGloss triple)
             (.relationLemmaGloss triple)
             (.objectLemmaGloss triple)]))

(defn print-triples [triples]
  (->> triples
       (map triple-string)
       (map #(print (str % "\n")))))
