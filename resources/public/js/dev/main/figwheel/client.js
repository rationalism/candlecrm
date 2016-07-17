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
var args19112 = [];
var len__27348__auto___19115 = arguments.length;
var i__27349__auto___19116 = (0);
while(true){
if((i__27349__auto___19116 < len__27348__auto___19115)){
args19112.push((arguments[i__27349__auto___19116]));

var G__19117 = (i__27349__auto___19116 + (1));
i__27349__auto___19116 = G__19117;
continue;
} else {
}
break;
}

var G__19114 = args19112.length;
switch (G__19114) {
case 2:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return figwheel.client.figwheel_repl_print.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19112.length)].join('')));

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
var len__27348__auto___19120 = arguments.length;
var i__27349__auto___19121 = (0);
while(true){
if((i__27349__auto___19121 < len__27348__auto___19120)){
args__27351__auto__.push((arguments[i__27349__auto___19121]));

var G__19122 = (i__27349__auto___19121 + (1));
i__27349__auto___19121 = G__19122;
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

figwheel.client.repl_out_print_fn.cljs$lang$applyTo = (function (seq19119){
return figwheel.client.repl_out_print_fn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq19119));
});

figwheel.client.repl_err_print_fn = (function figwheel$client$repl_err_print_fn(var_args){
var args__27351__auto__ = [];
var len__27348__auto___19124 = arguments.length;
var i__27349__auto___19125 = (0);
while(true){
if((i__27349__auto___19125 < len__27348__auto___19124)){
args__27351__auto__.push((arguments[i__27349__auto___19125]));

var G__19126 = (i__27349__auto___19125 + (1));
i__27349__auto___19125 = G__19126;
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

figwheel.client.repl_err_print_fn.cljs$lang$applyTo = (function (seq19123){
return figwheel.client.repl_err_print_fn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq19123));
});

figwheel.client.enable_repl_print_BANG_ = (function figwheel$client$enable_repl_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core.set_print_fn_BANG_.call(null,figwheel.client.repl_out_print_fn);

cljs.core.set_print_err_fn_BANG_.call(null,figwheel.client.repl_err_print_fn);

return null;
});
figwheel.client.autoload_QMARK_ = (cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?(function (){
var pred__19127 = cljs.core._EQ_;
var expr__19128 = (function (){var or__26817__auto__ = (function (){try{if(cljs.core.truth_(typeof localstorage !== 'undefined')){
return localStorage.getItem("figwheel_autoload");
} else {
return null;
}
}catch (e19131){if((e19131 instanceof Error)){
var e = e19131;
return false;
} else {
throw e19131;

}
}})();
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return "true";
}
})();
if(cljs.core.truth_(pred__19127.call(null,"true",expr__19128))){
return true;
} else {
if(cljs.core.truth_(pred__19127.call(null,"false",expr__19128))){
return false;
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__19128)].join('')));
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
}catch (e19133){if((e19133 instanceof Error)){
var e = e19133;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str("Unable to access localStorage")].join(''));
} else {
throw e19133;

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
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__19134){
var map__19137 = p__19134;
var map__19137__$1 = ((((!((map__19137 == null)))?((((map__19137.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19137.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19137):map__19137);
var message = cljs.core.get.call(null,map__19137__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__19137__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
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
var c__8341__auto___19299 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___19299,ch){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___19299,ch){
return (function (state_19268){
var state_val_19269 = (state_19268[(1)]);
if((state_val_19269 === (7))){
var inst_19264 = (state_19268[(2)]);
var state_19268__$1 = state_19268;
var statearr_19270_19300 = state_19268__$1;
(statearr_19270_19300[(2)] = inst_19264);

(statearr_19270_19300[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (1))){
var state_19268__$1 = state_19268;
var statearr_19271_19301 = state_19268__$1;
(statearr_19271_19301[(2)] = null);

(statearr_19271_19301[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (4))){
var inst_19221 = (state_19268[(7)]);
var inst_19221__$1 = (state_19268[(2)]);
var state_19268__$1 = (function (){var statearr_19272 = state_19268;
(statearr_19272[(7)] = inst_19221__$1);

return statearr_19272;
})();
if(cljs.core.truth_(inst_19221__$1)){
var statearr_19273_19302 = state_19268__$1;
(statearr_19273_19302[(1)] = (5));

} else {
var statearr_19274_19303 = state_19268__$1;
(statearr_19274_19303[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (15))){
var inst_19228 = (state_19268[(8)]);
var inst_19243 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_19228);
var inst_19244 = cljs.core.first.call(null,inst_19243);
var inst_19245 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_19244);
var inst_19246 = [cljs.core.str("Figwheel: Not loading code with warnings - "),cljs.core.str(inst_19245)].join('');
var inst_19247 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),inst_19246);
var state_19268__$1 = state_19268;
var statearr_19275_19304 = state_19268__$1;
(statearr_19275_19304[(2)] = inst_19247);

(statearr_19275_19304[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (13))){
var inst_19252 = (state_19268[(2)]);
var state_19268__$1 = state_19268;
var statearr_19276_19305 = state_19268__$1;
(statearr_19276_19305[(2)] = inst_19252);

(statearr_19276_19305[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (6))){
var state_19268__$1 = state_19268;
var statearr_19277_19306 = state_19268__$1;
(statearr_19277_19306[(2)] = null);

(statearr_19277_19306[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (17))){
var inst_19250 = (state_19268[(2)]);
var state_19268__$1 = state_19268;
var statearr_19278_19307 = state_19268__$1;
(statearr_19278_19307[(2)] = inst_19250);

(statearr_19278_19307[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (3))){
var inst_19266 = (state_19268[(2)]);
var state_19268__$1 = state_19268;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19268__$1,inst_19266);
} else {
if((state_val_19269 === (12))){
var inst_19227 = (state_19268[(9)]);
var inst_19241 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_19227,opts);
var state_19268__$1 = state_19268;
if(cljs.core.truth_(inst_19241)){
var statearr_19279_19308 = state_19268__$1;
(statearr_19279_19308[(1)] = (15));

} else {
var statearr_19280_19309 = state_19268__$1;
(statearr_19280_19309[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (2))){
var state_19268__$1 = state_19268;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19268__$1,(4),ch);
} else {
if((state_val_19269 === (11))){
var inst_19228 = (state_19268[(8)]);
var inst_19233 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_19234 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_19228);
var inst_19235 = cljs.core.async.timeout.call(null,(1000));
var inst_19236 = [inst_19234,inst_19235];
var inst_19237 = (new cljs.core.PersistentVector(null,2,(5),inst_19233,inst_19236,null));
var state_19268__$1 = state_19268;
return cljs.core.async.ioc_alts_BANG_.call(null,state_19268__$1,(14),inst_19237);
} else {
if((state_val_19269 === (9))){
var inst_19228 = (state_19268[(8)]);
var inst_19254 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),"Figwheel: code autoloading is OFF");
var inst_19255 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_19228);
var inst_19256 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_19255);
var inst_19257 = [cljs.core.str("Not loading: "),cljs.core.str(inst_19256)].join('');
var inst_19258 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),inst_19257);
var state_19268__$1 = (function (){var statearr_19281 = state_19268;
(statearr_19281[(10)] = inst_19254);

return statearr_19281;
})();
var statearr_19282_19310 = state_19268__$1;
(statearr_19282_19310[(2)] = inst_19258);

(statearr_19282_19310[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (5))){
var inst_19221 = (state_19268[(7)]);
var inst_19223 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_19224 = (new cljs.core.PersistentArrayMap(null,2,inst_19223,null));
var inst_19225 = (new cljs.core.PersistentHashSet(null,inst_19224,null));
var inst_19226 = figwheel.client.focus_msgs.call(null,inst_19225,inst_19221);
var inst_19227 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_19226);
var inst_19228 = cljs.core.first.call(null,inst_19226);
var inst_19229 = figwheel.client.autoload_QMARK_.call(null);
var state_19268__$1 = (function (){var statearr_19283 = state_19268;
(statearr_19283[(8)] = inst_19228);

(statearr_19283[(9)] = inst_19227);

return statearr_19283;
})();
if(cljs.core.truth_(inst_19229)){
var statearr_19284_19311 = state_19268__$1;
(statearr_19284_19311[(1)] = (8));

} else {
var statearr_19285_19312 = state_19268__$1;
(statearr_19285_19312[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (14))){
var inst_19239 = (state_19268[(2)]);
var state_19268__$1 = state_19268;
var statearr_19286_19313 = state_19268__$1;
(statearr_19286_19313[(2)] = inst_19239);

(statearr_19286_19313[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (16))){
var state_19268__$1 = state_19268;
var statearr_19287_19314 = state_19268__$1;
(statearr_19287_19314[(2)] = null);

(statearr_19287_19314[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (10))){
var inst_19260 = (state_19268[(2)]);
var state_19268__$1 = (function (){var statearr_19288 = state_19268;
(statearr_19288[(11)] = inst_19260);

return statearr_19288;
})();
var statearr_19289_19315 = state_19268__$1;
(statearr_19289_19315[(2)] = null);

(statearr_19289_19315[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19269 === (8))){
var inst_19227 = (state_19268[(9)]);
var inst_19231 = figwheel.client.reload_file_state_QMARK_.call(null,inst_19227,opts);
var state_19268__$1 = state_19268;
if(cljs.core.truth_(inst_19231)){
var statearr_19290_19316 = state_19268__$1;
(statearr_19290_19316[(1)] = (11));

} else {
var statearr_19291_19317 = state_19268__$1;
(statearr_19291_19317[(1)] = (12));

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
});})(c__8341__auto___19299,ch))
;
return ((function (switch__8229__auto__,c__8341__auto___19299,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__8230__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__8230__auto____0 = (function (){
var statearr_19295 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19295[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__8230__auto__);

(statearr_19295[(1)] = (1));

return statearr_19295;
});
var figwheel$client$file_reloader_plugin_$_state_machine__8230__auto____1 = (function (state_19268){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_19268);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e19296){if((e19296 instanceof Object)){
var ex__8233__auto__ = e19296;
var statearr_19297_19318 = state_19268;
(statearr_19297_19318[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19268);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19296;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19319 = state_19268;
state_19268 = G__19319;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__8230__auto__ = function(state_19268){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__8230__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__8230__auto____1.call(this,state_19268);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__8230__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__8230__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___19299,ch))
})();
var state__8343__auto__ = (function (){var statearr_19298 = f__8342__auto__.call(null);
(statearr_19298[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___19299);

return statearr_19298;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___19299,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__19320_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__19320_SHARP_));
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
var base_path_19323 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_19323){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{figwheel.client.enable_repl_print_BANG_.call(null);

var result_value = figwheel.client.utils.eval_helper.call(null,code,opts);
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),result_value], null));
}catch (e19322){if((e19322 instanceof Error)){
var e = e19322;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_19323], null));
} else {
var e = e19322;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"ua-product","ua-product",938384227),figwheel.client.get_ua_product.call(null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}finally {figwheel.client.enable_repl_print_BANG_.call(null);
}});})(base_path_19323))
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
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__19324){
var map__19333 = p__19324;
var map__19333__$1 = ((((!((map__19333 == null)))?((((map__19333.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19333.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19333):map__19333);
var opts = map__19333__$1;
var build_id = cljs.core.get.call(null,map__19333__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__19333,map__19333__$1,opts,build_id){
return (function (p__19335){
var vec__19336 = p__19335;
var seq__19337 = cljs.core.seq.call(null,vec__19336);
var first__19338 = cljs.core.first.call(null,seq__19337);
var seq__19337__$1 = cljs.core.next.call(null,seq__19337);
var map__19339 = first__19338;
var map__19339__$1 = ((((!((map__19339 == null)))?((((map__19339.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19339.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19339):map__19339);
var msg = map__19339__$1;
var msg_name = cljs.core.get.call(null,map__19339__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__19337__$1;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,((function (vec__19336,seq__19337,first__19338,seq__19337__$1,map__19339,map__19339__$1,msg,msg_name,_,map__19333,map__19333__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__19336,seq__19337,first__19338,seq__19337__$1,map__19339,map__19339__$1,msg,msg_name,_,map__19333,map__19333__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__19333,map__19333__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__19347){
var vec__19348 = p__19347;
var seq__19349 = cljs.core.seq.call(null,vec__19348);
var first__19350 = cljs.core.first.call(null,seq__19349);
var seq__19349__$1 = cljs.core.next.call(null,seq__19349);
var map__19351 = first__19350;
var map__19351__$1 = ((((!((map__19351 == null)))?((((map__19351.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19351.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19351):map__19351);
var msg = map__19351__$1;
var msg_name = cljs.core.get.call(null,map__19351__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__19349__$1;
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__19353){
var map__19365 = p__19353;
var map__19365__$1 = ((((!((map__19365 == null)))?((((map__19365.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19365.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19365):map__19365);
var on_compile_warning = cljs.core.get.call(null,map__19365__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__19365__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__19365,map__19365__$1,on_compile_warning,on_compile_fail){
return (function (p__19367){
var vec__19368 = p__19367;
var seq__19369 = cljs.core.seq.call(null,vec__19368);
var first__19370 = cljs.core.first.call(null,seq__19369);
var seq__19369__$1 = cljs.core.next.call(null,seq__19369);
var map__19371 = first__19370;
var map__19371__$1 = ((((!((map__19371 == null)))?((((map__19371.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19371.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19371):map__19371);
var msg = map__19371__$1;
var msg_name = cljs.core.get.call(null,map__19371__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = seq__19369__$1;
var pred__19373 = cljs.core._EQ_;
var expr__19374 = msg_name;
if(cljs.core.truth_(pred__19373.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__19374))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__19373.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__19374))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__19365,map__19365__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__,msg_hist,msg_names,msg){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__,msg_hist,msg_names,msg){
return (function (state_19582){
var state_val_19583 = (state_19582[(1)]);
if((state_val_19583 === (7))){
var inst_19510 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
if(cljs.core.truth_(inst_19510)){
var statearr_19584_19630 = state_19582__$1;
(statearr_19584_19630[(1)] = (8));

} else {
var statearr_19585_19631 = state_19582__$1;
(statearr_19585_19631[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (20))){
var inst_19576 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19586_19632 = state_19582__$1;
(statearr_19586_19632[(2)] = inst_19576);

(statearr_19586_19632[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (27))){
var inst_19572 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19587_19633 = state_19582__$1;
(statearr_19587_19633[(2)] = inst_19572);

(statearr_19587_19633[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (1))){
var inst_19503 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_19582__$1 = state_19582;
if(cljs.core.truth_(inst_19503)){
var statearr_19588_19634 = state_19582__$1;
(statearr_19588_19634[(1)] = (2));

} else {
var statearr_19589_19635 = state_19582__$1;
(statearr_19589_19635[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (24))){
var inst_19574 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19590_19636 = state_19582__$1;
(statearr_19590_19636[(2)] = inst_19574);

(statearr_19590_19636[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (4))){
var inst_19580 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19582__$1,inst_19580);
} else {
if((state_val_19583 === (15))){
var inst_19578 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19591_19637 = state_19582__$1;
(statearr_19591_19637[(2)] = inst_19578);

(statearr_19591_19637[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (21))){
var inst_19537 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19592_19638 = state_19582__$1;
(statearr_19592_19638[(2)] = inst_19537);

(statearr_19592_19638[(1)] = (20));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (31))){
var inst_19561 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_19582__$1 = state_19582;
if(cljs.core.truth_(inst_19561)){
var statearr_19593_19639 = state_19582__$1;
(statearr_19593_19639[(1)] = (34));

} else {
var statearr_19594_19640 = state_19582__$1;
(statearr_19594_19640[(1)] = (35));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (32))){
var inst_19570 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19595_19641 = state_19582__$1;
(statearr_19595_19641[(2)] = inst_19570);

(statearr_19595_19641[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (33))){
var inst_19559 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19596_19642 = state_19582__$1;
(statearr_19596_19642[(2)] = inst_19559);

(statearr_19596_19642[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (13))){
var inst_19524 = figwheel.client.heads_up.clear.call(null);
var state_19582__$1 = state_19582;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19582__$1,(16),inst_19524);
} else {
if((state_val_19583 === (22))){
var inst_19541 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_19542 = figwheel.client.heads_up.append_warning_message.call(null,inst_19541);
var state_19582__$1 = state_19582;
var statearr_19597_19643 = state_19582__$1;
(statearr_19597_19643[(2)] = inst_19542);

(statearr_19597_19643[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (36))){
var inst_19568 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19598_19644 = state_19582__$1;
(statearr_19598_19644[(2)] = inst_19568);

(statearr_19598_19644[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (29))){
var inst_19552 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19599_19645 = state_19582__$1;
(statearr_19599_19645[(2)] = inst_19552);

(statearr_19599_19645[(1)] = (27));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (6))){
var inst_19505 = (state_19582[(7)]);
var state_19582__$1 = state_19582;
var statearr_19600_19646 = state_19582__$1;
(statearr_19600_19646[(2)] = inst_19505);

(statearr_19600_19646[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (28))){
var inst_19548 = (state_19582[(2)]);
var inst_19549 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_19550 = figwheel.client.heads_up.display_warning.call(null,inst_19549);
var state_19582__$1 = (function (){var statearr_19601 = state_19582;
(statearr_19601[(8)] = inst_19548);

return statearr_19601;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19582__$1,(29),inst_19550);
} else {
if((state_val_19583 === (25))){
var inst_19546 = figwheel.client.heads_up.clear.call(null);
var state_19582__$1 = state_19582;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19582__$1,(28),inst_19546);
} else {
if((state_val_19583 === (34))){
var inst_19563 = figwheel.client.heads_up.flash_loaded.call(null);
var state_19582__$1 = state_19582;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19582__$1,(37),inst_19563);
} else {
if((state_val_19583 === (17))){
var inst_19530 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19602_19647 = state_19582__$1;
(statearr_19602_19647[(2)] = inst_19530);

(statearr_19602_19647[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (3))){
var inst_19522 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_19582__$1 = state_19582;
if(cljs.core.truth_(inst_19522)){
var statearr_19603_19648 = state_19582__$1;
(statearr_19603_19648[(1)] = (13));

} else {
var statearr_19604_19649 = state_19582__$1;
(statearr_19604_19649[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (12))){
var inst_19518 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19605_19650 = state_19582__$1;
(statearr_19605_19650[(2)] = inst_19518);

(statearr_19605_19650[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (2))){
var inst_19505 = (state_19582[(7)]);
var inst_19505__$1 = figwheel.client.autoload_QMARK_.call(null);
var state_19582__$1 = (function (){var statearr_19606 = state_19582;
(statearr_19606[(7)] = inst_19505__$1);

return statearr_19606;
})();
if(cljs.core.truth_(inst_19505__$1)){
var statearr_19607_19651 = state_19582__$1;
(statearr_19607_19651[(1)] = (5));

} else {
var statearr_19608_19652 = state_19582__$1;
(statearr_19608_19652[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (23))){
var inst_19544 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_19582__$1 = state_19582;
if(cljs.core.truth_(inst_19544)){
var statearr_19609_19653 = state_19582__$1;
(statearr_19609_19653[(1)] = (25));

} else {
var statearr_19610_19654 = state_19582__$1;
(statearr_19610_19654[(1)] = (26));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (35))){
var state_19582__$1 = state_19582;
var statearr_19611_19655 = state_19582__$1;
(statearr_19611_19655[(2)] = null);

(statearr_19611_19655[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (19))){
var inst_19539 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_19582__$1 = state_19582;
if(cljs.core.truth_(inst_19539)){
var statearr_19612_19656 = state_19582__$1;
(statearr_19612_19656[(1)] = (22));

} else {
var statearr_19613_19657 = state_19582__$1;
(statearr_19613_19657[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (11))){
var inst_19514 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19614_19658 = state_19582__$1;
(statearr_19614_19658[(2)] = inst_19514);

(statearr_19614_19658[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (9))){
var inst_19516 = figwheel.client.heads_up.clear.call(null);
var state_19582__$1 = state_19582;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19582__$1,(12),inst_19516);
} else {
if((state_val_19583 === (5))){
var inst_19507 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_19582__$1 = state_19582;
var statearr_19615_19659 = state_19582__$1;
(statearr_19615_19659[(2)] = inst_19507);

(statearr_19615_19659[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (14))){
var inst_19532 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_19582__$1 = state_19582;
if(cljs.core.truth_(inst_19532)){
var statearr_19616_19660 = state_19582__$1;
(statearr_19616_19660[(1)] = (18));

} else {
var statearr_19617_19661 = state_19582__$1;
(statearr_19617_19661[(1)] = (19));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (26))){
var inst_19554 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_19582__$1 = state_19582;
if(cljs.core.truth_(inst_19554)){
var statearr_19618_19662 = state_19582__$1;
(statearr_19618_19662[(1)] = (30));

} else {
var statearr_19619_19663 = state_19582__$1;
(statearr_19619_19663[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (16))){
var inst_19526 = (state_19582[(2)]);
var inst_19527 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_19528 = figwheel.client.heads_up.display_exception.call(null,inst_19527);
var state_19582__$1 = (function (){var statearr_19620 = state_19582;
(statearr_19620[(9)] = inst_19526);

return statearr_19620;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19582__$1,(17),inst_19528);
} else {
if((state_val_19583 === (30))){
var inst_19556 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_19557 = figwheel.client.heads_up.display_warning.call(null,inst_19556);
var state_19582__$1 = state_19582;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19582__$1,(33),inst_19557);
} else {
if((state_val_19583 === (10))){
var inst_19520 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19621_19664 = state_19582__$1;
(statearr_19621_19664[(2)] = inst_19520);

(statearr_19621_19664[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (18))){
var inst_19534 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_19535 = figwheel.client.heads_up.display_exception.call(null,inst_19534);
var state_19582__$1 = state_19582;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19582__$1,(21),inst_19535);
} else {
if((state_val_19583 === (37))){
var inst_19565 = (state_19582[(2)]);
var state_19582__$1 = state_19582;
var statearr_19622_19665 = state_19582__$1;
(statearr_19622_19665[(2)] = inst_19565);

(statearr_19622_19665[(1)] = (36));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19583 === (8))){
var inst_19512 = figwheel.client.heads_up.flash_loaded.call(null);
var state_19582__$1 = state_19582;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19582__$1,(11),inst_19512);
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
});})(c__8341__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__8229__auto__,c__8341__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__8230__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__8230__auto____0 = (function (){
var statearr_19626 = [null,null,null,null,null,null,null,null,null,null];
(statearr_19626[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__8230__auto__);

(statearr_19626[(1)] = (1));

return statearr_19626;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__8230__auto____1 = (function (state_19582){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_19582);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e19627){if((e19627 instanceof Object)){
var ex__8233__auto__ = e19627;
var statearr_19628_19666 = state_19582;
(statearr_19628_19666[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19582);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19627;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19667 = state_19582;
state_19582 = G__19667;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__8230__auto__ = function(state_19582){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__8230__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__8230__auto____1.call(this,state_19582);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__8230__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__8230__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__,msg_hist,msg_names,msg))
})();
var state__8343__auto__ = (function (){var statearr_19629 = f__8342__auto__.call(null);
(statearr_19629[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_19629;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__,msg_hist,msg_names,msg))
);

return c__8341__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__8341__auto___19730 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___19730,ch){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___19730,ch){
return (function (state_19713){
var state_val_19714 = (state_19713[(1)]);
if((state_val_19714 === (1))){
var state_19713__$1 = state_19713;
var statearr_19715_19731 = state_19713__$1;
(statearr_19715_19731[(2)] = null);

(statearr_19715_19731[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19714 === (2))){
var state_19713__$1 = state_19713;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19713__$1,(4),ch);
} else {
if((state_val_19714 === (3))){
var inst_19711 = (state_19713[(2)]);
var state_19713__$1 = state_19713;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19713__$1,inst_19711);
} else {
if((state_val_19714 === (4))){
var inst_19701 = (state_19713[(7)]);
var inst_19701__$1 = (state_19713[(2)]);
var state_19713__$1 = (function (){var statearr_19716 = state_19713;
(statearr_19716[(7)] = inst_19701__$1);

return statearr_19716;
})();
if(cljs.core.truth_(inst_19701__$1)){
var statearr_19717_19732 = state_19713__$1;
(statearr_19717_19732[(1)] = (5));

} else {
var statearr_19718_19733 = state_19713__$1;
(statearr_19718_19733[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19714 === (5))){
var inst_19701 = (state_19713[(7)]);
var inst_19703 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_19701);
var state_19713__$1 = state_19713;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19713__$1,(8),inst_19703);
} else {
if((state_val_19714 === (6))){
var state_19713__$1 = state_19713;
var statearr_19719_19734 = state_19713__$1;
(statearr_19719_19734[(2)] = null);

(statearr_19719_19734[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19714 === (7))){
var inst_19709 = (state_19713[(2)]);
var state_19713__$1 = state_19713;
var statearr_19720_19735 = state_19713__$1;
(statearr_19720_19735[(2)] = inst_19709);

(statearr_19720_19735[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19714 === (8))){
var inst_19705 = (state_19713[(2)]);
var state_19713__$1 = (function (){var statearr_19721 = state_19713;
(statearr_19721[(8)] = inst_19705);

return statearr_19721;
})();
var statearr_19722_19736 = state_19713__$1;
(statearr_19722_19736[(2)] = null);

(statearr_19722_19736[(1)] = (2));


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
});})(c__8341__auto___19730,ch))
;
return ((function (switch__8229__auto__,c__8341__auto___19730,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__8230__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__8230__auto____0 = (function (){
var statearr_19726 = [null,null,null,null,null,null,null,null,null];
(statearr_19726[(0)] = figwheel$client$heads_up_plugin_$_state_machine__8230__auto__);

(statearr_19726[(1)] = (1));

return statearr_19726;
});
var figwheel$client$heads_up_plugin_$_state_machine__8230__auto____1 = (function (state_19713){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_19713);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e19727){if((e19727 instanceof Object)){
var ex__8233__auto__ = e19727;
var statearr_19728_19737 = state_19713;
(statearr_19728_19737[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19713);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19727;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19738 = state_19713;
state_19713 = G__19738;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__8230__auto__ = function(state_19713){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__8230__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__8230__auto____1.call(this,state_19713);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__8230__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__8230__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___19730,ch))
})();
var state__8343__auto__ = (function (){var statearr_19729 = f__8342__auto__.call(null);
(statearr_19729[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___19730);

return statearr_19729;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___19730,ch))
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
var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__){
return (function (state_19759){
var state_val_19760 = (state_19759[(1)]);
if((state_val_19760 === (1))){
var inst_19754 = cljs.core.async.timeout.call(null,(3000));
var state_19759__$1 = state_19759;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19759__$1,(2),inst_19754);
} else {
if((state_val_19760 === (2))){
var inst_19756 = (state_19759[(2)]);
var inst_19757 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_19759__$1 = (function (){var statearr_19761 = state_19759;
(statearr_19761[(7)] = inst_19756);

return statearr_19761;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19759__$1,inst_19757);
} else {
return null;
}
}
});})(c__8341__auto__))
;
return ((function (switch__8229__auto__,c__8341__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__8230__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__8230__auto____0 = (function (){
var statearr_19765 = [null,null,null,null,null,null,null,null];
(statearr_19765[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__8230__auto__);

(statearr_19765[(1)] = (1));

return statearr_19765;
});
var figwheel$client$enforce_project_plugin_$_state_machine__8230__auto____1 = (function (state_19759){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_19759);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e19766){if((e19766 instanceof Object)){
var ex__8233__auto__ = e19766;
var statearr_19767_19769 = state_19759;
(statearr_19767_19769[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19759);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19766;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19770 = state_19759;
state_19759 = G__19770;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__8230__auto__ = function(state_19759){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__8230__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__8230__auto____1.call(this,state_19759);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__8230__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__8230__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__))
})();
var state__8343__auto__ = (function (){var statearr_19768 = f__8342__auto__.call(null);
(statearr_19768[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_19768;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__))
);

return c__8341__auto__;
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
var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__,figwheel_version,temp__4657__auto__){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__,figwheel_version,temp__4657__auto__){
return (function (state_19793){
var state_val_19794 = (state_19793[(1)]);
if((state_val_19794 === (1))){
var inst_19787 = cljs.core.async.timeout.call(null,(2000));
var state_19793__$1 = state_19793;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19793__$1,(2),inst_19787);
} else {
if((state_val_19794 === (2))){
var inst_19789 = (state_19793[(2)]);
var inst_19790 = [cljs.core.str("Figwheel Client Version \""),cljs.core.str(figwheel.client._figwheel_version_),cljs.core.str("\" is not equal to "),cljs.core.str("Figwheel Sidecar Version \""),cljs.core.str(figwheel_version),cljs.core.str("\""),cljs.core.str(".  Shutting down Websocket Connection!")].join('');
var inst_19791 = figwheel.client.heads_up.display_system_warning.call(null,"Figwheel Client and Server have different versions!!",inst_19790);
var state_19793__$1 = (function (){var statearr_19795 = state_19793;
(statearr_19795[(7)] = inst_19789);

return statearr_19795;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19793__$1,inst_19791);
} else {
return null;
}
}
});})(c__8341__auto__,figwheel_version,temp__4657__auto__))
;
return ((function (switch__8229__auto__,c__8341__auto__,figwheel_version,temp__4657__auto__){
return (function() {
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__8230__auto__ = null;
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__8230__auto____0 = (function (){
var statearr_19799 = [null,null,null,null,null,null,null,null];
(statearr_19799[(0)] = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__8230__auto__);

(statearr_19799[(1)] = (1));

return statearr_19799;
});
var figwheel$client$enforce_figwheel_version_plugin_$_state_machine__8230__auto____1 = (function (state_19793){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_19793);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e19800){if((e19800 instanceof Object)){
var ex__8233__auto__ = e19800;
var statearr_19801_19803 = state_19793;
(statearr_19801_19803[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19793);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19800;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19804 = state_19793;
state_19793 = G__19804;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__8230__auto__ = function(state_19793){
switch(arguments.length){
case 0:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__8230__auto____0.call(this);
case 1:
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__8230__auto____1.call(this,state_19793);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__8230__auto____0;
figwheel$client$enforce_figwheel_version_plugin_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_figwheel_version_plugin_$_state_machine__8230__auto____1;
return figwheel$client$enforce_figwheel_version_plugin_$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__,figwheel_version,temp__4657__auto__))
})();
var state__8343__auto__ = (function (){var statearr_19802 = f__8342__auto__.call(null);
(statearr_19802[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_19802;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__,figwheel_version,temp__4657__auto__))
);

return c__8341__auto__;
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
figwheel.client.file_line_column = (function figwheel$client$file_line_column(p__19805){
var map__19809 = p__19805;
var map__19809__$1 = ((((!((map__19809 == null)))?((((map__19809.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19809.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19809):map__19809);
var file = cljs.core.get.call(null,map__19809__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__19809__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__19809__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var G__19811 = "";
var G__19811__$1 = (cljs.core.truth_(file)?[cljs.core.str(G__19811),cljs.core.str("file "),cljs.core.str(file)].join(''):G__19811);
var G__19811__$2 = (cljs.core.truth_(line)?[cljs.core.str(G__19811__$1),cljs.core.str(" at line "),cljs.core.str(line)].join(''):G__19811__$1);
if(cljs.core.truth_((function (){var and__26809__auto__ = line;
if(cljs.core.truth_(and__26809__auto__)){
return column;
} else {
return and__26809__auto__;
}
})())){
return [cljs.core.str(G__19811__$2),cljs.core.str(", column "),cljs.core.str(column)].join('');
} else {
return G__19811__$2;
}
});
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__19812){
var map__19819 = p__19812;
var map__19819__$1 = ((((!((map__19819 == null)))?((((map__19819.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19819.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19819):map__19819);
var ed = map__19819__$1;
var formatted_exception = cljs.core.get.call(null,map__19819__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
var exception_data = cljs.core.get.call(null,map__19819__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__19819__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__19821_19825 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__19822_19826 = null;
var count__19823_19827 = (0);
var i__19824_19828 = (0);
while(true){
if((i__19824_19828 < count__19823_19827)){
var msg_19829 = cljs.core._nth.call(null,chunk__19822_19826,i__19824_19828);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_19829);

var G__19830 = seq__19821_19825;
var G__19831 = chunk__19822_19826;
var G__19832 = count__19823_19827;
var G__19833 = (i__19824_19828 + (1));
seq__19821_19825 = G__19830;
chunk__19822_19826 = G__19831;
count__19823_19827 = G__19832;
i__19824_19828 = G__19833;
continue;
} else {
var temp__4657__auto___19834 = cljs.core.seq.call(null,seq__19821_19825);
if(temp__4657__auto___19834){
var seq__19821_19835__$1 = temp__4657__auto___19834;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19821_19835__$1)){
var c__27200__auto___19836 = cljs.core.chunk_first.call(null,seq__19821_19835__$1);
var G__19837 = cljs.core.chunk_rest.call(null,seq__19821_19835__$1);
var G__19838 = c__27200__auto___19836;
var G__19839 = cljs.core.count.call(null,c__27200__auto___19836);
var G__19840 = (0);
seq__19821_19825 = G__19837;
chunk__19822_19826 = G__19838;
count__19823_19827 = G__19839;
i__19824_19828 = G__19840;
continue;
} else {
var msg_19841 = cljs.core.first.call(null,seq__19821_19835__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_19841);

var G__19842 = cljs.core.next.call(null,seq__19821_19835__$1);
var G__19843 = null;
var G__19844 = (0);
var G__19845 = (0);
seq__19821_19825 = G__19842;
chunk__19822_19826 = G__19843;
count__19823_19827 = G__19844;
i__19824_19828 = G__19845;
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
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__19846){
var map__19849 = p__19846;
var map__19849__$1 = ((((!((map__19849 == null)))?((((map__19849.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19849.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19849):map__19849);
var w = map__19849__$1;
var message = cljs.core.get.call(null,map__19849__$1,new cljs.core.Keyword(null,"message","message",-406056002));
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
var seq__19861 = cljs.core.seq.call(null,plugins);
var chunk__19862 = null;
var count__19863 = (0);
var i__19864 = (0);
while(true){
if((i__19864 < count__19863)){
var vec__19865 = cljs.core._nth.call(null,chunk__19862,i__19864);
var k = cljs.core.nth.call(null,vec__19865,(0),null);
var plugin = cljs.core.nth.call(null,vec__19865,(1),null);
if(cljs.core.truth_(plugin)){
var pl_19871 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__19861,chunk__19862,count__19863,i__19864,pl_19871,vec__19865,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_19871.call(null,msg_hist);
});})(seq__19861,chunk__19862,count__19863,i__19864,pl_19871,vec__19865,k,plugin))
);
} else {
}

var G__19872 = seq__19861;
var G__19873 = chunk__19862;
var G__19874 = count__19863;
var G__19875 = (i__19864 + (1));
seq__19861 = G__19872;
chunk__19862 = G__19873;
count__19863 = G__19874;
i__19864 = G__19875;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__19861);
if(temp__4657__auto__){
var seq__19861__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19861__$1)){
var c__27200__auto__ = cljs.core.chunk_first.call(null,seq__19861__$1);
var G__19876 = cljs.core.chunk_rest.call(null,seq__19861__$1);
var G__19877 = c__27200__auto__;
var G__19878 = cljs.core.count.call(null,c__27200__auto__);
var G__19879 = (0);
seq__19861 = G__19876;
chunk__19862 = G__19877;
count__19863 = G__19878;
i__19864 = G__19879;
continue;
} else {
var vec__19868 = cljs.core.first.call(null,seq__19861__$1);
var k = cljs.core.nth.call(null,vec__19868,(0),null);
var plugin = cljs.core.nth.call(null,vec__19868,(1),null);
if(cljs.core.truth_(plugin)){
var pl_19880 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__19861,chunk__19862,count__19863,i__19864,pl_19880,vec__19868,k,plugin,seq__19861__$1,temp__4657__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_19880.call(null,msg_hist);
});})(seq__19861,chunk__19862,count__19863,i__19864,pl_19880,vec__19868,k,plugin,seq__19861__$1,temp__4657__auto__))
);
} else {
}

var G__19881 = cljs.core.next.call(null,seq__19861__$1);
var G__19882 = null;
var G__19883 = (0);
var G__19884 = (0);
seq__19861 = G__19881;
chunk__19862 = G__19882;
count__19863 = G__19883;
i__19864 = G__19884;
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
var args19885 = [];
var len__27348__auto___19892 = arguments.length;
var i__27349__auto___19893 = (0);
while(true){
if((i__27349__auto___19893 < len__27348__auto___19892)){
args19885.push((arguments[i__27349__auto___19893]));

var G__19894 = (i__27349__auto___19893 + (1));
i__27349__auto___19893 = G__19894;
continue;
} else {
}
break;
}

var G__19887 = args19885.length;
switch (G__19887) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args19885.length)].join('')));

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

var seq__19888_19896 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"initial-messages","initial-messages",2057377771).cljs$core$IFn$_invoke$arity$1(system_options));
var chunk__19889_19897 = null;
var count__19890_19898 = (0);
var i__19891_19899 = (0);
while(true){
if((i__19891_19899 < count__19890_19898)){
var msg_19900 = cljs.core._nth.call(null,chunk__19889_19897,i__19891_19899);
figwheel.client.socket.handle_incoming_message.call(null,msg_19900);

var G__19901 = seq__19888_19896;
var G__19902 = chunk__19889_19897;
var G__19903 = count__19890_19898;
var G__19904 = (i__19891_19899 + (1));
seq__19888_19896 = G__19901;
chunk__19889_19897 = G__19902;
count__19890_19898 = G__19903;
i__19891_19899 = G__19904;
continue;
} else {
var temp__4657__auto___19905 = cljs.core.seq.call(null,seq__19888_19896);
if(temp__4657__auto___19905){
var seq__19888_19906__$1 = temp__4657__auto___19905;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__19888_19906__$1)){
var c__27200__auto___19907 = cljs.core.chunk_first.call(null,seq__19888_19906__$1);
var G__19908 = cljs.core.chunk_rest.call(null,seq__19888_19906__$1);
var G__19909 = c__27200__auto___19907;
var G__19910 = cljs.core.count.call(null,c__27200__auto___19907);
var G__19911 = (0);
seq__19888_19896 = G__19908;
chunk__19889_19897 = G__19909;
count__19890_19898 = G__19910;
i__19891_19899 = G__19911;
continue;
} else {
var msg_19912 = cljs.core.first.call(null,seq__19888_19906__$1);
figwheel.client.socket.handle_incoming_message.call(null,msg_19912);

var G__19913 = cljs.core.next.call(null,seq__19888_19906__$1);
var G__19914 = null;
var G__19915 = (0);
var G__19916 = (0);
seq__19888_19896 = G__19913;
chunk__19889_19897 = G__19914;
count__19890_19898 = G__19915;
i__19891_19899 = G__19916;
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
var len__27348__auto___19921 = arguments.length;
var i__27349__auto___19922 = (0);
while(true){
if((i__27349__auto___19922 < len__27348__auto___19921)){
args__27351__auto__.push((arguments[i__27349__auto___19922]));

var G__19923 = (i__27349__auto___19922 + (1));
i__27349__auto___19922 = G__19923;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((0) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((0)),(0),null)):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__27352__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__19918){
var map__19919 = p__19918;
var map__19919__$1 = ((((!((map__19919 == null)))?((((map__19919.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19919.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19919):map__19919);
var opts = map__19919__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq19917){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq19917));
});

figwheel.client.fetch_data_from_env = (function figwheel$client$fetch_data_from_env(){
try{return cljs.reader.read_string.call(null,goog.object.get(window,"FIGWHEEL_CLIENT_CONFIGURATION"));
}catch (e19925){if((e19925 instanceof Error)){
var e = e19925;
cljs.core._STAR_print_err_fn_STAR_.call(null,"Unable to load FIGWHEEL_CLIENT_CONFIGURATION from the environment");

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"autoload","autoload",-354122500),false], null);
} else {
throw e19925;

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
return (function (p__19929){
var map__19930 = p__19929;
var map__19930__$1 = ((((!((map__19930 == null)))?((((map__19930.cljs$lang$protocol_mask$partition0$ & (64))) || (map__19930.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19930):map__19930);
var msg_name = cljs.core.get.call(null,map__19930__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))){
return location.href = location.href;
} else {
return null;
}
});})(config))
);
});

//# sourceMappingURL=client.js.map?rel=1468744505261