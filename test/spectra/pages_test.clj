(ns spectra.pages-test
  (:require [clojure.test :refer :all]
            [spectra.auth :as auth]
            [spectra.pages :refer :all]))

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

(deftest load-pages
  (testing "Load pages"
    (def test-user (auth/create-user! {:username test-username :password test-password}))
    (def req {:identity test-user :flash ""})

    (is (login req))
    (is (app-page req))
    (is (gmail req))
    (is (reset-pwd req))
    
    (auth/delete-user! test-user)))
