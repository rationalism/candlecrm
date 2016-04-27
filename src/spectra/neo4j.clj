(ns spectra.neo4j
  (:require [clojure.string :as str]
            [spectra.common :as com]
            [spectra.datetime :as dt]
            [spectra_cljc.schema :as s]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [org.neo4j.driver.v1 AuthTokens GraphDatabase Values]))

(defn user-label [user]
  (str "user_" (.id user)))

(defn prop-label [user prop]
  (str "`" (name prop) "_"
       (user-label user) "`"))

(defn deadlock-throw? [e]
  (.contains (.getMessage e)
             ":stackTrace \"org.neo4j.kernel.DeadlockDetectedException"))

(defn get-graph []
  (->> (AuthTokens/basic (env :database-username)
                         (env :database-password))
       (GraphDatabase/driver (env :database-url))))

(defonce conn (get-graph))
(def ^:dynamic *session* (.session conn))

(defn esc-token [token]
  (str "`" (name token) "`"))

(defn to-values [params]
  (->> params (into [])
       (map #(update % 0 name)) (apply concat)
       (into-array Object) (Values/parameters)))

(defn tquery
  ([query] (.run *session* query))
  ([query params] (.run *session* query
                        (to-values params))))

(defn resp-clojure [resp]
  (->> (if (coll? resp) resp (vector resp))
       (map #(.list %))
       (map (fn [records]
              (map #(.asMap %) records)))))

(defn cypher-query [query]
  (try
    (first
     (resp-clojure
      (if (coll? query)
        (apply tquery query)
        (tquery query))))
    (catch Exception e
      (do (println "ERROR: Cypher query invalid")
          (println "Query:" query)
          (println "Error message:" e)
          {}))))

(defn cypher-property [prop]
  (str (esc-token (key prop)) ": {"
       (esc-token (key prop)) "}"))

(defn cypher-properties [props]
  (str "{ "
       (->> props
            (filter com/val-not-nil?)
            (map cypher-property)
            (str/join ", "))
       " }"))

(defn cypher-list [query]
  (->> (cypher-query query)
       (map vals) (apply concat)))

(defn cypher-statement [cypher]
  (if (coll? cypher)
    (update cypher 1 to-values)
    [cypher (to-values [])]))

(declare cypher-combined-tx)

(defn cypher-tx-exception [retry queries e]
  (cond (not (deadlock-throw? e))
        (do (println "Cypher query exception")
            (println (.getMessage e))
            (println "First query: " (first queries))
            (println "Stack trace: " e)
            {})
        (not retry)
        (println "Deadlock detected, not retrying")
        :else
        (do (println "Deadlock detected, retrying")
            (cypher-combined-tx true queries))))

(defnp start-tx []
  (.beginTransaction *session*))

(defnp cypher-combined-tx-recur [retry queries]
  (try
    (let [tx (start-tx)
          resp (->> (map cypher-statement queries)
                    (map #(.run tx (first %) (second %)))
                    resp-clojure dorun)]
      (.success tx) (.close tx) resp)
    (catch Exception e
      (cypher-tx-exception retry queries e))))

(defn dump-queries [queries]
  (spit "/home/alyssa/cypherlog.txt" "BEGIN TRANSACTION\n\n" :append true)
  (dorun (map #(spit "/home/alyssa/cypherlog.txt"
                     (str % "\n\n") :append true)
              queries)))

(defn cypher-combined-tx
  ([queries]
   (cypher-combined-tx true queries))
  ([retry queries]
   (trampoline cypher-combined-tx-recur retry queries)))

(defnp find-by-id [id]
  (->> [(str "MATCH (a) WHERE ID(a) = {id}"
             " RETURN a")
        {:id id}]
       cypher-list first))

(defn decode-label-parts [parts]
  [(-> parts first keyword)
   (-> parts second (Integer/parseInt))])

(defn decode-label [label]
  (-> label (str/replace #"user" "")
      (str/split #"__")
      decode-label-parts reverse))

(defn get-property [vertex property]
  (->> [(str "MATCH (root) WHERE ID(root) = {id}"
             " RETURN root." (esc-token property))
        {:id (.id vertex)}]
       cypher-query
       first vals first))

(defn set-property! [vertex property value]
  (cypher-query
   [(str "MATCH (n) WHERE ID(n) = {id}"
         " SET n." (esc-token property)
         " = {val}")
    {:id (.id vertex) :val (dt/catch-dates value)}]))

(defn format-link [l]
  (vector (get l "ID(STARTNODE(b))")
          (if (= (get l "ID(STARTNODE(b))")
                 (get l "ID(a)"))
            (get l "ID(c)")
            (get l "ID(a)"))
          (keyword (get l "TYPE(b)"))))

(defn all-links [id]
  (->> [(str "MATCH (a)-[b]-(c) WHERE ID(a) = {id}" 
             " RETURN ID(STARTNODE(b)), TYPE(b), ID(a), ID(c)")
        {:id id}]
       cypher-query (map format-link)))

(defn delete-property! [vertex property]
  (-> [(str "MATCH (a) WHERE ID(a) = {id}"
            " REMOVE a." (esc-token property))
       {:id (.id vertex)}]
      cypher-query))

(defn filter-props [props]
  (->> props
       (filter #(com/not-nil-ext? (val %)))
       (into {})
       (map dt/catch-dates-map)
       (into {})))

(defn delete-id! [id]
  (cypher-query
   [(str "MATCH (root)-->(v) WHERE ID(root) = {id}"
         " AND v." (esc-token s/value)
         " IS NOT NULL WITH v MATCH (v)<--(x)"
         " WITH v, count(x) as n WHERE n = {nval} DETACH DELETE v")
    {:id id :nval 1}])
  (cypher-query
   ["MATCH (root) WHERE ID(root) = {id} DETACH DELETE root"
    {:id id}]))

(defn delete-vertex! [vertex]
  (-> vertex :id delete-id!))

(defn node-exists? [user id type]
  (->> [(str "MATCH (root:" (prop-label user type)
             ") WHERE ID(root) = {id} RETURN ID(root)")
        {:id id}]
       cypher-query first empty? not))

(defn val-query [prop]
  (str "MATCH (root)-[:" (-> prop key esc-token)
       "]-(v) WHERE v.val = {" (-> prop key esc-token) "}"))

(defn add-return [props s]
  [(str s " RETURN root") props])

(defn get-vertices [user class props]
  (->> props (filter com/val-not-nil?) (map val-query)
       (concat [(str "MATCH (root:" (prop-label user class) ")")])
       (str/join " WITH root ")
       (add-return props) cypher-list))

(defn get-vertex [class props]
  (->> [(str "MATCH (root:" (esc-token class)
             " " (cypher-properties props)
             ") RETURN root")
        props]
       cypher-list first))

(defn get-vertices-class [class]
  (cypher-list (str "MATCH (root:" class
                    ") RETURN root")))

(defn delete-class! [class]
  (cypher-query (str "MATCH (root:" class
                     ")-[v]-() DELETE root, v"))
  (cypher-query (str "MATCH (root:" class
                     ") DELETE root")))

(defnp create-edge! [out in class]
  (cypher-query
   [(str "MATCH (a) WHERE ID(a) = {outid} WITH a"
         " MATCH (b) WHERE ID(b) = {inid} WITH a, b"
         " CREATE (a)-[r:" (esc-token class) "]->(b)")
    {:outid (.id out) :inid (.id in)}]))

(defn update-vals! [id pred old-val new-val]
  (cypher-query
   [(str "MATCH (root)-[:" (esc-token pred)
         "]->(n) WHERE ID(root) = {id}"
         " AND n.val = {oldval} SET n.val = {newval}")
    {:id id :oldval old-val :newval new-val}]))

(defn add-label! [id label]
  (cypher-query
   [(str "MATCH (root) WHERE ID(root) = {id}"
         " SET root:" (esc-token label))
    {:id id}]))

(defn remove-label! [id label]
  (cypher-query
   [(str "MATCH (root) WHERE ID(root) = "
         " REMOVE root:" (esc-token label))
    {:id id}]))

(defn all-constraints []
  (cypher-query "CALL db.constraints()"))

(defn drop-constraint! [vals]
  (if (= (:type vals) "UNIQUENESS")
    (cypher-query
     (str "DROP CONSTRAINT ON (root:" (esc-token (:label vals))
          ") ASSERT root." (first (:property_keys vals)) " IS UNIQUE"))
    (cypher-query
     (str "DROP CONSTRAINT ON (root:" (esc-token (:label vals))
          ") ASSERT exists(root." (first (:property_keys vals)) ")"))))

(defn drop-all-constraints! []
  (map drop-constraint! (all-constraints)))
