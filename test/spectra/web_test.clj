(ns spectra.web-test
  (:require [clojure.test :refer :all]
            [ring.middleware.defaults :refer :all]
            [spectra.web :refer :all]))

(deftest app-exists
  (testing "The app exists"
    (is (wrap-defaults (friend-authenticate app)
                       (middleware-config)))))
