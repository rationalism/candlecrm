(ns spectra.mallet
  (:require [clojure.edn :as edn]
            [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [cc.mallet.classify NaiveBayesTrainer]
           [cc.mallet.pipe Target2Label CharSequence2TokenSequence
            TokenSequenceLowercase TokenSequence2FeatureSequence
            FeatureSequence2FeatureVector SerialPipes]
           [cc.mallet.pipe.iterator ArrayDataAndTargetIterator]
           [cc.mallet.types InstanceList]
           [java.io File FileInputStream FileOutputStream
            ObjectInputStream ObjectOutputStream]))

(defn serialize [forest filename]
  (-> (FileOutputStream. filename)
      ObjectOutputStream. 
      (.writeObject forest)))

(defn pipe []
  (SerialPipes.
   [(Target2Label.) (CharSequence2TokenSequence.
                     "[^\\s:.@]+")
    (TokenSequenceLowercase.) (TokenSequence2FeatureSequence.)
    (FeatureSequence2FeatureVector.)]))

(defn average [coll]
  (/ (apply + coll) (count coll)))

(defn make-instances
  ([lines] (make-instances (pipe) lines))
  ([pipe lines]
   (doto (InstanceList. pipe)
     (.addThruPipe (ArrayDataAndTargetIterator.
                    (map first lines) (map second lines))))))

(defn split-instances [instances]
  (->> [0.9 0.1] double-array
       (.split instances (java.util.Random.))))

(defn file-instances [filename]
  (->> filename slurp edn/read-string (apply concat)
       make-instances split-instances))

(defn make-bayes [trainfile]
  (let [[train test] (file-instances trainfile)]
    (-> (NaiveBayesTrainer.) (.train train))))

(defn vector-probs [n v]
  (->> n range (map #(.valueAtLocation v %))))

(defn classify-bayes [model lines]
  (->> lines (make-instances (.getInstancePipe model))
       (.classify model) (map #(.getLabeling %))
       (map #(vector-probs (-> model .getLabelAlphabet .size) %))))
