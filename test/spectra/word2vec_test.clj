(ns candlecrm.word2vec-test
  (:require [clojure.java.io :as io]
            [clojure.test :refer :all]
            [candlecrm.word2vec :refer :all]))

(def test-filename "test/word2vec.txt")

(def test-sentences ["He was a freshman at Harvard University in 1973." "He left Harvard to make software." "Bill Gates saw an opportunity to transform the personal computer, which used to be a hard-to-use and expensive device." "He saw that computers could be made less expensive and more easy to use." "Gates started Microsoft in 1975 with Paul Allen."])

(def test-tokens ["Bill" "Gates" "see" "a" "opportunity" "to" "transform" "the" "personal" "computer" "," "which" "use" "to" "be" "a" "hard-to-use" "and" "expensive" "device" "."])

(deftest sentence-split
  (testing "Split sentences using Stanford's CoreNLP"
    (def test-factory (-> test-filename 
                          io/resource
                          SentenceLoaderFactory))
    (is (.hasNext test-factory))
    (dotimes [i 4]
      (is (= (.nextSentence test-factory) (nth test-sentences i)))
      (is (.hasNext test-factory)))
    (is (= (.nextSentence test-factory) (nth test-sentences 4)))
    (is (not (.hasNext test-factory)))
    (.reset test-factory)
    (is (.hasNext test-factory))
    (is (= (.nextSentence test-factory) (nth test-sentences 0)))))

(deftest token-split
  (testing "Split a sentence into tokens, and lemmatize"
    (def token-store (.create (make-token-factory)
                              (nth test-sentences 2)))
    (is (.hasMoreTokens token-store))
    (is (= 21 (.countTokens token-store)))
    (dotimes [i 20]
      (is (= (.nextToken token-store) (nth test-tokens i)))
      (is (.hasMoreTokens token-store)))
    (is (= (.nextToken token-store) (nth test-tokens 20)))
    (is (not (.hasMoreTokens token-store)))))
