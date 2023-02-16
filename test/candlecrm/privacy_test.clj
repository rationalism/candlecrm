(ns candlecrm.privacy-test
  (:require [clojure.test :refer :all]
            [candlecrm.privacy :refer :all]))

(deftest priv-html-get
  (testing "Get privacy HTML"
    (is (privacy-html))))

