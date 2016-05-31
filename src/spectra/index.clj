(ns spectra.index
  (:require [spectra.common :refer :all]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]))

(def unique-exists-vals
  [s/email-addr s/phone-num s/birthday s/gender s/occupation s/org-member
   s/mail-address s/website s/email-subject s/email-body s/email-uid
   s/email-received s/email-sent s/lat s/lng
   s/start-time s/stop-time s/s-name s/link-id 
   ;; Special for Barry's project
   s/vendor-name s/part-name s/catalog-name s/desc1 s/desc2 s/item-cost])

(def obj-types
  [s/person s/email s/location s/organization
   s/money s/amount s/event s/hyperlink])

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
  (->> (map #(val-unique "CREATE" user %) unique-exists-vals)
       neo4j/cypher-combined-tx)
  (->> (map #(val-exists "CREATE" user %) unique-exists-vals)
       neo4j/cypher-combined-tx))

(defn drop-constraints! [user]
  (->> (map #(val-unique "DROP" user %) unique-exists-vals)
       neo4j/cypher-combined-tx)
  (->> (map #(val-exists "DROP" user %) unique-exists-vals)
       neo4j/cypher-combined-tx))

(defn delete-with-prop [user prop]
  (str "MATCH (root:" (neo4j/prop-label user prop)
       ") DETACH DELETE root"))

(defn delete-all! [user]
  (->> (map #(delete-with-prop user %) unique-exists-vals)
       neo4j/cypher-combined-tx)
  (->> (map #(delete-with-prop user %) obj-types)
       neo4j/cypher-combined-tx))
