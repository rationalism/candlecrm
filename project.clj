(defproject spectra "0.0.2"
  :description "Personal semantic graphs"
  :url "http://spectra.herokuapp.com"
  :license {:name "Copyright Alyssa Vance - all rights reserved"}
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [compojure "1.4.0"]
                 [ring "1.4.0"]
                 [ring/ring-defaults "0.1.5"]
                 [hiccup "1.0.5"]
                 [environ "1.0.1"]
                 [com.taoensso/timbre "4.1.1"]
                 [com.cemerick/friend "0.2.1"
                  :exclusions [org.apache.httpcomponents/httpclient
                               org.apache.httpcomponents/httpcore]]
                 [com.google.api-client/google-api-client "1.20.0"]
                 [com.google.gdata/core "1.47.1"]
                 [org.passay/passay "1.1.0"]
                 [com.google.apis/google-api-services-oauth2 "v2-rev94-1.20.0"]
                 [com.google.http-client/google-http-client-jackson "1.20.0"
                  :exclusions [org.apache.httpcomponents/httpclient]]
                 [com.sun.mail/javax.mail "1.5.4"]
                 [edu.stanford.nlp/stanford-corenlp "3.5.3-SNAPSHOT"]
                 [edu.stanford.nlp/stanford-corenlp "3.5.3-SNAPSHOT"
                  :classifier "models"]
                 [edu.stanford.nlp/stanford-corenlp "3.5.3-SNAPSHOT"
                  :classifier "srparser"]
                 [com.googlecode.libphonenumber/libphonenumber "7.0.10"]
                 [org.deeplearning4j/deeplearning4j-core "0.4-rc3.3"]
                 [com.joestelmach/natty "0.12"]
                 [clojurewerkz/neocons "3.1.0-rc1"]
                 [pandect "0.5.3"]]
  :min-lein-version "2.0.0"
  :plugins [[lein-environ "1.0.1"]
            [lein-ring "0.9.6"]]
  :resource-paths ["config" "resources"]
  :repositories {"local" ~(str (.toURI (java.io.File. "maven_repo")))}
  :ring {:handler spectra.web/secure-app
         :init spectra.web/app-init
         :destroy spectra.web/app-shutdown
         :nrepl {:start? true :port 9998}}
  :jvm-opts ["-Xmx2g"]
  :uberjar-name "spectra-standalone.jar")
