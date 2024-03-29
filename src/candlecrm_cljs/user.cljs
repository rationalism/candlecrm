(ns candlecrm_cljs.user
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :refer [set-field!]]))

(defn confirm-box []
  [:div
   [:p "Your account will be deleted."]
   [:p "All data will be lost permanently!"]
   [:p "Are you sure you want to delete your account?"]
   [:form {:action "/logout"}
    [:fieldset {:class "form-group"}
     [:div {:class "form-check"}
      [:label {:class "form-check-label" :for "yes-delete"}
       [:input {:id "yes-delete" :type "radio" :class "form-check-input"
                :name "delete-radio" :value "yes"
                :on-change (set-field! :delete-account :confirm-button)}]
       "Yes, please delete my account"]]
     [:div {:class "form-check"}
      [:label {:class "form-check-label" :for "no-delete"}
       [:input {:id "no-delete" :type "radio" :class "form-check-input"
                :name "delete-radio" :value "no"
                :on-change (set-field! :delete-account :confirm-button)}]
       "No, don't delete my account"]]
     [:div {:class "form-group"}
      [:button {:type "submit" :class "btn btn-primary"
                :on-click u/delete-account!}
       "Confirm delete"]]]]])

(defn change-pwd-box []
  [:div
   [:form {:class ""
           :id "changePassForm"}
    [:fieldset {:class "form-group"}
     [:legend [:h2 "Set a new password"]]
     [:div.
      [:label {:for "setPwd"} "New password "]
      [:input {:type "password" :name "password"
               :id "setPwd" :required "required" :class "form-control"
               :on-change (set-field! :change-pwd :password)
               :value (state/look :change-pwd :password)}]]
     [:div.
      [:label {:for "setPwdConfirm"} "Confirm new password "]
      [:input {:type "password" :name "confirm" :class "form-control"
               :id "setPwdConfirm" :required "required"
               :on-change (set-field! :change-pwd :confirm)
               :value (state/look :change-pwd :confirm)}]]
     [:div
      [:input {:class "btn btn-primary"
               :value "Set new password" :type "button"
               :on-click u/change-password!}]]]]])

(defn user-footer []
  [:div
   [:p
    [:a {:href "/logout" :class "btn btn-primary" :role "button"}
     "Log out"]]
   [:p
    [:a {:href "javascript:;" :class "btn btn-primary" :role "button"
         :on-click #(state/set! [:change-pwd :show-form] :true)}
     "Change password"]]
   (when (state/look :change-pwd :show-form)
     [change-pwd-box])
   [:p
    [:a {:href "javascript:;" :class "btn btn-primary" :role "button"
         :on-click #(state/set! [:delete-account :confirm-box] :true)}
     "Close account"]]
   (when (state/look :delete-account :confirm-box)
     [confirm-box])])
