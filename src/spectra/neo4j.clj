(ns spectra.neo4j
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [environ.core :refer [env]]
            [clojurewerkz.neocons.rest :as nr]
            [clojurewerkz.neocons.rest.cypher :as cy]
            [clojurewerkz.neocons.rest.labels :as nl]
            [clojurewerkz.neocons.rest.nodes :as nn]
            [clojurewerkz.neocons.rest.records :as rec]
            [clojurewerkz.neocons.rest.relationships :as nrl]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn make-graph-url []
  (str "http://" (env :database-username)
       ":" (env :database-password)
       "@" (env :database-url)))

(defn get-graph []
  (nr/connect (make-graph-url)))

(defn define-graph! []
  (def ^:dynamic *graph* (get-graph)))

(defn cypher-esc [value]
  (if (nil? value) nil
      (-> value
          dt/catch-dates
          (str/replace #"[\\'\"]" #(str "\\" %1)))))

(defn cypher-esc-coll [coll]
  (->> coll
       (map cypher-esc)
       (map str)
       (str/join "', '")))

(defn cypher-esc-token [token]
  (str "`" (name token) "`"))

(defn cypher-pair-to-node [pair]
  [(key pair)
   (rec/instantiate-node-from (val pair))])

(defn cypher-pair-labeled [pair]
  [(rec/instantiate-node-from (val pair))
   (-> pair val :metadata :labels)])

(defn cypher-map-to-node [cymap]
  (->> cymap
       (map cypher-pair-to-node)
       (into {})))

(defn cypher-map-node-labeled [cymap]
  (->> cymap
       (map cypher-pair-labeled)
       (into {})))

(defn cypher-query [query]
  (->> (cy/tquery *graph* query)
       (map cypher-map-to-node)))

(defn cypher-query-labeled [query]
  (->> (cy/tquery *graph* query)
       (map cypher-map-node-labeled)))

(defn cypher-prop-any [prop]
  (str " ANY (x in root." (cypher-esc-token (key prop))
       " where x in ['" (cypher-esc-coll (val prop)) "']) "))

(defn cypher-props-any [props]
  (->> props (map cypher-prop-any) (str/join "OR")))

(defn cypher-prop-coll [prop]
  (str " ANY (x in root." (cypher-esc-token (key prop))
       " where x = '" (cypher-esc (val prop)) "') "))

(defn cypher-props-coll [props]
  (->> props (map cypher-prop-coll) (str/join "AND")))

(defn cypher-property [prop]
  (str (cypher-esc-token (key prop))
       ": '" (cypher-esc (val prop)) "'"))

(defn cypher-properties [props]
  (str "{ "
       (->> props (map cypher-property) (str/join ", "))
       " }"))

(defn cypher-list [query]
  (->> (cypher-query query)
       (map first)
       (map val)))

(defn cypher-labeled-list [query]
  (->> (cypher-query-labeled query)
       (apply merge)))

(defn get-property [vertex property]
  (let [value (property (:data vertex))]
    (if (coll? value) (into #{} value) value)))

(defn set-property! [vertex property value]
  (nn/set-property *graph* vertex property
                   (dt/catch-dates value)))

(defn create-links! [nodes links]
  (let [id-list (->> nodes count range
                     (map #(str "a" %)))]
    (cypher-query
     (str "MATCH (" (str/join "), (" id-list)
          ") WHERE "
          (->> (map #(str "ID(" % ")= ") id-list)
               (zipmap nodes)
               (map #(str (val %) (key %)))
               (str/join " AND "))
          " CREATE root = (a0)"
          (->> (map cypher-esc-token links)
               (zipmap (drop 1 id-list))
               (map #(str "-[:" (val %)
                         "]->(" (key %)))
               (str/join "->"))
          " RETURN root"))))

(defn find-by-id [id]
  (first
   (cypher-list
    (str "MATCH (a) where ID(a)= " id
         " RETURN a"))))

(defn refresh-vertex [vertex]
  (find-by-id (:id vertex)))

(defn recon-property-list! [vertex property value]
  (let [old-props (get-property vertex property)]
    (if (some #{value} old-props)
      nil (set-property! vertex property (conj old-props value)))))

(defn merge-property-list! [vertex property values]
  (->> property
       (get-property vertex)
       (concat values)
       distinct
       (set-property! vertex property)))

;; TODO: fix this, it's obsolete
(defn delete-property! [vertex property]
  (.removeProperty vertex property))

(defn filter-props [props]
  (->> props
       (filter #(com/not-nil-ext? (val %)))
       (into {})
       (map dt/catch-dates-map)
       (into {})))

(defn create-vertex! [labels properties]
  (p :create-vertex
     (let [vertex (nn/create *graph* (filter-props properties))]
       (nl/add *graph* vertex labels)
       vertex)))

(defn batch-insert! [items]
  (p :batch-insert
     (let [nodes (nn/create-batch
                  *graph* (map #(filter-props (:props %)) items))]
       (map #(nl/add *graph* %1 (:labels %2)) nodes items)
       nodes)))

(defn replace-labels! [vertex labels]
  (p :replace-labels
     (nl/replace *graph* vertex labels)))

(defn delete-vertex! [vertex]
  (nn/destroy *graph* vertex))

(defn get-vertices [class props]
  (cypher-list
   (str "MATCH (root:" (cypher-esc class)
        " " (cypher-properties props)
        " ) RETURN root")))

(defn get-vertices-coll [class props]
  (cypher-list (str "MATCH (root:" (cypher-esc class)
                    ") WHERE " (cypher-props-coll props)
                    " RETURN root")))

(defn get-vertex [class props]
  (first (get-vertices class props)))

(defn get-vertices-class [class]
  (cypher-list (str "MATCH (root:" (cypher-esc class)
                    ") RETURN root")))

(defn delete-class! [class]
  (cypher-query (str "MATCH (root:" (cypher-esc class)
                     ")-[v]-() DELETE root, v"))
  (cypher-query (str "MATCH (root:" (cypher-esc class)
                     ") DELETE root")))

(defn delete-id! [id]
  (-> id find-by-id delete-vertex!))

(defn create-edge! [out in class]
  (p :create-edge
     (nrl/create *graph* out in class)))

(defn delete-edge! [edge]
  (nrl/delete *graph* edge))
