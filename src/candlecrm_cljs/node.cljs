(ns candlecrm_cljs.node
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.regex :as regex]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.table :as table]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :as util]))

(def display-fields {s/person [s/s-name s/email-addr s/phone-num s/website
                               s/org-member s/birthday]
                     s/email [s/email-sent s/email-from s/email-to s/email-body]
                     s/organization [s/s-name s/email-addr s/phone-num s/website
                                     s/org-member]
                     s/location [s/s-name s/zipcode s/email-mentions]
                     s/event [s/s-name s/date-time s/event-type s/website
                              s/event-begin s/event-end
                              s/event-features s/email-mentions]
                     s/building [s/street-addr s/located-in s/email-mentions
                                 s/event-org s/mail-address s/has-coord]
                     s/geocode [s/lat s/lng s/has-coord]})

(def title-field {s/person [s/s-name s/email-addr "(No name)"]
                  s/email [s/email-subject "(No subject)"]
                  s/organization [s/s-name s/email-addr "(No name)"]
                  s/location [s/s-name "(No name)"]
                  s/building [s/street-addr "(No address)"]
                  s/event [s/s-name "(No name)"]
                  s/geocode ["Coordinate pair"]})

(defn get-title [node]
  (let [fields (-> node :center-node s/type-label title-field)]
    (loop [f fields]
      (cond (= 1 (count f)) (first f)
            (util/get-first (:center-node node) (first f))
            (util/get-first (:center-node node) (first f))
            :else (recur (rest fields))))))

(defn split-regex [s break]
  (str/split s (-> break regex/regex-escape re-pattern)))

(defn insert-breaks [strs break]
  (->> break (repeat (count strs))
       (interleave strs) drop-last))

(defn split-coll [strs break]
  (->> strs
       (map #(split-regex % break))
       (map #(insert-breaks % break))
       flatten))

(defn ids-if-coll [type m]
  (let [id-fn #(->> % util/add-ids (map vec) vec (into {}))]
    (reduce #(update %1 %2 id-fn)
            m (vec (keep (set (type table/entity-attrs))
                         (set (keys m)))))))

(defn edit-entity-switch [type]
  (state/update! [:current-node :center-node]
                 (partial ids-if-coll type))
  (state/set! [:tabid] 8))

(defn delete-entity-switch []
  (u/delete-entity!)
  (state/set! [:tabid] 1))

(defn split-many [s breaks]
  (reduce split-coll (vector s) breaks))

(defn text-keys [parsed]
  (->> parsed (map #(hash-map (:original %) %))
       (apply merge)))

(defn swap-item [item parsed]
  (if (contains? parsed item)
    (get parsed item) item))

(defn link-items [item]
  (let [parsed (-> item regex/links-parse text-keys)]
    (->> parsed keys (split-many item)
         (map #(swap-item % parsed)))))

(defn add-newlines [piece]
  [:span
   (let [n (util/add-ids (str/split piece #"\n"))]
     (for [ln n]
       ^{:key (first ln)}
       [:span (second ln)
        (when (> (dec (count n)) (first ln))
          [:br])]))])

(defn is-last? [item members]
  (= item (last members)))

(defn last-append [is-last text]
  (if is-last text (str text ", ")))

(defn body-link [piece]
  (if (string? piece)
    [add-newlines piece]
    [util/key-link (:text piece) (:link piece) (:type piece)]))

(defn body-links [item]
  [:p#email-body
   (for [piece (-> item link-items util/add-ids)]
     ^{:key (first piece)}
     [body-link (second piece)])])

(defn see-more [attr]
  [:a {:href "#" :on-click #(state/set! [:prop-filters attr] 1)}
   "(See more)"])

(defn see-all [attr]
  [:a {:href "#" :on-click #(state/set! [:prop-filters attr] 2)}
   "(See all)"])

(defn ask-more [attr]
  (if-let [filter-level (state/look :prop-filters attr)]
    (condp = filter-level
      1 [see-all attr] 2 [:div] [:div])
    [see-more attr]))

(defn map-link [item]
  [util/node-link
   (let [text-key (dissoc item :id s/type-label)]
     (->> text-key vals first (sort-by second >)
          ffirst))
   (:id item) (s/type-label item)])

(defn display-item [is-last item]
  [:span
   (if (map? item)
     [map-link item] (str item))
   (last-append is-last "")])

(defn string-item [item prop]
  [:span
   (cond (some #{prop} s/date-times) [util/date-display item]
         (= prop s/email-body) [body-links (first item)]
         (coll? item)
         (for [list-member (util/add-ids item)]
           ^{:key (first list-member)}
           [display-item (is-last? list-member (util/add-ids item))
            (second list-member)])
         :else item) " "
   (when (and item (coll? item) (not (empty? item))
              (> (count item) 1))
     [ask-more prop])])

(defn str-item [n k v]
  [:span [:strong (str n ": ")]
   [string-item v k]])

(defn get-filter-limit [attr]
  (if-let [filter-level (state/look :prop-filters attr)]
    (condp = filter-level
      1 -0.3333 2 -1.0 -9999.0)
    0.3333))

(defn filtered-list [attr item]
  (let [limit (get-filter-limit attr)]
    (->> attr (get item)
         (filter #(-> % second (> limit)))
         (sort-by second >) (map first))))

(defn info-items [attrs item]
  [:div
   (doall
    (for [attr (->> attrs (filter #(contains? item %))
                    util/add-ids)]
      ^{:key (first attr)}
      [:div.infoitem
       [str-item (-> attr second s/attr-names)
        (second attr)
        (filtered-list (second attr) item)]]))])

(def type-name {s/person "Person" s/email "Email"
                s/organization "Organization" s/location "Location"
                s/event "Event" s/building "Building"
                s/geocode "Coordinates"})

(defn node-aux [node-name item]
  [:div
   (when (-> item s/type-label (= s/person))
     [:div
      [:h3.infotitle (str "Emails to " node-name)]
      [table/email-table [:current-node s/email-to] s/email-to
       (partial u/update-emails-person! s/email-to)]
      [:h3.infotitle (str "Emails from " node-name)]
      [table/email-table [:current-node s/email-from] s/email-from
       (partial u/update-emails-person! s/email-from)]])])

(defn show-node [node-name item aux?]
  [:div
   [:h3.infotitle
    (str node-name " (" (-> item s/type-label type-name) ") ")
    [:a {:href "#" :on-click #(edit-entity-switch (s/type-label item))}
     "(Edit)"]" "
    [:a {:href "#" :on-click delete-entity-switch}
     "(Delete)"]]
   [info-items (-> item s/type-label display-fields) item]
   (when aux? [node-aux node-name item])])

