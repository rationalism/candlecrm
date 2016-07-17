// Compiled by ClojureScript 1.9.93 {}
goog.provide('cljs.spec.impl.gen');
goog.require('cljs.core');
goog.require('cljs.core');

/**
* @constructor
 * @implements {cljs.core.IDeref}
*/
cljs.spec.impl.gen.LazyVar = (function (f,cached){
this.f = f;
this.cached = cached;
this.cljs$lang$protocol_mask$partition0$ = 32768;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.impl.gen.LazyVar.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(!((self__.cached == null))){
return self__.cached;
} else {
var x = self__.f.call(null);
if((x == null)){
} else {
self__.cached = x;
}

return x;
}
});

cljs.spec.impl.gen.LazyVar.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),cljs.core.with_meta(new cljs.core.Symbol(null,"cached","cached",-1216707864,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
});

cljs.spec.impl.gen.LazyVar.cljs$lang$type = true;

cljs.spec.impl.gen.LazyVar.cljs$lang$ctorStr = "cljs.spec.impl.gen/LazyVar";

cljs.spec.impl.gen.LazyVar.cljs$lang$ctorPrWriter = (function (this__27047__auto__,writer__27048__auto__,opt__27049__auto__){
return cljs.core._write.call(null,writer__27048__auto__,"cljs.spec.impl.gen/LazyVar");
});

cljs.spec.impl.gen.__GT_LazyVar = (function cljs$spec$impl$gen$__GT_LazyVar(f,cached){
return (new cljs.spec.impl.gen.LazyVar(f,cached));
});

cljs.spec.impl.gen.quick_check_ref = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check.quick_check !== 'undefined')){
return clojure.test.check.quick_check;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check","quick-check","clojure.test.check/quick-check",-810344251,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check","quick-check","clojure.test.check/quick-check",-810344251,null))),cljs.core.str(" never required")].join('')));
}
}),null));
cljs.spec.impl.gen.quick_check = (function cljs$spec$impl$gen$quick_check(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17416 = arguments.length;
var i__27349__auto___17417 = (0);
while(true){
if((i__27349__auto___17417 < len__27348__auto___17416)){
args__27351__auto__.push((arguments[i__27349__auto___17417]));

var G__17418 = (i__27349__auto___17417 + (1));
i__27349__auto___17417 = G__17418;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,cljs.spec.impl.gen.quick_check_ref),args);
});

cljs.spec.impl.gen.quick_check.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.quick_check.cljs$lang$applyTo = (function (seq17415){
return cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17415));
});

cljs.spec.impl.gen.for_all_STAR__ref = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.properties.for_all_STAR_ !== 'undefined')){
return clojure.test.check.properties.for_all_STAR_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.properties","for-all*","clojure.test.check.properties/for-all*",67088845,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.properties","for-all*","clojure.test.check.properties/for-all*",67088845,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Dynamically loaded clojure.test.check.properties/for-all*.
 */
cljs.spec.impl.gen.for_all_STAR_ = (function cljs$spec$impl$gen$for_all_STAR_(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17420 = arguments.length;
var i__27349__auto___17421 = (0);
while(true){
if((i__27349__auto___17421 < len__27348__auto___17420)){
args__27351__auto__.push((arguments[i__27349__auto___17421]));

var G__17422 = (i__27349__auto___17421 + (1));
i__27349__auto___17421 = G__17422;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,cljs.spec.impl.gen.for_all_STAR__ref),args);
});

cljs.spec.impl.gen.for_all_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.for_all_STAR_.cljs$lang$applyTo = (function (seq17419){
return cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17419));
});

var g_QMARK__17423 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.generator_QMARK_ !== 'undefined')){
return clojure.test.check.generators.generator_QMARK_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","generator?","clojure.test.check.generators/generator?",-1378210460,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","generator?","clojure.test.check.generators/generator?",-1378210460,null))),cljs.core.str(" never required")].join('')));
}
}),null));
var g_17424 = (new cljs.spec.impl.gen.LazyVar(((function (g_QMARK__17423){
return (function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.generate !== 'undefined')){
return clojure.test.check.generators.generate;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","generate","clojure.test.check.generators/generate",-690390711,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","generate","clojure.test.check.generators/generate",-690390711,null))),cljs.core.str(" never required")].join('')));
}
});})(g_QMARK__17423))
,null));
var mkg_17425 = (new cljs.spec.impl.gen.LazyVar(((function (g_QMARK__17423,g_17424){
return (function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.__GT_Generator !== 'undefined')){
return clojure.test.check.generators.__GT_Generator;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","->Generator","clojure.test.check.generators/->Generator",-1179475051,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","->Generator","clojure.test.check.generators/->Generator",-1179475051,null))),cljs.core.str(" never required")].join('')));
}
});})(g_QMARK__17423,g_17424))
,null));
cljs.spec.impl.gen.generator_QMARK_ = ((function (g_QMARK__17423,g_17424,mkg_17425){
return (function cljs$spec$impl$gen$generator_QMARK_(x){
return cljs.core.deref.call(null,g_QMARK__17423).call(null,x);
});})(g_QMARK__17423,g_17424,mkg_17425))
;

cljs.spec.impl.gen.generator = ((function (g_QMARK__17423,g_17424,mkg_17425){
return (function cljs$spec$impl$gen$generator(gfn){
return cljs.core.deref.call(null,mkg_17425).call(null,gfn);
});})(g_QMARK__17423,g_17424,mkg_17425))
;

/**
 * Generate a single value using generator.
 */
cljs.spec.impl.gen.generate = ((function (g_QMARK__17423,g_17424,mkg_17425){
return (function cljs$spec$impl$gen$generate(generator){
return cljs.core.deref.call(null,g_17424).call(null,generator);
});})(g_QMARK__17423,g_17424,mkg_17425))
;
cljs.spec.impl.gen.delay_impl = (function cljs$spec$impl$gen$delay_impl(gfnd){
return cljs.spec.impl.gen.generator.call(null,(function (rnd,size){
return new cljs.core.Keyword(null,"gen","gen",142575302).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,gfnd)).call(null,rnd,size);
}));
});
var g__17387__auto___17443 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.hash_map !== 'undefined')){
return clojure.test.check.generators.hash_map;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","hash-map","clojure.test.check.generators/hash-map",1961346626,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","hash-map","clojure.test.check.generators/hash-map",1961346626,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/hash-map
 */
cljs.spec.impl.gen.hash_map = ((function (g__17387__auto___17443){
return (function cljs$spec$impl$gen$hash_map(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17444 = arguments.length;
var i__27349__auto___17445 = (0);
while(true){
if((i__27349__auto___17445 < len__27348__auto___17444)){
args__27351__auto__.push((arguments[i__27349__auto___17445]));

var G__17446 = (i__27349__auto___17445 + (1));
i__27349__auto___17445 = G__17446;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.hash_map.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17443))
;

cljs.spec.impl.gen.hash_map.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17443){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17443),args);
});})(g__17387__auto___17443))
;

cljs.spec.impl.gen.hash_map.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.hash_map.cljs$lang$applyTo = ((function (g__17387__auto___17443){
return (function (seq17426){
return cljs.spec.impl.gen.hash_map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17426));
});})(g__17387__auto___17443))
;


var g__17387__auto___17447 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.list !== 'undefined')){
return clojure.test.check.generators.list;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","list","clojure.test.check.generators/list",506971058,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","list","clojure.test.check.generators/list",506971058,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/list
 */
cljs.spec.impl.gen.list = ((function (g__17387__auto___17447){
return (function cljs$spec$impl$gen$list(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17448 = arguments.length;
var i__27349__auto___17449 = (0);
while(true){
if((i__27349__auto___17449 < len__27348__auto___17448)){
args__27351__auto__.push((arguments[i__27349__auto___17449]));

var G__17450 = (i__27349__auto___17449 + (1));
i__27349__auto___17449 = G__17450;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17447))
;

cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17447){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17447),args);
});})(g__17387__auto___17447))
;

cljs.spec.impl.gen.list.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.list.cljs$lang$applyTo = ((function (g__17387__auto___17447){
return (function (seq17427){
return cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17427));
});})(g__17387__auto___17447))
;


var g__17387__auto___17451 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.map !== 'undefined')){
return clojure.test.check.generators.map;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","map","clojure.test.check.generators/map",45738796,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","map","clojure.test.check.generators/map",45738796,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/map
 */
cljs.spec.impl.gen.map = ((function (g__17387__auto___17451){
return (function cljs$spec$impl$gen$map(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17452 = arguments.length;
var i__27349__auto___17453 = (0);
while(true){
if((i__27349__auto___17453 < len__27348__auto___17452)){
args__27351__auto__.push((arguments[i__27349__auto___17453]));

var G__17454 = (i__27349__auto___17453 + (1));
i__27349__auto___17453 = G__17454;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17451))
;

cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17451){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17451),args);
});})(g__17387__auto___17451))
;

cljs.spec.impl.gen.map.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.map.cljs$lang$applyTo = ((function (g__17387__auto___17451){
return (function (seq17428){
return cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17428));
});})(g__17387__auto___17451))
;


var g__17387__auto___17455 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.not_empty !== 'undefined')){
return clojure.test.check.generators.not_empty;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","not-empty","clojure.test.check.generators/not-empty",-876211682,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","not-empty","clojure.test.check.generators/not-empty",-876211682,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/not-empty
 */
cljs.spec.impl.gen.not_empty = ((function (g__17387__auto___17455){
return (function cljs$spec$impl$gen$not_empty(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17456 = arguments.length;
var i__27349__auto___17457 = (0);
while(true){
if((i__27349__auto___17457 < len__27348__auto___17456)){
args__27351__auto__.push((arguments[i__27349__auto___17457]));

var G__17458 = (i__27349__auto___17457 + (1));
i__27349__auto___17457 = G__17458;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.not_empty.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17455))
;

cljs.spec.impl.gen.not_empty.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17455){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17455),args);
});})(g__17387__auto___17455))
;

cljs.spec.impl.gen.not_empty.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.not_empty.cljs$lang$applyTo = ((function (g__17387__auto___17455){
return (function (seq17429){
return cljs.spec.impl.gen.not_empty.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17429));
});})(g__17387__auto___17455))
;


var g__17387__auto___17459 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.set !== 'undefined')){
return clojure.test.check.generators.set;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","set","clojure.test.check.generators/set",-1027639543,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","set","clojure.test.check.generators/set",-1027639543,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/set
 */
cljs.spec.impl.gen.set = ((function (g__17387__auto___17459){
return (function cljs$spec$impl$gen$set(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17460 = arguments.length;
var i__27349__auto___17461 = (0);
while(true){
if((i__27349__auto___17461 < len__27348__auto___17460)){
args__27351__auto__.push((arguments[i__27349__auto___17461]));

var G__17462 = (i__27349__auto___17461 + (1));
i__27349__auto___17461 = G__17462;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17459))
;

cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17459){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17459),args);
});})(g__17387__auto___17459))
;

cljs.spec.impl.gen.set.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.set.cljs$lang$applyTo = ((function (g__17387__auto___17459){
return (function (seq17430){
return cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17430));
});})(g__17387__auto___17459))
;


var g__17387__auto___17463 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.vector !== 'undefined')){
return clojure.test.check.generators.vector;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","vector","clojure.test.check.generators/vector",1081775325,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","vector","clojure.test.check.generators/vector",1081775325,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/vector
 */
cljs.spec.impl.gen.vector = ((function (g__17387__auto___17463){
return (function cljs$spec$impl$gen$vector(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17464 = arguments.length;
var i__27349__auto___17465 = (0);
while(true){
if((i__27349__auto___17465 < len__27348__auto___17464)){
args__27351__auto__.push((arguments[i__27349__auto___17465]));

var G__17466 = (i__27349__auto___17465 + (1));
i__27349__auto___17465 = G__17466;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17463))
;

cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17463){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17463),args);
});})(g__17387__auto___17463))
;

cljs.spec.impl.gen.vector.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.vector.cljs$lang$applyTo = ((function (g__17387__auto___17463){
return (function (seq17431){
return cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17431));
});})(g__17387__auto___17463))
;


var g__17387__auto___17467 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.vector_distinct !== 'undefined')){
return clojure.test.check.generators.vector_distinct;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","vector-distinct","clojure.test.check.generators/vector-distinct",1656877834,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","vector-distinct","clojure.test.check.generators/vector-distinct",1656877834,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/vector-distinct
 */
cljs.spec.impl.gen.vector_distinct = ((function (g__17387__auto___17467){
return (function cljs$spec$impl$gen$vector_distinct(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17468 = arguments.length;
var i__27349__auto___17469 = (0);
while(true){
if((i__27349__auto___17469 < len__27348__auto___17468)){
args__27351__auto__.push((arguments[i__27349__auto___17469]));

var G__17470 = (i__27349__auto___17469 + (1));
i__27349__auto___17469 = G__17470;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17467))
;

cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17467){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17467),args);
});})(g__17387__auto___17467))
;

cljs.spec.impl.gen.vector_distinct.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.vector_distinct.cljs$lang$applyTo = ((function (g__17387__auto___17467){
return (function (seq17432){
return cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17432));
});})(g__17387__auto___17467))
;


var g__17387__auto___17471 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.fmap !== 'undefined')){
return clojure.test.check.generators.fmap;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","fmap","clojure.test.check.generators/fmap",1957997092,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","fmap","clojure.test.check.generators/fmap",1957997092,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/fmap
 */
cljs.spec.impl.gen.fmap = ((function (g__17387__auto___17471){
return (function cljs$spec$impl$gen$fmap(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17472 = arguments.length;
var i__27349__auto___17473 = (0);
while(true){
if((i__27349__auto___17473 < len__27348__auto___17472)){
args__27351__auto__.push((arguments[i__27349__auto___17473]));

var G__17474 = (i__27349__auto___17473 + (1));
i__27349__auto___17473 = G__17474;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17471))
;

cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17471){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17471),args);
});})(g__17387__auto___17471))
;

cljs.spec.impl.gen.fmap.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.fmap.cljs$lang$applyTo = ((function (g__17387__auto___17471){
return (function (seq17433){
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17433));
});})(g__17387__auto___17471))
;


var g__17387__auto___17475 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.elements !== 'undefined')){
return clojure.test.check.generators.elements;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","elements","clojure.test.check.generators/elements",438991326,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","elements","clojure.test.check.generators/elements",438991326,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/elements
 */
cljs.spec.impl.gen.elements = ((function (g__17387__auto___17475){
return (function cljs$spec$impl$gen$elements(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17476 = arguments.length;
var i__27349__auto___17477 = (0);
while(true){
if((i__27349__auto___17477 < len__27348__auto___17476)){
args__27351__auto__.push((arguments[i__27349__auto___17477]));

var G__17478 = (i__27349__auto___17477 + (1));
i__27349__auto___17477 = G__17478;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17475))
;

cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17475){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17475),args);
});})(g__17387__auto___17475))
;

cljs.spec.impl.gen.elements.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.elements.cljs$lang$applyTo = ((function (g__17387__auto___17475){
return (function (seq17434){
return cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17434));
});})(g__17387__auto___17475))
;


var g__17387__auto___17479 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.bind !== 'undefined')){
return clojure.test.check.generators.bind;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","bind","clojure.test.check.generators/bind",-361313906,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","bind","clojure.test.check.generators/bind",-361313906,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/bind
 */
cljs.spec.impl.gen.bind = ((function (g__17387__auto___17479){
return (function cljs$spec$impl$gen$bind(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17480 = arguments.length;
var i__27349__auto___17481 = (0);
while(true){
if((i__27349__auto___17481 < len__27348__auto___17480)){
args__27351__auto__.push((arguments[i__27349__auto___17481]));

var G__17482 = (i__27349__auto___17481 + (1));
i__27349__auto___17481 = G__17482;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17479))
;

cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17479){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17479),args);
});})(g__17387__auto___17479))
;

cljs.spec.impl.gen.bind.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.bind.cljs$lang$applyTo = ((function (g__17387__auto___17479){
return (function (seq17435){
return cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17435));
});})(g__17387__auto___17479))
;


var g__17387__auto___17483 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.choose !== 'undefined')){
return clojure.test.check.generators.choose;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","choose","clojure.test.check.generators/choose",909997832,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","choose","clojure.test.check.generators/choose",909997832,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/choose
 */
cljs.spec.impl.gen.choose = ((function (g__17387__auto___17483){
return (function cljs$spec$impl$gen$choose(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17484 = arguments.length;
var i__27349__auto___17485 = (0);
while(true){
if((i__27349__auto___17485 < len__27348__auto___17484)){
args__27351__auto__.push((arguments[i__27349__auto___17485]));

var G__17486 = (i__27349__auto___17485 + (1));
i__27349__auto___17485 = G__17486;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17483))
;

cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17483){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17483),args);
});})(g__17387__auto___17483))
;

cljs.spec.impl.gen.choose.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.choose.cljs$lang$applyTo = ((function (g__17387__auto___17483){
return (function (seq17436){
return cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17436));
});})(g__17387__auto___17483))
;


var g__17387__auto___17487 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.one_of !== 'undefined')){
return clojure.test.check.generators.one_of;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","one-of","clojure.test.check.generators/one-of",-183339191,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","one-of","clojure.test.check.generators/one-of",-183339191,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/one-of
 */
cljs.spec.impl.gen.one_of = ((function (g__17387__auto___17487){
return (function cljs$spec$impl$gen$one_of(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17488 = arguments.length;
var i__27349__auto___17489 = (0);
while(true){
if((i__27349__auto___17489 < len__27348__auto___17488)){
args__27351__auto__.push((arguments[i__27349__auto___17489]));

var G__17490 = (i__27349__auto___17489 + (1));
i__27349__auto___17489 = G__17490;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17487))
;

cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17487){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17487),args);
});})(g__17387__auto___17487))
;

cljs.spec.impl.gen.one_of.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.one_of.cljs$lang$applyTo = ((function (g__17387__auto___17487){
return (function (seq17437){
return cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17437));
});})(g__17387__auto___17487))
;


var g__17387__auto___17491 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.such_that !== 'undefined')){
return clojure.test.check.generators.such_that;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","such-that","clojure.test.check.generators/such-that",-1754178732,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","such-that","clojure.test.check.generators/such-that",-1754178732,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/such-that
 */
cljs.spec.impl.gen.such_that = ((function (g__17387__auto___17491){
return (function cljs$spec$impl$gen$such_that(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17492 = arguments.length;
var i__27349__auto___17493 = (0);
while(true){
if((i__27349__auto___17493 < len__27348__auto___17492)){
args__27351__auto__.push((arguments[i__27349__auto___17493]));

var G__17494 = (i__27349__auto___17493 + (1));
i__27349__auto___17493 = G__17494;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17491))
;

cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17491){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17491),args);
});})(g__17387__auto___17491))
;

cljs.spec.impl.gen.such_that.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.such_that.cljs$lang$applyTo = ((function (g__17387__auto___17491){
return (function (seq17438){
return cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17438));
});})(g__17387__auto___17491))
;


var g__17387__auto___17495 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.tuple !== 'undefined')){
return clojure.test.check.generators.tuple;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","tuple","clojure.test.check.generators/tuple",-143711557,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","tuple","clojure.test.check.generators/tuple",-143711557,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/tuple
 */
cljs.spec.impl.gen.tuple = ((function (g__17387__auto___17495){
return (function cljs$spec$impl$gen$tuple(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17496 = arguments.length;
var i__27349__auto___17497 = (0);
while(true){
if((i__27349__auto___17497 < len__27348__auto___17496)){
args__27351__auto__.push((arguments[i__27349__auto___17497]));

var G__17498 = (i__27349__auto___17497 + (1));
i__27349__auto___17497 = G__17498;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17495))
;

cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17495){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17495),args);
});})(g__17387__auto___17495))
;

cljs.spec.impl.gen.tuple.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.tuple.cljs$lang$applyTo = ((function (g__17387__auto___17495){
return (function (seq17439){
return cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17439));
});})(g__17387__auto___17495))
;


var g__17387__auto___17499 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.sample !== 'undefined')){
return clojure.test.check.generators.sample;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","sample","clojure.test.check.generators/sample",-382944992,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","sample","clojure.test.check.generators/sample",-382944992,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/sample
 */
cljs.spec.impl.gen.sample = ((function (g__17387__auto___17499){
return (function cljs$spec$impl$gen$sample(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17500 = arguments.length;
var i__27349__auto___17501 = (0);
while(true){
if((i__27349__auto___17501 < len__27348__auto___17500)){
args__27351__auto__.push((arguments[i__27349__auto___17501]));

var G__17502 = (i__27349__auto___17501 + (1));
i__27349__auto___17501 = G__17502;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17499))
;

cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17499){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17499),args);
});})(g__17387__auto___17499))
;

cljs.spec.impl.gen.sample.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.sample.cljs$lang$applyTo = ((function (g__17387__auto___17499){
return (function (seq17440){
return cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17440));
});})(g__17387__auto___17499))
;


var g__17387__auto___17503 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.return$ !== 'undefined')){
return clojure.test.check.generators.return$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","return","clojure.test.check.generators/return",1744522038,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","return","clojure.test.check.generators/return",1744522038,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/return
 */
cljs.spec.impl.gen.return$ = ((function (g__17387__auto___17503){
return (function cljs$spec$impl$gen$return(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17504 = arguments.length;
var i__27349__auto___17505 = (0);
while(true){
if((i__27349__auto___17505 < len__27348__auto___17504)){
args__27351__auto__.push((arguments[i__27349__auto___17505]));

var G__17506 = (i__27349__auto___17505 + (1));
i__27349__auto___17505 = G__17506;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17503))
;

cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17503){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17503),args);
});})(g__17387__auto___17503))
;

cljs.spec.impl.gen.return$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.return$.cljs$lang$applyTo = ((function (g__17387__auto___17503){
return (function (seq17441){
return cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17441));
});})(g__17387__auto___17503))
;


var g__17387__auto___17507 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.large_integer_STAR_ !== 'undefined')){
return clojure.test.check.generators.large_integer_STAR_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","large-integer*","clojure.test.check.generators/large-integer*",-437830670,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","large-integer*","clojure.test.check.generators/large-integer*",-437830670,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/large-integer*
 */
cljs.spec.impl.gen.large_integer_STAR_ = ((function (g__17387__auto___17507){
return (function cljs$spec$impl$gen$large_integer_STAR_(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17508 = arguments.length;
var i__27349__auto___17509 = (0);
while(true){
if((i__27349__auto___17509 < len__27348__auto___17508)){
args__27351__auto__.push((arguments[i__27349__auto___17509]));

var G__17510 = (i__27349__auto___17509 + (1));
i__27349__auto___17509 = G__17510;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17387__auto___17507))
;

cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17387__auto___17507){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__17387__auto___17507),args);
});})(g__17387__auto___17507))
;

cljs.spec.impl.gen.large_integer_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.large_integer_STAR_.cljs$lang$applyTo = ((function (g__17387__auto___17507){
return (function (seq17442){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17442));
});})(g__17387__auto___17507))
;

var g__17400__auto___17532 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.any !== 'undefined')){
return clojure.test.check.generators.any;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","any","clojure.test.check.generators/any",1883743710,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","any","clojure.test.check.generators/any",1883743710,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/any
 */
cljs.spec.impl.gen.any = ((function (g__17400__auto___17532){
return (function cljs$spec$impl$gen$any(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17533 = arguments.length;
var i__27349__auto___17534 = (0);
while(true){
if((i__27349__auto___17534 < len__27348__auto___17533)){
args__27351__auto__.push((arguments[i__27349__auto___17534]));

var G__17535 = (i__27349__auto___17534 + (1));
i__27349__auto___17534 = G__17535;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.any.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17532))
;

cljs.spec.impl.gen.any.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17532){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17532);
});})(g__17400__auto___17532))
;

cljs.spec.impl.gen.any.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.any.cljs$lang$applyTo = ((function (g__17400__auto___17532){
return (function (seq17511){
return cljs.spec.impl.gen.any.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17511));
});})(g__17400__auto___17532))
;


var g__17400__auto___17536 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.any_printable !== 'undefined')){
return clojure.test.check.generators.any_printable;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","any-printable","clojure.test.check.generators/any-printable",-1570493991,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","any-printable","clojure.test.check.generators/any-printable",-1570493991,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/any-printable
 */
cljs.spec.impl.gen.any_printable = ((function (g__17400__auto___17536){
return (function cljs$spec$impl$gen$any_printable(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17537 = arguments.length;
var i__27349__auto___17538 = (0);
while(true){
if((i__27349__auto___17538 < len__27348__auto___17537)){
args__27351__auto__.push((arguments[i__27349__auto___17538]));

var G__17539 = (i__27349__auto___17538 + (1));
i__27349__auto___17538 = G__17539;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.any_printable.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17536))
;

cljs.spec.impl.gen.any_printable.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17536){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17536);
});})(g__17400__auto___17536))
;

cljs.spec.impl.gen.any_printable.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.any_printable.cljs$lang$applyTo = ((function (g__17400__auto___17536){
return (function (seq17512){
return cljs.spec.impl.gen.any_printable.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17512));
});})(g__17400__auto___17536))
;


var g__17400__auto___17540 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.boolean$ !== 'undefined')){
return clojure.test.check.generators.boolean$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","boolean","clojure.test.check.generators/boolean",1586992347,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","boolean","clojure.test.check.generators/boolean",1586992347,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/boolean
 */
cljs.spec.impl.gen.boolean$ = ((function (g__17400__auto___17540){
return (function cljs$spec$impl$gen$boolean(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17541 = arguments.length;
var i__27349__auto___17542 = (0);
while(true){
if((i__27349__auto___17542 < len__27348__auto___17541)){
args__27351__auto__.push((arguments[i__27349__auto___17542]));

var G__17543 = (i__27349__auto___17542 + (1));
i__27349__auto___17542 = G__17543;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.boolean$.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17540))
;

cljs.spec.impl.gen.boolean$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17540){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17540);
});})(g__17400__auto___17540))
;

cljs.spec.impl.gen.boolean$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.boolean$.cljs$lang$applyTo = ((function (g__17400__auto___17540){
return (function (seq17513){
return cljs.spec.impl.gen.boolean$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17513));
});})(g__17400__auto___17540))
;


var g__17400__auto___17544 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char$ !== 'undefined')){
return clojure.test.check.generators.char$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","char","clojure.test.check.generators/char",-1426343459,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","char","clojure.test.check.generators/char",-1426343459,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char
 */
cljs.spec.impl.gen.char$ = ((function (g__17400__auto___17544){
return (function cljs$spec$impl$gen$char(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17545 = arguments.length;
var i__27349__auto___17546 = (0);
while(true){
if((i__27349__auto___17546 < len__27348__auto___17545)){
args__27351__auto__.push((arguments[i__27349__auto___17546]));

var G__17547 = (i__27349__auto___17546 + (1));
i__27349__auto___17546 = G__17547;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char$.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17544))
;

cljs.spec.impl.gen.char$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17544){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17544);
});})(g__17400__auto___17544))
;

cljs.spec.impl.gen.char$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char$.cljs$lang$applyTo = ((function (g__17400__auto___17544){
return (function (seq17514){
return cljs.spec.impl.gen.char$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17514));
});})(g__17400__auto___17544))
;


var g__17400__auto___17548 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_alpha !== 'undefined')){
return clojure.test.check.generators.char_alpha;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","char-alpha","clojure.test.check.generators/char-alpha",615785796,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","char-alpha","clojure.test.check.generators/char-alpha",615785796,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-alpha
 */
cljs.spec.impl.gen.char_alpha = ((function (g__17400__auto___17548){
return (function cljs$spec$impl$gen$char_alpha(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17549 = arguments.length;
var i__27349__auto___17550 = (0);
while(true){
if((i__27349__auto___17550 < len__27348__auto___17549)){
args__27351__auto__.push((arguments[i__27349__auto___17550]));

var G__17551 = (i__27349__auto___17550 + (1));
i__27349__auto___17550 = G__17551;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char_alpha.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17548))
;

cljs.spec.impl.gen.char_alpha.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17548){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17548);
});})(g__17400__auto___17548))
;

cljs.spec.impl.gen.char_alpha.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char_alpha.cljs$lang$applyTo = ((function (g__17400__auto___17548){
return (function (seq17515){
return cljs.spec.impl.gen.char_alpha.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17515));
});})(g__17400__auto___17548))
;


var g__17400__auto___17552 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_alphanumeric !== 'undefined')){
return clojure.test.check.generators.char_alphanumeric;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","char-alphanumeric","clojure.test.check.generators/char-alphanumeric",1383091431,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","char-alphanumeric","clojure.test.check.generators/char-alphanumeric",1383091431,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-alphanumeric
 */
cljs.spec.impl.gen.char_alphanumeric = ((function (g__17400__auto___17552){
return (function cljs$spec$impl$gen$char_alphanumeric(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17553 = arguments.length;
var i__27349__auto___17554 = (0);
while(true){
if((i__27349__auto___17554 < len__27348__auto___17553)){
args__27351__auto__.push((arguments[i__27349__auto___17554]));

var G__17555 = (i__27349__auto___17554 + (1));
i__27349__auto___17554 = G__17555;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17552))
;

cljs.spec.impl.gen.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17552){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17552);
});})(g__17400__auto___17552))
;

cljs.spec.impl.gen.char_alphanumeric.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char_alphanumeric.cljs$lang$applyTo = ((function (g__17400__auto___17552){
return (function (seq17516){
return cljs.spec.impl.gen.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17516));
});})(g__17400__auto___17552))
;


var g__17400__auto___17556 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_ascii !== 'undefined')){
return clojure.test.check.generators.char_ascii;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","char-ascii","clojure.test.check.generators/char-ascii",-899908538,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","char-ascii","clojure.test.check.generators/char-ascii",-899908538,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-ascii
 */
cljs.spec.impl.gen.char_ascii = ((function (g__17400__auto___17556){
return (function cljs$spec$impl$gen$char_ascii(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17557 = arguments.length;
var i__27349__auto___17558 = (0);
while(true){
if((i__27349__auto___17558 < len__27348__auto___17557)){
args__27351__auto__.push((arguments[i__27349__auto___17558]));

var G__17559 = (i__27349__auto___17558 + (1));
i__27349__auto___17558 = G__17559;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char_ascii.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17556))
;

cljs.spec.impl.gen.char_ascii.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17556){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17556);
});})(g__17400__auto___17556))
;

cljs.spec.impl.gen.char_ascii.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char_ascii.cljs$lang$applyTo = ((function (g__17400__auto___17556){
return (function (seq17517){
return cljs.spec.impl.gen.char_ascii.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17517));
});})(g__17400__auto___17556))
;


var g__17400__auto___17560 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.double$ !== 'undefined')){
return clojure.test.check.generators.double$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","double","clojure.test.check.generators/double",668331090,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","double","clojure.test.check.generators/double",668331090,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/double
 */
cljs.spec.impl.gen.double$ = ((function (g__17400__auto___17560){
return (function cljs$spec$impl$gen$double(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17561 = arguments.length;
var i__27349__auto___17562 = (0);
while(true){
if((i__27349__auto___17562 < len__27348__auto___17561)){
args__27351__auto__.push((arguments[i__27349__auto___17562]));

var G__17563 = (i__27349__auto___17562 + (1));
i__27349__auto___17562 = G__17563;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.double$.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17560))
;

cljs.spec.impl.gen.double$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17560){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17560);
});})(g__17400__auto___17560))
;

cljs.spec.impl.gen.double$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.double$.cljs$lang$applyTo = ((function (g__17400__auto___17560){
return (function (seq17518){
return cljs.spec.impl.gen.double$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17518));
});})(g__17400__auto___17560))
;


var g__17400__auto___17564 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.int$ !== 'undefined')){
return clojure.test.check.generators.int$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","int","clojure.test.check.generators/int",1756228469,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","int","clojure.test.check.generators/int",1756228469,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/int
 */
cljs.spec.impl.gen.int$ = ((function (g__17400__auto___17564){
return (function cljs$spec$impl$gen$int(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17565 = arguments.length;
var i__27349__auto___17566 = (0);
while(true){
if((i__27349__auto___17566 < len__27348__auto___17565)){
args__27351__auto__.push((arguments[i__27349__auto___17566]));

var G__17567 = (i__27349__auto___17566 + (1));
i__27349__auto___17566 = G__17567;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.int$.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17564))
;

cljs.spec.impl.gen.int$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17564){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17564);
});})(g__17400__auto___17564))
;

cljs.spec.impl.gen.int$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.int$.cljs$lang$applyTo = ((function (g__17400__auto___17564){
return (function (seq17519){
return cljs.spec.impl.gen.int$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17519));
});})(g__17400__auto___17564))
;


var g__17400__auto___17568 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.keyword !== 'undefined')){
return clojure.test.check.generators.keyword;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","keyword","clojure.test.check.generators/keyword",24530530,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","keyword","clojure.test.check.generators/keyword",24530530,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/keyword
 */
cljs.spec.impl.gen.keyword = ((function (g__17400__auto___17568){
return (function cljs$spec$impl$gen$keyword(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17569 = arguments.length;
var i__27349__auto___17570 = (0);
while(true){
if((i__27349__auto___17570 < len__27348__auto___17569)){
args__27351__auto__.push((arguments[i__27349__auto___17570]));

var G__17571 = (i__27349__auto___17570 + (1));
i__27349__auto___17570 = G__17571;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.keyword.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17568))
;

cljs.spec.impl.gen.keyword.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17568){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17568);
});})(g__17400__auto___17568))
;

cljs.spec.impl.gen.keyword.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.keyword.cljs$lang$applyTo = ((function (g__17400__auto___17568){
return (function (seq17520){
return cljs.spec.impl.gen.keyword.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17520));
});})(g__17400__auto___17568))
;


var g__17400__auto___17572 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.keyword_ns !== 'undefined')){
return clojure.test.check.generators.keyword_ns;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","keyword-ns","clojure.test.check.generators/keyword-ns",-1492628482,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","keyword-ns","clojure.test.check.generators/keyword-ns",-1492628482,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/keyword-ns
 */
cljs.spec.impl.gen.keyword_ns = ((function (g__17400__auto___17572){
return (function cljs$spec$impl$gen$keyword_ns(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17573 = arguments.length;
var i__27349__auto___17574 = (0);
while(true){
if((i__27349__auto___17574 < len__27348__auto___17573)){
args__27351__auto__.push((arguments[i__27349__auto___17574]));

var G__17575 = (i__27349__auto___17574 + (1));
i__27349__auto___17574 = G__17575;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.keyword_ns.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17572))
;

cljs.spec.impl.gen.keyword_ns.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17572){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17572);
});})(g__17400__auto___17572))
;

cljs.spec.impl.gen.keyword_ns.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.keyword_ns.cljs$lang$applyTo = ((function (g__17400__auto___17572){
return (function (seq17521){
return cljs.spec.impl.gen.keyword_ns.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17521));
});})(g__17400__auto___17572))
;


var g__17400__auto___17576 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.large_integer !== 'undefined')){
return clojure.test.check.generators.large_integer;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","large-integer","clojure.test.check.generators/large-integer",-865967138,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","large-integer","clojure.test.check.generators/large-integer",-865967138,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/large-integer
 */
cljs.spec.impl.gen.large_integer = ((function (g__17400__auto___17576){
return (function cljs$spec$impl$gen$large_integer(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17577 = arguments.length;
var i__27349__auto___17578 = (0);
while(true){
if((i__27349__auto___17578 < len__27348__auto___17577)){
args__27351__auto__.push((arguments[i__27349__auto___17578]));

var G__17579 = (i__27349__auto___17578 + (1));
i__27349__auto___17578 = G__17579;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.large_integer.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17576))
;

cljs.spec.impl.gen.large_integer.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17576){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17576);
});})(g__17400__auto___17576))
;

cljs.spec.impl.gen.large_integer.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.large_integer.cljs$lang$applyTo = ((function (g__17400__auto___17576){
return (function (seq17522){
return cljs.spec.impl.gen.large_integer.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17522));
});})(g__17400__auto___17576))
;


var g__17400__auto___17580 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.ratio !== 'undefined')){
return clojure.test.check.generators.ratio;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","ratio","clojure.test.check.generators/ratio",1540966915,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","ratio","clojure.test.check.generators/ratio",1540966915,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/ratio
 */
cljs.spec.impl.gen.ratio = ((function (g__17400__auto___17580){
return (function cljs$spec$impl$gen$ratio(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17581 = arguments.length;
var i__27349__auto___17582 = (0);
while(true){
if((i__27349__auto___17582 < len__27348__auto___17581)){
args__27351__auto__.push((arguments[i__27349__auto___17582]));

var G__17583 = (i__27349__auto___17582 + (1));
i__27349__auto___17582 = G__17583;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.ratio.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17580))
;

cljs.spec.impl.gen.ratio.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17580){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17580);
});})(g__17400__auto___17580))
;

cljs.spec.impl.gen.ratio.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.ratio.cljs$lang$applyTo = ((function (g__17400__auto___17580){
return (function (seq17523){
return cljs.spec.impl.gen.ratio.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17523));
});})(g__17400__auto___17580))
;


var g__17400__auto___17584 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.simple_type !== 'undefined')){
return clojure.test.check.generators.simple_type;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","simple-type","clojure.test.check.generators/simple-type",892572284,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","simple-type","clojure.test.check.generators/simple-type",892572284,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/simple-type
 */
cljs.spec.impl.gen.simple_type = ((function (g__17400__auto___17584){
return (function cljs$spec$impl$gen$simple_type(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17585 = arguments.length;
var i__27349__auto___17586 = (0);
while(true){
if((i__27349__auto___17586 < len__27348__auto___17585)){
args__27351__auto__.push((arguments[i__27349__auto___17586]));

var G__17587 = (i__27349__auto___17586 + (1));
i__27349__auto___17586 = G__17587;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.simple_type.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17584))
;

cljs.spec.impl.gen.simple_type.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17584){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17584);
});})(g__17400__auto___17584))
;

cljs.spec.impl.gen.simple_type.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.simple_type.cljs$lang$applyTo = ((function (g__17400__auto___17584){
return (function (seq17524){
return cljs.spec.impl.gen.simple_type.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17524));
});})(g__17400__auto___17584))
;


var g__17400__auto___17588 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.simple_type_printable !== 'undefined')){
return clojure.test.check.generators.simple_type_printable;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","simple-type-printable","clojure.test.check.generators/simple-type-printable",-58489962,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","simple-type-printable","clojure.test.check.generators/simple-type-printable",-58489962,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/simple-type-printable
 */
cljs.spec.impl.gen.simple_type_printable = ((function (g__17400__auto___17588){
return (function cljs$spec$impl$gen$simple_type_printable(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17589 = arguments.length;
var i__27349__auto___17590 = (0);
while(true){
if((i__27349__auto___17590 < len__27348__auto___17589)){
args__27351__auto__.push((arguments[i__27349__auto___17590]));

var G__17591 = (i__27349__auto___17590 + (1));
i__27349__auto___17590 = G__17591;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17588))
;

cljs.spec.impl.gen.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17588){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17588);
});})(g__17400__auto___17588))
;

cljs.spec.impl.gen.simple_type_printable.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.simple_type_printable.cljs$lang$applyTo = ((function (g__17400__auto___17588){
return (function (seq17525){
return cljs.spec.impl.gen.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17525));
});})(g__17400__auto___17588))
;


var g__17400__auto___17592 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string !== 'undefined')){
return clojure.test.check.generators.string;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","string","clojure.test.check.generators/string",-1704750979,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","string","clojure.test.check.generators/string",-1704750979,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string
 */
cljs.spec.impl.gen.string = ((function (g__17400__auto___17592){
return (function cljs$spec$impl$gen$string(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17593 = arguments.length;
var i__27349__auto___17594 = (0);
while(true){
if((i__27349__auto___17594 < len__27348__auto___17593)){
args__27351__auto__.push((arguments[i__27349__auto___17594]));

var G__17595 = (i__27349__auto___17594 + (1));
i__27349__auto___17594 = G__17595;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.string.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17592))
;

cljs.spec.impl.gen.string.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17592){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17592);
});})(g__17400__auto___17592))
;

cljs.spec.impl.gen.string.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.string.cljs$lang$applyTo = ((function (g__17400__auto___17592){
return (function (seq17526){
return cljs.spec.impl.gen.string.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17526));
});})(g__17400__auto___17592))
;


var g__17400__auto___17596 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string_ascii !== 'undefined')){
return clojure.test.check.generators.string_ascii;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","string-ascii","clojure.test.check.generators/string-ascii",-2009877640,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","string-ascii","clojure.test.check.generators/string-ascii",-2009877640,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string-ascii
 */
cljs.spec.impl.gen.string_ascii = ((function (g__17400__auto___17596){
return (function cljs$spec$impl$gen$string_ascii(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17597 = arguments.length;
var i__27349__auto___17598 = (0);
while(true){
if((i__27349__auto___17598 < len__27348__auto___17597)){
args__27351__auto__.push((arguments[i__27349__auto___17598]));

var G__17599 = (i__27349__auto___17598 + (1));
i__27349__auto___17598 = G__17599;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.string_ascii.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17596))
;

cljs.spec.impl.gen.string_ascii.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17596){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17596);
});})(g__17400__auto___17596))
;

cljs.spec.impl.gen.string_ascii.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.string_ascii.cljs$lang$applyTo = ((function (g__17400__auto___17596){
return (function (seq17527){
return cljs.spec.impl.gen.string_ascii.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17527));
});})(g__17400__auto___17596))
;


var g__17400__auto___17600 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string_alphanumeric !== 'undefined')){
return clojure.test.check.generators.string_alphanumeric;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","string-alphanumeric","clojure.test.check.generators/string-alphanumeric",836374939,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","string-alphanumeric","clojure.test.check.generators/string-alphanumeric",836374939,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string-alphanumeric
 */
cljs.spec.impl.gen.string_alphanumeric = ((function (g__17400__auto___17600){
return (function cljs$spec$impl$gen$string_alphanumeric(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17601 = arguments.length;
var i__27349__auto___17602 = (0);
while(true){
if((i__27349__auto___17602 < len__27348__auto___17601)){
args__27351__auto__.push((arguments[i__27349__auto___17602]));

var G__17603 = (i__27349__auto___17602 + (1));
i__27349__auto___17602 = G__17603;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17600))
;

cljs.spec.impl.gen.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17600){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17600);
});})(g__17400__auto___17600))
;

cljs.spec.impl.gen.string_alphanumeric.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.string_alphanumeric.cljs$lang$applyTo = ((function (g__17400__auto___17600){
return (function (seq17528){
return cljs.spec.impl.gen.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17528));
});})(g__17400__auto___17600))
;


var g__17400__auto___17604 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.symbol !== 'undefined')){
return clojure.test.check.generators.symbol;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","symbol","clojure.test.check.generators/symbol",-1305461065,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","symbol","clojure.test.check.generators/symbol",-1305461065,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/symbol
 */
cljs.spec.impl.gen.symbol = ((function (g__17400__auto___17604){
return (function cljs$spec$impl$gen$symbol(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17605 = arguments.length;
var i__27349__auto___17606 = (0);
while(true){
if((i__27349__auto___17606 < len__27348__auto___17605)){
args__27351__auto__.push((arguments[i__27349__auto___17606]));

var G__17607 = (i__27349__auto___17606 + (1));
i__27349__auto___17606 = G__17607;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.symbol.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17604))
;

cljs.spec.impl.gen.symbol.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17604){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17604);
});})(g__17400__auto___17604))
;

cljs.spec.impl.gen.symbol.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.symbol.cljs$lang$applyTo = ((function (g__17400__auto___17604){
return (function (seq17529){
return cljs.spec.impl.gen.symbol.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17529));
});})(g__17400__auto___17604))
;


var g__17400__auto___17608 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.symbol_ns !== 'undefined')){
return clojure.test.check.generators.symbol_ns;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","symbol-ns","clojure.test.check.generators/symbol-ns",-862629490,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","symbol-ns","clojure.test.check.generators/symbol-ns",-862629490,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/symbol-ns
 */
cljs.spec.impl.gen.symbol_ns = ((function (g__17400__auto___17608){
return (function cljs$spec$impl$gen$symbol_ns(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17609 = arguments.length;
var i__27349__auto___17610 = (0);
while(true){
if((i__27349__auto___17610 < len__27348__auto___17609)){
args__27351__auto__.push((arguments[i__27349__auto___17610]));

var G__17611 = (i__27349__auto___17610 + (1));
i__27349__auto___17610 = G__17611;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.symbol_ns.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17608))
;

cljs.spec.impl.gen.symbol_ns.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17608){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17608);
});})(g__17400__auto___17608))
;

cljs.spec.impl.gen.symbol_ns.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.symbol_ns.cljs$lang$applyTo = ((function (g__17400__auto___17608){
return (function (seq17530){
return cljs.spec.impl.gen.symbol_ns.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17530));
});})(g__17400__auto___17608))
;


var g__17400__auto___17612 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.uuid !== 'undefined')){
return clojure.test.check.generators.uuid;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","uuid","clojure.test.check.generators/uuid",1589373144,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","uuid","clojure.test.check.generators/uuid",1589373144,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/uuid
 */
cljs.spec.impl.gen.uuid = ((function (g__17400__auto___17612){
return (function cljs$spec$impl$gen$uuid(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17613 = arguments.length;
var i__27349__auto___17614 = (0);
while(true){
if((i__27349__auto___17614 < len__27348__auto___17613)){
args__27351__auto__.push((arguments[i__27349__auto___17614]));

var G__17615 = (i__27349__auto___17614 + (1));
i__27349__auto___17614 = G__17615;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.uuid.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});})(g__17400__auto___17612))
;

cljs.spec.impl.gen.uuid.cljs$core$IFn$_invoke$arity$variadic = ((function (g__17400__auto___17612){
return (function (args){
return cljs.core.deref.call(null,g__17400__auto___17612);
});})(g__17400__auto___17612))
;

cljs.spec.impl.gen.uuid.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.uuid.cljs$lang$applyTo = ((function (g__17400__auto___17612){
return (function (seq17531){
return cljs.spec.impl.gen.uuid.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17531));
});})(g__17400__auto___17612))
;

/**
 * Returns a generator of a sequence catenated from results of
 * gens, each of which should generate something sequential.
 */
cljs.spec.impl.gen.cat = (function cljs$spec$impl$gen$cat(var_args){
var args__27351__auto__ = [];
var len__27348__auto___17618 = arguments.length;
var i__27349__auto___17619 = (0);
while(true){
if((i__27349__auto___17619 < len__27348__auto___17618)){
args__27351__auto__.push((arguments[i__27349__auto___17619]));

var G__17620 = (i__27349__auto___17619 + (1));
i__27349__auto___17619 = G__17620;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.cat.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

cljs.spec.impl.gen.cat.cljs$core$IFn$_invoke$arity$variadic = (function (gens){
return cljs.spec.impl.gen.fmap.call(null,(function (p1__17616_SHARP_){
return cljs.core.apply.call(null,cljs.core.concat,p1__17616_SHARP_);
}),cljs.core.apply.call(null,cljs.spec.impl.gen.tuple,gens));
});

cljs.spec.impl.gen.cat.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.cat.cljs$lang$applyTo = (function (seq17617){
return cljs.spec.impl.gen.cat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq17617));
});

cljs.spec.impl.gen.qualified_QMARK_ = (function cljs$spec$impl$gen$qualified_QMARK_(ident){
return !((cljs.core.namespace.call(null,ident) == null));
});
cljs.spec.impl.gen.gen_builtins = (new cljs.core.Delay((function (){
var simple = cljs.spec.impl.gen.simple_type_printable.call(null);
return cljs.core.PersistentHashMap.fromArrays([cljs.core.qualified_keyword_QMARK_,cljs.core.seq_QMARK_,cljs.core.vector_QMARK_,cljs.core.char_QMARK_,cljs.core.inst_QMARK_,cljs.core.simple_symbol_QMARK_,cljs.core.sequential_QMARK_,cljs.core.set_QMARK_,cljs.core.map_QMARK_,cljs.core.empty_QMARK_,cljs.core.string_QMARK_,cljs.core.int_QMARK_,cljs.core.associative_QMARK_,cljs.core.keyword_QMARK_,cljs.core.indexed_QMARK_,cljs.core.zero_QMARK_,cljs.core.simple_keyword_QMARK_,cljs.core.neg_int_QMARK_,cljs.core.nil_QMARK_,cljs.core.ident_QMARK_,cljs.core.qualified_ident_QMARK_,cljs.core.true_QMARK_,cljs.core.integer_QMARK_,cljs.core.nat_int_QMARK_,cljs.core.pos_int_QMARK_,cljs.core.uuid_QMARK_,cljs.core.false_QMARK_,cljs.core.list_QMARK_,cljs.core.simple_ident_QMARK_,cljs.core.number_QMARK_,cljs.core.qualified_symbol_QMARK_,cljs.core.seqable_QMARK_,cljs.core.symbol_QMARK_,cljs.core.coll_QMARK_],[cljs.spec.impl.gen.such_that.call(null,cljs.spec.impl.gen.qualified_QMARK_,cljs.spec.impl.gen.keyword_ns.call(null)),cljs.spec.impl.gen.list.call(null,simple),cljs.spec.impl.gen.vector.call(null,simple),cljs.spec.impl.gen.char$.call(null),cljs.spec.impl.gen.fmap.call(null,((function (simple){
return (function (p1__17621_SHARP_){
return (new Date(p1__17621_SHARP_));
});})(simple))
,cljs.spec.impl.gen.large_integer.call(null)),cljs.spec.impl.gen.symbol.call(null),cljs.spec.impl.gen.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.list.call(null,simple),cljs.spec.impl.gen.vector.call(null,simple)], null)),cljs.spec.impl.gen.set.call(null,simple),cljs.spec.impl.gen.map.call(null,simple,simple),cljs.spec.impl.gen.elements.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.List.EMPTY,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentHashSet.EMPTY], null)),cljs.spec.impl.gen.string_alphanumeric.call(null),cljs.spec.impl.gen.large_integer.call(null),cljs.spec.impl.gen.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.map.call(null,simple,simple),cljs.spec.impl.gen.vector.call(null,simple)], null)),cljs.spec.impl.gen.keyword_ns.call(null),cljs.spec.impl.gen.vector.call(null,simple),cljs.spec.impl.gen.return$.call(null,(0)),cljs.spec.impl.gen.keyword.call(null),cljs.spec.impl.gen.large_integer_STAR_.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max","max",61366548),(-1)], null)),cljs.spec.impl.gen.return$.call(null,null),cljs.spec.impl.gen.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.keyword_ns.call(null),cljs.spec.impl.gen.symbol_ns.call(null)], null)),cljs.spec.impl.gen.such_that.call(null,cljs.spec.impl.gen.qualified_QMARK_,cljs.spec.impl.gen.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.keyword_ns.call(null),cljs.spec.impl.gen.symbol_ns.call(null)], null))),cljs.spec.impl.gen.return$.call(null,true),cljs.spec.impl.gen.large_integer.call(null),cljs.spec.impl.gen.large_integer_STAR_.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"min","min",444991522),(0)], null)),cljs.spec.impl.gen.large_integer_STAR_.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"min","min",444991522),(1)], null)),cljs.spec.impl.gen.uuid.call(null),cljs.spec.impl.gen.return$.call(null,false),cljs.spec.impl.gen.list.call(null,simple),cljs.spec.impl.gen.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.keyword.call(null),cljs.spec.impl.gen.symbol.call(null)], null)),cljs.spec.impl.gen.one_of.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.large_integer.call(null),cljs.spec.impl.gen.double$.call(null)], null)),cljs.spec.impl.gen.such_that.call(null,cljs.spec.impl.gen.qualified_QMARK_,cljs.spec.impl.gen.symbol_ns.call(null)),cljs.spec.impl.gen.one_of.call(null,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.return$.call(null,null),cljs.spec.impl.gen.list.call(null,simple),cljs.spec.impl.gen.vector.call(null,simple),cljs.spec.impl.gen.map.call(null,simple,simple),cljs.spec.impl.gen.set.call(null,simple),cljs.spec.impl.gen.string_alphanumeric.call(null)], null)),cljs.spec.impl.gen.symbol_ns.call(null),cljs.spec.impl.gen.one_of.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.map.call(null,simple,simple),cljs.spec.impl.gen.list.call(null,simple),cljs.spec.impl.gen.vector.call(null,simple),cljs.spec.impl.gen.set.call(null,simple)], null))]);
}),null));
/**
 * Given a predicate, returns a built-in generator if one exists.
 */
cljs.spec.impl.gen.gen_for_pred = (function cljs$spec$impl$gen$gen_for_pred(pred){
if(cljs.core.set_QMARK_.call(null,pred)){
return cljs.spec.impl.gen.elements.call(null,pred);
} else {
return cljs.core.get.call(null,cljs.core.deref.call(null,cljs.spec.impl.gen.gen_builtins),pred);
}
});

//# sourceMappingURL=gen.js.map?rel=1468744504050