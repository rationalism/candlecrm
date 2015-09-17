(ns spectra.datetime-test
  (:require [clojure.test :refer :all]
            [spectra.datetime :refer :all]))

(def empty-test "This string doesn't have a date in it")
(def two-test "The day was December 12th, 1990. The next day would be December 13th, 1990.")

(deftest date-parse
  (testing "Parse some dates"
    (is (= 0 (count (dates-in-text empty-test))))
    (is (= 2 (count (dates-in-text two-test))))))
