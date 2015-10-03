(ns spectra.word2vec
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.corenlp :as corenlp]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [org.deeplearning4j.text.sentenceiterator
            SentenceIterator SentencePreProcessor]))

(def sentence-annotators ["tokenize" "ssplit"])
(def token-annotators ["tokenize" "ssplit" "pos" "lemma"])

(defrecord NullSentenceProcessor []
  SentencePreProcessor
  (preProcess [this sentence] sentence))

(defrecord SentenceLoader [sentences pos]
  SentenceIterator
  (getPreProcessor [this] (->NullSentenceProcessor ))
  (setPreProcessor [this preprocessor] :default)
  (finish [this] :default)
  (hasNext [this]
           (if (>= @pos (count sentences))
             false true))
  (reset [this] (reset! pos 0))
  (nextSentence [this]
                (if (.hasNext this)
                  (do (swap! pos inc)
                      (nth sentences (dec @pos)))
                  nil)))

(defn SentenceLoaderFactory [filename]
  (-> token-annotators
      corenlp/make-default-pipeline
      (corenlp/run-nlp-simple (slurp filename))
      corenlp/get-sentences
      corenlp/sentences-text
      (->SentenceLoader (atom 0))))
