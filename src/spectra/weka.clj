(ns spectra.weka
  (:require [clojure.string :as str])
  (:import [weka.classifiers.trees RandomForest]
           [weka.core Attribute FastVector
            DenseInstance Instances]
           [weka.core.converters TextDirectoryLoader]
           [java.io File FileInputStream FileOutputStream
            ObjectInputStream ObjectOutputStream]))

(def num-trees 200)

(defn all-attributes [point]
  (->> point count range
       (map #(str "attr" %))
       (map #(Attribute. %))))

(defn add-element [attrs new-attr]
  (doto attrs (.addElement new-attr)))

(defn make-attributes [points]
  (reduce #(add-element %1 %2) (FastVector. )
          (all-attributes (first points))))

(defn set-value [instance attr-pairs]
  (doto instance
    (.setValue (first attr-pairs)
               (-> attr-pairs second double))))

(defn make-instance [point]
  (reduce #(set-value %1 %2)
          (DenseInstance. (count point))
          (->> point (interleave (range (count point)))
               (partition 2))))

(defn add-point [instances point]
  (doto instances
    (.add (make-instance point))))

(defn make-instances [points]
  (doto (Instances. "training set"
                    (make-attributes points)
                    (count points))
    (.setClassIndex (-> points first count dec))))
  
(defn add-points [instances points]
  (reduce #(add-point %1 %2) instances points))

(defn make-forest [points]
  (doto (RandomForest. )
    (.setNumTrees num-trees)
    (.buildClassifier
     (add-points (make-instances points)
                 points))))

(defn classify [forest point]
  (if (empty? point) 0.0
      (.classifyInstance
       forest (doto (make-instance point)
                (.setDataset (make-instances [point]))))))
                     
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
