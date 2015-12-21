(ns spectra.quickml
  (:require [clojure.string :as str])
  (:import [quickml.data.instances ClassifierInstance]))

(defn adding [x y]
  (+ x y))

