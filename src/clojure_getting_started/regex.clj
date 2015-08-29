(ns clojure-getting-started.regex
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [environ.core :refer [env]])
  (:import [com.google.i18n.phonenumbers PhoneNumberUtil]))

;; Taken from http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
(def email-regex #"[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*")

(defn find-email-addrs [text]
  (re-seq email-regex text))

(defn email-person [addr]
  (assoc {} :email addr))

(defn find-email-people [text]
  (->> (find-email-addrs text)
       (map email-person)
       distinct))

(defn one-email? [text]
  (= (count (find-email-addrs text)) 1))

(def default-region "US")

(defn find-phone-nums [text]
  (->> (.findNumbers (PhoneNumberUtil/getInstance) text default-region)
       (map #(.rawString %)))) 

(defn phone-person [number]
  (assoc {} :phone number))

(defn find-phone-people [text]
  (->> (find-phone-nums text)
       (map phone-person)
       distinct))
