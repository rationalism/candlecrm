(ns candlecrm_cljs.node
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.edit :as edit]
            [candlecrm_cljs.regex :as regex]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.table :as table]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :as util]))

(defn debug-js [x]
  (js/alert x) x)

(defn delete-entity-switch []
  (u/delete-entity!)
  (state/set! [:tabid] 1))

(defn split-item [s m]
  (let [node-index (.indexOf (last s) (:original m))]
    (->> m :original count (+ node-index) (subs (last s))
         (vector (subs (last s) 0 node-index) m)
         (concat (drop-last s)) vec)))

(defn split-urls [item]
  (let [parsed (regex/url-parse item)]
    (reduce split-item [item] parsed)))

(defn split-items [item]
  (let [parsed (regex/node-parse item)]
    (->> (reduce split-item [item] parsed)
         (mapcat #(if (string? %) (split-urls %)
                      (vector %))))))

(defn add-newlines [piece]
  [:span
   (let [n (util/add-ids (str/split (str " " piece " ") #"\n"))]
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
   (for [piece (-> item split-items util/add-ids)]
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

(defn web-link [url is-last?]
  [:span [:a.go-node {:href url}
          (regex/url-truncate url)]
   (when (not is-last?) ", ")])

(defn web-links [item]
  [:span 
   (for [url (util/add-ids item)]
     ^{:key (first url)}
     [web-link (second url)
      (= (second url) (last item))])])

(defn get-filter-limit [attr item]
  (let [max-val (->> (get item attr) vals (apply max) (+ -0.01))]
    (if-let [filter-level (state/look :prop-filters attr)]
      (condp = filter-level
        1 (min -0.3333 max-val) 2 -1.0 -9999.0)
      (min 0.3333 max-val))))

(defn filtered-list [attr item]
  (let [limit (get-filter-limit attr item)]
    (->> attr (get item)
         (filter #(-> % second (> limit)))
         (sort-by second >) (map first))))

(defn string-item [item prop]
  [:span
   (let [disp (filtered-list prop item)]
     (cond (some #{(last prop)} s/date-times) [util/date-display disp]
           (some #{(last prop)} [s/email-body s/body-nlp s/notes-nlp])
           [body-links (first disp)]
           (= (last prop) s/event-context)
           (for [context (util/add-ids disp)]
             ^{:key (first context)}
             [body-links (second context)])
           (= (last prop) s/website) [web-links disp]
           (coll? disp)
           (for [list-member (util/add-ids disp)]
             ^{:key (first list-member)}
             [display-item (is-last? list-member (util/add-ids disp))
              (second list-member)])
           :else disp)) " "
   (when (and (> (count (get item prop)) 1)
              (->> prop (get item) vals (apply min)
                   (> (get-filter-limit prop item))))
     [ask-more prop])])

(defn str-item [n k v]
  [:span [:strong (str n ": ")]
   [string-item v k]])

(def never-show
  [["Email from" :link-to s/text-mentions :email-from :name :id]])

(defn remove-dupes [attrs]
  (cond->> attrs
    (some #{s/body-nlp} (map last attrs))
    (remove #(= s/email-body (last %)))
    (some #{s/notes-nlp} (map last attrs))
    (remove #(= s/notes (last %)))
    (some #{["Sent by" s/email-from s/s-name :id]} attrs)
    (remove #(= ["Sent by" s/email-from s/email-addr :id] %))
    (some #{["Sent to" s/email-to s/s-name :id]} attrs)
    (remove #(= ["Sent to" s/email-to s/email-addr :id] %))
    :always
    (remove #(some #{%} never-show))))

(defn drop-id [coll]
  (if (= :id (last coll)) (drop-last coll) coll))

(defn info-items [attrs item]
  [:div
   (doall
    (for [attr (->> attrs (filter #(->> % rest drop-id vec
                                        (contains? item)))
                    remove-dupes util/add-ids)]
      ^{:key (first attr)}
      [:div.infoitem
       [str-item (-> attr second first)
        (-> attr second rest drop-id vec) item]]))])

(def type-name {s/person "Person" s/email "Email"
                s/organization "Organization" s/location "Location"
                s/event "Event" s/building "Building"
                s/geocode "Coordinates"})

(defn set-notes! []
  (state/set! [:notes-edit] true)
  (state/set! [:notes-text]
              (util/get-first (state/look :current-node :center-node)
                              [:notes])))

(defn person-notes []
  [:div
   (if (state/look :notes-edit)
     [:form {:class ""}
      [:fieldset
       [:h3 "Notes"]
       [:textarea {:type "text" :class "edit-field"
                   :on-change (util/set-field! :notes-text)
                   :value (state/look :notes-text)}]
       [:br]
       [:button {:type "button"
                 :class "btn btn-primary"
                 :on-click #(u/edit-notes!)}
        "Edit"]]]
     [:div [:br]
      [:button {:type "button"
                :class "btn btn-primary"
                :on-click #(set-notes!)}
       "Edit notes"]])])

(defn node-aux [node-name item]
  [:div
   (when (-> item s/type-label (= s/person))
     (when (or (->> s/email-to (state/look :current-node)
                    empty? not)
               (->> s/email-from (state/look :current-node)
                    empty? not))
       [:div
        [person-notes]
        [:div.person-emails
         [:h5.infotitle (str "Emails to " node-name)]
         [table/email-table [:current-node s/email-to] s/email-to
          (partial u/update-emails-person! s/email-to)]]
        [:div.person-emails
         [:h5.infotitle (str "Emails from " node-name)]
         [table/email-table [:current-node s/email-from] s/email-from
          (partial u/update-emails-person! s/email-from)]]]))])

(defn show-node [node-name item aux?]
  [:div#node-box
   [:h5.infotitle
    [:span node-name (str " (" (-> item s/type-label type-name) ") ")]
    (when aux?
      [:span
       [:a {:href "#" :on-click #(edit/edit-entity-switch (s/type-label item))
            :class "btn btn-primary" :role "button"}
        "Edit"] " "
       [:a {:href "#" :on-click delete-entity-switch
            :class "btn btn-primary" :role "button"}
        "Delete"]])]
   [info-items (-> item s/type-label s/node-paths) item]
   (when aux? [node-aux node-name item])])

