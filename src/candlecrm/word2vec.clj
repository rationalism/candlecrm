(ns candlecrm.word2vec
  (:require [candlecrm.common :refer :all]
            [candlecrm.corenlp :as nlp]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [org.deeplearning4j.text.sentenceiterator
            SentenceIterator SentencePreProcessor]
           [org.deeplearning4j.text.tokenization.tokenizer
            Tokenizer]
           [org.deeplearning4j.text.tokenization.tokenizerfactory
            TokenizerFactory]
           [org.deeplearning4j.models.word2vec
            Word2Vec$Builder]
           [java.io InputStream]))

;; Description of parameter meanings at
;; http://deeplearning4j.org/word2vec.html
(def batch-size 1000)
(def iterations 30)
(def layer-size 300)
(def sampling 0.00001)
(def min-word-freq 5)
(def use-adagrad false)
(def learn-rate 0.025)
(def min-learn-rate 0.01)
(def neg-sample 10)

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
                (when (.hasNext this)
                  (swap! pos inc)
                  (nth sentences (dec @pos)))))

(defn SentenceLoaderFactory [filename]
  (->> filename slurp
       (nlp/run-nlp (nlp/make-default-pipeline
                     nlp/sentence-annotators))
       nlp/get-sentences (map str)
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
  (->> (nlp/run-nlp pipeline words)
       nlp/get-tokens (map nlp/get-lemma)
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
   (nlp/make-default-pipeline 
    nlp/token-annotators)))

(defn make-model [filename]
  (let [vec-model
        (-> (Word2Vec$Builder. )
            (.batchSize batch-size)
            (.sampling sampling)
            (.minWordFrequency min-word-freq)
            (.useAdaGrad use-adagrad)
            (.layerSize layer-size)
            (.iterations iterations)
            (.learningRate learn-rate)
            (.minLearningRate min-learn-rate)
            (.negativeSample neg-sample)
            (.iterate (SentenceLoaderFactory filename))
            (.tokenizerFactory (make-token-factory))
            .build atom)]
    (p :train-word2vec (.fit @vec-model))
    @vec-model))