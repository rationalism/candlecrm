(ns candlecrm.quartz-test
  (:require [clojure.test :refer :all]
            [candlecrm.auth :as auth]
            [candlecrm.imap :as imap]
            [candlecrm.neo4j :as neo4j]
            [candlecrm.queries :as queries]
            [candlecrm.quartz :refer :all]))

(defn graph-ready [f]
  (neo4j/graph-connect!)
  (neo4j/reset-session!)
  (auth/load-keys!)
  (f)
  (neo4j/close-session!))

(use-fixtures :once graph-ready)

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

(deftest start-stop-test
  (testing "Start and stop the Quartz scheduler"
    (is (start!))
    (is (not (stop!)))))

(deftest create-destroy-queue
  (testing "Create and operate an email queue"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))

    (with-redefs [imap/fetch-imap-folder (fn [& x] nil)
                  imap/last-uid (fn [x] 777777)
                  println (fn [& x] nil)]
      (imap/add-new-queue! test-user)
      (refresh-queue! test-user)
      (queries/next-email-queue test-user))

    (auth/delete-user! test-user)))
