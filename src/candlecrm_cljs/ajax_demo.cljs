(ns candlecrm_cljs.ajax-demo
  (:require [clojure.string  :as str]
            [taoensso.timbre :as timbre :refer-macros (debugf)]
            [taoensso.sente :as sente]))

;;;; Client-side UI

(defn btn1-init! [chsk-send!]
  (when-let [target-el (.getElementById js/document "btn1")]
    (.addEventListener
     target-el "click"
     (fn [ev]
       (debugf "Button 1 was clicked (won't receive any reply from server)")
       (chsk-send! [:example/button1 {:had-a-callback? "nope"}])))))

(defn btn2-init! [chsk-send!]
  (when-let [target-el (.getElementById js/document "btn2")]
    (.addEventListener
     target-el "click"
     (fn [ev]
       (debugf "Button 2 was clicked (will receive reply from server)")
       (chsk-send! [:example/button2 {:had-a-callback? "indeed"}] 5000
                   (fn [cb-reply] (debugf "Callback reply: %s" cb-reply)))))))

(defn login-response [chsk ajax-resp]
  (debugf "Ajax login response: %s" ajax-resp)
  (let [login-successful? true ; Your logic here
        ]
    (if-not login-successful?
      (debugf "Login failed")
      (do
        (debugf "Login successful")
        (sente/chsk-reconnect! chsk)))))

(defn login-listener [chsk chsk-state ev]
  (let [user-id (.-value (.getElementById js/document "input-login"))]
    (if (str/blank? user-id)
      (js/alert "Please enter a user-id first")
      (do
        (debugf "Logging in with user-id %s" user-id)
        
        ;;; Use any login procedure you'd like. Here we'll trigger an Ajax
        ;;; POST request that resets our server-side session. Then we ask
        ;;; our channel socket to reconnect, thereby picking up the new
        ;;; session.
        
        (sente/ajax-call "/login-test"
                         {:method :post
                          :params {:user-id    (str user-id)
                                   :csrf-token (:csrf-token @chsk-state)}}
                         (partial login-response chsk))))))

(defn btn-login-init! [chsk chsk-state]
  (when-let [target-el (.getElementById js/document "btn-login")]
    (.addEventListener target-el "click"
                       (partial login-listener chsk chsk-state))))

(defn listen! [chsk chsk-state chsk-send!]
  (btn1-init! chsk-send!)
  (btn2-init! chsk-send!)
  (btn-login-init! chsk chsk-state))
