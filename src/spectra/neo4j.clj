(ns spectra.neo4j
  (:require [clojure.string :as str]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [clojurewerkz.neocons.rest :as nr]
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

(defn make-graph-url []
  (str "http://" (env :database-username)
       ":" (env :database-password)
       "@" (env :database-url)))

(defn get-graph []
  (nr/connect (make-graph-url)))

(defonce conn (atom nil))

(defn define-graph! []
  (reset! conn (get-graph)))

(defn cypher-esc [value]
  (when-not (nil? value)
    (-> value dt/catch-dates
        (str/replace #"[\\'\"]" #(str "\\" %1)))))

(defn cypher-esc-coll [coll]
  (->> coll
       (map cypher-esc)
       (map str)
       (str/join "', '")))

(defn esc-token [token]
  (str "`" (name token) "`"))

(defn cypher-pair->node [pair]
  [(key pair)
   (rec/instantiate-node-from (val pair))])

(defn cypher-pair-labeled [pair]
  [(rec/instantiate-node-from (val pair))
   (-> pair val :metadata :labels)])

(defn cypher-map->node [cymap]
  (->> cymap
       (map cypher-pair->node)
       (into {})))

(defn cypher-map-node-labeled [cymap]
  (->> cymap
       (map cypher-pair-labeled)
       (into {})))

(defn cypher-query [query]
  (try
    (map cypher-map->node (cy/tquery @conn query))
    (catch Exception e
      (do (println "Cypher query error")
          (print e) {}))))

(defn cypher-query-labeled [query]
  (map cypher-map-node-labeled (cy/tquery @conn query)))

(defn cypher-prop-any [prop]
  (str " ANY (x in root." (esc-token (key prop))
       " where x in ['" (cypher-esc-coll (val prop)) "']) "))

(defn cypher-props-any [props]
  (->> props (map cypher-prop-any) (str/join "OR")))

(defn esc-val [v]
  (str (if (string? v) "'" "")
       (cypher-esc v)
       (if (string? v) "'" "")))

(defn cypher-property [prop]
  (str (esc-token (key prop)) ": "
       (esc-val (val prop))))

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

(defn cypher-labeled-list [query]
  (apply merge (cypher-query-labeled query)))

(defn cypher-combined-tx [queries]
  (try
    (->> (map tx/statement queries)
         (apply tx/in-transaction @conn)
         (map cy/tableize))
    (catch Exception e
      (do (println "Cypher query error")
          (print e) {}))))
  
(defn get-property [vertex property]
  (let [value (property (:data vertex))]
    (if (coll? value) (set value) value)))

(defn set-property! [vertex property value]
  (nn/set-property @conn vertex property
                   (dt/catch-dates value)))

(defn all-links [id]
   (->> ["MATCH (a)-[b]-(c) WHERE ID(a)=" id
         " RETURN ID(STARTNODE(b)), TYPE(b), ID(a), ID(c)"]
        (apply str) (cy/tquery @conn)))

(defn make-links-query [nodes links]
  (let [id-list (->> nodes count range
                     (map #(str "a" %)))]
    (str "MATCH (" (str/join "), (" id-list)
         ") WHERE "
         (->> (map #(str "ID(" % ")= ") id-list)
              (zipmap nodes)
              (map #(str (val %) (key %)))
              (str/join " AND "))
         " CREATE root = (a0"
         (->> (map #(nth % 2) links)
              (map esc-token)
              (zipmap (drop 1 id-list))
              (map #(str ")-[:" (val %)
                         "]->(" (key %)))
              str/join)
         ") RETURN root")))

(defn link-query [link]
  (str "ID(a)= " (first link)
       " AND ID(b)= " (second link)
       " AND type(r)= '" (name (nth link 2))
       "'"))

(defn keyword-link [link]
  (assoc link 2 (keyword (nth link 2))))

(defn link-result [result]
  (-> result (get "ID(a)") second keyword-link))

(defn is-link-valid? [link]
  (and (-> link first type (= java.lang.Long))
       (-> link second type (= java.lang.Long))
       (-> link (nth 2) type (= clojure.lang.Keyword))))

(defn find-link-query [link]
  {:pre [(is-link-valid? link)]}
  (str "MATCH (a)-[r]->(b) WHERE ("
       (link-query link)
       ") RETURN ID(a), ID(b), type(r)"))

(defn find-links [links]
  (p :find-links
     (->> (map find-link-query links)
          cypher-combined-tx
          (map first)
          (remove nil?)
          (map link-result))))
  
(defn find-by-id [id]
  (first
   (cypher-list
    (str "MATCH (a) where ID(a)= " id
         " RETURN a"))))

(defn node-from-id [user id node-type]
  (-> (str "MATCH (root:" (prop-label user node-type)
           ") WHERE ID(root)= " id
           " RETURN root")
      cypher-list first))

(defn refresh-vertex [vertex]
  (find-by-id (:id vertex)))

(defn merge-property-list! [vertex property values]
  (when (com/not-nil-ext? values)
    (if (coll? values)
      (->> (get-property vertex property)
           (concat values) distinct
           (set-property! vertex property))
      (set-property! vertex property values))))

(defn delete-property! [vertex property]
  (-> (str "MATCH (a) where ID(a)= " (:id vertex)
           " REMOVE a." (esc-token property)
           " RETURN a")
      cypher-query))

(defn filter-props [props]
  (->> props
       (filter #(com/not-nil-ext? (val %)))
       (into {})
       (map dt/catch-dates-map)
       (into {})))

(defn create-vertex! [labels properties]
  (p :create-vertex
     (let [vertex (nn/create @conn (filter-props properties))]
       (nl/add @conn vertex labels)
       vertex)))

(defn batch-insert! [items]
  (p :batch-insert
     (let [nodes (nn/create-batch
                  @conn (map #(filter-props (:props %)) items))]
       (dorun (pmap #(nl/add @conn %1 (:labels %2)) nodes items))
       nodes)))

(defn replace-labels! [vertex labels]
  (p :replace-labels
     (nl/replace @conn vertex labels)))

(defn delete-id! [id]
  (cypher-query
   (str "MATCH (root)-->(v) WHERE ID(root) = " id
        " AND v." (esc-token s/value)
        " IS NOT NULL WITH v MATCH (v)<--(x)"
        " WITH v, count(x) as n WHERE n = 1 DETACH DELETE v"))
  (cypher-query
   (str "MATCH (root) WHERE ID(root) = " id
        " DETACH DELETE root")))

(defn delete-vertex! [vertex]
  (-> vertex :id delete-id!))

(defn val-query [prop]
  (str "MATCH (root)-[:" (-> prop key esc-token)
       "]-(v) WHERE v.val = " (-> prop val esc-val) ""))

(defn add-return [s]
  (str s " RETURN root"))

(defn get-vertices [user class props]
  (->> props (filter com/val-not-nil?) (map val-query)
       (concat [(str "MATCH (root:" (prop-label user class) ")")])
       (str/join " WITH root ")
       add-return cypher-list))

(defn get-vertex [class props]
  (->> ["MATCH (root:" (esc-token class)
        " " (cypher-properties props)
        ") RETURN root"]
       (apply str) cypher-list first))

(defn get-vertices-class [class]
  (cypher-list (str "MATCH (root:" class
                    ") RETURN root")))

(defn delete-class! [class]
  (cypher-query (str "MATCH (root:" class
                     ")-[v]-() DELETE root, v"))
  (cypher-query (str "MATCH (root:" class
                     ") DELETE root")))

(defn create-edge! [out in class]
  (p :create-edge
     (nrl/create @conn out in class)))

(defn delete-edge! [edge]
  (nrl/delete @conn edge))
