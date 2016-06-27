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

cljs.spec.impl.gen.LazyVar.cljs$lang$ctorPrWriter = (function (this__43604__auto__,writer__43605__auto__,opt__43606__auto__){
return cljs.core._write.call(null,writer__43605__auto__,"cljs.spec.impl.gen/LazyVar");
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
var args__44080__auto__ = [];
var len__44073__auto___46151 = arguments.length;
var i__44074__auto___46152 = (0);
while(true){
if((i__44074__auto___46152 < len__44073__auto___46151)){
args__44080__auto__.push((arguments[i__44074__auto___46152]));

var G__46153 = (i__44074__auto___46152 + (1));
i__44074__auto___46152 = G__46153;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});

cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,cljs.spec.impl.gen.quick_check_ref),args);
});

cljs.spec.impl.gen.quick_check.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.quick_check.cljs$lang$applyTo = (function (seq46150){
return cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46150));
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
var args__44080__auto__ = [];
var len__44073__auto___46155 = arguments.length;
var i__44074__auto___46156 = (0);
while(true){
if((i__44074__auto___46156 < len__44073__auto___46155)){
args__44080__auto__.push((arguments[i__44074__auto___46156]));

var G__46157 = (i__44074__auto___46156 + (1));
i__44074__auto___46156 = G__46157;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});

cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,cljs.spec.impl.gen.for_all_STAR__ref),args);
});

cljs.spec.impl.gen.for_all_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.for_all_STAR_.cljs$lang$applyTo = (function (seq46154){
return cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46154));
});

var g_QMARK__46158 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.generator_QMARK_ !== 'undefined')){
return clojure.test.check.generators.generator_QMARK_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","generator?","clojure.test.check.generators/generator?",-1378210460,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","generator?","clojure.test.check.generators/generator?",-1378210460,null))),cljs.core.str(" never required")].join('')));
}
}),null));
var g_46159 = (new cljs.spec.impl.gen.LazyVar(((function (g_QMARK__46158){
return (function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.generate !== 'undefined')){
return clojure.test.check.generators.generate;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","generate","clojure.test.check.generators/generate",-690390711,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","generate","clojure.test.check.generators/generate",-690390711,null))),cljs.core.str(" never required")].join('')));
}
});})(g_QMARK__46158))
,null));
var mkg_46160 = (new cljs.spec.impl.gen.LazyVar(((function (g_QMARK__46158,g_46159){
return (function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.__GT_Generator !== 'undefined')){
return clojure.test.check.generators.__GT_Generator;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","->Generator","clojure.test.check.generators/->Generator",-1179475051,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","->Generator","clojure.test.check.generators/->Generator",-1179475051,null))),cljs.core.str(" never required")].join('')));
}
});})(g_QMARK__46158,g_46159))
,null));
cljs.spec.impl.gen.generator_QMARK_ = ((function (g_QMARK__46158,g_46159,mkg_46160){
return (function cljs$spec$impl$gen$generator_QMARK_(x){
return cljs.core.deref.call(null,g_QMARK__46158).call(null,x);
});})(g_QMARK__46158,g_46159,mkg_46160))
;

cljs.spec.impl.gen.generator = ((function (g_QMARK__46158,g_46159,mkg_46160){
return (function cljs$spec$impl$gen$generator(gfn){
return cljs.core.deref.call(null,mkg_46160).call(null,gfn);
});})(g_QMARK__46158,g_46159,mkg_46160))
;

/**
 * Generate a single value using generator.
 */
cljs.spec.impl.gen.generate = ((function (g_QMARK__46158,g_46159,mkg_46160){
return (function cljs$spec$impl$gen$generate(generator){
return cljs.core.deref.call(null,g_46159).call(null,generator);
});})(g_QMARK__46158,g_46159,mkg_46160))
;
cljs.spec.impl.gen.delay_impl = (function cljs$spec$impl$gen$delay_impl(gfnd){
return cljs.spec.impl.gen.generator.call(null,(function (rnd,size){
return new cljs.core.Keyword(null,"gen","gen",142575302).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,gfnd)).call(null,rnd,size);
}));
});
var g__44149__auto___46178 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.hash_map !== 'undefined')){
return clojure.test.check.generators.hash_map;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","hash-map","clojure.test.check.generators/hash-map",1961346626,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","hash-map","clojure.test.check.generators/hash-map",1961346626,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/hash-map
 */
cljs.spec.impl.gen.hash_map = ((function (g__44149__auto___46178){
return (function cljs$spec$impl$gen$hash_map(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46179 = arguments.length;
var i__44074__auto___46180 = (0);
while(true){
if((i__44074__auto___46180 < len__44073__auto___46179)){
args__44080__auto__.push((arguments[i__44074__auto___46180]));

var G__46181 = (i__44074__auto___46180 + (1));
i__44074__auto___46180 = G__46181;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.hash_map.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46178))
;

cljs.spec.impl.gen.hash_map.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46178){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46178),args);
});})(g__44149__auto___46178))
;

cljs.spec.impl.gen.hash_map.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.hash_map.cljs$lang$applyTo = ((function (g__44149__auto___46178){
return (function (seq46161){
return cljs.spec.impl.gen.hash_map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46161));
});})(g__44149__auto___46178))
;


var g__44149__auto___46182 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.list !== 'undefined')){
return clojure.test.check.generators.list;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","list","clojure.test.check.generators/list",506971058,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","list","clojure.test.check.generators/list",506971058,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/list
 */
cljs.spec.impl.gen.list = ((function (g__44149__auto___46182){
return (function cljs$spec$impl$gen$list(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46183 = arguments.length;
var i__44074__auto___46184 = (0);
while(true){
if((i__44074__auto___46184 < len__44073__auto___46183)){
args__44080__auto__.push((arguments[i__44074__auto___46184]));

var G__46185 = (i__44074__auto___46184 + (1));
i__44074__auto___46184 = G__46185;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46182))
;

cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46182){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46182),args);
});})(g__44149__auto___46182))
;

cljs.spec.impl.gen.list.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.list.cljs$lang$applyTo = ((function (g__44149__auto___46182){
return (function (seq46162){
return cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46162));
});})(g__44149__auto___46182))
;


var g__44149__auto___46186 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.map !== 'undefined')){
return clojure.test.check.generators.map;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","map","clojure.test.check.generators/map",45738796,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","map","clojure.test.check.generators/map",45738796,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/map
 */
cljs.spec.impl.gen.map = ((function (g__44149__auto___46186){
return (function cljs$spec$impl$gen$map(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46187 = arguments.length;
var i__44074__auto___46188 = (0);
while(true){
if((i__44074__auto___46188 < len__44073__auto___46187)){
args__44080__auto__.push((arguments[i__44074__auto___46188]));

var G__46189 = (i__44074__auto___46188 + (1));
i__44074__auto___46188 = G__46189;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46186))
;

cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46186){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46186),args);
});})(g__44149__auto___46186))
;

cljs.spec.impl.gen.map.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.map.cljs$lang$applyTo = ((function (g__44149__auto___46186){
return (function (seq46163){
return cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46163));
});})(g__44149__auto___46186))
;


var g__44149__auto___46190 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.not_empty !== 'undefined')){
return clojure.test.check.generators.not_empty;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","not-empty","clojure.test.check.generators/not-empty",-876211682,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","not-empty","clojure.test.check.generators/not-empty",-876211682,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/not-empty
 */
cljs.spec.impl.gen.not_empty = ((function (g__44149__auto___46190){
return (function cljs$spec$impl$gen$not_empty(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46191 = arguments.length;
var i__44074__auto___46192 = (0);
while(true){
if((i__44074__auto___46192 < len__44073__auto___46191)){
args__44080__auto__.push((arguments[i__44074__auto___46192]));

var G__46193 = (i__44074__auto___46192 + (1));
i__44074__auto___46192 = G__46193;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.not_empty.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46190))
;

cljs.spec.impl.gen.not_empty.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46190){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46190),args);
});})(g__44149__auto___46190))
;

cljs.spec.impl.gen.not_empty.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.not_empty.cljs$lang$applyTo = ((function (g__44149__auto___46190){
return (function (seq46164){
return cljs.spec.impl.gen.not_empty.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46164));
});})(g__44149__auto___46190))
;


var g__44149__auto___46194 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.set !== 'undefined')){
return clojure.test.check.generators.set;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","set","clojure.test.check.generators/set",-1027639543,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","set","clojure.test.check.generators/set",-1027639543,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/set
 */
cljs.spec.impl.gen.set = ((function (g__44149__auto___46194){
return (function cljs$spec$impl$gen$set(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46195 = arguments.length;
var i__44074__auto___46196 = (0);
while(true){
if((i__44074__auto___46196 < len__44073__auto___46195)){
args__44080__auto__.push((arguments[i__44074__auto___46196]));

var G__46197 = (i__44074__auto___46196 + (1));
i__44074__auto___46196 = G__46197;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46194))
;

cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46194){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46194),args);
});})(g__44149__auto___46194))
;

cljs.spec.impl.gen.set.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.set.cljs$lang$applyTo = ((function (g__44149__auto___46194){
return (function (seq46165){
return cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46165));
});})(g__44149__auto___46194))
;


var g__44149__auto___46198 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.vector !== 'undefined')){
return clojure.test.check.generators.vector;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","vector","clojure.test.check.generators/vector",1081775325,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","vector","clojure.test.check.generators/vector",1081775325,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/vector
 */
cljs.spec.impl.gen.vector = ((function (g__44149__auto___46198){
return (function cljs$spec$impl$gen$vector(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46199 = arguments.length;
var i__44074__auto___46200 = (0);
while(true){
if((i__44074__auto___46200 < len__44073__auto___46199)){
args__44080__auto__.push((arguments[i__44074__auto___46200]));

var G__46201 = (i__44074__auto___46200 + (1));
i__44074__auto___46200 = G__46201;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46198))
;

cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46198){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46198),args);
});})(g__44149__auto___46198))
;

cljs.spec.impl.gen.vector.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.vector.cljs$lang$applyTo = ((function (g__44149__auto___46198){
return (function (seq46166){
return cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46166));
});})(g__44149__auto___46198))
;


var g__44149__auto___46202 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.vector_distinct !== 'undefined')){
return clojure.test.check.generators.vector_distinct;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","vector-distinct","clojure.test.check.generators/vector-distinct",1656877834,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","vector-distinct","clojure.test.check.generators/vector-distinct",1656877834,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/vector-distinct
 */
cljs.spec.impl.gen.vector_distinct = ((function (g__44149__auto___46202){
return (function cljs$spec$impl$gen$vector_distinct(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46203 = arguments.length;
var i__44074__auto___46204 = (0);
while(true){
if((i__44074__auto___46204 < len__44073__auto___46203)){
args__44080__auto__.push((arguments[i__44074__auto___46204]));

var G__46205 = (i__44074__auto___46204 + (1));
i__44074__auto___46204 = G__46205;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46202))
;

cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46202){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46202),args);
});})(g__44149__auto___46202))
;

cljs.spec.impl.gen.vector_distinct.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.vector_distinct.cljs$lang$applyTo = ((function (g__44149__auto___46202){
return (function (seq46167){
return cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46167));
});})(g__44149__auto___46202))
;


var g__44149__auto___46206 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.fmap !== 'undefined')){
return clojure.test.check.generators.fmap;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","fmap","clojure.test.check.generators/fmap",1957997092,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","fmap","clojure.test.check.generators/fmap",1957997092,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/fmap
 */
cljs.spec.impl.gen.fmap = ((function (g__44149__auto___46206){
return (function cljs$spec$impl$gen$fmap(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46207 = arguments.length;
var i__44074__auto___46208 = (0);
while(true){
if((i__44074__auto___46208 < len__44073__auto___46207)){
args__44080__auto__.push((arguments[i__44074__auto___46208]));

var G__46209 = (i__44074__auto___46208 + (1));
i__44074__auto___46208 = G__46209;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46206))
;

cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46206){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46206),args);
});})(g__44149__auto___46206))
;

cljs.spec.impl.gen.fmap.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.fmap.cljs$lang$applyTo = ((function (g__44149__auto___46206){
return (function (seq46168){
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46168));
});})(g__44149__auto___46206))
;


var g__44149__auto___46210 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.elements !== 'undefined')){
return clojure.test.check.generators.elements;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","elements","clojure.test.check.generators/elements",438991326,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","elements","clojure.test.check.generators/elements",438991326,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/elements
 */
cljs.spec.impl.gen.elements = ((function (g__44149__auto___46210){
return (function cljs$spec$impl$gen$elements(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46211 = arguments.length;
var i__44074__auto___46212 = (0);
while(true){
if((i__44074__auto___46212 < len__44073__auto___46211)){
args__44080__auto__.push((arguments[i__44074__auto___46212]));

var G__46213 = (i__44074__auto___46212 + (1));
i__44074__auto___46212 = G__46213;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46210))
;

cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46210){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46210),args);
});})(g__44149__auto___46210))
;

cljs.spec.impl.gen.elements.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.elements.cljs$lang$applyTo = ((function (g__44149__auto___46210){
return (function (seq46169){
return cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46169));
});})(g__44149__auto___46210))
;


var g__44149__auto___46214 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.bind !== 'undefined')){
return clojure.test.check.generators.bind;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","bind","clojure.test.check.generators/bind",-361313906,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","bind","clojure.test.check.generators/bind",-361313906,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/bind
 */
cljs.spec.impl.gen.bind = ((function (g__44149__auto___46214){
return (function cljs$spec$impl$gen$bind(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46215 = arguments.length;
var i__44074__auto___46216 = (0);
while(true){
if((i__44074__auto___46216 < len__44073__auto___46215)){
args__44080__auto__.push((arguments[i__44074__auto___46216]));

var G__46217 = (i__44074__auto___46216 + (1));
i__44074__auto___46216 = G__46217;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46214))
;

cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46214){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46214),args);
});})(g__44149__auto___46214))
;

cljs.spec.impl.gen.bind.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.bind.cljs$lang$applyTo = ((function (g__44149__auto___46214){
return (function (seq46170){
return cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46170));
});})(g__44149__auto___46214))
;


var g__44149__auto___46218 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.choose !== 'undefined')){
return clojure.test.check.generators.choose;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","choose","clojure.test.check.generators/choose",909997832,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","choose","clojure.test.check.generators/choose",909997832,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/choose
 */
cljs.spec.impl.gen.choose = ((function (g__44149__auto___46218){
return (function cljs$spec$impl$gen$choose(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46219 = arguments.length;
var i__44074__auto___46220 = (0);
while(true){
if((i__44074__auto___46220 < len__44073__auto___46219)){
args__44080__auto__.push((arguments[i__44074__auto___46220]));

var G__46221 = (i__44074__auto___46220 + (1));
i__44074__auto___46220 = G__46221;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46218))
;

cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46218){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46218),args);
});})(g__44149__auto___46218))
;

cljs.spec.impl.gen.choose.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.choose.cljs$lang$applyTo = ((function (g__44149__auto___46218){
return (function (seq46171){
return cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46171));
});})(g__44149__auto___46218))
;


var g__44149__auto___46222 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.one_of !== 'undefined')){
return clojure.test.check.generators.one_of;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","one-of","clojure.test.check.generators/one-of",-183339191,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","one-of","clojure.test.check.generators/one-of",-183339191,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/one-of
 */
cljs.spec.impl.gen.one_of = ((function (g__44149__auto___46222){
return (function cljs$spec$impl$gen$one_of(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46223 = arguments.length;
var i__44074__auto___46224 = (0);
while(true){
if((i__44074__auto___46224 < len__44073__auto___46223)){
args__44080__auto__.push((arguments[i__44074__auto___46224]));

var G__46225 = (i__44074__auto___46224 + (1));
i__44074__auto___46224 = G__46225;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46222))
;

cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46222){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46222),args);
});})(g__44149__auto___46222))
;

cljs.spec.impl.gen.one_of.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.one_of.cljs$lang$applyTo = ((function (g__44149__auto___46222){
return (function (seq46172){
return cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46172));
});})(g__44149__auto___46222))
;


var g__44149__auto___46226 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.such_that !== 'undefined')){
return clojure.test.check.generators.such_that;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","such-that","clojure.test.check.generators/such-that",-1754178732,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","such-that","clojure.test.check.generators/such-that",-1754178732,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/such-that
 */
cljs.spec.impl.gen.such_that = ((function (g__44149__auto___46226){
return (function cljs$spec$impl$gen$such_that(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46227 = arguments.length;
var i__44074__auto___46228 = (0);
while(true){
if((i__44074__auto___46228 < len__44073__auto___46227)){
args__44080__auto__.push((arguments[i__44074__auto___46228]));

var G__46229 = (i__44074__auto___46228 + (1));
i__44074__auto___46228 = G__46229;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46226))
;

cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46226){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46226),args);
});})(g__44149__auto___46226))
;

cljs.spec.impl.gen.such_that.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.such_that.cljs$lang$applyTo = ((function (g__44149__auto___46226){
return (function (seq46173){
return cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46173));
});})(g__44149__auto___46226))
;


var g__44149__auto___46230 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.tuple !== 'undefined')){
return clojure.test.check.generators.tuple;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","tuple","clojure.test.check.generators/tuple",-143711557,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","tuple","clojure.test.check.generators/tuple",-143711557,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/tuple
 */
cljs.spec.impl.gen.tuple = ((function (g__44149__auto___46230){
return (function cljs$spec$impl$gen$tuple(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46231 = arguments.length;
var i__44074__auto___46232 = (0);
while(true){
if((i__44074__auto___46232 < len__44073__auto___46231)){
args__44080__auto__.push((arguments[i__44074__auto___46232]));

var G__46233 = (i__44074__auto___46232 + (1));
i__44074__auto___46232 = G__46233;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46230))
;

cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46230){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46230),args);
});})(g__44149__auto___46230))
;

cljs.spec.impl.gen.tuple.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.tuple.cljs$lang$applyTo = ((function (g__44149__auto___46230){
return (function (seq46174){
return cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46174));
});})(g__44149__auto___46230))
;


var g__44149__auto___46234 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.sample !== 'undefined')){
return clojure.test.check.generators.sample;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","sample","clojure.test.check.generators/sample",-382944992,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","sample","clojure.test.check.generators/sample",-382944992,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/sample
 */
cljs.spec.impl.gen.sample = ((function (g__44149__auto___46234){
return (function cljs$spec$impl$gen$sample(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46235 = arguments.length;
var i__44074__auto___46236 = (0);
while(true){
if((i__44074__auto___46236 < len__44073__auto___46235)){
args__44080__auto__.push((arguments[i__44074__auto___46236]));

var G__46237 = (i__44074__auto___46236 + (1));
i__44074__auto___46236 = G__46237;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46234))
;

cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46234){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46234),args);
});})(g__44149__auto___46234))
;

cljs.spec.impl.gen.sample.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.sample.cljs$lang$applyTo = ((function (g__44149__auto___46234){
return (function (seq46175){
return cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46175));
});})(g__44149__auto___46234))
;


var g__44149__auto___46238 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.return$ !== 'undefined')){
return clojure.test.check.generators.return$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","return","clojure.test.check.generators/return",1744522038,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","return","clojure.test.check.generators/return",1744522038,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/return
 */
cljs.spec.impl.gen.return$ = ((function (g__44149__auto___46238){
return (function cljs$spec$impl$gen$return(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46239 = arguments.length;
var i__44074__auto___46240 = (0);
while(true){
if((i__44074__auto___46240 < len__44073__auto___46239)){
args__44080__auto__.push((arguments[i__44074__auto___46240]));

var G__46241 = (i__44074__auto___46240 + (1));
i__44074__auto___46240 = G__46241;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46238))
;

cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46238){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46238),args);
});})(g__44149__auto___46238))
;

cljs.spec.impl.gen.return$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.return$.cljs$lang$applyTo = ((function (g__44149__auto___46238){
return (function (seq46176){
return cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46176));
});})(g__44149__auto___46238))
;


var g__44149__auto___46242 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.large_integer_STAR_ !== 'undefined')){
return clojure.test.check.generators.large_integer_STAR_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","large-integer*","clojure.test.check.generators/large-integer*",-437830670,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","large-integer*","clojure.test.check.generators/large-integer*",-437830670,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/large-integer*
 */
cljs.spec.impl.gen.large_integer_STAR_ = ((function (g__44149__auto___46242){
return (function cljs$spec$impl$gen$large_integer_STAR_(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46243 = arguments.length;
var i__44074__auto___46244 = (0);
while(true){
if((i__44074__auto___46244 < len__44073__auto___46243)){
args__44080__auto__.push((arguments[i__44074__auto___46244]));

var G__46245 = (i__44074__auto___46244 + (1));
i__44074__auto___46244 = G__46245;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44149__auto___46242))
;

cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44149__auto___46242){
return (function (args){
return cljs.core.apply.call(null,cljs.core.deref.call(null,g__44149__auto___46242),args);
});})(g__44149__auto___46242))
;

cljs.spec.impl.gen.large_integer_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.large_integer_STAR_.cljs$lang$applyTo = ((function (g__44149__auto___46242){
return (function (seq46177){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46177));
});})(g__44149__auto___46242))
;

var g__44162__auto___46267 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.any !== 'undefined')){
return clojure.test.check.generators.any;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","any","clojure.test.check.generators/any",1883743710,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","any","clojure.test.check.generators/any",1883743710,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/any
 */
cljs.spec.impl.gen.any = ((function (g__44162__auto___46267){
return (function cljs$spec$impl$gen$any(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46268 = arguments.length;
var i__44074__auto___46269 = (0);
while(true){
if((i__44074__auto___46269 < len__44073__auto___46268)){
args__44080__auto__.push((arguments[i__44074__auto___46269]));

var G__46270 = (i__44074__auto___46269 + (1));
i__44074__auto___46269 = G__46270;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.any.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46267))
;

cljs.spec.impl.gen.any.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46267){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46267);
});})(g__44162__auto___46267))
;

cljs.spec.impl.gen.any.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.any.cljs$lang$applyTo = ((function (g__44162__auto___46267){
return (function (seq46246){
return cljs.spec.impl.gen.any.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46246));
});})(g__44162__auto___46267))
;


var g__44162__auto___46271 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.any_printable !== 'undefined')){
return clojure.test.check.generators.any_printable;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","any-printable","clojure.test.check.generators/any-printable",-1570493991,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","any-printable","clojure.test.check.generators/any-printable",-1570493991,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/any-printable
 */
cljs.spec.impl.gen.any_printable = ((function (g__44162__auto___46271){
return (function cljs$spec$impl$gen$any_printable(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46272 = arguments.length;
var i__44074__auto___46273 = (0);
while(true){
if((i__44074__auto___46273 < len__44073__auto___46272)){
args__44080__auto__.push((arguments[i__44074__auto___46273]));

var G__46274 = (i__44074__auto___46273 + (1));
i__44074__auto___46273 = G__46274;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.any_printable.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46271))
;

cljs.spec.impl.gen.any_printable.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46271){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46271);
});})(g__44162__auto___46271))
;

cljs.spec.impl.gen.any_printable.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.any_printable.cljs$lang$applyTo = ((function (g__44162__auto___46271){
return (function (seq46247){
return cljs.spec.impl.gen.any_printable.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46247));
});})(g__44162__auto___46271))
;


var g__44162__auto___46275 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.boolean$ !== 'undefined')){
return clojure.test.check.generators.boolean$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","boolean","clojure.test.check.generators/boolean",1586992347,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","boolean","clojure.test.check.generators/boolean",1586992347,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/boolean
 */
cljs.spec.impl.gen.boolean$ = ((function (g__44162__auto___46275){
return (function cljs$spec$impl$gen$boolean(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46276 = arguments.length;
var i__44074__auto___46277 = (0);
while(true){
if((i__44074__auto___46277 < len__44073__auto___46276)){
args__44080__auto__.push((arguments[i__44074__auto___46277]));

var G__46278 = (i__44074__auto___46277 + (1));
i__44074__auto___46277 = G__46278;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.boolean$.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46275))
;

cljs.spec.impl.gen.boolean$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46275){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46275);
});})(g__44162__auto___46275))
;

cljs.spec.impl.gen.boolean$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.boolean$.cljs$lang$applyTo = ((function (g__44162__auto___46275){
return (function (seq46248){
return cljs.spec.impl.gen.boolean$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46248));
});})(g__44162__auto___46275))
;


var g__44162__auto___46279 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char$ !== 'undefined')){
return clojure.test.check.generators.char$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","char","clojure.test.check.generators/char",-1426343459,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","char","clojure.test.check.generators/char",-1426343459,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char
 */
cljs.spec.impl.gen.char$ = ((function (g__44162__auto___46279){
return (function cljs$spec$impl$gen$char(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46280 = arguments.length;
var i__44074__auto___46281 = (0);
while(true){
if((i__44074__auto___46281 < len__44073__auto___46280)){
args__44080__auto__.push((arguments[i__44074__auto___46281]));

var G__46282 = (i__44074__auto___46281 + (1));
i__44074__auto___46281 = G__46282;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char$.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46279))
;

cljs.spec.impl.gen.char$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46279){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46279);
});})(g__44162__auto___46279))
;

cljs.spec.impl.gen.char$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char$.cljs$lang$applyTo = ((function (g__44162__auto___46279){
return (function (seq46249){
return cljs.spec.impl.gen.char$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46249));
});})(g__44162__auto___46279))
;


var g__44162__auto___46283 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_alpha !== 'undefined')){
return clojure.test.check.generators.char_alpha;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","char-alpha","clojure.test.check.generators/char-alpha",615785796,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","char-alpha","clojure.test.check.generators/char-alpha",615785796,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-alpha
 */
cljs.spec.impl.gen.char_alpha = ((function (g__44162__auto___46283){
return (function cljs$spec$impl$gen$char_alpha(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46284 = arguments.length;
var i__44074__auto___46285 = (0);
while(true){
if((i__44074__auto___46285 < len__44073__auto___46284)){
args__44080__auto__.push((arguments[i__44074__auto___46285]));

var G__46286 = (i__44074__auto___46285 + (1));
i__44074__auto___46285 = G__46286;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char_alpha.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46283))
;

cljs.spec.impl.gen.char_alpha.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46283){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46283);
});})(g__44162__auto___46283))
;

cljs.spec.impl.gen.char_alpha.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char_alpha.cljs$lang$applyTo = ((function (g__44162__auto___46283){
return (function (seq46250){
return cljs.spec.impl.gen.char_alpha.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46250));
});})(g__44162__auto___46283))
;


var g__44162__auto___46287 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_alphanumeric !== 'undefined')){
return clojure.test.check.generators.char_alphanumeric;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","char-alphanumeric","clojure.test.check.generators/char-alphanumeric",1383091431,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","char-alphanumeric","clojure.test.check.generators/char-alphanumeric",1383091431,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-alphanumeric
 */
cljs.spec.impl.gen.char_alphanumeric = ((function (g__44162__auto___46287){
return (function cljs$spec$impl$gen$char_alphanumeric(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46288 = arguments.length;
var i__44074__auto___46289 = (0);
while(true){
if((i__44074__auto___46289 < len__44073__auto___46288)){
args__44080__auto__.push((arguments[i__44074__auto___46289]));

var G__46290 = (i__44074__auto___46289 + (1));
i__44074__auto___46289 = G__46290;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46287))
;

cljs.spec.impl.gen.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46287){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46287);
});})(g__44162__auto___46287))
;

cljs.spec.impl.gen.char_alphanumeric.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char_alphanumeric.cljs$lang$applyTo = ((function (g__44162__auto___46287){
return (function (seq46251){
return cljs.spec.impl.gen.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46251));
});})(g__44162__auto___46287))
;


var g__44162__auto___46291 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_ascii !== 'undefined')){
return clojure.test.check.generators.char_ascii;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","char-ascii","clojure.test.check.generators/char-ascii",-899908538,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","char-ascii","clojure.test.check.generators/char-ascii",-899908538,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-ascii
 */
cljs.spec.impl.gen.char_ascii = ((function (g__44162__auto___46291){
return (function cljs$spec$impl$gen$char_ascii(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46292 = arguments.length;
var i__44074__auto___46293 = (0);
while(true){
if((i__44074__auto___46293 < len__44073__auto___46292)){
args__44080__auto__.push((arguments[i__44074__auto___46293]));

var G__46294 = (i__44074__auto___46293 + (1));
i__44074__auto___46293 = G__46294;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char_ascii.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46291))
;

cljs.spec.impl.gen.char_ascii.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46291){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46291);
});})(g__44162__auto___46291))
;

cljs.spec.impl.gen.char_ascii.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char_ascii.cljs$lang$applyTo = ((function (g__44162__auto___46291){
return (function (seq46252){
return cljs.spec.impl.gen.char_ascii.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46252));
});})(g__44162__auto___46291))
;


var g__44162__auto___46295 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.double$ !== 'undefined')){
return clojure.test.check.generators.double$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","double","clojure.test.check.generators/double",668331090,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","double","clojure.test.check.generators/double",668331090,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/double
 */
cljs.spec.impl.gen.double$ = ((function (g__44162__auto___46295){
return (function cljs$spec$impl$gen$double(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46296 = arguments.length;
var i__44074__auto___46297 = (0);
while(true){
if((i__44074__auto___46297 < len__44073__auto___46296)){
args__44080__auto__.push((arguments[i__44074__auto___46297]));

var G__46298 = (i__44074__auto___46297 + (1));
i__44074__auto___46297 = G__46298;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.double$.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46295))
;

cljs.spec.impl.gen.double$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46295){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46295);
});})(g__44162__auto___46295))
;

cljs.spec.impl.gen.double$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.double$.cljs$lang$applyTo = ((function (g__44162__auto___46295){
return (function (seq46253){
return cljs.spec.impl.gen.double$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46253));
});})(g__44162__auto___46295))
;


var g__44162__auto___46299 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.int$ !== 'undefined')){
return clojure.test.check.generators.int$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","int","clojure.test.check.generators/int",1756228469,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","int","clojure.test.check.generators/int",1756228469,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/int
 */
cljs.spec.impl.gen.int$ = ((function (g__44162__auto___46299){
return (function cljs$spec$impl$gen$int(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46300 = arguments.length;
var i__44074__auto___46301 = (0);
while(true){
if((i__44074__auto___46301 < len__44073__auto___46300)){
args__44080__auto__.push((arguments[i__44074__auto___46301]));

var G__46302 = (i__44074__auto___46301 + (1));
i__44074__auto___46301 = G__46302;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.int$.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46299))
;

cljs.spec.impl.gen.int$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46299){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46299);
});})(g__44162__auto___46299))
;

cljs.spec.impl.gen.int$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.int$.cljs$lang$applyTo = ((function (g__44162__auto___46299){
return (function (seq46254){
return cljs.spec.impl.gen.int$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46254));
});})(g__44162__auto___46299))
;


var g__44162__auto___46303 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.keyword !== 'undefined')){
return clojure.test.check.generators.keyword;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","keyword","clojure.test.check.generators/keyword",24530530,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","keyword","clojure.test.check.generators/keyword",24530530,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/keyword
 */
cljs.spec.impl.gen.keyword = ((function (g__44162__auto___46303){
return (function cljs$spec$impl$gen$keyword(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46304 = arguments.length;
var i__44074__auto___46305 = (0);
while(true){
if((i__44074__auto___46305 < len__44073__auto___46304)){
args__44080__auto__.push((arguments[i__44074__auto___46305]));

var G__46306 = (i__44074__auto___46305 + (1));
i__44074__auto___46305 = G__46306;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.keyword.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46303))
;

cljs.spec.impl.gen.keyword.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46303){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46303);
});})(g__44162__auto___46303))
;

cljs.spec.impl.gen.keyword.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.keyword.cljs$lang$applyTo = ((function (g__44162__auto___46303){
return (function (seq46255){
return cljs.spec.impl.gen.keyword.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46255));
});})(g__44162__auto___46303))
;


var g__44162__auto___46307 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.keyword_ns !== 'undefined')){
return clojure.test.check.generators.keyword_ns;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","keyword-ns","clojure.test.check.generators/keyword-ns",-1492628482,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","keyword-ns","clojure.test.check.generators/keyword-ns",-1492628482,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/keyword-ns
 */
cljs.spec.impl.gen.keyword_ns = ((function (g__44162__auto___46307){
return (function cljs$spec$impl$gen$keyword_ns(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46308 = arguments.length;
var i__44074__auto___46309 = (0);
while(true){
if((i__44074__auto___46309 < len__44073__auto___46308)){
args__44080__auto__.push((arguments[i__44074__auto___46309]));

var G__46310 = (i__44074__auto___46309 + (1));
i__44074__auto___46309 = G__46310;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.keyword_ns.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46307))
;

cljs.spec.impl.gen.keyword_ns.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46307){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46307);
});})(g__44162__auto___46307))
;

cljs.spec.impl.gen.keyword_ns.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.keyword_ns.cljs$lang$applyTo = ((function (g__44162__auto___46307){
return (function (seq46256){
return cljs.spec.impl.gen.keyword_ns.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46256));
});})(g__44162__auto___46307))
;


var g__44162__auto___46311 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.large_integer !== 'undefined')){
return clojure.test.check.generators.large_integer;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","large-integer","clojure.test.check.generators/large-integer",-865967138,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","large-integer","clojure.test.check.generators/large-integer",-865967138,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/large-integer
 */
cljs.spec.impl.gen.large_integer = ((function (g__44162__auto___46311){
return (function cljs$spec$impl$gen$large_integer(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46312 = arguments.length;
var i__44074__auto___46313 = (0);
while(true){
if((i__44074__auto___46313 < len__44073__auto___46312)){
args__44080__auto__.push((arguments[i__44074__auto___46313]));

var G__46314 = (i__44074__auto___46313 + (1));
i__44074__auto___46313 = G__46314;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.large_integer.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46311))
;

cljs.spec.impl.gen.large_integer.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46311){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46311);
});})(g__44162__auto___46311))
;

cljs.spec.impl.gen.large_integer.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.large_integer.cljs$lang$applyTo = ((function (g__44162__auto___46311){
return (function (seq46257){
return cljs.spec.impl.gen.large_integer.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46257));
});})(g__44162__auto___46311))
;


var g__44162__auto___46315 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.ratio !== 'undefined')){
return clojure.test.check.generators.ratio;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","ratio","clojure.test.check.generators/ratio",1540966915,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","ratio","clojure.test.check.generators/ratio",1540966915,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/ratio
 */
cljs.spec.impl.gen.ratio = ((function (g__44162__auto___46315){
return (function cljs$spec$impl$gen$ratio(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46316 = arguments.length;
var i__44074__auto___46317 = (0);
while(true){
if((i__44074__auto___46317 < len__44073__auto___46316)){
args__44080__auto__.push((arguments[i__44074__auto___46317]));

var G__46318 = (i__44074__auto___46317 + (1));
i__44074__auto___46317 = G__46318;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.ratio.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46315))
;

cljs.spec.impl.gen.ratio.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46315){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46315);
});})(g__44162__auto___46315))
;

cljs.spec.impl.gen.ratio.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.ratio.cljs$lang$applyTo = ((function (g__44162__auto___46315){
return (function (seq46258){
return cljs.spec.impl.gen.ratio.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46258));
});})(g__44162__auto___46315))
;


var g__44162__auto___46319 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.simple_type !== 'undefined')){
return clojure.test.check.generators.simple_type;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","simple-type","clojure.test.check.generators/simple-type",892572284,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","simple-type","clojure.test.check.generators/simple-type",892572284,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/simple-type
 */
cljs.spec.impl.gen.simple_type = ((function (g__44162__auto___46319){
return (function cljs$spec$impl$gen$simple_type(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46320 = arguments.length;
var i__44074__auto___46321 = (0);
while(true){
if((i__44074__auto___46321 < len__44073__auto___46320)){
args__44080__auto__.push((arguments[i__44074__auto___46321]));

var G__46322 = (i__44074__auto___46321 + (1));
i__44074__auto___46321 = G__46322;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.simple_type.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46319))
;

cljs.spec.impl.gen.simple_type.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46319){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46319);
});})(g__44162__auto___46319))
;

cljs.spec.impl.gen.simple_type.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.simple_type.cljs$lang$applyTo = ((function (g__44162__auto___46319){
return (function (seq46259){
return cljs.spec.impl.gen.simple_type.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46259));
});})(g__44162__auto___46319))
;


var g__44162__auto___46323 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.simple_type_printable !== 'undefined')){
return clojure.test.check.generators.simple_type_printable;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","simple-type-printable","clojure.test.check.generators/simple-type-printable",-58489962,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","simple-type-printable","clojure.test.check.generators/simple-type-printable",-58489962,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/simple-type-printable
 */
cljs.spec.impl.gen.simple_type_printable = ((function (g__44162__auto___46323){
return (function cljs$spec$impl$gen$simple_type_printable(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46324 = arguments.length;
var i__44074__auto___46325 = (0);
while(true){
if((i__44074__auto___46325 < len__44073__auto___46324)){
args__44080__auto__.push((arguments[i__44074__auto___46325]));

var G__46326 = (i__44074__auto___46325 + (1));
i__44074__auto___46325 = G__46326;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46323))
;

cljs.spec.impl.gen.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46323){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46323);
});})(g__44162__auto___46323))
;

cljs.spec.impl.gen.simple_type_printable.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.simple_type_printable.cljs$lang$applyTo = ((function (g__44162__auto___46323){
return (function (seq46260){
return cljs.spec.impl.gen.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46260));
});})(g__44162__auto___46323))
;


var g__44162__auto___46327 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string !== 'undefined')){
return clojure.test.check.generators.string;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","string","clojure.test.check.generators/string",-1704750979,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","string","clojure.test.check.generators/string",-1704750979,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string
 */
cljs.spec.impl.gen.string = ((function (g__44162__auto___46327){
return (function cljs$spec$impl$gen$string(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46328 = arguments.length;
var i__44074__auto___46329 = (0);
while(true){
if((i__44074__auto___46329 < len__44073__auto___46328)){
args__44080__auto__.push((arguments[i__44074__auto___46329]));

var G__46330 = (i__44074__auto___46329 + (1));
i__44074__auto___46329 = G__46330;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.string.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46327))
;

cljs.spec.impl.gen.string.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46327){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46327);
});})(g__44162__auto___46327))
;

cljs.spec.impl.gen.string.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.string.cljs$lang$applyTo = ((function (g__44162__auto___46327){
return (function (seq46261){
return cljs.spec.impl.gen.string.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46261));
});})(g__44162__auto___46327))
;


var g__44162__auto___46331 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string_ascii !== 'undefined')){
return clojure.test.check.generators.string_ascii;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","string-ascii","clojure.test.check.generators/string-ascii",-2009877640,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","string-ascii","clojure.test.check.generators/string-ascii",-2009877640,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string-ascii
 */
cljs.spec.impl.gen.string_ascii = ((function (g__44162__auto___46331){
return (function cljs$spec$impl$gen$string_ascii(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46332 = arguments.length;
var i__44074__auto___46333 = (0);
while(true){
if((i__44074__auto___46333 < len__44073__auto___46332)){
args__44080__auto__.push((arguments[i__44074__auto___46333]));

var G__46334 = (i__44074__auto___46333 + (1));
i__44074__auto___46333 = G__46334;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.string_ascii.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46331))
;

cljs.spec.impl.gen.string_ascii.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46331){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46331);
});})(g__44162__auto___46331))
;

cljs.spec.impl.gen.string_ascii.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.string_ascii.cljs$lang$applyTo = ((function (g__44162__auto___46331){
return (function (seq46262){
return cljs.spec.impl.gen.string_ascii.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46262));
});})(g__44162__auto___46331))
;


var g__44162__auto___46335 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string_alphanumeric !== 'undefined')){
return clojure.test.check.generators.string_alphanumeric;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","string-alphanumeric","clojure.test.check.generators/string-alphanumeric",836374939,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","string-alphanumeric","clojure.test.check.generators/string-alphanumeric",836374939,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string-alphanumeric
 */
cljs.spec.impl.gen.string_alphanumeric = ((function (g__44162__auto___46335){
return (function cljs$spec$impl$gen$string_alphanumeric(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46336 = arguments.length;
var i__44074__auto___46337 = (0);
while(true){
if((i__44074__auto___46337 < len__44073__auto___46336)){
args__44080__auto__.push((arguments[i__44074__auto___46337]));

var G__46338 = (i__44074__auto___46337 + (1));
i__44074__auto___46337 = G__46338;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46335))
;

cljs.spec.impl.gen.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46335){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46335);
});})(g__44162__auto___46335))
;

cljs.spec.impl.gen.string_alphanumeric.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.string_alphanumeric.cljs$lang$applyTo = ((function (g__44162__auto___46335){
return (function (seq46263){
return cljs.spec.impl.gen.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46263));
});})(g__44162__auto___46335))
;


var g__44162__auto___46339 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.symbol !== 'undefined')){
return clojure.test.check.generators.symbol;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","symbol","clojure.test.check.generators/symbol",-1305461065,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","symbol","clojure.test.check.generators/symbol",-1305461065,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/symbol
 */
cljs.spec.impl.gen.symbol = ((function (g__44162__auto___46339){
return (function cljs$spec$impl$gen$symbol(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46340 = arguments.length;
var i__44074__auto___46341 = (0);
while(true){
if((i__44074__auto___46341 < len__44073__auto___46340)){
args__44080__auto__.push((arguments[i__44074__auto___46341]));

var G__46342 = (i__44074__auto___46341 + (1));
i__44074__auto___46341 = G__46342;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.symbol.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46339))
;

cljs.spec.impl.gen.symbol.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46339){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46339);
});})(g__44162__auto___46339))
;

cljs.spec.impl.gen.symbol.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.symbol.cljs$lang$applyTo = ((function (g__44162__auto___46339){
return (function (seq46264){
return cljs.spec.impl.gen.symbol.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46264));
});})(g__44162__auto___46339))
;


var g__44162__auto___46343 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.symbol_ns !== 'undefined')){
return clojure.test.check.generators.symbol_ns;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","symbol-ns","clojure.test.check.generators/symbol-ns",-862629490,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","symbol-ns","clojure.test.check.generators/symbol-ns",-862629490,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/symbol-ns
 */
cljs.spec.impl.gen.symbol_ns = ((function (g__44162__auto___46343){
return (function cljs$spec$impl$gen$symbol_ns(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46344 = arguments.length;
var i__44074__auto___46345 = (0);
while(true){
if((i__44074__auto___46345 < len__44073__auto___46344)){
args__44080__auto__.push((arguments[i__44074__auto___46345]));

var G__46346 = (i__44074__auto___46345 + (1));
i__44074__auto___46345 = G__46346;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.symbol_ns.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46343))
;

cljs.spec.impl.gen.symbol_ns.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46343){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46343);
});})(g__44162__auto___46343))
;

cljs.spec.impl.gen.symbol_ns.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.symbol_ns.cljs$lang$applyTo = ((function (g__44162__auto___46343){
return (function (seq46265){
return cljs.spec.impl.gen.symbol_ns.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46265));
});})(g__44162__auto___46343))
;


var g__44162__auto___46347 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.uuid !== 'undefined')){
return clojure.test.check.generators.uuid;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(new cljs.core.Symbol("clojure.test.check.generators","uuid","clojure.test.check.generators/uuid",1589373144,null)),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace.call(null,new cljs.core.Symbol("clojure.test.check.generators","uuid","clojure.test.check.generators/uuid",1589373144,null))),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/uuid
 */
cljs.spec.impl.gen.uuid = ((function (g__44162__auto___46347){
return (function cljs$spec$impl$gen$uuid(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46348 = arguments.length;
var i__44074__auto___46349 = (0);
while(true){
if((i__44074__auto___46349 < len__44073__auto___46348)){
args__44080__auto__.push((arguments[i__44074__auto___46349]));

var G__46350 = (i__44074__auto___46349 + (1));
i__44074__auto___46349 = G__46350;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.uuid.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});})(g__44162__auto___46347))
;

cljs.spec.impl.gen.uuid.cljs$core$IFn$_invoke$arity$variadic = ((function (g__44162__auto___46347){
return (function (args){
return cljs.core.deref.call(null,g__44162__auto___46347);
});})(g__44162__auto___46347))
;

cljs.spec.impl.gen.uuid.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.uuid.cljs$lang$applyTo = ((function (g__44162__auto___46347){
return (function (seq46266){
return cljs.spec.impl.gen.uuid.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46266));
});})(g__44162__auto___46347))
;

/**
 * Returns a generator of a sequence catenated from results of
 * gens, each of which should generate something sequential.
 */
cljs.spec.impl.gen.cat = (function cljs$spec$impl$gen$cat(var_args){
var args__44080__auto__ = [];
var len__44073__auto___46353 = arguments.length;
var i__44074__auto___46354 = (0);
while(true){
if((i__44074__auto___46354 < len__44073__auto___46353)){
args__44080__auto__.push((arguments[i__44074__auto___46354]));

var G__46355 = (i__44074__auto___46354 + (1));
i__44074__auto___46354 = G__46355;
continue;
} else {
}
break;
}

var argseq__44081__auto__ = ((((0) < args__44080__auto__.length))?(new cljs.core.IndexedSeq(args__44080__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.cat.cljs$core$IFn$_invoke$arity$variadic(argseq__44081__auto__);
});

cljs.spec.impl.gen.cat.cljs$core$IFn$_invoke$arity$variadic = (function (gens){
return cljs.spec.impl.gen.fmap.call(null,(function (p1__46351_SHARP_){
return cljs.core.apply.call(null,cljs.core.concat,p1__46351_SHARP_);
}),cljs.core.apply.call(null,cljs.spec.impl.gen.tuple,gens));
});

cljs.spec.impl.gen.cat.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.cat.cljs$lang$applyTo = (function (seq46352){
return cljs.spec.impl.gen.cat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq46352));
});

cljs.spec.impl.gen.qualified_QMARK_ = (function cljs$spec$impl$gen$qualified_QMARK_(ident){
return !((cljs.core.namespace.call(null,ident) == null));
});
cljs.spec.impl.gen.gen_builtins = (new cljs.core.Delay((function (){
var simple = cljs.spec.impl.gen.simple_type_printable.call(null);
return cljs.core.PersistentHashMap.fromArrays([cljs.core.qualified_keyword_QMARK_,cljs.core.seq_QMARK_,cljs.core.vector_QMARK_,cljs.core.char_QMARK_,cljs.core.inst_QMARK_,cljs.core.simple_symbol_QMARK_,cljs.core.sequential_QMARK_,cljs.core.set_QMARK_,cljs.core.map_QMARK_,cljs.core.empty_QMARK_,cljs.core.string_QMARK_,cljs.core.int_QMARK_,cljs.core.associative_QMARK_,cljs.core.keyword_QMARK_,cljs.core.indexed_QMARK_,cljs.core.zero_QMARK_,cljs.core.simple_keyword_QMARK_,cljs.core.neg_int_QMARK_,cljs.core.nil_QMARK_,cljs.core.ident_QMARK_,cljs.core.qualified_ident_QMARK_,cljs.core.true_QMARK_,cljs.core.integer_QMARK_,cljs.core.nat_int_QMARK_,cljs.core.pos_int_QMARK_,cljs.core.uuid_QMARK_,cljs.core.false_QMARK_,cljs.core.list_QMARK_,cljs.core.simple_ident_QMARK_,cljs.core.number_QMARK_,cljs.core.qualified_symbol_QMARK_,cljs.core.seqable_QMARK_,cljs.core.symbol_QMARK_,cljs.core.coll_QMARK_],[cljs.spec.impl.gen.such_that.call(null,cljs.spec.impl.gen.qualified_QMARK_,cljs.spec.impl.gen.keyword_ns.call(null)),cljs.spec.impl.gen.list.call(null,simple),cljs.spec.impl.gen.vector.call(null,simple),cljs.spec.impl.gen.char$.call(null),cljs.spec.impl.gen.fmap.call(null,((function (simple){
return (function (p1__46356_SHARP_){
return (new Date(p1__46356_SHARP_));
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

//# sourceMappingURL=gen.js.map