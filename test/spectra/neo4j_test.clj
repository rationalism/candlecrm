(ns spectra.neo4j-test
  (:require [clojure.test :refer :all]
            [spectra.neo4j :refer :all]
            [spectra.schema :as schema]))

(defn graph-ready [f]
  (intern 'spectra.neo4j '*graph* (get-graph))
  (f)
  nil)

(use-fixtures :once graph-ready)

(def test-names #{"Alice" "Bob" "Carol"})
(def test-emails #{"alice@foo.com" "bob@foo.com" "carol@foo.com"})
(def test-phones #{"555-5555" "666-6666" "777-7777"})

(def other-name "Doug")
(def other-email "doug@foo.com")
(def other-phone "888-8888")

;; Nil doesn't work here, so should be excluded
(def test-fake-prop #{"foo" "bar" nil})
(def fake-prop :fake-property)

(deftest vertex-create-destroy
  (testing "create, find, destroy vertices"
    (def get-people (partial get-vertices-coll schema/person-type))
    (def test-name {schema/name-type (first test-names)})
    (def test-email {schema/email-address-type (first test-emails)})
    (def test-phone {schema/phone-num-type (first test-phones)})
    (def test-fake {fake-prop (first test-fake-prop)})
    (is (= 0 (count (get-people test-name))))
    (is (= 0 (count (get-people test-email))))
    (is (= 0 (count (get-people test-phone))))
    
    (def new-vertex
      (create-vertex! schema/person-type
                      {schema/name-type test-names
                       schema/email-address-type test-emails
                       schema/phone-num-type test-phones
                       fake-prop test-fake-prop}))
    
    (is (= 1 (count (get-people test-name))))
    (is (= 1 (count (get-people test-email))))
    (is (= 1 (count (get-people test-phone))))
    (is (= 0 (count (get-people test-fake))))
    (is (= 0 (count (get-people {schema/name-type other-name}))))
    (is (= 0 (count (get-people {schema/email-address-type other-email}))))
    (is (= 0 (count (get-people {schema/phone-num-type other-phone}))))
    
    (is (= 1 (count (get-people (merge test-name test-email test-phone)))))

    (delete-vertex! new-vertex)
    (is (= 0 (count (get-people test-name))))
    (is (= 0 (count (get-people test-email))))
    (is (= 0 (count (get-people test-phone))))))

(deftest recon-property
  (testing "Reconcile old values of a property with new values"
    (def new-vertex
      (create-vertex! schema/person-type
                      {schema/name-type test-names}))
    (is (= test-names
           (get-property new-vertex schema/name-type)))
    
    (recon-property-list! new-vertex schema/name-type (first test-names))
    (def new-vertex (refresh-vertex new-vertex))
    (is (= test-names
           (get-property new-vertex schema/name-type)))
    
    (recon-property-list! new-vertex schema/name-type other-name)
    (def new-vertex (refresh-vertex new-vertex))
    (is (= (conj test-names other-name)
           (get-property new-vertex schema/name-type)))

    (delete-vertex! new-vertex)))
