(ns candlecrm.weka
  (:require [clojure.string :as str]
            [clojure.edn :as edn]
            [clojure-csv.core :as csv]
            [clojure.java.io :as io]
            [candlecrm.environ :refer [env]]
            [candlecrm.common :refer :all]
            [candlecrm.async :as async]
            [candlecrm.mallet :as mallet]
            [candlecrm.regex :as regex]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [java.io File]
           [weka.classifiers Evaluation]
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
           [weka.filters.unsupervised.attribute StringToWordVector]))

(def num-trees 200)
(def crossval-folds 10)
(def num-threads 4)
(def token-delims " \r\n\t.,@;&_/:\"()?!\\>=")
(def email-sep-key "emailbreak")
(def traindat-temp "/tmp/traindat.txt")
(def crossval-temp "/tmp/crossval.csv")

(defn save-traindat [traindat]
  (->> traindat (map vec) (mapv prn-str)
       (str/join " ") (#(str "[" % "]"))
       (spit traindat-temp))
  traindat)

(defn load-traindat []
  (-> traindat-temp slurp edn/read-string))

(defn get-copy-fn [class dir]
  (let [{:keys [bayes forest]}
        (->> (str dir "/" class ".dat")
             io/resource deserialize)]
    (fn [] {:bayes bayes
            :forest (RandomForest/makeCopy forest)})))

(defn email-sep-model-fn []
  (let [models-dir "models"]
    (get-copy-fn email-sep-key models-dir)))

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

(defnc classify [model point]
  (if (empty? point) 0.0
      (.classifyInstance
       model (-> point vector make-instances
                 (make-instance point)))))

(defn classify-logit [model scores]
  (let [point (if (coll? scores) scores [scores])]
    (->> (map-indexed vector point)
         (reduce #(doto %1 (.setValue (first %2) (second %2)))
                 (DenseInstance. (count point)))
         (.distributionForInstance model)
         (into []) second)))

(defn add-zeros [probs]
  (concat [0 0] (vec probs) [0 0]))

(defn header-beam [nums]
  (->> nums add-zeros vec (beam 5)))

(defn arrow-zeros [arrows]
  (concat [0] (vec arrows) [0 0 0]))

(defn arrow-beam [arrows]
  (->> arrows arrow-zeros vec (beam 5)))

(defnp header-scan [{:keys [bayes forest]} lines]
  (let [arrow-shifts (->> lines regex/arrow-shifts arrow-beam)]
    (->> lines (mallet/classify-bayes bayes) (map second) header-beam
         (mapv #(classify forest (concat %1 %2)) arrow-shifts)
         (map #(>= % 0.5)))))

(defn is-header? [sep-model l]
  (first (header-scan sep-model [l])))

(defn update-lines [model score-lines]
  (zipvec (->> score-lines (map first)
               (mallet/classify-bayes model) (map second))
          (map second score-lines)))

(defn tail-zeros [lines]
  (let [tail [[0.0 "b"] [0.0 "b"]]]
    (concat tail lines tail)))

(defn collect-lines [shifts lines]
  (conj (->> lines (map first) (concat shifts) vec)
        (if (= "h" (second (third lines)))
          1.0 0.0)))

;; Don't run this from REPL
;; The printout is huge and will crash Emacs
(defn train-bayes [trainfile]
  (let [lines (-> trainfile slurp edn/read-string)
        shift-lines (->> lines (map #(map first %))
                         (map regex/arrow-shifts) (map arrow-beam))
        bayes-model (mallet/make-bayes (apply concat lines))
        score-lines (mapv #(update-lines bayes-model %) lines)]
    (->> score-lines (map tail-zeros) (map vec) (map #(beam 5 %))
         (mapcat #(map collect-lines %1 %2) shift-lines)
         make-forest (hash-map :forest)
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
      (io/delete-file crossval-temp)
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

