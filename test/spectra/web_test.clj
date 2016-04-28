(ns spectra.web-test
  (:require [clojure.test :refer :all]
            [ring.middleware.defaults :refer :all]
            [spectra.auth :as auth]
            [spectra.web :refer :all]
            [buddy.auth.middleware :refer (wrap-authentication)]))

(deftest app-exists
  (testing "The app exists"
    (is (wrap-defaults (wrap-authentication app (auth/backend))
                       (middleware-config)))))
