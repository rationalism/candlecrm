(ns spectra.deepnet
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [org.deeplearning4j.nn.conf
            NeuralNetConfiguration$Builder Updater]
           [org.deeplearning4j.nn.conf.distribution
            UniformDistribution]
           [org.deeplearning4j.nn.conf.layers
            GravesLSTM$Builder RnnOutputLayer$Builder]
           [org.deeplearning4j.nn.api OptimizationAlgorithm]
           [org.deeplearning4j.nn.weights WeightInit]
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
      (.build)))

