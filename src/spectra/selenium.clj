(ns spectra.selenium
  (:require [clojure.string :as str]
            [environ.core :refer [env]]
            [spectra.common :refer :all])
  (:import [org.openqa.selenium.firefox FirefoxDriver]))

(defn start-browser []
  (let [driver (FirefoxDriver. )]
    (.get driver (env :app-domain))
    (.quit driver)))

