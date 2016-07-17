(ns spectra.datetime-test
  (:require [clojure.test :refer :all]
            [spectra.datetime :refer :all]))

(defn date-model [f]
  (load-date-model!)
  (f) nil)

(use-fixtures :once date-model)

(def empty-test "This string doesn't have a date in it")
(def two-test "The day was December 12th, 1990. The next day would be December 13th, 1990.")

(def wikipedia-blurb "\"The Big Four\" was the name popularly given to the famous and influential businessmen, philanthropists and railroad tycoons who built the Central Pacific Railroad, (C.P.R.R.), which formed the western portion through the Sierra Nevada and the Rocky Mountains of the First Transcontinental Railroad in the United States, built from the mid-continent at the Mississippi River to the Pacific Ocean during the middle and late 1860s.[1] Composed of Leland Stanford, (1824–1893), Collis Potter Huntington, (1821–1900), Mark Hopkins, (1813–1878), and Charles Crocker, (1822–1888), the four themselves however, personally preferred to be known as \"The Associates.\"")

(def wikipedia-dates #{"1824" "1893" "1821" "1900" "1813" "1878" "1822" "1888"})

;; TODO: test Wikipedia dates

(deftest date-parse
  (testing "Parse some dates"
    (is (= 0 (count (dates-in-text empty-test))))
    (is (= 2 (count (dates-in-text two-test))))))
