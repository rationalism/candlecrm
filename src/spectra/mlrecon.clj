(ns spectra.mlrecon
  (:require [clojure.string :as str]
            [spectra.common :as com]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn rels-by-id [id]
  (neo4j/cypher-query
   (str "MATCH (root)-[r]-() WHERE ID(root) = " id
        " RETURN r")))
