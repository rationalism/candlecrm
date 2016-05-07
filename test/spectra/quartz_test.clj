(ns spectra.quartz-test
  (:require [clojure.test :refer :all]
            [spectra.auth :as auth]
            [spectra.email :as email]
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

    (with-redefs [email/fetch-imap-folder (fn [x] nil)
                  email/last-uid (fn [x] 777777)
                  println (fn [& x] nil)]
      (add-new-queue! test-user)
      (refresh-queue! test-user)
      (def q (queries/next-email-queue test-user))
      (queue-reset! (:queue q)))

    (auth/delete-user! test-user)))
