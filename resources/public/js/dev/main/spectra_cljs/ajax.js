// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.ajax');
goog.require('cljs.core');
goog.require('taoensso.sente');
goog.require('goog.dom');
goog.require('taoensso.timbre');
goog.require('spectra_cljs.update');
goog.require('spectra_cljs.state');
goog.require('cljs.core.async');
goog.require('spectra_cljc.schema');
goog.require('taoensso.encore');
goog.require('clojure.string');
goog.require('spectra_cljs.ajax_demo');
spectra_cljs.ajax.packer = new cljs.core.Keyword(null,"edn","edn",1317840885);
var rand_chsk_type_13155 = new cljs.core.Keyword(null,"auto","auto",-566279492);
var map__13153_13156 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),rand_chsk_type_13155,new cljs.core.Keyword(null,"packer","packer",66077544),spectra_cljs.ajax.packer], null));
var map__13153_13157__$1 = ((((!((map__13153_13156 == null)))?((((map__13153_13156.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13153_13156.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13153_13156):map__13153_13156);
var chsk_13158 = cljs.core.get.call(null,map__13153_13157__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));
var ch_recv_13159 = cljs.core.get.call(null,map__13153_13157__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));
var send_fn_13160 = cljs.core.get.call(null,map__13153_13157__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));
var state_13161 = cljs.core.get.call(null,map__13153_13157__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
spectra_cljs.ajax.chsk = chsk_13158;

spectra_cljs.ajax.ch_chsk = ch_recv_13159;

spectra_cljs.ajax.chsk_send_BANG_ = send_fn_13160;

spectra_cljs.ajax.chsk_state = state_13161;

spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ajax-chan","ajax-chan",1933808038)], null),spectra_cljs.ajax.chsk_send_BANG_);
spectra_cljs.ajax.update_tables_BANG_ = (function spectra_cljs$ajax$update_tables_BANG_(){
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loading","loading",-737050189)], null),true);

setTimeout((function (){
return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loading","loading",-737050189)], null),false);
}),(500));

spectra_cljs.update.update_emails_BANG_.call(null);

return spectra_cljs.update.update_people_BANG_.call(null);
});
spectra_cljs.ajax.chsk_init_BANG_ = (function spectra_cljs$ajax$chsk_init_BANG_(){
spectra_cljs.ajax.update_tables_BANG_.call(null);

spectra_cljs.update.update_user_BANG_.call(null);

spectra_cljs.update.fetch_ranks_BANG_.call(null,spectra_cljc.schema.event);

return spectra_cljs.update.fetch_ranks_BANG_.call(null,spectra_cljc.schema.location);
});
if(typeof spectra_cljs.ajax.event_msg_handler !== 'undefined'){
} else {
spectra_cljs.ajax.event_msg_handler = (function (){var method_table__27381__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__27382__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__27383__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__27384__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__27385__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"spectra_cljs.ajax","event-msg-handler"),new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__27385__auto__,method_table__27381__auto__,prefer_table__27382__auto__,method_cache__27383__auto__,cached_hierarchy__27384__auto__));
})();
}
spectra_cljs.ajax.event_msg_handler_STAR_ = (function spectra_cljs$ajax$event_msg_handler_STAR_(p__13162){
var map__13165 = p__13162;
var map__13165__$1 = ((((!((map__13165 == null)))?((((map__13165.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13165.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13165):map__13165);
var ev_msg = map__13165__$1;
var id = cljs.core.get.call(null,map__13165__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var _QMARK_data = cljs.core.get.call(null,map__13165__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));
var event = cljs.core.get.call(null,map__13165__$1,new cljs.core.Keyword(null,"event","event",301435442));
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax","/tmp/form-init3288980084707781493.clj",63,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (map__13165,map__13165__$1,ev_msg,id,_QMARK_data,event){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Event: %s",event], null);
});})(map__13165,map__13165__$1,ev_msg,id,_QMARK_data,event))
,null)),null,2029688241);

return spectra_cljs.ajax.event_msg_handler.call(null,ev_msg);
});
cljs.core._add_method.call(null,spectra_cljs.ajax.event_msg_handler,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__13167){
var map__13168 = p__13167;
var map__13168__$1 = ((((!((map__13168 == null)))?((((map__13168.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13168.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13168):map__13168);
var ev_msg = map__13168__$1;
var event = cljs.core.get.call(null,map__13168__$1,new cljs.core.Keyword(null,"event","event",301435442));
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax","/tmp/form-init3288980084707781493.clj",69,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (map__13168,map__13168__$1,ev_msg,event){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Unhandled event: %s",event], null);
});})(map__13168,map__13168__$1,ev_msg,event))
,null)),null,705335670);
}));

cljs.core._add_method.call(null,spectra_cljs.ajax.event_msg_handler,new cljs.core.Keyword("chsk","state","chsk/state",-1991397620),(function (p__13170){
var map__13171 = p__13170;
var map__13171__$1 = ((((!((map__13171 == null)))?((((map__13171.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13171.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13171):map__13171);
var ev_msg = map__13171__$1;
var _QMARK_data = cljs.core.get.call(null,map__13171__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));
var vec__13173 = (function (){var e = (function (){try{if(cljs.core.vector_QMARK_.call(null,_QMARK_data)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e13176){if((e13176 instanceof Error)){
var e = e13176;
return e;
} else {
throw e13176;

}
}})();
if((e == null)){
return _QMARK_data;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"spectra_cljs.ajax",null,"(vector? ?data)",_QMARK_data,e,null);
}
})();
var old_state_map = cljs.core.nth.call(null,vec__13173,(0),null);
var new_state_map = cljs.core.nth.call(null,vec__13173,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"first-open?","first-open?",396686530).cljs$core$IFn$_invoke$arity$1(new_state_map))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax","/tmp/form-init3288980084707781493.clj",75,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__13173,old_state_map,new_state_map,map__13171,map__13171__$1,ev_msg,_QMARK_data){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Channel socket successfully established!"], null);
});})(vec__13173,old_state_map,new_state_map,map__13171,map__13171__$1,ev_msg,_QMARK_data))
,null)),null,-1376998823);

return spectra_cljs.ajax.chsk_init_BANG_.call(null);
} else {
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax","/tmp/form-init3288980084707781493.clj",77,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__13173,old_state_map,new_state_map,map__13171,map__13171__$1,ev_msg,_QMARK_data){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Channel socket state change: %s",_QMARK_data], null);
});})(vec__13173,old_state_map,new_state_map,map__13171,map__13171__$1,ev_msg,_QMARK_data))
,null)),null,1647586810);
}
}));

cljs.core._add_method.call(null,spectra_cljs.ajax.event_msg_handler,new cljs.core.Keyword("chsk","recv","chsk/recv",561097091),(function (p__13177){
var map__13178 = p__13177;
var map__13178__$1 = ((((!((map__13178 == null)))?((((map__13178.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13178.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13178):map__13178);
var ev_msg = map__13178__$1;
var _QMARK_data = cljs.core.get.call(null,map__13178__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));
if(cljs.core._EQ_.call(null,_QMARK_data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("refresh","tables","refresh/tables",270149223),true], null))){
return spectra_cljs.ajax.update_tables_BANG_.call(null);
} else {
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax","/tmp/form-init3288980084707781493.clj",83,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (map__13178,map__13178__$1,ev_msg,_QMARK_data){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Push event from server: %s",_QMARK_data], null);
});})(map__13178,map__13178__$1,ev_msg,_QMARK_data))
,null)),null,1915711294);
}
}));

cljs.core._add_method.call(null,spectra_cljs.ajax.event_msg_handler,new cljs.core.Keyword("chsk","handshake","chsk/handshake",64910686),(function (p__13180){
var map__13181 = p__13180;
var map__13181__$1 = ((((!((map__13181 == null)))?((((map__13181.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13181.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13181):map__13181);
var ev_msg = map__13181__$1;
var _QMARK_data = cljs.core.get.call(null,map__13181__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));
var vec__13183 = _QMARK_data;
var _QMARK_uid = cljs.core.nth.call(null,vec__13183,(0),null);
var _QMARK_csrf_token = cljs.core.nth.call(null,vec__13183,(1),null);
var _QMARK_handshake_data = cljs.core.nth.call(null,vec__13183,(2),null);
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax","/tmp/form-init3288980084707781493.clj",88,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__13183,_QMARK_uid,_QMARK_csrf_token,_QMARK_handshake_data,map__13181,map__13181__$1,ev_msg,_QMARK_data){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Handshake: %s",_QMARK_data], null);
});})(vec__13183,_QMARK_uid,_QMARK_csrf_token,_QMARK_handshake_data,map__13181,map__13181__$1,ev_msg,_QMARK_data))
,null)),null,-1457006869);
}));
spectra_cljs.ajax.router_ = cljs.core.atom.call(null,null);
spectra_cljs.ajax.stop_router_BANG_ = (function spectra_cljs$ajax$stop_router_BANG_(){
var temp__4657__auto__ = cljs.core.deref.call(null,spectra_cljs.ajax.router_);
if(cljs.core.truth_(temp__4657__auto__)){
var stop_f = temp__4657__auto__;
return stop_f.call(null);
} else {
return null;
}
});
spectra_cljs.ajax.start_router_BANG_ = (function spectra_cljs$ajax$start_router_BANG_(){
spectra_cljs.ajax.stop_router_BANG_.call(null);

return cljs.core.reset_BANG_.call(null,spectra_cljs.ajax.router_,taoensso.sente.start_chsk_router_BANG_.call(null,spectra_cljs.ajax.ch_chsk,spectra_cljs.ajax.event_msg_handler_STAR_));
});
spectra_cljs.ajax.start_BANG_ = (function spectra_cljs$ajax$start_BANG_(){
return spectra_cljs.ajax.start_router_BANG_.call(null);
});

//# sourceMappingURL=ajax.js.map?rel=1468799096007