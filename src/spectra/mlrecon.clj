(ns spectra.mlrecon
  (:require [clojure.string :as str]
            [clojure.java.io :as io]
            [spectra.common :as com]
            [spectra.auth :as auth]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra.weka :as weka]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.googlecode.concurrenttrees.solver LCSubstringSolver]
           [com.googlecode.concurrenttrees.radix.node.concrete
            SmartArrayBasedNodeFactory]
           [org.apache.commons.lang3 StringUtils]))

(def default-score 0.5)
(def recon-max-block 10000)
(def min-match-score {s/email 0.4 s/person 0.4})
(def models-dir "/home/alyssavance/clojure/spectra/resources/models")

(defonce recon-models (atom {s/email nil}))

(defn new-model! [class dir]
  (->> (str dir "/" (name class) ".dat")
       weka/deserialize
       (swap! recon-models assoc class)))

(defn load-models! []
  (new-model! s/email models-dir)
  (new-model! s/person models-dir))

(defn lev-distance [a b]
  (/ (StringUtils/getLevenshteinDistance a b)
     (float (max (count a) (count b)))))

(defn lev [coll1 coll2]
  (if (or (empty? coll1) (empty? coll2)
          (every? empty? coll1) (every? empty? coll2))
    default-score
    (->> (for [x coll1 y coll2] (vector x y))
         (map #(lev-distance (first %) (second %)))
         (apply min))))

(defn abs [a b]
  (if (or (not (first a))
          (not (first b)))
    default-score
    (->> [a b] (map first)
         (apply -) Math/abs)))

(defn is-eq [a b]
  (if (or (not (first a))
          (not (first b)))
    default-score
    (if (= (first a) (first b))
      1.0 0.0)))

(defn min-len [a b]
  (->> [a b] (apply concat)
       (map count)
       (apply min)))

(defn overlap [a b]
  (if (or (empty? a) (empty? b))
    default-score
    (/ (->> (concat a b) distinct count
            (- (+ (count a) (count b)))
            double)
       (->> [a b] (map count)
            (apply min) double))))

(defn contains-s [s]
  (fn [l]
    (.contains l s)))

(defn filter-s [coll1 coll2 s]
  [(filter (contains-s s) coll1)
   (filter (contains-s s) coll2)])

(defn max-lcs [coll1 coll2 s]
  (->> (filter-s coll1 coll2 s)
       (map #(map count %))
       (map #(apply min %))
       (apply max)
       (/ (count s))))

(defn lcs-solver []
  (LCSubstringSolver.
   (SmartArrayBasedNodeFactory. )))

(defn lcs [coll1 coll2]
  (if (or (empty? coll1) (empty? coll2)
          (every? empty? coll1) (every? empty? coll2))
    default-score
    (let [coll (concat coll1 coll2)]
      (->> (doto (lcs-solver)
             (#(dotimes [i (count coll)]
                 (.add % (-> coll (nth i))))))
           (.getLongestCommonSubstring)
           (.toString)
           (max-lcs coll1 coll2)))))

(def scoring
  {s/email
   [[[s/email-body] [is-eq min-len]]
    [[s/email-subject] [is-eq lcs]]
    [[s/email-received] [abs]]
    [[s/email-sent] [abs]]
    [[s/email-from s/email-addr] [is-eq]]
    [[s/email-to s/email-addr] [is-eq]]
    [[s/email-uid] [is-eq]]]
   s/person
   [[[s/s-name] [overlap lcs]]
    [[s/email-addr] [overlap is-eq]]
    [[s/phone-num] [overlap is-eq]]
    [[s/email-from s/email-sent] [overlap]]
    [[s/email-to s/email-sent] [overlap]]]
   s/tool
   [[[s/tool-category] [is-eq]]
    [[s/vendor-name] [is-eq]]
    [[s/part-name] [is-eq lcs lev]]
    [[s/catalog-name] [is-eq lcs lev]]
    [[s/desc1] [is-eq lcs lev]]
    [[s/desc2] [is-eq lcs lev]]
    [[s/item-cost] [is-eq abs]]]})

(def candidates
  {s/email
   [s/email-subject s/email-body
    s/email-received s/email-sent]
   s/person
   [s/s-name s/email-addr s/phone-num]
   s/tool
   [s/part-name]})

;; s/part-name s/catalog-name s/desc1 s/desc2 s/item-cost

(defn merge-link [link]
  (str "MATCH (a) WHERE ID(a) = " (first link)
       " WITH a MATCH (b) WHERE ID(b) = " (second link)
       " MERGE (a)-[:" (-> link (nth 2) neo4j/esc-token)
       "]->(b)"))

(defn swap-ids [old-id new-id l]
  (cond (= (first l) old-id)
        (assoc l 0 new-id)
        (= (second l) old-id)
        (assoc l 1 new-id)
        :else l))

(defn append-delete [old-id coll]
  (conj coll 
   (str "MATCH (root) WHERE ID(root) = " old-id
        " DETACH DELETE root")))

(defn merge-into! [old-id new-id]
  (->> old-id neo4j/all-links
       (map #(swap-ids old-id new-id %))
       (map merge-link)
       (append-delete old-id)
       (neo4j/cypher-combined-tx)))

(defn merge-all! [id-set]
  (map #(merge-into! % (first id-set))
       (rest id-set)))

(defn one-link [n1 n2 pred]
  (str "[:" (neo4j/esc-token pred)
       "]-(b" n2 "a" n1 ")-"))

(defn link-chain [n1 preds]
  (->> preds count range
       (map #(one-link n1 % (nth preds %)))
       str/join))

(defn with-clause [n1]
  (->> [["WITH root"]
        (->> n1 range
             (map #(str "b" %)))
        [(str "collect(a" n1 "." (neo4j/esc-token s/value)
              ") AS b" n1)]]
       flatten (str/join ", ")))

(defn match-chain [n1 preds]
  (str "OPTIONAL MATCH (root)" 
       "-" (->> preds drop-last (link-chain n1))
       "[:" (-> preds last neo4j/esc-token)
       "]-(a" n1 ") "
       (with-clause n1)))

(defn all-paths [paths]
  (->> paths count range
       (map #(match-chain % (nth paths %)))
       (str/join " ")))

(defn ret-vals [n]
  (str "RETURN "
       (->> n range
            (map #(str "b" %))
            (str/join ", "))))

(defn vectorize [m]
  (reduce #(update %1 %2 vector) m (keys m)))

(defn fetch-paths-query [id paths]
  (->> ["MATCH (root) WHERE ID(root) = " id
        " WITH root " (all-paths paths)
        " " (ret-vals (count paths))]
       (apply str)))

(defn parse-paths [rs]
  (map (comp second first vals first) rs))

(defn fetch-paths [id paths]
  (-> (fetch-paths-query id paths)
      vector neo4j/cypher-combined-tx
      parse-paths first))

(defn fetch-all-paths [paths ids]
  (->> (map #(fetch-paths-query % paths) ids)
       neo4j/cypher-combined-tx
       parse-paths
       (zipmap ids)))

(defn recon-finished! [user class]
  (neo4j/cypher-query
   (str "MATCH (root:" (neo4j/prop-label user class)
        ":" (neo4j/esc-token s/norecon)
        ") SET root:" (neo4j/esc-token s/recon)))
  (neo4j/cypher-query
   (str "MATCH (root:" (neo4j/prop-label user class)
        ":" (neo4j/esc-token s/norecon)
        ") REMOVE root:" (neo4j/esc-token s/norecon))))

(defn candidate-query [label preds]
  (str "MATCH (root:" label
       ":" (neo4j/esc-token s/norecon)
       ")-[r1]->(v)<-[r2]-(m:" label
       ") WHERE type(r1) IN [" preds
       "] AND type(r2) = type(r1)"
       " RETURN ID(root), ID(m) LIMIT " recon-max-block))

(defn find-candidates [user class]
  (->> class (get candidates) (map name)
       (map #(str "'" % "'"))
       (str/join ", ")
       (candidate-query (neo4j/prop-label user class))
       neo4j/cypher-query-raw
       (map (juxt #(get % "ID(root)") #(get % "ID(m)")))
       (map sort) distinct))

(defn pair-map [p m]
  (map #(get m %) p))

(defn diff-pair [fp]
  (map #(apply % (second fp))
       (first fp)))

(defn score-diff [rules diff]
  (->> (apply interleave diff)
       (partition 2)
       (interleave (map second rules))
       (partition 2)
       (map diff-pair) flatten))

(defn get-diffs [user class cs]
  (let [rules (get scoring class)
        vs (->> cs flatten distinct
                (fetch-all-paths (map first rules)))]
    (->> (map #(pair-map % vs) cs)
         (map #(score-diff rules %))
         (zipmap cs))))

(defn append-scores [pos-and-neg]
  [(->> pos-and-neg first (map #(conj % 1.0)))
   (->> pos-and-neg second (map #(conj % 0.0)))])

(defn train-forest [user class pos-cs neg-cs]
  (->> [pos-cs neg-cs]
       (map #(get-diffs user class %))
       (map vals)
       append-scores
       (apply concat)
       weka/make-forest))

(defn score-map [forest mo]
  (reduce
   #(update %1 %2 (partial weka/classify forest))
   mo (keys mo)))

(defn score-all [user class]
  (->> (find-candidates user class)
       (get-diffs user class)
       (score-map (get @recon-models class))
       (into [])))

(defn groups-to-recon [class score-map]
  (->> score-map
       (remove #(> (get min-match-score class)
                   (second %)))
       (mapv first) (map vec) (map #(conj % :is))
       (loom/build-graph [])
       loom/subgraphs
       (map loom/nodes)))

(defn make-pairs [coll]
  (->> coll (mapcat #(repeat 2 %))
       rest butlast (partition 2)))

(defn all-eq [coll]
  (if (empty? coll) true
      (let [s (sort coll)]
        (= (first s) (last s)))))

(defn choose-body [bodies]
  (let [b (->> bodies (remove nil?) (remove empty?))]
    (if (empty? b) ""
        (cond
          (->> b (map #(re-seq #">" %))
               (map count) all-eq not)
          (->> b (map #(re-seq #">" %))
               (map count) (interleave b)
               (partition 2) (sort-by second) ffirst)
          (->> b (map count) all-eq not)
          (->> b (map count) (interleave b)
               (partition 2) (sort-by second) ffirst)
          :else (first b)))))

(defn body-id [email-id]
  (str "MATCH (a)-[:" (neo4j/esc-token s/email-body)
       "]->(b) WHERE ID(a) = " email-id
       " RETURN ID(b), b.val"))

(defn body-ids [id-group]
  (->> id-group (map body-id)
       neo4j/cypher-combined-tx
       (map (comp second first vals first))))

(defn delete-body [id]
  (str "MATCH (a) WHERE ID(a) = " id
       " DETACH DELETE a"))

(defn delete-bodies! [body-map]
  (->> (remove #(= (second %)
                   (->> body-map (map second)
                        choose-body))
               body-map)
       (map first) (remove nil?) (remove empty?)
       (map delete-body)
       neo4j/cypher-combined-tx))

(defn run-recon! [user class]
  (let [recon-groups (->> class (score-all user)
                          (groups-to-recon class))]
    (->> recon-groups (map body-ids)
         (map delete-bodies!) dorun)
    (->> recon-groups
         (map merge-all!) dorun)
    (recon-finished! user class)))
