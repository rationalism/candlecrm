(ns candlecrm_cljs.node
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljc.links :as links]
            [candlecrm_cljs.edit :as edit]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.table :as table]
            [candlecrm_cljs.update :as u]
            [candlecrm_cljs.util :as util]))

(defn debug-js [x]
  (js/alert x) x)

(defn delete-entity-switch []
  (u/delete-entity!)
  (state/set! [:tabid] "people"))

(defn add-newlines [piece]
  [:span
   (let [n (util/add-ids (str/split (str piece " ") #"\n"))]
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
   (for [piece (-> item links/split-items util/add-ids)]
     ^{:key (first piece)}
     [body-link (second piece)])])

(defn see-more [attr]
  [:a {:href "javascript:;" :on-click #(state/set! [:prop-filters attr] 1)}
   "(See more)"])

(defn see-all [attr]
  [:a {:href "javascript:;" :on-click #(state/set! [:prop-filters attr] 2)}
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
          (links/url-truncate url)]
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

(defn filter-max-size [coll]
  (if (> (count coll) 25)
    (subvec (vec coll) 0 25) coll))

(defn filtered-list [attr item]
  (let [limit (get-filter-limit attr item)]
    (->> attr (get item)
         (filter #(-> % second (> limit)))
         (sort-by second >) (map first)
         filter-max-size)))

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
  [["Email from" :link-to s/text-mentions :email-from :name :id]
   ["Tags" :tag]])

(defn remove-dupes [aux? attrs]
  (cond->> attrs
    (some #{s/body-nlp} (map last attrs))
    (remove #(= s/email-body (last %)))
    (and (not aux?) (some #{s/event-context} (map last attrs)))
    (remove #(= s/event-context (last %)))
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

(defn info-items [attrs aux? item]
  [:div
   (doall
    (for [attr (->> attrs (filter #(->> % rest drop-id vec
                                        (contains? item)))
                    (remove-dupes aux?) util/add-ids)]
      ^{:key (first attr)}
      [:div.infoitem
       [str-item (-> attr second first)
        (-> attr second rest drop-id vec) item]]))])

(def type-name {s/person "Person" s/email "Email"
                s/organization "Organization" s/location "Location"
                s/event "Event" s/building "Building"
                s/geocode "Coordinates"})

(defn get-notes []
  (-> :current-node (state/look :center-node)
      (util/get-first [:notes])))

(defn set-notes! []
  (state/set! [:notes-edit] true)
  (state/set! [:notes-text] (get-notes)))

(defn person-notes []
  [:div {:class "container-fluid"}
   [:div {:class "row"}
    (if (state/look :notes-edit)
      [:div {:class "col-xs-6"} [:br]
       [:form 
        [:fieldset {:class "form-group"}
         [:h5 "Edit notes"]
         [:textarea {:type "text" :class "edit-field form-control"
                     :on-change (util/set-field! :notes-text)
                     :value (state/look :notes-text)}]
         [:br]
         [:button {:type "button"
                   :class "btn btn-primary"
                   :on-click #(u/edit-notes!)}
          "Edit"]]]]
      [:div [:br]
       [:button {:type "button"
                 :class "btn btn-primary btn-sm"
                 :on-click #(set-notes!)}
        "Edit notes"]])]])

(defn get-tags []
  (-> :current-node (state/look :center-node) (get [s/tag]) keys))

(defn set-tags! []
  (state/set! [:tags-edit] true)
  (->> (get-tags) (str/join ", ")
       (state/set! [:tags-text])))

(defn show-tags [tags]
  [:span
   (if (empty? tags)
     " "
     (for [tag (util/add-ids tags)]
       ^{:key (first tag)}
       [:span {:class "tag tag-default tag-list"}
        (second tag)]))])

(defn tag-box []
  [:div {:class "container-fluid"}
   [:div {:class "row"}
    [:span
     [:span [:strong {:class "tag-header"} "Tags: "]]
     (if (state/look :tags-edit)
       [:div {:class "col-xs-4"}
        [:div {:class "input-group"}
         [:input {:type "text" :class "form-control btn-sm"
                  :on-change (util/set-field! :tags-text)
                  :value (state/look :tags-text)}]
         [:span {:class "input-group-btn"}
          [:button {:type "button" :class "btn btn-secondary btn-sm"
                    :on-click #(u/edit-tags!)}
           "Edit"]]]]
       [:span
        [show-tags (get-tags)]
        [:button {:type "button"
                  :class "btn btn-primary btn-sm"
                  :on-click #(set-tags!)}
         "Edit"]])]]])

(defn node-aux [node-name item]
  [:div
   (when (-> item s/type-label (= s/person))
     [:div
      [:br] [tag-box] [person-notes] [:br]
      (when (or (->> s/email-to (state/look :current-node)
                     empty? not)
                (->> s/email-from (state/look :current-node)
                     empty? not))
        [:div {:class "row"}
         [:div {:class "col-md-6"}
          [:h5.infotitle (str "Emails to " node-name)]
          [table/email-table [:current-node s/email-to] s/email-to
           (partial u/update-emails-person! s/email-to)]]
         [:div {:class "col-md-6"}
          [:h5.infotitle (str "Emails from " node-name)]
          [table/email-table [:current-node s/email-from] s/email-from
           (partial u/update-emails-person! s/email-from)]]])])
   (when (some #{(s/type-label item)} [s/event s/location s/organization])
     [:div
      [:br] [tag-box] [person-notes] [:br]])])

(defn show-node [node-name item aux?]
  [:div#node-box
   [:div {:class "container-fluid"}
    [:div {:class "row"}
     [:h5.infotitle
      [:span node-name " "
       [:span {:class "tag tag-default"}
        (-> item s/type-label type-name)]] " "
      (when aux?
        [:span
         [:a {:href "javascript:;"
              :on-click #(edit/edit-entity-switch (s/type-label item))
              :class "btn btn-primary btn-sm" :role "button"}
          "Edit"] " "
         [:a {:href "javascript:;" :on-click delete-entity-switch
              :class "btn btn-primary btn-sm" :role "button"}
          "Delete"]])]
     [info-items (-> item s/type-label s/node-paths) aux? item]]]
   (when aux? [node-aux node-name item])])
