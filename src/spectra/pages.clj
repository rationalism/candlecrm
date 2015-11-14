(ns spectra.pages
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.auth :as auth]
            [spectra.email :as email]
            [spectra.google :as google]
            [spectra.html :as html]
            [spectra.neo4j :as neo4j]
            [spectra.queries :as queries]
            [spectra_cljc.schema :as s]
            [cemerick.friend :as friend]
            [hiccup.core :as hiccup]))

(defn login [req]
  (html/base-template
   (html/signup-form (:flash req))
   (html/login-form)))

(defn homepage [req]
  (html/base-template))

;(defn gmail [req]
;  (let [user (auth/user-from-req req)]
;    (html/base-template
;     (if (google/lookup-token user)
;       (html/gmail-finished (:flash req)
;                            (auth/get-username user)
;                            (email/message-count
;                             (email/fetch-imap-folder user)))
;       (html/gmail-setup (:flash req)
;                         (auth/get-username user)
;                         (google/make-auth-url))))))

(defn login-needed [uri]
  (html/base-template
   (html/login-needed uri)))

;(def node-page {s/person show-person s/email show-email
;                s/organization show-organization s/location show-location
;                s/event show-event s/money show-money})

;(defn show-node [req id node-type]
;  (if-let [user (auth/user-from-req req)]
;    (if-let [node (neo4j/node-from-id user id node-type)]
;      (html/base-template
;       ((node-page node-type) node))
;      (html/base-template (html/not-found-error)))
;    (html/base-template (html/unauthorized-error))))
  
(defn ajax-test [req]
  (html/base-template
   (html/ajax-test)))
