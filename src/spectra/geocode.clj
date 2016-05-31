(ns spectra.geocode
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [spectra.common :refer :all]
            [spectra.insert :as insert]
            [spectra.loom :as loom]
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
  {s/lat (.lat latlng)
   s/lng (.lng latlng)
   s/type-label s/geocode})

(defn fetch-geocode [s]
  (-> @context
      (GeocodingApi/geocode s)
      (.await) first))

(defn geocode-str [s]
  (when-let [geocode (fetch-geocode s)]
    (-> geocode (.geometry)
        (.location) map-latlng)))

(defn remove-geo-label [id]
  [(str "MATCH (root) WHERE ID(root) = {id}"
        " REMOVE root:" (neo4j/esc-token s/nogeocode))
   {:id id}])

(defn insert-graph [[[user id] geocode]]
  (if geocode
    (insert/push-graph!
     (loom/build-graph [] [[{:id id} geocode s/has-coord]])
     user s/geo-src [(remove-geo-label id)])
    (neo4j/cypher-query (remove-geo-label id))))

(defn geocode-batch [limit]
  (->> (queries/bare-locations limit)
       (map #(vector [(->> % (.labels) queries/find-user-labels)
                      (.id %)] (.id %))) (into {}) 
       (fmapl (comp geocode-str ffirst
                    #(mlrecon/fetch-paths % [[s/s-name]])))
       (mapv insert-graph)))
