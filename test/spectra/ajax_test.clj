(ns spectra.ajax-test
  (:require [clojure.test :refer :all]
            [spectra.ajax :refer :all]))

(defn graph-ready [f]
  (neo4j/graph-connect!)
  (neo4j/reset-session!)
  (f)
  (neo4j/close-session!))

(use-fixtures :once graph-ready)

(deftest router-broadcaster
  (testing "Start and stop of Sente server"
    (start-router!)
    (start-broadcaster!)
    (is chsk-send!)
    (stop-router!)))
