(ns spectra.model
  (:require [spectra.common :refer :all]
            [spectra_cljc.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [org.apache.commons.lang3 StringUtils]
           [org.bitbucket.cowwoc.diffmatchpatch DiffMatchPatch
            DiffMatchPatch$Operation]))

(def default-score 0.5)
(def str-compare-max 300)

(defn run-diff [s1 s2]
  (if (and s1 s2)
    (let [dmp (DiffMatchPatch. )
          d (.diffMain dmp s1 s2 true)]
      (.diffCleanupSemantic dmp d) d) []))

(defn str-compare-truncate [s]
  (let [cs (count s)]
    (if (<= cs (* 3 str-compare-max))
      s (str (subs s 0 str-compare-max)
             (subs s (- (/ cs 2) (/ str-compare-max 2))
                   (+ (/ cs 2) (/ str-compare-max 2)))
             (subs s (- cs str-compare-max) cs)))))

(defn diff-first [a b f]
  (if (or (not (first a))
          (not (first b)))
    default-score
    (f (first a) (first b))))

(defn diff-empty [a b f]
  (if (or (empty? a) (empty? b))
    default-score (f a b)))

(defn diff-empty-all [a b f]
  (if (or (empty? a) (empty? b)
          (every? empty? a) (every? empty? b))
    default-score
    (f a b)))

(defnp lev-distance [a b]
  (/ (StringUtils/getLevenshteinDistance a b)
     (float (max (count a) (count b)))))

(defn lev [coll1 coll2]
  (diff-empty-all
   coll1 coll2 #(->> (for [x (map str-compare-truncate %1)
                           y (map str-compare-truncate %2)]
                       (vector x y))
                     (map (fn [x] (apply lev-distance x)))
                     (apply min))))

(defn abs [a b]
  (diff-first
   a b #(Math/abs (- %1 %2))))

(defn sub [a b]
  (diff-first
   a b #(- %1 %2)))

(defn is-eq [a b]
  (diff-first
   a b #(if (= %1 %2) 1.0 0.0)))

(defn nil-test [x]
  (if (or (empty? x) (every? nil? x))
    1.0 0.0))

(defn which-nil [a b]
  (- (nil-test a) (nil-test b)))

(defn diff-second [a b]
  [a (- a b)])

(defn count-regex [regex]
  (fn [a b]
    (diff-first
     a b #(->> (map (fn [x] (re-seq regex x)) [%1 %2])
               (mapv count) (apply -)))))

(defn len-and-diff [a b]
  (let [f1 (first a) f2 (first b)]
    (vector (count f1)
            (- (count f2) (count f1)))))

(defn diff-len-adj [s1 s2]
  (let [a (first s1) b (first s2)]
    (if (or (not a) (not b))
      [0.0 default-score]
      (let [diff (->> (run-diff a b)
                      (remove #(= (.-operation %)
                                  DiffMatchPatch$Operation/EQUAL))
                      (map #(.-text %)) (apply str))]
        [(min (count a) (count b))
         (/ (->> (re-seq #"\s+" diff)
                 (apply str) count (- (count diff)))
            (min (count a) (count b)) 2)]))))

(defn min-len [a b]
  (diff-empty
   a b #(->> [%1 %2] (apply concat)
             (map count)
             (apply min))))

(defn overlap [a b]
  (diff-empty
   a b #(/ (->> (concat %1 %2) distinct count
                (- (+ (count %1) (count %2)))
                double)
           (->> [%1 %2] (map count)
                (apply min) double))))

(defn max-lcs [coll1 coll2 s]
  (->> (concat coll1 coll2)
       (map count) (apply min)
       (/ (count s))))

(defn lcs-pair [a b]
  (->> (run-diff a b)
       (filter #(= (.-operation %)
                   DiffMatchPatch$Operation/EQUAL))
       (map #(.-text %)) (apply str)))

(defn lcs-coll [coll]
  (reduce lcs-pair coll))

(defn lcs [coll1 coll2]
  (diff-empty-all
   coll1 coll2 #(->> (concat %1 %2) lcs-coll
                     (max-lcs %1 %2))))

(defn shortest [coll1 coll2]
  (->> [coll1 coll2] flatten (map first)
       (map count) (apply min)))

(defn longest [coll1 coll2]
  (->> [coll1 coll2] flatten (map first)
       (map count) (apply max)))

(def conflicts
  {s/email [s/email-body s/email-subject s/email-sent]
   s/person []
   s/location []
   s/event []})

(def candidates
  {s/email
   [s/email-subject s/email-body
    s/email-received s/email-sent]
   s/person
   [s/s-name s/email-addr s/phone-num]
   s/tool
   [s/part-name s/catalog-name s/desc1
    s/desc2 s/item-cost]
   s/location
   [s/s-name]
   s/event
   [s/start-time s/stop-time]})

(def scoring
  {s/email
   [[[s/email-body] [is-eq min-len lcs lev diff-len-adj]]
    [[s/email-subject] [is-eq lev]]
    [[s/email-received] [abs]]
    [[s/email-sent] [abs]]
    [[s/email-from s/email-addr] [is-eq]]
    [[s/email-to s/email-addr] [is-eq]]
    [[s/email-uid] [is-eq which-nil]]]
   s/person
   [[[s/s-name] [overlap lcs lev len-and-diff]]
    [[s/email-addr] [overlap is-eq shortest]]
    [[s/phone-num] [overlap is-eq]]
    [[s/email-from s/email-sent] [overlap is-eq]]
    [[s/email-to s/email-sent] [overlap is-eq]]
    [[s/link-to s/has-link s/email-sent] [is-eq]]]
   s/tool
   [[[s/tool-category] [is-eq]]
    [[s/vendor-name] [is-eq]]
    [[s/part-name] [is-eq lcs lev]]
    [[s/catalog-name] [is-eq lcs lev]]
    [[s/desc1] [is-eq lcs lev]]
    [[s/desc2] [is-eq lcs lev]]
    [[s/item-cost] [is-eq abs]]]
   s/location
   [[[s/s-name] [is-eq lcs lev shortest]]]
   s/event
   [[[s/start-time] [is-eq abs]]
    [[s/stop-time] [is-eq abs]]]
   s/email-body
   [[[s/email-body] [(count-regex #"\s+") (count-regex #">")
                     (count-regex #"\n|\r")
                     len-and-diff diff-len-adj]]
    [[s/email-uid] [which-nil]]
    [[s/email-sent] [sub]]]
   s/email-subject
   [[[s/email-subject] [(count-regex #"\n|\r")
                        len-and-diff diff-len-adj]]
    [[s/email-uid] [which-nil]]
    [[s/email-sent] [sub]]]
   s/email-sent
   [[[s/email-subject] [(count-regex #"\n|\r")
                        len-and-diff diff-len-adj]]
    [[s/email-uid] [which-nil]]
    [[s/email-sent] [sub]]
    [[s/email-received] [which-nil]]]})




