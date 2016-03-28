(ns spectra.async-test
  (:require [clojure.test :refer :all]
            [spectra.async :refer :all]))

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
