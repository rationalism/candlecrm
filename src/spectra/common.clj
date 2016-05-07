(ns spectra.common
  (:require [pandect.algo.sha1 :as sha1]))

;; Common library functions. Shouldn't depend on anything else.

(defn reset-if-found! [list header index]
  (if (and (not (nil? list)) (pos? (count list)))
    (reset! (index header) (first list))))

(defn merge-if-found! [list header index]
  (if (and (not (nil? list)) (pos? (count list)))
    (reset! (index header)
            (merge (first list)
                   (deref (index header))))))

(defn slice [start end coll]
  (->> coll (take end) (drop start)))

(defn slice-not [start end coll]
  (concat (take start coll) (drop end coll)))

(defn nil-or-empty? [item]
  (or (nil? item) (empty? item)))

(defn not-nil-ext? [item]
  (if (coll? item)
    (and (seq item)
         (not-any? nil? item))
    (not (nil? item))))

(defn sha1 [text]
  {:pre [(not (nil-or-empty? text))]}
  (sha1/sha1 text))

(defn compose-maps [a b]
  (zipmap (keys a)
          (->> (keys a) (map a) (map b))))

(defn debug [x]
  (println "Debug message: ")
  (println x) x)

(defn val-not-nil? [pair]
  (-> pair val nil? not))
