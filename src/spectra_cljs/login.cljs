(ns spectra-cljs.login
  (:require [goog.dom :as dom]
            [goog.events :as events]
            [spectra-cljs.ajax :as ajax]
            [spectra-cljs.pages :as pages]))

(defn validate-signup-form []
  (let [email (dom/getElement "signupUsername")
        password (dom/getElement "signupPassword")
        confirm (dom/getElement "signupConfirm")
        error (dom/getElement "signupError")]
    (cond
      (< (count (.-value email)) 3)
      (do (set! (.-innerHTML error) "Please fill in your email address") false)
      (< (count (.-value password)) 3)
      (do (set! (.-innerHTML error) "Please fill in your password") false)
      (not= (.-value password) (.-value confirm))
      (do (set! (.-innerHTML error) "Password and confirmation don't match") false)
      :else true)))

(defn validate-login-form []
  (let [email (dom/getElement "loginUsername")
        password (dom/getElement "loginPassword")
        error (dom/getElement "loginError")]
    (cond
      (< (count (.-value email)) 3)
      (do (set! (.-innerHTML error) "Please fill in your email address") false)
      (< (count (.-value password)) 3)
      (do (set! (.-innerHTML error) "Please fill in your password") false)
      :else true)))

(defn init []
  ;; verify that js/document exists and that it has a getElementById
  ;; property
  (if (and js/document (.-getElementById js/document))
    (do
      (ajax/start!)
      (ajax/listen!)
      (when-let [signup-form (dom/getElement "signupForm")]
        (set! (.-onsubmit signup-form) validate-signup-form))
      (when-let [login-form (dom/getElement "loginForm")]
        (set! (.-onsubmit login-form) validate-login-form)))))

;; initialize the HTML page in unobtrusive way
(set! (.-onload js/window) init)
