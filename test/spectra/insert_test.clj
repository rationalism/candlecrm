(ns spectra.insert-test
  (:require [clojure.test :refer :all]
            [spectra.insert :refer :all]
            [spectra.auth :as auth]
            [spectra.loom :as loom]
            [spectra.neo4j :as neo4j]))

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

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

    (push-graph! g user)
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
    ;; TODO implement this
    ;(is (edit-entity! user {}))
    
    (auth/delete-user! (auth/lookup-user test-username))))
