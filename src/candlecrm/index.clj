(ns candlecrm.index
  (:require [candlecrm.common :refer :all]
            [candlecrm.neo4j :as neo4j]
            [candlecrm_cljc.schema :as s]))

(def unique-exists-vals
  [s/email-addr s/phone-num s/birthday s/gender s/occupation s/org-member
   s/mail-address s/website s/email-subject s/email-body s/email-uid
   s/email-received s/email-sent s/lat s/lng s/date-time s/event-time
   s/start-time s/stop-time s/s-name s/street-addr s/zipcode
   s/event-begin s/event-end s/event-cost s/frequency s/duration
   s/body-nlp
   ;; Special for Barry's project
   s/vendor-name s/part-name s/catalog-name s/desc1 s/desc2 s/item-cost])

(def obj-types
  [s/person s/email s/location s/organization s/building
   s/money s/amount s/event s/hyperlink s/event-type s/link-id
   s/email-digest s/geocode s/has-minute s/has-hour s/has-date
   s/has-day s/has-week s/has-month s/has-year])

(defn val-unique [mode user prop]
  (str mode " CONSTRAINT ON (root:"
       (neo4j/prop-label user prop) ") ASSERT root."
       (neo4j/esc-token s/value) " IS UNIQUE"))

(defn val-exists [mode user prop]
  (str mode " CONSTRAINT ON (root:"
       (neo4j/prop-label user prop)
       ") ASSERT exists(root."
       (neo4j/esc-token s/value) ")"))

(defn make-constraints! [user]
  (neo4j/thread-wrap
   (->> (map #(val-unique "CREATE" user %) unique-exists-vals)
        neo4j/cypher-combined-tx)
   (->> (map #(val-exists "CREATE" user %) unique-exists-vals)
        neo4j/cypher-combined-tx)))

(defn drop-constraints! [user]
  (neo4j/thread-wrap
   (->> (map #(val-unique "DROP" user %) unique-exists-vals)
        (neo4j/cypher-combined-tx :retry))
   (->> (map #(val-exists "DROP" user %) unique-exists-vals)
        (neo4j/cypher-combined-tx :retry))))

(defn delete-with-prop [user prop]
  (str "MATCH (root:" (neo4j/prop-label user prop)
       ") DETACH DELETE root"))

(defn delete-all! [user]
  (neo4j/thread-wrap
   (->> (map #(delete-with-prop user %) unique-exists-vals)
        (neo4j/cypher-combined-tx :retry))
   (->> (map #(delete-with-prop user %) obj-types)
        (neo4j/cypher-combined-tx :retry))))
