(ns spectra.weka
  (:require [clojure.string :as str])
  (:import [weka.classifiers.trees RandomForest]
           [weka.core Attribute FastVector
            DenseInstance Instances]))

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
               (second attr-pairs))))

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

(defn make-forest [numtrees points]
  (doto (RandomForest. )
    (.setNumTrees numtrees)
    (.buildClassifier
     (add-points (make-instances points)
                 points))))

(defn classify [forest point]
  (.classifyInstance
   forest (doto (make-instance point)
            (.setDataset (make-instances [point])))))
                     
