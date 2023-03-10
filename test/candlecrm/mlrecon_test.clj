(ns candlecrm.mlrecon-test
  (:require [clojure.test :refer :all]
            [candlecrm.ajax :as ajax]
            [candlecrm.auth :as auth]
            [candlecrm.insert :as insert]
            [candlecrm.loom :as loom]
            [candlecrm.mlrecon :refer :all]
            [candlecrm.neo4j :as neo4j]
            [candlecrm_cljc.schema :as s]))

(defn graph-ready [f]
  (neo4j/graph-connect!)
  (neo4j/reset-session!)
  (auth/load-keys!)
  (reset! neo4j/ajax-send! ajax/chsk-send!)
  (f)
  (neo4j/close-session!))

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
  
  (insert/push-graph! g1 user s/test-src)
  (insert/push-graph! g2 user s/test-src)
  
  (get-fish! user))

(deftest merge-test
  (testing "Can we merge two nodes?"
    (build-graphs!)
    
    (is (= 1 (count tuna)))
    (is (= 1 (count salmon)))
    (is (= 2 (count fish)))
    (is (= 2 (count phyla)))

    (->> [(first phyla) (second phyla)] (map #(.id %))
         (merge-all []) neo4j/cypher-combined-tx)
    (->> [(first tuna) (first salmon)] (map #(.id %))
         (merge-all []) neo4j/cypher-combined-tx)

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
    
    (insert/push-graph! g1 user s/test-src)
    (get-fish! user)

    (is (= [["tuna"] ["Vertebrates"] []]
           (fetch-paths (.id (first fish))
                        [[:species]
                         [:has-phylum :phy-name]
                         [:notarealvalue]])))
    
    (neo4j/delete-vertex! (first fish))
    (neo4j/delete-vertex! (first phyla))
    (auth/delete-user! user)))

(deftest samples
  (testing "Sample some things from a set without replacement"
    (is (= [26.0 [[:b 1] [:d 1] [:g 1] [:j 1] [:l 1]
                  [:o 1] [:q 1] [:t 1] [:w 1] [:y 1]]]
           (reduce (partial sample-one 10 26) [0.0 []]
                   (partition 2 (interleave [:a :b :c :d :e :f :g
                                             :h :i :j :k :l :m :n
                                             :o :p :q :r :s :t :u
                                             :v :w :x :y :z]
                                            (repeat 26 1))))))))

(deftest select-test
  (testing "Candidate selection"
    (is (= (select-candidates [[[1] 0.23] [[2] 0.23] [[4] 0.23]
                               [[5] 0.23] [[6] 0.23] [[7] 6.4]]))
        [6 7 7 7 7 7 7])))

(deftest run-recon-test
  (testing "Try running recon for a test user"
    (def user (auth/create-user! {:username test-username
                                  :password test-password}))
    
    (run-recon! user s/person)
    (auth/delete-user! user)))

(deftest entropy-test
  (testing "Binary entropy calculation"
    (is (= 0.0 (bin-entropy 0.0)))
    (is (= 0.0 (bin-entropy 1.0)))
    (is (< 0.0 (bin-entropy 0.25) (bin-entropy 0.5)))
    (is (< 0.0 (bin-entropy 0.75) (bin-entropy 0.5)))))


