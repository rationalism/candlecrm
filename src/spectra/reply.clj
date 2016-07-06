(ns spectra.reply
  (:require [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra.corenlp :as nlp]
            [spectra.weka :as weka]))

(defn count-arrows [lines]
  (->> (map #(re-seq #"^>+" %) lines)
       (remove nil?)))

(defn count-depth [lines]
  (let [arrows (count-arrows lines)]
    (if (or (nil? arrows) (empty? arrows))
      [0] (->> arrows (map first) (map count)))))

(defn header-ranges [sep-model lines]
  (->> lines count range (zipvec lines)
       (mapvals #(weka/is-header? sep-model (first %)))
       (into []) (partition-by second)
       (filter #(-> % first second)) (map #(map first %))))
