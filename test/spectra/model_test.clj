(ns spectra.model-test
  (:require [clojure.test :refer :all]
            [spectra.model :refer :all]))

(deftest lcs-test
  (testing "Find the longest common substring"
    (is (= default-score (lcs [] [])))
    (is (= default-score (lcs [""] [""])))
    (is (= 0 (lcs ["abcdef"] ["ghijkl"])))
    (is (= 1/2 (lcs ["catdog"] ["dogcat"])))
    (is (= 1 (lcs ["catdog"] ["catdog"])))))

(deftest overlap-test
  (testing "Find the overlap between sets"
    (is (= default-score (overlap [:dog] [])))
    (is (= 1.0 (overlap [:dog] [:dog])))
    (is (= 0.5 (overlap [:dog :fish] [:dog :cat])))
    (is (= 0.0 (overlap [:dog] [:doge])))))

(deftest abs-test
  (testing "Absolute value"
    (is (= default-score (abs [] [])))
    (is (= 0.0 (abs [3.0] [3.0])))
    (is (= 0.5 (abs [3.5] [3.0])))
    (is (= 0.5 (abs [3.0] [3.5])))))

(deftest lev-test
  (testing "Levenshtein string distance"
    (is (= default-score (lev [] [])))
    (is (= 0.0 (lev ["the house"] ["the house"])))
    (is (= (double 1/9) (lev ["the house"] ["the hose"])))
    (is (= (double 5/9) (lev ["the house"] ["the rat"])))
    (is (= (double 1) (lev ["the house"] ["zzzzzzzzz"])))))

(deftest iseq-test
  (testing "Sets are equal"
    (is (= default-score (is-eq [] [])))
    (is (= 1.0 (is-eq [:cat] [:cat])))
    (is (= 0.0 (is-eq [:cat] [:catt])))))

(deftest minlen-test
  (testing "Minimum length of strings"
    (is (= default-score (min-len [] [])))
    (is (= 0 (min-len [""] [""])))
    (is (= 0 (min-len ["the kitten"] [""])))
    (is (= 5 (min-len ["the kitten"] ["puppy"])))
    (is (= 3 (min-len ["the kitten" "cat"] ["puppy"])))))


