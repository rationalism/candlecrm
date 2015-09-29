(ns spectra-cljs.login)

(defn validate-form []
  (let [email (.getElementById js/document "signupUsername")
        password (.getElementById js/document "signupPassword")
        confirm (.getElementById js/document "signupConfirm")]
    (cond
      (= (count (.-value email)) 0)
      (do (js/alert "Please fill in your email address") false)
      (= (count (.-value password)) 0)
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
