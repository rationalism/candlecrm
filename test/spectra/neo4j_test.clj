(ns candlecrm.neo4j-test
  (:require [clojure.test :refer :all]
            [candlecrm.neo4j :refer :all]
            [candlecrm.auth :as auth]
            [candlecrm.insert :as insert]
            [candlecrm_cljc.schema :as s]))

(defn graph-ready [f]
  (graph-connect!)
  (reset-session!)
  (auth/load-keys!)
  (f)
  (close-session!))

(use-fixtures :once graph-ready)

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

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
    (def user (auth/create-user! {:username test-username
                                  :password test-password}))

    (def fake-label (prop-label user :fake-property))
    
    (def get-people (partial get-vertices user s/person))
    (def test-name {s/s-name (first test-names)})
    (def test-email {s/email-addr (first test-emails)})
    (def test-phone {s/phone-num (first test-phones)})
    (def test-fake {fake-prop "foo"})
    
    (is (= 0 (count (get-people test-name))))
    (is (= 0 (count (get-people test-email))))
    (is (= 0 (count (get-people test-phone))))
    
    (def new-vertex
      (-> {s/type-label s/person
           s/s-name test-names
           s/email-addr test-emails
           s/phone-num test-phones
           fake-prop test-fake-prop}
          vector
          (insert/push-entities! user s/test-src)))
    
    (is (= 1 (count (get-people test-name))))
    (is (= 1 (count (get-people test-email))))
    (is (= 1 (count (get-people test-phone))))
    (is (= 1 (count (get-people test-fake))))
    (is (= 0 (count (get-people {s/s-name other-name}))))
    (is (= 0 (count (get-people {s/email-addr other-email}))))
    (is (= 0 (count (get-people {s/phone-num other-phone}))))
    
    (is (= 1 (count (get-people (merge test-name test-email test-phone)))))

    (auth/delete-user! user)
    (delete-class! fake-label)
    
    (is (= 0 (count (get-people test-name))))
    (is (= 0 (count (get-people test-email))))
    (is (= 0 (count (get-people test-phone))))))

(deftest throw-exception-test
  (testing "Make an invalid query that will throw exception"
    (def caught-exception false)
    
    (with-redefs [println (fn [e] (def err-msg e))]
      (try
        (cypher-combined-tx ["MATCHMATCHMATCHMATCH"])
        (catch Exception e
          (def caught-exception true))))

    (is (not caught-exception))
    (def caught-exception false)
    
    (with-redefs [println (fn [e] (def err-msg e))]
      (try
        (cypher-query "MATCHMATCHMATCHMATCH")
        (catch Exception e
          (def caught-exception true))))
    
    (is (not caught-exception))))

(deftest add-remove-label
  (testing "Add and remove a node label"
    (is (not (get-vertex-raw :element {:uranium 92})))
    (def id (-> "CREATE (a {uranium:92}) RETURN ID(a)"
                cypher-query first vals first))
    (is (not (get-vertex-raw :element {:uranium 92})))
    (add-label! id :element)
    (is (get-vertex-raw :element {:uranium 92}))
    (remove-label! id :element)
    (is (not (get-vertex-raw :element {:uranium 92})))
    (delete-id! id)))

(deftest add-drop-constraints
  (testing "Add and remove some constraints"
    (cypher-query "CREATE CONSTRAINT ON (book:Book) ASSERT exists(book.isbn)")
    (cypher-query "CREATE CONSTRAINT ON (book:Book) ASSERT book.isbn IS UNIQUE")
    (-> "CONSTRAINT ON ( book:Book ) ASSERT book.isbn IS UNIQUE"
        drop-constraint cypher-query)
    (-> "CONSTRAINT ON ( book:Book ) ASSERT exists(book.isbn)"
        drop-constraint cypher-query)))

