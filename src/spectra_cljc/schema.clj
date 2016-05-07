(ns spectra_cljc.schema)

(def user :user)
(def s-name :name)
(def value :val)
(def val-node :value)
(def pwd-hash :pwd-hash)
(def pwd-reset-token :pwd-reset-token)
(def google-token :google-token)
(def type-label :label)
(def date-time :date-time)

(def person :person)
(def email-addr :email-addr)
(def phone-num :phone-num)
(def user-person :user-person)
(def birthday :birthday)
(def gender :gender)
(def occupation :occupation)
(def mail-address :mail-address)
(def website :website)

(def email :email)
(def email-headers :email_headers)
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
(def email-reply :reply)
(def email-uid :email-uid)

(def location :location)
(def loc-name :loc-name)
(def lat :lat)
(def lng :lng)
(def has-coord :has-coord)
(def geocode :geocode)

(def organization :org)
(def person-name :person-name)
(def org-name :org-name)
(def org-member :org-member)

(def money :money)
(def amount :amount)
(def event :event)
(def time-interval :time-interval)
(def start-time :start-time)
(def stop-time :stop-time)
(def over-time :over-time)

(def coref-is :coref-is)
(def has-type :has-type)
(def pos-map :pos-map)
(def scanned :scanned)

(def hyperlink :hyperlink)
(def link-to :link-to)
(def link-id :link-id)
(def has-link :has-link)

(def webpage :webpage)
(def url :url)

(def email-queue :emailqueue)
(def time-scanned :time_scanned)
(def user-queue :user_queue)
(def has-queue :has-queue)
(def modified :last-modified)
(def queue-top :queue-top)
(def queue-bottom :queue-bottom)
(def loaded-top :loaded-top)
(def loaded-bottom :loaded-bottom)
(def top-uid :top-uid)

(def recon :recon)
(def norecon :norecon)
(def recon-run :recon-run)
(def index-run :index-run)
(def nonlp :nonlp)

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
                 email-addr "Email address" email-subject "Subject"
                 email-to "Email to" email-from "Email from"
                 email-reply "Reply to" email-body "Email body"
                 date-time "Time" email-received "Email received"
                 email-sent "Email sent" phone-num "Phone number"
                 birthday "Birthday" gender "Gender"
                 occupation "Occupation" mail-address "Address"
                 website "Website" org-member "Member of"
                 url "Page address" start-time "Begins at"
                 stop-time "Ends at"})

(def person-attrs [s-name email-addr phone-num website])

(def email-links [email-to email-cc email-bcc
                  email-reply email-replyto email-mentions])

(def recon-attrs {location s-name event start-time
                  money amount webpage url})

(def date-times [start-time stop-time over-time
                 email-sent email-received])

(def exclude-upload [type-label :id])

(def search-preds [s-name email-addr email-subject
                   phone-num])

;; Special for Barry's project
(def tool :tool)
(def tool-category :category)
(def vendor-name :vendorname)
(def part-name :part)
(def catalog-name :catalog)
(def desc1 :desc1)
(def desc2 :desc2)
(def row-id :rowid)
(def item-cost :cost)