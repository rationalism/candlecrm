(ns spectra.insert-test
  (:require [clojure.test :refer :all]
            [spectra.insert :refer :all]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]))

(defn graph-ready [f]
  (neo4j/define-graph!)
  (f)
  nil)

(use-fixtures :once graph-ready)

(def node1 {:label :fish :species "tuna"})
(def node2 {:label :phylum :phy-name "Vertebrates"})

(deftest insert-destroy
  (testing "Insert and destroy some nodes"
    (def g (loom/build-graph [node1 node2]
                             [[node1 node2 :has-phylum]]))))


