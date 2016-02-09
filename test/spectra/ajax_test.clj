(ns spectra.ajax-test
  (:require [clojure.test :refer :all]
            [spectra.ajax :refer :all]))

(deftest router-broadcaster
  (testing "Start and stop of Sente server"
    (start-router!)
    (start-broadcaster!)
    (is chsk-send!)
    (stop-router!)))
