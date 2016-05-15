(ns spectra.regex
  (:require [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra_cljc.schema :as s])
  (:import [com.google.i18n.phonenumbers PhoneNumberUtil]))

;; Taken from http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
(def email-regex #"[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*")

;; Find source for this
(def url-regex #"[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?")

;; My own regexes
(def javascript-regex #"\<javascript([^\>]+)\>")
(def tag-regex #"\<([^\>]*)\>")
(def esc-char-regex #"\^|\[|\]|\.|\$|\{|\}|\(|\)|\\|\*|\+|\||\?|\<|\>")

(defn regex-escape [text]
  (str/replace text esc-char-regex #(str "\\" %1)))

(defn regex-or [coll]
  (->> (map regex-escape coll)
       (str/join "|") re-pattern))

(defn find-email-addrs [text]
  (->> text (re-seq email-regex)
       (remove #(.contains % "..."))))

(defn find-urls [text]
  (map first (re-seq url-regex text)))

(defn strip-javascript [text]
  (str/replace text javascript-regex ""))

(defn strip-tags [text]
  (str/replace text tag-regex ""))

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
  (map #(.rawString %) 
       (.findNumbers
        (PhoneNumberUtil/getInstance)
        text default-region)))

(defn phone-person [number]
  (assoc {} :phone number :label s/person))

(defn find-phone-people [text]
  (->> (find-phone-nums text)
       (map phone-person)
       distinct))
