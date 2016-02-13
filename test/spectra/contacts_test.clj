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

;; THIS IS BROKEN

(def expected-person
  {:hash "dfbb3be9276784fd972f9f4175633823485cfb64"
   :label :person
   :email-addr '("foobar2@gmail.com")})

(deftest contact-extraction
  (testing "Extraction of information from contacts"
    (def c (fake-contact))
    (is c)
    (is (= expected-person (contact->person c)))))
