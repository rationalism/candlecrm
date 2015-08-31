(ns spectra.graph-test
  (:require [clojure.test :refer :all]
            [spectra.graph :refer :all]))

(defn graph-ready [f]
  (def test-graph (get-graph))
  (f)
  (.shutdown test-graph))

(use-fixtures :once graph-ready)

(deftest vertex-create-destroy
  (testing "create, find, destroy vertices"
    (is (= 2 2))))
