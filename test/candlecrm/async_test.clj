(ns candlecrm.async-test
  (:require [clojure.test :refer :all]
            [candlecrm.async :refer :all]
            [candlecrm.neo4j :as neo4j]))

(defn graph-ready [f]
  (neo4j/graph-connect!)
  (neo4j/reset-session!)
  (f)
  (neo4j/close-session!))

(use-fixtures :once graph-ready)

(deftest pool-test
  (testing "Creating and deleting a thread pool"
    (defonce sum (atom 0))
    (def call-fn (create-pool! {:name "sum" :process #(+ %1 %2)
                                :param-gen (constantly 10)
                                :callback #(swap! sum + %)
                                :num-threads 4}))
    (->> 10 range (map call-fn) dorun)
    (Thread/sleep 100)
    (is (= @sum 145))
    (delete-pool! "sum")))

