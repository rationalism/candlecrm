(ns spectra.email-test
  (:require [clojure.test :refer :all]
            [spectra.loom :as loom]
            [spectra_cljc.schema :as s]
            [spectra.email :refer :all]))

(def nlp-models (nlp-models-fn))

(def test-body "Hello. My name is Alyssa Vance. My email address is alyssamvance@gmail.com; my phone number is 203-850-2427; and my website is rationalconspiracy.com. You can meet me in San Francisco, California on Tuesday at 3:30 PM.")

(def test-body-none "There is no content in this message.")

(deftest email-nlp
  (testing "Split an email into an NLP graph"
    (def message1 {s/email-body test-body s/type-label s/email})
    (def message2 {s/email-body test-body-none s/type-label s/email})
    (def author {s/type-label s/person s/s-name "Alyssa Vance"})

    (def g1 (loom/build-graph [message1 author]
                              [[message1 author s/email-from]]))
    (def g2 (loom/build-graph [message2 author]
                              [[message2 author s/email-from]]))

    (def r1 (use-nlp nlp-models message1 g1))
    (def r2 (use-nlp nlp-models message2 g2))
    (is r1)
    (is (not r2))))

