(ns spectra.recon
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [spectra.common :as com]
            [spectra.corenlp :as nlp]
            [spectra.datetime :as dt]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)]))

(defn create-user! [user]
  (neo4j/create-vertex! s/user 
   {s/email-addr (:identity user)
    s/pwd-hash (:password user)}))
  
(defn create-person! [user person]
  (neo4j/create-vertex! [s/person (neo4j/user-label user)] person))
       
(defn add-user-graph! [user]
  (let [new-user (create-user! user)]
    (neo4j/create-edge! new-user
                        (->> (nlp/normalize-person nil (:identity user) s/person)
                             (create-person! new-user))
                        s/user-person)))

(defn type-query [user type-name filters]
  (str "MATCH (root:" (neo4j/cypher-esc (neo4j/user-label user))
       ":" type-name
       " ) WHERE " filters
       " RETURN root"))

(defn list-from-props [user type-name props]
  (->> (neo4j/cypher-props-any props)
       (type-query user type-name)
       neo4j/cypher-list))

(defn labeled-list-from-props [user type-name props]
  (if (or (nil? props) (empty? props)) nil
      (->> (neo4j/cypher-props-any props)
           (type-query user type-name)
           neo4j/cypher-labeled-list)))

(defn labeled-people-orgs [user props]
  (merge (labeled-list-from-props user s/person props)
         (labeled-list-from-props user s/organization props)))

(defn person-from-user [user start limit]
   (neo4j/cypher-list (str "MATCH (root:" (neo4j/cypher-esc (neo4j/user-label user))
                           ":" s/person
                           ") RETURN root"
                           " ORDER BY root." (neo4j/cypher-esc-token s/name)
                           "[0] SKIP " start " LIMIT " limit)))

;; For searching emails, in milliseconds
(def sent-tolerance 300000)

(defn lookup-old-email [message person-from]
  (when (not (or (nil? person-from)
                 (empty? person-from)
                 (nil? (:id person-from))))
    (-> (str "MATCH (root:" s/email
             " " (neo4j/cypher-properties
                  {s/email-sub-hash
                   (com/end-hash (s/email-subject message))})
             ")-[:" (neo4j/cypher-esc-token s/email-from)
             "]->(f) WHERE ID (f)=" (:id person-from)
             " AND (root." (neo4j/cypher-esc-token s/email-sent)
             " < (" (dt/to-ms (s/email-sent message)) " + " sent-tolerance
             ")) AND (root." (neo4j/cypher-esc-token s/email-sent)
             " > (" (dt/to-ms (s/email-sent message)) " - " sent-tolerance 
             ")) RETURN root")
        neo4j/cypher-list first)))

(defn list-entities [entity-class]
  (neo4j/get-vertices-class entity-class))

(defn expand-entity [entity properties]
  (merge
   (map #(assoc {} % (neo4j/get-property entity %))
        properties)))

(defn list-entities-full [entity-class properties]
  (->> (list-entities entity-class)
       (map #(expand-entity % properties))))

(defn lookup-hash [prop-name node]
  (->> node key :data prop-name
       (map #(hash-map % (hash-map (key node) (val node))))
       (apply merge)))

(defn lookup-map [prop-name nodes]
  (->> nodes
       (map #(lookup-hash prop-name %))
       (apply merge)))

(defn recon-labels [node old-labels]
  (if (and (contains? node s/name)
           (some #{s/person} old-labels)
           (= s/organization (:label node)))
    (conj (remove #(= s/person %) old-labels) s/organization)
    (:label node)))

(defn node-match [prop node-map]
  (if (coll? prop)
    (->> prop (map #(node-map %)) first first)
    (-> prop node-map first)))

(defn link-node [prop-name node-map g old-node]
  (if (or (nil? node-map) (empty? node-map)) g
      (if-let [new-node (-> old-node prop-name (node-match node-map))]
        (-> (loom/add-edges g [[old-node (key new-node) :database-match]])
            (loom/replace-node old-node (->> new-node val (recon-labels old-node)
                                             (assoc old-node :label))))
        g)))

(defn vectorize-pair [pair]
  (hash-map (key pair)
            (if (coll? (val pair)) (val pair)
                       (vector (val pair)))))

(defn vectorize-map [props]
  (->> (map vectorize-pair props)
       (apply merge)))

(defn merged-props [chain types]
  (->> (loom/nodes chain)
       (filter #(some #{(:label %)} types))
       (map #(dissoc % :label :hyperlink :hash))
       (map vectorize-map)
       (apply merge-with concat)))

(defn link-graph [type-names nodes g prop-name]
  (reduce (partial link-node prop-name
                   (lookup-map prop-name nodes))
          g (->> (loom/nodes g)
                 (filter #(some #{(:label %)} type-names)))))

(defn link-one-prop [type-name prop-name user graph]
  (link-graph [type-name]
              (labeled-list-from-props
               user type-name (merged-props graph [type-name]))
              graph prop-name))

(defn link-people [g nodes]
  (reduce (partial link-graph [s/person s/organization] nodes)
          g [s/email-addr s/phone-num s/name]))

(defn merge-edge! [match-edge]
  (->> match-edge second :data keys
       (concat (-> match-edge first keys))
       distinct
       (remove #(some #{%} [:label :hyperlink :hash]))
       (filter #(not= (-> match-edge second :data %)
                      (-> match-edge first %)))
       (map #(neo4j/merge-property-list!
              (second match-edge) %
              (-> match-edge first %))))
  (let [labels (-> match-edge first :label)]
    (when (coll? labels)
      (neo4j/replace-labels! (second match-edge) labels))))

(defn merge-graph! [g]
  (let [match-edges (->> (loom/multi-edges g)
                         (filter #(= (nth % 2) :database-match)))]
    (doall (map merge-edge! match-edges))
    (reduce #(loom/replace-node %1 (first %2) (second %2))
            (loom/remove-edges g match-edges)
            match-edges)))

(defn filter-memory [g type-name]
  (->> (loom/nodes g)
       (filter #(= (s/type-label %) type-name))
       (filter #(nil? (:data %)))))

(defn push-new! [labels old-nodes]
  (->> old-nodes
       (map #(dissoc % :label :hyperlink :hash))
       (map #(hash-map :props %))
       (map #(assoc % :labels labels))
       neo4j/batch-insert!
       (zipmap old-nodes)))

(defn load-new! [g type-name labels]
  (reduce #(loom/replace-node %1 (key %2) (val %2))
          g (push-new! labels (filter-memory g type-name))))

(defn link-new! [g type-name labels]
  (loom/add-edges g (->> (filter-memory g type-name)
                         (push-new! labels)
                         (map #(vector (key %) (val %) :database-match)))))

(defn find-old-email [g message]
   (->> (loom/out-edge-label g message s/email-from)
        second (lookup-old-email message)))

(defn find-old-emails [g]
  (let [emails (filter-memory g s/email)]
    (reduce #(if (-> %2 val nil?) %1
               (loom/replace-node %1 (key %2) (val %2)))
            g (->> emails
                   (map #(find-old-email g %))
                   (zipmap emails)))))


    
                        
                                     
