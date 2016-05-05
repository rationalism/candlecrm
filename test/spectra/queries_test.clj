(ns spectra.queries-test
  (:require [clojure.test :refer :all]
            [spectra.auth :as auth]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]
            [spectra.queries :refer :all]))

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

(deftest person-from-user-test
  (testing "Test the person-from-user database query"
    (def test-user (auth/create-user! {:username test-username :password test-password}))
    (is test-user)
    (is (= [test-username]
           (-> test-user (person-from-user {:start 0 :limit 10})
               first s/email-addr)))
    
    (auth/delete-user! test-user)))

(deftest emails-from-user-test
  (testing "Test the emails-from-user database query"
    (def test-user (auth/create-user! {:username test-username :password test-password}))
    (is test-user)
    (is (= '() (emails-from-user test-user {:start 0 :limit 10})))
    
    (auth/delete-user! test-user)))

(deftest emails-linked-test
  (testing "Test the emails-linked database query"
    (def test-user (auth/create-user! {:username test-username :password test-password}))
    (is test-user)
    (is (= '() (emails-linked test-user {:start 0 :limit 10 :person-id 17 :link s/email-to})))
    
    (auth/delete-user! test-user)))

(deftest emails-with-dates-test
  (testing "Test the emails-with-dates database query"
    (def test-user (auth/create-user! {:username test-username :password test-password}))
    (is test-user)
    (is (= '() (emails-with-dates test-user 0 10)))
    
    (auth/delete-user! test-user)))

(deftest all-scanned-test
  (testing "Test the all-scanned database query"
    (def test-user (auth/create-user! {:username test-username :password test-password}))
    (is test-user)
    (is (= '() (all-scanned test-user)))
    
    (auth/delete-user! test-user)))

(deftest scan-overlaps-test
  (testing "Test the scan-overlaps database query"
    (def test-user (auth/create-user! {:username test-username :password test-password}))
    (is test-user)
    (is (= '() (scan-overlaps test-user 1000000)))
    
    (auth/delete-user! test-user)))

(deftest event-related-test
  (testing "Test the event-related database query"
    (def test-user (auth/create-user! {:username test-username :password test-password}))
    (is test-user)
    (is (= '() (event-related test-user {:start 0 :limit 10 :person-id 17})))
    
    (auth/delete-user! test-user)))

(deftest loc-related-test
  (testing "Test the loc-related database query"
    (def test-user (auth/create-user! {:username test-username :password test-password}))
    (is test-user)
    (is (= '() (loc-related test-user {:start 0 :limit 10 :person-id 17})))
    
    (auth/delete-user! test-user)))

(deftest email-queue-test
  (testing "Fetch the next email queue"
    (is (some #{:queue} (keys (next-email-queue))))))

(deftest recon-count-test
  (testing "Count potential recon types"
    (is (norecon-count-all))))

(deftest search-test
  (testing "Create and search for a user"
    (def test-user (auth/create-user! {:username test-username :password test-password}))
    (is test-user)
    (is (->> test-username vector (zipmap [:query])
             (full-search test-user)
             first s/email-addr first
             (= test-username)))
    
    (auth/delete-user! test-user) ))
