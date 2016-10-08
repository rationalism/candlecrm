(ns candlecrm.imap-test
  (:require [clojure.test :refer :all]
            [candlecrm.corenlp :as nlp]
            [candlecrm.loom :as loom]
            [candlecrm.regex :as regex]
            [candlecrm.reply :as reply]
            [candlecrm.weka :as weka]
            [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm.common :refer :all]
            [candlecrm.imap :refer :all])
  (:import [javax.mail FetchProfile Folder
            Message Message$RecipientType]
           [javax.mail.internet InternetAddress]
           [com.sun.mail.imap IMAPFolder$FetchProfileItem]))

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

    (def email {s/email-received 17, s/email-sent 17, s/email-subject "subject",
                s/timezone (.getRawOffset (dt/zone)), s/email-uid 0, :label s/email})
    (def alice {:label s/person, s/email-addr "alice@gmail.com", s/s-name "Alice"})
    (def bob {:label s/person, s/email-addr "bob@gmail.com", s/s-name "Bob"})
    (def carol {:label s/person, s/email-addr "carol@gmail.com", s/s-name "Carol"})

    (def expected-headers [[email bob s/email-bcc]
                           [email bob s/email-cc]
                           [email bob s/email-to]
                           [email carol s/email-replyto]
                           [email alice s/email-from]])

    (is (->> mock-folder (headers-fetch mock-message)
             headers-parse loom/edges (= expected-headers)))))

