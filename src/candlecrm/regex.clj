(ns candlecrm.regex
  (:require [clojure.string :as str]
            [candlecrm.common :refer :all]
            [candlecrm_cljc.schema :as s])
  (:import [com.google.i18n.phonenumbers PhoneNumberUtil]))

;; Taken from http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address
(def email-regex #"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*")

;; Find source for this
(def url-regex #"^[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@\[\]:%_\+.~#?&//=]*)?")

(def zipcode-regex #"\s[0-9]{5}(?:-[0-9]{4})?\D")
(def state-regex #"\s(AL|Alabama|AK|Alaska|AZ|Arizona|AR|Arkansas|CA|California|CO|Colorado|CT|Connecticut|DE|Delaware|FL|Florida|GA|Georgia|HI|Hawaii|ID|Idaho|IL|Illinois|IN|Indiana|IA|Iowa|KS|Kansas|KY|Kentucky|LA|Louisiana|ME|Maine|MD|Maryland|MA|Massachusetts|MI|Michigan|MN|Minnesota|MS|Mississippi|MO|Missouri|MT|Montana|NE|Nebraska|NV|Nevada|NH|New Hampshire|NJ|New Jersey|NM|New Mexico|NY|New York|NC|North Carolina|ND|North Dakota|OH|Ohio|OK|Oklahoma|OR|Oregon|PA|Pennsylvania|RI|Rhode Island|SC|South Carolina|SD|South Dakota|TN|Tennessee|TX|Texas|UT|Utah|VT|Vermont|VA|Virginia|WA|Washington|WV|West Virginia|WI|Wisconsin|WY|Wyoming)+\W")
(def street-regex #"\s(St\.|Street|Ct\.|Court|Ave\.|Avenue|Blvd\.|Boulevard|Rd\.|Road|Dr\.|Drive|Expy\.|Expressway|Rt\.|Route|Fwy\.|Freeway|Grv\.|Grove|Hwy\.|Highway|Jct\.|Junction|Ln\.|Lane|Rte\.|Route|Ter\.|Terrace)+\W")

;; My own regexes
(def javascript-regex #"\<javascript([^\>]+)\>")
(def tag-regex #"\<([^\>]*)\>")
(def esc-char-regex #"\^|\[|\]|\.|\$|\{|\}|\(|\)|\\|\*|\+|\||\?|\<|\>")
(def timezone-regex #"[\+-]\d{4}")

;; Natty parses these as times (eg. 2015 = 8:15 PM). That's no good
(def year-regex #"^20\d\d$")
(def year-regex-2 #"^19\d\d$")

(defn silly-date? [text]
  (or (re-matches year-regex text)
      (re-matches year-regex-2 text)
      (= "today" (str/lower-case text))
      (= "sun" (str/lower-case text))))

(defn regex-escape [text]
  (str/replace text esc-char-regex #(str "\\" %1)))

(defn get-timezone [text]
  (first (re-seq timezone-regex text)))

(defn regex-or [coll]
  (->> (map regex-escape coll)
       (str/join "|") re-pattern))

(defn filter-arrows [text]
  (-> (str/replace text "<" "")
      (str/replace ">" "")))

(defn count-arrows [lines]
  (->> (map #(re-seq #"^(>|\s)+" %) lines)
       (map #(if (nil? %) [""] %))
       (map #(map first %))))

(defn remove-arrows [lines]
  (->> lines count-arrows (map first) (zipvec lines)
       (map #(if (nil? (second %)) (first %)
                 (str/replace-first
                  (first %) (re-pattern (second %)) "")))))

(defn count-depth [lines]
  (let [arrows (count-arrows lines)]
    (if (or (nil? arrows) (empty? arrows))
      [0] (->> arrows (map first)
               (map (fn [l] (filter #(= % \>) l)))
               (map count)))))

(defn arrow-shifts [lines]
  (->> lines count-depth vec (beam 2) (mapv reverse)
       (map #(apply - %)) (cons 0)))

(defn mode-arrows [lines]
  (->> lines count-depth (apply max)))

(defn find-email-addrs [text]
  (->> (str/split text #"\s") (map filter-arrows)
       (mapcat #(re-seq email-regex %))
       (remove #(.contains % "..."))))

(defn find-zipcode [text]
  (->> (re-seq zipcode-regex (str text " "))
       (map #(subs % 1 (dec (count %))))))

(defn might-have-addr? [text]
  (->> [zipcode-regex state-regex street-regex]
       (map #(re-seq % text))
       (every? nil?) not))

(defn find-urls [text]
  (->> (str/split text #"\s") (mapcat #(re-seq url-regex %))
       (map first) (remove #(.contains % "..."))))

(defn strip-javascript [text]
  (str/replace text javascript-regex ""))

(defn strip-tags [text]
  (str/replace text tag-regex ""))

(defn email-person [addr]
  (assoc {} s/email-addr (vector addr)
         :label s/person))

(defn find-email-people [text]
  (->> (find-email-addrs text)
       (map email-person)
       distinct))

(defn one-email? [text]
  (-> text find-email-addrs count (= 1)))

(defn parse-name [text email]
  (-> (str/replace text email "")
      filter-arrows str/trim))
  
(defn parse-name-email [text]
  (let [addrs (find-email-addrs text)]
    (if (= 1 (count addrs))
      (let [found-name (parse-name text (first addrs))]
        (if (>= (count found-name) 3)
          {s/email-addr (first addrs) s/s-name found-name}
          {s/email-addr (first addrs)}))
      {s/s-name text})))

(def default-region "US")

(defn find-phone-nums [text]
  (map #(.rawString %) 
       (.findNumbers
        (PhoneNumberUtil/getInstance)
        text default-region)))

(defn phone-person [number]
  (assoc {} :phone number :label s/person))

(defn find-phone-people [text]
  (->> (find-phone-nums text)
       (map phone-person) distinct))
