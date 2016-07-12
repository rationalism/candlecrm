(ns spectra.mallet
  (:require [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [cc.mallet.pipe Target2Label CharSequence2TokenSequence
            TokenSequenceLowercase TokenSequence2FeatureSequence
            FeatureSequence2FeatureVector SerialPipes]
           [cc.mallet.pipe.iterator ArrayDataAndTargetIterator]
           [cc.mallet.types InstanceList]))

(defn pipe []
  (SerialPipes.
   [(Target2Label.) (CharSequence2TokenSequence.)
    (TokenSequenceLowercase.) (TokenSequence2FeatureSequence.)
    (FeatureSequence2FeatureVector.)]))

(defn make-instances [lines]
  (doto (InstanceList. (pipe))
    (.addThruPipe (ArrayDataAndTargetIterator.
                   (map first lines) (map second lines)))))
