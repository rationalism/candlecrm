(ns candlecrm.compare-test
  (:require [clojure.test :refer :all]
            [candlecrm.compare :refer :all]))

(deftest estimation-test
  (testing "Do estimation on test data"
    (is (-> 20 test-candidates
            (estimate-scores test-score)))))
