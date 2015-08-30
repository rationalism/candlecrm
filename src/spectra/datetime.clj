(ns spectra.datetime
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [com.joestelmach.natty Parser]))

;; Can only call this on short bits of text because of
;; https://github.com/joestelmach/natty/issues/128
(defn dates-in-text [text]
  (p :find-dates
     ;; This try-catch block needed because of
     ;; https://github.com/joestelmach/natty/issues/128 -
     ;; hasn't made it into the main version yet
     (try (.parse (Parser. ) text)
          (catch Exception e []))))
