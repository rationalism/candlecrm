(ns candlecrm.pages-test
  (:require [clojure.test :refer :all]
            [clojure.string :as str]
            [candlecrm.auth :as auth]
            [candlecrm.neo4j :as neo4j]
            [candlecrm_cljc.schema :as s]
            [candlecrm.sendgrid :as sendgrid]
            [candlecrm.pages :refer :all]))

(defn graph-ready [f]
  (neo4j/graph-connect!)
  (neo4j/reset-session!)
  (auth/load-keys!)
  (f)
  (neo4j/close-session!))

(use-fixtures :once graph-ready)

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")
(def test-password-new "somefakepassword")

(deftest load-pages
  (testing "Load pages"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (def req {:identity test-user :flash ""})

    (is (login req))
    (is (app-page req))
    (is (gmail req))
    (is (reset-pwd req))
    (is (login-form req))
    (is (homepage req))
    (is (homepage {}))
    (is (login-needed "/fake-url"))
    (is (new-password test-user "fake-token"))
    (is (reset-confirm {:params {:token "foobar"}}))
    
    (auth/delete-user! test-user)))

(defn split-newline [s]
  (str/split s #"\n"))

(defn split-eq [s]
  (str/split s #"="))

(deftest password-reset-test
  (testing "Reset a user's password"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))

    (is (-> {:username test-username
             :password test-password}
            login :cookies (get "token") :value))

    (is (-> {:username test-username
             :password test-password-new}
            login :cookies not))
    
    (with-redefs [sendgrid/send-email! (fn [e] (def reset-email e))]
      (request-reset {:params {:username test-username}}))

    (is (= test-username (s/email-to reset-email)))

    (def token (->> reset-email s/email-body split-newline
                    (filter #(.contains % "reset-confirm")) first
                    split-eq second))

    (is (set-password {:params {:token token :password test-password-new
                                :confirm test-password-new}}))

    (is (-> {:username test-username
             :password test-password-new}
            login :cookies (get "token") :value))

    (is (-> {:username test-username
             :password test-password}
            login :cookies not))
    
    (auth/delete-user! test-user)))
