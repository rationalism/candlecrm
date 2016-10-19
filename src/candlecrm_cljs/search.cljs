(ns candlecrm_cljs.search
  (:require [clojure.string :as str]
            [accountant.core :as accountant]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.node :as node]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :refer
             [set-field! add-ids node-link get-title]]))

(defn search-key [e]
  (when (= 13 (.-charCode e))
    (accountant/navigate! (str "/app/search/" (state/look :search)))))

(defn search-box []
  [:input {:id "search-box" :type "text" :name "search-box"
           :placeholder "Search" :class "form-control"
           :on-change (set-field! :search) :value (state/look :search)
           :on-key-press search-key}])

(defn result-row [res]
  (let [node-title (get-title {:center-node (second res)})]
    [:div [:hr]
     [:h5.infotitle (str "Result #" (inc (first res)))]
     [node/show-node
      [node-link node-title (:id (second res)) (s/type-label (second res))]
      (second res) false]]))

(defn search-results []
  [:div
   [:h2 "Search Results"]
   (let [results (state/look :search-results)]
     (if (empty? results) [:h3 "No results found."]
         (for [id-res (add-ids results)]
           ^{:key (first id-res)}
           [result-row id-res])))])
