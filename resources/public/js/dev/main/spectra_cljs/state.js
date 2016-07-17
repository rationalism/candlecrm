// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.state');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('spectra_cljc.schema');
if(typeof spectra_cljs.state.a !== 'undefined'){
} else {
spectra_cljs.state.a = reagent.core.atom.call(null,cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974),new cljs.core.Keyword(null,"email-rows","email-rows",1852197731),new cljs.core.Keyword(null,"change-pwd","change-pwd",2081790085),new cljs.core.Keyword(null,"ajax-chan","ajax-chan",1933808038),new cljs.core.Keyword(null,"map-center","map-center",770153511),new cljs.core.Keyword(null,"cal-events","cal-events",2030438409),new cljs.core.Keyword(null,"map-zoom","map-zoom",1543291337),new cljs.core.Keyword(null,"map-markers","map-markers",-1522832471),new cljs.core.Keyword(null,"prop-filters","prop-filters",-775500019),new cljs.core.Keyword(null,"counters","counters",33475982),new cljs.core.Keyword(null,"search","search",1564939822),new cljs.core.Keyword(null,"input-meta","input-meta",623357967),new cljs.core.Keyword(null,"rank-lists","rank-lists",-1169790414),new cljs.core.Keyword(null,"map-obj","map-obj",-1129422030),new cljs.core.Keyword(null,"loading","loading",-737050189),new cljs.core.Keyword(null,"page-lengths","page-lengths",-746189067),new cljs.core.Keyword(null,"tabid","tabid",-720881418),new cljs.core.Keyword(null,"current-node","current-node",-814308842),new cljs.core.Keyword(null,"people-rows","people-rows",1287247959),new cljs.core.Keyword(null,"new-entity-msg","new-entity-msg",-206356551),new cljs.core.Keyword(null,"search-results","search-results",306464634),new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"delete-account","delete-account",725157341)],[cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentArrayMap.EMPTY,null,cljs.core.PersistentArrayMap.fromArray([spectra_cljc.schema.lat,37.953235,spectra_cljc.schema.lng,-122.433765], true, false),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"title","title",636505583),"event1",new cljs.core.Keyword(null,"start","start",-355208981),"2015-11-05",new cljs.core.Keyword(null,"end","end",-268185958),"2015-11-06"], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"title","title",636505583),"event2",new cljs.core.Keyword(null,"start","start",-355208981),"2015-11-25",new cljs.core.Keyword(null,"end","end",-268185958),"2015-11-29"], null)], null),(3),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"objs","objs",-1810725634),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"updated","updated",-1627192056),true,new cljs.core.Keyword(null,"window","window",724519534),null,new cljs.core.Keyword(null,"clicked","clicked",114423720),null], null),cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"people","people",1443537404),(0),new cljs.core.Keyword(null,"email","email",1415816706),(0),spectra_cljc.schema.email_from,(0),spectra_cljc.schema.email_to,(0)], true, false),"",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),null,new cljs.core.Keyword(null,"attr-list","attr-list",-231339907),null], null),cljs.core.PersistentArrayMap.fromArray([spectra_cljc.schema.event,cljs.core.PersistentVector.EMPTY,spectra_cljc.schema.location,cljs.core.PersistentVector.EMPTY], true, false),null,false,cljs.core.PersistentArrayMap.fromArray([new cljs.core.Keyword(null,"people","people",1443537404),(20),new cljs.core.Keyword(null,"email","email",1415816706),(20),spectra_cljc.schema.event,(50),spectra_cljc.schema.location,(50)], true, false),(1),null,cljs.core.PersistentVector.EMPTY,null,null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"username","username",1605666410),"Joe Bob Smith"], null),cljs.core.PersistentArrayMap.EMPTY]));
}
spectra_cljs.state.look = (function spectra_cljs$state$look(var_args){
var args__27351__auto__ = [];
var len__27348__auto___6535 = arguments.length;
var i__27349__auto___6536 = (0);
while(true){
if((i__27349__auto___6536 < len__27348__auto___6535)){
args__27351__auto__.push((arguments[i__27349__auto___6536]));

var G__6537 = (i__27349__auto___6536 + (1));
i__27349__auto___6536 = G__6537;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return spectra_cljs.state.look.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

spectra_cljs.state.look.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,spectra_cljs.state.a),args);
});

spectra_cljs.state.look.cljs$lang$maxFixedArity = (0);

spectra_cljs.state.look.cljs$lang$applyTo = (function (seq6534){
return spectra_cljs.state.look.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq6534));
});

spectra_cljs.state.person_pos = (function spectra_cljs$state$person_pos(){
return (spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"counters","counters",33475982),new cljs.core.Keyword(null,"people","people",1443537404)) * spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"page-lengths","page-lengths",-746189067),new cljs.core.Keyword(null,"people","people",1443537404)));
});
spectra_cljs.state.email_pos = (function spectra_cljs$state$email_pos(){
return (spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"counters","counters",33475982),new cljs.core.Keyword(null,"email","email",1415816706)) * spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"page-lengths","page-lengths",-746189067),new cljs.core.Keyword(null,"email","email",1415816706)));
});
spectra_cljs.state.email_person_pos = (function spectra_cljs$state$email_person_pos(link_type){
return (spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"counters","counters",33475982),link_type) * spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"page-lengths","page-lengths",-746189067),new cljs.core.Keyword(null,"email","email",1415816706)));
});
spectra_cljs.state.update_BANG_ = (function spectra_cljs$state$update_BANG_(var_args){
var args__27351__auto__ = [];
var len__27348__auto___6539 = arguments.length;
var i__27349__auto___6540 = (0);
while(true){
if((i__27349__auto___6540 < len__27348__auto___6539)){
args__27351__auto__.push((arguments[i__27349__auto___6540]));

var G__6541 = (i__27349__auto___6540 + (1));
i__27349__auto___6540 = G__6541;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return spectra_cljs.state.update_BANG_.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

spectra_cljs.state.update_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.call(null,cljs.core.partial.call(null,cljs.core.swap_BANG_,spectra_cljs.state.a,cljs.core.update_in),args);
});

spectra_cljs.state.update_BANG_.cljs$lang$maxFixedArity = (0);

spectra_cljs.state.update_BANG_.cljs$lang$applyTo = (function (seq6538){
return spectra_cljs.state.update_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq6538));
});

spectra_cljs.state.set_BANG_ = (function spectra_cljs$state$set_BANG_(loc,val){
return cljs.core.apply.call(null,cljs.core.partial.call(null,cljs.core.swap_BANG_,spectra_cljs.state.a,cljs.core.update_in),loc,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.constantly.call(null,val)], null));
});

//# sourceMappingURL=state.js.map?rel=1468744496997