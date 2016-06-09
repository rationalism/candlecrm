(ns spectra.index-test
  (:require [clojure.test :refer :all]
            [spectra.auth :as auth]
            [spectra.index :refer :all]))

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

(deftest create-delete-indexes
  (testing "Create a user, create and delete indexes"
    (def test-user (auth/create-user! {:username test-username :password test-password}))

    (is (not (make-constraints! test-user)))
    (is (not (drop-constraints! test-user)))

    (auth/delete-user! test-user)))
