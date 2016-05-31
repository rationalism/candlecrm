(ns spectra_cljs.search
  (:require [clojure.string :as str]
            [spectra_cljc.schema :as s]
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
   [:ul
    (for [id-param (add-ids res)]
      ^{:key (first id-param)}
      [:li (str (second id-param))])
    [:li [node-link "Link to result" (:id res) (s/type-label res)]]]])

(defn search-results []
  [:div
   [:h2 "Search Results"]
   (for [id-res (-> :search-results state/look add-ids)]
     ^{:key (first id-res)}
     [result-row (second id-res)])])
