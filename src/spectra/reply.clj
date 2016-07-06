(ns spectra.reply
  (:require [clojure.string :as str]
            [clojure.set :as cset]
            [spectra_cljc.schema :as s]
            [spectra.common :refer :all]
            [spectra.corenlp :as nlp]
            [spectra.loom :as loom]
            [spectra.weka :as weka]))

(defn parse-models-fn []
  {:sep ((weka/email-sep-model-fn))
   :nlp {:ner ((nlp/get-ner-fn))
         :mention ((nlp/get-mention-fn))
         :entity (nlp/entity-extractor)}})

(defn count-arrows [lines]
  (->> (map #(re-seq #"^>+" %) lines)
       (remove nil?)))

(defn count-depth [lines]
  (let [arrows (count-arrows lines)]
    (if (or (nil? arrows) (empty? arrows))
      [0] (->> arrows (map first) (map count)))))

(defn mode-arrows [lines]
  (->> lines count-depth frequencies
       (sort-by second >) ffirst))

(defn combine-lines [lines]
  (->> lines ((juxt first last)) (map second)
       (vector (str/join "\n" (map first lines)))))

(defn remove-links [graph]
  (->> graph loom/nodes (filter #(= s/hyperlink (s/type-label %)))
       (loom/remove-nodes graph)))

(defn remove-meta [graph]
  (loom/adjust-nodes graph #(dissoc % s/hash-code s/link-text))) 

(defn rename-dates [graph]
  (loom/adjust-nodes graph #(cset/rename-keys
                             % {s/event-begin s/email-sent
                                s/event-end s/email-sent
                                s/date-time s/email-sent})))

(defn adjust-labels [graph]
  (loom/adjust-nodes
   graph (fn [n] (fmap n #(if (= % s/event)
                            s/email %)))))

(defn nlp-headers [models text]
  (->> text (nlp/run-nlp-default models) remove-links
       remove-meta rename-dates adjust-labels))

(defn sig-split [line-groups]
  (let [groups-count (zipvec line-groups (map mode-arrows line-groups))]
    (->> line-groups last count-arrows (zipvec (last line-groups))
         (partition-by second) (sort-by #(-> % first second)))))

(defn header-ranges [{:keys [sep nlp]} headers lines]
  (->> lines count range (zipvec lines)
       (mapvals #(weka/is-header? sep (first %)))
       (into []) (sort-by #(-> % first second))
       (partition-by second) (filter #(-> % first second))
       (map #(map first %)) (map combine-lines)
       (map reverse) (map vec) (map #(update % 0 vec))
       (map #(update % 1 (partial nlp-headers nlp)))
       (filter #(->> % second loom/nodes (map s/type-label)
                     (some #{s/email})))
       (cons [[0 0] headers])))

(defn body-graph [[header lines]]
  [header lines])

(defn split-body [header-map lines]
  (let [sort-map (sort-by ffirst header-map)
        line-nums (mapcat first sort-map)
        headers (map second sort-map)]
    (->> line-nums rest (rconj (count lines))
         (partition 2) (zipvec headers)
         (map (fn [b] (update b 1 #(apply subvec lines %))))
         (map body-graph))))

(defn reply-parse [models lines headers]
  (let [header-map (header-ranges models headers lines)]
    (->> header-map (map second) (mapv loom/display-graph))
    (cond (= (count header-map) 0)
          (-> {s/email-body (str/join "\n" lines)}
              (merge {s/type-label s/email})
              vector (loom/build-graph []))
          (->> lines count-depth (apply max)
               (* 2) (< (count header-map)))
          :chain
          :else
          :digest)))
