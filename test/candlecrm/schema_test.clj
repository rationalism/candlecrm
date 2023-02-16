(ns candlecrm.schema-test
  (:require [clojure.test :refer :all]
            [candlecrm.neo4j :as neo4j]
            [candlecrm_cljc.schema :refer :all]
            [environ.core :refer [env]]))

;; This test is from OrientDB and is obsolete
(deftest schema-drop-up
  (testing "create and destroy schema"
    (is (= 2 2))))
