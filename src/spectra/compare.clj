(ns spectra.compare
  (:require [clojure.string :as str]
            [spectra.common :as com]))

(def random-limit 20)

(defn random-candidates [n]
  (->> #(* 100 (rand-int random-limit))
       (repeatedly n)
       (zipmap (range n))))

