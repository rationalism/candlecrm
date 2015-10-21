(ns spectra.regex
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.schema :as s]
            [environ.core :refer [env]])
  (:import [com.google.i18n.phonenumbers PhoneNumberUtil]))

;; Taken from http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
(def email-regex #"[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*")

(defn find-email-addrs [text]
  (re-seq email-regex text))

(defn email-person [addr]
  (assoc {} s/email-addr (vector addr)
         :label s/person))

(defn find-email-people [text]
  (->> (find-email-addrs text)
       (map email-person)
       distinct))

(defn one-email? [text]
  (= (count (find-email-addrs text)) 1))

(defn filter-arrows [text]
  (-> text
      (str/replace "<" "")
      (str/replace ">" "")))

(defn parse-name [text email]
  (-> text
      (str/replace email "")
      filter-arrows
      str/trim))
  
(defn parse-name-email [text]
  (let [addrs (find-email-addrs text)]
    (if (= 1 (count addrs))
      (let [found-name (parse-name text (first addrs))]
        (if (>= (count found-name) 3)
          {:email (first addrs) :name found-name}
          {:email (first addrs)}))
      {:name text})))

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
