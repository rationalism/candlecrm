(ns spectra.loom-test
  (:require [clojure.test :refer :all]
            [spectra.loom :refer :all]))

(def test-nodes [1 2 3 4 5 6 7])
(def test-edges [[1 2] [1 3] [2 4] [3 5] [3 6] [6 7]])

(deftest count-stream
  (testing "Test upstream and downstream counts"
    (def g (build-graph test-nodes test-edges))
    (def down-counts [6 1 3 0 0 1 0])
    (dotimes [i 7]
      (is (= (nth down-counts i)
             (count-downstream g (nth test-nodes i)))))
    (def up-counts [0 1 1 2 2 2 3])
    (dotimes [i 7]
      (is (= (nth up-counts i)
             (count-upstream g (nth test-nodes i)))))))
