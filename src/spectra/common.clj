(ns spectra.common
  (:require [pandect.algo.sha1 :as sha1]
            [taoensso.encore :as enc]))

;; Common library functions. Shouldn't depend on anything else.

(defn fn-params [[params & others]]
  (let [has-prepost-map?
        (and (map? (first others)) (next others))
        [?prepost-map & body]
        (if has-prepost-map?
          others (cons nil others))]
    (if ?prepost-map
      `(~params ~?prepost-map ~body)
      `(~params {} ~body))))

(defn fn-sigs [fn-name sigs]
  (if (vector? (first sigs))
    (fn-params sigs)
    (-> "Error: Can't handle multi-arity functions"
        (Exception. ) throw)))

(defn print-params [params]
  (map (fn [p] `(println
                 (str "Value of " (name '~p) ": "))
         `(prn ~p))
       params))

(defn add-try-catch [fn-name params body]
  `(try ~@body
        (catch Exception e#
          (println (str "Error thrown in function: "
                        (name '~fn-name)))
          (println (str "Error message: " e#))
          ~@(print-params params)
          nil)))

(defmacro defnc
  [& sigs]
  (let [[fn-name sigs] (enc/name-with-attrs
                        (first sigs) (next sigs))
        [params prepost body] (fn-sigs fn-name sigs)
        new-body (add-try-catch fn-name params body)]
    `(defn ~fn-name ~params ~prepost ~new-body)))

(defn fmap [m fn]
  (reduce #(update %1 %2 fn) m (keys m)))

(defn zipvec [a b]
  (map vector a b))

(defn echo [x]
  (println "Echo!") x)

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
