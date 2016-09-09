(defproject candlecrm "0.3.2"
  :description "Personal semantic graphs"
  :url "https://www.candlecrm.com"
  :license {:name "Copyright Alyssa Vance - all rights reserved"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.9.229"]
                 [org.clojure/tools.nrepl "0.2.12"]
                 [ns-tracker "0.3.0"]
                 [cheshire "5.6.3"]
                 [clj-time "0.12.0"]
                 [clj-http "3.2.0"
                  :exclusions [commons-io]]
                 [http-kit "2.2.0"]
                 [ring/ring-core "1.5.0"]
                 [ring/ring-devel "1.5.0"]
                 [ring/ring-defaults "0.2.1"]
                 [compojure "1.5.1"]
                 [hiccup "1.0.5"]
                 [environ "1.1.0"]
                 [com.taoensso/encore "2.80.1"]
                 [com.taoensso/timbre "4.7.4"]
                 [buddy "1.1.0"]
                 [com.google.api-client/google-api-client "1.22.0"
                  :exclusions [com.fasterxml.jackson.core/jackson-core
                               com.google.guava/guava-jdk5]]
                 [com.google.gdata/core "1.47.1"
                  :exclusions [com.google.code.findbugs/jsr305
                               com.google.guava/guava]]
                 [org.passay/passay "1.2.0"]
                 [com.google.apis/google-api-services-oauth2 "v2-rev118-1.22.0"]
                 [com.google.http-client/google-http-client-jackson "1.22.0"]
                 [com.sun.mail/javax.mail "1.5.5"]
                 [de.jollyday/jollyday "0.4.7"]
                 [edu.stanford.nlp/stanford-corenlp "3.6.1"]
                 [edu.stanford.nlp/stanford-corenlp "3.6.1"
                  :classifier "models"]
                 [com.googlecode.libphonenumber/libphonenumber "7.6.1"]
                 [org.deeplearning4j/deeplearning4j-core "0.5.0"
                  :exclusions [org.json/json com.google.guava/guava
                               org.apache.commons/commons-compress
                               com.fasterxml.jackson.core/jackson-core
                               org.projectlombok/lombok]]
                 [org.deeplearning4j/deeplearning4j-nlp "0.5.0"
                  :uberjar-merge-with {#"\.properties$" [slurp str spit]
                                       "reference.conf" [slurp str spit]}
                  :exclusions [com.google.code.findbugs/jsr305
                               org.eclipse.jetty/jetty-util
                               com.fasterxml.jackson.core/jackson-core
                               com.google.guava/guava]]
                 [org.nd4j/nd4j-x86 "0.4-rc3.8"
                  :exclusions [junit com.google.guava/guava
                               org.bytedeco/javacpp]]
                 [com.joestelmach/natty "0.12"]
                 [org.neo4j.driver/neo4j-java-driver "1.0.5"]
                 [pandect "0.6.0"]
                 [aysylu/loom "0.6.0"
                  :exclusions [org.clojure/data.priority-map]]
                 [com.taoensso/sente "1.10.0"
                  :exclusions [org.clojure/tools.reader]]
                 [clojurewerkz/quartzite "2.0.0"]
                 [reagent "0.6.0-rc"]
                 [jayq "2.5.4"]
                 [com.google.maps/google-maps-services "0.1.15"]
                 [nz.ac.waikato.cms.weka/weka-dev "3.7.13"]
                 [crypto-random "1.2.0"]
                 [clojure-csv/clojure-csv "2.0.2"]
                 [org.apache.commons/commons-lang3 "3.4"]
                 [com.sendgrid/sendgrid-java "2.2.2"]
                 [reagent-forms "0.5.25"
                  :exclusions [com.google.guava/guava]]
                 [org.apache.commons/commons-math3 "3.6.1"]
                 [org.bitbucket.cowwoc/diff-match-patch "1.1"]
                 [org.seleniumhq.selenium/selenium-java "2.53.1"]
                 [com.cemerick/piggieback "0.2.1"
                  :exclusions [com.google.guava/guava]]
                 [figwheel-sidecar "0.5.7"]
                 [org.jsoup/jsoup "1.9.2"]
                 [cc.mallet/mallet "2.0.8"
                  :exclusions [org.hamcrest/hamcrest-core]]
                 [org.ahocorasick/ahocorasick "0.3.0"]
                 [cpath-clj "0.1.2"]
                 [org.graylog2/gelfclient "1.4.0"]]
  :min-lein-version "2.0.0"
  :plugins [[lein-environ "1.0.3"]
            [lein-kibit "0.1.2"
             :exclusions [org.clojure/clojure]]
            [lein-figwheel "0.5.4-3"
             :exclusions [org.clojure/clojure]]
            [lein-cljsbuild "1.1.3"
             :exclusions [org.clojure/clojure]]
            [cider/cider-nrepl "0.12.0"]
            [jonase/eastwood "0.2.3"
             :exclusions [org.clojure/clojure]]
            [venantius/yagni "0.1.4"
             :exclusions [org.clojure/clojure]]
            [lein-ancient "0.6.10"]
            [lein-cloverage "1.0.6"
             :exclusions [org.clojure/clojure]]]
  :repositories {"local" ~(str (.toURI (java.io.File. "maven_repo")))}
  :resource-paths ["config" "resources"]
  :source-paths ["src"]
  :figwheel {:css-dirs ["resources/public/css"]}
  :cljsbuild {:builds
              {:dev
               {:source-paths ["src/candlecrm_cljs" "src/candlecrm_cljc"]
                :figwheel {:websocket-url "wss://www.candlecrm.com:3450/figwheel-ws"}
                :compiler {:main "candlecrm_cljs.init"
                           :asset-path "/js/dev/main"
                           :output-dir "resources/public/js/dev/main"
                           :output-to "resources/public/js/dev/main.js"
                           :optimizations :none
                           :pretty-print true}
                :jar false}
               :login
               {:source-paths ["src/candlecrm_login"]
                :compiler {:main "candlecrm_login.login"
                           :asset-path "/js/login"
                           :output-dir "resources/public/js/login"
                           :output-to "resources/public/js/login.js"
                           :optimizations :simple}
                :jar true}
               :prod
               {:source-paths ["src/candlecrm_cljs" "src/candlecrm_cljc"]
                :compiler {:main "candlecrm_cljs.init"
                           :asset-path "/js/main"
                           :output-dir "resources/public/js/main"
                           :output-to "resources/public/js/main.js"
                           :optimizations :whitespace}
                :jar true}}}
  :repl-options {:init (do (set! *print-length* 60) (-main))
                 :nrepl-middleware [cemerick.piggieback/wrap-cljs-repl]
                 :timeout 120000}
  :main candlecrm.web
  :jvm-opts ["-Xmx8g" "-XX:-OmitStackTraceInFastThrow"]
  :profiles {:uberjar {:aot :all}}
  :uberjar-name "candlecrm-standalone.jar"
  :prep-tasks ["compile" ["cljsbuild" "once"]])
