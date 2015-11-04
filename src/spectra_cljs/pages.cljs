(ns spectra-cljs.pages
  (:require [goog.dom :as dom]
            [goog.events :as events]))

(def people-counter (atom 0))
(def people-count 20) 
(def email-counter (atom 0))
(def email-count 20)

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

(defn fetch-rows! [chsk-send! table req-type]
  (chsk-send! req-type 5000
              (fn [inner-html]
                (insert-table-body! (table-body table)
                                    inner-html))))

(defn update-people! [chsk-send!]
  (when-let [people-table (dom/getElement "people-table")]
    (fetch-rows! chsk-send! people-table
                 [:pages/fetch-people {:start (* people-count @people-counter)
                                       :limit people-count}])))

(defn prev-people! [chsk-send!]
  (when (< 0 @people-counter)
    (swap! people-counter dec)
    (update-people! chsk-send!)))

(defn next-people! [chsk-send!]
  (swap! people-counter inc)
  (update-people! chsk-send!))

(defn update-emails! [chsk-send!]
  (when-let [email-table (dom/getElement "email-table")]
    (fetch-rows! chsk-send! email-table
                 [:pages/fetch-emails {:start (* email-count @email-counter)
                                       :limit email-count}])))

(defn prev-emails! [chsk-send!]
  (when (< 0 @email-counter)
    (swap! email-counter dec)
    (update-emails! chsk-send!)))

(defn next-emails! [chsk-send!]
  (swap! email-counter inc)
  (update-emails! chsk-send!))

(def listeners {"prev-people-page" prev-people!
                "next-people-page" next-people!
                "prev-email-page" prev-emails!
                "next-email-page" next-emails!})

(defn listen! [chsk-send!]
  (doseq [l listeners]
    (when-let [trigger (dom/getElement (key l))]
      (set! (.-onclick trigger)
            (partial (val l) chsk-send!)))))
