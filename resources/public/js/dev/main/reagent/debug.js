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
var G__7487__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__7487 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__7488__i = 0, G__7488__a = new Array(arguments.length -  0);
while (G__7488__i < G__7488__a.length) {G__7488__a[G__7488__i] = arguments[G__7488__i + 0]; ++G__7488__i;}
  args = new cljs.core.IndexedSeq(G__7488__a,0);
} 
return G__7487__delegate.call(this,args);};
G__7487.cljs$lang$maxFixedArity = 0;
G__7487.cljs$lang$applyTo = (function (arglist__7489){
var args = cljs.core.seq(arglist__7489);
return G__7487__delegate(args);
});
G__7487.cljs$core$IFn$_invoke$arity$variadic = G__7487__delegate;
return G__7487;
})()
;})(o))
;

o.error = ((function (o){
return (function() { 
var G__7490__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__7490 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__7491__i = 0, G__7491__a = new Array(arguments.length -  0);
while (G__7491__i < G__7491__a.length) {G__7491__a[G__7491__i] = arguments[G__7491__i + 0]; ++G__7491__i;}
  args = new cljs.core.IndexedSeq(G__7491__a,0);
} 
return G__7490__delegate.call(this,args);};
G__7490.cljs$lang$maxFixedArity = 0;
G__7490.cljs$lang$applyTo = (function (arglist__7492){
var args = cljs.core.seq(arglist__7492);
return G__7490__delegate(args);
});
G__7490.cljs$core$IFn$_invoke$arity$variadic = G__7490__delegate;
return G__7490;
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

//# sourceMappingURL=debug.js.map