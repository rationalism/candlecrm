(ns spectra.common-test
  (:require [clojure.test :refer :all]
            [spectra.common :refer :all]))

(def test-coll [1 2 3 4 5 6 7 8 9 10])

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
