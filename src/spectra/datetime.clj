(ns spectra.datetime
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.joestelmach.natty Parser]))

(defn dates-in-text [text]
  (p :find-dates
     ;; This try-catch block needed in case of parse errors
     (->> (try (.parse (Parser. ) text)
               (catch Exception e []))
          (map #(.getDates %))
          flatten
          (map first)
          distinct)))

(defn to-ms [some-date]
  (.getTime some-date))

(defn catch-dates [value]
  (if (= java.util.Date (type value))
    (to-ms value) value))
