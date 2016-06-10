(ns spectra.common
  (:require [pandect.algo.sha1 :as sha1]
            [taoensso.encore :as enc]
            [environ.core :refer [env]]
            [taoensso.timbre :as timbre
             :refer (log trace debug info warn error fatal report
                         logf tracef debugf infof warnf errorf fatalf reportf
                         spy get-env log-env)]
            [taoensso.timbre.appenders.core :as appenders]))

;; Common library functions. Shouldn't depend on anything else.

(defn log-setup! []
  (timbre/merge-config!
   {:appenders
    {:spit
     (appenders/spit-appender
      {:fname (str (env :home-dir)
                   (env :log-file))})}}))

(defn throw-error! [e]
  (error e))

(defn throw-warn! [e]
  (warn e))

(defn throw-info! [e]
  (info e))

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
  (map (fn [p] `(str "Value of " (name '~p) ": " ~p))
       params))

(defn add-try-catch [fn-name params body]
  `(try ~@body
        (catch Exception e#
          (->> [(str "Error thrown in function: "
                     (name '~fn-name))
                (str "Error message: " e#)]
               (concat ~(print-params params))
               throw-error!)
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

(defn fmapl [fn m]
  (fmap m fn))

(defn zipvec [a b]
  (map vector a b))

(defn echo [x]
  (println "Echo!") x)

(defn third [x]
  (-> x next next first))

(defn fourth [x]
  (-> x next next next first))

(defn fifth [x]
  (-> x next next next next first))

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
