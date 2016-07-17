// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.util');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('spectra_cljc.schema');
goog.require('spectra_cljs.state');
goog.require('spectra_cljs.update');
spectra_cljs.util.get_first = (function spectra_cljs$util$get_first(node,attr){
return cljs.core.ffirst.call(null,cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.get.call(null,node,attr))));
});
spectra_cljs.util.node_link = (function spectra_cljs$util$node_link(text,id,type){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.go-node","a.go-node",2024259760),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return spectra_cljs.update.go_node_BANG_.call(null,id,type);
})], null),text], null);
});
spectra_cljs.util.key_link = (function spectra_cljs$util$key_link(text,key,type){
var pred__7065 = cljs.core._EQ_;
var expr__7066 = type;
if(cljs.core.truth_(pred__7065.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__7066))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.go-node","a.go-node",2024259760),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (pred__7065,expr__7066){
return (function (){
return spectra_cljs.update.go_key_BANG_.call(null,key);
});})(pred__7065,expr__7066))
], null),text], null);
} else {
if(cljs.core.truth_(pred__7065.call(null,new cljs.core.Keyword(null,"url","url",276297046),expr__7066))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.go-node","a.go-node",2024259760),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),key], null),text], null);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__7066)].join('')));
}
}
});
spectra_cljs.util.set_field_BANG_ = (function spectra_cljs$util$set_field_BANG_(var_args){
var args__27351__auto__ = [];
var len__27348__auto___7069 = arguments.length;
var i__27349__auto___7070 = (0);
while(true){
if((i__27349__auto___7070 < len__27348__auto___7069)){
args__27351__auto__.push((arguments[i__27349__auto___7070]));

var G__7071 = (i__27349__auto___7070 + (1));
i__27349__auto___7070 = G__7071;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return spectra_cljs.util.set_field_BANG_.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

spectra_cljs.util.set_field_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return (function (this$){
return spectra_cljs.state.set_BANG_.call(null,args,this$.target.value);
});
});

spectra_cljs.util.set_field_BANG_.cljs$lang$maxFixedArity = (0);

spectra_cljs.util.set_field_BANG_.cljs$lang$applyTo = (function (seq7068){
return spectra_cljs.util.set_field_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq7068));
});

spectra_cljs.util.add_ids = (function spectra_cljs$util$add_ids(coll){
return cljs.core.partition.call(null,(2),cljs.core.interleave.call(null,cljs.core.range.call(null,cljs.core.count.call(null,coll)),coll));
});
spectra_cljs.util.format_date = (function spectra_cljs$util$format_date(date){
return (new moment(date)).format("MMM Do, h:mm a");
});
spectra_cljs.util.date_display = (function spectra_cljs$util$date_display(item){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),spectra_cljs.util.format_date.call(null,((cljs.core.coll_QMARK_.call(null,item))?cljs.core.first.call(null,item):item))], null);
});

//# sourceMappingURL=util.js.map?rel=1468744497574