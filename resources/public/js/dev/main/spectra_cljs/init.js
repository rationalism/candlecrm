// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.init');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('spectra_cljs.ajax');
goog.require('spectra_cljs.pages');
goog.require('clojure.string');
spectra_cljs.init.init = (function spectra_cljs$init$init(){
if(cljs.core.truth_((function (){var and__26928__auto__ = document;
if(cljs.core.truth_(and__26928__auto__)){
return document.getElementById;
} else {
return and__26928__auto__;
}
})())){
cljs.core.enable_console_print_BANG_.call(null);

spectra_cljs.ajax.start_BANG_.call(null);

return spectra_cljs.pages.render_all_BANG_.call(null);
} else {
return null;
}
});
window.onload = spectra_cljs.init.init;

//# sourceMappingURL=init.js.map?rel=1468801589731