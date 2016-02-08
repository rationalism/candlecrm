(ns spectra_cljs.html
  (:require [clojure.string :as str]
            [spectra_cljs.ajax :as ajax]
            [spectra_cljs.regex :as regex]
            [spectra_cljc.schema :as s]
            [spectra_cljs.state :as state]
            [spectra_cljs.update :as u]
            [reagent.core :as r]
            [goog.dom :as dom]
            [jayq.core :as jq])
  (:use [jayq.core :only [$]]))

;; TODO: Reorganize this by page

(defn add-nums [coll]
  (partition
   2 (-> coll count range
         (interleave coll))))

(defn format-date [date]
  (.format (js/moment. date)
           "MMM Do, h:mm a"))

(defn date-display [item]
  [:span (format-date item)])

(defn input-cell [attr]
  [:div {:class "new-input-field"}
   [:span (attr s/attr-names)]
   [:input {:type "text" :name attr}]])

(defn new-entity [type attrs]
  [:div
   [:form
    (for [attr (add-nums attrs)]
     ^{:key (first attr)}
     [input-cell (second attr)])
    [:button {:type "button"
              :class "submit-btn"
              :on-click #(js/alert "Submitted!")}
     "Submit"]]])

(defn user-welcome [username]
  [:div
   [:h3 (str "Welcome. Your email is: " username)]])

(defn node-link [text id type]
  [:a.go-node
   {:href "#" :on-click #(u/go-node! id type)}
   text])

(defn home-content [& content]
  [:div {:class "pure-g"}
   [:div {:class "pure-u-1-12"}]
   (into [:div {:class "pure-u-5-6"}]
         content)])

(defn user-footer []
  [:div
   [:p
    [:a {:href "/logout" :class "pure-button"}
     "Logout here"]]])

(def new-person-attrs [s/s-name s/email-addr s/phone-num
                       s/birthday s/gender s/website])

(defn new-person-switch []
  (state/set! [:input-new :type] s/person)
  (state/set! [:input-new :attrs] new-person-attrs))

(defn person-link [person attr]
  [node-link (person attr) (person :id) s/person])

(defn person-site [person attr]
  [:a {:href (person attr)} (person attr)])

(defn person-cell [person attr]
  [:td (condp = attr
         s/s-name [person-link person attr]
         s/website [person-site person attr]
         (person attr))])

(defn person-row [person]
  [:tr (for [attr (add-nums s/person-attrs)]
         ^{:key (first attr)}
         [person-cell person (second attr)])])

(defn prev-next-box [counter update-fn num-rows row-type]
  [:div
   (when (> (state/look :counters counter) 0)
     [:a {:href "#" :on-click (u/prev-fetch! counter update-fn)
          :class "prev-email-page pure-button"} "<-- Previous"])
   (when (= num-rows (state/look :page-lengths row-type))
     [:a {:href "#" :on-click (u/next-fetch! counter update-fn)
          :class "next-email-page pure-button"} "Next -->"])])

(defn people-table []
  [:div
   [:table {:id "people-table" :class "pure-table pure-table-horizontal"}
    [:thead {:id "people-header"}
     (for [attr (add-nums s/person-attrs)]
       ^{:key (first attr)}
       [:td (get s/attr-names (second attr))])]
    [:tbody {:id "people-rows"}
     (for [p-row (-> :people-rows state/look add-nums)]
       ^{:key (first p-row)}
       [person-row (second p-row)])]]
   [prev-next-box :people u/update-people!
    (count (state/look :people-rows)) :people]
   [:p>a {:href "#" :on-click new-person-switch
          :id "add-new-person" :class "pure-button"} "Add new person"]])

(def email-attrs {s/email-sent "Date"
                  s/email-subject "Subject"})

(defn email-link [email attr]
  [node-link (email attr) (email :id) s/email])

(defn email-cell [email attr]
  [:td (cond
         (= s/email-subject attr) [email-link email attr]
         (some #{attr} s/date-times) [date-display (email attr)]
         :else (email attr))])

(defn email-row [email]
  [:tr (for [attr (-> email-attrs keys add-nums)]
         ^{:key (first attr)}
         [email-cell email (second attr)])])

(defn email-table [row-keys counter update-fn]
  [:div
   [:table {:id "email-table" :class "pure-table pure-table-horizontal"}
    [:thead {:id "email-header"}
     (for [attr (add-nums email-attrs)]
       ^{:key (first attr)}
       [:td (second attr)])]
    [:tbody {:id "email-rows"}
     (for [e-row (add-nums (apply state/look row-keys))]
       ^{:key (first e-row)}
       [email-row (second e-row)])]]
   [prev-next-box counter update-fn
    (count (apply state/look row-keys)) :email]])

(defn person-option [person]
  [:option {:value (:id person)}
   (str (s/s-name person) " (" (s/email-addr person) ")")])

(defn people-ranks [rel-type]
  [:div>span "Select a person: "
   [:form {:class "pure-form"}
    [:select {:class (str "people-list-" rel-type " pure-input-1-2")
              :on-change #(u/rel-switch (.. % -target -value) rel-type)}
     (for [person (add-nums (state/look :rank-lists rel-type))]
       ^{:key (first person)}
       [person-option (second person)])]]])

(defn cal-adjust
  ([param] (.fullCalendar ($ :#calendarbox) param))
  ([param1 param2] (.fullCalendar ($ :#calendarbox) param1 param2)))

(defn day-click [date jsevent view]
  (if (= "basicDay" (.-name view))
    (cal-adjust "changeView" "month") 
    (cal-adjust "changeView" "basicDay"))
  (cal-adjust "gotoDate" date))

(defn event-click [event jsevent view]
  (u/go-node! (.-id event) s/event))

(defn event-source [start end timezone callback]
  (-> :cal-events state/look clj->js callback))
  
(defn cal-params []
  (clj->js {:events event-source
            :dayClick day-click
            :eventClick event-click}))

(defn cal-add! [this]
  (cal-adjust (cal-params)))

(defn cal-render! [this]
  (cal-adjust "render")
  (when (= (state/look :tabid) 3)
    (cal-adjust "refetchEvents")))

(defn cal-html []
  (if (= (state/look :tabid) 3)
    [:div#calendarbox {:style {:height "600px" :width "1000px"}}]
    [:div#calendarbox {:style {:height "599px" :width "999px"}}]))

(defn calendar-box []
  (r/create-class
   {:component-did-mount cal-add!
    :component-did-update cal-render!
    :display-name "calendar-tab"
    :reagent-render cal-html}))

(defn calendar []
  [:div#calendar
   [people-ranks s/event]
   [:br]
   [calendar-box]])

(defn event-info-window []
  (let [marker (state/look :map-markers :clicked)]
    [:div#markerinfo>h3
     [node-link (:title marker) (:id marker) s/location]]))

(defn render-window []
  (r/render [event-info-window]
            (dom/getElement "window-info")))

(defn map-window []
  (let [window (js/google.maps.InfoWindow.
                (clj->js {"content" "<div id='window-info'></div>"}))]
    (.addListener window "domready" render-window)
    window))

(defn window-open [marker vars]
  (fn []
    (state/set! [:map-markers :clicked] vars)
    (.open (state/look :map-markers :window)
           (state/look :map-obj) marker)))
  
(defn map-marker [vars]
  (let [marker (google.maps.Marker. (clj->js vars))]
    (.addListener marker "click" (window-open marker vars))
    marker))

(defn wipe-markers [markers]
  (->> (map #(.setMap % nil) markers)
       (map #(constantly nil))
       (remove nil?) clj->js))

(defn new-markers [markers]
  (->> (state/look :map-markers :data)
       (map #(assoc % :map (state/look :map-obj)))
       (map map-marker)
       clj->js))

(defn markers-update []
  (state/update! [:map-markers :objs] wipe-markers)
  (state/update! [:map-markers :objs] new-markers)
  (state/set! [:map-markers :updated] true))

(defn map-did-mount [this]
  (->> (map state/look [:map-center :map-zoom])
       (zipmap [:center :zoom]) clj->js
       (js/google.maps.Map. (r/dom-node this))
       (state/set! [:map-obj]))
  (state/update! [:map-markers :window] map-window)
  (markers-update)
  (state/look :map-obj))

(defn location-html []
  (if (= (state/look :tabid) 4)
    [:div#mapbox {:style {:height "600px" :width "1000px"}}]
    [:div#mapbox {:style {:height "599px" :width "999px"}}]))

(defn resize-map [this]
  (when-not (state/look :map-markers :updated)
    (markers-update))
  (-> js/document (. (getElementById "mapbox"))
      (js/google.maps.event.trigger "resize")))

(defn map-box []
  (r/create-class {:reagent-render location-html
                   :component-did-mount map-did-mount
                   :component-did-update resize-map}))

(defn locations []
  [:div#locations
   [people-ranks s/location]
   [:br]
   [map-box]])

(defn login-needed [uri]
  [:h2 "You do not have sufficient privileges to access " uri])

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

(defn split-many [s breaks]
  (reduce split-coll (vector s) breaks))

(defn text-keys [parsed]
  (->> parsed (map #(hash-map (:original %) %))
       (apply merge)))

(defn swap-item [item parsed]
  (if (contains? parsed item)
    (get parsed item) item))

(defn link-items [item]
  (let [parsed (-> item regex/node-parse text-keys)]
    (->> parsed keys (split-many item)
         (map #(swap-item % parsed)))))

(defn add-newlines [piece]
  [:span
   (let [n (add-nums (str/split piece #"\r\n"))]
     (for [ln n]
       ^{:key (first ln)}
       [:span (second ln)
        (when (> (dec (count n)) (first ln))
          [:br])]))])

(defn body-link [piece]
  (if (string? piece)
    [add-newlines piece]
    [node-link (:text piece) (-> piece :link :id)
     (-> piece :link :type)]))

(defn body-links [item]
  [:p#email-body
   (for [piece (-> item link-items add-nums)]
     ^{:key (first piece)}
     [body-link (second piece)])])

(defn string-item [item prop]
  [:span
   (cond (coll? item) (str/join ", " item)
         (= prop s/email-body) [body-links item]
         (some #{prop} s/date-times) [date-display item]
         :else item)])

(defn str-item [n k v]
  [:span [:strong (str n ": ")]
   [string-item v k]])

(defn filter-display [attrs]
  (filter #(-> % key s/attr-names) attrs))

(defn info-items [attrs item]
  [:div
   (for [attr (add-nums attrs)]
     ^{:key (first attr)}
     [:p.infoitem
      [str-item (-> attr second s/attr-names)
       (second attr) (get item (second attr))]])])

(def person-disp [s/email-addr s/website])
(def email-disp [s/email-sent s/email-body])
(def org-disp [s/s-name])
(def loc-disp [s/s-name])
(def event-disp [s/start-time s/stop-time])
(def money-disp [s/s-name])

(defn show-person [person-name item]
  [:div
   [:h3.infotitle (str person-name " (Person)")]
   [info-items person-disp item]
   [:h3.infotitle (str "Emails to " person-name)]
   [email-table [:current-node s/email-to] s/email-to
    (partial u/update-emails-person! s/email-to)]
   [:h3.infotitle (str "Emails from " person-name)]
   [email-table [:current-node s/email-from] s/email-from
    (partial u/update-emails-person! s/email-from)]])

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

(defn show-event [event-name item]
  [:div
   [:h3.infotitle (str event-name " (Event)")]
   [info-items event-disp item]])

(defn show-money [money-name item]
  [:div
   [:h3.infotitle (str money-name " (Finance)")]
   [info-items money-disp item]])

(defn unauthorized-error []
  [:h2 "Error: Access to this page is unauthorized."])

(defn not-found-error []
  [:div
   [:h2 "Error: No such object can be found."]])

(defn set-tab-fn [tab-num]
  (fn []
    (state/set! [:tabid] tab-num)
    (state/set! [:current-node] nil)))

(defn tab-class [num]
  (if (= num (state/look :tabid))
    "pure-menu-item pure-menu-selected"
    "pure-menu-item"))

(defn header-tab [num name]
  [:li {:class (tab-class num)}
   [:h2>a
   {:href "#" :class "pure-menu-link"
    :on-click (set-tab-fn num)
    :id (str "set-tab-" num)} name]])

(defn home-header []
  [:div#menu-bar {:class "pure-g"}
   [:div {:class "pure-u-1-12"}]
   [:div {:class "pure-u-2-3"}
    [:div {:class "pure-menu pure-menu-horizontal menu-icons"}
     [:ul {:class "pure-menu-list"}
      [header-tab 1 "People"]
      [header-tab 2 "Emails"]
      [header-tab 3 "Calendar"]
      [header-tab 4 "Locations"]]]]
   [:div#right-menu {:class "pure-u-1-6"}
    [:div {:class "pure-menu pure-menu-horizontal menu-icons"}
     [:ul {:class "pure-menu-list"}
      [header-tab 5 "My Account"]]]]])   

(defn my-account []
  [:div
   [:h2 "My Account"]
   [user-welcome (state/look :user :email-addr)]
   [user-footer]])
