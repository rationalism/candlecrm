// Compiled by ClojureScript 1.9.93 {}
goog.provide('taoensso.encore');
goog.require('cljs.core');
goog.require('goog.net.XhrIoPool');
goog.require('goog.events');
goog.require('clojure.set');
goog.require('cljs.test');
goog.require('cljs.tools.reader.edn');
goog.require('taoensso.truss');
goog.require('goog.net.XhrIo');
goog.require('goog.Uri.QueryData');
goog.require('goog.string');
goog.require('goog.object');
goog.require('goog.string.StringBuffer');
goog.require('goog.net.EventType');
goog.require('goog.structs');
goog.require('goog.string.format');
goog.require('clojure.string');
goog.require('cljs.reader');
goog.require('goog.net.ErrorCode');
taoensso.encore.get_dynamic_assertion_data = (function taoensso$encore$get_dynamic_assertion_data(){
return taoensso.truss.get_dynamic_assertion_data.call(null);
});
taoensso.encore.encore_version = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),(64),(1)], null);
taoensso.encore.assert_min_encore_version = (function taoensso$encore$assert_min_encore_version(min_version){
var vec__13529 = taoensso.encore.encore_version;
var xc = cljs.core.nth.call(null,vec__13529,(0),null);
var yc = cljs.core.nth.call(null,vec__13529,(1),null);
var zc = cljs.core.nth.call(null,vec__13529,(2),null);
var vec__13532 = ((cljs.core.vector_QMARK_.call(null,min_version))?min_version:new cljs.core.Keyword(null,"version","version",425292698).cljs$core$IFn$_invoke$arity$1(taoensso.encore.parse_version.call(null,min_version)));
var xm = cljs.core.nth.call(null,vec__13532,(0),null);
var ym = cljs.core.nth.call(null,vec__13532,(1),null);
var zm = cljs.core.nth.call(null,vec__13532,(2),null);
var vec__13535 = cljs.core.mapv.call(null,((function (vec__13529,xc,yc,zc,vec__13532,xm,ym,zm){
return (function (p1__13519_SHARP_){
var or__26817__auto__ = p1__13519_SHARP_;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return (0);
}
});})(vec__13529,xc,yc,zc,vec__13532,xm,ym,zm))
,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [xm,ym,zm], null));
var xm__$1 = cljs.core.nth.call(null,vec__13535,(0),null);
var ym__$1 = cljs.core.nth.call(null,vec__13535,(1),null);
var zm__$1 = cljs.core.nth.call(null,vec__13535,(2),null);
if(((xc > xm__$1)) || ((cljs.core._EQ_.call(null,xc,xm__$1)) && (((yc > ym__$1)) || ((cljs.core._EQ_.call(null,yc,ym__$1)) && ((zc >= zm__$1)))))){
return null;
} else {
throw cljs.core.ex_info.call(null,[cljs.core.str("Insufficient `com.taoensso/encore` version. You may have a Leiningen dependency conflict (see http://goo.gl/qBbLvC for solution).")].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"min-version","min-version",-1697197126),clojure.string.join.call(null,".",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [xm__$1,ym__$1,zm__$1], null)),new cljs.core.Keyword(null,"your-version","your-version",-351781765),clojure.string.join.call(null,".",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [xc,yc,zc], null))], null));
}
});
/**
 * Given a name symbol and sigs, returns [<name-with-attrs-meta> <args>]
 */
taoensso.encore.name_with_attrs = (function taoensso$encore$name_with_attrs(var_args){
var args13538 = [];
var len__27348__auto___13547 = arguments.length;
var i__27349__auto___13548 = (0);
while(true){
if((i__27349__auto___13548 < len__27348__auto___13547)){
args13538.push((arguments[i__27349__auto___13548]));

var G__13549 = (i__27349__auto___13548 + (1));
i__27349__auto___13548 = G__13549;
continue;
} else {
}
break;
}

var G__13540 = args13538.length;
switch (G__13540) {
case 2:
return taoensso.encore.name_with_attrs.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore.name_with_attrs.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13538.length)].join('')));

}
});

taoensso.encore.name_with_attrs.cljs$core$IFn$_invoke$arity$2 = (function (sym,sigs){
return taoensso.encore.name_with_attrs.call(null,sym,null,sigs);
});

taoensso.encore.name_with_attrs.cljs$core$IFn$_invoke$arity$3 = (function (sym,attrs_merge,sigs){
var vec__13541 = (((typeof cljs.core.first.call(null,sigs) === 'string') && (cljs.core.next.call(null,sigs)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,sigs),cljs.core.next.call(null,sigs)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,sigs], null));
var _QMARK_docstring = cljs.core.nth.call(null,vec__13541,(0),null);
var sigs__$1 = cljs.core.nth.call(null,vec__13541,(1),null);
var vec__13544 = (((cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,sigs__$1))) && (cljs.core.next.call(null,sigs__$1)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first.call(null,sigs__$1),cljs.core.next.call(null,sigs__$1)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentArrayMap.EMPTY,sigs__$1], null));
var attrs = cljs.core.nth.call(null,vec__13544,(0),null);
var sigs__$2 = cljs.core.nth.call(null,vec__13544,(1),null);
var attrs__$1 = (cljs.core.truth_(_QMARK_docstring)?cljs.core.assoc.call(null,attrs,new cljs.core.Keyword(null,"doc","doc",1913296891),_QMARK_docstring):attrs);
var attrs__$2 = (cljs.core.truth_(cljs.core.meta.call(null,sym))?cljs.core.conj.call(null,cljs.core.meta.call(null,sym),attrs__$1):attrs__$1);
var attrs__$3 = cljs.core.conj.call(null,attrs__$2,attrs_merge);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta.call(null,sym,attrs__$3),sigs__$2], null);
});

taoensso.encore.name_with_attrs.cljs$lang$maxFixedArity = 3;


/**
 * Attempts to pave over differences in:
 *  `clojure.edn/read-string`, `clojure.tools.edn/read-string`,
 *  `cljs.reader/read-string`, `cljs.tools.reader/read-string`.
 * `cljs.reader` in particular can be a pain.
 */
taoensso.encore.read_edn = (function taoensso$encore$read_edn(var_args){
var args13551 = [];
var len__27348__auto___13554 = arguments.length;
var i__27349__auto___13555 = (0);
while(true){
if((i__27349__auto___13555 < len__27348__auto___13554)){
args13551.push((arguments[i__27349__auto___13555]));

var G__13556 = (i__27349__auto___13555 + (1));
i__27349__auto___13555 = G__13556;
continue;
} else {
}
break;
}

var G__13553 = args13551.length;
switch (G__13553) {
case 1:
return taoensso.encore.read_edn.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore.read_edn.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13551.length)].join('')));

}
});

taoensso.encore.read_edn.cljs$core$IFn$_invoke$arity$1 = (function (s){
return taoensso.encore.read_edn.call(null,null,s);
});

taoensso.encore.read_edn.cljs$core$IFn$_invoke$arity$2 = (function (opts,s){
if(((s == null)) || ((s === ""))){
return null;
} else {
if(typeof s === 'string'){
var readers = cljs.core.get.call(null,opts,new cljs.core.Keyword(null,"readers","readers",-2118263030),new cljs.core.Keyword("taoensso.encore","dynamic","taoensso.encore/dynamic",-1726758399));
var default$ = cljs.core.get.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Keyword("taoensso.encore","dynamic","taoensso.encore/dynamic",-1726758399));
var readers__$1 = (cljs.core.truth_(taoensso.encore.kw_identical_QMARK_.call(null,readers,new cljs.core.Keyword("taoensso.encore","dynamic","taoensso.encore/dynamic",-1726758399)))?taoensso.encore.map_keys.call(null,cljs.core.symbol,cljs.core.deref.call(null,cljs.reader._STAR_tag_table_STAR_)):readers);
var default$__$1 = (cljs.core.truth_(taoensso.encore.kw_identical_QMARK_.call(null,default$,new cljs.core.Keyword("taoensso.encore","dynamic","taoensso.encore/dynamic",-1726758399)))?cljs.core.deref.call(null,cljs.reader._STAR_default_data_reader_fn_STAR_):default$);
var opts__$1 = cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"readers","readers",-2118263030),readers__$1,new cljs.core.Keyword(null,"default","default",-1987822328),default$__$1);
return cljs.tools.reader.edn.read_string.call(null,opts__$1,s);
} else {
throw cljs.core.ex_info.call(null,"`read-edn` attempt against non-nil, non-string arg",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arg","arg",-1747261837),s,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type.call(null,s)], null));
}
}
});

taoensso.encore.read_edn.cljs$lang$maxFixedArity = 2;

/**
 * Prints arg to an edn string readable with `read-edn`
 */
taoensso.encore.pr_edn = (function taoensso$encore$pr_edn(var_args){
var args13558 = [];
var len__27348__auto___13563 = arguments.length;
var i__27349__auto___13564 = (0);
while(true){
if((i__27349__auto___13564 < len__27348__auto___13563)){
args13558.push((arguments[i__27349__auto___13564]));

var G__13565 = (i__27349__auto___13564 + (1));
i__27349__auto___13564 = G__13565;
continue;
} else {
}
break;
}

var G__13560 = args13558.length;
switch (G__13560) {
case 1:
return taoensso.encore.pr_edn.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore.pr_edn.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13558.length)].join('')));

}
});

taoensso.encore.pr_edn.cljs$core$IFn$_invoke$arity$1 = (function (x){
return taoensso.encore.pr_edn.call(null,null,x);
});

taoensso.encore.pr_edn.cljs$core$IFn$_invoke$arity$2 = (function (_opts,x){
var _STAR_print_level_STAR_13561 = cljs.core._STAR_print_level_STAR_;
var _STAR_print_length_STAR_13562 = cljs.core._STAR_print_length_STAR_;
cljs.core._STAR_print_level_STAR_ = null;

cljs.core._STAR_print_length_STAR_ = null;

try{return cljs.core.pr_str.call(null,x);
}finally {cljs.core._STAR_print_length_STAR_ = _STAR_print_length_STAR_13562;

cljs.core._STAR_print_level_STAR_ = _STAR_print_level_STAR_13561;
}});

taoensso.encore.pr_edn.cljs$lang$maxFixedArity = 2;

/**
 * Returns data map iff `x` is an error of any type on platform
 */
taoensso.encore.error_data = (function taoensso$encore$error_data(x){
var temp__4657__auto__ = (function (){var or__26817__auto__ = cljs.core.ex_data.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
if((x instanceof Error)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
return null;
}
}
})();
if(cljs.core.truth_(temp__4657__auto__)){
var data_map = temp__4657__auto__;
return cljs.core.merge.call(null,(function (){var err = x;
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"err-type","err-type",-116717722),cljs.core.type.call(null,err),new cljs.core.Keyword(null,"err-msg","err-msg",-1158512684),err.message,new cljs.core.Keyword(null,"err-cause","err-cause",897008749),err.cause], null);
})(),data_map);
} else {
return null;
}
});
taoensso.encore.some_QMARK_ = (function taoensso$encore$some_QMARK_(x){
return !((x == null));
});

taoensso.encore.stringy_QMARK_ = (function taoensso$encore$stringy_QMARK_(x){
return ((x instanceof cljs.core.Keyword)) || (typeof x === 'string');
});

taoensso.encore.ident_QMARK_ = (function taoensso$encore$ident_QMARK_(x){
return ((x instanceof cljs.core.Keyword)) || ((x instanceof cljs.core.Symbol));
});

taoensso.encore.boolean_QMARK_ = (function taoensso$encore$boolean_QMARK_(x){
return (x === true) || (x === false);
});

taoensso.encore.indexed_QMARK_ = (function taoensso$encore$indexed_QMARK_(x){
if(!((x == null))){
if(((x.cljs$lang$protocol_mask$partition0$ & (16))) || (x.cljs$core$IIndexed$)){
return true;
} else {
if((!x.cljs$lang$protocol_mask$partition0$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IIndexed,x);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IIndexed,x);
}
});

taoensso.encore.named_QMARK_ = (function taoensso$encore$named_QMARK_(x){
if(!((x == null))){
if(((x.cljs$lang$protocol_mask$partition1$ & (4096))) || (x.cljs$core$INamed$)){
return true;
} else {
return false;
}
} else {
return false;
}
});

taoensso.encore.editable_QMARK_ = (function taoensso$encore$editable_QMARK_(x){
if(!((x == null))){
if(((x.cljs$lang$protocol_mask$partition1$ & (4))) || (x.cljs$core$IEditableCollection$)){
return true;
} else {
return false;
}
} else {
return false;
}
});

taoensso.encore.derefable_QMARK_ = (function taoensso$encore$derefable_QMARK_(x){
if(!((x == null))){
if(((x.cljs$lang$protocol_mask$partition0$ & (32768))) || (x.cljs$core$IDeref$)){
return true;
} else {
if((!x.cljs$lang$protocol_mask$partition0$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,x);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.IDeref,x);
}
});

taoensso.encore.error_QMARK_ = (function taoensso$encore$error_QMARK_(x){
return (x instanceof Error);
});

taoensso.encore.atom_QMARK_ = (function taoensso$encore$atom_QMARK_(x){
return (x instanceof cljs.core.Atom);
});

taoensso.encore.lazy_seq_QMARK_ = (function taoensso$encore$lazy_seq_QMARK_(x){
return (x instanceof cljs.core.LazySeq);
});

taoensso.encore.re_pattern_QMARK_ = (function taoensso$encore$re_pattern_QMARK_(x){
return (x instanceof RegExp);
});

taoensso.encore.simple_ident_QMARK_ = (function taoensso$encore$simple_ident_QMARK_(x){
return (taoensso.encore.ident_QMARK_.call(null,x)) && ((cljs.core.namespace.call(null,x) == null));
});

taoensso.encore.qualified_ident_QMARK_ = (function taoensso$encore$qualified_ident_QMARK_(x){
var and__26809__auto__ = taoensso.encore.ident_QMARK_.call(null,x);
if(and__26809__auto__){
var and__26809__auto____$1 = cljs.core.namespace.call(null,x);
if(cljs.core.truth_(and__26809__auto____$1)){
return true;
} else {
return and__26809__auto____$1;
}
} else {
return and__26809__auto__;
}
});

taoensso.encore.simple_symbol_QMARK_ = (function taoensso$encore$simple_symbol_QMARK_(x){
return ((x instanceof cljs.core.Symbol)) && ((cljs.core.namespace.call(null,x) == null));
});

taoensso.encore.qualified_symbol_QMARK_ = (function taoensso$encore$qualified_symbol_QMARK_(x){
var and__26809__auto__ = (x instanceof cljs.core.Symbol);
if(and__26809__auto__){
var and__26809__auto____$1 = cljs.core.namespace.call(null,x);
if(cljs.core.truth_(and__26809__auto____$1)){
return true;
} else {
return and__26809__auto____$1;
}
} else {
return and__26809__auto__;
}
});

taoensso.encore.simple_keyword_QMARK_ = (function taoensso$encore$simple_keyword_QMARK_(x){
return ((x instanceof cljs.core.Keyword)) && ((cljs.core.namespace.call(null,x) == null));
});

taoensso.encore.qualified_keyword_QMARK_ = (function taoensso$encore$qualified_keyword_QMARK_(x){
var and__26809__auto__ = (x instanceof cljs.core.Keyword);
if(and__26809__auto__){
var and__26809__auto____$1 = cljs.core.namespace.call(null,x);
if(cljs.core.truth_(and__26809__auto____$1)){
return true;
} else {
return and__26809__auto____$1;
}
} else {
return and__26809__auto__;
}
});

taoensso.encore.nempty_str_QMARK_ = (function taoensso$encore$nempty_str_QMARK_(x){
return (typeof x === 'string') && (!(cljs.core._EQ_.call(null,x,"")));
});

taoensso.encore.nblank_str_QMARK_ = (function taoensso$encore$nblank_str_QMARK_(x){
return (typeof x === 'string') && (!(clojure.string.blank_QMARK_.call(null,x)));
});

taoensso.encore.nblank_QMARK_ = (function taoensso$encore$nblank_QMARK_(x){
return !(clojure.string.blank_QMARK_.call(null,x));
});

taoensso.encore.vec2_QMARK_ = (function taoensso$encore$vec2_QMARK_(x){
return (cljs.core.vector_QMARK_.call(null,x)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,x),(2)));
});

taoensso.encore.vec3_QMARK_ = (function taoensso$encore$vec3_QMARK_(x){
return (cljs.core.vector_QMARK_.call(null,x)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,x),(3)));
});
taoensso.encore.nneg_QMARK_ = (function taoensso$encore$nneg_QMARK_(x){
return !((x < (0)));
});

taoensso.encore.zero_num_QMARK_ = (function taoensso$encore$zero_num_QMARK_(x){
return cljs.core._EQ_.call(null,x,(0));
});

taoensso.encore.regular_num_QMARK_ = (function taoensso$encore$regular_num_QMARK_(x){
return (typeof x === 'number') && (!(isNaN(x))) && (!((x === Infinity)));
});

taoensso.encore.float_QMARK_ = (function taoensso$encore$float_QMARK_(x){
return (typeof x === 'number') && (!(isNaN(x))) && (!((x === Infinity))) && (!((parseFloat(x) === parseInt(x,(10)))));
});

taoensso.encore.int_QMARK_ = (function taoensso$encore$int_QMARK_(x){
return (typeof x === 'number') && (!(isNaN(x))) && (!((x === Infinity))) && ((parseFloat(x) === parseInt(x,(10))));
});

taoensso.encore.nat_num_QMARK_ = (function taoensso$encore$nat_num_QMARK_(x){
return (typeof x === 'number') && (!((x < (0))));
});

taoensso.encore.pos_num_QMARK_ = (function taoensso$encore$pos_num_QMARK_(x){
return (typeof x === 'number') && ((x > (0)));
});

taoensso.encore.neg_num_QMARK_ = (function taoensso$encore$neg_num_QMARK_(x){
return (typeof x === 'number') && ((x < (0)));
});

taoensso.encore.nat_int_QMARK_ = (function taoensso$encore$nat_int_QMARK_(x){
return (taoensso.encore.int_QMARK_.call(null,x)) && (!((x < (0))));
});

taoensso.encore.pos_int_QMARK_ = (function taoensso$encore$pos_int_QMARK_(x){
return (taoensso.encore.int_QMARK_.call(null,x)) && ((x > (0)));
});

taoensso.encore.neg_int_QMARK_ = (function taoensso$encore$neg_int_QMARK_(x){
return (taoensso.encore.int_QMARK_.call(null,x)) && ((x < (0)));
});

taoensso.encore.nat_float_QMARK_ = (function taoensso$encore$nat_float_QMARK_(x){
return (taoensso.encore.float_QMARK_.call(null,x)) && (!((x < (0))));
});

taoensso.encore.pos_float_QMARK_ = (function taoensso$encore$pos_float_QMARK_(x){
return (taoensso.encore.float_QMARK_.call(null,x)) && ((x > (0)));
});

taoensso.encore.neg_float_QMARK_ = (function taoensso$encore$neg_float_QMARK_(x){
return (taoensso.encore.float_QMARK_.call(null,x)) && ((x < (0)));
});

taoensso.encore.udt_QMARK_ = (function taoensso$encore$udt_QMARK_(x){
return (taoensso.encore.int_QMARK_.call(null,x)) && (!((x < (0))));
});

taoensso.encore.pval_QMARK_ = (function taoensso$encore$pval_QMARK_(x){
var and__26809__auto__ = typeof x === 'number';
if(and__26809__auto__){
var n = x;
return ((n >= 0.0)) && ((n <= 1.0));
} else {
return and__26809__auto__;
}
});
taoensso.encore.chan_QMARK_ = (function taoensso$encore$chan_QMARK_(x){
return (x instanceof cljs.core.async.impl.channels.ManyToManyChannel);
});
taoensso.encore.kw_identical_QMARK_ = (function taoensso$encore$kw_identical_QMARK_(x,y){
if((x === y)){
return true;
} else {
if(((x instanceof cljs.core.Keyword)) && ((y instanceof cljs.core.Keyword))){
return (x.fqn === y.fqn);
} else {
return false;
}
}
});
taoensso.encore.as__QMARK_nzero = (function taoensso$encore$as__QMARK_nzero(x){
if(typeof x === 'number'){
if((x === (0))){
return null;
} else {
return x;
}
} else {
return null;
}
});
taoensso.encore.as__QMARK_nblank = (function taoensso$encore$as__QMARK_nblank(x){
if(typeof x === 'string'){
if(clojure.string.blank_QMARK_.call(null,x)){
return null;
} else {
return x;
}
} else {
return null;
}
});
taoensso.encore.as__QMARK_kw = (function taoensso$encore$as__QMARK_kw(x){
if((x instanceof cljs.core.Keyword)){
return x;
} else {
if(typeof x === 'string'){
return cljs.core.keyword.call(null,x);
} else {
return null;
}
}
});
taoensso.encore.as__QMARK_name = (function taoensso$encore$as__QMARK_name(x){
if(taoensso.encore.named_QMARK_.call(null,x)){
return cljs.core.name.call(null,x);
} else {
if(typeof x === 'string'){
return x;
} else {
return null;
}
}
});
taoensso.encore.as__QMARK_qname = (function taoensso$encore$as__QMARK_qname(x){
if(taoensso.encore.named_QMARK_.call(null,x)){
var n = cljs.core.name.call(null,x);
var temp__4655__auto__ = cljs.core.namespace.call(null,x);
if(cljs.core.truth_(temp__4655__auto__)){
var ns = temp__4655__auto__;
return [cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(n)].join('');
} else {
return n;
}
} else {
if(typeof x === 'string'){
return x;
} else {
return null;
}
}
});
taoensso.encore.as__QMARK_nempty_str = (function taoensso$encore$as__QMARK_nempty_str(x){
if(typeof x === 'string'){
if(cljs.core._EQ_.call(null,x,"")){
return null;
} else {
return x;
}
} else {
return null;
}
});
taoensso.encore.as__QMARK_int = (function taoensso$encore$as__QMARK_int(x){
if(typeof x === 'number'){
return cljs.core.long$.call(null,x);
} else {
if(typeof x === 'string'){
var x__$1 = parseInt(x,(10));
if(cljs.core.truth_(isNaN(x__$1))){
return null;
} else {
return x__$1;
}
} else {
return null;
}
}
});
taoensso.encore.as__QMARK_float = (function taoensso$encore$as__QMARK_float(x){
if(typeof x === 'number'){
return x;
} else {
if(typeof x === 'string'){
var x__$1 = parseFloat(x);
if(cljs.core.truth_(isNaN(x__$1))){
return null;
} else {
return x__$1;
}
} else {
return null;
}
}
});
taoensso.encore.as__QMARK_udt = (function taoensso$encore$as__QMARK_udt(x){
var temp__4657__auto__ = taoensso.encore.as__QMARK_int.call(null,x);
if(cljs.core.truth_(temp__4657__auto__)){
var n = temp__4657__auto__;
if((n < (0))){
return null;
} else {
return n;
}
} else {
return null;
}
});
taoensso.encore.as__QMARK_nat_int = (function taoensso$encore$as__QMARK_nat_int(x){
var temp__4657__auto__ = taoensso.encore.as__QMARK_int.call(null,x);
if(cljs.core.truth_(temp__4657__auto__)){
var n = temp__4657__auto__;
if((n < (0))){
return null;
} else {
return n;
}
} else {
return null;
}
});
taoensso.encore.as__QMARK_pos_int = (function taoensso$encore$as__QMARK_pos_int(x){
var temp__4657__auto__ = taoensso.encore.as__QMARK_int.call(null,x);
if(cljs.core.truth_(temp__4657__auto__)){
var n = temp__4657__auto__;
if((n > (0))){
return n;
} else {
return null;
}
} else {
return null;
}
});
taoensso.encore.as__QMARK_nat_float = (function taoensso$encore$as__QMARK_nat_float(x){
var temp__4657__auto__ = taoensso.encore.as__QMARK_float.call(null,x);
if(cljs.core.truth_(temp__4657__auto__)){
var n = temp__4657__auto__;
if((n < (0))){
return null;
} else {
return n;
}
} else {
return null;
}
});
taoensso.encore.as__QMARK_pos_float = (function taoensso$encore$as__QMARK_pos_float(x){
var temp__4657__auto__ = taoensso.encore.as__QMARK_float.call(null,x);
if(cljs.core.truth_(temp__4657__auto__)){
var n = temp__4657__auto__;
if((n > (0))){
return n;
} else {
return null;
}
} else {
return null;
}
});
taoensso.encore.as__QMARK_pval = (function taoensso$encore$as__QMARK_pval(x){
var temp__4657__auto__ = taoensso.encore.as__QMARK_float.call(null,x);
if(cljs.core.truth_(temp__4657__auto__)){
var f = temp__4657__auto__;
if((f > 1.0)){
return 1.0;
} else {
if((f < 0.0)){
return 0.0;
} else {
return f;
}
}
} else {
return null;
}
});
taoensso.encore.as__QMARK_bool = (function taoensso$encore$as__QMARK_bool(x){
if((x == null)){
return null;
} else {
if((x === true) || (x === false)){
return x;
} else {
if((cljs.core._EQ_.call(null,x,(0))) || (cljs.core._EQ_.call(null,x,"false")) || (cljs.core._EQ_.call(null,x,"FALSE")) || (cljs.core._EQ_.call(null,x,"0"))){
return false;
} else {
if((cljs.core._EQ_.call(null,x,(1))) || (cljs.core._EQ_.call(null,x,"true")) || (cljs.core._EQ_.call(null,x,"TRUE")) || (cljs.core._EQ_.call(null,x,"1"))){
return true;
} else {
return null;
}
}
}
}
});
taoensso.encore.as__QMARK_email = (function taoensso$encore$as__QMARK_email(_QMARK_s){
if(cljs.core.truth_(_QMARK_s)){
return cljs.core.re_find.call(null,/^[^\s@]+@[^\s@]+\.\S*[^\.]$/,clojure.string.trim.call(null,_QMARK_s));
} else {
return null;
}
});
taoensso.encore.as__QMARK_nemail = (function taoensso$encore$as__QMARK_nemail(_QMARK_s){
var temp__4657__auto__ = taoensso.encore.as__QMARK_email.call(null,_QMARK_s);
if(cljs.core.truth_(temp__4657__auto__)){
var email = temp__4657__auto__;
return clojure.string.lower_case.call(null,email);
} else {
return null;
}
});
taoensso.encore.try_pred = (function taoensso$encore$try_pred(pred,x){
try{return pred.call(null,x);
}catch (e13578){if((e13578 instanceof Error)){
var _ = e13578;
return false;
} else {
throw e13578;

}
}});
taoensso.encore.when_QMARK_ = (function taoensso$encore$when_QMARK_(pred,x){
if(cljs.core.truth_(taoensso.encore.try_pred.call(null,pred,x))){
return x;
} else {
return null;
}
});
/**
 * Cheaper `have!` that provides less diagnostic info
 */
taoensso.encore.is_BANG_ = (function taoensso$encore$is_BANG_(var_args){
var args13579 = [];
var len__27348__auto___13582 = arguments.length;
var i__27349__auto___13583 = (0);
while(true){
if((i__27349__auto___13583 < len__27348__auto___13582)){
args13579.push((arguments[i__27349__auto___13583]));

var G__13584 = (i__27349__auto___13583 + (1));
i__27349__auto___13583 = G__13584;
continue;
} else {
}
break;
}

var G__13581 = args13579.length;
switch (G__13581) {
case 1:
return taoensso.encore.is_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore.is_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore.is_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13579.length)].join('')));

}
});

taoensso.encore.is_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (x){
return taoensso.encore.is_BANG_.call(null,cljs.core.identity,x,null);
});

taoensso.encore.is_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (pred,x){
return taoensso.encore.is_BANG_.call(null,cljs.core.identity,x,null);
});

taoensso.encore.is_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (pred,x,fail__QMARK_data){
if(cljs.core.truth_(taoensso.encore.try_pred.call(null,pred,x))){
return x;
} else {
throw cljs.core.ex_info.call(null,[cljs.core.str("`is!` "),cljs.core.str([cljs.core.str(pred)].join('')),cljs.core.str(" failure against arg: "),cljs.core.str(cljs.core.pr_str.call(null,x))].join(''),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"arg-val","arg-val",1802419280),x,new cljs.core.Keyword(null,"arg-type","arg-type",-2020167363),cljs.core.type.call(null,x),new cljs.core.Keyword(null,"fail-?data","fail-?data",1702764975),fail__QMARK_data], null));
}
});

taoensso.encore.is_BANG_.cljs$lang$maxFixedArity = 3;

taoensso.encore._as_throw = (function taoensso$encore$_as_throw(as_name,x){
throw cljs.core.ex_info.call(null,[cljs.core.str("`as-"),cljs.core.str(cljs.core.name.call(null,as_name)),cljs.core.str("` failed against: `"),cljs.core.str(cljs.core.pr_str.call(null,x)),cljs.core.str("`")].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arg","arg",-1747261837),x,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type.call(null,x)], null));
});
taoensso.encore.as_nzero = (function taoensso$encore$as_nzero(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_nzero.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"nzero","nzero",2053173656),x);
}
});
taoensso.encore.as_nblank = (function taoensso$encore$as_nblank(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_nblank.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"nblank","nblank",626815585),x);
}
});
taoensso.encore.as_nempty_str = (function taoensso$encore$as_nempty_str(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_nempty_str.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"nempty-str","nempty-str",-215700100),x);
}
});
taoensso.encore.as_kw = (function taoensso$encore$as_kw(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_kw.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"kw","kw",1158308175),x);
}
});
taoensso.encore.as_name = (function taoensso$encore$as_name(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_name.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"name","name",1843675177),x);
}
});
taoensso.encore.as_qname = (function taoensso$encore$as_qname(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_qname.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"qname","qname",-1983612179),x);
}
});
taoensso.encore.as_email = (function taoensso$encore$as_email(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_email.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"email","email",1415816706),x);
}
});
taoensso.encore.as_nemail = (function taoensso$encore$as_nemail(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_nemail.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"nemail","nemail",318708381),x);
}
});
taoensso.encore.as_udt = (function taoensso$encore$as_udt(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_udt.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"udt","udt",2011712751),x);
}
});
taoensso.encore.as_int = (function taoensso$encore$as_int(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_int.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"int","int",-1741416922),x);
}
});
taoensso.encore.as_nat_int = (function taoensso$encore$as_nat_int(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_nat_int.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"nat-int","nat-int",313429715),x);
}
});
taoensso.encore.as_pos_int = (function taoensso$encore$as_pos_int(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_pos_int.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"pos-int","pos-int",15030207),x);
}
});
taoensso.encore.as_float = (function taoensso$encore$as_float(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_float.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"float","float",-1732389368),x);
}
});
taoensso.encore.as_nat_float = (function taoensso$encore$as_nat_float(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_nat_float.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"nat-float","nat-float",-371030973),x);
}
});
taoensso.encore.as_pos_float = (function taoensso$encore$as_pos_float(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_pos_float.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"pos-float","pos-float",-715200084),x);
}
});
taoensso.encore.as_pval = (function taoensso$encore$as_pval(x){
var or__26817__auto__ = taoensso.encore.as__QMARK_pval.call(null,x);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"pval","pval",-274256857),x);
}
});
taoensso.encore.as_bool = (function taoensso$encore$as_bool(x){
var _QMARK_b = taoensso.encore.as__QMARK_bool.call(null,x);
if((_QMARK_b == null)){
return taoensso.encore._as_throw.call(null,new cljs.core.Keyword(null,"bool","bool",1444635321),x);
} else {
return _QMARK_b;
}
});
taoensso.encore.explode_keyword = (function taoensso$encore$explode_keyword(k){
return clojure.string.split.call(null,taoensso.encore.as_qname.call(null,k),/[\.\/]/);
});
taoensso.encore.merge_keywords = (function taoensso$encore$merge_keywords(var_args){
var args13586 = [];
var len__27348__auto___13589 = arguments.length;
var i__27349__auto___13590 = (0);
while(true){
if((i__27349__auto___13590 < len__27348__auto___13589)){
args13586.push((arguments[i__27349__auto___13590]));

var G__13591 = (i__27349__auto___13590 + (1));
i__27349__auto___13590 = G__13591;
continue;
} else {
}
break;
}

var G__13588 = args13586.length;
switch (G__13588) {
case 1:
return taoensso.encore.merge_keywords.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore.merge_keywords.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13586.length)].join('')));

}
});

taoensso.encore.merge_keywords.cljs$core$IFn$_invoke$arity$1 = (function (ks){
return taoensso.encore.merge_keywords.call(null,ks,false);
});

taoensso.encore.merge_keywords.cljs$core$IFn$_invoke$arity$2 = (function (ks,no_slash_QMARK_){
var parts = cljs.core.reduce.call(null,(function (acc,in$){
if(cljs.core.truth_(in$)){
return cljs.core.into.call(null,acc,taoensso.encore.explode_keyword.call(null,in$));
} else {
return acc;
}
}),cljs.core.PersistentVector.EMPTY,ks);
if(cljs.core.seq.call(null,parts)){
if(cljs.core.truth_(no_slash_QMARK_)){
return cljs.core.keyword.call(null,clojure.string.join.call(null,".",parts));
} else {
var ppop = cljs.core.pop.call(null,parts);
return cljs.core.keyword.call(null,((cljs.core.seq.call(null,ppop))?clojure.string.join.call(null,".",ppop):null),cljs.core.peek.call(null,parts));
}
} else {
return null;
}
});

taoensso.encore.merge_keywords.cljs$lang$maxFixedArity = 2;

/**
 * Like `force` for refs
 */
taoensso.encore.force_ref = (function taoensso$encore$force_ref(x){
if(taoensso.encore.derefable_QMARK_.call(null,x)){
return cljs.core.deref.call(null,x);
} else {
return x;
}
});
taoensso.encore.merge_meta = (function taoensso$encore$merge_meta(x,m){
return cljs.core.with_meta.call(null,x,cljs.core.merge.call(null,cljs.core.meta.call(null,x),m));
});
taoensso.encore.without_meta = (function taoensso$encore$without_meta(x){
if(cljs.core.truth_(cljs.core.meta.call(null,x))){
return cljs.core.with_meta.call(null,x,null);
} else {
return x;
}
});
taoensso.encore.some_EQ_ = (function taoensso$encore$some_EQ_(var_args){
var args13594 = [];
var len__27348__auto___13600 = arguments.length;
var i__27349__auto___13601 = (0);
while(true){
if((i__27349__auto___13601 < len__27348__auto___13600)){
args13594.push((arguments[i__27349__auto___13601]));

var G__13602 = (i__27349__auto___13601 + (1));
i__27349__auto___13601 = G__13602;
continue;
} else {
}
break;
}

var G__13599 = args13594.length;
switch (G__13599) {
case 2:
return taoensso.encore.some_EQ_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__27363__auto__ = (new cljs.core.IndexedSeq(args13594.slice((2)),(0),null));
return taoensso.encore.some_EQ_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27363__auto__);

}
});

taoensso.encore.some_EQ_.cljs$core$IFn$_invoke$arity$2 = (function (x,y){
return (taoensso.encore.some_QMARK_.call(null,x)) && (cljs.core._EQ_.call(null,x,y));
});

taoensso.encore.some_EQ_.cljs$core$IFn$_invoke$arity$variadic = (function (x,y,more){
var and__26809__auto__ = taoensso.encore.some_QMARK_.call(null,x);
if(and__26809__auto__){
var and__26809__auto____$1 = cljs.core._EQ_.call(null,x,y);
if(and__26809__auto____$1){
return taoensso.encore.revery_QMARK_.call(null,((function (and__26809__auto____$1,and__26809__auto__){
return (function (p1__13593_SHARP_){
return cljs.core._EQ_.call(null,p1__13593_SHARP_,x);
});})(and__26809__auto____$1,and__26809__auto__))
,more);
} else {
return and__26809__auto____$1;
}
} else {
return and__26809__auto__;
}
});

taoensso.encore.some_EQ_.cljs$lang$applyTo = (function (seq13595){
var G__13596 = cljs.core.first.call(null,seq13595);
var seq13595__$1 = cljs.core.next.call(null,seq13595);
var G__13597 = cljs.core.first.call(null,seq13595__$1);
var seq13595__$2 = cljs.core.next.call(null,seq13595__$1);
return taoensso.encore.some_EQ_.cljs$core$IFn$_invoke$arity$variadic(G__13596,G__13597,seq13595__$2);
});

taoensso.encore.some_EQ_.cljs$lang$maxFixedArity = (2);

/**
 * Returns first non-nil arg, or nil
 */
taoensso.encore.nnil = (function taoensso$encore$nnil(var_args){
var args13604 = [];
var len__27348__auto___13611 = arguments.length;
var i__27349__auto___13612 = (0);
while(true){
if((i__27349__auto___13612 < len__27348__auto___13611)){
args13604.push((arguments[i__27349__auto___13612]));

var G__13613 = (i__27349__auto___13612 + (1));
i__27349__auto___13612 = G__13613;
continue;
} else {
}
break;
}

var G__13610 = args13604.length;
switch (G__13610) {
case 0:
return taoensso.encore.nnil.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return taoensso.encore.nnil.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore.nnil.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore.nnil.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
var argseq__27363__auto__ = (new cljs.core.IndexedSeq(args13604.slice((3)),(0),null));
return taoensso.encore.nnil.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__27363__auto__);

}
});

taoensso.encore.nnil.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
});

taoensso.encore.nnil.cljs$core$IFn$_invoke$arity$1 = (function (x){
return x;
});

taoensso.encore.nnil.cljs$core$IFn$_invoke$arity$2 = (function (x,y){
if((x == null)){
return y;
} else {
return x;
}
});

taoensso.encore.nnil.cljs$core$IFn$_invoke$arity$3 = (function (x,y,z){
if((x == null)){
if((y == null)){
return z;
} else {
return y;
}
} else {
return x;
}
});

taoensso.encore.nnil.cljs$core$IFn$_invoke$arity$variadic = (function (x,y,z,more){
if((x == null)){
if((y == null)){
if((z == null)){
return taoensso.encore.rfirst.call(null,taoensso.encore.some_QMARK_,more);
} else {
return z;
}
} else {
return y;
}
} else {
return x;
}
});

taoensso.encore.nnil.cljs$lang$applyTo = (function (seq13605){
var G__13606 = cljs.core.first.call(null,seq13605);
var seq13605__$1 = cljs.core.next.call(null,seq13605);
var G__13607 = cljs.core.first.call(null,seq13605__$1);
var seq13605__$2 = cljs.core.next.call(null,seq13605__$1);
var G__13608 = cljs.core.first.call(null,seq13605__$2);
var seq13605__$3 = cljs.core.next.call(null,seq13605__$2);
return taoensso.encore.nnil.cljs$core$IFn$_invoke$arity$variadic(G__13606,G__13607,G__13608,seq13605__$3);
});

taoensso.encore.nnil.cljs$lang$maxFixedArity = (3);

taoensso.encore.sentinel = {};

taoensso.encore.sentinel_QMARK_ = (function taoensso$encore$sentinel_QMARK_(x){
return (x === taoensso.encore.sentinel);
});

taoensso.encore.nil__GT_sentinel = (function taoensso$encore$nil__GT_sentinel(x){
if((x == null)){
return taoensso.encore.sentinel;
} else {
return x;
}
});

taoensso.encore.sentinel__GT_nil = (function taoensso$encore$sentinel__GT_nil(x){
if(cljs.core.truth_(taoensso.encore.sentinel_QMARK_.call(null,x))){
return null;
} else {
return x;
}
});
taoensso.encore.parse_version = (function taoensso$encore$parse_version(x){
var vec__13620 = clojure.string.split.call(null,[cljs.core.str(x)].join(''),/-/,(2));
var s_version = cljs.core.nth.call(null,vec__13620,(0),null);
var _QMARK_s_qualifier = cljs.core.nth.call(null,vec__13620,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"version","version",425292698),(function (){var temp__4657__auto__ = cljs.core.re_seq.call(null,/\d+/,s_version);
if(cljs.core.truth_(temp__4657__auto__)){
var s = temp__4657__auto__;
return cljs.core.mapv.call(null,taoensso.encore.as__QMARK_int,s);
} else {
return null;
}
})(),new cljs.core.Keyword(null,"qualifier","qualifier",125841738),(function (){var temp__4657__auto__ = _QMARK_s_qualifier;
if(cljs.core.truth_(temp__4657__auto__)){
var s = temp__4657__auto__;
return clojure.string.lower_case.call(null,s);
} else {
return null;
}
})()], null);
});
/**
 * May not be available with Node.js, etc.
 */
taoensso.encore.js__QMARK_win = ((typeof window !== 'undefined')?window:null);
taoensso.encore.max_long = (9007199254740991);
taoensso.encore.min_long = (-9007199254740991);
taoensso.encore.approx_EQ_ = (function taoensso$encore$approx_EQ_(var_args){
var args13623 = [];
var len__27348__auto___13626 = arguments.length;
var i__27349__auto___13627 = (0);
while(true){
if((i__27349__auto___13627 < len__27348__auto___13626)){
args13623.push((arguments[i__27349__auto___13627]));

var G__13628 = (i__27349__auto___13627 + (1));
i__27349__auto___13627 = G__13628;
continue;
} else {
}
break;
}

var G__13625 = args13623.length;
switch (G__13625) {
case 2:
return taoensso.encore.approx_EQ_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore.approx_EQ_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13623.length)].join('')));

}
});

taoensso.encore.approx_EQ_.cljs$core$IFn$_invoke$arity$2 = (function (x,y){
return taoensso.encore.approx_EQ_.call(null,x,y,0.001);
});

taoensso.encore.approx_EQ_.cljs$core$IFn$_invoke$arity$3 = (function (x,y,signf){
return (Math.abs((x - y)) < signf);
});

taoensso.encore.approx_EQ_.cljs$lang$maxFixedArity = 3;

taoensso.encore.clamp = (function taoensso$encore$clamp(nmin,nmax,n){
if((n < nmin)){
return nmin;
} else {
if((n > nmax)){
return nmax;
} else {
return n;
}
}
});
taoensso.encore.pow = (function taoensso$encore$pow(n,exp){
return Math.pow(n,exp);
});
taoensso.encore.abs = (function taoensso$encore$abs(n){
if((n < (0))){
return (- n);
} else {
return n;
}
});
taoensso.encore.round_STAR_ = (function taoensso$encore$round_STAR_(var_args){
var args13630 = [];
var len__27348__auto___13634 = arguments.length;
var i__27349__auto___13635 = (0);
while(true){
if((i__27349__auto___13635 < len__27348__auto___13634)){
args13630.push((arguments[i__27349__auto___13635]));

var G__13636 = (i__27349__auto___13635 + (1));
i__27349__auto___13635 = G__13636;
continue;
} else {
}
break;
}

var G__13632 = args13630.length;
switch (G__13632) {
case 1:
return taoensso.encore.round_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore.round_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore.round_STAR_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13630.length)].join('')));

}
});

taoensso.encore.round_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (n){
return taoensso.encore.round_STAR_.call(null,new cljs.core.Keyword(null,"round","round",2009433328),null,n);
});

taoensso.encore.round_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (type,n){
return taoensso.encore.round_STAR_.call(null,type,null,n);
});

taoensso.encore.round_STAR_.cljs$core$IFn$_invoke$arity$3 = (function (type,nplaces,n){
var n__$1 = n;
var modifier = (cljs.core.truth_(nplaces)?Math.pow(10.0,nplaces):null);
var n_STAR_ = (cljs.core.truth_(modifier)?(n__$1 * modifier):n__$1);
var rounded = (function (){var G__13633 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__13633) {
case "round":
return Math.round(n_STAR_);

break;
case "floor":
return Math.floor(n_STAR_);

break;
case "ceil":
return Math.ceil(n_STAR_);

break;
case "trunc":
return cljs.core.long$.call(null,n_STAR_);

break;
default:
throw cljs.core.ex_info.call(null,"Unknown round type",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),type], null));

}
})();
if(cljs.core.truth_(modifier)){
return (rounded / modifier);
} else {
return cljs.core.long$.call(null,rounded);
}
});

taoensso.encore.round_STAR_.cljs$lang$maxFixedArity = 3;

taoensso.encore.round0 = (function taoensso$encore$round0(n){
return Math.round(n);
});
taoensso.encore.round1 = (function taoensso$encore$round1(n){
return (Math.round((n * 10.0)) / 10.0);
});
taoensso.encore.round2 = (function taoensso$encore$round2(n){
return (Math.round((n * 100.0)) / 100.0);
});
/**
 * Returns binary exponential backoff value for n<=36
 */
taoensso.encore.exp_backoff = (function taoensso$encore$exp_backoff(var_args){
var args13639 = [];
var len__27348__auto___13645 = arguments.length;
var i__27349__auto___13646 = (0);
while(true){
if((i__27349__auto___13646 < len__27348__auto___13645)){
args13639.push((arguments[i__27349__auto___13646]));

var G__13647 = (i__27349__auto___13646 + (1));
i__27349__auto___13646 = G__13647;
continue;
} else {
}
break;
}

var G__13641 = args13639.length;
switch (G__13641) {
case 1:
return taoensso.encore.exp_backoff.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore.exp_backoff.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13639.length)].join('')));

}
});

taoensso.encore.exp_backoff.cljs$core$IFn$_invoke$arity$1 = (function (n_attempt){
return taoensso.encore.exp_backoff.call(null,n_attempt,null);
});

taoensso.encore.exp_backoff.cljs$core$IFn$_invoke$arity$2 = (function (n_attempt,p__13642){
var map__13643 = p__13642;
var map__13643__$1 = ((((!((map__13643 == null)))?((((map__13643.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13643.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13643):map__13643);
var min = cljs.core.get.call(null,map__13643__$1,new cljs.core.Keyword(null,"min","min",444991522));
var max = cljs.core.get.call(null,map__13643__$1,new cljs.core.Keyword(null,"max","max",61366548));
var factor = cljs.core.get.call(null,map__13643__$1,new cljs.core.Keyword(null,"factor","factor",-2103172748),(1000));
var n = (((n_attempt > (36)))?(36):n_attempt);
var b = Math.pow((2),n);
var t = cljs.core.long$.call(null,(((b + cljs.core.rand.call(null,b)) * 0.5) * factor));
var t__$1 = cljs.core.long$.call(null,(cljs.core.truth_(min)?(((t < min))?min:t):t));
var t__$2 = cljs.core.long$.call(null,(cljs.core.truth_(max)?(((t__$1 > max))?max:t__$1):t__$1));
return t__$2;
});

taoensso.encore.exp_backoff.cljs$lang$maxFixedArity = 2;

taoensso.encore.now_dt = (function taoensso$encore$now_dt(){
return (new Date());
});
taoensso.encore.now_udt = (function taoensso$encore$now_udt(){
return (new Date()).getTime();
});
taoensso.encore.secs__GT_ms = (function taoensso$encore$secs__GT_ms(secs){
return (cljs.core.long$.call(null,secs) * (1000));
});
taoensso.encore.ms__GT_secs = (function taoensso$encore$ms__GT_secs(ms){
return cljs.core.quot.call(null,cljs.core.long$.call(null,ms),(1000));
});
/**
 * Returns ~number of milliseconds in period defined by given args
 */
taoensso.encore.ms = (function taoensso$encore$ms(var_args){
var args__27351__auto__ = [];
var len__27348__auto___13665 = arguments.length;
var i__27349__auto___13666 = (0);
while(true){
if((i__27349__auto___13666 < len__27348__auto___13665)){
args__27351__auto__.push((arguments[i__27349__auto___13666]));

var G__13667 = (i__27349__auto___13666 + (1));
i__27349__auto___13666 = G__13667;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return taoensso.encore.ms.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

taoensso.encore.ms.cljs$core$IFn$_invoke$arity$variadic = (function (p__13662){
var map__13663 = p__13662;
var map__13663__$1 = ((((!((map__13663 == null)))?((((map__13663.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13663.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13663):map__13663);
var opts = map__13663__$1;
var years = cljs.core.get.call(null,map__13663__$1,new cljs.core.Keyword(null,"years","years",-1298579689));
var months = cljs.core.get.call(null,map__13663__$1,new cljs.core.Keyword(null,"months","months",-45571637));
var weeks = cljs.core.get.call(null,map__13663__$1,new cljs.core.Keyword(null,"weeks","weeks",1844596125));
var days = cljs.core.get.call(null,map__13663__$1,new cljs.core.Keyword(null,"days","days",-1394072564));
var hours = cljs.core.get.call(null,map__13663__$1,new cljs.core.Keyword(null,"hours","hours",58380855));
var mins = cljs.core.get.call(null,map__13663__$1,new cljs.core.Keyword(null,"mins","mins",467369676));
var secs = cljs.core.get.call(null,map__13663__$1,new cljs.core.Keyword(null,"secs","secs",1532330091));
var msecs = cljs.core.get.call(null,map__13663__$1,new cljs.core.Keyword(null,"msecs","msecs",1711980553));
var ms = cljs.core.get.call(null,map__13663__$1,new cljs.core.Keyword(null,"ms","ms",-1152709733));
if(cljs.core.truth_(cljs.core.mapv.call(null,((function (map__13663,map__13663__$1,opts,years,months,weeks,days,hours,mins,secs,msecs,ms){
return (function (__in){
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, [new cljs.core.Keyword(null,"msecs","msecs",1711980553),null,new cljs.core.Keyword(null,"secs","secs",1532330091),null,new cljs.core.Keyword(null,"months","months",-45571637),null,new cljs.core.Keyword(null,"days","days",-1394072564),null,new cljs.core.Keyword(null,"mins","mins",467369676),null,new cljs.core.Keyword(null,"hours","hours",58380855),null,new cljs.core.Keyword(null,"years","years",-1298579689),null,new cljs.core.Keyword(null,"ms","ms",-1152709733),null,new cljs.core.Keyword(null,"weeks","weeks",1844596125),null], null), null).call(null,__in))){
return __in;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.encore",null,"(#{:msecs :secs :months :days :mins :hours :years :ms :weeks} __in)",__in,null,null);
}
});})(map__13663,map__13663__$1,opts,years,months,weeks,days,hours,mins,secs,msecs,ms))
,cljs.core.keys.call(null,opts)))){
} else {
throw (new Error("Assert failed: (have #{:msecs :secs :months :days :mins :hours :years :ms :weeks} :in (keys opts))"));
}

return taoensso.encore.round_STAR_.call(null,(((((((((cljs.core.truth_(years)?(years * (31536000000)):0.0) + (cljs.core.truth_(months)?(months * 2.551392E9):0.0)) + (cljs.core.truth_(weeks)?(weeks * (604800000)):0.0)) + (cljs.core.truth_(days)?(days * (86400000)):0.0)) + (cljs.core.truth_(hours)?(hours * (3600000)):0.0)) + (cljs.core.truth_(mins)?(mins * (60000)):0.0)) + (cljs.core.truth_(secs)?(secs * (1000)):0.0)) + (cljs.core.truth_(msecs)?msecs:0.0)) + (cljs.core.truth_(ms)?ms:0.0)));
});

taoensso.encore.ms.cljs$lang$maxFixedArity = (0);

taoensso.encore.ms.cljs$lang$applyTo = (function (seq13661){
return taoensso.encore.ms.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq13661));
});

taoensso.encore.secs = cljs.core.comp.call(null,taoensso.encore.ms__GT_secs,taoensso.encore.ms);
taoensso.encore.vec_STAR_ = (function taoensso$encore$vec_STAR_(x){
if(cljs.core.vector_QMARK_.call(null,x)){
return x;
} else {
return cljs.core.vec.call(null,x);
}
});
taoensso.encore.set_STAR_ = (function taoensso$encore$set_STAR_(x){
if(cljs.core.set_QMARK_.call(null,x)){
return x;
} else {
return cljs.core.set.call(null,x);
}
});
taoensso.encore.distinct_elements_QMARK_ = (function taoensso$encore$distinct_elements_QMARK_(x){
return (cljs.core.set_QMARK_.call(null,x)) || (cljs.core._EQ_.call(null,cljs.core.count.call(null,x),cljs.core.count.call(null,taoensso.encore.set_STAR_.call(null,x))));
});
/**
 * Like `aget` for JS objects, Ref. https://goo.gl/eze8hY.
 *   Unlike `aget`, returns nil for missing keys instead of throwing.
 */
taoensso.encore.oget = (function taoensso$encore$oget(var_args){
var args13672 = [];
var len__27348__auto___13679 = arguments.length;
var i__27349__auto___13680 = (0);
while(true){
if((i__27349__auto___13680 < len__27348__auto___13679)){
args13672.push((arguments[i__27349__auto___13680]));

var G__13681 = (i__27349__auto___13680 + (1));
i__27349__auto___13680 = G__13681;
continue;
} else {
}
break;
}

var G__13678 = args13672.length;
switch (G__13678) {
case 2:
return taoensso.encore.oget.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore.oget.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
var argseq__27363__auto__ = (new cljs.core.IndexedSeq(args13672.slice((3)),(0),null));
return taoensso.encore.oget.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__27363__auto__);

}
});

taoensso.encore.oget.cljs$core$IFn$_invoke$arity$2 = (function (o,k){
if(cljs.core.truth_(o)){
return goog.object.get(o,k,null);
} else {
return null;
}
});

taoensso.encore.oget.cljs$core$IFn$_invoke$arity$3 = (function (o,k1,k2){
var temp__4657__auto__ = taoensso.encore.oget.call(null,o,k1);
if(cljs.core.truth_(temp__4657__auto__)){
var o__$1 = temp__4657__auto__;
return goog.object.get(o__$1,k2,null);
} else {
return null;
}
});

taoensso.encore.oget.cljs$core$IFn$_invoke$arity$variadic = (function (o,k1,k2,ks){
var temp__4657__auto__ = taoensso.encore.oget.call(null,o,k1,k2);
if(cljs.core.truth_(temp__4657__auto__)){
var o__$1 = temp__4657__auto__;
return cljs.core.apply.call(null,taoensso.encore.oget,o__$1,ks);
} else {
return null;
}
});

taoensso.encore.oget.cljs$lang$applyTo = (function (seq13673){
var G__13674 = cljs.core.first.call(null,seq13673);
var seq13673__$1 = cljs.core.next.call(null,seq13673);
var G__13675 = cljs.core.first.call(null,seq13673__$1);
var seq13673__$2 = cljs.core.next.call(null,seq13673__$1);
var G__13676 = cljs.core.first.call(null,seq13673__$2);
var seq13673__$3 = cljs.core.next.call(null,seq13673__$2);
return taoensso.encore.oget.cljs$core$IFn$_invoke$arity$variadic(G__13674,G__13675,G__13676,seq13673__$3);
});

taoensso.encore.oget.cljs$lang$maxFixedArity = (3);

taoensso.encore.singleton_QMARK_ = (function taoensso$encore$singleton_QMARK_(coll){
if(cljs.core.counted_QMARK_.call(null,coll)){
return cljs.core._EQ_.call(null,cljs.core.count.call(null,coll),(1));
} else {
return cljs.core.not.call(null,cljs.core.next.call(null,coll));
}
});
taoensso.encore.__GT__QMARK_singleton = (function taoensso$encore$__GT__QMARK_singleton(coll){
if(cljs.core.truth_(taoensso.encore.singleton_QMARK_.call(null,coll))){
var vec__13686 = coll;
var c1 = cljs.core.nth.call(null,vec__13686,(0),null);
return c1;
} else {
return null;
}
});
taoensso.encore.__GT_vec = (function taoensso$encore$__GT_vec(x){
if(cljs.core.vector_QMARK_.call(null,x)){
return x;
} else {
if(cljs.core.sequential_QMARK_.call(null,x)){
return cljs.core.vec.call(null,x);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null);
}
}
});
taoensso.encore.vnext = (function taoensso$encore$vnext(v){
if((cljs.core.count.call(null,v) > (1))){
return cljs.core.subvec.call(null,v,(1));
} else {
return null;
}
});
taoensso.encore.vsplit_last = (function taoensso$encore$vsplit_last(v){
var c = cljs.core.count.call(null,v);
if((c > (0))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(((c > (1)))?cljs.core.pop.call(null,v):null),cljs.core.peek.call(null,v)], null);
} else {
return null;
}
});
taoensso.encore.vsplit_first = (function taoensso$encore$vsplit_first(v){
var c = cljs.core.count.call(null,v);
if((c > (0))){
var vec__13692 = v;
var v1 = cljs.core.nth.call(null,vec__13692,(0),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [v1,(((c > (1)))?cljs.core.subvec.call(null,v,(1)):null)], null);
} else {
return null;
}
});
taoensso.encore.nnil_set = (function taoensso$encore$nnil_set(x){
return cljs.core.disj.call(null,taoensso.encore.set_STAR_.call(null,x),null);
});
taoensso.encore.conj_some = (function taoensso$encore$conj_some(var_args){
var args13695 = [];
var len__27348__auto___13701 = arguments.length;
var i__27349__auto___13702 = (0);
while(true){
if((i__27349__auto___13702 < len__27348__auto___13701)){
args13695.push((arguments[i__27349__auto___13702]));

var G__13703 = (i__27349__auto___13702 + (1));
i__27349__auto___13702 = G__13703;
continue;
} else {
}
break;
}

var G__13700 = args13695.length;
switch (G__13700) {
case 0:
return taoensso.encore.conj_some.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return taoensso.encore.conj_some.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore.conj_some.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__27363__auto__ = (new cljs.core.IndexedSeq(args13695.slice((2)),(0),null));
return taoensso.encore.conj_some.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27363__auto__);

}
});

taoensso.encore.conj_some.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.PersistentVector.EMPTY;
});

taoensso.encore.conj_some.cljs$core$IFn$_invoke$arity$1 = (function (coll){
return coll;
});

taoensso.encore.conj_some.cljs$core$IFn$_invoke$arity$2 = (function (coll,_QMARK_x){
if(taoensso.encore.some_QMARK_.call(null,_QMARK_x)){
return cljs.core.conj.call(null,coll,_QMARK_x);
} else {
return coll;
}
});

taoensso.encore.conj_some.cljs$core$IFn$_invoke$arity$variadic = (function (coll,_QMARK_x,_QMARK_xs){
return cljs.core.reduce.call(null,taoensso.encore.conj_some,taoensso.encore.conj_some.call(null,coll,_QMARK_x),_QMARK_xs);
});

taoensso.encore.conj_some.cljs$lang$applyTo = (function (seq13696){
var G__13697 = cljs.core.first.call(null,seq13696);
var seq13696__$1 = cljs.core.next.call(null,seq13696);
var G__13698 = cljs.core.first.call(null,seq13696__$1);
var seq13696__$2 = cljs.core.next.call(null,seq13696__$1);
return taoensso.encore.conj_some.cljs$core$IFn$_invoke$arity$variadic(G__13697,G__13698,seq13696__$2);
});

taoensso.encore.conj_some.cljs$lang$maxFixedArity = (2);

/**
 * As `clojure.core/preserving-reduced`
 */
taoensso.encore.preserve_reduced = (function taoensso$encore$preserve_reduced(rf){
return (function (acc,in$){
var result = rf.call(null,acc,in$);
if(cljs.core.reduced_QMARK_.call(null,result)){
return cljs.core.reduced.call(null,result);
} else {
return result;
}
});
});
taoensso.encore.run_BANG_ = (function taoensso$encore$run_BANG_(proc,coll){
cljs.core.reduce.call(null,(function (p1__13706_SHARP_,p2__13705_SHARP_){
return proc.call(null,p2__13705_SHARP_);
}),null,coll);

return null;
});
taoensso.encore.run_kv_BANG_ = (function taoensso$encore$run_kv_BANG_(proc,m){
cljs.core.reduce_kv.call(null,(function (p1__13709_SHARP_,p2__13707_SHARP_,p3__13708_SHARP_){
return proc.call(null,p2__13707_SHARP_,p3__13708_SHARP_);
}),null,m);

return null;
});
taoensso.encore.run_kvs_BANG_ = (function taoensso$encore$run_kvs_BANG_(proc,kvs){
taoensso.encore.reduce_kvs.call(null,(function (p1__13712_SHARP_,p2__13710_SHARP_,p3__13711_SHARP_){
return proc.call(null,p2__13710_SHARP_,p3__13711_SHARP_);
}),null,kvs);

return null;
});
taoensso.encore.rsome = (function taoensso$encore$rsome(pred,coll){
return cljs.core.reduce.call(null,(function (acc,in$){
var temp__4657__auto__ = pred.call(null,in$);
if(cljs.core.truth_(temp__4657__auto__)){
var p = temp__4657__auto__;
return cljs.core.reduced.call(null,p);
} else {
return null;
}
}),null,coll);
});
taoensso.encore.rsome_kv = (function taoensso$encore$rsome_kv(pred,coll){
return cljs.core.reduce_kv.call(null,(function (acc,k,v){
var temp__4657__auto__ = pred.call(null,k,v);
if(cljs.core.truth_(temp__4657__auto__)){
var p = temp__4657__auto__;
return cljs.core.reduced.call(null,p);
} else {
return null;
}
}),null,coll);
});
taoensso.encore.rfirst = (function taoensso$encore$rfirst(pred,coll){
return cljs.core.reduce.call(null,(function (acc,in$){
if(cljs.core.truth_(pred.call(null,in$))){
return cljs.core.reduced.call(null,in$);
} else {
return null;
}
}),null,coll);
});
taoensso.encore.rfirst_kv = (function taoensso$encore$rfirst_kv(pred,coll){
return cljs.core.reduce_kv.call(null,(function (acc,k,v){
if(cljs.core.truth_(pred.call(null,k,v))){
return cljs.core.reduced.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,v], null));
} else {
return null;
}
}),null,coll);
});
taoensso.encore.revery_QMARK_ = (function taoensso$encore$revery_QMARK_(pred,coll){
return cljs.core.reduce.call(null,(function (acc,in$){
if(cljs.core.truth_(pred.call(null,in$))){
return true;
} else {
return cljs.core.reduced.call(null,null);
}
}),true,coll);
});
taoensso.encore.revery_kv_QMARK_ = (function taoensso$encore$revery_kv_QMARK_(pred,coll){
return cljs.core.reduce_kv.call(null,(function (acc,k,v){
if(cljs.core.truth_(pred.call(null,k,v))){
return true;
} else {
return cljs.core.reduced.call(null,null);
}
}),true,coll);
});
taoensso.encore.revery = (function taoensso$encore$revery(pred,coll){
return cljs.core.reduce.call(null,(function (acc,in$){
if(cljs.core.truth_(pred.call(null,in$))){
return coll;
} else {
return cljs.core.reduced.call(null,null);
}
}),coll,coll);
});
taoensso.encore.revery_kv = (function taoensso$encore$revery_kv(pred,coll){
return cljs.core.reduce_kv.call(null,(function (acc,k,v){
if(cljs.core.truth_(pred.call(null,k,v))){
return coll;
} else {
return cljs.core.reduced.call(null,null);
}
}),coll,coll);
});
/**
 * Like `reduce-kv` but takes a flat sequence of kv pairs
 */
taoensso.encore.reduce_kvs = (function taoensso$encore$reduce_kvs(rf,init,kvs){
return cljs.core.transduce.call(null,cljs.core.partition_all.call(null,(2)),cljs.core.completing.call(null,(function (acc,p__13722){
var vec__13723 = p__13722;
var k = cljs.core.nth.call(null,vec__13723,(0),null);
var v = cljs.core.nth.call(null,vec__13723,(1),null);
return rf.call(null,acc,k,v);
})),init,kvs);
});
taoensso.encore.reduce_n = (function taoensso$encore$reduce_n(rf,init,n){
return cljs.core.reduce.call(null,rf,init,cljs.core.range.call(null,n));
});
/**
 * Like `reduce-kv` but for JavaScript objects
 */
taoensso.encore.reduce_obj = (function taoensso$encore$reduce_obj(f,init,o){
return cljs.core.reduce.call(null,(function (acc,k){
return f.call(null,acc,k,goog.object.get(o,k,null));
}),init,cljs.core.js_keys.call(null,o));
});
taoensso.encore.into_BANG_ = (function taoensso$encore$into_BANG_(var_args){
var args13730 = [];
var len__27348__auto___13733 = arguments.length;
var i__27349__auto___13734 = (0);
while(true){
if((i__27349__auto___13734 < len__27348__auto___13733)){
args13730.push((arguments[i__27349__auto___13734]));

var G__13735 = (i__27349__auto___13734 + (1));
i__27349__auto___13734 = G__13735;
continue;
} else {
}
break;
}

var G__13732 = args13730.length;
switch (G__13732) {
case 2:
return taoensso.encore.into_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore.into_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13730.length)].join('')));

}
});

taoensso.encore.into_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (to,from){
return cljs.core.reduce.call(null,cljs.core.conj_BANG_,to,from);
});

taoensso.encore.into_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (to,xform,from){
return cljs.core.transduce.call(null,xform,cljs.core.conj_BANG_,to,from);
});

taoensso.encore.into_BANG_.cljs$lang$maxFixedArity = 3;

taoensso.encore.xdistinct = (function taoensso$encore$xdistinct(var_args){
var args13741 = [];
var len__27348__auto___13744 = arguments.length;
var i__27349__auto___13745 = (0);
while(true){
if((i__27349__auto___13745 < len__27348__auto___13744)){
args13741.push((arguments[i__27349__auto___13745]));

var G__13746 = (i__27349__auto___13745 + (1));
i__27349__auto___13745 = G__13746;
continue;
} else {
}
break;
}

var G__13743 = args13741.length;
switch (G__13743) {
case 0:
return taoensso.encore.xdistinct.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return taoensso.encore.xdistinct.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13741.length)].join('')));

}
});

taoensso.encore.xdistinct.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.distinct.call(null);
});

taoensso.encore.xdistinct.cljs$core$IFn$_invoke$arity$1 = (function (keyfn){
return (function (rf){
var seen_ = cljs.core.volatile_BANG_.call(null,cljs.core.PersistentHashSet.EMPTY);
return ((function (seen_){
return (function() {
var G__13748 = null;
var G__13748__0 = (function (){
return rf.call(null);
});
var G__13748__1 = (function (acc){
return rf.call(null,acc);
});
var G__13748__2 = (function (acc,input){
var k = keyfn.call(null,input);
if(cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,seen_),k)){
return acc;
} else {
cljs.core._vreset_BANG_.call(null,seen_,cljs.core.conj.call(null,cljs.core._deref.call(null,seen_),k));

return rf.call(null,acc,input);
}
});
G__13748 = function(acc,input){
switch(arguments.length){
case 0:
return G__13748__0.call(this);
case 1:
return G__13748__1.call(this,acc);
case 2:
return G__13748__2.call(this,acc,input);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__13748.cljs$core$IFn$_invoke$arity$0 = G__13748__0;
G__13748.cljs$core$IFn$_invoke$arity$1 = G__13748__1;
G__13748.cljs$core$IFn$_invoke$arity$2 = G__13748__2;
return G__13748;
})()
;})(seen_))
});
});

taoensso.encore.xdistinct.cljs$lang$maxFixedArity = 1;

taoensso.encore.takev = (function taoensso$encore$takev(n,coll){
if(cljs.core.vector_QMARK_.call(null,coll)){
var or__26817__auto__ = taoensso.encore._QMARK_subvec_LT_len.call(null,coll,(0),n);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return cljs.core.PersistentVector.EMPTY;
}
} else {
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.take.call(null,n),coll);
}
});
/**
 * Like `into` but supports multiple "from"s
 */
taoensso.encore.into_all = (function taoensso$encore$into_all(var_args){
var args13753 = [];
var len__27348__auto___13759 = arguments.length;
var i__27349__auto___13760 = (0);
while(true){
if((i__27349__auto___13760 < len__27348__auto___13759)){
args13753.push((arguments[i__27349__auto___13760]));

var G__13761 = (i__27349__auto___13760 + (1));
i__27349__auto___13760 = G__13761;
continue;
} else {
}
break;
}

var G__13758 = args13753.length;
switch (G__13758) {
case 2:
return taoensso.encore.into_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__27363__auto__ = (new cljs.core.IndexedSeq(args13753.slice((2)),(0),null));
return taoensso.encore.into_all.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27363__auto__);

}
});

taoensso.encore.into_all.cljs$core$IFn$_invoke$arity$2 = (function (to,from){
return cljs.core.into.call(null,to,from);
});

taoensso.encore.into_all.cljs$core$IFn$_invoke$arity$variadic = (function (to,from,more){
return cljs.core.reduce.call(null,cljs.core.into,cljs.core.into.call(null,to,from),more);
});

taoensso.encore.into_all.cljs$lang$applyTo = (function (seq13754){
var G__13755 = cljs.core.first.call(null,seq13754);
var seq13754__$1 = cljs.core.next.call(null,seq13754);
var G__13756 = cljs.core.first.call(null,seq13754__$1);
var seq13754__$2 = cljs.core.next.call(null,seq13754__$1);
return taoensso.encore.into_all.cljs$core$IFn$_invoke$arity$variadic(G__13755,G__13756,seq13754__$2);
});

taoensso.encore.into_all.cljs$lang$maxFixedArity = (2);

/**
 * Like `repeatedly` but faster and `conj`s items into given collection
 */
taoensso.encore.repeatedly_into = (function taoensso$encore$repeatedly_into(coll,n,f){
if(((n > (10))) && (taoensso.encore.editable_QMARK_.call(null,coll))){
return cljs.core.persistent_BANG_.call(null,taoensso.encore.reduce_n.call(null,(function (acc,_){
return cljs.core.conj_BANG_.call(null,acc,f.call(null));
}),cljs.core.transient$.call(null,coll),n));
} else {
return taoensso.encore.reduce_n.call(null,(function (acc,_){
return cljs.core.conj.call(null,acc,f.call(null));
}),coll,n);
}
});
taoensso.encore.map_vals = (function taoensso$encore$map_vals(f,m){
if((m == null)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
return cljs.core.reduce_kv.call(null,(function (m__$1,k,v){
return cljs.core.assoc.call(null,m__$1,k,f.call(null,v));
}),m,m);
}
});
taoensso.encore.map_keys = (function taoensso$encore$map_keys(f,m){
if((m == null)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
return cljs.core.reduce_kv.call(null,(function (m__$1,k,v){
return cljs.core.assoc.call(null,m__$1,f.call(null,k),v);
}),cljs.core.PersistentArrayMap.EMPTY,m);
}
});
taoensso.encore.filter_kvs = (function taoensso$encore$filter_kvs(pred,m){
if((m == null)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
return cljs.core.reduce_kv.call(null,(function (m__$1,k,v){
if(cljs.core.truth_(pred.call(null,k,v))){
return m__$1;
} else {
return cljs.core.dissoc.call(null,m__$1,k);
}
}),m,m);
}
});
taoensso.encore.filter_keys = (function taoensso$encore$filter_keys(pred,m){
if((m == null)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
return cljs.core.reduce_kv.call(null,(function (m__$1,k,v){
if(cljs.core.truth_(pred.call(null,k))){
return m__$1;
} else {
return cljs.core.dissoc.call(null,m__$1,k);
}
}),m,m);
}
});
taoensso.encore.filter_vals = (function taoensso$encore$filter_vals(pred,m){
if((m == null)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
return cljs.core.reduce_kv.call(null,(function (m__$1,k,v){
if(cljs.core.truth_(pred.call(null,v))){
return m__$1;
} else {
return cljs.core.dissoc.call(null,m__$1,k);
}
}),m,m);
}
});
taoensso.encore.remove_vals = (function taoensso$encore$remove_vals(pred,m){
return taoensso.encore.filter_vals.call(null,cljs.core.complement.call(null,pred),m);
});
taoensso.encore.remove_keys = (function taoensso$encore$remove_keys(pred,m){
return taoensso.encore.filter_keys.call(null,cljs.core.complement.call(null,pred),m);
});
taoensso.encore.remove_kvs = (function taoensso$encore$remove_kvs(pred,m){
return taoensso.encore.filter_kvs.call(null,cljs.core.complement.call(null,pred),m);
});
taoensso.encore.ks_EQ_ = (function taoensso$encore$ks_EQ_(ks,m){
return cljs.core._EQ_.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,m)),taoensso.encore.set_STAR_.call(null,ks));
});
taoensso.encore.ks_LT__EQ_ = (function taoensso$encore$ks_LT__EQ_(ks,m){
return clojure.set.subset_QMARK_.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,m)),taoensso.encore.set_STAR_.call(null,ks));
});
taoensso.encore.ks_GT__EQ_ = (function taoensso$encore$ks_GT__EQ_(ks,m){
return clojure.set.superset_QMARK_.call(null,cljs.core.set.call(null,cljs.core.keys.call(null,m)),taoensso.encore.set_STAR_.call(null,ks));
});
taoensso.encore.ks_nnil_QMARK_ = (function taoensso$encore$ks_nnil_QMARK_(ks,m){
return taoensso.encore.revery_QMARK_.call(null,(function (p1__13763_SHARP_){
return taoensso.encore.some_QMARK_.call(null,cljs.core.get.call(null,m,p1__13763_SHARP_));
}),ks);
});
/**
 * Like `update-in` but faster, more flexible, and simpler (less ambiguous)
 */
taoensso.encore.update_in_STAR_ = (function taoensso$encore$update_in_STAR_(m,ks,f){
if(cljs.core.empty_QMARK_.call(null,ks)){
return f.call(null,m);
} else {
var vec__13767 = ks;
var seq__13768 = cljs.core.seq.call(null,vec__13767);
var first__13769 = cljs.core.first.call(null,seq__13768);
var seq__13768__$1 = cljs.core.next.call(null,seq__13768);
var k = first__13769;
var ks__$1 = seq__13768__$1;
if(ks__$1){
return cljs.core.assoc.call(null,m,k,taoensso$encore$update_in_STAR_.call(null,cljs.core.get.call(null,m,k),ks__$1,f));
} else {
return cljs.core.assoc.call(null,m,k,f.call(null,cljs.core.get.call(null,m,k)));
}
}
});
/**
 * Like `subvec` but:
 *  - Never throws; snaps to valid start and end indexes.
 *  - Returns nil rather than an empty vector.
 */
taoensso.encore._QMARK_subvec_LT_idx = (function taoensso$encore$_QMARK_subvec_LT_idx(var_args){
var args13770 = [];
var len__27348__auto___13773 = arguments.length;
var i__27349__auto___13774 = (0);
while(true){
if((i__27349__auto___13774 < len__27348__auto___13773)){
args13770.push((arguments[i__27349__auto___13774]));

var G__13775 = (i__27349__auto___13774 + (1));
i__27349__auto___13774 = G__13775;
continue;
} else {
}
break;
}

var G__13772 = args13770.length;
switch (G__13772) {
case 2:
return taoensso.encore._QMARK_subvec_LT_idx.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore._QMARK_subvec_LT_idx.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13770.length)].join('')));

}
});

taoensso.encore._QMARK_subvec_LT_idx.cljs$core$IFn$_invoke$arity$2 = (function (v,start){
var start__$1 = (((start < (0)))?(0):start);
var vlen = cljs.core.count.call(null,v);
if((start__$1 >= vlen)){
return null;
} else {
return cljs.core.subvec.call(null,v,start__$1,vlen);
}
});

taoensso.encore._QMARK_subvec_LT_idx.cljs$core$IFn$_invoke$arity$3 = (function (v,start,end){
var start__$1 = (((start < (0)))?(0):start);
var vlen = cljs.core.long$.call(null,cljs.core.count.call(null,v));
var end__$1 = (((end > vlen))?vlen:end);
if((start__$1 >= end__$1)){
return null;
} else {
return cljs.core.subvec.call(null,v,start__$1,end__$1);
}
});

taoensso.encore._QMARK_subvec_LT_idx.cljs$lang$maxFixedArity = 3;

/**
 * Like `?subvec<idx` but:
 *  - Takes `length` instead of `end` (index).
 *  - -ive `start` => index from right of vector.
 */
taoensso.encore._QMARK_subvec_LT_len = (function taoensso$encore$_QMARK_subvec_LT_len(var_args){
var args13777 = [];
var len__27348__auto___13780 = arguments.length;
var i__27349__auto___13781 = (0);
while(true){
if((i__27349__auto___13781 < len__27348__auto___13780)){
args13777.push((arguments[i__27349__auto___13781]));

var G__13782 = (i__27349__auto___13781 + (1));
i__27349__auto___13781 = G__13782;
continue;
} else {
}
break;
}

var G__13779 = args13777.length;
switch (G__13779) {
case 2:
return taoensso.encore._QMARK_subvec_LT_len.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore._QMARK_subvec_LT_len.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13777.length)].join('')));

}
});

taoensso.encore._QMARK_subvec_LT_len.cljs$core$IFn$_invoke$arity$2 = (function (v,start){
var vlen = cljs.core.count.call(null,v);
if((start < (0))){
var start__$1 = (start + vlen);
var start__$2 = (((start__$1 < (0)))?(0):start__$1);
return cljs.core.subvec.call(null,v,start__$2,vlen);
} else {
if((start >= vlen)){
return null;
} else {
return cljs.core.subvec.call(null,v,start,vlen);
}
}
});

taoensso.encore._QMARK_subvec_LT_len.cljs$core$IFn$_invoke$arity$3 = (function (v,start,length){
if((length <= (0))){
return null;
} else {
var vlen = cljs.core.long$.call(null,cljs.core.count.call(null,v));
if((start < (0))){
var start__$1 = (start + vlen);
var start__$2 = (((start__$1 < (0)))?(0):start__$1);
var end = (start__$2 + length);
var end__$1 = (((end > vlen))?vlen:end);
return cljs.core.subvec.call(null,v,start__$2,end__$1);
} else {
var end = (start + length);
var end__$1 = (((end > vlen))?vlen:end);
if((start >= end__$1)){
return null;
} else {
return cljs.core.subvec.call(null,v,start,end__$1);
}
}
}
});

taoensso.encore._QMARK_subvec_LT_len.cljs$lang$maxFixedArity = 3;

/**
 * Returns a sorted vector of the top n items from coll of N items in O(N.logn)
 *   time. (take n (sort-by ...)) is O(N.logN) time, so much slower when n << N.
 *   Ref. http://stevehanov.ca/blog/index.php?id=122
 */
taoensso.encore.top = (function taoensso$encore$top(var_args){
var args13784 = [];
var len__27348__auto___13787 = arguments.length;
var i__27349__auto___13788 = (0);
while(true){
if((i__27349__auto___13788 < len__27348__auto___13787)){
args13784.push((arguments[i__27349__auto___13788]));

var G__13789 = (i__27349__auto___13788 + (1));
i__27349__auto___13788 = G__13789;
continue;
} else {
}
break;
}

var G__13786 = args13784.length;
switch (G__13786) {
case 2:
return taoensso.encore.top.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore.top.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return taoensso.encore.top.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13784.length)].join('')));

}
});

taoensso.encore.top.cljs$core$IFn$_invoke$arity$2 = (function (n,coll){
return taoensso.encore.top.call(null,n,cljs.core.identity,cljs.core.compare,coll);
});

taoensso.encore.top.cljs$core$IFn$_invoke$arity$3 = (function (n,keyfn,coll){
return taoensso.encore.top.call(null,n,keyfn,cljs.core.compare,coll);
});

taoensso.encore.top.cljs$core$IFn$_invoke$arity$4 = (function (n,keyfn,cmp,coll){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.take.call(null,n),cljs.core.sort_by.call(null,keyfn,cmp,coll));
});

taoensso.encore.top.cljs$lang$maxFixedArity = 4;

taoensso.encore.contains_in_QMARK_ = (function taoensso$encore$contains_in_QMARK_(coll,ks){
return cljs.core.contains_QMARK_.call(null,cljs.core.get_in.call(null,coll,cljs.core.butlast.call(null,ks)),cljs.core.last.call(null,ks));
});
taoensso.encore.dissoc_in = (function taoensso$encore$dissoc_in(var_args){
var args13791 = [];
var len__27348__auto___13798 = arguments.length;
var i__27349__auto___13799 = (0);
while(true){
if((i__27349__auto___13799 < len__27348__auto___13798)){
args13791.push((arguments[i__27349__auto___13799]));

var G__13800 = (i__27349__auto___13799 + (1));
i__27349__auto___13799 = G__13800;
continue;
} else {
}
break;
}

var G__13797 = args13791.length;
switch (G__13797) {
case 3:
return taoensso.encore.dissoc_in.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
var argseq__27363__auto__ = (new cljs.core.IndexedSeq(args13791.slice((3)),(0),null));
return taoensso.encore.dissoc_in.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__27363__auto__);

}
});

taoensso.encore.dissoc_in.cljs$core$IFn$_invoke$arity$3 = (function (m,ks,dissoc_k){
return taoensso.encore.update_in_STAR_.call(null,m,ks,(function (m__$1){
return cljs.core.dissoc.call(null,m__$1,dissoc_k);
}));
});

taoensso.encore.dissoc_in.cljs$core$IFn$_invoke$arity$variadic = (function (m,ks,dissoc_k,more){
return taoensso.encore.update_in_STAR_.call(null,m,ks,(function (m__$1){
return cljs.core.apply.call(null,cljs.core.dissoc,m__$1,dissoc_k,more);
}));
});

taoensso.encore.dissoc_in.cljs$lang$applyTo = (function (seq13792){
var G__13793 = cljs.core.first.call(null,seq13792);
var seq13792__$1 = cljs.core.next.call(null,seq13792);
var G__13794 = cljs.core.first.call(null,seq13792__$1);
var seq13792__$2 = cljs.core.next.call(null,seq13792__$1);
var G__13795 = cljs.core.first.call(null,seq13792__$2);
var seq13792__$3 = cljs.core.next.call(null,seq13792__$2);
return taoensso.encore.dissoc_in.cljs$core$IFn$_invoke$arity$variadic(G__13793,G__13794,G__13795,seq13792__$3);
});

taoensso.encore.dissoc_in.cljs$lang$maxFixedArity = (3);

/**
 * Assocs each kv iff its value is not nil
 */
taoensso.encore.assoc_some = (function taoensso$encore$assoc_some(var_args){
var args13802 = [];
var len__27348__auto___13809 = arguments.length;
var i__27349__auto___13810 = (0);
while(true){
if((i__27349__auto___13810 < len__27348__auto___13809)){
args13802.push((arguments[i__27349__auto___13810]));

var G__13811 = (i__27349__auto___13810 + (1));
i__27349__auto___13810 = G__13811;
continue;
} else {
}
break;
}

var G__13808 = args13802.length;
switch (G__13808) {
case 3:
return taoensso.encore.assoc_some.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
var argseq__27363__auto__ = (new cljs.core.IndexedSeq(args13802.slice((3)),(0),null));
return taoensso.encore.assoc_some.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__27363__auto__);

}
});

taoensso.encore.assoc_some.cljs$core$IFn$_invoke$arity$3 = (function (m,k,v){
if((v == null)){
if((m == null)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
return m;
}
} else {
return cljs.core.assoc.call(null,m,k,v);
}
});

taoensso.encore.assoc_some.cljs$core$IFn$_invoke$arity$variadic = (function (m,k,v,kvs){
return taoensso.encore.reduce_kvs.call(null,(function (acc,k__$1,v__$1){
return taoensso.encore.assoc_some.call(null,acc,k__$1,v__$1);
}),taoensso.encore.assoc_some.call(null,m,k,v),kvs);
});

taoensso.encore.assoc_some.cljs$lang$applyTo = (function (seq13803){
var G__13804 = cljs.core.first.call(null,seq13803);
var seq13803__$1 = cljs.core.next.call(null,seq13803);
var G__13805 = cljs.core.first.call(null,seq13803__$1);
var seq13803__$2 = cljs.core.next.call(null,seq13803__$1);
var G__13806 = cljs.core.first.call(null,seq13803__$2);
var seq13803__$3 = cljs.core.next.call(null,seq13803__$2);
return taoensso.encore.assoc_some.cljs$core$IFn$_invoke$arity$variadic(G__13804,G__13805,G__13806,seq13803__$3);
});

taoensso.encore.assoc_some.cljs$lang$maxFixedArity = (3);

/**
 * Assocs each kv iff its val is truthy
 */
taoensso.encore.assoc_when = (function taoensso$encore$assoc_when(var_args){
var args13813 = [];
var len__27348__auto___13820 = arguments.length;
var i__27349__auto___13821 = (0);
while(true){
if((i__27349__auto___13821 < len__27348__auto___13820)){
args13813.push((arguments[i__27349__auto___13821]));

var G__13822 = (i__27349__auto___13821 + (1));
i__27349__auto___13821 = G__13822;
continue;
} else {
}
break;
}

var G__13819 = args13813.length;
switch (G__13819) {
case 3:
return taoensso.encore.assoc_when.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
var argseq__27363__auto__ = (new cljs.core.IndexedSeq(args13813.slice((3)),(0),null));
return taoensso.encore.assoc_when.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__27363__auto__);

}
});

taoensso.encore.assoc_when.cljs$core$IFn$_invoke$arity$3 = (function (m,k,v){
if(cljs.core.truth_(v)){
return cljs.core.assoc.call(null,m,k,v);
} else {
if((m == null)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
return m;
}
}
});

taoensso.encore.assoc_when.cljs$core$IFn$_invoke$arity$variadic = (function (m,k,v,kvs){
return taoensso.encore.reduce_kvs.call(null,(function (acc,k__$1,v__$1){
return taoensso.encore.assoc_when.call(null,acc,k__$1,v__$1);
}),taoensso.encore.assoc_when.call(null,m,k,v),kvs);
});

taoensso.encore.assoc_when.cljs$lang$applyTo = (function (seq13814){
var G__13815 = cljs.core.first.call(null,seq13814);
var seq13814__$1 = cljs.core.next.call(null,seq13814);
var G__13816 = cljs.core.first.call(null,seq13814__$1);
var seq13814__$2 = cljs.core.next.call(null,seq13814__$1);
var G__13817 = cljs.core.first.call(null,seq13814__$2);
var seq13814__$3 = cljs.core.next.call(null,seq13814__$2);
return taoensso.encore.assoc_when.cljs$core$IFn$_invoke$arity$variadic(G__13815,G__13816,G__13817,seq13814__$3);
});

taoensso.encore.assoc_when.cljs$lang$maxFixedArity = (3);

taoensso.encore.queue_QMARK_ = (function taoensso$encore$queue_QMARK_(x){
return (x instanceof cljs.core.PersistentQueue);
});
/**
 * Returns a PersistentQueue
 */
taoensso.encore.queue = (function taoensso$encore$queue(var_args){
var args13824 = [];
var len__27348__auto___13827 = arguments.length;
var i__27349__auto___13828 = (0);
while(true){
if((i__27349__auto___13828 < len__27348__auto___13827)){
args13824.push((arguments[i__27349__auto___13828]));

var G__13829 = (i__27349__auto___13828 + (1));
i__27349__auto___13828 = G__13829;
continue;
} else {
}
break;
}

var G__13826 = args13824.length;
switch (G__13826) {
case 1:
return taoensso.encore.queue.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return taoensso.encore.queue.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13824.length)].join('')));

}
});

taoensso.encore.queue.cljs$core$IFn$_invoke$arity$1 = (function (coll){
return cljs.core.into.call(null,taoensso.encore.queue.call(null),coll);
});

taoensso.encore.queue.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.PersistentQueue.EMPTY;
});

taoensso.encore.queue.cljs$lang$maxFixedArity = 1;

taoensso.encore.queue_STAR_ = (function taoensso$encore$queue_STAR_(var_args){
var args__27351__auto__ = [];
var len__27348__auto___13832 = arguments.length;
var i__27349__auto___13833 = (0);
while(true){
if((i__27349__auto___13833 < len__27348__auto___13832)){
args__27351__auto__.push((arguments[i__27349__auto___13833]));

var G__13834 = (i__27349__auto___13833 + (1));
i__27349__auto___13833 = G__13834;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return taoensso.encore.queue_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

taoensso.encore.queue_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (items){
return taoensso.encore.queue.call(null,items);
});

taoensso.encore.queue_STAR_.cljs$lang$maxFixedArity = (0);

taoensso.encore.queue_STAR_.cljs$lang$applyTo = (function (seq13831){
return taoensso.encore.queue_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq13831));
});

/**
 * (seq-kvs {:a :A}) => (:a :A)
 */
taoensso.encore.seq_kvs = cljs.core.partial.call(null,cljs.core.reduce,cljs.core.concat);
/**
 * Like `apply` but calls `seq-kvs` on final arg
 */
taoensso.encore.mapply = (function taoensso$encore$mapply(var_args){
var args__27351__auto__ = [];
var len__27348__auto___13837 = arguments.length;
var i__27349__auto___13838 = (0);
while(true){
if((i__27349__auto___13838 < len__27348__auto___13837)){
args__27351__auto__.push((arguments[i__27349__auto___13838]));

var G__13839 = (i__27349__auto___13838 + (1));
i__27349__auto___13838 = G__13839;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.mapply.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.mapply.cljs$core$IFn$_invoke$arity$variadic = (function (f,args){
return cljs.core.apply.call(null,f,cljs.core.concat.call(null,cljs.core.butlast.call(null,args),taoensso.encore.seq_kvs.call(null,cljs.core.last.call(null,args))));
});

taoensso.encore.mapply.cljs$lang$maxFixedArity = (1);

taoensso.encore.mapply.cljs$lang$applyTo = (function (seq13835){
var G__13836 = cljs.core.first.call(null,seq13835);
var seq13835__$1 = cljs.core.next.call(null,seq13835);
return taoensso.encore.mapply.cljs$core$IFn$_invoke$arity$variadic(G__13836,seq13835__$1);
});

/**
 * Faster `zipmap` using transients
 */
taoensso.encore.fzipmap = (function taoensso$encore$fzipmap(ks,vs){
var m = cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ks__$1 = cljs.core.seq.call(null,ks);
var vs__$1 = cljs.core.seq.call(null,vs);
while(true){
if((ks__$1) && (vs__$1)){
var G__13840 = cljs.core.assoc_BANG_.call(null,m,cljs.core.first.call(null,ks__$1),cljs.core.first.call(null,vs__$1));
var G__13841 = cljs.core.next.call(null,ks__$1);
var G__13842 = cljs.core.next.call(null,vs__$1);
m = G__13840;
ks__$1 = G__13841;
vs__$1 = G__13842;
continue;
} else {
return cljs.core.persistent_BANG_.call(null,m);
}
break;
}
});
/**
 * Greedy version of `interleave`, Ref. http://goo.gl/KvzqWb
 */
taoensso.encore.interleave_all = (function taoensso$encore$interleave_all(var_args){
var args13843 = [];
var len__27348__auto___13849 = arguments.length;
var i__27349__auto___13850 = (0);
while(true){
if((i__27349__auto___13850 < len__27348__auto___13849)){
args13843.push((arguments[i__27349__auto___13850]));

var G__13851 = (i__27349__auto___13850 + (1));
i__27349__auto___13850 = G__13851;
continue;
} else {
}
break;
}

var G__13848 = args13843.length;
switch (G__13848) {
case 0:
return taoensso.encore.interleave_all.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return taoensso.encore.interleave_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore.interleave_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__27363__auto__ = (new cljs.core.IndexedSeq(args13843.slice((2)),(0),null));
return taoensso.encore.interleave_all.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27363__auto__);

}
});

taoensso.encore.interleave_all.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.List.EMPTY;
});

taoensso.encore.interleave_all.cljs$core$IFn$_invoke$arity$1 = (function (c1){
return (new cljs.core.LazySeq(null,(function (){
return c1;
}),null,null));
});

taoensso.encore.interleave_all.cljs$core$IFn$_invoke$arity$2 = (function (c1,c2){
return (new cljs.core.LazySeq(null,(function (){
var s1 = cljs.core.seq.call(null,c1);
var s2 = cljs.core.seq.call(null,c2);
if((s1) && (s2)){
return cljs.core.cons.call(null,cljs.core.first.call(null,s1),cljs.core.cons.call(null,cljs.core.first.call(null,s2),taoensso.encore.interleave_all.call(null,cljs.core.rest.call(null,s1),cljs.core.rest.call(null,s2))));
} else {
if(s1){
return s1;
} else {
if(s2){
return s2;
} else {
return null;
}
}
}
}),null,null));
});

taoensso.encore.interleave_all.cljs$core$IFn$_invoke$arity$variadic = (function (c1,c2,colls){
return (new cljs.core.LazySeq(null,(function (){
var ss = cljs.core.filter.call(null,cljs.core.identity,cljs.core.map.call(null,cljs.core.seq,cljs.core.conj.call(null,colls,c2,c1)));
return cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.first,ss),cljs.core.apply.call(null,taoensso.encore.interleave_all,cljs.core.map.call(null,cljs.core.rest,ss)));
}),null,null));
});

taoensso.encore.interleave_all.cljs$lang$applyTo = (function (seq13844){
var G__13845 = cljs.core.first.call(null,seq13844);
var seq13844__$1 = cljs.core.next.call(null,seq13844);
var G__13846 = cljs.core.first.call(null,seq13844__$1);
var seq13844__$2 = cljs.core.next.call(null,seq13844__$1);
return taoensso.encore.interleave_all.cljs$core$IFn$_invoke$arity$variadic(G__13845,G__13846,seq13844__$2);
});

taoensso.encore.interleave_all.cljs$lang$maxFixedArity = (2);

taoensso.encore.vinterleave_all = (function taoensso$encore$vinterleave_all(c1,c2){
var v = cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY);
var s1 = cljs.core.seq.call(null,c1);
var s2 = cljs.core.seq.call(null,c2);
while(true){
if((s1) && (s2)){
var G__13853 = cljs.core.conj_BANG_.call(null,cljs.core.conj_BANG_.call(null,v,cljs.core.first.call(null,s1)),cljs.core.first.call(null,s2));
var G__13854 = cljs.core.next.call(null,s1);
var G__13855 = cljs.core.next.call(null,s2);
v = G__13853;
s1 = G__13854;
s2 = G__13855;
continue;
} else {
if(s1){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,cljs.core.conj_BANG_,v,s1));
} else {
if(s2){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,cljs.core.conj_BANG_,v,s2));
} else {
return cljs.core.persistent_BANG_.call(null,v);
}
}
}
break;
}
});
/**
 * Reverse comparator
 */
taoensso.encore.rcompare = (function taoensso$encore$rcompare(x,y){
return cljs.core.compare.call(null,y,x);
});
taoensso.encore._nested_merge_with = (function taoensso$encore$_nested_merge_with(f,maps){
if(cljs.core.truth_(taoensso.encore.rsome.call(null,cljs.core.identity,maps))){
return cljs.core.reduce.call(null,(function (acc,in$){
return cljs.core.reduce_kv.call(null,(function taoensso$encore$_nested_merge_with_$_rf2(acc__$1,k,rv){
if(cljs.core.contains_QMARK_.call(null,acc__$1,k)){
var lv = cljs.core.get.call(null,acc__$1,k);
if((cljs.core.map_QMARK_.call(null,lv)) && (cljs.core.map_QMARK_.call(null,rv))){
return cljs.core.assoc.call(null,acc__$1,k,cljs.core.reduce_kv.call(null,taoensso$encore$_nested_merge_with_$_rf2,lv,rv));
} else {
if(taoensso.encore.kw_identical_QMARK_.call(null,rv,new cljs.core.Keyword("merge","dissoc","merge/dissoc",-706655261))){
return cljs.core.dissoc.call(null,acc__$1,k);
} else {
var new_rv = f.call(null,lv,rv);
if(taoensso.encore.kw_identical_QMARK_.call(null,new_rv,new cljs.core.Keyword("merge","dissoc","merge/dissoc",-706655261))){
return cljs.core.dissoc.call(null,acc__$1,k);
} else {
return cljs.core.assoc.call(null,acc__$1,k,new_rv);
}
}
}
} else {
return cljs.core.assoc.call(null,acc__$1,k,rv);
}
}),acc,in$);
}),cljs.core.PersistentArrayMap.EMPTY,maps);
} else {
return null;
}
});
taoensso.encore.nested_merge_with = (function taoensso$encore$nested_merge_with(var_args){
var args__27351__auto__ = [];
var len__27348__auto___13858 = arguments.length;
var i__27349__auto___13859 = (0);
while(true){
if((i__27349__auto___13859 < len__27348__auto___13858)){
args__27351__auto__.push((arguments[i__27349__auto___13859]));

var G__13860 = (i__27349__auto___13859 + (1));
i__27349__auto___13859 = G__13860;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.nested_merge_with.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.nested_merge_with.cljs$core$IFn$_invoke$arity$variadic = (function (f,maps){
return taoensso.encore._nested_merge_with.call(null,f,maps);
});

taoensso.encore.nested_merge_with.cljs$lang$maxFixedArity = (1);

taoensso.encore.nested_merge_with.cljs$lang$applyTo = (function (seq13856){
var G__13857 = cljs.core.first.call(null,seq13856);
var seq13856__$1 = cljs.core.next.call(null,seq13856);
return taoensso.encore.nested_merge_with.cljs$core$IFn$_invoke$arity$variadic(G__13857,seq13856__$1);
});

taoensso.encore.nested_merge = (function taoensso$encore$nested_merge(var_args){
var args__27351__auto__ = [];
var len__27348__auto___13862 = arguments.length;
var i__27349__auto___13863 = (0);
while(true){
if((i__27349__auto___13863 < len__27348__auto___13862)){
args__27351__auto__.push((arguments[i__27349__auto___13863]));

var G__13864 = (i__27349__auto___13863 + (1));
i__27349__auto___13863 = G__13864;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return taoensso.encore.nested_merge.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

taoensso.encore.nested_merge.cljs$core$IFn$_invoke$arity$variadic = (function (maps){
return taoensso.encore._nested_merge_with.call(null,(function (x,y){
return y;
}),maps);
});

taoensso.encore.nested_merge.cljs$lang$maxFixedArity = (0);

taoensso.encore.nested_merge.cljs$lang$applyTo = (function (seq13861){
return taoensso.encore.nested_merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq13861));
});

/**
 * Minor optimization for single-threaded Cljs
 */
taoensso.encore._platform_cas_BANG_ = (function taoensso$encore$_platform_cas_BANG_(atom_,old_val,new_val){
cljs.core.reset_BANG_.call(null,atom_,new_val);

return true;
});
/**
 * Returns [<old-val> <new-val>]
 */
taoensso.encore.dswap_BANG_ = (function taoensso$encore$dswap_BANG_(atom_,f){
var ov = cljs.core.deref.call(null,atom_);
var nv = f.call(null,ov);
cljs.core.reset_BANG_.call(null,atom_,nv);

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ov,nv], null);
});
/**
 * Used by memoization utils
 */
taoensso.encore._swap_cache_BANG_ = (function taoensso$encore$_swap_cache_BANG_(atom_,k,f){
var om = cljs.core.deref.call(null,atom_);
var nv = f.call(null,cljs.core.get.call(null,om,k));
var nm = cljs.core.assoc.call(null,om,k,nv);
cljs.core.reset_BANG_.call(null,atom_,nm);

return nv;
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
taoensso.encore.Swapped = (function (new_val,return_val,__meta,__extmap,__hash){
this.new_val = new_val;
this.return_val = return_val;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
taoensso.encore.Swapped.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__27059__auto__,k__27060__auto__){
var self__ = this;
var this__27059__auto____$1 = this;
return cljs.core._lookup.call(null,this__27059__auto____$1,k__27060__auto__,null);
});

taoensso.encore.Swapped.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__27061__auto__,k13866,else__27062__auto__){
var self__ = this;
var this__27061__auto____$1 = this;
var G__13868 = (((k13866 instanceof cljs.core.Keyword))?k13866.fqn:null);
switch (G__13868) {
case "new-val":
return self__.new_val;

break;
case "return-val":
return self__.return_val;

break;
default:
return cljs.core.get.call(null,self__.__extmap,k13866,else__27062__auto__);

}
});

taoensso.encore.Swapped.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__27073__auto__,writer__27074__auto__,opts__27075__auto__){
var self__ = this;
var this__27073__auto____$1 = this;
var pr_pair__27076__auto__ = ((function (this__27073__auto____$1){
return (function (keyval__27077__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__27074__auto__,cljs.core.pr_writer,""," ","",opts__27075__auto__,keyval__27077__auto__);
});})(this__27073__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__27074__auto__,pr_pair__27076__auto__,"#taoensso.encore.Swapped{",", ","}",opts__27075__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"new-val","new-val",-738158599),self__.new_val],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"return-val","return-val",-512772489),self__.return_val],null))], null),self__.__extmap));
});

taoensso.encore.Swapped.prototype.cljs$core$IIterable$ = true;

taoensso.encore.Swapped.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__13865){
var self__ = this;
var G__13865__$1 = this;
return (new cljs.core.RecordIter((0),G__13865__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-val","new-val",-738158599),new cljs.core.Keyword(null,"return-val","return-val",-512772489)], null),cljs.core._iterator.call(null,self__.__extmap)));
});

taoensso.encore.Swapped.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__27057__auto__){
var self__ = this;
var this__27057__auto____$1 = this;
return self__.__meta;
});

taoensso.encore.Swapped.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__27053__auto__){
var self__ = this;
var this__27053__auto____$1 = this;
return (new taoensso.encore.Swapped(self__.new_val,self__.return_val,self__.__meta,self__.__extmap,self__.__hash));
});

taoensso.encore.Swapped.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__27063__auto__){
var self__ = this;
var this__27063__auto____$1 = this;
return (2 + cljs.core.count.call(null,self__.__extmap));
});

taoensso.encore.Swapped.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__27054__auto__){
var self__ = this;
var this__27054__auto____$1 = this;
var h__26916__auto__ = self__.__hash;
if(!((h__26916__auto__ == null))){
return h__26916__auto__;
} else {
var h__26916__auto____$1 = cljs.core.hash_imap.call(null,this__27054__auto____$1);
self__.__hash = h__26916__auto____$1;

return h__26916__auto____$1;
}
});

taoensso.encore.Swapped.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__27055__auto__,other__27056__auto__){
var self__ = this;
var this__27055__auto____$1 = this;
if(cljs.core.truth_((function (){var and__26809__auto__ = other__27056__auto__;
if(cljs.core.truth_(and__26809__auto__)){
var and__26809__auto____$1 = (this__27055__auto____$1.constructor === other__27056__auto__.constructor);
if(and__26809__auto____$1){
return cljs.core.equiv_map.call(null,this__27055__auto____$1,other__27056__auto__);
} else {
return and__26809__auto____$1;
}
} else {
return and__26809__auto__;
}
})())){
return true;
} else {
return false;
}
});

taoensso.encore.Swapped.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__27068__auto__,k__27069__auto__){
var self__ = this;
var this__27068__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"return-val","return-val",-512772489),null,new cljs.core.Keyword(null,"new-val","new-val",-738158599),null], null), null),k__27069__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__27068__auto____$1),self__.__meta),k__27069__auto__);
} else {
return (new taoensso.encore.Swapped(self__.new_val,self__.return_val,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__27069__auto__)),null));
}
});

taoensso.encore.Swapped.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__27066__auto__,k__27067__auto__,G__13865){
var self__ = this;
var this__27066__auto____$1 = this;
var pred__13869 = cljs.core.keyword_identical_QMARK_;
var expr__13870 = k__27067__auto__;
if(cljs.core.truth_(pred__13869.call(null,new cljs.core.Keyword(null,"new-val","new-val",-738158599),expr__13870))){
return (new taoensso.encore.Swapped(G__13865,self__.return_val,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__13869.call(null,new cljs.core.Keyword(null,"return-val","return-val",-512772489),expr__13870))){
return (new taoensso.encore.Swapped(self__.new_val,G__13865,self__.__meta,self__.__extmap,null));
} else {
return (new taoensso.encore.Swapped(self__.new_val,self__.return_val,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__27067__auto__,G__13865),null));
}
}
});

taoensso.encore.Swapped.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__27071__auto__){
var self__ = this;
var this__27071__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"new-val","new-val",-738158599),self__.new_val],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"return-val","return-val",-512772489),self__.return_val],null))], null),self__.__extmap));
});

taoensso.encore.Swapped.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__27058__auto__,G__13865){
var self__ = this;
var this__27058__auto____$1 = this;
return (new taoensso.encore.Swapped(self__.new_val,self__.return_val,G__13865,self__.__extmap,self__.__hash));
});

taoensso.encore.Swapped.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__27064__auto__,entry__27065__auto__){
var self__ = this;
var this__27064__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__27065__auto__)){
return cljs.core._assoc.call(null,this__27064__auto____$1,cljs.core._nth.call(null,entry__27065__auto__,(0)),cljs.core._nth.call(null,entry__27065__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__27064__auto____$1,entry__27065__auto__);
}
});

taoensso.encore.Swapped.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"new-val","new-val",902372928,null),new cljs.core.Symbol(null,"return-val","return-val",1127759038,null)], null);
});

taoensso.encore.Swapped.cljs$lang$type = true;

taoensso.encore.Swapped.cljs$lang$ctorPrSeq = (function (this__27093__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"taoensso.encore/Swapped");
});

taoensso.encore.Swapped.cljs$lang$ctorPrWriter = (function (this__27093__auto__,writer__27094__auto__){
return cljs.core._write.call(null,writer__27094__auto__,"taoensso.encore/Swapped");
});

taoensso.encore.__GT_Swapped = (function taoensso$encore$__GT_Swapped(new_val,return_val){
return (new taoensso.encore.Swapped(new_val,return_val,null,null,null));
});

taoensso.encore.map__GT_Swapped = (function taoensso$encore$map__GT_Swapped(G__13867){
return (new taoensso.encore.Swapped(new cljs.core.Keyword(null,"new-val","new-val",-738158599).cljs$core$IFn$_invoke$arity$1(G__13867),new cljs.core.Keyword(null,"return-val","return-val",-512772489).cljs$core$IFn$_invoke$arity$1(G__13867),null,cljs.core.dissoc.call(null,G__13867,new cljs.core.Keyword(null,"new-val","new-val",-738158599),new cljs.core.Keyword(null,"return-val","return-val",-512772489)),null));
});

taoensso.encore.swapped_QMARK_ = (function taoensso$encore$swapped_QMARK_(x){
return (x instanceof taoensso.encore.Swapped);
});
taoensso.encore.swapped = (function taoensso$encore$swapped(new_val,return_val){
return (new taoensso.encore.Swapped(new_val,return_val,null,null,null));
});
/**
 * Returns [<new-val> <return-val>]
 */
taoensso.encore._swapped = (function taoensso$encore$_swapped(var_args){
var args13873 = [];
var len__27348__auto___13885 = arguments.length;
var i__27349__auto___13886 = (0);
while(true){
if((i__27349__auto___13886 < len__27348__auto___13885)){
args13873.push((arguments[i__27349__auto___13886]));

var G__13887 = (i__27349__auto___13886 + (1));
i__27349__auto___13886 = G__13887;
continue;
} else {
}
break;
}

var G__13875 = args13873.length;
switch (G__13875) {
case 1:
return taoensso.encore._swapped.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore._swapped.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore._swapped.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13873.length)].join('')));

}
});

taoensso.encore._swapped.cljs$core$IFn$_invoke$arity$1 = (function (x){
if(taoensso.encore.swapped_QMARK_.call(null,x)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-val","new-val",-738158599).cljs$core$IFn$_invoke$arity$1(x),new cljs.core.Keyword(null,"return-val","return-val",-512772489).cljs$core$IFn$_invoke$arity$1(x)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,x], null);
}
});

taoensso.encore._swapped.cljs$core$IFn$_invoke$arity$2 = (function (old_val,f){
return taoensso.encore._swapped.call(null,f.call(null,old_val));
});

taoensso.encore._swapped.cljs$core$IFn$_invoke$arity$3 = (function (old_val,ks,f){
var vec__13876 = ks;
var seq__13877 = cljs.core.seq.call(null,vec__13876);
var first__13878 = cljs.core.first.call(null,seq__13877);
var seq__13877__$1 = cljs.core.next.call(null,seq__13877);
var k1 = first__13878;
var kn = seq__13877__$1;
var m = old_val;
if(kn){
if(taoensso.encore.kw_identical_QMARK_.call(null,f,new cljs.core.Keyword("swap","dissoc","swap/dissoc",-605373782))){
return taoensso.encore._swapped.call(null,taoensso.encore.dissoc_in.call(null,m,cljs.core.butlast.call(null,ks),cljs.core.last.call(null,ks)));
} else {
var old_val_in = cljs.core.get_in.call(null,m,ks);
var vec__13879 = taoensso.encore._swapped.call(null,f.call(null,old_val_in));
var new_val_in = cljs.core.nth.call(null,vec__13879,(0),null);
var return_val = cljs.core.nth.call(null,vec__13879,(1),null);
var new_val = ((taoensso.encore.kw_identical_QMARK_.call(null,new_val_in,new cljs.core.Keyword("swap","dissoc","swap/dissoc",-605373782)))?taoensso.encore.dissoc_in.call(null,m,cljs.core.butlast.call(null,ks),cljs.core.last.call(null,ks)):cljs.core.assoc_in.call(null,m,ks,new_val_in));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_val,return_val], null);
}
} else {
if(((k1 == null)) && (cljs.core.empty_QMARK_.call(null,ks))){
return taoensso.encore._swapped.call(null,f.call(null,old_val));
} else {
if(taoensso.encore.kw_identical_QMARK_.call(null,f,new cljs.core.Keyword("swap","dissoc","swap/dissoc",-605373782))){
return taoensso.encore._swapped.call(null,cljs.core.dissoc.call(null,m,k1));
} else {
var old_val_in = cljs.core.get.call(null,m,k1);
var vec__13882 = taoensso.encore._swapped.call(null,f.call(null,old_val_in));
var new_val_in = cljs.core.nth.call(null,vec__13882,(0),null);
var return_val = cljs.core.nth.call(null,vec__13882,(1),null);
var new_val = ((taoensso.encore.kw_identical_QMARK_.call(null,new_val_in,new cljs.core.Keyword("swap","dissoc","swap/dissoc",-605373782)))?cljs.core.dissoc.call(null,m,k1):cljs.core.assoc.call(null,m,k1,new_val_in));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_val,return_val], null);
}
}
}
});

taoensso.encore._swapped.cljs$lang$maxFixedArity = 3;

/**
 * Reduces input with
 *   [<type> <ks> <reset-val-or-swap-fn>] or
 *       [<ks> <reset-val-or-swap-fn>] ops
 */
taoensso.encore._replace_in = (function taoensso$encore$_replace_in(_QMARK_vf_type,m,ops){
return cljs.core.reduce.call(null,(function (acc,_QMARK_op){
if(cljs.core.truth_(_QMARK_op)){
var vec__13893 = (cljs.core.truth_(_QMARK_vf_type)?cljs.core.cons.call(null,_QMARK_vf_type,_QMARK_op):_QMARK_op);
var vf_type = cljs.core.nth.call(null,vec__13893,(0),null);
var ks = cljs.core.nth.call(null,vec__13893,(1),null);
var valf = cljs.core.nth.call(null,vec__13893,(2),null);
var G__13896 = (((vf_type instanceof cljs.core.Keyword))?vf_type.fqn:null);
switch (G__13896) {
case "reset":
if(cljs.core.empty_QMARK_.call(null,ks)){
return valf;
} else {
return cljs.core.assoc_in.call(null,acc,ks,valf);
}

break;
case "swap":
if((valf == null)){
return acc;
} else {
if(cljs.core.empty_QMARK_.call(null,ks)){
return valf.call(null,acc);
} else {
return cljs.core.nth.call(null,taoensso.encore._swapped.call(null,acc,ks,valf),(0));
}
}

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(vf_type)].join('')));

}
} else {
return acc;
}
}),m,ops);
});
/**
 * For use with `swap!`, etc.
 */
taoensso.encore.replace_in = (function taoensso$encore$replace_in(var_args){
var args__27351__auto__ = [];
var len__27348__auto___13900 = arguments.length;
var i__27349__auto___13901 = (0);
while(true){
if((i__27349__auto___13901 < len__27348__auto___13900)){
args__27351__auto__.push((arguments[i__27349__auto___13901]));

var G__13902 = (i__27349__auto___13901 + (1));
i__27349__auto___13901 = G__13902;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.replace_in.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.replace_in.cljs$core$IFn$_invoke$arity$variadic = (function (m,ops){
return taoensso.encore._replace_in.call(null,null,m,ops);
});

taoensso.encore.replace_in.cljs$lang$maxFixedArity = (1);

taoensso.encore.replace_in.cljs$lang$applyTo = (function (seq13898){
var G__13899 = cljs.core.first.call(null,seq13898);
var seq13898__$1 = cljs.core.next.call(null,seq13898);
return taoensso.encore.replace_in.cljs$core$IFn$_invoke$arity$variadic(G__13899,seq13898__$1);
});

taoensso.encore.pairs_into = (function taoensso$encore$pairs_into(to,from){
return cljs.core.into.call(null,to,cljs.core.partition_all.call(null,(2)),from);
});
/**
 * More powerful version of `swap!`:
 *  * Supports optional `update-in` semantics.
 *  * Swap fn can return `(swapped <new-val> <return-val>)` rather than just
 *    <new-val>. This is useful when writing atomic pull fns, etc.
 */
taoensso.encore.swap_in_BANG_ = (function taoensso$encore$swap_in_BANG_(var_args){
var args13907 = [];
var len__27348__auto___13922 = arguments.length;
var i__27349__auto___13923 = (0);
while(true){
if((i__27349__auto___13923 < len__27348__auto___13922)){
args13907.push((arguments[i__27349__auto___13923]));

var G__13924 = (i__27349__auto___13923 + (1));
i__27349__auto___13923 = G__13924;
continue;
} else {
}
break;
}

var G__13913 = args13907.length;
switch (G__13913) {
case 2:
return taoensso.encore.swap_in_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore.swap_in_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
var argseq__27363__auto__ = (new cljs.core.IndexedSeq(args13907.slice((3)),(0),null));
return taoensso.encore.swap_in_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__27363__auto__);

}
});

taoensso.encore.swap_in_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (atom_,f){
while(true){
var old_val = cljs.core.deref.call(null,atom_);
var vec__13914 = taoensso.encore._swapped.call(null,f.call(null,old_val));
var new_val = cljs.core.nth.call(null,vec__13914,(0),null);
var return_val = cljs.core.nth.call(null,vec__13914,(1),null);
if(cljs.core.truth_(taoensso.encore._platform_cas_BANG_.call(null,atom_,old_val,new_val))){
return return_val;
} else {
continue;
}
break;
}
});

taoensso.encore.swap_in_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (atom_,ks,f){
while(true){
var old_val = cljs.core.deref.call(null,atom_);
var vec__13917 = taoensso.encore._swapped.call(null,old_val,ks,f);
var new_val = cljs.core.nth.call(null,vec__13917,(0),null);
var return_val = cljs.core.nth.call(null,vec__13917,(1),null);
if(cljs.core.truth_(taoensso.encore._platform_cas_BANG_.call(null,atom_,old_val,new_val))){
return return_val;
} else {
continue;
}
break;
}
});

taoensso.encore.swap_in_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (atom_,ks,f,more){
if(cljs.core.truth_((function (){var z = (function (){try{return cljs.core.count.call(null,more);
}catch (e13920){if((e13920 instanceof Error)){
var e = e13920;
return (new taoensso.truss.impl.WrappedError(e));
} else {
throw e13920;

}
}})();
var e = (function (){try{if((z instanceof taoensso.truss.impl.WrappedError)){
return z;
} else {
if(cljs.core.even_QMARK_.call(null,z)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}
}catch (e13921){if((e13921 instanceof Error)){
var e = e13921;
return e;
} else {
throw e13921;

}
}})();
if((e == null)){
return true;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.encore",null,"(even? (count more))",z,e,null);
}
})())){
} else {
throw (new Error("Assert failed: (have? even? (count more))"));
}

var op_pairs = taoensso.encore.pairs_into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ks,f], null)], null),more);
while(true){
var old_val = cljs.core.deref.call(null,atom_);
var new_val = taoensso.encore._replace_in.call(null,new cljs.core.Keyword(null,"swap","swap",228675637),old_val,op_pairs);
if(cljs.core.truth_(taoensso.encore._platform_cas_BANG_.call(null,atom_,old_val,new_val))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [old_val,new_val], null);
} else {
continue;
}
break;
}
});

taoensso.encore.swap_in_BANG_.cljs$lang$applyTo = (function (seq13908){
var G__13909 = cljs.core.first.call(null,seq13908);
var seq13908__$1 = cljs.core.next.call(null,seq13908);
var G__13910 = cljs.core.first.call(null,seq13908__$1);
var seq13908__$2 = cljs.core.next.call(null,seq13908__$1);
var G__13911 = cljs.core.first.call(null,seq13908__$2);
var seq13908__$3 = cljs.core.next.call(null,seq13908__$2);
return taoensso.encore.swap_in_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13909,G__13910,G__13911,seq13908__$3);
});

taoensso.encore.swap_in_BANG_.cljs$lang$maxFixedArity = (3);

/**
 * Is to `reset!` as `swap-in!` is to `swap!`
 */
taoensso.encore.reset_in_BANG_ = (function taoensso$encore$reset_in_BANG_(var_args){
var args13926 = [];
var len__27348__auto___13935 = arguments.length;
var i__27349__auto___13936 = (0);
while(true){
if((i__27349__auto___13936 < len__27348__auto___13935)){
args13926.push((arguments[i__27349__auto___13936]));

var G__13937 = (i__27349__auto___13936 + (1));
i__27349__auto___13936 = G__13937;
continue;
} else {
}
break;
}

var G__13932 = args13926.length;
switch (G__13932) {
case 3:
return taoensso.encore.reset_in_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
var argseq__27363__auto__ = (new cljs.core.IndexedSeq(args13926.slice((3)),(0),null));
return taoensso.encore.reset_in_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__27363__auto__);

}
});

taoensso.encore.reset_in_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (atom_,ks,new_val){
if(cljs.core.empty_QMARK_.call(null,ks)){
return cljs.core.reset_BANG_.call(null,atom_,new_val);
} else {
return cljs.core.swap_BANG_.call(null,atom_,(function (old_val){
return cljs.core.assoc_in.call(null,old_val,ks,new_val);
}));
}
});

taoensso.encore.reset_in_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (atom_,ks,new_val,more){
if(cljs.core.truth_((function (){var z = (function (){try{return cljs.core.count.call(null,more);
}catch (e13933){if((e13933 instanceof Error)){
var e = e13933;
return (new taoensso.truss.impl.WrappedError(e));
} else {
throw e13933;

}
}})();
var e = (function (){try{if((z instanceof taoensso.truss.impl.WrappedError)){
return z;
} else {
if(cljs.core.even_QMARK_.call(null,z)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}
}catch (e13934){if((e13934 instanceof Error)){
var e = e13934;
return e;
} else {
throw e13934;

}
}})();
if((e == null)){
return true;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.encore",null,"(even? (count more))",z,e,null);
}
})())){
} else {
throw (new Error("Assert failed: (have? even? (count more))"));
}

var op_pairs = taoensso.encore.pairs_into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ks,new_val], null)], null),more);
while(true){
var old_val = cljs.core.deref.call(null,atom_);
var new_val__$1 = taoensso.encore._replace_in.call(null,new cljs.core.Keyword(null,"reset","reset",-800929946),old_val,op_pairs);
if(cljs.core.truth_(taoensso.encore._platform_cas_BANG_.call(null,atom_,old_val,new_val__$1))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [old_val,new_val__$1], null);
} else {
continue;
}
break;
}
});

taoensso.encore.reset_in_BANG_.cljs$lang$applyTo = (function (seq13927){
var G__13928 = cljs.core.first.call(null,seq13927);
var seq13927__$1 = cljs.core.next.call(null,seq13927);
var G__13929 = cljs.core.first.call(null,seq13927__$1);
var seq13927__$2 = cljs.core.next.call(null,seq13927__$1);
var G__13930 = cljs.core.first.call(null,seq13927__$2);
var seq13927__$3 = cljs.core.next.call(null,seq13927__$2);
return taoensso.encore.reset_in_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__13928,G__13929,G__13930,seq13927__$3);
});

taoensso.encore.reset_in_BANG_.cljs$lang$maxFixedArity = (3);

taoensso.encore.str_builder_QMARK_ = (function taoensso$encore$str_builder_QMARK_(x){
return (x instanceof goog.string.StringBuffer);
});
/**
 * For cross-platform string building
 */
taoensso.encore.str_builder = (function() {
var taoensso$encore$str_builder = null;
var taoensso$encore$str_builder__0 = (function (){
return (new goog.string.StringBuffer());
});
var taoensso$encore$str_builder__1 = (function (s_init){
return (new goog.string.StringBuffer(s_init));
});
taoensso$encore$str_builder = function(s_init){
switch(arguments.length){
case 0:
return taoensso$encore$str_builder__0.call(this);
case 1:
return taoensso$encore$str_builder__1.call(this,s_init);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$encore$str_builder.cljs$core$IFn$_invoke$arity$0 = taoensso$encore$str_builder__0;
taoensso$encore$str_builder.cljs$core$IFn$_invoke$arity$1 = taoensso$encore$str_builder__1;
return taoensso$encore$str_builder;
})()
;
/**
 * For cross-platform string building
 */
taoensso.encore.sb_append = (function taoensso$encore$sb_append(var_args){
var args13939 = [];
var len__27348__auto___13945 = arguments.length;
var i__27349__auto___13946 = (0);
while(true){
if((i__27349__auto___13946 < len__27348__auto___13945)){
args13939.push((arguments[i__27349__auto___13946]));

var G__13947 = (i__27349__auto___13946 + (1));
i__27349__auto___13946 = G__13947;
continue;
} else {
}
break;
}

var G__13944 = args13939.length;
switch (G__13944) {
case 2:
return taoensso.encore.sb_append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var argseq__27363__auto__ = (new cljs.core.IndexedSeq(args13939.slice((2)),(0),null));
return taoensso.encore.sb_append.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27363__auto__);

}
});

taoensso.encore.sb_append.cljs$core$IFn$_invoke$arity$2 = (function (str_builder,s){
return str_builder.append(s);
});

taoensso.encore.sb_append.cljs$core$IFn$_invoke$arity$variadic = (function (str_builder,s,more){
taoensso.encore.sb_append.call(null,str_builder,s);

return cljs.core.reduce.call(null,(function (acc,in$){
return taoensso.encore.sb_append.call(null,acc,in$);
}),str_builder,more);
});

taoensso.encore.sb_append.cljs$lang$applyTo = (function (seq13940){
var G__13941 = cljs.core.first.call(null,seq13940);
var seq13940__$1 = cljs.core.next.call(null,seq13940);
var G__13942 = cljs.core.first.call(null,seq13940__$1);
var seq13940__$2 = cljs.core.next.call(null,seq13940__$1);
return taoensso.encore.sb_append.cljs$core$IFn$_invoke$arity$variadic(G__13941,G__13942,seq13940__$2);
});

taoensso.encore.sb_append.cljs$lang$maxFixedArity = (2);

/**
 * String builder reducing fn
 */
taoensso.encore.str_rf = (function() {
var taoensso$encore$str_rf = null;
var taoensso$encore$str_rf__0 = (function (){
return taoensso.encore.str_builder.call(null);
});
var taoensso$encore$str_rf__1 = (function (acc){
if(taoensso.encore.str_builder_QMARK_.call(null,acc)){
return acc;
} else {
return taoensso.encore.str_builder.call(null,[cljs.core.str(acc)].join(''));
}
});
var taoensso$encore$str_rf__2 = (function (acc,in$){
return taoensso.encore.sb_append.call(null,((taoensso.encore.str_builder_QMARK_.call(null,acc))?acc:taoensso.encore.str_builder.call(null,[cljs.core.str(acc)].join(''))),[cljs.core.str(in$)].join(''));
});
taoensso$encore$str_rf = function(acc,in$){
switch(arguments.length){
case 0:
return taoensso$encore$str_rf__0.call(this);
case 1:
return taoensso$encore$str_rf__1.call(this,acc);
case 2:
return taoensso$encore$str_rf__2.call(this,acc,in$);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$encore$str_rf.cljs$core$IFn$_invoke$arity$0 = taoensso$encore$str_rf__0;
taoensso$encore$str_rf.cljs$core$IFn$_invoke$arity$1 = taoensso$encore$str_rf__1;
taoensso$encore$str_rf.cljs$core$IFn$_invoke$arity$2 = taoensso$encore$str_rf__2;
return taoensso$encore$str_rf;
})()
;
taoensso.encore.undefined__GT_nil = (function taoensso$encore$undefined__GT_nil(x){
if((void 0 === x)){
return null;
} else {
return x;
}
});
taoensso.encore.nil__GT_str = (function taoensso$encore$nil__GT_str(x){
if(((void 0 === x)) || ((x == null))){
return "nil";
} else {
return x;
}
});
/**
 * Faster, transducer-based generalization of `clojure.string/join` with `xform`
 *  support
 */
taoensso.encore.str_join = (function taoensso$encore$str_join(var_args){
var args13953 = [];
var len__27348__auto___13956 = arguments.length;
var i__27349__auto___13957 = (0);
while(true){
if((i__27349__auto___13957 < len__27348__auto___13956)){
args13953.push((arguments[i__27349__auto___13957]));

var G__13958 = (i__27349__auto___13957 + (1));
i__27349__auto___13957 = G__13958;
continue;
} else {
}
break;
}

var G__13955 = args13953.length;
switch (G__13955) {
case 1:
return taoensso.encore.str_join.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore.str_join.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore.str_join.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13953.length)].join('')));

}
});

taoensso.encore.str_join.cljs$core$IFn$_invoke$arity$1 = (function (coll){
return taoensso.encore.str_join.call(null,null,null,coll);
});

taoensso.encore.str_join.cljs$core$IFn$_invoke$arity$2 = (function (separator,coll){
return taoensso.encore.str_join.call(null,separator,null,coll);
});

taoensso.encore.str_join.cljs$core$IFn$_invoke$arity$3 = (function (separator,xform,coll){
if(cljs.core.truth_((function (){var and__26809__auto__ = separator;
if(cljs.core.truth_(and__26809__auto__)){
return cljs.core.not_EQ_.call(null,separator,"");
} else {
return and__26809__auto__;
}
})())){
var sep_xform = cljs.core.interpose.call(null,separator);
var str_rf_STAR_ = cljs.core.completing.call(null,taoensso.encore.str_rf,cljs.core.str);
if(cljs.core.truth_(xform)){
return cljs.core.transduce.call(null,cljs.core.comp.call(null,xform,sep_xform),str_rf_STAR_,coll);
} else {
return cljs.core.transduce.call(null,sep_xform,str_rf_STAR_,coll);
}
} else {
if(cljs.core.truth_(xform)){
return cljs.core.transduce.call(null,xform,cljs.core.completing.call(null,taoensso.encore.str_rf,cljs.core.str),coll);
} else {
return [cljs.core.str(cljs.core.reduce.call(null,taoensso.encore.str_rf,coll))].join('');
}
}
});

taoensso.encore.str_join.cljs$lang$maxFixedArity = 3;

taoensso.encore.format_STAR_ = (function taoensso$encore$format_STAR_(fmt,args){
var fmt__$1 = (function (){var or__26817__auto__ = fmt;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return "";
}
})();
var args__$1 = cljs.core.mapv.call(null,taoensso.encore.nil__GT_str,args);
return cljs.core.apply.call(null,goog.string.format,fmt__$1,args__$1);
});
/**
 * Like `core/format` but:
 *  * Returns "" when fmt is nil rather than throwing an NPE
 *  * Formats nil as "nil" rather than "null"
 *  * Provides ClojureScript support via goog.string.format (this has fewer
 *    formatting options than Clojure's `format`!)
 */
taoensso.encore.format = (function taoensso$encore$format(var_args){
var args__27351__auto__ = [];
var len__27348__auto___13962 = arguments.length;
var i__27349__auto___13963 = (0);
while(true){
if((i__27349__auto___13963 < len__27348__auto___13962)){
args__27351__auto__.push((arguments[i__27349__auto___13963]));

var G__13964 = (i__27349__auto___13963 + (1));
i__27349__auto___13963 = G__13964;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.format.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.format.cljs$core$IFn$_invoke$arity$variadic = (function (fmt,args){
return taoensso.encore.format_STAR_.call(null,fmt,args);
});

taoensso.encore.format.cljs$lang$maxFixedArity = (1);

taoensso.encore.format.cljs$lang$applyTo = (function (seq13960){
var G__13961 = cljs.core.first.call(null,seq13960);
var seq13960__$1 = cljs.core.next.call(null,seq13960);
return taoensso.encore.format.cljs$core$IFn$_invoke$arity$variadic(G__13961,seq13960__$1);
});

/**
 * Workaround for http://dev.clojure.org/jira/browse/CLJS-794,
 *                http://dev.clojure.org/jira/browse/CLJS-911.
 * 
 *   Note that ClojureScript 1.7.145 technically introduced a breaking "fix" for
 *   CLJS-911 (Ref. https://goo.gl/bk5hcT) but it's a mess in an attempt to keep
 *   some compatibility with the previous broken behaviour. The merged CLJS-911 fix
 *   provides only inconsistent (single-match) and error-prone compatibility with
 *   Clojure's `str/replace`. CLJS-794 is also still unresolved.
 * 
 *   This util provides behaviour consistent between Clojure/Script.
 */
taoensso.encore.str_replace = (function taoensso$encore$str_replace(s,match,replacement){
if(typeof match === 'string'){
return s.replace((new RegExp(goog.string.regExpEscape(match),"g")),replacement);
} else {
if((match instanceof RegExp)){
var flags = [cljs.core.str("g"),cljs.core.str((cljs.core.truth_(match.ignoreCase)?"i":null)),cljs.core.str((cljs.core.truth_(match.multiline)?"m":null))].join('');
var replacement__$1 = ((typeof replacement === 'string')?replacement:((function (flags){
return (function() { 
var G__13965__delegate = function (args){
return replacement.call(null,cljs.core.vec.call(null,args));
};
var G__13965 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__13966__i = 0, G__13966__a = new Array(arguments.length -  0);
while (G__13966__i < G__13966__a.length) {G__13966__a[G__13966__i] = arguments[G__13966__i + 0]; ++G__13966__i;}
  args = new cljs.core.IndexedSeq(G__13966__a,0);
} 
return G__13965__delegate.call(this,args);};
G__13965.cljs$lang$maxFixedArity = 0;
G__13965.cljs$lang$applyTo = (function (arglist__13967){
var args = cljs.core.seq(arglist__13967);
return G__13965__delegate(args);
});
G__13965.cljs$core$IFn$_invoke$arity$variadic = G__13965__delegate;
return G__13965;
})()
;})(flags))
);
return s.replace((new RegExp(match.source,flags)),replacement__$1);
} else {
throw [cljs.core.str("Invalid match arg: "),cljs.core.str(match)].join('');
}
}
});
taoensso.encore.str_contains_QMARK_ = (function taoensso$encore$str_contains_QMARK_(s,substr){
return cljs.core.not_EQ_.call(null,(-1),s.indexOf(substr));
});
taoensso.encore.str_starts_with_QMARK_ = (function taoensso$encore$str_starts_with_QMARK_(s,substr){
return (s.indexOf(substr) === (0));
});
taoensso.encore.str_ends_with_QMARK_ = (function taoensso$encore$str_ends_with_QMARK_(s,substr){
var s_len = s.length;
var substr_len = substr.length;
if((s_len >= substr_len)){
return cljs.core.not_EQ_.call(null,(-1),s.indexOf(substr,(s_len - substr_len)));
} else {
return null;
}
});
taoensso.encore.str__QMARK_index = (function taoensso$encore$str__QMARK_index(var_args){
var args13968 = [];
var len__27348__auto___13971 = arguments.length;
var i__27349__auto___13972 = (0);
while(true){
if((i__27349__auto___13972 < len__27348__auto___13971)){
args13968.push((arguments[i__27349__auto___13972]));

var G__13973 = (i__27349__auto___13972 + (1));
i__27349__auto___13972 = G__13973;
continue;
} else {
}
break;
}

var G__13970 = args13968.length;
switch (G__13970) {
case 2:
return taoensso.encore.str__QMARK_index.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore.str__QMARK_index.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return taoensso.encore.str__QMARK_index.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13968.length)].join('')));

}
});

taoensso.encore.str__QMARK_index.cljs$core$IFn$_invoke$arity$2 = (function (s,substr){
return taoensso.encore.str__QMARK_index.call(null,s,substr,(0),false);
});

taoensso.encore.str__QMARK_index.cljs$core$IFn$_invoke$arity$3 = (function (s,substr,start_idx){
return taoensso.encore.str__QMARK_index.call(null,s,substr,start_idx,false);
});

taoensso.encore.str__QMARK_index.cljs$core$IFn$_invoke$arity$4 = (function (s,substr,start_idx,last_QMARK_){
var result = (cljs.core.truth_(last_QMARK_)?s.lastIndexOf(substr,start_idx):s.indexOf(substr,start_idx));
if(cljs.core.not_EQ_.call(null,result,(-1))){
return result;
} else {
return null;
}
});

taoensso.encore.str__QMARK_index.cljs$lang$maxFixedArity = 4;

/**
 * Like `subs` but provides consistent clj/s behaviour:
 *  - Never throws; snaps to valid start and end indexes.
 *  - Returns nil rather than an empty string.
 */
taoensso.encore._QMARK_substr_LT_idx = (function taoensso$encore$_QMARK_substr_LT_idx(var_args){
var args13975 = [];
var len__27348__auto___13978 = arguments.length;
var i__27349__auto___13979 = (0);
while(true){
if((i__27349__auto___13979 < len__27348__auto___13978)){
args13975.push((arguments[i__27349__auto___13979]));

var G__13980 = (i__27349__auto___13979 + (1));
i__27349__auto___13979 = G__13980;
continue;
} else {
}
break;
}

var G__13977 = args13975.length;
switch (G__13977) {
case 2:
return taoensso.encore._QMARK_substr_LT_idx.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore._QMARK_substr_LT_idx.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13975.length)].join('')));

}
});

taoensso.encore._QMARK_substr_LT_idx.cljs$core$IFn$_invoke$arity$2 = (function (s,start){
return taoensso.encore.as__QMARK_nempty_str.call(null,s.substring(start));
});

taoensso.encore._QMARK_substr_LT_idx.cljs$core$IFn$_invoke$arity$3 = (function (s,start,end){
if((start >= end)){
return null;
} else {
return s.substring(start,end);
}
});

taoensso.encore._QMARK_substr_LT_idx.cljs$lang$maxFixedArity = 3;

/**
 * Like `?substr<idx` but:
 *  - Takes `length` instead of `end` (index).
 *  - -ive `start` => index from right of string.
 */
taoensso.encore._QMARK_substr_LT_len = (function taoensso$encore$_QMARK_substr_LT_len(var_args){
var args13982 = [];
var len__27348__auto___13985 = arguments.length;
var i__27349__auto___13986 = (0);
while(true){
if((i__27349__auto___13986 < len__27348__auto___13985)){
args13982.push((arguments[i__27349__auto___13986]));

var G__13987 = (i__27349__auto___13986 + (1));
i__27349__auto___13986 = G__13987;
continue;
} else {
}
break;
}

var G__13984 = args13982.length;
switch (G__13984) {
case 2:
return taoensso.encore._QMARK_substr_LT_len.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore._QMARK_substr_LT_len.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13982.length)].join('')));

}
});

taoensso.encore._QMARK_substr_LT_len.cljs$core$IFn$_invoke$arity$2 = (function (s,start){
return taoensso.encore.as__QMARK_nempty_str.call(null,s.substr(start));
});

taoensso.encore._QMARK_substr_LT_len.cljs$core$IFn$_invoke$arity$3 = (function (s,start,length){
return taoensso.encore.as__QMARK_nempty_str.call(null,s.substr(start,length));
});

taoensso.encore._QMARK_substr_LT_len.cljs$lang$maxFixedArity = 3;

/**
 * Like `string/join` but skips duplicate separators
 */
taoensso.encore.str_join_once = (function taoensso$encore$str_join_once(separator,coll){
var sep = separator;
if(clojure.string.blank_QMARK_.call(null,sep)){
return [cljs.core.str(cljs.core.reduce.call(null,taoensso.encore.str_rf,"",coll))].join('');
} else {
var acc_ends_with_sep_QMARK__ = cljs.core.volatile_BANG_.call(null,false);
var acc_empty_QMARK__ = cljs.core.volatile_BANG_.call(null,true);
return [cljs.core.str(cljs.core.reduce.call(null,((function (acc_ends_with_sep_QMARK__,acc_empty_QMARK__,sep){
return (function (acc,in$){
var in$__$1 = [cljs.core.str(in$)].join('');
var in_empty_QMARK_ = cljs.core._EQ_.call(null,in$__$1,"");
var in_starts_with_sep_QMARK_ = taoensso.encore.str_starts_with_QMARK_.call(null,in$__$1,sep);
var in_ends_with_sep_QMARK_ = taoensso.encore.str_ends_with_QMARK_.call(null,in$__$1,sep);
var acc_ends_with_sep_QMARK_ = cljs.core.deref.call(null,acc_ends_with_sep_QMARK__);
var acc_empty_QMARK_ = cljs.core.deref.call(null,acc_empty_QMARK__);
cljs.core.vreset_BANG_.call(null,acc_ends_with_sep_QMARK__,in_ends_with_sep_QMARK_);

if(cljs.core.truth_(acc_empty_QMARK_)){
cljs.core.vreset_BANG_.call(null,acc_empty_QMARK__,in_empty_QMARK_);
} else {
}

if(cljs.core.truth_(acc_ends_with_sep_QMARK_)){
if(cljs.core.truth_(in_starts_with_sep_QMARK_)){
return taoensso.encore.sb_append.call(null,acc,in$__$1.substring((1)));
} else {
return taoensso.encore.sb_append.call(null,acc,in$__$1);
}
} else {
if(cljs.core.truth_(in_starts_with_sep_QMARK_)){
return taoensso.encore.sb_append.call(null,acc,in$__$1);
} else {
if(cljs.core.truth_((function (){var or__26817__auto__ = acc_empty_QMARK_;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return in_empty_QMARK_;
}
})())){
return taoensso.encore.sb_append.call(null,acc,in$__$1);
} else {
taoensso.encore.sb_append.call(null,acc,sep);

return taoensso.encore.sb_append.call(null,acc,in$__$1);
}
}
}
});})(acc_ends_with_sep_QMARK__,acc_empty_QMARK__,sep))
,taoensso.encore.str_builder.call(null),coll))].join('');
}
});
taoensso.encore.path = (function taoensso$encore$path(var_args){
var args__27351__auto__ = [];
var len__27348__auto___13992 = arguments.length;
var i__27349__auto___13993 = (0);
while(true){
if((i__27349__auto___13993 < len__27348__auto___13992)){
args__27351__auto__.push((arguments[i__27349__auto___13993]));

var G__13994 = (i__27349__auto___13993 + (1));
i__27349__auto___13993 = G__13994;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return taoensso.encore.path.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

taoensso.encore.path.cljs$core$IFn$_invoke$arity$variadic = (function (parts){
return taoensso.encore.str_join_once.call(null,"/",parts);
});

taoensso.encore.path.cljs$lang$maxFixedArity = (0);

taoensso.encore.path.cljs$lang$applyTo = (function (seq13991){
return taoensso.encore.path.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq13991));
});

/**
 * Converts all word breaks of any form and length (including line breaks of any
 *   form, tabs, spaces, etc.) to a single regular space
 */
taoensso.encore.norm_word_breaks = (function taoensso$encore$norm_word_breaks(s){
return clojure.string.replace.call(null,[cljs.core.str(s)].join(''),/\s+/," ");
});
taoensso.encore.count_words = (function taoensso$encore$count_words(s){
if(clojure.string.blank_QMARK_.call(null,s)){
return (0);
} else {
return cljs.core.count.call(null,clojure.string.split.call(null,s,/\s+/));
}
});
/**
 * Returns a UUIDv4 string of form "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
 *   Ref. http://www.ietf.org/rfc/rfc4122.txt,
 *     https://gist.github.com/franks42/4159427
 */
taoensso.encore.uuid_str = (function taoensso$encore$uuid_str(var_args){
var args13995 = [];
var len__27348__auto___13998 = arguments.length;
var i__27349__auto___13999 = (0);
while(true){
if((i__27349__auto___13999 < len__27348__auto___13998)){
args13995.push((arguments[i__27349__auto___13999]));

var G__14000 = (i__27349__auto___13999 + (1));
i__27349__auto___13999 = G__14000;
continue;
} else {
}
break;
}

var G__13997 = args13995.length;
switch (G__13997) {
case 1:
return taoensso.encore.uuid_str.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return taoensso.encore.uuid_str.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13995.length)].join('')));

}
});

taoensso.encore.uuid_str.cljs$core$IFn$_invoke$arity$1 = (function (max_length){
return taoensso.encore._QMARK_substr_LT_len.call(null,taoensso.encore.uuid_str.call(null),(0),max_length);
});

taoensso.encore.uuid_str.cljs$core$IFn$_invoke$arity$0 = (function (){
var hex = (function (){
return cljs.core.rand_int.call(null,(16)).toString((16));
});
var rhex = ((8) | ((3) & cljs.core.rand_int.call(null,(16)))).toString((16));
return [cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str("-"),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str("-"),cljs.core.str("4"),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str("-"),cljs.core.str(rhex),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str("-"),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null)),cljs.core.str(hex.call(null))].join('');
});

taoensso.encore.uuid_str.cljs$lang$maxFixedArity = 1;

/**
 * Like `core/memoize` but avoids write races, supports invalidation
 */
taoensso.encore.memoize_ = (function taoensso$encore$memoize_(f){
var cache_ = cljs.core.volatile_BANG_.call(null,cljs.core.PersistentArrayMap.EMPTY);
return ((function (cache_){
return (function() { 
var G__14006__delegate = function (xs){
var get_sentinel = {};
var x1 = cljs.core.first.call(null,xs);
if(taoensso.encore.kw_identical_QMARK_.call(null,x1,new cljs.core.Keyword("mem","del","mem/del",574870667))){
var xn = cljs.core.next.call(null,xs);
var x2 = cljs.core.first.call(null,xn);
if(taoensso.encore.kw_identical_QMARK_.call(null,x2,new cljs.core.Keyword("mem","all","mem/all",892075139))){
cljs.core.vreset_BANG_.call(null,cache_,cljs.core.PersistentArrayMap.EMPTY);
} else {
cljs.core._vreset_BANG_.call(null,cache_,cljs.core.dissoc.call(null,cljs.core._deref.call(null,cache_),xn));
}

return null;
} else {
if(taoensso.encore.kw_identical_QMARK_.call(null,x1,new cljs.core.Keyword("mem","fresh","mem/fresh",-1179989133))){
var xn = cljs.core.next.call(null,xs);
var v = cljs.core.apply.call(null,f,xn);
cljs.core._vreset_BANG_.call(null,cache_,cljs.core.assoc.call(null,cljs.core._deref.call(null,cache_),xn,v));

return v;
} else {
var v = cljs.core.get.call(null,cljs.core.deref.call(null,cache_),xs,get_sentinel);
if((v === get_sentinel)){
var v__$1 = cljs.core.apply.call(null,f,xs);
cljs.core._vreset_BANG_.call(null,cache_,cljs.core.assoc.call(null,cljs.core._deref.call(null,cache_),xs,v__$1));

return v__$1;
} else {
return v;
}
}
}
};
var G__14006 = function (var_args){
var xs = null;
if (arguments.length > 0) {
var G__14007__i = 0, G__14007__a = new Array(arguments.length -  0);
while (G__14007__i < G__14007__a.length) {G__14007__a[G__14007__i] = arguments[G__14007__i + 0]; ++G__14007__i;}
  xs = new cljs.core.IndexedSeq(G__14007__a,0);
} 
return G__14006__delegate.call(this,xs);};
G__14006.cljs$lang$maxFixedArity = 0;
G__14006.cljs$lang$applyTo = (function (arglist__14008){
var xs = cljs.core.seq(arglist__14008);
return G__14006__delegate(xs);
});
G__14006.cljs$core$IFn$_invoke$arity$variadic = G__14006__delegate;
return G__14006;
})()
;
;})(cache_))
});
/**
 * Great for Reactjs render op caching on mobile devices, etc.
 */
taoensso.encore.memoize_last = (function taoensso$encore$memoize_last(f){
var cache_ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
return ((function (cache_){
return (function() { 
var G__14009__delegate = function (args){
return cljs.core.deref.call(null,(function (){var or__26817__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,cache_),args);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,cache_,((function (or__26817__auto__,cache_){
return (function (cache){
if(cljs.core.truth_(cljs.core.get.call(null,cache,args))){
return cache;
} else {
return cljs.core.PersistentArrayMap.fromArray([args,(new cljs.core.Delay(((function (or__26817__auto__,cache_){
return (function (){
return cljs.core.apply.call(null,f,args);
});})(or__26817__auto__,cache_))
,null))], true, false);
}
});})(or__26817__auto__,cache_))
),args);
}
})());
};
var G__14009 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14010__i = 0, G__14010__a = new Array(arguments.length -  0);
while (G__14010__i < G__14010__a.length) {G__14010__a[G__14010__i] = arguments[G__14010__i + 0]; ++G__14010__i;}
  args = new cljs.core.IndexedSeq(G__14010__a,0);
} 
return G__14009__delegate.call(this,args);};
G__14009.cljs$lang$maxFixedArity = 0;
G__14009.cljs$lang$applyTo = (function (arglist__14011){
var args = cljs.core.seq(arglist__14011);
return G__14009__delegate(args);
});
G__14009.cljs$core$IFn$_invoke$arity$variadic = G__14009__delegate;
return G__14009;
})()
;
;})(cache_))
});
taoensso.encore.gc_rate = (1.0 / (16000));
taoensso.encore.gc_now_QMARK_ = (function taoensso$encore$gc_now_QMARK_(){
return (cljs.core.rand.call(null) <= taoensso.encore.gc_rate);
});
/**
 * Like `core/memoize` but:
 *  * Often faster, depends on opts
 *  * Prevents race conditions on writes
 *  * Supports auto invalidation & gc with `ttl-ms` opt
 *  * Supports cache size limit & gc with `cache-size` opt
 *  * Supports invalidation by prepending args with `:mem/del` or `:mem/fresh`
 */
taoensso.encore.memoize_STAR_ = (function taoensso$encore$memoize_STAR_(var_args){
var args14012 = [];
var len__27348__auto___14049 = arguments.length;
var i__27349__auto___14050 = (0);
while(true){
if((i__27349__auto___14050 < len__27348__auto___14049)){
args14012.push((arguments[i__27349__auto___14050]));

var G__14051 = (i__27349__auto___14050 + (1));
i__27349__auto___14050 = G__14051;
continue;
} else {
}
break;
}

var G__14014 = args14012.length;
switch (G__14014) {
case 1:
return taoensso.encore.memoize_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore.memoize_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return taoensso.encore.memoize_STAR_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14012.length)].join('')));

}
});

taoensso.encore.memoize_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (f){
return taoensso.encore.memoize_.call(null,f);
});

taoensso.encore.memoize_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (ttl_ms,f){
var e_14053 = (function (){try{if(taoensso.encore.pos_int_QMARK_.call(null,ttl_ms)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e14015){if((e14015 instanceof Error)){
var e = e14015;
return e;
} else {
throw e14015;

}
}})();
if((e_14053 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.encore",null,"(pos-int? ttl-ms)",ttl_ms,e_14053,null);
}

var cache_ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var gc_running_QMARK__ = cljs.core.atom.call(null,false);
var ttl_ms__$1 = cljs.core.long$.call(null,ttl_ms);
var gc_fn = ((function (cache_,gc_running_QMARK__,ttl_ms__$1){
return (function (){
if(cljs.core.truth_((function (){var and__26809__auto__ = taoensso.encore.gc_now_QMARK_.call(null);
if(cljs.core.truth_(and__26809__auto__)){
return taoensso.encore.swap_in_BANG_.call(null,gc_running_QMARK__,cljs.core.PersistentVector.EMPTY,((function (and__26809__auto__,cache_,gc_running_QMARK__,ttl_ms__$1){
return (function (b){
return taoensso.encore.swapped.call(null,true,cljs.core.not.call(null,b));
});})(and__26809__auto__,cache_,gc_running_QMARK__,ttl_ms__$1))
);
} else {
return and__26809__auto__;
}
})())){
var instant = taoensso.encore.now_udt.call(null);
var snapshot = cljs.core.deref.call(null,cache_);
var ks_to_gc = cljs.core.persistent_BANG_.call(null,cljs.core.reduce_kv.call(null,((function (instant,snapshot,cache_,gc_running_QMARK__,ttl_ms__$1){
return (function (acc,k,p__14016){
var vec__14017 = p__14016;
var dv = cljs.core.nth.call(null,vec__14017,(0),null);
var udt = cljs.core.nth.call(null,vec__14017,(1),null);
var cv = vec__14017;
if(((instant - udt) > ttl_ms__$1)){
return cljs.core.conj_BANG_.call(null,acc,k);
} else {
return acc;
}
});})(instant,snapshot,cache_,gc_running_QMARK__,ttl_ms__$1))
,cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY),snapshot));
cljs.core.swap_BANG_.call(null,cache_,((function (instant,snapshot,ks_to_gc,cache_,gc_running_QMARK__,ttl_ms__$1){
return (function (m){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,((function (instant,snapshot,ks_to_gc,cache_,gc_running_QMARK__,ttl_ms__$1){
return (function (acc,in$){
return cljs.core.dissoc_BANG_.call(null,acc,in$);
});})(instant,snapshot,ks_to_gc,cache_,gc_running_QMARK__,ttl_ms__$1))
,cljs.core.transient$.call(null,m),ks_to_gc));
});})(instant,snapshot,ks_to_gc,cache_,gc_running_QMARK__,ttl_ms__$1))
);

return cljs.core.reset_BANG_.call(null,gc_running_QMARK__,false);
} else {
return null;
}
});})(cache_,gc_running_QMARK__,ttl_ms__$1))
;
return ((function (cache_,gc_running_QMARK__,ttl_ms__$1,gc_fn){
return (function() { 
var G__14054__delegate = function (args){
var a1 = cljs.core.first.call(null,args);
if(taoensso.encore.kw_identical_QMARK_.call(null,a1,new cljs.core.Keyword("mem","del","mem/del",574870667))){
var argn = cljs.core.next.call(null,args);
var a2 = cljs.core.first.call(null,argn);
if(taoensso.encore.kw_identical_QMARK_.call(null,a2,new cljs.core.Keyword("mem","all","mem/all",892075139))){
cljs.core.reset_BANG_.call(null,cache_,cljs.core.PersistentArrayMap.EMPTY);
} else {
cljs.core.swap_BANG_.call(null,cache_,cljs.core.dissoc,argn);
}

return null;
} else {
gc_fn.call(null);

var fresh_QMARK_ = taoensso.encore.kw_identical_QMARK_.call(null,a1,new cljs.core.Keyword("mem","fresh","mem/fresh",-1179989133));
var args__$1 = ((fresh_QMARK_)?cljs.core.next.call(null,args):args);
var instant = taoensso.encore.now_udt.call(null);
var vec__14020 = taoensso.encore._swap_cache_BANG_.call(null,cache_,args__$1,((function (fresh_QMARK_,args__$1,instant,a1,cache_,gc_running_QMARK__,ttl_ms__$1,gc_fn){
return (function (_QMARK_cv){
if(cljs.core.truth_((function (){var and__26809__auto__ = _QMARK_cv;
if(cljs.core.truth_(and__26809__auto__)){
var and__26809__auto____$1 = !(fresh_QMARK_);
if(and__26809__auto____$1){
var vec__14026 = _QMARK_cv;
var _dv = cljs.core.nth.call(null,vec__14026,(0),null);
var udt = cljs.core.nth.call(null,vec__14026,(1),null);
return ((instant - udt) < ttl_ms__$1);
} else {
return and__26809__auto____$1;
}
} else {
return and__26809__auto__;
}
})())){
return _QMARK_cv;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.Delay(((function (fresh_QMARK_,args__$1,instant,a1,cache_,gc_running_QMARK__,ttl_ms__$1,gc_fn){
return (function (){
return cljs.core.apply.call(null,f,args__$1);
});})(fresh_QMARK_,args__$1,instant,a1,cache_,gc_running_QMARK__,ttl_ms__$1,gc_fn))
,null)),instant], null);
}
});})(fresh_QMARK_,args__$1,instant,a1,cache_,gc_running_QMARK__,ttl_ms__$1,gc_fn))
);
var dv = cljs.core.nth.call(null,vec__14020,(0),null);
return cljs.core.deref.call(null,dv);
}
};
var G__14054 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14055__i = 0, G__14055__a = new Array(arguments.length -  0);
while (G__14055__i < G__14055__a.length) {G__14055__a[G__14055__i] = arguments[G__14055__i + 0]; ++G__14055__i;}
  args = new cljs.core.IndexedSeq(G__14055__a,0);
} 
return G__14054__delegate.call(this,args);};
G__14054.cljs$lang$maxFixedArity = 0;
G__14054.cljs$lang$applyTo = (function (arglist__14056){
var args = cljs.core.seq(arglist__14056);
return G__14054__delegate(args);
});
G__14054.cljs$core$IFn$_invoke$arity$variadic = G__14054__delegate;
return G__14054;
})()
;
;})(cache_,gc_running_QMARK__,ttl_ms__$1,gc_fn))
});

taoensso.encore.memoize_STAR_.cljs$core$IFn$_invoke$arity$3 = (function (cache_size,ttl_ms,f){
if(cljs.core.truth_((function (x){
var or__26817__auto__ = (x == null);
if(or__26817__auto__){
return or__26817__auto__;
} else {
return taoensso.truss.impl.non_throwing.call(null,taoensso.encore.pos_int_QMARK_).call(null,x);
}
}).call(null,ttl_ms))){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.encore",null,"([:or nil? pos-int?] ttl-ms)",ttl_ms,null,null);
}

var e_14057 = (function (){try{if(taoensso.encore.pos_int_QMARK_.call(null,cache_size)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e14029){if((e14029 instanceof Error)){
var e = e14029;
return e;
} else {
throw e14029;

}
}})();
if((e_14057 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.encore",null,"(pos-int? cache-size)",cache_size,e_14057,null);
}

var state_ = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tick","tick",-835886976),(0)], null));
var gc_running_QMARK__ = cljs.core.atom.call(null,false);
var ttl_ms_QMARK_ = !((ttl_ms == null));
var ttl_ms__$1 = cljs.core.long$.call(null,(function (){var or__26817__auto__ = ttl_ms;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return (0);
}
})());
var cache_size__$1 = cljs.core.long$.call(null,cache_size);
var gc_fn = ((function (state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1){
return (function (){
if(cljs.core.truth_((function (){var and__26809__auto__ = taoensso.encore.gc_now_QMARK_.call(null);
if(cljs.core.truth_(and__26809__auto__)){
return taoensso.encore.swap_in_BANG_.call(null,gc_running_QMARK__,cljs.core.PersistentVector.EMPTY,((function (and__26809__auto__,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1){
return (function (b){
return taoensso.encore.swapped.call(null,true,cljs.core.not.call(null,b));
});})(and__26809__auto__,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1))
);
} else {
return and__26809__auto__;
}
})())){
var instant = taoensso.encore.now_udt.call(null);
if(ttl_ms_QMARK_){
var snapshot_14058 = cljs.core.dissoc.call(null,cljs.core.deref.call(null,state_),new cljs.core.Keyword(null,"tick","tick",-835886976));
var ks_to_gc_14059 = cljs.core.persistent_BANG_.call(null,cljs.core.reduce_kv.call(null,((function (snapshot_14058,instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1){
return (function (acc,k,p__14030){
var vec__14031 = p__14030;
var dv = cljs.core.nth.call(null,vec__14031,(0),null);
var udt = cljs.core.nth.call(null,vec__14031,(1),null);
var _ = cljs.core.nth.call(null,vec__14031,(2),null);
var ___$1 = cljs.core.nth.call(null,vec__14031,(3),null);
var cv = vec__14031;
if(((instant - udt) > ttl_ms__$1)){
return cljs.core.conj_BANG_.call(null,acc,k);
} else {
return acc;
}
});})(snapshot_14058,instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1))
,cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY),snapshot_14058));
cljs.core.swap_BANG_.call(null,state_,((function (snapshot_14058,ks_to_gc_14059,instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1){
return (function (m){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,((function (snapshot_14058,ks_to_gc_14059,instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1){
return (function (acc,in$){
return cljs.core.dissoc_BANG_.call(null,acc,in$);
});})(snapshot_14058,ks_to_gc_14059,instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1))
,cljs.core.transient$.call(null,m),ks_to_gc_14059));
});})(snapshot_14058,ks_to_gc_14059,instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1))
);
} else {
}

var snapshot_14060 = cljs.core.dissoc.call(null,cljs.core.deref.call(null,state_),new cljs.core.Keyword(null,"tick","tick",-835886976));
var n_to_gc_14061 = (cljs.core.count.call(null,snapshot_14060) - cache_size__$1);
if((n_to_gc_14061 > (64))){
var ks_to_gc_14062 = taoensso.encore.top.call(null,n_to_gc_14061,((function (snapshot_14060,n_to_gc_14061,instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1){
return (function (k){
var vec__14034 = snapshot_14060.call(null,k);
var _ = cljs.core.nth.call(null,vec__14034,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__14034,(1),null);
var tick_lru = cljs.core.nth.call(null,vec__14034,(2),null);
var tick_lfu = cljs.core.nth.call(null,vec__14034,(3),null);
return (tick_lru + tick_lfu);
});})(snapshot_14060,n_to_gc_14061,instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1))
,cljs.core.keys.call(null,snapshot_14060));
cljs.core.swap_BANG_.call(null,state_,((function (ks_to_gc_14062,snapshot_14060,n_to_gc_14061,instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1){
return (function (m){
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce.call(null,((function (ks_to_gc_14062,snapshot_14060,n_to_gc_14061,instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1){
return (function (acc,in$){
return cljs.core.dissoc_BANG_.call(null,acc,in$);
});})(ks_to_gc_14062,snapshot_14060,n_to_gc_14061,instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1))
,cljs.core.transient$.call(null,m),ks_to_gc_14062));
});})(ks_to_gc_14062,snapshot_14060,n_to_gc_14061,instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1))
);
} else {
}

return cljs.core.reset_BANG_.call(null,gc_running_QMARK__,false);
} else {
return null;
}
});})(state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1))
;
var cv_fn = ((ttl_ms_QMARK_)?((function (state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn){
return (function (args,fresh_QMARK_,tick){
var instant = taoensso.encore.now_udt.call(null);
return taoensso.encore._swap_cache_BANG_.call(null,state_,args,((function (instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn){
return (function (_QMARK_cv){
if(cljs.core.truth_((function (){var and__26809__auto__ = _QMARK_cv;
if(cljs.core.truth_(and__26809__auto__)){
var and__26809__auto____$1 = cljs.core.not.call(null,fresh_QMARK_);
if(and__26809__auto____$1){
var vec__14040 = _QMARK_cv;
var _dv = cljs.core.nth.call(null,vec__14040,(0),null);
var udt = cljs.core.nth.call(null,vec__14040,(1),null);
return ((instant - udt) < ttl_ms__$1);
} else {
return and__26809__auto____$1;
}
} else {
return and__26809__auto__;
}
})())){
return _QMARK_cv;
} else {
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.Delay(((function (instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn){
return (function (){
return cljs.core.apply.call(null,f,args);
});})(instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn))
,null)),instant,tick,(1)], null);
}
});})(instant,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn))
);
});})(state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn))
:((function (state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn){
return (function (args,fresh_QMARK_,tick){
return taoensso.encore._swap_cache_BANG_.call(null,state_,args,((function (state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn){
return (function (_QMARK_cv){
if(cljs.core.truth_((function (){var and__26809__auto__ = _QMARK_cv;
if(cljs.core.truth_(and__26809__auto__)){
return cljs.core.not.call(null,fresh_QMARK_);
} else {
return and__26809__auto__;
}
})())){
return _QMARK_cv;
} else {
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.Delay(((function (state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn){
return (function (){
return cljs.core.apply.call(null,f,args);
});})(state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn))
,null)),null,tick,(1)], null);
}
});})(state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn))
);
});})(state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn))
);
return ((function (state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn,cv_fn){
return (function() { 
var G__14063__delegate = function (args){
var a1 = cljs.core.first.call(null,args);
if(taoensso.encore.kw_identical_QMARK_.call(null,a1,new cljs.core.Keyword("mem","del","mem/del",574870667))){
var argn = cljs.core.next.call(null,args);
var a2 = cljs.core.first.call(null,argn);
if(taoensso.encore.kw_identical_QMARK_.call(null,a2,new cljs.core.Keyword("mem","all","mem/all",892075139))){
cljs.core.reset_BANG_.call(null,state_,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tick","tick",-835886976),(0)], null));
} else {
cljs.core.swap_BANG_.call(null,state_,cljs.core.dissoc,argn);
}

return null;
} else {
gc_fn.call(null);

var fresh_QMARK_ = taoensso.encore.kw_identical_QMARK_.call(null,a1,new cljs.core.Keyword("mem","fresh","mem/fresh",-1179989133));
var args__$1 = ((fresh_QMARK_)?cljs.core.next.call(null,args):args);
var tick = new cljs.core.Keyword(null,"tick","tick",-835886976).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,state_));
var vec__14043 = cv_fn.call(null,args__$1,fresh_QMARK_,tick);
var dv = cljs.core.nth.call(null,vec__14043,(0),null);
cljs.core.swap_BANG_.call(null,state_,((function (fresh_QMARK_,args__$1,tick,vec__14043,dv,a1,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn,cv_fn){
return (function (m){
var temp__4655__auto__ = cljs.core.get.call(null,m,args__$1);
if(cljs.core.truth_(temp__4655__auto__)){
var vec__14046 = temp__4655__auto__;
var dv__$1 = cljs.core.nth.call(null,vec__14046,(0),null);
var _QMARK_udt = cljs.core.nth.call(null,vec__14046,(1),null);
var tick_lru = cljs.core.nth.call(null,vec__14046,(2),null);
var tick_lfu = cljs.core.nth.call(null,vec__14046,(3),null);
var cv = vec__14046;
return cljs.core.assoc.call(null,m,new cljs.core.Keyword(null,"tick","tick",-835886976),(tick + (1)),args__$1,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [dv__$1,_QMARK_udt,tick,(tick_lfu + (1))], null));
} else {
return cljs.core.assoc.call(null,m,new cljs.core.Keyword(null,"tick","tick",-835886976),(tick + (1)));
}
});})(fresh_QMARK_,args__$1,tick,vec__14043,dv,a1,state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn,cv_fn))
);

return cljs.core.deref.call(null,dv);
}
};
var G__14063 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14064__i = 0, G__14064__a = new Array(arguments.length -  0);
while (G__14064__i < G__14064__a.length) {G__14064__a[G__14064__i] = arguments[G__14064__i + 0]; ++G__14064__i;}
  args = new cljs.core.IndexedSeq(G__14064__a,0);
} 
return G__14063__delegate.call(this,args);};
G__14063.cljs$lang$maxFixedArity = 0;
G__14063.cljs$lang$applyTo = (function (arglist__14065){
var args = cljs.core.seq(arglist__14065);
return G__14063__delegate(args);
});
G__14063.cljs$core$IFn$_invoke$arity$variadic = G__14063__delegate;
return G__14063;
})()
;
;})(state_,gc_running_QMARK__,ttl_ms_QMARK_,ttl_ms__$1,cache_size__$1,gc_fn,cv_fn))
});

taoensso.encore.memoize_STAR_.cljs$lang$maxFixedArity = 3;

/**
 * Takes one or more rate specs of form [ncalls-limit window-ms ?spec-id] and
 *   returns a (fn [& [req-id])) that returns `nil` (=> all rate limits passed), or
 *   [<ms-wait> <worst-offending-spec-id>] / <ms-wait>.
 */
taoensso.encore.rate_limiter_STAR_ = (function taoensso$encore$rate_limiter_STAR_(specs){
if(cljs.core.empty_QMARK_.call(null,specs)){
return cljs.core.constantly.call(null,null);
} else {
var vspecs = cljs.core.vec.call(null,specs);
var vstates_ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var max_win_ms = cljs.core.long$.call(null,cljs.core.reduce.call(null,cljs.core.max,(0),cljs.core.mapv.call(null,((function (vspecs,vstates_){
return (function (p__14153){
var vec__14154 = p__14153;
var _ = cljs.core.nth.call(null,vec__14154,(0),null);
var win_ms = cljs.core.nth.call(null,vec__14154,(1),null);
var ___$1 = cljs.core.nth.call(null,vec__14154,(2),null);
var spec = vec__14154;
return win_ms;
});})(vspecs,vstates_))
,vspecs)));
var nspecs = cljs.core.count.call(null,vspecs);
var nid_specs = cljs.core.count.call(null,cljs.core.filterv.call(null,((function (vspecs,vstates_,max_win_ms,nspecs){
return (function (p__14157){
var vec__14158 = p__14157;
var _ = cljs.core.nth.call(null,vec__14158,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__14158,(1),null);
var id = cljs.core.nth.call(null,vec__14158,(2),null);
return id;
});})(vspecs,vstates_,max_win_ms,nspecs))
,vspecs));
var _ = ((((nid_specs === (0))) || (cljs.core._EQ_.call(null,nid_specs,nspecs)))?null:(function(){throw (new Error("Assert failed: (or (zero? nid-specs) (= nid-specs nspecs))"))})());
var return_ids_QMARK_ = !((nid_specs === (0)));
return ((function (vspecs,vstates_,max_win_ms,nspecs,nid_specs,_,return_ids_QMARK_){
return (function() { 
var taoensso$encore$rate_limiter_STAR__$_check_rate_limits__delegate = function (p__14161){
var vec__14201 = p__14161;
var _QMARK_a1 = cljs.core.nth.call(null,vec__14201,(0),null);
var _QMARK_a2 = cljs.core.nth.call(null,vec__14201,(1),null);
if(taoensso.encore.kw_identical_QMARK_.call(null,_QMARK_a1,new cljs.core.Keyword("rl","debug","rl/debug",-1608167914))){
return vstates_;
} else {
if(taoensso.encore.kw_identical_QMARK_.call(null,_QMARK_a1,new cljs.core.Keyword("rl","reset","rl/reset",-800926172))){
if(taoensso.encore.kw_identical_QMARK_.call(null,_QMARK_a2,new cljs.core.Keyword("rl","all","rl/all",892118056))){
cljs.core.reset_BANG_.call(null,vstates_,cljs.core.PersistentArrayMap.EMPTY);
} else {
cljs.core.swap_BANG_.call(null,vstates_,cljs.core.dissoc,_QMARK_a2);
}

return null;
} else {
var peek_QMARK_ = taoensso.encore.kw_identical_QMARK_.call(null,_QMARK_a1,new cljs.core.Keyword("rl","peek","rl/peek",-291391771));
var req_id = ((peek_QMARK_)?_QMARK_a2:_QMARK_a1);
var instant = taoensso.encore.now_udt.call(null);
if(cljs.core.truth_((function (){var and__26809__auto__ = req_id;
if(cljs.core.truth_(and__26809__auto__)){
return taoensso.encore.gc_now_QMARK_.call(null);
} else {
return and__26809__auto__;
}
})())){
taoensso.encore.swap_in_BANG_.call(null,vstates_,cljs.core.PersistentVector.EMPTY,((function (peek_QMARK_,req_id,instant,vec__14201,_QMARK_a1,_QMARK_a2,vspecs,vstates_,max_win_ms,nspecs,nid_specs,_,return_ids_QMARK_){
return (function taoensso$encore$rate_limiter_STAR__$_check_rate_limits_$_gc(m){
return cljs.core.reduce_kv.call(null,((function (peek_QMARK_,req_id,instant,vec__14201,_QMARK_a1,_QMARK_a2,vspecs,vstates_,max_win_ms,nspecs,nid_specs,_,return_ids_QMARK_){
return (function (m_STAR_,req_id__$1,vstate){
var max_udt_win_start = cljs.core.reduce.call(null,((function (peek_QMARK_,req_id,instant,vec__14201,_QMARK_a1,_QMARK_a2,vspecs,vstates_,max_win_ms,nspecs,nid_specs,_,return_ids_QMARK_){
return (function (acc,p__14208){
var vec__14209 = p__14208;
var ___$1 = cljs.core.nth.call(null,vec__14209,(0),null);
var udt = cljs.core.nth.call(null,vec__14209,(1),null);
var ___$2 = cljs.core.nth.call(null,vec__14209,(2),null);
var x__26892__auto__ = acc;
var y__26893__auto__ = udt;
return ((x__26892__auto__ > y__26893__auto__) ? x__26892__auto__ : y__26893__auto__);
});})(peek_QMARK_,req_id,instant,vec__14201,_QMARK_a1,_QMARK_a2,vspecs,vstates_,max_win_ms,nspecs,nid_specs,_,return_ids_QMARK_))
,(0),vstate);
var min_win_ms_elapsed = (instant - max_udt_win_start);
if((min_win_ms_elapsed > max_win_ms)){
return cljs.core.dissoc.call(null,m_STAR_,req_id__$1);
} else {
return m_STAR_;
}
});})(peek_QMARK_,req_id,instant,vec__14201,_QMARK_a1,_QMARK_a2,vspecs,vstates_,max_win_ms,nspecs,nid_specs,_,return_ids_QMARK_))
,m,m);
});})(peek_QMARK_,req_id,instant,vec__14201,_QMARK_a1,_QMARK_a2,vspecs,vstates_,max_win_ms,nspecs,nid_specs,_,return_ids_QMARK_))
);
} else {
}

return taoensso.encore.swap_in_BANG_.call(null,vstates_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [req_id], null),((function (peek_QMARK_,req_id,instant,vec__14201,_QMARK_a1,_QMARK_a2,vspecs,vstates_,max_win_ms,nspecs,nid_specs,_,return_ids_QMARK_){
return (function (_QMARK_vstate){
if(cljs.core.truth_(_QMARK_vstate)){
var vec__14212 = (function (){var in_vspecs = vspecs;
var in_vstate = _QMARK_vstate;
var out_vstate = cljs.core.PersistentVector.EMPTY;
var _QMARK_worst_limit_offence = null;
while(true){
var vec__14215 = in_vspecs;
var seq__14216 = cljs.core.seq.call(null,vec__14215);
var first__14217 = cljs.core.first.call(null,seq__14216);
var seq__14216__$1 = cljs.core.next.call(null,seq__14216);
var vec__14218 = first__14217;
var ncalls_limit = cljs.core.nth.call(null,vec__14218,(0),null);
var win_ms = cljs.core.nth.call(null,vec__14218,(1),null);
var _QMARK_spec_id = cljs.core.nth.call(null,vec__14218,(2),null);
var next_in_vspecs = seq__14216__$1;
var vec__14221 = in_vstate;
var seq__14222 = cljs.core.seq.call(null,vec__14221);
var first__14223 = cljs.core.first.call(null,seq__14222);
var seq__14222__$1 = cljs.core.next.call(null,seq__14222);
var vec__14224 = first__14223;
var ncalls = cljs.core.nth.call(null,vec__14224,(0),null);
var udt_win_start = cljs.core.nth.call(null,vec__14224,(1),null);
var next_in_vstate = seq__14222__$1;
var win_ms_elapsed = (instant - udt_win_start);
var reset_due_QMARK_ = (win_ms_elapsed >= win_ms);
var rate_limited_QMARK_ = (!(reset_due_QMARK_)) && ((ncalls >= ncalls_limit));
var new_out_vstate = cljs.core.conj.call(null,out_vstate,((reset_due_QMARK_)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),instant], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ncalls,udt_win_start], null)));
var new__QMARK_worst_limit_offence = ((rate_limited_QMARK_)?(function (){var ms_wait = (win_ms - win_ms_elapsed);
if((function (){var or__26817__auto__ = (_QMARK_worst_limit_offence == null);
if(or__26817__auto__){
return or__26817__auto__;
} else {
var vec__14230 = _QMARK_worst_limit_offence;
var max_ms_wait = cljs.core.nth.call(null,vec__14230,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__14230,(1),null);
return (ms_wait > max_ms_wait);
}
})()){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ms_wait,_QMARK_spec_id], null);
} else {
return _QMARK_worst_limit_offence;
}
})():_QMARK_worst_limit_offence);
if(next_in_vspecs){
var G__14240 = next_in_vspecs;
var G__14241 = next_in_vstate;
var G__14242 = new_out_vstate;
var G__14243 = new__QMARK_worst_limit_offence;
in_vspecs = G__14240;
in_vstate = G__14241;
out_vstate = G__14242;
_QMARK_worst_limit_offence = G__14243;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new_out_vstate,new__QMARK_worst_limit_offence], null);
}
break;
}
})();
var vstate_with_resets = cljs.core.nth.call(null,vec__14212,(0),null);
var _QMARK_worst_limit_offence = cljs.core.nth.call(null,vec__14212,(1),null);
var all_limits_pass_QMARK_ = (_QMARK_worst_limit_offence == null);
var new_vstate = ((peek_QMARK_)?_QMARK_vstate:((all_limits_pass_QMARK_)?cljs.core.mapv.call(null,((function (vec__14212,vstate_with_resets,_QMARK_worst_limit_offence,all_limits_pass_QMARK_,peek_QMARK_,req_id,instant,vec__14201,_QMARK_a1,_QMARK_a2,vspecs,vstates_,max_win_ms,nspecs,nid_specs,_,return_ids_QMARK_){
return (function (p__14233){
var vec__14234 = p__14233;
var ncalls = cljs.core.nth.call(null,vec__14234,(0),null);
var udt_win_start = cljs.core.nth.call(null,vec__14234,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(ncalls + (1)),udt_win_start], null);
});})(vec__14212,vstate_with_resets,_QMARK_worst_limit_offence,all_limits_pass_QMARK_,peek_QMARK_,req_id,instant,vec__14201,_QMARK_a1,_QMARK_a2,vspecs,vstates_,max_win_ms,nspecs,nid_specs,_,return_ids_QMARK_))
,vstate_with_resets):vstate_with_resets));
var result = (function (){var temp__4657__auto__ = _QMARK_worst_limit_offence;
if(cljs.core.truth_(temp__4657__auto__)){
var wlo = temp__4657__auto__;
if(return_ids_QMARK_){
return wlo;
} else {
var vec__14237 = wlo;
var ms_wait = cljs.core.nth.call(null,vec__14237,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__14237,(1),null);
return ms_wait;
}
} else {
return null;
}
})();
return taoensso.encore.swapped.call(null,new_vstate,result);
} else {
if(peek_QMARK_){
return taoensso.encore.swapped.call(null,_QMARK_vstate,null);
} else {
return taoensso.encore.swapped.call(null,cljs.core.vec.call(null,cljs.core.repeat.call(null,nspecs,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),instant], null))),null);
}
}
});})(peek_QMARK_,req_id,instant,vec__14201,_QMARK_a1,_QMARK_a2,vspecs,vstates_,max_win_ms,nspecs,nid_specs,_,return_ids_QMARK_))
);
}
}
};
var taoensso$encore$rate_limiter_STAR__$_check_rate_limits = function (var_args){
var p__14161 = null;
if (arguments.length > 0) {
var G__14244__i = 0, G__14244__a = new Array(arguments.length -  0);
while (G__14244__i < G__14244__a.length) {G__14244__a[G__14244__i] = arguments[G__14244__i + 0]; ++G__14244__i;}
  p__14161 = new cljs.core.IndexedSeq(G__14244__a,0);
} 
return taoensso$encore$rate_limiter_STAR__$_check_rate_limits__delegate.call(this,p__14161);};
taoensso$encore$rate_limiter_STAR__$_check_rate_limits.cljs$lang$maxFixedArity = 0;
taoensso$encore$rate_limiter_STAR__$_check_rate_limits.cljs$lang$applyTo = (function (arglist__14245){
var p__14161 = cljs.core.seq(arglist__14245);
return taoensso$encore$rate_limiter_STAR__$_check_rate_limits__delegate(p__14161);
});
taoensso$encore$rate_limiter_STAR__$_check_rate_limits.cljs$core$IFn$_invoke$arity$variadic = taoensso$encore$rate_limiter_STAR__$_check_rate_limits__delegate;
return taoensso$encore$rate_limiter_STAR__$_check_rate_limits;
})()
;
;})(vspecs,vstates_,max_win_ms,nspecs,nid_specs,_,return_ids_QMARK_))
}
});
taoensso.encore.rate_limit = (function taoensso$encore$rate_limit(specs,f){
var rl = taoensso.encore.rate_limiter_STAR_.call(null,specs);
return ((function (rl){
return (function() { 
var G__14246__delegate = function (args){
var temp__4655__auto__ = rl.call(null);
if(cljs.core.truth_(temp__4655__auto__)){
var backoff = temp__4655__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,backoff], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f.call(null),null], null);
}
};
var G__14246 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14247__i = 0, G__14247__a = new Array(arguments.length -  0);
while (G__14247__i < G__14247__a.length) {G__14247__a[G__14247__i] = arguments[G__14247__i + 0]; ++G__14247__i;}
  args = new cljs.core.IndexedSeq(G__14247__a,0);
} 
return G__14246__delegate.call(this,args);};
G__14246.cljs$lang$maxFixedArity = 0;
G__14246.cljs$lang$applyTo = (function (arglist__14248){
var args = cljs.core.seq(arglist__14248);
return G__14246__delegate(args);
});
G__14246.cljs$core$IFn$_invoke$arity$variadic = G__14246__delegate;
return G__14246;
})()
;
;})(rl))
});
taoensso.encore.nano_time = (function (){var temp__4655__auto__ = taoensso.encore.oget.call(null,taoensso.encore.js__QMARK_win,"performance");
if(cljs.core.truth_(temp__4655__auto__)){
var perf = temp__4655__auto__;
var temp__4655__auto____$1 = (function (){var or__26817__auto__ = taoensso.encore.oget.call(null,perf,"now");
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
var or__26817__auto____$1 = taoensso.encore.oget.call(null,perf,"mozNow");
if(cljs.core.truth_(or__26817__auto____$1)){
return or__26817__auto____$1;
} else {
var or__26817__auto____$2 = taoensso.encore.oget.call(null,perf,"msNow");
if(cljs.core.truth_(or__26817__auto____$2)){
return or__26817__auto____$2;
} else {
var or__26817__auto____$3 = taoensso.encore.oget.call(null,perf,"oNow");
if(cljs.core.truth_(or__26817__auto____$3)){
return or__26817__auto____$3;
} else {
return taoensso.encore.oget.call(null,perf,"webkitNow");
}
}
}
}
})();
if(cljs.core.truth_(temp__4655__auto____$1)){
var f = temp__4655__auto____$1;
return ((function (f,temp__4655__auto____$1,perf,temp__4655__auto__){
return (function (){
return cljs.core.long$.call(null,(1000000.0 * f.call(perf)));
});
;})(f,temp__4655__auto____$1,perf,temp__4655__auto__))
} else {
return ((function (temp__4655__auto____$1,perf,temp__4655__auto__){
return (function (){
return (1000000.0 * taoensso.encore.now_udt.call(null));
});
;})(temp__4655__auto____$1,perf,temp__4655__auto__))
}
} else {
return ((function (temp__4655__auto__){
return (function (){
return (1000000.0 * taoensso.encore.now_udt.call(null));
});
;})(temp__4655__auto__))
}
})();

taoensso.encore.console_log = (function (){var temp__4655__auto__ = (function (){var and__26809__auto__ = typeof console !== 'undefined';
if(and__26809__auto__){
return console.log;
} else {
return and__26809__auto__;
}
})();
if(cljs.core.truth_(temp__4655__auto__)){
var f = temp__4655__auto__;
return ((function (f,temp__4655__auto__){
return (function (xs){
return f.apply(console,cljs.core.into_array.call(null,xs));
});
;})(f,temp__4655__auto__))
} else {
return ((function (temp__4655__auto__){
return (function (xs){
return null;
});
;})(temp__4655__auto__))
}
})();

taoensso.encore.log = (function taoensso$encore$log(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14256 = arguments.length;
var i__27349__auto___14257 = (0);
while(true){
if((i__27349__auto___14257 < len__27348__auto___14256)){
args__27351__auto__.push((arguments[i__27349__auto___14257]));

var G__14258 = (i__27349__auto___14257 + (1));
i__27349__auto___14257 = G__14258;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return taoensso.encore.log.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

taoensso.encore.log.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
return taoensso.encore.console_log.call(null,xs);
});

taoensso.encore.log.cljs$lang$maxFixedArity = (0);

taoensso.encore.log.cljs$lang$applyTo = (function (seq14249){
return taoensso.encore.log.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq14249));
});


taoensso.encore.logp = (function taoensso$encore$logp(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14259 = arguments.length;
var i__27349__auto___14260 = (0);
while(true){
if((i__27349__auto___14260 < len__27348__auto___14259)){
args__27351__auto__.push((arguments[i__27349__auto___14260]));

var G__14261 = (i__27349__auto___14260 + (1));
i__27349__auto___14260 = G__14261;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return taoensso.encore.logp.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

taoensso.encore.logp.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
return taoensso.encore.console_log.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [taoensso.encore.spaced_str_with_nils.call(null,xs)], null));
});

taoensso.encore.logp.cljs$lang$maxFixedArity = (0);

taoensso.encore.logp.cljs$lang$applyTo = (function (seq14250){
return taoensso.encore.logp.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq14250));
});


taoensso.encore.logf = (function taoensso$encore$logf(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14262 = arguments.length;
var i__27349__auto___14263 = (0);
while(true){
if((i__27349__auto___14263 < len__27348__auto___14262)){
args__27351__auto__.push((arguments[i__27349__auto___14263]));

var G__14264 = (i__27349__auto___14263 + (1));
i__27349__auto___14263 = G__14264;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.logf.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.logf.cljs$core$IFn$_invoke$arity$variadic = (function (fmt,xs){
return taoensso.encore.console_log.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [taoensso.encore.format_STAR_.call(null,fmt,xs)], null));
});

taoensso.encore.logf.cljs$lang$maxFixedArity = (1);

taoensso.encore.logf.cljs$lang$applyTo = (function (seq14251){
var G__14252 = cljs.core.first.call(null,seq14251);
var seq14251__$1 = cljs.core.next.call(null,seq14251);
return taoensso.encore.logf.cljs$core$IFn$_invoke$arity$variadic(G__14252,seq14251__$1);
});


taoensso.encore.sayp = (function taoensso$encore$sayp(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14265 = arguments.length;
var i__27349__auto___14266 = (0);
while(true){
if((i__27349__auto___14266 < len__27348__auto___14265)){
args__27351__auto__.push((arguments[i__27349__auto___14266]));

var G__14267 = (i__27349__auto___14266 + (1));
i__27349__auto___14266 = G__14267;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return taoensso.encore.sayp.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

taoensso.encore.sayp.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
return alert(taoensso.encore.spaced_str_with_nils.call(null,xs));
});

taoensso.encore.sayp.cljs$lang$maxFixedArity = (0);

taoensso.encore.sayp.cljs$lang$applyTo = (function (seq14253){
return taoensso.encore.sayp.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq14253));
});


taoensso.encore.sayf = (function taoensso$encore$sayf(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14268 = arguments.length;
var i__27349__auto___14269 = (0);
while(true){
if((i__27349__auto___14269 < len__27348__auto___14268)){
args__27351__auto__.push((arguments[i__27349__auto___14269]));

var G__14270 = (i__27349__auto___14269 + (1));
i__27349__auto___14269 = G__14270;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.sayf.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.sayf.cljs$core$IFn$_invoke$arity$variadic = (function (fmt,xs){
return alert(taoensso.encore.format_STAR_.call(null,fmt,xs));
});

taoensso.encore.sayf.cljs$lang$maxFixedArity = (1);

taoensso.encore.sayf.cljs$lang$applyTo = (function (seq14254){
var G__14255 = cljs.core.first.call(null,seq14254);
var seq14254__$1 = cljs.core.next.call(null,seq14254);
return taoensso.encore.sayf.cljs$core$IFn$_invoke$arity$variadic(G__14255,seq14254__$1);
});

/**
 * Returns `js/window`'s current location as a map
 */
taoensso.encore.get_win_loc = (function taoensso$encore$get_win_loc(){
var temp__4657__auto__ = taoensso.encore.js__QMARK_win;
if(cljs.core.truth_(temp__4657__auto__)){
var js_win = temp__4657__auto__;
var temp__4657__auto____$1 = js_win.location;
if(cljs.core.truth_(temp__4657__auto____$1)){
var loc = temp__4657__auto____$1;
return new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"href","href",-793805698),loc.href,new cljs.core.Keyword(null,"protocol","protocol",652470118),loc.protocol,new cljs.core.Keyword(null,"hostname","hostname",2105669933),loc.hostname,new cljs.core.Keyword(null,"host","host",-1558485167),loc.host,new cljs.core.Keyword(null,"pathname","pathname",-1420497528),loc.pathname,new cljs.core.Keyword(null,"search","search",1564939822),loc.search,new cljs.core.Keyword(null,"hash","hash",-13781596),loc.hash], null);
} else {
return null;
}
} else {
return null;
}
});
taoensso.encore.xhr_pool_ = (new cljs.core.Delay((function (){
return (new goog.net.XhrIoPool());
}),null));
/**
 * Returns an immediately available XhrIo instance, or nil. The instance must be
 *   released back to pool manually.
 */
taoensso.encore.get_pooled_xhr_BANG_ = (function taoensso$encore$get_pooled_xhr_BANG_(){
var result = cljs.core.deref.call(null,taoensso.encore.xhr_pool_).getObject();
if((void 0 === result)){
return null;
} else {
return result;
}
});
/**
 * [uri method get-or-post-params] -> [uri post-content]
 */
taoensso.encore.coerce_xhr_params = (function taoensso$encore$coerce_xhr_params(uri,method,params){
if(cljs.core.truth_((cljs.core.truth_((function (x){
var or__26817__auto__ = (x == null);
if(or__26817__auto__){
return or__26817__auto__;
} else {
return taoensso.truss.impl.non_throwing.call(null,cljs.core.map_QMARK_).call(null,x);
}
}).call(null,params))?true:taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.encore",null,"([:or nil? map?] params)",params,null,null)))){
} else {
throw (new Error("Assert failed: (have? [:or nil? map?] params)"));
}

var _QMARK_pstr = ((cljs.core.seq.call(null,params))?(function (){var s = goog.Uri.QueryData.createFromMap((new goog.structs.Map(cljs.core.clj__GT_js.call(null,params)))).toString();
if(clojure.string.blank_QMARK_.call(null,s)){
return null;
} else {
return s;
}
})():null);
var G__14272 = (((method instanceof cljs.core.Keyword))?method.fqn:null);
switch (G__14272) {
case "get":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(_QMARK_pstr)?[cljs.core.str(uri),cljs.core.str("?"),cljs.core.str(_QMARK_pstr)].join(''):uri),null], null);

break;
case "post":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [uri,_QMARK_pstr], null);

break;
case "put":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [uri,_QMARK_pstr], null);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(method)].join('')));

}
});
/**
 * Alpha - subject to change.
 *   Simple+lightweight Ajax via Google Closure. Returns nil, or the xhr instance.
 *   Ref. https://developers.google.com/closure/library/docs/xhrio.
 * 
 *   (ajax-lite "/my-post-route"
 *  {:method     :post
 *   :params     {:username "Rich Hickey"
 *                :type     "Awesome"}
 *   :headers    {"Foo" "Bar"}
 *   :resp-type  :text
 *   :timeout-ms 7000
 *   :with-credentials? false ; Enable if using CORS (requires xhr v2+)
 *  }
 *  (fn async-callback [resp-map]
 *    (let [{:keys [success? ?status ?error ?content ?content-type]} resp-map]
 *      ;; ?status  - 200, 404, ..., or nil on no response
 *      ;; ?error   - e/o #{:xhr-pool-depleted :exception :http-error :abort
 *      ;;                  :timeout :no-content <http-error-status> nil}
 *      (js/alert (str "Ajax response: " resp-map)))))
 */
taoensso.encore.ajax_lite = (function taoensso$encore$ajax_lite(uri,p__14276,callback){
var map__14296 = p__14276;
var map__14296__$1 = ((((!((map__14296 == null)))?((((map__14296.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14296.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14296):map__14296);
var opts = map__14296__$1;
var method = cljs.core.get.call(null,map__14296__$1,new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755));
var params = cljs.core.get.call(null,map__14296__$1,new cljs.core.Keyword(null,"params","params",710516235));
var headers = cljs.core.get.call(null,map__14296__$1,new cljs.core.Keyword(null,"headers","headers",-835030129));
var timeout_ms = cljs.core.get.call(null,map__14296__$1,new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406),(10000));
var resp_type = cljs.core.get.call(null,map__14296__$1,new cljs.core.Keyword(null,"resp-type","resp-type",1050675962),new cljs.core.Keyword(null,"auto","auto",-566279492));
var with_credentials_QMARK_ = cljs.core.get.call(null,map__14296__$1,new cljs.core.Keyword(null,"with-credentials?","with-credentials?",-1773202222));
var progress_fn = cljs.core.get.call(null,map__14296__$1,new cljs.core.Keyword(null,"progress-fn","progress-fn",-1146547855));
var errorf = cljs.core.get.call(null,map__14296__$1,new cljs.core.Keyword(null,"errorf","errorf",-620376044),taoensso.encore.logf);
if(cljs.core.truth_((cljs.core.truth_(((function (map__14296,map__14296__$1,opts,method,params,headers,timeout_ms,resp_type,with_credentials_QMARK_,progress_fn,errorf){
return (function (x){
var or__26817__auto__ = (x == null);
if(or__26817__auto__){
return or__26817__auto__;
} else {
return taoensso.truss.impl.non_throwing.call(null,taoensso.encore.nat_int_QMARK_).call(null,x);
}
});})(map__14296,map__14296__$1,opts,method,params,headers,timeout_ms,resp_type,with_credentials_QMARK_,progress_fn,errorf))
.call(null,timeout_ms))?true:taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.encore",null,"([:or nil? nat-int?] timeout-ms)",timeout_ms,null,null)))){
} else {
throw (new Error("Assert failed: (have? [:or nil? nat-int?] timeout-ms)"));
}

var temp__4655__auto__ = taoensso.encore.get_pooled_xhr_BANG_.call(null);
if(cljs.core.truth_(temp__4655__auto__)){
var xhr = temp__4655__auto__;
try{var timeout_ms__$1 = (function (){var or__26817__auto__ = new cljs.core.Keyword(null,"timeout","timeout",-318625318).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return timeout_ms;
}
})();
var method_STAR_ = (function (){var G__14302 = (((method instanceof cljs.core.Keyword))?method.fqn:null);
switch (G__14302) {
case "get":
return "GET";

break;
case "post":
return "POST";

break;
case "put":
return "PUT";

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(method)].join('')));

}
})();
var params__$1 = taoensso.encore.map_keys.call(null,cljs.core.name,params);
var headers__$1 = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 1, ["X-Requested-With","XMLHTTPRequest"], null),taoensso.encore.map_keys.call(null,cljs.core.name,headers));
var vec__14299 = taoensso.encore.coerce_xhr_params.call(null,uri,method,params__$1);
var uri_STAR_ = cljs.core.nth.call(null,vec__14299,(0),null);
var post_content_STAR_ = cljs.core.nth.call(null,vec__14299,(1),null);
var headers_STAR_ = cljs.core.clj__GT_js.call(null,(cljs.core.truth_(post_content_STAR_)?cljs.core.assoc.call(null,headers__$1,"Content-Type","application/x-www-form-urlencoded; charset=UTF-8"):headers__$1));
var G__14303_14316 = xhr;
goog.events.listenOnce(G__14303_14316,goog.net.EventType.READY,((function (G__14303_14316,timeout_ms__$1,method_STAR_,params__$1,headers__$1,vec__14299,uri_STAR_,post_content_STAR_,headers_STAR_,xhr,temp__4655__auto__,map__14296,map__14296__$1,opts,method,params,headers,timeout_ms,resp_type,with_credentials_QMARK_,progress_fn,errorf){
return (function (_){
return cljs.core.deref.call(null,taoensso.encore.xhr_pool_).releaseObject(xhr);
});})(G__14303_14316,timeout_ms__$1,method_STAR_,params__$1,headers__$1,vec__14299,uri_STAR_,post_content_STAR_,headers_STAR_,xhr,temp__4655__auto__,map__14296,map__14296__$1,opts,method,params,headers,timeout_ms,resp_type,with_credentials_QMARK_,progress_fn,errorf))
);

goog.events.listenOnce(G__14303_14316,goog.net.EventType.COMPLETE,((function (G__14303_14316,timeout_ms__$1,method_STAR_,params__$1,headers__$1,vec__14299,uri_STAR_,post_content_STAR_,headers_STAR_,xhr,temp__4655__auto__,map__14296,map__14296__$1,opts,method,params,headers,timeout_ms,resp_type,with_credentials_QMARK_,progress_fn,errorf){
return (function taoensso$encore$ajax_lite_$_wrapped_callback(resp){
var status = xhr.getStatus();
var success_QMARK_ = xhr.isSuccess();
var _QMARK_http_status = ((cljs.core.not_EQ_.call(null,status,(-1)))?status:null);
var _QMARK_content_type = (cljs.core.truth_(_QMARK_http_status)?xhr.getResponseHeader("Content-Type"):null);
var _QMARK_content = (cljs.core.truth_(_QMARK_http_status)?(function (){var resp_type__$1 = ((cljs.core._EQ_.call(null,resp_type,new cljs.core.Keyword(null,"auto","auto",-566279492)))?(function (){var pred__14309 = ((function (status,success_QMARK_,_QMARK_http_status,_QMARK_content_type,G__14303_14316,timeout_ms__$1,method_STAR_,params__$1,headers__$1,vec__14299,uri_STAR_,post_content_STAR_,headers_STAR_,xhr,temp__4655__auto__,map__14296,map__14296__$1,opts,method,params,headers,timeout_ms,resp_type,with_credentials_QMARK_,progress_fn,errorf){
return (function (p1__14275_SHARP_,p2__14274_SHARP_){
return taoensso.encore.str_contains_QMARK_.call(null,p2__14274_SHARP_,p1__14275_SHARP_);
});})(status,success_QMARK_,_QMARK_http_status,_QMARK_content_type,G__14303_14316,timeout_ms__$1,method_STAR_,params__$1,headers__$1,vec__14299,uri_STAR_,post_content_STAR_,headers_STAR_,xhr,temp__4655__auto__,map__14296,map__14296__$1,opts,method,params,headers,timeout_ms,resp_type,with_credentials_QMARK_,progress_fn,errorf))
;
var expr__14310 = [cljs.core.str(_QMARK_content_type)].join('');
if(cljs.core.truth_(pred__14309.call(null,"/edn",expr__14310))){
return new cljs.core.Keyword(null,"edn","edn",1317840885);
} else {
if(cljs.core.truth_(pred__14309.call(null,"/json",expr__14310))){
return new cljs.core.Keyword(null,"json","json",1279968570);
} else {
if(cljs.core.truth_(pred__14309.call(null,"/xml",expr__14310))){
return new cljs.core.Keyword(null,"xml","xml",-1170142052);
} else {
if(cljs.core.truth_(pred__14309.call(null,"/html",expr__14310))){
return new cljs.core.Keyword(null,"text","text",-1790561697);
} else {
return new cljs.core.Keyword(null,"text","text",-1790561697);
}
}
}
}
})():resp_type);
try{var G__14313 = (((resp_type__$1 instanceof cljs.core.Keyword))?resp_type__$1.fqn:null);
switch (G__14313) {
case "text":
return xhr.getResponseText();

break;
case "json":
return xhr.getResponseJson();

break;
case "xml":
return xhr.getResponseXml();

break;
case "edn":
return taoensso.encore.read_edn.call(null,xhr.getResponseText());

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(resp_type__$1)].join('')));

}
}catch (e14312){if((e14312 instanceof Error)){
var e = e14312;
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("ajax","bad-response-type","ajax/bad-response-type",789441015),resp_type__$1,new cljs.core.Keyword("ajax","resp-as-text","ajax/resp-as-text",141416819),xhr.getResponseText()], null);
} else {
throw e14312;

}
}})():null);
var cb_arg = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"raw-resp","raw-resp",-1924342506),resp,new cljs.core.Keyword(null,"xhr","xhr",-177710851),xhr,new cljs.core.Keyword(null,"success?","success?",-122854052),success_QMARK_,new cljs.core.Keyword(null,"?content-type","?content-type",-2129759049),(cljs.core.truth_(_QMARK_http_status)?_QMARK_content_type:null),new cljs.core.Keyword(null,"?content","?content",1697782054),_QMARK_content,new cljs.core.Keyword(null,"?status","?status",938730360),_QMARK_http_status,new cljs.core.Keyword(null,"?error","?error",1070752222),(function (){var or__26817__auto__ = (cljs.core.truth_(_QMARK_http_status)?(function (){var n = _QMARK_http_status;
if(cljs.core.truth_(success_QMARK_)){
return null;
} else {
return _QMARK_http_status;
}
})():cljs.core.get.call(null,cljs.core.PersistentArrayMap.fromArray([goog.net.ErrorCode.EXCEPTION,new cljs.core.Keyword(null,"exception","exception",-335277064),goog.net.ErrorCode.HTTP_ERROR,new cljs.core.Keyword(null,"http-error","http-error",-1040049553),goog.net.ErrorCode.ABORT,new cljs.core.Keyword(null,"abort","abort",521193198),goog.net.ErrorCode.TIMEOUT,new cljs.core.Keyword(null,"timeout","timeout",-318625318)], true, false),xhr.getLastErrorCode(),new cljs.core.Keyword(null,"unknown","unknown",-935977881)));
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
if(((_QMARK_content == null)) && (cljs.core.not.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [(204),null,(1223),null], null), null).call(null,_QMARK_http_status)))){
return new cljs.core.Keyword(null,"no-content","no-content",-1860206018);
} else {
return null;
}
}
})()], null);
return callback.call(null,cb_arg);
});})(G__14303_14316,timeout_ms__$1,method_STAR_,params__$1,headers__$1,vec__14299,uri_STAR_,post_content_STAR_,headers_STAR_,xhr,temp__4655__auto__,map__14296,map__14296__$1,opts,method,params,headers,timeout_ms,resp_type,with_credentials_QMARK_,progress_fn,errorf))
);


var temp__4657__auto___14318 = progress_fn;
if(cljs.core.truth_(temp__4657__auto___14318)){
var pf_14319 = temp__4657__auto___14318;
goog.events.listen(xhr,goog.net.EventType.PROGRESS,((function (pf_14319,temp__4657__auto___14318,timeout_ms__$1,method_STAR_,params__$1,headers__$1,vec__14299,uri_STAR_,post_content_STAR_,headers_STAR_,xhr,temp__4655__auto__,map__14296,map__14296__$1,opts,method,params,headers,timeout_ms,resp_type,with_credentials_QMARK_,progress_fn,errorf){
return (function (ev){
var length_computable_QMARK_ = ev.lengthComputable;
var loaded = ev.loaded;
var total = ev.total;
var _QMARK_ratio = (cljs.core.truth_((function (){var and__26809__auto__ = length_computable_QMARK_;
if(cljs.core.truth_(and__26809__auto__)){
return cljs.core.not_EQ_.call(null,total,(0));
} else {
return and__26809__auto__;
}
})())?(loaded / total):null);
return pf_14319.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"?ratio","?ratio",-1275760831),_QMARK_ratio,new cljs.core.Keyword(null,"length-computable?","length-computable?",1915473276),length_computable_QMARK_,new cljs.core.Keyword(null,"loaded","loaded",-1246482293),loaded,new cljs.core.Keyword(null,"total","total",1916810418),total,new cljs.core.Keyword(null,"ev","ev",-406827324),ev], null));
});})(pf_14319,temp__4657__auto___14318,timeout_ms__$1,method_STAR_,params__$1,headers__$1,vec__14299,uri_STAR_,post_content_STAR_,headers_STAR_,xhr,temp__4655__auto__,map__14296,map__14296__$1,opts,method,params,headers,timeout_ms,resp_type,with_credentials_QMARK_,progress_fn,errorf))
);
} else {
}

var G__14314_14320 = xhr;
var temp__4657__auto___14321 = new cljs.core.Keyword(null,"always","always",-1772028770);
if(cljs.core.truth_(temp__4657__auto___14321)){
var x_14322 = temp__4657__auto___14321;
G__14314_14320.setTimeoutInterval((function (){var or__26817__auto__ = timeout_ms__$1;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return (0);
}
})());
} else {
}

var temp__4657__auto___14323 = with_credentials_QMARK_;
if(cljs.core.truth_(temp__4657__auto___14323)){
var x_14324 = temp__4657__auto___14323;
G__14314_14320.setWithCredentials(true);
} else {
}

var temp__4657__auto___14325 = new cljs.core.Keyword(null,"always","always",-1772028770);
if(cljs.core.truth_(temp__4657__auto___14325)){
var x_14326 = temp__4657__auto___14325;
G__14314_14320.send(uri_STAR_,method_STAR_,post_content_STAR_,headers_STAR_);
} else {
}


return xhr;
}catch (e14298){if((e14298 instanceof Error)){
var e = e14298;
cljs.core.deref.call(null,taoensso.encore.xhr_pool_).releaseObject(xhr);

return null;
} else {
throw e14298;

}
}} else {
callback.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"?error","?error",1070752222),new cljs.core.Keyword(null,"xhr-pool-depleted","xhr-pool-depleted",-1812092376)], null));

return null;
}
});
/**
 * Stolen from http://goo.gl/99NSR1
 */
taoensso.encore.url_encode = (function taoensso$encore$url_encode(s){
if(cljs.core.truth_(s)){
return clojure.string.replace.call(null,clojure.string.replace.call(null,encodeURIComponent([cljs.core.str(s)].join(''),s),"*","%2A"),"'","%27");
} else {
return null;
}
});
/**
 * Stolen from http://goo.gl/99NSR1
 */
taoensso.encore.url_decode = (function taoensso$encore$url_decode(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14333 = arguments.length;
var i__27349__auto___14334 = (0);
while(true){
if((i__27349__auto___14334 < len__27348__auto___14333)){
args__27351__auto__.push((arguments[i__27349__auto___14334]));

var G__14335 = (i__27349__auto___14334 + (1));
i__27349__auto___14334 = G__14335;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.url_decode.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.url_decode.cljs$core$IFn$_invoke$arity$variadic = (function (s,p__14329){
var vec__14330 = p__14329;
var encoding = cljs.core.nth.call(null,vec__14330,(0),null);
if(cljs.core.truth_(s)){
return decodeURIComponent(s);
} else {
return null;
}
});

taoensso.encore.url_decode.cljs$lang$maxFixedArity = (1);

taoensso.encore.url_decode.cljs$lang$applyTo = (function (seq14327){
var G__14328 = cljs.core.first.call(null,seq14327);
var seq14327__$1 = cljs.core.next.call(null,seq14327);
return taoensso.encore.url_decode.cljs$core$IFn$_invoke$arity$variadic(G__14328,seq14327__$1);
});

taoensso.encore.format_query_string = (function taoensso$encore$format_query_string(m){
var param = (function (k,v){
return [cljs.core.str(taoensso.encore.url_encode.call(null,taoensso.encore.as_qname.call(null,k))),cljs.core.str("="),cljs.core.str(taoensso.encore.url_encode.call(null,(function (){var or__26817__auto__ = taoensso.encore.as__QMARK_qname.call(null,v);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return [cljs.core.str(v)].join('');
}
})()))].join('');
});
var join = ((function (param){
return (function (strs){
return clojure.string.join.call(null,"&",strs);
});})(param))
;
if(cljs.core.empty_QMARK_.call(null,m)){
return "";
} else {
return join.call(null,(function (){var iter__27173__auto__ = ((function (param,join){
return (function taoensso$encore$format_query_string_$_iter__14352(s__14353){
return (new cljs.core.LazySeq(null,((function (param,join){
return (function (){
var s__14353__$1 = s__14353;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__14353__$1);
if(temp__4657__auto__){
var s__14353__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__14353__$2)){
var c__27171__auto__ = cljs.core.chunk_first.call(null,s__14353__$2);
var size__27172__auto__ = cljs.core.count.call(null,c__27171__auto__);
var b__14355 = cljs.core.chunk_buffer.call(null,size__27172__auto__);
if((function (){var i__14354 = (0);
while(true){
if((i__14354 < size__27172__auto__)){
var vec__14362 = cljs.core._nth.call(null,c__27171__auto__,i__14354);
var k = cljs.core.nth.call(null,vec__14362,(0),null);
var v = cljs.core.nth.call(null,vec__14362,(1),null);
if(taoensso.encore.some_QMARK_.call(null,v)){
cljs.core.chunk_append.call(null,b__14355,((cljs.core.sequential_QMARK_.call(null,v))?join.call(null,cljs.core.mapv.call(null,cljs.core.partial.call(null,param,k),(function (){var or__26817__auto__ = cljs.core.seq.call(null,v);
if(or__26817__auto__){
return or__26817__auto__;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [""], null);
}
})())):param.call(null,k,v)));

var G__14368 = (i__14354 + (1));
i__14354 = G__14368;
continue;
} else {
var G__14369 = (i__14354 + (1));
i__14354 = G__14369;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14355),taoensso$encore$format_query_string_$_iter__14352.call(null,cljs.core.chunk_rest.call(null,s__14353__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__14355),null);
}
} else {
var vec__14365 = cljs.core.first.call(null,s__14353__$2);
var k = cljs.core.nth.call(null,vec__14365,(0),null);
var v = cljs.core.nth.call(null,vec__14365,(1),null);
if(taoensso.encore.some_QMARK_.call(null,v)){
return cljs.core.cons.call(null,((cljs.core.sequential_QMARK_.call(null,v))?join.call(null,cljs.core.mapv.call(null,cljs.core.partial.call(null,param,k),(function (){var or__26817__auto__ = cljs.core.seq.call(null,v);
if(or__26817__auto__){
return or__26817__auto__;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [""], null);
}
})())):param.call(null,k,v)),taoensso$encore$format_query_string_$_iter__14352.call(null,cljs.core.rest.call(null,s__14353__$2)));
} else {
var G__14370 = cljs.core.rest.call(null,s__14353__$2);
s__14353__$1 = G__14370;
continue;
}
}
} else {
return null;
}
break;
}
});})(param,join))
,null,null));
});})(param,join))
;
return iter__27173__auto__.call(null,m);
})());
}
});
taoensso.encore.assoc_conj = (function taoensso$encore$assoc_conj(m,k,v){
return cljs.core.assoc.call(null,m,k,(function (){var temp__4655__auto__ = cljs.core.get.call(null,m,k);
if(cljs.core.truth_(temp__4655__auto__)){
var cur = temp__4655__auto__;
if(cljs.core.vector_QMARK_.call(null,cur)){
return cljs.core.conj.call(null,cur,v);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cur,v], null);
}
} else {
return v;
}
})());
});
/**
 * Based on `ring-codec/form-decode`
 */
taoensso.encore.parse_query_params = (function taoensso$encore$parse_query_params(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14381 = arguments.length;
var i__27349__auto___14382 = (0);
while(true){
if((i__27349__auto___14382 < len__27348__auto___14381)){
args__27351__auto__.push((arguments[i__27349__auto___14382]));

var G__14383 = (i__27349__auto___14382 + (1));
i__27349__auto___14382 = G__14383;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.parse_query_params.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.parse_query_params.cljs$core$IFn$_invoke$arity$variadic = (function (s,p__14373){
var vec__14374 = p__14373;
var keywordize_QMARK_ = cljs.core.nth.call(null,vec__14374,(0),null);
var encoding = cljs.core.nth.call(null,vec__14374,(1),null);
var _PERCENT_ = ((clojure.string.blank_QMARK_.call(null,s))?cljs.core.PersistentArrayMap.EMPTY:(function (){var s__$1 = (cljs.core.truth_(taoensso.encore.str_starts_with_QMARK_.call(null,s,"?"))?cljs.core.subs.call(null,s,(1)):s);
if(cljs.core.truth_(taoensso.encore.str_contains_QMARK_.call(null,s__$1,"="))){
var m = cljs.core.reduce.call(null,((function (s__$1,vec__14374,keywordize_QMARK_,encoding){
return (function (m,param){
var temp__4655__auto__ = clojure.string.split.call(null,param,/=/,(2));
if(cljs.core.truth_(temp__4655__auto__)){
var vec__14377 = temp__4655__auto__;
var k = cljs.core.nth.call(null,vec__14377,(0),null);
var v = cljs.core.nth.call(null,vec__14377,(1),null);
return taoensso.encore.assoc_conj.call(null,m,taoensso.encore.url_decode.call(null,k,encoding),taoensso.encore.url_decode.call(null,v,encoding));
} else {
return m;
}
});})(s__$1,vec__14374,keywordize_QMARK_,encoding))
,cljs.core.PersistentArrayMap.EMPTY,clojure.string.split.call(null,s__$1,/&/));
if(cljs.core.truth_(keywordize_QMARK_)){
return taoensso.encore.map_keys.call(null,cljs.core.keyword,m);
} else {
return m;
}
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})());
if(cljs.core.truth_((function (){var e = (function (){try{if(cljs.core.map_QMARK_.call(null,_PERCENT_)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e14380){if((e14380 instanceof Error)){
var e = e14380;
return e;
} else {
throw e14380;

}
}})();
if((e == null)){
return true;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.encore",null,"(map? %)",_PERCENT_,e,null);
}
})())){
} else {
throw (new Error("Assert failed: (have? map? %)"));
}

return _PERCENT_;
});

taoensso.encore.parse_query_params.cljs$lang$maxFixedArity = (1);

taoensso.encore.parse_query_params.cljs$lang$applyTo = (function (seq14371){
var G__14372 = cljs.core.first.call(null,seq14371);
var seq14371__$1 = cljs.core.next.call(null,seq14371);
return taoensso.encore.parse_query_params.cljs$core$IFn$_invoke$arity$variadic(G__14372,seq14371__$1);
});

taoensso.encore.merge_url_with_query_string = (function taoensso$encore$merge_url_with_query_string(url,m){
var vec__14387 = clojure.string.split.call(null,[cljs.core.str(url)].join(''),/\?/,(2));
var url__$1 = cljs.core.nth.call(null,vec__14387,(0),null);
var _QMARK_qstr = cljs.core.nth.call(null,vec__14387,(1),null);
var qmap = cljs.core.merge.call(null,(cljs.core.truth_(_QMARK_qstr)?taoensso.encore.map_keys.call(null,cljs.core.keyword,taoensso.encore.parse_query_params.call(null,_QMARK_qstr)):null),taoensso.encore.map_keys.call(null,cljs.core.keyword,m));
var _QMARK_qstr__$1 = taoensso.encore.as__QMARK_nblank.call(null,taoensso.encore.format_query_string.call(null,qmap));
var temp__4655__auto__ = _QMARK_qstr__$1;
if(cljs.core.truth_(temp__4655__auto__)){
var qstr = temp__4655__auto__;
return [cljs.core.str(url__$1),cljs.core.str("?"),cljs.core.str(qstr)].join('');
} else {
return url__$1;
}
});
taoensso.encore._new_stub_ = (function taoensso$encore$_new_stub_(sfn_name){
return cljs.core.volatile_BANG_.call(null,(function() { 
var G__14390__delegate = function (args){
throw cljs.core.ex_info.call(null,[cljs.core.str("No stubfn implementation for: "),cljs.core.str(sfn_name)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"sfn-name","sfn-name",-968697222),sfn_name,new cljs.core.Keyword(null,"args","args",1315556576),args], null));
};
var G__14390 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14391__i = 0, G__14391__a = new Array(arguments.length -  0);
while (G__14391__i < G__14391__a.length) {G__14391__a[G__14391__i] = arguments[G__14391__i + 0]; ++G__14391__i;}
  args = new cljs.core.IndexedSeq(G__14391__a,0);
} 
return G__14390__delegate.call(this,args);};
G__14390.cljs$lang$maxFixedArity = 0;
G__14390.cljs$lang$applyTo = (function (arglist__14392){
var args = cljs.core.seq(arglist__14392);
return G__14390__delegate(args);
});
G__14390.cljs$core$IFn$_invoke$arity$variadic = G__14390__delegate;
return G__14390;
})()
);
});
taoensso.encore.fixture_map__GT_fn = (function taoensso$encore$fixture_map__GT_fn(p__14394){
var map__14397 = p__14394;
var map__14397__$1 = ((((!((map__14397 == null)))?((((map__14397.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14397.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14397):map__14397);
var before = cljs.core.get.call(null,map__14397__$1,new cljs.core.Keyword(null,"before","before",-1633692388),new cljs.core.Symbol(null,"do","do",1686842252,null));
var after = cljs.core.get.call(null,map__14397__$1,new cljs.core.Keyword(null,"after","after",594996914),new cljs.core.Symbol(null,"do","do",1686842252,null));
return cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("cljs.core","fn","cljs.core/fn",-1065745098,null)),(function (){var x__27211__auto__ = cljs.core.vec.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"f__14393__auto__","f__14393__auto__",97088316,null))))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__27211__auto__);
})(),(function (){var x__27211__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__27211__auto__ = before;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__27211__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__27211__auto__);
})(),(function (){var x__27211__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"f__14393__auto__","f__14393__auto__",97088316,null)))));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__27211__auto__);
})(),(function (){var x__27211__auto__ = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,(function (){var x__27211__auto__ = after;
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__27211__auto__);
})())));
return cljs.core._conj.call(null,cljs.core.List.EMPTY,x__27211__auto__);
})())));
});
taoensso.encore.get_window_location = taoensso.encore.get_win_loc;

taoensso.encore.backport_run_BANG_ = taoensso.encore.run_BANG_;

taoensso.encore.fq_name = taoensso.encore.as_qname;

taoensso.encore.qname = taoensso.encore.as_qname;

taoensso.encore.merge_deep_with = taoensso.encore.nested_merge_with;

taoensso.encore.merge_deep = taoensso.encore.nested_merge;

taoensso.encore.parse_bool = taoensso.encore.as__QMARK_bool;

taoensso.encore.parse_int = taoensso.encore.as__QMARK_int;

taoensso.encore.parse_float = taoensso.encore.as__QMARK_float;

taoensso.encore.swapped_STAR_ = taoensso.encore._swapped;

taoensso.encore.swap_val_BANG_ = taoensso.encore._swap_cache_BANG_;

taoensso.encore.memoize_a0_ = taoensso.encore.memoize_;

taoensso.encore.memoize_a1_ = taoensso.encore.memoize_;

taoensso.encore.a0_memoize_ = taoensso.encore.memoize_;

taoensso.encore.a1_memoize_ = taoensso.encore.memoize_;

taoensso.encore.memoize_1 = taoensso.encore.memoize_last;

taoensso.encore.memoize1 = taoensso.encore.memoize_last;

taoensso.encore.nnil_QMARK_ = taoensso.encore.some_QMARK_;

taoensso.encore.nneg_num_QMARK_ = taoensso.encore.nat_num_QMARK_;

taoensso.encore.nneg_int_QMARK_ = taoensso.encore.nat_int_QMARK_;

taoensso.encore.nneg_float_QMARK_ = taoensso.encore.nat_float_QMARK_;

taoensso.encore.uint_QMARK_ = taoensso.encore.nat_int_QMARK_;

taoensso.encore.pint_QMARK_ = taoensso.encore.pos_int_QMARK_;

taoensso.encore.nnil_EQ_ = taoensso.encore.some_EQ_;

taoensso.encore.as__QMARK_uint = taoensso.encore.as__QMARK_nat_int;

taoensso.encore.as__QMARK_pint = taoensso.encore.as__QMARK_pos_int;

taoensso.encore.as__QMARK_ufloat = taoensso.encore.as__QMARK_nat_float;

taoensso.encore.as__QMARK_pfloat = taoensso.encore.as__QMARK_pos_float;

taoensso.encore.as_uint = taoensso.encore.as_nat_int;

taoensso.encore.as_pint = taoensso.encore.as_pos_int;

taoensso.encore.as_ufloat = taoensso.encore.as_nat_float;

taoensso.encore.as_pfloat = taoensso.encore.as_pos_float;

taoensso.encore.run_BANG__STAR_ = taoensso.encore.run_BANG_;

taoensso.encore.every = taoensso.encore.revery;

taoensso.encore.spaced_str_with_nils = (function taoensso$encore$spaced_str_with_nils(xs){
return clojure.string.join.call(null," ",cljs.core.mapv.call(null,taoensso.encore.nil__GT_str,xs));
});

taoensso.encore.spaced_str = (function taoensso$encore$spaced_str(xs){
return clojure.string.join.call(null," ",cljs.core.mapv.call(null,taoensso.encore.undefined__GT_nil,xs));
});

taoensso.encore.round = (function taoensso$encore$round(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14501 = arguments.length;
var i__27349__auto___14502 = (0);
while(true){
if((i__27349__auto___14502 < len__27348__auto___14501)){
args__27351__auto__.push((arguments[i__27349__auto___14502]));

var G__14503 = (i__27349__auto___14502 + (1));
i__27349__auto___14502 = G__14503;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.round.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.round.cljs$core$IFn$_invoke$arity$variadic = (function (n,p__14405){
var vec__14406 = p__14405;
var type = cljs.core.nth.call(null,vec__14406,(0),null);
var nplaces = cljs.core.nth.call(null,vec__14406,(1),null);
return taoensso.encore.round_STAR_.call(null,(function (){var or__26817__auto__ = type;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return new cljs.core.Keyword(null,"round","round",2009433328);
}
})(),nplaces,n);
});

taoensso.encore.round.cljs$lang$maxFixedArity = (1);

taoensso.encore.round.cljs$lang$applyTo = (function (seq14403){
var G__14404 = cljs.core.first.call(null,seq14403);
var seq14403__$1 = cljs.core.next.call(null,seq14403);
return taoensso.encore.round.cljs$core$IFn$_invoke$arity$variadic(G__14404,seq14403__$1);
});


taoensso.encore.join_once = (function taoensso$encore$join_once(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14504 = arguments.length;
var i__27349__auto___14505 = (0);
while(true){
if((i__27349__auto___14505 < len__27348__auto___14504)){
args__27351__auto__.push((arguments[i__27349__auto___14505]));

var G__14506 = (i__27349__auto___14505 + (1));
i__27349__auto___14505 = G__14506;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.join_once.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.join_once.cljs$core$IFn$_invoke$arity$variadic = (function (sep,coll){
return taoensso.encore.str_join_once.call(null,sep,coll);
});

taoensso.encore.join_once.cljs$lang$maxFixedArity = (1);

taoensso.encore.join_once.cljs$lang$applyTo = (function (seq14409){
var G__14410 = cljs.core.first.call(null,seq14409);
var seq14409__$1 = cljs.core.next.call(null,seq14409);
return taoensso.encore.join_once.cljs$core$IFn$_invoke$arity$variadic(G__14410,seq14409__$1);
});


taoensso.encore.keys_EQ_ = (function taoensso$encore$keys_EQ_(m,ks){
return taoensso.encore.ks_EQ_.call(null,ks,m);
});

taoensso.encore.keys_LT__EQ_ = (function taoensso$encore$keys_LT__EQ_(m,ks){
return taoensso.encore.ks_LT__EQ_.call(null,ks,m);
});

taoensso.encore.keys_GT__EQ_ = (function taoensso$encore$keys_GT__EQ_(m,ks){
return taoensso.encore.ks_GT__EQ_.call(null,ks,m);
});

taoensso.encore.keys_EQ_nnil_QMARK_ = (function taoensso$encore$keys_EQ_nnil_QMARK_(m,ks){
return taoensso.encore.ks_nnil_QMARK_.call(null,ks,m);
});

taoensso.encore.rate_limiter = (function taoensso$encore$rate_limiter(ncalls_limit,window_ms){
return taoensso.encore.rate_limiter_STAR_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ncalls_limit,window_ms], null)], null));
});

taoensso.encore.rate_limited = (function taoensso$encore$rate_limited(ncalls_limit,window_ms,f){
var rl = taoensso.encore.rate_limiter_STAR_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ncalls_limit,window_ms], null)], null));
return ((function (rl){
return (function() { 
var G__14507__delegate = function (args){
var temp__4655__auto__ = rl.call(null);
if(cljs.core.truth_(temp__4655__auto__)){
var backoff_ms = temp__4655__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backoff-ms","backoff-ms",1679281507),backoff_ms], null);
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"result","result",1415092211),f.call(null)], null);
}
};
var G__14507 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14508__i = 0, G__14508__a = new Array(arguments.length -  0);
while (G__14508__i < G__14508__a.length) {G__14508__a[G__14508__i] = arguments[G__14508__i + 0]; ++G__14508__i;}
  args = new cljs.core.IndexedSeq(G__14508__a,0);
} 
return G__14507__delegate.call(this,args);};
G__14507.cljs$lang$maxFixedArity = 0;
G__14507.cljs$lang$applyTo = (function (arglist__14509){
var args = cljs.core.seq(arglist__14509);
return G__14507__delegate(args);
});
G__14507.cljs$core$IFn$_invoke$arity$variadic = G__14507__delegate;
return G__14507;
})()
;
;})(rl))
});

taoensso.encore.logging_level = cljs.core.atom.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596));

taoensso.encore.set_exp_backoff_timeout_BANG_ = (function taoensso$encore$set_exp_backoff_timeout_BANG_(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14510 = arguments.length;
var i__27349__auto___14511 = (0);
while(true){
if((i__27349__auto___14511 < len__27348__auto___14510)){
args__27351__auto__.push((arguments[i__27349__auto___14511]));

var G__14512 = (i__27349__auto___14511 + (1));
i__27349__auto___14511 = G__14512;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.set_exp_backoff_timeout_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.set_exp_backoff_timeout_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (nullary_f,p__14413){
var vec__14414 = p__14413;
var nattempt = cljs.core.nth.call(null,vec__14414,(0),null);
var temp__4657__auto__ = taoensso.encore.js__QMARK_win;
if(cljs.core.truth_(temp__4657__auto__)){
var js_win = temp__4657__auto__;
return js_win.setTimeout(nullary_f,taoensso.encore.exp_backoff.call(null,(function (){var or__26817__auto__ = nattempt;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return (0);
}
})()));
} else {
return null;
}
});

taoensso.encore.set_exp_backoff_timeout_BANG_.cljs$lang$maxFixedArity = (1);

taoensso.encore.set_exp_backoff_timeout_BANG_.cljs$lang$applyTo = (function (seq14411){
var G__14412 = cljs.core.first.call(null,seq14411);
var seq14411__$1 = cljs.core.next.call(null,seq14411);
return taoensso.encore.set_exp_backoff_timeout_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__14412,seq14411__$1);
});


if(typeof taoensso.encore._STAR_log_level_STAR_ !== 'undefined'){
} else {
/**
 * DEPRECATED
 */
taoensso.encore._STAR_log_level_STAR_ = new cljs.core.Keyword(null,"debug","debug",-1608172596);
}

taoensso.encore.log_QMARK_ = (function (){var __GT_n = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"trace","trace",-1082747415),(1),new cljs.core.Keyword(null,"debug","debug",-1608172596),(2),new cljs.core.Keyword(null,"info","info",-317069002),(3),new cljs.core.Keyword(null,"warn","warn",-436710552),(4),new cljs.core.Keyword(null,"error","error",-978969032),(5),new cljs.core.Keyword(null,"fatal","fatal",1874419888),(6),new cljs.core.Keyword(null,"report","report",1394055010),(7)], null);
return ((function (__GT_n){
return (function (level){
return (__GT_n.call(null,level) >= __GT_n.call(null,taoensso.encore._STAR_log_level_STAR_));
});
;})(__GT_n))
})();

taoensso.encore.tracef = (function taoensso$encore$tracef(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14513 = arguments.length;
var i__27349__auto___14514 = (0);
while(true){
if((i__27349__auto___14514 < len__27348__auto___14513)){
args__27351__auto__.push((arguments[i__27349__auto___14514]));

var G__14515 = (i__27349__auto___14514 + (1));
i__27349__auto___14514 = G__14515;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.tracef.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.tracef.cljs$core$IFn$_invoke$arity$variadic = (function (fmt,xs){
if(cljs.core.truth_(taoensso.encore.log_QMARK_.call(null,new cljs.core.Keyword(null,"trace","trace",-1082747415)))){
return cljs.core.apply.call(null,taoensso.encore.logf,fmt,xs);
} else {
return null;
}
});

taoensso.encore.tracef.cljs$lang$maxFixedArity = (1);

taoensso.encore.tracef.cljs$lang$applyTo = (function (seq14417){
var G__14418 = cljs.core.first.call(null,seq14417);
var seq14417__$1 = cljs.core.next.call(null,seq14417);
return taoensso.encore.tracef.cljs$core$IFn$_invoke$arity$variadic(G__14418,seq14417__$1);
});


taoensso.encore.debugf = (function taoensso$encore$debugf(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14516 = arguments.length;
var i__27349__auto___14517 = (0);
while(true){
if((i__27349__auto___14517 < len__27348__auto___14516)){
args__27351__auto__.push((arguments[i__27349__auto___14517]));

var G__14518 = (i__27349__auto___14517 + (1));
i__27349__auto___14517 = G__14518;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.debugf.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.debugf.cljs$core$IFn$_invoke$arity$variadic = (function (fmt,xs){
if(cljs.core.truth_(taoensso.encore.log_QMARK_.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596)))){
return cljs.core.apply.call(null,taoensso.encore.logf,fmt,xs);
} else {
return null;
}
});

taoensso.encore.debugf.cljs$lang$maxFixedArity = (1);

taoensso.encore.debugf.cljs$lang$applyTo = (function (seq14419){
var G__14420 = cljs.core.first.call(null,seq14419);
var seq14419__$1 = cljs.core.next.call(null,seq14419);
return taoensso.encore.debugf.cljs$core$IFn$_invoke$arity$variadic(G__14420,seq14419__$1);
});


taoensso.encore.infof = (function taoensso$encore$infof(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14519 = arguments.length;
var i__27349__auto___14520 = (0);
while(true){
if((i__27349__auto___14520 < len__27348__auto___14519)){
args__27351__auto__.push((arguments[i__27349__auto___14520]));

var G__14521 = (i__27349__auto___14520 + (1));
i__27349__auto___14520 = G__14521;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.infof.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.infof.cljs$core$IFn$_invoke$arity$variadic = (function (fmt,xs){
if(cljs.core.truth_(taoensso.encore.log_QMARK_.call(null,new cljs.core.Keyword(null,"info","info",-317069002)))){
return cljs.core.apply.call(null,taoensso.encore.logf,fmt,xs);
} else {
return null;
}
});

taoensso.encore.infof.cljs$lang$maxFixedArity = (1);

taoensso.encore.infof.cljs$lang$applyTo = (function (seq14421){
var G__14422 = cljs.core.first.call(null,seq14421);
var seq14421__$1 = cljs.core.next.call(null,seq14421);
return taoensso.encore.infof.cljs$core$IFn$_invoke$arity$variadic(G__14422,seq14421__$1);
});


taoensso.encore.warnf = (function taoensso$encore$warnf(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14522 = arguments.length;
var i__27349__auto___14523 = (0);
while(true){
if((i__27349__auto___14523 < len__27348__auto___14522)){
args__27351__auto__.push((arguments[i__27349__auto___14523]));

var G__14524 = (i__27349__auto___14523 + (1));
i__27349__auto___14523 = G__14524;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.warnf.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.warnf.cljs$core$IFn$_invoke$arity$variadic = (function (fmt,xs){
if(cljs.core.truth_(taoensso.encore.log_QMARK_.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552)))){
return cljs.core.apply.call(null,taoensso.encore.logf,[cljs.core.str("WARN: "),cljs.core.str(fmt)].join(''),xs);
} else {
return null;
}
});

taoensso.encore.warnf.cljs$lang$maxFixedArity = (1);

taoensso.encore.warnf.cljs$lang$applyTo = (function (seq14423){
var G__14424 = cljs.core.first.call(null,seq14423);
var seq14423__$1 = cljs.core.next.call(null,seq14423);
return taoensso.encore.warnf.cljs$core$IFn$_invoke$arity$variadic(G__14424,seq14423__$1);
});


taoensso.encore.errorf = (function taoensso$encore$errorf(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14525 = arguments.length;
var i__27349__auto___14526 = (0);
while(true){
if((i__27349__auto___14526 < len__27348__auto___14525)){
args__27351__auto__.push((arguments[i__27349__auto___14526]));

var G__14527 = (i__27349__auto___14526 + (1));
i__27349__auto___14526 = G__14527;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.errorf.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.errorf.cljs$core$IFn$_invoke$arity$variadic = (function (fmt,xs){
if(cljs.core.truth_(taoensso.encore.log_QMARK_.call(null,new cljs.core.Keyword(null,"error","error",-978969032)))){
return cljs.core.apply.call(null,taoensso.encore.logf,[cljs.core.str("ERROR: "),cljs.core.str(fmt)].join(''),xs);
} else {
return null;
}
});

taoensso.encore.errorf.cljs$lang$maxFixedArity = (1);

taoensso.encore.errorf.cljs$lang$applyTo = (function (seq14425){
var G__14426 = cljs.core.first.call(null,seq14425);
var seq14425__$1 = cljs.core.next.call(null,seq14425);
return taoensso.encore.errorf.cljs$core$IFn$_invoke$arity$variadic(G__14426,seq14425__$1);
});


taoensso.encore.fatalf = (function taoensso$encore$fatalf(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14528 = arguments.length;
var i__27349__auto___14529 = (0);
while(true){
if((i__27349__auto___14529 < len__27348__auto___14528)){
args__27351__auto__.push((arguments[i__27349__auto___14529]));

var G__14530 = (i__27349__auto___14529 + (1));
i__27349__auto___14529 = G__14530;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.fatalf.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.fatalf.cljs$core$IFn$_invoke$arity$variadic = (function (fmt,xs){
if(cljs.core.truth_(taoensso.encore.log_QMARK_.call(null,new cljs.core.Keyword(null,"fatal","fatal",1874419888)))){
return cljs.core.apply.call(null,taoensso.encore.logf,[cljs.core.str("FATAL: "),cljs.core.str(fmt)].join(''),xs);
} else {
return null;
}
});

taoensso.encore.fatalf.cljs$lang$maxFixedArity = (1);

taoensso.encore.fatalf.cljs$lang$applyTo = (function (seq14427){
var G__14428 = cljs.core.first.call(null,seq14427);
var seq14427__$1 = cljs.core.next.call(null,seq14427);
return taoensso.encore.fatalf.cljs$core$IFn$_invoke$arity$variadic(G__14428,seq14427__$1);
});


taoensso.encore.reportf = (function taoensso$encore$reportf(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14531 = arguments.length;
var i__27349__auto___14532 = (0);
while(true){
if((i__27349__auto___14532 < len__27348__auto___14531)){
args__27351__auto__.push((arguments[i__27349__auto___14532]));

var G__14533 = (i__27349__auto___14532 + (1));
i__27349__auto___14532 = G__14533;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.reportf.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.reportf.cljs$core$IFn$_invoke$arity$variadic = (function (fmt,xs){
if(cljs.core.truth_(taoensso.encore.log_QMARK_.call(null,new cljs.core.Keyword(null,"report","report",1394055010)))){
return cljs.core.apply.call(null,taoensso.encore.logf,fmt,xs);
} else {
return null;
}
});

taoensso.encore.reportf.cljs$lang$maxFixedArity = (1);

taoensso.encore.reportf.cljs$lang$applyTo = (function (seq14429){
var G__14430 = cljs.core.first.call(null,seq14429);
var seq14429__$1 = cljs.core.next.call(null,seq14429);
return taoensso.encore.reportf.cljs$core$IFn$_invoke$arity$variadic(G__14430,seq14429__$1);
});


taoensso.encore.greatest = (function taoensso$encore$greatest(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14534 = arguments.length;
var i__27349__auto___14535 = (0);
while(true){
if((i__27349__auto___14535 < len__27348__auto___14534)){
args__27351__auto__.push((arguments[i__27349__auto___14535]));

var G__14536 = (i__27349__auto___14535 + (1));
i__27349__auto___14535 = G__14536;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.greatest.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.greatest.cljs$core$IFn$_invoke$arity$variadic = (function (coll,p__14433){
var vec__14434 = p__14433;
var _QMARK_comparator = cljs.core.nth.call(null,vec__14434,(0),null);
var comparator = (function (){var or__26817__auto__ = _QMARK_comparator;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore.rcompare;
}
})();
return cljs.core.reduce.call(null,((function (comparator,vec__14434,_QMARK_comparator){
return (function (p1__14399_SHARP_,p2__14400_SHARP_){
if((comparator.call(null,p1__14399_SHARP_,p2__14400_SHARP_) > (0))){
return p2__14400_SHARP_;
} else {
return p1__14399_SHARP_;
}
});})(comparator,vec__14434,_QMARK_comparator))
,coll);
});

taoensso.encore.greatest.cljs$lang$maxFixedArity = (1);

taoensso.encore.greatest.cljs$lang$applyTo = (function (seq14431){
var G__14432 = cljs.core.first.call(null,seq14431);
var seq14431__$1 = cljs.core.next.call(null,seq14431);
return taoensso.encore.greatest.cljs$core$IFn$_invoke$arity$variadic(G__14432,seq14431__$1);
});


taoensso.encore.least = (function taoensso$encore$least(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14537 = arguments.length;
var i__27349__auto___14538 = (0);
while(true){
if((i__27349__auto___14538 < len__27348__auto___14537)){
args__27351__auto__.push((arguments[i__27349__auto___14538]));

var G__14539 = (i__27349__auto___14538 + (1));
i__27349__auto___14538 = G__14539;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.least.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.least.cljs$core$IFn$_invoke$arity$variadic = (function (coll,p__14439){
var vec__14440 = p__14439;
var _QMARK_comparator = cljs.core.nth.call(null,vec__14440,(0),null);
var comparator = (function (){var or__26817__auto__ = _QMARK_comparator;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore.rcompare;
}
})();
return cljs.core.reduce.call(null,((function (comparator,vec__14440,_QMARK_comparator){
return (function (p1__14401_SHARP_,p2__14402_SHARP_){
if((comparator.call(null,p1__14401_SHARP_,p2__14402_SHARP_) < (0))){
return p2__14402_SHARP_;
} else {
return p1__14401_SHARP_;
}
});})(comparator,vec__14440,_QMARK_comparator))
,coll);
});

taoensso.encore.least.cljs$lang$maxFixedArity = (1);

taoensso.encore.least.cljs$lang$applyTo = (function (seq14437){
var G__14438 = cljs.core.first.call(null,seq14437);
var seq14437__$1 = cljs.core.next.call(null,seq14437);
return taoensso.encore.least.cljs$core$IFn$_invoke$arity$variadic(G__14438,seq14437__$1);
});



/**
 * Ref. http://goo.gl/0GzRuz
 */
taoensso.encore.clj1098 = (function taoensso$encore$clj1098(x){
var or__26817__auto__ = x;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
});

/**
 * Deprecated, prefer `xdistinct`
 */
taoensso.encore.distinct_by = (function taoensso$encore$distinct_by(keyfn,coll){
var step = (function taoensso$encore$distinct_by_$_step(xs,seen){
return (new cljs.core.LazySeq(null,(function (){
return (function (p__14455,seen__$1){
while(true){
var vec__14456 = p__14455;
var v = cljs.core.nth.call(null,vec__14456,(0),null);
var xs__$1 = vec__14456;
var temp__4657__auto__ = cljs.core.seq.call(null,xs__$1);
if(temp__4657__auto__){
var s = temp__4657__auto__;
var v_STAR_ = keyfn.call(null,v);
if(cljs.core.contains_QMARK_.call(null,seen__$1,v_STAR_)){
var G__14540 = cljs.core.rest.call(null,s);
var G__14541 = seen__$1;
p__14455 = G__14540;
seen__$1 = G__14541;
continue;
} else {
return cljs.core.cons.call(null,v,taoensso$encore$distinct_by_$_step.call(null,cljs.core.rest.call(null,s),cljs.core.conj.call(null,seen__$1,v_STAR_)));
}
} else {
return null;
}
break;
}
}).call(null,xs,seen);
}),null,null));
});
return step.call(null,coll,cljs.core.PersistentHashSet.EMPTY);
});

/**
 * Deprecated, prefer `xdistinct`
 */
taoensso.encore.distinctv = (function taoensso$encore$distinctv(var_args){
var args14459 = [];
var len__27348__auto___14542 = arguments.length;
var i__27349__auto___14543 = (0);
while(true){
if((i__27349__auto___14543 < len__27348__auto___14542)){
args14459.push((arguments[i__27349__auto___14543]));

var G__14544 = (i__27349__auto___14543 + (1));
i__27349__auto___14543 = G__14544;
continue;
} else {
}
break;
}

var G__14461 = args14459.length;
switch (G__14461) {
case 1:
return taoensso.encore.distinctv.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return taoensso.encore.distinctv.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14459.length)].join('')));

}
});

taoensso.encore.distinctv.cljs$core$IFn$_invoke$arity$1 = (function (coll){
return taoensso.encore.distinctv.call(null,cljs.core.identity,coll);
});

taoensso.encore.distinctv.cljs$core$IFn$_invoke$arity$2 = (function (keyfn,coll){
var tr = cljs.core.reduce.call(null,(function (p__14462,in$){
var vec__14463 = p__14462;
var v = cljs.core.nth.call(null,vec__14463,(0),null);
var seen = cljs.core.nth.call(null,vec__14463,(1),null);
var in_STAR_ = keyfn.call(null,in$);
if(cljs.core.contains_QMARK_.call(null,seen,in_STAR_)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [v,seen], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj_BANG_.call(null,v,in$),cljs.core.conj.call(null,seen,in_STAR_)], null);
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY),cljs.core.PersistentHashSet.EMPTY], null),coll);
return cljs.core.persistent_BANG_.call(null,cljs.core.nth.call(null,tr,(0)));
});

taoensso.encore.distinctv.cljs$lang$maxFixedArity = 2;


/**
 * Deprecated, prefer `reduce-kv`
 */
taoensso.encore.map_kvs = (function taoensso$encore$map_kvs(kf,vf,m){
if(cljs.core.truth_(m)){
var vf__$1 = (((vf == null))?(function (_,v){
return v;
}):vf);
var kf__$1 = (((kf == null))?((function (vf__$1){
return (function (k,_){
return k;
});})(vf__$1))
:((taoensso.encore.kw_identical_QMARK_.call(null,kf,new cljs.core.Keyword(null,"keywordize","keywordize",1381210758)))?((function (vf__$1){
return (function (k,_){
return cljs.core.keyword.call(null,k);
});})(vf__$1))
:kf));
return cljs.core.persistent_BANG_.call(null,cljs.core.reduce_kv.call(null,((function (vf__$1,kf__$1){
return (function (m__$1,k,v){
return cljs.core.assoc_BANG_.call(null,m__$1,kf__$1.call(null,k,v),vf__$1.call(null,k,v));
});})(vf__$1,kf__$1))
,cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY),m));
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
});

/**
 * Deprecated, prefer `reduce-kvs`
 */
taoensso.encore.as_map = (function taoensso$encore$as_map(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14546 = arguments.length;
var i__27349__auto___14547 = (0);
while(true){
if((i__27349__auto___14547 < len__27348__auto___14546)){
args__27351__auto__.push((arguments[i__27349__auto___14547]));

var G__14548 = (i__27349__auto___14547 + (1));
i__27349__auto___14547 = G__14548;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.encore.as_map.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.encore.as_map.cljs$core$IFn$_invoke$arity$variadic = (function (kvs,p__14468){
var vec__14469 = p__14468;
var kf = cljs.core.nth.call(null,vec__14469,(0),null);
var vf = cljs.core.nth.call(null,vec__14469,(1),null);
if(cljs.core.empty_QMARK_.call(null,kvs)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
var vf__$1 = (((vf == null))?((function (vec__14469,kf,vf){
return (function (_,v){
return v;
});})(vec__14469,kf,vf))
:vf);
var kf__$1 = (((kf == null))?((function (vf__$1,vec__14469,kf,vf){
return (function (k,_){
return k;
});})(vf__$1,vec__14469,kf,vf))
:((taoensso.encore.kw_identical_QMARK_.call(null,kf,new cljs.core.Keyword(null,"keywordize","keywordize",1381210758)))?((function (vf__$1,vec__14469,kf,vf){
return (function (k,_){
return cljs.core.keyword.call(null,k);
});})(vf__$1,vec__14469,kf,vf))
:kf));
return cljs.core.persistent_BANG_.call(null,taoensso.encore.reduce_kvs.call(null,((function (vf__$1,kf__$1,vec__14469,kf,vf){
return (function (m,k,v){
return cljs.core.assoc_BANG_.call(null,m,kf__$1.call(null,k,v),vf__$1.call(null,k,v));
});})(vf__$1,kf__$1,vec__14469,kf,vf))
,cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY),kvs));
}
});

taoensso.encore.as_map.cljs$lang$maxFixedArity = (1);

taoensso.encore.as_map.cljs$lang$applyTo = (function (seq14466){
var G__14467 = cljs.core.first.call(null,seq14466);
var seq14466__$1 = cljs.core.next.call(null,seq14466);
return taoensso.encore.as_map.cljs$core$IFn$_invoke$arity$variadic(G__14467,seq14466__$1);
});


taoensso.encore.keywordize_map = (function taoensso$encore$keywordize_map(m){
return taoensso.encore.map_keys.call(null,cljs.core.keyword,m);
});

taoensso.encore.removev = (function taoensso$encore$removev(pred,coll){
return cljs.core.filterv.call(null,cljs.core.complement.call(null,pred),coll);
});

taoensso.encore.nvec_QMARK_ = (function taoensso$encore$nvec_QMARK_(n,x){
return (cljs.core.vector_QMARK_.call(null,x)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,x),n));
});

taoensso.encore.memoized = (function taoensso$encore$memoized(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14549 = arguments.length;
var i__27349__auto___14550 = (0);
while(true){
if((i__27349__auto___14550 < len__27348__auto___14549)){
args__27351__auto__.push((arguments[i__27349__auto___14550]));

var G__14551 = (i__27349__auto___14550 + (1));
i__27349__auto___14550 = G__14551;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((2) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((2)),(0),null)):null);
return taoensso.encore.memoized.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27352__auto__);
});

taoensso.encore.memoized.cljs$core$IFn$_invoke$arity$variadic = (function (cache,f,args){
if(cljs.core.truth_(cache)){
return cljs.core.deref.call(null,taoensso.encore._swap_cache_BANG_.call(null,cache,args,(function (_QMARK_dv){
if(cljs.core.truth_(_QMARK_dv)){
return _QMARK_dv;
} else {
return (new cljs.core.Delay((function (){
return cljs.core.apply.call(null,f,args);
}),null));
}
})));
} else {
return cljs.core.apply.call(null,f,args);
}
});

taoensso.encore.memoized.cljs$lang$maxFixedArity = (2);

taoensso.encore.memoized.cljs$lang$applyTo = (function (seq14472){
var G__14473 = cljs.core.first.call(null,seq14472);
var seq14472__$1 = cljs.core.next.call(null,seq14472);
var G__14474 = cljs.core.first.call(null,seq14472__$1);
var seq14472__$2 = cljs.core.next.call(null,seq14472__$1);
return taoensso.encore.memoized.cljs$core$IFn$_invoke$arity$variadic(G__14473,G__14474,seq14472__$2);
});


taoensso.encore.translate_signed_idx = (function taoensso$encore$translate_signed_idx(signed_idx,max_idx){
if((signed_idx >= (0))){
var x__26895__auto__ = signed_idx;
var y__26896__auto__ = max_idx;
return ((x__26895__auto__ < y__26896__auto__) ? x__26895__auto__ : y__26896__auto__);
} else {
var x__26892__auto__ = (0);
var y__26893__auto__ = (signed_idx + max_idx);
return ((x__26892__auto__ > y__26893__auto__) ? x__26892__auto__ : y__26893__auto__);
}
});


taoensso.encore.sub_indexes = (function taoensso$encore$sub_indexes(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14552 = arguments.length;
var i__27349__auto___14553 = (0);
while(true){
if((i__27349__auto___14553 < len__27348__auto___14552)){
args__27351__auto__.push((arguments[i__27349__auto___14553]));

var G__14554 = (i__27349__auto___14553 + (1));
i__27349__auto___14553 = G__14554;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((2) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((2)),(0),null)):null);
return taoensso.encore.sub_indexes.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27352__auto__);
});

taoensso.encore.sub_indexes.cljs$core$IFn$_invoke$arity$variadic = (function (x,start_idx,p__14478){
var map__14479 = p__14478;
var map__14479__$1 = ((((!((map__14479 == null)))?((((map__14479.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14479.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14479):map__14479);
var max_len = cljs.core.get.call(null,map__14479__$1,new cljs.core.Keyword(null,"max-len","max-len",-18846016));
var end_idx = cljs.core.get.call(null,map__14479__$1,new cljs.core.Keyword(null,"end-idx","end-idx",-85750788));
var start_idx__$1 = start_idx;
var xlen = cljs.core.count.call(null,x);
var start_idx_STAR_ = taoensso.encore.translate_signed_idx.call(null,start_idx__$1,xlen);
var end_idx_STAR_ = cljs.core.long$.call(null,(cljs.core.truth_(max_len)?(function (){var n1__7171__auto__ = (start_idx_STAR_ + max_len);
var n2__7172__auto__ = xlen;
if((n1__7171__auto__ > n2__7172__auto__)){
return n2__7172__auto__;
} else {
return n1__7171__auto__;
}
})():(cljs.core.truth_(end_idx)?(taoensso.encore.translate_signed_idx.call(null,end_idx,xlen) + (1)):xlen)));
if((start_idx_STAR_ > end_idx_STAR_)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [start_idx_STAR_,end_idx_STAR_], null);
}
});

taoensso.encore.sub_indexes.cljs$lang$maxFixedArity = (2);

taoensso.encore.sub_indexes.cljs$lang$applyTo = (function (seq14475){
var G__14476 = cljs.core.first.call(null,seq14475);
var seq14475__$1 = cljs.core.next.call(null,seq14475);
var G__14477 = cljs.core.first.call(null,seq14475__$1);
var seq14475__$2 = cljs.core.next.call(null,seq14475__$1);
return taoensso.encore.sub_indexes.cljs$core$IFn$_invoke$arity$variadic(G__14476,G__14477,seq14475__$2);
});


/**
 * Deprecated, prefer `?substr<idx` or `?substr<len`
 */
taoensso.encore.substr = (function taoensso$encore$substr(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14555 = arguments.length;
var i__27349__auto___14556 = (0);
while(true){
if((i__27349__auto___14556 < len__27348__auto___14555)){
args__27351__auto__.push((arguments[i__27349__auto___14556]));

var G__14557 = (i__27349__auto___14556 + (1));
i__27349__auto___14556 = G__14557;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((2) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((2)),(0),null)):null);
return taoensso.encore.substr.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27352__auto__);
});

taoensso.encore.substr.cljs$core$IFn$_invoke$arity$variadic = (function (s,start_idx,p__14484){
var vec__14485 = p__14484;
var _QMARK_max_len = cljs.core.nth.call(null,vec__14485,(0),null);
var vec__14488 = taoensso.encore.sub_indexes.call(null,s,start_idx,new cljs.core.Keyword(null,"max-len","max-len",-18846016),_QMARK_max_len);
var start_idx_STAR_ = cljs.core.nth.call(null,vec__14488,(0),null);
var end_idx_STAR_ = cljs.core.nth.call(null,vec__14488,(1),null);
return s.substring(start_idx_STAR_,end_idx_STAR_);
});

taoensso.encore.substr.cljs$lang$maxFixedArity = (2);

taoensso.encore.substr.cljs$lang$applyTo = (function (seq14481){
var G__14482 = cljs.core.first.call(null,seq14481);
var seq14481__$1 = cljs.core.next.call(null,seq14481);
var G__14483 = cljs.core.first.call(null,seq14481__$1);
var seq14481__$2 = cljs.core.next.call(null,seq14481__$1);
return taoensso.encore.substr.cljs$core$IFn$_invoke$arity$variadic(G__14482,G__14483,seq14481__$2);
});



/**
 * Deprecated, prefer `?subvec<idx` or `?subvec<len`
 */
taoensso.encore.subvec_STAR_ = (function taoensso$encore$subvec_STAR_(var_args){
var args__27351__auto__ = [];
var len__27348__auto___14558 = arguments.length;
var i__27349__auto___14559 = (0);
while(true){
if((i__27349__auto___14559 < len__27348__auto___14558)){
args__27351__auto__.push((arguments[i__27349__auto___14559]));

var G__14560 = (i__27349__auto___14559 + (1));
i__27349__auto___14559 = G__14560;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((2) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((2)),(0),null)):null);
return taoensso.encore.subvec_STAR_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27352__auto__);
});

taoensso.encore.subvec_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (v,start_idx,p__14494){
var vec__14495 = p__14494;
var _QMARK_max_len = cljs.core.nth.call(null,vec__14495,(0),null);
var vec__14498 = taoensso.encore.sub_indexes.call(null,v,start_idx,new cljs.core.Keyword(null,"max-len","max-len",-18846016),_QMARK_max_len);
var start_idx_STAR_ = cljs.core.nth.call(null,vec__14498,(0),null);
var end_idx_STAR_ = cljs.core.nth.call(null,vec__14498,(1),null);
return cljs.core.subvec.call(null,v,start_idx_STAR_,end_idx_STAR_);
});

taoensso.encore.subvec_STAR_.cljs$lang$maxFixedArity = (2);

taoensso.encore.subvec_STAR_.cljs$lang$applyTo = (function (seq14491){
var G__14492 = cljs.core.first.call(null,seq14491);
var seq14491__$1 = cljs.core.next.call(null,seq14491);
var G__14493 = cljs.core.first.call(null,seq14491__$1);
var seq14491__$2 = cljs.core.next.call(null,seq14491__$1);
return taoensso.encore.subvec_STAR_.cljs$core$IFn$_invoke$arity$variadic(G__14492,G__14493,seq14491__$2);
});



//# sourceMappingURL=encore.js.map?rel=1468744502345