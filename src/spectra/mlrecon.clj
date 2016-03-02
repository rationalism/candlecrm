(ns spectra.mlrecon
  (:require [clojure.string :as str]
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
            SmartArrayBasedNodeFactory]))

(def default-score 0.5)

(defn abs [a b]
  (if (or (not (first a))
          (not (first b)))
    default-score
    (->> [a b] (map first)
         (apply -) Math/abs)))

(defn is-eq [a b]
  (if (= (first a) (first b))
    1.0 0.0))

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
       (apply max) float
       (/ (count s))))

(defn lcs-solver []
  (LCSubstringSolver.
   (SmartArrayBasedNodeFactory. )))

(defn lcs [coll1 coll2]
  (if (or (empty? coll1) (empty? coll2))
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
   [[[s/email-body] [is-eq]]
    [[s/email-subject] [is-eq lcs]]
    [[s/email-received] [abs]]
    [[s/email-sent] [abs]]
    [[s/email-from s/email-addr] [is-eq]]
    [[s/email-to s/email-addr] [is-eq]]]})

(def candidates
  {s/email
   [s/email-subject s/email-received s/email-sent]})

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

(defn one-link [n1 n2 pred]
  (str "[:" (neo4j/esc-token pred)
       "]-(b" n2 "a" n1 ")-"))

(defn link-chain [n1 preds]
  (->> preds count range
       (map #(one-link n1 % (nth preds %)))
       str/join))

(defn match-chain [n1 preds]
  (str "OPTIONAL MATCH (root)" 
       "-" (->> preds drop-last (link-chain n1))
       "[:" (-> preds last neo4j/esc-token)
       "]->(a" n1 ")"))

(defn all-paths [paths]
  (->> paths count range
       (map #(match-chain % (nth paths %)))
       (str/join " ")))

(defn ret-vals [n]
  (str "RETURN "
       (->> n range
            (map #(str "a" % "." (neo4j/esc-token s/value)))
            (str/join ", "))))

(defn vectorize [m]
  (reduce #(update %1 %2 vector) m (keys m)))

(defn fetch-paths [id paths]
  (->> ["MATCH (root) WHERE ID(root) = " id
        " " (all-paths paths)
        " " (ret-vals (count paths))]
       (apply str) neo4j/cypher-query-raw
       (map vectorize)
       (apply merge-with concat)
       (into (sorted-map)) (seq)
       (map second)))

(defn fetch-all-paths [paths ids]
  (->> (pmap #(fetch-paths % paths) ids)
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
       " RETURN ID(root), ID(m)"))

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

(defn get-diffs [user class]
  (let [rules (get scoring class)
        cs (find-candidates user class)
        vs (->> cs flatten distinct
                (fetch-all-paths (map first rules)))]
    (->> (map #(pair-map % vs) cs)
         (map #(score-diff rules %)))))
