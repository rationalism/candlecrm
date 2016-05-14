(ns spectra.compare
  (:require [clojure.string :as str]
            [spectra.common :as com])
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

(defn test-candidates [n]
  (->> #(* pretty-mult (rand-int random-limit))
       (repeatedly n)
       (zipmap (range n))))

(defn estimate-init [n]
  (->> (/ (- random-limit 1) 2)
       (* pretty-mult) (repeat n)
       (zipmap (range n))))

(defn test-score [c1 c2]
  (-> (second c2) (- (second c1))
      (gaussian-sample pretty-mult 1)
      first logit))
