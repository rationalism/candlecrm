(ns spectra_cljc.schema)

(def user "user")
(def s-name :name)
(def pwd-hash :pwd-hash)
(def google-token :google-token)
(def type-label :label)
(def date-time :date-time)
(def sha1 :hash)

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
(def lat :lat)
(def lng :lng)
(def has-coord :has-coord)
(def geocode "geocode")

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
(def over-time :over-time)

(def coref-is :coref-is)
(def has-type :has-type)
(def pos-map :pos-map)
(def scanned :scanned)

(def webpage "webpage")
(def url :url)

(def email-queue "emailqueue")
(def time-scanned "time_scanned")
(def user-queue "user_queue")
(def has-queue :has-queue)
(def modified :last-modified)
(def queue-top :queue-top)
(def queue-bottom :queue-bottom)

(def repeated-attr [s-name person-name org-name email-addr phone-num
                    mail-address website org-member])

(def attr-entity {person-name person org-name organization
                  email-addr person phone-num person
                  loc-name location date-time event
                  amount money birthday person
                  gender person occupation person
                  mail-address person website person
                  org-member person url webpage
                  time-interval event})

(def attr-names {s-name "Name" amount "Amount"
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

(def person-attrs [s-name email-addr phone-num birthday gender
                   occupation mail-address website org-member])

(def email-links [email-to email-cc email-bcc
                  email-reply email-replyto email-mentions])

(def recon-attrs {location s-name event start-time
                  money amount webpage url})

(def date-times [start-time stop-time over-time
                 email-sent email-received])

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

