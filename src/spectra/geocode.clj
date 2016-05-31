(ns spectra.geocode
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [spectra.common :refer :all]
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

(defn insert-query [geocode]
  [(str "MATCH (root:" (neo4j/esc-token s/location)
        ") WHERE ID(root) = {id}"
        " CREATE (root)-[:" (neo4j/esc-token s/has-coord)
        "]->(g:" (neo4j/esc-token s/geocode)
        " {geocode}) RETURN g")
   {:geocode (get s/geocode geocode)
    :id (.id geocode)}])

(defn geocode-batch [limit]
  (->> (queries/bare-locations limit)
       (map queries/node-attrs)
       (map #(update % s/s-name first))
       (map #(update % s/s-name geocode-str))
       (map #(set/rename-keys % {s/s-name s/geocode}))
       (map insert-query)
       neo4j/cypher-combined-tx))


       
