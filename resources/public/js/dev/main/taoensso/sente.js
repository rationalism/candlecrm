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
var vec__25282 = x;
var ev_id = cljs.core.nth.call(null,vec__25282,(0),null);
var _ = cljs.core.nth.call(null,vec__25282,(1),null);
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
var err_msg = [cljs.core.str((function (){var G__25286 = (((_QMARK_err instanceof cljs.core.Keyword))?_QMARK_err.fqn:null);
switch (G__25286) {
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
var and__6235__auto__ = cljs.core.map_QMARK_.call(null,x);
if(and__6235__auto__){
var and__6235__auto____$1 = taoensso.encore.keys_EQ_.call(null,x,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861),null,new cljs.core.Keyword(null,"state","state",-1988618099),null,new cljs.core.Keyword(null,"event","event",301435442),null,new cljs.core.Keyword(null,"id","id",-1388402092),null,new cljs.core.Keyword(null,"?data","?data",-9471433),null,new cljs.core.Keyword(null,"send-fn","send-fn",351002041),null], null), null));
if(cljs.core.truth_(and__6235__auto____$1)){
var map__25290 = x;
var map__25290__$1 = ((((!((map__25290 == null)))?((((map__25290.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25290.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25290):map__25290);
var ch_recv = cljs.core.get.call(null,map__25290__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));
var send_fn = cljs.core.get.call(null,map__25290__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));
var state = cljs.core.get.call(null,map__25290__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
var event = cljs.core.get.call(null,map__25290__$1,new cljs.core.Keyword(null,"event","event",301435442));
var and__6235__auto____$2 = taoensso.encore.chan_QMARK_.call(null,ch_recv);
if(and__6235__auto____$2){
var and__6235__auto____$3 = cljs.core.ifn_QMARK_.call(null,send_fn);
if(and__6235__auto____$3){
var and__6235__auto____$4 = taoensso.encore.atom_QMARK_.call(null,state);
if(and__6235__auto____$4){
return taoensso.sente.event_QMARK_.call(null,event);
} else {
return and__6235__auto____$4;
}
} else {
return and__6235__auto____$3;
}
} else {
return and__6235__auto____$2;
}
} else {
return and__6235__auto____$1;
}
} else {
return and__6235__auto__;
}
});
taoensso.sente.server_event_msg_QMARK_ = (function taoensso$sente$server_event_msg_QMARK_(x){
var and__6235__auto__ = cljs.core.map_QMARK_.call(null,x);
if(and__6235__auto__){
var and__6235__auto____$1 = taoensso.encore.keys_EQ_.call(null,x,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 10, [new cljs.core.Keyword(null,"?reply-fn","?reply-fn",-1479510592),null,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861),null,new cljs.core.Keyword(null,"client-id","client-id",-464622140),null,new cljs.core.Keyword(null,"connected-uids","connected-uids",1454332231),null,new cljs.core.Keyword(null,"uid","uid",-1447769400),null,new cljs.core.Keyword(null,"event","event",301435442),null,new cljs.core.Keyword(null,"id","id",-1388402092),null,new cljs.core.Keyword(null,"ring-req","ring-req",-747861961),null,new cljs.core.Keyword(null,"?data","?data",-9471433),null,new cljs.core.Keyword(null,"send-fn","send-fn",351002041),null], null), null));
if(cljs.core.truth_(and__6235__auto____$1)){
var map__25294 = x;
var map__25294__$1 = ((((!((map__25294 == null)))?((((map__25294.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25294.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25294):map__25294);
var ch_recv = cljs.core.get.call(null,map__25294__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));
var send_fn = cljs.core.get.call(null,map__25294__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));
var connected_uids = cljs.core.get.call(null,map__25294__$1,new cljs.core.Keyword(null,"connected-uids","connected-uids",1454332231));
var ring_req = cljs.core.get.call(null,map__25294__$1,new cljs.core.Keyword(null,"ring-req","ring-req",-747861961));
var client_id = cljs.core.get.call(null,map__25294__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
var event = cljs.core.get.call(null,map__25294__$1,new cljs.core.Keyword(null,"event","event",301435442));
var _QMARK_reply_fn = cljs.core.get.call(null,map__25294__$1,new cljs.core.Keyword(null,"?reply-fn","?reply-fn",-1479510592));
var and__6235__auto____$2 = taoensso.encore.chan_QMARK_.call(null,ch_recv);
if(and__6235__auto____$2){
var and__6235__auto____$3 = cljs.core.ifn_QMARK_.call(null,send_fn);
if(and__6235__auto____$3){
var and__6235__auto____$4 = taoensso.encore.atom_QMARK_.call(null,connected_uids);
if(and__6235__auto____$4){
var and__6235__auto____$5 = cljs.core.map_QMARK_.call(null,ring_req);
if(and__6235__auto____$5){
var and__6235__auto____$6 = taoensso.encore.nblank_str_QMARK_.call(null,client_id);
if(and__6235__auto____$6){
var and__6235__auto____$7 = taoensso.sente.event_QMARK_.call(null,event);
if(cljs.core.truth_(and__6235__auto____$7)){
return ((_QMARK_reply_fn == null)) || (cljs.core.ifn_QMARK_.call(null,_QMARK_reply_fn));
} else {
return and__6235__auto____$7;
}
} else {
return and__6235__auto____$6;
}
} else {
return and__6235__auto____$5;
}
} else {
return and__6235__auto____$4;
}
} else {
return and__6235__auto____$3;
}
} else {
return and__6235__auto____$2;
}
} else {
return and__6235__auto____$1;
}
} else {
return and__6235__auto__;
}
});
/**
 * All server `event-msg`s go through this
 */
taoensso.sente.put_server_event_msg_GT_ch_recv_BANG_ = (function taoensso$sente$put_server_event_msg_GT_ch_recv_BANG_(ch_recv,p__25296){
var map__25302 = p__25296;
var map__25302__$1 = ((((!((map__25302 == null)))?((((map__25302.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25302.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25302):map__25302);
var ev_msg = map__25302__$1;
var event = cljs.core.get.call(null,map__25302__$1,new cljs.core.Keyword(null,"event","event",301435442));
var _QMARK_reply_fn = cljs.core.get.call(null,map__25302__$1,new cljs.core.Keyword(null,"?reply-fn","?reply-fn",-1479510592));
var vec__25304 = taoensso.sente.as_event.call(null,event);
var ev_id = cljs.core.nth.call(null,vec__25304,(0),null);
var ev__QMARK_data = cljs.core.nth.call(null,vec__25304,(1),null);
var valid_event = vec__25304;
var ev_msg_STAR_ = cljs.core.merge.call(null,ev_msg,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"event","event",301435442),valid_event,new cljs.core.Keyword(null,"?reply-fn","?reply-fn",-1479510592),_QMARK_reply_fn,new cljs.core.Keyword(null,"id","id",-1388402092),ev_id,new cljs.core.Keyword(null,"?data","?data",-9471433),ev__QMARK_data], null));
if(cljs.core.not.call(null,taoensso.sente.server_event_msg_QMARK_.call(null,ev_msg_STAR_))){
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init1980037513903630905.clj",160,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__25304,ev_id,ev__QMARK_data,valid_event,ev_msg_STAR_,map__25302,map__25302__$1,ev_msg,event,_QMARK_reply_fn){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Bad ev-msg: %s",ev_msg], null);
});})(vec__25304,ev_id,ev__QMARK_data,valid_event,ev_msg_STAR_,map__25302,map__25302__$1,ev_msg,event,_QMARK_reply_fn))
,null)),null,-478836122);
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
var e_25317 = (function (){try{if(typeof prefixed_pstr === 'string'){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e25312){if((e25312 instanceof Error)){
var e = e25312;
return e;
} else {
throw e25312;

}
}})();
if((e_25317 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(string? prefixed-pstr)",prefixed_pstr,e_25317,null);
}

var wrapped_QMARK_ = taoensso.encore.str_starts_with_QMARK_.call(null,prefixed_pstr,"+");
var pstr = cljs.core.subs.call(null,prefixed_pstr,(1));
var clj = (function (){try{return taoensso.sente.interfaces.unpack.call(null,packer,pstr);
}catch (e25316){var t = e25316;
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"taoensso.sente","/tmp/form-init1980037513903630905.clj",181,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (t,wrapped_QMARK_,pstr){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Bad package: %s (%s)",pstr,t], null);
});})(t,wrapped_QMARK_,pstr))
,null)),null,2009974716);

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","bad-package","chsk/bad-package",501893679),pstr], null);
}})();
var vec__25313 = (cljs.core.truth_(wrapped_QMARK_)?clj:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj,null], null));
var clj__$1 = cljs.core.nth.call(null,vec__25313,(0),null);
var _QMARK_cb_uuid = cljs.core.nth.call(null,vec__25313,(1),null);
var _QMARK_cb_uuid__$1 = ((cljs.core._EQ_.call(null,(0),_QMARK_cb_uuid))?new cljs.core.Keyword(null,"ajax-cb","ajax-cb",-807060321):_QMARK_cb_uuid);
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",187,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (wrapped_QMARK_,pstr,clj,vec__25313,clj__$1,_QMARK_cb_uuid,_QMARK_cb_uuid__$1){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Unpacking: %s -> %s",prefixed_pstr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj__$1,_QMARK_cb_uuid__$1], null)], null);
});})(wrapped_QMARK_,pstr,clj,vec__25313,clj__$1,_QMARK_cb_uuid,_QMARK_cb_uuid__$1))
,null)),null,-97520130);

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
var args25318 = [];
var len__7322__auto___25321 = arguments.length;
var i__7323__auto___25322 = (0);
while(true){
if((i__7323__auto___25322 < len__7322__auto___25321)){
args25318.push((arguments[i__7323__auto___25322]));

var G__25323 = (i__7323__auto___25322 + (1));
i__7323__auto___25322 = G__25323;
continue;
} else {
}
break;
}

var G__25320 = args25318.length;
switch (G__25320) {
case 3:
return taoensso.sente.pack.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return taoensso.sente.pack.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25318.length)].join('')));

}
});

taoensso.sente.pack.cljs$core$IFn$_invoke$arity$3 = (function (packer,_QMARK_packer_meta,clj){
var pstr = [cljs.core.str("-"),cljs.core.str(taoensso.sente.interfaces.pack.call(null,packer,taoensso.sente.with__QMARK_meta.call(null,clj,_QMARK_packer_meta)))].join('');
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",197,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (pstr){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Packing (unwrapped): %s -> %s",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [_QMARK_packer_meta,clj], null),pstr], null);
});})(pstr))
,null)),null,-9564886);

return pstr;
});

taoensso.sente.pack.cljs$core$IFn$_invoke$arity$4 = (function (packer,_QMARK_packer_meta,clj,_QMARK_cb_uuid){
var _QMARK_cb_uuid__$1 = ((cljs.core._EQ_.call(null,_QMARK_cb_uuid,new cljs.core.Keyword(null,"ajax-cb","ajax-cb",-807060321)))?(0):_QMARK_cb_uuid);
var wrapped_clj = (cljs.core.truth_(_QMARK_cb_uuid__$1)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj,_QMARK_cb_uuid__$1], null):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj], null));
var pstr = [cljs.core.str("+"),cljs.core.str(taoensso.sente.interfaces.pack.call(null,packer,taoensso.sente.with__QMARK_meta.call(null,wrapped_clj,_QMARK_packer_meta)))].join('');
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",207,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (_QMARK_cb_uuid__$1,wrapped_clj,pstr){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Packing (wrapped): %s -> %s",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [_QMARK_packer_meta,clj,_QMARK_cb_uuid__$1], null),pstr], null);
});})(_QMARK_cb_uuid__$1,wrapped_clj,pstr))
,null)),null,1689555661);

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

taoensso.sente.EdnPacker.cljs$lang$ctorPrWriter = (function (this__6853__auto__,writer__6854__auto__,opt__6855__auto__){
return cljs.core._write.call(null,writer__6854__auto__,"taoensso.sente/EdnPacker");
});

taoensso.sente.__GT_EdnPacker = (function taoensso$sente$__GT_EdnPacker(){
return (new taoensso.sente.EdnPacker());
});

taoensso.sente.default_edn_packer = (new taoensso.sente.EdnPacker());
taoensso.sente.coerce_packer = (function taoensso$sente$coerce_packer(x){
if(cljs.core._EQ_.call(null,x,new cljs.core.Keyword(null,"edn","edn",1317840885))){
return taoensso.sente.default_edn_packer;
} else {
var e = (function (){try{if((function (p1__25325_SHARP_){
if(!((p1__25325_SHARP_ == null))){
if((false) || (p1__25325_SHARP_.taoensso$sente$interfaces$IPacker$)){
return true;
} else {
if((!p1__25325_SHARP_.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,taoensso.sente.interfaces.IPacker,p1__25325_SHARP_);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,taoensso.sente.interfaces.IPacker,p1__25325_SHARP_);
}
}).call(null,x)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e25328){if((e25328 instanceof Error)){
var e = e25328;
return e;
} else {
throw e25328;

}
}})();
if((e == null)){
return x;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"((fn* [p1__25325#] (satisfies? interfaces/IPacker p1__25325#)) x)",x,e,null);
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
var args__7329__auto__ = [];
var len__7322__auto___25638 = arguments.length;
var i__7323__auto___25639 = (0);
while(true){
if((i__7323__auto___25639 < len__7322__auto___25638)){
args__7329__auto__.push((arguments[i__7323__auto___25639]));

var G__25640 = (i__7323__auto___25639 + (1));
i__7323__auto___25639 = G__25640;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return taoensso.sente.make_channel_socket_server_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

taoensso.sente.make_channel_socket_server_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (web_server_ch_adapter,p__25333){
var vec__25334 = p__25333;
var map__25337 = cljs.core.nth.call(null,vec__25334,(0),null);
var map__25337__$1 = ((((!((map__25337 == null)))?((((map__25337.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25337.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25337):map__25337);
var recv_buf_or_n = cljs.core.get.call(null,map__25337__$1,new cljs.core.Keyword(null,"recv-buf-or-n","recv-buf-or-n",1363950355),cljs.core.async.sliding_buffer.call(null,(1000)));
var ws_kalive_ms = cljs.core.get.call(null,map__25337__$1,new cljs.core.Keyword(null,"ws-kalive-ms","ws-kalive-ms",1442179968),taoensso.encore.ms.call(null,new cljs.core.Keyword(null,"secs","secs",1532330091),(25)));
var lp_timeout_ms = cljs.core.get.call(null,map__25337__$1,new cljs.core.Keyword(null,"lp-timeout-ms","lp-timeout-ms",-1451963133),taoensso.encore.ms.call(null,new cljs.core.Keyword(null,"secs","secs",1532330091),(20)));
var send_buf_ms_ajax = cljs.core.get.call(null,map__25337__$1,new cljs.core.Keyword(null,"send-buf-ms-ajax","send-buf-ms-ajax",1546129037),(100));
var send_buf_ms_ws = cljs.core.get.call(null,map__25337__$1,new cljs.core.Keyword(null,"send-buf-ms-ws","send-buf-ms-ws",-1149586238),(30));
var user_id_fn = cljs.core.get.call(null,map__25337__$1,new cljs.core.Keyword(null,"user-id-fn","user-id-fn",-1532150029),((function (vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws){
return (function (ring_req){
return cljs.core.get_in.call(null,ring_req,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"session","session",1008279103),new cljs.core.Keyword(null,"uid","uid",-1447769400)], null));
});})(vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws))
);
var csrf_token_fn = cljs.core.get.call(null,map__25337__$1,new cljs.core.Keyword(null,"csrf-token-fn","csrf-token-fn",-1846298394),((function (vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn){
return (function (ring_req){
var or__6247__auto__ = cljs.core.get_in.call(null,ring_req,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"session","session",1008279103),new cljs.core.Keyword(null,"csrf-token","csrf-token",-1872302856)], null));
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
var or__6247__auto____$1 = cljs.core.get_in.call(null,ring_req,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"session","session",1008279103),new cljs.core.Keyword("ring.middleware.anti-forgery","anti-forgery-token","ring.middleware.anti-forgery/anti-forgery-token",571563484)], null));
if(cljs.core.truth_(or__6247__auto____$1)){
return or__6247__auto____$1;
} else {
return cljs.core.get_in.call(null,ring_req,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"session","session",1008279103),"__anti-forgery-token"], null));
}
}
});})(vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn))
);
var handshake_data_fn = cljs.core.get.call(null,map__25337__$1,new cljs.core.Keyword(null,"handshake-data-fn","handshake-data-fn",2011983089),((function (vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn){
return (function (ring_req){
return null;
});})(vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn))
);
var packer = cljs.core.get.call(null,map__25337__$1,new cljs.core.Keyword(null,"packer","packer",66077544),new cljs.core.Keyword(null,"edn","edn",1317840885));
new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var e = (function (){try{if(taoensso.encore.pos_int_QMARK_.call(null,send_buf_ms_ajax)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e25339){if((e25339 instanceof Error)){
var e = e25339;
return e;
} else {
throw e25339;

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
}catch (e25340){if((e25340 instanceof Error)){
var e = e25340;
return e;
} else {
throw e25340;

}
}})();
if((e == null)){
return true;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(enc/pos-int? send-buf-ms-ws)",send_buf_ms_ws,e,null);
}
})()], null);

var e_25641 = (function (){try{if(((function (vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (p1__25330_SHARP_){
if(!((p1__25330_SHARP_ == null))){
if((false) || (p1__25330_SHARP_.taoensso$sente$interfaces$IServerChanAdapter$)){
return true;
} else {
if((!p1__25330_SHARP_.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,taoensso.sente.interfaces.IServerChanAdapter,p1__25330_SHARP_);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,taoensso.sente.interfaces.IServerChanAdapter,p1__25330_SHARP_);
}
});})(vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
.call(null,web_server_ch_adapter)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e25341){if((e25341 instanceof Error)){
var e = e25341;
return e;
} else {
throw e25341;

}
}})();
if((e_25641 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"((fn* [p1__25330#] (satisfies? interfaces/IServerChanAdapter p1__25330#)) web-server-ch-adapter)",web_server_ch_adapter,e_25641,null);
}

var max_ms_25642 = taoensso.sente.default_client_side_ajax_timeout_ms;
if((lp_timeout_ms >= max_ms_25642)){
throw cljs.core.ex_info.call(null,[cljs.core.str(":lp-timeout-ms must be < "),cljs.core.str(max_ms_25642)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lp-timeout-ms","lp-timeout-ms",-1451963133),lp_timeout_ms,new cljs.core.Keyword(null,"default-client-side-ajax-timeout-ms","default-client-side-ajax-timeout-ms",1149929762),max_ms_25642], null));
} else {
}

var packer__$1 = taoensso.sente.coerce_packer.call(null,packer);
var ch_recv = cljs.core.async.chan.call(null,recv_buf_or_n);
var user_id_fn__$1 = ((function (packer__$1,ch_recv,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (ring_req,client_id){
var or__6247__auto__ = user_id_fn.call(null,cljs.core.assoc.call(null,ring_req,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id));
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
return new cljs.core.Keyword("taoensso.sente","nil-uid","taoensso.sente/nil-uid",-2111603486);
}
});})(packer__$1,ch_recv,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
var conns_ = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ws","ws",86841443),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ajax","ajax",814345549),cljs.core.PersistentArrayMap.EMPTY], null));
var send_buffers_ = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ws","ws",86841443),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ajax","ajax",814345549),cljs.core.PersistentArrayMap.EMPTY], null));
var connected_uids_ = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ws","ws",86841443),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"ajax","ajax",814345549),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"any","any",1705907423),cljs.core.PersistentHashSet.EMPTY], null));
var upd_conn_BANG_ = ((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var G__25643 = null;
var G__25643__3 = (function (conn_type,uid,client_id){
return taoensso.encore.swap_in_BANG_.call(null,conns_,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [conn_type,uid,client_id], null),((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (_QMARK_v){
var vec__25343 = _QMARK_v;
var _QMARK_sch = cljs.core.nth.call(null,vec__25343,(0),null);
var _udt = cljs.core.nth.call(null,vec__25343,(1),null);
var new_udt = taoensso.encore.now_udt.call(null);
return taoensso.encore.swapped.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [_QMARK_sch,new_udt], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"init?","init?",438181499),(_QMARK_v == null),new cljs.core.Keyword(null,"udt","udt",2011712751),new_udt,new cljs.core.Keyword(null,"?sch","?sch",2064493898),_QMARK_sch], null));
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);
});
var G__25643__4 = (function (conn_type,uid,client_id,new__QMARK_sch){
return taoensso.encore.swap_in_BANG_.call(null,conns_,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [conn_type,uid,client_id], null),((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (_QMARK_v){
var new_udt = taoensso.encore.now_udt.call(null);
return taoensso.encore.swapped.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new__QMARK_sch,new_udt], null),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"init?","init?",438181499),(_QMARK_v == null),new cljs.core.Keyword(null,"udt","udt",2011712751),new_udt,new cljs.core.Keyword(null,"?sch","?sch",2064493898),new__QMARK_sch], null));
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);
});
G__25643 = function(conn_type,uid,client_id,new__QMARK_sch){
switch(arguments.length){
case 3:
return G__25643__3.call(this,conn_type,uid,client_id);
case 4:
return G__25643__4.call(this,conn_type,uid,client_id,new__QMARK_sch);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__25643.cljs$core$IFn$_invoke$arity$3 = G__25643__3;
G__25643.cljs$core$IFn$_invoke$arity$4 = G__25643__4;
return G__25643;
})()
;})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
var connect_uid_BANG_ = ((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (conn_type,uid){
if(cljs.core.truth_((function (){var e = (function (){try{if(cljs.core.truth_(taoensso.truss.impl.nnil_QMARK_.call(null,uid))){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e25346){if((e25346 instanceof Error)){
var e = e25346;
return e;
} else {
throw e25346;

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

var newly_connected_QMARK_ = taoensso.encore.swap_in_BANG_.call(null,connected_uids_,cljs.core.PersistentVector.EMPTY,((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (p__25347){
var map__25348 = p__25347;
var map__25348__$1 = ((((!((map__25348 == null)))?((((map__25348.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25348.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25348):map__25348);
var old_m = map__25348__$1;
var ws = cljs.core.get.call(null,map__25348__$1,new cljs.core.Keyword(null,"ws","ws",86841443));
var ajax = cljs.core.get.call(null,map__25348__$1,new cljs.core.Keyword(null,"ajax","ajax",814345549));
var any = cljs.core.get.call(null,map__25348__$1,new cljs.core.Keyword(null,"any","any",1705907423));
var new_m = (function (){var G__25350 = (((conn_type instanceof cljs.core.Keyword))?conn_type.fqn:null);
switch (G__25350) {
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
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);
return newly_connected_QMARK_;
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
var upd_connected_uid_BANG_ = ((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (uid){
if(cljs.core.truth_((function (){var e = (function (){try{if(cljs.core.truth_(taoensso.truss.impl.nnil_QMARK_.call(null,uid))){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e25351){if((e25351 instanceof Error)){
var e = e25351;
return e;
} else {
throw e25351;

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

var newly_disconnected_QMARK_ = taoensso.encore.swap_in_BANG_.call(null,connected_uids_,cljs.core.PersistentVector.EMPTY,((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (p__25352){
var map__25353 = p__25352;
var map__25353__$1 = ((((!((map__25353 == null)))?((((map__25353.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25353.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25353):map__25353);
var old_m = map__25353__$1;
var ws = cljs.core.get.call(null,map__25353__$1,new cljs.core.Keyword(null,"ws","ws",86841443));
var ajax = cljs.core.get.call(null,map__25353__$1,new cljs.core.Keyword(null,"ajax","ajax",814345549));
var any = cljs.core.get.call(null,map__25353__$1,new cljs.core.Keyword(null,"any","any",1705907423));
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
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);
return newly_disconnected_QMARK_;
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
var send_fn = ((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() { 
var G__25645__delegate = function (user_id,ev,p__25355){
var vec__25356 = p__25355;
var map__25359 = cljs.core.nth.call(null,vec__25356,(0),null);
var map__25359__$1 = ((((!((map__25359 == null)))?((((map__25359.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25359.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25359):map__25359);
var opts = map__25359__$1;
var flush_QMARK_ = cljs.core.get.call(null,map__25359__$1,new cljs.core.Keyword(null,"flush?","flush?",-108887231));
var uid_25646 = ((cljs.core._EQ_.call(null,user_id,new cljs.core.Keyword("sente","all-users-without-uid","sente/all-users-without-uid",-42979578)))?new cljs.core.Keyword("taoensso.sente","nil-uid","taoensso.sente/nil-uid",-2111603486):user_id);
var __25647 = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",376,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (uid_25646,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk send: (->uid %s) %s",uid_25646,ev], null);
});})(uid_25646,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,1022486049);
var __25648__$1 = (cljs.core.truth_(uid_25646)?null:(function(){throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("Support for sending to `nil` user-ids has been REMOVED. "),cljs.core.str("Please send to `:sente/all-users-without-uid` instead.")].join('')),cljs.core.str("\n"),cljs.core.str("uid")].join('')))})());
var __25649__$2 = taoensso.sente.assert_event.call(null,ev);
var ev_uuid_25650 = taoensso.encore.uuid_str.call(null);
var flush_buffer_BANG__25651 = ((function (uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (conn_type){
var temp__4657__auto__ = taoensso.encore.swap_in_BANG_.call(null,send_buffers_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [conn_type], null),((function (uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (m){
var vec__25361 = cljs.core.get.call(null,m,uid_25646);
var ___$3 = cljs.core.nth.call(null,vec__25361,(0),null);
var ev_uuids = cljs.core.nth.call(null,vec__25361,(1),null);
if(cljs.core.contains_QMARK_.call(null,ev_uuids,ev_uuid_25650)){
return taoensso.encore.swapped.call(null,cljs.core.dissoc.call(null,m,uid_25646),cljs.core.get.call(null,m,uid_25646));
} else {
return taoensso.encore.swapped.call(null,m,null);
}
});})(uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);
if(cljs.core.truth_(temp__4657__auto__)){
var pulled = temp__4657__auto__;
var vec__25364 = pulled;
var buffered_evs = cljs.core.nth.call(null,vec__25364,(0),null);
var ev_uuids = cljs.core.nth.call(null,vec__25364,(1),null);
var e_25652 = (function (){try{if(cljs.core.vector_QMARK_.call(null,buffered_evs)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e25367){if((e25367 instanceof Error)){
var e = e25367;
return e;
} else {
throw e25367;

}
}})();
if((e_25652 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(vector? buffered-evs)",buffered_evs,e_25652,null);
}

var e_25653 = (function (){try{if(cljs.core.set_QMARK_.call(null,ev_uuids)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e25368){if((e25368 instanceof Error)){
var e = e25368;
return e;
} else {
throw e25368;

}
}})();
if((e_25653 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(set? ev-uuids)",ev_uuids,e_25653,null);
}

var packer_metas = cljs.core.mapv.call(null,cljs.core.meta,buffered_evs);
var combined_packer_meta = cljs.core.reduce.call(null,cljs.core.merge,cljs.core.PersistentArrayMap.EMPTY,packer_metas);
var buffered_evs_ppstr = taoensso.sente.pack.call(null,packer__$1,combined_packer_meta,buffered_evs);
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",412,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (packer_metas,combined_packer_meta,buffered_evs_ppstr,vec__25364,buffered_evs,ev_uuids,pulled,temp__4657__auto__,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["buffered-evs-ppstr: %s (with meta %s)",buffered_evs_ppstr,combined_packer_meta], null);
});})(packer_metas,combined_packer_meta,buffered_evs_ppstr,vec__25364,buffered_evs,ev_uuids,pulled,temp__4657__auto__,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-694811015);

var G__25369 = (((conn_type instanceof cljs.core.Keyword))?conn_type.fqn:null);
switch (G__25369) {
case "ws":
return taoensso.sente.send_buffered_server_evs_GT_ws_clients_BANG_.call(null,conns_,uid_25646,buffered_evs_ppstr,upd_conn_BANG_);

break;
case "ajax":
return taoensso.sente.send_buffered_server_evs_GT_ajax_clients_BANG_.call(null,conns_,uid_25646,buffered_evs_ppstr);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(conn_type)].join('')));

}
} else {
return null;
}
});})(uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
if(cljs.core._EQ_.call(null,ev,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","close","chsk/close",1840295819)], null))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"taoensso.sente","/tmp/form-init1980037513903630905.clj",423,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk closing (client may reconnect): %s",uid_25646], null);
});})(uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-231848867);

if(cljs.core.truth_(flush_QMARK_)){
flush_buffer_BANG__25651.call(null,new cljs.core.Keyword(null,"ws","ws",86841443));

flush_buffer_BANG__25651.call(null,new cljs.core.Keyword(null,"ajax","ajax",814345549));
} else {
}

var seq__25370_25655 = cljs.core.seq.call(null,cljs.core.vals.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,conns_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ws","ws",86841443),uid_25646], null))));
var chunk__25371_25656 = null;
var count__25372_25657 = (0);
var i__25373_25658 = (0);
while(true){
if((i__25373_25658 < count__25372_25657)){
var vec__25374_25659 = cljs.core._nth.call(null,chunk__25371_25656,i__25373_25658);
var _QMARK_sch_25660 = cljs.core.nth.call(null,vec__25374_25659,(0),null);
var _udt_25661 = cljs.core.nth.call(null,vec__25374_25659,(1),null);
var temp__4657__auto___25662 = _QMARK_sch_25660;
if(cljs.core.truth_(temp__4657__auto___25662)){
var sch_25663 = temp__4657__auto___25662;
taoensso.sente.interfaces.sch_close_BANG_.call(null,sch_25663);
} else {
}

var G__25664 = seq__25370_25655;
var G__25665 = chunk__25371_25656;
var G__25666 = count__25372_25657;
var G__25667 = (i__25373_25658 + (1));
seq__25370_25655 = G__25664;
chunk__25371_25656 = G__25665;
count__25372_25657 = G__25666;
i__25373_25658 = G__25667;
continue;
} else {
var temp__4657__auto___25668 = cljs.core.seq.call(null,seq__25370_25655);
if(temp__4657__auto___25668){
var seq__25370_25669__$1 = temp__4657__auto___25668;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25370_25669__$1)){
var c__7058__auto___25670 = cljs.core.chunk_first.call(null,seq__25370_25669__$1);
var G__25671 = cljs.core.chunk_rest.call(null,seq__25370_25669__$1);
var G__25672 = c__7058__auto___25670;
var G__25673 = cljs.core.count.call(null,c__7058__auto___25670);
var G__25674 = (0);
seq__25370_25655 = G__25671;
chunk__25371_25656 = G__25672;
count__25372_25657 = G__25673;
i__25373_25658 = G__25674;
continue;
} else {
var vec__25377_25675 = cljs.core.first.call(null,seq__25370_25669__$1);
var _QMARK_sch_25676 = cljs.core.nth.call(null,vec__25377_25675,(0),null);
var _udt_25677 = cljs.core.nth.call(null,vec__25377_25675,(1),null);
var temp__4657__auto___25678__$1 = _QMARK_sch_25676;
if(cljs.core.truth_(temp__4657__auto___25678__$1)){
var sch_25679 = temp__4657__auto___25678__$1;
taoensso.sente.interfaces.sch_close_BANG_.call(null,sch_25679);
} else {
}

var G__25680 = cljs.core.next.call(null,seq__25370_25669__$1);
var G__25681 = null;
var G__25682 = (0);
var G__25683 = (0);
seq__25370_25655 = G__25680;
chunk__25371_25656 = G__25681;
count__25372_25657 = G__25682;
i__25373_25658 = G__25683;
continue;
}
} else {
}
}
break;
}

var seq__25380_25684 = cljs.core.seq.call(null,cljs.core.vals.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,conns_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ajax","ajax",814345549),uid_25646], null))));
var chunk__25381_25685 = null;
var count__25382_25686 = (0);
var i__25383_25687 = (0);
while(true){
if((i__25383_25687 < count__25382_25686)){
var vec__25384_25688 = cljs.core._nth.call(null,chunk__25381_25685,i__25383_25687);
var _QMARK_sch_25689 = cljs.core.nth.call(null,vec__25384_25688,(0),null);
var _udt_25690 = cljs.core.nth.call(null,vec__25384_25688,(1),null);
var temp__4657__auto___25691 = _QMARK_sch_25689;
if(cljs.core.truth_(temp__4657__auto___25691)){
var sch_25692 = temp__4657__auto___25691;
taoensso.sente.interfaces.sch_close_BANG_.call(null,sch_25692);
} else {
}

var G__25693 = seq__25380_25684;
var G__25694 = chunk__25381_25685;
var G__25695 = count__25382_25686;
var G__25696 = (i__25383_25687 + (1));
seq__25380_25684 = G__25693;
chunk__25381_25685 = G__25694;
count__25382_25686 = G__25695;
i__25383_25687 = G__25696;
continue;
} else {
var temp__4657__auto___25697 = cljs.core.seq.call(null,seq__25380_25684);
if(temp__4657__auto___25697){
var seq__25380_25698__$1 = temp__4657__auto___25697;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25380_25698__$1)){
var c__7058__auto___25699 = cljs.core.chunk_first.call(null,seq__25380_25698__$1);
var G__25700 = cljs.core.chunk_rest.call(null,seq__25380_25698__$1);
var G__25701 = c__7058__auto___25699;
var G__25702 = cljs.core.count.call(null,c__7058__auto___25699);
var G__25703 = (0);
seq__25380_25684 = G__25700;
chunk__25381_25685 = G__25701;
count__25382_25686 = G__25702;
i__25383_25687 = G__25703;
continue;
} else {
var vec__25387_25704 = cljs.core.first.call(null,seq__25380_25698__$1);
var _QMARK_sch_25705 = cljs.core.nth.call(null,vec__25387_25704,(0),null);
var _udt_25706 = cljs.core.nth.call(null,vec__25387_25704,(1),null);
var temp__4657__auto___25707__$1 = _QMARK_sch_25705;
if(cljs.core.truth_(temp__4657__auto___25707__$1)){
var sch_25708 = temp__4657__auto___25707__$1;
taoensso.sente.interfaces.sch_close_BANG_.call(null,sch_25708);
} else {
}

var G__25709 = cljs.core.next.call(null,seq__25380_25698__$1);
var G__25710 = null;
var G__25711 = (0);
var G__25712 = (0);
seq__25380_25684 = G__25709;
chunk__25381_25685 = G__25710;
count__25382_25686 = G__25711;
i__25383_25687 = G__25712;
continue;
}
} else {
}
}
break;
}
} else {
var seq__25390_25713 = cljs.core.seq.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ws","ws",86841443),new cljs.core.Keyword(null,"ajax","ajax",814345549)], null));
var chunk__25391_25714 = null;
var count__25392_25715 = (0);
var i__25393_25716 = (0);
while(true){
if((i__25393_25716 < count__25392_25715)){
var conn_type_25717 = cljs.core._nth.call(null,chunk__25391_25714,i__25393_25716);
taoensso.encore.swap_in_BANG_.call(null,send_buffers_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [conn_type_25717,uid_25646], null),((function (seq__25390_25713,chunk__25391_25714,count__25392_25715,i__25393_25716,conn_type_25717,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (_QMARK_v){
if(cljs.core.not.call(null,_QMARK_v)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ev], null),cljs.core.PersistentHashSet.fromArray([ev_uuid_25650], true)], null);
} else {
var vec__25394 = _QMARK_v;
var buffered_evs = cljs.core.nth.call(null,vec__25394,(0),null);
var ev_uuids = cljs.core.nth.call(null,vec__25394,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.call(null,buffered_evs,ev),cljs.core.conj.call(null,ev_uuids,ev_uuid_25650)], null);
}
});})(seq__25390_25713,chunk__25391_25714,count__25392_25715,i__25393_25716,conn_type_25717,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

var G__25718 = seq__25390_25713;
var G__25719 = chunk__25391_25714;
var G__25720 = count__25392_25715;
var G__25721 = (i__25393_25716 + (1));
seq__25390_25713 = G__25718;
chunk__25391_25714 = G__25719;
count__25392_25715 = G__25720;
i__25393_25716 = G__25721;
continue;
} else {
var temp__4657__auto___25722 = cljs.core.seq.call(null,seq__25390_25713);
if(temp__4657__auto___25722){
var seq__25390_25723__$1 = temp__4657__auto___25722;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25390_25723__$1)){
var c__7058__auto___25724 = cljs.core.chunk_first.call(null,seq__25390_25723__$1);
var G__25725 = cljs.core.chunk_rest.call(null,seq__25390_25723__$1);
var G__25726 = c__7058__auto___25724;
var G__25727 = cljs.core.count.call(null,c__7058__auto___25724);
var G__25728 = (0);
seq__25390_25713 = G__25725;
chunk__25391_25714 = G__25726;
count__25392_25715 = G__25727;
i__25393_25716 = G__25728;
continue;
} else {
var conn_type_25729 = cljs.core.first.call(null,seq__25390_25723__$1);
taoensso.encore.swap_in_BANG_.call(null,send_buffers_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [conn_type_25729,uid_25646], null),((function (seq__25390_25713,chunk__25391_25714,count__25392_25715,i__25393_25716,conn_type_25729,seq__25390_25723__$1,temp__4657__auto___25722,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (_QMARK_v){
if(cljs.core.not.call(null,_QMARK_v)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ev], null),cljs.core.PersistentHashSet.fromArray([ev_uuid_25650], true)], null);
} else {
var vec__25397 = _QMARK_v;
var buffered_evs = cljs.core.nth.call(null,vec__25397,(0),null);
var ev_uuids = cljs.core.nth.call(null,vec__25397,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.call(null,buffered_evs,ev),cljs.core.conj.call(null,ev_uuids,ev_uuid_25650)], null);
}
});})(seq__25390_25713,chunk__25391_25714,count__25392_25715,i__25393_25716,conn_type_25729,seq__25390_25723__$1,temp__4657__auto___25722,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

var G__25730 = cljs.core.next.call(null,seq__25390_25723__$1);
var G__25731 = null;
var G__25732 = (0);
var G__25733 = (0);
seq__25390_25713 = G__25730;
chunk__25391_25714 = G__25731;
count__25392_25715 = G__25732;
i__25393_25716 = G__25733;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(flush_QMARK_)){
flush_buffer_BANG__25651.call(null,new cljs.core.Keyword(null,"ws","ws",86841443));

flush_buffer_BANG__25651.call(null,new cljs.core.Keyword(null,"ajax","ajax",814345549));
} else {
var ws_timeout_25734 = cljs.core.async.timeout.call(null,send_buf_ms_ws);
var ajax_timeout_25735 = cljs.core.async.timeout.call(null,send_buf_ms_ajax);
var c__10224__auto___25736 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___25736,ws_timeout_25734,ajax_timeout_25735,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___25736,ws_timeout_25734,ajax_timeout_25735,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (state_25404){
var state_val_25405 = (state_25404[(1)]);
if((state_val_25405 === (1))){
var state_25404__$1 = state_25404;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25404__$1,(2),ws_timeout_25734);
} else {
if((state_val_25405 === (2))){
var inst_25401 = (state_25404[(2)]);
var inst_25402 = flush_buffer_BANG__25651.call(null,new cljs.core.Keyword(null,"ws","ws",86841443));
var state_25404__$1 = (function (){var statearr_25406 = state_25404;
(statearr_25406[(7)] = inst_25401);

return statearr_25406;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25404__$1,inst_25402);
} else {
return null;
}
}
});})(c__10224__auto___25736,ws_timeout_25734,ajax_timeout_25735,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
return ((function (switch__10112__auto__,c__10224__auto___25736,ws_timeout_25734,ajax_timeout_25735,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$state_machine__10113__auto__ = null;
var taoensso$sente$state_machine__10113__auto____0 = (function (){
var statearr_25410 = [null,null,null,null,null,null,null,null];
(statearr_25410[(0)] = taoensso$sente$state_machine__10113__auto__);

(statearr_25410[(1)] = (1));

return statearr_25410;
});
var taoensso$sente$state_machine__10113__auto____1 = (function (state_25404){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_25404);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e25411){if((e25411 instanceof Object)){
var ex__10116__auto__ = e25411;
var statearr_25412_25737 = state_25404;
(statearr_25412_25737[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25404);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25411;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25738 = state_25404;
state_25404 = G__25738;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
taoensso$sente$state_machine__10113__auto__ = function(state_25404){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__10113__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__10113__auto____1.call(this,state_25404);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__10113__auto____0;
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__10113__auto____1;
return taoensso$sente$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___25736,ws_timeout_25734,ajax_timeout_25735,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var state__10226__auto__ = (function (){var statearr_25413 = f__10225__auto__.call(null);
(statearr_25413[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___25736);

return statearr_25413;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___25736,ws_timeout_25734,ajax_timeout_25735,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);


var c__10224__auto___25739 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___25739,ws_timeout_25734,ajax_timeout_25735,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___25739,ws_timeout_25734,ajax_timeout_25735,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (state_25418){
var state_val_25419 = (state_25418[(1)]);
if((state_val_25419 === (1))){
var state_25418__$1 = state_25418;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25418__$1,(2),ajax_timeout_25735);
} else {
if((state_val_25419 === (2))){
var inst_25415 = (state_25418[(2)]);
var inst_25416 = flush_buffer_BANG__25651.call(null,new cljs.core.Keyword(null,"ajax","ajax",814345549));
var state_25418__$1 = (function (){var statearr_25420 = state_25418;
(statearr_25420[(7)] = inst_25415);

return statearr_25420;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25418__$1,inst_25416);
} else {
return null;
}
}
});})(c__10224__auto___25739,ws_timeout_25734,ajax_timeout_25735,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
return ((function (switch__10112__auto__,c__10224__auto___25739,ws_timeout_25734,ajax_timeout_25735,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$state_machine__10113__auto__ = null;
var taoensso$sente$state_machine__10113__auto____0 = (function (){
var statearr_25424 = [null,null,null,null,null,null,null,null];
(statearr_25424[(0)] = taoensso$sente$state_machine__10113__auto__);

(statearr_25424[(1)] = (1));

return statearr_25424;
});
var taoensso$sente$state_machine__10113__auto____1 = (function (state_25418){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_25418);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e25425){if((e25425 instanceof Object)){
var ex__10116__auto__ = e25425;
var statearr_25426_25740 = state_25418;
(statearr_25426_25740[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25418);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25425;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25741 = state_25418;
state_25418 = G__25741;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
taoensso$sente$state_machine__10113__auto__ = function(state_25418){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__10113__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__10113__auto____1.call(this,state_25418);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__10113__auto____0;
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__10113__auto____1;
return taoensso$sente$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___25739,ws_timeout_25734,ajax_timeout_25735,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var state__10226__auto__ = (function (){var statearr_25427 = f__10225__auto__.call(null);
(statearr_25427[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___25739);

return statearr_25427;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___25739,ws_timeout_25734,ajax_timeout_25735,uid_25646,__25647,__25648__$1,__25649__$2,ev_uuid_25650,flush_buffer_BANG__25651,vec__25356,map__25359,map__25359__$1,opts,flush_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

}
}

return null;
};
var G__25645 = function (user_id,ev,var_args){
var p__25355 = null;
if (arguments.length > 2) {
var G__25742__i = 0, G__25742__a = new Array(arguments.length -  2);
while (G__25742__i < G__25742__a.length) {G__25742__a[G__25742__i] = arguments[G__25742__i + 2]; ++G__25742__i;}
  p__25355 = new cljs.core.IndexedSeq(G__25742__a,0);
} 
return G__25645__delegate.call(this,user_id,ev,p__25355);};
G__25645.cljs$lang$maxFixedArity = 2;
G__25645.cljs$lang$applyTo = (function (arglist__25743){
var user_id = cljs.core.first(arglist__25743);
arglist__25743 = cljs.core.next(arglist__25743);
var ev = cljs.core.first(arglist__25743);
var p__25355 = cljs.core.rest(arglist__25743);
return G__25645__delegate(user_id,ev,p__25355);
});
G__25645.cljs$core$IFn$_invoke$arity$variadic = G__25645__delegate;
return G__25645;
})()
;})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
var ev_msg_const = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861),ch_recv,new cljs.core.Keyword(null,"send-fn","send-fn",351002041),send_fn,new cljs.core.Keyword(null,"connected-uids","connected-uids",1454332231),connected_uids_], null);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861),ch_recv,new cljs.core.Keyword(null,"send-fn","send-fn",351002041),send_fn,new cljs.core.Keyword(null,"connected-uids","connected-uids",1454332231),connected_uids_,new cljs.core.Keyword(null,"ajax-post-fn","ajax-post-fn",1830071264),((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (ring_req){
return taoensso.sente.interfaces.ring_req__GT_server_ch_resp.call(null,web_server_ch_adapter,ring_req,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-open","on-open",-1391088163),((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (server_ch,websocket_QMARK_){
if(cljs.core.not.call(null,websocket_QMARK_)){
} else {
throw (new Error("Assert failed: (not websocket?)"));
}

var params = cljs.core.get.call(null,ring_req,new cljs.core.Keyword(null,"params","params",710516235));
var ppstr = cljs.core.get.call(null,params,new cljs.core.Keyword(null,"ppstr","ppstr",1557495252));
var client_id = cljs.core.get.call(null,params,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
var vec__25428 = taoensso.sente.unpack.call(null,packer__$1,ppstr);
var clj = cljs.core.nth.call(null,vec__25428,(0),null);
var has_cb_QMARK_ = cljs.core.nth.call(null,vec__25428,(1),null);
var reply_fn = (function (){var replied_QMARK__ = cljs.core.atom.call(null,false);
return ((function (replied_QMARK__,params,ppstr,client_id,vec__25428,clj,has_cb_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (resp_clj){
if(cljs.core.truth_(cljs.core.compare_and_set_BANG_.call(null,replied_QMARK__,false,true))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",492,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (replied_QMARK__,params,ppstr,client_id,vec__25428,clj,has_cb_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk send (ajax post reply): %s",resp_clj], null);
});})(replied_QMARK__,params,ppstr,client_id,vec__25428,clj,has_cb_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-1533416492);

return taoensso.sente.interfaces.sch_send_BANG_.call(null,server_ch,websocket_QMARK_,taoensso.sente.pack.call(null,packer__$1,cljs.core.meta.call(null,resp_clj),resp_clj));
} else {
return null;
}
});
;})(replied_QMARK__,params,ppstr,client_id,vec__25428,clj,has_cb_QMARK_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
taoensso.sente.put_server_event_msg_GT_ch_recv_BANG_.call(null,ch_recv,cljs.core.merge.call(null,ev_msg_const,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id,new cljs.core.Keyword(null,"ring-req","ring-req",-747861961),ring_req,new cljs.core.Keyword(null,"event","event",301435442),clj,new cljs.core.Keyword(null,"uid","uid",-1447769400),user_id_fn__$1.call(null,ring_req,client_id),new cljs.core.Keyword(null,"?reply-fn","?reply-fn",-1479510592),(cljs.core.truth_(has_cb_QMARK_)?reply_fn:null)], null)));

if(cljs.core.truth_(has_cb_QMARK_)){
var temp__4657__auto__ = lp_timeout_ms;
if(cljs.core.truth_(temp__4657__auto__)){
var ms = temp__4657__auto__;
var c__10224__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto__,ms,temp__4657__auto__,params,ppstr,client_id,vec__25428,clj,has_cb_QMARK_,reply_fn,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto__,ms,temp__4657__auto__,params,ppstr,client_id,vec__25428,clj,has_cb_QMARK_,reply_fn,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (state_25436){
var state_val_25437 = (state_25436[(1)]);
if((state_val_25437 === (1))){
var inst_25431 = cljs.core.async.timeout.call(null,ms);
var state_25436__$1 = state_25436;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25436__$1,(2),inst_25431);
} else {
if((state_val_25437 === (2))){
var inst_25433 = (state_25436[(2)]);
var inst_25434 = reply_fn.call(null,new cljs.core.Keyword("chsk","timeout","chsk/timeout",-319776489));
var state_25436__$1 = (function (){var statearr_25438 = state_25436;
(statearr_25438[(7)] = inst_25433);

return statearr_25438;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25436__$1,inst_25434);
} else {
return null;
}
}
});})(c__10224__auto__,ms,temp__4657__auto__,params,ppstr,client_id,vec__25428,clj,has_cb_QMARK_,reply_fn,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
return ((function (switch__10112__auto__,c__10224__auto__,ms,temp__4657__auto__,params,ppstr,client_id,vec__25428,clj,has_cb_QMARK_,reply_fn,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$state_machine__10113__auto__ = null;
var taoensso$sente$state_machine__10113__auto____0 = (function (){
var statearr_25442 = [null,null,null,null,null,null,null,null];
(statearr_25442[(0)] = taoensso$sente$state_machine__10113__auto__);

(statearr_25442[(1)] = (1));

return statearr_25442;
});
var taoensso$sente$state_machine__10113__auto____1 = (function (state_25436){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_25436);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e25443){if((e25443 instanceof Object)){
var ex__10116__auto__ = e25443;
var statearr_25444_25744 = state_25436;
(statearr_25444_25744[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25436);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25443;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25745 = state_25436;
state_25436 = G__25745;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
taoensso$sente$state_machine__10113__auto__ = function(state_25436){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__10113__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__10113__auto____1.call(this,state_25436);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__10113__auto____0;
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__10113__auto____1;
return taoensso$sente$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto__,ms,temp__4657__auto__,params,ppstr,client_id,vec__25428,clj,has_cb_QMARK_,reply_fn,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var state__10226__auto__ = (function (){var statearr_25445 = f__10225__auto__.call(null);
(statearr_25445[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto__);

return statearr_25445;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto__,ms,temp__4657__auto__,params,ppstr,client_id,vec__25428,clj,has_cb_QMARK_,reply_fn,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

return c__10224__auto__;
} else {
return null;
}
} else {
return reply_fn.call(null,new cljs.core.Keyword("chsk","dummy-cb-200","chsk/dummy-cb-200",-1663130337));
}
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
], null));
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,new cljs.core.Keyword(null,"ajax-get-or-ws-handshake-fn","ajax-get-or-ws-handshake-fn",-1210409233),((function (packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (ring_req){
var sch_uuid = taoensso.encore.uuid_str.call(null,(6));
var params = cljs.core.get.call(null,ring_req,new cljs.core.Keyword(null,"params","params",710516235));
var client_id = cljs.core.get.call(null,params,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
var csrf_token = csrf_token_fn.call(null,ring_req);
var uid = user_id_fn__$1.call(null,ring_req,client_id);
var receive_event_msg_BANG_ = ((function (sch_uuid,params,client_id,csrf_token,uid,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
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
;})(sch_uuid,params,client_id,csrf_token,uid,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
var send_handshake_BANG_ = ((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (server_ch,websocket_QMARK_){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",537,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["send-handshake!"], null);
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,350324122);

var _QMARK_handshake_data = handshake_data_fn.call(null,ring_req);
var handshake_ev = (((_QMARK_handshake_data == null))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","handshake","chsk/handshake",64910686),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [uid,csrf_token], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","handshake","chsk/handshake",64910686),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [uid,csrf_token,_QMARK_handshake_data], null)], null));
return taoensso.sente.interfaces.sch_send_BANG_.call(null,server_ch,websocket_QMARK_,taoensso.sente.pack.call(null,packer__$1,null,handshake_ev));
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
if(clojure.string.blank_QMARK_.call(null,client_id)){
var err_msg = "Client's Ring request doesn't have a client id. Does your server have the necessary keyword Ring middleware (`wrap-params` & `wrap-keyword-params`)?";
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init1980037513903630905.clj",548,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (err_msg,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(err_msg),cljs.core.str(": %s")].join(''),ring_req], null);
});})(err_msg,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-1831984133);

throw cljs.core.ex_info.call(null,err_msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ring-req","ring-req",-747861961),ring_req], null));
} else {
return taoensso.sente.interfaces.ring_req__GT_server_ch_resp.call(null,web_server_ch_adapter,ring_req,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-open","on-open",-1391088163),((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (server_ch,websocket_QMARK_){
if(cljs.core.truth_(websocket_QMARK_)){
var _ = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",557,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["New WebSocket channel: %s (%s)",uid,sch_uuid], null);
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,1150389199);
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
var c__10224__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (state_25481){
var state_val_25482 = (state_25481[(1)]);
if((state_val_25482 === (7))){
var inst_25477 = (state_25481[(2)]);
var state_25481__$1 = state_25481;
var statearr_25483_25746 = state_25481__$1;
(statearr_25483_25746[(2)] = inst_25477);

(statearr_25483_25746[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25482 === (1))){
var inst_25446 = udt_open;
var state_25481__$1 = (function (){var statearr_25484 = state_25481;
(statearr_25484[(7)] = inst_25446);

return statearr_25484;
})();
var statearr_25485_25747 = state_25481__$1;
(statearr_25485_25747[(2)] = null);

(statearr_25485_25747[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25482 === (4))){
var inst_25455 = (state_25481[(8)]);
var inst_25450 = (state_25481[(2)]);
var inst_25451 = cljs.core.deref.call(null,conns_);
var inst_25452 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_25453 = [new cljs.core.Keyword(null,"ws","ws",86841443),uid,client_id];
var inst_25454 = (new cljs.core.PersistentVector(null,3,(5),inst_25452,inst_25453,null));
var inst_25455__$1 = cljs.core.get_in.call(null,inst_25451,inst_25454);
var state_25481__$1 = (function (){var statearr_25486 = state_25481;
(statearr_25486[(9)] = inst_25450);

(statearr_25486[(8)] = inst_25455__$1);

return statearr_25486;
})();
if(cljs.core.truth_(inst_25455__$1)){
var statearr_25487_25748 = state_25481__$1;
(statearr_25487_25748[(1)] = (5));

} else {
var statearr_25488_25749 = state_25481__$1;
(statearr_25488_25749[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25482 === (13))){
var inst_25461 = (state_25481[(10)]);
var inst_25470 = (state_25481[(2)]);
var inst_25446 = inst_25461;
var state_25481__$1 = (function (){var statearr_25489 = state_25481;
(statearr_25489[(7)] = inst_25446);

(statearr_25489[(11)] = inst_25470);

return statearr_25489;
})();
var statearr_25490_25750 = state_25481__$1;
(statearr_25490_25750[(2)] = null);

(statearr_25490_25750[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25482 === (6))){
var state_25481__$1 = state_25481;
var statearr_25491_25751 = state_25481__$1;
(statearr_25491_25751[(2)] = null);

(statearr_25491_25751[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25482 === (3))){
var inst_25479 = (state_25481[(2)]);
var state_25481__$1 = state_25481;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25481__$1,inst_25479);
} else {
if((state_val_25482 === (12))){
var state_25481__$1 = state_25481;
var statearr_25492_25752 = state_25481__$1;
(statearr_25492_25752[(2)] = null);

(statearr_25492_25752[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25482 === (2))){
var inst_25448 = cljs.core.async.timeout.call(null,ms);
var state_25481__$1 = state_25481;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25481__$1,(4),inst_25448);
} else {
if((state_val_25482 === (11))){
var inst_25466 = taoensso.sente.pack.call(null,packer__$1,null,new cljs.core.Keyword("chsk","ws-ping","chsk/ws-ping",191675304));
var inst_25467 = taoensso.sente.interfaces.sch_send_BANG_.call(null,server_ch,websocket_QMARK_,inst_25466);
var state_25481__$1 = state_25481;
var statearr_25493_25753 = state_25481__$1;
(statearr_25493_25753[(2)] = inst_25467);

(statearr_25493_25753[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25482 === (9))){
var state_25481__$1 = state_25481;
var statearr_25494_25754 = state_25481__$1;
(statearr_25494_25754[(2)] = null);

(statearr_25494_25754[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25482 === (5))){
var inst_25455 = (state_25481[(8)]);
var inst_25460 = cljs.core.nth.call(null,inst_25455,(0),null);
var inst_25461 = cljs.core.nth.call(null,inst_25455,(1),null);
var inst_25462 = taoensso.sente.interfaces.sch_open_QMARK_.call(null,server_ch);
var state_25481__$1 = (function (){var statearr_25495 = state_25481;
(statearr_25495[(10)] = inst_25461);

(statearr_25495[(12)] = inst_25460);

return statearr_25495;
})();
if(cljs.core.truth_(inst_25462)){
var statearr_25496_25755 = state_25481__$1;
(statearr_25496_25755[(1)] = (8));

} else {
var statearr_25497_25756 = state_25481__$1;
(statearr_25497_25756[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25482 === (10))){
var inst_25474 = (state_25481[(2)]);
var state_25481__$1 = state_25481;
var statearr_25498_25757 = state_25481__$1;
(statearr_25498_25757[(2)] = inst_25474);

(statearr_25498_25757[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25482 === (8))){
var inst_25461 = (state_25481[(10)]);
var inst_25446 = (state_25481[(7)]);
var inst_25464 = cljs.core._EQ_.call(null,inst_25461,inst_25446);
var state_25481__$1 = state_25481;
if(inst_25464){
var statearr_25499_25758 = state_25481__$1;
(statearr_25499_25758[(1)] = (11));

} else {
var statearr_25500_25759 = state_25481__$1;
(statearr_25500_25759[(1)] = (12));

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
});})(c__10224__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
return ((function (switch__10112__auto__,c__10224__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$state_machine__10113__auto__ = null;
var taoensso$sente$state_machine__10113__auto____0 = (function (){
var statearr_25504 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25504[(0)] = taoensso$sente$state_machine__10113__auto__);

(statearr_25504[(1)] = (1));

return statearr_25504;
});
var taoensso$sente$state_machine__10113__auto____1 = (function (state_25481){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_25481);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e25505){if((e25505 instanceof Object)){
var ex__10116__auto__ = e25505;
var statearr_25506_25760 = state_25481;
(statearr_25506_25760[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25481);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25505;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25761 = state_25481;
state_25481 = G__25761;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
taoensso$sente$state_machine__10113__auto__ = function(state_25481){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__10113__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__10113__auto____1.call(this,state_25481);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__10113__auto____0;
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__10113__auto____1;
return taoensso$sente$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var state__10226__auto__ = (function (){var statearr_25507 = f__10225__auto__.call(null);
(statearr_25507[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto__);

return statearr_25507;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

return c__10224__auto__;
} else {
return null;
}
} else {
var _ = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",585,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["New Ajax handshake/poll: %s (%s)",uid,sch_uuid], null);
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-1525117559);
var updated_conn = upd_conn_BANG_.call(null,new cljs.core.Keyword(null,"ajax","ajax",814345549),uid,client_id,server_ch);
var udt_open = new cljs.core.Keyword(null,"udt","udt",2011712751).cljs$core$IFn$_invoke$arity$1(updated_conn);
var handshake_QMARK_ = (function (){var or__6247__auto__ = new cljs.core.Keyword(null,"init?","init?",438181499).cljs$core$IFn$_invoke$arity$1(updated_conn);
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
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
var c__10224__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,handshake_QMARK_,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,handshake_QMARK_,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (state_25533){
var state_val_25534 = (state_25533[(1)]);
if((state_val_25534 === (1))){
var inst_25508 = cljs.core.async.timeout.call(null,ms);
var state_25533__$1 = state_25533;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25533__$1,(2),inst_25508);
} else {
if((state_val_25534 === (2))){
var inst_25515 = (state_25533[(7)]);
var inst_25510 = (state_25533[(2)]);
var inst_25511 = cljs.core.deref.call(null,conns_);
var inst_25512 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_25513 = [new cljs.core.Keyword(null,"ajax","ajax",814345549),uid,client_id];
var inst_25514 = (new cljs.core.PersistentVector(null,3,(5),inst_25512,inst_25513,null));
var inst_25515__$1 = cljs.core.get_in.call(null,inst_25511,inst_25514);
var state_25533__$1 = (function (){var statearr_25535 = state_25533;
(statearr_25535[(8)] = inst_25510);

(statearr_25535[(7)] = inst_25515__$1);

return statearr_25535;
})();
if(cljs.core.truth_(inst_25515__$1)){
var statearr_25536_25762 = state_25533__$1;
(statearr_25536_25762[(1)] = (3));

} else {
var statearr_25537_25763 = state_25533__$1;
(statearr_25537_25763[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25534 === (3))){
var inst_25515 = (state_25533[(7)]);
var inst_25520 = cljs.core.nth.call(null,inst_25515,(0),null);
var inst_25521 = cljs.core.nth.call(null,inst_25515,(1),null);
var inst_25522 = cljs.core._EQ_.call(null,inst_25521,udt_open);
var state_25533__$1 = (function (){var statearr_25538 = state_25533;
(statearr_25538[(9)] = inst_25520);

return statearr_25538;
})();
if(inst_25522){
var statearr_25539_25764 = state_25533__$1;
(statearr_25539_25764[(1)] = (6));

} else {
var statearr_25540_25765 = state_25533__$1;
(statearr_25540_25765[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25534 === (4))){
var state_25533__$1 = state_25533;
var statearr_25541_25766 = state_25533__$1;
(statearr_25541_25766[(2)] = null);

(statearr_25541_25766[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25534 === (5))){
var inst_25531 = (state_25533[(2)]);
var state_25533__$1 = state_25533;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25533__$1,inst_25531);
} else {
if((state_val_25534 === (6))){
var inst_25524 = taoensso.sente.pack.call(null,packer__$1,null,new cljs.core.Keyword("chsk","timeout","chsk/timeout",-319776489));
var inst_25525 = taoensso.sente.interfaces.sch_send_BANG_.call(null,server_ch,websocket_QMARK_,inst_25524);
var state_25533__$1 = state_25533;
var statearr_25542_25767 = state_25533__$1;
(statearr_25542_25767[(2)] = inst_25525);

(statearr_25542_25767[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25534 === (7))){
var state_25533__$1 = state_25533;
var statearr_25543_25768 = state_25533__$1;
(statearr_25543_25768[(2)] = null);

(statearr_25543_25768[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25534 === (8))){
var inst_25528 = (state_25533[(2)]);
var state_25533__$1 = state_25533;
var statearr_25544_25769 = state_25533__$1;
(statearr_25544_25769[(2)] = inst_25528);

(statearr_25544_25769[(1)] = (5));


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
});})(c__10224__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,handshake_QMARK_,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
return ((function (switch__10112__auto__,c__10224__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,handshake_QMARK_,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$state_machine__10113__auto__ = null;
var taoensso$sente$state_machine__10113__auto____0 = (function (){
var statearr_25548 = [null,null,null,null,null,null,null,null,null,null];
(statearr_25548[(0)] = taoensso$sente$state_machine__10113__auto__);

(statearr_25548[(1)] = (1));

return statearr_25548;
});
var taoensso$sente$state_machine__10113__auto____1 = (function (state_25533){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_25533);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e25549){if((e25549 instanceof Object)){
var ex__10116__auto__ = e25549;
var statearr_25550_25770 = state_25533;
(statearr_25550_25770[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25533);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25549;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25771 = state_25533;
state_25533 = G__25771;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
taoensso$sente$state_machine__10113__auto__ = function(state_25533){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__10113__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__10113__auto____1.call(this,state_25533);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__10113__auto____0;
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__10113__auto____1;
return taoensso$sente$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,handshake_QMARK_,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var state__10226__auto__ = (function (){var statearr_25551 = f__10225__auto__.call(null);
(statearr_25551[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto__);

return statearr_25551;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto__,ms,temp__4657__auto__,_,updated_conn,udt_open,handshake_QMARK_,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

return c__10224__auto__;
} else {
return null;
}
}
}
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,new cljs.core.Keyword(null,"on-msg","on-msg",-2021925279),((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (server_ch,websocket_QMARK_,req_ppstr){
if(cljs.core.truth_(websocket_QMARK_)){
} else {
throw (new Error("Assert failed: websocket?"));
}

upd_conn_BANG_.call(null,new cljs.core.Keyword(null,"ws","ws",86841443),uid,client_id);

var vec__25552 = taoensso.sente.unpack.call(null,packer__$1,req_ppstr);
var clj = cljs.core.nth.call(null,vec__25552,(0),null);
var _QMARK_cb_uuid = cljs.core.nth.call(null,vec__25552,(1),null);
return receive_event_msg_BANG_.call(null,clj,(cljs.core.truth_(_QMARK_cb_uuid)?((function (vec__25552,clj,_QMARK_cb_uuid,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function taoensso$sente$reply_fn(resp_clj){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",615,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__25552,clj,_QMARK_cb_uuid,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk send (ws reply): %s",resp_clj], null);
});})(vec__25552,clj,_QMARK_cb_uuid,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,2110602217);

return taoensso.sente.interfaces.sch_send_BANG_.call(null,server_ch,websocket_QMARK_,taoensso.sente.pack.call(null,packer__$1,cljs.core.meta.call(null,resp_clj),resp_clj,_QMARK_cb_uuid));
});})(vec__25552,clj,_QMARK_cb_uuid,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
:null));
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,new cljs.core.Keyword(null,"on-close","on-close",-761178394),((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (server_ch,websocket_QMARK_,_status){
var conn_type = (cljs.core.truth_(websocket_QMARK_)?new cljs.core.Keyword(null,"ws","ws",86841443):new cljs.core.Keyword(null,"ajax","ajax",814345549));
var _ = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",624,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (conn_type,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["%s channel closed: %s (%s)",(cljs.core.truth_(websocket_QMARK_)?"WebSocket":"Ajax"),uid,sch_uuid], null);
});})(conn_type,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,1495142036);
var updated_conn = upd_conn_BANG_.call(null,conn_type,uid,client_id,null);
var udt_close = new cljs.core.Keyword(null,"udt","udt",2011712751).cljs$core$IFn$_invoke$arity$1(updated_conn);
var c__10224__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (state_25606){
var state_val_25607 = (state_25606[(1)]);
if((state_val_25607 === (7))){
var state_25606__$1 = state_25606;
var statearr_25608_25772 = state_25606__$1;
(statearr_25608_25772[(2)] = null);

(statearr_25608_25772[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25607 === (1))){
var inst_25555 = cljs.core.async.timeout.call(null,(5000));
var state_25606__$1 = state_25606;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25606__$1,(2),inst_25555);
} else {
if((state_val_25607 === (4))){
var state_25606__$1 = state_25606;
var statearr_25609_25773 = state_25606__$1;
(statearr_25609_25773[(2)] = null);

(statearr_25609_25773[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25607 === (13))){
var state_25606__$1 = state_25606;
var statearr_25610_25774 = state_25606__$1;
(statearr_25610_25774[(2)] = null);

(statearr_25610_25774[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25607 === (6))){
var inst_25567 = (state_25606[(7)]);
var inst_25566 = (state_25606[(8)]);
var inst_25565 = (state_25606[(9)]);
var inst_25583 = (state_25606[(10)]);
var inst_25578 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_25579 = [conn_type,uid,client_id];
var inst_25580 = (new cljs.core.PersistentVector(null,3,(5),inst_25578,inst_25579,null));
var inst_25582 = (function (){var vec__25558 = inst_25565;
var __QMARK_sch = inst_25566;
var udt_t1 = inst_25567;
return ((function (vec__25558,__QMARK_sch,udt_t1,inst_25567,inst_25566,inst_25565,inst_25583,inst_25578,inst_25579,inst_25580,state_val_25607,c__10224__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (p__25581){
var vec__25611 = p__25581;
var _sch = cljs.core.nth.call(null,vec__25611,(0),null);
var udt_t1__$1 = cljs.core.nth.call(null,vec__25611,(1),null);
if(cljs.core._EQ_.call(null,udt_t1__$1,udt_close)){
return taoensso.encore.swapped.call(null,new cljs.core.Keyword("swap","dissoc","swap/dissoc",-605373782),true);
} else {
return taoensso.encore.swapped.call(null,udt_t1__$1,false);
}
});
;})(vec__25558,__QMARK_sch,udt_t1,inst_25567,inst_25566,inst_25565,inst_25583,inst_25578,inst_25579,inst_25580,state_val_25607,c__10224__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var inst_25583__$1 = taoensso.encore.swap_in_BANG_.call(null,conns_,inst_25580,inst_25582);
var state_25606__$1 = (function (){var statearr_25614 = state_25606;
(statearr_25614[(10)] = inst_25583__$1);

return statearr_25614;
})();
if(cljs.core.truth_(inst_25583__$1)){
var statearr_25615_25775 = state_25606__$1;
(statearr_25615_25775[(1)] = (9));

} else {
var statearr_25616_25776 = state_25606__$1;
(statearr_25616_25776[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25607 === (3))){
var inst_25567 = (state_25606[(7)]);
var inst_25566 = (state_25606[(8)]);
var inst_25565 = (state_25606[(9)]);
var inst_25570 = (function (){var vec__25558 = inst_25565;
var __QMARK_sch = inst_25566;
var udt_t1 = inst_25567;
return ((function (vec__25558,__QMARK_sch,udt_t1,inst_25567,inst_25566,inst_25565,state_val_25607,c__10224__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["close-timeout: %s %s %s %s",conn_type,uid,sch_uuid,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core._EQ_.call(null,udt_t1,udt_close),udt_t1,udt_close], null)], null);
});
;})(vec__25558,__QMARK_sch,udt_t1,inst_25567,inst_25566,inst_25565,state_val_25607,c__10224__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var inst_25571 = (new cljs.core.Delay(inst_25570,null));
var inst_25572 = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"taoensso.sente","/tmp/form-init1980037513903630905.clj",638,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),inst_25571,null,1283252051);
var state_25606__$1 = state_25606;
var statearr_25617_25777 = state_25606__$1;
(statearr_25617_25777[(2)] = inst_25572);

(statearr_25617_25777[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25607 === (12))){
var inst_25592 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_25593 = [new cljs.core.Keyword("chsk","uidport-close","chsk/uidport-close",901058678),uid];
var inst_25594 = (new cljs.core.PersistentVector(null,2,(5),inst_25592,inst_25593,null));
var inst_25595 = receive_event_msg_BANG_.call(null,inst_25594);
var state_25606__$1 = state_25606;
var statearr_25618_25778 = state_25606__$1;
(statearr_25618_25778[(2)] = inst_25595);

(statearr_25618_25778[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25607 === (2))){
var inst_25565 = (state_25606[(9)]);
var inst_25557 = (state_25606[(2)]);
var inst_25561 = cljs.core.deref.call(null,conns_);
var inst_25562 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_25563 = [conn_type,uid,client_id];
var inst_25564 = (new cljs.core.PersistentVector(null,3,(5),inst_25562,inst_25563,null));
var inst_25565__$1 = cljs.core.get_in.call(null,inst_25561,inst_25564);
var inst_25566 = cljs.core.nth.call(null,inst_25565__$1,(0),null);
var inst_25567 = cljs.core.nth.call(null,inst_25565__$1,(1),null);
var inst_25568 = cljs.core.deref.call(null,taoensso.sente.debug_mode_QMARK__);
var state_25606__$1 = (function (){var statearr_25619 = state_25606;
(statearr_25619[(7)] = inst_25567);

(statearr_25619[(11)] = inst_25557);

(statearr_25619[(8)] = inst_25566);

(statearr_25619[(9)] = inst_25565__$1);

return statearr_25619;
})();
if(cljs.core.truth_(inst_25568)){
var statearr_25620_25779 = state_25606__$1;
(statearr_25620_25779[(1)] = (3));

} else {
var statearr_25621_25780 = state_25606__$1;
(statearr_25621_25780[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25607 === (11))){
var inst_25601 = (state_25606[(2)]);
var state_25606__$1 = state_25606;
var statearr_25622_25781 = state_25606__$1;
(statearr_25622_25781[(2)] = inst_25601);

(statearr_25622_25781[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25607 === (9))){
var inst_25567 = (state_25606[(7)]);
var inst_25566 = (state_25606[(8)]);
var inst_25565 = (state_25606[(9)]);
var inst_25583 = (state_25606[(10)]);
var inst_25585 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_25586 = [conn_type,uid];
var inst_25587 = (new cljs.core.PersistentVector(null,2,(5),inst_25585,inst_25586,null));
var inst_25588 = (function (){var vec__25558 = inst_25565;
var __QMARK_sch = inst_25566;
var udt_t1 = inst_25567;
var disconnect_QMARK_ = inst_25583;
return ((function (vec__25558,__QMARK_sch,udt_t1,disconnect_QMARK_,inst_25567,inst_25566,inst_25565,inst_25583,inst_25585,inst_25586,inst_25587,state_val_25607,c__10224__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (_QMARK_m){
if(cljs.core.empty_QMARK_.call(null,_QMARK_m)){
return new cljs.core.Keyword("swap","dissoc","swap/dissoc",-605373782);
} else {
return _QMARK_m;
}
});
;})(vec__25558,__QMARK_sch,udt_t1,disconnect_QMARK_,inst_25567,inst_25566,inst_25565,inst_25583,inst_25585,inst_25586,inst_25587,state_val_25607,c__10224__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var inst_25589 = taoensso.encore.swap_in_BANG_.call(null,conns_,inst_25587,inst_25588);
var inst_25590 = upd_connected_uid_BANG_.call(null,uid);
var state_25606__$1 = (function (){var statearr_25623 = state_25606;
(statearr_25623[(12)] = inst_25589);

return statearr_25623;
})();
if(cljs.core.truth_(inst_25590)){
var statearr_25624_25782 = state_25606__$1;
(statearr_25624_25782[(1)] = (12));

} else {
var statearr_25625_25783 = state_25606__$1;
(statearr_25625_25783[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25607 === (5))){
var inst_25567 = (state_25606[(7)]);
var inst_25575 = (state_25606[(2)]);
var inst_25576 = cljs.core._EQ_.call(null,inst_25567,udt_close);
var state_25606__$1 = (function (){var statearr_25626 = state_25606;
(statearr_25626[(13)] = inst_25575);

return statearr_25626;
})();
if(inst_25576){
var statearr_25627_25784 = state_25606__$1;
(statearr_25627_25784[(1)] = (6));

} else {
var statearr_25628_25785 = state_25606__$1;
(statearr_25628_25785[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25607 === (14))){
var inst_25598 = (state_25606[(2)]);
var state_25606__$1 = state_25606;
var statearr_25629_25786 = state_25606__$1;
(statearr_25629_25786[(2)] = inst_25598);

(statearr_25629_25786[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25607 === (10))){
var state_25606__$1 = state_25606;
var statearr_25630_25787 = state_25606__$1;
(statearr_25630_25787[(2)] = null);

(statearr_25630_25787[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25607 === (8))){
var inst_25604 = (state_25606[(2)]);
var state_25606__$1 = state_25606;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25606__$1,inst_25604);
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
});})(c__10224__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
;
return ((function (switch__10112__auto__,c__10224__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function() {
var taoensso$sente$state_machine__10113__auto__ = null;
var taoensso$sente$state_machine__10113__auto____0 = (function (){
var statearr_25634 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25634[(0)] = taoensso$sente$state_machine__10113__auto__);

(statearr_25634[(1)] = (1));

return statearr_25634;
});
var taoensso$sente$state_machine__10113__auto____1 = (function (state_25606){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_25606);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e25635){if((e25635 instanceof Object)){
var ex__10116__auto__ = e25635;
var statearr_25636_25788 = state_25606;
(statearr_25636_25788[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25606);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25635;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25789 = state_25606;
state_25606 = G__25789;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
taoensso$sente$state_machine__10113__auto__ = function(state_25606){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__10113__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__10113__auto____1.call(this,state_25606);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__10113__auto____0;
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__10113__auto____1;
return taoensso$sente$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
})();
var state__10226__auto__ = (function (){var statearr_25637 = f__10225__auto__.call(null);
(statearr_25637[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto__);

return statearr_25637;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto__,conn_type,_,updated_conn,udt_close,sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
);

return c__10224__auto__;
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,new cljs.core.Keyword(null,"on-error","on-error",1728533530),((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (server_ch,websocket_QMARK_,error){
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init1980037513903630905.clj",660,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["ring-req->server-ch-resp error: %s (%s)",error,uid,sch_uuid], null);
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
,null)),null,-188914855);
});})(sch_uuid,params,client_id,csrf_token,uid,receive_event_msg_BANG_,send_handshake_BANG_,packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
], null));
}
});})(packer__$1,ch_recv,user_id_fn__$1,conns_,send_buffers_,connected_uids_,upd_conn_BANG_,connect_uid_BANG_,upd_connected_uid_BANG_,send_fn,ev_msg_const,vec__25334,map__25337,map__25337__$1,recv_buf_or_n,ws_kalive_ms,lp_timeout_ms,send_buf_ms_ajax,send_buf_ms_ws,user_id_fn,csrf_token_fn,handshake_data_fn,packer))
], null);
});

taoensso.sente.make_channel_socket_server_BANG_.cljs$lang$maxFixedArity = (1);

taoensso.sente.make_channel_socket_server_BANG_.cljs$lang$applyTo = (function (seq25331){
var G__25332 = cljs.core.first.call(null,seq25331);
var seq25331__$1 = cljs.core.next.call(null,seq25331);
return taoensso.sente.make_channel_socket_server_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__25332,seq25331__$1);
});

/**
 * Actually pushes buffered events (as packed-str) to all uid's WebSocket conns.
 */
taoensso.sente.send_buffered_server_evs_GT_ws_clients_BANG_ = (function taoensso$sente$send_buffered_server_evs_GT_ws_clients_BANG_(conns_,uid,buffered_evs_pstr,upd_conn_BANG_){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",666,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["send-buffered-server-evs>ws-clients!: %s",buffered_evs_pstr], null);
}),null)),null,-585142872);

var seq__25806 = cljs.core.seq.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,conns_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ws","ws",86841443),uid], null)));
var chunk__25807 = null;
var count__25808 = (0);
var i__25809 = (0);
while(true){
if((i__25809 < count__25808)){
var vec__25810 = cljs.core._nth.call(null,chunk__25807,i__25809);
var client_id = cljs.core.nth.call(null,vec__25810,(0),null);
var vec__25813 = cljs.core.nth.call(null,vec__25810,(1),null);
var _QMARK_sch = cljs.core.nth.call(null,vec__25813,(0),null);
var _udt = cljs.core.nth.call(null,vec__25813,(1),null);
var temp__4657__auto___25822 = _QMARK_sch;
if(cljs.core.truth_(temp__4657__auto___25822)){
var sch_25823 = temp__4657__auto___25822;
upd_conn_BANG_.call(null,new cljs.core.Keyword(null,"ws","ws",86841443),uid,client_id);

taoensso.sente.interfaces.sch_send_BANG_.call(null,sch_25823,new cljs.core.Keyword(null,"websocket","websocket",-1714963101),buffered_evs_pstr);
} else {
}

var G__25824 = seq__25806;
var G__25825 = chunk__25807;
var G__25826 = count__25808;
var G__25827 = (i__25809 + (1));
seq__25806 = G__25824;
chunk__25807 = G__25825;
count__25808 = G__25826;
i__25809 = G__25827;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__25806);
if(temp__4657__auto__){
var seq__25806__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25806__$1)){
var c__7058__auto__ = cljs.core.chunk_first.call(null,seq__25806__$1);
var G__25828 = cljs.core.chunk_rest.call(null,seq__25806__$1);
var G__25829 = c__7058__auto__;
var G__25830 = cljs.core.count.call(null,c__7058__auto__);
var G__25831 = (0);
seq__25806 = G__25828;
chunk__25807 = G__25829;
count__25808 = G__25830;
i__25809 = G__25831;
continue;
} else {
var vec__25816 = cljs.core.first.call(null,seq__25806__$1);
var client_id = cljs.core.nth.call(null,vec__25816,(0),null);
var vec__25819 = cljs.core.nth.call(null,vec__25816,(1),null);
var _QMARK_sch = cljs.core.nth.call(null,vec__25819,(0),null);
var _udt = cljs.core.nth.call(null,vec__25819,(1),null);
var temp__4657__auto___25832__$1 = _QMARK_sch;
if(cljs.core.truth_(temp__4657__auto___25832__$1)){
var sch_25833 = temp__4657__auto___25832__$1;
upd_conn_BANG_.call(null,new cljs.core.Keyword(null,"ws","ws",86841443),uid,client_id);

taoensso.sente.interfaces.sch_send_BANG_.call(null,sch_25833,new cljs.core.Keyword(null,"websocket","websocket",-1714963101),buffered_evs_pstr);
} else {
}

var G__25834 = cljs.core.next.call(null,seq__25806__$1);
var G__25835 = null;
var G__25836 = (0);
var G__25837 = (0);
seq__25806 = G__25834;
chunk__25807 = G__25835;
count__25808 = G__25836;
i__25809 = G__25837;
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
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",676,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["send-buffered-server-evs>ajax-clients!: %s",buffered_evs_pstr], null);
}),null)),null,2127366504);

var nmax_attempts = (7);
var ms_base = (90);
var ms_rand = (90);
var client_ids_unsatisfied = cljs.core.keys.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,conns_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ajax","ajax",814345549),uid], null)));
if(cljs.core.empty_QMARK_.call(null,client_ids_unsatisfied)){
return null;
} else {
var c__10224__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function (state_25968){
var state_val_25969 = (state_25968[(1)]);
if((state_val_25969 === (7))){
var inst_25924 = (state_25968[(7)]);
var inst_25930 = (state_25968[(8)]);
var inst_25923 = (state_25968[(9)]);
var inst_25940 = (function (){var n = inst_25923;
var client_ids_satisfied = inst_25924;
var _QMARK_pulled = inst_25930;
return ((function (n,client_ids_satisfied,_QMARK_pulled,inst_25924,inst_25930,inst_25923,state_val_25969,c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function (s,client_id,p__25939){
var vec__25970 = p__25939;
var _QMARK_sch = cljs.core.nth.call(null,vec__25970,(0),null);
var _udt = cljs.core.nth.call(null,vec__25970,(1),null);
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
;})(n,client_ids_satisfied,_QMARK_pulled,inst_25924,inst_25930,inst_25923,state_val_25969,c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
})();
var inst_25941 = cljs.core.PersistentHashSet.EMPTY;
var inst_25942 = cljs.core.reduce_kv.call(null,inst_25940,inst_25941,inst_25930);
var state_25968__$1 = state_25968;
var statearr_25973_26006 = state_25968__$1;
(statearr_25973_26006[(2)] = inst_25942);

(statearr_25973_26006[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (1))){
var inst_25922 = cljs.core.PersistentHashSet.EMPTY;
var inst_25923 = (0);
var inst_25924 = inst_25922;
var state_25968__$1 = (function (){var statearr_25974 = state_25968;
(statearr_25974[(7)] = inst_25924);

(statearr_25974[(9)] = inst_25923);

return statearr_25974;
})();
var statearr_25975_26007 = state_25968__$1;
(statearr_25975_26007[(2)] = null);

(statearr_25975_26007[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (4))){
var state_25968__$1 = state_25968;
var statearr_25976_26008 = state_25968__$1;
(statearr_25976_26008[(2)] = true);

(statearr_25976_26008[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (15))){
var inst_25964 = (state_25968[(2)]);
var state_25968__$1 = state_25968;
var statearr_25977_26009 = state_25968__$1;
(statearr_25977_26009[(2)] = inst_25964);

(statearr_25977_26009[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (13))){
var inst_25955 = cljs.core.rand_int.call(null,ms_rand);
var inst_25956 = (ms_base + inst_25955);
var inst_25957 = cljs.core.async.timeout.call(null,inst_25956);
var state_25968__$1 = state_25968;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25968__$1,(16),inst_25957);
} else {
if((state_val_25969 === (6))){
var inst_25930 = (state_25968[(8)]);
var inst_25937 = (state_25968[(2)]);
var state_25968__$1 = (function (){var statearr_25978 = state_25968;
(statearr_25978[(10)] = inst_25937);

return statearr_25978;
})();
if(cljs.core.truth_(inst_25930)){
var statearr_25979_26010 = state_25968__$1;
(statearr_25979_26010[(1)] = (7));

} else {
var statearr_25980_26011 = state_25968__$1;
(statearr_25980_26011[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (3))){
var inst_25966 = (state_25968[(2)]);
var state_25968__$1 = state_25968;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25968__$1,inst_25966);
} else {
if((state_val_25969 === (12))){
var inst_25953 = (state_25968[(2)]);
var state_25968__$1 = state_25968;
if(cljs.core.truth_(inst_25953)){
var statearr_25981_26012 = state_25968__$1;
(statearr_25981_26012[(1)] = (13));

} else {
var statearr_25982_26013 = state_25968__$1;
(statearr_25982_26013[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (2))){
var inst_25924 = (state_25968[(7)]);
var inst_25930 = (state_25968[(8)]);
var inst_25923 = (state_25968[(9)]);
var inst_25926 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_25927 = [new cljs.core.Keyword(null,"ajax","ajax",814345549),uid];
var inst_25928 = (new cljs.core.PersistentVector(null,2,(5),inst_25926,inst_25927,null));
var inst_25929 = (function (){var n = inst_25923;
var client_ids_satisfied = inst_25924;
return ((function (n,client_ids_satisfied,inst_25924,inst_25930,inst_25923,inst_25926,inst_25927,inst_25928,state_val_25969,c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function (m){
var ks_to_pull = cljs.core.remove.call(null,client_ids_satisfied,cljs.core.keys.call(null,m));
if(cljs.core.empty_QMARK_.call(null,ks_to_pull)){
return taoensso.encore.swapped.call(null,m,null);
} else {
return taoensso.encore.swapped.call(null,cljs.core.reduce.call(null,((function (ks_to_pull,n,client_ids_satisfied,inst_25924,inst_25930,inst_25923,inst_25926,inst_25927,inst_25928,state_val_25969,c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function (m__$1,k){
var vec__25983 = cljs.core.get.call(null,m__$1,k);
var _QMARK_sch = cljs.core.nth.call(null,vec__25983,(0),null);
var udt = cljs.core.nth.call(null,vec__25983,(1),null);
return cljs.core.assoc.call(null,m__$1,k,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,udt], null));
});})(ks_to_pull,n,client_ids_satisfied,inst_25924,inst_25930,inst_25923,inst_25926,inst_25927,inst_25928,state_val_25969,c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
,m,ks_to_pull),cljs.core.select_keys.call(null,m,ks_to_pull));
}
});
;})(n,client_ids_satisfied,inst_25924,inst_25930,inst_25923,inst_25926,inst_25927,inst_25928,state_val_25969,c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
})();
var inst_25930__$1 = taoensso.encore.swap_in_BANG_.call(null,conns_,inst_25928,inst_25929);
var inst_25931 = (function (){var n = inst_25923;
var client_ids_satisfied = inst_25924;
var _QMARK_pulled = inst_25930__$1;
return ((function (n,client_ids_satisfied,_QMARK_pulled,inst_25924,inst_25930,inst_25923,inst_25926,inst_25927,inst_25928,inst_25929,inst_25930__$1,state_val_25969,c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function (x){
var or__6247__auto__ = taoensso.truss.impl.non_throwing.call(null,cljs.core.nil_QMARK_).call(null,x);
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
return taoensso.truss.impl.non_throwing.call(null,cljs.core.map_QMARK_).call(null,x);
}
});
;})(n,client_ids_satisfied,_QMARK_pulled,inst_25924,inst_25930,inst_25923,inst_25926,inst_25927,inst_25928,inst_25929,inst_25930__$1,state_val_25969,c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
})();
var inst_25932 = inst_25931.call(null,inst_25930__$1);
var state_25968__$1 = (function (){var statearr_25986 = state_25968;
(statearr_25986[(8)] = inst_25930__$1);

return statearr_25986;
})();
if(cljs.core.truth_(inst_25932)){
var statearr_25987_26014 = state_25968__$1;
(statearr_25987_26014[(1)] = (4));

} else {
var statearr_25988_26015 = state_25968__$1;
(statearr_25988_26015[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (11))){
var inst_25947 = (state_25968[(11)]);
var state_25968__$1 = state_25968;
var statearr_25989_26016 = state_25968__$1;
(statearr_25989_26016[(2)] = inst_25947);

(statearr_25989_26016[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (9))){
var inst_25947 = (state_25968[(11)]);
var inst_25924 = (state_25968[(7)]);
var inst_25923 = (state_25968[(9)]);
var inst_25945 = (state_25968[(2)]);
var inst_25946 = cljs.core.into.call(null,inst_25924,inst_25945);
var inst_25947__$1 = (inst_25923 < nmax_attempts);
var state_25968__$1 = (function (){var statearr_25990 = state_25968;
(statearr_25990[(11)] = inst_25947__$1);

(statearr_25990[(12)] = inst_25946);

return statearr_25990;
})();
if(cljs.core.truth_(inst_25947__$1)){
var statearr_25991_26017 = state_25968__$1;
(statearr_25991_26017[(1)] = (10));

} else {
var statearr_25992_26018 = state_25968__$1;
(statearr_25992_26018[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (5))){
var inst_25930 = (state_25968[(8)]);
var inst_25935 = taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"([:or nil? map?] ?pulled)",inst_25930,null,null);
var state_25968__$1 = state_25968;
var statearr_25993_26019 = state_25968__$1;
(statearr_25993_26019[(2)] = inst_25935);

(statearr_25993_26019[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (14))){
var state_25968__$1 = state_25968;
var statearr_25994_26020 = state_25968__$1;
(statearr_25994_26020[(2)] = null);

(statearr_25994_26020[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (16))){
var inst_25946 = (state_25968[(12)]);
var inst_25923 = (state_25968[(9)]);
var inst_25959 = (state_25968[(2)]);
var inst_25960 = (inst_25923 + (1));
var inst_25923__$1 = inst_25960;
var inst_25924 = inst_25946;
var state_25968__$1 = (function (){var statearr_25995 = state_25968;
(statearr_25995[(13)] = inst_25959);

(statearr_25995[(7)] = inst_25924);

(statearr_25995[(9)] = inst_25923__$1);

return statearr_25995;
})();
var statearr_25996_26021 = state_25968__$1;
(statearr_25996_26021[(2)] = null);

(statearr_25996_26021[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (10))){
var inst_25946 = (state_25968[(12)]);
var inst_25949 = cljs.core.complement.call(null,inst_25946);
var inst_25950 = cljs.core.some.call(null,inst_25949,client_ids_unsatisfied);
var state_25968__$1 = state_25968;
var statearr_25997_26022 = state_25968__$1;
(statearr_25997_26022[(2)] = inst_25950);

(statearr_25997_26022[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25969 === (8))){
var state_25968__$1 = state_25968;
var statearr_25998_26023 = state_25968__$1;
(statearr_25998_26023[(2)] = null);

(statearr_25998_26023[(1)] = (9));


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
});})(c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
;
return ((function (switch__10112__auto__,c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied){
return (function() {
var taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__10113__auto__ = null;
var taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__10113__auto____0 = (function (){
var statearr_26002 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26002[(0)] = taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__10113__auto__);

(statearr_26002[(1)] = (1));

return statearr_26002;
});
var taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__10113__auto____1 = (function (state_25968){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_25968);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e26003){if((e26003 instanceof Object)){
var ex__10116__auto__ = e26003;
var statearr_26004_26024 = state_25968;
(statearr_26004_26024[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25968);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26003;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26025 = state_25968;
state_25968 = G__26025;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__10113__auto__ = function(state_25968){
switch(arguments.length){
case 0:
return taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__10113__auto____0.call(this);
case 1:
return taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__10113__auto____1.call(this,state_25968);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__10113__auto____0;
taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__10113__auto____1;
return taoensso$sente$send_buffered_server_evs_GT_ajax_clients_BANG__$_state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
})();
var state__10226__auto__ = (function (){var statearr_26005 = f__10225__auto__.call(null);
(statearr_26005[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto__);

return statearr_26005;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto__,nmax_attempts,ms_base,ms_rand,client_ids_unsatisfied))
);

return c__10224__auto__;
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
var x__6910__auto__ = (((chsk == null))?null:chsk);
var m__6911__auto__ = (taoensso.sente._chsk_connect_BANG_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,chsk);
} else {
var m__6911__auto____$1 = (taoensso.sente._chsk_connect_BANG_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,chsk);
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
var x__6910__auto__ = (((chsk == null))?null:chsk);
var m__6911__auto__ = (taoensso.sente._chsk_disconnect_BANG_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,chsk,reconn_QMARK_);
} else {
var m__6911__auto____$1 = (taoensso.sente._chsk_disconnect_BANG_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,chsk,reconn_QMARK_);
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
var x__6910__auto__ = (((chsk == null))?null:chsk);
var m__6911__auto__ = (taoensso.sente._chsk_reconnect_BANG_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,chsk);
} else {
var m__6911__auto____$1 = (taoensso.sente._chsk_reconnect_BANG_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,chsk);
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
var x__6910__auto__ = (((chsk == null))?null:chsk);
var m__6911__auto__ = (taoensso.sente._chsk_send_BANG_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,chsk,ev,opts);
} else {
var m__6911__auto____$1 = (taoensso.sente._chsk_send_BANG_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,chsk,ev,opts);
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
var args26026 = [];
var len__7322__auto___26029 = arguments.length;
var i__7323__auto___26030 = (0);
while(true){
if((i__7323__auto___26030 < len__7322__auto___26029)){
args26026.push((arguments[i__7323__auto___26030]));

var G__26031 = (i__7323__auto___26030 + (1));
i__7323__auto___26030 = G__26031;
continue;
} else {
}
break;
}

var G__26028 = args26026.length;
switch (G__26028) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26026.length)].join('')));

}
});

taoensso.sente.chsk_send_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (chsk,ev){
return taoensso.sente.chsk_send_BANG_.call(null,chsk,ev,cljs.core.PersistentArrayMap.EMPTY);
});

taoensso.sente.chsk_send_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (chsk,ev,_QMARK_timeout_ms,_QMARK_cb){
return taoensso.sente.chsk_send_BANG_.call(null,chsk,ev,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406),_QMARK_timeout_ms,new cljs.core.Keyword(null,"cb","cb",589947841),_QMARK_cb], null));
});

taoensso.sente.chsk_send_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (chsk,ev,opts){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",755,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk send: (%s) %s",cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"cb","cb",589947841),cljs.core.boolean$.call(null,new cljs.core.Keyword(null,"cb","cb",589947841).cljs$core$IFn$_invoke$arity$1(opts))),ev], null);
}),null)),null,-366038219);

return taoensso.sente._chsk_send_BANG_.call(null,chsk,ev,opts);
});

taoensso.sente.chsk_send_BANG_.cljs$lang$maxFixedArity = 4;

taoensso.sente.chsk_send__GT_closed_BANG_ = (function taoensso$sente$chsk_send__GT_closed_BANG_(_QMARK_cb_fn){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init1980037513903630905.clj",760,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk send against closed chsk."], null);
}),null)),null,566868513);

if(cljs.core.truth_(_QMARK_cb_fn)){
_QMARK_cb_fn.call(null,new cljs.core.Keyword("chsk","closed","chsk/closed",-922855264));
} else {
}

return false;
});
taoensso.sente.assert_send_args = (function taoensso$sente$assert_send_args(x,_QMARK_timeout_ms,_QMARK_cb){
taoensso.sente.assert_event.call(null,x);

if(cljs.core.truth_((function (){var or__6247__auto__ = ((_QMARK_timeout_ms == null)) && ((_QMARK_cb == null));
if(or__6247__auto__){
return or__6247__auto__;
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
taoensso.sente.merge_GT_chsk_state_BANG_ = (function taoensso$sente$merge_GT_chsk_state_BANG_(p__26033,merge_state){
var map__26039 = p__26033;
var map__26039__$1 = ((((!((map__26039 == null)))?((((map__26039.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26039.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26039):map__26039);
var chsk = map__26039__$1;
var chs = cljs.core.get.call(null,map__26039__$1,new cljs.core.Keyword(null,"chs","chs",376886120));
var state_ = cljs.core.get.call(null,map__26039__$1,new cljs.core.Keyword(null,"state_","state_",957667102));
var vec__26041 = taoensso.encore.swap_in_BANG_.call(null,state_,cljs.core.PersistentVector.EMPTY,((function (map__26039,map__26039__$1,chsk,chs,state_){
return (function (old_state){
var new_state = cljs.core.merge.call(null,old_state,merge_state);
var requested_reconnect_QMARK_ = (function (){var and__6235__auto__ = new cljs.core.Keyword(null,"requested-reconnect-pending?","requested-reconnect-pending?",-299841116).cljs$core$IFn$_invoke$arity$1(old_state);
if(cljs.core.truth_(and__6235__auto__)){
var and__6235__auto____$1 = new cljs.core.Keyword(null,"open?","open?",1238443125).cljs$core$IFn$_invoke$arity$1(new_state);
if(cljs.core.truth_(and__6235__auto____$1)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"open?","open?",1238443125).cljs$core$IFn$_invoke$arity$1(old_state));
} else {
return and__6235__auto____$1;
}
} else {
return and__6235__auto__;
}
})();
var new_state__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"first-open?","first-open?",396686530).cljs$core$IFn$_invoke$arity$1(old_state))?cljs.core.assoc.call(null,new_state,new cljs.core.Keyword(null,"first-open?","first-open?",396686530),false):new_state);
var new_state__$2 = (cljs.core.truth_(requested_reconnect_QMARK_)?cljs.core.assoc.call(null,cljs.core.dissoc.call(null,new_state__$1,new cljs.core.Keyword(null,"requested-reconnect-pending?","requested-reconnect-pending?",-299841116)),new cljs.core.Keyword(null,"requested-reconnect?","requested-reconnect?",-1504983666),true):cljs.core.dissoc.call(null,new_state__$1,new cljs.core.Keyword(null,"requested-reconnect?","requested-reconnect?",-1504983666)));
return taoensso.encore.swapped.call(null,new_state__$2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [old_state,new_state__$2], null));
});})(map__26039,map__26039__$1,chsk,chs,state_))
);
var old_state = cljs.core.nth.call(null,vec__26041,(0),null);
var new_state = cljs.core.nth.call(null,vec__26041,(1),null);
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
var e_26052 = (function (){try{if(taoensso.encore.chan_QMARK_.call(null,_QMARK_cb)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e26048){if((e26048 instanceof Error)){
var e = e26048;
return e;
} else {
throw e26048;

}
}})();
if((e_26052 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(enc/chan? ?cb)",_QMARK_cb,e_26052,null);
}

taoensso.sente.assert_event.call(null,ev);

var vec__26049 = ev;
var ev_id = cljs.core.nth.call(null,vec__26049,(0),null);
var _ = cljs.core.nth.call(null,vec__26049,(1),null);
var cb_ch = _QMARK_cb;
return ((function (vec__26049,ev_id,_,cb_ch){
return (function (reply){
return cljs.core.async.put_BANG_.call(null,cb_ch,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.call(null,[cljs.core.str(taoensso.encore.fq_name.call(null,ev_id)),cljs.core.str(".cb")].join('')),reply], null));
});
;})(vec__26049,ev_id,_,cb_ch))
}
});
taoensso.sente.receive_buffered_evs_BANG_ = (function taoensso$sente$receive_buffered_evs_BANG_(chs,clj){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",834,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["receive-buffered-evs!: %s",clj], null);
}),null)),null,541607327);

var buffered_evs = (function (){var e = (function (){try{if(cljs.core.vector_QMARK_.call(null,clj)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e26064){if((e26064 instanceof Error)){
var e = e26064;
return e;
} else {
throw e26064;

}
}})();
if((e == null)){
return clj;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(vector? clj)",clj,e,null);
}
})();
var seq__26065 = cljs.core.seq.call(null,buffered_evs);
var chunk__26066 = null;
var count__26067 = (0);
var i__26068 = (0);
while(true){
if((i__26068 < count__26067)){
var ev = cljs.core._nth.call(null,chunk__26066,i__26068);
taoensso.sente.assert_event.call(null,ev);

var vec__26069_26075 = ev;
var id_26076 = cljs.core.nth.call(null,vec__26069_26075,(0),null);
if(cljs.core.not_EQ_.call(null,cljs.core.namespace.call(null,id_26076),"chsk")){
} else {
throw (new Error("Assert failed: (not= (namespace id) \"chsk\")"));
}

cljs.core.async.put_BANG_.call(null,new cljs.core.Keyword(null,"<server","<server",-2135373537).cljs$core$IFn$_invoke$arity$1(chs),ev);

var G__26077 = seq__26065;
var G__26078 = chunk__26066;
var G__26079 = count__26067;
var G__26080 = (i__26068 + (1));
seq__26065 = G__26077;
chunk__26066 = G__26078;
count__26067 = G__26079;
i__26068 = G__26080;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__26065);
if(temp__4657__auto__){
var seq__26065__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__26065__$1)){
var c__7058__auto__ = cljs.core.chunk_first.call(null,seq__26065__$1);
var G__26081 = cljs.core.chunk_rest.call(null,seq__26065__$1);
var G__26082 = c__7058__auto__;
var G__26083 = cljs.core.count.call(null,c__7058__auto__);
var G__26084 = (0);
seq__26065 = G__26081;
chunk__26066 = G__26082;
count__26067 = G__26083;
i__26068 = G__26084;
continue;
} else {
var ev = cljs.core.first.call(null,seq__26065__$1);
taoensso.sente.assert_event.call(null,ev);

var vec__26072_26085 = ev;
var id_26086 = cljs.core.nth.call(null,vec__26072_26085,(0),null);
if(cljs.core.not_EQ_.call(null,cljs.core.namespace.call(null,id_26086),"chsk")){
} else {
throw (new Error("Assert failed: (not= (namespace id) \"chsk\")"));
}

cljs.core.async.put_BANG_.call(null,new cljs.core.Keyword(null,"<server","<server",-2135373537).cljs$core$IFn$_invoke$arity$1(chs),ev);

var G__26087 = cljs.core.next.call(null,seq__26065__$1);
var G__26088 = null;
var G__26089 = (0);
var G__26090 = (0);
seq__26065 = G__26087;
chunk__26066 = G__26088;
count__26067 = G__26089;
i__26068 = G__26090;
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
var and__6235__auto__ = cljs.core.vector_QMARK_.call(null,x);
if(and__6235__auto__){
var vec__26100 = x;
var x1 = cljs.core.nth.call(null,vec__26100,(0),null);
return cljs.core._EQ_.call(null,x1,new cljs.core.Keyword("chsk","handshake","chsk/handshake",64910686));
} else {
return and__6235__auto__;
}
});
taoensso.sente.receive_handshake_BANG_ = (function taoensso$sente$receive_handshake_BANG_(chsk_type,chsk,clj){
var e_26123 = (function (){try{if((function (x){
return cljs.core.contains_QMARK_.call(null,taoensso.truss.impl.set_STAR_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ws","ws",86841443),null,new cljs.core.Keyword(null,"ajax","ajax",814345549),null], null), null)),x);
}).call(null,chsk_type)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e26113){if((e26113 instanceof Error)){
var e = e26113;
return e;
} else {
throw e26113;

}
}})();
if((e_26123 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"([:el #{:ws :ajax}] chsk-type)",chsk_type,e_26123,null);
}

var e_26124 = (function (){try{if(cljs.core.truth_(taoensso.sente.handshake_QMARK_.call(null,clj))){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e26114){if((e26114 instanceof Error)){
var e = e26114;
return e;
} else {
throw e26114;

}
}})();
if((e_26124 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(handshake? clj)",clj,e_26124,null);
}

taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",851,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["receive-handshake! (%s): %s",chsk_type,clj], null);
}),null)),null,-1493266206);

var vec__26115 = clj;
var _ = cljs.core.nth.call(null,vec__26115,(0),null);
var vec__26118 = cljs.core.nth.call(null,vec__26115,(1),null);
var _QMARK_uid = cljs.core.nth.call(null,vec__26118,(0),null);
var _QMARK_csrf_token = cljs.core.nth.call(null,vec__26118,(1),null);
var _QMARK_handshake_data = cljs.core.nth.call(null,vec__26118,(2),null);
var map__26121 = chsk;
var map__26121__$1 = ((((!((map__26121 == null)))?((((map__26121.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26121.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26121):map__26121);
var chs = cljs.core.get.call(null,map__26121__$1,new cljs.core.Keyword(null,"chs","chs",376886120));
var ever_opened_QMARK__ = cljs.core.get.call(null,map__26121__$1,new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913));
var first_handshake_QMARK_ = cljs.core.compare_and_set_BANG_.call(null,ever_opened_QMARK__,false,true);
var new_state = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"type","type",1174270348),chsk_type,new cljs.core.Keyword(null,"open?","open?",1238443125),true,new cljs.core.Keyword(null,"ever-opened?","ever-opened?",1128459732),true,new cljs.core.Keyword(null,"uid","uid",-1447769400),_QMARK_uid,new cljs.core.Keyword(null,"csrf-token","csrf-token",-1872302856),_QMARK_csrf_token,new cljs.core.Keyword(null,"handshake-data","handshake-data",-278378864),_QMARK_handshake_data,new cljs.core.Keyword(null,"first-open?","first-open?",396686530),first_handshake_QMARK_], null);
var handshake_ev = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","handshake","chsk/handshake",64910686),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [_QMARK_uid,_QMARK_csrf_token,_QMARK_handshake_data,first_handshake_QMARK_], null)], null);
taoensso.sente.assert_event.call(null,handshake_ev);

if(clojure.string.blank_QMARK_.call(null,_QMARK_csrf_token)){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init1980037513903630905.clj",870,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__26115,_,vec__26118,_QMARK_uid,_QMARK_csrf_token,_QMARK_handshake_data,map__26121,map__26121__$1,chs,ever_opened_QMARK__,first_handshake_QMARK_,new_state,handshake_ev){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["SECURITY WARNING: no CSRF token available for use by Sente"], null);
});})(vec__26115,_,vec__26118,_QMARK_uid,_QMARK_csrf_token,_QMARK_handshake_data,map__26121,map__26121__$1,chs,ever_opened_QMARK__,first_handshake_QMARK_,new_state,handshake_ev))
,null)),null,119472506);
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
taoensso.sente.ChWebSocket.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__6869__auto__,k__6870__auto__){
var self__ = this;
var this__6869__auto____$1 = this;
return cljs.core._lookup.call(null,this__6869__auto____$1,k__6870__auto__,null);
});

taoensso.sente.ChWebSocket.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__6871__auto__,k26126,else__6872__auto__){
var self__ = this;
var this__6871__auto____$1 = this;
var G__26128 = (((k26126 instanceof cljs.core.Keyword))?k26126.fqn:null);
switch (G__26128) {
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
return cljs.core.get.call(null,self__.__extmap,k26126,else__6872__auto__);

}
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__6883__auto__,writer__6884__auto__,opts__6885__auto__){
var self__ = this;
var this__6883__auto____$1 = this;
var pr_pair__6886__auto__ = ((function (this__6883__auto____$1){
return (function (keyval__6887__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__6884__auto__,cljs.core.pr_writer,""," ","",opts__6885__auto__,keyval__6887__auto__);
});})(this__6883__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__6884__auto__,pr_pair__6886__auto__,"#taoensso.sente.ChWebSocket{",", ","}",opts__6885__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"chs","chs",376886120),self__.chs],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"params","params",710516235),self__.params],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"packer","packer",66077544),self__.packer],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"url","url",276297046),self__.url],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),self__.active_retry_id_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),self__.retry_count_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),self__.ever_opened_QMARK__],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),self__.backoff_ms_fn],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),self__.cbs_waiting_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"socket_","socket_",-361048908),self__.socket_],null))], null),self__.__extmap));
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IIterable$ = true;

taoensso.sente.ChWebSocket.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__26125){
var self__ = this;
var G__26125__$1 = this;
return (new cljs.core.RecordIter((0),G__26125__$1,12,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"client-id","client-id",-464622140),new cljs.core.Keyword(null,"chs","chs",376886120),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.Keyword(null,"packer","packer",66077544),new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"state_","state_",957667102),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),new cljs.core.Keyword(null,"socket_","socket_",-361048908)], null),cljs.core._iterator.call(null,self__.__extmap)));
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__6867__auto__){
var self__ = this;
var this__6867__auto____$1 = this;
return self__.__meta;
});

taoensso.sente.ChWebSocket.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__6863__auto__){
var self__ = this;
var this__6863__auto____$1 = this;
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,self__.__hash));
});

taoensso.sente.ChWebSocket.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__6873__auto__){
var self__ = this;
var this__6873__auto____$1 = this;
return (12 + cljs.core.count.call(null,self__.__extmap));
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__6864__auto__){
var self__ = this;
var this__6864__auto____$1 = this;
var h__6682__auto__ = self__.__hash;
if(!((h__6682__auto__ == null))){
return h__6682__auto__;
} else {
var h__6682__auto____$1 = cljs.core.hash_imap.call(null,this__6864__auto____$1);
self__.__hash = h__6682__auto____$1;

return h__6682__auto____$1;
}
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__6865__auto__,other__6866__auto__){
var self__ = this;
var this__6865__auto____$1 = this;
if(cljs.core.truth_((function (){var and__6235__auto__ = other__6866__auto__;
if(cljs.core.truth_(and__6235__auto__)){
var and__6235__auto____$1 = (this__6865__auto____$1.constructor === other__6866__auto__.constructor);
if(and__6235__auto____$1){
return cljs.core.equiv_map.call(null,this__6865__auto____$1,other__6866__auto__);
} else {
return and__6235__auto____$1;
}
} else {
return and__6235__auto__;
}
})())){
return true;
} else {
return false;
}
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__6878__auto__,k__6879__auto__){
var self__ = this;
var this__6878__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 12, [new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),null,new cljs.core.Keyword(null,"client-id","client-id",-464622140),null,new cljs.core.Keyword(null,"packer","packer",66077544),null,new cljs.core.Keyword(null,"chs","chs",376886120),null,new cljs.core.Keyword(null,"params","params",710516235),null,new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),null,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),null,new cljs.core.Keyword(null,"socket_","socket_",-361048908),null,new cljs.core.Keyword(null,"url","url",276297046),null,new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),null,new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),null,new cljs.core.Keyword(null,"state_","state_",957667102),null], null), null),k__6879__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__6878__auto____$1),self__.__meta),k__6879__auto__);
} else {
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__6879__auto__)),null));
}
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__6876__auto__,k__6877__auto__,G__26125){
var self__ = this;
var this__6876__auto____$1 = this;
var pred__26129 = cljs.core.keyword_identical_QMARK_;
var expr__26130 = k__6877__auto__;
if(cljs.core.truth_(pred__26129.call(null,new cljs.core.Keyword(null,"client-id","client-id",-464622140),expr__26130))){
return (new taoensso.sente.ChWebSocket(G__26125,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26129.call(null,new cljs.core.Keyword(null,"chs","chs",376886120),expr__26130))){
return (new taoensso.sente.ChWebSocket(self__.client_id,G__26125,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26129.call(null,new cljs.core.Keyword(null,"params","params",710516235),expr__26130))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,G__26125,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26129.call(null,new cljs.core.Keyword(null,"packer","packer",66077544),expr__26130))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,G__26125,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26129.call(null,new cljs.core.Keyword(null,"url","url",276297046),expr__26130))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,G__26125,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26129.call(null,new cljs.core.Keyword(null,"state_","state_",957667102),expr__26130))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,G__26125,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26129.call(null,new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),expr__26130))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,G__26125,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26129.call(null,new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),expr__26130))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,G__26125,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26129.call(null,new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),expr__26130))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,G__26125,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26129.call(null,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),expr__26130))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,G__26125,self__.cbs_waiting_,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26129.call(null,new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),expr__26130))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,G__26125,self__.socket_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26129.call(null,new cljs.core.Keyword(null,"socket_","socket_",-361048908),expr__26130))){
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,G__26125,self__.__meta,self__.__extmap,null));
} else {
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__6877__auto__,G__26125),null));
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

taoensso.sente.ChWebSocket.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__6881__auto__){
var self__ = this;
var this__6881__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"chs","chs",376886120),self__.chs],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"params","params",710516235),self__.params],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"packer","packer",66077544),self__.packer],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"url","url",276297046),self__.url],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),self__.active_retry_id_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),self__.retry_count_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),self__.ever_opened_QMARK__],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),self__.backoff_ms_fn],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),self__.cbs_waiting_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"socket_","socket_",-361048908),self__.socket_],null))], null),self__.__extmap));
});

taoensso.sente.ChWebSocket.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__6868__auto__,G__26125){
var self__ = this;
var this__6868__auto____$1 = this;
return (new taoensso.sente.ChWebSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.retry_count_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.cbs_waiting_,self__.socket_,G__26125,self__.__extmap,self__.__hash));
});

taoensso.sente.ChWebSocket.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__6874__auto__,entry__6875__auto__){
var self__ = this;
var this__6874__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__6875__auto__)){
return cljs.core._assoc.call(null,this__6874__auto____$1,cljs.core._nth.call(null,entry__6875__auto__,(0)),cljs.core._nth.call(null,entry__6875__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__6874__auto____$1,entry__6875__auto__);
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
var map__26132 = opts;
var map__26132__$1 = ((((!((map__26132 == null)))?((((map__26132.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26132.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26132):map__26132);
var _QMARK_timeout_ms = cljs.core.get.call(null,map__26132__$1,new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406));
var _QMARK_cb = cljs.core.get.call(null,map__26132__$1,new cljs.core.Keyword(null,"cb","cb",589947841));
var flush_QMARK_ = cljs.core.get.call(null,map__26132__$1,new cljs.core.Keyword(null,"flush?","flush?",-108887231));
var _ = taoensso.sente.assert_send_args.call(null,ev,_QMARK_timeout_ms,_QMARK_cb);
var _QMARK_cb_fn = taoensso.sente.cb_chan_as_fn.call(null,_QMARK_cb,ev);
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"open?","open?",1238443125).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,self__.state_)))){
return taoensso.sente.chsk_send__GT_closed_BANG_.call(null,_QMARK_cb_fn);
} else {
var _QMARK_cb_uuid = (cljs.core.truth_(_QMARK_cb_fn)?taoensso.encore.uuid_str.call(null,(6)):null);
var ppstr = taoensso.sente.pack.call(null,self__.packer,cljs.core.meta.call(null,ev),ev,_QMARK_cb_uuid);
var temp__4657__auto___26174 = _QMARK_cb_uuid;
if(cljs.core.truth_(temp__4657__auto___26174)){
var cb_uuid_26175 = temp__4657__auto___26174;
taoensso.encore.reset_in_BANG_.call(null,self__.cbs_waiting_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cb_uuid_26175], null),(function (){var e = (function (){try{if(cljs.core.truth_(taoensso.truss.impl.nnil_QMARK_.call(null,_QMARK_cb_fn))){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e26134){if((e26134 instanceof Error)){
var e = e26134;
return e;
} else {
throw e26134;

}
}})();
if((e == null)){
return _QMARK_cb_fn;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(taoensso.truss.impl/nnil? ?cb-fn)",_QMARK_cb_fn,e,null);
}
})());

var temp__4657__auto___26176__$1 = _QMARK_timeout_ms;
if(cljs.core.truth_(temp__4657__auto___26176__$1)){
var timeout_ms_26177 = temp__4657__auto___26176__$1;
var c__10224__auto___26178 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___26178,timeout_ms_26177,temp__4657__auto___26176__$1,cb_uuid_26175,temp__4657__auto___26174,_QMARK_cb_uuid,ppstr,map__26132,map__26132__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___26178,timeout_ms_26177,temp__4657__auto___26176__$1,cb_uuid_26175,temp__4657__auto___26174,_QMARK_cb_uuid,ppstr,map__26132,map__26132__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1){
return (function (state_26145){
var state_val_26146 = (state_26145[(1)]);
if((state_val_26146 === (1))){
var inst_26135 = cljs.core.async.timeout.call(null,timeout_ms_26177);
var state_26145__$1 = state_26145;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26145__$1,(2),inst_26135);
} else {
if((state_val_26146 === (2))){
var inst_26138 = (state_26145[(7)]);
var inst_26137 = (state_26145[(2)]);
var inst_26138__$1 = taoensso.sente.pull_unused_cb_fn_BANG_.call(null,self__.cbs_waiting_,_QMARK_cb_uuid);
var state_26145__$1 = (function (){var statearr_26147 = state_26145;
(statearr_26147[(7)] = inst_26138__$1);

(statearr_26147[(8)] = inst_26137);

return statearr_26147;
})();
if(cljs.core.truth_(inst_26138__$1)){
var statearr_26148_26179 = state_26145__$1;
(statearr_26148_26179[(1)] = (3));

} else {
var statearr_26149_26180 = state_26145__$1;
(statearr_26149_26180[(1)] = (4));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26146 === (3))){
var inst_26138 = (state_26145[(7)]);
var inst_26140 = inst_26138.call(null,new cljs.core.Keyword("chsk","timeout","chsk/timeout",-319776489));
var state_26145__$1 = state_26145;
var statearr_26150_26181 = state_26145__$1;
(statearr_26150_26181[(2)] = inst_26140);

(statearr_26150_26181[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26146 === (4))){
var state_26145__$1 = state_26145;
var statearr_26151_26182 = state_26145__$1;
(statearr_26151_26182[(2)] = null);

(statearr_26151_26182[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26146 === (5))){
var inst_26143 = (state_26145[(2)]);
var state_26145__$1 = state_26145;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26145__$1,inst_26143);
} else {
return null;
}
}
}
}
}
});})(c__10224__auto___26178,timeout_ms_26177,temp__4657__auto___26176__$1,cb_uuid_26175,temp__4657__auto___26174,_QMARK_cb_uuid,ppstr,map__26132,map__26132__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1))
;
return ((function (switch__10112__auto__,c__10224__auto___26178,timeout_ms_26177,temp__4657__auto___26176__$1,cb_uuid_26175,temp__4657__auto___26174,_QMARK_cb_uuid,ppstr,map__26132,map__26132__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1){
return (function() {
var taoensso$sente$state_machine__10113__auto__ = null;
var taoensso$sente$state_machine__10113__auto____0 = (function (){
var statearr_26155 = [null,null,null,null,null,null,null,null,null];
(statearr_26155[(0)] = taoensso$sente$state_machine__10113__auto__);

(statearr_26155[(1)] = (1));

return statearr_26155;
});
var taoensso$sente$state_machine__10113__auto____1 = (function (state_26145){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_26145);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e26156){if((e26156 instanceof Object)){
var ex__10116__auto__ = e26156;
var statearr_26157_26183 = state_26145;
(statearr_26157_26183[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26145);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26156;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26184 = state_26145;
state_26145 = G__26184;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
taoensso$sente$state_machine__10113__auto__ = function(state_26145){
switch(arguments.length){
case 0:
return taoensso$sente$state_machine__10113__auto____0.call(this);
case 1:
return taoensso$sente$state_machine__10113__auto____1.call(this,state_26145);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$state_machine__10113__auto____0;
taoensso$sente$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$state_machine__10113__auto____1;
return taoensso$sente$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___26178,timeout_ms_26177,temp__4657__auto___26176__$1,cb_uuid_26175,temp__4657__auto___26174,_QMARK_cb_uuid,ppstr,map__26132,map__26132__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1))
})();
var state__10226__auto__ = (function (){var statearr_26158 = f__10225__auto__.call(null);
(statearr_26158[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___26178);

return statearr_26158;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___26178,timeout_ms_26177,temp__4657__auto___26176__$1,cb_uuid_26175,temp__4657__auto___26174,_QMARK_cb_uuid,ppstr,map__26132,map__26132__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1))
);

} else {
}
} else {
}

try{cljs.core.deref.call(null,self__.socket_).send(ppstr);

return new cljs.core.Keyword(null,"apparent-success","apparent-success",242592222);
}catch (e26159){if((e26159 instanceof Error)){
var e = e26159;
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init1980037513903630905.clj",923,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (e,_QMARK_cb_uuid,ppstr,map__26132,map__26132__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"Chsk send error"], null);
});})(e,_QMARK_cb_uuid,ppstr,map__26132,map__26132__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1))
,null)),null,1886158399);

var temp__4657__auto___26185 = _QMARK_cb_uuid;
if(cljs.core.truth_(temp__4657__auto___26185)){
var cb_uuid_26186 = temp__4657__auto___26185;
var cb_fn_STAR__26187 = (function (){var or__6247__auto__ = taoensso.sente.pull_unused_cb_fn_BANG_.call(null,self__.cbs_waiting_,cb_uuid_26186);
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
var e__$1 = (function (){try{if(cljs.core.truth_(taoensso.truss.impl.nnil_QMARK_.call(null,_QMARK_cb_fn))){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e26160){if((e26160 instanceof Error)){
var e__$1 = e26160;
return e__$1;
} else {
throw e26160;

}
}})();
if((e__$1 == null)){
return _QMARK_cb_fn;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(taoensso.truss.impl/nnil? ?cb-fn)",_QMARK_cb_fn,e__$1,null);
}
}
})();
cb_fn_STAR__26187.call(null,new cljs.core.Keyword("chsk","error","chsk/error",-984175439));
} else {
}

return false;
} else {
throw e26159;

}
}}
});

taoensso.sente.ChWebSocket.prototype.taoensso$sente$IChSocket$_chsk_connect_BANG_$arity$1 = (function (chsk){
var self__ = this;
var chsk__$1 = this;
var temp__4657__auto__ = (function (){var or__6247__auto__ = taoensso.encore.oget.call(null,window,"WebSocket");
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
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
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init1980037513903630905.clj",941,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (retry_count_STAR_,backoff_ms,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk is closed: will try reconnect (%s)",retry_count_STAR_], null);
});})(retry_count_STAR_,backoff_ms,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
,null)),null,-21933646);

return window.setTimeout(taoensso$sente$connect_fn,backoff_ms);
} else {
return null;
}
});})(retry_id,WebSocket,temp__4657__auto__,chsk__$1))
;
var _QMARK_socket = (function (){try{return (new WebSocket(taoensso.encore.merge_url_with_query_string.call(null,self__.url,cljs.core.merge.call(null,self__.params,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id], null)))));
}catch (e26167){if((e26167 instanceof Error)){
var e = e26167;
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init1980037513903630905.clj",951,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (e,retry_fn,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"WebSocket js/Error"], null);
});})(e,retry_fn,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
,null)),null,1016998626);

return null;
} else {
throw e26167;

}
}})();
if(cljs.core.not.call(null,_QMARK_socket)){
return retry_fn.call(null);
} else {
return cljs.core.reset_BANG_.call(null,self__.socket_,(function (){var G__26168 = _QMARK_socket;
(G__26168["onerror"] = ((function (G__26168,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (ws_ev){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init1980037513903630905.clj",961,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (G__26168,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["WebSocket error: %s",(function (){try{return cljs.core.js__GT_clj.call(null,ws_ev);
}catch (e26169){var _ = e26169;
return ws_ev;
}})()], null);
});})(G__26168,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
,null)),null,1251413331);

var last_ws_error = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"uuid","uuid",-2145095719),taoensso.encore.uuid_str.call(null),new cljs.core.Keyword(null,"ev","ev",-406827324),ws_ev], null);
return taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"last-ws-error","last-ws-error",-820288502),last_ws_error], null));
});})(G__26168,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
);

(G__26168["onmessage"] = ((function (G__26168,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (ws_ev){
var ppstr = taoensso.encore.oget.call(null,ws_ev,"data");
var vec__26170 = taoensso.sente.unpack.call(null,self__.packer,ppstr);
var clj = cljs.core.nth.call(null,vec__26170,(0),null);
var _QMARK_cb_uuid = cljs.core.nth.call(null,vec__26170,(1),null);
var or__6247__auto__ = (cljs.core.truth_(taoensso.sente.handshake_QMARK_.call(null,clj))?(function (){
taoensso.sente.receive_handshake_BANG_.call(null,new cljs.core.Keyword(null,"ws","ws",86841443),chsk__$1,clj);

return cljs.core.reset_BANG_.call(null,self__.retry_count_,(0));
})()
:null);
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
var or__6247__auto____$1 = ((cljs.core._EQ_.call(null,clj,new cljs.core.Keyword("chsk","ws-ping","chsk/ws-ping",191675304)))?(function (){
if(cljs.core.truth_(cljs.core.deref.call(null,taoensso.sente.debug_mode_QMARK__))){
taoensso.sente.receive_buffered_evs_BANG_.call(null,self__.chs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("debug","ws-ping","debug/ws-ping",-168903566)], null)], null));
} else {
}

return new cljs.core.Keyword(null,"noop","noop",-673731258);
})()
:null);
if(cljs.core.truth_(or__6247__auto____$1)){
return or__6247__auto____$1;
} else {
var temp__4655__auto__ = _QMARK_cb_uuid;
if(cljs.core.truth_(temp__4655__auto__)){
var cb_uuid = temp__4655__auto__;
var temp__4655__auto____$1 = taoensso.sente.pull_unused_cb_fn_BANG_.call(null,self__.cbs_waiting_,cb_uuid);
if(cljs.core.truth_(temp__4655__auto____$1)){
var cb_fn = temp__4655__auto____$1;
return cb_fn.call(null,clj);
} else {
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init1980037513903630905.clj",998,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (temp__4655__auto____$1,cb_uuid,temp__4655__auto__,or__6247__auto____$1,or__6247__auto__,ppstr,vec__26170,clj,_QMARK_cb_uuid,G__26168,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cb reply w/o local cb-fn: %s",clj], null);
});})(temp__4655__auto____$1,cb_uuid,temp__4655__auto__,or__6247__auto____$1,or__6247__auto__,ppstr,vec__26170,clj,_QMARK_cb_uuid,G__26168,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
,null)),null,-205157405);
}
} else {
var buffered_evs = clj;
return taoensso.sente.receive_buffered_evs_BANG_.call(null,self__.chs,buffered_evs);
}
}
}
});})(G__26168,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
);

(G__26168["onclose"] = ((function (G__26168,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (ws_ev){
var clean_QMARK_ = taoensso.encore.oget.call(null,ws_ev,"wasClean");
var code = taoensso.encore.oget.call(null,ws_ev,"code");
var reason = taoensso.encore.oget.call(null,ws_ev,"reason");
var last_ws_close = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"uuid","uuid",-2145095719),taoensso.encore.uuid_str.call(null),new cljs.core.Keyword(null,"ev","ev",-406827324),ws_ev,new cljs.core.Keyword(null,"clean?","clean?",-1675631009),clean_QMARK_,new cljs.core.Keyword(null,"code","code",1586293142),code,new cljs.core.Keyword(null,"reason","reason",-2070751759),reason], null);
if(cljs.core.truth_(clean_QMARK_)){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"taoensso.sente","/tmp/form-init1980037513903630905.clj",1026,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (clean_QMARK_,code,reason,last_ws_close,G__26168,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Clean WebSocket close, will not attempt reconnect"], null);
});})(clean_QMARK_,code,reason,last_ws_close,G__26168,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
,null)),null,-1582164231);

return taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"last-ws-close","last-ws-close",-798104932),last_ws_close], null));
} else {
taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"last-ws-close","last-ws-close",-798104932),last_ws_close,new cljs.core.Keyword(null,"open?","open?",1238443125),false], null));

return retry_fn.call(null);
}
});})(G__26168,retry_fn,_QMARK_socket,retry_id,WebSocket,temp__4657__auto__,chsk__$1))
);

return G__26168;
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

taoensso.sente.ChWebSocket.cljs$lang$ctorPrSeq = (function (this__6903__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"taoensso.sente/ChWebSocket");
});

taoensso.sente.ChWebSocket.cljs$lang$ctorPrWriter = (function (this__6903__auto__,writer__6904__auto__){
return cljs.core._write.call(null,writer__6904__auto__,"taoensso.sente/ChWebSocket");
});

taoensso.sente.__GT_ChWebSocket = (function taoensso$sente$__GT_ChWebSocket(client_id,chs,params,packer,url,state_,active_retry_id_,retry_count_,ever_opened_QMARK__,backoff_ms_fn,cbs_waiting_,socket_){
return (new taoensso.sente.ChWebSocket(client_id,chs,params,packer,url,state_,active_retry_id_,retry_count_,ever_opened_QMARK__,backoff_ms_fn,cbs_waiting_,socket_,null,null,null));
});

taoensso.sente.map__GT_ChWebSocket = (function taoensso$sente$map__GT_ChWebSocket(G__26127){
return (new taoensso.sente.ChWebSocket(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(G__26127),new cljs.core.Keyword(null,"chs","chs",376886120).cljs$core$IFn$_invoke$arity$1(G__26127),new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(G__26127),new cljs.core.Keyword(null,"packer","packer",66077544).cljs$core$IFn$_invoke$arity$1(G__26127),new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(G__26127),new cljs.core.Keyword(null,"state_","state_",957667102).cljs$core$IFn$_invoke$arity$1(G__26127),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114).cljs$core$IFn$_invoke$arity$1(G__26127),new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093).cljs$core$IFn$_invoke$arity$1(G__26127),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913).cljs$core$IFn$_invoke$arity$1(G__26127),new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955).cljs$core$IFn$_invoke$arity$1(G__26127),new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061).cljs$core$IFn$_invoke$arity$1(G__26127),new cljs.core.Keyword(null,"socket_","socket_",-361048908).cljs$core$IFn$_invoke$arity$1(G__26127),null,cljs.core.dissoc.call(null,G__26127,new cljs.core.Keyword(null,"client-id","client-id",-464622140),new cljs.core.Keyword(null,"chs","chs",376886120),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.Keyword(null,"packer","packer",66077544),new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"state_","state_",957667102),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),new cljs.core.Keyword(null,"retry-count_","retry-count_",20238093),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),new cljs.core.Keyword(null,"cbs-waiting_","cbs-waiting_",-1519029061),new cljs.core.Keyword(null,"socket_","socket_",-361048908)),null));
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
taoensso.sente.ChAjaxSocket.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__6869__auto__,k__6870__auto__){
var self__ = this;
var this__6869__auto____$1 = this;
return cljs.core._lookup.call(null,this__6869__auto____$1,k__6870__auto__,null);
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__6871__auto__,k26189,else__6872__auto__){
var self__ = this;
var this__6871__auto____$1 = this;
var G__26191 = (((k26189 instanceof cljs.core.Keyword))?k26189.fqn:null);
switch (G__26191) {
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
return cljs.core.get.call(null,self__.__extmap,k26189,else__6872__auto__);

}
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__6883__auto__,writer__6884__auto__,opts__6885__auto__){
var self__ = this;
var this__6883__auto____$1 = this;
var pr_pair__6886__auto__ = ((function (this__6883__auto____$1){
return (function (keyval__6887__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__6884__auto__,cljs.core.pr_writer,""," ","",opts__6885__auto__,keyval__6887__auto__);
});})(this__6883__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__6884__auto__,pr_pair__6886__auto__,"#taoensso.sente.ChAjaxSocket{",", ","}",opts__6885__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"chs","chs",376886120),self__.chs],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"params","params",710516235),self__.params],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"packer","packer",66077544),self__.packer],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"url","url",276297046),self__.url],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),self__.active_retry_id_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),self__.ever_opened_QMARK__],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),self__.backoff_ms_fn],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),self__.ajax_opts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696),self__.curr_xhr_],null))], null),self__.__extmap));
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IIterable$ = true;

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__26188){
var self__ = this;
var G__26188__$1 = this;
return (new cljs.core.RecordIter((0),G__26188__$1,11,new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"client-id","client-id",-464622140),new cljs.core.Keyword(null,"chs","chs",376886120),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.Keyword(null,"packer","packer",66077544),new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"state_","state_",957667102),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696)], null),cljs.core._iterator.call(null,self__.__extmap)));
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__6867__auto__){
var self__ = this;
var this__6867__auto____$1 = this;
return self__.__meta;
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__6863__auto__){
var self__ = this;
var this__6863__auto____$1 = this;
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,self__.__hash));
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__6873__auto__){
var self__ = this;
var this__6873__auto____$1 = this;
return (11 + cljs.core.count.call(null,self__.__extmap));
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__6864__auto__){
var self__ = this;
var this__6864__auto____$1 = this;
var h__6682__auto__ = self__.__hash;
if(!((h__6682__auto__ == null))){
return h__6682__auto__;
} else {
var h__6682__auto____$1 = cljs.core.hash_imap.call(null,this__6864__auto____$1);
self__.__hash = h__6682__auto____$1;

return h__6682__auto____$1;
}
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__6865__auto__,other__6866__auto__){
var self__ = this;
var this__6865__auto____$1 = this;
if(cljs.core.truth_((function (){var and__6235__auto__ = other__6866__auto__;
if(cljs.core.truth_(and__6235__auto__)){
var and__6235__auto____$1 = (this__6865__auto____$1.constructor === other__6866__auto__.constructor);
if(and__6235__auto____$1){
return cljs.core.equiv_map.call(null,this__6865__auto____$1,other__6866__auto__);
} else {
return and__6235__auto____$1;
}
} else {
return and__6235__auto__;
}
})())){
return true;
} else {
return false;
}
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__6878__auto__,k__6879__auto__){
var self__ = this;
var this__6878__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696),null,new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),null,new cljs.core.Keyword(null,"client-id","client-id",-464622140),null,new cljs.core.Keyword(null,"packer","packer",66077544),null,new cljs.core.Keyword(null,"chs","chs",376886120),null,new cljs.core.Keyword(null,"params","params",710516235),null,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),null,new cljs.core.Keyword(null,"url","url",276297046),null,new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),null,new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),null,new cljs.core.Keyword(null,"state_","state_",957667102),null], null), null),k__6879__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__6878__auto____$1),self__.__meta),k__6879__auto__);
} else {
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__6879__auto__)),null));
}
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__6876__auto__,k__6877__auto__,G__26188){
var self__ = this;
var this__6876__auto____$1 = this;
var pred__26192 = cljs.core.keyword_identical_QMARK_;
var expr__26193 = k__6877__auto__;
if(cljs.core.truth_(pred__26192.call(null,new cljs.core.Keyword(null,"client-id","client-id",-464622140),expr__26193))){
return (new taoensso.sente.ChAjaxSocket(G__26188,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26192.call(null,new cljs.core.Keyword(null,"chs","chs",376886120),expr__26193))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,G__26188,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26192.call(null,new cljs.core.Keyword(null,"params","params",710516235),expr__26193))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,G__26188,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26192.call(null,new cljs.core.Keyword(null,"packer","packer",66077544),expr__26193))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,G__26188,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26192.call(null,new cljs.core.Keyword(null,"url","url",276297046),expr__26193))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,G__26188,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26192.call(null,new cljs.core.Keyword(null,"state_","state_",957667102),expr__26193))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,G__26188,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26192.call(null,new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),expr__26193))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,G__26188,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26192.call(null,new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),expr__26193))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,G__26188,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26192.call(null,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),expr__26193))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,G__26188,self__.ajax_opts,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26192.call(null,new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),expr__26193))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,G__26188,self__.curr_xhr_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26192.call(null,new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696),expr__26193))){
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,G__26188,self__.__meta,self__.__extmap,null));
} else {
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__6877__auto__,G__26188),null));
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

taoensso.sente.ChAjaxSocket.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__6881__auto__){
var self__ = this;
var this__6881__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"chs","chs",376886120),self__.chs],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"params","params",710516235),self__.params],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"packer","packer",66077544),self__.packer],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"url","url",276297046),self__.url],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),self__.active_retry_id_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),self__.ever_opened_QMARK__],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),self__.backoff_ms_fn],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),self__.ajax_opts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696),self__.curr_xhr_],null))], null),self__.__extmap));
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__6868__auto__,G__26188){
var self__ = this;
var this__6868__auto____$1 = this;
return (new taoensso.sente.ChAjaxSocket(self__.client_id,self__.chs,self__.params,self__.packer,self__.url,self__.state_,self__.active_retry_id_,self__.ever_opened_QMARK__,self__.backoff_ms_fn,self__.ajax_opts,self__.curr_xhr_,G__26188,self__.__extmap,self__.__hash));
});

taoensso.sente.ChAjaxSocket.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__6874__auto__,entry__6875__auto__){
var self__ = this;
var this__6874__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__6875__auto__)){
return cljs.core._assoc.call(null,this__6874__auto____$1,cljs.core._nth.call(null,entry__6875__auto__,(0)),cljs.core._nth.call(null,entry__6875__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__6874__auto____$1,entry__6875__auto__);
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
var map__26195 = opts;
var map__26195__$1 = ((((!((map__26195 == null)))?((((map__26195.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26195.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26195):map__26195);
var _QMARK_timeout_ms = cljs.core.get.call(null,map__26195__$1,new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406));
var _QMARK_cb = cljs.core.get.call(null,map__26195__$1,new cljs.core.Keyword(null,"cb","cb",589947841));
var flush_QMARK_ = cljs.core.get.call(null,map__26195__$1,new cljs.core.Keyword(null,"flush?","flush?",-108887231));
var _ = taoensso.sente.assert_send_args.call(null,ev,_QMARK_timeout_ms,_QMARK_cb);
var _QMARK_cb_fn = taoensso.sente.cb_chan_as_fn.call(null,_QMARK_cb,ev);
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"open?","open?",1238443125).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,self__.state_)))){
return taoensso.sente.chsk_send__GT_closed_BANG_.call(null,_QMARK_cb_fn);
} else {
var csrf_token = new cljs.core.Keyword(null,"csrf-token","csrf-token",-1872302856).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,self__.state_));
taoensso.sente.ajax_lite.call(null,self__.url,cljs.core.merge.call(null,self__.ajax_opts,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406),(function (){var or__6247__auto__ = _QMARK_timeout_ms;
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
var or__6247__auto____$1 = new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406).cljs$core$IFn$_invoke$arity$1(self__.ajax_opts);
if(cljs.core.truth_(or__6247__auto____$1)){
return or__6247__auto____$1;
} else {
return taoensso.sente.default_client_side_ajax_timeout_ms;
}
}
})(),new cljs.core.Keyword(null,"resp-type","resp-type",1050675962),new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.Keyword(null,"headers","headers",-835030129),cljs.core.merge.call(null,new cljs.core.Keyword(null,"headers","headers",-835030129).cljs$core$IFn$_invoke$arity$1(self__.ajax_opts),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"X-CSRF-Token","X-CSRF-Token",1562992453),csrf_token], null)),new cljs.core.Keyword(null,"params","params",710516235),(function (){var ppstr = taoensso.sente.pack.call(null,self__.packer,cljs.core.meta.call(null,ev),ev,(cljs.core.truth_(_QMARK_cb_fn)?new cljs.core.Keyword(null,"ajax-cb","ajax-cb",-807060321):null));
return cljs.core.merge.call(null,self__.params,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"udt","udt",2011712751),taoensso.encore.now_udt.call(null),new cljs.core.Keyword(null,"csrf-token","csrf-token",-1872302856),csrf_token,new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id,new cljs.core.Keyword(null,"ppstr","ppstr",1557495252),ppstr], null));
})()], null)),((function (csrf_token,map__26195,map__26195__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1){
return (function taoensso$sente$ajax_cb(p__26197){
var map__26203 = p__26197;
var map__26203__$1 = ((((!((map__26203 == null)))?((((map__26203.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26203.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26203):map__26203);
var _QMARK_error = cljs.core.get.call(null,map__26203__$1,new cljs.core.Keyword(null,"?error","?error",1070752222));
var _QMARK_content = cljs.core.get.call(null,map__26203__$1,new cljs.core.Keyword(null,"?content","?content",1697782054));
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
var vec__26205 = taoensso.sente.unpack.call(null,self__.packer,resp_ppstr);
var resp_clj = cljs.core.nth.call(null,vec__26205,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__26205,(1),null);
if(cljs.core.truth_(_QMARK_cb_fn)){
_QMARK_cb_fn.call(null,resp_clj);
} else {
if(cljs.core.not_EQ_.call(null,resp_clj,new cljs.core.Keyword("chsk","dummy-cb-200","chsk/dummy-cb-200",-1663130337))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init1980037513903630905.clj",1124,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (content,resp_ppstr,vec__26205,resp_clj,___$1,map__26203,map__26203__$1,_QMARK_error,_QMARK_content,csrf_token,map__26195,map__26195__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Cb reply w/o local cb-fn: %s",resp_clj], null);
});})(content,resp_ppstr,vec__26205,resp_clj,___$1,map__26203,map__26203__$1,_QMARK_error,_QMARK_content,csrf_token,map__26195,map__26195__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1))
,null)),null,-489511223);
} else {
}
}

return taoensso.sente.merge_GT_chsk_state_BANG_.call(null,chsk__$1,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"open?","open?",1238443125),true], null));
}
});})(csrf_token,map__26195,map__26195__$1,_QMARK_timeout_ms,_QMARK_cb,flush_QMARK_,_,_QMARK_cb_fn,chsk__$1))
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
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",1133,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (retry_id,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["async-poll-for-update!"], null);
});})(retry_id,chsk__$1))
,null)),null,1137237927);

var retry_fn = ((function (retry_id,chsk__$1){
return (function (){
if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,self__.active_retry_id_),retry_id)){
var retry_count_STAR_ = (retry_count + (1));
var backoff_ms = self__.backoff_ms_fn.call(null,retry_count_STAR_);
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init1980037513903630905.clj",1139,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (retry_count_STAR_,backoff_ms,retry_id,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Chsk is closed: will try reconnect (%s)",retry_count_STAR_], null);
});})(retry_count_STAR_,backoff_ms,retry_id,chsk__$1))
,null)),null,645933543);

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
return cljs.core.reset_BANG_.call(null,self__.curr_xhr_,taoensso.sente.ajax_lite.call(null,self__.url,cljs.core.merge.call(null,self__.ajax_opts,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"get","get",1683182755),new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406),(function (){var or__6247__auto__ = new cljs.core.Keyword(null,"timeout-ms","timeout-ms",754221406).cljs$core$IFn$_invoke$arity$1(self__.ajax_opts);
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
return taoensso.sente.default_client_side_ajax_timeout_ms;
}
})(),new cljs.core.Keyword(null,"resp-type","resp-type",1050675962),new cljs.core.Keyword(null,"text","text",-1790561697),new cljs.core.Keyword(null,"params","params",710516235),cljs.core.merge.call(null,self__.params,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"udt","udt",2011712751),taoensso.encore.now_udt.call(null),new cljs.core.Keyword(null,"client-id","client-id",-464622140),self__.client_id], null),(cljs.core.truth_(new cljs.core.Keyword(null,"open?","open?",1238443125).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,self__.state_)))?null:new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"handshake?","handshake?",-423743093),true], null)))], null)),((function (retry_fn,retry_id,chsk__$1){
return (function taoensso$sente$poll_fn_$_ajax_cb(p__26219){
var map__26225 = p__26219;
var map__26225__$1 = ((((!((map__26225 == null)))?((((map__26225.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26225.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26225):map__26225);
var _QMARK_error = cljs.core.get.call(null,map__26225__$1,new cljs.core.Keyword(null,"?error","?error",1070752222));
var _QMARK_content = cljs.core.get.call(null,map__26225__$1,new cljs.core.Keyword(null,"?content","?content",1697782054));
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
var vec__26227 = taoensso.sente.unpack.call(null,self__.packer,ppstr);
var clj = cljs.core.nth.call(null,vec__26227,(0),null);
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
var or__6247__auto__ = ((cljs.core._EQ_.call(null,clj,new cljs.core.Keyword("chsk","timeout","chsk/timeout",-319776489)))?(function (){
if(cljs.core.truth_(cljs.core.deref.call(null,taoensso.sente.debug_mode_QMARK__))){
taoensso.sente.receive_buffered_evs_BANG_.call(null,self__.chs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("debug","timeout","debug/timeout",309499949)], null)], null));
} else {
}

return new cljs.core.Keyword(null,"noop","noop",-673731258);
})()
:null);
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
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

taoensso.sente.ChAjaxSocket.cljs$lang$ctorPrSeq = (function (this__6903__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"taoensso.sente/ChAjaxSocket");
});

taoensso.sente.ChAjaxSocket.cljs$lang$ctorPrWriter = (function (this__6903__auto__,writer__6904__auto__){
return cljs.core._write.call(null,writer__6904__auto__,"taoensso.sente/ChAjaxSocket");
});

taoensso.sente.__GT_ChAjaxSocket = (function taoensso$sente$__GT_ChAjaxSocket(client_id,chs,params,packer,url,state_,active_retry_id_,ever_opened_QMARK__,backoff_ms_fn,ajax_opts,curr_xhr_){
return (new taoensso.sente.ChAjaxSocket(client_id,chs,params,packer,url,state_,active_retry_id_,ever_opened_QMARK__,backoff_ms_fn,ajax_opts,curr_xhr_,null,null,null));
});

taoensso.sente.map__GT_ChAjaxSocket = (function taoensso$sente$map__GT_ChAjaxSocket(G__26190){
return (new taoensso.sente.ChAjaxSocket(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(G__26190),new cljs.core.Keyword(null,"chs","chs",376886120).cljs$core$IFn$_invoke$arity$1(G__26190),new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(G__26190),new cljs.core.Keyword(null,"packer","packer",66077544).cljs$core$IFn$_invoke$arity$1(G__26190),new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(G__26190),new cljs.core.Keyword(null,"state_","state_",957667102).cljs$core$IFn$_invoke$arity$1(G__26190),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114).cljs$core$IFn$_invoke$arity$1(G__26190),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913).cljs$core$IFn$_invoke$arity$1(G__26190),new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955).cljs$core$IFn$_invoke$arity$1(G__26190),new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109).cljs$core$IFn$_invoke$arity$1(G__26190),new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696).cljs$core$IFn$_invoke$arity$1(G__26190),null,cljs.core.dissoc.call(null,G__26190,new cljs.core.Keyword(null,"client-id","client-id",-464622140),new cljs.core.Keyword(null,"chs","chs",376886120),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.Keyword(null,"packer","packer",66077544),new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"state_","state_",957667102),new cljs.core.Keyword(null,"active-retry-id_","active-retry-id_",-172239114),new cljs.core.Keyword(null,"ever-opened?_","ever-opened?_",1641338913),new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),new cljs.core.Keyword(null,"curr-xhr_","curr-xhr_",-1318773696)),null));
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
taoensso.sente.ChAutoSocket.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__6869__auto__,k__6870__auto__){
var self__ = this;
var this__6869__auto____$1 = this;
return cljs.core._lookup.call(null,this__6869__auto____$1,k__6870__auto__,null);
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__6871__auto__,k26232,else__6872__auto__){
var self__ = this;
var this__6871__auto____$1 = this;
var G__26234 = (((k26232 instanceof cljs.core.Keyword))?k26232.fqn:null);
switch (G__26234) {
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
return cljs.core.get.call(null,self__.__extmap,k26232,else__6872__auto__);

}
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__6883__auto__,writer__6884__auto__,opts__6885__auto__){
var self__ = this;
var this__6883__auto____$1 = this;
var pr_pair__6886__auto__ = ((function (this__6883__auto____$1){
return (function (keyval__6887__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__6884__auto__,cljs.core.pr_writer,""," ","",opts__6885__auto__,keyval__6887__auto__);
});})(this__6883__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__6884__auto__,pr_pair__6886__auto__,"#taoensso.sente.ChAutoSocket{",", ","}",opts__6885__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),self__.ws_chsk_opts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),self__.ajax_chsk_opts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"impl_","impl_",1218818179),self__.impl_],null))], null),self__.__extmap));
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IIterable$ = true;

taoensso.sente.ChAutoSocket.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__26231){
var self__ = this;
var G__26231__$1 = this;
return (new cljs.core.RecordIter((0),G__26231__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),new cljs.core.Keyword(null,"state_","state_",957667102),new cljs.core.Keyword(null,"impl_","impl_",1218818179)], null),cljs.core._iterator.call(null,self__.__extmap)));
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__6867__auto__){
var self__ = this;
var this__6867__auto____$1 = this;
return self__.__meta;
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__6863__auto__){
var self__ = this;
var this__6863__auto____$1 = this;
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,self__.ajax_chsk_opts,self__.state_,self__.impl_,self__.__meta,self__.__extmap,self__.__hash));
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__6873__auto__){
var self__ = this;
var this__6873__auto____$1 = this;
return (4 + cljs.core.count.call(null,self__.__extmap));
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__6864__auto__){
var self__ = this;
var this__6864__auto____$1 = this;
var h__6682__auto__ = self__.__hash;
if(!((h__6682__auto__ == null))){
return h__6682__auto__;
} else {
var h__6682__auto____$1 = cljs.core.hash_imap.call(null,this__6864__auto____$1);
self__.__hash = h__6682__auto____$1;

return h__6682__auto____$1;
}
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__6865__auto__,other__6866__auto__){
var self__ = this;
var this__6865__auto____$1 = this;
if(cljs.core.truth_((function (){var and__6235__auto__ = other__6866__auto__;
if(cljs.core.truth_(and__6235__auto__)){
var and__6235__auto____$1 = (this__6865__auto____$1.constructor === other__6866__auto__.constructor);
if(and__6235__auto____$1){
return cljs.core.equiv_map.call(null,this__6865__auto____$1,other__6866__auto__);
} else {
return and__6235__auto____$1;
}
} else {
return and__6235__auto__;
}
})())){
return true;
} else {
return false;
}
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__6878__auto__,k__6879__auto__){
var self__ = this;
var this__6878__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"impl_","impl_",1218818179),null,new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),null,new cljs.core.Keyword(null,"state_","state_",957667102),null,new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),null], null), null),k__6879__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__6878__auto____$1),self__.__meta),k__6879__auto__);
} else {
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,self__.ajax_chsk_opts,self__.state_,self__.impl_,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__6879__auto__)),null));
}
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__6876__auto__,k__6877__auto__,G__26231){
var self__ = this;
var this__6876__auto____$1 = this;
var pred__26235 = cljs.core.keyword_identical_QMARK_;
var expr__26236 = k__6877__auto__;
if(cljs.core.truth_(pred__26235.call(null,new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),expr__26236))){
return (new taoensso.sente.ChAutoSocket(G__26231,self__.ajax_chsk_opts,self__.state_,self__.impl_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26235.call(null,new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),expr__26236))){
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,G__26231,self__.state_,self__.impl_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26235.call(null,new cljs.core.Keyword(null,"state_","state_",957667102),expr__26236))){
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,self__.ajax_chsk_opts,G__26231,self__.impl_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__26235.call(null,new cljs.core.Keyword(null,"impl_","impl_",1218818179),expr__26236))){
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,self__.ajax_chsk_opts,self__.state_,G__26231,self__.__meta,self__.__extmap,null));
} else {
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,self__.ajax_chsk_opts,self__.state_,self__.impl_,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__6877__auto__,G__26231),null));
}
}
}
}
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__6881__auto__){
var self__ = this;
var this__6881__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),self__.ws_chsk_opts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),self__.ajax_chsk_opts],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"state_","state_",957667102),self__.state_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"impl_","impl_",1218818179),self__.impl_],null))], null),self__.__extmap));
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__6868__auto__,G__26231){
var self__ = this;
var this__6868__auto____$1 = this;
return (new taoensso.sente.ChAutoSocket(self__.ws_chsk_opts,self__.ajax_chsk_opts,self__.state_,self__.impl_,G__26231,self__.__extmap,self__.__hash));
});

taoensso.sente.ChAutoSocket.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__6874__auto__,entry__6875__auto__){
var self__ = this;
var this__6874__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__6875__auto__)){
return cljs.core._assoc.call(null,this__6874__auto____$1,cljs.core._nth.call(null,entry__6875__auto__,(0)),cljs.core._nth.call(null,entry__6875__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__6874__auto____$1,entry__6875__auto__);
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
var map__26238 = opts;
var map__26238__$1 = ((((!((map__26238 == null)))?((((map__26238.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26238.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26238):map__26238);
var _QMARK_cb = cljs.core.get.call(null,map__26238__$1,new cljs.core.Keyword(null,"cb","cb",589947841));
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
var downgraded_QMARK___26241 = cljs.core.atom.call(null,false);
cljs.core.add_watch.call(null,self__.state_,new cljs.core.Keyword("chsk","auto-ajax-downgrade","chsk/auto-ajax-downgrade",-831528080),((function (downgraded_QMARK___26241,ajax_chsk_opts__$1,ws_chsk_opts__$1,ajax_conn_BANG_,chsk__$1){
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
if(cljs.core.truth_(cljs.core.compare_and_set_BANG_.call(null,downgraded_QMARK___26241,false,true))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init1980037513903630905.clj",1260,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (ever_opened_QMARK__,temp__4657__auto____$1,impl,temp__4657__auto__,downgraded_QMARK___26241,ajax_chsk_opts__$1,ws_chsk_opts__$1,ajax_conn_BANG_,chsk__$1){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Permanently downgrading :auto chsk -> :ajax"], null);
});})(ever_opened_QMARK__,temp__4657__auto____$1,impl,temp__4657__auto__,downgraded_QMARK___26241,ajax_chsk_opts__$1,ws_chsk_opts__$1,ajax_conn_BANG_,chsk__$1))
,null)),null,1032572589);

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
});})(downgraded_QMARK___26241,ajax_chsk_opts__$1,ws_chsk_opts__$1,ajax_conn_BANG_,chsk__$1))
);

return taoensso.sente._chsk_connect_BANG_.call(null,taoensso.sente.new_ChWebSocket.call(null,ws_chsk_opts__$1));
});})(ajax_chsk_opts__$1,ws_chsk_opts__$1,ajax_conn_BANG_,chsk__$1))
;
cljs.core.reset_BANG_.call(null,self__.impl_,(function (){var or__6247__auto__ = ws_conn_BANG_.call(null);
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
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

taoensso.sente.ChAutoSocket.cljs$lang$ctorPrSeq = (function (this__6903__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"taoensso.sente/ChAutoSocket");
});

taoensso.sente.ChAutoSocket.cljs$lang$ctorPrWriter = (function (this__6903__auto__,writer__6904__auto__){
return cljs.core._write.call(null,writer__6904__auto__,"taoensso.sente/ChAutoSocket");
});

taoensso.sente.__GT_ChAutoSocket = (function taoensso$sente$__GT_ChAutoSocket(ws_chsk_opts,ajax_chsk_opts,state_,impl_){
return (new taoensso.sente.ChAutoSocket(ws_chsk_opts,ajax_chsk_opts,state_,impl_,null,null,null));
});

taoensso.sente.map__GT_ChAutoSocket = (function taoensso$sente$map__GT_ChAutoSocket(G__26233){
return (new taoensso.sente.ChAutoSocket(new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104).cljs$core$IFn$_invoke$arity$1(G__26233),new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327).cljs$core$IFn$_invoke$arity$1(G__26233),new cljs.core.Keyword(null,"state_","state_",957667102).cljs$core$IFn$_invoke$arity$1(G__26233),new cljs.core.Keyword(null,"impl_","impl_",1218818179).cljs$core$IFn$_invoke$arity$1(G__26233),null,cljs.core.dissoc.call(null,G__26233,new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),new cljs.core.Keyword(null,"state_","state_",957667102),new cljs.core.Keyword(null,"impl_","impl_",1218818179)),null));
});

taoensso.sente.new_ChAutoSocket = (function taoensso$sente$new_ChAutoSocket(opts){
return taoensso.sente.map__GT_ChAutoSocket.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"state_","state_",957667102),cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492),new cljs.core.Keyword(null,"open?","open?",1238443125),false], null)),new cljs.core.Keyword(null,"impl_","impl_",1218818179),cljs.core.atom.call(null,null)], null),opts));
});
taoensso.sente.get_chsk_url = (function taoensso$sente$get_chsk_url(protocol,host,path,type){
var protocol__$1 = (function (){var G__26243 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__26243) {
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
var args__7329__auto__ = [];
var len__7322__auto___26265 = arguments.length;
var i__7323__auto___26266 = (0);
while(true){
if((i__7323__auto___26266 < len__7322__auto___26265)){
args__7329__auto__.push((arguments[i__7323__auto___26266]));

var G__26267 = (i__7323__auto___26266 + (1));
i__7323__auto___26266 = G__26267;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return taoensso.sente.make_channel_socket_client_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

taoensso.sente.make_channel_socket_client_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (path,p__26247){
var vec__26248 = p__26247;
var map__26251 = cljs.core.nth.call(null,vec__26248,(0),null);
var map__26251__$1 = ((((!((map__26251 == null)))?((((map__26251.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26251.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26251):map__26251);
var opts = map__26251__$1;
var type = cljs.core.get.call(null,map__26251__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"auto","auto",-566279492));
var host = cljs.core.get.call(null,map__26251__$1,new cljs.core.Keyword(null,"host","host",-1558485167));
var params = cljs.core.get.call(null,map__26251__$1,new cljs.core.Keyword(null,"params","params",710516235));
var recv_buf_or_n = cljs.core.get.call(null,map__26251__$1,new cljs.core.Keyword(null,"recv-buf-or-n","recv-buf-or-n",1363950355),cljs.core.async.sliding_buffer.call(null,(2048)));
var packer = cljs.core.get.call(null,map__26251__$1,new cljs.core.Keyword(null,"packer","packer",66077544),new cljs.core.Keyword(null,"edn","edn",1317840885));
var client_id = cljs.core.get.call(null,map__26251__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140),(function (){var or__6247__auto__ = new cljs.core.Keyword(null,"client-uuid","client-uuid",-1717531965).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
return taoensso.encore.uuid_str.call(null);
}
})());
var ajax_opts = cljs.core.get.call(null,map__26251__$1,new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109));
var wrap_recv_evs_QMARK_ = cljs.core.get.call(null,map__26251__$1,new cljs.core.Keyword(null,"wrap-recv-evs?","wrap-recv-evs?",-1996694153),true);
var backoff_ms_fn = cljs.core.get.call(null,map__26251__$1,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),taoensso.encore.exp_backoff);
var _deprecated_more_opts = cljs.core.nth.call(null,vec__26248,(1),null);
var e_26268 = (function (){try{if(((function (vec__26248,map__26251,map__26251__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts){
return (function (x){
return cljs.core.contains_QMARK_.call(null,taoensso.truss.impl.set_STAR_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"ws","ws",86841443),null,new cljs.core.Keyword(null,"ajax","ajax",814345549),null,new cljs.core.Keyword(null,"auto","auto",-566279492),null], null), null)),x);
});})(vec__26248,map__26251,map__26251__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts))
.call(null,type)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e26253){if((e26253 instanceof Error)){
var e = e26253;
return e;
} else {
throw e26253;

}
}})();
if((e_26268 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"([:in #{:ws :ajax :auto}] type)",type,e_26268,null);
}

var e_26269 = (function (){try{if(taoensso.encore.nblank_str_QMARK_.call(null,client_id)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e26254){if((e26254 instanceof Error)){
var e = e26254;
return e;
} else {
throw e26254;

}
}})();
if((e_26269 == null)){
} else {
taoensso.truss.impl._invar_violation_BANG_.call(null,true,"taoensso.sente",null,"(enc/nblank-str? client-id)",client_id,e_26269,null);
}

if(!((_deprecated_more_opts == null))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init1980037513903630905.clj",1323,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__26248,map__26251,map__26251__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["`make-channel-socket-client!` fn signature CHANGED with Sente v0.10.0."], null);
});})(vec__26248,map__26251,map__26251__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts))
,null)),null,471428845);
} else {
}

if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"lp-timeout","lp-timeout",1149461302))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init1980037513903630905.clj",1324,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__26248,map__26251,map__26251__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [":lp-timeout opt has CHANGED; please use :lp-timout-ms."], null);
});})(vec__26248,map__26251,map__26251__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts))
,null)),null,-519635335);
} else {
}

var packer__$1 = taoensso.sente.coerce_packer.call(null,packer);
var win_loc = taoensso.encore.get_win_loc.call(null);
var win_protocol = new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(win_loc);
var host__$1 = (function (){var or__6247__auto__ = host;
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
return new cljs.core.Keyword(null,"host","host",-1558485167).cljs$core$IFn$_invoke$arity$1(win_loc);
}
})();
var path__$1 = (function (){var or__6247__auto__ = path;
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
return new cljs.core.Keyword(null,"pathname","pathname",-1420497528).cljs$core$IFn$_invoke$arity$1(win_loc);
}
})();
var vec__26255 = (function (){var temp__4655__auto__ = new cljs.core.Keyword(null,"chsk-url-fn","chsk-url-fn",1968894294).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(temp__4655__auto__)){
var f = temp__4655__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f.call(null,path__$1,win_loc,new cljs.core.Keyword(null,"ws","ws",86841443)),f.call(null,path__$1,win_loc,new cljs.core.Keyword(null,"ajax","ajax",814345549))], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [taoensso.sente.get_chsk_url.call(null,win_protocol,host__$1,path__$1,new cljs.core.Keyword(null,"ws","ws",86841443)),taoensso.sente.get_chsk_url.call(null,win_protocol,host__$1,path__$1,new cljs.core.Keyword(null,"ajax","ajax",814345549))], null);
}
})();
var ws_url = cljs.core.nth.call(null,vec__26255,(0),null);
var ajax_url = cljs.core.nth.call(null,vec__26255,(1),null);
var private_chs = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"internal","internal",-854870097),cljs.core.async.chan.call(null,cljs.core.async.sliding_buffer.call(null,(128))),new cljs.core.Keyword(null,"state","state",-1988618099),cljs.core.async.chan.call(null,cljs.core.async.sliding_buffer.call(null,(10))),new cljs.core.Keyword(null,"<server","<server",-2135373537),cljs.core.async.chan.call(null,cljs.core.async.sliding_buffer.call(null,(512)))], null);
var common_chsk_opts = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id,new cljs.core.Keyword(null,"chs","chs",376886120),private_chs,new cljs.core.Keyword(null,"params","params",710516235),params,new cljs.core.Keyword(null,"packer","packer",66077544),packer__$1], null);
var ws_chsk_opts = cljs.core.merge.call(null,common_chsk_opts,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"url","url",276297046),ws_url,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),backoff_ms_fn], null));
var ajax_chsk_opts = cljs.core.merge.call(null,common_chsk_opts,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"url","url",276297046),ajax_url,new cljs.core.Keyword(null,"ajax-opts","ajax-opts",-518239109),ajax_opts,new cljs.core.Keyword(null,"backoff-ms-fn","backoff-ms-fn",772895955),backoff_ms_fn], null));
var auto_chsk_opts = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ws-chsk-opts","ws-chsk-opts",-1990170104),ws_chsk_opts,new cljs.core.Keyword(null,"ajax-chsk-opts","ajax-chsk-opts",1602591327),ajax_chsk_opts], null);
var _QMARK_chsk = taoensso.sente._chsk_connect_BANG_.call(null,(function (){var G__26258 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__26258) {
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
return cljs.core.async.map_LT_.call(null,((function (_LT_server_ch,send_fn,chsk,temp__4655__auto__,packer__$1,win_loc,win_protocol,host__$1,path__$1,vec__26255,ws_url,ajax_url,private_chs,common_chsk_opts,ws_chsk_opts,ajax_chsk_opts,auto_chsk_opts,_QMARK_chsk,vec__26248,map__26251,map__26251__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts){
return (function (ev){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("chsk","recv","chsk/recv",561097091),ev], null);
});})(_LT_server_ch,send_fn,chsk,temp__4655__auto__,packer__$1,win_loc,win_protocol,host__$1,path__$1,vec__26255,ws_url,ajax_url,private_chs,common_chsk_opts,ws_chsk_opts,ajax_chsk_opts,auto_chsk_opts,_QMARK_chsk,vec__26248,map__26251,map__26251__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts))
,_LT_server_ch);
} else {
return _LT_server_ch;
}
})()], null),recv_buf_or_n);
var ev_msg_ch = cljs.core.async.map_LT_.call(null,((function (send_fn,ev_ch,chsk,temp__4655__auto__,packer__$1,win_loc,win_protocol,host__$1,path__$1,vec__26255,ws_url,ajax_url,private_chs,common_chsk_opts,ws_chsk_opts,ajax_chsk_opts,auto_chsk_opts,_QMARK_chsk,vec__26248,map__26251,map__26251__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts){
return (function taoensso$sente$ev__GT_ev_msg(ev){
var vec__26262 = taoensso.sente.as_event.call(null,ev);
var ev_id = cljs.core.nth.call(null,vec__26262,(0),null);
var ev__QMARK_data = cljs.core.nth.call(null,vec__26262,(1),null);
var ev__$1 = vec__26262;
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861),ev_ch,new cljs.core.Keyword(null,"send-fn","send-fn",351002041),send_fn,new cljs.core.Keyword(null,"state","state",-1988618099),new cljs.core.Keyword(null,"state_","state_",957667102).cljs$core$IFn$_invoke$arity$1(chsk),new cljs.core.Keyword(null,"event","event",301435442),ev__$1,new cljs.core.Keyword(null,"id","id",-1388402092),ev_id,new cljs.core.Keyword(null,"?data","?data",-9471433),ev__QMARK_data], null);
});})(send_fn,ev_ch,chsk,temp__4655__auto__,packer__$1,win_loc,win_protocol,host__$1,path__$1,vec__26255,ws_url,ajax_url,private_chs,common_chsk_opts,ws_chsk_opts,ajax_chsk_opts,auto_chsk_opts,_QMARK_chsk,vec__26248,map__26251,map__26251__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts))
,ev_ch);
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"chsk","chsk",-863703081),chsk,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861),ev_msg_ch,new cljs.core.Keyword(null,"send-fn","send-fn",351002041),send_fn,new cljs.core.Keyword(null,"state","state",-1988618099),new cljs.core.Keyword(null,"state_","state_",957667102).cljs$core$IFn$_invoke$arity$1(chsk)], null);
} else {
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"taoensso.sente","/tmp/form-init1980037513903630905.clj",1407,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (temp__4655__auto__,packer__$1,win_loc,win_protocol,host__$1,path__$1,vec__26255,ws_url,ajax_url,private_chs,common_chsk_opts,ws_chsk_opts,ajax_chsk_opts,auto_chsk_opts,_QMARK_chsk,vec__26248,map__26251,map__26251__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Failed to create channel socket"], null);
});})(temp__4655__auto__,packer__$1,win_loc,win_protocol,host__$1,path__$1,vec__26255,ws_url,ajax_url,private_chs,common_chsk_opts,ws_chsk_opts,ajax_chsk_opts,auto_chsk_opts,_QMARK_chsk,vec__26248,map__26251,map__26251__$1,opts,type,host,params,recv_buf_or_n,packer,client_id,ajax_opts,wrap_recv_evs_QMARK_,backoff_ms_fn,_deprecated_more_opts))
,null)),null,2054961965);
}
});

taoensso.sente.make_channel_socket_client_BANG_.cljs$lang$maxFixedArity = (1);

taoensso.sente.make_channel_socket_client_BANG_.cljs$lang$applyTo = (function (seq26245){
var G__26246 = cljs.core.first.call(null,seq26245);
var seq26245__$1 = cljs.core.next.call(null,seq26245);
return taoensso.sente.make_channel_socket_client_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__26246,seq26245__$1);
});

taoensso.sente._start_chsk_router_BANG_ = (function taoensso$sente$_start_chsk_router_BANG_(server_QMARK_,ch_recv,event_msg_handler,opts){
var map__26499 = opts;
var map__26499__$1 = ((((!((map__26499 == null)))?((((map__26499.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26499.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26499):map__26499);
var trace_evs_QMARK_ = cljs.core.get.call(null,map__26499__$1,new cljs.core.Keyword(null,"trace-evs?","trace-evs?",1502453512));
var error_handler = cljs.core.get.call(null,map__26499__$1,new cljs.core.Keyword(null,"error-handler","error-handler",-484945776));
var ch_ctrl = cljs.core.async.chan.call(null);
var c__10224__auto___26727 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___26727,map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___26727,map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function (state_26642){
var state_val_26643 = (state_26642[(1)]);
if((state_val_26643 === (7))){
var inst_26638 = (state_26642[(2)]);
var state_26642__$1 = state_26642;
var statearr_26644_26728 = state_26642__$1;
(statearr_26644_26728[(2)] = inst_26638);

(statearr_26644_26728[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (20))){
var inst_26538 = (state_26642[(7)]);
var inst_26510 = (state_26642[(8)]);
var inst_26511 = (state_26642[(9)]);
var inst_26539 = (state_26642[(10)]);
var inst_26512 = (state_26642[(11)]);
var inst_26509 = (state_26642[(12)]);
var inst_26549 = (function (){var vec__26502 = inst_26509;
var v = inst_26510;
var p = inst_26511;
var stop_QMARK_ = inst_26512;
var map__26515 = inst_26538;
var event_msg = inst_26538;
var event = inst_26539;
return ((function (vec__26502,v,p,stop_QMARK_,map__26515,event_msg,event,inst_26538,inst_26510,inst_26511,inst_26539,inst_26512,inst_26509,state_val_26643,c__10224__auto___26727,map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Pre-handler event: %s",event], null);
});
;})(vec__26502,v,p,stop_QMARK_,map__26515,event_msg,event,inst_26538,inst_26510,inst_26511,inst_26539,inst_26512,inst_26509,state_val_26643,c__10224__auto___26727,map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
})();
var inst_26550 = (new cljs.core.Delay(inst_26549,null));
var inst_26551 = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"trace","trace",-1082747415),"taoensso.sente","/tmp/form-init1980037513903630905.clj",1424,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),inst_26550,null,510351272);
var state_26642__$1 = state_26642;
var statearr_26645_26729 = state_26642__$1;
(statearr_26645_26729[(2)] = inst_26551);

(statearr_26645_26729[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (27))){
var inst_26556 = (state_26642[(2)]);
var state_26642__$1 = state_26642;
var statearr_26646_26730 = state_26642__$1;
(statearr_26646_26730[(2)] = inst_26556);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26642__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (1))){
var state_26642__$1 = state_26642;
var statearr_26647_26731 = state_26642__$1;
(statearr_26647_26731[(2)] = null);

(statearr_26647_26731[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (24))){
var state_26642__$1 = state_26642;
var statearr_26648_26732 = state_26642__$1;
(statearr_26648_26732[(2)] = null);

(statearr_26648_26732[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (55))){
var inst_26632 = (state_26642[(2)]);
var state_26642__$1 = state_26642;
var statearr_26649_26733 = state_26642__$1;
(statearr_26649_26733[(2)] = inst_26632);

(statearr_26649_26733[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (39))){
var state_26642__$1 = state_26642;
var statearr_26650_26734 = state_26642__$1;
(statearr_26650_26734[(2)] = taoensso.truss.impl._dummy_error);

(statearr_26650_26734[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (46))){
var inst_26635 = (state_26642[(2)]);
var state_26642__$1 = (function (){var statearr_26651 = state_26642;
(statearr_26651[(13)] = inst_26635);

return statearr_26651;
})();
var statearr_26652_26735 = state_26642__$1;
(statearr_26652_26735[(2)] = null);

(statearr_26652_26735[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (4))){
var inst_26511 = (state_26642[(9)]);
var inst_26512 = (state_26642[(11)]);
var inst_26509 = (state_26642[(12)]);
var inst_26509__$1 = (state_26642[(2)]);
var inst_26510 = cljs.core.nth.call(null,inst_26509__$1,(0),null);
var inst_26511__$1 = cljs.core.nth.call(null,inst_26509__$1,(1),null);
var inst_26512__$1 = cljs.core._EQ_.call(null,inst_26511__$1,ch_ctrl);
var state_26642__$1 = (function (){var statearr_26653 = state_26642;
(statearr_26653[(8)] = inst_26510);

(statearr_26653[(9)] = inst_26511__$1);

(statearr_26653[(11)] = inst_26512__$1);

(statearr_26653[(12)] = inst_26509__$1);

return statearr_26653;
})();
if(inst_26512__$1){
var statearr_26654_26736 = state_26642__$1;
(statearr_26654_26736[(1)] = (5));

} else {
var statearr_26655_26737 = state_26642__$1;
(statearr_26655_26737[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (54))){
var state_26642__$1 = state_26642;
var statearr_26656_26738 = state_26642__$1;
(statearr_26656_26738[(2)] = null);

(statearr_26656_26738[(1)] = (55));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (15))){
var inst_26510 = (state_26642[(8)]);
var state_26642__$1 = state_26642;
var statearr_26657_26739 = state_26642__$1;
(statearr_26657_26739[(2)] = inst_26510);

(statearr_26657_26739[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (48))){
var inst_26604 = (state_26642[(2)]);
var inst_26605 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_26606 = [null,inst_26604];
var inst_26607 = (new cljs.core.PersistentVector(null,2,(5),inst_26605,inst_26606,null));
var state_26642__$1 = state_26642;
var statearr_26658_26740 = state_26642__$1;
(statearr_26658_26740[(2)] = inst_26607);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26642__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (50))){
var inst_26538 = (state_26642[(7)]);
var inst_26599 = (state_26642[(14)]);
var inst_26613 = error_handler.call(null,inst_26599,inst_26538);
var state_26642__$1 = state_26642;
var statearr_26659_26741 = state_26642__$1;
(statearr_26659_26741[(2)] = inst_26613);

(statearr_26659_26741[(1)] = (52));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (21))){
var state_26642__$1 = state_26642;
var statearr_26660_26742 = state_26642__$1;
(statearr_26660_26742[(2)] = null);

(statearr_26660_26742[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (31))){
var inst_26564 = (state_26642[(2)]);
var state_26642__$1 = state_26642;
var statearr_26661_26743 = state_26642__$1;
(statearr_26661_26743[(2)] = inst_26564);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26642__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (32))){
var inst_26538 = (state_26642[(7)]);
var state_26642__$1 = state_26642;
var statearr_26662_26744 = state_26642__$1;
(statearr_26662_26744[(2)] = inst_26538);

(statearr_26662_26744[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (40))){
var inst_26582 = (state_26642[(2)]);
var state_26642__$1 = state_26642;
var statearr_26663_26745 = state_26642__$1;
(statearr_26663_26745[(2)] = inst_26582);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26642__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (33))){
var inst_26538 = (state_26642[(7)]);
var inst_26566 = (state_26642[(15)]);
var inst_26570 = taoensso.truss.impl._invar_violation_BANG_.call(null,null,"taoensso.sente",null,"(server-event-msg? event-msg)",inst_26538,inst_26566,null);
var state_26642__$1 = state_26642;
var statearr_26664_26746 = state_26642__$1;
(statearr_26664_26746[(2)] = inst_26570);

(statearr_26664_26746[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (13))){
var inst_26530 = (state_26642[(2)]);
var state_26642__$1 = state_26642;
var statearr_26665_26747 = state_26642__$1;
(statearr_26665_26747[(2)] = inst_26530);

(statearr_26665_26747[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (22))){
var inst_26554 = (state_26642[(2)]);
var state_26642__$1 = (function (){var statearr_26666 = state_26642;
(statearr_26666[(16)] = inst_26554);

return statearr_26666;
})();
if(cljs.core.truth_(server_QMARK_)){
var statearr_26667_26748 = state_26642__$1;
(statearr_26667_26748[(1)] = (23));

} else {
var statearr_26668_26749 = state_26642__$1;
(statearr_26668_26749[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (36))){
var inst_26574 = (state_26642[(2)]);
var state_26642__$1 = state_26642;
var statearr_26669_26750 = state_26642__$1;
(statearr_26669_26750[(2)] = inst_26574);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26642__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (41))){
var inst_26538 = (state_26642[(7)]);
var state_26642__$1 = state_26642;
var statearr_26670_26751 = state_26642__$1;
(statearr_26670_26751[(2)] = inst_26538);

(statearr_26670_26751[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (43))){
var inst_26590 = (state_26642[(2)]);
var state_26642__$1 = state_26642;
var statearr_26671_26752 = state_26642__$1;
(statearr_26671_26752[(2)] = inst_26590);

(statearr_26671_26752[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (29))){
var state_26642__$1 = state_26642;
var statearr_26672_26753 = state_26642__$1;
(statearr_26672_26753[(2)] = null);

(statearr_26672_26753[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (44))){
var state_26642__$1 = state_26642;
var statearr_26673_26754 = state_26642__$1;
(statearr_26673_26754[(2)] = null);

(statearr_26673_26754[(1)] = (49));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (6))){
var inst_26510 = (state_26642[(8)]);
var inst_26520 = (inst_26510 == null);
var inst_26521 = cljs.core.not.call(null,inst_26520);
var state_26642__$1 = state_26642;
if(inst_26521){
var statearr_26674_26755 = state_26642__$1;
(statearr_26674_26755[(1)] = (8));

} else {
var statearr_26675_26756 = state_26642__$1;
(statearr_26675_26756[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (28))){
var inst_26538 = (state_26642[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_26642,(27),Error,null,(26));
var inst_26560 = taoensso.sente.server_event_msg_QMARK_.call(null,inst_26538);
var state_26642__$1 = state_26642;
if(cljs.core.truth_(inst_26560)){
var statearr_26676_26757 = state_26642__$1;
(statearr_26676_26757[(1)] = (29));

} else {
var statearr_26677_26758 = state_26642__$1;
(statearr_26677_26758[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (51))){
var inst_26538 = (state_26642[(7)]);
var inst_26510 = (state_26642[(8)]);
var inst_26511 = (state_26642[(9)]);
var inst_26539 = (state_26642[(10)]);
var inst_26512 = (state_26642[(11)]);
var inst_26598 = (state_26642[(17)]);
var inst_26509 = (state_26642[(12)]);
var inst_26597 = (state_26642[(18)]);
var inst_26599 = (state_26642[(14)]);
var inst_26615 = (function (){var p = inst_26511;
var _QMARK_error = inst_26599;
var v = inst_26510;
var temp__4655__auto__ = error_handler;
var map__26515 = inst_26538;
var _ = inst_26598;
var event_msg = inst_26538;
var vec__26516 = inst_26597;
var e = inst_26599;
var temp__4657__auto__ = inst_26599;
var vec__26502 = inst_26509;
var event = inst_26539;
var stop_QMARK_ = inst_26512;
return ((function (p,_QMARK_error,v,temp__4655__auto__,map__26515,_,event_msg,vec__26516,e,temp__4657__auto__,vec__26502,event,stop_QMARK_,inst_26538,inst_26510,inst_26511,inst_26539,inst_26512,inst_26598,inst_26509,inst_26597,inst_26599,state_val_26643,c__10224__auto___26727,map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"Chsk router `event-msg-handler` error: %s",event], null);
});
;})(p,_QMARK_error,v,temp__4655__auto__,map__26515,_,event_msg,vec__26516,e,temp__4657__auto__,vec__26502,event,stop_QMARK_,inst_26538,inst_26510,inst_26511,inst_26539,inst_26512,inst_26598,inst_26509,inst_26597,inst_26599,state_val_26643,c__10224__auto___26727,map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
})();
var inst_26616 = (new cljs.core.Delay(inst_26615,null));
var inst_26617 = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init1980037513903630905.clj",1435,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),inst_26616,null,1000448539);
var state_26642__$1 = state_26642;
var statearr_26678_26759 = state_26642__$1;
(statearr_26678_26759[(2)] = inst_26617);

(statearr_26678_26759[(1)] = (52));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (25))){
var inst_26547 = (state_26642[(19)]);
var inst_26592 = (state_26642[(2)]);
var inst_26593 = event_msg_handler.call(null,inst_26592);
var inst_26594 = [inst_26593,null];
var inst_26595 = (new cljs.core.PersistentVector(null,2,(5),inst_26547,inst_26594,null));
var state_26642__$1 = state_26642;
var statearr_26679_26760 = state_26642__$1;
(statearr_26679_26760[(2)] = inst_26595);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26642__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (34))){
var inst_26572 = (state_26642[(2)]);
var state_26642__$1 = state_26642;
var statearr_26680_26761 = state_26642__$1;
(statearr_26680_26761[(2)] = inst_26572);

(statearr_26680_26761[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (17))){
var inst_26597 = (state_26642[(18)]);
var inst_26599 = (state_26642[(14)]);
var inst_26597__$1 = (state_26642[(2)]);
var inst_26598 = cljs.core.nth.call(null,inst_26597__$1,(0),null);
var inst_26599__$1 = cljs.core.nth.call(null,inst_26597__$1,(1),null);
var state_26642__$1 = (function (){var statearr_26681 = state_26642;
(statearr_26681[(17)] = inst_26598);

(statearr_26681[(18)] = inst_26597__$1);

(statearr_26681[(14)] = inst_26599__$1);

return statearr_26681;
})();
if(cljs.core.truth_(inst_26599__$1)){
var statearr_26682_26762 = state_26642__$1;
(statearr_26682_26762[(1)] = (44));

} else {
var statearr_26683_26763 = state_26642__$1;
(statearr_26683_26763[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (3))){
var inst_26640 = (state_26642[(2)]);
var state_26642__$1 = state_26642;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26642__$1,inst_26640);
} else {
if((state_val_26643 === (12))){
var state_26642__$1 = state_26642;
var statearr_26684_26764 = state_26642__$1;
(statearr_26684_26764[(2)] = false);

(statearr_26684_26764[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (2))){
var inst_26505 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_26506 = [ch_recv,ch_ctrl];
var inst_26507 = (new cljs.core.PersistentVector(null,2,(5),inst_26505,inst_26506,null));
var state_26642__$1 = state_26642;
return cljs.core.async.ioc_alts_BANG_.call(null,state_26642__$1,(4),inst_26507);
} else {
if((state_val_26643 === (23))){
var state_26642__$1 = state_26642;
var statearr_26685_26765 = state_26642__$1;
(statearr_26685_26765[(2)] = null);

(statearr_26685_26765[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (47))){
var inst_26623 = (state_26642[(20)]);
var inst_26625 = (state_26642[(21)]);
var inst_26623__$1 = (state_26642[(2)]);
var inst_26624 = cljs.core.nth.call(null,inst_26623__$1,(0),null);
var inst_26625__$1 = cljs.core.nth.call(null,inst_26623__$1,(1),null);
var state_26642__$1 = (function (){var statearr_26686 = state_26642;
(statearr_26686[(22)] = inst_26624);

(statearr_26686[(20)] = inst_26623__$1);

(statearr_26686[(21)] = inst_26625__$1);

return statearr_26686;
})();
if(cljs.core.truth_(inst_26625__$1)){
var statearr_26687_26766 = state_26642__$1;
(statearr_26687_26766[(1)] = (53));

} else {
var statearr_26688_26767 = state_26642__$1;
(statearr_26688_26767[(1)] = (54));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (35))){
var inst_26584 = (state_26642[(23)]);
var inst_26584__$1 = (state_26642[(2)]);
var inst_26585 = (inst_26584__$1 == null);
var state_26642__$1 = (function (){var statearr_26689 = state_26642;
(statearr_26689[(23)] = inst_26584__$1);

return statearr_26689;
})();
if(cljs.core.truth_(inst_26585)){
var statearr_26690_26768 = state_26642__$1;
(statearr_26690_26768[(1)] = (41));

} else {
var statearr_26691_26769 = state_26642__$1;
(statearr_26691_26769[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (19))){
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_26642,(18),Error,null,(17));
var inst_26547 = cljs.core.PersistentVector.EMPTY_NODE;
var state_26642__$1 = (function (){var statearr_26692 = state_26642;
(statearr_26692[(19)] = inst_26547);

return statearr_26692;
})();
if(cljs.core.truth_(trace_evs_QMARK_)){
var statearr_26693_26770 = state_26642__$1;
(statearr_26693_26770[(1)] = (20));

} else {
var statearr_26694_26771 = state_26642__$1;
(statearr_26694_26771[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (11))){
var state_26642__$1 = state_26642;
var statearr_26695_26772 = state_26642__$1;
(statearr_26695_26772[(2)] = true);

(statearr_26695_26772[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (9))){
var state_26642__$1 = state_26642;
var statearr_26696_26773 = state_26642__$1;
(statearr_26696_26773[(2)] = false);

(statearr_26696_26773[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (5))){
var state_26642__$1 = state_26642;
var statearr_26697_26774 = state_26642__$1;
(statearr_26697_26774[(2)] = null);

(statearr_26697_26774[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (14))){
var inst_26510 = (state_26642[(8)]);
var inst_26535 = cljs.core.apply.call(null,cljs.core.hash_map,inst_26510);
var state_26642__$1 = state_26642;
var statearr_26698_26775 = state_26642__$1;
(statearr_26698_26775[(2)] = inst_26535);

(statearr_26698_26775[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (45))){
var state_26642__$1 = state_26642;
var statearr_26699_26776 = state_26642__$1;
(statearr_26699_26776[(2)] = null);

(statearr_26699_26776[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (53))){
var inst_26538 = (state_26642[(7)]);
var inst_26510 = (state_26642[(8)]);
var inst_26511 = (state_26642[(9)]);
var inst_26539 = (state_26642[(10)]);
var inst_26512 = (state_26642[(11)]);
var inst_26624 = (state_26642[(22)]);
var inst_26623 = (state_26642[(20)]);
var inst_26509 = (state_26642[(12)]);
var inst_26625 = (state_26642[(21)]);
var inst_26597 = (state_26642[(18)]);
var inst_26599 = (state_26642[(14)]);
var inst_26627 = (function (){var p = inst_26511;
var _QMARK_error = inst_26599;
var v = inst_26510;
var map__26515 = inst_26538;
var _ = inst_26624;
var e2 = inst_26625;
var _QMARK_error2 = inst_26625;
var event_msg = inst_26538;
var vec__26516 = inst_26597;
var e = inst_26599;
var vec__26601 = inst_26623;
var temp__4657__auto__ = inst_26625;
var vec__26502 = inst_26509;
var event = inst_26539;
var stop_QMARK_ = inst_26512;
return ((function (p,_QMARK_error,v,map__26515,_,e2,_QMARK_error2,event_msg,vec__26516,e,vec__26601,temp__4657__auto__,vec__26502,event,stop_QMARK_,inst_26538,inst_26510,inst_26511,inst_26539,inst_26512,inst_26624,inst_26623,inst_26509,inst_26625,inst_26597,inst_26599,state_val_26643,c__10224__auto___26727,map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [e2,"Chsk router `error-handler` error: %s",event], null);
});
;})(p,_QMARK_error,v,map__26515,_,e2,_QMARK_error2,event_msg,vec__26516,e,vec__26601,temp__4657__auto__,vec__26502,event,stop_QMARK_,inst_26538,inst_26510,inst_26511,inst_26539,inst_26512,inst_26624,inst_26623,inst_26509,inst_26625,inst_26597,inst_26599,state_val_26643,c__10224__auto___26727,map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
})();
var inst_26628 = (new cljs.core.Delay(inst_26627,null));
var inst_26629 = taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"taoensso.sente","/tmp/form-init1980037513903630905.clj",1437,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),inst_26628,null,-113441758);
var state_26642__$1 = state_26642;
var statearr_26700_26777 = state_26642__$1;
(statearr_26700_26777[(2)] = inst_26629);

(statearr_26700_26777[(1)] = (55));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (26))){
var inst_26566 = (state_26642[(15)]);
var inst_26566__$1 = (state_26642[(2)]);
var inst_26567 = (inst_26566__$1 == null);
var state_26642__$1 = (function (){var statearr_26701 = state_26642;
(statearr_26701[(15)] = inst_26566__$1);

return statearr_26701;
})();
if(cljs.core.truth_(inst_26567)){
var statearr_26702_26778 = state_26642__$1;
(statearr_26702_26778[(1)] = (32));

} else {
var statearr_26703_26779 = state_26642__$1;
(statearr_26703_26779[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (16))){
var inst_26538 = (state_26642[(7)]);
var inst_26538__$1 = (state_26642[(2)]);
var inst_26539 = cljs.core.get.call(null,inst_26538__$1,new cljs.core.Keyword(null,"event","event",301435442));
var state_26642__$1 = (function (){var statearr_26704 = state_26642;
(statearr_26704[(7)] = inst_26538__$1);

(statearr_26704[(10)] = inst_26539);

return statearr_26704;
})();
var statearr_26705_26780 = state_26642__$1;
(statearr_26705_26780[(2)] = null);

(statearr_26705_26780[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (38))){
var state_26642__$1 = state_26642;
var statearr_26706_26781 = state_26642__$1;
(statearr_26706_26781[(2)] = null);

(statearr_26706_26781[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (30))){
var state_26642__$1 = state_26642;
var statearr_26707_26782 = state_26642__$1;
(statearr_26707_26782[(2)] = taoensso.truss.impl._dummy_error);

(statearr_26707_26782[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (10))){
var inst_26533 = (state_26642[(2)]);
var state_26642__$1 = state_26642;
if(cljs.core.truth_(inst_26533)){
var statearr_26708_26783 = state_26642__$1;
(statearr_26708_26783[(1)] = (14));

} else {
var statearr_26709_26784 = state_26642__$1;
(statearr_26709_26784[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (18))){
var inst_26540 = (state_26642[(2)]);
var inst_26541 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_26542 = [null,inst_26540];
var inst_26543 = (new cljs.core.PersistentVector(null,2,(5),inst_26541,inst_26542,null));
var state_26642__$1 = state_26642;
var statearr_26710_26785 = state_26642__$1;
(statearr_26710_26785[(2)] = inst_26543);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26642__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (52))){
var inst_26611 = (state_26642[(24)]);
var inst_26619 = (state_26642[(2)]);
var inst_26620 = [inst_26619,null];
var inst_26621 = (new cljs.core.PersistentVector(null,2,(5),inst_26611,inst_26620,null));
var state_26642__$1 = state_26642;
var statearr_26711_26786 = state_26642__$1;
(statearr_26711_26786[(2)] = inst_26621);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26642__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (42))){
var inst_26538 = (state_26642[(7)]);
var inst_26584 = (state_26642[(23)]);
var inst_26588 = taoensso.truss.impl._invar_violation_BANG_.call(null,null,"taoensso.sente",null,"(client-event-msg? event-msg)",inst_26538,inst_26584,null);
var state_26642__$1 = state_26642;
var statearr_26712_26787 = state_26642__$1;
(statearr_26712_26787[(2)] = inst_26588);

(statearr_26712_26787[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (37))){
var inst_26538 = (state_26642[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_26642,(36),Error,null,(35));
var inst_26578 = taoensso.sente.client_event_msg_QMARK_.call(null,inst_26538);
var state_26642__$1 = state_26642;
if(cljs.core.truth_(inst_26578)){
var statearr_26713_26788 = state_26642__$1;
(statearr_26713_26788[(1)] = (38));

} else {
var statearr_26714_26789 = state_26642__$1;
(statearr_26714_26789[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (8))){
var inst_26510 = (state_26642[(8)]);
var inst_26523 = inst_26510.cljs$lang$protocol_mask$partition0$;
var inst_26524 = (inst_26523 & (64));
var inst_26525 = inst_26510.cljs$core$ISeq$;
var inst_26526 = (inst_26524) || (inst_26525);
var state_26642__$1 = state_26642;
if(cljs.core.truth_(inst_26526)){
var statearr_26715_26790 = state_26642__$1;
(statearr_26715_26790[(1)] = (11));

} else {
var statearr_26716_26791 = state_26642__$1;
(statearr_26716_26791[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26643 === (49))){
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_26642,(48),Error,null,(47));
var inst_26611 = cljs.core.PersistentVector.EMPTY_NODE;
var state_26642__$1 = (function (){var statearr_26717 = state_26642;
(statearr_26717[(24)] = inst_26611);

return statearr_26717;
})();
if(cljs.core.truth_(error_handler)){
var statearr_26718_26792 = state_26642__$1;
(statearr_26718_26792[(1)] = (50));

} else {
var statearr_26719_26793 = state_26642__$1;
(statearr_26719_26793[(1)] = (51));

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
});})(c__10224__auto___26727,map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
;
return ((function (switch__10112__auto__,c__10224__auto___26727,map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function() {
var taoensso$sente$_start_chsk_router_BANG__$_state_machine__10113__auto__ = null;
var taoensso$sente$_start_chsk_router_BANG__$_state_machine__10113__auto____0 = (function (){
var statearr_26723 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26723[(0)] = taoensso$sente$_start_chsk_router_BANG__$_state_machine__10113__auto__);

(statearr_26723[(1)] = (1));

return statearr_26723;
});
var taoensso$sente$_start_chsk_router_BANG__$_state_machine__10113__auto____1 = (function (state_26642){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_26642);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e26724){if((e26724 instanceof Object)){
var ex__10116__auto__ = e26724;
var statearr_26725_26794 = state_26642;
(statearr_26725_26794[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26642);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26724;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26795 = state_26642;
state_26642 = G__26795;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
taoensso$sente$_start_chsk_router_BANG__$_state_machine__10113__auto__ = function(state_26642){
switch(arguments.length){
case 0:
return taoensso$sente$_start_chsk_router_BANG__$_state_machine__10113__auto____0.call(this);
case 1:
return taoensso$sente$_start_chsk_router_BANG__$_state_machine__10113__auto____1.call(this,state_26642);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
taoensso$sente$_start_chsk_router_BANG__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = taoensso$sente$_start_chsk_router_BANG__$_state_machine__10113__auto____0;
taoensso$sente$_start_chsk_router_BANG__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = taoensso$sente$_start_chsk_router_BANG__$_state_machine__10113__auto____1;
return taoensso$sente$_start_chsk_router_BANG__$_state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___26727,map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
})();
var state__10226__auto__ = (function (){var statearr_26726 = f__10225__auto__.call(null);
(statearr_26726[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___26727);

return statearr_26726;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___26727,map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
);


return ((function (map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl){
return (function taoensso$sente$_start_chsk_router_BANG__$_stop_BANG_(){
return cljs.core.async.close_BANG_.call(null,ch_ctrl);
});
;})(map__26499,map__26499__$1,trace_evs_QMARK_,error_handler,ch_ctrl))
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
var args__7329__auto__ = [];
var len__7322__auto___26805 = arguments.length;
var i__7323__auto___26806 = (0);
while(true){
if((i__7323__auto___26806 < len__7322__auto___26805)){
args__7329__auto__.push((arguments[i__7323__auto___26806]));

var G__26807 = (i__7323__auto___26806 + (1));
i__7323__auto___26806 = G__26807;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((2) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((2)),(0),null)):null);
return taoensso.sente.start_server_chsk_router_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7330__auto__);
});

taoensso.sente.start_server_chsk_router_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ch_recv,event_msg_handler,p__26799){
var vec__26800 = p__26799;
var map__26803 = cljs.core.nth.call(null,vec__26800,(0),null);
var map__26803__$1 = ((((!((map__26803 == null)))?((((map__26803.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26803.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26803):map__26803);
var opts = map__26803__$1;
var trace_evs_QMARK_ = cljs.core.get.call(null,map__26803__$1,new cljs.core.Keyword(null,"trace-evs?","trace-evs?",1502453512));
var error_handler = cljs.core.get.call(null,map__26803__$1,new cljs.core.Keyword(null,"error-handler","error-handler",-484945776));
return taoensso.sente._start_chsk_router_BANG_.call(null,new cljs.core.Keyword(null,"server","server",1499190120),ch_recv,event_msg_handler,opts);
});

taoensso.sente.start_server_chsk_router_BANG_.cljs$lang$maxFixedArity = (2);

taoensso.sente.start_server_chsk_router_BANG_.cljs$lang$applyTo = (function (seq26796){
var G__26797 = cljs.core.first.call(null,seq26796);
var seq26796__$1 = cljs.core.next.call(null,seq26796);
var G__26798 = cljs.core.first.call(null,seq26796__$1);
var seq26796__$2 = cljs.core.next.call(null,seq26796__$1);
return taoensso.sente.start_server_chsk_router_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__26797,G__26798,seq26796__$2);
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
var args__7329__auto__ = [];
var len__7322__auto___26817 = arguments.length;
var i__7323__auto___26818 = (0);
while(true){
if((i__7323__auto___26818 < len__7322__auto___26817)){
args__7329__auto__.push((arguments[i__7323__auto___26818]));

var G__26819 = (i__7323__auto___26818 + (1));
i__7323__auto___26818 = G__26819;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((2) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((2)),(0),null)):null);
return taoensso.sente.start_client_chsk_router_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7330__auto__);
});

taoensso.sente.start_client_chsk_router_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ch_recv,event_msg_handler,p__26811){
var vec__26812 = p__26811;
var map__26815 = cljs.core.nth.call(null,vec__26812,(0),null);
var map__26815__$1 = ((((!((map__26815 == null)))?((((map__26815.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26815.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26815):map__26815);
var opts = map__26815__$1;
var trace_evs_QMARK_ = cljs.core.get.call(null,map__26815__$1,new cljs.core.Keyword(null,"trace-evs?","trace-evs?",1502453512));
var error_handler = cljs.core.get.call(null,map__26815__$1,new cljs.core.Keyword(null,"error-handler","error-handler",-484945776));
return taoensso.sente._start_chsk_router_BANG_.call(null,cljs.core.not.call(null,new cljs.core.Keyword(null,"server","server",1499190120)),ch_recv,event_msg_handler,opts);
});

taoensso.sente.start_client_chsk_router_BANG_.cljs$lang$maxFixedArity = (2);

taoensso.sente.start_client_chsk_router_BANG_.cljs$lang$applyTo = (function (seq26808){
var G__26809 = cljs.core.first.call(null,seq26808);
var seq26808__$1 = cljs.core.next.call(null,seq26808);
var G__26810 = cljs.core.first.call(null,seq26808__$1);
var seq26808__$2 = cljs.core.next.call(null,seq26808__$1);
return taoensso.sente.start_client_chsk_router_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__26809,G__26810,seq26808__$2);
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
taoensso.sente.default_chsk_url_fn = (function taoensso$sente$default_chsk_url_fn(path,p__26820,websocket_QMARK_){
var map__26823 = p__26820;
var map__26823__$1 = ((((!((map__26823 == null)))?((((map__26823.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26823.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26823):map__26823);
var location = map__26823__$1;
var protocol = cljs.core.get.call(null,map__26823__$1,new cljs.core.Keyword(null,"protocol","protocol",652470118));
var host = cljs.core.get.call(null,map__26823__$1,new cljs.core.Keyword(null,"host","host",-1558485167));
var pathname = cljs.core.get.call(null,map__26823__$1,new cljs.core.Keyword(null,"pathname","pathname",-1420497528));
var protocol__$1 = (cljs.core.truth_(websocket_QMARK_)?((cljs.core._EQ_.call(null,protocol,"https:"))?"wss:":"ws:"):protocol);
return [cljs.core.str(protocol__$1),cljs.core.str("//"),cljs.core.str(host),cljs.core.str((function (){var or__6247__auto__ = path;
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
return pathname;
}
})())].join('');
});

//# sourceMappingURL=sente.js.map