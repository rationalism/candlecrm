(ns spectra.reply
  (:require [clojure.string :as str]
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

(defn combine-lines [lines]
  (->> lines ((juxt first last)) (map second)
       (vector (str/join "\n" (map first lines)))))

(defn header-ranges [{:keys [sep nlp]} lines]
  (->> lines count range (zipvec lines)
       (mapvals #(weka/is-header? sep (first %)))
       (into []) (partition-by second)
       (filter #(-> % first second))
       (map #(map first %)) (map combine-lines) (map reverse) debug
       (map #(update % 1 (partial nlp/run-nlp-default nlp)))
       (remove #(->> % second loom/nodes (map s/type-label)
                     (some #{s/event})))))
