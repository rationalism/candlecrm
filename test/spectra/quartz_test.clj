(ns spectra.quartz-test
  (:require [clojure.test :refer :all]
            [spectra.quartz :refer :all]))

(deftest start-stop-test
  (testing "Start and stop the Quartz scheduler"
    (is (start!))
    (is (not (stop!)))))
