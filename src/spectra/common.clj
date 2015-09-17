(ns spectra.common
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

;; Common library functions. Shouldn't depend on anything else.

(defn reset-if-found! [list header index]
  (if (and (not (nil? list)) (> (count list) 0))
    (reset! (index header) (first list))))

(defn slice [start end coll]
  (->> coll (take end) (drop start)))

(defn slice-not [start end coll]
  (concat (take start coll) (drop end coll)))

(defn de-atom [pair]
  [(key pair)
   (deref (val pair))])

(defn filter-text [text]
  (-> text
      (str/replace "\r\n" " ")
      (str/replace " > " " ")
      (str/replace #"\s+" " ")))

(defn no-value? [property]
  (if (string? property)
    (empty? property)
    (nil? property)))

(defn not-nil-ext? [item]
  (if (coll? item)
    (not-any? nil? item)
    (not (nil? item))))

(defn param [args]
  [(nth args 0) (nth args 1)])

(defn make-params [& args]
  (into-array (map param args)))
 
