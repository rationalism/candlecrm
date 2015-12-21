(ns spectra.weka
  (:require [clojure.string :as str])
  (:import [weka.classifiers.trees RandomForest]))

(defn adding [x y]
  (+ x y))

