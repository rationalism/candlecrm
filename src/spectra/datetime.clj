(ns spectra.datetime
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.common :as com]
            [spectra_cljc.schema :as s]
            [clj-time.core :as ctime]
            [clj-time.coerce :as coerce]
            [clj-time.format :as format]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.joestelmach.natty CalendarSource Parser]
           [java.text SimpleDateFormat]
           [java.util Date]))

(defn interval? [natty-date]
  (let [parsed-date (-> natty-date (.getDates) vec)]
    (and (= 2 (count parsed-date))
         (not= (first parsed-date) (second parsed-date)))))

(defn no-info? [natty-date reference]
  (and (not (interval? natty-date))
       (= (first (.getDates natty-date))
          reference)))

(defn parse-dates [text reference]
  (p :find-dates
     (CalendarSource/setBaseDate reference)
     ;; This try-catch block needed in case of parse errors
     (try (->> (.parse (Parser. ) text)
               (remove #(no-info? % reference)))
          (catch Exception e []))))

(defn unix-dates [text reference]
   (->> (parse-dates text reference)
        (mapv #(.getDates %)) (map vec)))

(defn now []
  (Date. ))

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
   (->> (parse-dates text reference)
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
  (-> (SimpleDateFormat. "yyyy")
      (.format some-date)))

(defn catch-dates [value]
  (if (= Date (type value))
    (to-ms value) value))

(defn catch-dates-map [pair]
  [(key pair) (catch-dates (val pair))])

(def formatter (format/formatters :rfc822))

(defn format-date [value]
  (->> (Date. value) coerce/from-date
       (format/unparse formatter)))

(defn hours-ago
  ([date] (hours-ago date (now)))
  ([date ref]
   (->> (coerce/from-date date) vector
        (concat [(coerce/from-date ref)])
        reverse (apply ctime/interval)
        ctime/in-hours)))
