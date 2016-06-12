(ns spectra.datetime
  (:require [clj-time.core :as ctime]
            [clj-time.coerce :as coerce]
            [clj-time.format :as format]
            [spectra.common :refer :all]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.joestelmach.natty CalendarSource Parser]
           [java.text SimpleDateFormat]
           [java.util Date]))

;; Arbitrary date: 1960-01-02 05:11:48.874
(def ref-date-1 (java.util.Date. -315514073744))

;; Arbitrary date: 1960-01-14 20:00:26.256
(def ref-date-2 (java.util.Date. -314423973744))

(def known-bad ["may"])

(defn interval? [natty-date]
  (let [parsed-date (-> natty-date (.getDates) vec)]
    (and (= 2 (count parsed-date))
         (not= (first parsed-date) (second parsed-date)))))

(defn has-info? [[d1 d2 d3]]
  (let [n1 (first (.getDates d1))
        n2 (first (.getDates d2))]
    (or (interval? d3)
        (= (.getDate n1) (.getDate n2))
        (= (.getHours n1) (.getHours n2)))))

(defn is-bad? [natty-date]
  (some #{(.getText natty-date)} known-bad))

(defn parse-dates-raw [text reference]
  (CalendarSource/setBaseDate reference)
  (.parse (Parser. ) text))

(defn parse-dates [text reference]
  (try
    (->> [ref-date-1 ref-date-2 reference]
         (mapv #(parse-dates-raw text %))
         (apply map vector)
         (filter has-info?) (map third)
         (remove is-bad?))
    (catch java.lang.NullPointerException e
      (do (throw-info! (str "Date parse error on: " text))
          []))))

(defn unix-dates [text reference]
  (->> (parse-dates text reference)
       (mapv #(.getDates %)) (map vec)))

(defn now []
  (Date. ))

(defn future-ms [ms]
  (-> (now) (.getTime) (+ ms) (Date.)))

(defn dates-in-text
  ([text] (dates-in-text text (now)))
  ([text reference]
   (->> (unix-dates text reference)
        flatten distinct)))

(defn intervals-in-text 
  ([text] (intervals-in-text text (now)))
  ([text reference]
   (->> (unix-dates text reference)
        (remove #(= (first %) (second %)))
        distinct)))

(defn find-dates
  ([text] (find-dates text (now)))
  ([text reference]
   (->> reference (parse-dates text)
        (map #(.getText %)))))

(defn find-intervals
  ([text] (find-intervals text (now)))
  ([text reference]
   (->> (parse-dates text reference)
        (filter interval?)
        (map #(.getText %)))))

(defn to-ms [some-date]
  (.getTime some-date))

(defn has-ms? [some-date]
  (-> some-date .getTime (mod 1000) (not= 0)))

(defn format-year [some-date]
  (-> "yyyy" SimpleDateFormat. (.format some-date)))

(defn catch-dates [value]
  (if (= Date (type value))
    (to-ms value) value))

(defn catch-dates-map [pair]
  (update pair 1 catch-dates))

(def formatter (format/formatters :rfc822))

(defn format-date [value]
  (->> (Date. value) coerce/from-date
       (format/unparse formatter)))
