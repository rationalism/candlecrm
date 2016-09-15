(ns candlecrm.cluster-test
  (:require [clojure.test :refer :all]
            [candlecrm.loom :as loom]
            [candlecrm.cluster :refer :all]))

(deftest make-random
  (testing "Generate a random graph"
    (is (-> 10 random-graph loom/subgraphs count (= 1)))))

(deftest random-cluster-test
  (testing "Generate, calibrate, and cluster a random graph"
    (is (-> 10 random-graph prob-weights
            (vote-clustering (prob-weight 0.01)) cluster-graph))))
