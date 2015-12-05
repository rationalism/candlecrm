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

(defn format-date [date]
  (.toISOString (js/moment. date)))

(defn date-display [item]
  [:span (format-date item)])

(defn input-cell [attr]
  [:div {:class "new-input-field"}
   [:span (attr s/attr-names)]
   [:input {:type "text" :name attr}]])

(defn new-entity [type attrs]
  [:div {:class "columns small-12"}
   [:form
    (for [attr attrs]
     ^{:key attr}
     [input-cell attr])
    [:button {:type "button"
              :class "submit-btn"
              :on-click #(js/alert "Submitted!")}
     "Submit"]]])

(defn user-welcome [flash username]
  [:div {:class "columns small-12"}
   [:h3 "Success! You are logged in now"]
   [:h3 (str "Welcome. Your username is: " username)]
   [:span {:style {:padding "0 0 0 10px" :color "red"}} flash]])

(defn node-link [text id type]
  [:a.go-node
   {:href "#" :on-click #(u/go-node! id type)}
   text])

(defn home-content [& content]
  (into [:div.home-content] content))

(defn user-footer []
  [:div {:class "columns small-12"}
   [:p [:a {:href "/gmail"} "Connect to GMail here"]]
   [:p [:a {:href "/logout"} "Logout here"]]])

(def new-person-attrs [s/s-name s/email-addr s/phone-num
                       s/birthday s/gender s/website])

(defn new-person-switch []
  (state/update! [:input-new :type] (constantly s/person))
  (state/update! [:input-new :attrs] (constantly new-person-attrs)))

(defn person-link [person attr]
  [node-link (person attr) (person :id) s/person])

(defn person-cell [person attr]
  [:td (if (= s/s-name attr)
         [person-link person attr]
         (person attr))])

(defn person-row [person]
  [:tr (for [attr s/person-attrs]
         ^{:key attr}
         [person-cell person attr])])

(defn people-table []
  [:div {:class "columns small-12"}
   [:table {:id "people-table"}
    [:thead {:id "people-header"}
     (for [attr s/person-attrs]
       ^{:key attr}
       [:td (get s/attr-names attr)])]
    [:tbody {:id "people-rows"}
     (for [p-row (state/look :people-rows)]
       ^{:key p-row}
       [person-row p-row])]]
   [:a {:href "#" :on-click (u/prev-fetch! :people u/update-people!)
        :id "prev-people-page"} "<-- Previous"]
   [:a {:href "#" :on-click (u/next-fetch! :people u/update-people!)
        :id "next-people-page"} "Next -->"]
   [:p>a {:href "#" :on-click new-person-switch
          :id "add-new-person"} "Add new person"]])

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
  [:tr (for [attr (keys email-attrs)]
         ^{:key attr}
         [email-cell email attr])])

(defn email-table [row-keys counter update-fn]
  [:div
   [:table {:id "email-table"}
    [:thead {:id "email-header"}
     (for [attr email-attrs]
       ^{:key attr} [:td attr])]
    [:tbody {:id "email-rows"}
     (for [e-row (apply state/look row-keys)]
       ^{:key (:id e-row)}
       [email-row e-row])]]
   [:a {:href "#" :on-click (u/prev-fetch! counter update-fn)
        :class "prev-email-page"} "<-- Previous"]
   [:a {:href "#" :on-click (u/next-fetch! counter update-fn)
        :class "next-email-page"} "Next -->"]])

(defn person-option [person]
  [:option {:value (:id person)}
   (str (s/s-name person) " (" (s/email-addr person) ")")])

(defn people-ranks [rel-type]
  [:select {:class (str "people-list-" rel-type)
            :on-change #(u/rel-switch (.. % -target -value) rel-type)}
   (for [person (state/look :rank-lists rel-type)]
     ^{:key (:id person)}
     [person-option person])])

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
    [:div#calendarbox {:style {:height "300px" :width "500px"}}]
    [:div#calendarbox {:style {:height "299px" :width "499px"}}]))

(defn calendar-box []
  (r/create-class
   {:component-did-mount cal-add!
    :component-did-update cal-render!
    :display-name "calendar-tab"
    :reagent-render cal-html}))

(defn calendar []
  [:div#calendar
   [people-ranks s/event]
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
    (state/update! [:map-markers :clicked] (constantly vars))
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
  (state/update! [:map-markers :updated] (constantly true)))

(defn map-did-mount [this]
  (->> (map state/look [:map-center :map-zoom])
       (zipmap [:center :zoom]) clj->js
       (js/google.maps.Map. (r/dom-node this)) constantly
       (state/update! [:map-obj]))
  (state/update! [:map-markers :window] map-window)
  (markers-update)
  (state/look :map-obj))

(defn location-html []
  (if (= (state/look :tabid) 4)
    [:div#mapbox {:style {:height "300px" :width "500px"}}]
    [:div#mapbox {:style {:height "299px" :width "499px"}}]))

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

(defn item-key [item]
  (if (string? item)
    item (:text item)))

(defn body-link [piece]
  (if (string? piece)
    [:span piece]
    [node-link (:text piece) (-> piece :link :id)
     (-> piece :link :type)]))

(defn body-links [item]
  [:p
   (for [piece (link-items item)]
     ^{:key (item-key piece)}
     [body-link piece])])

(defn string-item [item prop]
  [:span
   (cond (coll? item) (str/join ", " item)
         (= prop s/email-body) [body-links item]
         (some #{prop} s/date-times) [date-display item]
         :else item)])

(defn str-item [attr attr-name]
  [:span (str attr-name ": ")
   [string-item (val attr) (key attr)]])

(defn filter-display [attrs]
  (filter #(-> % key s/attr-names) attrs))

(defn info-items [attrs]
  [:div
   (for [attr (filter-display attrs)]
     ^{:key (key attr)}
     [:p.infoitem [str-item attr (-> attr key s/attr-names)]])])

(defn show-person [person-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str person-name " (Person)")]
   [info-items attrs]
   [:h3.infotitle (str "Emails to " person-name)]
   [email-table [:current-node s/email-to] s/email-to
    (partial u/update-emails-person! s/email-to)]
   [:h3.infotitle (str "Emails from " person-name)]
   [email-table [:current-node s/email-from] s/email-from
    (partial u/update-emails-person! s/email-from)]])

(defn show-email [email-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str email-name " (Email)")]
   [info-items attrs]])

(defn show-organization [organization-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str organization-name " (Organization)")]
   [info-items attrs]])

(defn show-location [location-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str location-name " (Location)")]
   [info-items attrs]])

(defn show-event [event-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str event-name " (Event)")]
   [info-items attrs]])

(defn show-money [money-name attrs]
  [:div {:class "columns small-12"}
   [:h3.infotitle (str money-name " (Finance)")]
   [info-items attrs]])

(defn unauthorized-error []
  [:h2 "Error: Access to this page is unauthorized."])

(defn not-found-error []
  [:div {:class "columns small-12"}
   [:h2 "Error: No such object can be found."]])

(defn set-tab-fn [tab-num]
  (fn []
    (state/update! [:tabid] (constantly tab-num))
    (state/update! [:current-node] (constantly nil))))

(defn header-tab [num name]
  [:td>h2>a {:href "#" :on-click (set-tab-fn num)
             :id (str "set-tab-" num)} name])

(defn home-header []
  [:div.home-header>table>tr.tab-row
   [header-tab 1 "People"]
   [header-tab 2 "Emails"]
   [header-tab 3 "Calendar"]
   [header-tab 4 "Locations"]])
