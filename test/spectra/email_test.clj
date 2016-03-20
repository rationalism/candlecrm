(ns spectra.email-test
  (:require [clojure.test :refer :all]
            [spectra.corenlp :as nlp]
            [spectra.loom :as loom]
            [spectra.regex :as regex]
            [spectra.weka :as weka]
            [clojure.string :as str]
            [spectra_cljc.schema :as s]
            [spectra.email :refer :all]))

(defn pipeline-ready [f]
  (nlp/load-pipeline!)
  (weka/load-models!)
  (f))

(use-fixtures :once pipeline-ready)

(def test-email "I've got one open car seat leaving the reunion Sunday at 8:30 right after\r\nthe closing session, and will be making one dropoff in mountain view and a\r\nfinal stop in SF Mission District.\r\n\r\nOn Sat, Aug 22, 2015, 12:09 PM Lauren Lee <unrealeel@gmail.com> wrote:\r\n\r\n> I also could use a ride to SFO on Sunday. Flight is at 11pm so leaving\r\n> before 7:30pm.\r\n> On Sat, Aug 22, 2015 at 9:34 AM Jacob Cole <jacob@ideapad.io> wrote:\r\n>\r\n>> I need a ride back on Sunday; do you have space still?\r\n>>\r\n>> On Sat, Aug 22, 2015, 9:05 AM Paul Nakata <paulnakata@gmail.com> wrote:\r\n>>\r\n>>> I have space - we are heading back Sunday evening at 6PM. Going to SFO\r\n>>> first and then San Francisco (soma / south beach)\r\n>>>\r\n>>> Sent from my mobile\r\n>>>\r\n>>> On Aug 22, 2015, at 09:03, elityre <elityre@gmail.com> wrote:\r\n>>>\r\n>>> [I put this on the CFAR mailing list, but it is far more relevant here.]\r\n>>>\r\n>>> I have a meeting at UC Berkeley at 10:30 AM on Monday. I want to be back\r\n>>> in East Bay by 9:00 am at least. That means probably leaving *very*\r\n>>> early on Monday morning or on Sunday night. If you're heading back to East\r\n>>> Bay at those times (or at an even earlier time), and have a seat donate to\r\n>>> me, please let me know. If you know someone who fits that description,\r\n>>> please let me know.\r\n>>>\r\n>>> Thanks\r\n>>>\r\n>>> --\r\n>>> You received this message because you are subscribed to the Google\r\n>>> Groups \"CFAR Alumni Reunion 2015\" group.\r\n>>> To unsubscribe from this group and stop receiving emails from it, send\r\n>>> an email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\n>>> To post to this group, send email to\r\n>>> cfar-alumni-reunion-2015@googlegroups.com.\r\n>>> To view this discussion on the web visit\r\n>>> https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/4c45807a-d3cc-474f-a2b9-42fc19716ca3%40googlegroups.com\r\n>>> <https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/4c45807a-d3cc-474f-a2b9-42fc19716ca3%40googlegroups.com?utm_medium=email&utm_source=footer>\r\n>>> .\r\n>>> For more options, visit https://groups.google.com/d/optout.\r\n>>>\r\n>>> --\r\n>>> You received this message because you are subscribed to the Google\r\n>>> Groups \"CFAR Alumni Reunion 2015\" group.\r\n>>> To unsubscribe from this group and stop receiving emails from it, send\r\n>>> an email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\n>>> To post to this group, send email to\r\n>>> cfar-alumni-reunion-2015@googlegroups.com.\r\n>>> To view this discussion on the web visit\r\n>>> https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/6E2A311D-F8B8-4B25-936D-095F5B64AB9A%40gmail.com\r\n>>> <https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/6E2A311D-F8B8-4B25-936D-095F5B64AB9A%40gmail.com?utm_medium=email&utm_source=footer>\r\n>>> .\r\n>>> For more options, visit https://groups.google.com/d/optout.\r\n>>>\r\n>> --\r\n>> You received this message because you are subscribed to the Google Groups\r\n>> \"CFAR Alumni Reunion 2015\" group.\r\n>> To unsubscribe from this group and stop receiving emails from it, send an\r\n>> email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\n>> To post to this group, send email to\r\n>> cfar-alumni-reunion-2015@googlegroups.com.\r\n>> To view this discussion on the web visit\r\n>> https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CAPDmm83xgtevqfMhgAB%3DOfcC2scw7UYaZdhUm6erL-CY_u7J%2BA%40mail.gmail.com\r\n>> <https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CAPDmm83xgtevqfMhgAB%3DOfcC2scw7UYaZdhUm6erL-CY_u7J%2BA%40mail.gmail.com?utm_medium=email&utm_source=footer>\r\n>> .\r\n>> For more options, visit https://groups.google.com/d/optout.\r\n>>\r\n> --\r\n> You received this message because you are subscribed to the Google Groups\r\n> \"CFAR Alumni Reunion 2015\" group.\r\n> To unsubscribe from this group and stop receiving emails from it, send an\r\n> email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\n> To post to this group, send email to\r\n> cfar-alumni-reunion-2015@googlegroups.com.\r\n> To view this discussion on the web visit\r\n> https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CALk9Z5EbkMbToqTPtJEPyYrRDyezLd6-9vd%2ByVpLn4D1LFy-zQ%40mail.gmail.com\r\n> <https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CALk9Z5EbkMbToqTPtJEPyYrRDyezLd6-9vd%2ByVpLn4D1LFy-zQ%40mail.gmail.com?utm_medium=email&utm_source=footer>\r\n> .\r\n> For more options, visit https://groups.google.com/d/optout.\r\n>\r\n\r\n-- \r\nYou received this message because you are subscribed to the Google Groups \"CFAR Alumni Reunion 2015\" group.\r\nTo unsubscribe from this group and stop receiving emails from it, send an email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\nTo post to this group, send email to cfar-alumni-reunion-2015@googlegroups.com.\r\nTo view this discussion on the web visit https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CALkCt4AZZRUcx%3DZFnQbf_Gzv76AqOk9S7u%3DLUPSn_vuPqcq%3Dnw%40mail.gmail.com.\r\nFor more options, visit https://groups.google.com/d/optout.")

(def test-body "Hello. My name is Alyssa Vance. My email address is alyssamvance@gmail.com; my phone number is 203-850-2427; and my website is rationalconspiracy.com. You can meet me in San Francisco, California on Tuesday at 3:30 PM.")

(deftest email-splitting
  (testing "Split recursively"
    (is (recursive-split 3 (start-email-graph (str/split-lines test-email))))))

(deftest email-chaining
  (testing "Turn an email into a chain"
    (is (-> test-email regex/strip-javascript
            raw-msg-chain message-inference))))

(deftest email-nlp
  (testing "Split an email into an NLP graph"
    (def message {s/email-body test-body s/type-label s/email})
    (def author {s/type-label s/person s/s-name "Alyssa Vance"})

    (def g1 (loom/build-graph [message author]
                              [[message author s/email-from]]))

    (def g2 (use-nlp-graph g1))))
