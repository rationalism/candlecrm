(ns candlecrm.reply-test
  (:require [clojure.test :refer :all]
            [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm.datetime :as dt]
            [candlecrm.loom :as loom]
            [candlecrm.regex :as regex]
            [candlecrm.reply :refer :all]))

(defn date-model [f]
  (dt/load-date-model!)
  (f) nil)

(use-fixtures :once date-model)

(def test-email "I've got one open car seat leaving the reunion Sunday at 8:30 right after\r\nthe closing session, and will be making one dropoff in mountain view and a\r\nfinal stop in SF Mission District.\r\n\r\nOn Sat, Aug 22, 2015, 12:09 PM Lauren Lee <unrealeel@gmail.com> wrote:\r\n\r\n> I also could use a ride to SFO on Sunday. Flight is at 11pm so leaving\r\n> before 7:30pm.\r\n> On Sat, Aug 22, 2015 at 9:34 AM Jacob Cole <jacob@ideapad.io> wrote:\r\n>\r\n>> I need a ride back on Sunday; do you have space still?\r\n>>\r\n>> On Sat, Aug 22, 2015, 9:05 AM Paul Nakata <paulnakata@gmail.com> wrote:\r\n>>\r\n>>> I have space - we are heading back Sunday evening at 6PM. Going to SFO\r\n>>> first and then San Francisco (soma / south beach)\r\n>>>\r\n>>> Sent from my mobile\r\n>>>\r\n>>> On Aug 22, 2015, at 09:03, elityre <elityre@gmail.com> wrote:\r\n>>>\r\n>>> [I put this on the CFAR mailing list, but it is far more relevant here.]\r\n>>>\r\n>>> I have a meeting at UC Berkeley at 10:30 AM on Monday. I want to be back\r\n>>> in East Bay by 9:00 am at least. That means probably leaving *very*\r\n>>> early on Monday morning or on Sunday night. If you're heading back to East\r\n>>> Bay at those times (or at an even earlier time), and have a seat donate to\r\n>>> me, please let me know. If you know someone who fits that description,\r\n>>> please let me know.\r\n>>>\r\n>>> Thanks\r\n>>>\r\n>>> --\r\n>>> You received this message because you are subscribed to the Google\r\n>>> Groups \"CFAR Alumni Reunion 2015\" group.\r\n>>> To unsubscribe from this group and stop receiving emails from it, send\r\n>>> an email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\n>>> To post to this group, send email to\r\n>>> cfar-alumni-reunion-2015@googlegroups.com.\r\n>>> To view this discussion on the web visit\r\n>>> https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/4c45807a-d3cc-474f-a2b9-42fc19716ca3%40googlegroups.com\r\n>>> <https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/4c45807a-d3cc-474f-a2b9-42fc19716ca3%40googlegroups.com?utm_medium=email&utm_source=footer>\r\n>>> .\r\n>>> For more options, visit https://groups.google.com/d/optout.\r\n>>>\r\n>>> --\r\n>>> You received this message because you are subscribed to the Google\r\n>>> Groups \"CFAR Alumni Reunion 2015\" group.\r\n>>> To unsubscribe from this group and stop receiving emails from it, send\r\n>>> an email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\n>>> To post to this group, send email to\r\n>>> cfar-alumni-reunion-2015@googlegroups.com.\r\n>>> To view this discussion on the web visit\r\n>>> https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/6E2A311D-F8B8-4B25-936D-095F5B64AB9A%40gmail.com\r\n>>> <https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/6E2A311D-F8B8-4B25-936D-095F5B64AB9A%40gmail.com?utm_medium=email&utm_source=footer>\r\n>>> .\r\n>>> For more options, visit https://groups.google.com/d/optout.\r\n>>>\r\n>> --\r\n>> You received this message because you are subscribed to the Google Groups\r\n>> \"CFAR Alumni Reunion 2015\" group.\r\n>> To unsubscribe from this group and stop receiving emails from it, send an\r\n>> email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\n>> To post to this group, send email to\r\n>> cfar-alumni-reunion-2015@googlegroups.com.\r\n>> To view this discussion on the web visit\r\n>> https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CAPDmm83xgtevqfMhgAB%3DOfcC2scw7UYaZdhUm6erL-CY_u7J%2BA%40mail.gmail.com\r\n>> <https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CAPDmm83xgtevqfMhgAB%3DOfcC2scw7UYaZdhUm6erL-CY_u7J%2BA%40mail.gmail.com?utm_medium=email&utm_source=footer>\r\n>> .\r\n>> For more options, visit https://groups.google.com/d/optout.\r\n>>\r\n> --\r\n> You received this message because you are subscribed to the Google Groups\r\n> \"CFAR Alumni Reunion 2015\" group.\r\n> To unsubscribe from this group and stop receiving emails from it, send an\r\n> email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\n> To post to this group, send email to\r\n> cfar-alumni-reunion-2015@googlegroups.com.\r\n> To view this discussion on the web visit\r\n> https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CALk9Z5EbkMbToqTPtJEPyYrRDyezLd6-9vd%2ByVpLn4D1LFy-zQ%40mail.gmail.com\r\n> <https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CALk9Z5EbkMbToqTPtJEPyYrRDyezLd6-9vd%2ByVpLn4D1LFy-zQ%40mail.gmail.com?utm_medium=email&utm_source=footer>\r\n> .\r\n> For more options, visit https://groups.google.com/d/optout.\r\n>\r\n\r\n-- \r\nYou received this message because you are subscribed to the Google Groups \"CFAR Alumni Reunion 2015\" group.\r\nTo unsubscribe from this group and stop receiving emails from it, send an email to cfar-alumni-reunion-2015+unsubscribe@googlegroups.com.\r\nTo post to this group, send email to cfar-alumni-reunion-2015@googlegroups.com.\r\nTo view this discussion on the web visit https://groups.google.com/d/msgid/cfar-alumni-reunion-2015/CALkCt4AZZRUcx%3DZFnQbf_Gzv76AqOk9S7u%3DLUPSn_vuPqcq%3Dnw%40mail.gmail.com.\r\nFor more options, visit https://groups.google.com/d/optout.")

(def models (parse-models-fn))

(def brayden {s/type-label s/person s/s-name "Brayden McLean"
              s/email-addr "braydenmclean@gmail.com"})

(def cfar {s/type-label s/person
           s/email-addr "cfar-alumni-reunion-2015@googlegroups.com"})

(def email-data {s/type-label s/email s/email-subject "I need a ride to East Bay earlier than a lot of people. Can anyone give me a ride?"
                 s/email-sent (ffirst (dt/unix-dates "Sat, Aug 22, 2015 at 7:51 PM" (dt/now)))
                 s/email-received (ffirst (dt/unix-dates "Sat, Aug 22, 2015 at 7:51 PM" (dt/now)))
                 s/email-uid 555555})

(def headers (loom/build-graph [] [[email-data brayden s/email-from]
                                   [email-data cfar s/email-to]
                                   [email-data cfar s/email-replyto]]))

(deftest email-chaining
  (testing "Turn email text into a chain"
    (is (->> test-email regex/strip-javascript str/split-lines
             (reply-parse models headers)))))
