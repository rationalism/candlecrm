(ns spectra.reply
  (:require [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra.weka :as weka]))

(defn count-arrows [lines]
  (->> (map #(re-seq #"^>+" %) lines)
       (remove nil?)))

(defn count-depth [lines]
  (let [arrows (count-arrows lines)]
    (if (or (nil? arrows) (empty? arrows))
      [0] (->> arrows (map first) (map count)))))

