(ns spectra.contacts-test
  (:require [clojure.test :refer :all]
            [spectra.contacts :refer :all])
  (:import [com.google.gdata.data.contacts ContactEntry]
           [com.google.gdata.data.extensions Email]))

(defn fake-contact []
  (doto (ContactEntry. )
    (.addEmailAddress (doto (Email. )
                        (.setAddress "foobar1@gmail.com")))
    (.addEmailAddress (doto (Email. )
                        (.setAddress "foobar2@gmail.com")))))

(def expected-person
  {:label :person
   :email-addr '("foobar1@gmail.com"
                 "foobar2@gmail.com")})

(deftest contact-extraction
  (testing "Extraction of information from contacts"
    (def c (fake-contact))
    (is c)
    (is (= expected-person (contact->person c)))))
