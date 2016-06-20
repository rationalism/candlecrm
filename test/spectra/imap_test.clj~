(ns spectra.imap-test
  (:require [clojure.test :refer :all]
            [spectra.common :as com]
            [spectra.corenlp :as nlp]
            [spectra.loom :as loom]
            [spectra.regex :as regex]
            [spectra.weka :as weka]
            [clojure.string :as str]
            [spectra_cljc.schema :as s]
            [spectra.imap :refer :all])
  (:import [javax.mail FetchProfile Folder
            Message Message$RecipientType]
           [javax.mail.internet InternetAddress]
           [com.sun.mail.imap IMAPFolder$FetchProfileItem]))

(def test-email "I've got one open car seat leaving the reunion Sunday at 8:30 right after\r\nthe closing session, and will be making one dropoff in mountain view and a\r\nfinal stop in SF Mission District.\r\n\r\nOn Sat, Aug 22, 2015, 12:09 PM Lauren Lee <unrealeel@gmail.com> wrote:\r\n\r\n> I also could use a ride to SFO on Sunday. Flight is at 11pm so leaving\r\n> before 7:30pm.\r\n> On Sat, Aug 22, 2015 at 9:34 AM Jacob Cole <jacob@ideapad.io> wrote:\r\n>\r\n>> I need a ride back on Sunday; do you have space still?\r\n>>\r\n>> On Sat, Aug 22, 2015, 9:05 AM Paul Nakata <paulnakata@gmail.com> wrote:\r\n>>\r\n>>> I have space - we are heading back Sunday evening at 6PM. Going to SFO\r\n>>> first and then San Francisco (soma / south beach)\r\n>>>\r\n>>> Sent from my mobile\r\n>>>\r\n>>> On Aug 22, 2015, at 09:03, elityre <elityre@gmail.com> wrote:\r\n>>>\r\n>>> [I put this on the CFAR mailing list, but it is far more relevant here.]\r\n>>>\r\n>>> I have a meeting at UC Berkeley at 10:30 AM on Monday. I want to be back\r\n>>> in East Bay by 9:00 am at least. That means probably leaving *very*\r\n>>> early on Monday morning or on Sunday night. If you're heading back to East\r\n>>> Bay at those times (or at an even earlier time), and have a seat donate to\r\n>>> me, please let me know. If you know someone who fits that description,\r\n>>> please let me know.\r\n>>>\r\n>>> Thanks\r\n>>>\r\n>>> --\r\n>>> You received this message because you are subscribed to the Google\r\n>>> Groups \"CFAR Alumni Reunion 2015\" group.\r\n>>> To unsubscribe from this group and stop receiving emails from it, send\r\n>>> an email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\n>>> To post to this group, send email to\r\n>>> cfar-alumni-reunion-2015@googlegroups.com.\r\n>>> To view this discussion on the web visit\r\n>>> https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/4c45807a-d3cc-474f-a2b9-42fc19716ca3%40googlegroups.com\r\n>>> <https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/4c45807a-d3cc-474f-a2b9-42fc19716ca3%40googlegroups.com?utm_medium=email&utm_source=footer>\r\n>>> .\r\n>>> For more options, visit https://groups.google.com/d/optout.\r\n>>>\r\n>>> --\r\n>>> You received this message because you are subscribed to the Google\r\n>>> Groups \"CFAR Alumni Reunion 2015\" group.\r\n>>> To unsubscribe from this group and stop receiving emails from it, send\r\n>>> an email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\n>>> To post to this group, send email to\r\n>>> cfar-alumni-reunion-2015@googlegroups.com.\r\n>>> To view this discussion on the web visit\r\n>>> https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/6E2A311D-F8B8-4B25-936D-095F5B64AB9A%40gmail.com\r\n>>> <https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/6E2A311D-F8B8-4B25-936D-095F5B64AB9A%40gmail.com?utm_medium=email&utm_source=footer>\r\n>>> .\r\n>>> For more options, visit https://groups.google.com/d/optout.\r\n>>>\r\n>> --\r\n>> You received this message because you are subscribed to the Google Groups\r\n>> \"CFAR Alumni Reunion 2015\" group.\r\n>> To unsubscribe from this group and stop receiving emails from it, send an\r\n>> email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\n>> To post to this group, send email to\r\n>> cfar-alumni-reunion-2015@googlegroups.com.\r\n>> To view this discussion on the web visit\r\n>> https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CAPDmm83xgtevqfMhgAB%3DOfcC2scw7UYaZdhUm6erL-CY_u7J%2BA%40mail.gmail.com\r\n>> <https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CAPDmm83xgtevqfMhgAB%3DOfcC2scw7UYaZdhUm6erL-CY_u7J%2BA%40mail.gmail.com?utm_medium=email&utm_source=footer>\r\n>> .\r\n>> For more options, visit https://groups.google.com/d/optout.\r\n>>\r\n> --\r\n> You received this message because you are subscribed to the Google Groups\r\n> \"CFAR Alumni Reunion 2015\" group.\r\n> To unsubscribe from this group and stop receiving emails from it, send an\r\n> email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\n> To post to this group, send email to\r\n> cfar-alumni-reunion-2015@googlegroups.com.\r\n> To view this discussion on the web visit\r\n> https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CALk9Z5EbkMbToqTPtJEPyYrRDyezLd6-9vd%2ByVpLn4D1LFy-zQ%40mail.gmail.com\r\n> <https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CALk9Z5EbkMbToqTPtJEPyYrRDyezLd6-9vd%2ByVpLn4D1LFy-zQ%40mail.gmail.com?utm_medium=email&utm_source=footer>\r\n> .\r\n> For more options, visit https://groups.google.com/d/optout.\r\n>\r\n\r\n-- \r\nYou received this message because you are subscribed to the Google Groups \"CFAR Alumni Reunion 2015\" group.\r\nTo unsubscribe from this group and stop receiving emails from it, send an email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\nTo post to this group, send email to cfar-alumni-reunion-2015@googlegroups.com.\r\nTo view this discussion on the web visit https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CALkCt4AZZRUcx%3DZFnQbf_Gzv76AqOk9S7u%3DLUPSn_vuPqcq%3Dnw%40mail.gmail.com.\r\nFor more options, visit https://groups.google.com/d/optout.")

(def models (parse-models-fn))

(deftest email-splitting
  (testing "Split recursively"
    (is (->> test-email str/split-lines
             start-email-graph
             (recursive-split models 3)))))

(deftest email-chaining
  (testing "Turn an email into a chain"
    (is (-> test-email regex/strip-javascript
            (raw-msg-chain models)))))

(defprotocol AddressMockP
  (getAddress [this])
  (getPersonal [this]))

(defrecord AddressMock [name email]
  AddressMockP
  (getAddress [this] email)
  (getPersonal [this] name))

(defprotocol FolderMockP
  (open [this mode])
  (close [this mode])
  (isOpen [this])
  (getStore [this])
  (getMessageCount [this])
  (getUID [this message])
  (getUIDNext [this])
  (getMessageByUID [this num])
  (getMessagesByUID [this begin end]))

(defrecord FolderMock []
  FolderMockP
  (open [this mode] mode)
  (close [this mode] (not mode))
  (isOpen [this] false)
  (getStore [this] :fake-store)
  (getMessageCount [this] 0)
  (getUID [this message] 0)
  (getUIDNext [this] 1)
  (getMessageByUID [this num] :fake-message)
  (getMessagesByUID [this begin end] [:fake-message]))

(deftest folder-mock
  (testing "Mock an IMAP folder and run functions on it"
    (def mock (FolderMock. ))
    
    (is (open-folder-read! mock))
    (is (close-folder! mock))
    (is (not (folder-open? mock)))
    (is (folder-store mock))
    (is (= 0 (message-count mock)))
    (is (= 0 (last-uid mock)))
    (is (= :fake-message (get-message mock 0)))
    (is (= :fake-message (first (messages-in-range mock 0 1))))))

(defprotocol MessageMockP
  (getSubject [this])
  (getReceivedDate [this])
  (getSentDate [this])
  (getFrom [this])
  (getReplyTo [this])
  (getRecipients [this type])
  (getHeader [this type])
  (getContent [this])
  (getContentType [this]))

(defrecord MessageMock []
  MessageMockP
  (getSubject [this] "subject")
  (getReceivedDate [this] 17)
  (getSentDate [this] 17)
  (getFrom [this] [(AddressMock. "Alice" "alice@gmail.com")])
  (getReplyTo [this] [(AddressMock. "Carol" "carol@gmail.com")])
  (getRecipients [this type] [(AddressMock. "Bob" "bob@gmail.com")])
  (getHeader [this type] nil)
  (getContent [this] "message body")
  (getContentType [this] "plaintext"))

(deftest message-mock
  (testing "Mock an email message and run function on it"
    (def mock (MessageMock. ))

    (is (= "subject" (subject mock)))
    (is (= 17 (received-time mock)))
    (is (= 17 (sent-time mock)))
    (is (= "message body" (content mock)))
    (is (= "plaintext" (content-type mock)))))

(deftest infer-test
  (testing "Inference on email graphs"
    (def before-1 {:id 1 :label s/email s/email-body "some body"})
    (def before-2 {:id 2 :label s/email s/email-body "some body"})
    (def before-3 {:id 3 :label s/email :subject "some subject"
                   s/email-body "some body"})

    (def after-1 {:id 1 :label s/email s/email-body "some body"
                  :subject "some subject"})
    (def after-2 {:id 2 :label s/email s/email-body "some body"
                  :subject "some subject"})
    (def after-3 {:id 3 :label s/email  :subject "some subject"
                  s/email-body "some body"})    

    (def alice {:name "Alice"})
    (def bob {:name "Bob"})
    
    (def g1 (loom/build-graph
             [] [[before-1 before-2 s/email-reply]
                 [before-2 before-3 s/email-reply]
                 [before-1 bob s/email-from]
                 [before-2 alice s/email-from]
                 [before-3 bob s/email-from]]))

    (def g2 (loom/build-graph
             [] [[after-1 after-2 s/email-reply]
                 [after-2 after-3 s/email-reply]
                 [after-1 bob s/email-from]
                 [after-2 alice s/email-from]
                 [after-3 bob s/email-from]
                 [after-1 alice s/email-to]
                 [after-2 bob s/email-to]]))
    
    (is (-> g1 infer-email-chain infer-subject loom/edges
            (= (loom/edges g2))))))

(deftest headers-fetch-mock
  (testing "Fetch data from fake headers"
    (def mock-folder (FolderMock. ))
    (def mock-message (MessageMock. ))

    (def email {:received-date 17, :sent-date 17, :subject "subject", :email-uid 0})
    (def alice {:label :person, :email-addr "alice@gmail.com", :name "Alice"})
    (def bob {:label :person, :email-addr "bob@gmail.com", :name "Bob"})
    (def carol {:label :person, :email-addr "carol@gmail.com", :name "Carol"})

    (def expected-headers [[email bob s/email-bcc]
                           [email bob s/email-cc]
                           [email bob s/email-to]
                           [email carol s/email-replyto]
                           [email alice s/email-from]])

    (is (->> mock-folder (headers-fetch mock-message)
             headers-parse loom/edges 
             (= expected-headers)))))

(deftest merge-headers-test
  (testing "Merge header graph and email graph"
    (def email {:id 1 s/email-body "some body"})
    (def alice {:name "Alice"})
    (def bob {:name "Bob"})

    (def g1 (loom/build-graph [email] []))
    (def g2 (loom/build-graph
             [] [[{:id 1} alice s/email-to]
                 [{:id 1} bob s/email-from]]))

    (def expected-headers [[email bob s/email-from]
                           [email alice s/email-to]])
    
    (is (->> g2 (merge-bottom-headers g1)
             loom/edges (= expected-headers)))))
