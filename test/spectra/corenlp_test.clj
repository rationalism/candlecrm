(ns spectra.corenlp-test
  (:require [clojure.test :refer :all]
            [spectra.loom :as loom]
            [spectra_cljc.schema :as s]
            [clojure.set :as set]
            [spectra.corenlp :refer :all]))

(def wikipedia-blurb "\"The Big Four\" was the name popularly given to the famous and influential businessmen, philanthropists and railroad tycoons who built the Central Pacific Railroad, (C.P.R.R.), which formed the western portion through the Sierra Nevada and the Rocky Mountains of the First Transcontinental Railroad in the United States, built from the mid-continent at the Mississippi River to the Pacific Ocean during the middle and late 1860s.[1] Composed of Leland Stanford, (1824–1893), Collis Potter Huntington, (1821–1900), Mark Hopkins, (1813–1878), and Charles Crocker, (1822–1888), the four themselves however, personally preferred to be known as \"The Associates.\"")

(def wikipedia-people #{"Collis Potter Huntington" "Mark Hopkins" "Charles Crocker"})
(def wikipedia-locations #{"Sierra Nevada" "Rocky Mountains" "United States" "Mississippi River" "Pacific Ocean"})

(def models {:ner ((get-ner-fn))
             :mention ((get-mention-fn))
             :token ((get-tokenize-fn))})

(deftest nlp
  (testing "all types of entities"
    (let [entities (as-> wikipedia-blurb $
                     (run-nlp-default models $)
                     (loom/select-edges $ s/has-type)
                     (map #(hash-map (second %) (vector (first %))) $)
                     (apply merge-with concat $))]
      (is (set/subset? wikipedia-people (set (s/person-name entities))))
      (is (set/subset? wikipedia-locations (set (s/loc-name entities))))))
  (testing "empty set"
    (def empty-graph (loom/build-graph [] []))
    (is (= empty-graph (run-nlp-default models "")))))

(def me-blurb "Hello, my name is Alyssa Vance. I was born on June 21st, 1991; my email address is alyssamvance@gmail.com; and my phone number is 203-850-2427.")

(deftest nlp-full
  (testing "all types of entities"
    (let [entities (as-> me-blurb $
                     (run-nlp-full models "Alyssa Vance" $))]
      (is entities))))

(deftest email-name
  (testing "Get a name from an email"
    (is (= ["Michael Vassar" s/person-name s/has-type]
           (name-from-email models "michael.vassar@gmail.com")))))

;(deftest fix-case
;  (testing "Fix the case of text"
;    (is (= "Welcome to the Black Mesa Research Facility."
;           (correct-case "Welcome to the Black Mesa Research Facility.")))
;    (is (= "Welcome to the Black Mesa Research Facility."
;           (correct-case "WELCOME TO THE BLACK MESA RESEARCH FACILITY.")))
;    (is (= "Welcome to the Black Mesa Research Facility."
;           (correct-case "welcome to the black mesa research facility.")))))
