(ns candlecrm.common-test
  (:require [clojure.test :refer :all]
            [candlecrm.common :refer :all]))

(def test-coll [1 2 3 4 5 6 7 8 9 10])

(deftest log-test
  (testing "Setting up log system"
    (is (not (log-setup!)))))

(deftest nth-test
  (testing "extra nth functions"
    (is (= 3 (third test-coll)))
    (is (= 4 (fourth test-coll)))
    (is (= 5 (fifth test-coll)))))

(deftest mapint-test
  (testing "Get a set of ints"
    (is (= [1 2 3 4] (map-int ["1" "2" "3" "4"])))))

(deftest fmap-test
  (testing "Apply function to map values"
    (is (= {:a 2 :b 3 :c 4}
           (fmap {:a 1 :b 2 :c 3} inc)))))

(deftest zipvec-test
  (testing "Zip two vectors into a single vector"
    (is (= [[1 6] [2 7] [3 8] [4 9] [5 10]]
           (zipvec [1 2 3 4 5] [6 7 8 9 10])))))

(deftest slice-test
  (testing "Slice function"
    (is (= [4 5 6 7]
           (slice 3 7 test-coll))))
  (testing "Slice not function"
    (is (= [1 2 3 8 9 10]
           (slice-not 3 7 test-coll)))))

(deftest not-nil-extended
  (testing "not nil utility"
    (is (not-nil-ext? 7))
    (is (not (not-nil-ext? nil)))
    (is (not-nil-ext? ["foobar"]))
    (is (not (not-nil-ext? ["zoom" nil])))
    (is (not (not-nil-ext? #{"zoom" nil})))
    (is (not-nil-ext? 0))))

(deftest merge-found
  (testing "Merging if found test"
    (def header {:a (atom nil) :b (atom nil)})
    (is (nil? (deref (:a header))))
    (reset-if-found! nil header :a)
    (is (nil? (deref (:a header))))
    (reset-if-found! [] header :a)
    (is (nil? (deref (:a header))))
    (reset-if-found! [17] header :a)
    (is (= 17 (deref (:a header))))
    
    (is (nil? (deref (:b header))))
    (merge-if-found! '() header :b)
    (is (nil? (deref (:b header))))
    (merge-if-found! [{:dog "Jose"}] header :b)
    (is (= {:dog "Jose"} (deref (:b header))))
    (merge-if-found! [{:cat "Babbage"}] header :b)
    (is (= {:dog "Jose" :cat "Babbage"}
           (deref (:b header))))))
    
