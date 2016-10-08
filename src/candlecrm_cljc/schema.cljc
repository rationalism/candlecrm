(ns candlecrm_cljc.schema)

(def user :user)
(def s-name :name)
(def value :val)
(def val-node :value)
(def pwd-hash :pwd-hash)
(def pwd-reset-token :pwd-reset-token)
(def google-token :google-token)
(def type-label :label)
(def date-time :date-time)
(def s-time :time)
(def notes :notes)
(def notes-nlp :notes-nlp)

(def person :person)
(def email-addr :email-addr)
(def phone-num :phone-num)
(def user-person :user-person)
(def birthday :birthday)
(def gender :gender)
(def occupation :occupation)
(def mail-address :mail-address)
(def website :website)
(def age :age)

(def email :email)
(def email-to :email-to)
(def email-cc :email-cc)
(def email-bcc :email-bcc)
(def email-from :email-from)
(def email-replyto :email-replyto)
(def email-digest :email-digest)

(def email-subject :subject)
(def email-body :body)
(def body-nlp :body-nlp)
(def nlp-done :nlp-done)
(def email-received :received-date)
(def email-sent :sent-date)
(def email-reply :reply)
(def email-uid :email-uid)
(def timezone :timezone)

(def location :location)
(def located-in :located-in)
(def loc-name :loc-name)
(def lat :lat)
(def lng :lng)
(def has-coord :has-coord)
(def geocode :geocode)
(def coord-pair :coord-pair)
(def street-addr :street-addr)
(def zipcode :zipcode)
(def building :building)
(def loc-inside :loc-inside)

(def organization :org)
(def person-name :person-name)
(def org-name :org-name)
(def org-member :org-member)

(def money :money)
(def amount :amount)
(def event :event)
(def time-interval :time-interval)
(def duration :duration)
(def start-time :start-time)
(def stop-time :stop-time)
(def over-time :over-time)
(def frequency :frequency)
(def event-attend :event-attend)
(def event-features :event-features)
(def event-org :event-org)
(def event-loc :event-loc)
(def event-addr :event-addr)
(def event-type :event-type)
(def event-cost :event-cost)
(def event-time :event-time)
(def event-begin :event-begin)
(def event-end :event-end)
(def event-context :event-context)

(def has-minute :has-minute)
(def has-hour :has-hour)
(def has-date :has-date)
(def has-day :has-day)
(def has-week :has-week)
(def has-month :has-month)
(def has-year :has-year)

(def number :number)
(def percent :percent)
(def ordinal :ordinal)

(def coref-is :coref-is)
(def has-type :has-type)
(def pos-map :pos-map)
(def scanned :scanned)

(def hyperlink :hyperlink)
(def link-to :link-to)
(def link-id :link-id)
(def link-text :link-text)
(def hash-code :hash-code)
(def text-mentions :text-mentions)

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
(def nogeocode :nogeocode)

(def match :match)
(def notmatch :notmatch)
(def strong :strong)
(def weak :weak)
(def s-class :class)
(def trainpair :trainpair)

(def test-src 0)
(def edit-src 1)
(def nlp-src 2)
(def email-src 3)
(def contact-src 4)
(def meta-src 5)
(def geo-src 6)

(def src-features [edit-src nlp-src email-src contact-src])

(def node-paths
  {person [["Name" s-name] ["Email address" email-addr]
           ["Phone number" phone-num] ["Birthday" birthday]
           ["Member of these organizations" org-member s-name :id]
           ["Personal website" website] ["Lives in" location s-name :id]
           ["Home address" mail-address street-addr :id]
           ["Mentioned in" link-to text-mentions email-subject :id]
           ["Notes" notes] ["Notes" notes-nlp]]
   email [["Subject" email-subject] ["Email sent" email-sent]
          ["Sent by" email-from email-addr :id]
          ["Sent to" email-to email-addr :id]
          ["Sent by" email-from s-name :id]
          ["Sent to" email-to s-name :id]
          ["Other emails in thread" email-reply email-from s-name :id]
          ["Body" email-body] ["Body" body-nlp]]
   organization [["Organization name" s-name] ["Email address" email-addr]
                 ["Phone number" phone-num] ["Organization website" website]
                 ["Located in" location s-name :id]
                 ["Members of this organization" org-member s-name :id]
                 ["Mentioned in" link-to text-mentions email-subject :id]
                 ["Notes" notes] ["Notes" notes-nlp]]
   location [["Location name" s-name] ["Assocated zipcodes" zipcode]
             ["Emails that mention here" link-to text-mentions email-subject :id]
             ["Related locations" loc-inside s-name :id]
             ["Buildings in this location" located-in street-addr :id]
             ["People and companies here" location s-name :id]
             ["Notes" notes] ["Notes" notes-nlp]]
   building [["Address of this building" street-addr]
             ["Emails mentioning this address" link-to text-mentions email-subject :id]
             ["Latitude" has-coord lat :id] ["Longitude" has-coord lng :id]
             ["This building is located in" located-in s-name :id]
             ["The zipcode for this building is" located-in zipcode :id]
             ["People living here" mail-address s-name :id]
             ["Events at this address" event-addr event-org s-name :id]
             ["Notes" notes] ["Notes" notes-nlp]]
   event [["Event name" s-name] ["Event time" date-time]
          ["Event begins" event-begin] ["Event ends" event-end]
          ["Event location" event-loc s-name :id]
          ["Address" event-addr street-addr :id]
          ["Type of event" event-type] 
          ["Hosted by" event-features s-name :id]
          ["Run by" event-org s-name :id] ["Event website" website]
          ["From notes on" link-to text-mentions s-name :id]
          ["More information" event-context]
          ["In email" link-to text-mentions email-subject :id]
          ["Email from" link-to text-mentions email-from s-name :id]
          ["Notes" notes] ["Notes" notes-nlp]]
   geocode [["Latitude" lat] ["Longitude" lng]
            ["Buildings at this location" has-coord street-addr :id]]})

(def exclude-edit [[notes] [notes-nlp]
                   [has-coord lat] [has-coord lng]])

(def schema-map {"PERSON" person-name "LOCATION" loc-name
                 "ORGANIZATION" org-name "MONEY" amount
                 "DATETIME" date-time "EMAIL" email-addr
                 "DATE" date-time "TIME" s-time
                 "PHONE" phone-num "DURATION" duration
                 "ADDRESS" street-addr "EVENT" event-type
                 "ZIPCODE" zipcode "URL" webpage
                 "SET" frequency "NUMBER" number
                 "PERCENT" percent "ORDINAL" ordinal})

(def no-whitespace [email-addr webpage zipcode])

(def relation-map {"EventStart" start-time "EventStop" stop-time
                   "EventDuration" duration "EventAttend" event-attend
                   "EventFeatures" event-features "EventOrg" event-org
                   "EventLocation" event-loc "EventAddr" event-addr
                   "EventType" event-type "EventCost" event-cost
                   "EventWebsite" website "EventTime" event-time
                   "Live_In" location "Located_In" located-in
                   "LocInside" loc-inside "PersonAge" age "OrgAge" age
                   "OrgBased_In" location "Work_For" org-member
                   "PersonAddr" mail-address "OrgAddr" mail-address
                   "PersonPhone" phone-num "OrgPhone" phone-num
                   "PersonWebsite" website "OrgWebsite" website
                   "EventFrequency" frequency "HasCoord" has-coord})

(def is-attr [start-time stop-time duration event-type frequency
              event-cost website event-time phone-num age
              number percent ordinal])

(def entity-map {person-name person org-name organization
                 email-addr person phone-num person
                 loc-name location date-time event
                 street-addr building zipcode location
                 coord-pair geocode})

(def label-correct {person-name s-name org-name s-name
                    loc-name s-name email-addr email-addr
                    phone-num phone-num date-time date-time
                    street-addr street-addr zipcode zipcode})

(def relation-types {[date-time s-time] ["EventStart" "EventStop" "EventTime"]
                     [date-time duration] ["EventDuration"]
                     [date-time person-name] ["EventFeatures" "EventAttend"]
                     [date-time org-name] ["EventOrg"]
                     [date-time loc-name] ["EventLocation"]
                     [date-time webpage] ["EventWebsite"]
                     [date-time street-addr] ["EventAddr"]
                     [date-time event-type] ["EventType"]
                     [date-time amount] ["EventCost"]
                     [date-time frequency] ["EventFrequency"]
                     [date-time email-addr] ["EventOrg" "EventFeatures" "EventAttend"]
                     [person-name loc-name] ["Live_In"]
                     [org-name loc-name] ["OrgBased_In"]
                     [person-name zipcode] ["Live_In"]
                     [street-addr loc-name] ["Located_In"]
                     [street-addr zipcode] ["Located_In"]
                     [loc-name loc-name] ["LocInside"]
                     [zipcode loc-name] ["LocInside"]
                     [org-name zipcode] ["OrgBased_In"]
                     [person-name org-name] ["Work_For"]
                     [email-addr org-name] ["Work_For"]
                     [org-name street-addr] ["OrgAddr"]
                     [person-name street-addr] ["PersonAddr"]
                     [person-name phone-num] ["PersonPhone"]
                     [org-name phone-num] ["OrgPhone"]
                     [person-name webpage] ["PersonWebsite"]
                     [org-name webpage] ["OrgWebsite"]
                     [email-addr loc-name] ["Live_In" "OrgBased_In"]
                     [email-addr zipcode] ["Live_In" "OrgBased_In"]
                     [email-addr street-addr] ["PersonAddr" "OrgAddr"]
                     [email-addr phone-num] ["PersonPhone" "OrgPhone"]
                     [email-addr webpage] ["PersonWebsite" "OrgWebsite"]
                     [email-addr duration] ["PersonAge" "OrgAge"]
                     [person-name duration] ["PersonAge"]
                     [org-name duration] ["OrgAge"]
                     [street-addr coord-pair] ["HasCoord"]})

(def date-times [start-time stop-time over-time date-time
                 email-sent email-received birthday
                 event-begin event-end])

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
