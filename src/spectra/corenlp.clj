(ns spectra.corenlp
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.common :as com]
            [spectra.graph :as graph]
            [spectra.regex :as regex]
            [loom.graph :as loom]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [edu.stanford.nlp.pipeline Annotation StanfordCoreNLP]
           [edu.stanford.nlp.ling
            CoreAnnotations$SentencesAnnotation
            CoreAnnotations$MentionsAnnotation
            CoreAnnotations$EntityTypeAnnotation
            CoreAnnotations$TokensAnnotation]
           [edu.stanford.nlp.naturalli
            NaturalLogicAnnotations$RelationTriplesAnnotation]
           [edu.stanford.nlp.dcoref
            CorefCoreAnnotations$CorefChainAnnotation]
           [java.util Properties]))

(def ner-annotators ["tokenize" "ssplit" "pos" "lemma" "ner" "parse" "dcoref"
                     "depparse" "natlog" "openie" "entitymentions"])
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
    (make-pipeline ner-annotators shift-parse-model)))

(defn load-pipeline-test! []
  (def ^:dynamic *pipeline*
    (make-pipeline ner-annotators pcfg-parse-model)))

(defn chain-sentences [chain]
  (->> (keys (.getMentionMap chain))
       (map #(.getSource %))
       distinct))

(defn make-map [k v]
  {k v})

(defn chain-maps [chain]
  (->> chain
       chain-sentences
       (map #(make-map % [chain]))))

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

(defn chain-nodes [chain]
  (->> chain
       (.getMentionMap)
       vals
       (map #(into '() %))
       (apply concat)
       mention-nodes
       split-map))

(defn root-node [chain]
  (as-> (.getRepresentativeMention chain) $
    (hash-map (mention-hash $) (.mentionSpan $))))

(defn chain-edges [chain]
  (->> chain
       chain-nodes
       (map #(vector % (root-node chain) "!is!"))
       (filter #(not (= (nth % 0)
                        (nth % 1))))))

(defn chain-graph [chain]
  (as-> (loom/weighted-digraph) $
    (apply loom/add-nodes $ (chain-nodes chain))
    (apply loom/add-edges $ (chain-edges chain))))

(defn coref-graph [coref]
  (apply loom/weighted-digraph
         (map chain-graph coref)))

(defn ner-node [entity sent-num]
  (hash-map (tokens-hash
             sent-num
             (.get entity CoreAnnotations$TokensAnnotation))
            (.toString entity)))

(defn ner-edge [entity sent-num]
  (vector (ner-node entity sent-num)
          (as-> (.get entity CoreAnnotations$EntityTypeAnnotation) $
            (hash-map (com/sha1 $) $))
            "!type!"))

;(defn triple-nodes [triple sent-num]
;  (->> [(.-subject triple) (.-object triple)]
;       (map #(hash-map 

(defn run-nlp [pipeline text]
  ;; Global var needed for mutating Java method
  (def parsed-text (Annotation. text))
  (p :run-nlp (.annotate pipeline parsed-text))
  (->>
   (merge-with merge-coref
               (-> parsed-text
                   (.get CoreAnnotations$SentencesAnnotation)
                   number-items)
               (-> parsed-text
                   (.get CorefCoreAnnotations$CorefChainAnnotation)
                   vals
                   bucket-coref))
   vals (map fill-in-corefs)))

(defn annotation-to-map [annotation]
  {(.get annotation CoreAnnotations$EntityTypeAnnotation)
   [(.toString annotation)]})

(defn nlp-entities [pipeline text]
  (if-let [entity-map
           (->> (run-nlp pipeline text)
                sentences
                (map #(.get % CoreAnnotations$MentionsAnnotation))
                (apply concat)
                (map annotation-to-map)
                (apply merge-with concat))]
    entity-map {}))

(defn nlp-people [entities]
  (->> (concat (entities person-key) (entities organization-key))
       (map regex/parse-name-email)
       distinct))

(defn sentence-triples [sentence]
  (map #(.get % NaturalLogicAnnotations$RelationTriplesAnnotation)
       sentence))

(defn nlp-triples [pipeline text]
  (->> (sentences (run-nlp pipeline text))
       sentence-triples
       (apply concat)))

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
