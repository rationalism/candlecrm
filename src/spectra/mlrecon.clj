(ns spectra.mlrecon
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [clojure.java.io :as io]
            [spectra.common :refer :all]
            [spectra.auth :as auth]
            [spectra.cluster :as cluster]
            [spectra.compare :as compare]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra.weka :as weka]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [org.apache.commons.lang3 StringUtils]
           [org.bitbucket.cowwoc.diffmatchpatch DiffMatchPatch
            DiffMatchPatch$Operation]))

(def default-score 0.5)
(def model-rollover 0)
(def str-compare-max 300)
(def models-dir "/home/alyssa/clojure/spectra/resources/models")
(def recon-logs "/home/alyssa/recon_log.txt")

(defonce recon-models (atom {}))
(defonce recon-logit (atom {}))

(defn dump-recon-log [items]
  (spit recon-logs "BEGIN RECON LOG DUMP\n\n" :append true)
  (run! #(spit recon-logs
               (str (pr-str %) "\n\n") :append true)
        items)
  items)

(defn new-model! [class dir]
  (->> (str dir "/" (name class) ".dat")
       weka/deserialize
       (swap! recon-models assoc class)))

(defn load-models! []
  (reset! recon-models {})
  (new-model! s/person models-dir)
  (new-model! s/email models-dir)
  (new-model! s/event models-dir)
  (new-model! s/location models-dir))

(defn load-curve! [class]
  (weka/deserialize
   (str models-dir "/" (name class) "-curve.dat")))

(defn load-thresholds! []
  (let [classes (keys @recon-models)]
    (->> (map load-curve! classes)
         (zipmap classes)
         (reset! recon-logit))))

(defn run-diff [s1 s2]
  (let [dmp (DiffMatchPatch. )
        d (.diffMain dmp s1 s2 true)]
    (.diffCleanupSemantic dmp d) d))

(defn str-compare-truncate [s]
  (let [cs (count s)]
    (if (<= cs (* 3 str-compare-max))
      s (str (subs s 0 str-compare-max)
             (subs s (- (/ cs 2) (/ str-compare-max 2))
                   (+ (/ cs 2) (/ str-compare-max 2)))
             (subs s (- cs str-compare-max) cs)))))

(defnp lev-distance [a b]
  (/ (StringUtils/getLevenshteinDistance a b)
     (float (max (count a) (count b)))))

(defn lev [coll1 coll2]
  (if (or (empty? coll1) (empty? coll2)
          (every? empty? coll1) (every? empty? coll2))
    default-score
    (->> (for [x (map str-compare-truncate coll1)
               y (map str-compare-truncate coll2)]
           (vector x y))
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
  (if (or (empty? a) (empty? b))
    default-score
    (->> [a b] (apply concat)
         (map count)
         (apply min))))

(defn overlap [a b]
  (if (or (empty? a) (empty? b))
    default-score
    (/ (->> (concat a b) distinct count
            (- (+ (count a) (count b)))
            double)
       (->> [a b] (map count)
            (apply min) double))))

(defn max-lcs [coll1 coll2 s]
  (->> (concat coll1 coll2)
       (map count) (apply min)
       (/ (count s))))

(defn lcs-pair [a b]
  (->> (run-diff a b)
       (filter #(= (.-operation %)
                   DiffMatchPatch$Operation/EQUAL))
       (map #(.-text %)) (apply str)))

(defn lcs-coll [coll]
  (reduce lcs-pair coll))

(defn lcs [coll1 coll2]
  (if (or (empty? coll1) (empty? coll2)
          (every? empty? coll1) (every? empty? coll2))
    default-score
    (->> (concat coll1 coll2) lcs-coll
         (max-lcs coll1 coll2))))

(defn shortest [coll1 coll2]
  (->> [coll1 coll2] flatten
       (map count) (apply min)))

(def scoring
  {s/email
   [[[s/email-body] [is-eq min-len lcs lev]]
    [[s/email-subject] [is-eq lcs lev]]
    [[s/email-received] [abs]]
    [[s/email-sent] [abs]]
    [[s/email-from s/email-addr] [is-eq]]
    [[s/email-to s/email-addr] [is-eq]]
    [[s/email-uid] [is-eq]]]
   s/person
   [[[s/s-name] [overlap lcs lev]]
    [[s/email-addr] [overlap is-eq]]
    [[s/phone-num] [overlap is-eq]]
    [[s/email-from s/email-sent] [overlap is-eq]]
    [[s/email-to s/email-sent] [overlap is-eq]]
    [[s/link-to s/has-link s/email-sent] [is-eq]]]
   s/tool
   [[[s/tool-category] [is-eq]]
    [[s/vendor-name] [is-eq]]
    [[s/part-name] [is-eq lcs lev]]
    [[s/catalog-name] [is-eq lcs lev]]
    [[s/desc1] [is-eq lcs lev]]
    [[s/desc2] [is-eq lcs lev]]
    [[s/item-cost] [is-eq abs]]]
   s/location
   [[[s/s-name] [is-eq lcs lev shortest]]]
   s/event
   [[[s/start-time] [is-eq abs]]
    [[s/stop-time] [is-eq abs]]]})

(def candidates
  {s/email
   [s/email-subject s/email-body
    s/email-received s/email-sent]
   s/person
   [s/s-name s/email-addr s/phone-num]
   s/tool
   [s/part-name s/catalog-name s/desc1
    s/desc2 s/item-cost]
   s/location
   [s/s-name]
   s/event
   [s/start-time s/stop-time]})

(defn merge-link [link]
  [(str "MATCH (a) WHERE ID(a) = {id1}"
        " WITH a MATCH (b) WHERE ID(b) = {id2}"
        " MERGE (a)-[:" (-> link (nth 2) neo4j/esc-token)
        "]->(b)")
   {:id1 (first link) :id2 (second link)}])

(defn swap-ids [old-id new-id l]
  (cond (= (first l) old-id)
        (assoc l 0 new-id)
        (= (second l) old-id)
        (assoc l 1 new-id)
        :else l))

(defn append-delete [old-id coll]
  (conj coll 
        [(str "MATCH (root) WHERE ID(root) = {id}"
              " DETACH DELETE root")
         {:id old-id}]))

(defn merge-into [old-id new-id]
  (->> old-id neo4j/all-links
       (map #(swap-ids old-id new-id %))
       (map merge-link)
       (append-delete old-id)))

(defn merge-all [id-set]
  (->> id-set rest
       (mapcat #(merge-into % (first id-set)))))

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

(defn fetch-paths-query [id paths]
  [(str "MATCH (root) WHERE ID(root) = {id}"
        " WITH root " (all-paths paths)
        " " (ret-vals (count paths)))
   {:id id}])

(defn parse-paths [rs]
  (map (comp vals first) rs))

(defn fetch-paths [id paths]
  (-> (fetch-paths-query id paths)
      vector neo4j/cypher-combined-tx
      parse-paths first))

(defn prop-diff [id1 id2 prop]
  (->> (map #(fetch-paths % [[prop]]) [id1 id2])
       (map ffirst) debug (apply run-diff)
       (remove #(= (.-operation %)
                   DiffMatchPatch$Operation/EQUAL))))

(defn fetch-all-paths [paths ids]
  (->> (map #(fetch-paths-query % paths) ids)
       neo4j/cypher-combined-tx
       parse-paths
       (zipmap ids)))

(defn recon-finished [user class]
  [(str "MATCH (root:" (neo4j/prop-label user class)
        ":" (neo4j/esc-token s/norecon)
        ") SET root:" (neo4j/esc-token s/recon))
   (str "MATCH (root:" (neo4j/prop-label user class)
        ":" (neo4j/esc-token s/norecon)
        ") REMOVE root:" (neo4j/esc-token s/norecon))])

(defn candidate-query [label preds]
  (str "MATCH (root:" label
       ":" (neo4j/esc-token s/norecon)
       ")-[r1]->(v)<-[r2]-(m:" label
       ") WHERE type(r1) IN [" preds
       "] AND type(r2) = type(r1)"
       " RETURN ID(root), ID(m)"))

(defn email-candidate-pattern [user]
  (str "MATCH (root:" (neo4j/prop-label user s/person)
       ")<-[:" (neo4j/esc-token s/link-to)
       "]-(l:" (neo4j/prop-label user s/hyperlink)
       ")<-[:" (neo4j/esc-token s/has-link)
       "]-(e:" (neo4j/prop-label user s/email)))

(defn email-candidate-meta [user]
  (str (email-candidate-pattern user)
       ")-->(m:" (neo4j/prop-label user s/person)
       ") RETURN ID(root), ID(m)"))

(defn email-candidate-links [user]
  (str (email-candidate-pattern user)
       ")-[:" (neo4j/esc-token s/has-link)
       "]->(l2:" (neo4j/prop-label user s/hyperlink)
       ")-[:" (neo4j/esc-token s/link-to)
       "]->(m:" (neo4j/prop-label user s/person)
       ") RETURN ID(root), ID(m)"))

(defn optional-search [user class query]
  (if (= class s/person)
    (concat query [(email-candidate-meta user)
                   (email-candidate-links user)])
    query))

(defnp find-candidates [user class]
  (->> class (get candidates) (map name)
       (map #(str "'" % "'"))
       (str/join ", ")
       (candidate-query (neo4j/prop-label user class))
       vector (optional-search user class)
       (mapcat neo4j/cypher-query)
       (map (juxt #(get % "ID(root)") #(get % "ID(m)")))
       (map sort) distinct))

(defn pair-map [p m]
  (map #(get m %) p))

(defn diff-pair [fp]
  (map #(apply % (second fp))
       (first fp)))

(defn score-diff [rules diff]
  (->> (apply zipvec diff)
       (zipvec (map second rules))
       (map diff-pair) flatten))

(defnp get-diffs [user class cs]
  (let [rules (get scoring class)
        vs (->> cs flatten distinct
                (fetch-all-paths (map first rules)))]
    (->> (map #(pair-map % vs) cs)
         (map #(score-diff rules %))
         (zipmap cs))))

(defnp score-map [forest mo]
  (fmap mo (partial weka/classify forest)))

(defn adjust-scores [logit mo]
  (fmap mo (partial weka/classify-logit logit)))

(defn score-all [user class]
  (->> (find-candidates user class)
       (get-diffs user class)
       (score-map (get @recon-models class))
       (adjust-scores (get @recon-logit class))
       (into [])))

(defn log2 [x]
  (/ (Math/log x) (Math/log 2)))

(defn bin-entropy [x]
  (if (or (>= x 1) (<= x 0)) 0.0
      (- (* x -1 (log2 x))
         (* (- 1 x) (log2 (- 1 x))))))

(defn sample-one [n total accum sample]
  (let [i (+ (first accum) (second sample))]
    (if (-> accum second count (+ 0.5)
            (* total) (/ n) (< i))
      [i (conj (second accum) sample)]
      [i (second accum)])))

(defn training-query [ids]
  (str "MATCH (a)--(b) WHERE ID(a) IN ["
       (first ids) ", " (second ids)
       "] RETURN a, b"))

(defn sample-display [candidates]
  (->> (map training-query candidates)
       (run! println))
  (run! println candidates))

(defn candidate-sample [user class n]
  (let [samples (->> (score-all user class)
                     (mapv #(update % 1 bin-entropy)))
        total (->> samples (map second) (apply +))]
    (->> (reduce (partial sample-one n total)
                 [0.0 []] samples)
         second (mapv first) (mapv vec)
         sample-display)))

(defn split-neg-pos [freqs]
  [(remove #(<= (second (first %)) 0.95) freqs)
   (remove #(<= 0.05 (second (first %))) freqs)])

(defn adjust-weight [n]
  (fn [point]
    (update point 1 #(/ % n))))

(defn adjust-weights [n freqs]
  (let [total (->> freqs (map second) (apply +))]
    (mapv (adjust-weight (/ total n)) freqs)))

(defn update-sqrt [point]
  (update point 1 #(Math/sqrt %)))

(defn select-candidate [accum point]
  [(reduce conj (first accum)
           (repeat (- (int (+ (second point) (second accum)))
                      (int (second accum)))
                   (ffirst point)))
   (+ (second accum) (second point))])

(defn select-candidates [freqs]
  (first (reduce select-candidate [[] 0.0] freqs)))

(defn old-model-points [user class n]
  (if (pos? n)
    (->> (find-candidates user class)
         (get-diffs user class) (into [])
         (mapv #(conj % (weka/classify (get @recon-models class)
                                       (second %))))
         (mapv rest) frequencies (into [])
         (mapv update-sqrt) split-neg-pos
         (mapv #(adjust-weights n %))
         (map select-candidates))
    [[] []]))

(defn old-model-candidates [user class n]
  (let [candidate-map
        (->> (find-candidates user class)
             (get-diffs user class)
             set/map-invert)]
    (->> (old-model-points user class n)
         (map #(map candidate-map %)))))

(defn append-scores [pos-and-neg]
  [(->> pos-and-neg first
        (map vec) (map #(conj % 1.0)))
   (->> pos-and-neg second
        (map vec) (map #(conj % 0.0)))])

(defn train-forest [user class pos-cs neg-cs]
  (->> [pos-cs neg-cs]
       (map #(get-diffs user class %)) (map vals)
       (vector (old-model-points user class model-rollover))
       (apply map vector) (map #(apply concat %))
       append-scores (apply concat)
       weka/save-traindat weka/make-forest))

(defn groups-to-recon [class score-map]
  (->> score-map (map #(update % 0 vec))
       (mapv #(apply conj %)) (map vec)
       (loom/build-graph [])
       cluster/vote-clustering))

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
               (map count) (zipvec b)
               (sort-by second) ffirst)
          (->> b (map count) all-eq not)
          (->> b (map count) (zipvec b)
               (sort-by second) ffirst)
          :else (first b)))))

(defn body-id [email-id]
  [(str "MATCH (a)-[:" (neo4j/esc-token s/email-body)
        "]->(b) WHERE ID(a) = {id} RETURN ID(b), b.val")
   {:id email-id}])

(defn body-ids [id-group]
  (->> id-group (map body-id)
       neo4j/cypher-combined-tx
       (map (comp vals first))))

(defn delete-body [id]
  [(str "MATCH (a) WHERE ID(a) = {id}"
        " DETACH DELETE a")
   {:id id}])

(defn delete-bodies [body-map]
  (->> (remove #(= (second %)
                   (->> body-map (map second)
                        choose-body))
               body-map)
       (map first) (remove nil?)
       (map delete-body)))

(defn run-recon! [user class]
  (let [recon-groups (->> class (score-all user)
                          (groups-to-recon class))
        ids-to-delete (doall (map body-ids recon-groups))]
    (->> (recon-finished user class)
         (concat (doall (mapcat merge-all recon-groups)))
         (concat (mapcat delete-bodies ids-to-delete))
         (neo4j/cypher-combined-tx nil))))

(defn prop-and-id [user class prop]
  (str "MATCH (root:" (neo4j/prop-label user class)
       ")-[r]->(v:" (neo4j/prop-label user prop)
       ") RETURN ID(root), v.val"))

(defn idrow-to-str [r]
  (str (get r "v.val") ","
       (get r "ID(root)")))
