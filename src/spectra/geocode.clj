(ns spectra.geocode
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra.mlrecon :as mlrecon]
            [spectra.neo4j :as neo4j]
            [spectra.queries :as queries]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]])
  (:import [com.google.maps GeoApiContext GeocodingApi]))

(defn make-context []
  (.setApiKey (GeoApiContext. ) (env :geocode-api-key)))

(defonce context (atom nil))

(defn define-context! []
  (reset! context (make-context)))

(defn map-latlng [latlng]
  {(name s/lat) (.lat latlng)
   (name s/lng) (.lng latlng)})

(defn fetch-geocode [s]
  (-> @context
      (GeocodingApi/geocode s)
      (.await) first))
  
(defn geocode-str [s]
  (when-let [geocode (fetch-geocode s)]
    (-> geocode (.geometry)
        (.location) map-latlng)))

(defn insert-query [[id geocode]]
  [[(str "MATCH (root) WHERE ID(root) = {id}"
         " CREATE (root)-[:" (neo4j/esc-token s/has-coord)
         "]->(g:" (neo4j/esc-token s/geocode)
         " {geocode}) RETURN g")
    {:geocode geocode :id id}]
   [(str "MATCH (root) WHERE ID(root) = {id}"
         " REMOVE root:" (neo4j/esc-token s/nogeocode))
    {:id id}]])

(defn geocode-batch [limit]
  "jose dog")

(defn geocode-batch-real [limit]
  (->> (queries/bare-locations limit)
       (map #(.id %)) (mlrecon/fetch-all-paths [[s/s-name]])
       (fmapl (comp geocode-str ffirst))
       (mapcat insert-query) neo4j/cypher-combined-tx))



