(ns spectra.environ
  (:require [clojure.edn :as edn]
            [clojure.string :as str]
            [clojure.java.io :as io]))

;; Shamelessly stolen from https://github.com/weavejester/environ/blob/master/environ/src/spectra.environ.clj, so env variables can be changed at runtime.

(defn keywordize [s]
  (-> (str/lower-case s)
      (str/replace "_" "-")
      (str/replace "." "-")
      (keyword)))

(defn sanitize-key [k]
  (let [s (keywordize (name k))]
    (if (= k s) s (println "Warning: environ key" k
                           "has been corrected to" s))))

(defn sanitize-val [k v]
  (if (string? v) v
      (do (println "Warning: environ value" (pr-str v)
                   "for key" k "has been cast to string")
          (str v))))

(defn read-system-env []
  (->> (System/getenv)
       (map (fn [[k v]] [(keywordize k) v]))
       (into {})))

(defn read-system-props []
  (->> (System/getProperties)
       (map (fn [[k v]] [(keywordize k) v]))
       (into {})))

(defn read-env-file [f]
  (if-let [env-file (io/file f)]
    (if (.exists env-file)
      (into {} (for [[k v] (edn/read-string (slurp env-file))]
                 [(sanitize-key k) (sanitize-val k v)])))))

(defn set-env! []
  (defonce env
    (merge
     (read-env-file ".lein-env")
     (read-env-file (io/resource ".boot-env"))
     (read-system-env)
     (read-system-props))))

(set-env!)
