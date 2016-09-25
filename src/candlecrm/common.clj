(ns candlecrm.common
  (:require [clojure.string :as str]
            [clojure.java.io :as io]
            [pandect.algo.sha1 :as sha1]
            [taoensso.encore :as enc]
            [candlecrm.environ :refer [env]]
            [taoensso.timbre :as timbre
             :refer (log trace info warn error fatal report
                         spy get-env log-env)]
            [taoensso.timbre.appenders.core :as appenders]
            [taoensso.timbre.appenders.3rd-party.gelf :as gelf])
  (:import [java.util Date]
           [java.io File FileInputStream FileOutputStream
            ObjectInputStream ObjectOutputStream]
           [org.graylog2.gelfclient GelfConfiguration]
           [java.net InetSocketAddress]))

;; Common library functions. Shouldn't depend on anything else.

(defn in-dev? []
  (= (env :in-dev) "true"))

(defn spit-appenders []
  {:spit
   (appenders/spit-appender
    {:min-level :debug
     :fname (str (env :log-dir) (env :log-file))})
   :println
   (assoc (appenders/println-appender)
          :min-level :debug)})

(defn graylog-appender []
  {:graylog
   (gelf/gelf-appender
    (env :graylog-server) (Integer/parseInt (env :graylog-port)) :tcp)
   :println
   (assoc (appenders/println-appender)
          :enabled? false)})

(defn log-setup! []
  (timbre/merge-config!
   {:appenders
    (if (in-dev?) (spit-appenders) (graylog-appender))})
  (Thread/setDefaultUncaughtExceptionHandler
   (reify Thread$UncaughtExceptionHandler
     (uncaughtException [_ thread ex]
       (error ex "Uncaught exception on"
              (.getName thread))))))

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

(defn catch-lazy [x]
  (if (coll? x) (mapv catch-lazy x) x))

(defn print-params [params]
  (map (fn [p] `(str "Value of " (name '~p) ": " (catch-lazy ~p)))
       params))

(defn add-try-catch [fn-name params body]
  `(try ~@body
        (catch Exception e#
          (->> [~@(print-params params)]
               (concat [(str "Error thrown in function: "
                             (name '~fn-name))
                        (str "Error message: " (pr-str e#))])
               (str/join "\n") throw-error!)
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

(defn rconj [a b]
  (conj b a))

(defn rcons [a b]
  (cons b a))

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

(defn to-ms [some-date]
  (.getTime some-date))

(defn catch-dates [value]
  (if (= Date (type value))
    (to-ms value) value))

(defn catch-dates-map [pair]
  (update pair 1 catch-dates))

(defn map-int [coll]
  (map #(Integer/parseInt %) coll))

(defn clojure-map [m]
  (if m (into {} (java.util.HashMap. m)) {}))

(defn switch [& fns]
  (fn [coll]
    (map #(%1 %2) fns coll)))

(defn mapvals [fn coll]
  (->> coll (map fn) (zipmap coll)))

(defn mapkeys [fn coll]
  (zipmap (map fn coll) coll))

(defn beam [n coll]
  (apply map vector
         (for [i (range n)]
           (->> n (- (count coll)) inc (+ i)
                (subvec coll i)))))

(defn serialize [obj filename]
  (-> (FileOutputStream. filename)
      ObjectOutputStream. 
      (.writeObject obj)))

(defn deserialize-stream [stream]
  (.readObject (ObjectInputStream. stream)))

(defn deserialize [resource]
  (->> resource io/input-stream deserialize-stream))

(defn average [coll]
  (if (empty? coll) 0.0
      (/ (apply + coll) (count coll))))

(defn map-first [coll]
  (map #(map first %) coll))

(defn strip-quotes [s]
  (subs s 1 (dec (count s))))
