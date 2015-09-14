(ns spectra.graph
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [clojurewerkz.neocons.rest :as nr]
            [clojurewerkz.neocons.rest.labels :as nl]
            [clojurewerkz.neocons.rest.nodes :as nn]
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

(defn get-property [vertex property]
  (.getProperty vertex property))

(defn set-property! [vertex property value]
  (p :set-property
     (.setProperty vertex property value)))

(defn delete-property! [vertex property]
  (.removeProperty vertex property))

(defn add-vertex! [vertex-type]
  (.addVertex *graph* (str "class:" vertex-type)))

(defn no-value? [property]
  (if (string? property)
    (empty? property)
    (nil? property)))

(defn create-vertex! [labels properties]
  (p :create-vertex
     (let [vertex (nn/create *graph* properties)]
       (nl/add *graph* vertex labels)
       vertex)))

(defn delete-vertex! [vertex]
  (.removeVertex *graph* vertex))

(defn get-vertices [class index value]
  (into []
   (if (coll? index)
     (do (prn "collection") (.getVertices *graph* class index value))
     (do (prn "collection") (.getVertices *graph* (str class "." index) value)))))

(defn get-vertex [*graph* class index value]
  (first (get-vertices *graph* class index value)))

(defn get-vertices-class [class]
  (.getVerticesOfClass *graph* class))

(defn create-edge! [out in class]
  (p :create-edge
     (nrl/create *graph* out in class)))

(defn delete-edge! [edge]
  (.removeEdge *graph* edge))
