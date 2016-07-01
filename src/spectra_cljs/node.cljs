(ns spectra_cljs.node
  (:require [clojure.string :as str]
            [spectra_cljc.schema :as s]
            [spectra_cljs.regex :as regex]
            [spectra_cljs.state :as state]
            [spectra_cljs.table :as table]
            [spectra_cljs.update :as u]
            [spectra_cljs.util :as util]))

(def person-disp [s/s-name s/email-addr s/phone-num s/website])
(def email-disp [s/email-sent s/email-body])
(def org-disp [s/s-name])
(def loc-disp [s/s-name])
(def event-disp [s/start-time s/stop-time])
(def money-disp [s/s-name])
(def addr-disp [s/street-addr])

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
   (let [n (util/add-ids (str/split piece #"\r\n"))]
     (for [ln n]
       ^{:key (first ln)}
       [:span (second ln)
        (when (> (dec (count n)) (first ln))
          [:br])]))])

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

(defn string-item [item prop]
  [:span
   (cond (some #{prop} s/date-times) [util/date-display item]
         (= prop s/email-body) [body-links (first item)]
         (coll? item) (str/join ", " item)
         :else item) " "
   (when (coll? item) [ask-more prop])])

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
    (for [attr (util/add-ids attrs)]
      ^{:key (first attr)}
      [:div.infoitem
       [str-item (-> attr second s/attr-names)
        (second attr)
        (filtered-list (second attr) item)]]))])

(defn show-person [person-name email-addr item]
  (let [disp-name (if person-name person-name email-addr)]
    [:div
     [:h3.infotitle
      (str (if person-name person-name "(No name listed)")
           " (Person) ")
      [:a {:href "#" :on-click #(edit-entity-switch s/person)}
       "(Edit)"]" "
      [:a {:href "#" :on-click delete-entity-switch}
       "(Delete)"]]
     [info-items person-disp item]
     [:h3.infotitle (str "Emails to " disp-name)]
     [table/email-table [:current-node s/email-to] s/email-to
      (partial u/update-emails-person! s/email-to)]
     [:h3.infotitle (str "Emails from " disp-name)]
     [table/email-table [:current-node s/email-from] s/email-from
      (partial u/update-emails-person! s/email-from)]]))

(defn show-email [email-name item]
  [:div
   [:h3.infotitle (str email-name " (Email)")]
   [info-items email-disp item]])

(defn show-organization [organization-name item]
  [:div
   [:h3.infotitle (str organization-name " (Organization)")]
   [info-items org-disp item]])

(defn show-location [location-name item]
  [:div
   [:h3.infotitle (str location-name " (Location)")]
   [info-items loc-disp item]])

(defn show-building [building-name item]
  [:div
   [:h3.infotitle (str building-name " (Building)")]
   [info-items addr-disp item]])

(defn show-event [event-name item]
  [:div
   [:h3.infotitle (str event-name " (Event)")]
   [info-items event-disp item]])

(defn show-money [money-name item]
  [:div
   [:h3.infotitle (str money-name " (Finance)")]
   [info-items money-disp item]])
