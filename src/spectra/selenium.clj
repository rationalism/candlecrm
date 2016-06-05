(ns spectra.selenium
  (:require [clojure.string :as str]
            [environ.core :refer [env]]
            [spectra.common :refer :all]
            [spectra.neo4j :as neo4j])
  (:import [org.openqa.selenium.firefox FirefoxDriver]
           [org.openqa.selenium By]))

(defn start-browser []
  (let [driver (FirefoxDriver. )]
    (.get driver (env :app-domain))
    (.quit driver)))

(defn find-fn [driver]
  (fn [by] (.findElement driver by)))

(defn by-id [id]
  (By/id id))

(defn by-name [name]
  (By/name name))

(defn by-css [css]
  (By/cssSelector css))

(defn by-link [link-text]
  (By/linkText link-text))

(defn send-keys [element text]
  (.sendKeys element (into-array [(str text)])))

(def login-button
  (str "#loginForm > fieldset > div.pure-controls"
       " > input.pure-button.pure-button-primary"))

(def delete-button
  (str "button.pure-button.pure-button-primary"))

(def signup-button
  (str "input.pure-button.pure-button-primary"))

(def gmail-button
  (str "a.pure-button.pure-button-primary > h3"))

(def permission-button
  (str "submit_approve_access"))

(defn recreate-account []
  (let [driver (FirefoxDriver. )
        find (find-fn driver)]
    (.get driver (env :app-domain))
    (-> "loginUsername" by-id find (send-keys (env :test-acct-email)))
    (-> "loginPassword" by-id find (send-keys (env :test-acct-pwd)))
    (-> login-button by-css find .click)
    (-> "set-tab-5" by-id find .click)
    (-> "Close account" by-link find .click)
    (-> "yes-delete" by-id find .click)
    (-> delete-button by-css find .click)
    (Thread/sleep 2000)
    (-> "signupUsername" by-id find (send-keys (env :test-acct-email)))
    (-> "signupPassword" by-id find (send-keys (env :test-acct-pwd)))
    (-> "signupConfirm" by-id find (send-keys (env :test-acct-pwd)))
    (-> signup-button by-css find .click)
    (-> gmail-button by-css find .click)
    (-> permission-button by-id find .click)
    
    #_ (.quit driver)))
