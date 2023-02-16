(ns candlecrm.web-test
  (:require [clojure.test :refer :all]
            [ring.middleware.defaults :refer :all]
            [candlecrm.auth :as auth]
            [candlecrm.web :refer :all]))

(deftest app-exists
  (testing "The app exists"
    (is (wrap-defaults
         (wrap-authentication app)
         (middleware-config)))))

(deftest csrf-validation
  (testing "CSRF tokens are findable"
    (def csrf-1 {:form-params {"__anti-forgery-token" "sometoken"}})
    (def csrf-2 {:multipart-params {"__anti-forgery-token" "sometoken"}})
    (def csrf-3 {:headers {"x-csrf-token" "sometoken"}})
    (def csrf-4 {:headers {"x-xsrf-token" "sometoken"}})
    (def csrf-5 {:params {:csrf-token "sometoken"}})
    (is (= "sometoken" (csrf-token csrf-1)))
    (is (= "sometoken" (csrf-token csrf-2)))
    (is (= "sometoken" (csrf-token csrf-3)))
    (is (= "sometoken" (csrf-token csrf-4)))
    (is (= "sometoken" (csrf-token csrf-5)))))
