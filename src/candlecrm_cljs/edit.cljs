(ns candlecrm_cljs.edit
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :refer
             [get-first node-link set-field! new-attrs
              add-ids get-title format-date]]))

(defn debug-js [x]
  (js/alert x) x)

(defn ids-if-coll [node-type m]
  (let [id-fn #(->> % (into []) (sort-by second >) (map first)
                    add-ids (map vec) vec (into {}))]
    (reduce #(update %1 %2 id-fn)
            m (vec (keep (set (map rest (node-type s/node-paths)))
                         (set (keys m)))))))

(defn filter-keys [node-type m]
  (->> m keys (filter coll?) 
       (remove #(some #{%} (new-attrs node-type)))
       (apply dissoc m)))

(defn add-key [m k]
  (if (contains? m k) m (assoc m k {0 ""})))

(defn add-keys [node-type m]
  (let [edit-attrs (new-attrs node-type)]
    (reduce add-key m edit-attrs)))

(defn date-format-map [m k]
  (->> m (into []) (mapv #(update % 1 format-date))
       (into {})))

(defn is-date-path? [p]
  (and (coll? p) (some #{(last p)} s/date-times)))

(defn translate-dates [m]
  (->> m keys (filter is-date-path?) 
       (reduce #(update %1 %2 date-format-map) m)))

(defn edit-entity-switch [type]
  (state/set! [:edit-entity] (state/look :current-node :center-node))
  (state/update! [:edit-entity] (partial ids-if-coll type))
  (state/update! [:edit-entity] (partial filter-keys type))
  (state/update! [:edit-entity] (partial add-keys type))
  (state/update! [:edit-entity] translate-dates)
  (state/set! [:edit-entity-msg] nil)
  (state/set! [:tabid] 8))

(defn submit-new-entity [type]
  (fn []
    (state/set! [:new-entity s/type-label] type)
    (u/add-entity!)))

(defn add-message []
  (let [resp (state/look :new-entity-msg)]
    [:span (str "New " (-> resp s/type-label name)
                " created. ")
     (node-link "Go to page" (:id resp) (s/type-label resp))]))

(defn edit-message []
  (let [resp (state/look :edit-entity-msg)]
    [:span (str "Edit of " (get-title (state/look :current-node))
                " successful. ")
     (node-link "Go to page" (:id resp) (s/type-label resp))]))

(defn count-cells [attr cache]
  (->> attr second vector (concat cache) (apply state/look)
       keys count))

(defn input-cell [id-attr cache]
  [:div {:class "pure-control-group"}
   [:label
    (if (= 0 (first id-attr))
      (first (second id-attr)) "")]
   (let [attr (second (second id-attr))
         params (->> id-attr first vector (concat [attr])
                     (concat cache))]
     [:input {:type "text" :name (str attr (first id-attr))
              :on-change (apply set-field! params)
              :class "edit-field" :value (apply state/look params)}])
   (let [attr (second id-attr)]
     (when (= 0 (first id-attr))
       [:a {:on-click #(-> cache (concat [(second attr)])
                           (concat [(count-cells attr cache)])
                           (state/set! "")) :href "#"
            :class "pure-button pure-button-primary button-round"}
        [:i {:class "fa fa-plus"}]]))])

(defn count-attr-cells [attr cache]
  (-> (count-cells attr cache) (repeat attr) add-ids))

(defn input-block [attr cache]
  [:div
   (for [id-attr (count-attr-cells attr cache)]
     ^{:key (first id-attr)}
     [input-cell id-attr cache])])

(defn entity-form [legend attrs cache onclick msg]
  [:div
   [:form {:class "pure-form pure-form-aligned"}
    [:fieldset
     [:legend>h3 legend]
     (for [attr attrs]
       ^{:key (first attr)}
       [input-block (second attr) cache])
     [:button {:type "button"
               :class "pure-button pure-button-primary button-round"
               :on-click onclick}
      "Submit"]]]
   msg])

(defn path-names [node-type attrs]
  (let [name-map (->> node-type s/node-paths
                      (map #(if (= (last %) :id) (drop-last %) %))
                      (map #(hash-map (rest %) (first %))) (apply merge))]
    (map (juxt name-map identity) attrs)))

(defn edit-form []
  (let [node-type (state/look :current-node :type)]
    [entity-form
     [:span "Edit " (name node-type)
      " named " (get-title (state/look :current-node))]
     (->> node-type new-attrs (path-names node-type) add-ids)
     [:edit-entity] #(u/edit-entity!)
     (when (state/look :edit-entity-msg)
       [edit-message])]))

(defn add-form []
  (let [node-type (state/look :input-meta :type)]
    [entity-form (str "Add new " (name node-type))
     (->> :attr-list (state/look :input-meta)
          (path-names node-type) add-ids)
     [:new-entity] (submit-new-entity node-type)
     (when (state/look :new-entity-msg)
       [add-message])]))
