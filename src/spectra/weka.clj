(ns spectra.weka
  (:require [clojure.string :as str])
  (:import [weka.classifiers.bayes NaiveBayes]
           [weka.classifiers.trees RandomForest]
           [weka.core Attribute FastVector
            DenseInstance Instances]
           [weka.core.converters TextDirectoryLoader]
           [weka.filters Filter]
           [weka.filters.unsupervised.attribute StringToWordVector]
           [java.io File FileInputStream FileOutputStream
            ObjectInputStream ObjectOutputStream]))

(def num-trees 200)

(defn attr-gen [n val]
  (cond
    (number? val)
    (Attribute. (str "attr" n))
    (string? val)
    (Attribute. (str "attr" n) (cast FastVector nil))
    :else
    (Attribute. (str "attr" n))))

(defn all-attributes [point]
  (->> point count range
       (map #(attr-gen % (nth point %)))))

(defn add-element [attrs new-attr]
  (doto attrs (.addElement new-attr)))

(defn make-attributes [points]
  (reduce #(add-element %1 %2) (FastVector. )
          (all-attributes (first points))))

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
  (if (empty? point) 00.
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

(defn load-text-dir [dir-name]
  (.getDataSet
   (doto (TextDirectoryLoader. )
     (.setDirectory (File. dir-name)))))

;; Texts must be in "Instances" format
(defn word-vec [texts]
  (Filter/useFilter
   texts (doto (StringToWordVector. )
           (.setInputFormat texts))))

(defn naive-bayes [points]
  (doto (NaiveBayes. )
    (.buildClassifier points)))
