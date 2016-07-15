(ns spectra.datetime
  (:require [clojure.string :as str]
            [clj-time.core :as ctime]
            [clj-time.coerce :as coerce]
            [clj-time.format :as format]
            [spectra.common :refer :all]
            [spectra.mallet :as mallet]
            [spectra.model :as model]
            [spectra.weka :as weka]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.joestelmach.natty CalendarSource Parser]
           [java.text SimpleDateFormat]
           [java.util Date]))

(defonce bad-date-model (atom nil))

(def models-dir (str (env :home-dir) "resources/models"))
(def bad-date-file "baddates.dat")
(def bad-date-threshold 0.9)

(defn load-date-model! []
  (->> bad-date-file (str models-dir "/")
       deserialize (reset! bad-date-model)))

(load-date-model!)

(defn bad-model-features [text]
  (concat (model/bag-of-chars text)
          [(count text)
           (model/count-tokens text)
           (model/cap-ratio text)]))

(defn is-bad-date? [text]
  (->> text bad-model-features
       (weka/classify @bad-date-model)
       (> bad-date-threshold)))

(defn interval? [natty-date]
  (let [parsed-date (-> natty-date (.getDates) vec)]
    (and (= 2 (count parsed-date))
         (not= (first parsed-date) (second parsed-date)))))

(defnp parse-dates-raw [text reference]
  (CalendarSource/setBaseDate reference)
  (.parse (Parser. ) text))

(defn spit-dates [dates]
  (mapv #(spit "/home/alyssa/alldates.txt" (str (.getText %) "\n")
               :append true) dates) dates)

(defn parse-dates [text reference]
  (try
    (->> (parse-dates-raw text reference) spit-dates
         #_(remove #(-> % (.getText) is-bad-date?)))
    (catch java.lang.NullPointerException e
      (do (throw-info! (str "Date parse error on: " text))
          []))))

(defn unix-dates [text reference]
  (->> (parse-dates text reference)
       (mapv #(.getDates %)) (map vec)))

(defn now []
  (Date. ))

(defn add-ms [date ms]
  (-> date .getTime (+ ms) (Date.)))

(defn future-ms [ms]
  (add-ms (now) ms))

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

(defn has-ms? [some-date]
  (-> some-date .getTime (mod 1000) (not= 0)))

(defn format-year [some-date]
  (-> "yyyy" SimpleDateFormat. (.format some-date)))

(def formatter (format/formatters :rfc822))

(defn format-date [value]
  (->> (Date. value) coerce/from-date
       (format/unparse formatter)))

(defn file-slurp [filename]
  (str/split (slurp filename) #"\n"))

(defn file-train [filename]
  (->> filename file-slurp
       (map bad-model-features) (mapv vec)))

(defn train-bad-model [goodfile badfile]
  (->> (map #(conj % 0.0) (file-train badfile))
       (concat (map #(conj % 1.0) (file-train goodfile)))
       weka/make-forest))

(defn train-date-model [goodfile badfile]
  (->> (map #(vector % "b") (file-slurp badfile))
       (concat (map #(vector % "g") (file-slurp goodfile)))
       mallet/make-bayes))
