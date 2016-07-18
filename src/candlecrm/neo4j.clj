(ns candlecrm.neo4j
  (:require [clojure.string :as str]
            [candlecrm.common :refer :all]
            [candlecrm_cljc.schema :as s]
            [candlecrm.environ :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [org.neo4j.driver.v1 AuthTokens GraphDatabase Values]))

(defonce conn (atom nil))
(def ^:dynamic *session* nil)
(defonce ajax-send! (atom nil))

(defn table-refresh! [user]
  (@ajax-send! (.id user) [:refresh/tables true]))

(defn user-label [user]
  (str "user_" (.id user)))

(defn prop-label [user prop]
  (str "`" (name prop) "_"
       (user-label user) "`"))

(defn deadlock-throw? [e]
  (= (type e) org.neo4j.driver.v1.exceptions.TransientException))

(defn get-graph []
  (->> (AuthTokens/basic (env :database-username)
                         (env :database-password))
       (GraphDatabase/driver (env :database-url))))

(defn graph-connect! []
  (reset! conn (get-graph)))

(defn graph-close! []
  (reset! conn nil))

(defnc get-session []
  (.session @conn))

(defmacro thread-wrap [& body]
  `(binding [*session* (get-session)]
     (let [retval# ~(add-try-catch "thread-wrap" [] body)]
       (.close *session*)
       retval#)))

(defn close-session! []
  (when *session* (.close *session*))
  (def ^:dynamic *session* nil))

(defn reset-session! []
  (close-session!)
  (def ^:dynamic *session* (get-session)))

(defn esc-token [token]
  (str "`" (name token) "`"))

(defn catch-keywords [pair]
  (update pair 1
          #(if (keyword? %) (name %) %)))

(defn filter-props [props]
  (->> (filter #(not-nil-ext? (val %)) props)
       (map catch-dates-map)
       (map catch-keywords) (into {})))

(defn to-values [params]
  (->> params filter-props (into [])
       (map #(update % 0 name)) (apply concat)
       (into-array Object) (Values/parameters)))

(defn dump-queries [queries]
  (let [logfile (str (env :log-dir) (env :cypher-log-file))]
    (spit logfile "BEGIN TRANSACTION\n\n" :append true)
    (run! #(spit logfile (str % "\n\n") :append true)
          queries)))

(defn tquery
  ([query] (.run *session* query))
  ([query params] (.run *session* query
                        (to-values params))))

(defn resp-clojure [resp]
  (->> (if (coll? resp) resp (vector resp))
       (map #(.list %))
       (mapv (fn [records]
               (map #(.asMap %) records)))))

(defnc cypher-query [query]
  #_(dump-queries [query])
  (first
   (resp-clojure
    (if (coll? query)
      (apply tquery query)
      (tquery query)))))

(defn cypher-property [prop]
  (str (esc-token (key prop)) ": {"
       (esc-token (key prop)) "}"))

(defn cypher-properties [props]
  (str "{ "
       (->> (filter val-not-nil? props)
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
        (do (->> ["Cypher query exception"
                  (.getMessage e)
                  (str "First query: " (first queries))
                  (str "Stack trace: " e)]
                 (str/join "\n") throw-error!)
            {})
        (not retry)
        (throw-warn! "Deadlock detected, not retrying")
        :else
        (do (throw-warn! "Deadlock detected, retrying")
            (Thread/sleep 20)
            (cypher-combined-tx true queries))))

(defnp start-tx []
  (.beginTransaction *session*))

(defnc cypher-combined-tx-recur [retry queries]
  #_(dump-queries queries)
  (let [tx (start-tx)]
    (try (let [resp (->> (map cypher-statement queries)
                         (map #(.run tx (first %) (second %)))
                         resp-clojure)]
           (.success tx) (.close tx) resp)
         (catch Exception e
           (.failure tx) (.close tx)
           (cypher-tx-exception retry queries e)))))

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

(defn decode-label-parts [[p1 p2]]
  [(keyword p1) (Integer/parseInt p2)])

(defn decode-label [label]
  (-> (str/replace label #"user" "")
      (str/split #"__")
      decode-label-parts reverse))

(defn get-property [vertex property]
  (->> [(str "MATCH (root) WHERE ID(root) = {id}"
             " RETURN root." (esc-token property))
        {:id (.id vertex)}]
       cypher-query first vals first))

(defn set-property! [vertex property value]
  (cypher-query
   [(str "MATCH (n) WHERE ID(n) = {id}"
         " SET n." (esc-token property)
         " = {val}")
    {:id (.id vertex) :val (catch-dates value)}]))

(defn format-link [l]
  [(.asMap l) (.startNodeId l) (.endNodeId l)
   (keyword (.type l))])

(defn all-links [ids]
  (->> (map #(vector (str "MATCH (a)-[b]-(c) WHERE " 
                          "ID(a) = {id} RETURN b")
                     {:id %}) ids)
       cypher-combined-tx (apply concat)
       (map #(get % "b")) (map format-link)))

(defn delete-property! [vertex property]
  (-> [(str "MATCH (a) WHERE ID(a) = {id}"
            " REMOVE a." (esc-token property))
       {:id (.id vertex)}]
      cypher-query))

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
  (-> vertex (.id) delete-id!))

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

(defn get-vertex-raw [class props]
  (->> [(str "MATCH (root:" (esc-token class)
             " " (cypher-properties props)
             ") RETURN root")
        props] cypher-list first))

(defn get-vertices [user class props]
  (->> (filter val-not-nil? props) (map val-query)
       (concat [(str "MATCH (root:" (prop-label user class) ")")])
       (str/join " WITH root ")
       (add-return props) cypher-list))

(defn get-vertices-class [class]
  (cypher-list (str "MATCH (root:" class ") RETURN root")))

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
   [(str "MATCH (root) WHERE ID(root) = {id}"
         " REMOVE root:" (esc-token label))
    {:id id}]))

(defn get-labels [id]
  (->> [(str "MATCH (root) WHERE ID(root) = {id}"
             " RETURN labels(root)")
        {:id id}]
       cypher-query first vals first))

(defnp norecon-ids [user class]
  (->> [(str "MATCH (root:" (prop-label user class)
             ":" (esc-token s/norecon) ") RETURN ID(root)")]
       cypher-query (mapcat vals)))

(defn replace-id [user label]
  (str/replace label (-> label decode-label first str)
               (-> user (.id) str)))

(defn switch-user! [user ids]
  (let [id-labels
        (mapvals (comp first #(filter (fn [l] (.contains l "user_")) %)
                       get-labels) ids)]
    (mapv #(apply remove-label! %) id-labels)
    (->> (fmap id-labels (partial replace-id user))
         (mapv #(apply add-label! %)))))

(defn all-constraints []
  (cypher-query "CALL db.constraints()"))

(defn drop-constraint [query]
  (-> (str "DROP " query)
      (str/replace-first #"\( " "( `")
      (str/replace-first #" \)" "` )")
      (str/replace-first #"\:" "`:`")
      (str/replace-first #"exists\(" "exists(`")
      (str/replace-first #"\." "`.")
      (str/replace-first #"ASSERT " "ASSERT `")
      (str/replace-first #"ASSERT `exists" "ASSERT exists")))

(defn drop-all-constraints! []
  (->> (all-constraints) (map vals) (map first)
       (map drop-constraint) (run! cypher-query)))