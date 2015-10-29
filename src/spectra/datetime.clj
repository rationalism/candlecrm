(ns spectra.datetime
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [clj-time.core :as ctime]
            [clj-time.coerce :as coerce]
            [clj-time.format :as format]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.joestelmach.natty CalendarSource Parser]
           [java.text SimpleDateFormat]
           [java.util Date]))

(defn parse-dates [text reference]
  (p :find-dates
     (CalendarSource/setBaseDate reference)
     ;; This try-catch block needed in case of parse errors
     (try (.parse (Parser. ) text)
          (catch Exception e []))))

(defn dates-in-text
  ([text] (dates-in-text text (Date. )))
  ([text reference]
   (->> (parse-dates text reference)
        (map #(.getDates %))
        flatten (map first) distinct)))

(defn find-dates
  ([text] (find-dates text (Date. )))
  ([text reference]
   (->> (parse-dates text reference)
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
  (->> value (Date. ) coerce/from-date
       (format/unparse formatter)))

(defn hours-ago
  ([date] (hours-ago date (Date. )))
  ([date ref]
   (->> (coerce/from-date date) vector
        (concat [(coerce/from-date ref)])
        reverse (apply ctime/interval)
        ctime/in-hours)))
