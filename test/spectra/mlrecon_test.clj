(ns spectra.mlrecon-test
  (:require [clojure.test :refer :all]
            [spectra.auth :as auth]
            [spectra.insert :as insert]
            [spectra.loom :as loom]
            [spectra.mlrecon :refer :all]
            [spectra.neo4j :as neo4j]))

(defn graph-ready [f]
  (neo4j/define-graph!)
  (f)
  nil)

(use-fixtures :once graph-ready)

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

(def node1 {:label :fish :species "tuna"})
(def node2 {:label :phylum :phy-name "Vertebrates"})
(def node3 {:label :fish :species "salmon"})

(defn get-fish! [user]
  (def tuna (neo4j/get-vertices user :fish {:species "tuna"}))
  (def salmon (neo4j/get-vertices user :fish {:species "salmon"}))
  (def fish (neo4j/get-vertices-class (neo4j/prop-label user :fish)))
  (def phyla (neo4j/get-vertices user :phylum {:phy-name "Vertebrates"})))

(defn build-graphs! []
  (def g1 (loom/build-graph [node1 node2]
                            [[node1 node2 :has-phylum]]))
  (def g2 (loom/build-graph [node3 node2]
                            [[node3 node2 :has-phylum]]))
  
  (def user (auth/create-user! {:username test-username
                                :password test-password}))
  
  (insert/push-graph! g1 user)
  (insert/push-graph! g2 user)
  
  (get-fish! user))

(deftest merge-test
  (testing "Can we merge two nodes?"
    (build-graphs!)
    
    (is (= 1 (count tuna)))
    (is (= 1 (count salmon)))
    (is (= 2 (count fish)))
    (is (= 2 (count phyla)))

    (merge-into! (:id (first phyla)) (:id (second phyla)))
    (merge-into! (:id (first tuna)) (:id (first salmon)))

    (get-fish! user)
    (is (= 1 (count tuna)))
    (is (= 1 (count salmon)))
    (is (= 1 (count fish)))
    (is (= 1 (count phyla)))

    (neo4j/delete-vertex! (first fish))
    (neo4j/delete-vertex! (first phyla))

    (get-fish! user)
    (is (= 0 (count fish)))
    (is (= 0 (count phyla)))

    (auth/delete-user! user)))

(deftest path-fetching
  (testing "Try fetching some paths for recon"
    (def g1 (loom/build-graph [node1 node2]
                              [[node1 node2 :has-phylum]]))
    (def user (auth/create-user! {:username test-username
                                  :password test-password}))
    
    (insert/push-graph! g1 user)
    (get-fish! user)

    (is (= [["tuna"] ["Vertebrates"] []]
           (fetch-paths (:id (first fish))
                        [[:species]
                         [:has-phylum :phy-name]
                         [:notarealvalue]])))
    
    (neo4j/delete-vertex! (first fish))
    (neo4j/delete-vertex! (first phyla))
    (auth/delete-user! user)))
