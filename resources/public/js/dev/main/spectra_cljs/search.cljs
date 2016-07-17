(ns spectra_cljs.search
  (:require [clojure.string :as str]
            [spectra_cljc.schema :as s]
            [spectra_cljs.node :as node]
            [spectra_cljs.state :as state]
            [spectra_cljs.update :as u]
            [spectra_cljs.util :refer [set-field! add-ids node-link]]))

(defn search-key [e] 
  (when (= 13 (.-charCode e))
    (u/run-search!)))

(defn search-box []
  [:fieldset {:class "pure-form"}
   [:input {:id "search-box" :type "text" :name "search-box" :placeholder "Search"
            :on-change (set-field! :search) :value (state/look :search)
            :on-key-press search-key}]])

(defn result-row [res]
  [:div [:hr]
   [:h3.infotitle (str "Result #" (inc (first res)))]
   [node/show-node (node/get-title {:center-node (second res)})
    (second res) false]
   [:p [node-link (str "Link to " (node/get-title {:center-node (second res)}))
        (:id (second res)) (s/type-label (second res))]]])

(defn search-results []
  [:div
   [:h2 "Search Results"]
   (for [id-res (-> :search-results state/look add-ids)]
     ^{:key (first id-res)}
     [result-row id-res])])
