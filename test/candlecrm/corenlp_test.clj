(ns candlecrm.corenlp-test
  (:require [clojure.test :refer :all]
            [candlecrm.common :refer :all]
            [candlecrm.datetime :as dt]
            [candlecrm.loom :as loom]
            [candlecrm_cljc.schema :as s]
            [clojure.set :as set]
            [candlecrm.corenlp :refer :all]))

(defn date-model [f]
  (dt/load-date-model!)
  (f) nil)

(use-fixtures :once date-model)

(def wikipedia-blurb "\"The Big Four\" was the name popularly given to the famous and influential businessmen, philanthropists and railroad tycoons who built the Central Pacific Railroad, (C.P.R.R.), which formed the western portion through the Sierra Nevada and the Rocky Mountains of the First Transcontinental Railroad in the United States, built from the mid-continent at the Mississippi River to the Pacific Ocean during the middle and late 1860s.[1] Composed of Leland Stanford, (1824–1893), Collis Potter Huntington, (1821–1900), Mark Hopkins, (1813–1878), and Charles Crocker, (1822–1888), the four themselves however, personally preferred to be known as \"The Associates.\"")

(def wikipedia-people #{"Collis Potter Huntington" "Mark Hopkins" "Charles Crocker"})
(def wikipedia-locations #{"Sierra Nevada" "Rocky Mountains" "United States" "Mississippi River" "Pacific Ocean"})

(def models {:ner ((get-ner-fn))
             :mention ((get-mention-fn))
             :token ((get-tokenize-fn))
             :parse ((get-parse-fn))
             :entity (entity-extractor)
             :relation ((get-rel-fn))})

(deftest nlp
  (testing "all types of entities"
    (let [entities (->> wikipedia-blurb (run-nlp-default models) loom/nodes
                        (map #(hash-map (s/type-label %)
                                        (vector (s/link-text %))))
                        (apply merge-with into))]
      (is (set/subset? wikipedia-people (set (s/person entities))))
      (is (set/subset? wikipedia-locations (set (s/location entities))))))
  (testing "empty set"
    (def empty-graph (loom/build-graph [] []))
    (is (= empty-graph (run-nlp-default models "")))))

(def me-blurb "Hello, my name is Alyssa Vance. I was born on June 21st, 1991; my email address is alyssamvance@gmail.com; and my phone number is 203-850-2427.")

(deftest nlp-full
  (testing "all types of entities"
    (let [entities (run-nlp-full models "Alyssa Vance" (dt/now-zone) [] me-blurb)]
      (is entities))))

(deftest email-name
  (testing "Get a name from an email"
    (is 
     (= "Michael Vassar"
        (name-from-email models "michael.vassar@gmail.com")))))

(deftest fix-case
  (testing "Fix the case of text"
    (is (= "Welcome to the Black Mesa Research Facility."
           (correct-case "Welcome to the Black Mesa Research Facility.")))
    (is (= "Welcome to the Black Mesa Research Facility."
           (correct-case "WELCOME TO THE BLACK MESA RESEARCH FACILITY.")))
    (is (= "Welcome to the Black Mesa Research Facility."
           (correct-case "welcome to the black mesa research facility.")))))
