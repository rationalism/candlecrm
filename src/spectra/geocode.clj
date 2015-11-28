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

(defn geocode-batch [limit]
  (->> (queries/bare-locations limit)
       (map queries/node-attrs)
       (map #(update % s/s-name first))
       (map #(update % s/s-name geocode-str))
       (map #(set/rename-keys % {s/s-name s/geocode}))))
       
