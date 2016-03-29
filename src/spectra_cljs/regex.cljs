(ns spectra_cljs.regex
  (:require [clojure.string :as str]
            [spectra_cljc.schema :as s]))

;; My own regexes
(def node-param-regex #"\<node([^\>]+)\>")
(def node-regex #"\<node((.(?!node\>))+)/node\>")
(def bracket-regex #"\>(.+)\<")
(def esc-char-regex #"\^|\[|\]|\.|\$|\{|\}|\(|\)|\\|\*|\+|\||\?|\<|\>")

(defn node-map [hypertext]
  {:text (-> bracket-regex (re-seq hypertext)
             first second)
   :link (-> node-param-regex (re-seq hypertext)
             first second (subs 1))
   :original hypertext})

(defn node-parse [text]
  (->> text (re-seq node-regex)
       (map first) (map node-map)))

(defn regex-escape [text]
  (str/replace text esc-char-regex #(str "\\" %1)))

