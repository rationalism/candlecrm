(ns spectra.index-test
  (:require [clojure.test :refer :all]
            [spectra.auth :as auth]
            [spectra.neo4j :as neo4j]
            [spectra.index :refer :all]))

(defn graph-ready [f]
  (neo4j/graph-connect!)
  (neo4j/reset-session!)
  (auth/load-keys!)
  (f)
  (neo4j/close-session!))

(use-fixtures :once graph-ready)

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

(deftest create-delete-indexes
  (testing "Create a user, create and delete indexes"
    (def test-user (auth/create-user! {:username test-username :password test-password}))

    (is (make-constraints! test-user))
    (is (drop-constraints! test-user))

    (auth/delete-user! test-user)))
