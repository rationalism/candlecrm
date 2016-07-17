// Compiled by ClojureScript 1.9.93 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__18679){
var map__18704 = p__18679;
var map__18704__$1 = ((((!((map__18704 == null)))?((((map__18704.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18704.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18704):map__18704);
var m = map__18704__$1;
var n = cljs.core.get.call(null,map__18704__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.call(null,map__18704__$1,new cljs.core.Keyword(null,"name","name",1843675177));
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
var seq__18706_18728 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__18707_18729 = null;
var count__18708_18730 = (0);
var i__18709_18731 = (0);
while(true){
if((i__18709_18731 < count__18708_18730)){
var f_18732 = cljs.core._nth.call(null,chunk__18707_18729,i__18709_18731);
cljs.core.println.call(null,"  ",f_18732);

var G__18733 = seq__18706_18728;
var G__18734 = chunk__18707_18729;
var G__18735 = count__18708_18730;
var G__18736 = (i__18709_18731 + (1));
seq__18706_18728 = G__18733;
chunk__18707_18729 = G__18734;
count__18708_18730 = G__18735;
i__18709_18731 = G__18736;
continue;
} else {
var temp__4657__auto___18737 = cljs.core.seq.call(null,seq__18706_18728);
if(temp__4657__auto___18737){
var seq__18706_18738__$1 = temp__4657__auto___18737;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18706_18738__$1)){
var c__27200__auto___18739 = cljs.core.chunk_first.call(null,seq__18706_18738__$1);
var G__18740 = cljs.core.chunk_rest.call(null,seq__18706_18738__$1);
var G__18741 = c__27200__auto___18739;
var G__18742 = cljs.core.count.call(null,c__27200__auto___18739);
var G__18743 = (0);
seq__18706_18728 = G__18740;
chunk__18707_18729 = G__18741;
count__18708_18730 = G__18742;
i__18709_18731 = G__18743;
continue;
} else {
var f_18744 = cljs.core.first.call(null,seq__18706_18738__$1);
cljs.core.println.call(null,"  ",f_18744);

var G__18745 = cljs.core.next.call(null,seq__18706_18738__$1);
var G__18746 = null;
var G__18747 = (0);
var G__18748 = (0);
seq__18706_18728 = G__18745;
chunk__18707_18729 = G__18746;
count__18708_18730 = G__18747;
i__18709_18731 = G__18748;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_18749 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__26817__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_18749);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_18749)))?cljs.core.second.call(null,arglists_18749):arglists_18749));
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
var seq__18710_18750 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__18711_18751 = null;
var count__18712_18752 = (0);
var i__18713_18753 = (0);
while(true){
if((i__18713_18753 < count__18712_18752)){
var vec__18714_18754 = cljs.core._nth.call(null,chunk__18711_18751,i__18713_18753);
var name_18755 = cljs.core.nth.call(null,vec__18714_18754,(0),null);
var map__18717_18756 = cljs.core.nth.call(null,vec__18714_18754,(1),null);
var map__18717_18757__$1 = ((((!((map__18717_18756 == null)))?((((map__18717_18756.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18717_18756.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18717_18756):map__18717_18756);
var doc_18758 = cljs.core.get.call(null,map__18717_18757__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_18759 = cljs.core.get.call(null,map__18717_18757__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_18755);

cljs.core.println.call(null," ",arglists_18759);

if(cljs.core.truth_(doc_18758)){
cljs.core.println.call(null," ",doc_18758);
} else {
}

var G__18760 = seq__18710_18750;
var G__18761 = chunk__18711_18751;
var G__18762 = count__18712_18752;
var G__18763 = (i__18713_18753 + (1));
seq__18710_18750 = G__18760;
chunk__18711_18751 = G__18761;
count__18712_18752 = G__18762;
i__18713_18753 = G__18763;
continue;
} else {
var temp__4657__auto___18764 = cljs.core.seq.call(null,seq__18710_18750);
if(temp__4657__auto___18764){
var seq__18710_18765__$1 = temp__4657__auto___18764;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18710_18765__$1)){
var c__27200__auto___18766 = cljs.core.chunk_first.call(null,seq__18710_18765__$1);
var G__18767 = cljs.core.chunk_rest.call(null,seq__18710_18765__$1);
var G__18768 = c__27200__auto___18766;
var G__18769 = cljs.core.count.call(null,c__27200__auto___18766);
var G__18770 = (0);
seq__18710_18750 = G__18767;
chunk__18711_18751 = G__18768;
count__18712_18752 = G__18769;
i__18713_18753 = G__18770;
continue;
} else {
var vec__18719_18771 = cljs.core.first.call(null,seq__18710_18765__$1);
var name_18772 = cljs.core.nth.call(null,vec__18719_18771,(0),null);
var map__18722_18773 = cljs.core.nth.call(null,vec__18719_18771,(1),null);
var map__18722_18774__$1 = ((((!((map__18722_18773 == null)))?((((map__18722_18773.cljs$lang$protocol_mask$partition0$ & (64))) || (map__18722_18773.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18722_18773):map__18722_18773);
var doc_18775 = cljs.core.get.call(null,map__18722_18774__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_18776 = cljs.core.get.call(null,map__18722_18774__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name_18772);

cljs.core.println.call(null," ",arglists_18776);

if(cljs.core.truth_(doc_18775)){
cljs.core.println.call(null," ",doc_18775);
} else {
}

var G__18777 = cljs.core.next.call(null,seq__18710_18765__$1);
var G__18778 = null;
var G__18779 = (0);
var G__18780 = (0);
seq__18710_18750 = G__18777;
chunk__18711_18751 = G__18778;
count__18712_18752 = G__18779;
i__18713_18753 = G__18780;
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

var seq__18724 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__18725 = null;
var count__18726 = (0);
var i__18727 = (0);
while(true){
if((i__18727 < count__18726)){
var role = cljs.core._nth.call(null,chunk__18725,i__18727);
var temp__4657__auto___18781__$1 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__4657__auto___18781__$1)){
var spec_18782 = temp__4657__auto___18781__$1;
cljs.core.print.call(null,[cljs.core.str("\n "),cljs.core.str(cljs.core.name.call(null,role)),cljs.core.str(":")].join(''),cljs.spec.describe.call(null,spec_18782));
} else {
}

var G__18783 = seq__18724;
var G__18784 = chunk__18725;
var G__18785 = count__18726;
var G__18786 = (i__18727 + (1));
seq__18724 = G__18783;
chunk__18725 = G__18784;
count__18726 = G__18785;
i__18727 = G__18786;
continue;
} else {
var temp__4657__auto____$1 = cljs.core.seq.call(null,seq__18724);
if(temp__4657__auto____$1){
var seq__18724__$1 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__18724__$1)){
var c__27200__auto__ = cljs.core.chunk_first.call(null,seq__18724__$1);
var G__18787 = cljs.core.chunk_rest.call(null,seq__18724__$1);
var G__18788 = c__27200__auto__;
var G__18789 = cljs.core.count.call(null,c__27200__auto__);
var G__18790 = (0);
seq__18724 = G__18787;
chunk__18725 = G__18788;
count__18726 = G__18789;
i__18727 = G__18790;
continue;
} else {
var role = cljs.core.first.call(null,seq__18724__$1);
var temp__4657__auto___18791__$2 = cljs.core.get.call(null,fnspec,role);
if(cljs.core.truth_(temp__4657__auto___18791__$2)){
var spec_18792 = temp__4657__auto___18791__$2;
cljs.core.print.call(null,[cljs.core.str("\n "),cljs.core.str(cljs.core.name.call(null,role)),cljs.core.str(":")].join(''),cljs.spec.describe.call(null,spec_18792));
} else {
}

var G__18793 = cljs.core.next.call(null,seq__18724__$1);
var G__18794 = null;
var G__18795 = (0);
var G__18796 = (0);
seq__18724 = G__18793;
chunk__18725 = G__18794;
count__18726 = G__18795;
i__18727 = G__18796;
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

//# sourceMappingURL=repl.js.map?rel=1468744504854