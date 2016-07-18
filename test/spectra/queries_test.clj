(ns candlecrm.queries-test
  (:require [clojure.test :refer :all]
            [candlecrm.common :refer :all]
            [candlecrm.auth :as auth]
            [candlecrm.neo4j :as neo4j]
            [candlecrm_cljc.schema :as s]
            [candlecrm.queries :refer :all]))


(defn graph-ready [f]
  (neo4j/graph-connect!)
  (neo4j/reset-session!)
  (auth/load-keys!)
  (f)
  (neo4j/close-session!))

(use-fixtures :once graph-ready)

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

(deftest person-from-user-test
  (testing "Test the person-from-user database query"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (is (= {test-username 1.0}
           (-> test-user (person-from-user {:start 0 :limit 10})
               first s/email-addr)))
    
    (auth/delete-user! test-user)))

(deftest emails-from-user-test
  (testing "Test the emails-from-user database query"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (is (= '() (emails-from-user test-user {:start 0 :limit 10})))
    
    (auth/delete-user! test-user)))

(deftest emails-linked-test
  (testing "Test the emails-linked database query"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (is (= '() (emails-linked
                test-user {:start 0 :limit 10
                           :person-id 17 :link s/email-to})))
    
    (auth/delete-user! test-user)))

(deftest emails-with-dates-test
  (testing "Test the emails-with-dates database query"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (is (= '() (emails-with-dates test-user 0 10)))
    
    (auth/delete-user! test-user)))

(deftest all-scanned-test
  (testing "Test the all-scanned database query"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (is (= '() (all-scanned test-user)))
    
    (auth/delete-user! test-user)))

(deftest key-link-test
  (testing "Test finding links by keys"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (is (nil? (key-link test-user {:key "notarealkey"})))
    
    (auth/delete-user! test-user)))

(deftest node-id-test
  (testing "Test finding node from ID"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (is (nil? (node-by-id test-user {:id 0 :type s/person})))
    
    (auth/delete-user! test-user)))

(deftest nonlp-count-test
  (testing "Test finding nodes with no NLP"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (is (= 0 (nonlp-count test-user)))
    (auth/delete-user! test-user)))

(deftest scan-overlaps-test
  (testing "Test the scan-overlaps database query"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (is (= '() (scan-overlaps test-user 1000000)))
    
    (auth/delete-user! test-user)))

(deftest event-related-test
  (testing "Test the event-related database query"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (is (= '() (event-related test-user {:start 0 :limit 10
                                         :person-id "17"})))
    
    (auth/delete-user! test-user)))

(deftest loc-related-test
  (testing "Test the loc-related database query"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (is (= '() (loc-related test-user {:start 0 :limit 10
                                       :person-id "17"})))
    
    (auth/delete-user! test-user)))

(deftest email-queue-test
  (testing "Fetch the next email queue"
    (is (some #{:queue} (keys (next-email-queue))))))

(deftest recon-count-test
  (testing "Count potential recon types"
    (is (norecon-count-all))))

(deftest search-test
  (testing "Create and search for a user"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (is (->> test-username vector (zipmap [:query])
             (full-search test-user) 
             first s/email-addr keys first
             (= test-username)))
    
    (auth/delete-user! test-user)))

(deftest email-nlp-test
  (testing "Search for emails for NLP"
    (is (email-for-nlp 1))))

