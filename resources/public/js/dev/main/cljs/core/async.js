// Compiled by ClojureScript 1.9.93 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var args10269 = [];
var len__7322__auto___10275 = arguments.length;
var i__7323__auto___10276 = (0);
while(true){
if((i__7323__auto___10276 < len__7322__auto___10275)){
args10269.push((arguments[i__7323__auto___10276]));

var G__10277 = (i__7323__auto___10276 + (1));
i__7323__auto___10276 = G__10277;
continue;
} else {
}
break;
}

var G__10271 = args10269.length;
switch (G__10271) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10269.length)].join('')));

}
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.call(null,f,true);
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if(typeof cljs.core.async.t_cljs$core$async10272 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10272 = (function (f,blockable,meta10273){
this.f = f;
this.blockable = blockable;
this.meta10273 = meta10273;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async10272.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10274,meta10273__$1){
var self__ = this;
var _10274__$1 = this;
return (new cljs.core.async.t_cljs$core$async10272(self__.f,self__.blockable,meta10273__$1));
});

cljs.core.async.t_cljs$core$async10272.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10274){
var self__ = this;
var _10274__$1 = this;
return self__.meta10273;
});

cljs.core.async.t_cljs$core$async10272.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async10272.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async10272.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
});

cljs.core.async.t_cljs$core$async10272.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async10272.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta10273","meta10273",-1047332304,null)], null);
});

cljs.core.async.t_cljs$core$async10272.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async10272.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10272";

cljs.core.async.t_cljs$core$async10272.cljs$lang$ctorPrWriter = (function (this__6853__auto__,writer__6854__auto__,opt__6855__auto__){
return cljs.core._write.call(null,writer__6854__auto__,"cljs.core.async/t_cljs$core$async10272");
});

cljs.core.async.__GT_t_cljs$core$async10272 = (function cljs$core$async$__GT_t_cljs$core$async10272(f__$1,blockable__$1,meta10273){
return (new cljs.core.async.t_cljs$core$async10272(f__$1,blockable__$1,meta10273));
});

}

return (new cljs.core.async.t_cljs$core$async10272(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2;

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if(!((buff == null))){
if((false) || (buff.cljs$core$async$impl$protocols$UnblockingBuffer$)){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var args10281 = [];
var len__7322__auto___10284 = arguments.length;
var i__7323__auto___10285 = (0);
while(true){
if((i__7323__auto___10285 < len__7322__auto___10284)){
args10281.push((arguments[i__7323__auto___10285]));

var G__10286 = (i__7323__auto___10285 + (1));
i__7323__auto___10285 = G__10286;
continue;
} else {
}
break;
}

var G__10283 = args10281.length;
switch (G__10283) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10281.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str("buf-or-n")].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var args10288 = [];
var len__7322__auto___10291 = arguments.length;
var i__7323__auto___10292 = (0);
while(true){
if((i__7323__auto___10292 < len__7322__auto___10291)){
args10288.push((arguments[i__7323__auto___10292]));

var G__10293 = (i__7323__auto___10292 + (1));
i__7323__auto___10292 = G__10293;
continue;
} else {
}
break;
}

var G__10290 = args10288.length;
switch (G__10290) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10288.length)].join('')));

}
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.call(null,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.call(null,xform,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.call(null,cljs.core.async.impl.buffers.promise_buffer.call(null),xform,ex_handler);
});

cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var args10295 = [];
var len__7322__auto___10298 = arguments.length;
var i__7323__auto___10299 = (0);
while(true){
if((i__7323__auto___10299 < len__7322__auto___10298)){
args10295.push((arguments[i__7323__auto___10299]));

var G__10300 = (i__7323__auto___10299 + (1));
i__7323__auto___10299 = G__10300;
continue;
} else {
}
break;
}

var G__10297 = args10295.length;
switch (G__10297) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10295.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_10302 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_10302);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_10302,ret){
return (function (){
return fn1.call(null,val_10302);
});})(val_10302,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var args10303 = [];
var len__7322__auto___10306 = arguments.length;
var i__7323__auto___10307 = (0);
while(true){
if((i__7323__auto___10307 < len__7322__auto___10306)){
args10303.push((arguments[i__7323__auto___10307]));

var G__10308 = (i__7323__auto___10307 + (1));
i__7323__auto___10307 = G__10308;
continue;
} else {
}
break;
}

var G__10305 = args10303.length;
switch (G__10305) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10303.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4655__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4655__auto__)){
var ret = temp__4655__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4655__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4655__auto__)){
var retb = temp__4655__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4655__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__4655__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__7162__auto___10310 = n;
var x_10311 = (0);
while(true){
if((x_10311 < n__7162__auto___10310)){
(a[x_10311] = (0));

var G__10312 = (x_10311 + (1));
x_10311 = G__10312;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__10313 = (i + (1));
i = G__10313;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async10317 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10317 = (function (alt_flag,flag,meta10318){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta10318 = meta10318;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async10317.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_10319,meta10318__$1){
var self__ = this;
var _10319__$1 = this;
return (new cljs.core.async.t_cljs$core$async10317(self__.alt_flag,self__.flag,meta10318__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async10317.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_10319){
var self__ = this;
var _10319__$1 = this;
return self__.meta10318;
});})(flag))
;

cljs.core.async.t_cljs$core$async10317.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async10317.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async10317.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async10317.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async10317.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta10318","meta10318",1035689386,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async10317.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async10317.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10317";

cljs.core.async.t_cljs$core$async10317.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__6853__auto__,writer__6854__auto__,opt__6855__auto__){
return cljs.core._write.call(null,writer__6854__auto__,"cljs.core.async/t_cljs$core$async10317");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async10317 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async10317(alt_flag__$1,flag__$1,meta10318){
return (new cljs.core.async.t_cljs$core$async10317(alt_flag__$1,flag__$1,meta10318));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async10317(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async10323 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10323 = (function (alt_handler,flag,cb,meta10324){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta10324 = meta10324;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async10323.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10325,meta10324__$1){
var self__ = this;
var _10325__$1 = this;
return (new cljs.core.async.t_cljs$core$async10323(self__.alt_handler,self__.flag,self__.cb,meta10324__$1));
});

cljs.core.async.t_cljs$core$async10323.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10325){
var self__ = this;
var _10325__$1 = this;
return self__.meta10324;
});

cljs.core.async.t_cljs$core$async10323.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async10323.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async10323.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async10323.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async10323.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta10324","meta10324",-1627128326,null)], null);
});

cljs.core.async.t_cljs$core$async10323.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async10323.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10323";

cljs.core.async.t_cljs$core$async10323.cljs$lang$ctorPrWriter = (function (this__6853__auto__,writer__6854__auto__,opt__6855__auto__){
return cljs.core._write.call(null,writer__6854__auto__,"cljs.core.async/t_cljs$core$async10323");
});

cljs.core.async.__GT_t_cljs$core$async10323 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async10323(alt_handler__$1,flag__$1,cb__$1,meta10324){
return (new cljs.core.async.t_cljs$core$async10323(alt_handler__$1,flag__$1,cb__$1,meta10324));
});

}

return (new cljs.core.async.t_cljs$core$async10323(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__10326_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__10326_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__10327_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__10327_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__6247__auto__ = wport;
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
return port;
}
})()], null));
} else {
var G__10328 = (i + (1));
i = G__10328;
continue;
}
} else {
return null;
}
break;
}
})();
var or__6247__auto__ = ret;
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4657__auto__ = (function (){var and__6235__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__6235__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__6235__auto__;
}
})();
if(cljs.core.truth_(temp__4657__auto__)){
var got = temp__4657__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__7329__auto__ = [];
var len__7322__auto___10334 = arguments.length;
var i__7323__auto___10335 = (0);
while(true){
if((i__7323__auto___10335 < len__7322__auto___10334)){
args__7329__auto__.push((arguments[i__7323__auto___10335]));

var G__10336 = (i__7323__auto___10335 + (1));
i__7323__auto___10335 = G__10336;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__10331){
var map__10332 = p__10331;
var map__10332__$1 = ((((!((map__10332 == null)))?((((map__10332.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10332.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10332):map__10332);
var opts = map__10332__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq10329){
var G__10330 = cljs.core.first.call(null,seq10329);
var seq10329__$1 = cljs.core.next.call(null,seq10329);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__10330,seq10329__$1);
});

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var args10337 = [];
var len__7322__auto___10387 = arguments.length;
var i__7323__auto___10388 = (0);
while(true){
if((i__7323__auto___10388 < len__7322__auto___10387)){
args10337.push((arguments[i__7323__auto___10388]));

var G__10389 = (i__7323__auto___10388 + (1));
i__7323__auto___10388 = G__10389;
continue;
} else {
}
break;
}

var G__10339 = args10337.length;
switch (G__10339) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10337.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__10224__auto___10391 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___10391){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___10391){
return (function (state_10363){
var state_val_10364 = (state_10363[(1)]);
if((state_val_10364 === (7))){
var inst_10359 = (state_10363[(2)]);
var state_10363__$1 = state_10363;
var statearr_10365_10392 = state_10363__$1;
(statearr_10365_10392[(2)] = inst_10359);

(statearr_10365_10392[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10364 === (1))){
var state_10363__$1 = state_10363;
var statearr_10366_10393 = state_10363__$1;
(statearr_10366_10393[(2)] = null);

(statearr_10366_10393[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10364 === (4))){
var inst_10342 = (state_10363[(7)]);
var inst_10342__$1 = (state_10363[(2)]);
var inst_10343 = (inst_10342__$1 == null);
var state_10363__$1 = (function (){var statearr_10367 = state_10363;
(statearr_10367[(7)] = inst_10342__$1);

return statearr_10367;
})();
if(cljs.core.truth_(inst_10343)){
var statearr_10368_10394 = state_10363__$1;
(statearr_10368_10394[(1)] = (5));

} else {
var statearr_10369_10395 = state_10363__$1;
(statearr_10369_10395[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10364 === (13))){
var state_10363__$1 = state_10363;
var statearr_10370_10396 = state_10363__$1;
(statearr_10370_10396[(2)] = null);

(statearr_10370_10396[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10364 === (6))){
var inst_10342 = (state_10363[(7)]);
var state_10363__$1 = state_10363;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10363__$1,(11),to,inst_10342);
} else {
if((state_val_10364 === (3))){
var inst_10361 = (state_10363[(2)]);
var state_10363__$1 = state_10363;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10363__$1,inst_10361);
} else {
if((state_val_10364 === (12))){
var state_10363__$1 = state_10363;
var statearr_10371_10397 = state_10363__$1;
(statearr_10371_10397[(2)] = null);

(statearr_10371_10397[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10364 === (2))){
var state_10363__$1 = state_10363;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10363__$1,(4),from);
} else {
if((state_val_10364 === (11))){
var inst_10352 = (state_10363[(2)]);
var state_10363__$1 = state_10363;
if(cljs.core.truth_(inst_10352)){
var statearr_10372_10398 = state_10363__$1;
(statearr_10372_10398[(1)] = (12));

} else {
var statearr_10373_10399 = state_10363__$1;
(statearr_10373_10399[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10364 === (9))){
var state_10363__$1 = state_10363;
var statearr_10374_10400 = state_10363__$1;
(statearr_10374_10400[(2)] = null);

(statearr_10374_10400[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10364 === (5))){
var state_10363__$1 = state_10363;
if(cljs.core.truth_(close_QMARK_)){
var statearr_10375_10401 = state_10363__$1;
(statearr_10375_10401[(1)] = (8));

} else {
var statearr_10376_10402 = state_10363__$1;
(statearr_10376_10402[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10364 === (14))){
var inst_10357 = (state_10363[(2)]);
var state_10363__$1 = state_10363;
var statearr_10377_10403 = state_10363__$1;
(statearr_10377_10403[(2)] = inst_10357);

(statearr_10377_10403[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10364 === (10))){
var inst_10349 = (state_10363[(2)]);
var state_10363__$1 = state_10363;
var statearr_10378_10404 = state_10363__$1;
(statearr_10378_10404[(2)] = inst_10349);

(statearr_10378_10404[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10364 === (8))){
var inst_10346 = cljs.core.async.close_BANG_.call(null,to);
var state_10363__$1 = state_10363;
var statearr_10379_10405 = state_10363__$1;
(statearr_10379_10405[(2)] = inst_10346);

(statearr_10379_10405[(1)] = (10));


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
});})(c__10224__auto___10391))
;
return ((function (switch__10112__auto__,c__10224__auto___10391){
return (function() {
var cljs$core$async$state_machine__10113__auto__ = null;
var cljs$core$async$state_machine__10113__auto____0 = (function (){
var statearr_10383 = [null,null,null,null,null,null,null,null];
(statearr_10383[(0)] = cljs$core$async$state_machine__10113__auto__);

(statearr_10383[(1)] = (1));

return statearr_10383;
});
var cljs$core$async$state_machine__10113__auto____1 = (function (state_10363){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_10363);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e10384){if((e10384 instanceof Object)){
var ex__10116__auto__ = e10384;
var statearr_10385_10406 = state_10363;
(statearr_10385_10406[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10363);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10384;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10407 = state_10363;
state_10363 = G__10407;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$state_machine__10113__auto__ = function(state_10363){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10113__auto____1.call(this,state_10363);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10113__auto____0;
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10113__auto____1;
return cljs$core$async$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___10391))
})();
var state__10226__auto__ = (function (){var statearr_10386 = f__10225__auto__.call(null);
(statearr_10386[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___10391);

return statearr_10386;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___10391))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__10595){
var vec__10596 = p__10595;
var v = cljs.core.nth.call(null,vec__10596,(0),null);
var p = cljs.core.nth.call(null,vec__10596,(1),null);
var job = vec__10596;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__10224__auto___10782 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___10782,res,vec__10596,v,p,job,jobs,results){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___10782,res,vec__10596,v,p,job,jobs,results){
return (function (state_10603){
var state_val_10604 = (state_10603[(1)]);
if((state_val_10604 === (1))){
var state_10603__$1 = state_10603;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10603__$1,(2),res,v);
} else {
if((state_val_10604 === (2))){
var inst_10600 = (state_10603[(2)]);
var inst_10601 = cljs.core.async.close_BANG_.call(null,res);
var state_10603__$1 = (function (){var statearr_10605 = state_10603;
(statearr_10605[(7)] = inst_10600);

return statearr_10605;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10603__$1,inst_10601);
} else {
return null;
}
}
});})(c__10224__auto___10782,res,vec__10596,v,p,job,jobs,results))
;
return ((function (switch__10112__auto__,c__10224__auto___10782,res,vec__10596,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0 = (function (){
var statearr_10609 = [null,null,null,null,null,null,null,null];
(statearr_10609[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__);

(statearr_10609[(1)] = (1));

return statearr_10609;
});
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1 = (function (state_10603){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_10603);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e10610){if((e10610 instanceof Object)){
var ex__10116__auto__ = e10610;
var statearr_10611_10783 = state_10603;
(statearr_10611_10783[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10603);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10610;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10784 = state_10603;
state_10603 = G__10784;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__ = function(state_10603){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1.call(this,state_10603);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___10782,res,vec__10596,v,p,job,jobs,results))
})();
var state__10226__auto__ = (function (){var statearr_10612 = f__10225__auto__.call(null);
(statearr_10612[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___10782);

return statearr_10612;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___10782,res,vec__10596,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__10613){
var vec__10614 = p__10613;
var v = cljs.core.nth.call(null,vec__10614,(0),null);
var p = cljs.core.nth.call(null,vec__10614,(1),null);
var job = vec__10614;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__7162__auto___10785 = n;
var __10786 = (0);
while(true){
if((__10786 < n__7162__auto___10785)){
var G__10617_10787 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__10617_10787) {
case "compute":
var c__10224__auto___10789 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__10786,c__10224__auto___10789,G__10617_10787,n__7162__auto___10785,jobs,results,process,async){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (__10786,c__10224__auto___10789,G__10617_10787,n__7162__auto___10785,jobs,results,process,async){
return (function (state_10630){
var state_val_10631 = (state_10630[(1)]);
if((state_val_10631 === (1))){
var state_10630__$1 = state_10630;
var statearr_10632_10790 = state_10630__$1;
(statearr_10632_10790[(2)] = null);

(statearr_10632_10790[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10631 === (2))){
var state_10630__$1 = state_10630;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10630__$1,(4),jobs);
} else {
if((state_val_10631 === (3))){
var inst_10628 = (state_10630[(2)]);
var state_10630__$1 = state_10630;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10630__$1,inst_10628);
} else {
if((state_val_10631 === (4))){
var inst_10620 = (state_10630[(2)]);
var inst_10621 = process.call(null,inst_10620);
var state_10630__$1 = state_10630;
if(cljs.core.truth_(inst_10621)){
var statearr_10633_10791 = state_10630__$1;
(statearr_10633_10791[(1)] = (5));

} else {
var statearr_10634_10792 = state_10630__$1;
(statearr_10634_10792[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10631 === (5))){
var state_10630__$1 = state_10630;
var statearr_10635_10793 = state_10630__$1;
(statearr_10635_10793[(2)] = null);

(statearr_10635_10793[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10631 === (6))){
var state_10630__$1 = state_10630;
var statearr_10636_10794 = state_10630__$1;
(statearr_10636_10794[(2)] = null);

(statearr_10636_10794[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10631 === (7))){
var inst_10626 = (state_10630[(2)]);
var state_10630__$1 = state_10630;
var statearr_10637_10795 = state_10630__$1;
(statearr_10637_10795[(2)] = inst_10626);

(statearr_10637_10795[(1)] = (3));


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
});})(__10786,c__10224__auto___10789,G__10617_10787,n__7162__auto___10785,jobs,results,process,async))
;
return ((function (__10786,switch__10112__auto__,c__10224__auto___10789,G__10617_10787,n__7162__auto___10785,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0 = (function (){
var statearr_10641 = [null,null,null,null,null,null,null];
(statearr_10641[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__);

(statearr_10641[(1)] = (1));

return statearr_10641;
});
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1 = (function (state_10630){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_10630);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e10642){if((e10642 instanceof Object)){
var ex__10116__auto__ = e10642;
var statearr_10643_10796 = state_10630;
(statearr_10643_10796[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10630);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10642;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10797 = state_10630;
state_10630 = G__10797;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__ = function(state_10630){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1.call(this,state_10630);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__;
})()
;})(__10786,switch__10112__auto__,c__10224__auto___10789,G__10617_10787,n__7162__auto___10785,jobs,results,process,async))
})();
var state__10226__auto__ = (function (){var statearr_10644 = f__10225__auto__.call(null);
(statearr_10644[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___10789);

return statearr_10644;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(__10786,c__10224__auto___10789,G__10617_10787,n__7162__auto___10785,jobs,results,process,async))
);


break;
case "async":
var c__10224__auto___10798 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__10786,c__10224__auto___10798,G__10617_10787,n__7162__auto___10785,jobs,results,process,async){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (__10786,c__10224__auto___10798,G__10617_10787,n__7162__auto___10785,jobs,results,process,async){
return (function (state_10657){
var state_val_10658 = (state_10657[(1)]);
if((state_val_10658 === (1))){
var state_10657__$1 = state_10657;
var statearr_10659_10799 = state_10657__$1;
(statearr_10659_10799[(2)] = null);

(statearr_10659_10799[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10658 === (2))){
var state_10657__$1 = state_10657;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10657__$1,(4),jobs);
} else {
if((state_val_10658 === (3))){
var inst_10655 = (state_10657[(2)]);
var state_10657__$1 = state_10657;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10657__$1,inst_10655);
} else {
if((state_val_10658 === (4))){
var inst_10647 = (state_10657[(2)]);
var inst_10648 = async.call(null,inst_10647);
var state_10657__$1 = state_10657;
if(cljs.core.truth_(inst_10648)){
var statearr_10660_10800 = state_10657__$1;
(statearr_10660_10800[(1)] = (5));

} else {
var statearr_10661_10801 = state_10657__$1;
(statearr_10661_10801[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10658 === (5))){
var state_10657__$1 = state_10657;
var statearr_10662_10802 = state_10657__$1;
(statearr_10662_10802[(2)] = null);

(statearr_10662_10802[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10658 === (6))){
var state_10657__$1 = state_10657;
var statearr_10663_10803 = state_10657__$1;
(statearr_10663_10803[(2)] = null);

(statearr_10663_10803[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10658 === (7))){
var inst_10653 = (state_10657[(2)]);
var state_10657__$1 = state_10657;
var statearr_10664_10804 = state_10657__$1;
(statearr_10664_10804[(2)] = inst_10653);

(statearr_10664_10804[(1)] = (3));


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
});})(__10786,c__10224__auto___10798,G__10617_10787,n__7162__auto___10785,jobs,results,process,async))
;
return ((function (__10786,switch__10112__auto__,c__10224__auto___10798,G__10617_10787,n__7162__auto___10785,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0 = (function (){
var statearr_10668 = [null,null,null,null,null,null,null];
(statearr_10668[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__);

(statearr_10668[(1)] = (1));

return statearr_10668;
});
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1 = (function (state_10657){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_10657);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e10669){if((e10669 instanceof Object)){
var ex__10116__auto__ = e10669;
var statearr_10670_10805 = state_10657;
(statearr_10670_10805[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10657);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10669;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10806 = state_10657;
state_10657 = G__10806;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__ = function(state_10657){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1.call(this,state_10657);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__;
})()
;})(__10786,switch__10112__auto__,c__10224__auto___10798,G__10617_10787,n__7162__auto___10785,jobs,results,process,async))
})();
var state__10226__auto__ = (function (){var statearr_10671 = f__10225__auto__.call(null);
(statearr_10671[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___10798);

return statearr_10671;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(__10786,c__10224__auto___10798,G__10617_10787,n__7162__auto___10785,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__10807 = (__10786 + (1));
__10786 = G__10807;
continue;
} else {
}
break;
}

var c__10224__auto___10808 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___10808,jobs,results,process,async){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___10808,jobs,results,process,async){
return (function (state_10693){
var state_val_10694 = (state_10693[(1)]);
if((state_val_10694 === (1))){
var state_10693__$1 = state_10693;
var statearr_10695_10809 = state_10693__$1;
(statearr_10695_10809[(2)] = null);

(statearr_10695_10809[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10694 === (2))){
var state_10693__$1 = state_10693;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10693__$1,(4),from);
} else {
if((state_val_10694 === (3))){
var inst_10691 = (state_10693[(2)]);
var state_10693__$1 = state_10693;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10693__$1,inst_10691);
} else {
if((state_val_10694 === (4))){
var inst_10674 = (state_10693[(7)]);
var inst_10674__$1 = (state_10693[(2)]);
var inst_10675 = (inst_10674__$1 == null);
var state_10693__$1 = (function (){var statearr_10696 = state_10693;
(statearr_10696[(7)] = inst_10674__$1);

return statearr_10696;
})();
if(cljs.core.truth_(inst_10675)){
var statearr_10697_10810 = state_10693__$1;
(statearr_10697_10810[(1)] = (5));

} else {
var statearr_10698_10811 = state_10693__$1;
(statearr_10698_10811[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10694 === (5))){
var inst_10677 = cljs.core.async.close_BANG_.call(null,jobs);
var state_10693__$1 = state_10693;
var statearr_10699_10812 = state_10693__$1;
(statearr_10699_10812[(2)] = inst_10677);

(statearr_10699_10812[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10694 === (6))){
var inst_10679 = (state_10693[(8)]);
var inst_10674 = (state_10693[(7)]);
var inst_10679__$1 = cljs.core.async.chan.call(null,(1));
var inst_10680 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_10681 = [inst_10674,inst_10679__$1];
var inst_10682 = (new cljs.core.PersistentVector(null,2,(5),inst_10680,inst_10681,null));
var state_10693__$1 = (function (){var statearr_10700 = state_10693;
(statearr_10700[(8)] = inst_10679__$1);

return statearr_10700;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10693__$1,(8),jobs,inst_10682);
} else {
if((state_val_10694 === (7))){
var inst_10689 = (state_10693[(2)]);
var state_10693__$1 = state_10693;
var statearr_10701_10813 = state_10693__$1;
(statearr_10701_10813[(2)] = inst_10689);

(statearr_10701_10813[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10694 === (8))){
var inst_10679 = (state_10693[(8)]);
var inst_10684 = (state_10693[(2)]);
var state_10693__$1 = (function (){var statearr_10702 = state_10693;
(statearr_10702[(9)] = inst_10684);

return statearr_10702;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10693__$1,(9),results,inst_10679);
} else {
if((state_val_10694 === (9))){
var inst_10686 = (state_10693[(2)]);
var state_10693__$1 = (function (){var statearr_10703 = state_10693;
(statearr_10703[(10)] = inst_10686);

return statearr_10703;
})();
var statearr_10704_10814 = state_10693__$1;
(statearr_10704_10814[(2)] = null);

(statearr_10704_10814[(1)] = (2));


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
});})(c__10224__auto___10808,jobs,results,process,async))
;
return ((function (switch__10112__auto__,c__10224__auto___10808,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0 = (function (){
var statearr_10708 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_10708[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__);

(statearr_10708[(1)] = (1));

return statearr_10708;
});
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1 = (function (state_10693){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_10693);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e10709){if((e10709 instanceof Object)){
var ex__10116__auto__ = e10709;
var statearr_10710_10815 = state_10693;
(statearr_10710_10815[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10693);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10709;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10816 = state_10693;
state_10693 = G__10816;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__ = function(state_10693){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1.call(this,state_10693);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___10808,jobs,results,process,async))
})();
var state__10226__auto__ = (function (){var statearr_10711 = f__10225__auto__.call(null);
(statearr_10711[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___10808);

return statearr_10711;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___10808,jobs,results,process,async))
);


var c__10224__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto__,jobs,results,process,async){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto__,jobs,results,process,async){
return (function (state_10749){
var state_val_10750 = (state_10749[(1)]);
if((state_val_10750 === (7))){
var inst_10745 = (state_10749[(2)]);
var state_10749__$1 = state_10749;
var statearr_10751_10817 = state_10749__$1;
(statearr_10751_10817[(2)] = inst_10745);

(statearr_10751_10817[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (20))){
var state_10749__$1 = state_10749;
var statearr_10752_10818 = state_10749__$1;
(statearr_10752_10818[(2)] = null);

(statearr_10752_10818[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (1))){
var state_10749__$1 = state_10749;
var statearr_10753_10819 = state_10749__$1;
(statearr_10753_10819[(2)] = null);

(statearr_10753_10819[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (4))){
var inst_10714 = (state_10749[(7)]);
var inst_10714__$1 = (state_10749[(2)]);
var inst_10715 = (inst_10714__$1 == null);
var state_10749__$1 = (function (){var statearr_10754 = state_10749;
(statearr_10754[(7)] = inst_10714__$1);

return statearr_10754;
})();
if(cljs.core.truth_(inst_10715)){
var statearr_10755_10820 = state_10749__$1;
(statearr_10755_10820[(1)] = (5));

} else {
var statearr_10756_10821 = state_10749__$1;
(statearr_10756_10821[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (15))){
var inst_10727 = (state_10749[(8)]);
var state_10749__$1 = state_10749;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10749__$1,(18),to,inst_10727);
} else {
if((state_val_10750 === (21))){
var inst_10740 = (state_10749[(2)]);
var state_10749__$1 = state_10749;
var statearr_10757_10822 = state_10749__$1;
(statearr_10757_10822[(2)] = inst_10740);

(statearr_10757_10822[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (13))){
var inst_10742 = (state_10749[(2)]);
var state_10749__$1 = (function (){var statearr_10758 = state_10749;
(statearr_10758[(9)] = inst_10742);

return statearr_10758;
})();
var statearr_10759_10823 = state_10749__$1;
(statearr_10759_10823[(2)] = null);

(statearr_10759_10823[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (6))){
var inst_10714 = (state_10749[(7)]);
var state_10749__$1 = state_10749;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10749__$1,(11),inst_10714);
} else {
if((state_val_10750 === (17))){
var inst_10735 = (state_10749[(2)]);
var state_10749__$1 = state_10749;
if(cljs.core.truth_(inst_10735)){
var statearr_10760_10824 = state_10749__$1;
(statearr_10760_10824[(1)] = (19));

} else {
var statearr_10761_10825 = state_10749__$1;
(statearr_10761_10825[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (3))){
var inst_10747 = (state_10749[(2)]);
var state_10749__$1 = state_10749;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10749__$1,inst_10747);
} else {
if((state_val_10750 === (12))){
var inst_10724 = (state_10749[(10)]);
var state_10749__$1 = state_10749;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10749__$1,(14),inst_10724);
} else {
if((state_val_10750 === (2))){
var state_10749__$1 = state_10749;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10749__$1,(4),results);
} else {
if((state_val_10750 === (19))){
var state_10749__$1 = state_10749;
var statearr_10762_10826 = state_10749__$1;
(statearr_10762_10826[(2)] = null);

(statearr_10762_10826[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (11))){
var inst_10724 = (state_10749[(2)]);
var state_10749__$1 = (function (){var statearr_10763 = state_10749;
(statearr_10763[(10)] = inst_10724);

return statearr_10763;
})();
var statearr_10764_10827 = state_10749__$1;
(statearr_10764_10827[(2)] = null);

(statearr_10764_10827[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (9))){
var state_10749__$1 = state_10749;
var statearr_10765_10828 = state_10749__$1;
(statearr_10765_10828[(2)] = null);

(statearr_10765_10828[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (5))){
var state_10749__$1 = state_10749;
if(cljs.core.truth_(close_QMARK_)){
var statearr_10766_10829 = state_10749__$1;
(statearr_10766_10829[(1)] = (8));

} else {
var statearr_10767_10830 = state_10749__$1;
(statearr_10767_10830[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (14))){
var inst_10727 = (state_10749[(8)]);
var inst_10729 = (state_10749[(11)]);
var inst_10727__$1 = (state_10749[(2)]);
var inst_10728 = (inst_10727__$1 == null);
var inst_10729__$1 = cljs.core.not.call(null,inst_10728);
var state_10749__$1 = (function (){var statearr_10768 = state_10749;
(statearr_10768[(8)] = inst_10727__$1);

(statearr_10768[(11)] = inst_10729__$1);

return statearr_10768;
})();
if(inst_10729__$1){
var statearr_10769_10831 = state_10749__$1;
(statearr_10769_10831[(1)] = (15));

} else {
var statearr_10770_10832 = state_10749__$1;
(statearr_10770_10832[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (16))){
var inst_10729 = (state_10749[(11)]);
var state_10749__$1 = state_10749;
var statearr_10771_10833 = state_10749__$1;
(statearr_10771_10833[(2)] = inst_10729);

(statearr_10771_10833[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (10))){
var inst_10721 = (state_10749[(2)]);
var state_10749__$1 = state_10749;
var statearr_10772_10834 = state_10749__$1;
(statearr_10772_10834[(2)] = inst_10721);

(statearr_10772_10834[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (18))){
var inst_10732 = (state_10749[(2)]);
var state_10749__$1 = state_10749;
var statearr_10773_10835 = state_10749__$1;
(statearr_10773_10835[(2)] = inst_10732);

(statearr_10773_10835[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10750 === (8))){
var inst_10718 = cljs.core.async.close_BANG_.call(null,to);
var state_10749__$1 = state_10749;
var statearr_10774_10836 = state_10749__$1;
(statearr_10774_10836[(2)] = inst_10718);

(statearr_10774_10836[(1)] = (10));


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
});})(c__10224__auto__,jobs,results,process,async))
;
return ((function (switch__10112__auto__,c__10224__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0 = (function (){
var statearr_10778 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_10778[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__);

(statearr_10778[(1)] = (1));

return statearr_10778;
});
var cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1 = (function (state_10749){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_10749);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e10779){if((e10779 instanceof Object)){
var ex__10116__auto__ = e10779;
var statearr_10780_10837 = state_10749;
(statearr_10780_10837[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10749);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10779;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10838 = state_10749;
state_10749 = G__10838;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__ = function(state_10749){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1.call(this,state_10749);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__10113__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto__,jobs,results,process,async))
})();
var state__10226__auto__ = (function (){var statearr_10781 = f__10225__auto__.call(null);
(statearr_10781[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto__);

return statearr_10781;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto__,jobs,results,process,async))
);

return c__10224__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var args10839 = [];
var len__7322__auto___10842 = arguments.length;
var i__7323__auto___10843 = (0);
while(true){
if((i__7323__auto___10843 < len__7322__auto___10842)){
args10839.push((arguments[i__7323__auto___10843]));

var G__10844 = (i__7323__auto___10843 + (1));
i__7323__auto___10843 = G__10844;
continue;
} else {
}
break;
}

var G__10841 = args10839.length;
switch (G__10841) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10839.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var args10846 = [];
var len__7322__auto___10849 = arguments.length;
var i__7323__auto___10850 = (0);
while(true){
if((i__7323__auto___10850 < len__7322__auto___10849)){
args10846.push((arguments[i__7323__auto___10850]));

var G__10851 = (i__7323__auto___10850 + (1));
i__7323__auto___10850 = G__10851;
continue;
} else {
}
break;
}

var G__10848 = args10846.length;
switch (G__10848) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10846.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var args10853 = [];
var len__7322__auto___10906 = arguments.length;
var i__7323__auto___10907 = (0);
while(true){
if((i__7323__auto___10907 < len__7322__auto___10906)){
args10853.push((arguments[i__7323__auto___10907]));

var G__10908 = (i__7323__auto___10907 + (1));
i__7323__auto___10907 = G__10908;
continue;
} else {
}
break;
}

var G__10855 = args10853.length;
switch (G__10855) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10853.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__10224__auto___10910 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___10910,tc,fc){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___10910,tc,fc){
return (function (state_10881){
var state_val_10882 = (state_10881[(1)]);
if((state_val_10882 === (7))){
var inst_10877 = (state_10881[(2)]);
var state_10881__$1 = state_10881;
var statearr_10883_10911 = state_10881__$1;
(statearr_10883_10911[(2)] = inst_10877);

(statearr_10883_10911[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10882 === (1))){
var state_10881__$1 = state_10881;
var statearr_10884_10912 = state_10881__$1;
(statearr_10884_10912[(2)] = null);

(statearr_10884_10912[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10882 === (4))){
var inst_10858 = (state_10881[(7)]);
var inst_10858__$1 = (state_10881[(2)]);
var inst_10859 = (inst_10858__$1 == null);
var state_10881__$1 = (function (){var statearr_10885 = state_10881;
(statearr_10885[(7)] = inst_10858__$1);

return statearr_10885;
})();
if(cljs.core.truth_(inst_10859)){
var statearr_10886_10913 = state_10881__$1;
(statearr_10886_10913[(1)] = (5));

} else {
var statearr_10887_10914 = state_10881__$1;
(statearr_10887_10914[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10882 === (13))){
var state_10881__$1 = state_10881;
var statearr_10888_10915 = state_10881__$1;
(statearr_10888_10915[(2)] = null);

(statearr_10888_10915[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10882 === (6))){
var inst_10858 = (state_10881[(7)]);
var inst_10864 = p.call(null,inst_10858);
var state_10881__$1 = state_10881;
if(cljs.core.truth_(inst_10864)){
var statearr_10889_10916 = state_10881__$1;
(statearr_10889_10916[(1)] = (9));

} else {
var statearr_10890_10917 = state_10881__$1;
(statearr_10890_10917[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10882 === (3))){
var inst_10879 = (state_10881[(2)]);
var state_10881__$1 = state_10881;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10881__$1,inst_10879);
} else {
if((state_val_10882 === (12))){
var state_10881__$1 = state_10881;
var statearr_10891_10918 = state_10881__$1;
(statearr_10891_10918[(2)] = null);

(statearr_10891_10918[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10882 === (2))){
var state_10881__$1 = state_10881;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10881__$1,(4),ch);
} else {
if((state_val_10882 === (11))){
var inst_10858 = (state_10881[(7)]);
var inst_10868 = (state_10881[(2)]);
var state_10881__$1 = state_10881;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10881__$1,(8),inst_10868,inst_10858);
} else {
if((state_val_10882 === (9))){
var state_10881__$1 = state_10881;
var statearr_10892_10919 = state_10881__$1;
(statearr_10892_10919[(2)] = tc);

(statearr_10892_10919[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10882 === (5))){
var inst_10861 = cljs.core.async.close_BANG_.call(null,tc);
var inst_10862 = cljs.core.async.close_BANG_.call(null,fc);
var state_10881__$1 = (function (){var statearr_10893 = state_10881;
(statearr_10893[(8)] = inst_10861);

return statearr_10893;
})();
var statearr_10894_10920 = state_10881__$1;
(statearr_10894_10920[(2)] = inst_10862);

(statearr_10894_10920[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10882 === (14))){
var inst_10875 = (state_10881[(2)]);
var state_10881__$1 = state_10881;
var statearr_10895_10921 = state_10881__$1;
(statearr_10895_10921[(2)] = inst_10875);

(statearr_10895_10921[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10882 === (10))){
var state_10881__$1 = state_10881;
var statearr_10896_10922 = state_10881__$1;
(statearr_10896_10922[(2)] = fc);

(statearr_10896_10922[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10882 === (8))){
var inst_10870 = (state_10881[(2)]);
var state_10881__$1 = state_10881;
if(cljs.core.truth_(inst_10870)){
var statearr_10897_10923 = state_10881__$1;
(statearr_10897_10923[(1)] = (12));

} else {
var statearr_10898_10924 = state_10881__$1;
(statearr_10898_10924[(1)] = (13));

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
});})(c__10224__auto___10910,tc,fc))
;
return ((function (switch__10112__auto__,c__10224__auto___10910,tc,fc){
return (function() {
var cljs$core$async$state_machine__10113__auto__ = null;
var cljs$core$async$state_machine__10113__auto____0 = (function (){
var statearr_10902 = [null,null,null,null,null,null,null,null,null];
(statearr_10902[(0)] = cljs$core$async$state_machine__10113__auto__);

(statearr_10902[(1)] = (1));

return statearr_10902;
});
var cljs$core$async$state_machine__10113__auto____1 = (function (state_10881){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_10881);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e10903){if((e10903 instanceof Object)){
var ex__10116__auto__ = e10903;
var statearr_10904_10925 = state_10881;
(statearr_10904_10925[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10881);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10903;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10926 = state_10881;
state_10881 = G__10926;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$state_machine__10113__auto__ = function(state_10881){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10113__auto____1.call(this,state_10881);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10113__auto____0;
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10113__auto____1;
return cljs$core$async$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___10910,tc,fc))
})();
var state__10226__auto__ = (function (){var statearr_10905 = f__10225__auto__.call(null);
(statearr_10905[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___10910);

return statearr_10905;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___10910,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__10224__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto__){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto__){
return (function (state_10990){
var state_val_10991 = (state_10990[(1)]);
if((state_val_10991 === (7))){
var inst_10986 = (state_10990[(2)]);
var state_10990__$1 = state_10990;
var statearr_10992_11013 = state_10990__$1;
(statearr_10992_11013[(2)] = inst_10986);

(statearr_10992_11013[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10991 === (1))){
var inst_10970 = init;
var state_10990__$1 = (function (){var statearr_10993 = state_10990;
(statearr_10993[(7)] = inst_10970);

return statearr_10993;
})();
var statearr_10994_11014 = state_10990__$1;
(statearr_10994_11014[(2)] = null);

(statearr_10994_11014[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10991 === (4))){
var inst_10973 = (state_10990[(8)]);
var inst_10973__$1 = (state_10990[(2)]);
var inst_10974 = (inst_10973__$1 == null);
var state_10990__$1 = (function (){var statearr_10995 = state_10990;
(statearr_10995[(8)] = inst_10973__$1);

return statearr_10995;
})();
if(cljs.core.truth_(inst_10974)){
var statearr_10996_11015 = state_10990__$1;
(statearr_10996_11015[(1)] = (5));

} else {
var statearr_10997_11016 = state_10990__$1;
(statearr_10997_11016[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10991 === (6))){
var inst_10973 = (state_10990[(8)]);
var inst_10977 = (state_10990[(9)]);
var inst_10970 = (state_10990[(7)]);
var inst_10977__$1 = f.call(null,inst_10970,inst_10973);
var inst_10978 = cljs.core.reduced_QMARK_.call(null,inst_10977__$1);
var state_10990__$1 = (function (){var statearr_10998 = state_10990;
(statearr_10998[(9)] = inst_10977__$1);

return statearr_10998;
})();
if(inst_10978){
var statearr_10999_11017 = state_10990__$1;
(statearr_10999_11017[(1)] = (8));

} else {
var statearr_11000_11018 = state_10990__$1;
(statearr_11000_11018[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10991 === (3))){
var inst_10988 = (state_10990[(2)]);
var state_10990__$1 = state_10990;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10990__$1,inst_10988);
} else {
if((state_val_10991 === (2))){
var state_10990__$1 = state_10990;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10990__$1,(4),ch);
} else {
if((state_val_10991 === (9))){
var inst_10977 = (state_10990[(9)]);
var inst_10970 = inst_10977;
var state_10990__$1 = (function (){var statearr_11001 = state_10990;
(statearr_11001[(7)] = inst_10970);

return statearr_11001;
})();
var statearr_11002_11019 = state_10990__$1;
(statearr_11002_11019[(2)] = null);

(statearr_11002_11019[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10991 === (5))){
var inst_10970 = (state_10990[(7)]);
var state_10990__$1 = state_10990;
var statearr_11003_11020 = state_10990__$1;
(statearr_11003_11020[(2)] = inst_10970);

(statearr_11003_11020[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10991 === (10))){
var inst_10984 = (state_10990[(2)]);
var state_10990__$1 = state_10990;
var statearr_11004_11021 = state_10990__$1;
(statearr_11004_11021[(2)] = inst_10984);

(statearr_11004_11021[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10991 === (8))){
var inst_10977 = (state_10990[(9)]);
var inst_10980 = cljs.core.deref.call(null,inst_10977);
var state_10990__$1 = state_10990;
var statearr_11005_11022 = state_10990__$1;
(statearr_11005_11022[(2)] = inst_10980);

(statearr_11005_11022[(1)] = (10));


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
});})(c__10224__auto__))
;
return ((function (switch__10112__auto__,c__10224__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__10113__auto__ = null;
var cljs$core$async$reduce_$_state_machine__10113__auto____0 = (function (){
var statearr_11009 = [null,null,null,null,null,null,null,null,null,null];
(statearr_11009[(0)] = cljs$core$async$reduce_$_state_machine__10113__auto__);

(statearr_11009[(1)] = (1));

return statearr_11009;
});
var cljs$core$async$reduce_$_state_machine__10113__auto____1 = (function (state_10990){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_10990);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e11010){if((e11010 instanceof Object)){
var ex__10116__auto__ = e11010;
var statearr_11011_11023 = state_10990;
(statearr_11011_11023[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10990);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11010;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11024 = state_10990;
state_10990 = G__11024;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__10113__auto__ = function(state_10990){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__10113__auto____1.call(this,state_10990);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__10113__auto____0;
cljs$core$async$reduce_$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__10113__auto____1;
return cljs$core$async$reduce_$_state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto__))
})();
var state__10226__auto__ = (function (){var statearr_11012 = f__10225__auto__.call(null);
(statearr_11012[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto__);

return statearr_11012;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto__))
);

return c__10224__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var args11025 = [];
var len__7322__auto___11077 = arguments.length;
var i__7323__auto___11078 = (0);
while(true){
if((i__7323__auto___11078 < len__7322__auto___11077)){
args11025.push((arguments[i__7323__auto___11078]));

var G__11079 = (i__7323__auto___11078 + (1));
i__7323__auto___11078 = G__11079;
continue;
} else {
}
break;
}

var G__11027 = args11025.length;
switch (G__11027) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11025.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__10224__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto__){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto__){
return (function (state_11052){
var state_val_11053 = (state_11052[(1)]);
if((state_val_11053 === (7))){
var inst_11034 = (state_11052[(2)]);
var state_11052__$1 = state_11052;
var statearr_11054_11081 = state_11052__$1;
(statearr_11054_11081[(2)] = inst_11034);

(statearr_11054_11081[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11053 === (1))){
var inst_11028 = cljs.core.seq.call(null,coll);
var inst_11029 = inst_11028;
var state_11052__$1 = (function (){var statearr_11055 = state_11052;
(statearr_11055[(7)] = inst_11029);

return statearr_11055;
})();
var statearr_11056_11082 = state_11052__$1;
(statearr_11056_11082[(2)] = null);

(statearr_11056_11082[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11053 === (4))){
var inst_11029 = (state_11052[(7)]);
var inst_11032 = cljs.core.first.call(null,inst_11029);
var state_11052__$1 = state_11052;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11052__$1,(7),ch,inst_11032);
} else {
if((state_val_11053 === (13))){
var inst_11046 = (state_11052[(2)]);
var state_11052__$1 = state_11052;
var statearr_11057_11083 = state_11052__$1;
(statearr_11057_11083[(2)] = inst_11046);

(statearr_11057_11083[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11053 === (6))){
var inst_11037 = (state_11052[(2)]);
var state_11052__$1 = state_11052;
if(cljs.core.truth_(inst_11037)){
var statearr_11058_11084 = state_11052__$1;
(statearr_11058_11084[(1)] = (8));

} else {
var statearr_11059_11085 = state_11052__$1;
(statearr_11059_11085[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11053 === (3))){
var inst_11050 = (state_11052[(2)]);
var state_11052__$1 = state_11052;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11052__$1,inst_11050);
} else {
if((state_val_11053 === (12))){
var state_11052__$1 = state_11052;
var statearr_11060_11086 = state_11052__$1;
(statearr_11060_11086[(2)] = null);

(statearr_11060_11086[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11053 === (2))){
var inst_11029 = (state_11052[(7)]);
var state_11052__$1 = state_11052;
if(cljs.core.truth_(inst_11029)){
var statearr_11061_11087 = state_11052__$1;
(statearr_11061_11087[(1)] = (4));

} else {
var statearr_11062_11088 = state_11052__$1;
(statearr_11062_11088[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11053 === (11))){
var inst_11043 = cljs.core.async.close_BANG_.call(null,ch);
var state_11052__$1 = state_11052;
var statearr_11063_11089 = state_11052__$1;
(statearr_11063_11089[(2)] = inst_11043);

(statearr_11063_11089[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11053 === (9))){
var state_11052__$1 = state_11052;
if(cljs.core.truth_(close_QMARK_)){
var statearr_11064_11090 = state_11052__$1;
(statearr_11064_11090[(1)] = (11));

} else {
var statearr_11065_11091 = state_11052__$1;
(statearr_11065_11091[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11053 === (5))){
var inst_11029 = (state_11052[(7)]);
var state_11052__$1 = state_11052;
var statearr_11066_11092 = state_11052__$1;
(statearr_11066_11092[(2)] = inst_11029);

(statearr_11066_11092[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11053 === (10))){
var inst_11048 = (state_11052[(2)]);
var state_11052__$1 = state_11052;
var statearr_11067_11093 = state_11052__$1;
(statearr_11067_11093[(2)] = inst_11048);

(statearr_11067_11093[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11053 === (8))){
var inst_11029 = (state_11052[(7)]);
var inst_11039 = cljs.core.next.call(null,inst_11029);
var inst_11029__$1 = inst_11039;
var state_11052__$1 = (function (){var statearr_11068 = state_11052;
(statearr_11068[(7)] = inst_11029__$1);

return statearr_11068;
})();
var statearr_11069_11094 = state_11052__$1;
(statearr_11069_11094[(2)] = null);

(statearr_11069_11094[(1)] = (2));


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
});})(c__10224__auto__))
;
return ((function (switch__10112__auto__,c__10224__auto__){
return (function() {
var cljs$core$async$state_machine__10113__auto__ = null;
var cljs$core$async$state_machine__10113__auto____0 = (function (){
var statearr_11073 = [null,null,null,null,null,null,null,null];
(statearr_11073[(0)] = cljs$core$async$state_machine__10113__auto__);

(statearr_11073[(1)] = (1));

return statearr_11073;
});
var cljs$core$async$state_machine__10113__auto____1 = (function (state_11052){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_11052);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e11074){if((e11074 instanceof Object)){
var ex__10116__auto__ = e11074;
var statearr_11075_11095 = state_11052;
(statearr_11075_11095[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11052);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11074;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11096 = state_11052;
state_11052 = G__11096;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$state_machine__10113__auto__ = function(state_11052){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10113__auto____1.call(this,state_11052);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10113__auto____0;
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10113__auto____1;
return cljs$core$async$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto__))
})();
var state__10226__auto__ = (function (){var statearr_11076 = f__10225__auto__.call(null);
(statearr_11076[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto__);

return statearr_11076;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto__))
);

return c__10224__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((!((_ == null))) && (!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__6910__auto__ = (((_ == null))?null:_);
var m__6911__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,_);
} else {
var m__6911__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((!((m == null))) && (!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__6910__auto__ = (((m == null))?null:m);
var m__6911__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__6911__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__6910__auto__ = (((m == null))?null:m);
var m__6911__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,m,ch);
} else {
var m__6911__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__6910__auto__ = (((m == null))?null:m);
var m__6911__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,m);
} else {
var m__6911__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async11322 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async11322 = (function (mult,ch,cs,meta11323){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta11323 = meta11323;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async11322.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_11324,meta11323__$1){
var self__ = this;
var _11324__$1 = this;
return (new cljs.core.async.t_cljs$core$async11322(self__.mult,self__.ch,self__.cs,meta11323__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async11322.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_11324){
var self__ = this;
var _11324__$1 = this;
return self__.meta11323;
});})(cs))
;

cljs.core.async.t_cljs$core$async11322.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async11322.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async11322.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async11322.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async11322.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async11322.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async11322.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta11323","meta11323",-338947926,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async11322.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async11322.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async11322";

cljs.core.async.t_cljs$core$async11322.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__6853__auto__,writer__6854__auto__,opt__6855__auto__){
return cljs.core._write.call(null,writer__6854__auto__,"cljs.core.async/t_cljs$core$async11322");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async11322 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async11322(mult__$1,ch__$1,cs__$1,meta11323){
return (new cljs.core.async.t_cljs$core$async11322(mult__$1,ch__$1,cs__$1,meta11323));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async11322(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__10224__auto___11547 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___11547,cs,m,dchan,dctr,done){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___11547,cs,m,dchan,dctr,done){
return (function (state_11459){
var state_val_11460 = (state_11459[(1)]);
if((state_val_11460 === (7))){
var inst_11455 = (state_11459[(2)]);
var state_11459__$1 = state_11459;
var statearr_11461_11548 = state_11459__$1;
(statearr_11461_11548[(2)] = inst_11455);

(statearr_11461_11548[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (20))){
var inst_11358 = (state_11459[(7)]);
var inst_11370 = cljs.core.first.call(null,inst_11358);
var inst_11371 = cljs.core.nth.call(null,inst_11370,(0),null);
var inst_11372 = cljs.core.nth.call(null,inst_11370,(1),null);
var state_11459__$1 = (function (){var statearr_11462 = state_11459;
(statearr_11462[(8)] = inst_11371);

return statearr_11462;
})();
if(cljs.core.truth_(inst_11372)){
var statearr_11463_11549 = state_11459__$1;
(statearr_11463_11549[(1)] = (22));

} else {
var statearr_11464_11550 = state_11459__$1;
(statearr_11464_11550[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (27))){
var inst_11400 = (state_11459[(9)]);
var inst_11402 = (state_11459[(10)]);
var inst_11407 = (state_11459[(11)]);
var inst_11327 = (state_11459[(12)]);
var inst_11407__$1 = cljs.core._nth.call(null,inst_11400,inst_11402);
var inst_11408 = cljs.core.async.put_BANG_.call(null,inst_11407__$1,inst_11327,done);
var state_11459__$1 = (function (){var statearr_11465 = state_11459;
(statearr_11465[(11)] = inst_11407__$1);

return statearr_11465;
})();
if(cljs.core.truth_(inst_11408)){
var statearr_11466_11551 = state_11459__$1;
(statearr_11466_11551[(1)] = (30));

} else {
var statearr_11467_11552 = state_11459__$1;
(statearr_11467_11552[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (1))){
var state_11459__$1 = state_11459;
var statearr_11468_11553 = state_11459__$1;
(statearr_11468_11553[(2)] = null);

(statearr_11468_11553[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (24))){
var inst_11358 = (state_11459[(7)]);
var inst_11377 = (state_11459[(2)]);
var inst_11378 = cljs.core.next.call(null,inst_11358);
var inst_11336 = inst_11378;
var inst_11337 = null;
var inst_11338 = (0);
var inst_11339 = (0);
var state_11459__$1 = (function (){var statearr_11469 = state_11459;
(statearr_11469[(13)] = inst_11377);

(statearr_11469[(14)] = inst_11337);

(statearr_11469[(15)] = inst_11338);

(statearr_11469[(16)] = inst_11336);

(statearr_11469[(17)] = inst_11339);

return statearr_11469;
})();
var statearr_11470_11554 = state_11459__$1;
(statearr_11470_11554[(2)] = null);

(statearr_11470_11554[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (39))){
var state_11459__$1 = state_11459;
var statearr_11474_11555 = state_11459__$1;
(statearr_11474_11555[(2)] = null);

(statearr_11474_11555[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (4))){
var inst_11327 = (state_11459[(12)]);
var inst_11327__$1 = (state_11459[(2)]);
var inst_11328 = (inst_11327__$1 == null);
var state_11459__$1 = (function (){var statearr_11475 = state_11459;
(statearr_11475[(12)] = inst_11327__$1);

return statearr_11475;
})();
if(cljs.core.truth_(inst_11328)){
var statearr_11476_11556 = state_11459__$1;
(statearr_11476_11556[(1)] = (5));

} else {
var statearr_11477_11557 = state_11459__$1;
(statearr_11477_11557[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (15))){
var inst_11337 = (state_11459[(14)]);
var inst_11338 = (state_11459[(15)]);
var inst_11336 = (state_11459[(16)]);
var inst_11339 = (state_11459[(17)]);
var inst_11354 = (state_11459[(2)]);
var inst_11355 = (inst_11339 + (1));
var tmp11471 = inst_11337;
var tmp11472 = inst_11338;
var tmp11473 = inst_11336;
var inst_11336__$1 = tmp11473;
var inst_11337__$1 = tmp11471;
var inst_11338__$1 = tmp11472;
var inst_11339__$1 = inst_11355;
var state_11459__$1 = (function (){var statearr_11478 = state_11459;
(statearr_11478[(14)] = inst_11337__$1);

(statearr_11478[(15)] = inst_11338__$1);

(statearr_11478[(18)] = inst_11354);

(statearr_11478[(16)] = inst_11336__$1);

(statearr_11478[(17)] = inst_11339__$1);

return statearr_11478;
})();
var statearr_11479_11558 = state_11459__$1;
(statearr_11479_11558[(2)] = null);

(statearr_11479_11558[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (21))){
var inst_11381 = (state_11459[(2)]);
var state_11459__$1 = state_11459;
var statearr_11483_11559 = state_11459__$1;
(statearr_11483_11559[(2)] = inst_11381);

(statearr_11483_11559[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (31))){
var inst_11407 = (state_11459[(11)]);
var inst_11411 = done.call(null,null);
var inst_11412 = cljs.core.async.untap_STAR_.call(null,m,inst_11407);
var state_11459__$1 = (function (){var statearr_11484 = state_11459;
(statearr_11484[(19)] = inst_11411);

return statearr_11484;
})();
var statearr_11485_11560 = state_11459__$1;
(statearr_11485_11560[(2)] = inst_11412);

(statearr_11485_11560[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (32))){
var inst_11400 = (state_11459[(9)]);
var inst_11402 = (state_11459[(10)]);
var inst_11401 = (state_11459[(20)]);
var inst_11399 = (state_11459[(21)]);
var inst_11414 = (state_11459[(2)]);
var inst_11415 = (inst_11402 + (1));
var tmp11480 = inst_11400;
var tmp11481 = inst_11401;
var tmp11482 = inst_11399;
var inst_11399__$1 = tmp11482;
var inst_11400__$1 = tmp11480;
var inst_11401__$1 = tmp11481;
var inst_11402__$1 = inst_11415;
var state_11459__$1 = (function (){var statearr_11486 = state_11459;
(statearr_11486[(9)] = inst_11400__$1);

(statearr_11486[(10)] = inst_11402__$1);

(statearr_11486[(20)] = inst_11401__$1);

(statearr_11486[(21)] = inst_11399__$1);

(statearr_11486[(22)] = inst_11414);

return statearr_11486;
})();
var statearr_11487_11561 = state_11459__$1;
(statearr_11487_11561[(2)] = null);

(statearr_11487_11561[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (40))){
var inst_11427 = (state_11459[(23)]);
var inst_11431 = done.call(null,null);
var inst_11432 = cljs.core.async.untap_STAR_.call(null,m,inst_11427);
var state_11459__$1 = (function (){var statearr_11488 = state_11459;
(statearr_11488[(24)] = inst_11431);

return statearr_11488;
})();
var statearr_11489_11562 = state_11459__$1;
(statearr_11489_11562[(2)] = inst_11432);

(statearr_11489_11562[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (33))){
var inst_11418 = (state_11459[(25)]);
var inst_11420 = cljs.core.chunked_seq_QMARK_.call(null,inst_11418);
var state_11459__$1 = state_11459;
if(inst_11420){
var statearr_11490_11563 = state_11459__$1;
(statearr_11490_11563[(1)] = (36));

} else {
var statearr_11491_11564 = state_11459__$1;
(statearr_11491_11564[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (13))){
var inst_11348 = (state_11459[(26)]);
var inst_11351 = cljs.core.async.close_BANG_.call(null,inst_11348);
var state_11459__$1 = state_11459;
var statearr_11492_11565 = state_11459__$1;
(statearr_11492_11565[(2)] = inst_11351);

(statearr_11492_11565[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (22))){
var inst_11371 = (state_11459[(8)]);
var inst_11374 = cljs.core.async.close_BANG_.call(null,inst_11371);
var state_11459__$1 = state_11459;
var statearr_11493_11566 = state_11459__$1;
(statearr_11493_11566[(2)] = inst_11374);

(statearr_11493_11566[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (36))){
var inst_11418 = (state_11459[(25)]);
var inst_11422 = cljs.core.chunk_first.call(null,inst_11418);
var inst_11423 = cljs.core.chunk_rest.call(null,inst_11418);
var inst_11424 = cljs.core.count.call(null,inst_11422);
var inst_11399 = inst_11423;
var inst_11400 = inst_11422;
var inst_11401 = inst_11424;
var inst_11402 = (0);
var state_11459__$1 = (function (){var statearr_11494 = state_11459;
(statearr_11494[(9)] = inst_11400);

(statearr_11494[(10)] = inst_11402);

(statearr_11494[(20)] = inst_11401);

(statearr_11494[(21)] = inst_11399);

return statearr_11494;
})();
var statearr_11495_11567 = state_11459__$1;
(statearr_11495_11567[(2)] = null);

(statearr_11495_11567[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (41))){
var inst_11418 = (state_11459[(25)]);
var inst_11434 = (state_11459[(2)]);
var inst_11435 = cljs.core.next.call(null,inst_11418);
var inst_11399 = inst_11435;
var inst_11400 = null;
var inst_11401 = (0);
var inst_11402 = (0);
var state_11459__$1 = (function (){var statearr_11496 = state_11459;
(statearr_11496[(9)] = inst_11400);

(statearr_11496[(10)] = inst_11402);

(statearr_11496[(20)] = inst_11401);

(statearr_11496[(21)] = inst_11399);

(statearr_11496[(27)] = inst_11434);

return statearr_11496;
})();
var statearr_11497_11568 = state_11459__$1;
(statearr_11497_11568[(2)] = null);

(statearr_11497_11568[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (43))){
var state_11459__$1 = state_11459;
var statearr_11498_11569 = state_11459__$1;
(statearr_11498_11569[(2)] = null);

(statearr_11498_11569[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (29))){
var inst_11443 = (state_11459[(2)]);
var state_11459__$1 = state_11459;
var statearr_11499_11570 = state_11459__$1;
(statearr_11499_11570[(2)] = inst_11443);

(statearr_11499_11570[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (44))){
var inst_11452 = (state_11459[(2)]);
var state_11459__$1 = (function (){var statearr_11500 = state_11459;
(statearr_11500[(28)] = inst_11452);

return statearr_11500;
})();
var statearr_11501_11571 = state_11459__$1;
(statearr_11501_11571[(2)] = null);

(statearr_11501_11571[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (6))){
var inst_11391 = (state_11459[(29)]);
var inst_11390 = cljs.core.deref.call(null,cs);
var inst_11391__$1 = cljs.core.keys.call(null,inst_11390);
var inst_11392 = cljs.core.count.call(null,inst_11391__$1);
var inst_11393 = cljs.core.reset_BANG_.call(null,dctr,inst_11392);
var inst_11398 = cljs.core.seq.call(null,inst_11391__$1);
var inst_11399 = inst_11398;
var inst_11400 = null;
var inst_11401 = (0);
var inst_11402 = (0);
var state_11459__$1 = (function (){var statearr_11502 = state_11459;
(statearr_11502[(9)] = inst_11400);

(statearr_11502[(10)] = inst_11402);

(statearr_11502[(20)] = inst_11401);

(statearr_11502[(21)] = inst_11399);

(statearr_11502[(30)] = inst_11393);

(statearr_11502[(29)] = inst_11391__$1);

return statearr_11502;
})();
var statearr_11503_11572 = state_11459__$1;
(statearr_11503_11572[(2)] = null);

(statearr_11503_11572[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (28))){
var inst_11418 = (state_11459[(25)]);
var inst_11399 = (state_11459[(21)]);
var inst_11418__$1 = cljs.core.seq.call(null,inst_11399);
var state_11459__$1 = (function (){var statearr_11504 = state_11459;
(statearr_11504[(25)] = inst_11418__$1);

return statearr_11504;
})();
if(inst_11418__$1){
var statearr_11505_11573 = state_11459__$1;
(statearr_11505_11573[(1)] = (33));

} else {
var statearr_11506_11574 = state_11459__$1;
(statearr_11506_11574[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (25))){
var inst_11402 = (state_11459[(10)]);
var inst_11401 = (state_11459[(20)]);
var inst_11404 = (inst_11402 < inst_11401);
var inst_11405 = inst_11404;
var state_11459__$1 = state_11459;
if(cljs.core.truth_(inst_11405)){
var statearr_11507_11575 = state_11459__$1;
(statearr_11507_11575[(1)] = (27));

} else {
var statearr_11508_11576 = state_11459__$1;
(statearr_11508_11576[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (34))){
var state_11459__$1 = state_11459;
var statearr_11509_11577 = state_11459__$1;
(statearr_11509_11577[(2)] = null);

(statearr_11509_11577[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (17))){
var state_11459__$1 = state_11459;
var statearr_11510_11578 = state_11459__$1;
(statearr_11510_11578[(2)] = null);

(statearr_11510_11578[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (3))){
var inst_11457 = (state_11459[(2)]);
var state_11459__$1 = state_11459;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11459__$1,inst_11457);
} else {
if((state_val_11460 === (12))){
var inst_11386 = (state_11459[(2)]);
var state_11459__$1 = state_11459;
var statearr_11511_11579 = state_11459__$1;
(statearr_11511_11579[(2)] = inst_11386);

(statearr_11511_11579[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (2))){
var state_11459__$1 = state_11459;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11459__$1,(4),ch);
} else {
if((state_val_11460 === (23))){
var state_11459__$1 = state_11459;
var statearr_11512_11580 = state_11459__$1;
(statearr_11512_11580[(2)] = null);

(statearr_11512_11580[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (35))){
var inst_11441 = (state_11459[(2)]);
var state_11459__$1 = state_11459;
var statearr_11513_11581 = state_11459__$1;
(statearr_11513_11581[(2)] = inst_11441);

(statearr_11513_11581[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (19))){
var inst_11358 = (state_11459[(7)]);
var inst_11362 = cljs.core.chunk_first.call(null,inst_11358);
var inst_11363 = cljs.core.chunk_rest.call(null,inst_11358);
var inst_11364 = cljs.core.count.call(null,inst_11362);
var inst_11336 = inst_11363;
var inst_11337 = inst_11362;
var inst_11338 = inst_11364;
var inst_11339 = (0);
var state_11459__$1 = (function (){var statearr_11514 = state_11459;
(statearr_11514[(14)] = inst_11337);

(statearr_11514[(15)] = inst_11338);

(statearr_11514[(16)] = inst_11336);

(statearr_11514[(17)] = inst_11339);

return statearr_11514;
})();
var statearr_11515_11582 = state_11459__$1;
(statearr_11515_11582[(2)] = null);

(statearr_11515_11582[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (11))){
var inst_11358 = (state_11459[(7)]);
var inst_11336 = (state_11459[(16)]);
var inst_11358__$1 = cljs.core.seq.call(null,inst_11336);
var state_11459__$1 = (function (){var statearr_11516 = state_11459;
(statearr_11516[(7)] = inst_11358__$1);

return statearr_11516;
})();
if(inst_11358__$1){
var statearr_11517_11583 = state_11459__$1;
(statearr_11517_11583[(1)] = (16));

} else {
var statearr_11518_11584 = state_11459__$1;
(statearr_11518_11584[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (9))){
var inst_11388 = (state_11459[(2)]);
var state_11459__$1 = state_11459;
var statearr_11519_11585 = state_11459__$1;
(statearr_11519_11585[(2)] = inst_11388);

(statearr_11519_11585[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (5))){
var inst_11334 = cljs.core.deref.call(null,cs);
var inst_11335 = cljs.core.seq.call(null,inst_11334);
var inst_11336 = inst_11335;
var inst_11337 = null;
var inst_11338 = (0);
var inst_11339 = (0);
var state_11459__$1 = (function (){var statearr_11520 = state_11459;
(statearr_11520[(14)] = inst_11337);

(statearr_11520[(15)] = inst_11338);

(statearr_11520[(16)] = inst_11336);

(statearr_11520[(17)] = inst_11339);

return statearr_11520;
})();
var statearr_11521_11586 = state_11459__$1;
(statearr_11521_11586[(2)] = null);

(statearr_11521_11586[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (14))){
var state_11459__$1 = state_11459;
var statearr_11522_11587 = state_11459__$1;
(statearr_11522_11587[(2)] = null);

(statearr_11522_11587[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (45))){
var inst_11449 = (state_11459[(2)]);
var state_11459__$1 = state_11459;
var statearr_11523_11588 = state_11459__$1;
(statearr_11523_11588[(2)] = inst_11449);

(statearr_11523_11588[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (26))){
var inst_11391 = (state_11459[(29)]);
var inst_11445 = (state_11459[(2)]);
var inst_11446 = cljs.core.seq.call(null,inst_11391);
var state_11459__$1 = (function (){var statearr_11524 = state_11459;
(statearr_11524[(31)] = inst_11445);

return statearr_11524;
})();
if(inst_11446){
var statearr_11525_11589 = state_11459__$1;
(statearr_11525_11589[(1)] = (42));

} else {
var statearr_11526_11590 = state_11459__$1;
(statearr_11526_11590[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (16))){
var inst_11358 = (state_11459[(7)]);
var inst_11360 = cljs.core.chunked_seq_QMARK_.call(null,inst_11358);
var state_11459__$1 = state_11459;
if(inst_11360){
var statearr_11527_11591 = state_11459__$1;
(statearr_11527_11591[(1)] = (19));

} else {
var statearr_11528_11592 = state_11459__$1;
(statearr_11528_11592[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (38))){
var inst_11438 = (state_11459[(2)]);
var state_11459__$1 = state_11459;
var statearr_11529_11593 = state_11459__$1;
(statearr_11529_11593[(2)] = inst_11438);

(statearr_11529_11593[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (30))){
var state_11459__$1 = state_11459;
var statearr_11530_11594 = state_11459__$1;
(statearr_11530_11594[(2)] = null);

(statearr_11530_11594[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (10))){
var inst_11337 = (state_11459[(14)]);
var inst_11339 = (state_11459[(17)]);
var inst_11347 = cljs.core._nth.call(null,inst_11337,inst_11339);
var inst_11348 = cljs.core.nth.call(null,inst_11347,(0),null);
var inst_11349 = cljs.core.nth.call(null,inst_11347,(1),null);
var state_11459__$1 = (function (){var statearr_11531 = state_11459;
(statearr_11531[(26)] = inst_11348);

return statearr_11531;
})();
if(cljs.core.truth_(inst_11349)){
var statearr_11532_11595 = state_11459__$1;
(statearr_11532_11595[(1)] = (13));

} else {
var statearr_11533_11596 = state_11459__$1;
(statearr_11533_11596[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (18))){
var inst_11384 = (state_11459[(2)]);
var state_11459__$1 = state_11459;
var statearr_11534_11597 = state_11459__$1;
(statearr_11534_11597[(2)] = inst_11384);

(statearr_11534_11597[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (42))){
var state_11459__$1 = state_11459;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11459__$1,(45),dchan);
} else {
if((state_val_11460 === (37))){
var inst_11418 = (state_11459[(25)]);
var inst_11427 = (state_11459[(23)]);
var inst_11327 = (state_11459[(12)]);
var inst_11427__$1 = cljs.core.first.call(null,inst_11418);
var inst_11428 = cljs.core.async.put_BANG_.call(null,inst_11427__$1,inst_11327,done);
var state_11459__$1 = (function (){var statearr_11535 = state_11459;
(statearr_11535[(23)] = inst_11427__$1);

return statearr_11535;
})();
if(cljs.core.truth_(inst_11428)){
var statearr_11536_11598 = state_11459__$1;
(statearr_11536_11598[(1)] = (39));

} else {
var statearr_11537_11599 = state_11459__$1;
(statearr_11537_11599[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11460 === (8))){
var inst_11338 = (state_11459[(15)]);
var inst_11339 = (state_11459[(17)]);
var inst_11341 = (inst_11339 < inst_11338);
var inst_11342 = inst_11341;
var state_11459__$1 = state_11459;
if(cljs.core.truth_(inst_11342)){
var statearr_11538_11600 = state_11459__$1;
(statearr_11538_11600[(1)] = (10));

} else {
var statearr_11539_11601 = state_11459__$1;
(statearr_11539_11601[(1)] = (11));

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
});})(c__10224__auto___11547,cs,m,dchan,dctr,done))
;
return ((function (switch__10112__auto__,c__10224__auto___11547,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__10113__auto__ = null;
var cljs$core$async$mult_$_state_machine__10113__auto____0 = (function (){
var statearr_11543 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11543[(0)] = cljs$core$async$mult_$_state_machine__10113__auto__);

(statearr_11543[(1)] = (1));

return statearr_11543;
});
var cljs$core$async$mult_$_state_machine__10113__auto____1 = (function (state_11459){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_11459);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e11544){if((e11544 instanceof Object)){
var ex__10116__auto__ = e11544;
var statearr_11545_11602 = state_11459;
(statearr_11545_11602[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11459);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11544;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11603 = state_11459;
state_11459 = G__11603;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__10113__auto__ = function(state_11459){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__10113__auto____1.call(this,state_11459);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__10113__auto____0;
cljs$core$async$mult_$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__10113__auto____1;
return cljs$core$async$mult_$_state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___11547,cs,m,dchan,dctr,done))
})();
var state__10226__auto__ = (function (){var statearr_11546 = f__10225__auto__.call(null);
(statearr_11546[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___11547);

return statearr_11546;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___11547,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var args11604 = [];
var len__7322__auto___11607 = arguments.length;
var i__7323__auto___11608 = (0);
while(true){
if((i__7323__auto___11608 < len__7322__auto___11607)){
args11604.push((arguments[i__7323__auto___11608]));

var G__11609 = (i__7323__auto___11608 + (1));
i__7323__auto___11608 = G__11609;
continue;
} else {
}
break;
}

var G__11606 = args11604.length;
switch (G__11606) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11604.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__6910__auto__ = (((m == null))?null:m);
var m__6911__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,m,ch);
} else {
var m__6911__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__6910__auto__ = (((m == null))?null:m);
var m__6911__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,m,ch);
} else {
var m__6911__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__6910__auto__ = (((m == null))?null:m);
var m__6911__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,m);
} else {
var m__6911__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__6910__auto__ = (((m == null))?null:m);
var m__6911__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,m,state_map);
} else {
var m__6911__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__6910__auto__ = (((m == null))?null:m);
var m__6911__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,m,mode);
} else {
var m__6911__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__7329__auto__ = [];
var len__7322__auto___11621 = arguments.length;
var i__7323__auto___11622 = (0);
while(true){
if((i__7323__auto___11622 < len__7322__auto___11621)){
args__7329__auto__.push((arguments[i__7323__auto___11622]));

var G__11623 = (i__7323__auto___11622 + (1));
i__7323__auto___11622 = G__11623;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((3) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__7330__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__11615){
var map__11616 = p__11615;
var map__11616__$1 = ((((!((map__11616 == null)))?((((map__11616.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11616.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11616):map__11616);
var opts = map__11616__$1;
var statearr_11618_11624 = state;
(statearr_11618_11624[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4657__auto__ = cljs.core.async.do_alts.call(null,((function (map__11616,map__11616__$1,opts){
return (function (val){
var statearr_11619_11625 = state;
(statearr_11619_11625[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__11616,map__11616__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4657__auto__)){
var cb = temp__4657__auto__;
var statearr_11620_11626 = state;
(statearr_11620_11626[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq11611){
var G__11612 = cljs.core.first.call(null,seq11611);
var seq11611__$1 = cljs.core.next.call(null,seq11611);
var G__11613 = cljs.core.first.call(null,seq11611__$1);
var seq11611__$2 = cljs.core.next.call(null,seq11611__$1);
var G__11614 = cljs.core.first.call(null,seq11611__$2);
var seq11611__$3 = cljs.core.next.call(null,seq11611__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__11612,G__11613,G__11614,seq11611__$3);
});

/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t_cljs$core$async11792 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async11792 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta11793){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta11793 = meta11793;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async11792.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_11794,meta11793__$1){
var self__ = this;
var _11794__$1 = this;
return (new cljs.core.async.t_cljs$core$async11792(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta11793__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11792.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_11794){
var self__ = this;
var _11794__$1 = this;
return self__.meta11793;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11792.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async11792.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11792.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async11792.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11792.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11792.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11792.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11792.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str("(solo-modes mode)")].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11792.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta11793","meta11793",499222474,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async11792.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async11792.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async11792";

cljs.core.async.t_cljs$core$async11792.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__6853__auto__,writer__6854__auto__,opt__6855__auto__){
return cljs.core._write.call(null,writer__6854__auto__,"cljs.core.async/t_cljs$core$async11792");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async11792 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async11792(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta11793){
return (new cljs.core.async.t_cljs$core$async11792(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta11793));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async11792(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__10224__auto___11957 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___11957,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___11957,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_11894){
var state_val_11895 = (state_11894[(1)]);
if((state_val_11895 === (7))){
var inst_11810 = (state_11894[(2)]);
var state_11894__$1 = state_11894;
var statearr_11896_11958 = state_11894__$1;
(statearr_11896_11958[(2)] = inst_11810);

(statearr_11896_11958[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (20))){
var inst_11822 = (state_11894[(7)]);
var state_11894__$1 = state_11894;
var statearr_11897_11959 = state_11894__$1;
(statearr_11897_11959[(2)] = inst_11822);

(statearr_11897_11959[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (27))){
var state_11894__$1 = state_11894;
var statearr_11898_11960 = state_11894__$1;
(statearr_11898_11960[(2)] = null);

(statearr_11898_11960[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (1))){
var inst_11798 = (state_11894[(8)]);
var inst_11798__$1 = calc_state.call(null);
var inst_11800 = (inst_11798__$1 == null);
var inst_11801 = cljs.core.not.call(null,inst_11800);
var state_11894__$1 = (function (){var statearr_11899 = state_11894;
(statearr_11899[(8)] = inst_11798__$1);

return statearr_11899;
})();
if(inst_11801){
var statearr_11900_11961 = state_11894__$1;
(statearr_11900_11961[(1)] = (2));

} else {
var statearr_11901_11962 = state_11894__$1;
(statearr_11901_11962[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (24))){
var inst_11845 = (state_11894[(9)]);
var inst_11868 = (state_11894[(10)]);
var inst_11854 = (state_11894[(11)]);
var inst_11868__$1 = inst_11845.call(null,inst_11854);
var state_11894__$1 = (function (){var statearr_11902 = state_11894;
(statearr_11902[(10)] = inst_11868__$1);

return statearr_11902;
})();
if(cljs.core.truth_(inst_11868__$1)){
var statearr_11903_11963 = state_11894__$1;
(statearr_11903_11963[(1)] = (29));

} else {
var statearr_11904_11964 = state_11894__$1;
(statearr_11904_11964[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (4))){
var inst_11813 = (state_11894[(2)]);
var state_11894__$1 = state_11894;
if(cljs.core.truth_(inst_11813)){
var statearr_11905_11965 = state_11894__$1;
(statearr_11905_11965[(1)] = (8));

} else {
var statearr_11906_11966 = state_11894__$1;
(statearr_11906_11966[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (15))){
var inst_11839 = (state_11894[(2)]);
var state_11894__$1 = state_11894;
if(cljs.core.truth_(inst_11839)){
var statearr_11907_11967 = state_11894__$1;
(statearr_11907_11967[(1)] = (19));

} else {
var statearr_11908_11968 = state_11894__$1;
(statearr_11908_11968[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (21))){
var inst_11844 = (state_11894[(12)]);
var inst_11844__$1 = (state_11894[(2)]);
var inst_11845 = cljs.core.get.call(null,inst_11844__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_11846 = cljs.core.get.call(null,inst_11844__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_11847 = cljs.core.get.call(null,inst_11844__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_11894__$1 = (function (){var statearr_11909 = state_11894;
(statearr_11909[(9)] = inst_11845);

(statearr_11909[(12)] = inst_11844__$1);

(statearr_11909[(13)] = inst_11846);

return statearr_11909;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_11894__$1,(22),inst_11847);
} else {
if((state_val_11895 === (31))){
var inst_11876 = (state_11894[(2)]);
var state_11894__$1 = state_11894;
if(cljs.core.truth_(inst_11876)){
var statearr_11910_11969 = state_11894__$1;
(statearr_11910_11969[(1)] = (32));

} else {
var statearr_11911_11970 = state_11894__$1;
(statearr_11911_11970[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (32))){
var inst_11853 = (state_11894[(14)]);
var state_11894__$1 = state_11894;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11894__$1,(35),out,inst_11853);
} else {
if((state_val_11895 === (33))){
var inst_11844 = (state_11894[(12)]);
var inst_11822 = inst_11844;
var state_11894__$1 = (function (){var statearr_11912 = state_11894;
(statearr_11912[(7)] = inst_11822);

return statearr_11912;
})();
var statearr_11913_11971 = state_11894__$1;
(statearr_11913_11971[(2)] = null);

(statearr_11913_11971[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (13))){
var inst_11822 = (state_11894[(7)]);
var inst_11829 = inst_11822.cljs$lang$protocol_mask$partition0$;
var inst_11830 = (inst_11829 & (64));
var inst_11831 = inst_11822.cljs$core$ISeq$;
var inst_11832 = (inst_11830) || (inst_11831);
var state_11894__$1 = state_11894;
if(cljs.core.truth_(inst_11832)){
var statearr_11914_11972 = state_11894__$1;
(statearr_11914_11972[(1)] = (16));

} else {
var statearr_11915_11973 = state_11894__$1;
(statearr_11915_11973[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (22))){
var inst_11853 = (state_11894[(14)]);
var inst_11854 = (state_11894[(11)]);
var inst_11852 = (state_11894[(2)]);
var inst_11853__$1 = cljs.core.nth.call(null,inst_11852,(0),null);
var inst_11854__$1 = cljs.core.nth.call(null,inst_11852,(1),null);
var inst_11855 = (inst_11853__$1 == null);
var inst_11856 = cljs.core._EQ_.call(null,inst_11854__$1,change);
var inst_11857 = (inst_11855) || (inst_11856);
var state_11894__$1 = (function (){var statearr_11916 = state_11894;
(statearr_11916[(14)] = inst_11853__$1);

(statearr_11916[(11)] = inst_11854__$1);

return statearr_11916;
})();
if(cljs.core.truth_(inst_11857)){
var statearr_11917_11974 = state_11894__$1;
(statearr_11917_11974[(1)] = (23));

} else {
var statearr_11918_11975 = state_11894__$1;
(statearr_11918_11975[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (36))){
var inst_11844 = (state_11894[(12)]);
var inst_11822 = inst_11844;
var state_11894__$1 = (function (){var statearr_11919 = state_11894;
(statearr_11919[(7)] = inst_11822);

return statearr_11919;
})();
var statearr_11920_11976 = state_11894__$1;
(statearr_11920_11976[(2)] = null);

(statearr_11920_11976[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (29))){
var inst_11868 = (state_11894[(10)]);
var state_11894__$1 = state_11894;
var statearr_11921_11977 = state_11894__$1;
(statearr_11921_11977[(2)] = inst_11868);

(statearr_11921_11977[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (6))){
var state_11894__$1 = state_11894;
var statearr_11922_11978 = state_11894__$1;
(statearr_11922_11978[(2)] = false);

(statearr_11922_11978[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (28))){
var inst_11864 = (state_11894[(2)]);
var inst_11865 = calc_state.call(null);
var inst_11822 = inst_11865;
var state_11894__$1 = (function (){var statearr_11923 = state_11894;
(statearr_11923[(15)] = inst_11864);

(statearr_11923[(7)] = inst_11822);

return statearr_11923;
})();
var statearr_11924_11979 = state_11894__$1;
(statearr_11924_11979[(2)] = null);

(statearr_11924_11979[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (25))){
var inst_11890 = (state_11894[(2)]);
var state_11894__$1 = state_11894;
var statearr_11925_11980 = state_11894__$1;
(statearr_11925_11980[(2)] = inst_11890);

(statearr_11925_11980[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (34))){
var inst_11888 = (state_11894[(2)]);
var state_11894__$1 = state_11894;
var statearr_11926_11981 = state_11894__$1;
(statearr_11926_11981[(2)] = inst_11888);

(statearr_11926_11981[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (17))){
var state_11894__$1 = state_11894;
var statearr_11927_11982 = state_11894__$1;
(statearr_11927_11982[(2)] = false);

(statearr_11927_11982[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (3))){
var state_11894__$1 = state_11894;
var statearr_11928_11983 = state_11894__$1;
(statearr_11928_11983[(2)] = false);

(statearr_11928_11983[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (12))){
var inst_11892 = (state_11894[(2)]);
var state_11894__$1 = state_11894;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11894__$1,inst_11892);
} else {
if((state_val_11895 === (2))){
var inst_11798 = (state_11894[(8)]);
var inst_11803 = inst_11798.cljs$lang$protocol_mask$partition0$;
var inst_11804 = (inst_11803 & (64));
var inst_11805 = inst_11798.cljs$core$ISeq$;
var inst_11806 = (inst_11804) || (inst_11805);
var state_11894__$1 = state_11894;
if(cljs.core.truth_(inst_11806)){
var statearr_11929_11984 = state_11894__$1;
(statearr_11929_11984[(1)] = (5));

} else {
var statearr_11930_11985 = state_11894__$1;
(statearr_11930_11985[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (23))){
var inst_11853 = (state_11894[(14)]);
var inst_11859 = (inst_11853 == null);
var state_11894__$1 = state_11894;
if(cljs.core.truth_(inst_11859)){
var statearr_11931_11986 = state_11894__$1;
(statearr_11931_11986[(1)] = (26));

} else {
var statearr_11932_11987 = state_11894__$1;
(statearr_11932_11987[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (35))){
var inst_11879 = (state_11894[(2)]);
var state_11894__$1 = state_11894;
if(cljs.core.truth_(inst_11879)){
var statearr_11933_11988 = state_11894__$1;
(statearr_11933_11988[(1)] = (36));

} else {
var statearr_11934_11989 = state_11894__$1;
(statearr_11934_11989[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (19))){
var inst_11822 = (state_11894[(7)]);
var inst_11841 = cljs.core.apply.call(null,cljs.core.hash_map,inst_11822);
var state_11894__$1 = state_11894;
var statearr_11935_11990 = state_11894__$1;
(statearr_11935_11990[(2)] = inst_11841);

(statearr_11935_11990[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (11))){
var inst_11822 = (state_11894[(7)]);
var inst_11826 = (inst_11822 == null);
var inst_11827 = cljs.core.not.call(null,inst_11826);
var state_11894__$1 = state_11894;
if(inst_11827){
var statearr_11936_11991 = state_11894__$1;
(statearr_11936_11991[(1)] = (13));

} else {
var statearr_11937_11992 = state_11894__$1;
(statearr_11937_11992[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (9))){
var inst_11798 = (state_11894[(8)]);
var state_11894__$1 = state_11894;
var statearr_11938_11993 = state_11894__$1;
(statearr_11938_11993[(2)] = inst_11798);

(statearr_11938_11993[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (5))){
var state_11894__$1 = state_11894;
var statearr_11939_11994 = state_11894__$1;
(statearr_11939_11994[(2)] = true);

(statearr_11939_11994[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (14))){
var state_11894__$1 = state_11894;
var statearr_11940_11995 = state_11894__$1;
(statearr_11940_11995[(2)] = false);

(statearr_11940_11995[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (26))){
var inst_11854 = (state_11894[(11)]);
var inst_11861 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_11854);
var state_11894__$1 = state_11894;
var statearr_11941_11996 = state_11894__$1;
(statearr_11941_11996[(2)] = inst_11861);

(statearr_11941_11996[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (16))){
var state_11894__$1 = state_11894;
var statearr_11942_11997 = state_11894__$1;
(statearr_11942_11997[(2)] = true);

(statearr_11942_11997[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (38))){
var inst_11884 = (state_11894[(2)]);
var state_11894__$1 = state_11894;
var statearr_11943_11998 = state_11894__$1;
(statearr_11943_11998[(2)] = inst_11884);

(statearr_11943_11998[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (30))){
var inst_11845 = (state_11894[(9)]);
var inst_11846 = (state_11894[(13)]);
var inst_11854 = (state_11894[(11)]);
var inst_11871 = cljs.core.empty_QMARK_.call(null,inst_11845);
var inst_11872 = inst_11846.call(null,inst_11854);
var inst_11873 = cljs.core.not.call(null,inst_11872);
var inst_11874 = (inst_11871) && (inst_11873);
var state_11894__$1 = state_11894;
var statearr_11944_11999 = state_11894__$1;
(statearr_11944_11999[(2)] = inst_11874);

(statearr_11944_11999[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (10))){
var inst_11798 = (state_11894[(8)]);
var inst_11818 = (state_11894[(2)]);
var inst_11819 = cljs.core.get.call(null,inst_11818,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_11820 = cljs.core.get.call(null,inst_11818,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_11821 = cljs.core.get.call(null,inst_11818,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_11822 = inst_11798;
var state_11894__$1 = (function (){var statearr_11945 = state_11894;
(statearr_11945[(7)] = inst_11822);

(statearr_11945[(16)] = inst_11820);

(statearr_11945[(17)] = inst_11819);

(statearr_11945[(18)] = inst_11821);

return statearr_11945;
})();
var statearr_11946_12000 = state_11894__$1;
(statearr_11946_12000[(2)] = null);

(statearr_11946_12000[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (18))){
var inst_11836 = (state_11894[(2)]);
var state_11894__$1 = state_11894;
var statearr_11947_12001 = state_11894__$1;
(statearr_11947_12001[(2)] = inst_11836);

(statearr_11947_12001[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (37))){
var state_11894__$1 = state_11894;
var statearr_11948_12002 = state_11894__$1;
(statearr_11948_12002[(2)] = null);

(statearr_11948_12002[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11895 === (8))){
var inst_11798 = (state_11894[(8)]);
var inst_11815 = cljs.core.apply.call(null,cljs.core.hash_map,inst_11798);
var state_11894__$1 = state_11894;
var statearr_11949_12003 = state_11894__$1;
(statearr_11949_12003[(2)] = inst_11815);

(statearr_11949_12003[(1)] = (10));


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
});})(c__10224__auto___11957,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__10112__auto__,c__10224__auto___11957,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__10113__auto__ = null;
var cljs$core$async$mix_$_state_machine__10113__auto____0 = (function (){
var statearr_11953 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11953[(0)] = cljs$core$async$mix_$_state_machine__10113__auto__);

(statearr_11953[(1)] = (1));

return statearr_11953;
});
var cljs$core$async$mix_$_state_machine__10113__auto____1 = (function (state_11894){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_11894);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e11954){if((e11954 instanceof Object)){
var ex__10116__auto__ = e11954;
var statearr_11955_12004 = state_11894;
(statearr_11955_12004[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11894);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11954;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12005 = state_11894;
state_11894 = G__12005;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__10113__auto__ = function(state_11894){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__10113__auto____1.call(this,state_11894);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__10113__auto____0;
cljs$core$async$mix_$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__10113__auto____1;
return cljs$core$async$mix_$_state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___11957,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__10226__auto__ = (function (){var statearr_11956 = f__10225__auto__.call(null);
(statearr_11956[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___11957);

return statearr_11956;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___11957,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__6910__auto__ = (((p == null))?null:p);
var m__6911__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__6911__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__6910__auto__ = (((p == null))?null:p);
var m__6911__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,p,v,ch);
} else {
var m__6911__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var args12006 = [];
var len__7322__auto___12009 = arguments.length;
var i__7323__auto___12010 = (0);
while(true){
if((i__7323__auto___12010 < len__7322__auto___12009)){
args12006.push((arguments[i__7323__auto___12010]));

var G__12011 = (i__7323__auto___12010 + (1));
i__7323__auto___12010 = G__12011;
continue;
} else {
}
break;
}

var G__12008 = args12006.length;
switch (G__12008) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12006.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__6910__auto__ = (((p == null))?null:p);
var m__6911__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,p);
} else {
var m__6911__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__6910__auto__ = (((p == null))?null:p);
var m__6911__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__6910__auto__)]);
if(!((m__6911__auto__ == null))){
return m__6911__auto__.call(null,p,v);
} else {
var m__6911__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__6911__auto____$1 == null))){
return m__6911__auto____$1.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var args12014 = [];
var len__7322__auto___12139 = arguments.length;
var i__7323__auto___12140 = (0);
while(true){
if((i__7323__auto___12140 < len__7322__auto___12139)){
args12014.push((arguments[i__7323__auto___12140]));

var G__12141 = (i__7323__auto___12140 + (1));
i__7323__auto___12140 = G__12141;
continue;
} else {
}
break;
}

var G__12016 = args12014.length;
switch (G__12016) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12014.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__6247__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__6247__auto__,mults){
return (function (p1__12013_SHARP_){
if(cljs.core.truth_(p1__12013_SHARP_.call(null,topic))){
return p1__12013_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__12013_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__6247__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async12017 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12017 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta12018){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta12018 = meta12018;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async12017.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_12019,meta12018__$1){
var self__ = this;
var _12019__$1 = this;
return (new cljs.core.async.t_cljs$core$async12017(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta12018__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async12017.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_12019){
var self__ = this;
var _12019__$1 = this;
return self__.meta12018;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async12017.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async12017.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async12017.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async12017.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async12017.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4657__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4657__auto__)){
var m = temp__4657__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async12017.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async12017.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async12017.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta12018","meta12018",1038433295,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async12017.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async12017.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12017";

cljs.core.async.t_cljs$core$async12017.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__6853__auto__,writer__6854__auto__,opt__6855__auto__){
return cljs.core._write.call(null,writer__6854__auto__,"cljs.core.async/t_cljs$core$async12017");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async12017 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async12017(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta12018){
return (new cljs.core.async.t_cljs$core$async12017(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta12018));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async12017(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__10224__auto___12143 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___12143,mults,ensure_mult,p){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___12143,mults,ensure_mult,p){
return (function (state_12091){
var state_val_12092 = (state_12091[(1)]);
if((state_val_12092 === (7))){
var inst_12087 = (state_12091[(2)]);
var state_12091__$1 = state_12091;
var statearr_12093_12144 = state_12091__$1;
(statearr_12093_12144[(2)] = inst_12087);

(statearr_12093_12144[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (20))){
var state_12091__$1 = state_12091;
var statearr_12094_12145 = state_12091__$1;
(statearr_12094_12145[(2)] = null);

(statearr_12094_12145[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (1))){
var state_12091__$1 = state_12091;
var statearr_12095_12146 = state_12091__$1;
(statearr_12095_12146[(2)] = null);

(statearr_12095_12146[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (24))){
var inst_12070 = (state_12091[(7)]);
var inst_12079 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_12070);
var state_12091__$1 = state_12091;
var statearr_12096_12147 = state_12091__$1;
(statearr_12096_12147[(2)] = inst_12079);

(statearr_12096_12147[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (4))){
var inst_12022 = (state_12091[(8)]);
var inst_12022__$1 = (state_12091[(2)]);
var inst_12023 = (inst_12022__$1 == null);
var state_12091__$1 = (function (){var statearr_12097 = state_12091;
(statearr_12097[(8)] = inst_12022__$1);

return statearr_12097;
})();
if(cljs.core.truth_(inst_12023)){
var statearr_12098_12148 = state_12091__$1;
(statearr_12098_12148[(1)] = (5));

} else {
var statearr_12099_12149 = state_12091__$1;
(statearr_12099_12149[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (15))){
var inst_12064 = (state_12091[(2)]);
var state_12091__$1 = state_12091;
var statearr_12100_12150 = state_12091__$1;
(statearr_12100_12150[(2)] = inst_12064);

(statearr_12100_12150[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (21))){
var inst_12084 = (state_12091[(2)]);
var state_12091__$1 = (function (){var statearr_12101 = state_12091;
(statearr_12101[(9)] = inst_12084);

return statearr_12101;
})();
var statearr_12102_12151 = state_12091__$1;
(statearr_12102_12151[(2)] = null);

(statearr_12102_12151[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (13))){
var inst_12046 = (state_12091[(10)]);
var inst_12048 = cljs.core.chunked_seq_QMARK_.call(null,inst_12046);
var state_12091__$1 = state_12091;
if(inst_12048){
var statearr_12103_12152 = state_12091__$1;
(statearr_12103_12152[(1)] = (16));

} else {
var statearr_12104_12153 = state_12091__$1;
(statearr_12104_12153[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (22))){
var inst_12076 = (state_12091[(2)]);
var state_12091__$1 = state_12091;
if(cljs.core.truth_(inst_12076)){
var statearr_12105_12154 = state_12091__$1;
(statearr_12105_12154[(1)] = (23));

} else {
var statearr_12106_12155 = state_12091__$1;
(statearr_12106_12155[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (6))){
var inst_12022 = (state_12091[(8)]);
var inst_12070 = (state_12091[(7)]);
var inst_12072 = (state_12091[(11)]);
var inst_12070__$1 = topic_fn.call(null,inst_12022);
var inst_12071 = cljs.core.deref.call(null,mults);
var inst_12072__$1 = cljs.core.get.call(null,inst_12071,inst_12070__$1);
var state_12091__$1 = (function (){var statearr_12107 = state_12091;
(statearr_12107[(7)] = inst_12070__$1);

(statearr_12107[(11)] = inst_12072__$1);

return statearr_12107;
})();
if(cljs.core.truth_(inst_12072__$1)){
var statearr_12108_12156 = state_12091__$1;
(statearr_12108_12156[(1)] = (19));

} else {
var statearr_12109_12157 = state_12091__$1;
(statearr_12109_12157[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (25))){
var inst_12081 = (state_12091[(2)]);
var state_12091__$1 = state_12091;
var statearr_12110_12158 = state_12091__$1;
(statearr_12110_12158[(2)] = inst_12081);

(statearr_12110_12158[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (17))){
var inst_12046 = (state_12091[(10)]);
var inst_12055 = cljs.core.first.call(null,inst_12046);
var inst_12056 = cljs.core.async.muxch_STAR_.call(null,inst_12055);
var inst_12057 = cljs.core.async.close_BANG_.call(null,inst_12056);
var inst_12058 = cljs.core.next.call(null,inst_12046);
var inst_12032 = inst_12058;
var inst_12033 = null;
var inst_12034 = (0);
var inst_12035 = (0);
var state_12091__$1 = (function (){var statearr_12111 = state_12091;
(statearr_12111[(12)] = inst_12033);

(statearr_12111[(13)] = inst_12035);

(statearr_12111[(14)] = inst_12057);

(statearr_12111[(15)] = inst_12032);

(statearr_12111[(16)] = inst_12034);

return statearr_12111;
})();
var statearr_12112_12159 = state_12091__$1;
(statearr_12112_12159[(2)] = null);

(statearr_12112_12159[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (3))){
var inst_12089 = (state_12091[(2)]);
var state_12091__$1 = state_12091;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12091__$1,inst_12089);
} else {
if((state_val_12092 === (12))){
var inst_12066 = (state_12091[(2)]);
var state_12091__$1 = state_12091;
var statearr_12113_12160 = state_12091__$1;
(statearr_12113_12160[(2)] = inst_12066);

(statearr_12113_12160[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (2))){
var state_12091__$1 = state_12091;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12091__$1,(4),ch);
} else {
if((state_val_12092 === (23))){
var state_12091__$1 = state_12091;
var statearr_12114_12161 = state_12091__$1;
(statearr_12114_12161[(2)] = null);

(statearr_12114_12161[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (19))){
var inst_12022 = (state_12091[(8)]);
var inst_12072 = (state_12091[(11)]);
var inst_12074 = cljs.core.async.muxch_STAR_.call(null,inst_12072);
var state_12091__$1 = state_12091;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12091__$1,(22),inst_12074,inst_12022);
} else {
if((state_val_12092 === (11))){
var inst_12032 = (state_12091[(15)]);
var inst_12046 = (state_12091[(10)]);
var inst_12046__$1 = cljs.core.seq.call(null,inst_12032);
var state_12091__$1 = (function (){var statearr_12115 = state_12091;
(statearr_12115[(10)] = inst_12046__$1);

return statearr_12115;
})();
if(inst_12046__$1){
var statearr_12116_12162 = state_12091__$1;
(statearr_12116_12162[(1)] = (13));

} else {
var statearr_12117_12163 = state_12091__$1;
(statearr_12117_12163[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (9))){
var inst_12068 = (state_12091[(2)]);
var state_12091__$1 = state_12091;
var statearr_12118_12164 = state_12091__$1;
(statearr_12118_12164[(2)] = inst_12068);

(statearr_12118_12164[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (5))){
var inst_12029 = cljs.core.deref.call(null,mults);
var inst_12030 = cljs.core.vals.call(null,inst_12029);
var inst_12031 = cljs.core.seq.call(null,inst_12030);
var inst_12032 = inst_12031;
var inst_12033 = null;
var inst_12034 = (0);
var inst_12035 = (0);
var state_12091__$1 = (function (){var statearr_12119 = state_12091;
(statearr_12119[(12)] = inst_12033);

(statearr_12119[(13)] = inst_12035);

(statearr_12119[(15)] = inst_12032);

(statearr_12119[(16)] = inst_12034);

return statearr_12119;
})();
var statearr_12120_12165 = state_12091__$1;
(statearr_12120_12165[(2)] = null);

(statearr_12120_12165[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (14))){
var state_12091__$1 = state_12091;
var statearr_12124_12166 = state_12091__$1;
(statearr_12124_12166[(2)] = null);

(statearr_12124_12166[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (16))){
var inst_12046 = (state_12091[(10)]);
var inst_12050 = cljs.core.chunk_first.call(null,inst_12046);
var inst_12051 = cljs.core.chunk_rest.call(null,inst_12046);
var inst_12052 = cljs.core.count.call(null,inst_12050);
var inst_12032 = inst_12051;
var inst_12033 = inst_12050;
var inst_12034 = inst_12052;
var inst_12035 = (0);
var state_12091__$1 = (function (){var statearr_12125 = state_12091;
(statearr_12125[(12)] = inst_12033);

(statearr_12125[(13)] = inst_12035);

(statearr_12125[(15)] = inst_12032);

(statearr_12125[(16)] = inst_12034);

return statearr_12125;
})();
var statearr_12126_12167 = state_12091__$1;
(statearr_12126_12167[(2)] = null);

(statearr_12126_12167[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (10))){
var inst_12033 = (state_12091[(12)]);
var inst_12035 = (state_12091[(13)]);
var inst_12032 = (state_12091[(15)]);
var inst_12034 = (state_12091[(16)]);
var inst_12040 = cljs.core._nth.call(null,inst_12033,inst_12035);
var inst_12041 = cljs.core.async.muxch_STAR_.call(null,inst_12040);
var inst_12042 = cljs.core.async.close_BANG_.call(null,inst_12041);
var inst_12043 = (inst_12035 + (1));
var tmp12121 = inst_12033;
var tmp12122 = inst_12032;
var tmp12123 = inst_12034;
var inst_12032__$1 = tmp12122;
var inst_12033__$1 = tmp12121;
var inst_12034__$1 = tmp12123;
var inst_12035__$1 = inst_12043;
var state_12091__$1 = (function (){var statearr_12127 = state_12091;
(statearr_12127[(12)] = inst_12033__$1);

(statearr_12127[(13)] = inst_12035__$1);

(statearr_12127[(17)] = inst_12042);

(statearr_12127[(15)] = inst_12032__$1);

(statearr_12127[(16)] = inst_12034__$1);

return statearr_12127;
})();
var statearr_12128_12168 = state_12091__$1;
(statearr_12128_12168[(2)] = null);

(statearr_12128_12168[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (18))){
var inst_12061 = (state_12091[(2)]);
var state_12091__$1 = state_12091;
var statearr_12129_12169 = state_12091__$1;
(statearr_12129_12169[(2)] = inst_12061);

(statearr_12129_12169[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12092 === (8))){
var inst_12035 = (state_12091[(13)]);
var inst_12034 = (state_12091[(16)]);
var inst_12037 = (inst_12035 < inst_12034);
var inst_12038 = inst_12037;
var state_12091__$1 = state_12091;
if(cljs.core.truth_(inst_12038)){
var statearr_12130_12170 = state_12091__$1;
(statearr_12130_12170[(1)] = (10));

} else {
var statearr_12131_12171 = state_12091__$1;
(statearr_12131_12171[(1)] = (11));

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
});})(c__10224__auto___12143,mults,ensure_mult,p))
;
return ((function (switch__10112__auto__,c__10224__auto___12143,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__10113__auto__ = null;
var cljs$core$async$state_machine__10113__auto____0 = (function (){
var statearr_12135 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12135[(0)] = cljs$core$async$state_machine__10113__auto__);

(statearr_12135[(1)] = (1));

return statearr_12135;
});
var cljs$core$async$state_machine__10113__auto____1 = (function (state_12091){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_12091);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e12136){if((e12136 instanceof Object)){
var ex__10116__auto__ = e12136;
var statearr_12137_12172 = state_12091;
(statearr_12137_12172[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12091);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12136;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12173 = state_12091;
state_12091 = G__12173;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$state_machine__10113__auto__ = function(state_12091){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10113__auto____1.call(this,state_12091);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10113__auto____0;
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10113__auto____1;
return cljs$core$async$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___12143,mults,ensure_mult,p))
})();
var state__10226__auto__ = (function (){var statearr_12138 = f__10225__auto__.call(null);
(statearr_12138[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___12143);

return statearr_12138;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___12143,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var args12174 = [];
var len__7322__auto___12177 = arguments.length;
var i__7323__auto___12178 = (0);
while(true){
if((i__7323__auto___12178 < len__7322__auto___12177)){
args12174.push((arguments[i__7323__auto___12178]));

var G__12179 = (i__7323__auto___12178 + (1));
i__7323__auto___12178 = G__12179;
continue;
} else {
}
break;
}

var G__12176 = args12174.length;
switch (G__12176) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12174.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var args12181 = [];
var len__7322__auto___12184 = arguments.length;
var i__7323__auto___12185 = (0);
while(true){
if((i__7323__auto___12185 < len__7322__auto___12184)){
args12181.push((arguments[i__7323__auto___12185]));

var G__12186 = (i__7323__auto___12185 + (1));
i__7323__auto___12185 = G__12186;
continue;
} else {
}
break;
}

var G__12183 = args12181.length;
switch (G__12183) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12181.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var args12188 = [];
var len__7322__auto___12259 = arguments.length;
var i__7323__auto___12260 = (0);
while(true){
if((i__7323__auto___12260 < len__7322__auto___12259)){
args12188.push((arguments[i__7323__auto___12260]));

var G__12261 = (i__7323__auto___12260 + (1));
i__7323__auto___12260 = G__12261;
continue;
} else {
}
break;
}

var G__12190 = args12188.length;
switch (G__12190) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12188.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__10224__auto___12263 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___12263,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___12263,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_12229){
var state_val_12230 = (state_12229[(1)]);
if((state_val_12230 === (7))){
var state_12229__$1 = state_12229;
var statearr_12231_12264 = state_12229__$1;
(statearr_12231_12264[(2)] = null);

(statearr_12231_12264[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12230 === (1))){
var state_12229__$1 = state_12229;
var statearr_12232_12265 = state_12229__$1;
(statearr_12232_12265[(2)] = null);

(statearr_12232_12265[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12230 === (4))){
var inst_12193 = (state_12229[(7)]);
var inst_12195 = (inst_12193 < cnt);
var state_12229__$1 = state_12229;
if(cljs.core.truth_(inst_12195)){
var statearr_12233_12266 = state_12229__$1;
(statearr_12233_12266[(1)] = (6));

} else {
var statearr_12234_12267 = state_12229__$1;
(statearr_12234_12267[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12230 === (15))){
var inst_12225 = (state_12229[(2)]);
var state_12229__$1 = state_12229;
var statearr_12235_12268 = state_12229__$1;
(statearr_12235_12268[(2)] = inst_12225);

(statearr_12235_12268[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12230 === (13))){
var inst_12218 = cljs.core.async.close_BANG_.call(null,out);
var state_12229__$1 = state_12229;
var statearr_12236_12269 = state_12229__$1;
(statearr_12236_12269[(2)] = inst_12218);

(statearr_12236_12269[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12230 === (6))){
var state_12229__$1 = state_12229;
var statearr_12237_12270 = state_12229__$1;
(statearr_12237_12270[(2)] = null);

(statearr_12237_12270[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12230 === (3))){
var inst_12227 = (state_12229[(2)]);
var state_12229__$1 = state_12229;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12229__$1,inst_12227);
} else {
if((state_val_12230 === (12))){
var inst_12215 = (state_12229[(8)]);
var inst_12215__$1 = (state_12229[(2)]);
var inst_12216 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_12215__$1);
var state_12229__$1 = (function (){var statearr_12238 = state_12229;
(statearr_12238[(8)] = inst_12215__$1);

return statearr_12238;
})();
if(cljs.core.truth_(inst_12216)){
var statearr_12239_12271 = state_12229__$1;
(statearr_12239_12271[(1)] = (13));

} else {
var statearr_12240_12272 = state_12229__$1;
(statearr_12240_12272[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12230 === (2))){
var inst_12192 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_12193 = (0);
var state_12229__$1 = (function (){var statearr_12241 = state_12229;
(statearr_12241[(9)] = inst_12192);

(statearr_12241[(7)] = inst_12193);

return statearr_12241;
})();
var statearr_12242_12273 = state_12229__$1;
(statearr_12242_12273[(2)] = null);

(statearr_12242_12273[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12230 === (11))){
var inst_12193 = (state_12229[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_12229,(10),Object,null,(9));
var inst_12202 = chs__$1.call(null,inst_12193);
var inst_12203 = done.call(null,inst_12193);
var inst_12204 = cljs.core.async.take_BANG_.call(null,inst_12202,inst_12203);
var state_12229__$1 = state_12229;
var statearr_12243_12274 = state_12229__$1;
(statearr_12243_12274[(2)] = inst_12204);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12229__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12230 === (9))){
var inst_12193 = (state_12229[(7)]);
var inst_12206 = (state_12229[(2)]);
var inst_12207 = (inst_12193 + (1));
var inst_12193__$1 = inst_12207;
var state_12229__$1 = (function (){var statearr_12244 = state_12229;
(statearr_12244[(7)] = inst_12193__$1);

(statearr_12244[(10)] = inst_12206);

return statearr_12244;
})();
var statearr_12245_12275 = state_12229__$1;
(statearr_12245_12275[(2)] = null);

(statearr_12245_12275[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12230 === (5))){
var inst_12213 = (state_12229[(2)]);
var state_12229__$1 = (function (){var statearr_12246 = state_12229;
(statearr_12246[(11)] = inst_12213);

return statearr_12246;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12229__$1,(12),dchan);
} else {
if((state_val_12230 === (14))){
var inst_12215 = (state_12229[(8)]);
var inst_12220 = cljs.core.apply.call(null,f,inst_12215);
var state_12229__$1 = state_12229;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12229__$1,(16),out,inst_12220);
} else {
if((state_val_12230 === (16))){
var inst_12222 = (state_12229[(2)]);
var state_12229__$1 = (function (){var statearr_12247 = state_12229;
(statearr_12247[(12)] = inst_12222);

return statearr_12247;
})();
var statearr_12248_12276 = state_12229__$1;
(statearr_12248_12276[(2)] = null);

(statearr_12248_12276[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12230 === (10))){
var inst_12197 = (state_12229[(2)]);
var inst_12198 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_12229__$1 = (function (){var statearr_12249 = state_12229;
(statearr_12249[(13)] = inst_12197);

return statearr_12249;
})();
var statearr_12250_12277 = state_12229__$1;
(statearr_12250_12277[(2)] = inst_12198);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12229__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12230 === (8))){
var inst_12211 = (state_12229[(2)]);
var state_12229__$1 = state_12229;
var statearr_12251_12278 = state_12229__$1;
(statearr_12251_12278[(2)] = inst_12211);

(statearr_12251_12278[(1)] = (5));


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
});})(c__10224__auto___12263,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__10112__auto__,c__10224__auto___12263,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__10113__auto__ = null;
var cljs$core$async$state_machine__10113__auto____0 = (function (){
var statearr_12255 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12255[(0)] = cljs$core$async$state_machine__10113__auto__);

(statearr_12255[(1)] = (1));

return statearr_12255;
});
var cljs$core$async$state_machine__10113__auto____1 = (function (state_12229){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_12229);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e12256){if((e12256 instanceof Object)){
var ex__10116__auto__ = e12256;
var statearr_12257_12279 = state_12229;
(statearr_12257_12279[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12229);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12256;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12280 = state_12229;
state_12229 = G__12280;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$state_machine__10113__auto__ = function(state_12229){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10113__auto____1.call(this,state_12229);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10113__auto____0;
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10113__auto____1;
return cljs$core$async$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___12263,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__10226__auto__ = (function (){var statearr_12258 = f__10225__auto__.call(null);
(statearr_12258[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___12263);

return statearr_12258;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___12263,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var args12282 = [];
var len__7322__auto___12340 = arguments.length;
var i__7323__auto___12341 = (0);
while(true){
if((i__7323__auto___12341 < len__7322__auto___12340)){
args12282.push((arguments[i__7323__auto___12341]));

var G__12342 = (i__7323__auto___12341 + (1));
i__7323__auto___12341 = G__12342;
continue;
} else {
}
break;
}

var G__12284 = args12282.length;
switch (G__12284) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12282.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10224__auto___12344 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___12344,out){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___12344,out){
return (function (state_12316){
var state_val_12317 = (state_12316[(1)]);
if((state_val_12317 === (7))){
var inst_12295 = (state_12316[(7)]);
var inst_12296 = (state_12316[(8)]);
var inst_12295__$1 = (state_12316[(2)]);
var inst_12296__$1 = cljs.core.nth.call(null,inst_12295__$1,(0),null);
var inst_12297 = cljs.core.nth.call(null,inst_12295__$1,(1),null);
var inst_12298 = (inst_12296__$1 == null);
var state_12316__$1 = (function (){var statearr_12318 = state_12316;
(statearr_12318[(7)] = inst_12295__$1);

(statearr_12318[(8)] = inst_12296__$1);

(statearr_12318[(9)] = inst_12297);

return statearr_12318;
})();
if(cljs.core.truth_(inst_12298)){
var statearr_12319_12345 = state_12316__$1;
(statearr_12319_12345[(1)] = (8));

} else {
var statearr_12320_12346 = state_12316__$1;
(statearr_12320_12346[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12317 === (1))){
var inst_12285 = cljs.core.vec.call(null,chs);
var inst_12286 = inst_12285;
var state_12316__$1 = (function (){var statearr_12321 = state_12316;
(statearr_12321[(10)] = inst_12286);

return statearr_12321;
})();
var statearr_12322_12347 = state_12316__$1;
(statearr_12322_12347[(2)] = null);

(statearr_12322_12347[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12317 === (4))){
var inst_12286 = (state_12316[(10)]);
var state_12316__$1 = state_12316;
return cljs.core.async.ioc_alts_BANG_.call(null,state_12316__$1,(7),inst_12286);
} else {
if((state_val_12317 === (6))){
var inst_12312 = (state_12316[(2)]);
var state_12316__$1 = state_12316;
var statearr_12323_12348 = state_12316__$1;
(statearr_12323_12348[(2)] = inst_12312);

(statearr_12323_12348[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12317 === (3))){
var inst_12314 = (state_12316[(2)]);
var state_12316__$1 = state_12316;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12316__$1,inst_12314);
} else {
if((state_val_12317 === (2))){
var inst_12286 = (state_12316[(10)]);
var inst_12288 = cljs.core.count.call(null,inst_12286);
var inst_12289 = (inst_12288 > (0));
var state_12316__$1 = state_12316;
if(cljs.core.truth_(inst_12289)){
var statearr_12325_12349 = state_12316__$1;
(statearr_12325_12349[(1)] = (4));

} else {
var statearr_12326_12350 = state_12316__$1;
(statearr_12326_12350[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12317 === (11))){
var inst_12286 = (state_12316[(10)]);
var inst_12305 = (state_12316[(2)]);
var tmp12324 = inst_12286;
var inst_12286__$1 = tmp12324;
var state_12316__$1 = (function (){var statearr_12327 = state_12316;
(statearr_12327[(10)] = inst_12286__$1);

(statearr_12327[(11)] = inst_12305);

return statearr_12327;
})();
var statearr_12328_12351 = state_12316__$1;
(statearr_12328_12351[(2)] = null);

(statearr_12328_12351[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12317 === (9))){
var inst_12296 = (state_12316[(8)]);
var state_12316__$1 = state_12316;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12316__$1,(11),out,inst_12296);
} else {
if((state_val_12317 === (5))){
var inst_12310 = cljs.core.async.close_BANG_.call(null,out);
var state_12316__$1 = state_12316;
var statearr_12329_12352 = state_12316__$1;
(statearr_12329_12352[(2)] = inst_12310);

(statearr_12329_12352[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12317 === (10))){
var inst_12308 = (state_12316[(2)]);
var state_12316__$1 = state_12316;
var statearr_12330_12353 = state_12316__$1;
(statearr_12330_12353[(2)] = inst_12308);

(statearr_12330_12353[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12317 === (8))){
var inst_12286 = (state_12316[(10)]);
var inst_12295 = (state_12316[(7)]);
var inst_12296 = (state_12316[(8)]);
var inst_12297 = (state_12316[(9)]);
var inst_12300 = (function (){var cs = inst_12286;
var vec__12291 = inst_12295;
var v = inst_12296;
var c = inst_12297;
return ((function (cs,vec__12291,v,c,inst_12286,inst_12295,inst_12296,inst_12297,state_val_12317,c__10224__auto___12344,out){
return (function (p1__12281_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__12281_SHARP_);
});
;})(cs,vec__12291,v,c,inst_12286,inst_12295,inst_12296,inst_12297,state_val_12317,c__10224__auto___12344,out))
})();
var inst_12301 = cljs.core.filterv.call(null,inst_12300,inst_12286);
var inst_12286__$1 = inst_12301;
var state_12316__$1 = (function (){var statearr_12331 = state_12316;
(statearr_12331[(10)] = inst_12286__$1);

return statearr_12331;
})();
var statearr_12332_12354 = state_12316__$1;
(statearr_12332_12354[(2)] = null);

(statearr_12332_12354[(1)] = (2));


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
});})(c__10224__auto___12344,out))
;
return ((function (switch__10112__auto__,c__10224__auto___12344,out){
return (function() {
var cljs$core$async$state_machine__10113__auto__ = null;
var cljs$core$async$state_machine__10113__auto____0 = (function (){
var statearr_12336 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12336[(0)] = cljs$core$async$state_machine__10113__auto__);

(statearr_12336[(1)] = (1));

return statearr_12336;
});
var cljs$core$async$state_machine__10113__auto____1 = (function (state_12316){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_12316);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e12337){if((e12337 instanceof Object)){
var ex__10116__auto__ = e12337;
var statearr_12338_12355 = state_12316;
(statearr_12338_12355[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12316);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12337;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12356 = state_12316;
state_12316 = G__12356;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$state_machine__10113__auto__ = function(state_12316){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10113__auto____1.call(this,state_12316);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10113__auto____0;
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10113__auto____1;
return cljs$core$async$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___12344,out))
})();
var state__10226__auto__ = (function (){var statearr_12339 = f__10225__auto__.call(null);
(statearr_12339[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___12344);

return statearr_12339;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___12344,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var args12357 = [];
var len__7322__auto___12406 = arguments.length;
var i__7323__auto___12407 = (0);
while(true){
if((i__7323__auto___12407 < len__7322__auto___12406)){
args12357.push((arguments[i__7323__auto___12407]));

var G__12408 = (i__7323__auto___12407 + (1));
i__7323__auto___12407 = G__12408;
continue;
} else {
}
break;
}

var G__12359 = args12357.length;
switch (G__12359) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12357.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10224__auto___12410 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___12410,out){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___12410,out){
return (function (state_12383){
var state_val_12384 = (state_12383[(1)]);
if((state_val_12384 === (7))){
var inst_12365 = (state_12383[(7)]);
var inst_12365__$1 = (state_12383[(2)]);
var inst_12366 = (inst_12365__$1 == null);
var inst_12367 = cljs.core.not.call(null,inst_12366);
var state_12383__$1 = (function (){var statearr_12385 = state_12383;
(statearr_12385[(7)] = inst_12365__$1);

return statearr_12385;
})();
if(inst_12367){
var statearr_12386_12411 = state_12383__$1;
(statearr_12386_12411[(1)] = (8));

} else {
var statearr_12387_12412 = state_12383__$1;
(statearr_12387_12412[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12384 === (1))){
var inst_12360 = (0);
var state_12383__$1 = (function (){var statearr_12388 = state_12383;
(statearr_12388[(8)] = inst_12360);

return statearr_12388;
})();
var statearr_12389_12413 = state_12383__$1;
(statearr_12389_12413[(2)] = null);

(statearr_12389_12413[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12384 === (4))){
var state_12383__$1 = state_12383;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12383__$1,(7),ch);
} else {
if((state_val_12384 === (6))){
var inst_12378 = (state_12383[(2)]);
var state_12383__$1 = state_12383;
var statearr_12390_12414 = state_12383__$1;
(statearr_12390_12414[(2)] = inst_12378);

(statearr_12390_12414[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12384 === (3))){
var inst_12380 = (state_12383[(2)]);
var inst_12381 = cljs.core.async.close_BANG_.call(null,out);
var state_12383__$1 = (function (){var statearr_12391 = state_12383;
(statearr_12391[(9)] = inst_12380);

return statearr_12391;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12383__$1,inst_12381);
} else {
if((state_val_12384 === (2))){
var inst_12360 = (state_12383[(8)]);
var inst_12362 = (inst_12360 < n);
var state_12383__$1 = state_12383;
if(cljs.core.truth_(inst_12362)){
var statearr_12392_12415 = state_12383__$1;
(statearr_12392_12415[(1)] = (4));

} else {
var statearr_12393_12416 = state_12383__$1;
(statearr_12393_12416[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12384 === (11))){
var inst_12360 = (state_12383[(8)]);
var inst_12370 = (state_12383[(2)]);
var inst_12371 = (inst_12360 + (1));
var inst_12360__$1 = inst_12371;
var state_12383__$1 = (function (){var statearr_12394 = state_12383;
(statearr_12394[(10)] = inst_12370);

(statearr_12394[(8)] = inst_12360__$1);

return statearr_12394;
})();
var statearr_12395_12417 = state_12383__$1;
(statearr_12395_12417[(2)] = null);

(statearr_12395_12417[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12384 === (9))){
var state_12383__$1 = state_12383;
var statearr_12396_12418 = state_12383__$1;
(statearr_12396_12418[(2)] = null);

(statearr_12396_12418[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12384 === (5))){
var state_12383__$1 = state_12383;
var statearr_12397_12419 = state_12383__$1;
(statearr_12397_12419[(2)] = null);

(statearr_12397_12419[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12384 === (10))){
var inst_12375 = (state_12383[(2)]);
var state_12383__$1 = state_12383;
var statearr_12398_12420 = state_12383__$1;
(statearr_12398_12420[(2)] = inst_12375);

(statearr_12398_12420[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12384 === (8))){
var inst_12365 = (state_12383[(7)]);
var state_12383__$1 = state_12383;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12383__$1,(11),out,inst_12365);
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
});})(c__10224__auto___12410,out))
;
return ((function (switch__10112__auto__,c__10224__auto___12410,out){
return (function() {
var cljs$core$async$state_machine__10113__auto__ = null;
var cljs$core$async$state_machine__10113__auto____0 = (function (){
var statearr_12402 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_12402[(0)] = cljs$core$async$state_machine__10113__auto__);

(statearr_12402[(1)] = (1));

return statearr_12402;
});
var cljs$core$async$state_machine__10113__auto____1 = (function (state_12383){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_12383);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e12403){if((e12403 instanceof Object)){
var ex__10116__auto__ = e12403;
var statearr_12404_12421 = state_12383;
(statearr_12404_12421[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12383);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12403;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12422 = state_12383;
state_12383 = G__12422;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$state_machine__10113__auto__ = function(state_12383){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10113__auto____1.call(this,state_12383);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10113__auto____0;
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10113__auto____1;
return cljs$core$async$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___12410,out))
})();
var state__10226__auto__ = (function (){var statearr_12405 = f__10225__auto__.call(null);
(statearr_12405[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___12410);

return statearr_12405;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___12410,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async12430 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12430 = (function (map_LT_,f,ch,meta12431){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta12431 = meta12431;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async12430.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12432,meta12431__$1){
var self__ = this;
var _12432__$1 = this;
return (new cljs.core.async.t_cljs$core$async12430(self__.map_LT_,self__.f,self__.ch,meta12431__$1));
});

cljs.core.async.t_cljs$core$async12430.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12432){
var self__ = this;
var _12432__$1 = this;
return self__.meta12431;
});

cljs.core.async.t_cljs$core$async12430.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async12430.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async12430.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async12430.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async12430.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async12433 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12433 = (function (map_LT_,f,ch,meta12431,_,fn1,meta12434){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta12431 = meta12431;
this._ = _;
this.fn1 = fn1;
this.meta12434 = meta12434;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async12433.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_12435,meta12434__$1){
var self__ = this;
var _12435__$1 = this;
return (new cljs.core.async.t_cljs$core$async12433(self__.map_LT_,self__.f,self__.ch,self__.meta12431,self__._,self__.fn1,meta12434__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async12433.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_12435){
var self__ = this;
var _12435__$1 = this;
return self__.meta12434;
});})(___$1))
;

cljs.core.async.t_cljs$core$async12433.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async12433.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async12433.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
});})(___$1))
;

cljs.core.async.t_cljs$core$async12433.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__12423_SHARP_){
return f1.call(null,(((p1__12423_SHARP_ == null))?null:self__.f.call(null,p1__12423_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async12433.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12431","meta12431",-246150972,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async12430","cljs.core.async/t_cljs$core$async12430",-334914261,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta12434","meta12434",-1781382906,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async12433.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async12433.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12433";

cljs.core.async.t_cljs$core$async12433.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__6853__auto__,writer__6854__auto__,opt__6855__auto__){
return cljs.core._write.call(null,writer__6854__auto__,"cljs.core.async/t_cljs$core$async12433");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async12433 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async12433(map_LT___$1,f__$1,ch__$1,meta12431__$1,___$2,fn1__$1,meta12434){
return (new cljs.core.async.t_cljs$core$async12433(map_LT___$1,f__$1,ch__$1,meta12431__$1,___$2,fn1__$1,meta12434));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async12433(self__.map_LT_,self__.f,self__.ch,self__.meta12431,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__6235__auto__ = ret;
if(cljs.core.truth_(and__6235__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__6235__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async12430.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async12430.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async12430.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12431","meta12431",-246150972,null)], null);
});

cljs.core.async.t_cljs$core$async12430.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async12430.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12430";

cljs.core.async.t_cljs$core$async12430.cljs$lang$ctorPrWriter = (function (this__6853__auto__,writer__6854__auto__,opt__6855__auto__){
return cljs.core._write.call(null,writer__6854__auto__,"cljs.core.async/t_cljs$core$async12430");
});

cljs.core.async.__GT_t_cljs$core$async12430 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async12430(map_LT___$1,f__$1,ch__$1,meta12431){
return (new cljs.core.async.t_cljs$core$async12430(map_LT___$1,f__$1,ch__$1,meta12431));
});

}

return (new cljs.core.async.t_cljs$core$async12430(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async12439 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12439 = (function (map_GT_,f,ch,meta12440){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta12440 = meta12440;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async12439.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12441,meta12440__$1){
var self__ = this;
var _12441__$1 = this;
return (new cljs.core.async.t_cljs$core$async12439(self__.map_GT_,self__.f,self__.ch,meta12440__$1));
});

cljs.core.async.t_cljs$core$async12439.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12441){
var self__ = this;
var _12441__$1 = this;
return self__.meta12440;
});

cljs.core.async.t_cljs$core$async12439.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async12439.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async12439.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async12439.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async12439.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async12439.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async12439.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12440","meta12440",1990022388,null)], null);
});

cljs.core.async.t_cljs$core$async12439.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async12439.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12439";

cljs.core.async.t_cljs$core$async12439.cljs$lang$ctorPrWriter = (function (this__6853__auto__,writer__6854__auto__,opt__6855__auto__){
return cljs.core._write.call(null,writer__6854__auto__,"cljs.core.async/t_cljs$core$async12439");
});

cljs.core.async.__GT_t_cljs$core$async12439 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async12439(map_GT___$1,f__$1,ch__$1,meta12440){
return (new cljs.core.async.t_cljs$core$async12439(map_GT___$1,f__$1,ch__$1,meta12440));
});

}

return (new cljs.core.async.t_cljs$core$async12439(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async12445 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async12445 = (function (filter_GT_,p,ch,meta12446){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta12446 = meta12446;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async12445.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_12447,meta12446__$1){
var self__ = this;
var _12447__$1 = this;
return (new cljs.core.async.t_cljs$core$async12445(self__.filter_GT_,self__.p,self__.ch,meta12446__$1));
});

cljs.core.async.t_cljs$core$async12445.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_12447){
var self__ = this;
var _12447__$1 = this;
return self__.meta12446;
});

cljs.core.async.t_cljs$core$async12445.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async12445.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async12445.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async12445.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async12445.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async12445.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async12445.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async12445.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta12446","meta12446",1314623947,null)], null);
});

cljs.core.async.t_cljs$core$async12445.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async12445.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async12445";

cljs.core.async.t_cljs$core$async12445.cljs$lang$ctorPrWriter = (function (this__6853__auto__,writer__6854__auto__,opt__6855__auto__){
return cljs.core._write.call(null,writer__6854__auto__,"cljs.core.async/t_cljs$core$async12445");
});

cljs.core.async.__GT_t_cljs$core$async12445 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async12445(filter_GT___$1,p__$1,ch__$1,meta12446){
return (new cljs.core.async.t_cljs$core$async12445(filter_GT___$1,p__$1,ch__$1,meta12446));
});

}

return (new cljs.core.async.t_cljs$core$async12445(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var args12448 = [];
var len__7322__auto___12492 = arguments.length;
var i__7323__auto___12493 = (0);
while(true){
if((i__7323__auto___12493 < len__7322__auto___12492)){
args12448.push((arguments[i__7323__auto___12493]));

var G__12494 = (i__7323__auto___12493 + (1));
i__7323__auto___12493 = G__12494;
continue;
} else {
}
break;
}

var G__12450 = args12448.length;
switch (G__12450) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12448.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10224__auto___12496 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___12496,out){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___12496,out){
return (function (state_12471){
var state_val_12472 = (state_12471[(1)]);
if((state_val_12472 === (7))){
var inst_12467 = (state_12471[(2)]);
var state_12471__$1 = state_12471;
var statearr_12473_12497 = state_12471__$1;
(statearr_12473_12497[(2)] = inst_12467);

(statearr_12473_12497[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12472 === (1))){
var state_12471__$1 = state_12471;
var statearr_12474_12498 = state_12471__$1;
(statearr_12474_12498[(2)] = null);

(statearr_12474_12498[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12472 === (4))){
var inst_12453 = (state_12471[(7)]);
var inst_12453__$1 = (state_12471[(2)]);
var inst_12454 = (inst_12453__$1 == null);
var state_12471__$1 = (function (){var statearr_12475 = state_12471;
(statearr_12475[(7)] = inst_12453__$1);

return statearr_12475;
})();
if(cljs.core.truth_(inst_12454)){
var statearr_12476_12499 = state_12471__$1;
(statearr_12476_12499[(1)] = (5));

} else {
var statearr_12477_12500 = state_12471__$1;
(statearr_12477_12500[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12472 === (6))){
var inst_12453 = (state_12471[(7)]);
var inst_12458 = p.call(null,inst_12453);
var state_12471__$1 = state_12471;
if(cljs.core.truth_(inst_12458)){
var statearr_12478_12501 = state_12471__$1;
(statearr_12478_12501[(1)] = (8));

} else {
var statearr_12479_12502 = state_12471__$1;
(statearr_12479_12502[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12472 === (3))){
var inst_12469 = (state_12471[(2)]);
var state_12471__$1 = state_12471;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12471__$1,inst_12469);
} else {
if((state_val_12472 === (2))){
var state_12471__$1 = state_12471;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12471__$1,(4),ch);
} else {
if((state_val_12472 === (11))){
var inst_12461 = (state_12471[(2)]);
var state_12471__$1 = state_12471;
var statearr_12480_12503 = state_12471__$1;
(statearr_12480_12503[(2)] = inst_12461);

(statearr_12480_12503[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12472 === (9))){
var state_12471__$1 = state_12471;
var statearr_12481_12504 = state_12471__$1;
(statearr_12481_12504[(2)] = null);

(statearr_12481_12504[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12472 === (5))){
var inst_12456 = cljs.core.async.close_BANG_.call(null,out);
var state_12471__$1 = state_12471;
var statearr_12482_12505 = state_12471__$1;
(statearr_12482_12505[(2)] = inst_12456);

(statearr_12482_12505[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12472 === (10))){
var inst_12464 = (state_12471[(2)]);
var state_12471__$1 = (function (){var statearr_12483 = state_12471;
(statearr_12483[(8)] = inst_12464);

return statearr_12483;
})();
var statearr_12484_12506 = state_12471__$1;
(statearr_12484_12506[(2)] = null);

(statearr_12484_12506[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12472 === (8))){
var inst_12453 = (state_12471[(7)]);
var state_12471__$1 = state_12471;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12471__$1,(11),out,inst_12453);
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
});})(c__10224__auto___12496,out))
;
return ((function (switch__10112__auto__,c__10224__auto___12496,out){
return (function() {
var cljs$core$async$state_machine__10113__auto__ = null;
var cljs$core$async$state_machine__10113__auto____0 = (function (){
var statearr_12488 = [null,null,null,null,null,null,null,null,null];
(statearr_12488[(0)] = cljs$core$async$state_machine__10113__auto__);

(statearr_12488[(1)] = (1));

return statearr_12488;
});
var cljs$core$async$state_machine__10113__auto____1 = (function (state_12471){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_12471);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e12489){if((e12489 instanceof Object)){
var ex__10116__auto__ = e12489;
var statearr_12490_12507 = state_12471;
(statearr_12490_12507[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12471);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12489;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12508 = state_12471;
state_12471 = G__12508;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$state_machine__10113__auto__ = function(state_12471){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10113__auto____1.call(this,state_12471);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10113__auto____0;
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10113__auto____1;
return cljs$core$async$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___12496,out))
})();
var state__10226__auto__ = (function (){var statearr_12491 = f__10225__auto__.call(null);
(statearr_12491[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___12496);

return statearr_12491;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___12496,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args12509 = [];
var len__7322__auto___12512 = arguments.length;
var i__7323__auto___12513 = (0);
while(true){
if((i__7323__auto___12513 < len__7322__auto___12512)){
args12509.push((arguments[i__7323__auto___12513]));

var G__12514 = (i__7323__auto___12513 + (1));
i__7323__auto___12513 = G__12514;
continue;
} else {
}
break;
}

var G__12511 = args12509.length;
switch (G__12511) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12509.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__10224__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto__){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto__){
return (function (state_12681){
var state_val_12682 = (state_12681[(1)]);
if((state_val_12682 === (7))){
var inst_12677 = (state_12681[(2)]);
var state_12681__$1 = state_12681;
var statearr_12683_12724 = state_12681__$1;
(statearr_12683_12724[(2)] = inst_12677);

(statearr_12683_12724[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (20))){
var inst_12647 = (state_12681[(7)]);
var inst_12658 = (state_12681[(2)]);
var inst_12659 = cljs.core.next.call(null,inst_12647);
var inst_12633 = inst_12659;
var inst_12634 = null;
var inst_12635 = (0);
var inst_12636 = (0);
var state_12681__$1 = (function (){var statearr_12684 = state_12681;
(statearr_12684[(8)] = inst_12633);

(statearr_12684[(9)] = inst_12636);

(statearr_12684[(10)] = inst_12635);

(statearr_12684[(11)] = inst_12634);

(statearr_12684[(12)] = inst_12658);

return statearr_12684;
})();
var statearr_12685_12725 = state_12681__$1;
(statearr_12685_12725[(2)] = null);

(statearr_12685_12725[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (1))){
var state_12681__$1 = state_12681;
var statearr_12686_12726 = state_12681__$1;
(statearr_12686_12726[(2)] = null);

(statearr_12686_12726[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (4))){
var inst_12622 = (state_12681[(13)]);
var inst_12622__$1 = (state_12681[(2)]);
var inst_12623 = (inst_12622__$1 == null);
var state_12681__$1 = (function (){var statearr_12687 = state_12681;
(statearr_12687[(13)] = inst_12622__$1);

return statearr_12687;
})();
if(cljs.core.truth_(inst_12623)){
var statearr_12688_12727 = state_12681__$1;
(statearr_12688_12727[(1)] = (5));

} else {
var statearr_12689_12728 = state_12681__$1;
(statearr_12689_12728[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (15))){
var state_12681__$1 = state_12681;
var statearr_12693_12729 = state_12681__$1;
(statearr_12693_12729[(2)] = null);

(statearr_12693_12729[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (21))){
var state_12681__$1 = state_12681;
var statearr_12694_12730 = state_12681__$1;
(statearr_12694_12730[(2)] = null);

(statearr_12694_12730[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (13))){
var inst_12633 = (state_12681[(8)]);
var inst_12636 = (state_12681[(9)]);
var inst_12635 = (state_12681[(10)]);
var inst_12634 = (state_12681[(11)]);
var inst_12643 = (state_12681[(2)]);
var inst_12644 = (inst_12636 + (1));
var tmp12690 = inst_12633;
var tmp12691 = inst_12635;
var tmp12692 = inst_12634;
var inst_12633__$1 = tmp12690;
var inst_12634__$1 = tmp12692;
var inst_12635__$1 = tmp12691;
var inst_12636__$1 = inst_12644;
var state_12681__$1 = (function (){var statearr_12695 = state_12681;
(statearr_12695[(14)] = inst_12643);

(statearr_12695[(8)] = inst_12633__$1);

(statearr_12695[(9)] = inst_12636__$1);

(statearr_12695[(10)] = inst_12635__$1);

(statearr_12695[(11)] = inst_12634__$1);

return statearr_12695;
})();
var statearr_12696_12731 = state_12681__$1;
(statearr_12696_12731[(2)] = null);

(statearr_12696_12731[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (22))){
var state_12681__$1 = state_12681;
var statearr_12697_12732 = state_12681__$1;
(statearr_12697_12732[(2)] = null);

(statearr_12697_12732[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (6))){
var inst_12622 = (state_12681[(13)]);
var inst_12631 = f.call(null,inst_12622);
var inst_12632 = cljs.core.seq.call(null,inst_12631);
var inst_12633 = inst_12632;
var inst_12634 = null;
var inst_12635 = (0);
var inst_12636 = (0);
var state_12681__$1 = (function (){var statearr_12698 = state_12681;
(statearr_12698[(8)] = inst_12633);

(statearr_12698[(9)] = inst_12636);

(statearr_12698[(10)] = inst_12635);

(statearr_12698[(11)] = inst_12634);

return statearr_12698;
})();
var statearr_12699_12733 = state_12681__$1;
(statearr_12699_12733[(2)] = null);

(statearr_12699_12733[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (17))){
var inst_12647 = (state_12681[(7)]);
var inst_12651 = cljs.core.chunk_first.call(null,inst_12647);
var inst_12652 = cljs.core.chunk_rest.call(null,inst_12647);
var inst_12653 = cljs.core.count.call(null,inst_12651);
var inst_12633 = inst_12652;
var inst_12634 = inst_12651;
var inst_12635 = inst_12653;
var inst_12636 = (0);
var state_12681__$1 = (function (){var statearr_12700 = state_12681;
(statearr_12700[(8)] = inst_12633);

(statearr_12700[(9)] = inst_12636);

(statearr_12700[(10)] = inst_12635);

(statearr_12700[(11)] = inst_12634);

return statearr_12700;
})();
var statearr_12701_12734 = state_12681__$1;
(statearr_12701_12734[(2)] = null);

(statearr_12701_12734[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (3))){
var inst_12679 = (state_12681[(2)]);
var state_12681__$1 = state_12681;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12681__$1,inst_12679);
} else {
if((state_val_12682 === (12))){
var inst_12667 = (state_12681[(2)]);
var state_12681__$1 = state_12681;
var statearr_12702_12735 = state_12681__$1;
(statearr_12702_12735[(2)] = inst_12667);

(statearr_12702_12735[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (2))){
var state_12681__$1 = state_12681;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12681__$1,(4),in$);
} else {
if((state_val_12682 === (23))){
var inst_12675 = (state_12681[(2)]);
var state_12681__$1 = state_12681;
var statearr_12703_12736 = state_12681__$1;
(statearr_12703_12736[(2)] = inst_12675);

(statearr_12703_12736[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (19))){
var inst_12662 = (state_12681[(2)]);
var state_12681__$1 = state_12681;
var statearr_12704_12737 = state_12681__$1;
(statearr_12704_12737[(2)] = inst_12662);

(statearr_12704_12737[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (11))){
var inst_12633 = (state_12681[(8)]);
var inst_12647 = (state_12681[(7)]);
var inst_12647__$1 = cljs.core.seq.call(null,inst_12633);
var state_12681__$1 = (function (){var statearr_12705 = state_12681;
(statearr_12705[(7)] = inst_12647__$1);

return statearr_12705;
})();
if(inst_12647__$1){
var statearr_12706_12738 = state_12681__$1;
(statearr_12706_12738[(1)] = (14));

} else {
var statearr_12707_12739 = state_12681__$1;
(statearr_12707_12739[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (9))){
var inst_12669 = (state_12681[(2)]);
var inst_12670 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_12681__$1 = (function (){var statearr_12708 = state_12681;
(statearr_12708[(15)] = inst_12669);

return statearr_12708;
})();
if(cljs.core.truth_(inst_12670)){
var statearr_12709_12740 = state_12681__$1;
(statearr_12709_12740[(1)] = (21));

} else {
var statearr_12710_12741 = state_12681__$1;
(statearr_12710_12741[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (5))){
var inst_12625 = cljs.core.async.close_BANG_.call(null,out);
var state_12681__$1 = state_12681;
var statearr_12711_12742 = state_12681__$1;
(statearr_12711_12742[(2)] = inst_12625);

(statearr_12711_12742[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (14))){
var inst_12647 = (state_12681[(7)]);
var inst_12649 = cljs.core.chunked_seq_QMARK_.call(null,inst_12647);
var state_12681__$1 = state_12681;
if(inst_12649){
var statearr_12712_12743 = state_12681__$1;
(statearr_12712_12743[(1)] = (17));

} else {
var statearr_12713_12744 = state_12681__$1;
(statearr_12713_12744[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (16))){
var inst_12665 = (state_12681[(2)]);
var state_12681__$1 = state_12681;
var statearr_12714_12745 = state_12681__$1;
(statearr_12714_12745[(2)] = inst_12665);

(statearr_12714_12745[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12682 === (10))){
var inst_12636 = (state_12681[(9)]);
var inst_12634 = (state_12681[(11)]);
var inst_12641 = cljs.core._nth.call(null,inst_12634,inst_12636);
var state_12681__$1 = state_12681;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12681__$1,(13),out,inst_12641);
} else {
if((state_val_12682 === (18))){
var inst_12647 = (state_12681[(7)]);
var inst_12656 = cljs.core.first.call(null,inst_12647);
var state_12681__$1 = state_12681;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12681__$1,(20),out,inst_12656);
} else {
if((state_val_12682 === (8))){
var inst_12636 = (state_12681[(9)]);
var inst_12635 = (state_12681[(10)]);
var inst_12638 = (inst_12636 < inst_12635);
var inst_12639 = inst_12638;
var state_12681__$1 = state_12681;
if(cljs.core.truth_(inst_12639)){
var statearr_12715_12746 = state_12681__$1;
(statearr_12715_12746[(1)] = (10));

} else {
var statearr_12716_12747 = state_12681__$1;
(statearr_12716_12747[(1)] = (11));

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
});})(c__10224__auto__))
;
return ((function (switch__10112__auto__,c__10224__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__10113__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__10113__auto____0 = (function (){
var statearr_12720 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12720[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__10113__auto__);

(statearr_12720[(1)] = (1));

return statearr_12720;
});
var cljs$core$async$mapcat_STAR__$_state_machine__10113__auto____1 = (function (state_12681){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_12681);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e12721){if((e12721 instanceof Object)){
var ex__10116__auto__ = e12721;
var statearr_12722_12748 = state_12681;
(statearr_12722_12748[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12681);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12721;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12749 = state_12681;
state_12681 = G__12749;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__10113__auto__ = function(state_12681){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__10113__auto____1.call(this,state_12681);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__10113__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__10113__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto__))
})();
var state__10226__auto__ = (function (){var statearr_12723 = f__10225__auto__.call(null);
(statearr_12723[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto__);

return statearr_12723;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto__))
);

return c__10224__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args12750 = [];
var len__7322__auto___12753 = arguments.length;
var i__7323__auto___12754 = (0);
while(true){
if((i__7323__auto___12754 < len__7322__auto___12753)){
args12750.push((arguments[i__7323__auto___12754]));

var G__12755 = (i__7323__auto___12754 + (1));
i__7323__auto___12754 = G__12755;
continue;
} else {
}
break;
}

var G__12752 = args12750.length;
switch (G__12752) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12750.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var args12757 = [];
var len__7322__auto___12760 = arguments.length;
var i__7323__auto___12761 = (0);
while(true){
if((i__7323__auto___12761 < len__7322__auto___12760)){
args12757.push((arguments[i__7323__auto___12761]));

var G__12762 = (i__7323__auto___12761 + (1));
i__7323__auto___12761 = G__12762;
continue;
} else {
}
break;
}

var G__12759 = args12757.length;
switch (G__12759) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12757.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var args12764 = [];
var len__7322__auto___12815 = arguments.length;
var i__7323__auto___12816 = (0);
while(true){
if((i__7323__auto___12816 < len__7322__auto___12815)){
args12764.push((arguments[i__7323__auto___12816]));

var G__12817 = (i__7323__auto___12816 + (1));
i__7323__auto___12816 = G__12817;
continue;
} else {
}
break;
}

var G__12766 = args12764.length;
switch (G__12766) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12764.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10224__auto___12819 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___12819,out){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___12819,out){
return (function (state_12790){
var state_val_12791 = (state_12790[(1)]);
if((state_val_12791 === (7))){
var inst_12785 = (state_12790[(2)]);
var state_12790__$1 = state_12790;
var statearr_12792_12820 = state_12790__$1;
(statearr_12792_12820[(2)] = inst_12785);

(statearr_12792_12820[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12791 === (1))){
var inst_12767 = null;
var state_12790__$1 = (function (){var statearr_12793 = state_12790;
(statearr_12793[(7)] = inst_12767);

return statearr_12793;
})();
var statearr_12794_12821 = state_12790__$1;
(statearr_12794_12821[(2)] = null);

(statearr_12794_12821[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12791 === (4))){
var inst_12770 = (state_12790[(8)]);
var inst_12770__$1 = (state_12790[(2)]);
var inst_12771 = (inst_12770__$1 == null);
var inst_12772 = cljs.core.not.call(null,inst_12771);
var state_12790__$1 = (function (){var statearr_12795 = state_12790;
(statearr_12795[(8)] = inst_12770__$1);

return statearr_12795;
})();
if(inst_12772){
var statearr_12796_12822 = state_12790__$1;
(statearr_12796_12822[(1)] = (5));

} else {
var statearr_12797_12823 = state_12790__$1;
(statearr_12797_12823[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12791 === (6))){
var state_12790__$1 = state_12790;
var statearr_12798_12824 = state_12790__$1;
(statearr_12798_12824[(2)] = null);

(statearr_12798_12824[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12791 === (3))){
var inst_12787 = (state_12790[(2)]);
var inst_12788 = cljs.core.async.close_BANG_.call(null,out);
var state_12790__$1 = (function (){var statearr_12799 = state_12790;
(statearr_12799[(9)] = inst_12787);

return statearr_12799;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12790__$1,inst_12788);
} else {
if((state_val_12791 === (2))){
var state_12790__$1 = state_12790;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12790__$1,(4),ch);
} else {
if((state_val_12791 === (11))){
var inst_12770 = (state_12790[(8)]);
var inst_12779 = (state_12790[(2)]);
var inst_12767 = inst_12770;
var state_12790__$1 = (function (){var statearr_12800 = state_12790;
(statearr_12800[(10)] = inst_12779);

(statearr_12800[(7)] = inst_12767);

return statearr_12800;
})();
var statearr_12801_12825 = state_12790__$1;
(statearr_12801_12825[(2)] = null);

(statearr_12801_12825[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12791 === (9))){
var inst_12770 = (state_12790[(8)]);
var state_12790__$1 = state_12790;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12790__$1,(11),out,inst_12770);
} else {
if((state_val_12791 === (5))){
var inst_12770 = (state_12790[(8)]);
var inst_12767 = (state_12790[(7)]);
var inst_12774 = cljs.core._EQ_.call(null,inst_12770,inst_12767);
var state_12790__$1 = state_12790;
if(inst_12774){
var statearr_12803_12826 = state_12790__$1;
(statearr_12803_12826[(1)] = (8));

} else {
var statearr_12804_12827 = state_12790__$1;
(statearr_12804_12827[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12791 === (10))){
var inst_12782 = (state_12790[(2)]);
var state_12790__$1 = state_12790;
var statearr_12805_12828 = state_12790__$1;
(statearr_12805_12828[(2)] = inst_12782);

(statearr_12805_12828[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12791 === (8))){
var inst_12767 = (state_12790[(7)]);
var tmp12802 = inst_12767;
var inst_12767__$1 = tmp12802;
var state_12790__$1 = (function (){var statearr_12806 = state_12790;
(statearr_12806[(7)] = inst_12767__$1);

return statearr_12806;
})();
var statearr_12807_12829 = state_12790__$1;
(statearr_12807_12829[(2)] = null);

(statearr_12807_12829[(1)] = (2));


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
});})(c__10224__auto___12819,out))
;
return ((function (switch__10112__auto__,c__10224__auto___12819,out){
return (function() {
var cljs$core$async$state_machine__10113__auto__ = null;
var cljs$core$async$state_machine__10113__auto____0 = (function (){
var statearr_12811 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_12811[(0)] = cljs$core$async$state_machine__10113__auto__);

(statearr_12811[(1)] = (1));

return statearr_12811;
});
var cljs$core$async$state_machine__10113__auto____1 = (function (state_12790){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_12790);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e12812){if((e12812 instanceof Object)){
var ex__10116__auto__ = e12812;
var statearr_12813_12830 = state_12790;
(statearr_12813_12830[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12790);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12812;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12831 = state_12790;
state_12790 = G__12831;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$state_machine__10113__auto__ = function(state_12790){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10113__auto____1.call(this,state_12790);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10113__auto____0;
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10113__auto____1;
return cljs$core$async$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___12819,out))
})();
var state__10226__auto__ = (function (){var statearr_12814 = f__10225__auto__.call(null);
(statearr_12814[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___12819);

return statearr_12814;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___12819,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args12832 = [];
var len__7322__auto___12902 = arguments.length;
var i__7323__auto___12903 = (0);
while(true){
if((i__7323__auto___12903 < len__7322__auto___12902)){
args12832.push((arguments[i__7323__auto___12903]));

var G__12904 = (i__7323__auto___12903 + (1));
i__7323__auto___12903 = G__12904;
continue;
} else {
}
break;
}

var G__12834 = args12832.length;
switch (G__12834) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12832.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10224__auto___12906 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___12906,out){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___12906,out){
return (function (state_12872){
var state_val_12873 = (state_12872[(1)]);
if((state_val_12873 === (7))){
var inst_12868 = (state_12872[(2)]);
var state_12872__$1 = state_12872;
var statearr_12874_12907 = state_12872__$1;
(statearr_12874_12907[(2)] = inst_12868);

(statearr_12874_12907[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12873 === (1))){
var inst_12835 = (new Array(n));
var inst_12836 = inst_12835;
var inst_12837 = (0);
var state_12872__$1 = (function (){var statearr_12875 = state_12872;
(statearr_12875[(7)] = inst_12836);

(statearr_12875[(8)] = inst_12837);

return statearr_12875;
})();
var statearr_12876_12908 = state_12872__$1;
(statearr_12876_12908[(2)] = null);

(statearr_12876_12908[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12873 === (4))){
var inst_12840 = (state_12872[(9)]);
var inst_12840__$1 = (state_12872[(2)]);
var inst_12841 = (inst_12840__$1 == null);
var inst_12842 = cljs.core.not.call(null,inst_12841);
var state_12872__$1 = (function (){var statearr_12877 = state_12872;
(statearr_12877[(9)] = inst_12840__$1);

return statearr_12877;
})();
if(inst_12842){
var statearr_12878_12909 = state_12872__$1;
(statearr_12878_12909[(1)] = (5));

} else {
var statearr_12879_12910 = state_12872__$1;
(statearr_12879_12910[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12873 === (15))){
var inst_12862 = (state_12872[(2)]);
var state_12872__$1 = state_12872;
var statearr_12880_12911 = state_12872__$1;
(statearr_12880_12911[(2)] = inst_12862);

(statearr_12880_12911[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12873 === (13))){
var state_12872__$1 = state_12872;
var statearr_12881_12912 = state_12872__$1;
(statearr_12881_12912[(2)] = null);

(statearr_12881_12912[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12873 === (6))){
var inst_12837 = (state_12872[(8)]);
var inst_12858 = (inst_12837 > (0));
var state_12872__$1 = state_12872;
if(cljs.core.truth_(inst_12858)){
var statearr_12882_12913 = state_12872__$1;
(statearr_12882_12913[(1)] = (12));

} else {
var statearr_12883_12914 = state_12872__$1;
(statearr_12883_12914[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12873 === (3))){
var inst_12870 = (state_12872[(2)]);
var state_12872__$1 = state_12872;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12872__$1,inst_12870);
} else {
if((state_val_12873 === (12))){
var inst_12836 = (state_12872[(7)]);
var inst_12860 = cljs.core.vec.call(null,inst_12836);
var state_12872__$1 = state_12872;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12872__$1,(15),out,inst_12860);
} else {
if((state_val_12873 === (2))){
var state_12872__$1 = state_12872;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12872__$1,(4),ch);
} else {
if((state_val_12873 === (11))){
var inst_12852 = (state_12872[(2)]);
var inst_12853 = (new Array(n));
var inst_12836 = inst_12853;
var inst_12837 = (0);
var state_12872__$1 = (function (){var statearr_12884 = state_12872;
(statearr_12884[(7)] = inst_12836);

(statearr_12884[(8)] = inst_12837);

(statearr_12884[(10)] = inst_12852);

return statearr_12884;
})();
var statearr_12885_12915 = state_12872__$1;
(statearr_12885_12915[(2)] = null);

(statearr_12885_12915[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12873 === (9))){
var inst_12836 = (state_12872[(7)]);
var inst_12850 = cljs.core.vec.call(null,inst_12836);
var state_12872__$1 = state_12872;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12872__$1,(11),out,inst_12850);
} else {
if((state_val_12873 === (5))){
var inst_12836 = (state_12872[(7)]);
var inst_12845 = (state_12872[(11)]);
var inst_12837 = (state_12872[(8)]);
var inst_12840 = (state_12872[(9)]);
var inst_12844 = (inst_12836[inst_12837] = inst_12840);
var inst_12845__$1 = (inst_12837 + (1));
var inst_12846 = (inst_12845__$1 < n);
var state_12872__$1 = (function (){var statearr_12886 = state_12872;
(statearr_12886[(11)] = inst_12845__$1);

(statearr_12886[(12)] = inst_12844);

return statearr_12886;
})();
if(cljs.core.truth_(inst_12846)){
var statearr_12887_12916 = state_12872__$1;
(statearr_12887_12916[(1)] = (8));

} else {
var statearr_12888_12917 = state_12872__$1;
(statearr_12888_12917[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12873 === (14))){
var inst_12865 = (state_12872[(2)]);
var inst_12866 = cljs.core.async.close_BANG_.call(null,out);
var state_12872__$1 = (function (){var statearr_12890 = state_12872;
(statearr_12890[(13)] = inst_12865);

return statearr_12890;
})();
var statearr_12891_12918 = state_12872__$1;
(statearr_12891_12918[(2)] = inst_12866);

(statearr_12891_12918[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12873 === (10))){
var inst_12856 = (state_12872[(2)]);
var state_12872__$1 = state_12872;
var statearr_12892_12919 = state_12872__$1;
(statearr_12892_12919[(2)] = inst_12856);

(statearr_12892_12919[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12873 === (8))){
var inst_12836 = (state_12872[(7)]);
var inst_12845 = (state_12872[(11)]);
var tmp12889 = inst_12836;
var inst_12836__$1 = tmp12889;
var inst_12837 = inst_12845;
var state_12872__$1 = (function (){var statearr_12893 = state_12872;
(statearr_12893[(7)] = inst_12836__$1);

(statearr_12893[(8)] = inst_12837);

return statearr_12893;
})();
var statearr_12894_12920 = state_12872__$1;
(statearr_12894_12920[(2)] = null);

(statearr_12894_12920[(1)] = (2));


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
});})(c__10224__auto___12906,out))
;
return ((function (switch__10112__auto__,c__10224__auto___12906,out){
return (function() {
var cljs$core$async$state_machine__10113__auto__ = null;
var cljs$core$async$state_machine__10113__auto____0 = (function (){
var statearr_12898 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12898[(0)] = cljs$core$async$state_machine__10113__auto__);

(statearr_12898[(1)] = (1));

return statearr_12898;
});
var cljs$core$async$state_machine__10113__auto____1 = (function (state_12872){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_12872);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e12899){if((e12899 instanceof Object)){
var ex__10116__auto__ = e12899;
var statearr_12900_12921 = state_12872;
(statearr_12900_12921[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12872);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12899;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__12922 = state_12872;
state_12872 = G__12922;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$state_machine__10113__auto__ = function(state_12872){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10113__auto____1.call(this,state_12872);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10113__auto____0;
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10113__auto____1;
return cljs$core$async$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___12906,out))
})();
var state__10226__auto__ = (function (){var statearr_12901 = f__10225__auto__.call(null);
(statearr_12901[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___12906);

return statearr_12901;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___12906,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args12923 = [];
var len__7322__auto___12997 = arguments.length;
var i__7323__auto___12998 = (0);
while(true){
if((i__7323__auto___12998 < len__7322__auto___12997)){
args12923.push((arguments[i__7323__auto___12998]));

var G__12999 = (i__7323__auto___12998 + (1));
i__7323__auto___12998 = G__12999;
continue;
} else {
}
break;
}

var G__12925 = args12923.length;
switch (G__12925) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args12923.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__10224__auto___13001 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__10224__auto___13001,out){
return (function (){
var f__10225__auto__ = (function (){var switch__10112__auto__ = ((function (c__10224__auto___13001,out){
return (function (state_12967){
var state_val_12968 = (state_12967[(1)]);
if((state_val_12968 === (7))){
var inst_12963 = (state_12967[(2)]);
var state_12967__$1 = state_12967;
var statearr_12969_13002 = state_12967__$1;
(statearr_12969_13002[(2)] = inst_12963);

(statearr_12969_13002[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12968 === (1))){
var inst_12926 = [];
var inst_12927 = inst_12926;
var inst_12928 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_12967__$1 = (function (){var statearr_12970 = state_12967;
(statearr_12970[(7)] = inst_12928);

(statearr_12970[(8)] = inst_12927);

return statearr_12970;
})();
var statearr_12971_13003 = state_12967__$1;
(statearr_12971_13003[(2)] = null);

(statearr_12971_13003[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12968 === (4))){
var inst_12931 = (state_12967[(9)]);
var inst_12931__$1 = (state_12967[(2)]);
var inst_12932 = (inst_12931__$1 == null);
var inst_12933 = cljs.core.not.call(null,inst_12932);
var state_12967__$1 = (function (){var statearr_12972 = state_12967;
(statearr_12972[(9)] = inst_12931__$1);

return statearr_12972;
})();
if(inst_12933){
var statearr_12973_13004 = state_12967__$1;
(statearr_12973_13004[(1)] = (5));

} else {
var statearr_12974_13005 = state_12967__$1;
(statearr_12974_13005[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12968 === (15))){
var inst_12957 = (state_12967[(2)]);
var state_12967__$1 = state_12967;
var statearr_12975_13006 = state_12967__$1;
(statearr_12975_13006[(2)] = inst_12957);

(statearr_12975_13006[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12968 === (13))){
var state_12967__$1 = state_12967;
var statearr_12976_13007 = state_12967__$1;
(statearr_12976_13007[(2)] = null);

(statearr_12976_13007[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12968 === (6))){
var inst_12927 = (state_12967[(8)]);
var inst_12952 = inst_12927.length;
var inst_12953 = (inst_12952 > (0));
var state_12967__$1 = state_12967;
if(cljs.core.truth_(inst_12953)){
var statearr_12977_13008 = state_12967__$1;
(statearr_12977_13008[(1)] = (12));

} else {
var statearr_12978_13009 = state_12967__$1;
(statearr_12978_13009[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12968 === (3))){
var inst_12965 = (state_12967[(2)]);
var state_12967__$1 = state_12967;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_12967__$1,inst_12965);
} else {
if((state_val_12968 === (12))){
var inst_12927 = (state_12967[(8)]);
var inst_12955 = cljs.core.vec.call(null,inst_12927);
var state_12967__$1 = state_12967;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12967__$1,(15),out,inst_12955);
} else {
if((state_val_12968 === (2))){
var state_12967__$1 = state_12967;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_12967__$1,(4),ch);
} else {
if((state_val_12968 === (11))){
var inst_12931 = (state_12967[(9)]);
var inst_12935 = (state_12967[(10)]);
var inst_12945 = (state_12967[(2)]);
var inst_12946 = [];
var inst_12947 = inst_12946.push(inst_12931);
var inst_12927 = inst_12946;
var inst_12928 = inst_12935;
var state_12967__$1 = (function (){var statearr_12979 = state_12967;
(statearr_12979[(7)] = inst_12928);

(statearr_12979[(11)] = inst_12947);

(statearr_12979[(12)] = inst_12945);

(statearr_12979[(8)] = inst_12927);

return statearr_12979;
})();
var statearr_12980_13010 = state_12967__$1;
(statearr_12980_13010[(2)] = null);

(statearr_12980_13010[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12968 === (9))){
var inst_12927 = (state_12967[(8)]);
var inst_12943 = cljs.core.vec.call(null,inst_12927);
var state_12967__$1 = state_12967;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_12967__$1,(11),out,inst_12943);
} else {
if((state_val_12968 === (5))){
var inst_12928 = (state_12967[(7)]);
var inst_12931 = (state_12967[(9)]);
var inst_12935 = (state_12967[(10)]);
var inst_12935__$1 = f.call(null,inst_12931);
var inst_12936 = cljs.core._EQ_.call(null,inst_12935__$1,inst_12928);
var inst_12937 = cljs.core.keyword_identical_QMARK_.call(null,inst_12928,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_12938 = (inst_12936) || (inst_12937);
var state_12967__$1 = (function (){var statearr_12981 = state_12967;
(statearr_12981[(10)] = inst_12935__$1);

return statearr_12981;
})();
if(cljs.core.truth_(inst_12938)){
var statearr_12982_13011 = state_12967__$1;
(statearr_12982_13011[(1)] = (8));

} else {
var statearr_12983_13012 = state_12967__$1;
(statearr_12983_13012[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12968 === (14))){
var inst_12960 = (state_12967[(2)]);
var inst_12961 = cljs.core.async.close_BANG_.call(null,out);
var state_12967__$1 = (function (){var statearr_12985 = state_12967;
(statearr_12985[(13)] = inst_12960);

return statearr_12985;
})();
var statearr_12986_13013 = state_12967__$1;
(statearr_12986_13013[(2)] = inst_12961);

(statearr_12986_13013[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12968 === (10))){
var inst_12950 = (state_12967[(2)]);
var state_12967__$1 = state_12967;
var statearr_12987_13014 = state_12967__$1;
(statearr_12987_13014[(2)] = inst_12950);

(statearr_12987_13014[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_12968 === (8))){
var inst_12927 = (state_12967[(8)]);
var inst_12931 = (state_12967[(9)]);
var inst_12935 = (state_12967[(10)]);
var inst_12940 = inst_12927.push(inst_12931);
var tmp12984 = inst_12927;
var inst_12927__$1 = tmp12984;
var inst_12928 = inst_12935;
var state_12967__$1 = (function (){var statearr_12988 = state_12967;
(statearr_12988[(7)] = inst_12928);

(statearr_12988[(8)] = inst_12927__$1);

(statearr_12988[(14)] = inst_12940);

return statearr_12988;
})();
var statearr_12989_13015 = state_12967__$1;
(statearr_12989_13015[(2)] = null);

(statearr_12989_13015[(1)] = (2));


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
});})(c__10224__auto___13001,out))
;
return ((function (switch__10112__auto__,c__10224__auto___13001,out){
return (function() {
var cljs$core$async$state_machine__10113__auto__ = null;
var cljs$core$async$state_machine__10113__auto____0 = (function (){
var statearr_12993 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_12993[(0)] = cljs$core$async$state_machine__10113__auto__);

(statearr_12993[(1)] = (1));

return statearr_12993;
});
var cljs$core$async$state_machine__10113__auto____1 = (function (state_12967){
while(true){
var ret_value__10114__auto__ = (function (){try{while(true){
var result__10115__auto__ = switch__10112__auto__.call(null,state_12967);
if(cljs.core.keyword_identical_QMARK_.call(null,result__10115__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__10115__auto__;
}
break;
}
}catch (e12994){if((e12994 instanceof Object)){
var ex__10116__auto__ = e12994;
var statearr_12995_13016 = state_12967;
(statearr_12995_13016[(5)] = ex__10116__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_12967);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e12994;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__10114__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__13017 = state_12967;
state_12967 = G__13017;
continue;
} else {
return ret_value__10114__auto__;
}
break;
}
});
cljs$core$async$state_machine__10113__auto__ = function(state_12967){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__10113__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__10113__auto____1.call(this,state_12967);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__10113__auto____0;
cljs$core$async$state_machine__10113__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__10113__auto____1;
return cljs$core$async$state_machine__10113__auto__;
})()
;})(switch__10112__auto__,c__10224__auto___13001,out))
})();
var state__10226__auto__ = (function (){var statearr_12996 = f__10225__auto__.call(null);
(statearr_12996[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__10224__auto___13001);

return statearr_12996;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__10226__auto__);
});})(c__10224__auto___13001,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;


//# sourceMappingURL=async.js.map