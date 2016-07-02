(ns spectra.queries
  (:require [clojure.set :as cset]
            [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra.auth :as auth]
            [spectra.mlrecon :as mlrecon] 
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn node-attrs [node]
  (merge (.asMap node) (hash-map :id (.id node))))

(defn vals-collect []
  (str " MATCH (root)-[r]->(v) WITH o, ID(root) as idr,"
       " collect([ID(root), labels(root),"
       " type(r), v." (neo4j/esc-token s/value)
       ", r]) as vs RETURN vs ORDER BY o DESC"))

(defn person-from-user [user query-map]
  (->> [(str "MATCH (root:" (neo4j/prop-label user s/person)
             ") OPTIONAL MATCH (root)<-[:" (neo4j/esc-token s/email-to)
             "]-(em:" (neo4j/prop-label user s/email)
             ") WITH root, count(em) as o ORDER BY o DESC"
             " SKIP {start} LIMIT {limit}" (vals-collect))
        query-map]
       neo4j/cypher-query (mapv mlrecon/mapify-params)))

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
             ")-[:" (neo4j/esc-token s/email-mentions)
             "]->(d:" (neo4j/prop-label user s/event)
             ") WITH root, sd." (neo4j/esc-token s/value)
             " as o ORDER BY o DESC SKIP {start} LIMIT {limit}"
             (vals-collect))
        {:start start :limit limit}]
       neo4j/cypher-query (mapv mlrecon/mapify-params)))

(defn token-keys [m]
  (->> (map #(update % 0 keyword) m)
       (into {})))

(defn user-data-public [user query-map]
  (-> (.asMap user) clojure-map token-keys
      (dissoc s/pwd-hash) (dissoc s/google-token)))

(defn node-from-id [user id node-type]
  (->> [(str "MATCH (root:" (neo4j/prop-label user node-type)
             ") WHERE ID(root) = {id} WITH root, 0 as o"
             (vals-collect))
        {:id id}]
       neo4j/cypher-query (mapv mlrecon/mapify-params)))

(defn merge-if-exists [node query-map]
  (when node (merge node {:type (:type query-map)})))

(def node-paths
  {s/person [[s/s-name] [s/email-addr] [s/phone-num]
             [s/org-member s/s-name :id] [s/website]]
   s/email [[s/email-subject] [s/email-body] [s/email-sent]
            [s/email-from s/s-name :id] [s/email-to s/s-name :id]
            [s/email-replyto s/email-from s/s-name :id]]
   s/organization [[s/s-name] [s/email-addr] [s/phone-num] [s/website]
                   [s/org-member s/s-name :id]]
   s/location [[s/s-name] [s/zipcode]
               [s/link-to s/email-mentions s/email-subject :id]]
   s/building [[s/street-addr]
               [s/link-to s/email-mentions s/email-subject :id]]
   s/event [[s/s-name] [s/date-time] [s/event-type] [s/website]
            [s/event-features s/s-name :id]
            [s/link-to s/email-mentions s/email-subject :id]]})

(defn strip-path-id [path]
  (if (= (last path) :id) (drop-last path) path))

(defn node-by-id [user {:keys [id type] :as query-map}]
  (when (neo4j/node-exists? user id type)
    (when-let [paths (node-paths type)]
      (->> paths (map strip-path-id)
           (mlrecon/fetch-paths-query id) vector
           neo4j/cypher-combined-tx first
           (mlrecon/parse-paths-general paths)
           (filter #(not-any? nil? (keys %)))
           (map #(dissoc % :id s/type-label)) (apply merge)
           (merge {:id id s/type-label type})))))

(defn key-link [user query-map]
  (-> [(str "MATCH (m:" (neo4j/prop-label user s/email)
            ")-[:" (neo4j/esc-token s/email-mentions)
            "]->(h:" (neo4j/prop-label user s/hyperlink)
            ")-[:" (neo4j/esc-token s/link-id)
            "]->(l:" (neo4j/prop-label user s/link-id)
            ") WHERE ID(m) = {id} AND l." (neo4j/esc-token s/value)
            " = {key} WITH h MATCH (h)-[:" (neo4j/esc-token s/link-to)
            "]->(root) RETURN ID(root), labels(root)")
       query-map]
      neo4j/cypher-query first clojure-map
      (cset/rename-keys {"ID(root)" :id "labels(root)" :type})
      (update :type #(-> % vec mlrecon/filter-decode-labels second))
      (#(node-by-id user %))))

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
             (if user (str "WHERE ID(u) = " (.id user)) "")
             " WITH root, u"
             " MATCH (root)-[:" (neo4j/esc-token s/loaded-bottom)
             "]-(b) WITH root, u, b WHERE b." (neo4j/esc-token s/value)
             " > {queuebound}"
             " MATCH (root)-[:" (neo4j/esc-token s/modified)
             "]-(m) WITH root, u, b, m "
             " RETURN root, u ORDER BY m." (neo4j/esc-token s/value)
             " LIMIT {limit}")
        {:queuebound 250000 :limit 1}]
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
       ")<-[" (escape-rels [s/email-to s/email-from s/email-mentions])
       "]-(em:" (neo4j/prop-label user s/email)
       ")-[:" (neo4j/esc-token s/has-link)
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

(defn event-related [user query-map]
  (->> [(str (rel-query user)
             (neo4j/prop-label user s/event)
             ") WHERE ID(root) = {`person-id`}"
             " WITH ev as root, 0 as o"
             " SKIP {start} LIMIT {limit}"
             (vals-collect))
        (update query-map :person-id #(Integer/parseInt %))]
       neo4j/cypher-query (mapv mlrecon/mapify-params)))

(def loc-paths [[s/s-name] [s/has-coord s/lat] [s/has-coord s/lng]])

(defn update-lat-lon [m]
  (-> (update m s/lat first)
      (update s/lng first)))

(defn loc-related [user query-map]
  (->> [(str (rel-query user)
             (neo4j/prop-label user s/location)
             ")-[:" (neo4j/esc-token s/has-coord)
             "]->(g:" (neo4j/prop-label user s/geocode)
             ") WHERE ID(root) = {`person-id`}"
             " RETURN ID(ev) SKIP {start} LIMIT {limit}")
        (update query-map :person-id #(Integer/parseInt %))]
       neo4j/cypher-query (map vals) (mapv first)
       (mlrecon/fetch-all-paths loc-paths)
       (fmapl #(zipmap (map last loc-paths) %))
       (map #(merge (val %) {:id (key %) :label s/location}))
       (map update-lat-lon)))

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
        ":" (neo4j/esc-token s/nonlp)
        ")-[:" (neo4j/esc-token s/email-body)
        "]->(b) RETURN count(root)"]
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
        " RETURN ID(r)")
   {:query query}])

(defn id-row [[r1 r2]]
  [r1 (map (comp first vals) r2)])

(defn search-query [id]
  [(str "MATCH (root) WHERE ID(root) = {id}"
        " WITH root, 0 as o" (vals-collect))
   {:id id}])

(defn search-row [[r1 r2]]
  [r1 (-> (comp first #(mapv mlrecon/mapify-params %)
                neo4j/cypher-query
                search-query)
          (map r2) vec)])

(defn include-pred [[r1 r2]]
  (map #(merge % {:pred r1}) r2))

(defn full-search [user query-map]
  (let [query (:query query-map)]
    (->> s/search-preds
         (map #(partial-val-query user query %))
         neo4j/cypher-combined-tx
         (zipvec s/search-preds) vec
         (remove #(-> % second empty?))
         (map (comp include-pred search-row id-row))
         flatten)))

(defn find-user-labels [labels]
  (when labels
    (->> labels mlrecon/filter-decode-labels
         first neo4j/find-by-id)))

(defnp email-for-nlp [limit]
  (->> [(str "MATCH (root:" (neo4j/esc-token s/nonlp)
             ":" (neo4j/esc-token s/recon)
             ")-[:" (neo4j/esc-token s/email-body)
             "]->(b) RETURN ID(root), labels(root) LIMIT {limit}")
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
