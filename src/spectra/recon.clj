(ns spectra.recon
  (:require [clojure.string :as str]
            [spectra.common :as com]
            [spectra.corenlp :as nlp]
            [spectra.datetime :as dt]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]
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
    (neo4j/create-edge!
     new-user
     (->> s/person (nlp/normalize-person nil (:identity user))
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
  (when-not (or (nil? props) (empty? props))
    (->> (neo4j/cypher-props-any props)
         (type-query user type-name)
         neo4j/cypher-labeled-list)))

(defn labeled-people-orgs [user props]
  (merge (labeled-list-from-props user s/person props)
         (labeled-list-from-props user s/organization props)))

;; For searching emails, in milliseconds
(def sent-tolerance 200000)

(defn message-props [message]
  (->> message s/email-subject com/end-hash
       vector (zipmap [s/email-sub-hash])
       neo4j/cypher-properties))

(defn email-query [node-type message person-from]
  (when-not (or (nil? person-from)
                (empty? person-from)
                (nil? (:id person-from))
                (nil? (s/email-sent message)))
    (str/join
     ["MATCH (root:" node-type
      " " (message-props message)
      ")-[:" (neo4j/cypher-esc-token s/email-from)
      "]->(f) WHERE ID (f)=" (:id person-from)
      " AND (root." (neo4j/cypher-esc-token s/email-sent)
      " < (" (dt/to-ms (s/email-sent message)) " + " sent-tolerance
      ")) AND (root." (neo4j/cypher-esc-token s/email-sent)
      " > (" (dt/to-ms (s/email-sent message)) " - " sent-tolerance 
      "))"])))

(defn email-find [node-type message person-from]
  (when-let [query (email-query node-type message person-from)]
    (-> (str query " RETURN root") neo4j/cypher-list first)))

(defn email-delete! [node-type message person-from]
  (when-let [query (email-query node-type message person-from)]
    (neo4j/cypher-query (str query " DETACH DELETE root"))))

(defn list-entities [entity-class]
  (neo4j/get-vertices-class entity-class))

(defn expand-entity [entity properties]
  (->> properties
       (map #(assoc {} % (neo4j/get-property entity %)))
       (apply merge)))

(defn list-entities-full [entity-class properties]
  (map #(expand-entity % properties)
       (list-entities entity-class)))

(defn lookup-hash [prop-name node]
  (->> node key :data prop-name
       (map #(hash-map % (hash-map (key node) (val node))))
       (apply merge)))

(defn lookup-map [prop-name nodes]
  (->> nodes
       (map #(lookup-hash prop-name %))
       (apply merge)))

(defn recon-labels [node old-labels]
  (if (and (contains? node s/s-name)
           (some #{s/person} old-labels)
           (= s/organization (:label node)))
    (conj (remove #(= s/person %) old-labels) s/organization)
    (:label node)))

(defn node-match [prop node-map]
  (if (coll? prop)
    (->> prop (map node-map) ffirst)
    (-> prop node-map first)))

(defn link-node [prop-name node-map g old-node]
  (if (or (nil? node-map) (empty? node-map)
          (loom/out-edge-label g old-node :database-match)) g
      (if-let [new-node (-> old-node prop-name (node-match node-map))]
        (-> g (loom/add-edges [[old-node (key new-node) :database-match]])
            (loom/replace-node old-node (->> new-node val (recon-labels old-node)
                                             (assoc old-node :label))))
        g)))

(defn vectorize-pair [pair]
  (hash-map (key pair)
            (if (coll? (val pair)) (val pair)
                       (vector (val pair)))))

(defn vectorize-map [props]
  (apply merge (map vectorize-pair props)))

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

(defn link-one-prop [g type-name prop-name user]
  (link-graph [type-name]
              (labeled-list-from-props
               user type-name (merged-props g [type-name]))
              g prop-name))

(defn link-people [g nodes]
  (reduce (partial link-graph [s/person s/organization] nodes)
          g [s/email-addr s/phone-num s/s-name]))

(defn merge-edge! [match-edge]
  (->> match-edge second :data keys
       (concat (-> match-edge first keys))
       distinct
       (remove #(some #{%} [:label :hyperlink :hash]))
       (remove #(= (-> match-edge second :data %)
                   (-> match-edge first %)))
       (map #(neo4j/merge-property-list!
              (second match-edge) %
              (-> match-edge first %)))
       dorun)
  (let [labels (-> match-edge first :label)]
    (when (coll? labels)
      (neo4j/replace-labels! (second match-edge) labels))))

(defn merge-graph! [g]
  (p :merge-graph
     (let [match-edges (->> (loom/multi-edges g)
                            (filter #(= (nth % 2) :database-match)))]
       (dorun (map merge-edge! match-edges))
       (reduce #(loom/replace-node %1 (first %2) (second %2))
               (loom/remove-edges g match-edges)
               match-edges))))

(defn filter-type [g type-name]
  (->> (loom/nodes g)
       (filter #(= (s/type-label %) type-name))))

(defn filter-memory [g type-name]
  (->> (filter-type g type-name)
       (filter #(nil? (:data %)))
       (remove #(loom/out-edge-label g % :database-match))))

(defn push-new! [labels old-nodes]
  (if (or (nil? old-nodes) (empty? old-nodes))
    (list)
    (p :push-new
       (->> old-nodes
            (map #(dissoc % :label :hyperlink :hash))
            (map #(hash-map :props %))
            (map #(assoc % :labels labels))
            neo4j/batch-insert!
            (zipmap old-nodes)))))

(defn load-new! [g type-name labels]
  (reduce #(loom/replace-node %1 (key %2) (val %2))
          g (push-new! labels (filter-memory g type-name))))

(defn link-new! [g type-name labels]
  (loom/add-edges g (->> (filter-memory g type-name)
                         (push-new! labels)
                         (map #(vector (key %) (val %) :database-match)))))

(defn find-old-message [node-type g message]
   (->> (loom/out-edge-label g message s/email-from)
        second (email-find node-type message)))

(defn find-old-messages [g node-type]
  (p :find-old-messages
     (let [messages (filter-memory g node-type)]
       (reduce #(if (-> %2 val nil?) %1
                    (loom/replace-node %1 (key %2) (val %2)))
               g (->> messages
                      (map #(find-old-message node-type g %))
                      (zipmap messages))))))

(defn delete-headers! [g user]
  (->> (filter-memory g s/email)
       (map #(loom/out-edge-label g % s/email-from))
       (map #(email-delete! s/email-headers (first %) (second %)))
       dorun) g)

(defn name-email-map [names emails]
  (cond
    (> (count names) (count emails))
    (as-> (count names) $
      (- $ (count emails)) (repeat $ nil)
      (reduce conj emails $)
      (zipmap names $))
    (< (count names) (count emails))
    (as-> (count emails) $
      (- $ (count names)) (repeat $ nil)
      (reduce conj names $)
      (zipmap $ emails))
    :else (zipmap names emails)))

(defn map-node [node attr]
  (cond
    (nil? (attr node)) nil
    (empty? (attr node)) nil
    (coll? (attr node))
    (map #(vector % node) (attr node))
    :else (-> (attr node) (vector node) vector)))

(defn dupe-nodes [attr nodes]
  (->> (mapcat #(map-node % attr) nodes)
       (remove nil?)
       (sort-by first)
       (partition-by first)
       (remove #(< (count %) 2))
       (map #(map second %))))

(defn vectorize [node]
  (reduce
   (fn [m k] (update m k #(if (coll? %) % (vector %))))
   node (keys node)))

(defn devectorize [node]
  (reduce
   (fn [m k] (update m k #(if (some #{k} s/repeated-attr) % (first %))))
   node (keys node)))

(defn distinct-all [m]
  (reduce #(update %1 %2 distinct) m (keys m)))

(defn merge-nodes [nodes]
  (->> (map vectorize nodes)
       (apply merge-with concat)
       distinct-all
       devectorize))

(defn replace-dupes [g dupes]
  (reduce #(loom/replace-node %1 %2 (merge-nodes dupes)) g dupes))

(defn remove-dupes [g attr]
  (reduce replace-dupes g (dupe-nodes attr (loom/nodes g))))
