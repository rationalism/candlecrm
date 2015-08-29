(ns clojure-getting-started.corenlp
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [clojure-getting-started.graph :as graph]
            [environ.core :refer [env]])
  (:import [edu.stanford.nlp.pipeline Annotation StanfordCoreNLP]
           [edu.stanford.nlp.ling
            CoreAnnotations$SentencesAnnotation
            CoreAnnotations$MentionsAnnotation
            CoreAnnotations$EntityTypeAnnotation]
           [java.util Properties]))

(def ner-annotators ["tokenize" "ssplit" "pos" "lemma" "ner" "entitymentions"])

(def misc-key "MISC")
(def number-key "NUMBER")
(def location-key "LOCATION")
(def person-key "PERSON")
(def date-key "DATE")
(def organization-key "ORGANIZATION")

(defn make-pipeline [annotators]
  (StanfordCoreNLP.
   (doto (Properties. )
     (.setProperty "annotators" (str/join ", " annotators)))))

(defn load-pipeline! []
  (def ^:dynamic *pipeline* (make-pipeline ner-annotators)))

(defn run-nlp [pipeline text]
  ;; Global var needed for mutating Java method
  (def parsed-text (Annotation. text))
  (.annotate pipeline parsed-text)
  (.get parsed-text CoreAnnotations$SentencesAnnotation))

(defn annotation-to-map [annotation]
  {(.get annotation CoreAnnotations$EntityTypeAnnotation)
   [(.toString annotation)]})

(defn nlp-entities [pipeline text]
  (->> (run-nlp pipeline text)
       (map #(.get % CoreAnnotations$MentionsAnnotation))
       (apply concat)
       (map annotation-to-map)
       (apply merge-with concat)))

(defn name-person [name]
  (assoc {} :name name))

(defn nlp-people [entities]
  (->> (concat (entities person-key) (entities organization-key))
       (map name-person)
       distinct))
