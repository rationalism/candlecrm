(ns spectra.corenlp
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.graph :as graph]
            [spectra.regex :as regex]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [edu.stanford.nlp.pipeline Annotation StanfordCoreNLP]
           [edu.stanford.nlp.ling
            CoreAnnotations$SentencesAnnotation
            CoreAnnotations$MentionsAnnotation
            CoreAnnotations$EntityTypeAnnotation]
           [edu.stanford.nlp.naturalli
            NaturalLogicAnnotations$RelationTriplesAnnotation]
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
    (make-pipeline ner-annotators pcfg-parse-model)))

(defn load-pipeline-test! []
  (def ^:dynamic *pipeline*
    (make-pipeline ner-annotators pcfg-parse-model)))

(defn run-nlp [pipeline text]
  ;; Global var needed for mutating Java method
  (def parsed-text (Annotation. text))
  (p :run-nlp (.annotate pipeline parsed-text))
  (.get parsed-text CoreAnnotations$SentencesAnnotation))

(defn annotation-to-map [annotation]
  {(.get annotation CoreAnnotations$EntityTypeAnnotation)
   [(.toString annotation)]})

(defn nlp-entities [pipeline text]
  (if-let [entity-map
           (->> (run-nlp pipeline text)
                (map #(.get % CoreAnnotations$MentionsAnnotation))
                (apply concat)
                (map annotation-to-map)
                (apply merge-with concat))]
    entity-map {}))

(defn nlp-people [entities]
  (->> (concat (entities person-key) (entities organization-key))
       (map regex/parse-name-email)
       distinct))

(defn nlp-triples [pipeline text]
  (->> (run-nlp pipeline text)
       (map #(.get % NaturalLogicAnnotations$RelationTriplesAnnotation))
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
