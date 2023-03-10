(ns candlecrm.mallet-test
  (:require [clojure.test :refer :all]
            [candlecrm.mallet :refer :all]))

(deftest bayes-text
  (testing "Naive Bayes classifier on strings"
    (def train-set [["The Jose Dog" "intro"] ["is a very" "para"]
                    ["furry fluffy doggy" "para"]])
    (def nb (make-bayes train-set))
    
    (is (> 0.4 (ffirst (classify-bayes nb ["furry fluffy doggy"]))))
    (is (< 0.6 (ffirst (classify-bayes nb ["The Jose Dog"]))))))
