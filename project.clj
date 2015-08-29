(defproject clojure-getting-started "1.0.0-SNAPSHOT"
  :description "Demo Clojure web app"
  :url "http://clojure-getting-started.herokuapp.com"
  :license {:name "Eclipse Public License v1.0"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.1.8"]
                 [ring/ring-jetty-adapter "1.2.2"]
                 [ring/ring-defaults "0.1.5"]
                 [hiccup "1.0.5"]
                 [environ "1.0.0"]
                 [com.taoensso/timbre "4.1.1"]
                 [com.cemerick/friend "0.2.1"]
                 [com.google.api-client/google-api-client "1.20.0"]
                 [com.tinkerpop.blueprints/blueprints-core "2.6.0"]
                 [com.tinkerpop.gremlin/gremlin-java "2.6.0"]
                 [com.orientechnologies/orientdb-core "2.1.0"]
                 [com.orientechnologies/orientdb-graphdb "2.1.0"]
                 [com.orientechnologies/orientdb-client "2.1.0"]
                 [com.orientechnologies/orientdb-enterprise "2.1.0"]
                 [org.passay/passay "1.1.0"]
                 [com.google.apis/google-api-services-oauth2 "v2-rev93-1.20.0"]
                 [com.google.http-client/google-http-client-jackson "1.20.0"]
                 [com.sun.mail/javax.mail "1.5.4"]
                 [edu.stanford.nlp/stanford-corenlp "3.5.2"]
                 [edu.stanford.nlp/stanford-corenlp "3.5.2" :classifier "models"]
                 [com.googlecode.libphonenumber/libphonenumber "7.0.9"]]
  :min-lein-version "2.0.0"
  :plugins [[lein-environ "1.0.0"]
            [lein-ring "0.9.6"]]
  :ring {:handler clojure-getting-started.web/secure-app
         :init clojure-getting-started.web/app-init
         :destroy clojure-getting-started.web/app-shutdown
         :nrepl {:start? true
                 :port 9998}}
  :uberjar-name "clojure-getting-started-standalone.jar"
  :profiles {:production {:env {:production true}}})
