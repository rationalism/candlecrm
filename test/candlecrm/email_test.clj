(ns candlecrm.email-test
  (:require [clojure.test :refer :all]
            [candlecrm.auth :as auth]
            [candlecrm.common :refer :all]
            [candlecrm.datetime :as dt]
            [candlecrm.imap :as imap]
            [candlecrm.insert :as insert]
            [candlecrm.loom :as loom]
            [candlecrm.neo4j :as neo4j]
            [candlecrm.queries :as queries]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljc.links :as links]
            [candlecrm.email :refer :all]))

(defn graph-ready [f]
  (neo4j/graph-connect!)
  (neo4j/reset-session!)
  (dt/load-date-model!)
  (auth/load-keys!)
  (f)
  (neo4j/close-session!))

(use-fixtures :once graph-ready)

(def nlp-models (nlp-models-fn))

(def test-username "someemail@foo.com")
(def test-password "notarealpassword")

(def test-body "Hello. My name is Alyssa Vance. My email address is alyssamvance@gmail.com; my phone number is 203-850-2427; and my website is rationalconspiracy.com. You can meet me in San Francisco, California on Tuesday at 3:30 PM.")

(def test-body-none "There is no content in this message.")

(def alice {s/type-label s/person s/s-name "Alice Jones"
            s/email-addr "alicejones@gmail.com"})

(def bob {s/type-label s/person s/s-name "Bob Smith"
          s/email-addr "bobsmith@gmail.com"})

(def bob-body "Hi Bob, this is Alice Jones. My website is at www.alicejones.com.")

(def email-data {s/type-label s/email s/email-subject "Hey Bob"
                 s/email-sent (ffirst (dt/unix-dates "Sat, Aug 22, 2015 at 7:51 PM" (dt/now)))
                 s/email-received (ffirst (dt/unix-dates "Sat, Aug 22, 2015 at 7:51 PM" (dt/now)))
                 s/email-uid 555555})

(def headers (loom/build-graph [] [[email-data alice s/email-from]
                                   [email-data bob s/email-to]]))

(deftest email-nlp
  (testing "Split an email into an NLP graph"
    (def message1 {s/email-body test-body s/type-label s/email
                   s/email-sent (dt/now)})
    (def message2 {s/email-body test-body-none s/type-label s/email
                   s/email-sent (dt/now)})
    (def author {s/type-label s/person s/s-name "Alyssa Vance"})

    (def g1 (loom/build-graph [message1 author]
                              [[message1 author s/email-from]]))
    (def g2 (loom/build-graph [message2 author]
                              [[message2 author s/email-from]]))

    (def r1 (make-nlp-chain nlp-models message1 g1))
    (def r2 (make-nlp-chain nlp-models message2 g2))
    (is r1)
    (is r2)))

(defn get-first [m k]
  (first (keys (get m [k]))))

(deftest edit-notes-test
  (testing "Create and edit some notes"
    (def test-user (auth/create-user! {:username test-username
                                       :password test-password}))
    (is test-user)
    (apply insert/push-graph!
           (imap/parse! nlp-models {:user test-user
                                    :message [bob-body headers]}))
    
    (let [alice-hit (->> {:query "Alice Jones"}
                         (queries/full-search test-user) first)]
      (is (= s/person (s/type-label alice-hit)))
      (is (= "Alice Jones" (get-first alice-hit s/s-name)))
      (is (= "alicejones@gmail.com" (get-first alice-hit s/email-addr))))

    (def email-id (->> {:query "Hey Bob"}
                       (queries/full-search test-user) first :id))
    (is (number? email-id))
    
    (let [email-hit (->> {:id email-id :type s/email}
                         (queries/node-by-id test-user))]
      (is (= bob-body (get-first email-hit s/email-body))))

    (run-email-nlp! nlp-models {:id email-id :user test-user})

    (let [email-hit (->> {:id email-id :type s/email}
                         (queries/node-by-id test-user))
          nlp-links (links/split-items (get-first email-hit s/body-nlp))]
      (is (= 7 (count nlp-links)))
      (is (= "Alice Jones" (:text (fourth nlp-links))))
      (let [alice-link (->> nlp-links fourth :link
                            (hash-map :id email-id :key)
                            (queries/key-link test-user))]
        (is (= "Alice Jones" (get-first alice-link s/s-name)))))
    
    (auth/delete-user! test-user)))
