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
   [:form {:class "pure-form" :action "/logout"}
    [:label {:class "pure-radio" :for "yes-delete"}
     [:input {:id "yes-delete" :type "radio"
              :name "delete-radio" :value "yes"
              :on-change (set-field! :delete-account :confirm-button)}]
     "Yes, please delete my account"]
    [:label {:class "pure-radio" :for "no-delete"}
     [:input {:id "no-delete" :type "radio"
              :name "delete-radio" :value "no"
              :on-change (set-field! :delete-account :confirm-button)}]
     "No, don't delete my account"]
    [:button {:type "submit"
              :class "pure-button pure-button-primary button-round"
              :on-click u/delete-account!}
     "Confirm delete"]]])

(defn change-pwd-box []
  [:div
   [:form {:class "pure-form pure-form-aligned"
           :id "changePassForm"}
    [:fieldset
     [:legend [:h2 "Set a new password"]]
     [:div.pure-control-group
      [:label {:for "setPwd"} "New password "]
      [:input {:type "password" :name "password"
               :id "setPwd" :required "required"
               :on-change (set-field! :change-pwd :password)
               :value (state/look :change-pwd :password)}]]
     [:div.pure-control-group
      [:label {:for "setPwdConfirm"} "Confirm new password "]
      [:input {:type "password" :name "confirm"
               :id "setPwdConfirm" :required "required"
               :on-change (set-field! :change-pwd :confirm)
               :value (state/look :change-pwd :confirm)}]]
     [:div.pure-controls
      [:input {:class "pure-button pure-button-primary button-round"
               :value "Set new password" :type "button"
               :on-click u/change-password!}]]]]])

(defn user-footer []
  [:div
   [:p
    [:a {:href "/logout" :class "pure-button pure-button-primary button-round"}
     "Log out"]]
   [:p
    [:a {:href "#" :class "pure-button pure-button-primary button-round"
         :on-click #(state/set! [:change-pwd :show-form] :true)}
     "Change password"]]
   (when (state/look :change-pwd :show-form)
     [change-pwd-box])
   [:p
    [:a {:href "#" :class "pure-button pure-button-primary button-round"
         :on-click #(state/set! [:delete-account :confirm-box] :true)}
     "Close account"]]
   (when (state/look :delete-account :confirm-box)
     [confirm-box])])
