(ns spectra.loom-test
  (:require [clojure.test :refer :all]
            [spectra.loom :refer :all]))

(def test-nodes [1 2 3 4 5 6 7])
(def test-edges [[1 2 :cat] [1 2 :horse] [1 3 :dog] [2 4 :fish]
                 [3 5 :bear] [3 5 :rat] [3 6 :fox] [6 7 :cow]])

(def test-new-nodes [42 43 44])
(def test-new-edges [[42 43 :pig] [43 44 :goat]])

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
           (sort (multi-edges g))))
    (def g (replace-node g 3 42))
    (is (= '(1 2 4 5 6 7 42)
           (sort (nodes g))))
    (is (= '([1 2 :cat] [1 2 :horse] [1 42 :dog] [2 4 :fish]
           [6 7 :cow] [42 5 :bear] [42 5 :rat] [42 6 :fox])
           (sort (multi-edges g))))))

(deftest split
  (testing "Splitting a graph node"
    (def g (-> (build-graph test-nodes test-edges)
               (add-nodes test-new-nodes)
               (add-edges test-new-edges)
               (split-node 3 42 44)))
    (is (= '(1 2 4 5 6 7 42 43 44)
           (sort (nodes g))))
    (is (= '([1 2 :cat] [1 2 :horse] [1 42 :dog] [2 4 :fish] [6 7 :cow]
             [42 43 :pig] [43 44 :goat] [44 5 :bear] [44 5 :rat] [44 6 :fox])
           (sort (multi-edges g))))))

(deftest spider
  (testing "Spidering a graph"
    (def g (build-graph test-nodes test-edges))
    (is (= (spider-edges g '())
           '(([3 5 :bear]) ([1 2 :cat]) ([3 5 :rat]) ([1 2 :horse] [2 4 :fish]) ([1 3 :dog] [3 6 :fox] [6 7 :cow]))))))

(deftest graph-components
  (testing "Find connected components in a graph"
    (def g (build-graph [] [[1 2 1] [1 3 1] [1 4 1] [2 4 1]
                            [4 5 1] [5 6 1] [6 7 1] [8 9 1]
                            [10 11 1] [11 12 1] [12 13 1]]))
    (is (->> g subgraphs (map set) set
             (= #{#{7 1 4 6 3 2 5} #{9 8} #{13 12 11 10}})))))
