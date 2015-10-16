(defproject spectra "0.0.3"
  :description "Personal semantic graphs"
  :url "http://spectra.herokuapp.com"
  :license {:name "Copyright Alyssa Vance - all rights reserved"}
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.48"]
                 [org.clojure/tools.nrepl "0.2.11"]
                 [http-kit "2.1.19"]
                 [ring/ring-core "1.4.0"]
                 [ring/ring-devel "1.4.0"]
                 [ring/ring-defaults "0.1.5"]
                 [compojure "1.4.0"]
                 [hiccup "1.0.5"]
                 [environ "1.0.1"]
                 [com.taoensso/timbre "4.1.2"]
                 [com.cemerick/friend "0.2.1"
                  :exclusions [org.apache.httpcomponents/httpclient
                               org.apache.httpcomponents/httpcore
                               org.clojure/core.cache
                               commons-logging
                               commons-codec]]
                 [com.google.api-client/google-api-client "1.20.0"]
                 [com.google.gdata/core "1.47.1"
                  :exclusions [com.google.guava/guava
                               com.google.code.findbugs/jsr305]]
                 [org.passay/passay "1.1.0"]
                 [com.google.apis/google-api-services-oauth2 "v2-rev94-1.20.0"]
                 [com.google.http-client/google-http-client-jackson "1.20.0"
                  :exclusions [org.apache.httpcomponents/httpclient]]
                 [com.sun.mail/javax.mail "1.5.4"]
                 ;; See http://www.thesoftwaresimpleton.com/blog/2014/12/06/om-local/
                 ;; for how to include local source code
                 [edu.stanford.nlp/stanford-corenlp "3.5.3-SNAPSHOT"]
                 [edu.stanford.nlp/stanford-corenlp "3.5.3-SNAPSHOT"
                  :classifier "models"]
                 [com.googlecode.libphonenumber/libphonenumber "7.0.11"]
                 [org.deeplearning4j/deeplearning4j-core "0.4-rc3.4"
                  :exclusions [com.google.guava/guava]]
                 [org.deeplearning4j/deeplearning4j-nlp "0.4-rc3.4"
                  :uberjar-merge-with {#"\.properties$" [slurp str spit]
                                       "reference.conf" [slurp str spit]}]
                 [org.nd4j/nd4j-jcublas-7.5 "0.4-rc3.5"]
                 [com.joestelmach/natty "0.12"]
                 [clojurewerkz/neocons "3.1.0"]
                 [pandect "0.5.4"]
                 [aysylu/loom "0.5.4"]
                 [com.taoensso/sente "1.6.0"]]
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
