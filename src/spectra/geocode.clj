(ns spectra.geocode
  (:require [clojure.set :as set]
            [clojure.string :as str]
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
  {s/lat (.lat latlng)
   s/lng (.lng latlng)})

(defn fetch-geocode [s]
  (-> @context
      (GeocodingApi/geocode s)
      (.await) first))
  
(defn geocode-str [s]
  (when-let [geocode (fetch-geocode s)]
    (-> geocode (.geometry)
        (.location) map-latlng)))

(defn geocode-cached [limit]
  (-> ["MATCH (aloc:" (neo4j/esc-token s/location)
       ") WITH aloc MATCH (bloc:" (neo4j/esc-token s/location)
       ")-[:" (neo4j/esc-token s/has-coord)
       "]->(g:" (neo4j/esc-token s/geocode)
       ") WHERE aloc." (neo4j/esc-token s/s-name)
       " = bloc." (neo4j/esc-token s/s-name)
       " AND NOT (aloc)-[:" (neo4j/esc-token s/has-coord)
       "]->() CREATE (aloc)-[:" (neo4j/esc-token s/has-coord)
       "]->(g) RETURN aloc LIMIT " limit]
      str/join neo4j/cypher-list))

(defn insert-query [geocode]
  (str/join
   ["MATCH (root:" (neo4j/esc-token s/location)
    ") WHERE ID(root) = " (:id geocode)
    " CREATE (root)-[:" (neo4j/esc-token s/has-coord)
    "]->(g:" (neo4j/esc-token s/geocode)
    " " (-> geocode (get s/geocode) neo4j/cypher-properties)
    ") RETURN g"]))

(defn geocode-batch [limit]
  (->> (queries/bare-locations limit)
       (map queries/node-attrs)
       (map #(update % s/s-name first))
       (map #(update % s/s-name geocode-str))
       (map #(set/rename-keys % {s/s-name s/geocode}))
       (map insert-query)
       neo4j/cypher-combined-tx))


       
