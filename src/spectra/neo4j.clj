(ns spectra.neo4j
  (:require [clojure.string :as str]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [clojurewerkz.neocons.rest :as nr]
            [clojurewerkz.neocons.rest.constraints :as co]
            [clojurewerkz.neocons.rest.cypher :as cy]
            [clojurewerkz.neocons.rest.labels :as nl]
            [clojurewerkz.neocons.rest.nodes :as nn]
            [clojurewerkz.neocons.rest.records :as rec]
            [clojurewerkz.neocons.rest.relationships :as nrl]
            [clojurewerkz.neocons.rest.transaction :as tx]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn user-label [user]
  (str "user_" (:id user)))

(defn prop-label [user prop]
  (str "`" (name prop) "_"
       (user-label user) "`"))

(defn deadlock-throw? [e]
  (.contains (.getMessage e)
             ":stackTrace \"org.neo4j.kernel.DeadlockDetectedException"))

(defn make-graph-url []
  (str "http://" (env :database-username)
       ":" (env :database-password)
       "@" (env :database-url)))

(defn get-graph []
  (nr/connect (make-graph-url)))

(defonce conn (atom nil))

(defn define-graph! []
  (reset! conn (get-graph)))

(defn esc-token [token]
  (str "`" (name token) "`"))

(defn cypher-pair->node [pair]
  [(key pair)
   (rec/instantiate-node-from (val pair))])

(defn cypher-map->node [cymap]
  (->> cymap
       (map cypher-pair->node)
       (into {})))

(defn cypher-query-raw [query]
  (try
    (if (coll? query)
      (apply cy/tquery (concat [@conn] query))
      (cy/tquery @conn query))
    (catch Exception e
      (do (println "ERROR: Cypher query invalid")
          (println "Query:" query)
          (println "Error message:" e)
          {}))))

(defn cypher-query [query]
  (map cypher-map->node
       (cypher-query-raw query)))

(defn cypher-property [prop]
  (str (esc-token (key prop)) ": {"
       (esc-token (key prop)) "}"))

(defn cypher-properties [props]
  (str "{ "
       (->> props
            (filter com/val-not-nil?)
            (map cypher-property)
            (str/join ", "))
       " }"))

(defn cypher-list [query]
  (->> (cypher-query query)
       (map first) (map val)))

(defn cypher-statement [cypher]
  (if (coll? cypher)
    (apply tx/statement cypher)
    (tx/statement cypher)))

(declare cypher-combined-tx)

(defn cypher-tx-exception [retry queries e]
  (cond (not (deadlock-throw? e))
        (do (println "Cypher query exception")
            (println (.getMessage e))
            (println "First query: " (first queries))
            (println "Stack trace: " e)
            {})
        (not retry)
        (println "Deadlock detected, not retrying")
        :else
        (do (println "Deadlock detected, retrying")
            (cypher-combined-tx true queries))))

(defnp cypher-combined-tx-recur [retry queries]
  (try
    (->> (map cypher-statement queries)
         (apply tx/in-transaction @conn)
         (map cy/tableize))
    (catch Exception e
      (cypher-tx-exception retry queries e))))

(defn dump-queries [queries]
  (spit "/home/alyssa/cypherlog.txt" "BEGIN TRANSACTION\n\n" :append true)
  (dorun (map #(spit "/home/alyssa/cypherlog.txt" (str % "\n\n") :append true) queries)))

(defn cypher-combined-tx
  ([queries]
   (cypher-combined-tx true queries))
  ([retry queries]
   (trampoline cypher-combined-tx-recur retry queries)))

(defnp find-by-id [id]
  (->> [(str "MATCH (a) WHERE ID(a) = {id}"
             " RETURN a")
        {:id id}]
       cypher-list first))

(defn decode-label-parts [parts]
  [(-> parts first keyword)
   (-> parts second (Integer/parseInt))])

(defn decode-label [label]
  (-> label (str/replace #"user" "")
      (str/split #"__")
      decode-label-parts reverse))

(defn get-property [vertex property]
  (->> [(str "MATCH (root) WHERE ID(root) = {id}"
             " RETURN root." (esc-token property))
        {:id (:id vertex)}]
       cypher-query-raw
       first vals first))

(defn set-property! [vertex property value]
  (nn/set-property @conn vertex property
                   (dt/catch-dates value)))

(defn format-link [l]
  (vector (get l "ID(STARTNODE(b))")
          (if (= (get l "ID(STARTNODE(b))")
                 (get l "ID(a)"))
            (get l "ID(c)")
            (get l "ID(a)"))
          (keyword (get l "TYPE(b)"))))

(defn all-links [id]
  (->> [(str "MATCH (a)-[b]-(c) WHERE ID(a) = {id}" 
             " RETURN ID(STARTNODE(b)), TYPE(b), ID(a), ID(c)")
        {:id id}]
       cypher-query-raw (map format-link)))

(defn delete-property! [vertex property]
  (-> [(str "MATCH (a) WHERE ID(a) = {id}"
            " REMOVE a." (esc-token property))
       {:id (:id vertex)}]
      cypher-query-raw))

(defn filter-props [props]
  (->> props
       (filter #(com/not-nil-ext? (val %)))
       (into {})
       (map dt/catch-dates-map)
       (into {})))

(defnp create-vertex! [labels properties]
  (let [vertex (nn/create @conn (filter-props properties))]
    (nl/add @conn vertex labels)
    vertex))

(defnp batch-insert! [items]
  (let [nodes (nn/create-batch
               @conn (map #(filter-props (:props %)) items))]
    (dorun (pmap #(nl/add @conn %1 (:labels %2)) nodes items))
    nodes))

(defn delete-id! [id]
  (cypher-query-raw
   [(str "MATCH (root)-->(v) WHERE ID(root) = {id}"
         " AND v." (esc-token s/value)
         " IS NOT NULL WITH v MATCH (v)<--(x)"
         " WITH v, count(x) as n WHERE n = {nval} DETACH DELETE v")
    {:id id :nval 1}])
  (cypher-query-raw
   ["MATCH (root) WHERE ID(root) = {id} DETACH DELETE root"
    {:id id}]))

(defn delete-vertex! [vertex]
  (-> vertex :id delete-id!))

(defn node-exists? [user id type]
  (->> [(str "MATCH (root:" (prop-label user type)
             ") WHERE ID(root) = {id} RETURN ID(root)")
        {:id id}]
       cypher-query-raw first empty? not))

(defn val-query [prop]
  (str "MATCH (root)-[:" (-> prop key esc-token)
       "]-(v) WHERE v.val = {" (-> prop key esc-token) "}"))

(defn add-return [props s]
  [(str s " RETURN root") props])

(defn get-vertices [user class props]
  (->> props (filter com/val-not-nil?) (map val-query)
       (concat [(str "MATCH (root:" (prop-label user class) ")")])
       (str/join " WITH root ")
       (add-return props) cypher-list))

(defn get-vertex [class props]
  (->> [(str "MATCH (root:" (esc-token class)
             " " (cypher-properties props)
             ") RETURN root")
        props]
       cypher-list first))

(defn get-vertices-class [class]
  (cypher-list (str "MATCH (root:" class
                    ") RETURN root")))

(defn delete-class! [class]
  (cypher-query (str "MATCH (root:" class
                     ")-[v]-() DELETE root, v"))
  (cypher-query (str "MATCH (root:" class
                     ") DELETE root")))

(defnp create-edge! [out in class]
  (nrl/create @conn out in class))

(defn update-vals! [id pred old-val new-val]
  (cypher-query-raw
   [(str "MATCH (root)-[:" (esc-token pred)
         "]->(n) WHERE ID(root) = {id}"
         " AND n.val = {oldval} SET n.val = {newval}")
    {:id id :oldval old-val :newval new-val}]))

(defn add-label! [id label]
  (cypher-query-raw
   [(str "MATCH (root) WHERE ID(root) = {id}"
         " SET root:" (esc-token label))
    {:id id}]))

(defn remove-label! [id label]
  (cypher-query-raw
   [(str "MATCH (root) WHERE ID(root) = "
         " REMOVE root:" (esc-token label))
    {:id id}]))

(defn all-constraints []
  (co/get-all @conn))

(defn drop-constraint! [vals]
  (if (= (:type vals) "UNIQUENESS")
    (co/drop-unique
     @conn (:label vals) (first (:property_keys vals)))
    (cypher-query-raw
     (str "DROP CONSTRAINT ON (root:" (esc-token (:label vals))
          ") ASSERT exists(root." (first (:property_keys vals)) ")"))))

(defn drop-all-constraints! []
  (map drop-constraint! (all-constraints)))
