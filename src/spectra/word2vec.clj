(ns spectra.word2vec
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.corenlp :as corenlp]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [org.deeplearning4j.text.sentenceiterator
            SentenceIterator SentencePreProcessor]
           [org.deeplearning4j.text.tokenization.tokenizer
            Tokenizer]
           [org.deeplearning4j.text.tokenization.tokenizerfactory
            TokenizerFactory]
           [java.io InputStream]))

(def sentence-annotators ["tokenize" "ssplit"])
(def token-annotators ["tokenize" "ssplit" "pos" "lemma"])

(defrecord NullSentenceProcessor []
  SentencePreProcessor
  (preProcess [this sentence] sentence))

(defrecord SentenceLoader [pos sentences]
  SentenceIterator
  (getPreProcessor [this] (->NullSentenceProcessor ))
  (setPreProcessor [this preprocessor] :default)
  (finish [this] :default)
  (hasNext [this] (< @pos (count sentences)))
  (reset [this] (reset! pos 0))
  (nextSentence [this]
                (if (.hasNext this)
                  (do (swap! pos inc)
                      (nth sentences (dec @pos)))
                  nil)))

(defn SentenceLoaderFactory [filename]
  (->> filename
       slurp
       (corenlp/run-nlp-simple (corenlp/make-default-pipeline
                                token-annotators))
       corenlp/get-sentences
       corenlp/sentences-text
       (->SentenceLoader (atom 0))))

(defrecord TokenStore [pos tokens]
  Tokenizer
  (setTokenPreProcessor [this preprocessor] :default)
  (countTokens [this] (count tokens))
  (getTokens [this] tokens)
  (hasMoreTokens [this] (< @pos (count tokens)))
  (nextToken [this]             
             (if (.hasMoreTokens this)
               (do (swap! pos inc)
                   (nth tokens (dec @pos)))
               nil)))

(defn make-token-store [pipeline words]
  (->> words
       (corenlp/run-nlp-simple pipeline)
       corenlp/get-tokens
       (map corenlp/get-lemma)
       (->TokenStore (atom 0))))
  
(defrecord TokenStoreFactory [pipeline]
  TokenizerFactory
  (^Tokenizer create [this ^String words]
          (make-token-store pipeline words))
  (^Tokenizer create [this ^InputStream words]
          (make-token-store pipeline (slurp words)))
  (setTokenPreProcessor [this preprocessor] :default))

(defn make-token-factory []
  (->TokenStoreFactory
   (corenlp/make-default-pipeline 
    token-annotators)))
