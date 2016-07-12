(ns spectra.mallet-test
  (:require [clojure.test :refer :all]
            [spectra.mallet :refer :all]))

(deftest bayes-text
  (testing "Naive Bayes classifier on strings"
    (def train-set [["The Jose Dog" "intro"] ["is a very" "para"]
                    ["furry fluffy doggy" "para"]])
    (def nb (mallet-bayes train-set))
    
    (is (> 0.01 (first (classify-bayes nb "furry fluffy doggy"))))
    (is (< 0.99 (first (classify-bayes nb "The Jose Dog"))))))
