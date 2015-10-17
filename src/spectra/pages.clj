(ns spectra.pages
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.auth :as auth]
            [spectra.recon :as recon]
            [spectra.email :as email]
            [spectra.google :as google]
            [spectra.html :as html]
            [spectra.schema :as schema]
            [cemerick.friend :as friend]))

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

(defn people-table [people]
  (->> people
       (map node-attrs)
       (filter #(not (empty? %)))
       (filter #(contains? % schema/name-type))
       (map first-table-vals)))

(defn homepage [req]
  (if-let [user (auth/get-user-obj (friend/identity req))]
    (html/base-template
     (html/user-welcome (:flash req) (auth/get-username user))
     (-> user recon/person-from-user
         people-table
         html/people-table)
     (html/user-footer))
    (html/base-template
     (html/signup-form (:flash req))
     (html/login-form))))

(defn gmail [req]
  (let [user (auth/get-user-obj (friend/identity req))]
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

(defn show-person [req id]
  (if-let [user (auth/get-user-obj (friend/identity req))]
    (if-let [person (-> user (recon/person-from-id id) first)]
      (html/base-template
       (html/show-person (-> person :data :name)
                         (-> person :data)))
      (html/base-template (html/not-found-error)))
    (html/base-template (html/unauthorized-error))))

(defn ajax-test [req]
  (html/base-template
   (html/ajax-test)))
