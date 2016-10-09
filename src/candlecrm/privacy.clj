(ns candlecrm.privacy
  (:require [clojure.string :as str]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [candlecrm.common :refer :all]
            [candlecrm_cljc.schema :as s]
            [candlecrm.environ :refer [env]]))

(defn privacy-html []
  [:div {:class "container"}
   [:div {:class "row"}
    ﻿[:h3 "Privacy Policy"]
    [:p "Protecting your private information is our priority. This Statement of Privacy applies to CandleCRM and the CandleCRM website at https://www.candlecrm.com and governs data collection and usage. For the purposes of this Privacy Policy, unless otherwise noted, all references to CandleCRM include https://www.candlecrm.com. The CandleCRM website is a customer relationship management software site. By using the CandleCRM website, you consent to the data practices described in this statement." ]

    [:h3 "Collection of your Personal Information"]
    [:p "CandleCRM may collect personally identifiable information, such as your name. We may gather additional personal or non-personal information in the future." ]
    [:p "Information about your computer hardware and software may be automatically collected by CandleCRM. This information can include: your IP address, browser type, domain names, access times and referring website addresses. This information is used for the operation of the service, to maintain quality of the service, and to provide general statistics regarding use of the CandleCRM website." ]
    [:p "CandleCRM encourages you to review the privacy statements of websites you choose to link to from CandleCRM so that you can understand how those websites collect, use and share your information. CandleCRM is not responsible for the privacy statements or other content on websites outside of the CandleCRM website."]

    [:h3 "Use of your Personal Information"]
    [:p "CandleCRM collects and uses your personal information to operate its website(s) and deliver the services you have requested." ]
    [:p "CandleCRM may also use your personally identifiable information to inform you of other products or services available from CandleCRM. CandleCRM may also contact you via surveys to conduct research about your opinion of current services or of potential new services that may be offered." ]
    [:p "CandleCRM does not sell, rent or lease its customer lists to third parties." ]
    [:p "CandleCRM may share data with trusted partners to help perform statistical analysis, send you email or postal mail, provide customer support, or arrange for deliveries. All such third parties are prohibited from using your personal information except to provide these services to CandleCRM, and they are required to maintain the confidentiality of your information." ]
    [:p "CandleCRM may keep track of the websites and pages our users visit within CandleCRM, in order to determine what CandleCRM services are the most popular. This data is used to deliver customized content within CandleCRM to customers whose behavior indicates that they are interested in a particular subject area." ]
    [:p "CandleCRM will disclose your personal information, without notice, only if required to do so by law or in the good faith belief that such action is necessary to: (a) conform to the edicts of the law or comply with legal process served on CandleCRM or the site; (b) protect and defend the rights or property of CandleCRM; and, (c) act under exigent circumstances to protect the personal safety of users of CandleCRM, or the public." ]

    [:h3 "Use of Cookies"]
    [:p "The CandleCRM website may use \"cookies\" to help you personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer. Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you." ]
    [:p "One of the primary purposes of cookies is to provide a convenience feature to save you time. The purpose of a cookie is to tell the Web server that you have returned to a specific page. For example, if you personalize CandleCRM pages, or register with CandleCRM site or services, a cookie helps CandleCRM to recall your specific information on subsequent visits. This simplifies the process of recording your personal information, such as billing addresses, shipping addresses, and so on. When you return to the same CandleCRM website, the information you previously provided can be retrieved, so you can easily use the CandleCRM features that you customized." ]
    [:p "You have the ability to accept or decline cookies. Most Web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. If you choose to decline cookies, you may not be able to fully experience the interactive features of the CandleCRM services or websites you visit." ]
    [:p "When personal information (such as a credit card number) is transmitted to other websites, it is protected through the use of encryption, such as the Secure Sockets Layer (SSL) protocol." ]

    [:h3 "Children Under Thirteen"]
    [:p "CandleCRM does not knowingly collect personally identifiable information from children under the age of thirteen. If you are under the age of thirteen, you must ask your parent or guardian for permission to use this website." ]

    [:h3 "Disconnecting your CandleCRM Account from Third Party Websites"]
    [:p "You will be able to connect your CandleCRM account to third party accounts. BY CONNECTING YOUR CANDLECRM ACCOUNT TO YOUR THIRD PARTY ACCOUNT, YOU ACKNOWLEDGE AND AGREE THAT YOU ARE CONSENTING TO THE CONTINUOUS RELEASE OF INFORMATION ABOUT YOU TO OTHERS (IN ACCORDANCE WITH YOUR PRIVACY SETTINGS ON THOSE THIRD PARTY SITES). IF YOU DO NOT WANT INFORMATION ABOUT YOU, INCLUDING PERSONALLY IDENTIFYING INFORMATION, TO BE SHARED IN THIS MANNER, DO NOT USE THE THIS FEATURE. You may disconnect your account from a third party account at any time. Users may learn how to disconnect their accounts from third-party websites by visiting their \"My Account\" page. Users may also contact us via email."]

    [:h3 "Opt-Out & Unsubscribe"]
    [:p "We respect your privacy and give you an opportunity to opt-out of receiving announcements of certain information. Users may opt-out of receiving any or all communications from CandleCRM by contacting us here: admin@candlecrm.com."]

    [:h3 "Changes to this Statement"]
    [:p "CandleCRM will occasionally update this Statement of Privacy to reflect company and customer feedback. CandleCRM encourages you to periodically review this Statement to be informed of how CandleCRM is protecting your information." ]

    [:h3 "Contact Information"]
    [:p "CandleCRM welcomes your questions or comments regarding this Statement of Privacy. If you believe that CandleCRM has not adhered to this Statement, please contact CandleCRM at:"] 
    [:p "CandleCRM"]
    [:p "2885 Sanford Ave SW #32484"]
    [:p "Grandville, Michigan 49418"]
    [:p "Email Address: admin@candlecrm.com"]
    [:p "Effective as of September 16, 2016"]]])
