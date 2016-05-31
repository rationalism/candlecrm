(ns spectra_cljs.html
  (:require [clojure.string :as str]
            [spectra_cljs.ajax :as ajax]
            [spectra_cljs.map :as map]
            [spectra_cljs.regex :as regex]
            [spectra_cljc.schema :as s]
            [spectra_cljs.state :as state]
            [spectra_cljs.util :as util]
            [spectra_cljs.update :as u]
            [reagent.core :as r]
            [jayq.core :as jq])
  (:use [jayq.core :only [$]]))

;; TODO: Reorganize this by page

(defn count-cells [attr cache]
  (->> attr vector (concat cache) (apply state/look)
       keys count))

(defn input-cell [id-attr cache]
  [:div {:class "pure-control-group"}
   [:label
    (if (= 0 (first id-attr))
      ((second id-attr) s/attr-names) "")]
   (let [attr (second id-attr)
         params (->> id-attr first vector (concat [attr])
                     (concat cache))]
     [:input {:type "text" :name (str attr (first id-attr))
              :on-change (apply util/set-field! params)
              :value (apply state/look params)}])
   (let [attr (second id-attr)]
     (when (= 0 (first id-attr))
       [:a.new-link {:href "#"
                     :on-click #(-> cache (concat [attr])
                                    (concat [(count-cells attr cache)])
                                    (state/set! ""))}
        "Add new"]))])

(defn count-attr-cells [attr cache]
  (-> (count-cells attr cache) (repeat attr) util/add-ids))

(defn input-block [attr cache]
  [:div
   (for [id-attr (count-attr-cells attr cache)]
     ^{:key (first id-attr)}
     [input-cell id-attr cache])])

(defn submit-new-entity [type]
  (fn []
    (state/set! [:new-entity s/type-label] type)
    (u/add-entity!)))

(defn add-message []
  (let [resp (state/look :new-entity-msg)]
    [:span (str "New " (-> resp s/type-label name)
                " created. ")
     (util/node-link "Go to page" (:id resp) (s/type-label resp))]))

(defn edit-message []
  (let [resp (state/look :new-entity-msg)]
    [:span (str "Edit of " (-> resp s/type-label name)
                " successful. ")
     (util/node-link "Go to page" (:id resp) (s/type-label resp))]))

(defn entity-form [legend attrs cache onclick msg]
  [:div
   [:form {:class "pure-form pure-form-aligned"}
    [:fieldset
     [:legend>h3 legend]
     (for [attr attrs]
       ^{:key (first attr)}
       [input-block (second attr) cache])
     [:button {:type "button"
               :class "pure-button pure-button-primary"
               :on-click onclick}
      "Submit"]]]
   msg])

(defn user-welcome [username]
  [:div
   [:h3 (str "Welcome. Your email is: " username)]])

(defn home-content [& content]
  [:div {:class "pure-g"}
   [:div {:class "pure-u-1-12"}]
   (into [:div {:class "pure-u-5-6"}]
         content)])

(defn confirm-box []
  [:div
   [:p "Your account will be deleted."]
   [:p "All data will be lost permanently!"]
   [:p "Are you sure you want to delete your account?"]
   [:form {:class "pure-form" :action "/logout"}
    [:label {:class "pure-radio" :for "yes-delete"}
     [:input {:id "yes-delete" :type "radio"
              :name "delete-radio" :value "yes"
              :on-change (util/set-field! :delete-account :confirm-button)}]
     "Yes, please delete my account"]
    [:label {:class "pure-radio" :for "no-delete"}
     [:input {:id "no-delete" :type "radio"
              :name "delete-radio" :value "no"
              :on-change (util/set-field! :delete-account :confirm-button)}]
     "No, don't delete my account"]
    [:button {:type "submit"
              :class "pure-button pure-button-primary"
              :on-click u/delete-account!}
     "Confirm delete"]]])

(defn change-pwd-box []
  [:div
   [:form {:class "pure-form pure-form-aligned"
           :id "changePassForm"}
    [:fieldset
     [:legend [:h2 "Set a new password"]]
     [:div.pure-control-group
      [:label {:for "setPwd"} "New password "]
      [:input {:type "password" :name "password"
               :id "setPwd" :required "required"
               :on-change (util/set-field! :change-pwd :password)
               :value (state/look :change-pwd :password)}]]
     [:div.pure-control-group
      [:label {:for "setPwdConfirm"} "Confirm new password "]
      [:input {:type "password" :name "confirm"
               :id "setPwdConfirm" :required "required"
               :on-change (util/set-field! :change-pwd :confirm)
               :value (state/look :change-pwd :confirm)}]]
     [:div.pure-controls
      [:input {:class "pure-button pure-button-primary"
               :value "Set new password" :type "button"
               :on-click u/change-password!}]]]]])

(defn user-footer []
  [:div
   [:p
    [:a {:href "/logout" :class "pure-button"}
     "Logout here"]]
   [:p
    [:a {:href "#" :class "pure-button"
         :on-click #(state/set! [:change-pwd :show-form] :true)}
     "Change password"]]
   (when (state/look :change-pwd :show-form)
     [change-pwd-box])
   [:p
    [:a {:href "#" :class "pure-button"
         :on-click #(state/set! [:delete-account :confirm-box] :true)}
     "Close account"]]
   (when (state/look :delete-account :confirm-box)
     [confirm-box])])

(def entity-attrs
  {s/person [s/s-name s/email-addr s/phone-num
             s/website]})

(defn new-entity-switch [type]
  (state/set! [:input-meta :type] type)
  (state/set! [:input-meta :attr-list]
              (type entity-attrs))
  (doseq [attr (type entity-attrs)]
    (state/set! [:new-entity attr] {0 ""}))
  (state/set! [:tabid] 7))

(defn get-first [node attr]
  (->> (get node attr) (into [])
       (sort-by second >)
       ffirst))

(defn person-link [person attr]
  [util/node-link
   (if-let [name (get-first person attr)]
     name "(No name listed)")
   (person :id) s/person])

(defn person-site [person attr]
  [:a {:href (get-first person attr)}
   (get-first person attr)])

(defn person-cell [person attr]
  [:td (condp = attr
         s/s-name [person-link person attr]
         s/website [person-site person attr]
         (get-first person attr))])

(defn person-row [person]
  [:tr (for [attr (util/add-ids (s/person entity-attrs))]
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
     (for [attr (util/add-ids (s/person entity-attrs))]
       ^{:key (first attr)}
       [:td (get s/attr-names (second attr))])]
    [:tbody {:id "people-rows"}
     (for [p-row (-> :people-rows state/look util/add-ids)]
       ^{:key (first p-row)}
       [person-row (second p-row)])]]
   [prev-next-box :people u/update-people!
    (count (state/look :people-rows)) :people]
   [:p>a {:href "#" :on-click #(new-entity-switch s/person)
          :id "add-new-person" :class "pure-button"} "Add new person"]])

(def email-attrs {s/email-sent "Date"
                  s/email-subject "Subject"})

(defn email-link [email attr]
  [util/node-link (->> email attr (sort-by second >) ffirst)
   (email :id) s/email])

(defn email-cell [email attr]
  [:td (cond
         (= s/email-subject attr) [email-link email attr]
         (some #{attr} s/date-times)
         [util/date-display (get-first email attr)]
         :else (get-first email attr))])

(defn email-row [email]
  [:tr (for [attr (-> email-attrs keys util/add-ids)]
         ^{:key (first attr)}
         [email-cell email (second attr)])])

(defn email-table [row-keys counter update-fn]
  [:div
   [:table {:id "email-table" :class "pure-table pure-table-horizontal"}
    [:thead {:id "email-header"}
     (for [attr (util/add-ids email-attrs)]
       ^{:key (first attr)}
       [:td (second attr)])]
    [:tbody {:id "email-rows"}
     (for [e-row (util/add-ids (apply state/look row-keys))]
       ^{:key (first e-row)}
       [email-row (second e-row)])]]
   [prev-next-box counter update-fn
    (count (apply state/look row-keys)) :email]])

(defn person-option [person]
  [:option {:value (:id person)}
   (str (get-first person s/s-name)
        " (" (get-first person s/email-addr) ")")])

(defn people-ranks [rel-type]
  [:div>span "Select a person: "
   [:form {:class "pure-form"}
    [:select {:class (str "people-list-" rel-type " pure-input-1-2")
              :on-change #(u/rel-switch (.. % -target -value) rel-type)}
     (for [person (util/add-ids (state/look :rank-lists rel-type))]
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

(defn locations []
  [:div#locations
   [people-ranks s/location]
   [:br]
   [map/map-box]])

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
   (let [n (util/add-ids (str/split piece #"\r\n"))]
     (for [ln n]
       ^{:key (first ln)}
       [:span (second ln)
        (when (> (dec (count n)) (first ln))
          [:br])]))])

(defn body-link [piece]
  (if (string? piece)
    [add-newlines piece]
    [util/key-link (:text piece) (:link piece)
     (-> piece :link :type)]))

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

(defn filter-display [attrs]
  (filter #(-> % key s/attr-names) attrs))

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
      [:p.infoitem
       [str-item (-> attr second s/attr-names)
        (second attr)
        (filtered-list (second attr) item)]]))])

(def person-disp [s/s-name s/email-addr s/phone-num s/website])
(def email-disp [s/email-sent s/email-body])
(def org-disp [s/s-name])
(def loc-disp [s/s-name])
(def event-disp [s/start-time s/stop-time])
(def money-disp [s/s-name])

(defn ids-if-coll [type m]
  (let [id-fn #(->> % util/add-ids (map vec) vec (into {}))]
    (reduce #(update %1 %2 id-fn)
            m (vec (keep (set (type entity-attrs))
                         (set (keys m)))))))

(defn edit-entity-switch [type]
  (state/update! [:current-node :center-node]
                 (partial ids-if-coll type))
  (state/set! [:tabid] 8))

(defn delete-entity-switch []
  (u/delete-entity!)
  (state/set! [:tabid] 1))

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
     [email-table [:current-node s/email-to] s/email-to
      (partial u/update-emails-person! s/email-to)]
     [:h3.infotitle (str "Emails from " disp-name)]
     [email-table [:current-node s/email-from] s/email-from
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

(defn show-event [event-name item]
  [:div
   [:h3.infotitle (str event-name " (Event)")]
   [info-items event-disp item]])

(defn show-money [money-name item]
  [:div
   [:h3.infotitle (str money-name " (Finance)")]
   [info-items money-disp item]])

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
   [:h3>a
    {:href "#" :class "pure-menu-link"
     :on-click (set-tab-fn num)
     :id (str "set-tab-" num)} name]])

(defn search-key [e]
  (when (= 13 (.-charCode e))
    (u/run-search!)))

(defn search-box []
  [:fieldset {:class "pure-form"}
   [:input {:id "search-box" :type "text" :name "search-box" :placeholder "Search"
            :on-change (util/set-field! :search) :value (state/look :search)
            :on-key-press search-key}]])

(defn result-row [res]
  [:div [:hr]
   [:ul
    (for [id-param (util/add-ids res)]
      ^{:key (first id-param)}
      [:li (str (second id-param))])
    [:li [util/node-link "Link to result" (:id res) (s/type-label res)]]]])

(defn search-results []
  [:div
   [:h2 "Search Results"]
   (for [id-res (-> :search-results state/look util/add-ids)]
     ^{:key (first id-res)}
     [result-row (second id-res)])])

(defn home-header []
  [:div#menu-bar {:class "pure-g"}
   [:div {:class "pure-u-1-12"}]
   [:div {:class "pure-u-7-12"}
    [:div {:class "pure-menu pure-menu-horizontal menu-icons"}
     [:ul {:class "pure-menu-list"}
      [header-tab 1 "People"]
      [header-tab 2 "Emails"]
      [header-tab 3 "Calendar"]
      [header-tab 4 "Locations"]
      [header-tab 5 "My Account"]]]]
   [:div#right-menu {:class "pure-u-1-4"}
    [:div {:class "pure-menu pure-menu-horizontal menu-icons"}
     [search-box]]]])   

(defn my-account []
  [:div
   [:h2 "My Account"]
   [user-welcome (state/look :user :email-addr)]
   [user-footer]])
