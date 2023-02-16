(ns candlecrm.terms-test
  (:require [clojure.test :refer :all]
            [candlecrm.terms :refer :all]))

(deftest tos-html-get
  (testing "Get TOS HTML"
    (is (tos-html))))

