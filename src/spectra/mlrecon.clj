(ns spectra.mlrecon
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [clojure.java.io :as io]
            [spectra.common :refer :all]
            [spectra.auth :as auth]
            [spectra.cluster :as cluster]
            [spectra.compare :as compare]
            [spectra.insert :as insert]
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
(defonce conflict-models (atom {}))
(defonce recon-logit (atom {}))

(defn dump-recon-log [items]
  (spit recon-logs "BEGIN RECON LOG DUMP\n\n" :append true)
  (run! #(spit recon-logs
               (str (pr-str %) "\n\n") :append true)
        items)
  items)

(defn new-model! [class place]
  (->> (str models-dir "/" (name class) ".dat")
       weka/deserialize
       (swap! place assoc class)))

(defn load-models! []
  (reset! recon-models {})
  (reset! conflict-models {})
  (new-model! s/person recon-models)
  (new-model! s/email recon-models)
  (new-model! s/event recon-models)
  (new-model! s/location recon-models)
  (new-model! s/email-body conflict-models))

(defn load-curve! [class]
  (weka/deserialize
   (str models-dir "/" (name class) "-curve.dat")))

(defn load-thresholds! []
  (let [classes (->> [@recon-models @conflict-models]
                     (map keys) (apply concat))]
    (->> (map load-curve! classes)
         (zipmap classes)
         (reset! recon-logit))))

(defn run-diff [s1 s2]
  (if (and s1 s2)
    (let [dmp (DiffMatchPatch. )
          d (.diffMain dmp s1 s2 true)]
      (.diffCleanupSemantic dmp d) d) []))

(defn str-compare-truncate [s]
  (let [cs (count s)]
    (if (<= cs (* 3 str-compare-max))
      s (str (subs s 0 str-compare-max)
             (subs s (- (/ cs 2) (/ str-compare-max 2))
                   (+ (/ cs 2) (/ str-compare-max 2)))
             (subs s (- cs str-compare-max) cs)))))

(defn diff-first [a b f]
  (if (or (not (first a))
          (not (first b)))
    default-score
    (f (first a) (first b))))

(defn diff-empty [a b f]
  (if (or (empty? a) (empty? b))
    default-score (f a b)))

(defn diff-empty-all [a b f]
  (if (or (empty? a) (empty? b)
          (every? empty? a) (every? empty? b))
    default-score
    (f a b)))

(defnp lev-distance [a b]
  (/ (StringUtils/getLevenshteinDistance a b)
     (float (max (count a) (count b)))))

(defn lev [coll1 coll2]
  (diff-empty-all
   coll1 coll2 #(->> (for [x (map str-compare-truncate %1)
                           y (map str-compare-truncate %2)]
                       (vector x y))
                     (map (fn [x] (apply lev-distance x)))
                     (apply min))))

(defn abs [a b]
  (diff-first
   a b #(Math/abs (- %1 %2))))

(defn sub [a b]
  (diff-first
   a b #(- %1 %2)))

(defn is-eq [a b]
  (diff-first
   a b #(if (= %1 %2) 1.0 0.0)))

(defn nil-test [x]
  (if (or (empty? x) (every? nil? x))
    1.0 0.0))

(defn which-nil [a b]
  (- (nil-test a) (nil-test b)))

(defn diff-second [a b]
  [a (- a b)])

(defn count-regex [regex]
  (fn [a b]
    (diff-first
     a b #(->> (map (fn [x] (re-seq regex x)) [%1 %2])
               (mapv count) (apply -)))))

(defn len-and-diff [a b]
  (let [f1 (first a) f2 (first b)]
    (vector (count f1)
            (- (count f2) (count f1)))))

(defn diff-len-adj [s1 s2]
  (let [a (first s1) b (first s2)]
    (if (or (not a) (not b))
      [0.0 default-score]
      (let [diff (->> (run-diff a b)
                      (remove #(= (.-operation %)
                                  DiffMatchPatch$Operation/EQUAL))
                      (map #(.-text %)) (apply str))]
        [(min (count a) (count b))
         (/ (->> (re-seq #"\s+" diff)
                 (apply str) count (- (count diff)))
            (min (count a) (count b)) 2)]))))

(defn min-len [a b]
  (diff-empty
   a b #(->> [%1 %2] (apply concat)
             (map count)
             (apply min))))

(defn overlap [a b]
  (diff-empty
   a b #(/ (->> (concat %1 %2) distinct count
                (- (+ (count %1) (count %2)))
                double)
           (->> [%1 %2] (map count)
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
  (diff-empty-all
   coll1 coll2 #(->> (concat %1 %2) lcs-coll
                     (max-lcs %1 %2))))

(defn shortest [coll1 coll2]
  (->> [coll1 coll2] flatten (map first)
       (map count) (apply min)))

(defn longest [coll1 coll2]
  (->> [coll1 coll2] flatten (map first)
       (map count) (apply max)))

(def scoring
  {s/email
   [[[s/email-body] [is-eq min-len lcs lev diff-len-adj]]
    [[s/email-subject] [is-eq lev]]
    [[s/email-received] [abs]]
    [[s/email-sent] [abs]]
    [[s/email-from s/email-addr] [is-eq]]
    [[s/email-to s/email-addr] [is-eq]]
    [[s/email-uid] [is-eq which-nil]]]
   s/person
   [[[s/s-name] [overlap lcs lev len-and-diff]]
    [[s/email-addr] [overlap is-eq shortest]]
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
    [[s/stop-time] [is-eq abs]]]
   s/email-body
   [[[s/email-body] [(count-regex #"\s+") (count-regex #">")
                     (count-regex #"\n|\r")
                     len-and-diff diff-len-adj]]
    [[s/email-uid] [which-nil]]
    [[s/email-sent] [sub]]]})

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

(def conflicts
  {s/email [s/email-body]
   s/person []
   s/location []
   s/tool []})

(defn strip-link-map [m]
  (fmap m (fn [k]
            (->> (map first k) (map #(into {} %))
                 (apply merge-with +)))))

(defn merge-link [link]
  [(str "MATCH (a) WHERE ID(a) = {id1}"
        " WITH a MATCH (b) WHERE ID(b) = {id2}"
        " CREATE (a)-[:" (-> link (nth 2) neo4j/esc-token)
        " " (-> link (nth 3) neo4j/cypher-properties) " ]->(b)")
   (merge {:id1 (first link) :id2 (second link)}
          (nth link 3))])

(defn update-id [id-map id]
  (if (contains? id-map id)
    (id-map id) id))

(defn id-map [id-set]
  (zipmap id-set
          (repeat (count id-set) (last id-set))))

(defn swap-ids [id-map l]
  (let [update-f (partial update-id id-map)]
    (-> (update l 1 update-f)
        (update 2 update-f))))

(defn combined-links [ids]
  (->> ids neo4j/all-links
       (map #(swap-ids (id-map ids) %))
       (group-by rest) strip-link-map
       (map #(conj (vec (key %)) (val %)))))

(defn delete-all [old-id]
  [(str "MATCH (root) WHERE ID(root) = {id}"
        " DETACH DELETE root")
   {:id old-id}])

(defn delete-links [id]
  [(str "MATCH (root)-[r]-(a)"
        " WHERE ID(root) = {id} DELETE r")
   {:id id}])

(defn merge-statements [id-set links]
  (concat (->> id-set drop-last (map delete-all))
          (->> id-set last delete-links vector)
          (map merge-link links)))

(defn merge-all [id-set]
  (->> id-set combined-links
       (remove #(= (first %) (second %)))
       (merge-statements id-set)))

(defn one-link [n1 n2 pred]
  (str "[:" (neo4j/esc-token pred)
       "]-(b" n2 "a" n1 ")-"))

(defn link-chain [n1 preds]
  (->> preds count range
       (map #(one-link n1 % (nth preds %)))
       str/join))

(defn val-clause [n1]
  (str "collect(a" n1 "." (neo4j/esc-token s/value)
       ") AS b" n1))

(defn id-clause [n1]
  (str "collect(ID(a" n1 ")) AS b" n1))

(def special-paths {:id id-clause})

(defn with-clause [n1 pred]
  (->> [["WITH root"]
        (->> n1 range
             (map #(str "b" %)))
        [(if-let [special-fn (special-paths pred)]
           (special-fn n1)
           (val-clause n1))]]
       flatten (str/join ", ")))

(defn match-chain [n1 preds]
  (str "OPTIONAL MATCH (root)-"
       (if (contains? special-paths (last preds))
         (str (->> preds drop-last drop-last
                   (link-chain n1))
              "[:" (-> preds drop-last last
                       neo4j/esc-token))
         (str (->> preds drop-last (link-chain n1))
              "[:" (-> preds last neo4j/esc-token)))
       "]-(a" n1 ") "
       (with-clause n1 (last preds))))

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

(defn get-ids-path [path]
  (->> path count inc (range 1)
       (map #(subvec path 0 %))
       (map #(conj % :id))))

(defn fetch-paths [id paths]
  (-> (fetch-paths-query id paths)
      vector neo4j/cypher-combined-tx
      parse-paths first))

(defn fetch-train-ids [id paths]
  (->> (mapcat get-ids-path paths)
       (fetch-paths-query id) vector
       neo4j/cypher-combined-tx
       parse-paths (mapcat #(apply concat %))
       (concat [id])))

(defn prop-diff [id1 id2 prop]
  (->> (map #(fetch-paths % [[prop]]) [id1 id2])
       (map ffirst) (apply run-diff)
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

(defnp conflict-data [user class ids]
  (fetch-all-paths
   (map first (get scoring class))
   ids))

(defnp conflict-prob [class]
  (fn [d1 d2]
    (->> (map second [d1 d2])
         (score-diff (get scoring class))
         (weka/classify (get @conflict-models class))
         (weka/classify-logit (get @recon-logit class)))))

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
       append-scores (apply concat) debug
       weka/save-traindat weka/make-forest))

(defn train-full [user class pos-cs neg-cs]
  (let [f (train-forest user class pos-cs neg-cs)]
    [f (-> (weka/load-traindat) weka/forest-curve)]))

(defn groups-to-recon [class score-map]
  (->> score-map (map #(update % 0 vec))
       (mapv #(apply conj %)) (map vec)
       (loom/build-graph [])
       cluster/prob-weights
       cluster/vote-clustering))

(defn delete-prop [id class]
  [(str "MATCH (a)-[:" (neo4j/esc-token class)
        "]->(b) WHERE ID(a) = {id} DETACH DELETE b")
   {:id id}])

(defn delete-queries [user class groups]
  (let [values (->> (apply concat groups)
                    (conflict-data user class))]
    (->> (map (fn [g] (map #(vector % (values %))
                           g)) groups)
         (map #(compare/estimate-scores
                % (conflict-prob class)))
         (map rest) (map #(map ffirst %))
         (apply concat)
         (map #(delete-prop % class)))))

(defn run-recon! [user class]
  (let [recon-groups (->> class (score-all user)
                          (groups-to-recon class))]
    (->> (recon-finished user class)
         (concat (doall (mapcat merge-all recon-groups)))
         (concat (->> class conflicts
                      (mapcat #(delete-queries user % recon-groups))
                      doall))
         (neo4j/cypher-combined-tx nil))))



