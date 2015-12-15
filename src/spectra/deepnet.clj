(ns spectra.deepnet
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.common :as com]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [org.deeplearning4j.datasets.iterator DataSetIterator]
           [org.deeplearning4j.nn.conf
            NeuralNetConfiguration$Builder Updater]
           [org.deeplearning4j.nn.conf.distribution UniformDistribution]
           [org.deeplearning4j.nn.conf.layers
            GravesLSTM$Builder RnnOutputLayer$Builder]
           [org.deeplearning4j.nn.api OptimizationAlgorithm]
           [org.deeplearning4j.nn.weights WeightInit]
           [org.deeplearning4j.nn.multilayer MultiLayerNetwork]
           [org.deeplearning4j.optimize.listeners ScoreIterationListener]
           [org.nd4j.linalg.factory Nd4j]
           [org.nd4j.linalg.lossfunctions
            LossFunctions$LossFunction]))

;; Example parameters at http://deeplearning4j.org/lstm.html#code
(def sgd-algorithm OptimizationAlgorithm/STOCHASTIC_GRADIENT_DESCENT)
(def mcxent-loss LossFunctions$LossFunction/MCXENT)
(def iterations 1)
(def learn-rate 0.1)
(def rms-decay 0.95)
(def rnd-seed 12345)
(def regularization true)
(def l2 0.001)
(def list-num 3)
(def layer-size 200)
(def dist-bound 0.08)

(defn int-wrap [coll]
  (into-array Integer/TYPE coll))

(defn dim-array [data-size]
  (int-wrap ((juxt :series-count :dims :series-length) data-size)))

(defn make-zeros [data-size]
  (Nd4j/zeros (dim-array data-size)))

(defn inc-mod [pos data-size]
  (mod (inc pos) (:dims data-size)))

(defn add-low-ones [pos data-size matrix]
  (doseq [n (range (:series-length data-size))]
    (.putScalar matrix (int-wrap [pos 0 n]) 1.0))
  matrix) 

(defn one-pos [pos n data-size matrix]
  (->> (range (:dims data-size))
       (map #(when-not (= 0.0 (.getFloat matrix (int-wrap [pos % n]))) %))
       (drop-while nil?) first))

(defn increment [pos n data-size matrix]
  (let [old-pos (one-pos pos n data-size matrix)]
    (.putScalar matrix (int-wrap [pos old-pos n]) 0.0)
    (.putScalar matrix (int-wrap [pos (inc-mod old-pos data-size) n]) 1.0)
    matrix))
  
;; train-data should be a three-dimensional vector here
(defrecord TimeSeriesIterator [pos data-size train-data]
  DataSetIterator
  (batch [this] 1)
  (cursor [this] @pos)
  (inputColumns [this] (:dims data-size))
  (next [this series-count] :default) ;; FIX THIS        
  (numExamples [this] (:series-count data-size))
  (reset [this] (reset! pos 0))
  (setPreProcessor [this preprocessor] :default)
  (totalExamples [this] (:series-count data-size))
  (totalOutcomes [this] (:dims data-size)))

(defn lstm-layer [input-size]
  (-> (GravesLSTM$Builder. )
      (.nIn input-size)
      (.nOut layer-size)
      (.updater Updater/RMSPROP)
      (.activation "tanh")
      (.weightInit WeightInit/DISTRIBUTION)
      (.dist (UniformDistribution.
              (- dist-bound) dist-bound))
      (.build)))

(defn rnn-out-layer [output-size]
  (-> (RnnOutputLayer$Builder. mcxent-loss)
      (.activation "softmax")
      (.updater Updater/RMSPROP)
      (.nIn layer-size)
      (.nOut output-size)
      (.weightInit WeightInit/DISTRIBUTION)
      (.dist (UniformDistribution.
              (- dist-bound) dist-bound))
      (.build)))

(defn setup-lstm [input-iter]
  (-> (NeuralNetConfiguration$Builder. )
      (.optimizationAlgo sgd-algorithm)
      (.iterations iterations)
      (.learningRate learn-rate)
      (.rmsDecay rms-decay)
      (.seed rnd-seed)
      (.regularization regularization)
      (.l2 l2)
      (.list list-num)
      (.layer 0 (lstm-layer (.inputColumns input-iter)))
      (.layer 1 (lstm-layer layer-size))
      (.layer 2 (rnn-out-layer (.totalOutcomes input-iter)))
      (.pretrain false)
      (.backprop true)
      (.build)
      (MultiLayerNetwork. )))

(defn train-lstm [input-iter]
  (doto (setup-lstm input-iter)
    (.init)
    (.setListeners (ScoreIterationListener. 1))
    (.fit input-iter)))

