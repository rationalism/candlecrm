(ns spectra.mallet
  (:require [clojure.edn :as edn]
            [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [cc.mallet.classify MaxEntTrainer NaiveBayesTrainer]
           [cc.mallet.pipe Target2Label CharSequence2TokenSequence
            TokenSequenceLowercase TokenSequence2FeatureSequence
            FeatureSequence2FeatureVector SerialPipes
            TokenSequenceNGrams]
           [cc.mallet.pipe.iterator ArrayIterator
            ArrayDataAndTargetIterator]
           [cc.mallet.types InstanceList]))

(defn pipe []
  (SerialPipes.
   [(Target2Label.) (CharSequence2TokenSequence. "[^\\s:.@]+")
    (TokenSequenceLowercase.)
    (TokenSequence2FeatureSequence.)
    (FeatureSequence2FeatureVector.)]))

(defn average [coll]
  (/ (apply + coll) (count coll)))

(defn make-instances [model lines]
  (doto (InstanceList. (.getInstancePipe model))
    (.addThruPipe (->> model .getLabelAlphabet .toArray first
                       (repeat (count lines))
                       (ArrayDataAndTargetIterator. lines)))))

(defn train-instances [lines]
  (doto (InstanceList. (pipe))
    (.addThruPipe (ArrayDataAndTargetIterator.
                   (map first lines) (map second lines)))))

(defn split-instances [instances]
  (->> [0.99 0.01] double-array
       (.split instances (java.util.Random.))))

(defn file-instances [filename]
  (->> filename slurp edn/read-string (apply concat)
       train-instances split-instances))

(defn make-bayes [train-data]
  (let [[train test] (->> train-data train-instances split-instances)]
    (-> (MaxEntTrainer.) (.train train))))

(defn vector-probs [n v]
  (->> n range (map #(.valueAtLocation v %))))

(defn classify-bayes [model lines]
  (->> lines (make-instances model)
       (.classify model) (map #(.getLabeling %))
       (map #(vector-probs (-> model .getLabelAlphabet .size) %))))
