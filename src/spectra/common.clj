(ns spectra.common
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [environ.core :refer [env]]
            [pandect.algo.sha1 :as sha1]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

;; Common library functions. Shouldn't depend on anything else.

(defn reset-if-found! [list header index]
  (if (and (not (nil? list)) (> (count list) 0))
    (reset! (index header) (first list))))

(defn merge-if-found! [list header index]
  (if (and (not (nil? list)) (> (count list) 0))
    (reset! (index header)
            (merge (first list)
                   (deref (index header))))))

(defn slice [start end coll]
  (->> coll (take end) (drop start)))

(defn slice-not [start end coll]
  (concat (take start coll) (drop end coll)))

(defn de-atom [pair]
  [(key pair)
   (deref (val pair))])

(defn no-value? [property]
  (if (string? property)
    (empty? property)
    (nil? property)))

(defn nil-or-empty? [item]
  (or (nil? item) (empty? item)))

(defn not-nil-ext? [item]
  (if (coll? item)
    (and (not (empty? item))
         (not-any? nil? item))
    (not (nil? item))))

(defn param [args]
  [(nth args 0) (nth args 1)])

(defn make-params [& args]
  (into-array (map param args)))

(defn sha1 [text]
  {:pre [(not (nil-or-empty? text))]}
  (sha1/sha1 text))

(defn shorten [text]
  (if (> (count text) 10)
    (subs text (- (count text) 10))
    text))

(defn end-hash [text]
  (-> text shorten sha1))

(defn compose-maps [a b]
  (zipmap (keys a)
          (->> (keys a) (map a) (map b))))

(defn debug [x]
  (prn "Debug message: ") (prn x) x)

(defn map-values [m keys f & args]
  (reduce #(apply update-in %1 [%2] f args) m keys))
