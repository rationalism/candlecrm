(ns spectra.nlptrain-test
  (:require [clojure.test :refer :all]
            [clojure.string :as str]
            [spectra.nlptrain :refer :all]))

(def test-text "The quick brown fox jumped over the lazy dog")

(deftest tokenize-test
  (testing "Tokenize a sentence"
    (with-redefs [slurp (fn [f] test-text)
                  spit (fn [f r] (def res r))]
      (tokenize "" "")
      (is (->> (str/split test-text #" ")
               (str/join "\t\n") (= res))))))
