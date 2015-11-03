(ns spectra.schema
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]))

(def user "user")
(def name :name)
(def pwd-hash :pwd-hash)
(def google-token :google-token)
(def type-label :label)
(def date-time :date-time)
(def hash :hash)

(def person "person")
(def email-addr :email-addr)
(def phone-num :phone-num)
(def user-person :user-person)
(def birthday :birthday)
(def gender :gender)
(def occupation :occupation)
(def mail-address :mail-address)
(def website :website)

(def email "email")
(def email-headers "email_headers")
(def email-to :email-to)
(def email-cc :email-cc)
(def email-bcc :email-bcc)
(def email-from :email-from)
(def email-replyto :email-replyto)
(def email-mentions :email-mentions)

(def email-subject :subject)
(def email-body :body)
(def email-received :received-date)
(def email-sent :sent-date)
(def email-sub-hash :sub-hash)
(def email-reply :reply)

(def location "location")
(def loc-name :loc-name)

(def organization "org")
(def person-name :person-name)
(def org-name :org-name)
(def org-member :org-member)

(def money "money")
(def amount :amount)
(def event "event")
(def time-interval :time-interval)
(def start-time :start-time)
(def stop-time :stop-time)

(def coref-is :coref-is)
(def has-type :has-type)
(def pos-map :pos-map)
(def scanned :scanned)

(def webpage "webpage")
(def url :url)

(def repeated-attr [name person-name org-name email-addr phone-num
                    mail-address website org-member])

(def attr-entity {person-name person org-name organization
                  email-addr person phone-num person
                  loc-name location date-time event
                  amount money birthday person
                  gender person occupation person
                  mail-address person website person
                  org-member person url webpage
                  time-interval event})

(def attr-names {name "Name" amount "Amount"
                 email-addr "Address" email-subject "Subject"
                 email-to "Email to" email-from "Email from"
                 email-reply "Reply to" email-body "Email body"
                 date-time "Time" email-received "Email received"
                 email-sent "Email sent" phone-num "Phone number"
                 birthday "Birthday" gender "Gender"
                 occupation "Occupation" mail-address "Address"
                 website "Website" org-member "Member of"
                 url "Page address" start-time "Begins at"
                 stop-time "Ends at"})

(def person-attrs [name email-addr phone-num birthday gender
                   occupation mail-address website org-member])

(def email-links [email-to email-cc email-bcc
                  email-reply email-replyto email-mentions])

(def recon-attrs {location name event start-time
                  money amount webpage url})
                  

(defn prop
  ([arg1 arg2 arg3]
   (.createProperty arg1 arg2 arg3))
  ([arg1 arg2 arg3 arg4]
   (.createProperty arg1 arg2 arg3 arg4)))

(defn vertex
  ([name]
   (.createVertexType name))
  ([name super]
   (.createVertexType name super)))

(defn get-vertex [name]
  (.getVertexType name))

(defn drop-vertex! [name]
  (.dropVertexType name))

(defn drop-edge! [name]
  (.dropEdgeType name))

(defn edge
  ([name]
   (.createEdgeType name))
  ([name super]
   (.createEdgeType name super)))

(defn key-index [var-type var-class params]
  (.createKeyIndex var-type var-class params))

;; TODO: Get this into a config file so it's cleaner/easier to specify
;; Potentially useful notes: https://groups.google.com/forum/#!msg/orient-recon/Y0QJiXk7d1I/uXEv-paQ9wUJ
;(defn init-user-schema!
;  "Schema manipulation is non-transactional, so remember to 
;  use a non-transactional graph instance here"
;  [g] ;; g = the graph we're applying schema to
;
;  (let [user (vertex g user-type)]
;    (prop user email-address-type OType/STRING)
;    (prop user pwd-hash-type OType/STRING)
;    (key-index g email-address-type Vertex
;               (make-params ["type" "UNIQUE"] ["class" user-type]))
;    (prop user google-token-type OType/STRING))
;  
;  (let [user (get-vertex g user-type)
;        person (vertex g person-type)
;        user-person (edge g user-person-edge)
;        user-owns (edge g user-owns-edge)]
;    (prop user-person out-type OType/LINK user)
;    (prop user-person in-type OType/LINK person)
;    (key-index g out-type Edge
;               (make-params ["type" "UNIQUE"] ["class" user-person-edge]))
;    (key-index g in-type Edge
;               (make-params ["type" "UNIQUE"] ["class" user-person-edge]))
;    (prop user-owns out-type OType/LINK user)
;    (prop user-owns in-type OType/LINK person)
;    (key-index g out-type Edge
;               (make-params ["class" user-owns-edge]))
;    (key-index g in-type Edge
;               (make-params ["type" "UNIQUE"] ["class" user-owns-edge]))
;    (prop person name-type OType/EMBEDDEDSET OType/STRING)
;    (prop person email-address-type OType/EMBEDDEDSET OType/STRING)
;    (prop person phone-num-type OType/EMBEDDEDSET OType/STRING)
;    (key-index g name-type Vertex
;               (make-params ["type" "UNIQUE"] ["class" person-type]))
;    (key-index g email-address-type Vertex
;               (make-params ["type" "UNIQUE"] ["class" person-type]))
;    (key-index g phone-num-type Vertex
;               (make-params ["type" "UNIQUE"] ["class" person-type])))
;
;  (let [person (get-vertex g person-type) 
;        email (vertex g email-type)
;        email-person (edge g email-person-edge)
;        email-to (edge g email-to-edge email-person)
;        email-cc (edge g email-cc-edge email-person)
;        email-bcc (edge g email-bcc-edge email-person)
;        email-from (edge g email-from-edge email-person)
;        email-replyto (edge g email-replyto-edge email-person)
;        email-mentions (edge g email-mentions-edge)]
;    (prop email-person out-type OType/LINK email)
;    (prop email-person in-type OType/LINK person)
;    (prop email-mentions out-type OType/LINK email)
;    (prop email email-subject OType/STRING)
;    (prop email email-body OType/STRING)
;    (prop email email-received OType/DATETIME)
;    (prop email email-sent OType/DATETIME))
;  
;  (let [email (get-vertex g email-type)
;        location (vertex g location)]
;    (prop location name-type OType/STRING))
;    
;  ;; This composite index needed for fast search on multiple properties
;  ;; See https://github.com/orientechnologieorientdb/issue4862
;  (neo4j/sql-command! g (str "CREATE INDEX "
;                             user-person-index
;                             " ON "
;                             user-owns-edge 
;                             " (out, in) UNIQUE")))
;        
;(defn drop-user-schema! [g]
;  (drop-edge! g user-person-edge)
;  (drop-edge! g user-owns-edge)
;  (drop-edge! g email-to-edge)
;  (drop-edge! g email-cc-edge)
;  (drop-edge! g email-bcc-edge)
;  (drop-edge! g email-from-edge)
;  (drop-edge! g email-replyto-edge)
;  (drop-edge! g email-mentions-edge)
;  (drop-edge! g email-person-edge)
;  (drop-vertex! g user-type)
;  (drop-vertex! g person-type)
;  (drop-vertex! g email-type)
;  (drop-vertex! g location))
;
