(defproject spectra "0.1.1"
  :description "Personal semantic graphs"
  :url "http://spectra.herokuapp.com"
  :license {:name "Copyright Alyssa Vance - all rights reserved"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.8.34"
                  :exclusions [args4j com.google.code.findbugs/jsr305]]
                 [org.clojure/tools.nrepl "0.2.12"]
                 [ns-tracker "0.3.0"]
                 [clj-time "0.11.0"]
                 [http-kit "2.1.19"]
                 [ring/ring-core "1.4.0"
                  :exclusions [joda-time commons-codec]]
                 [ring/ring-devel "1.4.0"
                  :exclusions [commons-codec]]
                 [ring/ring-defaults "0.2.0"
                  :exclusions [commons-codec]]
                 [compojure "1.5.0"
                  :exclusions [commons-codec]]
                 [hiccup "1.0.5"]
                 [environ "1.0.2"]
                 [com.taoensso/timbre "4.3.1"]
                 [com.cemerick/friend "0.2.1"
                  :exclusions [slingshot commons-codec commons-logging
                               org.apache.httpcomponents/httpclient
                               org.apache.httpcomponents/httpcore
                               org.clojure/core.cache]]
                 [com.google.api-client/google-api-client "1.21.0"
                  :exclusions [com.fasterxml.jackson.core/jackson-core
                               com.google.code.findbugs/jsr305]]
                 [com.google.gdata/core "1.47.1"
                  :exclusions [com.google.guava/guava org.apache.httpcomponents/httpclient
                               com.google.code.findbugs/jsr305]]
                 [org.passay/passay "1.1.0"]
                 [com.google.apis/google-api-services-oauth2 "v2-rev107-1.21.0"]
                 [com.google.http-client/google-http-client-jackson "1.21.0"
                  :exclusions [org.apache.httpcomponents/httpclient
                               com.google.code.findbugs/jsr305]]
                 [com.sun.mail/javax.mail "1.5.5"]
                 [edu.stanford.nlp/stanford-corenlp "3.6.0"]
                 [edu.stanford.nlp/stanford-corenlp "3.6.0"
                  :classifier "models"]
                 [com.googlecode.libphonenumber/libphonenumber "7.2.8"]
                 [org.deeplearning4j/deeplearning4j-core "0.4-rc3.8"
                  :exclusions [org.apache.commons/commons-lang3 commons-logging
                               com.fasterxml.jackson.core/jackson-core junit
                               org.apache.commons/commons-compress com.google.guava/guava]]
                 [org.deeplearning4j/deeplearning4j-nlp "0.4-rc3.8"
                  :uberjar-merge-with {#"\.properties$" [slurp str spit]
                                       "reference.conf" [slurp str spit]}
                  :exclusions [com.fasterxml.jackson.core/jackson-core
                               com.google.guava/guava commons-logging]]
                 [org.nd4j/nd4j-x86 "0.4-rc3.8"
                  :exclusions [com.google.guava/guava]]
                 [com.joestelmach/natty "0.12"
                  :exclusions [commons-logging commons-codec]]
                 [clojurewerkz/neocons "3.1.0"]
                 [pandect "0.5.4"]
                 [aysylu/loom "0.5.4"]
                 [com.taoensso/sente "1.8.1"]
                 [clojurewerkz/quartzite "2.0.0"]
                 [reagent "0.5.1"]
                 [jayq "2.5.4"]
                 [com.google.maps/google-maps-services "0.1.12"]
                 [nz.ac.waikato.cms.weka/weka-dev "3.7.13"]
                 [crypto-random "1.2.0"]
                 [com.googlecode.concurrent-trees/concurrent-trees "2.5.0"]
                 [clojure-csv/clojure-csv "2.0.2"]
                 [org.apache.commons/commons-lang3 "3.4"]]
  :min-lein-version "2.0.0"
  :plugins [[lein-environ "1.0.2"]
            [lein-kibit "0.1.2"]
            [lein-figwheel "0.5.1"]
            [lein-cljsbuild "1.1.3"]
            [cider/cider-nrepl "0.11.0"]
            [jonase/eastwood "0.2.3"]
            [venantius/yagni "0.1.4"]
            [lein-ancient "0.6.8"]
            [lein-cloverage "1.0.6"]]
  :resource-paths ["config" "resources"]
  :source-paths ["src"]
  :cljsbuild {:builds
              [{:id "dev"
                :source-paths ["src/spectra_cljs" "src/spectra_cljc"]
                :figwheel {:websocket-url "wss://localhost:3459/figwheel-ws"}
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
  :main spectra.web
  :jvm-opts ["-Xmx3g" "-XX:-OmitStackTraceInFastThrow"]
  :uberjar-name "spectra-standalone.jar")
