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
var rand_chsk_type_16221 = new cljs.core.Keyword(null,"auto","auto",-566279492);
var map__16219_16222 = taoensso.sente.make_channel_socket_BANG_.call(null,"/chsk",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),rand_chsk_type_16221,new cljs.core.Keyword(null,"packer","packer",66077544),spectra_cljs.ajax.packer], null));
var map__16219_16223__$1 = ((((!((map__16219_16222 == null)))?((((map__16219_16222.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16219_16222.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16219_16222):map__16219_16222);
var chsk_16224 = cljs.core.get.call(null,map__16219_16223__$1,new cljs.core.Keyword(null,"chsk","chsk",-863703081));
var ch_recv_16225 = cljs.core.get.call(null,map__16219_16223__$1,new cljs.core.Keyword(null,"ch-recv","ch-recv",-990916861));
var send_fn_16226 = cljs.core.get.call(null,map__16219_16223__$1,new cljs.core.Keyword(null,"send-fn","send-fn",351002041));
var state_16227 = cljs.core.get.call(null,map__16219_16223__$1,new cljs.core.Keyword(null,"state","state",-1988618099));
spectra_cljs.ajax.chsk = chsk_16224;

spectra_cljs.ajax.ch_chsk = ch_recv_16225;

spectra_cljs.ajax.chsk_send_BANG_ = send_fn_16226;

spectra_cljs.ajax.chsk_state = state_16227;

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
spectra_cljs.ajax.event_msg_handler = (function (){var method_table__27262__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__27263__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__27264__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__27265__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__27266__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"spectra_cljs.ajax","event-msg-handler"),new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__27266__auto__,method_table__27262__auto__,prefer_table__27263__auto__,method_cache__27264__auto__,cached_hierarchy__27265__auto__));
})();
}
spectra_cljs.ajax.event_msg_handler_STAR_ = (function spectra_cljs$ajax$event_msg_handler_STAR_(p__16228){
var map__16231 = p__16228;
var map__16231__$1 = ((((!((map__16231 == null)))?((((map__16231.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16231.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16231):map__16231);
var ev_msg = map__16231__$1;
var id = cljs.core.get.call(null,map__16231__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var _QMARK_data = cljs.core.get.call(null,map__16231__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));
var event = cljs.core.get.call(null,map__16231__$1,new cljs.core.Keyword(null,"event","event",301435442));
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax","/tmp/form-init305516951502553584.clj",63,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (map__16231,map__16231__$1,ev_msg,id,_QMARK_data,event){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Event: %s",event], null);
});})(map__16231,map__16231__$1,ev_msg,id,_QMARK_data,event))
,null)),null,-1975528516);

return spectra_cljs.ajax.event_msg_handler.call(null,ev_msg);
});
cljs.core._add_method.call(null,spectra_cljs.ajax.event_msg_handler,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__16233){
var map__16234 = p__16233;
var map__16234__$1 = ((((!((map__16234 == null)))?((((map__16234.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16234.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16234):map__16234);
var ev_msg = map__16234__$1;
var event = cljs.core.get.call(null,map__16234__$1,new cljs.core.Keyword(null,"event","event",301435442));
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax","/tmp/form-init305516951502553584.clj",69,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (map__16234,map__16234__$1,ev_msg,event){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Unhandled event: %s",event], null);
});})(map__16234,map__16234__$1,ev_msg,event))
,null)),null,-1457008530);
}));

cljs.core._add_method.call(null,spectra_cljs.ajax.event_msg_handler,new cljs.core.Keyword("chsk","state","chsk/state",-1991397620),(function (p__16236){
var map__16237 = p__16236;
var map__16237__$1 = ((((!((map__16237 == null)))?((((map__16237.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16237.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16237):map__16237);
var ev_msg = map__16237__$1;
var _QMARK_data = cljs.core.get.call(null,map__16237__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));
var vec__16239 = (function (){var e = (function (){try{if(cljs.core.vector_QMARK_.call(null,_QMARK_data)){
return null;
} else {
return taoensso.truss.impl._dummy_error;
}
}catch (e16242){if((e16242 instanceof Error)){
var e = e16242;
return e;
} else {
throw e16242;

}
}})();
if((e == null)){
return _QMARK_data;
} else {
return taoensso.truss.impl._invar_violation_BANG_.call(null,true,"spectra_cljs.ajax",null,"(vector? ?data)",_QMARK_data,e,null);
}
})();
var old_state_map = cljs.core.nth.call(null,vec__16239,(0),null);
var new_state_map = cljs.core.nth.call(null,vec__16239,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"first-open?","first-open?",396686530).cljs$core$IFn$_invoke$arity$1(new_state_map))){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax","/tmp/form-init305516951502553584.clj",75,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__16239,old_state_map,new_state_map,map__16237,map__16237__$1,ev_msg,_QMARK_data){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Channel socket successfully established!"], null);
});})(vec__16239,old_state_map,new_state_map,map__16237,map__16237__$1,ev_msg,_QMARK_data))
,null)),null,339780579);

return spectra_cljs.ajax.chsk_init_BANG_.call(null);
} else {
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax","/tmp/form-init305516951502553584.clj",77,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__16239,old_state_map,new_state_map,map__16237,map__16237__$1,ev_msg,_QMARK_data){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Channel socket state change: %s",_QMARK_data], null);
});})(vec__16239,old_state_map,new_state_map,map__16237,map__16237__$1,ev_msg,_QMARK_data))
,null)),null,1227018453);
}
}));

cljs.core._add_method.call(null,spectra_cljs.ajax.event_msg_handler,new cljs.core.Keyword("chsk","recv","chsk/recv",561097091),(function (p__16243){
var map__16244 = p__16243;
var map__16244__$1 = ((((!((map__16244 == null)))?((((map__16244.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16244.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16244):map__16244);
var ev_msg = map__16244__$1;
var _QMARK_data = cljs.core.get.call(null,map__16244__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));
if(cljs.core._EQ_.call(null,_QMARK_data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("refresh","tables","refresh/tables",270149223),true], null))){
return spectra_cljs.ajax.update_tables_BANG_.call(null);
} else {
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax","/tmp/form-init305516951502553584.clj",83,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (map__16244,map__16244__$1,ev_msg,_QMARK_data){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Push event from server: %s",_QMARK_data], null);
});})(map__16244,map__16244__$1,ev_msg,_QMARK_data))
,null)),null,1080685445);
}
}));

cljs.core._add_method.call(null,spectra_cljs.ajax.event_msg_handler,new cljs.core.Keyword("chsk","handshake","chsk/handshake",64910686),(function (p__16246){
var map__16247 = p__16246;
var map__16247__$1 = ((((!((map__16247 == null)))?((((map__16247.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16247.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16247):map__16247);
var ev_msg = map__16247__$1;
var _QMARK_data = cljs.core.get.call(null,map__16247__$1,new cljs.core.Keyword(null,"?data","?data",-9471433));
var vec__16249 = _QMARK_data;
var _QMARK_uid = cljs.core.nth.call(null,vec__16249,(0),null);
var _QMARK_csrf_token = cljs.core.nth.call(null,vec__16249,(1),null);
var _QMARK_handshake_data = cljs.core.nth.call(null,vec__16249,(2),null);
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax","/tmp/form-init305516951502553584.clj",88,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (vec__16249,_QMARK_uid,_QMARK_csrf_token,_QMARK_handshake_data,map__16247,map__16247__$1,ev_msg,_QMARK_data){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Handshake: %s",_QMARK_data], null);
});})(vec__16249,_QMARK_uid,_QMARK_csrf_token,_QMARK_handshake_data,map__16247,map__16247__$1,ev_msg,_QMARK_data))
,null)),null,1807459286);
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

//# sourceMappingURL=ajax.js.map?rel=1468744503483