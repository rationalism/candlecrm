(ns spectra.datetime
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [clj-time.coerce :as coerce]
            [clj-time.format :as format]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.joestelmach.natty CalendarSource Parser]))

(defn parse-dates [text reference]
  (p :find-dates
     (CalendarSource/setBaseDate reference)
     ;; This try-catch block needed in case of parse errors
     (try (.parse (Parser. ) text)
          (catch Exception e []))))

(defn dates-in-text
  ([text] (dates-in-text text (java.util.Date. )))
  ([text reference]
   (->> (parse-dates text reference)
        (map #(.getDates %))
        flatten
        (map first)
        distinct)))

(defn find-dates
  ([text] (find-dates text (java.util.Date. )))
  ([text reference]
   (->> (parse-dates text reference)
        (map #(.getText %)))))

(defn to-ms [some-date]
  (.getTime some-date))

(defn catch-dates [value]
  (if (= java.util.Date (type value))
    (to-ms value) value))

(defn catch-dates-map [pair]
  [(key pair)
   (catch-dates (val pair))])

(def formatter (format/formatters :rfc822))

(defn format-date [value]
  (->> value (java.util.Date. )
       coerce/from-date
       (format/unparse formatter)))
      
