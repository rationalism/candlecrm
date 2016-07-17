// Compiled by ClojureScript 1.9.93 {}
goog.provide('reagent.dom');
goog.require('cljs.core');
goog.require('reagent.impl.util');
goog.require('reagent.interop');
goog.require('reagent.ratom');
goog.require('reagent.impl.template');
goog.require('reagent.impl.batching');
goog.require('cljsjs.react.dom');
goog.require('reagent.debug');
if(typeof reagent.dom.imported !== 'undefined'){
} else {
reagent.dom.imported = null;
}
reagent.dom.module = (function reagent$dom$module(){
if(cljs.core.some_QMARK_.call(null,reagent.dom.imported)){
return reagent.dom.imported;
} else {
if(typeof ReactDOM !== 'undefined'){
return reagent.dom.imported = ReactDOM;
} else {
if(typeof require !== 'undefined'){
var or__6247__auto__ = reagent.dom.imported = require("react-dom");
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
throw (new Error("require('react-dom') failed"));
}
} else {
throw (new Error("js/ReactDOM is missing"));

}
}
}
});
if(typeof reagent.dom.roots !== 'undefined'){
} else {
reagent.dom.roots = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
reagent.dom.unmount_comp = (function reagent$dom$unmount_comp(container){
cljs.core.swap_BANG_.call(null,reagent.dom.roots,cljs.core.dissoc,container);

return (reagent.dom.module.call(null)["unmountComponentAtNode"])(container);
});
reagent.dom.render_comp = (function reagent$dom$render_comp(comp,container,callback){
var _STAR_always_update_STAR_7952 = reagent.impl.util._STAR_always_update_STAR_;
reagent.impl.util._STAR_always_update_STAR_ = true;

try{return (reagent.dom.module.call(null)["render"])(comp.call(null),container,((function (_STAR_always_update_STAR_7952){
return (function (){
var _STAR_always_update_STAR_7953 = reagent.impl.util._STAR_always_update_STAR_;
reagent.impl.util._STAR_always_update_STAR_ = false;

try{cljs.core.swap_BANG_.call(null,reagent.dom.roots,cljs.core.assoc,container,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [comp,container], null));

reagent.impl.batching.flush_after_render.call(null);

if(cljs.core.some_QMARK_.call(null,callback)){
return callback.call(null);
} else {
return null;
}
}finally {reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR_7953;
}});})(_STAR_always_update_STAR_7952))
);
}finally {reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR_7952;
}});
reagent.dom.re_render_component = (function reagent$dom$re_render_component(comp,container){
return reagent.dom.render_comp.call(null,comp,container,null);
});
/**
 * Render a Reagent component into the DOM. The first argument may be
 *   either a vector (using Reagent's Hiccup syntax), or a React element. The second argument should be a DOM node.
 * 
 *   Optionally takes a callback that is called when the component is in place.
 * 
 *   Returns the mounted component instance.
 */
reagent.dom.render = (function reagent$dom$render(var_args){
var args7954 = [];
var len__7322__auto___7957 = arguments.length;
var i__7323__auto___7958 = (0);
while(true){
if((i__7323__auto___7958 < len__7322__auto___7957)){
args7954.push((arguments[i__7323__auto___7958]));

var G__7959 = (i__7323__auto___7958 + (1));
i__7323__auto___7958 = G__7959;
continue;
} else {
}
break;
}

var G__7956 = args7954.length;
switch (G__7956) {
case 2:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return reagent.dom.render.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args7954.length)].join('')));

}
});

reagent.dom.render.cljs$core$IFn$_invoke$arity$2 = (function (comp,container){
return reagent.dom.render.call(null,comp,container,null);
});

reagent.dom.render.cljs$core$IFn$_invoke$arity$3 = (function (comp,container,callback){
reagent.ratom.flush_BANG_.call(null);

var f = (function (){
return reagent.impl.template.as_element.call(null,((cljs.core.fn_QMARK_.call(null,comp))?comp.call(null):comp));
});
return reagent.dom.render_comp.call(null,f,container,callback);
});

reagent.dom.render.cljs$lang$maxFixedArity = 3;

reagent.dom.unmount_component_at_node = (function reagent$dom$unmount_component_at_node(container){
return reagent.dom.unmount_comp.call(null,container);
});
/**
 * Returns the root DOM node of a mounted component.
 */
reagent.dom.dom_node = (function reagent$dom$dom_node(this$){
return (reagent.dom.module.call(null)["findDOMNode"])(this$);
});
reagent.impl.template.find_dom_node = reagent.dom.dom_node;
/**
 * Force re-rendering of all mounted Reagent components. This is
 *   probably only useful in a development environment, when you want to
 *   update components in response to some dynamic changes to code.
 * 
 *   Note that force-update-all may not update root components. This
 *   happens if a component 'foo' is mounted with `(render [foo])` (since
 *   functions are passed by value, and not by reference, in
 *   ClojureScript). To get around this you'll have to introduce a layer
 *   of indirection, for example by using `(render [#'foo])` instead.
 */
reagent.dom.force_update_all = (function reagent$dom$force_update_all(){
reagent.ratom.flush_BANG_.call(null);

var seq__7965_7969 = cljs.core.seq.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,reagent.dom.roots)));
var chunk__7966_7970 = null;
var count__7967_7971 = (0);
var i__7968_7972 = (0);
while(true){
if((i__7968_7972 < count__7967_7971)){
var v_7973 = cljs.core._nth.call(null,chunk__7966_7970,i__7968_7972);
cljs.core.apply.call(null,reagent.dom.re_render_component,v_7973);

var G__7974 = seq__7965_7969;
var G__7975 = chunk__7966_7970;
var G__7976 = count__7967_7971;
var G__7977 = (i__7968_7972 + (1));
seq__7965_7969 = G__7974;
chunk__7966_7970 = G__7975;
count__7967_7971 = G__7976;
i__7968_7972 = G__7977;
continue;
} else {
var temp__4657__auto___7978 = cljs.core.seq.call(null,seq__7965_7969);
if(temp__4657__auto___7978){
var seq__7965_7979__$1 = temp__4657__auto___7978;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7965_7979__$1)){
var c__7058__auto___7980 = cljs.core.chunk_first.call(null,seq__7965_7979__$1);
var G__7981 = cljs.core.chunk_rest.call(null,seq__7965_7979__$1);
var G__7982 = c__7058__auto___7980;
var G__7983 = cljs.core.count.call(null,c__7058__auto___7980);
var G__7984 = (0);
seq__7965_7969 = G__7981;
chunk__7966_7970 = G__7982;
count__7967_7971 = G__7983;
i__7968_7972 = G__7984;
continue;
} else {
var v_7985 = cljs.core.first.call(null,seq__7965_7979__$1);
cljs.core.apply.call(null,reagent.dom.re_render_component,v_7985);

var G__7986 = cljs.core.next.call(null,seq__7965_7979__$1);
var G__7987 = null;
var G__7988 = (0);
var G__7989 = (0);
seq__7965_7969 = G__7986;
chunk__7966_7970 = G__7987;
count__7967_7971 = G__7988;
i__7968_7972 = G__7989;
continue;
}
} else {
}
}
break;
}

return "Updated";
});

//# sourceMappingURL=dom.js.map