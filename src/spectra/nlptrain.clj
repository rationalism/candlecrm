(ns spectra.nlptrain
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.corenlp :as nlp]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [edu.stanford.nlp.ie.crf CRFClassifier]))

(defn tokenize [infile outfile]
  (->> (slurp infile)
       (nlp/run-nlp (nlp/make-default-pipeline nlp/sentence-annotators))
       (nlp/get-sentences)
       (mapcat nlp/get-tokens)
       (map #(.originalText %))
       (str/join "\t\n")
       (spit outfile)))
