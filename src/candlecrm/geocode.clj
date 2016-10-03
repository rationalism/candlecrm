(ns candlecrm.geocode
  (:require [clojure.set :as set]
            [clojure.string :as str]
            [candlecrm.common :refer :all]
            [candlecrm.insert :as insert]
            [candlecrm.loom :as loom]
            [candlecrm.mlrecon :as mlrecon]
            [candlecrm.neo4j :as neo4j]
            [candlecrm.queries :as queries]
            [candlecrm_cljc.schema :as s]
            [candlecrm.environ :refer [env]])
  (:import [com.google.maps GeoApiContext GeocodingApi]
           [com.google.maps.errors OverQueryLimitException]))

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
  (try
    (-> @context (GeocodingApi/geocode s) (.await) first)
    (catch OverQueryLimitException e
      (throw-warn! "Error: Over query limit for geocoding API")
      (throw-warn! (str "Could not geocode " s))
      nil)))

(defn full-location [[addr loc zip]]
  (str (first addr) ", " (str/join " " loc)
       (str/join " " zip)))

(defn geocode-str [s]
  (when-let [geocode (-> s full-location fetch-geocode)]
    (-> geocode .geometry .location map-latlng)))

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
       (fmapl (comp geocode-str
                    #(mlrecon/fetch-paths
                      % [[s/street-addr] [s/located-in s/s-name]
                         [s/located-in s/zipcode]])))
       (mapv insert-graph)))
