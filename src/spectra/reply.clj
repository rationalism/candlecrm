(ns spectra.reply
  (:require [clojure.string :as str]
            [clojure.set :as cset]
            [spectra_cljc.schema :as s]
            [spectra.common :refer :all]
            [spectra.corenlp :as nlp]
            [spectra.datetime :as dt]
            [spectra.loom :as loom]
            [spectra.regex :as regex]
            [spectra.weka :as weka]))

(defn parse-models-fn []
  {:sep ((weka/email-sep-model-fn))
   :nlp {:ner ((nlp/get-ner-fn))
         :mention ((nlp/get-mention-fn))
         :entity (nlp/entity-extractor)}})

(defn combine-lines [lines]
  (->> lines ((juxt first last)) (mapv second)
       (#(update % 1 inc)) (vector (map first lines))))

(defn remove-links [graph]
  (->> graph loom/nodes (filter #(= s/hyperlink (s/type-label %)))
       (loom/remove-nodes graph)))

(defn remove-bad-dates [graph]
  (->> graph loom/nodes
       (filter #(= s/email (s/type-label %)))
       (sort-by #(->> % s/link-text count) >) rest
       (loom/remove-nodes graph)))

(defn header-dates [sep lines]
  (->> lines (weka/header-scan sep) (zipvec lines)
       (filter second) (map first) (str/join "\n")
       dt/find-dates))

(defn remove-meta [graph]
  (loom/adjust-nodes graph #(dissoc % s/hash-code s/link-text))) 

(defn rename-dates [graph]
  (loom/adjust-nodes
   graph #(cset/rename-keys
           % {s/event-begin s/email-sent s/event-end s/email-sent
              s/date-time s/email-sent})))

(defn adjust-labels [graph]
  (loom/adjust-nodes
   graph (fn [n] (fmap n #(if (= % s/event)
                            s/email %)))))

(defn email-nodes [nodes]
  (filter #(= s/email (s/type-label %)) nodes))

(defn center-node [graphs]
  (->> graphs (mapcat loom/nodes) email-nodes
       (sort-by #(-> % s/link-text count) >) first))

(defn add-edge-graph [[graph center email-count name-count] new-node]
  (let [new-email-count (+ (if (contains? new-node s/email-addr) 1 0)
                           email-count)
        new-name-count (+ (if (contains? new-node s/s-name) 1 0)
                          name-count)]
    (->> (if (and (<= new-email-count 1) (<= new-name-count 1))
           s/email-from s/email-to) vector
         (concat [center new-node]) vec (loom/add-edge graph)
         (rcons [center new-email-count new-name-count]))))

(defn from-to-graphs [graphs]
  (if-let [center (center-node graphs)]
    (->> graphs (mapcat loom/nodes) (remove #(= % center))
         (reduce add-edge-graph
                 [(loom/build-graph [center] []) center 0 0])
         first)
    (loom/build-graph [] [])))

(defn merge-from [graph]
  (let [from-nodes (->> (loom/select-edges graph s/email-from)
                        (map second))
        email-node (->> from-nodes (filter #(contains? % s/email-addr))
                        first)
        name-node (->> from-nodes (remove #(contains? % s/email-addr))
                       first)]
    (if (<= (count from-nodes) 1) graph
        (-> graph (loom/remove-nodes [email-node])
            (loom/replace-node
             name-node (->> email-node s/email-addr (hash-map s/email-addr)
                            (merge name-node)))))))

(defn nlp-headers [models text]
  (->> text (map #(nlp/run-nlp-default models %))
       (map (comp adjust-labels rename-dates remove-links))
       from-to-graphs remove-bad-dates merge-from remove-meta))

(defn update-last [sig-map line-groups]
  (update line-groups (dec (count line-groups))
          #(update % 0 (constantly (mapv first (last sig-map))))))

(defn sig-add [[low-groups high-groups] new-sig]
  (let [sig-lines (mapv first new-sig)
        arrow-num (-> new-sig first second)
        new-groups (take-while #(<= (second %) arrow-num)
                               high-groups)]
    (if (empty? new-groups) [low-groups high-groups]
        [(concat low-groups (drop-last new-groups)
                 (vector (update (last new-groups) 0 #(concat % sig-lines))))
         (drop-while #(<= (second %) arrow-num) high-groups)])))

(defn sig-groups [line-groups]
  (let [last-message (last line-groups)
        depth-lines (regex/count-depth last-message)]
    (->> depth-lines (zipvec last-message)
         (drop-while #(< (second %) (apply max depth-lines)))
         (group-by second) (sort-by #(first %))
         (map second))))

(defn sig-split [line-groups]
  (let [sig-map (->> line-groups sig-groups)
        groups-count (->> line-groups (map regex/mode-arrows)
                          (zipvec line-groups) vec
                          (update-last sig-map))]
    (->> sig-map drop-last (reduce sig-add [[] groups-count])
         (apply concat) (mapv first) (map vec))))

(defn print-headers [line-pairs]
  (mapv println line-pairs) line-pairs)

(defn header-ranges [{:keys [sep nlp]} headers lines]
  (->> lines (weka/header-scan sep)
       (zipmap (->> lines count range (zipvec lines)))
       (into []) (sort-by #(-> % first second))
       (partition-by second) (filter #(-> % first second))
       (map #(map first %)) (map combine-lines)
       (map reverse) (map vec) (map #(update % 0 vec))
       (map #(update % 1 (partial nlp-headers nlp))) 
       (filter #(->> % second loom/nodes (map s/type-label)
                     (some #{s/email})))
       (cons [[0 0] headers])))

(defn add-digest [mode m]
  (if (= mode :digest)
    (merge m {s/email-digest true}) m))

(defn body-empty? [body]
  (->> body str/trim (filter #(Character/isLetter %))
       count (>= 0)))

(defn body-graph [mode [header lines]]
  (let [email (->> header loom/nodes email-nodes first)
        text (->> lines regex/remove-arrows (str/join "\n"))]
    (when (not (body-empty? text))
      (->> text (hash-map s/email-body) (add-digest mode)
           (merge email) (loom/replace-node header email)))))

(defn maybe-sig-split [mode header-lines]
  (if (= mode :digest) header-lines
      (zipvec (map first header-lines)
              (sig-split (map second header-lines)))))

(defn infer-subject [graph]
  (let [subject (->> graph loom/nodes
                     (filter #(contains? % s/email-subject))
                     first s/email-subject)]
    (loom/adjust-nodes
     graph #(if (= s/email (s/type-label %))
              (merge % {s/email-subject subject}) %))))

(defn to-links [graphs]
  (remove #(nil? (second %))
          (map vector
               (->> graphs rest (map loom/nodes)
                    (map email-nodes) (map first))
               (->> graphs drop-last (map #(loom/select-edges % s/email-from))
                    (map first) (map second))
               (-> graphs rest count (repeat s/email-to)))))

(defn reply-links [graphs]
  (map vector
       (->> graphs rest (map loom/nodes)
            (map email-nodes) (map first))
       (->> graphs drop-last (map loom/nodes)
            (map email-nodes) (map first))
       (-> graphs rest count (repeat s/email-reply))))

(defn to-digest [to-node graphs]
  (let [nodes (->> graphs rest (map loom/nodes)
                   (map email-nodes) (map first)
                   (remove nil?))]
    (map vector nodes
         (-> nodes count (repeat to-node))
         (-> nodes count (repeat s/email-to)))))

(defn empty-emails [graph]
  (->> graph loom/nodes (filter #(= s/email (s/type-label %)))
       (filter #(->> % s/email-body body-empty?))))

(defn remove-empty [graph]
  (loom/remove-nodes graph (empty-emails graph)))

(defn infer-to-from [mode headers graphs]
  (if (= mode :digest)
    (loom/add-edges
     (->> graphs (map remove-empty) loom/merge-graphs)
     (-> graphs first remove-empty
         (loom/select-edges s/email-from)
         first second (to-digest (map remove-empty graphs))))
    (-> graphs loom/merge-graphs
        (loom/add-edges (to-links graphs))
        (loom/add-edges (reply-links graphs)))))

(defn split-body [mode header-map lines]
  (let [sort-map (sort-by ffirst header-map)
        line-nums (mapcat first sort-map)
        headers (map second sort-map)]
    (if (= mode :chain)
      (->> line-nums rest vec (rconj (count lines))
           (partition 2) (zipvec headers)
           (map (fn [b] (update b 1 #(apply subvec lines %))))
           (maybe-sig-split mode) (map #(body-graph mode %)))
      (->> [(first headers) lines] (body-graph mode) vector))))

(defn reply-parse [models headers lines]
  (let [header-map (header-ranges models headers lines)
        chain-mode (if (->> lines regex/count-depth (apply max)
                            (* 2) (< (dec (count header-map))))
                     :chain :digest)]
    (->> lines (split-body chain-mode header-map) (remove nil?)
         (infer-to-from chain-mode headers) infer-subject)))
