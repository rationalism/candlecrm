(ns spectra.web-test
  (:require [clojure.test :refer :all]
            [ring.middleware.defaults :refer :all]
            [spectra.auth :refer :all]
            [spectra.web :refer :all]
            [buddy.auth.middleware :refer (wrap-authentication)]))

(deftest app-exists
  (testing "The app exists"
    (is (wrap-defaults (wrap-authentication app (auth/backend))
                       (middleware-config)))))
