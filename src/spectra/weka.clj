(ns spectra.weka
  (:require [clojure.string :as str]
            [clojure.edn :as edn])
  (:import [weka.classifiers Evaluation]
           [weka.classifiers.bayes NaiveBayes]
           [weka.classifiers.evaluation.output.prediction HTML]
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
(def crossval-folds 5)
(def token-delims " \r\n\t.,@;&_/:\"()?!\\>=")

(defn attr-gen [n]
  (Attribute. (str "attr" n)))

(defn all-attributes [point]
  (->> point count range
       (map attr-gen)))

(defn add-element [attrs new-attr]
  (doto attrs (.addElement new-attr)))

(defn class-vals [points]
  (->> points (map second) 
       distinct (into '())
       sort))

(defn make-attributes [points]
  (if (-> points ffirst string?)
    (doto (FastVector. )
      (add-element (Attribute. "text" (cast FastVector nil)))
      (add-element (Attribute. "@@class@@" (class-vals points))))
    (reduce #(add-element %1 %2) (FastVector. )
            (all-attributes (first points)))))

(defn double-if-num [n]
  (if (number? n) (double n) n))

(defn set-value [instance attr-pairs]
  (doto instance
    (.setValue (first attr-pairs)
               (-> attr-pairs second double-if-num))))

(defn make-instance [dataset point]
  (reduce #(set-value %1 %2)
          (doto (DenseInstance. (count point))
            (.setDataset dataset))
          (->> point (interleave (range (count point)))
               (partition 2))))

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
  (add-points (make-instances points)
              points))

(defn make-forest [points]
  (doto (RandomForest. )
    (.setNumTrees num-trees)
    (.buildClassifier (instances points))))

(defn classify [model point]
  (if (empty? point) 0.0
      (.classifyInstance
       model (-> point vector make-instances
                 (make-instance point)))))
                     
(defn serialize [forest filename]
  (-> filename
      (FileOutputStream. )
      (ObjectOutputStream. )
      (.writeObject forest)))

(defn deserialize-stream [stream]
  (-> stream
      (ObjectInputStream. )
      (.readObject )))

(defn deserialize [filename]
  (-> filename
      (FileInputStream. )
      deserialize-stream))

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
    (add-element (Attribute. "text" (cast FastVector nil)))
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

(defn read-trainset [filename]
  (->> (str/split (slurp filename) #"\n")
       (map edn/read-string)))

(defn pretty-classifier [classifier]
  (-> classifier prn-str
      (str/split #"\\n")
      vec))

(defn html-out [outfile]
  (doto (HTML. )
    (.setOutputFile (File. outfile))
;    (.setOptions (into-array String ["-p" "1"]))
    (.setBuffer (StringBuffer. ))))

(defn crossval-bayes [outfile points]
  (doto (Evaluation. points)
    (.crossValidateModel
     (empty-bayes) points
     (int crossval-folds)
     (java.util.Random. )
     (into-array Object [(html-out outfile)]))))
