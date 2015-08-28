(ns clojure-getting-started.pages
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [clojure-getting-started.auth :as auth]
            [clojure-getting-started.database :as database]
            [clojure-getting-started.google :as google]
            [clojure-getting-started.html :as html]
            [cemerick.friend :as friend]))

(defn homepage [req]
  (if-let [user (auth/get-user-obj (friend/identity req))]
    (html/base-template
     (html/user-home (:flash req) (database/get-username user)))
    (html/base-template
     (html/signup-form (:flash req))
     (html/login-form))))

(defn gmail [req]
  (let [user (auth/get-user-obj (friend/identity req))]
    (html/base-template
     (if (google/lookup-token user)
       (html/gmail-finished (:flash req)
                            (database/get-username user))
       (html/gmail-setup (:flash req)
                         (database/get-username user)
                         (google/make-auth-url))))))

(defn login-needed [uri]
  (html/base-template
   (html/login-needed uri)))
