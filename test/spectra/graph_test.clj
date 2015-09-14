(ns spectra.graph-test
  (:require [clojure.test :refer :all]
            [spectra.graph :refer :all]
            [spectra.schema :as schema]))

(defn graph-ready [f]
  (def test-graph (get-graph))
  (f)
  (.shutdown test-graph))

(use-fixtures :once graph-ready)

(def test-names #{"Alice" "Bob" "Carol"})
(def test-emails #{"alice@foo.com" "bob@foo.com" "carol@foo.com"})
(def test-phones #{"555-5555" "666-6666" "777-7777"})

(def other-name "Doug")
(def other-email "doug@foo.com")
(def other-phone "888-8888")

(deftest vertex-create-destroy
  (testing "create, find, destroy vertices"
    (def get-people (partial get-vertices test-graph schema/person-type))
    (is (= 0 (count (get-people schema/name-type (first test-names)))))
    (is (= 0 (count (get-people schema/email-address-type (first test-emails)))))
    (is (= 0 (count (get-people schema/phone-num-type (first test-phones)))))
    
    (def new-vertex
      (create-vertex! test-graph schema/person-type
                      [{:property schema/name-type :value test-names}
                       {:property schema/email-address-type :value test-emails}
                       {:property schema/phone-num-type :value test-phones}]))
    
    (is (= 1 (count (get-people schema/name-type (first test-names)))))
    (is (= 1 (count (get-people schema/email-address-type (first test-emails)))))
    (is (= 1 (count (get-people schema/phone-num-type (first test-phones)))))
    (is (= 0 (count (get-people schema/name-type other-name))))
    (is (= 0 (count (get-people schema/email-address-type other-email))))
    (is (= 0 (count (get-people schema/phone-num-type other-phone))))
    
    (is (= 1 (count (get-people (into-array [schema/name-type schema/email-address-type schema/phone-num-type])
                                (into-array [(first test-names) (first test-emails) (first test-phones)])))))

    (delete-vertex! test-graph new-vertex)
    (is (= 0 (count (get-people schema/name-type (first test-names)))))
    (is (= 0 (count (get-people schema/email-address-type (first test-emails)))))
    (is (= 0 (count (get-people schema/phone-num-type (first test-phones)))))))


