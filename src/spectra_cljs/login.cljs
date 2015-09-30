(ns spectra-cljs.login
  (:require-macros
   [cljs.core.async.macros :as asyncm :refer (go go-loop)])
  (:require
   [cljs.core.async :as async :refer (<! >! put! chan)]
   [taoensso.sente  :as sente :refer (cb-success?)]))

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

(defn validate-form []
  (let [email (.getElementById js/document "signupUsername")
        password (.getElementById js/document "signupPassword")
        confirm (.getElementById js/document "signupConfirm")]
    (cond
      (< (count (.-value email)) 3)
      (do (js/alert "Please fill in your email address") false)
      (< (count (.-value password)) 3)
      (do (js/alert "Please fill in your password") false)
      (not= (.-value password) (.-value confirm))
      (do (js/alert "Password and confirmation don't match") false)
      :else true)))

(defn init []
  ;; verify that js/document exists and that it has a getElementById
  ;; property
  (if (and js/document
           (.-getElementById js/document))
    (let [login-form (.getElementById js/document "loginForm")]
      (set! (.-onsubmit login-form) validate-form))))

;; initialize the HTML page in unobtrusive way
(set! (.-onload js/window) init)
