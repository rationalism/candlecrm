(ns candlecrm_cljs.edit
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.table :as table]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :refer [node-link set-field! add-ids]]))

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
  (let [resp (state/look :new-entity-msg)]
    [:span (str "Edit of " (-> resp s/type-label name)
                " successful. ")
     (node-link "Go to page" (:id resp) (s/type-label resp))]))

(defn count-cells [attr cache]
  (->> attr vector (concat cache) (apply state/look)
       keys count))

(defn input-cell [id-attr cache]
  [:div {:class "pure-control-group"}
   [:label
    (if (= 0 (first id-attr))
      ((second id-attr) s/attr-names) "")]
   (let [attr (second id-attr)
         params (->> id-attr first vector (concat [attr])
                     (concat cache))]
     [:input {:type "text" :name (str attr (first id-attr))
              :on-change (apply set-field! params)
              :value (apply state/look params)}])
   (let [attr (second id-attr)]
     (when (= 0 (first id-attr))
       [:a.new-link {:href "#"
                     :on-click #(-> cache (concat [attr])
                                    (concat [(count-cells attr cache)])
                                    (state/set! ""))}
        "Add new"]))])

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
               :class "pure-button pure-button-primary"
               :on-click onclick}
      "Submit"]]]
   msg])

(defn add-form []
  [entity-form
   (str "Edit " (-> :current-node (state/look :type) name)
        " named " (-> (state/look :current-node :center-node s/s-name)
                      first second))
   (add-ids (s/person table/entity-attrs))
   [:current-node :center-node] #(u/edit-entity!)
   (when (state/look :edit-entity-msg)
     [edit-message])])

(defn edit-form []
  [entity-form "Add new person"
   (add-ids (s/person table/entity-attrs))
   [:new-entity]
   (submit-new-entity s/person)
   (when (state/look :new-entity-msg)
     [add-message])])
