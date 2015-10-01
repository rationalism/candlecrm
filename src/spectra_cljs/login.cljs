(ns spectra-cljs.login
  (:require-macros
   [cljs.core.async.macros :as asyncm :refer (go go-loop)])
  (:require
   [cljs.core.async :as async :refer (<! >! put! chan)]
   [taoensso.sente  :as sente :refer (cb-success?)]
   [goog.dom :as dom]
   [goog.events :as events]))

;; Sente/AJAX boilerplate from https://github.com/ptaoussanis/sente
(let [{:keys [chsk ch-recv send-fn state]}
      (sente/make-channel-socket! "/chsk" ; Note the same path as before
       {:type :auto ; e/o #{:auto :ajax :ws}
       })]
  (def chsk       chsk)
  (def ch-chsk    ch-recv) ; ChannelSocket's receive channel
  (def chsk-send! send-fn) ; ChannelSocket's send API fn
  (def chsk-state state)   ; Watchable, read-only atom
  )

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
  (if (and js/document
           (.-getElementById js/document))
    (let [signup-form (dom/getElement "signupForm")
          login-form (dom/getElement "loginForm")]
      (set! (.-onsubmit signup-form) validate-signup-form)
      (set! (.-onsubmit login-form) validate-login-form))))

;; initialize the HTML page in unobtrusive way
(set! (.-onload js/window) init)
