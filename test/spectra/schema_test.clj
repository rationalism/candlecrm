(ns spectra.schema-test
  (:require [clojure.test :refer :all]
            [spectra.graph :as graph]
            [spectra.schema :refer :all]
            [environ.core :refer [env]]))

(defn graph-ready [f]
  (def ^:dynamic *graph* (graph/get-graph-notx))
  (f)
  (.shutdown *graph*))

(use-fixtures :once graph-ready)

(deftest schema-drop-up
  (testing "create and destroy schema"
    (is (= "remote:localhost/TestGraph" (env :database-url)))
    (drop-user-schema! *graph*)
    (init-user-schema! *graph*)))
