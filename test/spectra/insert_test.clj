(ns spectra.insert-test
  (:require [clojure.test :refer :all]
            [spectra.insert :refer :all]
            [spectra.auth :as auth]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]
            [spectra_cljc.schema :as s]))

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")
(def alt-email "adummyemail@foo.com")

(def node1 {:label :fish :species "tuna"})
(def node2 {:label :phylum :phy-name "Vertebrates"})
(def query (str "MATCH (a)-[r:`has-phylum` {prov_test:1}]->(b)"
                " RETURN r"))

(deftest insert-destroy
  (testing "Insert and destroy some nodes"
    (def g (loom/build-graph [node1 node2]
                             [[node1 node2 {:label :has-phylum
                                            :prov_test 1}]]))

    (def user (auth/create-user! {:username test-username
                                  :password test-password}))

    (push-graph! g user s/test-src)
    (is (= 1 (count (neo4j/get-vertices user :fish {:species "tuna"}))))
    (is (= 1 (count (neo4j/get-vertices user :phylum {:phy-name "Vertebrates"}))))
    (is (= 1 (count (neo4j/cypher-query query))))

    (neo4j/delete-vertex! (first (neo4j/get-vertices user :fish {:species "tuna"})))
    (neo4j/delete-vertex! (first (neo4j/get-vertices user :phylum {:phy-name "Vertebrates"})))
    
    (is (= 0 (count (neo4j/get-vertices user :fish {:species "tuna"}))))
    (is (= 0 (count (neo4j/get-vertices user :phylum {:phy-name "Vertebrates"}))))
    (is (= 0 (count (neo4j/cypher-query query))))
    
    (auth/delete-user! (auth/lookup-user test-username))))

(deftest editing-test
  (testing "Edit things in the graph"
    (def user (auth/create-user! {:username test-username
                                  :password test-password}))

    (def u-person (->> {s/email-addr test-username}
                       (neo4j/get-vertices user s/person)
                       first))
    (is u-person)
    (is (->> {s/email-addr alt-email}
             (neo4j/get-vertices user s/person)
             count (= 0)))
    
    (is (edit-entity! user {:fields {:type :person, :label :person,
                                     :id (.id u-person),
                                     :email-addr {0 alt-email}}}))

    (is (->> {s/email-addr alt-email}
             (neo4j/get-vertices user s/person)
             count (= 1)))
    (is (->> {s/email-addr test-username}
             (neo4j/get-vertices user s/person)
             count (= 0)))
    
    (auth/delete-user! (auth/lookup-user test-username))))
