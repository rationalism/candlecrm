(ns candlecrm.html-test
  (:require [clojure.test :refer :all]
            [candlecrm.html :refer :all]))

(deftest load-html
  (testing "Load HTML forms, make sure they aren't null"
    (is (base-template "foobar"))
    (is (app-template "foobar"))
    (is (login-form))
    (is (gmail-setup "" "foobar" "www.foobar.com"))
    (is (signup-form "foobar"))))

