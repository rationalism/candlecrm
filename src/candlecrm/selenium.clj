(ns candlecrm.selenium
  (:require [clojure.string :as str]
            [candlecrm.environ :refer [env]]
            [candlecrm.common :refer :all]
            [candlecrm.neo4j :as neo4j])
  (:import [org.openqa.selenium.firefox FirefoxDriver FirefoxProfile]
           [org.openqa.selenium.support.ui
            ExpectedConditions WebDriverWait]
           [org.openqa.selenium By]
           [java.io File]))

(defn firefox-driver []
  (-> :firefox-profile env File.
      FirefoxProfile. FirefoxDriver.))

(defn start-browser []
  (let [driver (firefox-driver)]
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

(defn wait-fn [driver]
  (fn [by seconds]
    (-> driver (WebDriverWait. seconds)
        (.until (ExpectedConditions/visibilityOfElementLocated by)))))

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
  (let [driver (firefox-driver)
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
    (Thread/sleep 4000)
    (-> permission-button by-id find .click)
    (Thread/sleep 1000)
    (.quit driver)))

(defn neo4j-query []
  (let [driver (firefox-driver)
        find (find-fn driver) wait (wait-fn driver)]
    (.get driver (env :neo4j-browser))))
