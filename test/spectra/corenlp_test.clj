(ns spectra.corenlp-test
  (:require [clojure.test :refer :all]
            [clojure.set :as set]
            [spectra.corenlp :refer :all]))

(defn pipeline-ready [f]
  (load-pipeline!) (f))

(use-fixtures :once pipeline-ready)

(def wikipedia-blurb "\"The Big Four\" was the name popularly given to the famous and influential businessmen, philanthropists and railroad tycoons who built the Central Pacific Railroad, (C.P.R.R.), which formed the western portion through the Sierra Nevada and the Rocky Mountains of the First Transcontinental Railroad in the United States, built from the mid-continent at the Mississippi River to the Pacific Ocean during the middle and late 1860s.[1] Composed of Leland Stanford, (1824–1893), Collis Potter Huntington, (1821–1900), Mark Hopkins, (1813–1878), and Charles Crocker, (1822–1888), the four themselves however, personally preferred to be known as \"The Associates.\"")

(def wikipedia-people #{"Collis Potter Huntington" "Mark Hopkins" "Charles Crocker"})
(def wikipedia-dates #{"1824" "1893" "1821" "1900" "1813" "1878" "1822" "1888"})
(def wikipedia-locations #{"Sierra Nevada" "Rocky Mountains" "United States" "Mississippi River" "Pacific Ocean"})

(def wikipedia-parsed-people #{{:name "Collis Potter Huntington"} {:name "Mark Hopkins"} {:name "Charles Crocker"}})

(deftest nlp
  (testing "all types of entities"
    (let [entities (nlp-entities *pipeline* wikipedia-blurb)]
      (is (set/subset? wikipedia-people (set (entities person-key))))
      ;; TODO: move date testing to natty when that's installed
      ;; (is (set/subset? wikipedia-dates (set (entities date-key))))
      (is (set/subset? wikipedia-locations (set (entities location-key))))))
  (testing "people detection"
    (let [people (nlp-people (nlp-entities *pipeline* wikipedia-blurb))]
      (is (set/subset? wikipedia-parsed-people (set people)))))
  (testing "empty set"
    (is (= {} (nlp-entities *pipeline* "")))))
