(ns candlecrm.queries
  (:require [clojure.set :as cset]
            [clojure.string :as str]
            [candlecrm.common :refer :all]
            [candlecrm.auth :as auth]
            [candlecrm.datetime :as dt]
            [candlecrm.imap :as imap]
            [candlecrm.mlrecon :as mlrecon] 
            [candlecrm.neo4j :as neo4j]
            [candlecrm_cljc.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn vals-collect []
  (str " MATCH (root)-[r]->(v) WITH o, ID(root) as idr,"
       " collect([ID(root), labels(root),"
       " type(r), v." (neo4j/esc-token s/value)
       ", r]) as vs RETURN vs ORDER BY o DESC"))

(defn emails-from-user [user query-map]
  (->> [(str "MATCH (root:" (neo4j/prop-label user s/email)
             ")-[:" (neo4j/esc-token s/email-sent)
             "]-(sd:" (neo4j/prop-label user s/email-sent)
             ") WITH root, sd." (neo4j/esc-token s/value) " as o"
             " ORDER BY o DESC SKIP {start} LIMIT {limit}"
             (vals-collect))
        query-map]
       neo4j/cypher-query (mapv mlrecon/mapify-params)))

(defn emails-linked [user query-map]
  (->> [(str "MATCH (root:" (neo4j/prop-label user s/email)
             ")-[:" (neo4j/esc-token (:link query-map))
             "]->(p:" (neo4j/prop-label user s/person)
             ") WHERE ID(p) = {`person-id`}"
             " WITH root MATCH (root)-[r]->(v:"
             (neo4j/prop-label user s/email-sent)
             ") WITH root, v." (neo4j/esc-token s/value)
             " as o ORDER BY o DESC SKIP {start} LIMIT {limit}"
             (vals-collect))
        (dissoc query-map :link)]
       neo4j/cypher-query (mapv mlrecon/mapify-params)))

(defn emails-with-dates [user start limit]
  (->> [(str "MATCH (sd:" (neo4j/prop-label user s/email-sent)
             ")<-[:" (neo4j/esc-token s/email-sent)
             "]-(root:" (neo4j/prop-label user s/email)
             ")-[:" (neo4j/esc-token s/text-mentions)
             "]->(d:" (neo4j/prop-label user s/event)
             ") WITH root, sd." (neo4j/esc-token s/value)
             " as o ORDER BY o DESC SKIP {start} LIMIT {limit}"
             (vals-collect))
        {:start start :limit limit}]
       neo4j/cypher-query (mapv mlrecon/mapify-params)))

(defn token-keys [m]
  (->> (map #(update % 0 keyword) m) (into {})))

(defn user-data-public [user query-map]
  (-> (.asMap user) clojure-map token-keys
      (dissoc s/pwd-hash) (dissoc s/google-token)
      (dissoc s/outlook-token) (dissoc s/yahoo-token)))

(defn key-vector [m]
  (if (->> m keys first vector?) m
      (let [[k v] (first m)] {[k] v})))

(defn node-by-id [user {:keys [id type] :as query-map}]
  (when (neo4j/node-exists? user id type)
    (when-let [paths (s/node-paths type)]
      (->> paths (map rest) (mapv vec)
           (mlrecon/fetch-paths-full id) (remove nil?) 
           (filter #(not-any? nil? (keys %)))
           (map #(dissoc % :id s/type-label))
           (map key-vector) (apply merge)
           (merge {:id id s/type-label type})))))

(defn optional-fetch-node [key-result user]
  (when key-result
    (-> key-result clojure-map
        (cset/rename-keys {"ID(root)" :id "labels(root)" :type})
        (update :type #(-> % vec mlrecon/filter-decode-labels second))
        (#(node-by-id user %)))))

(defn key-link [user query-map]
  (-> [(str "MATCH (m)-[:" (neo4j/esc-token s/text-mentions)
            "]->(h:" (neo4j/prop-label user s/hyperlink)
            ")-[:" (neo4j/esc-token s/link-id)
            "]->(l:" (neo4j/prop-label user s/link-id)
            ") WHERE ID(m) = {id} AND l." (neo4j/esc-token s/value)
            " = {key} WITH h MATCH (h)-[:" (neo4j/esc-token s/link-to)
            "]->(root) RETURN ID(root), labels(root)")
       query-map]
      neo4j/cypher-query first
      (optional-fetch-node user)))

(defn org-list [user query-map]
  (->> [(str "MATCH (root:" (neo4j/prop-label user s/organization)
             ") OPTIONAL MATCH (root)<-[:" (neo4j/esc-token s/org-member)
             "]-(h:" (neo4j/prop-label user s/person)
             ") WITH root, count(h) as o ORDER BY o DESC"
             " SKIP {start} LIMIT {limit} RETURN ID(root)")
        query-map]
       neo4j/cypher-query (map vals) (map first)
       (map #(node-by-id user {:id % :type s/organization}))))

(defn person-list [user query-map]
  (->> [(str "MATCH (root:" (neo4j/prop-label user s/person)
             ") OPTIONAL MATCH (root)<-[:" (neo4j/esc-token s/email-to)
             "]-(em:" (neo4j/prop-label user s/email)
             ") WITH root, count(em) as o ORDER BY o DESC"
             " SKIP {start} LIMIT {limit}" (vals-collect))
        query-map]
       neo4j/cypher-query (mapv mlrecon/mapify-params)))

(defn person-from-user [user query-map]
  (condp = (:type query-map)
    s/person (person-list user (dissoc query-map :type))
    s/organization (org-list user (dissoc query-map :type))
    []))

(defn email-queue []
  (-> [(str "MATCH (root:" s/email-queue
            ") RETURN root LIMIT {limit}")
       {:limit 1}]
      neo4j/cypher-list first))

(defn queue-data [n]
  (when n
    (->> [[s/loaded-bottom] [s/loaded-top] [s/top-uid] [s/modified]]
         (mlrecon/fetch-paths (.id n)) (map first)
         (zipmap [s/loaded-bottom s/loaded-top s/top-uid s/modified])
         (merge {:id (.id n)}))))

(defn next-email-queue
  ([] (next-email-queue nil))
  ([user]
   (-> [(str "MATCH (root)-[:" (neo4j/esc-token s/user-queue)
             "]->(u:" (neo4j/esc-token s/user) ") "
             " WHERE u." (neo4j/esc-token s/recon-run) " = false"
             (if user (str " AND ID(u) = " (.id user)) "")
             " WITH root, u MATCH (root)-[:" (neo4j/esc-token s/loaded-bottom)
             "]-(b) WITH root, u, b MATCH (root)-[:" (neo4j/esc-token s/loaded-top)
             "]-(t) WITH root, u, b, t MATCH (root)-[:" (neo4j/esc-token s/top-uid)
             "]-(l) WHERE (t." (neo4j/esc-token s/value)
             " - b." (neo4j/esc-token s/value) " < {queuebound}"
             " AND b." (neo4j/esc-token s/value) " > 0)"
             " OR (l." (neo4j/esc-token s/value)
             ") > (t." (neo4j/esc-token s/value)
             ") MATCH (root)-[:" (neo4j/esc-token s/modified)
             "]-(m) WITH root, u, m "
             " RETURN root, u ORDER BY m." (neo4j/esc-token s/value)
             " LIMIT {limit}")
        {:queuebound imap/archive-size :limit 1}] 
       neo4j/cypher-query first clojure-map
       (cset/rename-keys {"root" :queue "u" :user})
       (update :queue queue-data))))

(defn all-scanned [user]
  (-> [(str "MATCH (root:" (neo4j/esc-token s/user)
            ")-[:" (neo4j/esc-token s/scanned)
            "]->(s:" (neo4j/esc-token s/time-scanned)
            ") WHERE ID(root) = {id} RETURN s")
       {:id (.id user)}]
      neo4j/cypher-list))

(defn scan-overlaps [user time]
  (-> [(str "MATCH (root:" (neo4j/esc-token s/user)
            ")-[:" (neo4j/esc-token s/scanned)
            "]->(s:" (neo4j/esc-token s/time-scanned)
            ") WHERE ID(root) = {id}"
            " AND s." (neo4j/esc-token s/start-time)
            " <= {limtime} AND s." (neo4j/esc-token s/stop-time)
            " >= {limtime} RETURN s")
       {:id (.id user) :limtime time}]
      neo4j/cypher-list))

(defn escape-rels [rels]
  (->> (map neo4j/esc-token rels)
       (map #(str ":" %))
       (str/join "|")))

(defn rel-query [user]
  (str "MATCH (root:" (neo4j/prop-label user s/person)
       ")<-[" (escape-rels [s/email-to s/email-from])
       "]-(em:" (neo4j/prop-label user s/email)
       ")-[:" (neo4j/esc-token s/text-mentions)
       "]->(m:" (neo4j/prop-label user s/hyperlink)
       ")-[:" (neo4j/esc-token s/link-to)
       "]->(ev:"))

(defn people-by-reltype [user query-map]
  (->> [(str (rel-query user)
             (neo4j/prop-label user (:reltype query-map))
             ") WITH root, count(ev) as o ORDER BY o "
             " DESC SKIP {start} LIMIT {limit}"
             (vals-collect))
        query-map]
       neo4j/cypher-query (mapv mlrecon/mapify-params)))

(defn event-agenda [user query-map]
  (->> [(str "MATCH (e:" (neo4j/prop-label user s/event)
             ")-[:" (neo4j/esc-token s/event-begin)
             "]->(b:" (neo4j/prop-label user s/event-begin)
             ") WHERE b." (neo4j/esc-token s/value)
             " >= {present} WITH b, ID(e) as e ORDER BY b."
             (neo4j/esc-token s/value) " RETURN DISTINCT e"
             " SKIP {start} LIMIT {limit}")
        (merge query-map {:present (to-ms (dt/now))})] 
       neo4j/cypher-query (map #(into {} %)) (mapcat vals)
       (map #(node-by-id user {:id % :type s/event}))))

(defn event-related [user query-map]
  (->> [(str (rel-query user)
             (neo4j/prop-label user s/event)
             ") WHERE ID(root) = {`person-id`}"
             " WITH ev as root SKIP {start} LIMIT {limit}"
             " MATCH (root) RETURN DISTINCT ID(root)")
        (update query-map :person-id #(Integer/parseInt %))]
       neo4j/cypher-query (map #(into {} %)) (mapcat vals)
       (map #(node-by-id user {:id % :type s/event}))))

(def loc-paths [[s/street-addr] [s/located-in s/s-name] [s/located-in s/zipcode]
                [s/has-coord s/lat] [s/has-coord s/lng]])

(defn normalize-loc [[addrs locs zips lats lngs]]
  {s/lat (first lats) s/lng (first lngs)
   s/s-name [(str (str/join " " addrs) ", "
                  (str/join " " locs) " "
                  (str/join " " zips))]})

(defnc loc-related [user query-map]
  (->> [(str (rel-query user)
             (neo4j/prop-label user s/building)
             ")-[:" (neo4j/esc-token s/has-coord)
             "]->(g:" (neo4j/prop-label user s/geocode)
             ") WHERE ID(root) = {`person-id`}"
             " RETURN ID(ev) SKIP {start} LIMIT {limit}")
        (update query-map :person-id #(Integer/parseInt %))]
       neo4j/cypher-query (map vals) (mapv first)
       (mlrecon/fetch-all-paths loc-paths) (fmapl normalize-loc)
       (map #(merge (val %) {:id (key %) :label s/building}))))

(defn bare-locations [limit]
  (-> [(str "MATCH (root:" (neo4j/esc-token s/nogeocode)
            ":" (neo4j/esc-token s/recon)
            ") WHERE NOT (root)-[:" (neo4j/esc-token s/has-coord)
            "]->() RETURN root LIMIT {limit}")
       {:limit limit}]
      neo4j/cypher-list))

(defn recon-count-expand [[l1 l2]]
  (map #(hash-map % l2) l1))

(defn nonlp-count [user]
  (->> ["MATCH (root:" (neo4j/prop-label user s/email)
        ")-[:" (neo4j/esc-token s/email-body)
        "]->(b) WHERE NOT root:" (neo4j/esc-token s/nlp-done)
        " RETURN count(root)"]
       (apply str) neo4j/cypher-query
       first vals first))

(defnp norecon-count-all []
  (->> (str "MATCH (root:" (neo4j/esc-token s/norecon)
            ") RETURN labels(root), count(*)")
       neo4j/cypher-query (map vals) 
       (map recon-count-expand)
       flatten (apply merge-with +)
       (map vec) (map reverse)
       (sort-by first >)
       (filter #(.contains (second %) "_user_"))
       (map #(vector (first %) (neo4j/decode-label (second %))))))

(defn partial-val-query [user query prop]
  [(str "MATCH (v:" (neo4j/prop-label user prop)
        ")<--(r) WHERE v.val STARTS WITH {query}"
        " RETURN ID(r), labels(r)")
   {:query query}])

(defn find-type [[id labels]]
  [id (->> labels mlrecon/filter-decode-labels second)])

(defn id-row [[r1 r2]]
  [r1 (->> r2 (map vals) (map vec) (map find-type))])

(defn full-search [user query-map]
  (let [query (:query query-map)]
    (->> s/search-preds (map #(partial-val-query user query %))
         neo4j/cypher-combined-tx (zipvec s/search-preds) vec 
         (remove #(-> % second empty?)) (map id-row)
         (mapcat second) distinct (map #(zipmap [:id :type] %)) 
         (map #(node-by-id user %)))))

(defn find-user-labels [labels]
  (when labels
    (->> labels mlrecon/filter-decode-labels
         first neo4j/find-by-id)))

(defnp email-for-nlp [limit]
  (->> [(str "MATCH (root:" (neo4j/esc-token s/recon)
             ")-[:" (neo4j/esc-token s/email-body)
             "]->(b) WHERE NOT root:" (neo4j/esc-token s/nlp-done)
             " RETURN ID(root), labels(root) LIMIT {limit}")
        {:limit limit}]
       neo4j/cypher-query (map clojure-map)
       (map #(update % "labels(root)" find-user-labels))
       (map #(cset/rename-keys % {"ID(root)" :id
                                  "labels(root)" s/user}))))

(defn users-reset-tokens []
  (->> (str "MATCH (root:" (neo4j/esc-token s/user)
            ") WHERE root." (neo4j/esc-token s/pwd-reset-token)
            " IS NOT NULL RETURN root")
       neo4j/cypher-list))

(defn users-recon-running []
  (->> (str "MATCH (root:" (neo4j/esc-token s/user)
            ") WHERE root." (neo4j/esc-token s/recon-run)
            " = true RETURN ID(root)")
       neo4j/cypher-query
       (map vals) (map first)))
