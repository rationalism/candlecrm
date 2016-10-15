(ns candlecrm_cljs.upload
  (:require [clojure.string :as str]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :refer
             [add-ids]]))

(defn column-cell [col]
  [:div {:class "row form-group"}
   [:label {:class "col-xs-2 col-form-label"}
    (second col)]
   [:div {:class "col-xs-4"}
    [:input {:type "text" :name (str col)
             :class "form-control edit-field"}]]])

(defn column-select []
  [:div
   [:h2 "Match spreadsheet columns to upload your contacts"][:br]
   [:div {:class "container-fluid"}
    [:div {:class "row"}
     [:form {:class ""}
      [:fieldset {:class "form-group"}
       [:legend>h4 "Select the appropriate field for each column:"]
       (for [col (add-ids (state/look :upload-cols))]
         ^{:key (first col)}
         [column-cell col])
       [:button {:type "button" :class "btn btn-primary"
                 :on-click #(js/alert "Submitted")}
        "Submit"]]]]]])
