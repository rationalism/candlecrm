(ns spectra.neo4j-test
  (:require [clojure.test :refer :all]
            [spectra.neo4j :refer :all]
            [spectra_cljc.schema :as s]))

(defn graph-ready [f]
  (define-graph!)
  (f)
  nil)

(use-fixtures :once graph-ready)

(def test-names #{"Alice Fakename" "Bob Fakename" "Carol Fakename"})
(def test-emails #{"alice@foo.com" "bob@foo.com" "carol@foo.com"})
(def test-phones #{"555-5555" "666-6666" "777-7777"})

(def other-name "Doug Fakename")
(def other-email "doug@foo.com")
(def other-phone "888-8888")

;; Nil doesn't work here, so should be excluded
(def test-fake-prop #{"foo" "bar" nil})
(def fake-prop :fake-property)

(deftest vertex-create-destroy
  (testing "create, find, destroy vertices"
    (def get-people (partial get-vertices-coll s/person))
    (def test-name {s/s-name (first test-names)})
    (def test-email {s/email-addr (first test-emails)})
    (def test-phone {s/phone-num (first test-phones)})
    (def test-fake {fake-prop (first test-fake-prop)})
    (is (= 0 (count (get-people test-name))))
    (is (= 0 (count (get-people test-email))))
    (is (= 0 (count (get-people test-phone))))
    
    (def new-vertex
      (create-vertex! s/person
                      {s/s-name test-names
                       s/email-addr test-emails
                       s/phone-num test-phones
                       fake-prop test-fake-prop}))
    
    (is (= 1 (count (get-people test-name))))
    (is (= 1 (count (get-people test-email))))
    (is (= 1 (count (get-people test-phone))))
    (is (= 0 (count (get-people test-fake))))
    (is (= 0 (count (get-people {s/s-name other-name}))))
    (is (= 0 (count (get-people {s/email-addr other-email}))))
    (is (= 0 (count (get-people {s/phone-num other-phone}))))
    
    (is (= 1 (count (get-people (merge test-name test-email test-phone)))))

    (delete-vertex! new-vertex)
    (is (= 0 (count (get-people test-name))))
    (is (= 0 (count (get-people test-email))))
    (is (= 0 (count (get-people test-phone))))))

(deftest recon-property
  (testing "Reconcile old values of a property with new values"
    (def new-vertex
      (create-vertex! s/person
                      {s/s-name test-names}))
    (is (= test-names
           (get-property new-vertex s/s-name)))
    (recon-property-list! new-vertex s/s-name (first test-names))
    (def new-vertex (refresh-vertex new-vertex))
    (is (= test-names
           (get-property new-vertex s/s-name)))
    (recon-property-list! new-vertex s/s-name other-name)
    (def new-vertex (refresh-vertex new-vertex))
    (is (= (conj test-names other-name)
           (get-property new-vertex s/s-name)))
    (delete-vertex! new-vertex)))

(def make-link-query
  (str "MATCH (a0), (a1), (a2) "
       "WHERE ID(a0)= 1 AND ID(a1)= 2 AND ID(a2)= 3 "
       "CREATE root = (a0)-[:`dog`]->(a1)-[:`cat`]->(a2) "
       "RETURN root"))

(deftest make-links-test
  (testing "Query to create a set of links"
    (is (= make-link-query
           (make-links-query
            [1 2 3] [[1 2 "dog"] [2 3 "cat"]])))))
