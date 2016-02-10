(ns spectra.index
  (:require [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]))

(def unique-exists-vals
  [s/email-addr s/phone-num s/birthday s/gender s/occupation
   s/mail-address s/website s/email-subject s/email-body
   s/email-received s/email-sent s/lat s/lng
   s/start-time s/stop-time])

(defn val-unique [prop]
  (str "CREATE CONSTRAINT ON (root:"
       (neo4j/cypher-esc-token prop) ") ASSERT root."
       (neo4j/cypher-esc-token s/value) " IS UNIQUE"))

(defn val-exists [prop]
  (str "CREATE CONSTRAINT ON (root:"
       (neo4j/cypher-esc-token prop)
       ") ASSERT exists(root."
       (neo4j/cypher-esc-token s/value) ")"))

(defn make-constraints []
  (->> unique-exists-vals
       (map val-unique)
       neo4j/cypher-combined-tx)
  (->> unique-exists-vals
       (map val-exists)
       neo4j/cypher-combined-tx))
