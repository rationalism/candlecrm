(ns spectra.loom-test
  (:require [clojure.test :refer :all]
            [spectra.loom :refer :all]))

(def test-nodes [1 2 3 4 5 6 7])
(def test-edges [[1 2] [1 3] [2 4] [3 5] [3 6] [6 7]])

(def test-new-nodes [42 43 44])
(def test-new-edges [[42 43] [43 44]])

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

(deftest replacement
  (testing "Replacing a graph node"
    (def g (build-graph test-nodes test-edges))
    (is (= test-nodes
           (sort (nodes g))))
    (is (= test-edges
           (sort (edges g))))
    (def g (replace-node g 3 42))
    (is (= '(1 2 4 5 6 7 42)
           (sort (nodes g))))
    (is (= '([1 2] [1 42] [2 4] [6 7] [42 5] [42 6])
           (sort (edges g))))))

(deftest split
  (testing "Splitting a graph node"
    (def g (-> (build-graph test-nodes test-edges)
               (add-nodes test-new-nodes)
               (add-edges test-new-edges)
               (split-node 3 42 44)))
    (is (= '(1 2 4 5 6 7 42 43 44)
           (sort (nodes g))))
    (is (= '([1 2] [1 42] [2 4] [6 7] [42 43] [43 44] [44 5] [44 6])
           (sort (edges g))))))
    
    
