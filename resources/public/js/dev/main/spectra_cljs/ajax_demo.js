// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.ajax_demo');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('taoensso.timbre');
goog.require('taoensso.sente');
spectra_cljs.ajax_demo.btn1_init_BANG_ = (function spectra_cljs$ajax_demo$btn1_init_BANG_(chsk_send_BANG_){
var temp__4657__auto__ = document.getElementById("btn1");
if(cljs.core.truth_(temp__4657__auto__)){
var target_el = temp__4657__auto__;
return target_el.addEventListener("click",((function (target_el,temp__4657__auto__){
return (function (ev){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax-demo","/tmp/form-init1980037513903630905.clj",13,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (target_el,temp__4657__auto__){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Button 1 was clicked (won't receive any reply from server)"], null);
});})(target_el,temp__4657__auto__))
,null)),null,1549880400);

return chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("example","button1","example/button1",-349884645),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"had-a-callback?","had-a-callback?",-512946762),"nope"], null)], null));
});})(target_el,temp__4657__auto__))
);
} else {
return null;
}
});
spectra_cljs.ajax_demo.btn2_init_BANG_ = (function spectra_cljs$ajax_demo$btn2_init_BANG_(chsk_send_BANG_){
var temp__4657__auto__ = document.getElementById("btn2");
if(cljs.core.truth_(temp__4657__auto__)){
var target_el = temp__4657__auto__;
return target_el.addEventListener("click",((function (target_el,temp__4657__auto__){
return (function (ev){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax-demo","/tmp/form-init1980037513903630905.clj",21,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (target_el,temp__4657__auto__){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Button 2 was clicked (will receive reply from server)"], null);
});})(target_el,temp__4657__auto__))
,null)),null,812265010);

return chsk_send_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("example","button2","example/button2",-675598425),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"had-a-callback?","had-a-callback?",-512946762),"indeed"], null)], null),(5000),((function (target_el,temp__4657__auto__){
return (function (cb_reply){
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax-demo","/tmp/form-init1980037513903630905.clj",23,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (target_el,temp__4657__auto__){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Callback reply: %s",cb_reply], null);
});})(target_el,temp__4657__auto__))
,null)),null,-2061230610);
});})(target_el,temp__4657__auto__))
);
});})(target_el,temp__4657__auto__))
);
} else {
return null;
}
});
spectra_cljs.ajax_demo.login_response = (function spectra_cljs$ajax_demo$login_response(chsk,ajax_resp){
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax-demo","/tmp/form-init1980037513903630905.clj",26,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Ajax login response: %s",ajax_resp], null);
}),null)),null,-1736371128);

var login_successful_QMARK_ = true;
if(!(login_successful_QMARK_)){
return taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax-demo","/tmp/form-init1980037513903630905.clj",30,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (login_successful_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Login failed"], null);
});})(login_successful_QMARK_))
,null)),null,-1600181659);
} else {
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax-demo","/tmp/form-init1980037513903630905.clj",32,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (login_successful_QMARK_){
return (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Login successful"], null);
});})(login_successful_QMARK_))
,null)),null,892956409);

return taoensso.sente.chsk_reconnect_BANG_.call(null,chsk);
}
});
spectra_cljs.ajax_demo.login_listener = (function spectra_cljs$ajax_demo$login_listener(chsk,chsk_state,ev){
var user_id = document.getElementById("input-login").value;
if(clojure.string.blank_QMARK_.call(null,user_id)){
return alert("Please enter a user-id first");
} else {
taoensso.timbre._log_BANG_.call(null,taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"debug","debug",-1608172596),"spectra_cljs.ajax-demo","/tmp/form-init1980037513903630905.clj",40,new cljs.core.Keyword(null,"f","f",-1597136552),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (user_id){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Logging in with user-id %s",user_id], null);
});})(user_id))
,null)),null,1229771417);

return taoensso.sente.ajax_call.call(null,"/login-test",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"method","method",55703592),new cljs.core.Keyword(null,"post","post",269697687),new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"user-id","user-id",-206822291),[cljs.core.str(user_id)].join(''),new cljs.core.Keyword(null,"csrf-token","csrf-token",-1872302856),new cljs.core.Keyword(null,"csrf-token","csrf-token",-1872302856).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,chsk_state))], null)], null),cljs.core.partial.call(null,spectra_cljs.ajax_demo.login_response,chsk));
}
});
spectra_cljs.ajax_demo.btn_login_init_BANG_ = (function spectra_cljs$ajax_demo$btn_login_init_BANG_(chsk,chsk_state){
var temp__4657__auto__ = document.getElementById("btn-login");
if(cljs.core.truth_(temp__4657__auto__)){
var target_el = temp__4657__auto__;
return target_el.addEventListener("click",cljs.core.partial.call(null,spectra_cljs.ajax_demo.login_listener,chsk,chsk_state));
} else {
return null;
}
});
spectra_cljs.ajax_demo.listen_BANG_ = (function spectra_cljs$ajax_demo$listen_BANG_(chsk,chsk_state,chsk_send_BANG_){
spectra_cljs.ajax_demo.btn1_init_BANG_.call(null,chsk_send_BANG_);

spectra_cljs.ajax_demo.btn2_init_BANG_.call(null,chsk_send_BANG_);

return spectra_cljs.ajax_demo.btn_login_init_BANG_.call(null,chsk,chsk_state);
});

//# sourceMappingURL=ajax_demo.js.map