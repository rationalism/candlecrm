// Compiled by ClojureScript 1.9.93 {}
goog.provide('taoensso.sente');
goog.require('cljs.core');
goog.require('taoensso.timbre');
goog.require('taoensso.sente.interfaces');
goog.require('cljs.core.async');
goog.require('taoensso.encore');
goog.require('clojure.string');
if(cljs.core.vector_QMARK_.call(null,taoensso.encore.encore_version)){
taoensso.encore.assert_min_encore_version.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),(53),(1)], null));
} else {
taoensso.encore.assert_min_encore_version.call(null,2.53);
}
if(typeof taoensso.sente.debug_mode_QMARK__ !== 'undefined'){
} else {
taoensso.sente.debug_mode_QMARK__ = cljs.core.atom.call(null,false);
}
taoensso.sente.validate_event = (function taoensso$sente$validate_event(x){
if(!(cljs.core.vector_QMARK_.call(null,x))){
return new cljs.core.Keyword(null,"wrong-type","wrong-type",929556915);
} else {
if(cljs.core.not.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [(1),null,(2),null], null), null).call(null,cljs.core.count.call(null,x)))){
return new cljs.core.Keyword(null,"wrong-length","wrong-length",1367572281);
} else {
var vec__14681 = x;
var ev_id = cljs.core.nth.call(null,vec__14681,(0),null);
var _ = cljs.core.nth.call(null,vec__14681,(1),null);
if(!((ev_id instanceof cljs.core.Keyword))){
return new cljs.core.Keyword(null,"wrong-id-type","wrong-id-type",-1213601689);
} else {
if(cljs.core.not.call(null,cljs.core.namespace.call(null,ev_id))){
return new cljs.core.Keyword(null,"unnamespaced-id","unnamespaced-id",1976189772);
} else {
return null;

}
}

}
}
});
/**
 * Valid [ev-id ?ev-data] form?
 */
taoensso.sente.event_QMARK_ = (function taoensso$sente$event_QMARK_(x){
return (taoensso.sente.validate_event.call(null,x) == null);
});
taoensso.sente.as_event = (function taoensso$sente$as_event(x){
if(cljs.core.truth_(taoensso.sente.event_QMARK_.call(null,x))){
return x;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","bad-event","chsk/bad-event",-565206930),x], null);
}
});
taoensso.sente.assert_event = (function taoensso$sente$assert_event(x){
var temp__4657__auto__ = taoensso.sente.validate_event.call(null,x);
if(cljs.core.truth_(temp__4657__auto__)){
var _QMARK_err = temp__4657__auto__;
var err_msg = [cljs.core.str((function (){var G__14685 = (((_QMARK_err instanceof cljs.core.Keyword))?_QMARK_err.fqn:null);
switch (G__14685) {
case "wrong-type":
return "Malformed event (wrong type).";

break;
case "wrong-length":
return "Malformed event (wrong length).";

break;
case "wrong-id-type":
return "Malformed event (`ev-id` should be a namespaced keyword).";

break;
case "unnamespaced-id":
return "Malformed event (`ev-id` should be a namespaced keyword).";

break;
case "else":
return "Malformed event (unknown error).";

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(_QMARK_err)].join('')));

}
})()),cljs.core.str(" Event should be of `[ev-id ?ev-data]` form: "),cljs.core.str(x)].join('');
throw cljs.core.ex_info.call(null,err_msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"malformed-event","malformed-event",-2090896605),x], null));
} else {
return null;
}
});
taoensso.sente.client_event_msg_QMARK_ = (function taoensso$sente$client_event_msg_QMARK_(x){
var and__26809__auto__ = cljs.core.map_QMARK_.call(null,x);
if(and__26809__auto__){
var and__26809__auto____$1 = taoensso.encore.keys_EQ_.call(null,x,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861),null,new cljs.core.Keyword(null,"state","state",-1988618099),null,new cljs.core.Keyword(null,"event","event",301435442),null,new cljs.core.Keyword(null,"id","id",-1388402092),null,new cljs.core.Keyword(null,"?data","?data",-9471433),null,new cljs.core.Keyword(null,"send-fn","send-fn",351002041),null], null), null));
if(cljs.core.truth_(and__26809__auto____$1)){
var map__14689 = x;
var map__14689__$1 = ((((!((map__14689 == null)))?((((map__14689.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14689.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14689):map__14689);
var ch_recv = cljs.core.get.call(null,map__14689__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));
var send_fn = cljs.core.get.call(null,map__14689__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));
var state = cljs.core.get.call(null,map__14689__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var event = cljs.core.get.call(null,map__14689__$1,new cljs.core.Keyword(null,"event","event",301435442));
var and__26809__auto____$2 = taoensso.encore.chan_QMARK_.call(null,ch_recv);
if(and__26809__auto____$2){
var and__26809__auto____$3 = cljs.core.ifn_QMARK_.call(null,send_fn);
if(and__26809__auto____$3){
var and__26809__auto____$4 = taoensso.encore.atom_QMARK_.call(null,state);
if(and__26809__auto____$4){
return taoensso.sente.event_QMARK_.call(null,event);
} else {
return and__26809__auto____$4;
}
} else {
return and__26809__auto____$3;
}
} else {
return and__26809__auto____$2;
}
} else {
return and__26809__auto____$1;
}
} else {
return and__26809__auto__;
}
});
taoensso.sente.server_event_msg_QMARK_ = (function taoensso$sente$server_event_msg_QMARK_(x){
var and__26809__auto__ = cljs.core.map_QMARK_.call(null,x);
if(and__26809__auto__){
var and__26809__auto____$1 = taoensso.encore.keys_EQ_.call(null,x,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 10, [new cljs.core.Keyword(null,"?reply-fn","?reply-fn",-1479510592),null,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861),null,new cljs.core.Keyword(null,"client-id","client-id",-464622140),null,new cljs.core.Keyword(null,"connected-uids","connected-uids",1454332231),null,new cljs.core.Keyword(null,"uid","uid",-1447769400),null,new cljs.core.Keyword(null,"event","event",301435442),null,new cljs.core.Keyword(null,"id","id",-1388402092),null,new cljs.core.Keyword(null,"ring-req","ring-req",-747861961),null,new cljs.core.Keyword(null,"?data","?data",-9471433),null,new cljs.core.Keyword(null,"send-fn","send-fn",351002041),null], null), null));
if(cljs.core.truth_(and__26809__auto____$1)){
var map__14693 = x;
var map__14693__$1 = ((((!((map__14693 == null)))?((((map__14693.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14693.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14693):map__14693);
var ch_recv = cljs.core.get.call(null,map__14693__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));
var send_fn = cljs.core.get.call(null,map__14693__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));
var connected_uids = cljs.core.get.call(null,map__14693__$1,new cljs.core.Keyword(null,"connected-uids","connected-uids",1454332231));
var ring_req = cljs.core.get.call(null,map__14693__$1,new cljs.core.Keyword(null,"ring-req","ring-req",-747861961));
var client_id = cljs.core.get.call(null,map__14693__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
var event = cljs.core.get.call(null,map__14693__$1,new cljs.core.Keyword(null,"event","event",301435442));
var _QMARK_reply_fn = cljs.core.get.call(null,map__14693__$1,new cljs.core.Keyword(null,"?reply-fn","?reply-fn",-1479510592));
var and__26809__auto____$2 = taoensso.encore.chan_QMARK_.call(null,ch_recv);
if(and__26809__auto____$2){
var and__26809__auto____$3 = cljs.core.ifn_QMARK_.call(null,send_fn);
if(and__26809__auto____$3){
var and__26809__auto____$4 = taoensso.encore.atom_QMARK_.call(null,connected_uids);
if(and__26809__auto____$4){
var and__26809__auto____$5 = cljs.core.map_QMARK_.call(null,ring_req);
if(and__26809__auto____$5){
var and__26809__auto____$6 = taoensso.encore.nblank_str_QMARK_.call(null,client_id);
if(and__26809__auto____$6){
var and__26809__auto____$7 = taoensso.sente.event_QMARK_.call(null,event);
if(cljs.core.truth_(and__26809__auto____$7)){
return ((_QMARK_reply_fn == null)) || (cljs.core.ifn_QMARK_.call(null,_QMARK_reply_fn));
} else {
return and__26809__auto____$7;
}
} else {
return and__26809__auto____$6;
}
} else {
return and__26809__auto____$5;
}
} else {
return and__26809__auto____$4;
}
} else {
return and__26809__auto____$3;
}
} else {
return and__26809__auto____$2;
}
} else {
return and__26809__auto____$1;
}
} else {
return and__26809__auto__;
}
});
/**
 * All server `event-msg`s go through this
 */
taoensso.sente.put_server_event_msg_GT_ch_recv_BANG_ = (function taoensso$sente$put_server_event_msg_GT_ch_recv_BANG_(ch_recv,p__14695){
var map__14701 = p__14695;
var map__14701__$1 = ((((!((map__14701 == null)))?((((map__14701.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14701.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14701):map__14701);
var ev_msg = map__14701__$1;
var event = cljs.core.get.call(null,map__14701__$1,new cljs.core.Keyword(null,"event","event",301435442));
var _QMARK_reply_fn = cljs.core.get.call(null,map__14701__$1,new cljs.core.Keyword(null,"?reply-fn","?reply-fn",-1479510592));
var vec__14703 = taoensso.sente.as_event.call(null,event);
var ev_id = cljs.core.nth.call(null,vec__14703,(0),null);
var ev__QMARK_data = cljs.core.nth.call(null,vec__14703,(1),null);
var valid_event = vec__14703;
var ev_msg_STAR_ = cljs.core.merge.call(null,ev_msg,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"event","event",301435442),valid_event,new cljs.core.Keyword(null,"?reply-fn","?reply-fn",-1479510592),_QMARK_reply_fn,new cljs.core.Keyword(null,"id","id",-1388402092),ev_id,new cljs.core.Keyword(null,"?data","?data",-9471433),ev__QMARK_data], null));
if(cljs.core.not.call(null,taoensso.sente.server_event_msg_QMARK_.call(null,ev_msg_STAR_))){
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init305516951502553584.clj",160,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__14703,ev_id,ev__QMARK_data,valid_event,ev_msg_STAR_,map__14701,map__14701__$1,ev_msg,event,_QMARK_reply_fn){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Bad ev-msg: %s",ev_msg], null);
});})(vec__14703,ev_id,ev__QMARK_data,valid_event,ev_msg_STAR_,map__14701,map__14701__$1,ev_msg,event,_QMARK_reply_fn))
,null)),null,-1453393197);
} else {
return cljs.core.async.put_BANG_.call(null,ch_recv,ev_msg_STAR_);
}
});
taoensso.sente.cb_error_QMARK_ = (function taoensso$sente$cb_error_QMARK_(cb_reply_clj){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword("chsk","closed","chsk/closed",-922855264),null,new cljs.core.Keyword("chsk","error","chsk/error",-984175439),null,new cljs.core.Keyword("chsk","timeout","chsk/timeout",-319776489),null], null), null).call(null,cb_reply_clj);
});
taoensso.sente.cb_success_QMARK_ = (function taoensso$sente$cb_success_QMARK_(cb_reply_clj){
return cljs.core.not.call(null,taoensso.sente.cb_error_QMARK_.call(null,cb_reply_clj));
});
/**
 * prefixed-pstr->[clj ?cb-uuid]
 */
taoensso.sente.unpack = (function taoensso$sente$unpack(packer,prefixed_pstr){
if(typeof prefixed_pstr === 'string'){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(string? prefixed-pstr)",prefixed_pstr,null,null);
}

var wrapped_QMARK_ = taoensso.encore.str_starts_with_QMARK_.call(null,prefixed_pstr,"+");
var pstr = cljs.core.subs.call(null,prefixed_pstr,(1));
var clj = (function (){try{return taoensso.sente.interfaces.unpack.call(null,packer,pstr);
}catch (e14713){var t = e14713;
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"taoensso.sente","/tmp/form-init305516951502553584.clj",181,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (t,wrapped_QMARK_,pstr){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Bad package: %s (%s)",pstr,t], null);
});})(t,wrapped_QMARK_,pstr))
,null)),null,1553313184);

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","bad-package","chsk/bad-package",501893679),pstr], null);
}})();
var vec__14710 = (cljs.core.truth_(wrapped_QMARK_)?clj:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj,null], null));
var clj__$1 = cljs.core.nth.call(null,vec__14710,(0),null);
var _QMARK_cb_uuid = cljs.core.nth.call(null,vec__14710,(1),null);
var _QMARK_cb_uuid__$1 = ((cljs.core._EQ_.call(null,(0),_QMARK_cb_uuid))?new cljs.core.Keyword(null,"ajax-cb","ajax-cb",-807060321):_QMARK_cb_uuid);
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",187,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (wrapped_QMARK_,pstr,clj,vec__14710,clj__$1,_QMARK_cb_uuid,_QMARK_cb_uuid__$1){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Unpacking: %s -> %s",prefixed_pstr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj__$1,_QMARK_cb_uuid__$1], null)], null);
});})(wrapped_QMARK_,pstr,clj,vec__14710,clj__$1,_QMARK_cb_uuid,_QMARK_cb_uuid__$1))
,null)),null,130811594);

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj__$1,_QMARK_cb_uuid__$1], null);
});
taoensso.sente.with__QMARK_meta = (function taoensso$sente$with__QMARK_meta(x,_QMARK_m){
if(cljs.core.seq.call(null,_QMARK_m)){
return cljs.core.with_meta.call(null,x,_QMARK_m);
} else {
return x;
}
});
/**
 * clj->prefixed-pstr
 */
taoensso.sente.pack = (function taoensso$sente$pack(var_args){
var args14714 = [];
var len__27348__auto___14717 = arguments.length;
var i__27349__auto___14718 = (0);
while(true){
if((i__27349__auto___14718 < len__27348__auto___14717)){
args14714.push((arguments[i__27349__auto___14718]));

var G__14719 = (i__27349__auto___14718 + (1));
i__27349__auto___14718 = G__14719;
continue;
} else {
}
break;
}

var G__14716 = args14714.length;
switch (G__14716) {
case 3:
return taoensso.sente.pack.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return taoensso.sente.pack.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14714.length)].join('')));

}
});

taoensso.sente.pack.cljs$core$IFn$_invoke$arity$3 = (function (packer,_QMARK_packer_meta,clj){
var pstr = [cljs.core.str("-"),cljs.core.str(taoensso.sente.interfaces.pack.call(null,packer,taoensso.sente.with__QMARK_meta.call(null,clj,_QMARK_packer_meta)))].join('');
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",197,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (pstr){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Packing (unwrapped): %s -> %s",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [_QMARK_packer_meta,clj], null),pstr], null);
});})(pstr))
,null)),null,646061674);

return pstr;
});

taoensso.sente.pack.cljs$core$IFn$_invoke$arity$4 = (function (packer,_QMARK_packer_meta,clj,_QMARK_cb_uuid){
var _QMARK_cb_uuid__$1 = ((cljs.core._EQ_.call(null,_QMARK_cb_uuid,new cljs.core.Keyword(null,"ajax-cb","ajax-cb",-807060321)))?(0):_QMARK_cb_uuid);
var wrapped_clj = (cljs.core.truth_(_QMARK_cb_uuid__$1)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj,_QMARK_cb_uuid__$1], null):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj], null));
var pstr = [cljs.core.str("+"),cljs.core.str(taoensso.sente.interfaces.pack.call(null,packer,taoensso.sente.with__QMARK_meta.call(null,wrapped_clj,_QMARK_packer_meta)))].join('');
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",207,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (_QMARK_cb_uuid__$1,wrapped_clj,pstr){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Packing (wrapped): %s -> %s",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [_QMARK_packer_meta,clj,_QMARK_cb_uuid__$1], null),pstr], null);
});})(_QMARK_cb_uuid__$1,wrapped_clj,pstr))
,null)),null,-146984556);

return pstr;
});

taoensso.sente.pack.cljs$lang$maxFixedArity = 4;


/**
* @constructor
 * @implements {taoensso.sente.interfaces.IPacker}
*/
taoensso.sente.EdnPacker = (function (){
})
taoensso.sente.EdnPacker.prototype.taoensso$sente$interfaces$IPacker$ = true;

taoensso.sente.EdnPacker.prototype.taoensso$sente$interfaces$IPacker$pack$arity$2 = (function (_,x){
var self__ = this;
var ___$1 = this;
return taoensso.encore.pr_edn.call(null,x);
});

taoensso.sente.EdnPacker.prototype.taoensso$sente$interfaces$IPacker$unpack$arity$2 = (function (_,s){
var self__ = this;
var ___$1 = this;
return taoensso.encore.read_edn.call(null,s);
});

taoensso.sente.EdnPacker.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

taoensso.sente.EdnPacker.cljs$lang$type = true;

taoensso.sente.EdnPacker.cljs$lang$ctorStr = "taoensso.sente/EdnPacker";

taoensso.sente.EdnPacker.cljs$lang$ctorPrWriter = (function (this__27047__auto__,writer__27048__auto__,opt__27049__auto__){
return cljs.core._write.call(null,writer__27048__auto__,"taoensso.sente/EdnPacker");
});

taoensso.sente.__GT_EdnPacker = (function taoensso$sente$__GT_EdnPacker(){
return (new taoensso.sente.EdnPacker());
});

taoensso.sente.default_edn_packer = (new taoensso.sente.EdnPacker());
taoensso.sente.coerce_packer = (function taoensso$sente$coerce_packer(x){
if(cljs.core._EQ_.call(null,x,new cljs.core.Keyword(null,"edn","edn",1317840885))){
return taoensso.sente.default_edn_packer;
} else {
var e = (function (){try{if((function (p1__14721_SHARP_){
if(!((p1__14721_SHARP_ == null))){
if((false) || (p1__14721_SHARP_.taoensso$sente$interfaces$IPacker$)){
return true;
} else {
if((!p1__14721_SHARP_.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,taoensso.sente.interfaces.IPacker,p1__14721_SHARP_);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,taoensso.sente.interfaces.IPacker,p1__14721_SHARP_);
}
}).call(null,x)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e14724){if((e14724 instanceof Error)){
var e = e14724;
return e;
} else {
throw e14724;

}
}})();
if((e == null)){
return x;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"((fn* [p1__14721#] (satisfies? interfaces/IPacker p1__14721#)) x)",x,e,null);
}
}
});


/**
 * Takes a web server adapter[1] and returns a map with keys:
 *  :ch-recv ; core.async channel to receive `event-msg`s (internal or from clients).
 *  :send-fn ; (fn [user-id ev] for server>user push.
 *  :ajax-post-fn                ; (fn [ring-req]) for Ring CSRF-POST + chsk URL.
 *  :ajax-get-or-ws-handshake-fn ; (fn [ring-req]) for Ring GET + chsk URL.
 *  :connected-uids ; Watchable, read-only (atom {:ws #{_} :ajax #{_} :any #{_}}).
 * 
 *   Common options:
 *  :user-id-fn        ; (fn [ring-req]) -> unique user-id for server>user push.
 *  :csrf-token-fn     ; (fn [ring-req]) -> CSRF token for Ajax POSTs.
 *  :handshake-data-fn ; (fn [ring-req]) -> arb user data to append to handshake evs.
 *  :ws-kalive-ms      ; Ping to keep a WebSocket conn alive if no activity
 *                     ; w/in given msecs.
 *  :lp-timeout-ms     ; Timeout (repoll) long-polling Ajax conns after given msecs.
 *  :send-buf-ms-ajax  ; [2]
 *  :send-buf-ms-ws    ; [2]
 *  :packer            ; :edn (default), or an IPacker implementation.
 * 
 *   [1] e.g. `(taoensso.sente.server-adapters.http-kit/get-sch-adapter)` or
 *         `(taoensso.sente.server-adapters.immutant/get-sch-adapter)`.
 *    You must have the necessary web-server dependency in your project.clj and
 *    the necessary entry in your namespace's `ns` form.
 * 
 *   [2] Optimization to allow transparent batching of rapidly-triggered
 *    server>user pushes. This is esp. important for Ajax clients which use a
 *    (slow) reconnecting poller. Actual event dispatch may occur <= given ms
 *    after send call (larger values => larger batch windows).
 */
taoensso.sente.make_channel_socket_server_BANG_ = (function taoensso$sente$make_channel_socket_server_BANG_(var_args){
var args__27351__auto__ = [];
var len__27348__auto___15032 = arguments.length;
var i__27349__auto___15033 = (0);
while(true){
if((i__27349__auto___15033 < len__27348__auto___15032)){
args__27351__auto__.push((arguments[i__27349__auto___15033]));

var G__15034 = (i__27349__auto___15033 + (1));
i__27349__auto___15033 = G__15034;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.sente.make_channel_socket_server_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.sente.make_channel_socket_server_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (web_server_ch_adapter,p__14729){
var vec__14730 = p__14729;
var map__14733 = cljs.core.nth.call(null,vec__14730,(0),null);
var map__14733__$1 = ((((!((map__14733 == null)))?((((map__14733.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14733.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14733):map__14733);
var recv_buf_or_n = cljs.core.get.call(null,map__14733__$1,new cljs.core.Keyword(null,"recv-buf-or-n","recv-buf-or-n",1363950355),cljs.core.async.sliding_buffer.call(null,(1000)));
var ws_kalive_ms = cljs.core.get.call(null,map__14733__$1,new cljs.core.Keyword(null,"ws-kalive-ms","ws-kalive-ms",1442179968),taoensso.encore.ms.call(null,new cljs.core.Keyword(null,"secs","secs",1532330091),(25)));
var lp_timeout_ms = cljs.core.get.call(null,map__14733__$1,new cljs.core.Keyword(null,"lp-timeout-ms","lp-timeout-ms",-1451963133),taoensso.encore.ms.call(null,new cljs.core.Keyword(null,"secs","secs",1532330091),(20)));
var send_buf_ms_ajax = cljs.core.get.call(null,map__14733__$1,new cljs.core.Keyword(null,"send-buf-ms-ajax","send-buf-ms-ajax",1546129037),(100));
var send_buf_ms_ws = cljs.core.get.call(null,map__14733__$1,new cljs.core.Keyword(null,"send-buf-ms-ws","send-buf-ms-ws",-1149586238),(30));
var user_id_fn = cljs.core.get.call(null,map__14733__$1,new cljs.core.Keyword(null,"user-id-fn","user-id-fn",-1532150029),((function (vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws){
return (function (ring_req){
return cljs.core.get_in.call(null,ring_req,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"session","session",1008279103),new cljs.core.Keyword(null,"uid","uid",-1447769400)], null));
});})(vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws))
);
var csrf_token_fn = cljs.core.get.call(null,map__14733__$1,new cljs.core.Keyword(null,"csrf-token-fn","csrf-token-fn",-1846298394),((function (vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn){
return (function (ring_req){
var or__26817__auto__ = cljs.core.get_in.call(null,ring_req,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"session","session",1008279103),new cljs.core.Keyword(null,"csrf-token","csrf-token",-1872302856)], null));
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
var or__26817__auto____$1 = cljs.core.get_in.call(null,ring_req,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"session","session",1008279103),new cljs.core.Keyword("ring.middleware.anti-forgery","anti-forgery-token","ring.middleware.anti-forgery/anti-forgery-token",571563484)], null));
if(cljs.core.truth_(or__26817__auto____$1)){
return or__26817__auto____$1;
} else {
return cljs.core.get_in.call(null,ring_req,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"session","session",1008279103),"__anti-forgery-token"], null));
}
}
});})(vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn))
);
var handshake_data_fn = cljs.core.get.call(null,map__14733__$1,new cljs.core.Keyword(null,"handshake-data-fn","handshake-data-fn",2011983089),((function (vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn){
return (function (ring_req){
return null;
});})(vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn))
);
var packer = cljs.core.get.call(null,map__14733__$1,new cljs.core.Keyword(null,"packer","packer",66077544),new cljs.core.Keyword(null,"edn","edn",1317840885));
new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var e = (function (){try{if(taoensso.encore.pos_int_QMARK_.call(null,send_buf_ms_ajax)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e14735){if((e14735 instanceof Error)){
var e = e14735;
return e;
} else {
throw e14735;

}
}})();
if((e == null)){
return true;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(enc/pos-int? send-buf-ms-ajax)",send_buf_ms_ajax,e,null);
}
})(),(function (){var e = (function (){try{if(taoensso.encore.pos_int_QMARK_.call(null,send_buf_ms_ws)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e14736){if((e14736 instanceof Error)){
var e = e14736;
return e;
} else {
throw e14736;

}
}})();
if((e == null)){
return true;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(enc/pos-int? send-buf-ms-ws)",send_buf_ms_ws,e,null);
}
})()], null);

var e_15035 = (function (){try{if(((function (vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (p1__14726_SHARP_){
if(!((p1__14726_SHARP_ == null))){
if((false) || (p1__14726_SHARP_.taoensso$sente$interfaces$IServerChanAdapter$)){
return true;
} else {
if((!p1__14726_SHARP_.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,taoensso.sente.interfaces.IServerChanAdapter,p1__14726_SHARP_);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,taoensso.sente.interfaces.IServerChanAdapter,p1__14726_SHARP_);
}
});})(vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
.call(null,web_server_ch_adapter)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e14737){if((e14737 instanceof Error)){
var e = e14737;
return e;
} else {
throw e14737;

}
}})();
if((e_15035 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"((fn* [p1__14726#] (satisfies? interfaces/IServerChanAdapter p1__14726#)) web-server-ch-adapter)",web_server_ch_adapter,e_15035,null);
}

var max_ms_15036 = taoensso.sente.default_client_side_ajax_timeout_ms;
if((lp_timeout_ms >= max_ms_15036)){
throw cljs.core.ex_info.call(null,[cljs.core.str(":lp-timeout-ms must be < "),cljs.core.str(max_ms_15036)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lp-timeout-ms","lp-timeout-ms",-1451963133),lp_timeout_ms,new cljs.core.Keyword(null,"default-client-side-ajax-timeout-ms","default-client-side-ajax-timeout-ms",1149929762),max_ms_15036], null));
} else {
}

var packer__$1 = taoensso.sente.coerce_packer.call(null,packer);
var ch_recv = cljs.core.async.chan.call(null,recv_buf_or_n);
var user_id_fn__$1 = ((function (packer__$1,ch_recv,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (ring_req,client_id){
var or__26817__auto__ = user_id_fn.call(null,cljs.core.assoc.call(null,ring_req,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id));
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return new cljs.core.Keyword("taoensso.sente","nil-uid","taoensso.sente/nil-uid",-2111603486);
}
});})(packer__$1,ch_recv,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
var conns_ = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ws","ws",86841443),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ajax","ajax",814345549),cljs.core.PersistentArrayMap.EMPTY], null));
var send_buffers_ = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ws","ws",86841443),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ajax","ajax",814345549),cljs.core.PersistentArrayMap.EMPTY], null));
var connected_uids_ = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ws","ws",86841443),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"ajax","ajax",814345549),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"any","any",1705907423),cljs.core.PersistentHashSet.EMPTY], null));
var upd_conn_BANG_ = ((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var G__15037 = null;
var G__15037__3 = (function (conn_type,uid,client_id){
return taoensso.encore.swap_in_BANG_.call(null,conns_,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [conn_type,uid,client_id], null),((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (_QMARK_v){
var vec__14739 = _QMARK_v;
var _QMARK_sch = cljs.core.nth.call(null,vec__14739,(0),null);
var _udt = cljs.core.nth.call(null,vec__14739,(1),null);
var new_udt = taoensso.encore.now_udt.call(null);
return taoensso.encore.swapped.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [_QMARK_sch,new_udt], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"init?","init?",438181499),(_QMARK_v == null),new cljs.core.Keyword(null,"udt","udt",2011712751),new_udt,new cljs.core.Keyword(null,"?sch","?sch",2064493898),_QMARK_sch], null));
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);
});
var G__15037__4 = (function (conn_type,uid,client_id,new__QMARK_sch){
return taoensso.encore.swap_in_BANG_.call(null,conns_,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [conn_type,uid,client_id], null),((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (_QMARK_v){
var new_udt = taoensso.encore.now_udt.call(null);
return taoensso.encore.swapped.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new__QMARK_sch,new_udt], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"init?","init?",438181499),(_QMARK_v == null),new cljs.core.Keyword(null,"udt","udt",2011712751),new_udt,new cljs.core.Keyword(null,"?sch","?sch",2064493898),new__QMARK_sch], null));
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);
});
G__15037 = function(conn_type,uid,client_id,new__QMARK_sch){
switch(arguments.length){
case 3:
return G__15037__3.call(this,conn_type,uid,client_id);
case 4:
return G__15037__4.call(this,conn_type,uid,client_id,new__QMARK_sch);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__15037.cljs$core$IFn$_invoke$arity$3 = G__15037__3;
G__15037.cljs$core$IFn$_invoke$arity$4 = G__15037__4;
return G__15037;
})()
;})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
var connect_uid_BANG_ = ((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (conn_type,uid){
if(cljs.core.truth_((function (){var e = (function (){try{if(cljs.core.truth_(taoensso.truss.impl.nnil_QMARK_.call(null,uid))){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e14742){if((e14742 instanceof Error)){
var e = e14742;
return e;
} else {
throw e14742;

}
}})();
if((e == null)){
return true;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(taoensso.truss.impl/nnil? uid)",uid,e,null);
}
})())){
} else {
throw (new Error("Assert failed: (have? uid)"));
}

var newly_connected_QMARK_ = taoensso.encore.swap_in_BANG_.call(null,connected_uids_,cljs.core.PersistentVector.EMPTY,((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (p__14743){
var map__14744 = p__14743;
var map__14744__$1 = ((((!((map__14744 == null)))?((((map__14744.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14744.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14744):map__14744);
var old_m = map__14744__$1;
var ws = cljs.core.get.call(null,map__14744__$1,new cljs.core.Keyword(null,"ws","ws",86841443));
var ajax = cljs.core.get.call(null,map__14744__$1,new cljs.core.Keyword(null,"ajax","ajax",814345549));
var any = cljs.core.get.call(null,map__14744__$1,new cljs.core.Keyword(null,"any","any",1705907423));
var new_m = (function (){var G__14746 = (((conn_type instanceof cljs.core.Keyword))?conn_type.fqn:null);
switch (G__14746) {
case "ws":
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ws","ws",86841443),cljs.core.conj.call(null,ws,uid),new cljs.core.Keyword(null,"ajax","ajax",814345549),ajax,new cljs.core.Keyword(null,"any","any",1705907423),cljs.core.conj.call(null,any,uid)], null);

break;
case "ajax":
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ws","ws",86841443),ws,new cljs.core.Keyword(null,"ajax","ajax",814345549),cljs.core.conj.call(null,ajax,uid),new cljs.core.Keyword(null,"any","any",1705907423),cljs.core.conj.call(null,any,uid)], null);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(conn_type)].join('')));

}
})();
return taoensso.encore.swapped.call(null,new_m,(function (){var old_any = new cljs.core.Keyword(null,"any","any",1705907423).cljs$core$IFn$_invoke$arity$1(old_m);
var new_any = new cljs.core.Keyword(null,"any","any",1705907423).cljs$core$IFn$_invoke$arity$1(new_m);
if((!(cljs.core.contains_QMARK_.call(null,old_any,uid))) && (cljs.core.contains_QMARK_.call(null,new_any,uid))){
return new cljs.core.Keyword(null,"newly-connected","newly-connected",-2029862681);
} else {
return null;
}
})());
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);
return newly_connected_QMARK_;
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
var upd_connected_uid_BANG_ = ((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (uid){
if(cljs.core.truth_((function (){var e = (function (){try{if(cljs.core.truth_(taoensso.truss.impl.nnil_QMARK_.call(null,uid))){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e14747){if((e14747 instanceof Error)){
var e = e14747;
return e;
} else {
throw e14747;

}
}})();
if((e == null)){
return true;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(taoensso.truss.impl/nnil? uid)",uid,e,null);
}
})())){
} else {
throw (new Error("Assert failed: (have? uid)"));
}

var newly_disconnected_QMARK_ = taoensso.encore.swap_in_BANG_.call(null,connected_uids_,cljs.core.PersistentVector.EMPTY,((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (p__14748){
var map__14749 = p__14748;
var map__14749__$1 = ((((!((map__14749 == null)))?((((map__14749.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14749.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14749):map__14749);
var old_m = map__14749__$1;
var ws = cljs.core.get.call(null,map__14749__$1,new cljs.core.Keyword(null,"ws","ws",86841443));
var ajax = cljs.core.get.call(null,map__14749__$1,new cljs.core.Keyword(null,"ajax","ajax",814345549));
var any = cljs.core.get.call(null,map__14749__$1,new cljs.core.Keyword(null,"any","any",1705907423));
var conns_SINGLEQUOTE_ = cljs.core.deref.call(null,conns_);
var any_ws_clients_QMARK_ = cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"ws","ws",86841443).cljs$core$IFn$_invoke$arity$1(conns_SINGLEQUOTE_),uid);
var any_ajax_clients_QMARK_ = cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword(null,"ajax","ajax",814345549).cljs$core$IFn$_invoke$arity$1(conns_SINGLEQUOTE_),uid);
var any_clients_QMARK_ = (any_ws_clients_QMARK_) || (any_ajax_clients_QMARK_);
var new_m = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ws","ws",86841443),((any_ws_clients_QMARK_)?cljs.core.conj.call(null,ws,uid):cljs.core.disj.call(null,ws,uid)),new cljs.core.Keyword(null,"ajax","ajax",814345549),((any_ajax_clients_QMARK_)?cljs.core.conj.call(null,ajax,uid):cljs.core.disj.call(null,ajax,uid)),new cljs.core.Keyword(null,"any","any",1705907423),((any_clients_QMARK_)?cljs.core.conj.call(null,any,uid):cljs.core.disj.call(null,any,uid))], null);
return taoensso.encore.swapped.call(null,new_m,(function (){var old_any = new cljs.core.Keyword(null,"any","any",1705907423).cljs$core$IFn$_invoke$arity$1(old_m);
var new_any = new cljs.core.Keyword(null,"any","any",1705907423).cljs$core$IFn$_invoke$arity$1(new_m);
if((cljs.core.contains_QMARK_.call(null,old_any,uid)) && (!(cljs.core.contains_QMARK_.call(null,new_any,uid)))){
return new cljs.core.Keyword(null,"newly-disconnected","newly-disconnected",-1586164962);
} else {
return null;
}
})());
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);
return newly_disconnected_QMARK_;
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
var send_fn = ((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() { 
var G__15039__delegate = function (user_id,ev,p__14751){
var vec__14752 = p__14751;
var map__14755 = cljs.core.nth.call(null,vec__14752,(0),null);
var map__14755__$1 = ((((!((map__14755 == null)))?((((map__14755.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14755.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14755):map__14755);
var opts = map__14755__$1;
var flush_QMARK_ = cljs.core.get.call(null,map__14755__$1,new cljs.core.Keyword(null,"flush?","flush?",-108887231));
var uid_15040 = ((cljs.core._EQ_.call(null,user_id,new cljs.core.Keyword("sente","all-users-without-uid","sente/all-users-without-uid",-42979578)))?new cljs.core.Keyword("taoensso.sente","nil-uid","taoensso.sente/nil-uid",-2111603486):user_id);
var __15041 = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",376,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (uid_15040,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk send: (->uid %s) %s",uid_15040,ev], null);
});})(uid_15040,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,1226515284);
var __15042__$1 = (cljs.core.truth_(uid_15040)?null:(function(){throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Support for sending to `nil` user-ids has been REMOVED. "),cljs.core.str("Please send to `:sente/all-users-without-uid` instead.")].join('')),cljs.core.str("\n"),cljs.core.str("uid")].join('')))})());
var __15043__$2 = taoensso.sente.assert_event.call(null,ev);
var ev_uuid_15044 = taoensso.encore.uuid_str.call(null);
var flush_buffer_BANG__15045 = ((function (uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (conn_type){
var temp__4657__auto__ = taoensso.encore.swap_in_BANG_.call(null,send_buffers_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [conn_type], null),((function (uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (m){
var vec__14757 = cljs.core.get.call(null,m,uid_15040);
var ___$3 = cljs.core.nth.call(null,vec__14757,(0),null);
var ev_uuids = cljs.core.nth.call(null,vec__14757,(1),null);
if(cljs.core.contains_QMARK_.call(null,ev_uuids,ev_uuid_15044)){
return taoensso.encore.swapped.call(null,cljs.core.dissoc.call(null,m,uid_15040),cljs.core.get.call(null,m,uid_15040));
} else {
return taoensso.encore.swapped.call(null,m,null);
}
});})(uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);
if(cljs.core.truth_(temp__4657__auto__)){
var pulled = temp__4657__auto__;
var vec__14760 = pulled;
var buffered_evs = cljs.core.nth.call(null,vec__14760,(0),null);
var ev_uuids = cljs.core.nth.call(null,vec__14760,(1),null);
if(cljs.core.vector_QMARK_.call(null,buffered_evs)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(vector? buffered-evs)",buffered_evs,null,null);
}

if(cljs.core.set_QMARK_.call(null,ev_uuids)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(set? ev-uuids)",ev_uuids,null,null);
}

var packer_metas = cljs.core.mapv.call(null,cljs.core.meta,buffered_evs);
var combined_packer_meta = cljs.core.reduce.call(null,cljs.core.merge,cljs.core.PersistentArrayMap.EMPTY,packer_metas);
var buffered_evs_ppstr = taoensso.sente.pack.call(null,packer__$1,combined_packer_meta,buffered_evs);
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",412,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (packer_metas,combined_packer_meta,buffered_evs_ppstr,vec__14760,buffered_evs,ev_uuids,pulled,temp__4657__auto__,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["buffered-evs-ppstr: %s (with meta %s)",buffered_evs_ppstr,combined_packer_meta], null);
});})(packer_metas,combined_packer_meta,buffered_evs_ppstr,vec__14760,buffered_evs,ev_uuids,pulled,temp__4657__auto__,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,1486755662);

var G__14763 = (((conn_type instanceof cljs.core.Keyword))?conn_type.fqn:null);
switch (G__14763) {
case "ws":
return taoensso.sente.send_buffered_server_evs_GT_ws_clients_BANG_.call(null,conns_,uid_15040,buffered_evs_ppstr,upd_conn_BANG_);

break;
case "ajax":
return taoensso.sente.send_buffered_server_evs_GT_ajax_clients_BANG_.call(null,conns_,uid_15040,buffered_evs_ppstr);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(conn_type)].join('')));

}
} else {
return null;
}
});})(uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
if(cljs.core._EQ_.call(null,ev,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","close","chsk/close",1840295819)], null))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"taoensso.sente","/tmp/form-init305516951502553584.clj",423,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk closing (client may reconnect): %s",uid_15040], null);
});})(uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,75285847);

if(cljs.core.truth_(flush_QMARK_)){
flush_buffer_BANG__15045.call(null,new cljs.core.Keyword(null,"ws","ws",86841443));

flush_buffer_BANG__15045.call(null,new cljs.core.Keyword(null,"ajax","ajax",814345549));
} else {
}

var seq__14764_15047 = cljs.core.seq.call(null,cljs.core.vals.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,conns_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ws","ws",86841443),uid_15040], null))));
var chunk__14765_15048 = null;
var count__14766_15049 = (0);
var i__14767_15050 = (0);
while(true){
if((i__14767_15050 < count__14766_15049)){
var vec__14768_15051 = cljs.core._nth.call(null,chunk__14765_15048,i__14767_15050);
var _QMARK_sch_15052 = cljs.core.nth.call(null,vec__14768_15051,(0),null);
var _udt_15053 = cljs.core.nth.call(null,vec__14768_15051,(1),null);
var temp__4657__auto___15054 = _QMARK_sch_15052;
if(cljs.core.truth_(temp__4657__auto___15054)){
var sch_15055 = temp__4657__auto___15054;
taoensso.sente.interfaces.sch_close_BANG_.call(null,sch_15055);
} else {
}

var G__15056 = seq__14764_15047;
var G__15057 = chunk__14765_15048;
var G__15058 = count__14766_15049;
var G__15059 = (i__14767_15050 + (1));
seq__14764_15047 = G__15056;
chunk__14765_15048 = G__15057;
count__14766_15049 = G__15058;
i__14767_15050 = G__15059;
continue;
} else {
var temp__4657__auto___15060 = cljs.core.seq.call(null,seq__14764_15047);
if(temp__4657__auto___15060){
var seq__14764_15061__$1 = temp__4657__auto___15060;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14764_15061__$1)){
var c__27200__auto___15062 = cljs.core.chunk_first.call(null,seq__14764_15061__$1);
var G__15063 = cljs.core.chunk_rest.call(null,seq__14764_15061__$1);
var G__15064 = c__27200__auto___15062;
var G__15065 = cljs.core.count.call(null,c__27200__auto___15062);
var G__15066 = (0);
seq__14764_15047 = G__15063;
chunk__14765_15048 = G__15064;
count__14766_15049 = G__15065;
i__14767_15050 = G__15066;
continue;
} else {
var vec__14771_15067 = cljs.core.first.call(null,seq__14764_15061__$1);
var _QMARK_sch_15068 = cljs.core.nth.call(null,vec__14771_15067,(0),null);
var _udt_15069 = cljs.core.nth.call(null,vec__14771_15067,(1),null);
var temp__4657__auto___15070__$1 = _QMARK_sch_15068;
if(cljs.core.truth_(temp__4657__auto___15070__$1)){
var sch_15071 = temp__4657__auto___15070__$1;
taoensso.sente.interfaces.sch_close_BANG_.call(null,sch_15071);
} else {
}

var G__15072 = cljs.core.next.call(null,seq__14764_15061__$1);
var G__15073 = null;
var G__15074 = (0);
var G__15075 = (0);
seq__14764_15047 = G__15072;
chunk__14765_15048 = G__15073;
count__14766_15049 = G__15074;
i__14767_15050 = G__15075;
continue;
}
} else {
}
}
break;
}

var seq__14774_15076 = cljs.core.seq.call(null,cljs.core.vals.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,conns_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ajax","ajax",814345549),uid_15040], null))));
var chunk__14775_15077 = null;
var count__14776_15078 = (0);
var i__14777_15079 = (0);
while(true){
if((i__14777_15079 < count__14776_15078)){
var vec__14778_15080 = cljs.core._nth.call(null,chunk__14775_15077,i__14777_15079);
var _QMARK_sch_15081 = cljs.core.nth.call(null,vec__14778_15080,(0),null);
var _udt_15082 = cljs.core.nth.call(null,vec__14778_15080,(1),null);
var temp__4657__auto___15083 = _QMARK_sch_15081;
if(cljs.core.truth_(temp__4657__auto___15083)){
var sch_15084 = temp__4657__auto___15083;
taoensso.sente.interfaces.sch_close_BANG_.call(null,sch_15084);
} else {
}

var G__15085 = seq__14774_15076;
var G__15086 = chunk__14775_15077;
var G__15087 = count__14776_15078;
var G__15088 = (i__14777_15079 + (1));
seq__14774_15076 = G__15085;
chunk__14775_15077 = G__15086;
count__14776_15078 = G__15087;
i__14777_15079 = G__15088;
continue;
} else {
var temp__4657__auto___15089 = cljs.core.seq.call(null,seq__14774_15076);
if(temp__4657__auto___15089){
var seq__14774_15090__$1 = temp__4657__auto___15089;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14774_15090__$1)){
var c__27200__auto___15091 = cljs.core.chunk_first.call(null,seq__14774_15090__$1);
var G__15092 = cljs.core.chunk_rest.call(null,seq__14774_15090__$1);
var G__15093 = c__27200__auto___15091;
var G__15094 = cljs.core.count.call(null,c__27200__auto___15091);
var G__15095 = (0);
seq__14774_15076 = G__15092;
chunk__14775_15077 = G__15093;
count__14776_15078 = G__15094;
i__14777_15079 = G__15095;
continue;
} else {
var vec__14781_15096 = cljs.core.first.call(null,seq__14774_15090__$1);
var _QMARK_sch_15097 = cljs.core.nth.call(null,vec__14781_15096,(0),null);
var _udt_15098 = cljs.core.nth.call(null,vec__14781_15096,(1),null);
var temp__4657__auto___15099__$1 = _QMARK_sch_15097;
if(cljs.core.truth_(temp__4657__auto___15099__$1)){
var sch_15100 = temp__4657__auto___15099__$1;
taoensso.sente.interfaces.sch_close_BANG_.call(null,sch_15100);
} else {
}

var G__15101 = cljs.core.next.call(null,seq__14774_15090__$1);
var G__15102 = null;
var G__15103 = (0);
var G__15104 = (0);
seq__14774_15076 = G__15101;
chunk__14775_15077 = G__15102;
count__14776_15078 = G__15103;
i__14777_15079 = G__15104;
continue;
}
} else {
}
}
break;
}
} else {
var seq__14784_15105 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ws","ws",86841443),new cljs.core.Keyword(null,"ajax","ajax",814345549)], null));
var chunk__14785_15106 = null;
var count__14786_15107 = (0);
var i__14787_15108 = (0);
while(true){
if((i__14787_15108 < count__14786_15107)){
var conn_type_15109 = cljs.core._nth.call(null,chunk__14785_15106,i__14787_15108);
taoensso.encore.swap_in_BANG_.call(null,send_buffers_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [conn_type_15109,uid_15040], null),((function (seq__14784_15105,chunk__14785_15106,count__14786_15107,i__14787_15108,conn_type_15109,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (_QMARK_v){
if(cljs.core.not.call(null,_QMARK_v)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ev], null),cljs.core.PersistentHashSet.fromArray([ev_uuid_15044], true)], null);
} else {
var vec__14788 = _QMARK_v;
var buffered_evs = cljs.core.nth.call(null,vec__14788,(0),null);
var ev_uuids = cljs.core.nth.call(null,vec__14788,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.call(null,buffered_evs,ev),cljs.core.conj.call(null,ev_uuids,ev_uuid_15044)], null);
}
});})(seq__14784_15105,chunk__14785_15106,count__14786_15107,i__14787_15108,conn_type_15109,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

var G__15110 = seq__14784_15105;
var G__15111 = chunk__14785_15106;
var G__15112 = count__14786_15107;
var G__15113 = (i__14787_15108 + (1));
seq__14784_15105 = G__15110;
chunk__14785_15106 = G__15111;
count__14786_15107 = G__15112;
i__14787_15108 = G__15113;
continue;
} else {
var temp__4657__auto___15114 = cljs.core.seq.call(null,seq__14784_15105);
if(temp__4657__auto___15114){
var seq__14784_15115__$1 = temp__4657__auto___15114;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14784_15115__$1)){
var c__27200__auto___15116 = cljs.core.chunk_first.call(null,seq__14784_15115__$1);
var G__15117 = cljs.core.chunk_rest.call(null,seq__14784_15115__$1);
var G__15118 = c__27200__auto___15116;
var G__15119 = cljs.core.count.call(null,c__27200__auto___15116);
var G__15120 = (0);
seq__14784_15105 = G__15117;
chunk__14785_15106 = G__15118;
count__14786_15107 = G__15119;
i__14787_15108 = G__15120;
continue;
} else {
var conn_type_15121 = cljs.core.first.call(null,seq__14784_15115__$1);
taoensso.encore.swap_in_BANG_.call(null,send_buffers_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [conn_type_15121,uid_15040], null),((function (seq__14784_15105,chunk__14785_15106,count__14786_15107,i__14787_15108,conn_type_15121,seq__14784_15115__$1,temp__4657__auto___15114,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (_QMARK_v){
if(cljs.core.not.call(null,_QMARK_v)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ev], null),cljs.core.PersistentHashSet.fromArray([ev_uuid_15044], true)], null);
} else {
var vec__14791 = _QMARK_v;
var buffered_evs = cljs.core.nth.call(null,vec__14791,(0),null);
var ev_uuids = cljs.core.nth.call(null,vec__14791,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.call(null,buffered_evs,ev),cljs.core.conj.call(null,ev_uuids,ev_uuid_15044)], null);
}
});})(seq__14784_15105,chunk__14785_15106,count__14786_15107,i__14787_15108,conn_type_15121,seq__14784_15115__$1,temp__4657__auto___15114,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

var G__15122 = cljs.core.next.call(null,seq__14784_15115__$1);
var G__15123 = null;
var G__15124 = (0);
var G__15125 = (0);
seq__14784_15105 = G__15122;
chunk__14785_15106 = G__15123;
count__14786_15107 = G__15124;
i__14787_15108 = G__15125;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(flush_QMARK_)){
flush_buffer_BANG__15045.call(null,new cljs.core.Keyword(null,"ws","ws",86841443));

flush_buffer_BANG__15045.call(null,new cljs.core.Keyword(null,"ajax","ajax",814345549));
} else {
var ws_timeout_15126 = cljs.core.async.timeout.call(null,send_buf_ms_ws);
var ajax_timeout_15127 = cljs.core.async.timeout.call(null,send_buf_ms_ajax);
var c__8341__auto___15128 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___15128,ws_timeout_15126,ajax_timeout_15127,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___15128,ws_timeout_15126,ajax_timeout_15127,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (state_14798){
var state_val_14799 = (state_14798[(1)]);
if((state_val_14799 === (1))){
var state_14798__$1 = state_14798;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14798__$1,(2),ws_timeout_15126);
} else {
if((state_val_14799 === (2))){
var inst_14795 = (state_14798[(2)]);
var inst_14796 = flush_buffer_BANG__15045.call(null,new cljs.core.Keyword(null,"ws","ws",86841443));
var state_14798__$1 = (function (){var statearr_14800 = state_14798;
(statearr_14800[(7)] = inst_14795);

return statearr_14800;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14798__$1,inst_14796);
} else {
return null;
}
}
});})(c__8341__auto___15128,ws_timeout_15126,ajax_timeout_15127,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
return ((function (switch__8229__auto__,c__8341__auto___15128,ws_timeout_15126,ajax_timeout_15127,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$state_machine__8230__auto__ = null;
var taoensso$sente$state_machine__8230__auto____0 = (function (){
var statearr_14804 = [null,null,null,null,null,null,null,null];
(statearr_14804[(0)] = taoensso$sente$state_machine__8230__auto__);

(statearr_14804[(1)] = (1));

return statearr_14804;
});
var taoensso$sente$state_machine__8230__auto____1 = (function (state_14798){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_14798);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e14805){if((e14805 instanceof Object)){
var ex__8233__auto__ = e14805;
var statearr_14806_15129 = state_14798;
(statearr_14806_15129[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14798);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14805;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15130 = state_14798;
state_14798 = G__15130;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
taoensso$sente$state_machine__8230__auto__ = function(state_14798){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__8230__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__8230__auto____1.call(this,state_14798);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__8230__auto____0;
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__8230__auto____1;
return taoensso$sente$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___15128,ws_timeout_15126,ajax_timeout_15127,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var state__8343__auto__ = (function (){var statearr_14807 = f__8342__auto__.call(null);
(statearr_14807[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___15128);

return statearr_14807;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___15128,ws_timeout_15126,ajax_timeout_15127,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);


var c__8341__auto___15131 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___15131,ws_timeout_15126,ajax_timeout_15127,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___15131,ws_timeout_15126,ajax_timeout_15127,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (state_14812){
var state_val_14813 = (state_14812[(1)]);
if((state_val_14813 === (1))){
var state_14812__$1 = state_14812;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14812__$1,(2),ajax_timeout_15127);
} else {
if((state_val_14813 === (2))){
var inst_14809 = (state_14812[(2)]);
var inst_14810 = flush_buffer_BANG__15045.call(null,new cljs.core.Keyword(null,"ajax","ajax",814345549));
var state_14812__$1 = (function (){var statearr_14814 = state_14812;
(statearr_14814[(7)] = inst_14809);

return statearr_14814;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14812__$1,inst_14810);
} else {
return null;
}
}
});})(c__8341__auto___15131,ws_timeout_15126,ajax_timeout_15127,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
return ((function (switch__8229__auto__,c__8341__auto___15131,ws_timeout_15126,ajax_timeout_15127,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$state_machine__8230__auto__ = null;
var taoensso$sente$state_machine__8230__auto____0 = (function (){
var statearr_14818 = [null,null,null,null,null,null,null,null];
(statearr_14818[(0)] = taoensso$sente$state_machine__8230__auto__);

(statearr_14818[(1)] = (1));

return statearr_14818;
});
var taoensso$sente$state_machine__8230__auto____1 = (function (state_14812){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_14812);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e14819){if((e14819 instanceof Object)){
var ex__8233__auto__ = e14819;
var statearr_14820_15132 = state_14812;
(statearr_14820_15132[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14812);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14819;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15133 = state_14812;
state_14812 = G__15133;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
taoensso$sente$state_machine__8230__auto__ = function(state_14812){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__8230__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__8230__auto____1.call(this,state_14812);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__8230__auto____0;
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__8230__auto____1;
return taoensso$sente$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___15131,ws_timeout_15126,ajax_timeout_15127,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var state__8343__auto__ = (function (){var statearr_14821 = f__8342__auto__.call(null);
(statearr_14821[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___15131);

return statearr_14821;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___15131,ws_timeout_15126,ajax_timeout_15127,uid_15040,__15041,__15042__$1,__15043__$2,ev_uuid_15044,flush_buffer_BANG__15045,vec__14752,map__14755,map__14755__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

}
}

return null;
};
var G__15039 = function (user_id,ev,var_args){
var p__14751 = null;
if (arguments.length > 2) {
var G__15134__i = 0, G__15134__a = new Array(arguments.length -  2);
while (G__15134__i < G__15134__a.length) {G__15134__a[G__15134__i] = arguments[G__15134__i + 2]; ++G__15134__i;}
  p__14751 = new cljs.core.IndexedSeq(G__15134__a,0);
} 
return G__15039__delegate.call(this,user_id,ev,p__14751);};
G__15039.cljs$lang$maxFixedArity = 2;
G__15039.cljs$lang$applyTo = (function (arglist__15135){
var user_id = cljs.core.first(arglist__15135);
arglist__15135 = cljs.core.next(arglist__15135);
var ev = cljs.core.first(arglist__15135);
var p__14751 = cljs.core.rest(arglist__15135);
return G__15039__delegate(user_id,ev,p__14751);
});
G__15039.cljs$core$IFn$_invoke$arity$variadic = G__15039__delegate;
return G__15039;
})()
;})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
var ev_msg_const = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861),ch_recv,new cljs.core.Keyword(null,"send-fn","send-fn",351002041),send_fn,new cljs.core.Keyword(null,"connected-uids","connected-uids",1454332231),connected_uids_], null);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861),ch_recv,new cljs.core.Keyword(null,"send-fn","send-fn",351002041),send_fn,new cljs.core.Keyword(null,"connected-uids","connected-uids",1454332231),connected_uids_,new cljs.core.Keyword(null,"ajax-post-fn","ajax-post-fn",1830071264),((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (ring_req){
return taoensso.sente.interfaces.ring_req__GT_server_ch_resp.call(null,web_server_ch_adapter,ring_req,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-open","on-open",-1391088163),((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (server_ch,websocket_QMARK_){
if(cljs.core.not.call(null,websocket_QMARK_)){
} else {
throw (new Error("Assert failed: (not websocket?)"));
}

var params = cljs.core.get.call(null,ring_req,new cljs.core.Keyword(null,"params","params",710516235));
var ppstr = cljs.core.get.call(null,params,new cljs.core.Keyword(null,"ppstr","ppstr",1557495252));
var client_id = cljs.core.get.call(null,params,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
var vec__14822 = taoensso.sente.unpack.call(null,packer__$1,ppstr);
var clj = cljs.core.nth.call(null,vec__14822,(0),null);
var has_cb_QMARK_ = cljs.core.nth.call(null,vec__14822,(1),null);
var reply_fn = (function (){var replied_QMARK__ = cljs.core.atom.call(null,false);
return ((function (replied_QMARK__,params,ppstr,client_id,vec__14822,clj,has_cb_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (resp_clj){
if(cljs.core.truth_(cljs.core.compare_and_set_BANG_.call(null,replied_QMARK__,false,true))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",492,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (replied_QMARK__,params,ppstr,client_id,vec__14822,clj,has_cb_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk send (ajax post reply): %s",resp_clj], null);
});})(replied_QMARK__,params,ppstr,client_id,vec__14822,clj,has_cb_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-602480525);

return taoensso.sente.interfaces.sch_send_BANG_.call(null,server_ch,websocket_QMARK_,taoensso.sente.pack.call(null,packer__$1,cljs.core.meta.call(null,resp_clj),resp_clj));
} else {
return null;
}
});
;})(replied_QMARK__,params,ppstr,client_id,vec__14822,clj,has_cb_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
taoensso.sente.put_server_event_msg_GT_ch_recv_BANG_.call(null,ch_recv,cljs.core.merge.call(null,ev_msg_const,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id,new cljs.core.Keyword(null,"ring-req","ring-req",-747861961),ring_req,new cljs.core.Keyword(null,"event","event",301435442),clj,new cljs.core.Keyword(null,"uid","uid",-1447769400),user_id_fn__$1.call(null,ring_req,client_id),new cljs.core.Keyword(null,"?reply-fn","?reply-fn",-1479510592),(cljs.core.truth_(has_cb_QMARK_)?reply_fn:null)], null)));

if(cljs.core.truth_(has_cb_QMARK_)){
var temp__4657__auto__ = lp_timeout_ms;
if(cljs.core.truth_(temp__4657__auto__)){
var ms = temp__4657__auto__;
var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__,ms,temp__4657__auto__,params,ppstr,client_id,vec__14822,clj,has_cb_QMARK_,reply_fn,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__,ms,temp__4657__auto__,params,ppstr,client_id,vec__14822,clj,has_cb_QMARK_,reply_fn,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (state_14830){
var state_val_14831 = (state_14830[(1)]);
if((state_val_14831 === (1))){
var inst_14825 = cljs.core.async.timeout.call(null,ms);
var state_14830__$1 = state_14830;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14830__$1,(2),inst_14825);
} else {
if((state_val_14831 === (2))){
var inst_14827 = (state_14830[(2)]);
var inst_14828 = reply_fn.call(null,new cljs.core.Keyword("chsk","timeout","chsk/timeout",-319776489));
var state_14830__$1 = (function (){var statearr_14832 = state_14830;
(statearr_14832[(7)] = inst_14827);

return statearr_14832;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14830__$1,inst_14828);
} else {
return null;
}
}
});})(c__8341__auto__,ms,temp__4657__auto__,params,ppstr,client_id,vec__14822,clj,has_cb_QMARK_,reply_fn,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
return ((function (switch__8229__auto__,c__8341__auto__,ms,temp__4657__auto__,params,ppstr,client_id,vec__14822,clj,has_cb_QMARK_,reply_fn,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$state_machine__8230__auto__ = null;
var taoensso$sente$state_machine__8230__auto____0 = (function (){
var statearr_14836 = [null,null,null,null,null,null,null,null];
(statearr_14836[(0)] = taoensso$sente$state_machine__8230__auto__);

(statearr_14836[(1)] = (1));

return statearr_14836;
});
var taoensso$sente$state_machine__8230__auto____1 = (function (state_14830){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_14830);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e14837){if((e14837 instanceof Object)){
var ex__8233__auto__ = e14837;
var statearr_14838_15136 = state_14830;
(statearr_14838_15136[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14830);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14837;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15137 = state_14830;
state_14830 = G__15137;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
taoensso$sente$state_machine__8230__auto__ = function(state_14830){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__8230__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__8230__auto____1.call(this,state_14830);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__8230__auto____0;
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__8230__auto____1;
return taoensso$sente$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__,ms,temp__4657__auto__,params,ppstr,client_id,vec__14822,clj,has_cb_QMARK_,reply_fn,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var state__8343__auto__ = (function (){var statearr_14839 = f__8342__auto__.call(null);
(statearr_14839[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_14839;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__,ms,temp__4657__auto__,params,ppstr,client_id,vec__14822,clj,has_cb_QMARK_,reply_fn,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

return c__8341__auto__;
} else {
return null;
}
} else {
return reply_fn.call(null,new cljs.core.Keyword("chsk","dummy-cb-200","chsk/dummy-cb-200",-1663130337));
}
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
], null));
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,new cljs.core.Keyword(null,"ajax-get-or-ws-handshake-fn","ajax-get-or-ws-handshake-fn",-1210409233),((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (ring_req){
var sch_uuid = taoensso.encore.uuid_str.call(null,(6));
var params = cljs.core.get.call(null,ring_req,new cljs.core.Keyword(null,"params","params",710516235));
var client_id = cljs.core.get.call(null,params,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
var csrf_token = csrf_token_fn.call(null,ring_req);
var uid = user_id_fn__$1.call(null,ring_req,client_id);
var receive_event_msg_BANG_ = ((function (sch_uuid,params,client_id,csrf_token,uid,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$self = null;
var taoensso$sente$self__1 = (function (event){
return taoensso$sente$self.call(null,event,null);
});
var taoensso$sente$self__2 = (function (event,_QMARK_reply_fn){
return taoensso.sente.put_server_event_msg_GT_ch_recv_BANG_.call(null,ch_recv,cljs.core.merge.call(null,ev_msg_const,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id,new cljs.core.Keyword(null,"ring-req","ring-req",-747861961),ring_req,new cljs.core.Keyword(null,"event","event",301435442),event,new cljs.core.Keyword(null,"?reply-fn","?reply-fn",-1479510592),_QMARK_reply_fn,new cljs.core.Keyword(null,"uid","uid",-1447769400),uid], null)));
});
taoensso$sente$self = function(event,_QMARK_reply_fn){
switch(arguments.length){
case 1:
return taoensso$sente$self__1.call(this,event);
case 2:
return taoensso$sente$self__2.call(this,event,_QMARK_reply_fn);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$self.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$self__1;
taoensso$sente$self.cljs$core$IFn$_invoke$arity$2 = taoensso$sente$self__2;
return taoensso$sente$self;
})()
;})(sch_uuid,params,client_id,csrf_token,uid,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
var send_handshake_BANG_ = ((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (server_ch,websocket_QMARK_){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",537,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["send-handshake!"], null);
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-688242219);

var _QMARK_handshake_data = handshake_data_fn.call(null,ring_req);
var handshake_ev = (((_QMARK_handshake_data == null))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","handshake","chsk/handshake",64910686),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [uid,csrf_token], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","handshake","chsk/handshake",64910686),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [uid,csrf_token,_QMARK_handshake_data], null)], null));
return taoensso.sente.interfaces.sch_send_BANG_.call(null,server_ch,websocket_QMARK_,taoensso.sente.pack.call(null,packer__$1,null,handshake_ev));
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
if(clojure.string.blank_QMARK_.call(null,client_id)){
var err_msg = "Client's Ring request doesn't have a client id. Does your server have the necessary keyword Ring middleware (`wrap-params` & `wrap-keyword-params`)?";
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init305516951502553584.clj",548,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (err_msg,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(err_msg),cljs.core.str(": %s")].join(''),ring_req], null);
});})(err_msg,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-1256284186);

throw cljs.core.ex_info.call(null,err_msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ring-req","ring-req",-747861961),ring_req], null));
} else {
return taoensso.sente.interfaces.ring_req__GT_server_ch_resp.call(null,web_server_ch_adapter,ring_req,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-open","on-open",-1391088163),((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (server_ch,websocket_QMARK_){
if(cljs.core.truth_(websocket_QMARK_)){
var _ = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",557,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["New WebSocket channel: %s (%s)",uid,sch_uuid], null);
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-1059532910);
var updated_conn = upd_conn_BANG_.call(null,new cljs.core.Keyword(null,"ws","ws",86841443),uid,client_id,server_ch);
var udt_open = new cljs.core.Keyword(null,"udt","udt",2011712751).cljs$core$IFn$_invoke$arity$1(updated_conn);
if(cljs.core.truth_(connect_uid_BANG_.call(null,new cljs.core.Keyword(null,"ws","ws",86841443),uid))){
receive_event_msg_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","uidport-open","chsk/uidport-open",1685786954),uid], null));
} else {
}

send_handshake_BANG_.call(null,server_ch,websocket_QMARK_);

var temp__4657__auto__ = ws_kalive_ms;
if(cljs.core.truth_(temp__4657__auto__)){
var ms = temp__4657__auto__;
var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (state_14875){
var state_val_14876 = (state_14875[(1)]);
if((state_val_14876 === (7))){
var inst_14871 = (state_14875[(2)]);
var state_14875__$1 = state_14875;
var statearr_14877_15138 = state_14875__$1;
(statearr_14877_15138[(2)] = inst_14871);

(statearr_14877_15138[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14876 === (1))){
var inst_14840 = udt_open;
var state_14875__$1 = (function (){var statearr_14878 = state_14875;
(statearr_14878[(7)] = inst_14840);

return statearr_14878;
})();
var statearr_14879_15139 = state_14875__$1;
(statearr_14879_15139[(2)] = null);

(statearr_14879_15139[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14876 === (4))){
var inst_14849 = (state_14875[(8)]);
var inst_14844 = (state_14875[(2)]);
var inst_14845 = cljs.core.deref.call(null,conns_);
var inst_14846 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_14847 = [new cljs.core.Keyword(null,"ws","ws",86841443),uid,client_id];
var inst_14848 = (new cljs.core.PersistentVector(null,3,(5),inst_14846,inst_14847,null));
var inst_14849__$1 = cljs.core.get_in.call(null,inst_14845,inst_14848);
var state_14875__$1 = (function (){var statearr_14880 = state_14875;
(statearr_14880[(9)] = inst_14844);

(statearr_14880[(8)] = inst_14849__$1);

return statearr_14880;
})();
if(cljs.core.truth_(inst_14849__$1)){
var statearr_14881_15140 = state_14875__$1;
(statearr_14881_15140[(1)] = (5));

} else {
var statearr_14882_15141 = state_14875__$1;
(statearr_14882_15141[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14876 === (13))){
var inst_14855 = (state_14875[(10)]);
var inst_14864 = (state_14875[(2)]);
var inst_14840 = inst_14855;
var state_14875__$1 = (function (){var statearr_14883 = state_14875;
(statearr_14883[(7)] = inst_14840);

(statearr_14883[(11)] = inst_14864);

return statearr_14883;
})();
var statearr_14884_15142 = state_14875__$1;
(statearr_14884_15142[(2)] = null);

(statearr_14884_15142[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14876 === (6))){
var state_14875__$1 = state_14875;
var statearr_14885_15143 = state_14875__$1;
(statearr_14885_15143[(2)] = null);

(statearr_14885_15143[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14876 === (3))){
var inst_14873 = (state_14875[(2)]);
var state_14875__$1 = state_14875;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14875__$1,inst_14873);
} else {
if((state_val_14876 === (12))){
var state_14875__$1 = state_14875;
var statearr_14886_15144 = state_14875__$1;
(statearr_14886_15144[(2)] = null);

(statearr_14886_15144[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14876 === (2))){
var inst_14842 = cljs.core.async.timeout.call(null,ms);
var state_14875__$1 = state_14875;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14875__$1,(4),inst_14842);
} else {
if((state_val_14876 === (11))){
var inst_14860 = taoensso.sente.pack.call(null,packer__$1,null,new cljs.core.Keyword("chsk","ws-ping","chsk/ws-ping",191675304));
var inst_14861 = taoensso.sente.interfaces.sch_send_BANG_.call(null,server_ch,websocket_QMARK_,inst_14860);
var state_14875__$1 = state_14875;
var statearr_14887_15145 = state_14875__$1;
(statearr_14887_15145[(2)] = inst_14861);

(statearr_14887_15145[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14876 === (9))){
var state_14875__$1 = state_14875;
var statearr_14888_15146 = state_14875__$1;
(statearr_14888_15146[(2)] = null);

(statearr_14888_15146[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14876 === (5))){
var inst_14849 = (state_14875[(8)]);
var inst_14854 = cljs.core.nth.call(null,inst_14849,(0),null);
var inst_14855 = cljs.core.nth.call(null,inst_14849,(1),null);
var inst_14856 = taoensso.sente.interfaces.sch_open_QMARK_.call(null,server_ch);
var state_14875__$1 = (function (){var statearr_14889 = state_14875;
(statearr_14889[(10)] = inst_14855);

(statearr_14889[(12)] = inst_14854);

return statearr_14889;
})();
if(cljs.core.truth_(inst_14856)){
var statearr_14890_15147 = state_14875__$1;
(statearr_14890_15147[(1)] = (8));

} else {
var statearr_14891_15148 = state_14875__$1;
(statearr_14891_15148[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14876 === (10))){
var inst_14868 = (state_14875[(2)]);
var state_14875__$1 = state_14875;
var statearr_14892_15149 = state_14875__$1;
(statearr_14892_15149[(2)] = inst_14868);

(statearr_14892_15149[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14876 === (8))){
var inst_14855 = (state_14875[(10)]);
var inst_14840 = (state_14875[(7)]);
var inst_14858 = cljs.core._EQ_.call(null,inst_14855,inst_14840);
var state_14875__$1 = state_14875;
if(inst_14858){
var statearr_14893_15150 = state_14875__$1;
(statearr_14893_15150[(1)] = (11));

} else {
var statearr_14894_15151 = state_14875__$1;
(statearr_14894_15151[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__8341__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
return ((function (switch__8229__auto__,c__8341__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$state_machine__8230__auto__ = null;
var taoensso$sente$state_machine__8230__auto____0 = (function (){
var statearr_14898 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_14898[(0)] = taoensso$sente$state_machine__8230__auto__);

(statearr_14898[(1)] = (1));

return statearr_14898;
});
var taoensso$sente$state_machine__8230__auto____1 = (function (state_14875){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_14875);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e14899){if((e14899 instanceof Object)){
var ex__8233__auto__ = e14899;
var statearr_14900_15152 = state_14875;
(statearr_14900_15152[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14875);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14899;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15153 = state_14875;
state_14875 = G__15153;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
taoensso$sente$state_machine__8230__auto__ = function(state_14875){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__8230__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__8230__auto____1.call(this,state_14875);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__8230__auto____0;
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__8230__auto____1;
return taoensso$sente$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var state__8343__auto__ = (function (){var statearr_14901 = f__8342__auto__.call(null);
(statearr_14901[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_14901;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

return c__8341__auto__;
} else {
return null;
}
} else {
var _ = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",585,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["New Ajax handshake/poll: %s (%s)",uid,sch_uuid], null);
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-959424780);
var updated_conn = upd_conn_BANG_.call(null,new cljs.core.Keyword(null,"ajax","ajax",814345549),uid,client_id,server_ch);
var udt_open = new cljs.core.Keyword(null,"udt","udt",2011712751).cljs$core$IFn$_invoke$arity$1(updated_conn);
var handshake_QMARK_ = (function (){var or__26817__auto__ = new cljs.core.Keyword(null,"init?","init?",438181499).cljs$core$IFn$_invoke$arity$1(updated_conn);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return new cljs.core.Keyword(null,"handshake?","handshake?",-423743093).cljs$core$IFn$_invoke$arity$1(params);
}
})();
if(cljs.core.truth_(connect_uid_BANG_.call(null,new cljs.core.Keyword(null,"ajax","ajax",814345549),uid))){
receive_event_msg_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","uidport-open","chsk/uidport-open",1685786954),uid], null));
} else {
}

if(cljs.core.truth_(handshake_QMARK_)){
return send_handshake_BANG_.call(null,server_ch,websocket_QMARK_);
} else {
var temp__4657__auto__ = lp_timeout_ms;
if(cljs.core.truth_(temp__4657__auto__)){
var ms = temp__4657__auto__;
var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,handshake_QMARK_,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,handshake_QMARK_,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (state_14927){
var state_val_14928 = (state_14927[(1)]);
if((state_val_14928 === (1))){
var inst_14902 = cljs.core.async.timeout.call(null,ms);
var state_14927__$1 = state_14927;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_14927__$1,(2),inst_14902);
} else {
if((state_val_14928 === (2))){
var inst_14909 = (state_14927[(7)]);
var inst_14904 = (state_14927[(2)]);
var inst_14905 = cljs.core.deref.call(null,conns_);
var inst_14906 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_14907 = [new cljs.core.Keyword(null,"ajax","ajax",814345549),uid,client_id];
var inst_14908 = (new cljs.core.PersistentVector(null,3,(5),inst_14906,inst_14907,null));
var inst_14909__$1 = cljs.core.get_in.call(null,inst_14905,inst_14908);
var state_14927__$1 = (function (){var statearr_14929 = state_14927;
(statearr_14929[(7)] = inst_14909__$1);

(statearr_14929[(8)] = inst_14904);

return statearr_14929;
})();
if(cljs.core.truth_(inst_14909__$1)){
var statearr_14930_15154 = state_14927__$1;
(statearr_14930_15154[(1)] = (3));

} else {
var statearr_14931_15155 = state_14927__$1;
(statearr_14931_15155[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14928 === (3))){
var inst_14909 = (state_14927[(7)]);
var inst_14914 = cljs.core.nth.call(null,inst_14909,(0),null);
var inst_14915 = cljs.core.nth.call(null,inst_14909,(1),null);
var inst_14916 = cljs.core._EQ_.call(null,inst_14915,udt_open);
var state_14927__$1 = (function (){var statearr_14932 = state_14927;
(statearr_14932[(9)] = inst_14914);

return statearr_14932;
})();
if(inst_14916){
var statearr_14933_15156 = state_14927__$1;
(statearr_14933_15156[(1)] = (6));

} else {
var statearr_14934_15157 = state_14927__$1;
(statearr_14934_15157[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14928 === (4))){
var state_14927__$1 = state_14927;
var statearr_14935_15158 = state_14927__$1;
(statearr_14935_15158[(2)] = null);

(statearr_14935_15158[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14928 === (5))){
var inst_14925 = (state_14927[(2)]);
var state_14927__$1 = state_14927;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_14927__$1,inst_14925);
} else {
if((state_val_14928 === (6))){
var inst_14918 = taoensso.sente.pack.call(null,packer__$1,null,new cljs.core.Keyword("chsk","timeout","chsk/timeout",-319776489));
var inst_14919 = taoensso.sente.interfaces.sch_send_BANG_.call(null,server_ch,websocket_QMARK_,inst_14918);
var state_14927__$1 = state_14927;
var statearr_14936_15159 = state_14927__$1;
(statearr_14936_15159[(2)] = inst_14919);

(statearr_14936_15159[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14928 === (7))){
var state_14927__$1 = state_14927;
var statearr_14937_15160 = state_14927__$1;
(statearr_14937_15160[(2)] = null);

(statearr_14937_15160[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_14928 === (8))){
var inst_14922 = (state_14927[(2)]);
var state_14927__$1 = state_14927;
var statearr_14938_15161 = state_14927__$1;
(statearr_14938_15161[(2)] = inst_14922);

(statearr_14938_15161[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
});})(c__8341__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,handshake_QMARK_,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
return ((function (switch__8229__auto__,c__8341__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,handshake_QMARK_,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$state_machine__8230__auto__ = null;
var taoensso$sente$state_machine__8230__auto____0 = (function (){
var statearr_14942 = [null,null,null,null,null,null,null,null,null,null];
(statearr_14942[(0)] = taoensso$sente$state_machine__8230__auto__);

(statearr_14942[(1)] = (1));

return statearr_14942;
});
var taoensso$sente$state_machine__8230__auto____1 = (function (state_14927){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_14927);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e14943){if((e14943 instanceof Object)){
var ex__8233__auto__ = e14943;
var statearr_14944_15162 = state_14927;
(statearr_14944_15162[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_14927);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e14943;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15163 = state_14927;
state_14927 = G__15163;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
taoensso$sente$state_machine__8230__auto__ = function(state_14927){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__8230__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__8230__auto____1.call(this,state_14927);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__8230__auto____0;
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__8230__auto____1;
return taoensso$sente$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,handshake_QMARK_,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var state__8343__auto__ = (function (){var statearr_14945 = f__8342__auto__.call(null);
(statearr_14945[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_14945;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,handshake_QMARK_,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

return c__8341__auto__;
} else {
return null;
}
}
}
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,new cljs.core.Keyword(null,"on-msg","on-msg",-2021925279),((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (server_ch,websocket_QMARK_,req_ppstr){
if(cljs.core.truth_(websocket_QMARK_)){
} else {
throw (new Error("Assert failed: websocket?"));
}

upd_conn_BANG_.call(null,new cljs.core.Keyword(null,"ws","ws",86841443),uid,client_id);

var vec__14946 = taoensso.sente.unpack.call(null,packer__$1,req_ppstr);
var clj = cljs.core.nth.call(null,vec__14946,(0),null);
var _QMARK_cb_uuid = cljs.core.nth.call(null,vec__14946,(1),null);
return receive_event_msg_BANG_.call(null,clj,(cljs.core.truth_(_QMARK_cb_uuid)?((function (vec__14946,clj,_QMARK_cb_uuid,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function taoensso$sente$reply_fn(resp_clj){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",615,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__14946,clj,_QMARK_cb_uuid,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk send (ws reply): %s",resp_clj], null);
});})(vec__14946,clj,_QMARK_cb_uuid,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,1794092477);

return taoensso.sente.interfaces.sch_send_BANG_.call(null,server_ch,websocket_QMARK_,taoensso.sente.pack.call(null,packer__$1,cljs.core.meta.call(null,resp_clj),resp_clj,_QMARK_cb_uuid));
});})(vec__14946,clj,_QMARK_cb_uuid,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
:null));
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,new cljs.core.Keyword(null,"on-close","on-close",-761178394),((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (server_ch,websocket_QMARK_,_status){
var conn_type = (cljs.core.truth_(websocket_QMARK_)?new cljs.core.Keyword(null,"ws","ws",86841443):new cljs.core.Keyword(null,"ajax","ajax",814345549));
var _ = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",624,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (conn_type,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["%s channel closed: %s (%s)",(cljs.core.truth_(websocket_QMARK_)?"WebSocket":"Ajax"),uid,sch_uuid], null);
});})(conn_type,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-770707049);
var updated_conn = upd_conn_BANG_.call(null,conn_type,uid,client_id,null);
var udt_close = new cljs.core.Keyword(null,"udt","udt",2011712751).cljs$core$IFn$_invoke$arity$1(updated_conn);
var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (state_15000){
var state_val_15001 = (state_15000[(1)]);
if((state_val_15001 === (7))){
var state_15000__$1 = state_15000;
var statearr_15002_15164 = state_15000__$1;
(statearr_15002_15164[(2)] = null);

(statearr_15002_15164[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15001 === (1))){
var inst_14949 = cljs.core.async.timeout.call(null,(5000));
var state_15000__$1 = state_15000;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15000__$1,(2),inst_14949);
} else {
if((state_val_15001 === (4))){
var state_15000__$1 = state_15000;
var statearr_15003_15165 = state_15000__$1;
(statearr_15003_15165[(2)] = null);

(statearr_15003_15165[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15001 === (13))){
var state_15000__$1 = state_15000;
var statearr_15004_15166 = state_15000__$1;
(statearr_15004_15166[(2)] = null);

(statearr_15004_15166[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15001 === (6))){
var inst_14977 = (state_15000[(7)]);
var inst_14960 = (state_15000[(8)]);
var inst_14961 = (state_15000[(9)]);
var inst_14959 = (state_15000[(10)]);
var inst_14972 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_14973 = [conn_type,uid,client_id];
var inst_14974 = (new cljs.core.PersistentVector(null,3,(5),inst_14972,inst_14973,null));
var inst_14976 = (function (){var vec__14952 = inst_14959;
var __QMARK_sch = inst_14960;
var udt_t1 = inst_14961;
return ((function (vec__14952,__QMARK_sch,udt_t1,inst_14977,inst_14960,inst_14961,inst_14959,inst_14972,inst_14973,inst_14974,state_val_15001,c__8341__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (p__14975){
var vec__15005 = p__14975;
var _sch = cljs.core.nth.call(null,vec__15005,(0),null);
var udt_t1__$1 = cljs.core.nth.call(null,vec__15005,(1),null);
if(cljs.core._EQ_.call(null,udt_t1__$1,udt_close)){
return taoensso.encore.swapped.call(null,new cljs.core.Keyword("swap","dissoc","swap/dissoc",-605373782),true);
} else {
return taoensso.encore.swapped.call(null,udt_t1__$1,false);
}
});
;})(vec__14952,__QMARK_sch,udt_t1,inst_14977,inst_14960,inst_14961,inst_14959,inst_14972,inst_14973,inst_14974,state_val_15001,c__8341__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var inst_14977__$1 = taoensso.encore.swap_in_BANG_.call(null,conns_,inst_14974,inst_14976);
var state_15000__$1 = (function (){var statearr_15008 = state_15000;
(statearr_15008[(7)] = inst_14977__$1);

return statearr_15008;
})();
if(cljs.core.truth_(inst_14977__$1)){
var statearr_15009_15167 = state_15000__$1;
(statearr_15009_15167[(1)] = (9));

} else {
var statearr_15010_15168 = state_15000__$1;
(statearr_15010_15168[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15001 === (3))){
var inst_14960 = (state_15000[(8)]);
var inst_14961 = (state_15000[(9)]);
var inst_14959 = (state_15000[(10)]);
var inst_14964 = (function (){var vec__14952 = inst_14959;
var __QMARK_sch = inst_14960;
var udt_t1 = inst_14961;
return ((function (vec__14952,__QMARK_sch,udt_t1,inst_14960,inst_14961,inst_14959,state_val_15001,c__8341__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["close-timeout: %s %s %s %s",conn_type,uid,sch_uuid,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core._EQ_.call(null,udt_t1,udt_close),udt_t1,udt_close], null)], null);
});
;})(vec__14952,__QMARK_sch,udt_t1,inst_14960,inst_14961,inst_14959,state_val_15001,c__8341__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var inst_14965 = (new cljs.core.Delay(inst_14964,null));
var inst_14966 = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"taoensso.sente","/tmp/form-init305516951502553584.clj",638,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),inst_14965,null,-2059997932);
var state_15000__$1 = state_15000;
var statearr_15011_15169 = state_15000__$1;
(statearr_15011_15169[(2)] = inst_14966);

(statearr_15011_15169[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15001 === (12))){
var inst_14986 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_14987 = [new cljs.core.Keyword("chsk","uidport-close","chsk/uidport-close",901058678),uid];
var inst_14988 = (new cljs.core.PersistentVector(null,2,(5),inst_14986,inst_14987,null));
var inst_14989 = receive_event_msg_BANG_.call(null,inst_14988);
var state_15000__$1 = state_15000;
var statearr_15012_15170 = state_15000__$1;
(statearr_15012_15170[(2)] = inst_14989);

(statearr_15012_15170[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15001 === (2))){
var inst_14959 = (state_15000[(10)]);
var inst_14951 = (state_15000[(2)]);
var inst_14955 = cljs.core.deref.call(null,conns_);
var inst_14956 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_14957 = [conn_type,uid,client_id];
var inst_14958 = (new cljs.core.PersistentVector(null,3,(5),inst_14956,inst_14957,null));
var inst_14959__$1 = cljs.core.get_in.call(null,inst_14955,inst_14958);
var inst_14960 = cljs.core.nth.call(null,inst_14959__$1,(0),null);
var inst_14961 = cljs.core.nth.call(null,inst_14959__$1,(1),null);
var inst_14962 = cljs.core.deref.call(null,taoensso.sente.debug_mode_QMARK__);
var state_15000__$1 = (function (){var statearr_15013 = state_15000;
(statearr_15013[(11)] = inst_14951);

(statearr_15013[(8)] = inst_14960);

(statearr_15013[(9)] = inst_14961);

(statearr_15013[(10)] = inst_14959__$1);

return statearr_15013;
})();
if(cljs.core.truth_(inst_14962)){
var statearr_15014_15171 = state_15000__$1;
(statearr_15014_15171[(1)] = (3));

} else {
var statearr_15015_15172 = state_15000__$1;
(statearr_15015_15172[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15001 === (11))){
var inst_14995 = (state_15000[(2)]);
var state_15000__$1 = state_15000;
var statearr_15016_15173 = state_15000__$1;
(statearr_15016_15173[(2)] = inst_14995);

(statearr_15016_15173[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15001 === (9))){
var inst_14977 = (state_15000[(7)]);
var inst_14960 = (state_15000[(8)]);
var inst_14961 = (state_15000[(9)]);
var inst_14959 = (state_15000[(10)]);
var inst_14979 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_14980 = [conn_type,uid];
var inst_14981 = (new cljs.core.PersistentVector(null,2,(5),inst_14979,inst_14980,null));
var inst_14982 = (function (){var vec__14952 = inst_14959;
var __QMARK_sch = inst_14960;
var udt_t1 = inst_14961;
var disconnect_QMARK_ = inst_14977;
return ((function (vec__14952,__QMARK_sch,udt_t1,disconnect_QMARK_,inst_14977,inst_14960,inst_14961,inst_14959,inst_14979,inst_14980,inst_14981,state_val_15001,c__8341__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (_QMARK_m){
if(cljs.core.empty_QMARK_.call(null,_QMARK_m)){
return new cljs.core.Keyword("swap","dissoc","swap/dissoc",-605373782);
} else {
return _QMARK_m;
}
});
;})(vec__14952,__QMARK_sch,udt_t1,disconnect_QMARK_,inst_14977,inst_14960,inst_14961,inst_14959,inst_14979,inst_14980,inst_14981,state_val_15001,c__8341__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var inst_14983 = taoensso.encore.swap_in_BANG_.call(null,conns_,inst_14981,inst_14982);
var inst_14984 = upd_connected_uid_BANG_.call(null,uid);
var state_15000__$1 = (function (){var statearr_15017 = state_15000;
(statearr_15017[(12)] = inst_14983);

return statearr_15017;
})();
if(cljs.core.truth_(inst_14984)){
var statearr_15018_15174 = state_15000__$1;
(statearr_15018_15174[(1)] = (12));

} else {
var statearr_15019_15175 = state_15000__$1;
(statearr_15019_15175[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15001 === (5))){
var inst_14961 = (state_15000[(9)]);
var inst_14969 = (state_15000[(2)]);
var inst_14970 = cljs.core._EQ_.call(null,inst_14961,udt_close);
var state_15000__$1 = (function (){var statearr_15020 = state_15000;
(statearr_15020[(13)] = inst_14969);

return statearr_15020;
})();
if(inst_14970){
var statearr_15021_15176 = state_15000__$1;
(statearr_15021_15176[(1)] = (6));

} else {
var statearr_15022_15177 = state_15000__$1;
(statearr_15022_15177[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15001 === (14))){
var inst_14992 = (state_15000[(2)]);
var state_15000__$1 = state_15000;
var statearr_15023_15178 = state_15000__$1;
(statearr_15023_15178[(2)] = inst_14992);

(statearr_15023_15178[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15001 === (10))){
var state_15000__$1 = state_15000;
var statearr_15024_15179 = state_15000__$1;
(statearr_15024_15179[(2)] = null);

(statearr_15024_15179[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15001 === (8))){
var inst_14998 = (state_15000[(2)]);
var state_15000__$1 = state_15000;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15000__$1,inst_14998);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__8341__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
return ((function (switch__8229__auto__,c__8341__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$state_machine__8230__auto__ = null;
var taoensso$sente$state_machine__8230__auto____0 = (function (){
var statearr_15028 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15028[(0)] = taoensso$sente$state_machine__8230__auto__);

(statearr_15028[(1)] = (1));

return statearr_15028;
});
var taoensso$sente$state_machine__8230__auto____1 = (function (state_15000){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_15000);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e15029){if((e15029 instanceof Object)){
var ex__8233__auto__ = e15029;
var statearr_15030_15180 = state_15000;
(statearr_15030_15180[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15000);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15029;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15181 = state_15000;
state_15000 = G__15181;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
taoensso$sente$state_machine__8230__auto__ = function(state_15000){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__8230__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__8230__auto____1.call(this,state_15000);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__8230__auto____0;
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__8230__auto____1;
return taoensso$sente$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var state__8343__auto__ = (function (){var statearr_15031 = f__8342__auto__.call(null);
(statearr_15031[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_15031;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

return c__8341__auto__;
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,new cljs.core.Keyword(null,"on-error","on-error",1728533530),((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (server_ch,websocket_QMARK_,error){
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init305516951502553584.clj",660,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["ring-req->server-ch-resp error: %s (%s)",error,uid,sch_uuid], null);
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-1237031711);
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
], null));
}
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__14730,map__14733,map__14733__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
], null);
});

taoensso.sente.make_channel_socket_server_BANG_.cljs$lang$maxFixedArity = (1);

taoensso.sente.make_channel_socket_server_BANG_.cljs$lang$applyTo = (function (seq14727){
var G__14728 = cljs.core.first.call(null,seq14727);
var seq14727__$1 = cljs.core.next.call(null,seq14727);
return taoensso.sente.make_channel_socket_server_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__14728,seq14727__$1);
});

/**
 * Actually pushes buffered events (as packed-str) to all uid's WebSocket conns.
 */
taoensso.sente.send_buffered_server_evs_GT_ws_clients_BANG_ = (function taoensso$sente$send_buffered_server_evs_GT_ws_clients_BANG_(conns_,uid,buffered_evs_pstr,upd_conn_BANG_){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",666,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["send-buffered-server-evs>ws-clients!: %s",buffered_evs_pstr], null);
}),null)),null,-1718761565);

var seq__15198 = cljs.core.seq.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,conns_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ws","ws",86841443),uid], null)));
var chunk__15199 = null;
var count__15200 = (0);
var i__15201 = (0);
while(true){
if((i__15201 < count__15200)){
var vec__15202 = cljs.core._nth.call(null,chunk__15199,i__15201);
var client_id = cljs.core.nth.call(null,vec__15202,(0),null);
var vec__15205 = cljs.core.nth.call(null,vec__15202,(1),null);
var _QMARK_sch = cljs.core.nth.call(null,vec__15205,(0),null);
var _udt = cljs.core.nth.call(null,vec__15205,(1),null);
var temp__4657__auto___15214 = _QMARK_sch;
if(cljs.core.truth_(temp__4657__auto___15214)){
var sch_15215 = temp__4657__auto___15214;
upd_conn_BANG_.call(null,new cljs.core.Keyword(null,"ws","ws",86841443),uid,client_id);

taoensso.sente.interfaces.sch_send_BANG_.call(null,sch_15215,new cljs.core.Keyword(null,"websocket","websocket",-1714963101),buffered_evs_pstr);
} else {
}

var G__15216 = seq__15198;
var G__15217 = chunk__15199;
var G__15218 = count__15200;
var G__15219 = (i__15201 + (1));
seq__15198 = G__15216;
chunk__15199 = G__15217;
count__15200 = G__15218;
i__15201 = G__15219;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__15198);
if(temp__4657__auto__){
var seq__15198__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15198__$1)){
var c__27200__auto__ = cljs.core.chunk_first.call(null,seq__15198__$1);
var G__15220 = cljs.core.chunk_rest.call(null,seq__15198__$1);
var G__15221 = c__27200__auto__;
var G__15222 = cljs.core.count.call(null,c__27200__auto__);
var G__15223 = (0);
seq__15198 = G__15220;
chunk__15199 = G__15221;
count__15200 = G__15222;
i__15201 = G__15223;
continue;
} else {
var vec__15208 = cljs.core.first.call(null,seq__15198__$1);
var client_id = cljs.core.nth.call(null,vec__15208,(0),null);
var vec__15211 = cljs.core.nth.call(null,vec__15208,(1),null);
var _QMARK_sch = cljs.core.nth.call(null,vec__15211,(0),null);
var _udt = cljs.core.nth.call(null,vec__15211,(1),null);
var temp__4657__auto___15224__$1 = _QMARK_sch;
if(cljs.core.truth_(temp__4657__auto___15224__$1)){
var sch_15225 = temp__4657__auto___15224__$1;
upd_conn_BANG_.call(null,new cljs.core.Keyword(null,"ws","ws",86841443),uid,client_id);

taoensso.sente.interfaces.sch_send_BANG_.call(null,sch_15225,new cljs.core.Keyword(null,"websocket","websocket",-1714963101),buffered_evs_pstr);
} else {
}

var G__15226 = cljs.core.next.call(null,seq__15198__$1);
var G__15227 = null;
var G__15228 = (0);
var G__15229 = (0);
seq__15198 = G__15226;
chunk__15199 = G__15227;
count__15200 = G__15228;
i__15201 = G__15229;
continue;
}
} else {
return null;
}
}
break;
}
});
/**
 * Actually pushes buffered events (as packed-str) to all uid's Ajax conns.
 *   Allows some time for possible Ajax poller reconnects.
 */
taoensso.sente.send_buffered_server_evs_GT_ajax_clients_BANG_ = (function taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG_(conns_,uid,buffered_evs_pstr){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",676,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["send-buffered-server-evs>ajax-clients!: %s",buffered_evs_pstr], null);
}),null)),null,1519461735);

var nmax_attempts = (7);
var ms_base = (90);
var ms_rand = (90);
var client_ids_unsatisfied = cljs.core.keys.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,conns_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ajax","ajax",814345549),uid], null)));
if(cljs.core.empty_QMARK_.call(null,client_ids_unsatisfied)){
return null;
} else {
var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function (state_15360){
var state_val_15361 = (state_15360[(1)]);
if((state_val_15361 === (7))){
var inst_15315 = (state_15360[(7)]);
var inst_15316 = (state_15360[(8)]);
var inst_15322 = (state_15360[(9)]);
var inst_15332 = (function (){var n = inst_15315;
var client_ids_satisfied = inst_15316;
var _QMARK_pulled = inst_15322;
return ((function (n,client_ids_satisfied,_QMARK_pulled,inst_15315,inst_15316,inst_15322,state_val_15361,c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function (s,client_id,p__15331){
var vec__15362 = p__15331;
var _QMARK_sch = cljs.core.nth.call(null,vec__15362,(0),null);
var _udt = cljs.core.nth.call(null,vec__15362,(1),null);
var sent_QMARK_ = (function (){var temp__4657__auto__ = _QMARK_sch;
if(cljs.core.truth_(temp__4657__auto__)){
var sch = temp__4657__auto__;
return taoensso.sente.interfaces.sch_send_BANG_.call(null,_QMARK_sch,cljs.core.not.call(null,new cljs.core.Keyword(null,"websocket","websocket",-1714963101)),buffered_evs_pstr);
} else {
return null;
}
})();
if(cljs.core.truth_(sent_QMARK_)){
return cljs.core.conj.call(null,s,client_id);
} else {
return s;
}
});
;})(n,client_ids_satisfied,_QMARK_pulled,inst_15315,inst_15316,inst_15322,state_val_15361,c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
})();
var inst_15333 = cljs.core.PersistentHashSet.EMPTY;
var inst_15334 = cljs.core.reduce_kv.call(null,inst_15332,inst_15333,inst_15322);
var state_15360__$1 = state_15360;
var statearr_15365_15398 = state_15360__$1;
(statearr_15365_15398[(2)] = inst_15334);

(statearr_15365_15398[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (1))){
var inst_15314 = cljs.core.PersistentHashSet.EMPTY;
var inst_15315 = (0);
var inst_15316 = inst_15314;
var state_15360__$1 = (function (){var statearr_15366 = state_15360;
(statearr_15366[(7)] = inst_15315);

(statearr_15366[(8)] = inst_15316);

return statearr_15366;
})();
var statearr_15367_15399 = state_15360__$1;
(statearr_15367_15399[(2)] = null);

(statearr_15367_15399[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (4))){
var state_15360__$1 = state_15360;
var statearr_15368_15400 = state_15360__$1;
(statearr_15368_15400[(2)] = true);

(statearr_15368_15400[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (15))){
var inst_15356 = (state_15360[(2)]);
var state_15360__$1 = state_15360;
var statearr_15369_15401 = state_15360__$1;
(statearr_15369_15401[(2)] = inst_15356);

(statearr_15369_15401[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (13))){
var inst_15347 = cljs.core.rand_int.call(null,ms_rand);
var inst_15348 = (ms_base + inst_15347);
var inst_15349 = cljs.core.async.timeout.call(null,inst_15348);
var state_15360__$1 = state_15360;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15360__$1,(16),inst_15349);
} else {
if((state_val_15361 === (6))){
var inst_15322 = (state_15360[(9)]);
var inst_15329 = (state_15360[(2)]);
var state_15360__$1 = (function (){var statearr_15370 = state_15360;
(statearr_15370[(10)] = inst_15329);

return statearr_15370;
})();
if(cljs.core.truth_(inst_15322)){
var statearr_15371_15402 = state_15360__$1;
(statearr_15371_15402[(1)] = (7));

} else {
var statearr_15372_15403 = state_15360__$1;
(statearr_15372_15403[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (3))){
var inst_15358 = (state_15360[(2)]);
var state_15360__$1 = state_15360;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15360__$1,inst_15358);
} else {
if((state_val_15361 === (12))){
var inst_15345 = (state_15360[(2)]);
var state_15360__$1 = state_15360;
if(cljs.core.truth_(inst_15345)){
var statearr_15373_15404 = state_15360__$1;
(statearr_15373_15404[(1)] = (13));

} else {
var statearr_15374_15405 = state_15360__$1;
(statearr_15374_15405[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (2))){
var inst_15315 = (state_15360[(7)]);
var inst_15316 = (state_15360[(8)]);
var inst_15322 = (state_15360[(9)]);
var inst_15318 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_15319 = [new cljs.core.Keyword(null,"ajax","ajax",814345549),uid];
var inst_15320 = (new cljs.core.PersistentVector(null,2,(5),inst_15318,inst_15319,null));
var inst_15321 = (function (){var n = inst_15315;
var client_ids_satisfied = inst_15316;
return ((function (n,client_ids_satisfied,inst_15315,inst_15316,inst_15322,inst_15318,inst_15319,inst_15320,state_val_15361,c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function (m){
var ks_to_pull = cljs.core.remove.call(null,client_ids_satisfied,cljs.core.keys.call(null,m));
if(cljs.core.empty_QMARK_.call(null,ks_to_pull)){
return taoensso.encore.swapped.call(null,m,null);
} else {
return taoensso.encore.swapped.call(null,cljs.core.reduce.call(null,((function (ks_to_pull,n,client_ids_satisfied,inst_15315,inst_15316,inst_15322,inst_15318,inst_15319,inst_15320,state_val_15361,c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function (m__$1,k){
var vec__15375 = cljs.core.get.call(null,m__$1,k);
var _QMARK_sch = cljs.core.nth.call(null,vec__15375,(0),null);
var udt = cljs.core.nth.call(null,vec__15375,(1),null);
return cljs.core.assoc.call(null,m__$1,k,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,udt], null));
});})(ks_to_pull,n,client_ids_satisfied,inst_15315,inst_15316,inst_15322,inst_15318,inst_15319,inst_15320,state_val_15361,c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
,m,ks_to_pull),cljs.core.select_keys.call(null,m,ks_to_pull));
}
});
;})(n,client_ids_satisfied,inst_15315,inst_15316,inst_15322,inst_15318,inst_15319,inst_15320,state_val_15361,c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
})();
var inst_15322__$1 = taoensso.encore.swap_in_BANG_.call(null,conns_,inst_15320,inst_15321);
var inst_15323 = (function (){var n = inst_15315;
var client_ids_satisfied = inst_15316;
var _QMARK_pulled = inst_15322__$1;
return ((function (n,client_ids_satisfied,_QMARK_pulled,inst_15315,inst_15316,inst_15322,inst_15318,inst_15319,inst_15320,inst_15321,inst_15322__$1,state_val_15361,c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function (x){
var or__26817__auto__ = (x == null);
if(or__26817__auto__){
return or__26817__auto__;
} else {
return taoensso.truss.impl.non_throwing.call(null,cljs.core.map_QMARK_).call(null,x);
}
});
;})(n,client_ids_satisfied,_QMARK_pulled,inst_15315,inst_15316,inst_15322,inst_15318,inst_15319,inst_15320,inst_15321,inst_15322__$1,state_val_15361,c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
})();
var inst_15324 = inst_15323.call(null,inst_15322__$1);
var state_15360__$1 = (function (){var statearr_15378 = state_15360;
(statearr_15378[(9)] = inst_15322__$1);

return statearr_15378;
})();
if(cljs.core.truth_(inst_15324)){
var statearr_15379_15406 = state_15360__$1;
(statearr_15379_15406[(1)] = (4));

} else {
var statearr_15380_15407 = state_15360__$1;
(statearr_15380_15407[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (11))){
var inst_15339 = (state_15360[(11)]);
var state_15360__$1 = state_15360;
var statearr_15381_15408 = state_15360__$1;
(statearr_15381_15408[(2)] = inst_15339);

(statearr_15381_15408[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (9))){
var inst_15315 = (state_15360[(7)]);
var inst_15339 = (state_15360[(11)]);
var inst_15316 = (state_15360[(8)]);
var inst_15337 = (state_15360[(2)]);
var inst_15338 = cljs.core.into.call(null,inst_15316,inst_15337);
var inst_15339__$1 = (inst_15315 < nmax_attempts);
var state_15360__$1 = (function (){var statearr_15382 = state_15360;
(statearr_15382[(11)] = inst_15339__$1);

(statearr_15382[(12)] = inst_15338);

return statearr_15382;
})();
if(cljs.core.truth_(inst_15339__$1)){
var statearr_15383_15409 = state_15360__$1;
(statearr_15383_15409[(1)] = (10));

} else {
var statearr_15384_15410 = state_15360__$1;
(statearr_15384_15410[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (5))){
var inst_15322 = (state_15360[(9)]);
var inst_15327 = taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"([:or nil? map?] ?pulled)",inst_15322,null,null);
var state_15360__$1 = state_15360;
var statearr_15385_15411 = state_15360__$1;
(statearr_15385_15411[(2)] = inst_15327);

(statearr_15385_15411[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (14))){
var state_15360__$1 = state_15360;
var statearr_15386_15412 = state_15360__$1;
(statearr_15386_15412[(2)] = null);

(statearr_15386_15412[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (16))){
var inst_15315 = (state_15360[(7)]);
var inst_15338 = (state_15360[(12)]);
var inst_15351 = (state_15360[(2)]);
var inst_15352 = (inst_15315 + (1));
var inst_15315__$1 = inst_15352;
var inst_15316 = inst_15338;
var state_15360__$1 = (function (){var statearr_15387 = state_15360;
(statearr_15387[(7)] = inst_15315__$1);

(statearr_15387[(8)] = inst_15316);

(statearr_15387[(13)] = inst_15351);

return statearr_15387;
})();
var statearr_15388_15413 = state_15360__$1;
(statearr_15388_15413[(2)] = null);

(statearr_15388_15413[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (10))){
var inst_15338 = (state_15360[(12)]);
var inst_15341 = cljs.core.complement.call(null,inst_15338);
var inst_15342 = cljs.core.some.call(null,inst_15341,client_ids_unsatisfied);
var state_15360__$1 = state_15360;
var statearr_15389_15414 = state_15360__$1;
(statearr_15389_15414[(2)] = inst_15342);

(statearr_15389_15414[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15361 === (8))){
var state_15360__$1 = state_15360;
var statearr_15390_15415 = state_15360__$1;
(statearr_15390_15415[(2)] = null);

(statearr_15390_15415[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
;
return ((function (switch__8229__auto__,c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function() {
var taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__8230__auto__ = null;
var taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__8230__auto____0 = (function (){
var statearr_15394 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_15394[(0)] = taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__8230__auto__);

(statearr_15394[(1)] = (1));

return statearr_15394;
});
var taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__8230__auto____1 = (function (state_15360){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_15360);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e15395){if((e15395 instanceof Object)){
var ex__8233__auto__ = e15395;
var statearr_15396_15416 = state_15360;
(statearr_15396_15416[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15360);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15395;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15417 = state_15360;
state_15360 = G__15417;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__8230__auto__ = function(state_15360){
switch(arguments.length){
case 0:
return taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__8230__auto____0.call(this);
case 1:
return taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__8230__auto____1.call(this,state_15360);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__8230__auto____0;
taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__8230__auto____1;
return taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
})();
var state__8343__auto__ = (function (){var statearr_15397 = f__8342__auto__.call(null);
(statearr_15397[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_15397;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
);

return c__8341__auto__;
}
});
/**
 * Alias of `taoensso.encore/ajax-lite`
 */
taoensso.sente.ajax_lite = taoensso.encore.ajax_lite;

/**
 * @interface
 */
taoensso.sente.IChSocket = function(){};

taoensso.sente._chsk_connect_BANG_ = (function taoensso$sente$_chsk_connect_BANG_(chsk){
if((!((chsk == null))) && (!((chsk.taoensso$sente$IChSocket$_chsk_connect_BANG_$arity$1 == null)))){
return chsk.taoensso$sente$IChSocket$_chsk_connect_BANG_$arity$1(chsk);
} else {
var x__27096__auto__ = (((chsk == null))?null:chsk);
var m__27097__auto__ = (taoensso.sente._chsk_connect_BANG_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,chsk);
} else {
var m__27097__auto____$1 = (taoensso.sente._chsk_connect_BANG_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,chsk);
} else {
throw cljs.core.missing_protocol.call(null,"IChSocket.-chsk-connect!",chsk);
}
}
}
});

taoensso.sente._chsk_disconnect_BANG_ = (function taoensso$sente$_chsk_disconnect_BANG_(chsk,reconn_QMARK_){
if((!((chsk == null))) && (!((chsk.taoensso$sente$IChSocket$_chsk_disconnect_BANG_$arity$2 == null)))){
return chsk.taoensso$sente$IChSocket$_chsk_disconnect_BANG_$arity$2(chsk,reconn_QMARK_);
} else {
var x__27096__auto__ = (((chsk == null))?null:chsk);
var m__27097__auto__ = (taoensso.sente._chsk_disconnect_BANG_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,chsk,reconn_QMARK_);
} else {
var m__27097__auto____$1 = (taoensso.sente._chsk_disconnect_BANG_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,chsk,reconn_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"IChSocket.-chsk-disconnect!",chsk);
}
}
}
});

taoensso.sente._chsk_reconnect_BANG_ = (function taoensso$sente$_chsk_reconnect_BANG_(chsk){
if((!((chsk == null))) && (!((chsk.taoensso$sente$IChSocket$_chsk_reconnect_BANG_$arity$1 == null)))){
return chsk.taoensso$sente$IChSocket$_chsk_reconnect_BANG_$arity$1(chsk);
} else {
var x__27096__auto__ = (((chsk == null))?null:chsk);
var m__27097__auto__ = (taoensso.sente._chsk_reconnect_BANG_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,chsk);
} else {
var m__27097__auto____$1 = (taoensso.sente._chsk_reconnect_BANG_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,chsk);
} else {
throw cljs.core.missing_protocol.call(null,"IChSocket.-chsk-reconnect!",chsk);
}
}
}
});

taoensso.sente._chsk_send_BANG_ = (function taoensso$sente$_chsk_send_BANG_(chsk,ev,opts){
if((!((chsk == null))) && (!((chsk.taoensso$sente$IChSocket$_chsk_send_BANG_$arity$3 == null)))){
return chsk.taoensso$sente$IChSocket$_chsk_send_BANG_$arity$3(chsk,ev,opts);
} else {
var x__27096__auto__ = (((chsk == null))?null:chsk);
var m__27097__auto__ = (taoensso.sente._chsk_send_BANG_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,chsk,ev,opts);
} else {
var m__27097__auto____$1 = (taoensso.sente._chsk_send_BANG_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,chsk,ev,opts);
} else {
throw cljs.core.missing_protocol.call(null,"IChSocket.-chsk-send!",chsk);
}
}
}
});

taoensso.sente.chsk_connect_BANG_ = (function taoensso$sente$chsk_connect_BANG_(chsk){
return taoensso.sente._chsk_connect_BANG_.call(null,chsk);
});
/**
 * Deprecated
 */
taoensso.sente.chsk_destroy_BANG_ = (function taoensso$sente$chsk_destroy_BANG_(chsk){
return taoensso.sente._chsk_disconnect_BANG_.call(null,chsk,false);
});
taoensso.sente.chsk_disconnect_BANG_ = (function taoensso$sente$chsk_disconnect_BANG_(chsk){
return taoensso.sente._chsk_disconnect_BANG_.call(null,chsk,false);
});
/**
 * Useful for reauthenticating after login/logout, etc.
 */
taoensso.sente.chsk_reconnect_BANG_ = (function taoensso$sente$chsk_reconnect_BANG_(chsk){
return taoensso.sente._chsk_reconnect_BANG_.call(null,chsk);
});
/**
 * Sends `[ev-id ev-?data :as event]`, returns true on apparent success.
 */
taoensso.sente.chsk_send_BANG_ = (function taoensso$sente$chsk_send_BANG_(var_args){
var args15418 = [];
var len__27348__auto___15421 = arguments.length;
var i__27349__auto___15422 = (0);
while(true){
if((i__27349__auto___15422 < len__27348__auto___15421)){
args15418.push((arguments[i__27349__auto___15422]));

var G__15423 = (i__27349__auto___15422 + (1));
i__27349__auto___15422 = G__15423;
continue;
} else {
}
break;
}

var G__15420 = args15418.length;
switch (G__15420) {
case 2:
return taoensso.sente.chsk_send_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return taoensso.sente.chsk_send_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 3:
return taoensso.sente.chsk_send_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15418.length)].join('')));

}
});

taoensso.sente.chsk_send_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (chsk,ev){
return taoensso.sente.chsk_send_BANG_.call(null,chsk,ev,cljs.core.PersistentArrayMap.EMPTY);
});

taoensso.sente.chsk_send_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (chsk,ev,_QMARK_timeout_ms,_QMARK_cb){
return taoensso.sente.chsk_send_BANG_.call(null,chsk,ev,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406),_QMARK_timeout_ms,new cljs.core.Keyword(null,"cb","cb",589947841),_QMARK_cb], null));
});

taoensso.sente.chsk_send_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (chsk,ev,opts){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",755,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk send: (%s) %s",cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"cb","cb",589947841),cljs.core.boolean$.call(null,new cljs.core.Keyword(null,"cb","cb",589947841).cljs$core$IFn$_invoke$arity$1(opts))),ev], null);
}),null)),null,2030205166);

return taoensso.sente._chsk_send_BANG_.call(null,chsk,ev,opts);
});

taoensso.sente.chsk_send_BANG_.cljs$lang$maxFixedArity = 4;

taoensso.sente.chsk_send__GT_closed_BANG_ = (function taoensso$sente$chsk_send__GT_closed_BANG_(_QMARK_cb_fn){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init305516951502553584.clj",760,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk send against closed chsk."], null);
}),null)),null,-1223407945);

if(cljs.core.truth_(_QMARK_cb_fn)){
_QMARK_cb_fn.call(null,new cljs.core.Keyword("chsk","closed","chsk/closed",-922855264));
} else {
}

return false;
});
taoensso.sente.assert_send_args = (function taoensso$sente$assert_send_args(x,_QMARK_timeout_ms,_QMARK_cb){
taoensso.sente.assert_event.call(null,x);

if(cljs.core.truth_((function (){var or__26817__auto__ = ((_QMARK_timeout_ms == null)) && ((_QMARK_cb == null));
if(or__26817__auto__){
return or__26817__auto__;
} else {
return taoensso.encore.nneg_int_QMARK_.call(null,_QMARK_timeout_ms);
}
})())){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("cb requires a timeout; timeout-ms should be a +ive integer: "),cljs.core.str(_QMARK_timeout_ms)].join('')),cljs.core.str("\n"),cljs.core.str("(or (and (nil? ?timeout-ms) (nil? ?cb)) (and (enc/nneg-int? ?timeout-ms)))")].join('')));
}

if(((_QMARK_cb == null)) || (cljs.core.ifn_QMARK_.call(null,_QMARK_cb)) || (taoensso.encore.chan_QMARK_.call(null,_QMARK_cb))){
return null;
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("cb should be nil, an ifn, or a channel: "),cljs.core.str(cljs.core.type.call(null,_QMARK_cb))].join('')),cljs.core.str("\n"),cljs.core.str("(or (nil? ?cb) (ifn? ?cb) (enc/chan? ?cb))")].join('')));
}
});
taoensso.sente.pull_unused_cb_fn_BANG_ = (function taoensso$sente$pull_unused_cb_fn_BANG_(cbs_waiting_,_QMARK_cb_uuid){
var temp__4657__auto__ = _QMARK_cb_uuid;
if(cljs.core.truth_(temp__4657__auto__)){
var cb_uuid = temp__4657__auto__;
return taoensso.encore.swap_in_BANG_.call(null,cbs_waiting_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cb_uuid], null),((function (cb_uuid,temp__4657__auto__){
return (function (_QMARK_f){
return taoensso.encore.swapped.call(null,new cljs.core.Keyword("swap","dissoc","swap/dissoc",-605373782),_QMARK_f);
});})(cb_uuid,temp__4657__auto__))
);
} else {
return null;
}
});
taoensso.sente.merge_GT_chsk_state_BANG_ = (function taoensso$sente$merge_GT_chsk_state_BANG_(p__15425,merge_state){
var map__15431 = p__15425;
var map__15431__$1 = ((((!((map__15431 == null)))?((((map__15431.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15431.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15431):map__15431);
var chsk = map__15431__$1;
var chs = cljs.core.get.call(null,map__15431__$1,new cljs.core.Keyword(null,"chs","chs",376886120));
var state_ = cljs.core.get.call(null,map__15431__$1,new cljs.core.Keyword(null,"state_","state_",957667102));
var vec__15433 = taoensso.encore.swap_in_BANG_.call(null,state_,cljs.core.PersistentVector.EMPTY,((function (map__15431,map__15431__$1,chsk,chs,state_){
return (function (old_state){
var new_state = cljs.core.merge.call(null,old_state,merge_state);
var requested_reconnect_QMARK_ = (function (){var and__26809__auto__ = new cljs.core.Keyword(null,"requested-reconnect-pending?","requested-reconnect-pending?",-299841116).cljs$core$IFn$_invoke$arity$1(old_state);
if(cljs.core.truth_(and__26809__auto__)){
var and__26809__auto____$1 = new cljs.core.Keyword(null,"open?","open?",1238443125).cljs$core$IFn$_invoke$arity$1(new_state);
if(cljs.core.truth_(and__26809__auto____$1)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"open?","open?",1238443125).cljs$core$IFn$_invoke$arity$1(old_state));
} else {
return and__26809__auto____$1;
}
} else {
return and__26809__auto__;
}
})();
var new_state__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"first-open?","first-open?",396686530).cljs$core$IFn$_invoke$arity$1(old_state))?cljs.core.assoc.call(null,new_state,new cljs.core.Keyword(null,"first-open?","first-open?",396686530),false):new_state);
var new_state__$2 = (cljs.core.truth_(requested_reconnect_QMARK_)?cljs.core.assoc.call(null,cljs.core.dissoc.call(null,new_state__$1,new cljs.core.Keyword(null,"requested-reconnect-pending?","requested-reconnect-pending?",-299841116)),new cljs.core.Keyword(null,"requested-reconnect?","requested-reconnect?",-1504983666),true):cljs.core.dissoc.call(null,new_state__$1,new cljs.core.Keyword(null,"requested-reconnect?","requested-reconnect?",-1504983666)));
return taoensso.encore.swapped.call(null,new_state__$2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [old_state,new_state__$2], null));
});})(map__15431,map__15431__$1,chsk,chs,state_))
);
var old_state = cljs.core.nth.call(null,vec__15433,(0),null);
var new_state = cljs.core.nth.call(null,vec__15433,(1),null);
if(cljs.core.not_EQ_.call(null,old_state,new_state)){
var output = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [old_state,new_state], null);
cljs.core.async.put_BANG_.call(null,new cljs.core.Keyword(null,"state","state",-1988618099).cljs$core$IFn$_invoke$arity$1(chs),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","state","chsk/state",-1991397620),output], null));

return output;
} else {
return null;
}
});
/**
 * Experimental, undocumented. Allows a core.async channel to be provided
 *   instead of a cb-fn. The channel will receive values of form
 *   [<event-id>.cb <reply>].
 */
taoensso.sente.cb_chan_as_fn = (function taoensso$sente$cb_chan_as_fn(_QMARK_cb,ev){
if(((_QMARK_cb == null)) || (cljs.core.ifn_QMARK_.call(null,_QMARK_cb))){
return _QMARK_cb;
} else {
var e_15444 = (function (){try{if(taoensso.encore.chan_QMARK_.call(null,_QMARK_cb)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e15440){if((e15440 instanceof Error)){
var e = e15440;
return e;
} else {
throw e15440;

}
}})();
if((e_15444 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(enc/chan? ?cb)",_QMARK_cb,e_15444,null);
}

taoensso.sente.assert_event.call(null,ev);

var vec__15441 = ev;
var ev_id = cljs.core.nth.call(null,vec__15441,(0),null);
var _ = cljs.core.nth.call(null,vec__15441,(1),null);
var cb_ch = _QMARK_cb;
return ((function (vec__15441,ev_id,_,cb_ch){
return (function (reply){
return cljs.core.async.put_BANG_.call(null,cb_ch,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,[cljs.core.str(taoensso.encore.fq_name.call(null,ev_id)),cljs.core.str(".cb")].join('')),reply], null));
});
;})(vec__15441,ev_id,_,cb_ch))
}
});
taoensso.sente.receive_buffered_evs_BANG_ = (function taoensso$sente$receive_buffered_evs_BANG_(chs,clj){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",834,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["receive-buffered-evs!: %s",clj], null);
}),null)),null,-1314961519);

var buffered_evs = ((cljs.core.vector_QMARK_.call(null,clj))?clj:taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(vector? clj)",clj,null,null));
var seq__15455 = cljs.core.seq.call(null,buffered_evs);
var chunk__15456 = null;
var count__15457 = (0);
var i__15458 = (0);
while(true){
if((i__15458 < count__15457)){
var ev = cljs.core._nth.call(null,chunk__15456,i__15458);
taoensso.sente.assert_event.call(null,ev);

var vec__15459_15465 = ev;
var id_15466 = cljs.core.nth.call(null,vec__15459_15465,(0),null);
if(cljs.core.not_EQ_.call(null,cljs.core.namespace.call(null,id_15466),"chsk")){
} else {
throw (new Error("Assert failed: (not= (namespace id) \"chsk\")"));
}

cljs.core.async.put_BANG_.call(null,new cljs.core.Keyword(null,"<server","<server",-2135373537).cljs$core$IFn$_invoke$arity$1(chs),ev);

var G__15467 = seq__15455;
var G__15468 = chunk__15456;
var G__15469 = count__15457;
var G__15470 = (i__15458 + (1));
seq__15455 = G__15467;
chunk__15456 = G__15468;
count__15457 = G__15469;
i__15458 = G__15470;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__15455);
if(temp__4657__auto__){
var seq__15455__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15455__$1)){
var c__27200__auto__ = cljs.core.chunk_first.call(null,seq__15455__$1);
var G__15471 = cljs.core.chunk_rest.call(null,seq__15455__$1);
var G__15472 = c__27200__auto__;
var G__15473 = cljs.core.count.call(null,c__27200__auto__);
var G__15474 = (0);
seq__15455 = G__15471;
chunk__15456 = G__15472;
count__15457 = G__15473;
i__15458 = G__15474;
continue;
} else {
var ev = cljs.core.first.call(null,seq__15455__$1);
taoensso.sente.assert_event.call(null,ev);

var vec__15462_15475 = ev;
var id_15476 = cljs.core.nth.call(null,vec__15462_15475,(0),null);
if(cljs.core.not_EQ_.call(null,cljs.core.namespace.call(null,id_15476),"chsk")){
} else {
throw (new Error("Assert failed: (not= (namespace id) \"chsk\")"));
}

cljs.core.async.put_BANG_.call(null,new cljs.core.Keyword(null,"<server","<server",-2135373537).cljs$core$IFn$_invoke$arity$1(chs),ev);

var G__15477 = cljs.core.next.call(null,seq__15455__$1);
var G__15478 = null;
var G__15479 = (0);
var G__15480 = (0);
seq__15455 = G__15477;
chunk__15456 = G__15478;
count__15457 = G__15479;
i__15458 = G__15480;
continue;
}
} else {
return null;
}
}
break;
}
});
taoensso.sente.handshake_QMARK_ = (function taoensso$sente$handshake_QMARK_(x){
var and__26809__auto__ = cljs.core.vector_QMARK_.call(null,x);
if(and__26809__auto__){
var vec__15490 = x;
var x1 = cljs.core.nth.call(null,vec__15490,(0),null);
return cljs.core._EQ_.call(null,x1,new cljs.core.Keyword("chsk","handshake","chsk/handshake",64910686));
} else {
return and__26809__auto__;
}
});
taoensso.sente.receive_handshake_BANG_ = (function taoensso$sente$receive_handshake_BANG_(chsk_type,chsk,clj){
var e_15513 = (function (){try{if((function (x){
return cljs.core.contains_QMARK_.call(null,taoensso.truss.impl.set_STAR_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ws","ws",86841443),null,new cljs.core.Keyword(null,"ajax","ajax",814345549),null], null), null)),x);
}).call(null,chsk_type)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e15503){if((e15503 instanceof Error)){
var e = e15503;
return e;
} else {
throw e15503;

}
}})();
if((e_15513 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"([:el #{:ws :ajax}] chsk-type)",chsk_type,e_15513,null);
}

var e_15514 = (function (){try{if(cljs.core.truth_(taoensso.sente.handshake_QMARK_.call(null,clj))){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e15504){if((e15504 instanceof Error)){
var e = e15504;
return e;
} else {
throw e15504;

}
}})();
if((e_15514 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(handshake? clj)",clj,e_15514,null);
}

taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",851,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["receive-handshake! (%s): %s",chsk_type,clj], null);
}),null)),null,401930494);

var vec__15505 = clj;
var _ = cljs.core.nth.call(null,vec__15505,(0),null);
var vec__15508 = cljs.core.nth.call(null,vec__15505,(1),null);
var _QMARK_uid = cljs.core.nth.call(null,vec__15508,(0),null);
var _QMARK_csrf_token = cljs.core.nth.call(null,vec__15508,(1),null);
var _QMARK_handshake_data = cljs.core.nth.call(null,vec__15508,(2),null);
var map__15511 = chsk;
var map__15511__$1 = ((((!((map__15511 == null)))?((((map__15511.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15511.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15511):map__15511);
var chs = cljs.core.get.call(null,map__15511__$1,new cljs.core.Keyword(null,"chs","chs",376886120));
var ever_opened_QMARK__ = cljs.core.get.call(null,map__15511__$1,new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913));
var first_handshake_QMARK_ = cljs.core.compare_and_set_BANG_.call(null,ever_opened_QMARK__,false,true);
var new_state = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"type","type",1174270348),chsk_type,new cljs.core.Keyword(null,"open?","open?",1238443125),true,new cljs.core.Keyword(null,"ever-opened?","ever-opened?",1128459732),true,new cljs.core.Keyword(null,"uid","uid",-1447769400),_QMARK_uid,new cljs.core.Keyword(null,"csrf-token","csrf-token",-1872302856),_QMARK_csrf_token,new cljs.core.Keyword(null,"handshake-data","handshake-data",-278378864),_QMARK_handshake_data,new cljs.core.Keyword(null,"first-open?","first-open?",396686530),first_handshake_QMARK_], null);
var handshake_ev = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","handshake","chsk/handshake",64910686),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [_QMARK_uid,_QMARK_csrf_token,_QMARK_handshake_data,first_handshake_QMARK_], null)], null);
taoensso.sente.assert_event.call(null,handshake_ev);

if(clojure.string.blank_QMARK_.call(null,_QMARK_csrf_token)){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init305516951502553584.clj",870,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__15505,_,vec__15508,_QMARK_uid,_QMARK_csrf_token,_QMARK_handshake_data,map__15511,map__15511__$1,chs,ever_opened_QMARK__,first_handshake_QMARK_,new_state,handshake_ev){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["SECURITY WARNING: no CSRF token available for use by Sente"], null);
});})(vec__15505,_,vec__15508,_QMARK_uid,_QMARK_csrf_token,_QMARK_handshake_data,map__15511,map__15511__$1,chs,ever_opened_QMARK__,first_handshake_QMARK_,new_state,handshake_ev))
,null)),null,-81793677);
} else {
}

taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk,new_state);

cljs.core.async.put_BANG_.call(null,new cljs.core.Keyword(null,"internal","internal",-854870097).cljs$core$IFn$_invoke$arity$1(chs),handshake_ev);

return new cljs.core.Keyword(null,"handled","handled",1889700151);
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
 * @implements {taoensso.sente.IChSocket}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
taoensso.sente.ChWebSocket = (function (client_id,chs,params,packer,url,state_,active_retry_id_,retry_count_,ever_opened_QMARK__,backoff_ms_fn,cbs_waiting_,socket_,__meta,__extmap,__hash){
this.client_id = client_id;
this.chs = chs;
this.params = params;
this.packer = packer;
this.url = url;
this.state_ = state_;
this.active_retry_id_ = active_retry_id_;
this.retry_count_ = retry_count_;
this.ever_opened_QMARK__ = ever_opened_QMARK__;
this.backoff_ms_fn = backoff_ms_fn;
this.cbs_waiting_ = cbs_waiting_;
this.socket_ = socket_;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
taoensso.sente.ChWebSocket.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__27059__auto__,k__27060__auto__){
var self__ = this;
var this__27059__auto____$1 = this;
return cljs.core._lookup.call(null,this__27059__auto____$1,k__27060__auto__,null);
});

taoensso.sente.ChWebSocket.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__27061__auto__,k15516,else__27062__auto__){
var self__ = this;
var this__27061__auto____$1 = this;
var G__15518 = (((k15516 instanceof cljs.core.Keyword))?k15516.fqn:null);
switch (G__15518) {
case "ever-opened?_":
return self__.ever_opened_QMARK__;

break;
case "client-id":
return self__.client_id;

break;
case "packer":
return self__.packer;

break;
case "chs":
return self__.chs;

break;
case "params":
return self__.params;

break;
case "retry-count_":
return self__.retry_count_;

break;
case "backoff-ms-fn":
return self__.backoff_ms_fn;

break;
case "socket_":
return self__.socket_;

break;
case "url":
return self__.url;

break;
case "active-retry-id_":
return self__.active_retry_id_;

break;
case "cbs-waiting_":
return self__.cbs_waiting_;

break;
case "state_":
return self__.state_;

break;
default:
return cljs.core.get.call(null,self__.__extmap,k15516,else__27062__auto__);

}
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__27073__auto__,writer__27074__auto__,opts__27075__auto__){
var self__ = this;
var this__27073__auto____$1 = this;
var pr_pair__27076__auto__ = ((function (this__27073__auto____$1){
return (function (keyval__27077__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__27074__auto__,cljs.core.pr_writer,""," ","",opts__27075__auto__,keyval__27077__auto__);
});})(this__27073__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__27074__auto__,pr_pair__27076__auto__,"#taoensso.sente.ChWebSocket{",", ","}",opts__27075__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"chs","chs",376886120),self__.chs],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"params","params",710516235),self__.params],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"packer","packer",66077544),self__.packer],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"url","url",276297046),self__.url],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),self__.active_retry_id_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),self__.retry_count_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),self__.ever_opened_QMARK__],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),self__.backoff_ms_fn],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),self__.cbs_waiting_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"socket_","socket_",-361048908),self__.socket_],null))], null),self__.__extmap));
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IIterable$ = true;

taoensso.sente.ChWebSocket.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__15515){
var self__ = this;
var G__15515__$1 = this;
return (new cljs.core.RecordIter((0),G__15515__$1,12,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"client-id","client-id",-464622140),new cljs.core.Keyword(null,"chs","chs",376886120),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.Keyword(null,"packer","packer",66077544),new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"state_","state_",957667102),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),new cljs.core.Keyword(null,"socket_","socket_",-361048908)], null),cljs.core._iterator.call(null,self__.__extmap)));
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__27057__auto__){
var self__ = this;
var this__27057__auto____$1 = this;
return self__.__meta;
});

taoensso.sente.ChWebSocket.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__27053__auto__){
var self__ = this;
var this__27053__auto____$1 = this;
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,self__.__hash));
});

taoensso.sente.ChWebSocket.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__27063__auto__){
var self__ = this;
var this__27063__auto____$1 = this;
return (12 + cljs.core.count.call(null,self__.__extmap));
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__27054__auto__){
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

taoensso.sente.ChWebSocket.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__27055__auto__,other__27056__auto__){
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

taoensso.sente.ChWebSocket.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__27068__auto__,k__27069__auto__){
var self__ = this;
var this__27068__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 12, [new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),null,new cljs.core.Keyword(null,"client-id","client-id",-464622140),null,new cljs.core.Keyword(null,"packer","packer",66077544),null,new cljs.core.Keyword(null,"chs","chs",376886120),null,new cljs.core.Keyword(null,"params","params",710516235),null,new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),null,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),null,new cljs.core.Keyword(null,"socket_","socket_",-361048908),null,new cljs.core.Keyword(null,"url","url",276297046),null,new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),null,new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),null,new cljs.core.Keyword(null,"state_","state_",957667102),null], null), null),k__27069__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__27068__auto____$1),self__.__meta),k__27069__auto__);
} else {
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__27069__auto__)),null));
}
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__27066__auto__,k__27067__auto__,G__15515){
var self__ = this;
var this__27066__auto____$1 = this;
var pred__15519 = cljs.core.keyword_identical_QMARK_;
var expr__15520 = k__27067__auto__;
if(cljs.core.truth_(pred__15519.call(null,new cljs.core.Keyword(null,"client-id","client-id",-464622140),expr__15520))){
return (new taoensso.sente.ChWebSocket(G__15515,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15519.call(null,new cljs.core.Keyword(null,"chs","chs",376886120),expr__15520))){
return (new taoensso.sente.ChWebSocket(self__.client_id,G__15515,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15519.call(null,new cljs.core.Keyword(null,"params","params",710516235),expr__15520))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,G__15515,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15519.call(null,new cljs.core.Keyword(null,"packer","packer",66077544),expr__15520))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,G__15515,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15519.call(null,new cljs.core.Keyword(null,"url","url",276297046),expr__15520))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,G__15515,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15519.call(null,new cljs.core.Keyword(null,"state_","state_",957667102),expr__15520))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,G__15515,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15519.call(null,new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),expr__15520))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,G__15515,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15519.call(null,new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),expr__15520))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,G__15515,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15519.call(null,new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),expr__15520))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,G__15515,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15519.call(null,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),expr__15520))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,G__15515,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15519.call(null,new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),expr__15520))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,G__15515,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15519.call(null,new cljs.core.Keyword(null,"socket_","socket_",-361048908),expr__15520))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,G__15515,self__.__meta,self__.__extmap,null));
} else {
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__27067__auto__,G__15515),null));
}
}
}
}
}
}
}
}
}
}
}
}
});

taoensso.sente.ChWebSocket.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__27071__auto__){
var self__ = this;
var this__27071__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"chs","chs",376886120),self__.chs],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"params","params",710516235),self__.params],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"packer","packer",66077544),self__.packer],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"url","url",276297046),self__.url],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),self__.active_retry_id_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),self__.retry_count_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),self__.ever_opened_QMARK__],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),self__.backoff_ms_fn],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),self__.cbs_waiting_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"socket_","socket_",-361048908),self__.socket_],null))], null),self__.__extmap));
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__27058__auto__,G__15515){
var self__ = this;
var this__27058__auto____$1 = this;
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,G__15515,self__.__extmap,self__.__hash));
});

taoensso.sente.ChWebSocket.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__27064__auto__,entry__27065__auto__){
var self__ = this;
var this__27064__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__27065__auto__)){
return cljs.core._assoc.call(null,this__27064__auto____$1,cljs.core._nth.call(null,entry__27065__auto__,(0)),cljs.core._nth.call(null,entry__27065__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__27064__auto____$1,entry__27065__auto__);
}
});

taoensso.sente.ChWebSocket.prototype.taoensso$sente$IChSocket$ = true;

taoensso.sente.ChWebSocket.prototype.taoensso$sente$IChSocket$_chsk_disconnect_BANG_$arity$2 = (function (chsk,reconn_QMARK_){
var self__ = this;
var chsk__$1 = this;
cljs.core.reset_BANG_.call(null,self__.active_retry_id_,"_disable-auto-retry");

if(cljs.core.truth_(reconn_QMARK_)){
taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"open?","open?",1238443125),false,new cljs.core.Keyword(null,"requested-reconnect-pending?","requested-reconnect-pending?",-299841116),true], null));
} else {
taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open?","open?",1238443125),false], null));
}

var temp__4657__auto__ = cljs.core.deref.call(null,self__.socket_);
if(cljs.core.truth_(temp__4657__auto__)){
var s = temp__4657__auto__;
return s.close((1000),"CLOSE_NORMAL");
} else {
return null;
}
});

taoensso.sente.ChWebSocket.prototype.taoensso$sente$IChSocket$_chsk_reconnect_BANG_$arity$1 = (function (chsk){
var self__ = this;
var chsk__$1 = this;
taoensso.sente._chsk_disconnect_BANG_.call(null,chsk__$1,new cljs.core.Keyword(null,"reconn","reconn",-807347633));

return taoensso.sente._chsk_connect_BANG_.call(null,chsk__$1);
});

taoensso.sente.ChWebSocket.prototype.taoensso$sente$IChSocket$_chsk_send_BANG_$arity$3 = (function (chsk,ev,opts){
var self__ = this;
var chsk__$1 = this;
var map__15522 = opts;
var map__15522__$1 = ((((!((map__15522 == null)))?((((map__15522.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15522.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15522):map__15522);
var _QMARK_timeout_ms = cljs.core.get.call(null,map__15522__$1,new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406));
var _QMARK_cb = cljs.core.get.call(null,map__15522__$1,new cljs.core.Keyword(null,"cb","cb",589947841));
var flush_QMARK_ = cljs.core.get.call(null,map__15522__$1,new cljs.core.Keyword(null,"flush?","flush?",-108887231));
var _ = taoensso.sente.assert_send_args.call(null,ev,_QMARK_timeout_ms,_QMARK_cb);
var _QMARK_cb_fn = taoensso.sente.cb_chan_as_fn.call(null,_QMARK_cb,ev);
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"open?","open?",1238443125).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,self__.state_)))){
return taoensso.sente.chsk_send__GT_closed_BANG_.call(null,_QMARK_cb_fn);
} else {
var _QMARK_cb_uuid = (cljs.core.truth_(_QMARK_cb_fn)?taoensso.encore.uuid_str.call(null,(6)):null);
var ppstr = taoensso.sente.pack.call(null,self__.packer,cljs.core.meta.call(null,ev),ev,_QMARK_cb_uuid);
var temp__4657__auto___15564 = _QMARK_cb_uuid;
if(cljs.core.truth_(temp__4657__auto___15564)){
var cb_uuid_15565 = temp__4657__auto___15564;
taoensso.encore.reset_in_BANG_.call(null,self__.cbs_waiting_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cb_uuid_15565], null),(function (){var e = (function (){try{if(cljs.core.truth_(taoensso.truss.impl.nnil_QMARK_.call(null,_QMARK_cb_fn))){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e15524){if((e15524 instanceof Error)){
var e = e15524;
return e;
} else {
throw e15524;

}
}})();
if((e == null)){
return _QMARK_cb_fn;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(taoensso.truss.impl/nnil? ?cb-fn)",_QMARK_cb_fn,e,null);
}
})());

var temp__4657__auto___15566__$1 = _QMARK_timeout_ms;
if(cljs.core.truth_(temp__4657__auto___15566__$1)){
var timeout_ms_15567 = temp__4657__auto___15566__$1;
var c__8341__auto___15568 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___15568,timeout_ms_15567,temp__4657__auto___15566__$1,cb_uuid_15565,temp__4657__auto___15564,_QMARK_cb_uuid,ppstr,map__15522,map__15522__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___15568,timeout_ms_15567,temp__4657__auto___15566__$1,cb_uuid_15565,temp__4657__auto___15564,_QMARK_cb_uuid,ppstr,map__15522,map__15522__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1){
return (function (state_15535){
var state_val_15536 = (state_15535[(1)]);
if((state_val_15536 === (1))){
var inst_15525 = cljs.core.async.timeout.call(null,timeout_ms_15567);
var state_15535__$1 = state_15535;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_15535__$1,(2),inst_15525);
} else {
if((state_val_15536 === (2))){
var inst_15528 = (state_15535[(7)]);
var inst_15527 = (state_15535[(2)]);
var inst_15528__$1 = taoensso.sente.pull_unused_cb_fn_BANG_.call(null,self__.cbs_waiting_,_QMARK_cb_uuid);
var state_15535__$1 = (function (){var statearr_15537 = state_15535;
(statearr_15537[(8)] = inst_15527);

(statearr_15537[(7)] = inst_15528__$1);

return statearr_15537;
})();
if(cljs.core.truth_(inst_15528__$1)){
var statearr_15538_15569 = state_15535__$1;
(statearr_15538_15569[(1)] = (3));

} else {
var statearr_15539_15570 = state_15535__$1;
(statearr_15539_15570[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15536 === (3))){
var inst_15528 = (state_15535[(7)]);
var inst_15530 = inst_15528.call(null,new cljs.core.Keyword("chsk","timeout","chsk/timeout",-319776489));
var state_15535__$1 = state_15535;
var statearr_15540_15571 = state_15535__$1;
(statearr_15540_15571[(2)] = inst_15530);

(statearr_15540_15571[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15536 === (4))){
var state_15535__$1 = state_15535;
var statearr_15541_15572 = state_15535__$1;
(statearr_15541_15572[(2)] = null);

(statearr_15541_15572[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_15536 === (5))){
var inst_15533 = (state_15535[(2)]);
var state_15535__$1 = state_15535;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_15535__$1,inst_15533);
} else {
return null;
}
}
}
}
}
});})(c__8341__auto___15568,timeout_ms_15567,temp__4657__auto___15566__$1,cb_uuid_15565,temp__4657__auto___15564,_QMARK_cb_uuid,ppstr,map__15522,map__15522__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1))
;
return ((function (switch__8229__auto__,c__8341__auto___15568,timeout_ms_15567,temp__4657__auto___15566__$1,cb_uuid_15565,temp__4657__auto___15564,_QMARK_cb_uuid,ppstr,map__15522,map__15522__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1){
return (function() {
var taoensso$sente$state_machine__8230__auto__ = null;
var taoensso$sente$state_machine__8230__auto____0 = (function (){
var statearr_15545 = [null,null,null,null,null,null,null,null,null];
(statearr_15545[(0)] = taoensso$sente$state_machine__8230__auto__);

(statearr_15545[(1)] = (1));

return statearr_15545;
});
var taoensso$sente$state_machine__8230__auto____1 = (function (state_15535){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_15535);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e15546){if((e15546 instanceof Object)){
var ex__8233__auto__ = e15546;
var statearr_15547_15573 = state_15535;
(statearr_15547_15573[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_15535);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e15546;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__15574 = state_15535;
state_15535 = G__15574;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
taoensso$sente$state_machine__8230__auto__ = function(state_15535){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__8230__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__8230__auto____1.call(this,state_15535);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__8230__auto____0;
taoensso$sente$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__8230__auto____1;
return taoensso$sente$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___15568,timeout_ms_15567,temp__4657__auto___15566__$1,cb_uuid_15565,temp__4657__auto___15564,_QMARK_cb_uuid,ppstr,map__15522,map__15522__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1))
})();
var state__8343__auto__ = (function (){var statearr_15548 = f__8342__auto__.call(null);
(statearr_15548[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___15568);

return statearr_15548;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___15568,timeout_ms_15567,temp__4657__auto___15566__$1,cb_uuid_15565,temp__4657__auto___15564,_QMARK_cb_uuid,ppstr,map__15522,map__15522__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1))
);

} else {
}
} else {
}

try{cljs.core.deref.call(null,self__.socket_).send(ppstr);

return new cljs.core.Keyword(null,"apparent-success","apparent-success",242592222);
}catch (e15549){if((e15549 instanceof Error)){
var e = e15549;
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init305516951502553584.clj",923,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (e,_QMARK_cb_uuid,ppstr,map__15522,map__15522__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"Chsk send error"], null);
});})(e,_QMARK_cb_uuid,ppstr,map__15522,map__15522__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1))
,null)),null,-428321098);

var temp__4657__auto___15575 = _QMARK_cb_uuid;
if(cljs.core.truth_(temp__4657__auto___15575)){
var cb_uuid_15576 = temp__4657__auto___15575;
var cb_fn_STAR__15577 = (function (){var or__26817__auto__ = taoensso.sente.pull_unused_cb_fn_BANG_.call(null,self__.cbs_waiting_,cb_uuid_15576);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
var e__$1 = (function (){try{if(cljs.core.truth_(taoensso.truss.impl.nnil_QMARK_.call(null,_QMARK_cb_fn))){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e15550){if((e15550 instanceof Error)){
var e__$1 = e15550;
return e__$1;
} else {
throw e15550;

}
}})();
if((e__$1 == null)){
return _QMARK_cb_fn;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(taoensso.truss.impl/nnil? ?cb-fn)",_QMARK_cb_fn,e__$1,null);
}
}
})();
cb_fn_STAR__15577.call(null,new cljs.core.Keyword("chsk","error","chsk/error",-984175439));
} else {
}

return false;
} else {
throw e15549;

}
}}
});

taoensso.sente.ChWebSocket.prototype.taoensso$sente$IChSocket$_chsk_connect_BANG_$arity$1 = (function (chsk){
var self__ = this;
var chsk__$1 = this;
var temp__4657__auto__ = (function (){var or__26817__auto__ = taoensso.encore.oget.call(null,window,"WebSocket");
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore.oget.call(null,window,"MozWebSocket");
}
})();
if(cljs.core.truth_(temp__4657__auto__)){
var WebSocket = temp__4657__auto__;
var retry_id = taoensso.encore.uuid_str.call(null);
var connect_fn = ((function (retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function taoensso$sente$connect_fn(){
var retry_fn = ((function (retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (){
if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,self__.active_retry_id_),retry_id)){
var retry_count_STAR_ = cljs.core.swap_BANG_.call(null,self__.retry_count_,cljs.core.inc);
var backoff_ms = self__.backoff_ms_fn.call(null,retry_count_STAR_);
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init305516951502553584.clj",941,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (retry_count_STAR_,backoff_ms,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk is closed: will try reconnect (%s)",retry_count_STAR_], null);
});})(retry_count_STAR_,backoff_ms,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
,null)),null,482774922);

return window.setTimeout(taoensso$sente$connect_fn,backoff_ms);
} else {
return null;
}
});})(retry_id,WebSocket,temp__4657__auto__,chsk__$1))
;
var _QMARK_socket = (function (){try{return (new WebSocket(taoensso.encore.merge_url_with_query_string.call(null,self__.url,cljs.core.merge.call(null,self__.params,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id], null)))));
}catch (e15557){if((e15557 instanceof Error)){
var e = e15557;
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init305516951502553584.clj",951,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (e,retry_fn,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"WebSocket js/Error"], null);
});})(e,retry_fn,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
,null)),null,577247283);

return null;
} else {
throw e15557;

}
}})();
if(cljs.core.not.call(null,_QMARK_socket)){
return retry_fn.call(null);
} else {
return cljs.core.reset_BANG_.call(null,self__.socket_,(function (){var G__15558 = _QMARK_socket;
(G__15558["onerror"] = ((function (G__15558,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (ws_ev){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init305516951502553584.clj",961,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (G__15558,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["WebSocket error: %s",(function (){try{return cljs.core.js__GT_clj.call(null,ws_ev);
}catch (e15559){var _ = e15559;
return ws_ev;
}})()], null);
});})(G__15558,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
,null)),null,643260503);

var last_ws_error = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"uuid","uuid",-2145095719),taoensso.encore.uuid_str.call(null),new cljs.core.Keyword(null,"ev","ev",-406827324),ws_ev], null);
return taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"last-ws-error","last-ws-error",-820288502),last_ws_error], null));
});})(G__15558,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
);

(G__15558["onmessage"] = ((function (G__15558,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (ws_ev){
var ppstr = taoensso.encore.oget.call(null,ws_ev,"data");
var vec__15560 = taoensso.sente.unpack.call(null,self__.packer,ppstr);
var clj = cljs.core.nth.call(null,vec__15560,(0),null);
var _QMARK_cb_uuid = cljs.core.nth.call(null,vec__15560,(1),null);
var or__26817__auto__ = (cljs.core.truth_(taoensso.sente.handshake_QMARK_.call(null,clj))?(function (){
taoensso.sente.receive_handshake_BANG_.call(null,new cljs.core.Keyword(null,"ws","ws",86841443),chsk__$1,clj);

return cljs.core.reset_BANG_.call(null,self__.retry_count_,(0));
})()
:null);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
var or__26817__auto____$1 = ((cljs.core._EQ_.call(null,clj,new cljs.core.Keyword("chsk","ws-ping","chsk/ws-ping",191675304)))?(function (){
if(cljs.core.truth_(cljs.core.deref.call(null,taoensso.sente.debug_mode_QMARK__))){
taoensso.sente.receive_buffered_evs_BANG_.call(null,self__.chs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("debug","ws-ping","debug/ws-ping",-168903566)], null)], null));
} else {
}

return new cljs.core.Keyword(null,"noop","noop",-673731258);
})()
:null);
if(cljs.core.truth_(or__26817__auto____$1)){
return or__26817__auto____$1;
} else {
var temp__4655__auto__ = _QMARK_cb_uuid;
if(cljs.core.truth_(temp__4655__auto__)){
var cb_uuid = temp__4655__auto__;
var temp__4655__auto____$1 = taoensso.sente.pull_unused_cb_fn_BANG_.call(null,self__.cbs_waiting_,cb_uuid);
if(cljs.core.truth_(temp__4655__auto____$1)){
var cb_fn = temp__4655__auto____$1;
return cb_fn.call(null,clj);
} else {
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init305516951502553584.clj",998,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (temp__4655__auto____$1,cb_uuid,temp__4655__auto__,or__26817__auto____$1,or__26817__auto__,ppstr,vec__15560,clj,_QMARK_cb_uuid,G__15558,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cb reply w/o local cb-fn: %s",clj], null);
});})(temp__4655__auto____$1,cb_uuid,temp__4655__auto__,or__26817__auto____$1,or__26817__auto__,ppstr,vec__15560,clj,_QMARK_cb_uuid,G__15558,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
,null)),null,1486759802);
}
} else {
var buffered_evs = clj;
return taoensso.sente.receive_buffered_evs_BANG_.call(null,self__.chs,buffered_evs);
}
}
}
});})(G__15558,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
);

(G__15558["onclose"] = ((function (G__15558,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (ws_ev){
var clean_QMARK_ = taoensso.encore.oget.call(null,ws_ev,"wasClean");
var code = taoensso.encore.oget.call(null,ws_ev,"code");
var reason = taoensso.encore.oget.call(null,ws_ev,"reason");
var last_ws_close = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"uuid","uuid",-2145095719),taoensso.encore.uuid_str.call(null),new cljs.core.Keyword(null,"ev","ev",-406827324),ws_ev,new cljs.core.Keyword(null,"clean?","clean?",-1675631009),clean_QMARK_,new cljs.core.Keyword(null,"code","code",1586293142),code,new cljs.core.Keyword(null,"reason","reason",-2070751759),reason], null);
if(cljs.core.truth_(clean_QMARK_)){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"taoensso.sente","/tmp/form-init305516951502553584.clj",1026,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (clean_QMARK_,code,reason,last_ws_close,G__15558,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Clean WebSocket close, will not attempt reconnect"], null);
});})(clean_QMARK_,code,reason,last_ws_close,G__15558,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
,null)),null,-186712712);

return taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"last-ws-close","last-ws-close",-798104932),last_ws_close], null));
} else {
taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"last-ws-close","last-ws-close",-798104932),last_ws_close,new cljs.core.Keyword(null,"open?","open?",1238443125),false], null));

return retry_fn.call(null);
}
});})(G__15558,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
);

return G__15558;
})());
}
});})(retry_id,WebSocket,temp__4657__auto__,chsk__$1))
;
cljs.core.reset_BANG_.call(null,self__.active_retry_id_,retry_id);

cljs.core.reset_BANG_.call(null,self__.retry_count_,(0));

connect_fn.call(null);

return chsk__$1;
} else {
return null;
}
});

taoensso.sente.ChWebSocket.getBasis = (function (){
return new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"client-id","client-id",1175909387,null),new cljs.core.Symbol(null,"chs","chs",2017417647,null),new cljs.core.Symbol(null,"params","params",-1943919534,null),new cljs.core.Symbol(null,"packer","packer",1706609071,null),new cljs.core.Symbol(null,"url","url",1916828573,null),new cljs.core.Symbol(null,"state_","state_",-1696768667,null),new cljs.core.Symbol(null,"active-retry-id_","active-retry-id_",1468292413,null),new cljs.core.Symbol(null,"retry-count_","retry-count_",1660769620,null),new cljs.core.Symbol(null,"ever-opened?_","ever-opened?_",-1013096856,null),new cljs.core.Symbol(null,"backoff-ms-fn","backoff-ms-fn",-1881539814,null),new cljs.core.Symbol(null,"cbs-waiting_","cbs-waiting_",121502466,null),new cljs.core.Symbol(null,"socket_","socket_",1279482619,null)], null);
});

taoensso.sente.ChWebSocket.cljs$lang$type = true;

taoensso.sente.ChWebSocket.cljs$lang$ctorPrSeq = (function (this__27093__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"taoensso.sente/ChWebSocket");
});

taoensso.sente.ChWebSocket.cljs$lang$ctorPrWriter = (function (this__27093__auto__,writer__27094__auto__){
return cljs.core._write.call(null,writer__27094__auto__,"taoensso.sente/ChWebSocket");
});

taoensso.sente.__GT_ChWebSocket = (function taoensso$sente$__GT_ChWebSocket(client_id,chs,params,packer,url,state_,active_retry_id_,retry_count_,ever_opened_QMARK__,backoff_ms_fn,cbs_waiting_,socket_){
return (new taoensso.sente.ChWebSocket(client_id,chs,params,packer,url,state_,active_retry_id_,retry_count_,ever_opened_QMARK__,backoff_ms_fn,cbs_waiting_,socket_,null,null,null));
});

taoensso.sente.map__GT_ChWebSocket = (function taoensso$sente$map__GT_ChWebSocket(G__15517){
return (new taoensso.sente.ChWebSocket(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(G__15517),new cljs.core.Keyword(null,"chs","chs",376886120).cljs$core$IFn$_invoke$arity$1(G__15517),new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(G__15517),new cljs.core.Keyword(null,"packer","packer",66077544).cljs$core$IFn$_invoke$arity$1(G__15517),new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(G__15517),new cljs.core.Keyword(null,"state_","state_",957667102).cljs$core$IFn$_invoke$arity$1(G__15517),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114).cljs$core$IFn$_invoke$arity$1(G__15517),new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093).cljs$core$IFn$_invoke$arity$1(G__15517),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913).cljs$core$IFn$_invoke$arity$1(G__15517),new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955).cljs$core$IFn$_invoke$arity$1(G__15517),new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061).cljs$core$IFn$_invoke$arity$1(G__15517),new cljs.core.Keyword(null,"socket_","socket_",-361048908).cljs$core$IFn$_invoke$arity$1(G__15517),null,cljs.core.dissoc.call(null,G__15517,new cljs.core.Keyword(null,"client-id","client-id",-464622140),new cljs.core.Keyword(null,"chs","chs",376886120),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.Keyword(null,"packer","packer",66077544),new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"state_","state_",957667102),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),new cljs.core.Keyword(null,"socket_","socket_",-361048908)),null));
});

taoensso.sente.new_ChWebSocket = (function taoensso$sente$new_ChWebSocket(opts){
return taoensso.sente.map__GT_ChWebSocket.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"state_","state_",957667102),cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ws","ws",86841443),new cljs.core.Keyword(null,"open?","open?",1238443125),false], null)),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),cljs.core.atom.call(null,"_pending"),new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),cljs.core.atom.call(null,(0)),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),cljs.core.atom.call(null,false),new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY),new cljs.core.Keyword(null,"socket_","socket_",-361048908),cljs.core.atom.call(null,null)], null),opts));
});
/**
 * We must set *some* client-side timeout otherwise an unpredictable (and
 *   probably too short) browser default will be used. Must be > server's
 *   :lp-timeout-ms.
 */
taoensso.sente.default_client_side_ajax_timeout_ms = taoensso.encore.ms.call(null,new cljs.core.Keyword(null,"secs","secs",1532330091),(60));

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
 * @implements {taoensso.sente.IChSocket}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
taoensso.sente.ChAjaxSocket = (function (client_id,chs,params,packer,url,state_,active_retry_id_,ever_opened_QMARK__,backoff_ms_fn,ajax_opts,curr_xhr_,__meta,__extmap,__hash){
this.client_id = client_id;
this.chs = chs;
this.params = params;
this.packer = packer;
this.url = url;
this.state_ = state_;
this.active_retry_id_ = active_retry_id_;
this.ever_opened_QMARK__ = ever_opened_QMARK__;
this.backoff_ms_fn = backoff_ms_fn;
this.ajax_opts = ajax_opts;
this.curr_xhr_ = curr_xhr_;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
taoensso.sente.ChAjaxSocket.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__27059__auto__,k__27060__auto__){
var self__ = this;
var this__27059__auto____$1 = this;
return cljs.core._lookup.call(null,this__27059__auto____$1,k__27060__auto__,null);
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__27061__auto__,k15579,else__27062__auto__){
var self__ = this;
var this__27061__auto____$1 = this;
var G__15581 = (((k15579 instanceof cljs.core.Keyword))?k15579.fqn:null);
switch (G__15581) {
case "curr-xhr_":
return self__.curr_xhr_;

break;
case "ever-opened?_":
return self__.ever_opened_QMARK__;

break;
case "client-id":
return self__.client_id;

break;
case "packer":
return self__.packer;

break;
case "chs":
return self__.chs;

break;
case "params":
return self__.params;

break;
case "backoff-ms-fn":
return self__.backoff_ms_fn;

break;
case "url":
return self__.url;

break;
case "active-retry-id_":
return self__.active_retry_id_;

break;
case "ajax-opts":
return self__.ajax_opts;

break;
case "state_":
return self__.state_;

break;
default:
return cljs.core.get.call(null,self__.__extmap,k15579,else__27062__auto__);

}
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__27073__auto__,writer__27074__auto__,opts__27075__auto__){
var self__ = this;
var this__27073__auto____$1 = this;
var pr_pair__27076__auto__ = ((function (this__27073__auto____$1){
return (function (keyval__27077__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__27074__auto__,cljs.core.pr_writer,""," ","",opts__27075__auto__,keyval__27077__auto__);
});})(this__27073__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__27074__auto__,pr_pair__27076__auto__,"#taoensso.sente.ChAjaxSocket{",", ","}",opts__27075__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"chs","chs",376886120),self__.chs],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"params","params",710516235),self__.params],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"packer","packer",66077544),self__.packer],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"url","url",276297046),self__.url],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),self__.active_retry_id_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),self__.ever_opened_QMARK__],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),self__.backoff_ms_fn],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),self__.ajax_opts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696),self__.curr_xhr_],null))], null),self__.__extmap));
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IIterable$ = true;

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__15578){
var self__ = this;
var G__15578__$1 = this;
return (new cljs.core.RecordIter((0),G__15578__$1,11,new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"client-id","client-id",-464622140),new cljs.core.Keyword(null,"chs","chs",376886120),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.Keyword(null,"packer","packer",66077544),new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"state_","state_",957667102),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696)], null),cljs.core._iterator.call(null,self__.__extmap)));
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__27057__auto__){
var self__ = this;
var this__27057__auto____$1 = this;
return self__.__meta;
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__27053__auto__){
var self__ = this;
var this__27053__auto____$1 = this;
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,self__.__hash));
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__27063__auto__){
var self__ = this;
var this__27063__auto____$1 = this;
return (11 + cljs.core.count.call(null,self__.__extmap));
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__27054__auto__){
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

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__27055__auto__,other__27056__auto__){
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

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__27068__auto__,k__27069__auto__){
var self__ = this;
var this__27068__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696),null,new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),null,new cljs.core.Keyword(null,"client-id","client-id",-464622140),null,new cljs.core.Keyword(null,"packer","packer",66077544),null,new cljs.core.Keyword(null,"chs","chs",376886120),null,new cljs.core.Keyword(null,"params","params",710516235),null,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),null,new cljs.core.Keyword(null,"url","url",276297046),null,new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),null,new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),null,new cljs.core.Keyword(null,"state_","state_",957667102),null], null), null),k__27069__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__27068__auto____$1),self__.__meta),k__27069__auto__);
} else {
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__27069__auto__)),null));
}
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__27066__auto__,k__27067__auto__,G__15578){
var self__ = this;
var this__27066__auto____$1 = this;
var pred__15582 = cljs.core.keyword_identical_QMARK_;
var expr__15583 = k__27067__auto__;
if(cljs.core.truth_(pred__15582.call(null,new cljs.core.Keyword(null,"client-id","client-id",-464622140),expr__15583))){
return (new taoensso.sente.ChAjaxSocket(G__15578,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15582.call(null,new cljs.core.Keyword(null,"chs","chs",376886120),expr__15583))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,G__15578,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15582.call(null,new cljs.core.Keyword(null,"params","params",710516235),expr__15583))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,G__15578,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15582.call(null,new cljs.core.Keyword(null,"packer","packer",66077544),expr__15583))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,G__15578,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15582.call(null,new cljs.core.Keyword(null,"url","url",276297046),expr__15583))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,G__15578,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15582.call(null,new cljs.core.Keyword(null,"state_","state_",957667102),expr__15583))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,G__15578,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15582.call(null,new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),expr__15583))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,G__15578,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15582.call(null,new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),expr__15583))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,G__15578,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15582.call(null,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),expr__15583))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,G__15578,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15582.call(null,new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),expr__15583))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,G__15578,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15582.call(null,new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696),expr__15583))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,G__15578,self__.__meta,self__.__extmap,null));
} else {
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__27067__auto__,G__15578),null));
}
}
}
}
}
}
}
}
}
}
}
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__27071__auto__){
var self__ = this;
var this__27071__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"chs","chs",376886120),self__.chs],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"params","params",710516235),self__.params],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"packer","packer",66077544),self__.packer],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"url","url",276297046),self__.url],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),self__.active_retry_id_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),self__.ever_opened_QMARK__],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),self__.backoff_ms_fn],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),self__.ajax_opts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696),self__.curr_xhr_],null))], null),self__.__extmap));
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__27058__auto__,G__15578){
var self__ = this;
var this__27058__auto____$1 = this;
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,G__15578,self__.__extmap,self__.__hash));
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__27064__auto__,entry__27065__auto__){
var self__ = this;
var this__27064__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__27065__auto__)){
return cljs.core._assoc.call(null,this__27064__auto____$1,cljs.core._nth.call(null,entry__27065__auto__,(0)),cljs.core._nth.call(null,entry__27065__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__27064__auto____$1,entry__27065__auto__);
}
});

taoensso.sente.ChAjaxSocket.prototype.taoensso$sente$IChSocket$ = true;

taoensso.sente.ChAjaxSocket.prototype.taoensso$sente$IChSocket$_chsk_disconnect_BANG_$arity$2 = (function (chsk,reconn_QMARK_){
var self__ = this;
var chsk__$1 = this;
cljs.core.reset_BANG_.call(null,self__.active_retry_id_,"_disable-auto-retry");

if(cljs.core.truth_(reconn_QMARK_)){
taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"open?","open?",1238443125),false,new cljs.core.Keyword(null,"requested-reconnect-pending?","requested-reconnect-pending?",-299841116),true], null));
} else {
taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open?","open?",1238443125),false], null));
}

var temp__4657__auto__ = cljs.core.deref.call(null,self__.curr_xhr_);
if(cljs.core.truth_(temp__4657__auto__)){
var x = temp__4657__auto__;
return x.abort();
} else {
return null;
}
});

taoensso.sente.ChAjaxSocket.prototype.taoensso$sente$IChSocket$_chsk_reconnect_BANG_$arity$1 = (function (chsk){
var self__ = this;
var chsk__$1 = this;
taoensso.sente._chsk_disconnect_BANG_.call(null,chsk__$1,new cljs.core.Keyword(null,"reconn","reconn",-807347633));

return taoensso.sente._chsk_connect_BANG_.call(null,chsk__$1);
});

taoensso.sente.ChAjaxSocket.prototype.taoensso$sente$IChSocket$_chsk_send_BANG_$arity$3 = (function (chsk,ev,opts){
var self__ = this;
var chsk__$1 = this;
var map__15585 = opts;
var map__15585__$1 = ((((!((map__15585 == null)))?((((map__15585.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15585.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15585):map__15585);
var _QMARK_timeout_ms = cljs.core.get.call(null,map__15585__$1,new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406));
var _QMARK_cb = cljs.core.get.call(null,map__15585__$1,new cljs.core.Keyword(null,"cb","cb",589947841));
var flush_QMARK_ = cljs.core.get.call(null,map__15585__$1,new cljs.core.Keyword(null,"flush?","flush?",-108887231));
var _ = taoensso.sente.assert_send_args.call(null,ev,_QMARK_timeout_ms,_QMARK_cb);
var _QMARK_cb_fn = taoensso.sente.cb_chan_as_fn.call(null,_QMARK_cb,ev);
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"open?","open?",1238443125).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,self__.state_)))){
return taoensso.sente.chsk_send__GT_closed_BANG_.call(null,_QMARK_cb_fn);
} else {
var csrf_token = new cljs.core.Keyword(null,"csrf-token","csrf-token",-1872302856).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,self__.state_));
taoensso.sente.ajax_lite.call(null,self__.url,cljs.core.merge.call(null,self__.ajax_opts,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406),(function (){var or__26817__auto__ = _QMARK_timeout_ms;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
var or__26817__auto____$1 = new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406).cljs$core$IFn$_invoke$arity$1(self__.ajax_opts);
if(cljs.core.truth_(or__26817__auto____$1)){
return or__26817__auto____$1;
} else {
return taoensso.sente.default_client_side_ajax_timeout_ms;
}
}
})(),new cljs.core.Keyword(null,"resp-type","resp-type",1050675962),new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.Keyword(null,"headers","headers",-835030129),cljs.core.merge.call(null,new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(self__.ajax_opts),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"X-CSRF-Token","X-CSRF-Token",1562992453),csrf_token], null)),new cljs.core.Keyword(null,"params","params",710516235),(function (){var ppstr = taoensso.sente.pack.call(null,self__.packer,cljs.core.meta.call(null,ev),ev,(cljs.core.truth_(_QMARK_cb_fn)?new cljs.core.Keyword(null,"ajax-cb","ajax-cb",-807060321):null));
return cljs.core.merge.call(null,self__.params,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"udt","udt",2011712751),taoensso.encore.now_udt.call(null),new cljs.core.Keyword(null,"csrf-token","csrf-token",-1872302856),csrf_token,new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id,new cljs.core.Keyword(null,"ppstr","ppstr",1557495252),ppstr], null));
})()], null)),((function (csrf_token,map__15585,map__15585__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1){
return (function taoensso$sente$ajax_cb(p__15587){
var map__15593 = p__15587;
var map__15593__$1 = ((((!((map__15593 == null)))?((((map__15593.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15593.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15593):map__15593);
var _QMARK_error = cljs.core.get.call(null,map__15593__$1,new cljs.core.Keyword(null,"?error","?error",1070752222));
var _QMARK_content = cljs.core.get.call(null,map__15593__$1,new cljs.core.Keyword(null,"?content","?content",1697782054));
if(cljs.core.truth_(_QMARK_error)){
if(cljs.core._EQ_.call(null,_QMARK_error,new cljs.core.Keyword(null,"timeout","timeout",-318625318))){
if(cljs.core.truth_(_QMARK_cb_fn)){
return _QMARK_cb_fn.call(null,new cljs.core.Keyword("chsk","timeout","chsk/timeout",-319776489));
} else {
return null;
}
} else {
taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open?","open?",1238443125),false], null));

if(cljs.core.truth_(_QMARK_cb_fn)){
return _QMARK_cb_fn.call(null,new cljs.core.Keyword("chsk","error","chsk/error",-984175439));
} else {
return null;
}
}
} else {
var content = _QMARK_content;
var resp_ppstr = content;
var vec__15595 = taoensso.sente.unpack.call(null,self__.packer,resp_ppstr);
var resp_clj = cljs.core.nth.call(null,vec__15595,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__15595,(1),null);
if(cljs.core.truth_(_QMARK_cb_fn)){
_QMARK_cb_fn.call(null,resp_clj);
} else {
if(cljs.core.not_EQ_.call(null,resp_clj,new cljs.core.Keyword("chsk","dummy-cb-200","chsk/dummy-cb-200",-1663130337))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init305516951502553584.clj",1124,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (content,resp_ppstr,vec__15595,resp_clj,___$1,map__15593,map__15593__$1,_QMARK_error,_QMARK_content,csrf_token,map__15585,map__15585__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cb reply w/o local cb-fn: %s",resp_clj], null);
});})(content,resp_ppstr,vec__15595,resp_clj,___$1,map__15593,map__15593__$1,_QMARK_error,_QMARK_content,csrf_token,map__15585,map__15585__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1))
,null)),null,2014763994);
} else {
}
}

return taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open?","open?",1238443125),true], null));
}
});})(csrf_token,map__15585,map__15585__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1))
);

return new cljs.core.Keyword(null,"apparent-success","apparent-success",242592222);
}
});

taoensso.sente.ChAjaxSocket.prototype.taoensso$sente$IChSocket$_chsk_connect_BANG_$arity$1 = (function (chsk){
var self__ = this;
var chsk__$1 = this;
var retry_id = taoensso.encore.uuid_str.call(null);
var poll_fn = ((function (retry_id,chsk__$1){
return (function taoensso$sente$poll_fn(retry_count){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",1133,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (retry_id,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["async-poll-for-update!"], null);
});})(retry_id,chsk__$1))
,null)),null,-1964665661);

var retry_fn = ((function (retry_id,chsk__$1){
return (function (){
if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,self__.active_retry_id_),retry_id)){
var retry_count_STAR_ = (retry_count + (1));
var backoff_ms = self__.backoff_ms_fn.call(null,retry_count_STAR_);
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init305516951502553584.clj",1139,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (retry_count_STAR_,backoff_ms,retry_id,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk is closed: will try reconnect (%s)",retry_count_STAR_], null);
});})(retry_count_STAR_,backoff_ms,retry_id,chsk__$1))
,null)),null,1069613413);

return window.setTimeout(((function (retry_count_STAR_,backoff_ms,retry_id,chsk__$1){
return (function (){
return taoensso$sente$poll_fn.call(null,retry_count_STAR_);
});})(retry_count_STAR_,backoff_ms,retry_id,chsk__$1))
,backoff_ms);
} else {
return null;
}
});})(retry_id,chsk__$1))
;
return cljs.core.reset_BANG_.call(null,self__.curr_xhr_,taoensso.sente.ajax_lite.call(null,self__.url,cljs.core.merge.call(null,self__.ajax_opts,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406),(function (){var or__26817__auto__ = new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406).cljs$core$IFn$_invoke$arity$1(self__.ajax_opts);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.sente.default_client_side_ajax_timeout_ms;
}
})(),new cljs.core.Keyword(null,"resp-type","resp-type",1050675962),new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.Keyword(null,"params","params",710516235),cljs.core.merge.call(null,self__.params,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"udt","udt",2011712751),taoensso.encore.now_udt.call(null),new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id], null),(cljs.core.truth_(new cljs.core.Keyword(null,"open?","open?",1238443125).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,self__.state_)))?null:new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"handshake?","handshake?",-423743093),true], null)))], null)),((function (retry_fn,retry_id,chsk__$1){
return (function taoensso$sente$poll_fn_$_ajax_cb(p__15609){
var map__15615 = p__15609;
var map__15615__$1 = ((((!((map__15615 == null)))?((((map__15615.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15615.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15615):map__15615);
var _QMARK_error = cljs.core.get.call(null,map__15615__$1,new cljs.core.Keyword(null,"?error","?error",1070752222));
var _QMARK_content = cljs.core.get.call(null,map__15615__$1,new cljs.core.Keyword(null,"?content","?content",1697782054));
if(cljs.core.truth_(_QMARK_error)){
if(cljs.core._EQ_.call(null,_QMARK_error,new cljs.core.Keyword(null,"timeout","timeout",-318625318))){
return taoensso$sente$poll_fn.call(null,(0));
} else {
taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open?","open?",1238443125),false], null));

return retry_fn.call(null);

}
} else {
var content = _QMARK_content;
var ppstr = content;
var vec__15617 = taoensso.sente.unpack.call(null,self__.packer,ppstr);
var clj = cljs.core.nth.call(null,vec__15617,(0),null);
var handshake_QMARK_ = taoensso.sente.handshake_QMARK_.call(null,clj);
if(cljs.core.truth_(handshake_QMARK_)){
taoensso.sente.receive_handshake_BANG_.call(null,new cljs.core.Keyword(null,"ajax","ajax",814345549),chsk__$1,clj);
} else {
}

taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open?","open?",1238443125),true], null));

taoensso$sente$poll_fn.call(null,(0));

if(cljs.core.truth_(handshake_QMARK_)){
return null;
} else {
var or__26817__auto__ = ((cljs.core._EQ_.call(null,clj,new cljs.core.Keyword("chsk","timeout","chsk/timeout",-319776489)))?(function (){
if(cljs.core.truth_(cljs.core.deref.call(null,taoensso.sente.debug_mode_QMARK__))){
taoensso.sente.receive_buffered_evs_BANG_.call(null,self__.chs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("debug","timeout","debug/timeout",309499949)], null)], null));
} else {
}

return new cljs.core.Keyword(null,"noop","noop",-673731258);
})()
:null);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
var buffered_evs = clj;
return taoensso.sente.receive_buffered_evs_BANG_.call(null,self__.chs,buffered_evs);
}
}
}
});})(retry_fn,retry_id,chsk__$1))
));
});})(retry_id,chsk__$1))
;
cljs.core.reset_BANG_.call(null,self__.active_retry_id_,retry_id);

poll_fn.call(null,(0));

return chsk__$1;
});

taoensso.sente.ChAjaxSocket.getBasis = (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"client-id","client-id",1175909387,null),new cljs.core.Symbol(null,"chs","chs",2017417647,null),new cljs.core.Symbol(null,"params","params",-1943919534,null),new cljs.core.Symbol(null,"packer","packer",1706609071,null),new cljs.core.Symbol(null,"url","url",1916828573,null),new cljs.core.Symbol(null,"state_","state_",-1696768667,null),new cljs.core.Symbol(null,"active-retry-id_","active-retry-id_",1468292413,null),new cljs.core.Symbol(null,"ever-opened?_","ever-opened?_",-1013096856,null),new cljs.core.Symbol(null,"backoff-ms-fn","backoff-ms-fn",-1881539814,null),new cljs.core.Symbol(null,"ajax-opts","ajax-opts",1122292418,null),new cljs.core.Symbol(null,"curr-xhr_","curr-xhr_",321757831,null)], null);
});

taoensso.sente.ChAjaxSocket.cljs$lang$type = true;

taoensso.sente.ChAjaxSocket.cljs$lang$ctorPrSeq = (function (this__27093__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"taoensso.sente/ChAjaxSocket");
});

taoensso.sente.ChAjaxSocket.cljs$lang$ctorPrWriter = (function (this__27093__auto__,writer__27094__auto__){
return cljs.core._write.call(null,writer__27094__auto__,"taoensso.sente/ChAjaxSocket");
});

taoensso.sente.__GT_ChAjaxSocket = (function taoensso$sente$__GT_ChAjaxSocket(client_id,chs,params,packer,url,state_,active_retry_id_,ever_opened_QMARK__,backoff_ms_fn,ajax_opts,curr_xhr_){
return (new taoensso.sente.ChAjaxSocket(client_id,chs,params,packer,url,state_,active_retry_id_,ever_opened_QMARK__,backoff_ms_fn,ajax_opts,curr_xhr_,null,null,null));
});

taoensso.sente.map__GT_ChAjaxSocket = (function taoensso$sente$map__GT_ChAjaxSocket(G__15580){
return (new taoensso.sente.ChAjaxSocket(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(G__15580),new cljs.core.Keyword(null,"chs","chs",376886120).cljs$core$IFn$_invoke$arity$1(G__15580),new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(G__15580),new cljs.core.Keyword(null,"packer","packer",66077544).cljs$core$IFn$_invoke$arity$1(G__15580),new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(G__15580),new cljs.core.Keyword(null,"state_","state_",957667102).cljs$core$IFn$_invoke$arity$1(G__15580),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114).cljs$core$IFn$_invoke$arity$1(G__15580),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913).cljs$core$IFn$_invoke$arity$1(G__15580),new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955).cljs$core$IFn$_invoke$arity$1(G__15580),new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109).cljs$core$IFn$_invoke$arity$1(G__15580),new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696).cljs$core$IFn$_invoke$arity$1(G__15580),null,cljs.core.dissoc.call(null,G__15580,new cljs.core.Keyword(null,"client-id","client-id",-464622140),new cljs.core.Keyword(null,"chs","chs",376886120),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.Keyword(null,"packer","packer",66077544),new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"state_","state_",957667102),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696)),null));
});

taoensso.sente.new_ChAjaxSocket = (function taoensso$sente$new_ChAjaxSocket(opts){
return taoensso.sente.map__GT_ChAjaxSocket.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"state_","state_",957667102),cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"ajax","ajax",814345549),new cljs.core.Keyword(null,"open?","open?",1238443125),false], null)),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),cljs.core.atom.call(null,"_pending"),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),cljs.core.atom.call(null,false),new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696),cljs.core.atom.call(null,null)], null),opts));
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
 * @implements {taoensso.sente.IChSocket}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
taoensso.sente.ChAutoSocket = (function (ws_chsk_opts,ajax_chsk_opts,state_,impl_,__meta,__extmap,__hash){
this.ws_chsk_opts = ws_chsk_opts;
this.ajax_chsk_opts = ajax_chsk_opts;
this.state_ = state_;
this.impl_ = impl_;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
taoensso.sente.ChAutoSocket.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__27059__auto__,k__27060__auto__){
var self__ = this;
var this__27059__auto____$1 = this;
return cljs.core._lookup.call(null,this__27059__auto____$1,k__27060__auto__,null);
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__27061__auto__,k15622,else__27062__auto__){
var self__ = this;
var this__27061__auto____$1 = this;
var G__15624 = (((k15622 instanceof cljs.core.Keyword))?k15622.fqn:null);
switch (G__15624) {
case "ws-chsk-opts":
return self__.ws_chsk_opts;

break;
case "ajax-chsk-opts":
return self__.ajax_chsk_opts;

break;
case "state_":
return self__.state_;

break;
case "impl_":
return self__.impl_;

break;
default:
return cljs.core.get.call(null,self__.__extmap,k15622,else__27062__auto__);

}
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__27073__auto__,writer__27074__auto__,opts__27075__auto__){
var self__ = this;
var this__27073__auto____$1 = this;
var pr_pair__27076__auto__ = ((function (this__27073__auto____$1){
return (function (keyval__27077__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__27074__auto__,cljs.core.pr_writer,""," ","",opts__27075__auto__,keyval__27077__auto__);
});})(this__27073__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__27074__auto__,pr_pair__27076__auto__,"#taoensso.sente.ChAutoSocket{",", ","}",opts__27075__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),self__.ws_chsk_opts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),self__.ajax_chsk_opts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"impl_","impl_",1218818179),self__.impl_],null))], null),self__.__extmap));
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IIterable$ = true;

taoensso.sente.ChAutoSocket.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__15621){
var self__ = this;
var G__15621__$1 = this;
return (new cljs.core.RecordIter((0),G__15621__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),new cljs.core.Keyword(null,"state_","state_",957667102),new cljs.core.Keyword(null,"impl_","impl_",1218818179)], null),cljs.core._iterator.call(null,self__.__extmap)));
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__27057__auto__){
var self__ = this;
var this__27057__auto____$1 = this;
return self__.__meta;
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__27053__auto__){
var self__ = this;
var this__27053__auto____$1 = this;
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,self__.ajax_chsk_opts,self__.state_,self__.impl_,self__.__meta,self__.__extmap,self__.__hash));
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__27063__auto__){
var self__ = this;
var this__27063__auto____$1 = this;
return (4 + cljs.core.count.call(null,self__.__extmap));
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__27054__auto__){
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

taoensso.sente.ChAutoSocket.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__27055__auto__,other__27056__auto__){
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

taoensso.sente.ChAutoSocket.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__27068__auto__,k__27069__auto__){
var self__ = this;
var this__27068__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"impl_","impl_",1218818179),null,new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),null,new cljs.core.Keyword(null,"state_","state_",957667102),null,new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),null], null), null),k__27069__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__27068__auto____$1),self__.__meta),k__27069__auto__);
} else {
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,self__.ajax_chsk_opts,self__.state_,self__.impl_,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__27069__auto__)),null));
}
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__27066__auto__,k__27067__auto__,G__15621){
var self__ = this;
var this__27066__auto____$1 = this;
var pred__15625 = cljs.core.keyword_identical_QMARK_;
var expr__15626 = k__27067__auto__;
if(cljs.core.truth_(pred__15625.call(null,new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),expr__15626))){
return (new taoensso.sente.ChAutoSocket(G__15621,self__.ajax_chsk_opts,self__.state_,self__.impl_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15625.call(null,new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),expr__15626))){
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,G__15621,self__.state_,self__.impl_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15625.call(null,new cljs.core.Keyword(null,"state_","state_",957667102),expr__15626))){
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,self__.ajax_chsk_opts,G__15621,self__.impl_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__15625.call(null,new cljs.core.Keyword(null,"impl_","impl_",1218818179),expr__15626))){
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,self__.ajax_chsk_opts,self__.state_,G__15621,self__.__meta,self__.__extmap,null));
} else {
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,self__.ajax_chsk_opts,self__.state_,self__.impl_,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__27067__auto__,G__15621),null));
}
}
}
}
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__27071__auto__){
var self__ = this;
var this__27071__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),self__.ws_chsk_opts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),self__.ajax_chsk_opts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"impl_","impl_",1218818179),self__.impl_],null))], null),self__.__extmap));
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__27058__auto__,G__15621){
var self__ = this;
var this__27058__auto____$1 = this;
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,self__.ajax_chsk_opts,self__.state_,self__.impl_,G__15621,self__.__extmap,self__.__hash));
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__27064__auto__,entry__27065__auto__){
var self__ = this;
var this__27064__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__27065__auto__)){
return cljs.core._assoc.call(null,this__27064__auto____$1,cljs.core._nth.call(null,entry__27065__auto__,(0)),cljs.core._nth.call(null,entry__27065__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__27064__auto____$1,entry__27065__auto__);
}
});

taoensso.sente.ChAutoSocket.prototype.taoensso$sente$IChSocket$ = true;

taoensso.sente.ChAutoSocket.prototype.taoensso$sente$IChSocket$_chsk_disconnect_BANG_$arity$2 = (function (chsk,reconn_QMARK_){
var self__ = this;
var chsk__$1 = this;
var temp__4657__auto__ = cljs.core.deref.call(null,self__.impl_);
if(cljs.core.truth_(temp__4657__auto__)){
var impl = temp__4657__auto__;
return taoensso.sente._chsk_disconnect_BANG_.call(null,impl,reconn_QMARK_);
} else {
return null;
}
});

taoensso.sente.ChAutoSocket.prototype.taoensso$sente$IChSocket$_chsk_reconnect_BANG_$arity$1 = (function (chsk){
var self__ = this;
var chsk__$1 = this;
var temp__4657__auto__ = cljs.core.deref.call(null,self__.impl_);
if(cljs.core.truth_(temp__4657__auto__)){
var impl = temp__4657__auto__;
taoensso.sente._chsk_disconnect_BANG_.call(null,impl,new cljs.core.Keyword(null,"reconn","reconn",-807347633));

return taoensso.sente._chsk_connect_BANG_.call(null,chsk__$1);
} else {
return null;
}
});

taoensso.sente.ChAutoSocket.prototype.taoensso$sente$IChSocket$_chsk_send_BANG_$arity$3 = (function (chsk,ev,opts){
var self__ = this;
var chsk__$1 = this;
var temp__4655__auto__ = cljs.core.deref.call(null,self__.impl_);
if(cljs.core.truth_(temp__4655__auto__)){
var impl = temp__4655__auto__;
return taoensso.sente._chsk_send_BANG_.call(null,impl,ev,opts);
} else {
var map__15628 = opts;
var map__15628__$1 = ((((!((map__15628 == null)))?((((map__15628.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15628.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15628):map__15628);
var _QMARK_cb = cljs.core.get.call(null,map__15628__$1,new cljs.core.Keyword(null,"cb","cb",589947841));
var _QMARK_cb_fn = taoensso.sente.cb_chan_as_fn.call(null,_QMARK_cb,ev);
return taoensso.sente.chsk_send__GT_closed_BANG_.call(null,_QMARK_cb_fn);
}
});

taoensso.sente.ChAutoSocket.prototype.taoensso$sente$IChSocket$_chsk_connect_BANG_$arity$1 = (function (chsk){
var self__ = this;
var chsk__$1 = this;
var ajax_chsk_opts__$1 = cljs.core.assoc.call(null,self__.ajax_chsk_opts,new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_);
var ws_chsk_opts__$1 = cljs.core.assoc.call(null,self__.ws_chsk_opts,new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_);
var ajax_conn_BANG_ = ((function (ajax_chsk_opts__$1,ws_chsk_opts__$1,chsk__$1){
return (function (){
cljs.core.remove_watch.call(null,self__.state_,new cljs.core.Keyword("chsk","auto-ajax-downgrade","chsk/auto-ajax-downgrade",-831528080));

return taoensso.sente._chsk_connect_BANG_.call(null,taoensso.sente.new_ChAjaxSocket.call(null,ajax_chsk_opts__$1));
});})(ajax_chsk_opts__$1,ws_chsk_opts__$1,chsk__$1))
;
var ws_conn_BANG_ = ((function (ajax_chsk_opts__$1,ws_chsk_opts__$1,ajax_conn_BANG_,chsk__$1){
return (function (){
var downgraded_QMARK___15631 = cljs.core.atom.call(null,false);
cljs.core.add_watch.call(null,self__.state_,new cljs.core.Keyword("chsk","auto-ajax-downgrade","chsk/auto-ajax-downgrade",-831528080),((function (downgraded_QMARK___15631,ajax_chsk_opts__$1,ws_chsk_opts__$1,ajax_conn_BANG_,chsk__$1){
return (function (_,___$1,old_state,new_state){
var temp__4657__auto__ = cljs.core.deref.call(null,self__.impl_);
if(cljs.core.truth_(temp__4657__auto__)){
var impl = temp__4657__auto__;
var temp__4657__auto____$1 = new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913).cljs$core$IFn$_invoke$arity$1(impl);
if(cljs.core.truth_(temp__4657__auto____$1)){
var ever_opened_QMARK__ = temp__4657__auto____$1;
if(cljs.core.truth_(cljs.core.deref.call(null,ever_opened_QMARK__))){
return null;
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"last-error","last-error",1848699973).cljs$core$IFn$_invoke$arity$1(new_state))){
if(cljs.core.truth_(cljs.core.compare_and_set_BANG_.call(null,downgraded_QMARK___15631,false,true))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init305516951502553584.clj",1260,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (ever_opened_QMARK__,temp__4657__auto____$1,impl,temp__4657__auto__,downgraded_QMARK___15631,ajax_chsk_opts__$1,ws_chsk_opts__$1,ajax_conn_BANG_,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Permanently downgrading :auto chsk -> :ajax"], null);
});})(ever_opened_QMARK__,temp__4657__auto____$1,impl,temp__4657__auto__,downgraded_QMARK___15631,ajax_chsk_opts__$1,ws_chsk_opts__$1,ajax_conn_BANG_,chsk__$1))
,null)),null,235385387);

taoensso.sente._chsk_disconnect_BANG_.call(null,impl,false);

return cljs.core.reset_BANG_.call(null,self__.impl_,ajax_conn_BANG_.call(null));
} else {
return null;
}
} else {
return null;
}
}
} else {
return null;
}
} else {
return null;
}
});})(downgraded_QMARK___15631,ajax_chsk_opts__$1,ws_chsk_opts__$1,ajax_conn_BANG_,chsk__$1))
);

return taoensso.sente._chsk_connect_BANG_.call(null,taoensso.sente.new_ChWebSocket.call(null,ws_chsk_opts__$1));
});})(ajax_chsk_opts__$1,ws_chsk_opts__$1,ajax_conn_BANG_,chsk__$1))
;
cljs.core.reset_BANG_.call(null,self__.impl_,(function (){var or__26817__auto__ = ws_conn_BANG_.call(null);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return ajax_conn_BANG_.call(null);
}
})());

return chsk__$1;
});

taoensso.sente.ChAutoSocket.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ws-chsk-opts","ws-chsk-opts",-349638577,null),new cljs.core.Symbol(null,"ajax-chsk-opts","ajax-chsk-opts",-1051844442,null),new cljs.core.Symbol(null,"state_","state_",-1696768667,null),new cljs.core.Symbol(null,"impl_","impl_",-1435617590,null)], null);
});

taoensso.sente.ChAutoSocket.cljs$lang$type = true;

taoensso.sente.ChAutoSocket.cljs$lang$ctorPrSeq = (function (this__27093__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"taoensso.sente/ChAutoSocket");
});

taoensso.sente.ChAutoSocket.cljs$lang$ctorPrWriter = (function (this__27093__auto__,writer__27094__auto__){
return cljs.core._write.call(null,writer__27094__auto__,"taoensso.sente/ChAutoSocket");
});

taoensso.sente.__GT_ChAutoSocket = (function taoensso$sente$__GT_ChAutoSocket(ws_chsk_opts,ajax_chsk_opts,state_,impl_){
return (new taoensso.sente.ChAutoSocket(ws_chsk_opts,ajax_chsk_opts,state_,impl_,null,null,null));
});

taoensso.sente.map__GT_ChAutoSocket = (function taoensso$sente$map__GT_ChAutoSocket(G__15623){
return (new taoensso.sente.ChAutoSocket(new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104).cljs$core$IFn$_invoke$arity$1(G__15623),new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327).cljs$core$IFn$_invoke$arity$1(G__15623),new cljs.core.Keyword(null,"state_","state_",957667102).cljs$core$IFn$_invoke$arity$1(G__15623),new cljs.core.Keyword(null,"impl_","impl_",1218818179).cljs$core$IFn$_invoke$arity$1(G__15623),null,cljs.core.dissoc.call(null,G__15623,new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),new cljs.core.Keyword(null,"state_","state_",957667102),new cljs.core.Keyword(null,"impl_","impl_",1218818179)),null));
});

taoensso.sente.new_ChAutoSocket = (function taoensso$sente$new_ChAutoSocket(opts){
return taoensso.sente.map__GT_ChAutoSocket.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"state_","state_",957667102),cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492),new cljs.core.Keyword(null,"open?","open?",1238443125),false], null)),new cljs.core.Keyword(null,"impl_","impl_",1218818179),cljs.core.atom.call(null,null)], null),opts));
});
taoensso.sente.get_chsk_url = (function taoensso$sente$get_chsk_url(protocol,host,path,type){
var protocol__$1 = (function (){var G__15633 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__15633) {
case "ajax":
return protocol;

break;
case "ws":
if(cljs.core._EQ_.call(null,protocol,"https:")){
return "wss:";
} else {
return "ws:";
}

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}
})();
return [cljs.core.str(protocol__$1),cljs.core.str("//"),cljs.core.str(taoensso.encore.path.call(null,host,path))].join('');
});
/**
 * Returns nil on failure, or a map with keys:
 *  :ch-recv ; core.async channel to receive `event-msg`s (internal or from
 *           ; clients). May `put!` (inject) arbitrary `event`s to this channel.
 *  :send-fn ; (fn [event & [?timeout-ms ?cb-fn]]) for client>server send.
 *  :state   ; Watchable, read-only (atom {:type _ :open? _ :uid _ :csrf-token _}).
 *  :chsk    ; IChSocket implementer. You can usu. ignore this.
 * 
 *   Common options:
 *  :type           ; e/o #{:auto :ws :ajax}. You'll usually want the default (:auto).
 *  :host           ; Server host (defaults to current page's host).
 *  :params         ; Map of any params to incl. in chsk Ring requests (handy
 *                  ; for application-level auth, etc.).
 *  :packer         ; :edn (default), or an IPacker implementation.
 *  :ajax-opts      ; Base opts map provided to `taoensso.encore/ajax-lite`.
 *  :wrap-recv-evs? ; Should events from server be wrapped in [:chsk/recv _]?
 */
taoensso.sente.make_channel_socket_client_BANG_ = (function taoensso$sente$make_channel_socket_client_BANG_(var_args){
var args__27351__auto__ = [];
var len__27348__auto___15655 = arguments.length;
var i__27349__auto___15656 = (0);
while(true){
if((i__27349__auto___15656 < len__27348__auto___15655)){
args__27351__auto__.push((arguments[i__27349__auto___15656]));

var G__15657 = (i__27349__auto___15656 + (1));
i__27349__auto___15656 = G__15657;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return taoensso.sente.make_channel_socket_client_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

taoensso.sente.make_channel_socket_client_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (path,p__15637){
var vec__15638 = p__15637;
var map__15641 = cljs.core.nth.call(null,vec__15638,(0),null);
var map__15641__$1 = ((((!((map__15641 == null)))?((((map__15641.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15641.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15641):map__15641);
var opts = map__15641__$1;
var type = cljs.core.get.call(null,map__15641__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492));
var host = cljs.core.get.call(null,map__15641__$1,new cljs.core.Keyword(null,"host","host",-1558485167));
var params = cljs.core.get.call(null,map__15641__$1,new cljs.core.Keyword(null,"params","params",710516235));
var recv_buf_or_n = cljs.core.get.call(null,map__15641__$1,new cljs.core.Keyword(null,"recv-buf-or-n","recv-buf-or-n",1363950355),cljs.core.async.sliding_buffer.call(null,(2048)));
var packer = cljs.core.get.call(null,map__15641__$1,new cljs.core.Keyword(null,"packer","packer",66077544),new cljs.core.Keyword(null,"edn","edn",1317840885));
var client_id = cljs.core.get.call(null,map__15641__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140),(function (){var or__26817__auto__ = new cljs.core.Keyword(null,"client-uuid","client-uuid",-1717531965).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return taoensso.encore.uuid_str.call(null);
}
})());
var ajax_opts = cljs.core.get.call(null,map__15641__$1,new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109));
var wrap_recv_evs_QMARK_ = cljs.core.get.call(null,map__15641__$1,new cljs.core.Keyword(null,"wrap-recv-evs?","wrap-recv-evs?",-1996694153),true);
var backoff_ms_fn = cljs.core.get.call(null,map__15641__$1,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),taoensso.encore.exp_backoff);
var _deprecated_more_opts = cljs.core.nth.call(null,vec__15638,(1),null);
var e_15658 = (function (){try{if(((function (vec__15638,map__15641,map__15641__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts){
return (function (x){
return cljs.core.contains_QMARK_.call(null,taoensso.truss.impl.set_STAR_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ws","ws",86841443),null,new cljs.core.Keyword(null,"ajax","ajax",814345549),null,new cljs.core.Keyword(null,"auto","auto",-566279492),null], null), null)),x);
});})(vec__15638,map__15641,map__15641__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts))
.call(null,type)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e15643){if((e15643 instanceof Error)){
var e = e15643;
return e;
} else {
throw e15643;

}
}})();
if((e_15658 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"([:in #{:ws :ajax :auto}] type)",type,e_15658,null);
}

var e_15659 = (function (){try{if(taoensso.encore.nblank_str_QMARK_.call(null,client_id)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e15644){if((e15644 instanceof Error)){
var e = e15644;
return e;
} else {
throw e15644;

}
}})();
if((e_15659 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(enc/nblank-str? client-id)",client_id,e_15659,null);
}

if(!((_deprecated_more_opts == null))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init305516951502553584.clj",1323,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__15638,map__15641,map__15641__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["`make-channel-socket-client!` fn signature CHANGED with Sente v0.10.0."], null);
});})(vec__15638,map__15641,map__15641__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts))
,null)),null,751269696);
} else {
}

if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"lp-timeout","lp-timeout",1149461302))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init305516951502553584.clj",1324,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__15638,map__15641,map__15641__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [":lp-timeout opt has CHANGED; please use :lp-timout-ms."], null);
});})(vec__15638,map__15641,map__15641__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts))
,null)),null,571187727);
} else {
}

var packer__$1 = taoensso.sente.coerce_packer.call(null,packer);
var win_loc = taoensso.encore.get_win_loc.call(null);
var win_protocol = new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(win_loc);
var host__$1 = (function (){var or__26817__auto__ = host;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return new cljs.core.Keyword(null,"host","host",-1558485167).cljs$core$IFn$_invoke$arity$1(win_loc);
}
})();
var path__$1 = (function (){var or__26817__auto__ = path;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return new cljs.core.Keyword(null,"pathname","pathname",-1420497528).cljs$core$IFn$_invoke$arity$1(win_loc);
}
})();
var vec__15645 = (function (){var temp__4655__auto__ = new cljs.core.Keyword(null,"chsk-url-fn","chsk-url-fn",1968894294).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(temp__4655__auto__)){
var f = temp__4655__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f.call(null,path__$1,win_loc,new cljs.core.Keyword(null,"ws","ws",86841443)),f.call(null,path__$1,win_loc,new cljs.core.Keyword(null,"ajax","ajax",814345549))], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [taoensso.sente.get_chsk_url.call(null,win_protocol,host__$1,path__$1,new cljs.core.Keyword(null,"ws","ws",86841443)),taoensso.sente.get_chsk_url.call(null,win_protocol,host__$1,path__$1,new cljs.core.Keyword(null,"ajax","ajax",814345549))], null);
}
})();
var ws_url = cljs.core.nth.call(null,vec__15645,(0),null);
var ajax_url = cljs.core.nth.call(null,vec__15645,(1),null);
var private_chs = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"internal","internal",-854870097),cljs.core.async.chan.call(null,cljs.core.async.sliding_buffer.call(null,(128))),new cljs.core.Keyword(null,"state","state",-1988618099),cljs.core.async.chan.call(null,cljs.core.async.sliding_buffer.call(null,(10))),new cljs.core.Keyword(null,"<server","<server",-2135373537),cljs.core.async.chan.call(null,cljs.core.async.sliding_buffer.call(null,(512)))], null);
var common_chsk_opts = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id,new cljs.core.Keyword(null,"chs","chs",376886120),private_chs,new cljs.core.Keyword(null,"params","params",710516235),params,new cljs.core.Keyword(null,"packer","packer",66077544),packer__$1], null);
var ws_chsk_opts = cljs.core.merge.call(null,common_chsk_opts,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"url","url",276297046),ws_url,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),backoff_ms_fn], null));
var ajax_chsk_opts = cljs.core.merge.call(null,common_chsk_opts,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"url","url",276297046),ajax_url,new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),ajax_opts,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),backoff_ms_fn], null));
var auto_chsk_opts = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),ws_chsk_opts,new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),ajax_chsk_opts], null);
var _QMARK_chsk = taoensso.sente._chsk_connect_BANG_.call(null,(function (){var G__15648 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__15648) {
case "ws":
return taoensso.sente.new_ChWebSocket.call(null,ws_chsk_opts);

break;
case "ajax":
return taoensso.sente.new_ChAjaxSocket.call(null,ajax_chsk_opts);

break;
case "auto":
return taoensso.sente.new_ChAutoSocket.call(null,auto_chsk_opts);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}
})());
var temp__4655__auto__ = _QMARK_chsk;
if(cljs.core.truth_(temp__4655__auto__)){
var chsk = temp__4655__auto__;
var send_fn = cljs.core.partial.call(null,taoensso.sente.chsk_send_BANG_,chsk);
var ev_ch = cljs.core.async.merge.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"internal","internal",-854870097).cljs$core$IFn$_invoke$arity$1(private_chs),new cljs.core.Keyword(null,"state","state",-1988618099).cljs$core$IFn$_invoke$arity$1(private_chs),(function (){var _LT_server_ch = new cljs.core.Keyword(null,"<server","<server",-2135373537).cljs$core$IFn$_invoke$arity$1(private_chs);
if(cljs.core.truth_(wrap_recv_evs_QMARK_)){
return cljs.core.async.map_LT_.call(null,((function (_LT_server_ch,send_fn,chsk,temp__4655__auto__,packer__$1,win_loc,win_protocol,host__$1,path__$1,vec__15645,ws_url,ajax_url,private_chs,common_chsk_opts,ws_chsk_opts,ajax_chsk_opts,auto_chsk_opts,_QMARK_chsk,vec__15638,map__15641,map__15641__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts){
return (function (ev){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","recv","chsk/recv",561097091),ev], null);
});})(_LT_server_ch,send_fn,chsk,temp__4655__auto__,packer__$1,win_loc,win_protocol,host__$1,path__$1,vec__15645,ws_url,ajax_url,private_chs,common_chsk_opts,ws_chsk_opts,ajax_chsk_opts,auto_chsk_opts,_QMARK_chsk,vec__15638,map__15641,map__15641__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts))
,_LT_server_ch);
} else {
return _LT_server_ch;
}
})()], null),recv_buf_or_n);
var ev_msg_ch = cljs.core.async.map_LT_.call(null,((function (send_fn,ev_ch,chsk,temp__4655__auto__,packer__$1,win_loc,win_protocol,host__$1,path__$1,vec__15645,ws_url,ajax_url,private_chs,common_chsk_opts,ws_chsk_opts,ajax_chsk_opts,auto_chsk_opts,_QMARK_chsk,vec__15638,map__15641,map__15641__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts){
return (function taoensso$sente$ev__GT_ev_msg(ev){
var vec__15652 = taoensso.sente.as_event.call(null,ev);
var ev_id = cljs.core.nth.call(null,vec__15652,(0),null);
var ev__QMARK_data = cljs.core.nth.call(null,vec__15652,(1),null);
var ev__$1 = vec__15652;
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861),ev_ch,new cljs.core.Keyword(null,"send-fn","send-fn",351002041),send_fn,new cljs.core.Keyword(null,"state","state",-1988618099),new cljs.core.Keyword(null,"state_","state_",957667102).cljs$core$IFn$_invoke$arity$1(chsk),new cljs.core.Keyword(null,"event","event",301435442),ev__$1,new cljs.core.Keyword(null,"id","id",-1388402092),ev_id,new cljs.core.Keyword(null,"?data","?data",-9471433),ev__QMARK_data], null);
});})(send_fn,ev_ch,chsk,temp__4655__auto__,packer__$1,win_loc,win_protocol,host__$1,path__$1,vec__15645,ws_url,ajax_url,private_chs,common_chsk_opts,ws_chsk_opts,ajax_chsk_opts,auto_chsk_opts,_QMARK_chsk,vec__15638,map__15641,map__15641__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts))
,ev_ch);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"chsk","chsk",-863703081),chsk,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861),ev_msg_ch,new cljs.core.Keyword(null,"send-fn","send-fn",351002041),send_fn,new cljs.core.Keyword(null,"state","state",-1988618099),new cljs.core.Keyword(null,"state_","state_",957667102).cljs$core$IFn$_invoke$arity$1(chsk)], null);
} else {
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init305516951502553584.clj",1407,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (temp__4655__auto__,packer__$1,win_loc,win_protocol,host__$1,path__$1,vec__15645,ws_url,ajax_url,private_chs,common_chsk_opts,ws_chsk_opts,ajax_chsk_opts,auto_chsk_opts,_QMARK_chsk,vec__15638,map__15641,map__15641__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed to create channel socket"], null);
});})(temp__4655__auto__,packer__$1,win_loc,win_protocol,host__$1,path__$1,vec__15645,ws_url,ajax_url,private_chs,common_chsk_opts,ws_chsk_opts,ajax_chsk_opts,auto_chsk_opts,_QMARK_chsk,vec__15638,map__15641,map__15641__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts))
,null)),null,589021544);
}
});

taoensso.sente.make_channel_socket_client_BANG_.cljs$lang$maxFixedArity = (1);

taoensso.sente.make_channel_socket_client_BANG_.cljs$lang$applyTo = (function (seq15635){
var G__15636 = cljs.core.first.call(null,seq15635);
var seq15635__$1 = cljs.core.next.call(null,seq15635);
return taoensso.sente.make_channel_socket_client_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__15636,seq15635__$1);
});

taoensso.sente._start_chsk_router_BANG_ = (function taoensso$sente$_start_chsk_router_BANG_(server_QMARK_,ch_recv,event_msg_handler,opts){
var map__15889 = opts;
var map__15889__$1 = ((((!((map__15889 == null)))?((((map__15889.cljs$lang$protocol_mask$partition0$ & (64))) || (map__15889.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15889):map__15889);
var trace_evs_QMARK_ = cljs.core.get.call(null,map__15889__$1,new cljs.core.Keyword(null,"trace-evs?","trace-evs?",1502453512));
var error_handler = cljs.core.get.call(null,map__15889__$1,new cljs.core.Keyword(null,"error-handler","error-handler",-484945776));
var ch_ctrl = cljs.core.async.chan.call(null);
var c__8341__auto___16117 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___16117,map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___16117,map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function (state_16032){
var state_val_16033 = (state_16032[(1)]);
if((state_val_16033 === (7))){
var inst_16028 = (state_16032[(2)]);
var state_16032__$1 = state_16032;
var statearr_16034_16118 = state_16032__$1;
(statearr_16034_16118[(2)] = inst_16028);

(statearr_16034_16118[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (20))){
var inst_15929 = (state_16032[(7)]);
var inst_15928 = (state_16032[(8)]);
var inst_15901 = (state_16032[(9)]);
var inst_15899 = (state_16032[(10)]);
var inst_15900 = (state_16032[(11)]);
var inst_15902 = (state_16032[(12)]);
var inst_15939 = (function (){var vec__15892 = inst_15899;
var v = inst_15900;
var p = inst_15901;
var stop_QMARK_ = inst_15902;
var map__15905 = inst_15928;
var event_msg = inst_15928;
var event = inst_15929;
return ((function (vec__15892,v,p,stop_QMARK_,map__15905,event_msg,event,inst_15929,inst_15928,inst_15901,inst_15899,inst_15900,inst_15902,state_val_16033,c__8341__auto___16117,map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Pre-handler event: %s",event], null);
});
;})(vec__15892,v,p,stop_QMARK_,map__15905,event_msg,event,inst_15929,inst_15928,inst_15901,inst_15899,inst_15900,inst_15902,state_val_16033,c__8341__auto___16117,map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
})();
var inst_15940 = (new cljs.core.Delay(inst_15939,null));
var inst_15941 = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init305516951502553584.clj",1424,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),inst_15940,null,-403250560);
var state_16032__$1 = state_16032;
var statearr_16035_16119 = state_16032__$1;
(statearr_16035_16119[(2)] = inst_15941);

(statearr_16035_16119[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (27))){
var inst_15946 = (state_16032[(2)]);
var state_16032__$1 = state_16032;
var statearr_16036_16120 = state_16032__$1;
(statearr_16036_16120[(2)] = inst_15946);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16032__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (1))){
var state_16032__$1 = state_16032;
var statearr_16037_16121 = state_16032__$1;
(statearr_16037_16121[(2)] = null);

(statearr_16037_16121[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (24))){
var state_16032__$1 = state_16032;
var statearr_16038_16122 = state_16032__$1;
(statearr_16038_16122[(2)] = null);

(statearr_16038_16122[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (55))){
var inst_16022 = (state_16032[(2)]);
var state_16032__$1 = state_16032;
var statearr_16039_16123 = state_16032__$1;
(statearr_16039_16123[(2)] = inst_16022);

(statearr_16039_16123[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (39))){
var state_16032__$1 = state_16032;
var statearr_16040_16124 = state_16032__$1;
(statearr_16040_16124[(2)] = taoensso.truss.impl._dummy_error);

(statearr_16040_16124[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (46))){
var inst_16025 = (state_16032[(2)]);
var state_16032__$1 = (function (){var statearr_16041 = state_16032;
(statearr_16041[(13)] = inst_16025);

return statearr_16041;
})();
var statearr_16042_16125 = state_16032__$1;
(statearr_16042_16125[(2)] = null);

(statearr_16042_16125[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (4))){
var inst_15901 = (state_16032[(9)]);
var inst_15899 = (state_16032[(10)]);
var inst_15902 = (state_16032[(12)]);
var inst_15899__$1 = (state_16032[(2)]);
var inst_15900 = cljs.core.nth.call(null,inst_15899__$1,(0),null);
var inst_15901__$1 = cljs.core.nth.call(null,inst_15899__$1,(1),null);
var inst_15902__$1 = cljs.core._EQ_.call(null,inst_15901__$1,ch_ctrl);
var state_16032__$1 = (function (){var statearr_16043 = state_16032;
(statearr_16043[(9)] = inst_15901__$1);

(statearr_16043[(10)] = inst_15899__$1);

(statearr_16043[(11)] = inst_15900);

(statearr_16043[(12)] = inst_15902__$1);

return statearr_16043;
})();
if(inst_15902__$1){
var statearr_16044_16126 = state_16032__$1;
(statearr_16044_16126[(1)] = (5));

} else {
var statearr_16045_16127 = state_16032__$1;
(statearr_16045_16127[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (54))){
var state_16032__$1 = state_16032;
var statearr_16046_16128 = state_16032__$1;
(statearr_16046_16128[(2)] = null);

(statearr_16046_16128[(1)] = (55));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (15))){
var inst_15900 = (state_16032[(11)]);
var state_16032__$1 = state_16032;
var statearr_16047_16129 = state_16032__$1;
(statearr_16047_16129[(2)] = inst_15900);

(statearr_16047_16129[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (48))){
var inst_15994 = (state_16032[(2)]);
var inst_15995 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_15996 = [null,inst_15994];
var inst_15997 = (new cljs.core.PersistentVector(null,2,(5),inst_15995,inst_15996,null));
var state_16032__$1 = state_16032;
var statearr_16048_16130 = state_16032__$1;
(statearr_16048_16130[(2)] = inst_15997);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16032__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (50))){
var inst_15989 = (state_16032[(14)]);
var inst_15928 = (state_16032[(8)]);
var inst_16003 = error_handler.call(null,inst_15989,inst_15928);
var state_16032__$1 = state_16032;
var statearr_16049_16131 = state_16032__$1;
(statearr_16049_16131[(2)] = inst_16003);

(statearr_16049_16131[(1)] = (52));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (21))){
var state_16032__$1 = state_16032;
var statearr_16050_16132 = state_16032__$1;
(statearr_16050_16132[(2)] = null);

(statearr_16050_16132[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (31))){
var inst_15954 = (state_16032[(2)]);
var state_16032__$1 = state_16032;
var statearr_16051_16133 = state_16032__$1;
(statearr_16051_16133[(2)] = inst_15954);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16032__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (32))){
var inst_15928 = (state_16032[(8)]);
var state_16032__$1 = state_16032;
var statearr_16052_16134 = state_16032__$1;
(statearr_16052_16134[(2)] = inst_15928);

(statearr_16052_16134[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (40))){
var inst_15972 = (state_16032[(2)]);
var state_16032__$1 = state_16032;
var statearr_16053_16135 = state_16032__$1;
(statearr_16053_16135[(2)] = inst_15972);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16032__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (33))){
var inst_15928 = (state_16032[(8)]);
var inst_15956 = (state_16032[(15)]);
var inst_15960 = taoensso.truss.impl._invar_violation_BANG_.call(null,null,"taoensso.sente",null,"(server-event-msg? event-msg)",inst_15928,inst_15956,null);
var state_16032__$1 = state_16032;
var statearr_16054_16136 = state_16032__$1;
(statearr_16054_16136[(2)] = inst_15960);

(statearr_16054_16136[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (13))){
var inst_15920 = (state_16032[(2)]);
var state_16032__$1 = state_16032;
var statearr_16055_16137 = state_16032__$1;
(statearr_16055_16137[(2)] = inst_15920);

(statearr_16055_16137[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (22))){
var inst_15944 = (state_16032[(2)]);
var state_16032__$1 = (function (){var statearr_16056 = state_16032;
(statearr_16056[(16)] = inst_15944);

return statearr_16056;
})();
if(cljs.core.truth_(server_QMARK_)){
var statearr_16057_16138 = state_16032__$1;
(statearr_16057_16138[(1)] = (23));

} else {
var statearr_16058_16139 = state_16032__$1;
(statearr_16058_16139[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (36))){
var inst_15964 = (state_16032[(2)]);
var state_16032__$1 = state_16032;
var statearr_16059_16140 = state_16032__$1;
(statearr_16059_16140[(2)] = inst_15964);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16032__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (41))){
var inst_15928 = (state_16032[(8)]);
var state_16032__$1 = state_16032;
var statearr_16060_16141 = state_16032__$1;
(statearr_16060_16141[(2)] = inst_15928);

(statearr_16060_16141[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (43))){
var inst_15980 = (state_16032[(2)]);
var state_16032__$1 = state_16032;
var statearr_16061_16142 = state_16032__$1;
(statearr_16061_16142[(2)] = inst_15980);

(statearr_16061_16142[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (29))){
var state_16032__$1 = state_16032;
var statearr_16062_16143 = state_16032__$1;
(statearr_16062_16143[(2)] = null);

(statearr_16062_16143[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (44))){
var state_16032__$1 = state_16032;
var statearr_16063_16144 = state_16032__$1;
(statearr_16063_16144[(2)] = null);

(statearr_16063_16144[(1)] = (49));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (6))){
var inst_15900 = (state_16032[(11)]);
var inst_15910 = (inst_15900 == null);
var inst_15911 = cljs.core.not.call(null,inst_15910);
var state_16032__$1 = state_16032;
if(inst_15911){
var statearr_16064_16145 = state_16032__$1;
(statearr_16064_16145[(1)] = (8));

} else {
var statearr_16065_16146 = state_16032__$1;
(statearr_16065_16146[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (28))){
var inst_15928 = (state_16032[(8)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_16032,(27),Error,null,(26));
var inst_15950 = taoensso.sente.server_event_msg_QMARK_.call(null,inst_15928);
var state_16032__$1 = state_16032;
if(cljs.core.truth_(inst_15950)){
var statearr_16066_16147 = state_16032__$1;
(statearr_16066_16147[(1)] = (29));

} else {
var statearr_16067_16148 = state_16032__$1;
(statearr_16067_16148[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (51))){
var inst_15989 = (state_16032[(14)]);
var inst_15929 = (state_16032[(7)]);
var inst_15928 = (state_16032[(8)]);
var inst_15987 = (state_16032[(17)]);
var inst_15988 = (state_16032[(18)]);
var inst_15901 = (state_16032[(9)]);
var inst_15899 = (state_16032[(10)]);
var inst_15900 = (state_16032[(11)]);
var inst_15902 = (state_16032[(12)]);
var inst_16005 = (function (){var p = inst_15901;
var _QMARK_error = inst_15989;
var v = inst_15900;
var temp__4655__auto__ = error_handler;
var _ = inst_15988;
var vec__15892 = inst_15899;
var event_msg = inst_15928;
var vec__15906 = inst_15987;
var e = inst_15989;
var temp__4657__auto__ = inst_15989;
var event = inst_15929;
var map__15905 = inst_15928;
var stop_QMARK_ = inst_15902;
return ((function (p,_QMARK_error,v,temp__4655__auto__,_,vec__15892,event_msg,vec__15906,e,temp__4657__auto__,event,map__15905,stop_QMARK_,inst_15989,inst_15929,inst_15928,inst_15987,inst_15988,inst_15901,inst_15899,inst_15900,inst_15902,state_val_16033,c__8341__auto___16117,map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"Chsk router `event-msg-handler` error: %s",event], null);
});
;})(p,_QMARK_error,v,temp__4655__auto__,_,vec__15892,event_msg,vec__15906,e,temp__4657__auto__,event,map__15905,stop_QMARK_,inst_15989,inst_15929,inst_15928,inst_15987,inst_15988,inst_15901,inst_15899,inst_15900,inst_15902,state_val_16033,c__8341__auto___16117,map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
})();
var inst_16006 = (new cljs.core.Delay(inst_16005,null));
var inst_16007 = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init305516951502553584.clj",1435,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),inst_16006,null,496319052);
var state_16032__$1 = state_16032;
var statearr_16068_16149 = state_16032__$1;
(statearr_16068_16149[(2)] = inst_16007);

(statearr_16068_16149[(1)] = (52));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (25))){
var inst_15937 = (state_16032[(19)]);
var inst_15982 = (state_16032[(2)]);
var inst_15983 = event_msg_handler.call(null,inst_15982);
var inst_15984 = [inst_15983,null];
var inst_15985 = (new cljs.core.PersistentVector(null,2,(5),inst_15937,inst_15984,null));
var state_16032__$1 = state_16032;
var statearr_16069_16150 = state_16032__$1;
(statearr_16069_16150[(2)] = inst_15985);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16032__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (34))){
var inst_15962 = (state_16032[(2)]);
var state_16032__$1 = state_16032;
var statearr_16070_16151 = state_16032__$1;
(statearr_16070_16151[(2)] = inst_15962);

(statearr_16070_16151[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (17))){
var inst_15989 = (state_16032[(14)]);
var inst_15987 = (state_16032[(17)]);
var inst_15987__$1 = (state_16032[(2)]);
var inst_15988 = cljs.core.nth.call(null,inst_15987__$1,(0),null);
var inst_15989__$1 = cljs.core.nth.call(null,inst_15987__$1,(1),null);
var state_16032__$1 = (function (){var statearr_16071 = state_16032;
(statearr_16071[(14)] = inst_15989__$1);

(statearr_16071[(17)] = inst_15987__$1);

(statearr_16071[(18)] = inst_15988);

return statearr_16071;
})();
if(cljs.core.truth_(inst_15989__$1)){
var statearr_16072_16152 = state_16032__$1;
(statearr_16072_16152[(1)] = (44));

} else {
var statearr_16073_16153 = state_16032__$1;
(statearr_16073_16153[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (3))){
var inst_16030 = (state_16032[(2)]);
var state_16032__$1 = state_16032;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16032__$1,inst_16030);
} else {
if((state_val_16033 === (12))){
var state_16032__$1 = state_16032;
var statearr_16074_16154 = state_16032__$1;
(statearr_16074_16154[(2)] = false);

(statearr_16074_16154[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (2))){
var inst_15895 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_15896 = [ch_recv,ch_ctrl];
var inst_15897 = (new cljs.core.PersistentVector(null,2,(5),inst_15895,inst_15896,null));
var state_16032__$1 = state_16032;
return cljs.core.async.ioc_alts_BANG_.call(null,state_16032__$1,(4),inst_15897);
} else {
if((state_val_16033 === (23))){
var state_16032__$1 = state_16032;
var statearr_16075_16155 = state_16032__$1;
(statearr_16075_16155[(2)] = null);

(statearr_16075_16155[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (47))){
var inst_16013 = (state_16032[(20)]);
var inst_16015 = (state_16032[(21)]);
var inst_16013__$1 = (state_16032[(2)]);
var inst_16014 = cljs.core.nth.call(null,inst_16013__$1,(0),null);
var inst_16015__$1 = cljs.core.nth.call(null,inst_16013__$1,(1),null);
var state_16032__$1 = (function (){var statearr_16076 = state_16032;
(statearr_16076[(20)] = inst_16013__$1);

(statearr_16076[(22)] = inst_16014);

(statearr_16076[(21)] = inst_16015__$1);

return statearr_16076;
})();
if(cljs.core.truth_(inst_16015__$1)){
var statearr_16077_16156 = state_16032__$1;
(statearr_16077_16156[(1)] = (53));

} else {
var statearr_16078_16157 = state_16032__$1;
(statearr_16078_16157[(1)] = (54));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (35))){
var inst_15974 = (state_16032[(23)]);
var inst_15974__$1 = (state_16032[(2)]);
var inst_15975 = (inst_15974__$1 == null);
var state_16032__$1 = (function (){var statearr_16079 = state_16032;
(statearr_16079[(23)] = inst_15974__$1);

return statearr_16079;
})();
if(cljs.core.truth_(inst_15975)){
var statearr_16080_16158 = state_16032__$1;
(statearr_16080_16158[(1)] = (41));

} else {
var statearr_16081_16159 = state_16032__$1;
(statearr_16081_16159[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (19))){
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_16032,(18),Error,null,(17));
var inst_15937 = cljs.core.PersistentVector.EMPTY_NODE;
var state_16032__$1 = (function (){var statearr_16082 = state_16032;
(statearr_16082[(19)] = inst_15937);

return statearr_16082;
})();
if(cljs.core.truth_(trace_evs_QMARK_)){
var statearr_16083_16160 = state_16032__$1;
(statearr_16083_16160[(1)] = (20));

} else {
var statearr_16084_16161 = state_16032__$1;
(statearr_16084_16161[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (11))){
var state_16032__$1 = state_16032;
var statearr_16085_16162 = state_16032__$1;
(statearr_16085_16162[(2)] = true);

(statearr_16085_16162[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (9))){
var state_16032__$1 = state_16032;
var statearr_16086_16163 = state_16032__$1;
(statearr_16086_16163[(2)] = false);

(statearr_16086_16163[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (5))){
var state_16032__$1 = state_16032;
var statearr_16087_16164 = state_16032__$1;
(statearr_16087_16164[(2)] = null);

(statearr_16087_16164[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (14))){
var inst_15900 = (state_16032[(11)]);
var inst_15925 = cljs.core.apply.call(null,cljs.core.hash_map,inst_15900);
var state_16032__$1 = state_16032;
var statearr_16088_16165 = state_16032__$1;
(statearr_16088_16165[(2)] = inst_15925);

(statearr_16088_16165[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (45))){
var state_16032__$1 = state_16032;
var statearr_16089_16166 = state_16032__$1;
(statearr_16089_16166[(2)] = null);

(statearr_16089_16166[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (53))){
var inst_15989 = (state_16032[(14)]);
var inst_15929 = (state_16032[(7)]);
var inst_15928 = (state_16032[(8)]);
var inst_15987 = (state_16032[(17)]);
var inst_15901 = (state_16032[(9)]);
var inst_16013 = (state_16032[(20)]);
var inst_15899 = (state_16032[(10)]);
var inst_15900 = (state_16032[(11)]);
var inst_16014 = (state_16032[(22)]);
var inst_15902 = (state_16032[(12)]);
var inst_16015 = (state_16032[(21)]);
var inst_16017 = (function (){var p = inst_15901;
var _QMARK_error = inst_15989;
var vec__15991 = inst_16013;
var v = inst_15900;
var _ = inst_16014;
var e2 = inst_16015;
var vec__15892 = inst_15899;
var _QMARK_error2 = inst_16015;
var event_msg = inst_15928;
var vec__15906 = inst_15987;
var e = inst_15989;
var temp__4657__auto__ = inst_16015;
var event = inst_15929;
var map__15905 = inst_15928;
var stop_QMARK_ = inst_15902;
return ((function (p,_QMARK_error,vec__15991,v,_,e2,vec__15892,_QMARK_error2,event_msg,vec__15906,e,temp__4657__auto__,event,map__15905,stop_QMARK_,inst_15989,inst_15929,inst_15928,inst_15987,inst_15901,inst_16013,inst_15899,inst_15900,inst_16014,inst_15902,inst_16015,state_val_16033,c__8341__auto___16117,map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e2,"Chsk router `error-handler` error: %s",event], null);
});
;})(p,_QMARK_error,vec__15991,v,_,e2,vec__15892,_QMARK_error2,event_msg,vec__15906,e,temp__4657__auto__,event,map__15905,stop_QMARK_,inst_15989,inst_15929,inst_15928,inst_15987,inst_15901,inst_16013,inst_15899,inst_15900,inst_16014,inst_15902,inst_16015,state_val_16033,c__8341__auto___16117,map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
})();
var inst_16018 = (new cljs.core.Delay(inst_16017,null));
var inst_16019 = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init305516951502553584.clj",1437,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),inst_16018,null,1806118912);
var state_16032__$1 = state_16032;
var statearr_16090_16167 = state_16032__$1;
(statearr_16090_16167[(2)] = inst_16019);

(statearr_16090_16167[(1)] = (55));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (26))){
var inst_15956 = (state_16032[(15)]);
var inst_15956__$1 = (state_16032[(2)]);
var inst_15957 = (inst_15956__$1 == null);
var state_16032__$1 = (function (){var statearr_16091 = state_16032;
(statearr_16091[(15)] = inst_15956__$1);

return statearr_16091;
})();
if(cljs.core.truth_(inst_15957)){
var statearr_16092_16168 = state_16032__$1;
(statearr_16092_16168[(1)] = (32));

} else {
var statearr_16093_16169 = state_16032__$1;
(statearr_16093_16169[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (16))){
var inst_15928 = (state_16032[(8)]);
var inst_15928__$1 = (state_16032[(2)]);
var inst_15929 = cljs.core.get.call(null,inst_15928__$1,new cljs.core.Keyword(null,"event","event",301435442));
var state_16032__$1 = (function (){var statearr_16094 = state_16032;
(statearr_16094[(7)] = inst_15929);

(statearr_16094[(8)] = inst_15928__$1);

return statearr_16094;
})();
var statearr_16095_16170 = state_16032__$1;
(statearr_16095_16170[(2)] = null);

(statearr_16095_16170[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (38))){
var state_16032__$1 = state_16032;
var statearr_16096_16171 = state_16032__$1;
(statearr_16096_16171[(2)] = null);

(statearr_16096_16171[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (30))){
var state_16032__$1 = state_16032;
var statearr_16097_16172 = state_16032__$1;
(statearr_16097_16172[(2)] = taoensso.truss.impl._dummy_error);

(statearr_16097_16172[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (10))){
var inst_15923 = (state_16032[(2)]);
var state_16032__$1 = state_16032;
if(cljs.core.truth_(inst_15923)){
var statearr_16098_16173 = state_16032__$1;
(statearr_16098_16173[(1)] = (14));

} else {
var statearr_16099_16174 = state_16032__$1;
(statearr_16099_16174[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (18))){
var inst_15930 = (state_16032[(2)]);
var inst_15931 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_15932 = [null,inst_15930];
var inst_15933 = (new cljs.core.PersistentVector(null,2,(5),inst_15931,inst_15932,null));
var state_16032__$1 = state_16032;
var statearr_16100_16175 = state_16032__$1;
(statearr_16100_16175[(2)] = inst_15933);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16032__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (52))){
var inst_16001 = (state_16032[(24)]);
var inst_16009 = (state_16032[(2)]);
var inst_16010 = [inst_16009,null];
var inst_16011 = (new cljs.core.PersistentVector(null,2,(5),inst_16001,inst_16010,null));
var state_16032__$1 = state_16032;
var statearr_16101_16176 = state_16032__$1;
(statearr_16101_16176[(2)] = inst_16011);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16032__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (42))){
var inst_15928 = (state_16032[(8)]);
var inst_15974 = (state_16032[(23)]);
var inst_15978 = taoensso.truss.impl._invar_violation_BANG_.call(null,null,"taoensso.sente",null,"(client-event-msg? event-msg)",inst_15928,inst_15974,null);
var state_16032__$1 = state_16032;
var statearr_16102_16177 = state_16032__$1;
(statearr_16102_16177[(2)] = inst_15978);

(statearr_16102_16177[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (37))){
var inst_15928 = (state_16032[(8)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_16032,(36),Error,null,(35));
var inst_15968 = taoensso.sente.client_event_msg_QMARK_.call(null,inst_15928);
var state_16032__$1 = state_16032;
if(cljs.core.truth_(inst_15968)){
var statearr_16103_16178 = state_16032__$1;
(statearr_16103_16178[(1)] = (38));

} else {
var statearr_16104_16179 = state_16032__$1;
(statearr_16104_16179[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (8))){
var inst_15900 = (state_16032[(11)]);
var inst_15913 = inst_15900.cljs$lang$protocol_mask$partition0$;
var inst_15914 = (inst_15913 & (64));
var inst_15915 = inst_15900.cljs$core$ISeq$;
var inst_15916 = (inst_15914) || (inst_15915);
var state_16032__$1 = state_16032;
if(cljs.core.truth_(inst_15916)){
var statearr_16105_16180 = state_16032__$1;
(statearr_16105_16180[(1)] = (11));

} else {
var statearr_16106_16181 = state_16032__$1;
(statearr_16106_16181[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16033 === (49))){
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_16032,(48),Error,null,(47));
var inst_16001 = cljs.core.PersistentVector.EMPTY_NODE;
var state_16032__$1 = (function (){var statearr_16107 = state_16032;
(statearr_16107[(24)] = inst_16001);

return statearr_16107;
})();
if(cljs.core.truth_(error_handler)){
var statearr_16108_16182 = state_16032__$1;
(statearr_16108_16182[(1)] = (50));

} else {
var statearr_16109_16183 = state_16032__$1;
(statearr_16109_16183[(1)] = (51));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__8341__auto___16117,map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
;
return ((function (switch__8229__auto__,c__8341__auto___16117,map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function() {
var taoensso$sente$_start_chsk_router_BANG__$_state_machine__8230__auto__ = null;
var taoensso$sente$_start_chsk_router_BANG__$_state_machine__8230__auto____0 = (function (){
var statearr_16113 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16113[(0)] = taoensso$sente$_start_chsk_router_BANG__$_state_machine__8230__auto__);

(statearr_16113[(1)] = (1));

return statearr_16113;
});
var taoensso$sente$_start_chsk_router_BANG__$_state_machine__8230__auto____1 = (function (state_16032){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_16032);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e16114){if((e16114 instanceof Object)){
var ex__8233__auto__ = e16114;
var statearr_16115_16184 = state_16032;
(statearr_16115_16184[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16032);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16114;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16185 = state_16032;
state_16032 = G__16185;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
taoensso$sente$_start_chsk_router_BANG__$_state_machine__8230__auto__ = function(state_16032){
switch(arguments.length){
case 0:
return taoensso$sente$_start_chsk_router_BANG__$_state_machine__8230__auto____0.call(this);
case 1:
return taoensso$sente$_start_chsk_router_BANG__$_state_machine__8230__auto____1.call(this,state_16032);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$_start_chsk_router_BANG__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$_start_chsk_router_BANG__$_state_machine__8230__auto____0;
taoensso$sente$_start_chsk_router_BANG__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$_start_chsk_router_BANG__$_state_machine__8230__auto____1;
return taoensso$sente$_start_chsk_router_BANG__$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___16117,map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
})();
var state__8343__auto__ = (function (){var statearr_16116 = f__8342__auto__.call(null);
(statearr_16116[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___16117);

return statearr_16116;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___16117,map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
);


return ((function (map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function taoensso$sente$_start_chsk_router_BANG__$_stop_BANG_(){
return cljs.core.async.close_BANG_.call(null,ch_ctrl);
});
;})(map__15889,map__15889__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
});
/**
 * Creates a go-loop to call `(event-msg-handler <server-event-msg>)` and
 *   log any errors. Returns a `(fn stop! [])`.
 * 
 *   For performance, you'll likely want your `event-msg-handler` fn to be
 *   non-blocking (at least for slow handling operations). Clojure offers
 *   a rich variety of tools here including futures, agents, core.async,
 *   etc.
 * 
 *   Advanced users may also prefer to write their own loop against `ch-recv`.
 */
taoensso.sente.start_server_chsk_router_BANG_ = (function taoensso$sente$start_server_chsk_router_BANG_(var_args){
var args__27351__auto__ = [];
var len__27348__auto___16195 = arguments.length;
var i__27349__auto___16196 = (0);
while(true){
if((i__27349__auto___16196 < len__27348__auto___16195)){
args__27351__auto__.push((arguments[i__27349__auto___16196]));

var G__16197 = (i__27349__auto___16196 + (1));
i__27349__auto___16196 = G__16197;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((2) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((2)),(0),null)):null);
return taoensso.sente.start_server_chsk_router_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27352__auto__);
});

taoensso.sente.start_server_chsk_router_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ch_recv,event_msg_handler,p__16189){
var vec__16190 = p__16189;
var map__16193 = cljs.core.nth.call(null,vec__16190,(0),null);
var map__16193__$1 = ((((!((map__16193 == null)))?((((map__16193.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16193.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16193):map__16193);
var opts = map__16193__$1;
var trace_evs_QMARK_ = cljs.core.get.call(null,map__16193__$1,new cljs.core.Keyword(null,"trace-evs?","trace-evs?",1502453512));
var error_handler = cljs.core.get.call(null,map__16193__$1,new cljs.core.Keyword(null,"error-handler","error-handler",-484945776));
return taoensso.sente._start_chsk_router_BANG_.call(null,new cljs.core.Keyword(null,"server","server",1499190120),ch_recv,event_msg_handler,opts);
});

taoensso.sente.start_server_chsk_router_BANG_.cljs$lang$maxFixedArity = (2);

taoensso.sente.start_server_chsk_router_BANG_.cljs$lang$applyTo = (function (seq16186){
var G__16187 = cljs.core.first.call(null,seq16186);
var seq16186__$1 = cljs.core.next.call(null,seq16186);
var G__16188 = cljs.core.first.call(null,seq16186__$1);
var seq16186__$2 = cljs.core.next.call(null,seq16186__$1);
return taoensso.sente.start_server_chsk_router_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__16187,G__16188,seq16186__$2);
});

/**
 * Creates a go-loop to call `(event-msg-handler <client-event-msg>)` and
 *   log any errors. Returns a `(fn stop! [])`.
 * 
 *   For performance, you'll likely want your `event-msg-handler` fn to be
 *   non-blocking (at least for slow handling operations). Clojure offers
 *   a rich variety of tools here including futures, agents, core.async,
 *   etc.
 * 
 *   Advanced users may also prefer to write their own loop against `ch-recv`.
 */
taoensso.sente.start_client_chsk_router_BANG_ = (function taoensso$sente$start_client_chsk_router_BANG_(var_args){
var args__27351__auto__ = [];
var len__27348__auto___16207 = arguments.length;
var i__27349__auto___16208 = (0);
while(true){
if((i__27349__auto___16208 < len__27348__auto___16207)){
args__27351__auto__.push((arguments[i__27349__auto___16208]));

var G__16209 = (i__27349__auto___16208 + (1));
i__27349__auto___16208 = G__16209;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((2) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((2)),(0),null)):null);
return taoensso.sente.start_client_chsk_router_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27352__auto__);
});

taoensso.sente.start_client_chsk_router_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ch_recv,event_msg_handler,p__16201){
var vec__16202 = p__16201;
var map__16205 = cljs.core.nth.call(null,vec__16202,(0),null);
var map__16205__$1 = ((((!((map__16205 == null)))?((((map__16205.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16205.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16205):map__16205);
var opts = map__16205__$1;
var trace_evs_QMARK_ = cljs.core.get.call(null,map__16205__$1,new cljs.core.Keyword(null,"trace-evs?","trace-evs?",1502453512));
var error_handler = cljs.core.get.call(null,map__16205__$1,new cljs.core.Keyword(null,"error-handler","error-handler",-484945776));
return taoensso.sente._start_chsk_router_BANG_.call(null,cljs.core.not.call(null,new cljs.core.Keyword(null,"server","server",1499190120)),ch_recv,event_msg_handler,opts);
});

taoensso.sente.start_client_chsk_router_BANG_.cljs$lang$maxFixedArity = (2);

taoensso.sente.start_client_chsk_router_BANG_.cljs$lang$applyTo = (function (seq16198){
var G__16199 = cljs.core.first.call(null,seq16198);
var seq16198__$1 = cljs.core.next.call(null,seq16198);
var G__16200 = cljs.core.first.call(null,seq16198__$1);
var seq16198__$2 = cljs.core.next.call(null,seq16198__$1);
return taoensso.sente.start_client_chsk_router_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__16199,G__16200,seq16198__$2);
});

taoensso.sente.event_msg_QMARK_ = taoensso.sente.client_event_msg_QMARK_;
taoensso.sente.make_channel_socket_BANG_ = taoensso.sente.make_channel_socket_client_BANG_;
taoensso.sente.start_chsk_router_BANG_ = taoensso.sente.start_client_chsk_router_BANG_;
/**
 * DEPRECATED: Please use `start-chsk-router!` instead
 */
taoensso.sente.start_chsk_router_loop_BANG_ = (function taoensso$sente$start_chsk_router_loop_BANG_(event_handler,ch_recv){
return taoensso.sente.start_client_chsk_router_BANG_.call(null,ch_recv,(function (ev_msg){
return event_handler.call(null,new cljs.core.Keyword(null,"event","event",301435442).cljs$core$IFn$_invoke$arity$1(ev_msg),new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861).cljs$core$IFn$_invoke$arity$1(ev_msg));
}));
});
/**
 * DEPRECATED. Please use `timbre/set-level!` instead
 */
taoensso.sente.set_logging_level_BANG_ = taoensso.timbre.set_level_BANG_;
/**
 * DEPRECATED: Please use `ajax-lite` instead
 */
taoensso.sente.ajax_call = taoensso.encore.ajax_lite;
/**
 * DEPRECATED
 */
taoensso.sente.default_chsk_url_fn = (function taoensso$sente$default_chsk_url_fn(path,p__16210,websocket_QMARK_){
var map__16213 = p__16210;
var map__16213__$1 = ((((!((map__16213 == null)))?((((map__16213.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16213.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16213):map__16213);
var location = map__16213__$1;
var protocol = cljs.core.get.call(null,map__16213__$1,new cljs.core.Keyword(null,"protocol","protocol",652470118));
var host = cljs.core.get.call(null,map__16213__$1,new cljs.core.Keyword(null,"host","host",-1558485167));
var pathname = cljs.core.get.call(null,map__16213__$1,new cljs.core.Keyword(null,"pathname","pathname",-1420497528));
var protocol__$1 = (cljs.core.truth_(websocket_QMARK_)?((cljs.core._EQ_.call(null,protocol,"https:"))?"wss:":"ws:"):protocol);
return [cljs.core.str(protocol__$1),cljs.core.str("//"),cljs.core.str(host),cljs.core.str((function (){var or__26817__auto__ = path;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return pathname;
}
})())].join('');
});

//# sourceMappingURL=sente.js.map?rel=1468744503338