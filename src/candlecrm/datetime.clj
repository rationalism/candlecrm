(ns candlecrm.datetime
  (:require [clojure.string :as str]
            [clojure.java.io :as io]
            [clj-time.core :as ctime]
            [clj-time.coerce :as coerce]
            [clj-time.format :as format]
            [candlecrm_cljc.schema :as s]
            [candlecrm.common :refer :all]
            [candlecrm.mallet :as mallet]
            [candlecrm.model :as model]
            [candlecrm.regex :as regex]
            [candlecrm.weka :as weka]
            [candlecrm.environ :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.joestelmach.natty CalendarSource Parser]
           [java.text SimpleDateFormat]
           [java.util Date]))

(defonce bad-date-model (atom nil))

(def bad-date-threshold 0.5)

(defn load-date-model! []
  (let [models-dir "models" bad-date-file "baddates.dat"]
    (->> bad-date-file (str models-dir "/")
         io/resource deserialize (reset! bad-date-model))))

(defn bad-model-features [text]
  (concat (model/bag-of-chars text)
          [(count text)
           (model/count-tokens text)
           (model/cap-ratio text)]))

(defn is-good-date? [text]
  (let [{:keys [bayes forest]} @bad-date-model]
    (->> text vector (mallet/classify-bayes bayes) first
         second (conj (vec (bad-model-features text)))
         (weka/classify forest) (< 0.5))))

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

(def date-tree-map {"MONTH_OF_YEAR" s/has-month "DAY_OF_MONTH" s/has-date
                    "YEAR_OF" s/has-year "week" s/has-week
                    "HOURS_OF_DAY" s/has-hour "MINUTES_OF_HOUR" s/has-minute
                    "DAY_OF_WEEK" s/has-day "day" s/has-date
                    "year" s/has-year "month" s/has-month
                    "minute" s/has-minute "hour" s/has-hour})

(defn tree-nodes [date-tree]
  (->> date-tree .getChildren (mapcat tree-nodes)
       (concat [(.getText date-tree)])
       (map #(if (string? %) (date-tree-map %) %))
       (remove nil?)))

(defn all-nodes [date-groups]
  (->> date-groups (map #(.getSyntaxTree %))
       (mapcat tree-nodes) distinct
       (mapv #(vector % true)) (into {})))

(defn specific? [[date-group date-tree]]
  (->> [s/has-minute s/has-hour s/has-day s/has-date]
       (map #(contains? date-tree %)) (remove false?)
       empty? not))

(defn parse-dates [text reference]
  (try
    (->> (parse-dates-raw text reference)
         (remove #(-> % (.getText) regex/silly-date?)))
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
        (map #(.getText %))))
  ([specific-mode? reference text]
   (let [filter-fn (if specific-mode? #(filter specific? %)
                       #(remove specific? %))]
     (->> reference (parse-dates text) (map vector)
          (map (juxt identity all-nodes)) filter-fn
          (map ffirst) (map #(.getText %))))))

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
  (->> filename file-slurp (map bad-model-features) (mapv vec)))

(defn zero-lines [lines]
  (map #(conj % 0.0) lines))

(defn one-lines [lines]
  (map #(conj % 1.0) lines))

(defn train-bad-model [goodfile badfile]
  (->> [badfile goodfile] (map file-train)
       ((switch zero-lines one-lines)) (apply concat)
       weka/make-forest))

(defn line-scores [bmodel lines]
  (->> lines (mallet/classify-bayes bmodel) (map second)
       (map vector) (zipvec (map bad-model-features lines))
       (map #(apply concat %)) (map vec)))

(defn zero-lines [lines]
  (map #(conj % 0.0) lines))

(defn one-lines [lines]
  (map #(conj % 1.0) lines))

(defn train-date-model [goodfile badfile]
  (let [gdata (file-slurp goodfile) bdata (file-slurp badfile)
        bmodel (->> (map #(vector % "b") bdata)
                    (concat (map #(vector % "g") gdata))
                    mallet/make-bayes)]
    (->> [bdata gdata] (map #(line-scores bmodel %))
         ((switch zero-lines one-lines)) (apply concat)
         weka/make-forest (hash-map :forest)
         (merge {:bayes bmodel}))))
