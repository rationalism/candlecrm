(ns spectra-cljs.pages
  (:require [goog.dom :as dom]
            [goog.events :as events]))

(def page-counter (atom 0))
(def people-count 20)

(defn insert-rows! [table n]
  (dotimes [i n]
    (-> table
        (.insertRow -1)
        (.insertCell -1)
        (.-innerHTML)
        (set! i))))

(defn insert-table-body! [body html]
  (set! (.-innerHTML body) html))

(defn table-body [table]
  (if (> (.-length (.-tBodies table)) 0)
    (first (array-seq (.-tBodies table))) nil))

(defn fetch-people! [chsk-send! table start limit]
  (chsk-send!
   [:pages/fetch-people {:start start :limit limit}] 5000
   (fn [people-html]
     (insert-table-body! (table-body table)
                         people-html))))

(defn update-people! [chsk-send!]
  (when-let [people-table (dom/getElement "people-table")]
    (fetch-people! chsk-send! people-table
                   (* people-count @page-counter)
                   people-count)))

(defn prev-people! [chsk-send!]
  (when (< 0 @page-counter)
    (swap! page-counter dec)
    (update-people! chsk-send!)))

(defn next-people! [chsk-send!]
  (swap! page-counter inc)
  (update-people! chsk-send!))

(defn listen! [chsk-send!]
  (when-let [prev-page (dom/getElement "prev-people-page")]
    (set! (.-onclick prev-page)
          (partial prev-people! chsk-send!)))
  (when-let [next-page (dom/getElement "next-people-page")]
    (set! (.-onclick next-page)
          (partial next-people! chsk-send!))))
