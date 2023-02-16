(ns candlecrm.model-test
  (:require [clojure.test :refer :all]
            [candlecrm.model :refer :all]))

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

(deftest diff-len-adj-test
  (testing "String lengths and differences"
    (is (= [14 0] (diff-len-adj ["George W. Bush"] ["George W. Bush"])))
    (is (= [14 25/28] (diff-len-adj ["George W. Bush"] ["Barack H. Obama"])))
    (is (= [14 1] (diff-len-adj ["AAAAAAAAAAAAAA"] ["BBBBBBBBBBBBBB"])))))

(deftest overlap-score-test
  (testing "Overlap between model scores"
    (is (= [0.0 0.0] (overlap-score {} {})))
    (is (= [1.0 0.0] (overlap-score {"Bob Smith" 1.0} {"Bob Smith" 1.0})))
    (is (= [0.5 1.0] (overlap-score {"Bob Smith" 0.4 "Joe Smith" 1.0}
                                    {"Bob Smith" 0.6 "George Smith" 1.0})))))

(deftest short-long-test
  (testing "Shortest and longest strings"
    (is (= 0 (shortest [] [])))
    (is (= 0 (shortest [""] [""])))
    (is (= 0 (longest [] [])))
    (is (= 0 (longest [""] [""])))
    (is (= 0 (shortest [""] ["Bob Smith"])))
    (is (= 9 (longest [""] ["Bob Smith"])))
    (is (= 9 (shortest ["George W. Bush"] ["Bob Smith"])))
    (is (= 14 (longest ["George W. Bush"] ["Bob Smith"])))))

(deftest lev-split-test
  (testing "Calculate distance between different parts of strings"
    (is (= [0.5 0.5 0.5] (lev-split [] [])))
    (is (= [0.0 0.0 0.0] (lev-split ["Barack H. Obama"] ["Barack H. Obama"])))
    (is (= [1.0 0.2 0.0] (lev-split ["Barack H. Obama"] ["George H. Obama"])))
    (is (= [0.0 0.0 1.0] (lev-split ["Barack H. Obama"] ["Barack H. Smith"])))
    (is (= [1.0 0.5 1.0] (lev-split ["Barack H. Obama"] ["George W. Bush"])))))
