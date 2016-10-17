(ns candlecrm_cljs.upload
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :refer
             [add-ids]]))

(def upload-cols #{s/s-name s/email-addr s/phone-num s/birthday
                   s/org-member s/website s/location s/mail-address
                   s/notes})

(defn upload-fields []
  (->> s/node-paths s/person
       (filter #(contains? upload-cols (second %)))))

(defn select-field-map []
  (->> (upload-fields) (map #(vector (first %) (rest %)))
       (map #(update % 1 (fn [fs] (if (> (count fs) 2)
                                    (take 2 fs) (first fs)))))
       (map #(apply hash-map %)) (apply merge)))

(defn column-dropdown [id]
  [:select {:class "form-control" :id (str "upload-col" id)
            :on-change #(state/set! [:upload-col-map id] (.. % -target -value))}
   (for [option (->> (upload-fields) (concat [["" nil]]) add-ids)]
     ^{:key (first option)}
     [:option (first (second option))])])

(defn column-cell [col]
  [:div {:class "row form-group"}
   [:label {:class "col-xs-6 col-form-label"}
    [:h6 (str "\"" (first (second col)) "\""
              " (eg. " (second (second col)) ")")]]
   [:div {:class "col-xs-6"}
    [column-dropdown (first col)]]])

(defn upload-switch! []
  (let [field-map (select-field-map)]
    (->> :upload-col-map state/look (sort-by first)
         (map second) (mapv #(field-map %)) u/push-columns!)))

(defn column-select []
  [:div
   [:h2 "Match spreadsheet columns to upload your contacts"][:br]
   [:div {:class "container-fluid"}
    [:div {:class "row"}
     [:div {:class "greyback col-xs-9"}
      [:form {:class ""}
       [:fieldset {:class "form-group"}
        [:legend>h4 "Select the appropriate field for each column:"]
        (for [col (add-ids (state/look :upload-cols))]
          ^{:key (first col)}
          [column-cell col])
        [:button {:type "button" :class "btn btn-primary"
                  :on-click upload-switch!}
         "Submit"]]]]]]])

(defn start-upload! [col-data]
  (state/set! [:tabid] "upload")
  (state/set! [:upload-cols] col-data)
  (state/set! [:upload-col-map]
              (zipmap (range (count col-data))
                      (repeat (count col-data) ""))))
