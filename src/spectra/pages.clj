(ns spectra.pages
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.auth :as auth]
            [spectra.email :as email]
            [spectra.google :as google]
            [spectra.html :as html]
            [spectra.neo4j :as neo4j]
            [spectra.queries :as queries]
            [spectra.schema :as s]
            [cemerick.friend :as friend]
            [hiccup.core :as hiccup]))

(defn first-if-coll [coll]
  (if (coll? coll) (first coll) coll))

(defn first-table-vals [person]
  (->> person
       (map #(hash-map (key %)
                       (first-if-coll (val %))))
       (reduce merge)))

(defn node-attrs [node]
  (merge (:data node)
         (hash-map :id (:id node))))

(defn tablify-hits [hits]
  (->> (map node-attrs hits) 
       (remove #(empty? %))
       (filter #(contains? % s/name))
       (map first-table-vals)))

(defn people-table [user start limit]
  (->> (queries/person-from-user user start limit)
       tablify-hits (map html/person-row) hiccup/html))

(defn emails-table [user start limit]
  (->> (queries/emails-from-user user start limit)
       tablify-hits (map html/email-row) hiccup/html))

(defn homepage [req]
  (if-let [user (auth/user-from-req req)]
    (html/base-template
     (html/home-header)
     (html/home-content
      (html/user-welcome (:flash req) (auth/get-username user))
      (html/people-table)
      (html/email-table)
      (html/user-footer)))
    (html/base-template
     (html/signup-form (:flash req))
     (html/login-form))))

(defn gmail [req]
  (let [user (auth/user-from-req req)]
    (html/base-template
     (if (google/lookup-token user)
       (html/gmail-finished (:flash req)
                            (auth/get-username user)
                            (email/message-count
                             (email/fetch-imap-folder user)))
       (html/gmail-setup (:flash req)
                         (auth/get-username user)
                         (google/make-auth-url))))))

(defn login-needed [uri]
  (html/base-template
   (html/login-needed uri)))

(defn show-person [person]
  (html/show-person (-> person :data :name first)
                    (-> person :data)))

;                    (-> person :id (neo4j/one-hop false s/email-to))
;                    (-> person :id (neo4j/one-hop false s/email-from))))

(defn show-email [email]
  (html/show-email (-> email :data :name first)
                   (-> email :data)))

(defn show-organization [organization]
  (html/show-organization (-> organization :data :name first)
                          (-> organization :data)))

(defn show-location [location]
  (html/show-location (-> location :data :name first)
                      (-> location :data)))

(defn show-event [event]
  (html/show-event (-> event :data :name first)
                   (-> event :data)))

(defn show-money [money]
  (html/show-money (-> money :data :name first)
                   (-> money :data)))

(def node-page {s/person show-person s/email show-email
                s/organization show-organization s/location show-location
                s/event show-event s/money show-money})

(defn show-node [req id node-type]
  (if-let [user (auth/user-from-req req)]
    (if-let [node (neo4j/node-from-id user id node-type)]
      (html/base-template
       ((node-page node-type) node))
      (html/base-template (html/not-found-error)))
    (html/base-template (html/unauthorized-error))))
  
(defn ajax-test [req]
  (html/base-template
   (html/ajax-test)))
