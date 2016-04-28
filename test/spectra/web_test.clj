(ns spectra.web-test
  (:require [clojure.test :refer :all]
            [ring.middleware.defaults :refer :all]
            [spectra.auth :as auth]
            [spectra.web :refer :all]))

(deftest app-exists
  (testing "The app exists"
    (is (wrap-defaults
         (wrap-authentication app)
         (middleware-config)))))
