// Compiled by ClojureScript 1.9.93 {}
goog.provide('reagent.debug');
goog.require('cljs.core');
reagent.debug.has_console = typeof console !== 'undefined';
reagent.debug.tracking = false;
if(typeof reagent.debug.warnings !== 'undefined'){
} else {
reagent.debug.warnings = cljs.core.atom.call(null,null);
}
if(typeof reagent.debug.track_console !== 'undefined'){
} else {
reagent.debug.track_console = (function (){var o = {};
o.warn = ((function (o){
return (function() { 
var G__5945__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__5945 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__5946__i = 0, G__5946__a = new Array(arguments.length -  0);
while (G__5946__i < G__5946__a.length) {G__5946__a[G__5946__i] = arguments[G__5946__i + 0]; ++G__5946__i;}
  args = new cljs.core.IndexedSeq(G__5946__a,0);
} 
return G__5945__delegate.call(this,args);};
G__5945.cljs$lang$maxFixedArity = 0;
G__5945.cljs$lang$applyTo = (function (arglist__5947){
var args = cljs.core.seq(arglist__5947);
return G__5945__delegate(args);
});
G__5945.cljs$core$IFn$_invoke$arity$variadic = G__5945__delegate;
return G__5945;
})()
;})(o))
;

o.error = ((function (o){
return (function() { 
var G__5948__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__5948 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__5949__i = 0, G__5949__a = new Array(arguments.length -  0);
while (G__5949__i < G__5949__a.length) {G__5949__a[G__5949__i] = arguments[G__5949__i + 0]; ++G__5949__i;}
  args = new cljs.core.IndexedSeq(G__5949__a,0);
} 
return G__5948__delegate.call(this,args);};
G__5948.cljs$lang$maxFixedArity = 0;
G__5948.cljs$lang$applyTo = (function (arglist__5950){
var args = cljs.core.seq(arglist__5950);
return G__5948__delegate(args);
});
G__5948.cljs$core$IFn$_invoke$arity$variadic = G__5948__delegate;
return G__5948;
})()
;})(o))
;

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
reagent.debug.tracking = true;

cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

f.call(null);

var warns = cljs.core.deref.call(null,reagent.debug.warnings);
cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

reagent.debug.tracking = false;

return warns;
});

//# sourceMappingURL=debug.js.map?rel=1468744496017