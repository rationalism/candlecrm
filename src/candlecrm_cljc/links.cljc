(ns candlecrm_cljc.links
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]))

;; My own regexes
(def node-param-regex #"\<node([^\>]+)\>")
(def node-regex #"\<node((.(?!node\>)|\n)+)/node\>")
(def url-regex #"\<url((.(?!url\>)|\n)+)/url\>")
(def bracket-regex #"\>((.|\n)+)\<")
(def esc-char-regex #"\^|\[|\]|\.|\$|\{|\}|\(|\)|\\|\*|\+|\||\?|\<|\>")

(defn node-map [hypertext]
  {:text (-> bracket-regex (re-seq hypertext)
             first second)
   :link (-> node-param-regex (re-seq hypertext)
             first second (subs 1))
   :original hypertext :type :node})

(defn url-truncate [url]
  (if (<= (count url) 40) url
      (str (subs url 0 40) "...")))

(defn url-map [hypertext]
  (let [url (-> bracket-regex (re-seq hypertext)
                first second)]
    {:text (url-truncate url) :type :url
     :link url :original hypertext}))

(defn split-newline [m]
  (let [text-pieces (str/split (:text m) #"\n")
        orig-pieces (str/split (:original m) #"\n")]
    (if (not= (count text-pieces) (count orig-pieces)) [m]
        (map #(merge {:link (:link m) :type (:type m)}
                     {:text %1 :original %2})
             text-pieces orig-pieces))))

(defn catch-newlines [nodes]
  (mapcat #(if (not= -1 (.indexOf (:text %) "\n"))
             (split-newline %) (vector %)) nodes))

(defn node-parse [text]
  (->> text (re-seq node-regex) (map first)
       (map node-map) catch-newlines))

(defn url-parse [text]
  (->> text (re-seq url-regex)
       (map first) (map url-map)))

(defn links-parse [text]
  (->> text ((juxt node-parse url-parse))
       (apply concat)))

(defn regex-escape [text]
  (str/replace text esc-char-regex #(str "\\" %1)))

(defn split-item [s m]
  (let [node-index (.indexOf (last s) (:original m))]
    (->> m :original count (+ node-index) (subs (last s))
         (vector (subs (last s) 0 node-index) m)
         (concat (drop-last s)) vec)))

(defn split-urls [item]
  (let [parsed (url-parse item)]
    (reduce split-item [item] parsed)))

(defn split-items [item]
  (let [parsed (node-parse item)]
    (->> (reduce split-item [item] parsed)
         (mapcat #(if (string? %) (split-urls %)
                      (vector %))))))
