(ns spectra.geocode
  (:require [clojure.string :as str]
            [spectra.neo4j :as neo4j]
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
  {:lat (.lat latlng)
   :lng (.lng latlng)})

(defn geocode-str [s]
  (-> *context*
      (GeocodingApi/geocode s)
      (.await) first
      (.geometry) (.location)
      map-latlng))
