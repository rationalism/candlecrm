(ns spectra.compare
  (:require [clojure.string :as str]
            [spectra.common :refer :all]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [org.apache.commons.math3.distribution NormalDistribution]))

(def random-limit 21)
(def pretty-mult 100.0)

(defn reciprocal [x]
  (/ 1.0 x))

(defn logit [x]
  (-> x (/ pretty-mult)
      (* -1) Math/exp
      (+ 1) reciprocal))

(defn inverse-logit [x]
  (-> x (* -1) (+ 1.0)
      (/ x) Math/log (* -1)
      (* pretty-mult)))

(defn gaussian-sample [mean sd n]
  (let [dist (NormalDistribution. mean sd)]
    (take n (repeatedly #(.sample dist)))))

(defn estimate-init [candidates]
  (->> (/ (- random-limit 1) 2)
       (* pretty-mult) (repeat (count candidates))
       (zipvec candidates) vec))

(defn test-candidates [n]
  (->> #(* pretty-mult (rand-int random-limit))
       (repeatedly n) (zipvec (range n))))

(defn test-score [c1 c2]
  (-> (second c2) (- (second c1))
      (gaussian-sample pretty-mult 1)
      first logit))

(defn adjust-size [cs i cmp]
  (-> (cmp (first (nth cs i))
           (first (nth cs (inc i))))
      inverse-logit
      (- (second (nth cs (inc i))))
      (+ (second (nth cs i)))
      (/ 2.0)))

(defn adjust-score [adj]
  (fn [score]
    (update score 1 #(+ % adj))))

(defn sort-second [coll]
  (sort-by second coll))

(defn adjust-scores [cs i cmp]
  (let [adj (adjust-size cs i cmp)]
    (-> (update cs i (adjust-score (- adj)))
        (update (inc i) (adjust-score adj))
        sort-second vec)))

(defn estimate-scores [candidates cmp]
  (let [c (count candidates)
        n (-> c Math/log Math/ceil int (* (dec c)))]
    (loop [scores (estimate-init candidates)
           i 0 cnt 0]
      (if (= cnt n)
        (reverse scores)
        (recur (adjust-scores scores i cmp)
               (mod (inc i) (dec c)) (inc cnt))))))
