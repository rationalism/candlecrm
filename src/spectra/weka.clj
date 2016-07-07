(ns spectra.weka
  (:require [clojure.string :as str]
            [clojure.edn :as edn]
            [clojure-csv.core :as csv]
            [clojure.java.io :as io]
            [environ.core :refer [env]]
            [spectra.common :refer :all]
            [spectra.async :as async]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [weka.classifiers Evaluation]
           [weka.classifiers.bayes NaiveBayes]
           [weka.classifiers.evaluation.output.prediction CSV HTML]
           [weka.classifiers.functions Logistic]
           [weka.classifiers.meta FilteredClassifier]
           [weka.classifiers.trees RandomForest]
           [weka.core Attribute FastVector
            DenseInstance Instances]
           [weka.core.converters TextDirectoryLoader]
           [weka.core.tokenizers WordTokenizer]
           [weka.filters Filter]
           [weka.filters.unsupervised.attribute StringToWordVector]
           [java.io File FileInputStream FileOutputStream
            ObjectInputStream ObjectOutputStream]))

(def num-trees 200)
(def crossval-folds 10)
(def num-threads 4)
(def token-delims " \r\n\t.,@;&_/:\"()?!\\>=")
(def models-dir (str (env :home-dir) "resources/models"))
(def email-sep-key "emailbreak")
(def traindat-temp "/tmp/traindat.txt")
(def crossval-temp "/tmp/crossval.csv")

(defn serialize [forest filename]
  (-> (FileOutputStream. filename)
      ObjectOutputStream. 
      (.writeObject forest)))

(defn deserialize-stream [stream]
  (.readObject (ObjectInputStream. stream)))

(defn deserialize [filename]
  (deserialize-stream (FileInputStream. filename)))

(defn save-traindat [traindat]
  (spit traindat-temp (vec traindat))
  traindat)

(defn load-traindat []
  (-> traindat-temp slurp edn/read-string))

(defn get-copy-fn [class dir]
  (let [model (deserialize (str dir "/" class ".dat"))]
    (fn [] (FilteredClassifier/makeCopy model))))

(defn email-sep-model-fn []
  (get-copy-fn email-sep-key models-dir))

(defn attr-gen [n]
  (Attribute. (str "attr" n)))

(defn all-attributes [point]
  (->> point count range (map attr-gen)))

(defn add-element [attrs new-attr]
  (doto attrs (.addElement new-attr)))

(defn class-vals [points]
  (->> points (map last) distinct (into '()) sort))

(defn class-attr [points]
  (Attribute. "@@class@@" (class-vals points)))

(defn make-attributes [[p1 :as points]]
  (cond (-> p1 first string?)
        (doto (FastVector. )
          (add-element (Attribute. "text" (cast FastVector nil)))
          (add-element (class-attr points)))
        (-> p1 last number?)
        (reduce #(add-element %1 %2) (FastVector. )
                (all-attributes p1))
        :else
        (reduce #(add-element %1 %2) (FastVector. )
                (-> p1 drop-last all-attributes vec
                    (conj (class-attr points))))))

(defn double-if-num [n]
  (if (number? n) (double n) n))

(defn set-value [instance [attr1 attr2]]
  (doto instance
    (.setValue attr1 (double-if-num attr2))))

(defn make-instance [dataset point]
  (reduce #(set-value %1 %2)
          (doto (DenseInstance. (count point))
            (.setDataset dataset))
          (zipvec (range (count point)) point)))

(defn add-point [instances point]
  (doto instances
    (.add (make-instance instances point))))

(defn make-instances [points]
  (doto (Instances. "training set"
                    (make-attributes points)
                    (count points))
    (.setClassIndex (-> points first count dec))))

(defn add-points [instances points]
  (reduce #(add-point %1 %2) instances points))

(defn instances [points]
  (add-points (make-instances points) points))

(defn make-forest [points]
  (doto (RandomForest. )
    (.setNumTrees num-trees)
    (.buildClassifier (instances points))))

(defn make-logit [points]
  (doto (Logistic. )
    (.buildClassifier (instances points))))

(defnp classify [model point]
  (if (empty? point) 0.0
      (.classifyInstance
       model (-> point vector make-instances
                 (make-instance point)))))

;; Texts must be in "Instances" format
(defn word-vec [texts]
  (Filter/useFilter
   texts (doto (StringToWordVector. )
           (.setAttributeIndices "first")
           (.setInputFormat texts))))

(defn load-text-dir [dir-name]
  (word-vec 
   (.getDataSet
    (doto (TextDirectoryLoader. )
      (.setDirectory (File. dir-name))))))

(defn string-to-vector []
  (doto (StringToWordVector. )
    (.setLowerCaseTokens true)
    (.setWordsToKeep 10000)
    (.setTokenizer (doto (WordTokenizer. )
                     (.setDelimiters token-delims)))))

(defn empty-bayes []
  (doto (FilteredClassifier. )
    (.setFilter (string-to-vector))
    (.setClassifier (NaiveBayes. ))))

(defn naive-bayes [points]
  (doto (empty-bayes)
    (.buildClassifier (instances points))))

(defn add-text [instances text]
  (.add instances 
        (doto (DenseInstance. 2)
          (.setDataset instances)
          (.setValue 0 text)
          (.setClassMissing))))

(defn test-attributes [bayes]
  (doto (FastVector. )
    (add-element (let [^java.util.ArrayList e nil]
                   (Attribute. "text" e)))
    (add-element (-> bayes (.getClassifier)
                     (.getHeader) (.classAttribute)))))

(defn test-instances [bayes text]
  (doto (Instances. "test set"
                    (test-attributes bayes) 1)
    (.setClassIndex 1)
    (add-text text)))

(defn classify-bayes [bayes text]
  (->> text (test-instances bayes) first
       (.distributionForInstance bayes)
       (into [])))

(defnp classify-logit [model scores]
  (let [point (if (coll? scores) scores [scores])]
    (->> (map-indexed vector point)
         (reduce #(doto %1 (.setValue (first %2) (second %2)))
                 (DenseInstance. (count point)))
         (.distributionForInstance model)
         (into []) second)))

(defn is-header? [sep-model l]
  (->> (classify-bayes sep-model l)
       second (< 0.9)))

(defn update-line [model score-line]
  (update score-line 0
          #(->> % (classify-bayes model) second)))

(defn tail-zeros [lines]
  (let [tail [[0.0 "b"] [0.0 "b"]]]
    (concat tail lines tail)))

(defn collect-lines [lines]
  (conj (mapv first lines)
        (if (= "h" (second (third lines)))
          1.0 0.0)))

;; Don't run this from REPL
;; The printout is huge and will crash Emacs
(defn train-bayes [trainfile]
  (let [lines (-> trainfile slurp edn/read-string)
        bayes-model (->> lines (apply concat) naive-bayes)
        score-lines (mapv #(mapv (partial update-line bayes-model)
                                 %) lines)]
    (->> score-lines (map tail-zeros) (map vec)
         (map #(beam 5 %)) (mapcat #(map collect-lines %))
         forest-curve (hash-map :random)
         (merge {:bayes bayes-model}))))

(defn read-trainset [filename]
  (->> (str/split (slurp filename) #"\n")
       (map edn/read-string)))

(defn pretty-classifier [classifier]
  (-> classifier prn-str (str/split #"\\n") vec))

(defn html-out [outfile]
  (doto (HTML. )
    (.setOutputFile (File. outfile))
    (.setAttributes "1-2")
    (.setBuffer (StringBuffer. ))))

(defn crossval-bayes [outfile points]
  (doto (Evaluation. points)
    (.crossValidateModel
     (empty-bayes) points
     (int crossval-folds)
     (java.util.Random. )
     (into-array Object [(html-out outfile)]))))

(defn csv-out [outfile]
  (doto (CSV. )
    (.setOutputFile (File. outfile))
    (.setBuffer (StringBuffer. ))))

(defn replace-question [s]
  (str/replace s #"\?" "0"))

(defn to-doubles [point]
  (map #(Double/parseDouble %) point))

(defn replace-class [point]
  (update (vec point) 1 #(if (>= % 0.5) "t" "f")))

(defn forest-curve [points]
  (let [traindat (instances points)]
    (doto (Evaluation. traindat)
      (.crossValidateModel
       (doto (RandomForest. )
         (.setNumTrees num-trees))
       traindat (int crossval-folds)
       (java.util.Random. )
       (into-array Object [(csv-out crossval-temp)])))
    (let [scores (slurp crossval-temp)]
      #_(io/delete-file crossval-temp)
      (->> scores csv/parse-csv rest drop-last
           (map (comp replace-class reverse to-doubles
                      #(update % 1 replace-question)
                      vec drop-last #(drop 1 %)))
           make-logit))))

(defn reverse-logit [logit y]
  (loop [x 0.5 interval 0.5]
    (cond (< interval 0.0000001) x
          (< y (classify-logit logit [(- x interval)]))
          (recur (- x interval) interval)
          (< (classify-logit logit [(+ x interval)]) y)
          (recur (+ x interval) interval)
          :else (recur x (/ interval 2.0)))))

