(ns candlecrm.ajax-test
  (:require [clojure.test :refer :all]
            [candlecrm.ajax :refer :all]
            [candlecrm.auth :as auth]
            [candlecrm.neo4j :as neo4j]
            [candlecrm_cljc.schema :as s]))

(defn graph-ready [f]
  (neo4j/graph-connect!)
  (neo4j/reset-session!)
  (auth/load-keys!)
  (f)
  (neo4j/close-session!))

(use-fixtures :once graph-ready)

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

(deftest router-broadcaster
  (testing "Start and stop of Sente server"
    (start-router!)
    (is chsk-send!)
    (stop-router!)))

(deftest routing-test
  (testing "Ajax routing functions"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))

    (is (= test-username
           (s/email-addr (event-msg-handler* {:event nil :id :update/user-data
                                              :identity test-user :?data []
                                              :ring-req {:identity test-user}
                                              :?reply-fn identity :send-fn nil}))))
    
    (auth/delete-user! test-user)))
