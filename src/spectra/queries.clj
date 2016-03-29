(ns spectra.queries
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [spectra.auth :as auth]
            [spectra.common :as com]
            [spectra.mlrecon :as mlrecon] 
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]))

(defn first-if-coll [coll]
  (if (coll? coll) (first coll) coll))

(defn first-table-vals [person]
  (->> person
       (map #(hash-map (key %)
                       (first-if-coll (val %))))
       (reduce merge)))

(defn node-attrs [node]
  (merge (:data node) (hash-map :id (:id node))))

(defn tablify-hits [hits]
  (->> (map node-attrs hits)
       (remove empty?)
       (map first-table-vals)))

(defn filter-decode-labels [labels]
  (->> labels (filter #(.contains % "_user_"))
       first neo4j/decode-label))

(defn mapify-params [params]
  (if (or (nil? params) (empty? params))
    nil (->> (map #(drop 2 %) params)
             (map #(hash-map (keyword (first %))
                             (vector (second %))))
             (apply merge-with concat)
             (merge {:id (ffirst params)
                     s/type-label (-> params first second
                                      filter-decode-labels
                                      second)}))))

(defn mapify-hits [hits]
  (->> hits first vals first
       (group-by first) vals
       (map mapify-params)))

(defn vals-collect []
  (str " MATCH (root)-[r]->(v)"
       " WITH collect([ID(root), labels(root),"
       " type(r), v." (neo4j/esc-token s/value)
       "]) as vs RETURN vs"))

(defn person-from-user [user query-map]
  (-> (str "MATCH (root:" (neo4j/prop-label user s/person)
           ") OPTIONAL MATCH (root)<-[:" (neo4j/esc-token s/email-to)
           "]-(em:" (neo4j/prop-label user s/email)
           ") WITH root, count(em) as cem ORDER BY cem"
           " SKIP " (:start query-map) " LIMIT " (:limit query-map)
           (vals-collect))
      neo4j/cypher-query-raw mapify-hits))

(defn emails-from-user [user query-map]
  (-> (str "MATCH (root:" (neo4j/prop-label user s/email)
           ") WITH root ORDER BY root." (neo4j/esc-token s/email-sent)
           " DESC SKIP " (:start query-map) " LIMIT " (:limit query-map)
           (vals-collect))
      neo4j/cypher-query-raw mapify-hits))

(defn emails-linked [user query-map]
  (-> (str "MATCH (root:" (neo4j/prop-label user s/email)
           ")-[:" (neo4j/esc-token (:link query-map))
           "]->(p:" (neo4j/prop-label user s/person)
           ") WHERE ID(p)=" (:person-id query-map)
           " WITH root ORDER BY root." (neo4j/esc-token s/email-sent)
           " DESC SKIP " (:start query-map) " LIMIT " (:limit query-map)
           (vals-collect))
      neo4j/cypher-query-raw mapify-hits))

(defn emails-with-dates [user start limit]
  (-> (str "MATCH (root:" (neo4j/prop-label user s/email)
           ")-[:" (neo4j/esc-token s/email-mentions)
           "]->(d:" (neo4j/prop-label user s/event)
           ") WITH root ORDER BY root." (neo4j/esc-token s/email-sent)
           " DESC SKIP " start " LIMIT " limit
           (vals-collect))
      neo4j/cypher-query-raw mapify-hits))

(defn user-data-public [user query-map]
  (-> user (get :data)
      (dissoc s/pwd-hash) (dissoc s/google-token)))

(defn node-from-id [user id node-type]
  (-> (str "MATCH (root:" (neo4j/prop-label user node-type)
           ") WHERE ID(root)= " id
           " WITH root" (vals-collect))
      neo4j/cypher-query-raw mapify-hits))

(defn node-by-id [user query-map]
  (-> user (node-from-id (:id query-map) (:type query-map))
      first (merge {:type (:type query-map)})))

(defn key-link [user query-map]
  (-> (str "MATCH (k:" (neo4j/prop-label user s/link-id)
           ")<-[:" (neo4j/esc-token s/link-id)
           "]-(l)-[:" (neo4j/esc-token s/link-to)
           "]->(root) WHERE k." (neo4j/esc-token s/value)
           " = " (-> query-map :key neo4j/esc-val)
           " WITH root" (vals-collect))
      neo4j/cypher-query-raw mapify-hits first))

(defn email-queue []
  (-> (str "MATCH (root:" s/email-queue
           ") RETURN root LIMIT 1")
      neo4j/cypher-list first))

(defn queue-data [n]
  (->> [[s/loaded-bottom] [s/loaded-top] [s/top-uid] [s/modified]]
       (mlrecon/fetch-paths (:id n)) (map first)
       (zipmap [s/loaded-bottom s/loaded-top s/top-uid s/modified])
       (merge {:id (:id n)})))

(defn next-email-queue []
  (-> (str "MATCH (root)-[:" (neo4j/esc-token s/user-queue)
           "]->(u:" (neo4j/esc-token s/user)
           ") WITH root, u"
           " MATCH (root)-[:" (neo4j/esc-token s/loaded-bottom)
           "]-(b) WITH root, u, b WHERE b." (neo4j/esc-token s/value)
           " > " 270000
           " MATCH (root)-[:" (neo4j/esc-token s/modified)
           "]-(m) WITH root, u, b, m "
           " RETURN root, u ORDER BY m." (neo4j/esc-token s/value)
           " LIMIT 1")
      neo4j/cypher-query first
      (set/rename-keys {"root" :queue "u" :user})
      (update :queue queue-data)))

(defn all-scanned [user]
  (-> ["MATCH (root:" (neo4j/esc-token s/user)
       ")-[:" (neo4j/esc-token s/scanned)
       "]->(s:" (neo4j/esc-token s/time-scanned)
       ") WHERE ID(root)= " (:id user)
       " RETURN s"]
      str/join neo4j/cypher-list))

(defn scan-overlaps [user time]
  (-> ["MATCH (root:" (neo4j/esc-token s/user)
       ")-[:" (neo4j/esc-token s/scanned)
       "]->(s:" (neo4j/esc-token s/time-scanned)
       ") WHERE ID(root)= " (:id user)
       " AND s." (neo4j/esc-token s/start-time)
       " <= " time
       " AND s." (neo4j/esc-token s/stop-time)
       " >= " time " RETURN s"]
      str/join neo4j/cypher-list))

(defn escape-rels [rels]
  (->> (map neo4j/esc-token rels)
       (map #(str ":" %))
       (str/join "|")))

(defn rel-query [user]
  (str "MATCH (root:" (neo4j/prop-label user s/person)
       ")<-[" (escape-rels [s/email-to s/email-from s/email-mentions])
       "]-(em:" (neo4j/prop-label user s/email)
       ")-[:" (neo4j/esc-token s/email-mentions)
       "]->(ev:"))

(defn people-by-reltype [user query-map]
  (-> (str (rel-query user)
           (neo4j/prop-label user (:reltype query-map))
           ") WITH root, count(ev) as cev ORDER BY cev "
           " DESC SKIP " (:start query-map) " LIMIT " (:limit query-map)
           (vals-collect))
      neo4j/cypher-query-raw mapify-hits))

(defn event-related [user query-map]
  (-> (str (rel-query user)
           (neo4j/prop-label user s/event)
           ") WHERE ID(root)=" (:person-id query-map)
           " WITH ev as root SKIP " (:start query-map)
           " LIMIT " (:limit query-map)
           (vals-collect))
      neo4j/cypher-query-raw mapify-hits))

(defn loc-related [user query-map]
  (->> (str (rel-query user)
            (neo4j/prop-label user s/location)
            ")-[:" (neo4j/esc-token s/has-coord)
            "]->(g:" (neo4j/esc-token s/geocode)
            ") WHERE ID(root)=" (:person-id query-map)
            " AND NOT (g." (neo4j/esc-token s/lat)
            " IS NULL) RETURN ev, g SKIP " (:start query-map)
            " LIMIT " (:limit query-map))
       neo4j/cypher-query
       (map #(update % "ev" node-attrs))
       (map #(update % "g" node-attrs))
       (map #(update-in % ["g"] dissoc :id))
       (map vals) (map #(apply merge %))
       distinct))

(defn bare-locations [limit]
  (-> ["MATCH (root:" (neo4j/esc-token s/location)
       ") WHERE NOT (root)-[:" (neo4j/esc-token s/has-coord)
       "]->() RETURN root LIMIT " limit]
      str/join neo4j/cypher-list))

(defn recon-count-expand [labels]
  (->> labels first
       (map #(hash-map % (second labels)))))

(defn norecon-count []
  (->> (str "MATCH (root:" (neo4j/esc-token s/norecon)
            ") RETURN labels(root), count(*)")
       neo4j/cypher-query-raw (map vals)
       (map recon-count-expand)
       flatten (apply merge-with +)
       (map vec) (map reverse)
       (sort-by first >)
       (remove #(= (second %) (name s/norecon)))
       (map #(vector (first %) (neo4j/decode-label (second %))))))

(defn partial-val-query [user query prop]
  (str "MATCH (v:" (neo4j/prop-label user prop)
       ")<--(r) WHERE v.val STARTS WITH " (neo4j/esc-val query)
       " RETURN ID(r)"))

(defn id-row [row]
  [(first row)
   (flatten (map (comp second first vals) (second row)))])

(defn search-query [id]
  (str "MATCH (root) WHERE ID(root)=" id
       " WITH root" (vals-collect)))

(defn search-row [row]
  [(first row)
   (->> row second
        (map (comp first mapify-hits
                   neo4j/cypher-query-raw
                   search-query))
        vec)])

(defn include-pred [row]
  (map #(merge % {:pred (first row)})
       (second row)))

(defn full-search [user query-map]
  (let [query (:query query-map)]
    (->> s/search-preds
         (map #(partial-val-query user query %))
         neo4j/cypher-combined-tx
         (interleave s/search-preds)
         (partition 2) (map vec) vec
         (remove #(-> % second empty?))
         (map (comp include-pred search-row id-row))
         flatten)))

(defn find-user-labels [labels]
  (->> labels filter-decode-labels
       first neo4j/find-by-id))

(defn email-for-nlp []
  (-> (str "MATCH (root:" (neo4j/esc-token s/nonlp)
           ")-[:" (neo4j/esc-token s/email-body)
           "]->(b) RETURN ID(root), labels(root) LIMIT 1")
      neo4j/cypher-query-raw first
      (update "labels(root)" find-user-labels)
      (set/rename-keys {"ID(root)" :id "labels(root)" s/user})))
