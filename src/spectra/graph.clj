(ns spectra.graph
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.tinkerpop.blueprints.impls.orient OrientGraphFactory]
           [com.orientechnologies.orient.core.sql OCommandSQL]))

(defn get-factory []
  (OrientGraphFactory.
   (env :database-url)
   (env :database-username)
   (env :database-password)))

(defn get-graph []
  (let [factory (get-factory)]
    (.getTx factory)))

(defn get-graph-notx []
  (let [factory (get-factory)]
    (.getNoTx factory)))

(defn define-graph! []
  (def ^:dynamic *graph* (get-graph)))

(defn shutdown-graph! []
  (.shutdown *graph*))

(defn sql-command! [target-graph command]
  (try (.execute
        (.command target-graph
                  (OCommandSQL. command))
        nil)
       (catch Exception e
         (do (prn "Exception caught when executing SQL command")
             (prn (str "Command was: " command))
             (prn ("Type of exception is: "))
             (prn (.getMessage e))))))

(defmacro wrap-commit
  "Takes an expression and wraps it in a try / catch
  which commits on success and rolls back on failure."
  [target-graph fn]
  `(try (let [return-val# ~fn]
          (p :commit (.commit ~target-graph))
          return-val#)
        (catch Exception e#
          (do (prn "Exception caught when writing to graph")
              (prn "Rolling back changes")
              (prn "Type of exception is: ")
              (prn (.getMessage e#))
              (.rollback ~target-graph)))))

(defn get-property [vertex property]
  (.getProperty vertex property))

(defn set-property! [target-graph vertex property value]
  (p :set-property
     (wrap-commit target-graph
                  (.setProperty vertex property value))))

(defn delete-property! [target-graph vertex property]
  (wrap-commit target-graph
               (.removeProperty vertex property)))

(defn add-vertex! [target-graph vertex-type]
  (wrap-commit target-graph
               (.addVertex target-graph (str "class:" vertex-type))))

(defn no-value? [property]
  (if (string? property)
    (empty? property)
    (nil? property)))

(defn create-vertex! [target-graph vertex-type properties]
  (p :create-vertex
     (let [vertex (add-vertex! target-graph vertex-type)]
       (doseq [field properties]
         (if-not (no-value? (:value field))
           (set-property! target-graph vertex
                          (:property field)
                          (:value field))))
       vertex)))

(defn delete-vertex! [target-graph vertex]
  (wrap-commit target-graph
               (.removeVertex target-graph vertex)))

(defn get-vertices [target-graph class index value]
  (if (coll? index)
    (.getVertices target-graph class index value)
    (.getVertices target-graph (str class "." index) value)))

(defn get-vertex [target-graph class index value]
  (first (get-vertices target-graph class index value)))

(defn get-vertices-class [target-graph class]
  (.getVerticesOfClass target-graph class))

(defn create-edge! [target-graph out-vertex in-vertex class]
  (p :create-edge
     (wrap-commit target-graph
                  (.addEdge target-graph nil out-vertex
                            in-vertex class))))

(defn delete-edge! [target-graph edge]
  (wrap-commit target-graph
               (.removeEdge target-graph edge)))
