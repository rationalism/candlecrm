// Compiled by ClojureScript 1.9.93 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__45166){
var map__45191 = p__45166;
var map__45191__$1 = ((((!((map__45191 == null)))?((((map__45191.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45191.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45191):map__45191);
var m = map__45191__$1;
var n = cljs.core.get.call(null,map__45191__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__45191__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,[cljs.core.str((function (){var temp__4657__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4657__auto__)){
var ns = temp__4657__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__45193_45215 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__45194_45216 = null;
var count__45195_45217 = (0);
var i__45196_45218 = (0);
while(true){
if((i__45196_45218 < count__45195_45217)){
var f_45219 = cljs.core._nth.call(null,chunk__45194_45216,i__45196_45218);
cljs.core.println.call(null,"  ",f_45219);

var G__45220 = seq__45193_45215;
var G__45221 = chunk__45194_45216;
var G__45222 = count__45195_45217;
var G__45223 = (i__45196_45218 + (1));
seq__45193_45215 = G__45220;
chunk__45194_45216 = G__45221;
count__45195_45217 = G__45222;
i__45196_45218 = G__45223;
continue;
} else {
var temp__4657__auto___45224 = cljs.core.seq.call(null,seq__45193_45215);
if(temp__4657__auto___45224){
var seq__45193_45225__$1 = temp__4657__auto___45224;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45193_45225__$1)){
var c__43809__auto___45226 = cljs.core.chunk_first.call(null,seq__45193_45225__$1);
var G__45227 = cljs.core.chunk_rest.call(null,seq__45193_45225__$1);
var G__45228 = c__43809__auto___45226;
var G__45229 = cljs.core.count.call(null,c__43809__auto___45226);
var G__45230 = (0);
seq__45193_45215 = G__45227;
chunk__45194_45216 = G__45228;
count__45195_45217 = G__45229;
i__45196_45218 = G__45230;
continue;
} else {
var f_45231 = cljs.core.first.call(null,seq__45193_45225__$1);
cljs.core.println.call(null,"  ",f_45231);

var G__45232 = cljs.core.next.call(null,seq__45193_45225__$1);
var G__45233 = null;
var G__45234 = (0);
var G__45235 = (0);
seq__45193_45215 = G__45232;
chunk__45194_45216 = G__45233;
count__45195_45217 = G__45234;
i__45196_45218 = G__45235;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_45236 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__42998__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__42998__auto__)){
return or__42998__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_45236);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_45236)))?cljs.core.second.call(null,arglists_45236):arglists_45236));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__45197_45237 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__45198_45238 = null;
var count__45199_45239 = (0);
var i__45200_45240 = (0);
while(true){
if((i__45200_45240 < count__45199_45239)){
var vec__45201_45241 = cljs.core._nth.call(null,chunk__45198_45238,i__45200_45240);
var name_45242 = cljs.core.nth.call(null,vec__45201_45241,(0),null);
var map__45204_45243 = cljs.core.nth.call(null,vec__45201_45241,(1),null);
var map__45204_45244__$1 = ((((!((map__45204_45243 == null)))?((((map__45204_45243.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45204_45243.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45204_45243):map__45204_45243);
var doc_45245 = cljs.core.get.call(null,map__45204_45244__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_45246 = cljs.core.get.call(null,map__45204_45244__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_45242);

cljs.core.println.call(null," ",arglists_45246);

if(cljs.core.truth_(doc_45245)){
cljs.core.println.call(null," ",doc_45245);
} else {
}

var G__45247 = seq__45197_45237;
var G__45248 = chunk__45198_45238;
var G__45249 = count__45199_45239;
var G__45250 = (i__45200_45240 + (1));
seq__45197_45237 = G__45247;
chunk__45198_45238 = G__45248;
count__45199_45239 = G__45249;
i__45200_45240 = G__45250;
continue;
} else {
var temp__4657__auto___45251 = cljs.core.seq.call(null,seq__45197_45237);
if(temp__4657__auto___45251){
var seq__45197_45252__$1 = temp__4657__auto___45251;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45197_45252__$1)){
var c__43809__auto___45253 = cljs.core.chunk_first.call(null,seq__45197_45252__$1);
var G__45254 = cljs.core.chunk_rest.call(null,seq__45197_45252__$1);
var G__45255 = c__43809__auto___45253;
var G__45256 = cljs.core.count.call(null,c__43809__auto___45253);
var G__45257 = (0);
seq__45197_45237 = G__45254;
chunk__45198_45238 = G__45255;
count__45199_45239 = G__45256;
i__45200_45240 = G__45257;
continue;
} else {
var vec__45206_45258 = cljs.core.first.call(null,seq__45197_45252__$1);
var name_45259 = cljs.core.nth.call(null,vec__45206_45258,(0),null);
var map__45209_45260 = cljs.core.nth.call(null,vec__45206_45258,(1),null);
var map__45209_45261__$1 = ((((!((map__45209_45260 == null)))?((((map__45209_45260.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45209_45260.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__45209_45260):map__45209_45260);
var doc_45262 = cljs.core.get.call(null,map__45209_45261__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_45263 = cljs.core.get.call(null,map__45209_45261__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_45259);

cljs.core.println.call(null," ",arglists_45263);

if(cljs.core.truth_(doc_45262)){
cljs.core.println.call(null," ",doc_45262);
} else {
}

var G__45264 = cljs.core.next.call(null,seq__45197_45252__$1);
var G__45265 = null;
var G__45266 = (0);
var G__45267 = (0);
seq__45197_45237 = G__45264;
chunk__45198_45238 = G__45265;
count__45199_45239 = G__45266;
i__45200_45240 = G__45267;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__4657__auto__ = cljs.spec.get_spec.call(null,cljs.core.symbol.call(null,[cljs.core.str(cljs.core.ns_name.call(null,n))].join(''),cljs.core.name.call(null,nm)));
if(cljs.core.truth_(temp__4657__auto__)){
var fnspec = temp__4657__auto__;
cljs.core.print.call(null,"Spec");

var seq__45211 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__45212 = null;
var count__45213 = (0);
var i__45214 = (0);
while(true){
if((i__45214 < count__45213)){
var role = cljs.core._nth.call(null,chunk__45212,i__45214);
var temp__4657__auto___45268__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__4657__auto___45268__$1)){
var spec_45269 = temp__4657__auto___45268__$1;
cljs.core.print.call(null,[cljs.core.str("\n "),cljs.core.str(cljs.core.name.call(null,role)),cljs.core.str(":")].join(''),cljs.spec.describe.call(null,spec_45269));
} else {
}

var G__45270 = seq__45211;
var G__45271 = chunk__45212;
var G__45272 = count__45213;
var G__45273 = (i__45214 + (1));
seq__45211 = G__45270;
chunk__45212 = G__45271;
count__45213 = G__45272;
i__45214 = G__45273;
continue;
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__45211);
if(temp__4657__auto____$1){
var seq__45211__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__45211__$1)){
var c__43809__auto__ = cljs.core.chunk_first.call(null,seq__45211__$1);
var G__45274 = cljs.core.chunk_rest.call(null,seq__45211__$1);
var G__45275 = c__43809__auto__;
var G__45276 = cljs.core.count.call(null,c__43809__auto__);
var G__45277 = (0);
seq__45211 = G__45274;
chunk__45212 = G__45275;
count__45213 = G__45276;
i__45214 = G__45277;
continue;
} else {
var role = cljs.core.first.call(null,seq__45211__$1);
var temp__4657__auto___45278__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__4657__auto___45278__$2)){
var spec_45279 = temp__4657__auto___45278__$2;
cljs.core.print.call(null,[cljs.core.str("\n "),cljs.core.str(cljs.core.name.call(null,role)),cljs.core.str(":")].join(''),cljs.spec.describe.call(null,spec_45279));
} else {
}

var G__45280 = cljs.core.next.call(null,seq__45211__$1);
var G__45281 = null;
var G__45282 = (0);
var G__45283 = (0);
seq__45211 = G__45280;
chunk__45212 = G__45281;
count__45213 = G__45282;
i__45214 = G__45283;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});

//# sourceMappingURL=repl.js.map