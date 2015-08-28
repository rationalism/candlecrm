(ns clojure-getting-started.schema
  (:require [clojure.java.io :as io]
            [clojure-getting-started.graph :as graph]
            [environ.core :refer [env]])
  (:import [com.orientechnologies.orient.core.metadata.schema OClass$INDEX_TYPE OType]
           [com.tinkerpop.blueprints Parameter Edge Vertex]))

;; CANNOT use dashes, etc. in column names
;; TODO: create systematic names for these
(def name-type "name")
(def out-type "out")
(def in-type "in")

;; CANNOT call these fields "user", "account", etc. due to known
;; database bug. See https://github.com/orientechnologies/orientdb/issues/3972
(def user-type "appuser")
(def pwd-hash-type "bcrypt")
(def google-token-type "googletoken")

(def person-type "person")
(def email-address-type "emailaddr")
(def phone-num-type "phonenum")
(def user-person-edge "appuserperson")
(def user-owns-edge "appuserowns")
(def user-person-index "personindex")

(def email-type "email")
(def email-person-edge "emailperson")
(def email-to-edge "emailto")
(def email-cc-edge "emailcc")
(def email-bcc-edge "emailbcc")
(def email-from-edge "emailfrom")
(def email-replyto-edge "emailreplyto")
(def email-mentions-edge "emailmentions")

(def email-subject "subject")
(def email-body "body")
(def email-received "receiveddate")
(def email-sent "sentdate")

(def location-type "location")

(defn param [args]
  (Parameter. (nth args 0) (nth args 1)))

(defn make-params [& args]
  (into-array (map param args)))

(defn prop [arg1 arg2 arg3]
  (.createProperty arg1 arg2 arg3))

(defn prop [arg1 arg2 arg3 arg4]
  (.createProperty arg1 arg2 arg3 arg4))

(defn vertex [target-graph name]
  (.createVertexType target-graph name))

(defn vertex [target-graph name super]
  (.createVertexType target-graph name super))

(defn get-vertex [target-graph name]
  (.getVertexType target-graph name))

(defn drop-vertex [target-graph name]
  (.dropVertexType target-graph name))

(defn edge [target-graph name]
  (.createEdgeType target-graph name))

(defn edge [target-graph name super]
  (.createEdgeType target-graph name super))

(defn key-index [target-graph var-type var-class params]
  (.createKeyIndex target-graph var-type var-class params))

;; TODO: Get this into a config file so it's cleaner/easier to specify
;; Potentially useful notes: https://groups.google.com/forum/#!msg/orient-database/Y0QJiXk7d1I/uXEv-paQ9wUJ
(defn init-user-schema
  "Schema manipulation is non-transactional, so remember to 
  use a non-transactional graph instance here"
  [g] ;; g = the graph we're applying schema to

  (let [user (vertex g user-type)]
    (prop user email-address-type OType/STRING)
    (prop user pwd-hash-type OType/STRING)
    (key-index g email-address-type Vertex
               (make-params ["type" "UNIQUE"] ["class" user-type]))
    (prop user google-token-type OType/STRING))
  
  (let [user (get-vertex g user-type)
        person (vertex g person-type)
        user-person (edge g user-person-edge)
        user-owns (edge g user-owns-edge)]
    (prop user-person out-type OType/LINK user)
    (prop user-person in-type OType/LINK person)
    (key-index g out-type Edge
               (make-params ["type" "UNIQUE"] ["class" user-person-edge]))
    (key-index g in-type Edge
               (make-params ["type" "UNIQUE"] ["class" user-person-edge]))
    (prop user-owns out-type OType/LINK user)
    (prop user-owns in-type OType/LINK person)
    (key-index g out-type Edge
               (make-params ["class" user-owns-edge]))
    (key-index g in-type Edge
               (make-params ["type" "UNIQUE"] ["class" user-owns-edge]))
    (prop person name-type OType/STRING)
    (prop person email-address-type OType/STRING)
    (prop person phone-num-type OType/STRING))
  
  (let [person (get-vertex g person-type) 
        email (vertex g email-type)
        email-person (edge g email-person-edge)
        email-to (edge g email-to-edge email-person)
        email-cc (edge g email-cc-edge email-person)
        email-bcc (edge g email-bcc-edge email-person)
        email-from (edge g email-from-edge email-person)
        email-replyto (edge g email-replyto-edge email-person)
        email-mentions (edge g email-mentions-edge)]
    (prop email-person out-type OType/LINK email)
    (prop email-person in-type OType/LINK person)
    (prop email-mentions out-type OType/LINK email)
    (prop email email-subject OType/STRING)
    (prop email email-body OType/STRING)
    (prop email email-received OType/DATETIME)
    (prop email email-sent OType/DATETIME))
  
  (let [email (get-vertex g email-type)
        location (vertex g location-type)]
    (prop location name-type OType/STRING))
    
  ;; This composite index needed for fast search on multiple properties
  ;; See https://github.com/orientechnologies/orientdb/issues/4862
  (graph/sql-command! g (str "CREATE INDEX "
                             user-person-index
                             " ON "
                             user-owns-edge 
                             " (out, in) UNIQUE")))
        
(defn drop-user-schema [g]
  (drop-vertex g user-type)
  (drop-vertex g person-type)
  (drop-vertex g email-type)
  (drop-vertex g location-type))

