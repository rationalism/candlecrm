(ns spectra.geocode
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [spectra.neo4j :as neo4j]
            [spectra.queries :as queries]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.google.maps GeoApiContext GeocodingApi]))

(defn make-context []
  (-> (GeoApiContext. )
      (.setApiKey (env :geocode-api-key))))

(defn define-context! []
  (def ^:dynamic *context* (make-context)))

(defn map-latlng [latlng]
  {s/lat (.lat latlng)
   s/lng (.lng latlng)})

(defn fetch-geocode [s]
  (-> *context*
      (GeocodingApi/geocode s)
      (.await) first))
  
(defn geocode-str [s]
  (when-let [geocode (fetch-geocode s)]
    (-> geocode (.geometry)
        (.location) map-latlng)))

(defn geocode-cached [limit]
  (-> (str "MATCH (aloc:" s/location
           "),(bloc:" s/location
           ")-[:" (neo4j/cypher-esc-token s/has-coord)
           "]->(g:" s/geocode
           ") WHERE aloc." (neo4j/cypher-esc-token s/s-name)
           " = bloc." (neo4j/cypher-esc-token s/s-name)
           " AND NOT (aloc)-[:" (neo4j/cypher-esc-token s/has-coord)
           "]->() CREATE (aloc)-[:" (neo4j/cypher-esc-token s/has-coord)
           "]->(g) RETURN aloc LIMIT " limit)
      neo4j/cypher-list))

(defn insert-query [geocode]
  (str "MATCH (root:" s/location
       ") WHERE ID(root) = " (:id geocode)
       " CREATE (root)-[:" (neo4j/cypher-esc-token s/has-coord)
       "]->(g:" s/geocode
       " " (-> geocode (get s/geocode) neo4j/cypher-properties)
       ") RETURN g"))

(defn geocode-batch [limit]
  (->> (queries/bare-locations limit)
       (map queries/node-attrs)
       (map #(update % s/s-name first))
       (map #(update % s/s-name geocode-str))
       (map #(set/rename-keys % {s/s-name s/geocode}))
       (map insert-query)
       neo4j/cypher-combined-tx))


       
