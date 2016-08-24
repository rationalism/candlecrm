(ns candlecrm.model
  (:require [clojure.string :as str]
            [candlecrm.common :refer :all]
            [candlecrm_cljc.schema :as s]
            [taoensso.timbre.profiling :as profiling
             :refer (pspy pspy* profile defnp p p*)])
  (:import [org.apache.commons.lang3 StringUtils]
           [org.bitbucket.cowwoc.diffmatchpatch DiffMatchPatch
            DiffMatchPatch$Operation]))

(def default-score 0.5)
(def str-compare-max 300)

(defn str-compare-truncate [s]
  (let [cs (count s)]
    (if (<= cs (* 3 str-compare-max))
      s (str (subs s 0 str-compare-max)
             (subs s (- (/ cs 2) (/ str-compare-max 2))
                   (+ (/ cs 2) (/ str-compare-max 2)))
             (subs s (- cs str-compare-max) cs)))))

(defn run-diff [s1 s2]
  (if (and s1 s2)
    (let [dmp (DiffMatchPatch. )
          d (.diffMain dmp (str-compare-truncate s1)
                       (str-compare-truncate s2) true)]
      (.diffCleanupSemantic dmp d) d) []))

(defn diff-first [[a] [b] f]
  (if (or (not a) (not b))
    default-score (f a b)))

(defn diff-empty [a b f]
  (if (or (empty? a) (empty? b))
    default-score (f a b)))

(defn diff-empty-all [a b f]
  (if (or (empty? a) (empty? b)
          (every? empty? a) (every? empty? b))
    default-score (f a b)))

(defnp lev-distance [a b]
  (/ (StringUtils/getLevenshteinDistance a b)
     (float (max (count a) (count b)))))

(defn lev [coll1 coll2]
  (diff-empty-all
   coll1 coll2
   #(->> (for [x (map str-compare-truncate %1)
               y (map str-compare-truncate %2)]
           (vector x y))
         (map (fn [x] (apply lev-distance x)))
         (apply min))))

(defn abs [a b]
  (diff-first a b #(Math/abs (- %1 %2))))

(defn sub [a b]
  (diff-first a b #(- %1 %2)))

(defn is-eq [a b]
  (diff-first a b #(if (= %1 %2) 1.0 0.0)))

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

(defn len-and-diff [[f1] [f2]]
  (vector (count f1)
          (- (count f2) (count f1))))

(defnp diff-len-adj [[a] [b]]
  (if (or (not a) (not b))
    [0.0 default-score]
    (let [diff (->> (run-diff a b)
                    (remove #(= (.-operation %)
                                DiffMatchPatch$Operation/EQUAL))
                    (map #(.-text %)) (apply str))]
      [(min (count a) (count b))
       (/ (->> (re-seq #"\s+" diff)
               (apply str) count (- (count diff)))
          (min (count a) (count b)) 2)])))

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
  (if (and (or (nil? coll1) (empty? coll1))
           (or (nil? coll2) (empty? coll2)))
    0 (->> [coll1 coll2] (apply concat)
           (map count) (apply min))))

(defn longest [coll1 coll2]
  (if (and (or (nil? coll1) (empty? coll1))
           (or (nil? coll2) (empty? coll2)))
    0 (->> [coll1 coll2] (apply concat) (map first)
           (map count) (apply max))))

(defn bag-of-chars [s]
  (->> [#"\p{Alpha}" #"\p{Digit}" #"\p{Punct}" #"\p{Space}"]
       (map #(re-seq % s)) (map count)))

(defn count-tokens [s]
  (count (str/split s #" ")))

(defn cap-ratio [s]
  (let [tokens (remove nil? (map first (str/split s #" ")))
        upper-count (count (filter #(Character/isUpperCase %) tokens))]
    (if (> upper-count 0)
      (->> tokens (filter #(Character/isLowerCase %)) count
           (+ upper-count) (/ upper-count)) 0)))

(def views
  {s/s-name s/person s/email-addr s/person})

(def conflicts
  {s/email [s/email-body s/email-subject s/email-sent]
   s/person []
   s/location []
   s/event []
   s/building []
   s/organization []})

(def candidates
  {s/email
   [[s/email-subject s/email-subject]
    [s/email-subject 0.7]
    [s/email-body s/email-body]
    [s/email-received s/email-received]
    [s/email-received 300000]
    [s/email-sent s/email-sent]
    [s/email-sent 300000]]
   s/person
   [[s/s-name s/s-name]
    [s/s-name 0.7]
    [s/email-addr s/email-addr]
    [s/phone-num s/phone-num]
    [s/email s/email-mentions s/link-to]]
   s/organization
   [[s/s-name s/s-name]
    [s/s-name 0.7]
    [s/email-addr s/email-addr]
    [s/phone-num s/phone-num]
    [s/website s/website]
    [s/email s/email-mentions s/link-to]]
   s/location
   [[s/s-name s/s-name]
    [s/s-name 0.7]
    [s/zipcode s/zipcode]]
   s/event
   [[s/start-time s/start-time]
    [s/stop-time s/stop-time]
    [s/event-begin s/event-begin]
    [s/event-begin 20000000]
    [s/event-end s/event-end]
    [s/event-end 20000000]
    [s/event-features s/event-features s/s-name]
    [s/email s/email-mentions s/link-to]
    [s/event-context s/event-context]
    [s/event-context 0.7]
    [s/street-addr s/street-addr s/event-addr]
    [s/website s/website]]
   s/building
   [[s/street-addr s/street-addr]
    [s/street-addr 0.7]]})

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
    [[s/link-to s/email-mentions s/email-sent] [is-eq]]]
   s/tool
   [[[s/tool-category] [is-eq]]
    [[s/vendor-name] [is-eq]]
    [[s/part-name] [is-eq lcs lev]]
    [[s/catalog-name] [is-eq lcs lev]]
    [[s/desc1] [is-eq lcs lev]]
    [[s/desc2] [is-eq lcs lev]]
    [[s/item-cost] [is-eq abs]]]
   s/location
   [[[s/s-name] [is-eq lcs lev shortest]]
    [[s/zipcode] [is-eq lcs lev shortest]]
    [[s/located-in s/street-addr] [is-eq lcs lev shortest]]
    [[s/loc-inside s/s-name] [overlap lcs lev shortest]]
    [[s/link-to s/link-id] [overlap]]]
   s/event
   [[[s/start-time] [is-eq lcs lev shortest]]
    [[s/stop-time] [is-eq lcs lev shortest]]
    [[s/event-begin] [is-eq abs]]
    [[s/event-end] [is-eq abs]]
    [[s/duration] [is-eq lcs lev shortest]]
    [[s/frequency] [is-eq lcs lev shortest]]
    [[s/website] [overlap]]
    [[s/event-features s/s-name] [overlap lcs lev len-and-diff]]
    [[s/event-context] [overlap lcs lev len-and-diff]]
    [[s/event-addr s/street-addr] [overlap lcs lev len-and-diff]]
    [[s/event-org s/s-name] [overlap lcs lev len-and-diff]]
    [[s/has-minute] [which-nil]]
    [[s/has-hour] [which-nil]]
    [[s/has-day] [which-nil]]
    [[s/has-date] [which-nil]]
    [[s/has-week] [which-nil]]
    [[s/has-month] [which-nil]]
    [[s/has-year] [which-nil]]]
   s/building
   [[[s/street-addr] [is-eq lcs lev shortest]]
    [[s/located-in s/zipcode] [is-eq lcs lev shortest]]
    [[s/located-in s/s-name] [is-eq lcs lev shortest]]]
   s/organization
   [[[s/s-name] [overlap lcs lev len-and-diff]]
    [[s/website] [overlap]]
    [[s/email-addr] [overlap is-eq shortest]]
    [[s/phone-num] [overlap is-eq]]
    [[s/email-from s/email-sent] [overlap is-eq]]
    [[s/email-to s/email-sent] [overlap is-eq]]
    [[s/link-to s/email-mentions s/email-sent] [is-eq]]]
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




