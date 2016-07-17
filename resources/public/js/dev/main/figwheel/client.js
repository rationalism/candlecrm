// Compiled by ClojureScript 1.9.93 {}
goog.provide('figwheel.client');
goog.require('cljs.core');
goog.require('goog.userAgent.product');
goog.require('goog.Uri');
goog.require('cljs.core.async');
goog.require('goog.object');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.file_reloading');
goog.require('clojure.string');
goog.require('figwheel.client.utils');
goog.require('cljs.repl');
goog.require('figwheel.client.heads_up');
goog.require('cljs.reader');
figwheel.client._figwheel_version_ = "0.5.4-7";
figwheel.client.figwheel_repl_print = (function figwheel$client$figwheel_repl_print(var_args){
var args10412 = [];
var len__27348__auto___10415 = arguments.length;
var i__27349__auto___10416 = (0);
while(true){
if((i__27349__auto___10416 < len__27348__auto___10415)){
args10412.push((arguments[i__27349__auto___10416]));

var G__10417 = (i__27349__auto___10416 + (1));
i__27349__auto___10416 = G__10417;
continue;
} else {
}
break;
}

var G__10414 = args10412.length;
switch (G__10414) {
case 2:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10412.length)].join('')));

}
});

figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2 = (function (stream,args){
figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),"figwheel-repl-print",new cljs.core.Keyword(null,"content","content",15833224),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"stream","stream",1534941648),stream,new cljs.core.Keyword(null,"args","args",1315556576),args], null)], null));

return null;
});

figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1 = (function (args){
return figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"out","out",-910545517),args);
});

figwheel.client.figwheel_repl_print.cljs$lang$maxFixedArity = 2;

figwheel.client.console_out_print = (function figwheel$client$console_out_print(args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
});
figwheel.client.console_err_print = (function figwheel$client$console_err_print(args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
});
figwheel.client.repl_out_print_fn = (function figwheel$client$repl_out_print_fn(var_args){
var args__27351__auto__ = [];
var len__27348__auto___10420 = arguments.length;
var i__27349__auto___10421 = (0);
while(true){
if((i__27349__auto___10421 < len__27348__auto___10420)){
args__27351__auto__.push((arguments[i__27349__auto___10421]));

var G__10422 = (i__27349__auto___10421 + (1));
i__27349__auto___10421 = G__10422;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.console_out_print.call(null,args);

figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"out","out",-910545517),args);

return null;
});

figwheel.client.repl_out_print_fn.cljs$lang$maxFixedArity = (0);

figwheel.client.repl_out_print_fn.cljs$lang$applyTo = (function (seq10419){
return figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq10419));
});

figwheel.client.repl_err_print_fn = (function figwheel$client$repl_err_print_fn(var_args){
var args__27351__auto__ = [];
var len__27348__auto___10424 = arguments.length;
var i__27349__auto___10425 = (0);
while(true){
if((i__27349__auto___10425 < len__27348__auto___10424)){
args__27351__auto__.push((arguments[i__27349__auto___10425]));

var G__10426 = (i__27349__auto___10425 + (1));
i__27349__auto___10425 = G__10426;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
figwheel.client.console_err_print.call(null,args);

figwheel.client.figwheel_repl_print.call(null,new cljs.core.Keyword(null,"err","err",-2089457205),args);

return null;
});

figwheel.client.repl_err_print_fn.cljs$lang$maxFixedArity = (0);

figwheel.client.repl_err_print_fn.cljs$lang$applyTo = (function (seq10423){
return figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq10423));
});

figwheel.client.enable_repl_print_BANG_ = (function figwheel$client$enable_repl_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core.set_print_fn_BANG_.call(null,figwheel.client.repl_out_print_fn);

cljs.core.set_print_err_fn_BANG_.call(null,figwheel.client.repl_err_print_fn);

return null;
});
figwheel.client.autoload_QMARK_ = (cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?(function (){
var pred__10427 = cljs.core._EQ_;
var expr__10428 = (function (){var or__26817__auto__ = (function (){try{if(cljs.core.truth_(typeof localstorage !== 'undefined')){
return localStorage.getItem("figwheel_autoload");
} else {
return null;
}
}catch (e10431){if((e10431 instanceof Error)){
var e = e10431;
return false;
} else {
throw e10431;

}
}})();
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return "true";
}
})();
if(cljs.core.truth_(pred__10427.call(null,"true",expr__10428))){
return true;
} else {
if(cljs.core.truth_(pred__10427.call(null,"false",expr__10428))){
return false;
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__10428)].join('')));
}
}
}):(function (){
return true;
}));
figwheel.client.toggle_autoload = (function figwheel$client$toggle_autoload(){
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
try{if(cljs.core.truth_(typeof localstorage !== 'undefined')){
localStorage.setItem("figwheel_autoload",cljs.core.not.call(null,figwheel.client.autoload_QMARK_.call(null)));
} else {
}

return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str("Figwheel autoloading "),cljs.core.str((cljs.core.truth_(figwheel.client.autoload_QMARK_.call(null))?"ON":"OFF"))].join(''));
}catch (e10433){if((e10433 instanceof Error)){
var e = e10433;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str("Unable to access localStorage")].join(''));
} else {
throw e10433;

}
}} else {
return null;
}
});
goog.exportSymbol('figwheel.client.toggle_autoload', figwheel.client.toggle_autoload);
figwheel.client.get_essential_messages = (function figwheel$client$get_essential_messages(ed){
if(cljs.core.truth_(ed)){
return cljs.core.cons.call(null,cljs.core.select_keys.call(null,ed,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"class","class",-2030961996)], null)),figwheel$client$get_essential_messages.call(null,new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(ed)));
} else {
return null;
}
});
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__10434){
var map__10437 = p__10434;
var map__10437__$1 = ((((!((map__10437 == null)))?((((map__10437.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10437.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10437):map__10437);
var message = cljs.core.get.call(null,map__10437__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__10437__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
return [cljs.core.str(class$),cljs.core.str(" : "),cljs.core.str(message)].join('');
});
figwheel.client.format_messages = cljs.core.comp.call(null,cljs.core.partial.call(null,cljs.core.map,figwheel.client.error_msg_format),figwheel.client.get_essential_messages);
figwheel.client.focus_msgs = (function figwheel$client$focus_msgs(name_set,msg_hist){
return cljs.core.cons.call(null,cljs.core.first.call(null,msg_hist),cljs.core.filter.call(null,cljs.core.comp.call(null,name_set,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863)),cljs.core.rest.call(null,msg_hist)));
});
figwheel.client.reload_file_QMARK__STAR_ = (function figwheel$client$reload_file_QMARK__STAR_(msg_name,opts){
var or__26817__auto__ = new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return cljs.core.not_EQ_.call(null,msg_name,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356));
}
});
figwheel.client.reload_file_state_QMARK_ = (function figwheel$client$reload_file_state_QMARK_(msg_names,opts){
var and__26809__auto__ = cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563));
if(and__26809__auto__){
return figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts);
} else {
return and__26809__auto__;
}
});
figwheel.client.block_reload_file_state_QMARK_ = (function figwheel$client$block_reload_file_state_QMARK_(msg_names,opts){
return (cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))) && (cljs.core.not.call(null,figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts)));
});
figwheel.client.warning_append_state_QMARK_ = (function figwheel$client$warning_append_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.warning_state_QMARK_ = (function figwheel$client$warning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),cljs.core.first.call(null,msg_names));
});
figwheel.client.rewarning_state_QMARK_ = (function figwheel$client$rewarning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(3),msg_names));
});
figwheel.client.compile_fail_state_QMARK_ = (function figwheel$client$compile_fail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),cljs.core.first.call(null,msg_names));
});
figwheel.client.compile_refail_state_QMARK_ = (function figwheel$client$compile_refail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.css_loaded_state_QMARK_ = (function figwheel$client$css_loaded_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874),cljs.core.first.call(null,msg_names));
});
figwheel.client.file_reloader_plugin = (function figwheel$client$file_reloader_plugin(opts){
var ch = cljs.core.async.chan.call(null);
var c__7446__auto___10599 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7446__auto___10599,ch){
return (function (){
var f__7447__auto__ = (function (){var switch__7425__auto__ = ((function (c__7446__auto___10599,ch){
return (function (state_10568){
var state_val_10569 = (state_10568[(1)]);
if((state_val_10569 === (7))){
var inst_10564 = (state_10568[(2)]);
var state_10568__$1 = state_10568;
var statearr_10570_10600 = state_10568__$1;
(statearr_10570_10600[(2)] = inst_10564);

(statearr_10570_10600[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (1))){
var state_10568__$1 = state_10568;
var statearr_10571_10601 = state_10568__$1;
(statearr_10571_10601[(2)] = null);

(statearr_10571_10601[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (4))){
var inst_10521 = (state_10568[(7)]);
var inst_10521__$1 = (state_10568[(2)]);
var state_10568__$1 = (function (){var statearr_10572 = state_10568;
(statearr_10572[(7)] = inst_10521__$1);

return statearr_10572;
})();
if(cljs.core.truth_(inst_10521__$1)){
var statearr_10573_10602 = state_10568__$1;
(statearr_10573_10602[(1)] = (5));

} else {
var statearr_10574_10603 = state_10568__$1;
(statearr_10574_10603[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (15))){
var inst_10528 = (state_10568[(8)]);
var inst_10543 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_10528);
var inst_10544 = cljs.core.first.call(null,inst_10543);
var inst_10545 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_10544);
var inst_10546 = [cljs.core.str("Figwheel: Not loading code with warnings - "),cljs.core.str(inst_10545)].join('');
var inst_10547 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),inst_10546);
var state_10568__$1 = state_10568;
var statearr_10575_10604 = state_10568__$1;
(statearr_10575_10604[(2)] = inst_10547);

(statearr_10575_10604[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (13))){
var inst_10552 = (state_10568[(2)]);
var state_10568__$1 = state_10568;
var statearr_10576_10605 = state_10568__$1;
(statearr_10576_10605[(2)] = inst_10552);

(statearr_10576_10605[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (6))){
var state_10568__$1 = state_10568;
var statearr_10577_10606 = state_10568__$1;
(statearr_10577_10606[(2)] = null);

(statearr_10577_10606[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (17))){
var inst_10550 = (state_10568[(2)]);
var state_10568__$1 = state_10568;
var statearr_10578_10607 = state_10568__$1;
(statearr_10578_10607[(2)] = inst_10550);

(statearr_10578_10607[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (3))){
var inst_10566 = (state_10568[(2)]);
var state_10568__$1 = state_10568;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10568__$1,inst_10566);
} else {
if((state_val_10569 === (12))){
var inst_10527 = (state_10568[(9)]);
var inst_10541 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_10527,opts);
var state_10568__$1 = state_10568;
if(cljs.core.truth_(inst_10541)){
var statearr_10579_10608 = state_10568__$1;
(statearr_10579_10608[(1)] = (15));

} else {
var statearr_10580_10609 = state_10568__$1;
(statearr_10580_10609[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (2))){
var state_10568__$1 = state_10568;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10568__$1,(4),ch);
} else {
if((state_val_10569 === (11))){
var inst_10528 = (state_10568[(8)]);
var inst_10533 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_10534 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_10528);
var inst_10535 = cljs.core.async.timeout.call(null,(1000));
var inst_10536 = [inst_10534,inst_10535];
var inst_10537 = (new cljs.core.PersistentVector(null,2,(5),inst_10533,inst_10536,null));
var state_10568__$1 = state_10568;
return cljs.core.async.ioc_alts_BANG_.call(null,state_10568__$1,(14),inst_10537);
} else {
if((state_val_10569 === (9))){
var inst_10528 = (state_10568[(8)]);
var inst_10554 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),"Figwheel: code autoloading is OFF");
var inst_10555 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_10528);
var inst_10556 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_10555);
var inst_10557 = [cljs.core.str("Not loading: "),cljs.core.str(inst_10556)].join('');
var inst_10558 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),inst_10557);
var state_10568__$1 = (function (){var statearr_10581 = state_10568;
(statearr_10581[(10)] = inst_10554);

return statearr_10581;
})();
var statearr_10582_10610 = state_10568__$1;
(statearr_10582_10610[(2)] = inst_10558);

(statearr_10582_10610[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (5))){
var inst_10521 = (state_10568[(7)]);
var inst_10523 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_10524 = (new cljs.core.PersistentArrayMap(null,2,inst_10523,null));
var inst_10525 = (new cljs.core.PersistentHashSet(null,inst_10524,null));
var inst_10526 = figwheel.client.focus_msgs.call(null,inst_10525,inst_10521);
var inst_10527 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_10526);
var inst_10528 = cljs.core.first.call(null,inst_10526);
var inst_10529 = figwheel.client.autoload_QMARK_.call(null);
var state_10568__$1 = (function (){var statearr_10583 = state_10568;
(statearr_10583[(8)] = inst_10528);

(statearr_10583[(9)] = inst_10527);

return statearr_10583;
})();
if(cljs.core.truth_(inst_10529)){
var statearr_10584_10611 = state_10568__$1;
(statearr_10584_10611[(1)] = (8));

} else {
var statearr_10585_10612 = state_10568__$1;
(statearr_10585_10612[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (14))){
var inst_10539 = (state_10568[(2)]);
var state_10568__$1 = state_10568;
var statearr_10586_10613 = state_10568__$1;
(statearr_10586_10613[(2)] = inst_10539);

(statearr_10586_10613[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (16))){
var state_10568__$1 = state_10568;
var statearr_10587_10614 = state_10568__$1;
(statearr_10587_10614[(2)] = null);

(statearr_10587_10614[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (10))){
var inst_10560 = (state_10568[(2)]);
var state_10568__$1 = (function (){var statearr_10588 = state_10568;
(statearr_10588[(11)] = inst_10560);

return statearr_10588;
})();
var statearr_10589_10615 = state_10568__$1;
(statearr_10589_10615[(2)] = null);

(statearr_10589_10615[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10569 === (8))){
var inst_10527 = (state_10568[(9)]);
var inst_10531 = figwheel.client.reload_file_state_QMARK_.call(null,inst_10527,opts);
var state_10568__$1 = state_10568;
if(cljs.core.truth_(inst_10531)){
var statearr_10590_10616 = state_10568__$1;
(statearr_10590_10616[(1)] = (11));

} else {
var statearr_10591_10617 = state_10568__$1;
(statearr_10591_10617[(1)] = (12));

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
});})(c__7446__auto___10599,ch))
;
return ((function (switch__7425__auto__,c__7446__auto___10599,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__7426__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__7426__auto____0 = (function (){
var statearr_10595 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_10595[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__7426__auto__);

(statearr_10595[(1)] = (1));

return statearr_10595;
});
var figwheel$client$file_reloader_plugin_$_state_machine__7426__auto____1 = (function (state_10568){
while(true){
var ret_value__7427__auto__ = (function (){try{while(true){
var result__7428__auto__ = switch__7425__auto__.call(null,state_10568);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7428__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7428__auto__;
}
break;
}
}catch (e10596){if((e10596 instanceof Object)){
var ex__7429__auto__ = e10596;
var statearr_10597_10618 = state_10568;
(statearr_10597_10618[(5)] = ex__7429__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10568);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10596;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7427__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10619 = state_10568;
state_10568 = G__10619;
continue;
} else {
return ret_value__7427__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__7426__auto__ = function(state_10568){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__7426__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__7426__auto____1.call(this,state_10568);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__7426__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__7426__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__7426__auto__;
})()
;})(switch__7425__auto__,c__7446__auto___10599,ch))
})();
var state__7448__auto__ = (function (){var statearr_10598 = f__7447__auto__.call(null);
(statearr_10598[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7446__auto___10599);

return statearr_10598;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7448__auto__);
});})(c__7446__auto___10599,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__10620_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__10620_SHARP_));
}),clojure.string.split_lines.call(null,stack_str));
});
figwheel.client.get_ua_product = (function figwheel$client$get_ua_product(){
if(cljs.core.truth_(figwheel.client.utils.node_env_QMARK_.call(null))){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.SAFARI)){
return new cljs.core.Keyword(null,"safari","safari",497115653);
} else {
if(cljs.core.truth_(goog.userAgent.product.CHROME)){
return new cljs.core.Keyword(null,"chrome","chrome",1718738387);
} else {
if(cljs.core.truth_(goog.userAgent.product.FIREFOX)){
return new cljs.core.Keyword(null,"firefox","firefox",1283768880);
} else {
if(cljs.core.truth_(goog.userAgent.product.IE)){
return new cljs.core.Keyword(null,"ie","ie",2038473780);
} else {
return null;
}
}
}
}
}
});
var base_path_10623 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_10623){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{figwheel.client.enable_repl_print_BANG_.call(null);

var result_value = figwheel.client.utils.eval_helper.call(null,code,opts);
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),result_value], null));
}catch (e10622){if((e10622 instanceof Error)){
var e = e10622;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_10623], null));
} else {
var e = e10622;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}finally {figwheel.client.enable_repl_print_BANG_.call(null);
}});})(base_path_10623))
;
/**
 * The REPL can disconnect and reconnect lets ensure cljs.user exists at least.
 */
figwheel.client.ensure_cljs_user = (function figwheel$client$ensure_cljs_user(){
if(cljs.core.truth_(cljs.user)){
return null;
} else {
return cljs.user = {};
}
});
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__10624){
var map__10633 = p__10624;
var map__10633__$1 = ((((!((map__10633 == null)))?((((map__10633.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10633.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10633):map__10633);
var opts = map__10633__$1;
var build_id = cljs.core.get.call(null,map__10633__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__10633,map__10633__$1,opts,build_id){
return (function (p__10635){
var vec__10636 = p__10635;
var seq__10637 = cljs.core.seq.call(null,vec__10636);
var first__10638 = cljs.core.first.call(null,seq__10637);
var seq__10637__$1 = cljs.core.next.call(null,seq__10637);
var map__10639 = first__10638;
var map__10639__$1 = ((((!((map__10639 == null)))?((((map__10639.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10639.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10639):map__10639);
var msg = map__10639__$1;
var msg_name = cljs.core.get.call(null,map__10639__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__10637__$1;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,((function (vec__10636,seq__10637,first__10638,seq__10637__$1,map__10639,map__10639__$1,msg,msg_name,_,map__10633,map__10633__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__10636,seq__10637,first__10638,seq__10637__$1,map__10639,map__10639__$1,msg,msg_name,_,map__10633,map__10633__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__10633,map__10633__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__10647){
var vec__10648 = p__10647;
var seq__10649 = cljs.core.seq.call(null,vec__10648);
var first__10650 = cljs.core.first.call(null,seq__10649);
var seq__10649__$1 = cljs.core.next.call(null,seq__10649);
var map__10651 = first__10650;
var map__10651__$1 = ((((!((map__10651 == null)))?((((map__10651.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10651.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10651):map__10651);
var msg = map__10651__$1;
var msg_name = cljs.core.get.call(null,map__10651__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__10649__$1;
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__10653){
var map__10665 = p__10653;
var map__10665__$1 = ((((!((map__10665 == null)))?((((map__10665.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10665.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10665):map__10665);
var on_compile_warning = cljs.core.get.call(null,map__10665__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__10665__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__10665,map__10665__$1,on_compile_warning,on_compile_fail){
return (function (p__10667){
var vec__10668 = p__10667;
var seq__10669 = cljs.core.seq.call(null,vec__10668);
var first__10670 = cljs.core.first.call(null,seq__10669);
var seq__10669__$1 = cljs.core.next.call(null,seq__10669);
var map__10671 = first__10670;
var map__10671__$1 = ((((!((map__10671 == null)))?((((map__10671.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10671.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10671):map__10671);
var msg = map__10671__$1;
var msg_name = cljs.core.get.call(null,map__10671__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__10669__$1;
var pred__10673 = cljs.core._EQ_;
var expr__10674 = msg_name;
if(cljs.core.truth_(pred__10673.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__10674))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__10673.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__10674))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__10665,map__10665__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__7446__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7446__auto__,msg_hist,msg_names,msg){
return (function (){
var f__7447__auto__ = (function (){var switch__7425__auto__ = ((function (c__7446__auto__,msg_hist,msg_names,msg){
return (function (state_10882){
var state_val_10883 = (state_10882[(1)]);
if((state_val_10883 === (7))){
var inst_10810 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
if(cljs.core.truth_(inst_10810)){
var statearr_10884_10930 = state_10882__$1;
(statearr_10884_10930[(1)] = (8));

} else {
var statearr_10885_10931 = state_10882__$1;
(statearr_10885_10931[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (20))){
var inst_10876 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10886_10932 = state_10882__$1;
(statearr_10886_10932[(2)] = inst_10876);

(statearr_10886_10932[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (27))){
var inst_10872 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10887_10933 = state_10882__$1;
(statearr_10887_10933[(2)] = inst_10872);

(statearr_10887_10933[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (1))){
var inst_10803 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_10882__$1 = state_10882;
if(cljs.core.truth_(inst_10803)){
var statearr_10888_10934 = state_10882__$1;
(statearr_10888_10934[(1)] = (2));

} else {
var statearr_10889_10935 = state_10882__$1;
(statearr_10889_10935[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (24))){
var inst_10874 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10890_10936 = state_10882__$1;
(statearr_10890_10936[(2)] = inst_10874);

(statearr_10890_10936[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (4))){
var inst_10880 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10882__$1,inst_10880);
} else {
if((state_val_10883 === (15))){
var inst_10878 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10891_10937 = state_10882__$1;
(statearr_10891_10937[(2)] = inst_10878);

(statearr_10891_10937[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (21))){
var inst_10837 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10892_10938 = state_10882__$1;
(statearr_10892_10938[(2)] = inst_10837);

(statearr_10892_10938[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (31))){
var inst_10861 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_10882__$1 = state_10882;
if(cljs.core.truth_(inst_10861)){
var statearr_10893_10939 = state_10882__$1;
(statearr_10893_10939[(1)] = (34));

} else {
var statearr_10894_10940 = state_10882__$1;
(statearr_10894_10940[(1)] = (35));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (32))){
var inst_10870 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10895_10941 = state_10882__$1;
(statearr_10895_10941[(2)] = inst_10870);

(statearr_10895_10941[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (33))){
var inst_10859 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10896_10942 = state_10882__$1;
(statearr_10896_10942[(2)] = inst_10859);

(statearr_10896_10942[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (13))){
var inst_10824 = figwheel.client.heads_up.clear.call(null);
var state_10882__$1 = state_10882;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10882__$1,(16),inst_10824);
} else {
if((state_val_10883 === (22))){
var inst_10841 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_10842 = figwheel.client.heads_up.append_warning_message.call(null,inst_10841);
var state_10882__$1 = state_10882;
var statearr_10897_10943 = state_10882__$1;
(statearr_10897_10943[(2)] = inst_10842);

(statearr_10897_10943[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (36))){
var inst_10868 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10898_10944 = state_10882__$1;
(statearr_10898_10944[(2)] = inst_10868);

(statearr_10898_10944[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (29))){
var inst_10852 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10899_10945 = state_10882__$1;
(statearr_10899_10945[(2)] = inst_10852);

(statearr_10899_10945[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (6))){
var inst_10805 = (state_10882[(7)]);
var state_10882__$1 = state_10882;
var statearr_10900_10946 = state_10882__$1;
(statearr_10900_10946[(2)] = inst_10805);

(statearr_10900_10946[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (28))){
var inst_10848 = (state_10882[(2)]);
var inst_10849 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_10850 = figwheel.client.heads_up.display_warning.call(null,inst_10849);
var state_10882__$1 = (function (){var statearr_10901 = state_10882;
(statearr_10901[(8)] = inst_10848);

return statearr_10901;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10882__$1,(29),inst_10850);
} else {
if((state_val_10883 === (25))){
var inst_10846 = figwheel.client.heads_up.clear.call(null);
var state_10882__$1 = state_10882;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10882__$1,(28),inst_10846);
} else {
if((state_val_10883 === (34))){
var inst_10863 = figwheel.client.heads_up.flash_loaded.call(null);
var state_10882__$1 = state_10882;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10882__$1,(37),inst_10863);
} else {
if((state_val_10883 === (17))){
var inst_10830 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10902_10947 = state_10882__$1;
(statearr_10902_10947[(2)] = inst_10830);

(statearr_10902_10947[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (3))){
var inst_10822 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_10882__$1 = state_10882;
if(cljs.core.truth_(inst_10822)){
var statearr_10903_10948 = state_10882__$1;
(statearr_10903_10948[(1)] = (13));

} else {
var statearr_10904_10949 = state_10882__$1;
(statearr_10904_10949[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (12))){
var inst_10818 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10905_10950 = state_10882__$1;
(statearr_10905_10950[(2)] = inst_10818);

(statearr_10905_10950[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (2))){
var inst_10805 = (state_10882[(7)]);
var inst_10805__$1 = figwheel.client.autoload_QMARK_.call(null);
var state_10882__$1 = (function (){var statearr_10906 = state_10882;
(statearr_10906[(7)] = inst_10805__$1);

return statearr_10906;
})();
if(cljs.core.truth_(inst_10805__$1)){
var statearr_10907_10951 = state_10882__$1;
(statearr_10907_10951[(1)] = (5));

} else {
var statearr_10908_10952 = state_10882__$1;
(statearr_10908_10952[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (23))){
var inst_10844 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_10882__$1 = state_10882;
if(cljs.core.truth_(inst_10844)){
var statearr_10909_10953 = state_10882__$1;
(statearr_10909_10953[(1)] = (25));

} else {
var statearr_10910_10954 = state_10882__$1;
(statearr_10910_10954[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (35))){
var state_10882__$1 = state_10882;
var statearr_10911_10955 = state_10882__$1;
(statearr_10911_10955[(2)] = null);

(statearr_10911_10955[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (19))){
var inst_10839 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_10882__$1 = state_10882;
if(cljs.core.truth_(inst_10839)){
var statearr_10912_10956 = state_10882__$1;
(statearr_10912_10956[(1)] = (22));

} else {
var statearr_10913_10957 = state_10882__$1;
(statearr_10913_10957[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (11))){
var inst_10814 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10914_10958 = state_10882__$1;
(statearr_10914_10958[(2)] = inst_10814);

(statearr_10914_10958[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (9))){
var inst_10816 = figwheel.client.heads_up.clear.call(null);
var state_10882__$1 = state_10882;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10882__$1,(12),inst_10816);
} else {
if((state_val_10883 === (5))){
var inst_10807 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_10882__$1 = state_10882;
var statearr_10915_10959 = state_10882__$1;
(statearr_10915_10959[(2)] = inst_10807);

(statearr_10915_10959[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (14))){
var inst_10832 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_10882__$1 = state_10882;
if(cljs.core.truth_(inst_10832)){
var statearr_10916_10960 = state_10882__$1;
(statearr_10916_10960[(1)] = (18));

} else {
var statearr_10917_10961 = state_10882__$1;
(statearr_10917_10961[(1)] = (19));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (26))){
var inst_10854 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_10882__$1 = state_10882;
if(cljs.core.truth_(inst_10854)){
var statearr_10918_10962 = state_10882__$1;
(statearr_10918_10962[(1)] = (30));

} else {
var statearr_10919_10963 = state_10882__$1;
(statearr_10919_10963[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (16))){
var inst_10826 = (state_10882[(2)]);
var inst_10827 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_10828 = figwheel.client.heads_up.display_exception.call(null,inst_10827);
var state_10882__$1 = (function (){var statearr_10920 = state_10882;
(statearr_10920[(9)] = inst_10826);

return statearr_10920;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10882__$1,(17),inst_10828);
} else {
if((state_val_10883 === (30))){
var inst_10856 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_10857 = figwheel.client.heads_up.display_warning.call(null,inst_10856);
var state_10882__$1 = state_10882;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10882__$1,(33),inst_10857);
} else {
if((state_val_10883 === (10))){
var inst_10820 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10921_10964 = state_10882__$1;
(statearr_10921_10964[(2)] = inst_10820);

(statearr_10921_10964[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (18))){
var inst_10834 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_10835 = figwheel.client.heads_up.display_exception.call(null,inst_10834);
var state_10882__$1 = state_10882;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10882__$1,(21),inst_10835);
} else {
if((state_val_10883 === (37))){
var inst_10865 = (state_10882[(2)]);
var state_10882__$1 = state_10882;
var statearr_10922_10965 = state_10882__$1;
(statearr_10922_10965[(2)] = inst_10865);

(statearr_10922_10965[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10883 === (8))){
var inst_10812 = figwheel.client.heads_up.flash_loaded.call(null);
var state_10882__$1 = state_10882;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10882__$1,(11),inst_10812);
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
});})(c__7446__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__7425__auto__,c__7446__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__7426__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__7426__auto____0 = (function (){
var statearr_10926 = [null,null,null,null,null,null,null,null,null,null];
(statearr_10926[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__7426__auto__);

(statearr_10926[(1)] = (1));

return statearr_10926;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__7426__auto____1 = (function (state_10882){
while(true){
var ret_value__7427__auto__ = (function (){try{while(true){
var result__7428__auto__ = switch__7425__auto__.call(null,state_10882);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7428__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7428__auto__;
}
break;
}
}catch (e10927){if((e10927 instanceof Object)){
var ex__7429__auto__ = e10927;
var statearr_10928_10966 = state_10882;
(statearr_10928_10966[(5)] = ex__7429__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10882);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10927;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7427__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10967 = state_10882;
state_10882 = G__10967;
continue;
} else {
return ret_value__7427__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__7426__auto__ = function(state_10882){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__7426__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__7426__auto____1.call(this,state_10882);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__7426__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__7426__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__7426__auto__;
})()
;})(switch__7425__auto__,c__7446__auto__,msg_hist,msg_names,msg))
})();
var state__7448__auto__ = (function (){var statearr_10929 = f__7447__auto__.call(null);
(statearr_10929[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7446__auto__);

return statearr_10929;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7448__auto__);
});})(c__7446__auto__,msg_hist,msg_names,msg))
);

return c__7446__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__7446__auto___11030 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7446__auto___11030,ch){
return (function (){
var f__7447__auto__ = (function (){var switch__7425__auto__ = ((function (c__7446__auto___11030,ch){
return (function (state_11013){
var state_val_11014 = (state_11013[(1)]);
if((state_val_11014 === (1))){
var state_11013__$1 = state_11013;
var statearr_11015_11031 = state_11013__$1;
(statearr_11015_11031[(2)] = null);

(statearr_11015_11031[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11014 === (2))){
var state_11013__$1 = state_11013;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11013__$1,(4),ch);
} else {
if((state_val_11014 === (3))){
var inst_11011 = (state_11013[(2)]);
var state_11013__$1 = state_11013;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11013__$1,inst_11011);
} else {
if((state_val_11014 === (4))){
var inst_11001 = (state_11013[(7)]);
var inst_11001__$1 = (state_11013[(2)]);
var state_11013__$1 = (function (){var statearr_11016 = state_11013;
(statearr_11016[(7)] = inst_11001__$1);

return statearr_11016;
})();
if(cljs.core.truth_(inst_11001__$1)){
var statearr_11017_11032 = state_11013__$1;
(statearr_11017_11032[(1)] = (5));

} else {
var statearr_11018_11033 = state_11013__$1;
(statearr_11018_11033[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11014 === (5))){
var inst_11001 = (state_11013[(7)]);
var inst_11003 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_11001);
var state_11013__$1 = state_11013;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11013__$1,(8),inst_11003);
} else {
if((state_val_11014 === (6))){
var state_11013__$1 = state_11013;
var statearr_11019_11034 = state_11013__$1;
(statearr_11019_11034[(2)] = null);

(statearr_11019_11034[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11014 === (7))){
var inst_11009 = (state_11013[(2)]);
var state_11013__$1 = state_11013;
var statearr_11020_11035 = state_11013__$1;
(statearr_11020_11035[(2)] = inst_11009);

(statearr_11020_11035[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11014 === (8))){
var inst_11005 = (state_11013[(2)]);
var state_11013__$1 = (function (){var statearr_11021 = state_11013;
(statearr_11021[(8)] = inst_11005);

return statearr_11021;
})();
var statearr_11022_11036 = state_11013__$1;
(statearr_11022_11036[(2)] = null);

(statearr_11022_11036[(1)] = (2));


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
});})(c__7446__auto___11030,ch))
;
return ((function (switch__7425__auto__,c__7446__auto___11030,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__7426__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__7426__auto____0 = (function (){
var statearr_11026 = [null,null,null,null,null,null,null,null,null];
(statearr_11026[(0)] = figwheel$client$heads_up_plugin_$_state_machine__7426__auto__);

(statearr_11026[(1)] = (1));

return statearr_11026;
});
var figwheel$client$heads_up_plugin_$_state_machine__7426__auto____1 = (function (state_11013){
while(true){
var ret_value__7427__auto__ = (function (){try{while(true){
var result__7428__auto__ = switch__7425__auto__.call(null,state_11013);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7428__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7428__auto__;
}
break;
}
}catch (e11027){if((e11027 instanceof Object)){
var ex__7429__auto__ = e11027;
var statearr_11028_11037 = state_11013;
(statearr_11028_11037[(5)] = ex__7429__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11013);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11027;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7427__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11038 = state_11013;
state_11013 = G__11038;
continue;
} else {
return ret_value__7427__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__7426__auto__ = function(state_11013){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__7426__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__7426__auto____1.call(this,state_11013);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__7426__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__7426__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__7426__auto__;
})()
;})(switch__7425__auto__,c__7446__auto___11030,ch))
})();
var state__7448__auto__ = (function (){var statearr_11029 = f__7447__auto__.call(null);
(statearr_11029[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7446__auto___11030);

return statearr_11029;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7448__auto__);
});})(c__7446__auto___11030,ch))
);


figwheel.client.heads_up.ensure_container.call(null);

return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.enforce_project_plugin = (function figwheel$client$enforce_project_plugin(opts){
return (function (msg_hist){
if(((1) < cljs.core.count.call(null,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"project-id","project-id",206449307),cljs.core.take.call(null,(5),msg_hist)))))){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different project. Shutting socket down.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__7446__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7446__auto__){
return (function (){
var f__7447__auto__ = (function (){var switch__7425__auto__ = ((function (c__7446__auto__){
return (function (state_11059){
var state_val_11060 = (state_11059[(1)]);
if((state_val_11060 === (1))){
var inst_11054 = cljs.core.async.timeout.call(null,(3000));
var state_11059__$1 = state_11059;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11059__$1,(2),inst_11054);
} else {
if((state_val_11060 === (2))){
var inst_11056 = (state_11059[(2)]);
var inst_11057 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_11059__$1 = (function (){var statearr_11061 = state_11059;
(statearr_11061[(7)] = inst_11056);

return statearr_11061;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11059__$1,inst_11057);
} else {
return null;
}
}
});})(c__7446__auto__))
;
return ((function (switch__7425__auto__,c__7446__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__7426__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__7426__auto____0 = (function (){
var statearr_11065 = [null,null,null,null,null,null,null,null];
(statearr_11065[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__7426__auto__);

(statearr_11065[(1)] = (1));

return statearr_11065;
});
var figwheel$client$enforce_project_plugin_$_state_machine__7426__auto____1 = (function (state_11059){
while(true){
var ret_value__7427__auto__ = (function (){try{while(true){
var result__7428__auto__ = switch__7425__auto__.call(null,state_11059);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7428__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7428__auto__;
}
break;
}
}catch (e11066){if((e11066 instanceof Object)){
var ex__7429__auto__ = e11066;
var statearr_11067_11069 = state_11059;
(statearr_11067_11069[(5)] = ex__7429__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11059);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11066;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7427__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11070 = state_11059;
state_11059 = G__11070;
continue;
} else {
return ret_value__7427__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__7426__auto__ = function(state_11059){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__7426__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__7426__auto____1.call(this,state_11059);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__7426__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__7426__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__7426__auto__;
})()
;})(switch__7425__auto__,c__7446__auto__))
})();
var state__7448__auto__ = (function (){var statearr_11068 = f__7447__auto__.call(null);
(statearr_11068[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7446__auto__);

return statearr_11068;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7448__auto__);
});})(c__7446__auto__))
);

return c__7446__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.enforce_figwheel_version_plugin = (function figwheel$client$enforce_figwheel_version_plugin(opts){
return (function (msg_hist){
var temp__4657__auto__ = new cljs.core.Keyword(null,"figwheel-version","figwheel-version",1409553832).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,msg_hist));
if(cljs.core.truth_(temp__4657__auto__)){
var figwheel_version = temp__4657__auto__;
if(cljs.core.not_EQ_.call(null,figwheel_version,figwheel.client._figwheel_version_)){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different version of Figwheel.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__7446__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7446__auto__,figwheel_version,temp__4657__auto__){
return (function (){
var f__7447__auto__ = (function (){var switch__7425__auto__ = ((function (c__7446__auto__,figwheel_version,temp__4657__auto__){
return (function (state_11093){
var state_val_11094 = (state_11093[(1)]);
if((state_val_11094 === (1))){
var inst_11087 = cljs.core.async.timeout.call(null,(2000));
var state_11093__$1 = state_11093;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11093__$1,(2),inst_11087);
} else {
if((state_val_11094 === (2))){
var inst_11089 = (state_11093[(2)]);
var inst_11090 = [cljs.core.str("Figwheel Client Version \""),cljs.core.str(figwheel.client._figwheel_version_),cljs.core.str("\" is not equal to "),cljs.core.str("Figwheel Sidecar Version \""),cljs.core.str(figwheel_version),cljs.core.str("\""),cljs.core.str(".  Shutting down Websocket Connection!")].join('');
var inst_11091 = figwheel.client.heads_up.display_system_warning.call(null,"Figwheel Client and Server have different versions!!",inst_11090);
var state_11093__$1 = (function (){var statearr_11095 = state_11093;
(statearr_11095[(7)] = inst_11089);

return statearr_11095;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11093__$1,inst_11091);
} else {
return null;
}
}
});})(c__7446__auto__,figwheel_version,temp__4657__auto__))
;
return ((function (switch__7425__auto__,c__7446__auto__,figwheel_version,temp__4657__auto__){
return (function() {
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__7426__auto__ = null;
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__7426__auto____0 = (function (){
var statearr_11099 = [null,null,null,null,null,null,null,null];
(statearr_11099[(0)] = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__7426__auto__);

(statearr_11099[(1)] = (1));

return statearr_11099;
});
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__7426__auto____1 = (function (state_11093){
while(true){
var ret_value__7427__auto__ = (function (){try{while(true){
var result__7428__auto__ = switch__7425__auto__.call(null,state_11093);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7428__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7428__auto__;
}
break;
}
}catch (e11100){if((e11100 instanceof Object)){
var ex__7429__auto__ = e11100;
var statearr_11101_11103 = state_11093;
(statearr_11101_11103[(5)] = ex__7429__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11093);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11100;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7427__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11104 = state_11093;
state_11093 = G__11104;
continue;
} else {
return ret_value__7427__auto__;
}
break;
}
});
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__7426__auto__ = function(state_11093){
switch(arguments.length){
case 0:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__7426__auto____0.call(this);
case 1:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__7426__auto____1.call(this,state_11093);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__7426__auto____0;
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__7426__auto____1;
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__7426__auto__;
})()
;})(switch__7425__auto__,c__7446__auto__,figwheel_version,temp__4657__auto__))
})();
var state__7448__auto__ = (function (){var statearr_11102 = f__7447__auto__.call(null);
(statearr_11102[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7446__auto__);

return statearr_11102;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7448__auto__);
});})(c__7446__auto__,figwheel_version,temp__4657__auto__))
);

return c__7446__auto__;
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.file_line_column = (function figwheel$client$file_line_column(p__11105){
var map__11109 = p__11105;
var map__11109__$1 = ((((!((map__11109 == null)))?((((map__11109.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11109.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11109):map__11109);
var file = cljs.core.get.call(null,map__11109__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__11109__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__11109__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var G__11111 = "";
var G__11111__$1 = (cljs.core.truth_(file)?[cljs.core.str(G__11111),cljs.core.str("file "),cljs.core.str(file)].join(''):G__11111);
var G__11111__$2 = (cljs.core.truth_(line)?[cljs.core.str(G__11111__$1),cljs.core.str(" at line "),cljs.core.str(line)].join(''):G__11111__$1);
if(cljs.core.truth_((function (){var and__26809__auto__ = line;
if(cljs.core.truth_(and__26809__auto__)){
return column;
} else {
return and__26809__auto__;
}
})())){
return [cljs.core.str(G__11111__$2),cljs.core.str(", column "),cljs.core.str(column)].join('');
} else {
return G__11111__$2;
}
});
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__11112){
var map__11119 = p__11112;
var map__11119__$1 = ((((!((map__11119 == null)))?((((map__11119.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11119.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11119):map__11119);
var ed = map__11119__$1;
var formatted_exception = cljs.core.get.call(null,map__11119__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
var exception_data = cljs.core.get.call(null,map__11119__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__11119__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__11121_11125 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__11122_11126 = null;
var count__11123_11127 = (0);
var i__11124_11128 = (0);
while(true){
if((i__11124_11128 < count__11123_11127)){
var msg_11129 = cljs.core._nth.call(null,chunk__11122_11126,i__11124_11128);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_11129);

var G__11130 = seq__11121_11125;
var G__11131 = chunk__11122_11126;
var G__11132 = count__11123_11127;
var G__11133 = (i__11124_11128 + (1));
seq__11121_11125 = G__11130;
chunk__11122_11126 = G__11131;
count__11123_11127 = G__11132;
i__11124_11128 = G__11133;
continue;
} else {
var temp__4657__auto___11134 = cljs.core.seq.call(null,seq__11121_11125);
if(temp__4657__auto___11134){
var seq__11121_11135__$1 = temp__4657__auto___11134;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11121_11135__$1)){
var c__27200__auto___11136 = cljs.core.chunk_first.call(null,seq__11121_11135__$1);
var G__11137 = cljs.core.chunk_rest.call(null,seq__11121_11135__$1);
var G__11138 = c__27200__auto___11136;
var G__11139 = cljs.core.count.call(null,c__27200__auto___11136);
var G__11140 = (0);
seq__11121_11125 = G__11137;
chunk__11122_11126 = G__11138;
count__11123_11127 = G__11139;
i__11124_11128 = G__11140;
continue;
} else {
var msg_11141 = cljs.core.first.call(null,seq__11121_11135__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_11141);

var G__11142 = cljs.core.next.call(null,seq__11121_11135__$1);
var G__11143 = null;
var G__11144 = (0);
var G__11145 = (0);
seq__11121_11125 = G__11142;
chunk__11122_11126 = G__11143;
count__11123_11127 = G__11144;
i__11124_11128 = G__11145;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cause)){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str("Error on "),cljs.core.str(figwheel.client.file_line_column.call(null,ed))].join(''));
} else {
}

return ed;
});
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__11146){
var map__11149 = p__11146;
var map__11149__$1 = ((((!((map__11149 == null)))?((((map__11149.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11149.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11149):map__11149);
var w = map__11149__$1;
var message = cljs.core.get.call(null,map__11149__$1,new cljs.core.Keyword(null,"message","message",-406056002));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),[cljs.core.str("Figwheel: Compile Warning - "),cljs.core.str(new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(message)),cljs.core.str(" in "),cljs.core.str(figwheel.client.file_line_column.call(null,message))].join(''));

return w;
});
figwheel.client.default_before_load = (function figwheel$client$default_before_load(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: notified of file changes");

return files;
});
figwheel.client.default_on_cssload = (function figwheel$client$default_on_cssload(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded CSS files");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),cljs.core.pr_str.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files)));

return files;
});
if(typeof figwheel.client.config_defaults !== 'undefined'){
} else {
figwheel.client.config_defaults = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947),new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430),new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202),new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128),new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223),new cljs.core.Keyword(null,"eval-fn","eval-fn",-1111644294),new cljs.core.Keyword(null,"retry-count","retry-count",1936122875),new cljs.core.Keyword(null,"autoload","autoload",-354122500),new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318)],[new cljs.core.Var(function(){return figwheel.client.default_on_compile_warning;},new cljs.core.Symbol("figwheel.client","default-on-compile-warning","figwheel.client/default-on-compile-warning",584144208,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"figwheel.client","figwheel.client",-538710252,null),new cljs.core.Symbol(null,"default-on-compile-warning","default-on-compile-warning",-18911586,null),"resources/public/js/dev/main/figwheel/client.cljs",33,1,323,323,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"message","message",1234475525,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"w","w",1994700528,null)], null)], null)),null,(cljs.core.truth_(figwheel.client.default_on_compile_warning)?figwheel.client.default_on_compile_warning.cljs$lang$test:null)])),figwheel.client.default_on_jsload,true,new cljs.core.Var(function(){return figwheel.client.default_on_compile_fail;},new cljs.core.Symbol("figwheel.client","default-on-compile-fail","figwheel.client/default-on-compile-fail",1384826337,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"figwheel.client","figwheel.client",-538710252,null),new cljs.core.Symbol(null,"default-on-compile-fail","default-on-compile-fail",-158814813,null),"resources/public/js/dev/main/figwheel/client.cljs",30,1,315,315,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"keys","keys",1068423698),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"formatted-exception","formatted-exception",1524042501,null),new cljs.core.Symbol(null,"exception-data","exception-data",1128056641,null),new cljs.core.Symbol(null,"cause","cause",1872432779,null)], null),new cljs.core.Keyword(null,"as","as",1148689641),new cljs.core.Symbol(null,"ed","ed",2076825751,null)], null)], null)),null,(cljs.core.truth_(figwheel.client.default_on_compile_fail)?figwheel.client.default_on_compile_fail.cljs$lang$test:null)])),false,true,[cljs.core.str("ws://"),cljs.core.str((cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?location.host:"localhost:3449")),cljs.core.str("/figwheel-ws")].join(''),figwheel.client.default_before_load,false,false,(100),true,figwheel.client.default_on_cssload]);
}
figwheel.client.handle_deprecated_jsload_callback = (function figwheel$client$handle_deprecated_jsload_callback(config){
if(cljs.core.truth_(new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config))){
return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,config,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369));
} else {
return config;
}
});
figwheel.client.fill_url_template = (function figwheel$client$fill_url_template(config){
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
return cljs.core.update_in.call(null,config,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938)], null),(function (x){
return clojure.string.replace.call(null,clojure.string.replace.call(null,x,"[[client-hostname]]",location.hostname),"[[client-port]]",location.port);
}));
} else {
return config;
}
});
figwheel.client.base_plugins = (function figwheel$client$base_plugins(system_options){
var base = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"enforce-project-plugin","enforce-project-plugin",959402899),figwheel.client.enforce_project_plugin,new cljs.core.Keyword(null,"enforce-figwheel-version-plugin","enforce-figwheel-version-plugin",-1916185220),figwheel.client.enforce_figwheel_version_plugin,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),figwheel.client.file_reloader_plugin,new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),figwheel.client.compile_fail_warning_plugin,new cljs.core.Keyword(null,"css-reloader-plugin","css-reloader-plugin",2002032904),figwheel.client.css_reloader_plugin,new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371),figwheel.client.repl_plugin], null);
var base__$1 = ((cljs.core.not.call(null,figwheel.client.utils.html_env_QMARK_.call(null)))?cljs.core.select_keys.call(null,base,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371)], null)):base);
var base__$2 = ((new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(system_options) === false)?cljs.core.dissoc.call(null,base__$1,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733)):base__$1);
if(cljs.core.truth_((function (){var and__26809__auto__ = new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(system_options);
if(cljs.core.truth_(and__26809__auto__)){
return figwheel.client.utils.html_env_QMARK_.call(null);
} else {
return and__26809__auto__;
}
})())){
return cljs.core.assoc.call(null,base__$2,new cljs.core.Keyword(null,"heads-up-display-plugin","heads-up-display-plugin",1745207501),figwheel.client.heads_up_plugin);
} else {
return base__$2;
}
});
figwheel.client.add_message_watch = (function figwheel$client$add_message_watch(key,callback){
return cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,key,(function (_,___$1,___$2,msg_hist){
return callback.call(null,cljs.core.first.call(null,msg_hist));
}));
});
figwheel.client.add_plugins = (function figwheel$client$add_plugins(plugins,system_options){
var seq__11161 = cljs.core.seq.call(null,plugins);
var chunk__11162 = null;
var count__11163 = (0);
var i__11164 = (0);
while(true){
if((i__11164 < count__11163)){
var vec__11165 = cljs.core._nth.call(null,chunk__11162,i__11164);
var k = cljs.core.nth.call(null,vec__11165,(0),null);
var plugin = cljs.core.nth.call(null,vec__11165,(1),null);
if(cljs.core.truth_(plugin)){
var pl_11171 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__11161,chunk__11162,count__11163,i__11164,pl_11171,vec__11165,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_11171.call(null,msg_hist);
});})(seq__11161,chunk__11162,count__11163,i__11164,pl_11171,vec__11165,k,plugin))
);
} else {
}

var G__11172 = seq__11161;
var G__11173 = chunk__11162;
var G__11174 = count__11163;
var G__11175 = (i__11164 + (1));
seq__11161 = G__11172;
chunk__11162 = G__11173;
count__11163 = G__11174;
i__11164 = G__11175;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__11161);
if(temp__4657__auto__){
var seq__11161__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11161__$1)){
var c__27200__auto__ = cljs.core.chunk_first.call(null,seq__11161__$1);
var G__11176 = cljs.core.chunk_rest.call(null,seq__11161__$1);
var G__11177 = c__27200__auto__;
var G__11178 = cljs.core.count.call(null,c__27200__auto__);
var G__11179 = (0);
seq__11161 = G__11176;
chunk__11162 = G__11177;
count__11163 = G__11178;
i__11164 = G__11179;
continue;
} else {
var vec__11168 = cljs.core.first.call(null,seq__11161__$1);
var k = cljs.core.nth.call(null,vec__11168,(0),null);
var plugin = cljs.core.nth.call(null,vec__11168,(1),null);
if(cljs.core.truth_(plugin)){
var pl_11180 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__11161,chunk__11162,count__11163,i__11164,pl_11180,vec__11168,k,plugin,seq__11161__$1,temp__4657__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_11180.call(null,msg_hist);
});})(seq__11161,chunk__11162,count__11163,i__11164,pl_11180,vec__11168,k,plugin,seq__11161__$1,temp__4657__auto__))
);
} else {
}

var G__11181 = cljs.core.next.call(null,seq__11161__$1);
var G__11182 = null;
var G__11183 = (0);
var G__11184 = (0);
seq__11161 = G__11181;
chunk__11162 = G__11182;
count__11163 = G__11183;
i__11164 = G__11184;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.start = (function figwheel$client$start(var_args){
var args11185 = [];
var len__27348__auto___11192 = arguments.length;
var i__27349__auto___11193 = (0);
while(true){
if((i__27349__auto___11193 < len__27348__auto___11192)){
args11185.push((arguments[i__27349__auto___11193]));

var G__11194 = (i__27349__auto___11193 + (1));
i__27349__auto___11193 = G__11194;
continue;
} else {
}
break;
}

var G__11187 = args11185.length;
switch (G__11187) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11185.length)].join('')));

}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$1 = (function (opts){
if((goog.dependencies_ == null)){
return null;
} else {
if(typeof figwheel.client.__figwheel_start_once__ !== 'undefined'){
return null;
} else {
figwheel.client.__figwheel_start_once__ = setTimeout((function (){
var plugins_SINGLEQUOTE_ = new cljs.core.Keyword(null,"plugins","plugins",1900073717).cljs$core$IFn$_invoke$arity$1(opts);
var merge_plugins = new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370).cljs$core$IFn$_invoke$arity$1(opts);
var system_options = figwheel.client.fill_url_template.call(null,figwheel.client.handle_deprecated_jsload_callback.call(null,cljs.core.merge.call(null,figwheel.client.config_defaults,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"plugins","plugins",1900073717),new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370)))));
var plugins = (cljs.core.truth_(plugins_SINGLEQUOTE_)?plugins_SINGLEQUOTE_:cljs.core.merge.call(null,figwheel.client.base_plugins.call(null,system_options),merge_plugins));
figwheel.client.utils._STAR_print_debug_STAR_ = new cljs.core.Keyword(null,"debug","debug",-1608172596).cljs$core$IFn$_invoke$arity$1(opts);

figwheel.client.enable_repl_print_BANG_.call(null);

figwheel.client.add_plugins.call(null,plugins,system_options);

figwheel.client.file_reloading.patch_goog_base.call(null);

var seq__11188_11196 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"initial-messages","initial-messages",2057377771).cljs$core$IFn$_invoke$arity$1(system_options));
var chunk__11189_11197 = null;
var count__11190_11198 = (0);
var i__11191_11199 = (0);
while(true){
if((i__11191_11199 < count__11190_11198)){
var msg_11200 = cljs.core._nth.call(null,chunk__11189_11197,i__11191_11199);
figwheel.client.socket.handle_incoming_message.call(null,msg_11200);

var G__11201 = seq__11188_11196;
var G__11202 = chunk__11189_11197;
var G__11203 = count__11190_11198;
var G__11204 = (i__11191_11199 + (1));
seq__11188_11196 = G__11201;
chunk__11189_11197 = G__11202;
count__11190_11198 = G__11203;
i__11191_11199 = G__11204;
continue;
} else {
var temp__4657__auto___11205 = cljs.core.seq.call(null,seq__11188_11196);
if(temp__4657__auto___11205){
var seq__11188_11206__$1 = temp__4657__auto___11205;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11188_11206__$1)){
var c__27200__auto___11207 = cljs.core.chunk_first.call(null,seq__11188_11206__$1);
var G__11208 = cljs.core.chunk_rest.call(null,seq__11188_11206__$1);
var G__11209 = c__27200__auto___11207;
var G__11210 = cljs.core.count.call(null,c__27200__auto___11207);
var G__11211 = (0);
seq__11188_11196 = G__11208;
chunk__11189_11197 = G__11209;
count__11190_11198 = G__11210;
i__11191_11199 = G__11211;
continue;
} else {
var msg_11212 = cljs.core.first.call(null,seq__11188_11206__$1);
figwheel.client.socket.handle_incoming_message.call(null,msg_11212);

var G__11213 = cljs.core.next.call(null,seq__11188_11206__$1);
var G__11214 = null;
var G__11215 = (0);
var G__11216 = (0);
seq__11188_11196 = G__11213;
chunk__11189_11197 = G__11214;
count__11190_11198 = G__11215;
i__11191_11199 = G__11216;
continue;
}
} else {
}
}
break;
}

return figwheel.client.socket.open.call(null,system_options);
}));
}
}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$0 = (function (){
return figwheel.client.start.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

figwheel.client.start.cljs$lang$maxFixedArity = 1;

figwheel.client.watch_and_reload_with_opts = figwheel.client.start;
figwheel.client.watch_and_reload = (function figwheel$client$watch_and_reload(var_args){
var args__27351__auto__ = [];
var len__27348__auto___11221 = arguments.length;
var i__27349__auto___11222 = (0);
while(true){
if((i__27349__auto___11222 < len__27348__auto___11221)){
args__27351__auto__.push((arguments[i__27349__auto___11222]));

var G__11223 = (i__27349__auto___11222 + (1));
i__27349__auto___11222 = G__11223;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__11218){
var map__11219 = p__11218;
var map__11219__$1 = ((((!((map__11219 == null)))?((((map__11219.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11219.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11219):map__11219);
var opts = map__11219__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq11217){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq11217));
});

figwheel.client.fetch_data_from_env = (function figwheel$client$fetch_data_from_env(){
try{return cljs.reader.read_string.call(null,goog.object.get(window,"FIGWHEEL_CLIENT_CONFIGURATION"));
}catch (e11225){if((e11225 instanceof Error)){
var e = e11225;
cljs.core._STAR_print_err_fn_STAR_.call(null,"Unable to load FIGWHEEL_CLIENT_CONFIGURATION from the environment");

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"autoload","autoload",-354122500),false], null);
} else {
throw e11225;

}
}});
figwheel.client.console_intro_message = "Figwheel has compiled a temporary helper application to your :output-file.\n\nThe code currently in your configured output file does not\nrepresent the code that you are trying to compile.\n\nThis temporary application is intended to help you continue to get\nfeedback from Figwheel until the build you are working on compiles\ncorrectly.\n\nWhen your ClojureScript source code compiles correctly this helper\napplication will auto-reload and pick up your freshly compiled\nClojureScript program.";
figwheel.client.bad_compile_helper_app = (function figwheel$client$bad_compile_helper_app(){
cljs.core.enable_console_print_BANG_.call(null);

var config = figwheel.client.fetch_data_from_env.call(null);
cljs.core.println.call(null,figwheel.client.console_intro_message);

figwheel.client.heads_up.bad_compile_screen.call(null);

if(cljs.core.truth_(goog.dependencies_)){
} else {
goog.dependencies_ = true;
}

figwheel.client.start.call(null,config);

return figwheel.client.add_message_watch.call(null,new cljs.core.Keyword(null,"listen-for-successful-compile","listen-for-successful-compile",-995277603),((function (config){
return (function (p__11229){
var map__11230 = p__11229;
var map__11230__$1 = ((((!((map__11230 == null)))?((((map__11230.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11230.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11230):map__11230);
var msg_name = cljs.core.get.call(null,map__11230__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))){
return location.href = location.href;
} else {
return null;
}
});})(config))
);
});

//# sourceMappingURL=client.js.map?rel=1468751002622