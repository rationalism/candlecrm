(ns spectra.corenlp-test
  (:require [clojure.test :refer :all]
            [spectra.loom :as loom]
            [spectra.schema :as s]
            [clojure.set :as set]
            [spectra.corenlp :refer :all]))

(defn pipeline-ready [f]
  (load-pipeline!) (f))

(use-fixtures :once pipeline-ready)

(def wikipedia-blurb "\"The Big Four\" was the name popularly given to the famous and influential businessmen, philanthropists and railroad tycoons who built the Central Pacific Railroad, (C.P.R.R.), which formed the western portion through the Sierra Nevada and the Rocky Mountains of the First Transcontinental Railroad in the United States, built from the mid-continent at the Mississippi River to the Pacific Ocean during the middle and late 1860s.[1] Composed of Leland Stanford, (1824–1893), Collis Potter Huntington, (1821–1900), Mark Hopkins, (1813–1878), and Charles Crocker, (1822–1888), the four themselves however, personally preferred to be known as \"The Associates.\"")

(def wikipedia-people #{"Collis Potter Huntington" "Mark Hopkins" "Charles Crocker"})
(def wikipedia-locations #{"Sierra Nevada" "Rocky Mountains" "United States" "Mississippi River" "Pacific Ocean"})

(deftest nlp
  (testing "all types of entities"
    (let [entities (as-> wikipedia-blurb $
                     (run-nlp-default $)
                     (loom/select-edges $ "!type!")
                     (map #(hash-map (second %) (vector (first %))) $)
                     (apply merge-with concat $))]
      (is (set/subset? wikipedia-people (set (s/person-name entities))))
      (is (set/subset? wikipedia-locations (set (s/loc-name entities))))))
  (testing "empty set"
    (def empty-graph (loom/build-graph [] []))
    (is (= empty-graph (run-nlp-default "")))))
