(ns spectra.quartz-test
  (:require [clojure.test :refer :all]
            [spectra.auth :as auth]
            [spectra.imap :as imap]
            [spectra.queries :as queries]
            [spectra.quartz :refer :all]))

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
      (add-new-queue! test-user)
      (refresh-queue! test-user)
      (queries/next-email-queue test-user))

    (auth/delete-user! test-user)))
