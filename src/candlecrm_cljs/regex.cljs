(ns candlecrm_cljs.regex
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]))

;; My own regexes
(def node-param-regex #"\<node([^\>]+)\>")
(def node-regex #"\<node((.(?!node\>))+)/node\>")
(def url-regex #"\<url((.(?!url\>))+)/url\>")
(def bracket-regex #"\>(.+)\<")
(def esc-char-regex #"\^|\[|\]|\.|\$|\{|\}|\(|\)|\\|\*|\+|\||\?|\<|\>")

(defn node-map [hypertext]
  {:text (-> bracket-regex (re-seq hypertext)
             first second)
   :link (-> node-param-regex (re-seq hypertext)
             first second (subs 1))
   :original hypertext :type :node})

(defn url-truncate [url]
  (if (> (count url) 30)
    (str (subs url 0 30) "...")
    url))

(defn url-map [hypertext]
  (let [url (-> bracket-regex (re-seq hypertext)
                first second)]
    {:text (url-truncate url) :type :url
     :link url :original hypertext}))

(defn node-parse [text]
  (->> text (re-seq node-regex)
       (map first) (map node-map)))

(defn url-parse [text]
  (->> text (re-seq url-regex)
       (map first) (map url-map)))

(defn links-parse [text]
  (->> text ((juxt node-parse url-parse))
       (apply concat)))

(defn regex-escape [text]
  (str/replace text esc-char-regex #(str "\\" %1)))

