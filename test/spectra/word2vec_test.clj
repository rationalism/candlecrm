(ns spectra.word2vec-test
  (:require [clojure.java.io :as io]
            [clojure.test :refer :all]
            [spectra.word2vec :refer :all]))

(def test-filename "test/word2vec.txt")

(def test-sentences ["He was a freshman at Harvard University in 1973." "He left Harvard to make software." "Bill Gates saw an opportunity to transform the personal computer, which used to be a hard-to-use and expensive device." "He saw that computers could be made less expensive and more easy to use." "Gates started Microsoft in 1975 with Paul Allen."])

(deftest sentence-split
  (testing "Split sentences using Stanford's CoreNLP"
    (def test-factory (-> test-filename 
                          io/resource
                          SentenceLoaderFactory))
    (is (.hasNext test-factory))
    (is (= (.nextSentence test-factory) (nth test-sentences 0)))
    (is (.hasNext test-factory))
    (is (= (.nextSentence test-factory) (nth test-sentences 1)))
    (is (.hasNext test-factory))
    (is (= (.nextSentence test-factory) (nth test-sentences 2)))
    (is (.hasNext test-factory))
    (is (= (.nextSentence test-factory) (nth test-sentences 3)))
    (is (.hasNext test-factory))
    (is (= (.nextSentence test-factory) (nth test-sentences 4)))
    (is (not (.hasNext test-factory)))
    (.reset test-factory)
    (is (.hasNext test-factory))
    (is (= (.nextSentence test-factory) (nth test-sentences 0)))))
