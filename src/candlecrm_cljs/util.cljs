(ns candlecrm_cljs.util
  (:require [clojure.string :as str]
            [candlecrm_cljc.schema :as s]
            [candlecrm_cljs.state :as state]
            [candlecrm_cljs.update :as u]))

(def title-field {s/person [[s/s-name] [s/email-addr] "(No name)"]
                  s/email [[s/email-subject] "(No subject)"]
                  s/organization [[s/s-name] [s/email-addr] "(No name)"]
                  s/location [[s/s-name] "(No name)"]
                  s/building [[s/street-addr] "(No address)"]
                  s/event [[s/s-name] "(No name)"]
                  s/geocode ["Coordinate pair"]})

(defn get-first [node attr]
  (u/get-first node attr))

(defn load-box []
  [:span (if (state/look :loading) "  (Loading...)" "")])

(defn node-link [text id type]
  [:a.go-node
   {:href (str "/app/node/" type "/" id)}
   text])

(defn event-name [event no-link?]
  (let [subject (-> event (get-first [:link-to s/text-mentions :subject])
                    (get-first :subject))
        from-email (-> event (get-first [:link-to s/text-mentions :email-from :name])
                       (get-first :name))
        from-notes (-> event (get-first [:link-to s/text-mentions :name])
                       (get-first :name))
        event-type (-> event (get-first [:event-type]))]
    [:span (if (or (nil? from-email) (empty? from-email))
             from-notes from-email) " - "
     (if no-link? (if (or (nil? subject) (empty? subject))
                    event-type subject)
         (node-link subject (:id event) s/event))]))

(defn simple-name [node]
  (let [fields (-> node :center-node s/type-label title-field)]
    (loop [f fields]
      (cond (= 0 (count f)) "" (= 1 (count f)) (first f)
            (get-first (:center-node node) (first f))
            (get-first (:center-node node) (first f))
            :else (recur (rest f))))))

(defn get-title [node]
  (if (-> node :center-node s/type-label (= s/event))
    (event-name (:center-node node) true)
    (simple-name node)))

(defn exclude-path? [path]
  (some #{path} s/exclude-edit))

(defn new-attrs [node-type]
  (->> node-type s/node-paths (filter #(<= 2 (count %)))
       (filter #(>= 4 (count %))) (mapv rest)
       (mapv #(if (> (count %) 2) (drop-last %) %))
       (remove exclude-path?)))

(defn new-entity-switch [node-type]
  (let [type-attrs (new-attrs node-type)]
    (state/set! [:input-meta :type] node-type)
    (state/set! [:input-meta :attr-list] type-attrs)
    (state/set! [:new-entity-msg] nil)
    (doseq [attr type-attrs]
      (state/set! [:new-entity attr] {0 ""}))
    (state/set! [:tabid] "add")))

(defn add-new [rel-type]
  [:a {:href "#" :on-click #(new-entity-switch rel-type)
       :id (str "add-new-" (name rel-type))
       :class "btn btn-primary new-button" :role "button"}
   [:i {:class "fa fa-plus"}]
   (str " Add new " (name rel-type))])

(defn prev-next-box [counter update-fn num-rows row-type]
  [:div.prev-next
   (when (> (state/look :counters counter) 0)
     [:a {:href "#" :role "button"
          :on-click (u/prev-fetch! counter update-fn)
          :class "prev-email-page btn btn-primary"}
      [:i {:class "fa fa-arrow-left"}]
      "  Previous"])
   (when (= num-rows (state/look :page-lengths row-type))
     [:a {:href "#" :role "button"
          :on-click (u/next-fetch! counter update-fn)
          :class "next-email-page btn btn-primary"}
      "Next  "
      [:i {:class "fa fa-arrow-right"}]])])

(defn key-link [text key type]
  (condp = type
    :node [:a.go-node
           {:href "#" :on-click #(u/go-key! key)}
           text]
    :url [:a.go-node
          {:href key} text]))

(defn set-field! [& args]
  (fn [this]
    (state/set! args (-> this .-target .-value))))

(defn add-ids [coll]
  (partition
   2 (-> coll count range
         (interleave coll))))

(defn format-date [date]
  (if (and (string? date) (empty? date)) ""
      (.format (js/moment. date)
               "dddd, MMM Do, h:mm a")))

(defn date-display [item]
  [:span (format-date
          (if (coll? item)
            (first item) item))])

(defn email-date [date]
  (.format (js/moment. date)
           "MMM Do, h:mm a"))

(defn email-date-display [item]
  [:span (email-date
          (if (coll? item)
            (first item) item))])

(defn get-day [date]
  (.format (js/moment. date)
           "dddd, MMMM Do"))

(defn display-day [date]
  (let [today (get-day (js/moment. ))
        date-text (get-day date)]
    (if (= today date-text) "Today" date-text)))

(defn beam [n coll]
  (apply map vector
         (for [i (range n)]
           (->> n (- (count coll)) inc (+ i)
                (subvec coll i)))))
