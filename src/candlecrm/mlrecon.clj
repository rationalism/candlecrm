(ns candlecrm.mlrecon
  (:require [clojure.set :as set]
            [clojure.edn :as edn]
            [clojure.string :as str]
            [clojure.java.io :as io]
            [candlecrm.environ :refer [env]]
            [candlecrm.common :refer :all]
            [candlecrm.auth :as auth]
            [candlecrm.cluster :as cluster]
            [candlecrm.compare :as compare]
            [candlecrm.insert :as insert]
            [candlecrm.loom :as loom]
            [candlecrm.model :as model]
            [candlecrm.neo4j :as neo4j]
            [candlecrm.weka :as weka]
            [candlecrm_cljc.schema :as s]
            [candlecrm.environ :refer [env]]
            [cpath-clj.core :as cp]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [org.bitbucket.cowwoc.diffmatchpatch DiffMatchPatch
            DiffMatchPatch$Operation]))

(def model-rollover 0)

(defonce recon-models (atom {}))
(defonce conflict-models (atom {}))
(defonce recon-logit (atom {}))
(defonce view-models (atom {}))

(defn models-dir []
  "models")

(defn dump-recon-log [items]
  (let [recon-logs (str (env :log-dir) (env :recon-log-file))]
    (spit recon-logs "BEGIN RECON LOG DUMP\n\n" :append true)
    (run! #(spit recon-logs
                 (str (pr-str %) "\n\n") :append true)
          items)
    items))

(defn new-model!
  ([class place]
   (new-model! class (models-dir) place))
  ([class dir place]
   (->> (str dir "/" (name class) ".dat")
        io/resource deserialize
        (swap! place assoc class))))

(defn load-models! []
  (let [views-dir (str (models-dir) "/views")]
    (reset! recon-models {})
    (reset! conflict-models {})
    (->> model/conflicts keys
         (mapv #(new-model! % recon-models)))
    (->> model/conflicts vals flatten
         (mapv #(new-model! % conflict-models)))
    (->> model/views keys
         (mapv #(new-model! % views-dir view-models)))))

(defn load-curve! [class]
  (->> (str (models-dir) "/" (name class) "-curve.dat")
       io/resource deserialize))

(defn load-thresholds! []
  (let [classes (->> [@recon-models @conflict-models]
                     (map keys) (apply concat))]
    (->> classes (mapvals load-curve!) (reset! recon-logit))))

(defn version-count [class]
  (->> (models-dir) cp/resources keys
       (map #(str/split % #"/"))
       (filter #(= (dec (count %)) 1))
       (map last) (filter #(.contains % ".dat"))
       (remove #(.contains % "-curve"))
       (remove #(.contains % "-scorer"))
       (map #(str/split % #"\.")) (map first)
       (filter #(.contains % (str (name class) "-")))
       (map #(str/split % #"-")) (map last)
       (map #(Integer. %)) (sort >) first
       ((fnil inc 0))))

(defn write-forest [class forest]
  (let [version (version-count class)
        write-dir (->> (models-dir) io/resource .getPath)
        stem (->> class name (str write-dir "/") (repeat 2))]
    (when (> version 1)
      (->> (zipvec stem [".dat" (str "-" version ".dat")])
           (map #(apply str %)) (map io/file) (apply io/copy))
      (->> (zipvec stem ["-curve.dat" (str "-curve-" version ".dat")])
           (map #(apply str %)) (map io/file) (apply io/copy))
      (->> (zipvec stem [".dat" "-curve.dat"])
           (map #(apply str %)) (mapv io/delete-file)))
    (->> (zipvec stem [".dat" "-curve.dat"])
         (map #(apply str %)) (zipvec forest)
         (mapv #(apply serialize %)))))

(defn strip-link-map [m]
  (fmap m (fn [k]
            (->> (map first k) (map #(into {} %))
                 (apply merge-with +)))))

(defn merge-link [[l1 l2 l3 l4]]
  [(str "MATCH (a) WHERE ID(a) = {id1}"
        " WITH a MATCH (b) WHERE ID(b) = {id2}"
        " CREATE (a)-[:" (neo4j/esc-token l3)
        " " (neo4j/cypher-properties l4) " ]->(b)")
   (merge {:id1 l1 :id2 l2} l4)])

(defn update-id [id-map id]
  (if (contains? id-map id)
    (id-map id) id))

(defn id-map [id-set]
  (-> id-set last constantly (mapvals id-set)))

(defn swap-ids [id-map l]
  (let [update-f (partial update-id id-map)]
    (-> (update l 1 update-f)
        (update 2 update-f))))

(defn is-bad-link? [[l1 l2 l3 l4] bad-links]
  (or (contains? bad-links [l2 l4])
      (contains? bad-links [l3 l4])))

(defn combined-links [bad-links ids]
  (->> ids neo4j/all-links
       (remove #(is-bad-link? % (set bad-links)))
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

(defnp merge-all [bad-links id-set]
  (->> id-set (combined-links bad-links)
       (remove #(= (first %) (second %)))
       (merge-statements id-set)))

(defn src-features [sources]
  (->> (map #(str "src" %) s/src-features)
       (map #(get sources %))
       (map (fnil identity 0))))

(defn strongest-link [links]
  (->> (group-by #(->> % drop-last last vals (apply +)) links)
       (map vec) (sort-by first >) first second first))

(defn link-features [link best-link]
  (concat
   (-> link first model/bag-of-chars)
   (->> [link best-link] (map first) (map vector)
        (apply model/diff-len-adj))
   (-> link second src-features)
   (-> link last src-features)))

(defn node-link-features [links]
  (->> (map drop-last links)
       (map #(link-features
              % (strongest-link links))) 
       (zipvec (map last links))
       (map flatten) (map reverse)))

(defn train-link-model [data-file]
  (->> data-file slurp edn/read-string 
       (mapcat node-link-features)
       weka/make-forest))

(defn classify-links [model links]
  (->> (map vec links) (map #(conj % 0))
       node-link-features (map drop-last)
       (map #(weka/classify model %))))

(defn get-link-data [user query-map]
  (->> [(str "MATCH (root:" (neo4j/prop-label user (s/type-label query-map))
             ")-[r:" (neo4j/esc-token (:prop query-map))
             "]->(v) WHERE v." (neo4j/esc-token s/value)
             " IS NOT NULL WITH root, count(r) as o ORDER BY o DESC"
             " SKIP {start} LIMIT {limit} MATCH (root)-[r:"
             (neo4j/esc-token (:prop query-map))
             "]->(v) WITH o, ID(root) as idr, collect(["
             " v." (neo4j/esc-token s/value)
             ", r]) as vs RETURN vs ORDER BY o DESC")
        query-map]
       neo4j/cypher-query))

(defn clean-link [link]
  (update link 1 #(->> % (.asMap) (into {}))))

(defn accumulate-links [links]
  (->> (map second links)
       (apply merge-with +)
       (repeat (count links))
       (zipvec links)
       (mapv flatten)))

(defn parse-node-links [links]
  (accumulate-links (map (comp clean-link vec) links)))

(defn parse-link-data [user query-map]
  (->> (get-link-data user query-map)
       (map (comp parse-node-links first vals))
       first (map vec) (mapv prn)))

(defn train-pair-graph [class id1 id2 match?]
  (let [match-node {s/type-label s/trainpair s/s-class class}]
    (loom/build-graph
     []
     (if (contains? model/conflicts class)
       [[{:id id1} match-node (if match? s/match s/notmatch)]
        [{:id id2} match-node (if match? s/match s/notmatch)]]
       [[{:id id1} match-node (if match? s/weak s/strong)]
        [{:id id2} match-node (if match? s/strong s/weak)]]))))

(defn even-conflict [class pairs]
  (if (contains? model/conflicts class)
    (let [size-diff (quot (->> pairs (mapv count) (apply -)) 2)]
      (cond (pos? size-diff)
            [(->> pairs first (drop size-diff) vec)
             (->> pairs first (take size-diff) (mapv reverse)
                  (concat (second pairs)) vec)]
            (neg? size-diff)
            [(->> pairs second (take (* -1 size-diff)) (mapv reverse)
                  (concat (first pairs)) vec)
             (->> pairs second (drop (* -1 size-diff)) vec)]
            :else pairs))
    pairs))

(defn push-traindat! [class cs]
  (let [[pos-cs neg-cs] (even-conflict class cs)
        all-cs (concat (mapv #(conj % true) pos-cs)
                       (mapv #(conj % false) neg-cs))
        user (-> :train-user env auth/lookup-user)
        all-ids (distinct (mapcat drop-last all-cs))]
    (->> (map #(apply (partial train-pair-graph class) %) all-cs)
         (mapv #(insert/push-graph! % user s/edit-src)))
    (neo4j/switch-user! user all-ids)))

(defn dummy-map [objects]
  (-> 1.0 constantly (mapvals objects)))

(defn rank-params [[k m]]
  {k (if-let [model (@view-models k)]
       (->> (map clean-link m) accumulate-links
            (classify-links model)
            (zipmap (map first m)))
       (dummy-map (map first m)))})

(defn filter-decode-labels [labels]
  (->> labels (filter #(.contains % "_user_"))
       first neo4j/decode-label))

(defn params-ok? [params]
  (or (nil? params) (empty? params)
      (every? nil? (first params))))

(defn find-label [params]
  (-> params first second
      filter-decode-labels second))

(defn process-params [params]
  (->> (map #(drop 2 %) params)
       (map #(hash-map
              (keyword (first %))
              (vector (vector (second %) (third %)))))
       (apply merge-with into)
       (map rank-params) (apply merge)
       (merge {:id (ffirst params)
               s/type-label (find-label params)})))

(defn mapify-params [m]
  (let [params (-> m vals first)]
    (if (params-ok? params)
      nil (process-params params))))

(defn object-params [path m]
  (let [params (-> m vals first)]
    (if (params-ok? params)
      nil (->> params (group-by first) vals
               (map process-params) dummy-map
               (hash-map (vec (drop-last path)))))))

(defn one-link [n1 n2 pred]
  (str "[:" (neo4j/esc-token pred)
       "]-(b" n2 "a" n1 ")-"))

(defn link-chain [n1 preds]
  (->> preds count range
       (map #(one-link n1 % (nth preds %)))
       str/join))

(defn val-clause [n1 n2]
  (let [id-node (if (= n2 1) "root" (str "b" (- n2 2) "a" n1))]
    (str "collect({id: ID(" id-node "), labels: labels(" id-node
         "), type: type(r), val: a" n1 "." (neo4j/esc-token s/value)
         ", rel: r}) AS b" n1)))

(defn val-clause-old [n1 n2]
  (let [id-node (if (= n2 1) "root" (str "b" (- n2 2) "a" n1))]
    (str "collect([ID(" id-node "), labels(" id-node
         "), type(r), a" n1 "." (neo4j/esc-token s/value)
         ", r]) AS b" n1)))

(defn id-clause [n1]
  (str "collect(ID(a" n1 ")) AS b" n1))

(def special-paths {:id id-clause})

(defn with-clause [n1 preds]
  (->> [["WITH root"]
        (map #(str "b" %) (range n1))
        [(if-let [special-fn (special-paths (last preds))]
           (special-fn n1)
           (val-clause n1 (count preds)))]]
       flatten (str/join ", ")))

(defn match-chain [n1 preds]
  (str "OPTIONAL MATCH (root)-"
       (if (contains? special-paths (last preds))
         (str (->> preds drop-last drop-last
                   (link-chain n1))
              "[:" (-> preds drop-last last
                       neo4j/esc-token))
         (str (->> preds drop-last (link-chain n1))
              "[r:" (-> preds last neo4j/esc-token)))
       "]-(a" n1 ") "
       (with-clause n1 preds)))

(defn all-paths [paths]
  (->> paths count range
       (map #(match-chain % (nth paths %)))
       (str/join " ")))

(defn ret-vals [n]
  (->> n range (map #(str "b" %))
       (str/join ", ") (str "RETURN ")))

(defn fetch-paths-query [id paths]
  [(str "MATCH (root) WHERE ID(root) = {id}"
        " WITH root " (all-paths paths)
        " " (ret-vals (count paths)))
   {:id id}])

(defn choose-process [path m]
  (if (= (last path) :id)
    (object-params path m) (mapify-params m)))

(defn pick-keys [m]
  (mapv #(get m %) ["id" "labels" "type" "val" "rel"]))

(defn arrange-maps [m]
  (->> m vals first (mapv clojure-map)
       (mapv pick-keys) (hash-map (first (keys m)))))

(defn key-number [key]
  (-> key first (subs 1) (Integer/parseInt)))

(defn parse-paths-general [paths path-rels]
  (->> path-rels first clojure-map (map #(apply hash-map %))
       (sort-by #(-> % keys key-number))
       (mapv arrange-maps) (mapv choose-process paths)))

(defn parse-paths [paths path-rels]
  (let [results (parse-paths-general paths path-rels)
        result-map (->> (mapvals (comp first keys
                                       #(dissoc % :id s/type-label))
                                 results)
                        (into []) (map reverse) (mapv vec) (into {}))]
    (mapv #(-> % result-map % keys vec)
          (mapv #(if (= (last %) :id)
                   (last (last %)) (last %))
                paths))))

(defn get-ids-path [path]
  (->> path count inc (range 1)
       (map #(subvec path 0 %))
       (map #(conj % :id))))

(defn strip-path-id [path]
  (if (= (last path) :id) (drop-last path) path))

(defn fetch-paths-full [id paths]
  (->> paths (map strip-path-id)
       (fetch-paths-query id) vector
       neo4j/cypher-combined-tx first
       (parse-paths-general paths)))

(defn fetch-paths [id paths]
  (->> (fetch-paths-query id paths)
       vector neo4j/cypher-combined-tx
       first (parse-paths paths)))

(defn prop-diff [id1 id2 prop]
  (->> (map #(fetch-paths % [[prop]]) [id1 id2])
       (map ffirst) (apply model/run-diff)
       (remove #(= (.-operation %)
                   DiffMatchPatch$Operation/EQUAL))))

(defn fetch-train-ids [id paths]
  (->> (mapcat get-ids-path paths)
       (fetch-paths-query id) vector
       neo4j/cypher-combined-tx
       (map #(parse-paths paths %))
       (mapcat #(apply concat %))
       (concat [id])))

(defn normalize-pair [pair]
  [(ffirst pair) (first (second pair))
   (condp = (-> pair second second keyword)
     s/match :true s/notmatch :false
     s/strong :true s/weak :false nil)])

(defn fetch-train-pairs [class]
  (let [user (-> :train-user env auth/lookup-user)]
    (->> ["MATCH (c:" (neo4j/prop-label user s/s-class)
          ")<-[:" (neo4j/esc-token s/s-class)
          "]-(p:" (neo4j/prop-label user s/trainpair)
          ") WITH p MATCH (p)<-[r]-(a) WITH collect(["
          "ID(p), ID(a), type(r)]) AS vs RETURN vs"]
         (apply str) neo4j/cypher-query
         first vals first (group-by first) vals
         (mapv (comp normalize-pair #(mapv rest %)))
         (group-by third) ((juxt :true :false))
         (mapv #(mapv (comp vec drop-last) %))
         (even-conflict class))))

(defn fetch-all-paths [paths ids]
  (->> (map #(fetch-paths-query % paths) ids)
       neo4j/cypher-combined-tx
       (map #(parse-paths paths %))
       (zipmap ids)))

(defn recon-finished [recon-ids]
  (if (empty? recon-ids) []
      [[(str "MATCH (root) WHERE ID(root) IN {ids}"
             " SET root:" (neo4j/esc-token s/recon))
        {:ids recon-ids}]
       [(str "MATCH (root) WHERE ID(root) IN {ids}"
             " REMOVE root:" (neo4j/esc-token s/norecon))
        {:ids recon-ids}]]))

(defn add-ns [coll]
  (map vector (map inc (range (count coll))) coll))

(defn candidate-piece-left [user [n pred]]
  (str "-[lr" n ":" (neo4j/esc-token pred)
       "]-(l" n ")"))

(defn candidate-piece-right [user [n pred]]
  (str "(r" n ")-[rr" n ":" (neo4j/esc-token pred)
       "]-"))

(defn candidate-path [user label preds]
  (str "MATCH (root:" (neo4j/prop-label user label)
       ":" (neo4j/esc-token s/norecon) ")"
       (->> preds (drop 2) reverse add-ns
            (mapv #(candidate-piece-left user %))
            (map str) str/join)
       "-[l0:" (neo4j/esc-token (second preds))
       "]-(v:" (neo4j/prop-label user (first preds))
       ")-[r0:" (neo4j/esc-token (second preds)) "]-"
       (->> preds (drop 2) add-ns
            (mapv #(candidate-piece-right user %))
            (map str) str/join)
       "(m:" (neo4j/prop-label user label) ")"
       " RETURN ID(root), ID(m)"))

(defn candidate-range-find [user label field]
  (->> (str "MATCH (root:" (neo4j/prop-label user label)
            ":" (neo4j/esc-token s/norecon)
            ")-[r:" (neo4j/esc-token field)
            "]->(v:" (neo4j/prop-label user field) ")"
            " RETURN ID(root), v." (neo4j/esc-token s/value))
       neo4j/cypher-query doall
       (map (juxt #(get % "ID(root)")
                  #(get % (str "v." (neo4j/esc-token s/value)))))))

(defn candidate-range-base [user label field]
  (str "MATCH (root:" (neo4j/prop-label user label)
       ")-[r:" (neo4j/esc-token field)
       "]->(v:" (neo4j/prop-label user field) ")"
       " WHERE v." (neo4j/esc-token s/value)))

(defn candidate-range-str [user label field margin [id val]]
  [(str (candidate-range-base user label field)
        " STARTS WITH {val} AND ID(root) > {id}"
        " RETURN {id}, ID(root)")
   {:val (if (<= (count val) 5) val
             (->> val count (* margin) Math/floor (subs val 0)))
    :id id}])

(defn candidate-range-num [user label field margin [id val]]
  [(str (candidate-range-base user label field)
        " > {sval} AND v." (neo4j/esc-token s/value)
        " < {bval} AND ID(root) > {id}"
        " RETURN {id}, ID(root)")
   {:sval (- val margin) :bval (+ val margin)
    :id id}])

(defn get-pair [m]
  ((juxt #(get % "{id}") #(get % "ID(root)")) m))

(defn candidate-range [user label [field margin]]
  (let [id-vals (candidate-range-find user label field)]
    (when (not (empty? id-vals))
      (let [range-fn (partial
                      (if (string? (second (first id-vals)))
                        candidate-range-str candidate-range-num)
                      user label field margin)]
        (->> id-vals (map range-fn) neo4j/cypher-combined-tx
             doall (mapcat #(map get-pair %)))))))

(defn email-candidate-pattern [user]
  (str "MATCH (root:" (neo4j/prop-label user s/person)
       ")<-[:" (neo4j/esc-token s/link-to)
       "]-(l:" (neo4j/prop-label user s/hyperlink)
       ")<-[:" (neo4j/esc-token s/email-mentions)
       "]-(e:" (neo4j/prop-label user s/email)))

(defn email-candidate-meta [user]
  (str (email-candidate-pattern user)
       ")-->(m:" (neo4j/prop-label user s/person)
       ") RETURN ID(root), ID(m)"))

(defn optional-search [user class query]
  (if (= class s/person)
    (concat query [(email-candidate-meta user)])
    query))

(defn find-candidate-paths [user class]
  (->> class (get model/candidates)
       (filter #(keyword? (second %)))
       (mapv #(candidate-path user class %)) 
       (optional-search user class)
       (mapcat neo4j/cypher-query) doall
       (map (juxt #(get % "ID(root)") #(get % "ID(m)")))))

(defnp find-candidates [user class]
  (->> class (get model/candidates)
       (remove #(keyword? (second %)))
       (mapcat #(candidate-range user class %))
       (concat (find-candidate-paths user class))
       (map sort) distinct))

(defn pair-map [p m]
  (map #(get m %) p))

(defn diff-pair [[p1 p2]]
  (map #(apply % p2) p1))

(defn score-diff [rules diff]
  (->> (apply zipvec diff)
       (zipvec (map second rules))
       (pmap diff-pair) flatten))

(defn get-diffs [user class cs]
  (let [rules (get model/scoring class)
        vs (->> cs flatten distinct
                (fetch-all-paths (map first rules)))]
    (->> (map #(pair-map % vs) cs)
         (pmap #(score-diff rules %))
         (map vec) (zipmap cs))))

(defnp conflict-data [user class ids]
  (fetch-all-paths
   (map first (get model/scoring class))
   ids))

(defnp conflict-prob [class]
  (fn [d1 d2]
    (->> (map second [d1 d2])
         (score-diff (get model/scoring class))
         (weka/classify (get @conflict-models class))
         (weka/classify-logit (get @recon-logit class)))))

(defnp score-map [class mo]
  (-> (fmap mo (->> class (get @recon-models)
                    (partial weka/classify)))
      (fmap (->> class (get @recon-logit)
                 (partial weka/classify-logit)))))

(defn score-all [user class]
  (->> (find-candidates user class) 
       (get-diffs user class)
       (score-map class)
       (into [])))

(defn training-query [[ids1 ids2]]
  (str "MATCH (a)--(b) WHERE ID(a) IN ["
       ids1 ", " ids2 "] RETURN a, b"))

(defn find-conflicts [user class feature expected]
  (->> (find-candidates user class) (get-diffs user class)
       (remove #(-> % second (nth feature) (= expected)))
       (into {}) (score-map class) (into [])
       (sort-by second >)))

(defn log2 [x]
  (/ (Math/log x) (Math/log 2)))

(defn bin-entropy [x]
  (if (or (>= x 1) (<= x 0)) 0.0
      (- (* x -1 (log2 x))
         (* (- 1 x) (log2 (- 1 x))))))

(defn sample-one [n total [a1 a2] sample]
  (let [i (+ a1 (second sample))]
    (if (-> a2 count (+ 0.5)
            (* total) (/ n) (< i))
      [i (conj a2 sample)] [i a2])))

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
         second (mapv first) (mapv vec))))

(defn split-neg-pos [freqs]
  [(remove #(<= (second (first %)) 0.95) freqs)
   (remove #(<= 0.05 (second (first %))) freqs)])

(defn adjust-weight [n]
  (fn [point] (update point 1 #(/ % n))))

(defn adjust-weights [n freqs]
  (let [total (->> freqs (map second) (apply +))]
    (mapv (adjust-weight (/ total n)) freqs)))

(defn update-sqrt [point]
  (update point 1 #(Math/sqrt %)))

(defn select-candidate [[a1 a2] [p1 p2]]
  [(reduce conj a1
           (repeat (- (int (+ p2 a2)) (int a2))
                   (first p1)))
   (+ a2 p2)])

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

(defonce traindata (atom [[] []]))
(defonce recon-pairs (atom []))

(defn even-atom! [class]
  (swap! traindata #(even-conflict class %)))

(defn add-pos [pair]
  (swap! traindata
         (fn [t] (update t 0 #(cons pair %)))))

(defn add-neg [pair]
  (swap! traindata
         (fn [t] (update t 1 #(cons pair %)))))

(defn gather-train []
  (loop [candidates @recon-pairs]
    (println "New candidate:")
    (println (training-query (first candidates)))
    (let [resp (read-line)]
      (condp = resp
        "p" (do (add-pos (first candidates))
                (recur (rest candidates)))
        "n" (do (add-neg (first candidates))
                (recur (rest candidates)))
        "s" (recur (rest candidates))
        "l" (/ 1 0) ; Intentional exception to quit
        "q" nil
        (do (println "Error: Invalid input, trying again")
            (recur candidates))))))

(defn append-scores [[pos neg]]
  [(->> (map vec pos) (map #(conj % 1.0)))
   (->> (map vec neg) (map #(conj % 0.0)))])

(defn train-forest [user class pos-cs neg-cs]
  (->> [pos-cs neg-cs]
       (map #(get-diffs user class %)) (map vals)
       (vector (old-model-points user class model-rollover))
       (apply map vector) (map #(apply concat %))
       append-scores (apply concat) 
       weka/save-traindat weka/make-forest))

(defn train-full [user class pos-cs neg-cs]
  (let [f (train-forest user class pos-cs neg-cs)]
    [f (-> (weka/load-traindat) weka/forest-curve)]))

(defn train-atom [user class]
  (let [[pos-cs neg-cs] @traindata]
    (train-full user class pos-cs neg-cs)))

(defn train-iterate [user class]
  (gather-train)
  (let [new-model (train-atom user class)]
    (write-forest class new-model))
  (load-models!) (load-thresholds!)
  (reset! recon-pairs (candidate-sample user class 500))
  (recur user class))

(defn train-database [class]
  (let [user (-> :train-user env auth/lookup-user)]
    (apply (partial train-full user class)
           (fetch-train-pairs class))))

(defnp groups-to-recon [class score-map]
  (->> (map #(update % 0 vec) score-map)
       (mapv #(apply conj %)) (map vec)
       (loom/build-graph [])
       cluster/prob-weights
       cluster/vote-clustering
       (remove #(-> % count (< 2)))))

(defn delete-prop [id class]
  [(str "MATCH (a)-[:" (neo4j/esc-token class)
        "]->(b) WHERE ID(a) = {id} DETACH DELETE b")
   {:id id}])

(defnp delete-queries [user class groups]
  (let [values (->> (apply concat groups)
                    (conflict-data user class))]
    (->> (map (fn [g] (map #(vector % (values %))
                           g)) groups) 
         (map #(compare/estimate-scores
                % (conflict-prob class)))
         (map rest) (mapcat #(map ffirst %)) 
         (map #(vector % class)))))

(defnc run-recon! [user class]
  (let [recon-ids (neo4j/norecon-ids user class)
        recon-groups (->> class (score-all user)
                          (groups-to-recon class))
        bad-links (->> class model/conflicts
                       (mapcat #(delete-queries user % recon-groups))
                       doall)]
    (->> (recon-finished recon-ids)
         (concat (doall (mapcat #(merge-all bad-links %)
                                recon-groups)))
         (neo4j/cypher-combined-tx nil))
    (neo4j/table-refresh! user)))
