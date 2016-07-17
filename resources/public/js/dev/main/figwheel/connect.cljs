(ns figwheel.connect (:require [spectra_cljs.init] [figwheel.client] [figwheel.client.utils]))
(figwheel.client/start {:websocket-url "wss://www.candlecrm.com:3450/figwheel-ws", :build-id "dev"})

