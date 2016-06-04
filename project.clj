(defproject spectra "0.2.2"
  :description "Personal semantic graphs"
  :url "http://spectra.herokuapp.com"
  :license {:name "Copyright Alyssa Vance - all rights reserved"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.9.36"]
                 [org.clojure/tools.nrepl "0.2.12"]
                 [ns-tracker "0.3.0"]
                 [clj-time "0.11.0"
                  :exclusions [joda-time]]
                 [clj-http "3.1.0"]
                 [http-kit "2.1.19"]
                 [ring/ring-core "1.4.0"]
                 [ring/ring-devel "1.4.0"]
                 [ring/ring-defaults "0.2.0"]
                 [compojure "1.5.0"]
                 [hiccup "1.0.5"]
                 [environ "1.0.3"]
                 [com.taoensso/timbre "4.3.1"]
                 [buddy "0.13.0"]
                 [com.google.api-client/google-api-client "1.22.0"
                  :exclusions [com.fasterxml.jackson.core/jackson-core]]
                 [com.google.gdata/core "1.47.1"
                  :exclusions [com.google.guava/guava
                               com.google.code.findbugs/jsr305]]
                 [org.passay/passay "1.1.0"]
                 [com.google.apis/google-api-services-oauth2 "v2-rev112-1.22.0"]
                 [com.google.http-client/google-http-client-jackson "1.22.0"]
                 [com.sun.mail/javax.mail "1.5.5"]
                 [edu.stanford.nlp/stanford-corenlp "3.6.0"]
                 [edu.stanford.nlp/stanford-corenlp "3.6.0"
                  :classifier "models"]
                 [com.googlecode.libphonenumber/libphonenumber "7.4.2"]
                 [org.deeplearning4j/deeplearning4j-core "0.4-rc3.9"
                  :exclusions [com.google.guava/guava org.json/json
                               com.fasterxml.jackson.core/jackson-core
                               org.apache.commons/commons-compress]]
                 [org.deeplearning4j/deeplearning4j-nlp "0.4-rc3.9"
                  :uberjar-merge-with {#"\.properties$" [slurp str spit]
                                       "reference.conf" [slurp str spit]}
                  :exclusions [com.google.guava/guava
                               com.google.code.findbugs/jsr305
                               com.fasterxml.jackson.core/jackson-core]]
                 [org.nd4j/nd4j-x86 "0.4-rc3.8"
                  :exclusions [org.bytedeco/javacpp]]
                 [com.joestelmach/natty "0.12"]
                 [org.neo4j.driver/neo4j-java-driver "1.0.2"]
                 [pandect "0.6.0"]
                 [aysylu/loom "0.6.0"]
                 [com.taoensso/sente "1.8.1"]
                 [clojurewerkz/quartzite "2.0.0"]
                 [reagent "0.5.1"]
                 [jayq "2.5.4"]
                 [com.google.maps/google-maps-services "0.1.14"]
                 [nz.ac.waikato.cms.weka/weka-dev "3.7.13"]
                 [crypto-random "1.2.0"]
                 [clojure-csv/clojure-csv "2.0.2"]
                 [org.apache.commons/commons-lang3 "3.4"]
                 [com.sendgrid/sendgrid-java "2.2.2"]
                 [reagent-forms "0.5.24"]
                 [org.apache.commons/commons-math3 "3.6.1"]
                 [org.bitbucket.cowwoc/diff-match-patch "1.1"]
                 [org.seleniumhq.selenium/selenium-java "2.53.0"]
                 [com.cemerick/piggieback "0.2.1"]
                 [figwheel-sidecar "0.5.3-2"]]
  :min-lein-version "2.0.0"
  :plugins [[lein-environ "1.0.3"]
            [lein-kibit "0.1.2"
             :exclusions [org.clojure/clojure]]
            [lein-figwheel "0.5.3-1"
             :exclusions [org.clojure/clojure]]
            [lein-cljsbuild "1.1.3"]
            [cider/cider-nrepl "0.12.0"]
            [jonase/eastwood "0.2.3"
             :exclusions [org.clojure/clojure]]
            [venantius/yagni "0.1.4"
             :exclusions [org.clojure/clojure]]
            [lein-ancient "0.6.10"]
            [lein-cloverage "1.0.6"
             :exclusions [org.clojure/clojure]]]
  :resource-paths ["config" "resources"]
  :source-paths ["src"]
  :cljsbuild {:builds
              [{:id "dev"
                :source-paths ["src/spectra_cljs" "src/spectra_cljc"]
                :figwheel {:websocket-url "wss://localhost:3450/figwheel-ws"
                           :server-port 3450}
                :compiler {:main "spectra_cljs.init"
                           :asset-path "/js/main"
                           :output-dir "resources/public/js/main"
                           :output-to "resources/public/js/main.js"
                           :optimizations :none
                           :pretty-print true}}
               {:id "login"
                :source-paths ["src/spectra_login"]
                :compiler {:main "spectra_login.login"
                           :asset-path "/js/login"
                           :output-dir "resources/public/js/login"
                           :output-to "resources/public/js/login.js"
                           :optimizations :none
                           :pretty-print true}}]}
  :repl-options {:init (set! *print-length* 50)}
  :main spectra.web
  :jvm-opts ["-Xmx3g" "-XX:-OmitStackTraceInFastThrow"]
  :uberjar-name "spectra-standalone.jar")
