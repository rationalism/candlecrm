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

(deftest logit-test
  (testing "Test of logistic regression classifier"
    (def l (make-logit [[0.0 "f"] [0.5 "f"] [1.0 "t"] [1.5 "t"]]))
    (is (< (classify-logit l [0.0]) (classify-logit l [0.5])))
    
    (is (< (classify-logit l [0.5]) 0.5))
    
    (is (< 0.5 (classify-logit l [1.0])))
    
    (is (< (classify-logit l [1.0]) (classify-logit l [1.5])))))

(deftest reverse-logit-test
  (testing "Generate and reverse logit curve"
    (def l (->> train-points (repeat 10)
                (apply concat) forest-curve))
    (is (> 0.5 (reverse-logit l 0.0)))
    (is (< 0.5 (reverse-logit l 1.0)))))
