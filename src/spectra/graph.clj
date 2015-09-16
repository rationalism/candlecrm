(ns spectra.graph
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
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

(defn cypher-esc [string]
  (if (nil? string) nil
      (str/replace string #"[\\'\"]" #(str "\\" %1))))

(defn cypher-pair-to-node [pair]
  [(key pair)
   (rec/instantiate-node-from (val pair))])

(defn cypher-map-to-node [cymap]
  (->> cymap
       (map cypher-pair-to-node)
       (into {})))

(defn cypher-query [query]
  (->> (cy/tquery *graph* query)
       (map cypher-map-to-node)))

(defn get-property [vertex property]
  (property (:data vertex)))

(defn set-property! [vertex property value]
  (nn/set-property *graph* vertex property value))

(defn delete-property! [vertex property]
  (.removeProperty vertex property))

(defn no-value? [property]
  (if (string? property)
    (empty? property)
    (nil? property)))

(defn not-nil-ext? [item]
  (if (coll? item)
    (not-any? nil? item)
    (not (nil? item))))

(defn create-vertex! [labels properties]
  (p :create-vertex
     (let [vertex (->> properties
                       (filter #(not-nil-ext? (val %)))
                       (into {})
                       (nn/create *graph*))]
       (nl/add *graph* vertex labels)
       vertex)))

(defn delete-vertex! [vertex]
  (nn/destroy *graph* vertex))

(defn cypher-prop-coll [prop]
  (str " ANY (x in root.`" (cypher-esc (name (key prop)))
       "` where x = '" (cypher-esc (val prop)) "') "))

(defn cypher-props-coll [props]
  (->> props (map cypher-prop-coll) (str/join "AND")))

(defn cypher-property [prop]
  (str "`" (cypher-esc (name (key prop))) "`"
       ": '" (cypher-esc (val prop)) "'"))

(defn cypher-properties [props]
  (str "{ "
       (->> props (map cypher-property) (str/join ", "))
       " }"))

(defn cypher-list [query]
  (->> (cypher-query query)
       (map first)
       (map val)))

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

(defn create-edge! [out in class]
  (p :create-edge
     (nrl/create *graph* out in class)))

(defn delete-edge! [edge]
  (nrl/delete *graph* edge))
