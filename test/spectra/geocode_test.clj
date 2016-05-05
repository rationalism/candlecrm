(ns spectra.geocode-test
  (:require [clojure.test :refer :all]
            [spectra.geocode :refer :all]))

(deftest fetch-geocodes
  (testing "Try getting some geocodes"
    (is (geocode-cached 10))))
