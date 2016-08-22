(ns candlecrm_cljs.util
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]))

(defn get-first [node attr]
  (u/get-first node attr))

(defn node-link [text id type]
  [:a.go-node
   {:href "#" :on-click #(u/go-node! id type)}
   text])

(defn new-attrs [node-type]
  (->> node-type s/node-paths (filter #(= 2 (count %)))
       (mapv second)))

(defn new-entity-switch [node-type]
  (let [type-attrs (new-attrs node-type)]
    (state/set! [:input-meta :type] node-type)
    (state/set! [:input-meta :attr-list] type-attrs)
    (doseq [attr type-attrs]
      (state/set! [:new-entity attr] {0 ""}))
    (state/set! [:tabid] 7)))

(defn add-new [rel-type]
  [:p [:a {:href "#" :on-click #(table/new-entity-switch rel-type)
           :id (str "add-new-" (name rel-type)) :class "pure-button"}
       (str "Add new " (name rel-type))]])

(defn key-link [text key type]
  (condp = type
    :node [:a.go-node
           {:href "#" :on-click #(u/go-key! key)}
           text]
    :url [:a.go-node
          {:href key} text]))

(defn set-field! [& args]
  (fn [this]
    (state/set! args (-> this .-target .-value))))

(defn add-ids [coll]
  (partition
   2 (-> coll count range
         (interleave coll))))

(defn format-date [date]
  (.format (js/moment. date)
           "MMM Do, h:mm a"))

(defn date-display [item]
  [:span (format-date
          (if (coll? item)
            (first item) item))])
