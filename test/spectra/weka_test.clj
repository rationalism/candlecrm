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
    (def forest (make-forest 100 train-points))
    (is forest)
    (is (= 0.0 (classify forest [0.0 0.0 0.0])))
    (is (= 1.0 (classify forest [1.0 1.0 1.0])))))