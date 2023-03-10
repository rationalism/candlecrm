(ns candlecrm.regex-test
  (:require [clojure.test :refer :all]
            [candlecrm_cljc.schema :as s]
            [candlecrm.regex :refer :all]))

(def test-name "Joe Smith")
(def test-email "joesmith@gmail.com")
;; This CAN'T be a 555 number or the parser rejects it as invalid
(def test-phone "(203) 850-2427")
(def test-both "Joe Smith <joesmith@gmail.com>")

(def test-phone-text "Joe's phone number is (203) 850-2427")
(def test-email-text "Joe's email is joesmith@gmail.com")

(deftest email-regex-test
  (testing "Finding email addresses"
    (is (one-email? test-email))
    (is (one-email? test-email-text))
    (is (not (one-email? test-name)))
    (is (one-email? test-both))
    (is (= test-email (first (find-email-addrs test-email))))
    (is (= test-email (first (find-email-addrs test-email-text))))
    (is (= test-email (first (find-email-addrs test-both))))))

(deftest email-parse-test
  (testing "Parsing email/name combos"
    (is (= {s/s-name test-name}
           (parse-name-email test-name)))
    (is (= {s/email-addr test-email}
           (parse-name-email test-email)))
    (is (= {s/s-name test-name s/email-addr test-email}
           (parse-name-email test-both)))
    (is (= (find-email-people test-email)
           [{s/email-addr [test-email] s/type-label s/person}]))))

(deftest phone-regex-test
  (testing "Parsing phone numbers"
    (is (empty? (find-phone-nums test-name)))
    (is (empty? (find-phone-nums test-email)))
    (is (= test-phone
           (first (find-phone-nums test-phone-text))))
    (is (= (find-phone-people test-phone)
           [{:phone test-phone :label :person}]))))
