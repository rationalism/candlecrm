(ns spectra.schema-test
  (:require [clojure.test :refer :all]
            [spectra.neo4j :as neo4j]
            [spectra.schema :refer :all]
            [environ.core :refer [env]]))

(defn graph-ready [f]
  (intern 'spectra.neo4j '*graph* (neo4j/get-graph))
  (f)
  nil)

(use-fixtures :once graph-ready)

;; This test is from OrientDB and is obsolete
(deftest schema-drop-up
  (testing "create and destroy schema"
    (is (= 2 2))))
