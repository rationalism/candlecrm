(ns spectra.nlptrain
  (:require [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra.corenlp :as nlp])
  (:import [edu.stanford.nlp.ie.crf CRFClassifier]))

(defn tokenize [infile outfile]
  (->> (slurp infile)
       (nlp/run-nlp (nlp/make-default-pipeline nlp/sentence-annotators))
       (nlp/get-sentences)
       (mapcat nlp/get-tokens)
       (map #(.originalText %))
       (str/join "\t\n")
       (spit outfile)))
