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
