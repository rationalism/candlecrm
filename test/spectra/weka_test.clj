(ns spectra.weka-test
  (:require [clojure.test :refer :all]
            [spectra.weka :refer :all]))

(def train-points [[0.0 0.0 0.0 0.0]
                   [0.0 0.0 0.0 0.0]
                   [0.0 0.0 0.0 0.0]
                   [0.0 0.0 0.0 0.0]
                   [1.0 1.0 1.0 1.0]
                   [1.0 1.0 1.0 1.0]
                   [1.0 1.0 1.0 1.0]
                   [1.0 1.0 1.0 1.0]])

(deftest train-and-use
  (testing "Train and use a random forest classifier"
    (def forest (make-forest train-points))
    (is forest)
    (is (> 0.01 (classify forest [0.0 0.0 0.0])))
    (is (< 0.99 (classify forest [1.0 1.0 1.0])))))

(deftest bayes-text
  (testing "Naive Bayes classifier on strings"
    (def train-set [["The Jose Dog" "intro"] ["is a very" "para"]
                    ["furry fluffy doggy" "para"]])
    (def nb (naive-bayes train-set))
    (is (> 0.01 (first (classify-bayes nb "furry fluffy doggy"))))
    (is (< 0.99 (first (classify-bayes nb "The Jose Dog"))))))
