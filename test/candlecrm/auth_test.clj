(ns candlecrm.auth-test
  (:require [clojure.test :refer :all]
            [candlecrm.auth :refer :all]
            [candlecrm.environ :refer [env]]
            [candlecrm.neo4j :as neo4j]
            [candlecrm_cljc.schema :as s]))

(defn graph-ready [f]
  (neo4j/graph-connect!)
  (neo4j/reset-session!)
  (load-keys!)
  (f)
  (neo4j/close-session!))

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

(deftest token-test
  (testing "Encode and decode a user's token"
    (def test-user (create-user! {:username test-username
                                  :password test-password}))
    (def token (make-token test-user))
    (is (-> token :token user-from-token (.id)
            (= (.id test-user))))
    (delete-user! test-user)))

(deftest user-checks
  (testing "New user and password checks"
    (is (not (password-check test-password test-password)))
    (is (not (new-user-check test-username test-password
                             test-password)))))
