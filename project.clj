(defproject spectra "0.0.3"
  :description "Personal semantic graphs"
  :url "http://spectra.herokuapp.com"
  :license {:name "Copyright Alyssa Vance - all rights reserved"}
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.145"
                  :exclusions [args4j com.google.code.findbugs/jsr305]]
                 [org.clojure/tools.nrepl "0.2.11"]
                 [http-kit "2.1.19"]
                 [ring/ring-core "1.4.0"
                  :exclusions [joda-time commons-codec]]
                 [ring/ring-devel "1.4.0"
                  :exclusions [commons-codec]]
                 [ring/ring-defaults "0.1.5"
                  :exclusions [commons-codec]]
                 [compojure "1.4.0"
                  :exclusions [commons-codec]]
                 [hiccup "1.0.5"]
                 [environ "1.0.1"]
                 [com.taoensso/timbre "4.1.4"]
                 [com.cemerick/friend "0.2.1"
                  :exclusions [slingshot commons-codec commons-logging
                               org.apache.httpcomponents/httpclient
                               org.apache.httpcomponents/httpcore]]
                 [com.google.api-client/google-api-client "1.20.0"
                  :exclusions [com.fasterxml.jackson.core/jackson-core
                               com.google.code.findbugs/jsr305]]
                 [com.google.gdata/core "1.47.1"
                  :exclusions [com.google.guava/guava org.apache.httpcomponents/httpclient
                               com.google.code.findbugs/jsr305]]
                 [org.passay/passay "1.1.0"]
                 [com.google.apis/google-api-services-oauth2 "v2-rev95-1.20.0"]
                 [com.google.http-client/google-http-client-jackson "1.20.0"
                  :exclusions [org.apache.httpcomponents/httpclient
                               com.google.code.findbugs/jsr305]]
                 [com.sun.mail/javax.mail "1.5.4"]
                 ;; See http://www.thesoftwaresimpleton.com/blog/2014/12/06/om-local/
                 ;; for how to include local source code
                 [edu.stanford.nlp/stanford-corenlp "3.5.3-SNAPSHOT"]
                 [edu.stanford.nlp/stanford-corenlp "3.5.3-SNAPSHOT"
                  :classifier "models"]
                 [com.googlecode.libphonenumber/libphonenumber "7.1.0"]
                 [org.deeplearning4j/deeplearning4j-core "0.4-rc3.4"
                  :exclusions [org.apache.commons/commons-lang3 commons-logging
                               com.fasterxml.jackson.core/jackson-core junit
                               org.apache.commons/commons-compress com.google.guava/guava]]
                 [org.deeplearning4j/deeplearning4j-nlp "0.4-rc3.4"
                  :uberjar-merge-with {#"\.properties$" [slurp str spit]
                                       "reference.conf" [slurp str spit]}
                  :exclusions [com.fasterxml.jackson.core/jackson-core
                               com.google.guava/guava commons-logging]]
                 [org.nd4j/nd4j-jcublas-7.5 "0.4-rc3.5"
                  :exclusions [com.google.guava/guava]]
                 [com.joestelmach/natty "0.12"
                  :exclusions [commons-logging commons-codec]]
                 [clojurewerkz/neocons "3.1.0"]
                 [pandect "0.5.4"]
                 [aysylu/loom "0.5.4"]]
  :min-lein-version "2.0.0"
  :plugins [[lein-environ "1.0.1"]
            [lein-cljsbuild "1.1.0"]
            [cider/cider-nrepl "0.9.1"]]
  :resource-paths ["config" "resources"]
  :repositories {"local" ~(str (.toURI (java.io.File. "maven_repo")))}
  :source-paths ["src" "src/spectra_cljs"]
  :cljsbuild {:builds
              [{:source-paths ["src/spectra_cljs"]
                :compiler {:output-to "resources/public/js/modern.js"
                           :optimizations :whitespace
                           :pretty-print true}}]}
  :main spectra.web
  :jvm-opts ["-Xmx4g"]
  :uberjar-name "spectra-standalone.jar")
