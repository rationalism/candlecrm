(ns spectra.cluster-test
  (:require [clojure.test :refer :all]
            [spectra.loom :as loom]
            [spectra.cluster :refer :all]))

(deftest make-random
  (testing "Generate a random graph"
    (is (-> 10 random-graph loom/subgraphs count (= 1)))))
