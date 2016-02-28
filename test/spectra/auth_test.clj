(ns spectra.auth-test
  (:require [clojure.test :refer :all]
            [spectra.auth :refer :all]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]))

(defn graph-ready [f]
  (neo4j/define-graph!)
  (f)
  nil)

(use-fixtures :once graph-ready)

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

(deftest create-destroy-user
  (testing "Create and destroy a user, verify everything sane"
    (def test-email {s/email-addr test-username})

    (is (create-user! {:username test-username :password test-password}))
    (is (= test-username (get-username (lookup-user test-username))))
    (def get-people (partial neo4j/get-vertices
                             (lookup-user test-username) s/person))
    (is (= 1 (count (get-people test-email))))
    
    (delete-user! (lookup-user test-username))
    (is (not (lookup-user test-username)))
    (is (= 0 (count (get-people test-email))))))
