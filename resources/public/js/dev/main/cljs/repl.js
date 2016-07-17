// Compiled by ClojureScript 1.9.93 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__9889){
var map__9914 = p__9889;
var map__9914__$1 = ((((!((map__9914 == null)))?((((map__9914.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9914.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9914):map__9914);
var m = map__9914__$1;
var n = cljs.core.get.call(null,map__9914__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__9914__$1,new cljs.core.Keyword(null,"name","name",1843675177));
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
var seq__9916_9938 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__9917_9939 = null;
var count__9918_9940 = (0);
var i__9919_9941 = (0);
while(true){
if((i__9919_9941 < count__9918_9940)){
var f_9942 = cljs.core._nth.call(null,chunk__9917_9939,i__9919_9941);
cljs.core.println.call(null,"  ",f_9942);

var G__9943 = seq__9916_9938;
var G__9944 = chunk__9917_9939;
var G__9945 = count__9918_9940;
var G__9946 = (i__9919_9941 + (1));
seq__9916_9938 = G__9943;
chunk__9917_9939 = G__9944;
count__9918_9940 = G__9945;
i__9919_9941 = G__9946;
continue;
} else {
var temp__4657__auto___9947 = cljs.core.seq.call(null,seq__9916_9938);
if(temp__4657__auto___9947){
var seq__9916_9948__$1 = temp__4657__auto___9947;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9916_9948__$1)){
var c__27200__auto___9949 = cljs.core.chunk_first.call(null,seq__9916_9948__$1);
var G__9950 = cljs.core.chunk_rest.call(null,seq__9916_9948__$1);
var G__9951 = c__27200__auto___9949;
var G__9952 = cljs.core.count.call(null,c__27200__auto___9949);
var G__9953 = (0);
seq__9916_9938 = G__9950;
chunk__9917_9939 = G__9951;
count__9918_9940 = G__9952;
i__9919_9941 = G__9953;
continue;
} else {
var f_9954 = cljs.core.first.call(null,seq__9916_9948__$1);
cljs.core.println.call(null,"  ",f_9954);

var G__9955 = cljs.core.next.call(null,seq__9916_9948__$1);
var G__9956 = null;
var G__9957 = (0);
var G__9958 = (0);
seq__9916_9938 = G__9955;
chunk__9917_9939 = G__9956;
count__9918_9940 = G__9957;
i__9919_9941 = G__9958;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_9959 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__26817__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_9959);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_9959)))?cljs.core.second.call(null,arglists_9959):arglists_9959));
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
var seq__9920_9960 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__9921_9961 = null;
var count__9922_9962 = (0);
var i__9923_9963 = (0);
while(true){
if((i__9923_9963 < count__9922_9962)){
var vec__9924_9964 = cljs.core._nth.call(null,chunk__9921_9961,i__9923_9963);
var name_9965 = cljs.core.nth.call(null,vec__9924_9964,(0),null);
var map__9927_9966 = cljs.core.nth.call(null,vec__9924_9964,(1),null);
var map__9927_9967__$1 = ((((!((map__9927_9966 == null)))?((((map__9927_9966.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9927_9966.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9927_9966):map__9927_9966);
var doc_9968 = cljs.core.get.call(null,map__9927_9967__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_9969 = cljs.core.get.call(null,map__9927_9967__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_9965);

cljs.core.println.call(null," ",arglists_9969);

if(cljs.core.truth_(doc_9968)){
cljs.core.println.call(null," ",doc_9968);
} else {
}

var G__9970 = seq__9920_9960;
var G__9971 = chunk__9921_9961;
var G__9972 = count__9922_9962;
var G__9973 = (i__9923_9963 + (1));
seq__9920_9960 = G__9970;
chunk__9921_9961 = G__9971;
count__9922_9962 = G__9972;
i__9923_9963 = G__9973;
continue;
} else {
var temp__4657__auto___9974 = cljs.core.seq.call(null,seq__9920_9960);
if(temp__4657__auto___9974){
var seq__9920_9975__$1 = temp__4657__auto___9974;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9920_9975__$1)){
var c__27200__auto___9976 = cljs.core.chunk_first.call(null,seq__9920_9975__$1);
var G__9977 = cljs.core.chunk_rest.call(null,seq__9920_9975__$1);
var G__9978 = c__27200__auto___9976;
var G__9979 = cljs.core.count.call(null,c__27200__auto___9976);
var G__9980 = (0);
seq__9920_9960 = G__9977;
chunk__9921_9961 = G__9978;
count__9922_9962 = G__9979;
i__9923_9963 = G__9980;
continue;
} else {
var vec__9929_9981 = cljs.core.first.call(null,seq__9920_9975__$1);
var name_9982 = cljs.core.nth.call(null,vec__9929_9981,(0),null);
var map__9932_9983 = cljs.core.nth.call(null,vec__9929_9981,(1),null);
var map__9932_9984__$1 = ((((!((map__9932_9983 == null)))?((((map__9932_9983.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9932_9983.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9932_9983):map__9932_9983);
var doc_9985 = cljs.core.get.call(null,map__9932_9984__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_9986 = cljs.core.get.call(null,map__9932_9984__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_9982);

cljs.core.println.call(null," ",arglists_9986);

if(cljs.core.truth_(doc_9985)){
cljs.core.println.call(null," ",doc_9985);
} else {
}

var G__9987 = cljs.core.next.call(null,seq__9920_9975__$1);
var G__9988 = null;
var G__9989 = (0);
var G__9990 = (0);
seq__9920_9960 = G__9987;
chunk__9921_9961 = G__9988;
count__9922_9962 = G__9989;
i__9923_9963 = G__9990;
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

var seq__9934 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__9935 = null;
var count__9936 = (0);
var i__9937 = (0);
while(true){
if((i__9937 < count__9936)){
var role = cljs.core._nth.call(null,chunk__9935,i__9937);
var temp__4657__auto___9991__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__4657__auto___9991__$1)){
var spec_9992 = temp__4657__auto___9991__$1;
cljs.core.print.call(null,[cljs.core.str("\n "),cljs.core.str(cljs.core.name.call(null,role)),cljs.core.str(":")].join(''),cljs.spec.describe.call(null,spec_9992));
} else {
}

var G__9993 = seq__9934;
var G__9994 = chunk__9935;
var G__9995 = count__9936;
var G__9996 = (i__9937 + (1));
seq__9934 = G__9993;
chunk__9935 = G__9994;
count__9936 = G__9995;
i__9937 = G__9996;
continue;
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__9934);
if(temp__4657__auto____$1){
var seq__9934__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9934__$1)){
var c__27200__auto__ = cljs.core.chunk_first.call(null,seq__9934__$1);
var G__9997 = cljs.core.chunk_rest.call(null,seq__9934__$1);
var G__9998 = c__27200__auto__;
var G__9999 = cljs.core.count.call(null,c__27200__auto__);
var G__10000 = (0);
seq__9934 = G__9997;
chunk__9935 = G__9998;
count__9936 = G__9999;
i__9937 = G__10000;
continue;
} else {
var role = cljs.core.first.call(null,seq__9934__$1);
var temp__4657__auto___10001__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__4657__auto___10001__$2)){
var spec_10002 = temp__4657__auto___10001__$2;
cljs.core.print.call(null,[cljs.core.str("\n "),cljs.core.str(cljs.core.name.call(null,role)),cljs.core.str(":")].join(''),cljs.spec.describe.call(null,spec_10002));
} else {
}

var G__10003 = cljs.core.next.call(null,seq__9934__$1);
var G__10004 = null;
var G__10005 = (0);
var G__10006 = (0);
seq__9934 = G__10003;
chunk__9935 = G__10004;
count__9936 = G__10005;
i__9937 = G__10006;
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

//# sourceMappingURL=repl.js.map?rel=1468751002115