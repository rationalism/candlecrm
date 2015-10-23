(ns spectra.auth-test
  (:require [clojure.test :refer :all]
            [spectra.auth :refer :all]
            [spectra.neo4j :as neo4j]
            [spectra.schema :as s]))

(defn graph-ready [f]
  (intern 'spectra.neo4j '*graph* (neo4j/get-graph))
  (f)
  nil)

(use-fixtures :once graph-ready)

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

(deftest create-destroy-user
  (testing "Create and destroy a user, verify everything sane"
    (def get-people (partial neo4j/get-vertices-coll s/person))
    (def test-email {s/email-addr test-username})
    (is (= 0 (count (get-people test-email))))

    (is (create-user! {:username test-username :password test-password}))
    (is (= test-username (get-username (lookup-user test-username))))
    (is (= 1 (count (get-people test-email))))
    
    (delete-user! (lookup-user test-username))
    (is (not (lookup-user test-username)))
    (is (= 0 (count (get-people test-email))))))
