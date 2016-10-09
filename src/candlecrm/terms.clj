(ns candlecrm.terms
  (:require [clojure.string :as str]
            [hiccup.core :refer :all]
            [hiccup.page :refer :all]
            [candlecrm.common :refer :all]
            [candlecrm_cljc.schema :as s]
            [candlecrm.environ :refer [env]]))

(defn tos-html []
  [:div {:class "container"}
   [:div {:class "row"}
    [:br][:br]
    [:h2 "CandleCRM Terms of Service"]
    [:h3 "Agreement between user and CandleCRM"]
    [:p "Welcome to https://www.candlecrm.com/. The CandleCRM website at https://www.candlecrm.com/ (the \"Site\") is comprised of various web pages operated by CandleCRM. https://www.candlecrm.com/ is offered to you conditioned on your acceptance without modification of the terms, conditions, and notices contained herein (the \"Terms\"). Your use of https://www.candlecrm.com/ constitutes your agreement to all such Terms. Please read these terms carefully, and keep a copy of them for your reference."]

    [:h3 "https://www.candlecrm.com/ is a E-commerce Site"]
    [:p "CandleCRM provides cloud-based customer relationship management software to individuals and small businesses."]

    [:h3 "Privacy"]
    [:p "Your use of https://www.candlecrm.com/ is subject to CandleCRM's "
     [:a {:href "/privacy.html"} "Privacy Policy"]
     ". Please review our "
     [:a {:href "/privacy.html"} "Privacy Policy"]
     ", which also governs the Site and informs users of our data collection practices."]

    [:h3 "Electronic Communications"]
    [:p "Visiting https://www.candlecrm.com/ or sending emails to CandleCRM constitutes electronic communications. You consent to receive electronic communications and you agree that all agreements, notices, disclosures and other communications that we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communications be in writing."]

    [:h3 "Your account"]
    [:p "If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. You may not assign or otherwise transfer your account to any other person or entity. You acknowledge that CandleCRM is not responsible for third party access to your account that results from theft or misappropriation of your account. CandleCRM and its associates reserve the right to refuse or cancel service, terminate accounts, or remove or edit content in our sole discretion."]
    [:p "CandleCRM does not knowingly collect, either online or offline, personal information from persons under the age of thirteen. If you are under 18, you may use https://www.candlecrm.com/ only with permission of a parent or guardian."]

    [:h3 "Cancellation/Refund Policy"]
    [:p "You may cancel your subscription to the CandleCRM service at any time. Please contact us at admin@candlecrm.com with any questions."]

    [:h3 "Links to third party sites/Third party services"]
    [:p "https://www.candlecrm.com/ may contain links to other websites (\"Linked Sites\"). The Linked Sites are not under the control of CandleCRM and CandleCRM is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. CandleCRM is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by CandleCRM of the site or any association with its operators."]
    [:p "Certain services made available via https://www.candlecrm.com/ are delivered by third party sites and organizations. By using any product, service or functionality originating from the https://www.candlecrm.com/ domain, you hereby acknowledge and consent that CandleCRM may share such information and data with any third party with whom CandleCRM has a contractual relationship to provide the requested product, service or functionality on behalf of https://www.candlecrm.com/ users and customers."]

    [:h3 "No unlawful or prohibited use/Intellectual Property"]
    [:p "You are granted a non-exclusive, non-transferable, revocable license to access and use https://www.candlecrm.com/ strictly in accordance with these terms of use. As a condition of your use of the Site, you warrant to CandleCRM that you will not use the Site for any purpose that is unlawful or prohibited by these Terms. You may not use the Site in any manner which could damage, disable, overburden, or impair the Site or interfere with any other party's use and enjoyment of the Site. You may not obtain or attempt to obtain any materials or information through any means not intentionally made available or provided for through the Site."]
    [:p "All content included as part of the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of CandleCRM or its suppliers and protected by copyright and other laws that protect intellectual property and proprietary rights. You agree to observe and abide by all copyright and other proprietary notices, legends or other restrictions contained in any such content and will not make any changes thereto."]
    [:p "You will not modify, publish, transmit, reverse engineer, participate in the transfer or sale, create derivative works, or in any way exploit any of the content, in whole or in part, found on the Site. CandleCRM content is not for resale. Your use of the Site does not entitle you to make any unauthorized use of any protected content, and in particular you will not delete or alter any proprietary rights or attribution notices in any content. You will use protected content solely for your personal use, and will make no other use of the content without the express written permission of CandleCRM and the copyright owner. You agree that you do not acquire any ownership rights in any protected content. We do not grant you any licenses, express or implied, to the intellectual property of CandleCRM or our licensors except as expressly authorized by these Terms."]

    [:h3 "Third Party Accounts"]
    [:p "You will be able to connect your CandleCRM account to third party accounts. By connecting your CandleCRM account to your third party account, you acknowledge and agree that you are consenting to the continuous release of information about you to others (in accordance with your privacy settings on those third party sites). If you do not want information about you to be shared in this manner, do not use this feature."]

    [:h3 "International Users"]
    [:p "The Service is controlled, operated and administered by CandleCRM from our offices within the USA. If you access the Service from a location outside the USA, you are responsible for compliance with all local laws. You agree that you will not use the CandleCRM Content accessed through https://www.candlecrm.com/ in any country or in any manner prohibited by any applicable laws, restrictions or regulations."]

    [:h3 "Indemnification"]
    [:p "You agree to indemnify, defend and hold harmless CandleCRM, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (including reasonable attorneys' fees) relating to or arising out of your use of or inability to use the Site or services, any user postings made by you, your violation of any terms of this Agreement or your violation of any rights of a third party, or your violation of any applicable laws, rules or regulations. CandleCRM reserves the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will fully cooperate with CandleCRM in asserting any available defenses."]

    [:h3 "Liability disclaimer"]
    [:p "THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN. CANDLECRM AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME."]
    [:p "CANDLECRM AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED \"AS IS\" WITHOUT WARRANTY OR CONDITION OF ANY KIND. CANDLECRM AND/OR ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT."]
    [:p "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CANDLECRM AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY OR INABILITY TO USE THE SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE SITE, OR OTHERWISE ARISING OUT OF THE USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF CANDLECRM OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE."]

    [:h3 "Termination/access restriction"]
    [:p "CandleCRM reserves the right, in its sole discretion, to terminate your access to the Site and the related services or any portion thereof at any time, without notice. To the maximum extent permitted by law, this agreement is governed by the laws of the State of California and you hereby consent to the exclusive jurisdiction and venue of courts in California in all disputes arising out of or relating to the use of the Site. Use of the Site is unauthorized in any jurisdiction that does not give effect to all provisions of these Terms, including, without limitation, this section."]
    [:p "You agree that no joint venture, partnership, employment, or agency relationship exists between you and CandleCRM as a result of this agreement or use of the Site. CandleCRM's performance of this agreement is subject to existing laws and legal process, and nothing contained in this agreement is in derogation of CandleCRM's right to comply with governmental, court and law enforcement requests or requirements relating to your use of the Site or information provided to or gathered by CandleCRM with respect to such use. If any part of this agreement is determined to be invalid or unenforceable pursuant to applicable law including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remainder of the agreement shall continue in effect."]
    [:p "Unless otherwise specified herein, this agreement constitutes the entire agreement between the user and CandleCRM with respect to the Site and it supersedes all prior or contemporaneous communications and proposals, whether electronic, oral or written, between the user and CandleCRM with respect to the Site. A printed version of this agreement and of any notice given in electronic form shall be admissible in judicial or administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form. It is the express wish to the parties that this agreement and all related documents be written in English."]

    [:h3 "Changes to Terms"]
    [:p "CandleCRM reserves the right, in its sole discretion, to change the Terms under which https://www.candlecrm.com/ is offered. The most current version of the Terms will supersede all previous versions. CandleCRM encourages you to periodically review the Terms to stay informed of our updates."]

    [:h3 "Contact Us"]
    [:p "CandleCRM welcomes your questions or comments regarding the Terms:"]
    [:p "CandleCRM" [:br]
     "2885 Sanford Ave SW #32484" [:br]
     "Grandville, Michigan 49418"]
    [:p "Email Address:" [:br]
     "admin@candlecrm.com"]
    [:p "Effective as of September 16, 2016"]
    [:br][:br][:br]]])


