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
var args8386 = [];
var len__27348__auto___8392 = arguments.length;
var i__27349__auto___8393 = (0);
while(true){
if((i__27349__auto___8393 < len__27348__auto___8392)){
args8386.push((arguments[i__27349__auto___8393]));

var G__8394 = (i__27349__auto___8393 + (1));
i__27349__auto___8393 = G__8394;
continue;
} else {
}
break;
}

var G__8388 = args8386.length;
switch (G__8388) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8386.length)].join('')));

}
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.call(null,f,true);
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if(typeof cljs.core.async.t_cljs$core$async8389 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async8389 = (function (f,blockable,meta8390){
this.f = f;
this.blockable = blockable;
this.meta8390 = meta8390;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async8389.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_8391,meta8390__$1){
var self__ = this;
var _8391__$1 = this;
return (new cljs.core.async.t_cljs$core$async8389(self__.f,self__.blockable,meta8390__$1));
});

cljs.core.async.t_cljs$core$async8389.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_8391){
var self__ = this;
var _8391__$1 = this;
return self__.meta8390;
});

cljs.core.async.t_cljs$core$async8389.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async8389.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async8389.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
});

cljs.core.async.t_cljs$core$async8389.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async8389.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta8390","meta8390",-1332101074,null)], null);
});

cljs.core.async.t_cljs$core$async8389.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async8389.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async8389";

cljs.core.async.t_cljs$core$async8389.cljs$lang$ctorPrWriter = (function (this__27047__auto__,writer__27048__auto__,opt__27049__auto__){
return cljs.core._write.call(null,writer__27048__auto__,"cljs.core.async/t_cljs$core$async8389");
});

cljs.core.async.__GT_t_cljs$core$async8389 = (function cljs$core$async$__GT_t_cljs$core$async8389(f__$1,blockable__$1,meta8390){
return (new cljs.core.async.t_cljs$core$async8389(f__$1,blockable__$1,meta8390));
});

}

return (new cljs.core.async.t_cljs$core$async8389(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
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
var args8398 = [];
var len__27348__auto___8401 = arguments.length;
var i__27349__auto___8402 = (0);
while(true){
if((i__27349__auto___8402 < len__27348__auto___8401)){
args8398.push((arguments[i__27349__auto___8402]));

var G__8403 = (i__27349__auto___8402 + (1));
i__27349__auto___8402 = G__8403;
continue;
} else {
}
break;
}

var G__8400 = args8398.length;
switch (G__8400) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8398.length)].join('')));

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
var args8405 = [];
var len__27348__auto___8408 = arguments.length;
var i__27349__auto___8409 = (0);
while(true){
if((i__27349__auto___8409 < len__27348__auto___8408)){
args8405.push((arguments[i__27349__auto___8409]));

var G__8410 = (i__27349__auto___8409 + (1));
i__27349__auto___8409 = G__8410;
continue;
} else {
}
break;
}

var G__8407 = args8405.length;
switch (G__8407) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8405.length)].join('')));

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
var args8412 = [];
var len__27348__auto___8415 = arguments.length;
var i__27349__auto___8416 = (0);
while(true){
if((i__27349__auto___8416 < len__27348__auto___8415)){
args8412.push((arguments[i__27349__auto___8416]));

var G__8417 = (i__27349__auto___8416 + (1));
i__27349__auto___8416 = G__8417;
continue;
} else {
}
break;
}

var G__8414 = args8412.length;
switch (G__8414) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8412.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_8419 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_8419);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_8419,ret){
return (function (){
return fn1.call(null,val_8419);
});})(val_8419,ret))
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
var args8420 = [];
var len__27348__auto___8423 = arguments.length;
var i__27349__auto___8424 = (0);
while(true){
if((i__27349__auto___8424 < len__27348__auto___8423)){
args8420.push((arguments[i__27349__auto___8424]));

var G__8425 = (i__27349__auto___8424 + (1));
i__27349__auto___8424 = G__8425;
continue;
} else {
}
break;
}

var G__8422 = args8420.length;
switch (G__8422) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8420.length)].join('')));

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
var n__27256__auto___8427 = n;
var x_8428 = (0);
while(true){
if((x_8428 < n__27256__auto___8427)){
(a[x_8428] = (0));

var G__8429 = (x_8428 + (1));
x_8428 = G__8429;
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

var G__8430 = (i + (1));
i = G__8430;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t_cljs$core$async8434 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async8434 = (function (alt_flag,flag,meta8435){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta8435 = meta8435;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async8434.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_8436,meta8435__$1){
var self__ = this;
var _8436__$1 = this;
return (new cljs.core.async.t_cljs$core$async8434(self__.alt_flag,self__.flag,meta8435__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async8434.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_8436){
var self__ = this;
var _8436__$1 = this;
return self__.meta8435;
});})(flag))
;

cljs.core.async.t_cljs$core$async8434.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async8434.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async8434.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async8434.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async8434.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta8435","meta8435",1089826330,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async8434.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async8434.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async8434";

cljs.core.async.t_cljs$core$async8434.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__27047__auto__,writer__27048__auto__,opt__27049__auto__){
return cljs.core._write.call(null,writer__27048__auto__,"cljs.core.async/t_cljs$core$async8434");
});})(flag))
;

cljs.core.async.__GT_t_cljs$core$async8434 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async8434(alt_flag__$1,flag__$1,meta8435){
return (new cljs.core.async.t_cljs$core$async8434(alt_flag__$1,flag__$1,meta8435));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async8434(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t_cljs$core$async8440 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async8440 = (function (alt_handler,flag,cb,meta8441){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta8441 = meta8441;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async8440.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_8442,meta8441__$1){
var self__ = this;
var _8442__$1 = this;
return (new cljs.core.async.t_cljs$core$async8440(self__.alt_handler,self__.flag,self__.cb,meta8441__$1));
});

cljs.core.async.t_cljs$core$async8440.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_8442){
var self__ = this;
var _8442__$1 = this;
return self__.meta8441;
});

cljs.core.async.t_cljs$core$async8440.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async8440.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async8440.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async8440.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async8440.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta8441","meta8441",1142816580,null)], null);
});

cljs.core.async.t_cljs$core$async8440.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async8440.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async8440";

cljs.core.async.t_cljs$core$async8440.cljs$lang$ctorPrWriter = (function (this__27047__auto__,writer__27048__auto__,opt__27049__auto__){
return cljs.core._write.call(null,writer__27048__auto__,"cljs.core.async/t_cljs$core$async8440");
});

cljs.core.async.__GT_t_cljs$core$async8440 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async8440(alt_handler__$1,flag__$1,cb__$1,meta8441){
return (new cljs.core.async.t_cljs$core$async8440(alt_handler__$1,flag__$1,cb__$1,meta8441));
});

}

return (new cljs.core.async.t_cljs$core$async8440(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
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
return (function (p1__8443_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__8443_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__8444_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__8444_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__26817__auto__ = wport;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return port;
}
})()], null));
} else {
var G__8445 = (i + (1));
i = G__8445;
continue;
}
} else {
return null;
}
break;
}
})();
var or__26817__auto__ = ret;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4657__auto__ = (function (){var and__26809__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__26809__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__26809__auto__;
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
var args__27351__auto__ = [];
var len__27348__auto___8451 = arguments.length;
var i__27349__auto___8452 = (0);
while(true){
if((i__27349__auto___8452 < len__27348__auto___8451)){
args__27351__auto__.push((arguments[i__27349__auto___8452]));

var G__8453 = (i__27349__auto___8452 + (1));
i__27349__auto___8452 = G__8453;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__8448){
var map__8449 = p__8448;
var map__8449__$1 = ((((!((map__8449 == null)))?((((map__8449.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8449.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8449):map__8449);
var opts = map__8449__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq8446){
var G__8447 = cljs.core.first.call(null,seq8446);
var seq8446__$1 = cljs.core.next.call(null,seq8446);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__8447,seq8446__$1);
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
var args8454 = [];
var len__27348__auto___8504 = arguments.length;
var i__27349__auto___8505 = (0);
while(true){
if((i__27349__auto___8505 < len__27348__auto___8504)){
args8454.push((arguments[i__27349__auto___8505]));

var G__8506 = (i__27349__auto___8505 + (1));
i__27349__auto___8505 = G__8506;
continue;
} else {
}
break;
}

var G__8456 = args8454.length;
switch (G__8456) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8454.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__8341__auto___8508 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___8508){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___8508){
return (function (state_8480){
var state_val_8481 = (state_8480[(1)]);
if((state_val_8481 === (7))){
var inst_8476 = (state_8480[(2)]);
var state_8480__$1 = state_8480;
var statearr_8482_8509 = state_8480__$1;
(statearr_8482_8509[(2)] = inst_8476);

(statearr_8482_8509[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8481 === (1))){
var state_8480__$1 = state_8480;
var statearr_8483_8510 = state_8480__$1;
(statearr_8483_8510[(2)] = null);

(statearr_8483_8510[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8481 === (4))){
var inst_8459 = (state_8480[(7)]);
var inst_8459__$1 = (state_8480[(2)]);
var inst_8460 = (inst_8459__$1 == null);
var state_8480__$1 = (function (){var statearr_8484 = state_8480;
(statearr_8484[(7)] = inst_8459__$1);

return statearr_8484;
})();
if(cljs.core.truth_(inst_8460)){
var statearr_8485_8511 = state_8480__$1;
(statearr_8485_8511[(1)] = (5));

} else {
var statearr_8486_8512 = state_8480__$1;
(statearr_8486_8512[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8481 === (13))){
var state_8480__$1 = state_8480;
var statearr_8487_8513 = state_8480__$1;
(statearr_8487_8513[(2)] = null);

(statearr_8487_8513[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8481 === (6))){
var inst_8459 = (state_8480[(7)]);
var state_8480__$1 = state_8480;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_8480__$1,(11),to,inst_8459);
} else {
if((state_val_8481 === (3))){
var inst_8478 = (state_8480[(2)]);
var state_8480__$1 = state_8480;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8480__$1,inst_8478);
} else {
if((state_val_8481 === (12))){
var state_8480__$1 = state_8480;
var statearr_8488_8514 = state_8480__$1;
(statearr_8488_8514[(2)] = null);

(statearr_8488_8514[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8481 === (2))){
var state_8480__$1 = state_8480;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8480__$1,(4),from);
} else {
if((state_val_8481 === (11))){
var inst_8469 = (state_8480[(2)]);
var state_8480__$1 = state_8480;
if(cljs.core.truth_(inst_8469)){
var statearr_8489_8515 = state_8480__$1;
(statearr_8489_8515[(1)] = (12));

} else {
var statearr_8490_8516 = state_8480__$1;
(statearr_8490_8516[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8481 === (9))){
var state_8480__$1 = state_8480;
var statearr_8491_8517 = state_8480__$1;
(statearr_8491_8517[(2)] = null);

(statearr_8491_8517[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8481 === (5))){
var state_8480__$1 = state_8480;
if(cljs.core.truth_(close_QMARK_)){
var statearr_8492_8518 = state_8480__$1;
(statearr_8492_8518[(1)] = (8));

} else {
var statearr_8493_8519 = state_8480__$1;
(statearr_8493_8519[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8481 === (14))){
var inst_8474 = (state_8480[(2)]);
var state_8480__$1 = state_8480;
var statearr_8494_8520 = state_8480__$1;
(statearr_8494_8520[(2)] = inst_8474);

(statearr_8494_8520[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8481 === (10))){
var inst_8466 = (state_8480[(2)]);
var state_8480__$1 = state_8480;
var statearr_8495_8521 = state_8480__$1;
(statearr_8495_8521[(2)] = inst_8466);

(statearr_8495_8521[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8481 === (8))){
var inst_8463 = cljs.core.async.close_BANG_.call(null,to);
var state_8480__$1 = state_8480;
var statearr_8496_8522 = state_8480__$1;
(statearr_8496_8522[(2)] = inst_8463);

(statearr_8496_8522[(1)] = (10));


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
});})(c__8341__auto___8508))
;
return ((function (switch__8229__auto__,c__8341__auto___8508){
return (function() {
var cljs$core$async$state_machine__8230__auto__ = null;
var cljs$core$async$state_machine__8230__auto____0 = (function (){
var statearr_8500 = [null,null,null,null,null,null,null,null];
(statearr_8500[(0)] = cljs$core$async$state_machine__8230__auto__);

(statearr_8500[(1)] = (1));

return statearr_8500;
});
var cljs$core$async$state_machine__8230__auto____1 = (function (state_8480){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_8480);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e8501){if((e8501 instanceof Object)){
var ex__8233__auto__ = e8501;
var statearr_8502_8523 = state_8480;
(statearr_8502_8523[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_8480);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e8501;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8524 = state_8480;
state_8480 = G__8524;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$state_machine__8230__auto__ = function(state_8480){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__8230__auto____1.call(this,state_8480);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__8230__auto____0;
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__8230__auto____1;
return cljs$core$async$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___8508))
})();
var state__8343__auto__ = (function (){var statearr_8503 = f__8342__auto__.call(null);
(statearr_8503[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___8508);

return statearr_8503;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___8508))
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
return (function (p__8712){
var vec__8713 = p__8712;
var v = cljs.core.nth.call(null,vec__8713,(0),null);
var p = cljs.core.nth.call(null,vec__8713,(1),null);
var job = vec__8713;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__8341__auto___8899 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___8899,res,vec__8713,v,p,job,jobs,results){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___8899,res,vec__8713,v,p,job,jobs,results){
return (function (state_8720){
var state_val_8721 = (state_8720[(1)]);
if((state_val_8721 === (1))){
var state_8720__$1 = state_8720;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_8720__$1,(2),res,v);
} else {
if((state_val_8721 === (2))){
var inst_8717 = (state_8720[(2)]);
var inst_8718 = cljs.core.async.close_BANG_.call(null,res);
var state_8720__$1 = (function (){var statearr_8722 = state_8720;
(statearr_8722[(7)] = inst_8717);

return statearr_8722;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8720__$1,inst_8718);
} else {
return null;
}
}
});})(c__8341__auto___8899,res,vec__8713,v,p,job,jobs,results))
;
return ((function (switch__8229__auto__,c__8341__auto___8899,res,vec__8713,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0 = (function (){
var statearr_8726 = [null,null,null,null,null,null,null,null];
(statearr_8726[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__);

(statearr_8726[(1)] = (1));

return statearr_8726;
});
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1 = (function (state_8720){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_8720);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e8727){if((e8727 instanceof Object)){
var ex__8233__auto__ = e8727;
var statearr_8728_8900 = state_8720;
(statearr_8728_8900[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_8720);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e8727;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8901 = state_8720;
state_8720 = G__8901;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__ = function(state_8720){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1.call(this,state_8720);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___8899,res,vec__8713,v,p,job,jobs,results))
})();
var state__8343__auto__ = (function (){var statearr_8729 = f__8342__auto__.call(null);
(statearr_8729[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___8899);

return statearr_8729;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___8899,res,vec__8713,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__8730){
var vec__8731 = p__8730;
var v = cljs.core.nth.call(null,vec__8731,(0),null);
var p = cljs.core.nth.call(null,vec__8731,(1),null);
var job = vec__8731;
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
var n__27256__auto___8902 = n;
var __8903 = (0);
while(true){
if((__8903 < n__27256__auto___8902)){
var G__8734_8904 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__8734_8904) {
case "compute":
var c__8341__auto___8906 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__8903,c__8341__auto___8906,G__8734_8904,n__27256__auto___8902,jobs,results,process,async){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (__8903,c__8341__auto___8906,G__8734_8904,n__27256__auto___8902,jobs,results,process,async){
return (function (state_8747){
var state_val_8748 = (state_8747[(1)]);
if((state_val_8748 === (1))){
var state_8747__$1 = state_8747;
var statearr_8749_8907 = state_8747__$1;
(statearr_8749_8907[(2)] = null);

(statearr_8749_8907[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8748 === (2))){
var state_8747__$1 = state_8747;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8747__$1,(4),jobs);
} else {
if((state_val_8748 === (3))){
var inst_8745 = (state_8747[(2)]);
var state_8747__$1 = state_8747;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8747__$1,inst_8745);
} else {
if((state_val_8748 === (4))){
var inst_8737 = (state_8747[(2)]);
var inst_8738 = process.call(null,inst_8737);
var state_8747__$1 = state_8747;
if(cljs.core.truth_(inst_8738)){
var statearr_8750_8908 = state_8747__$1;
(statearr_8750_8908[(1)] = (5));

} else {
var statearr_8751_8909 = state_8747__$1;
(statearr_8751_8909[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8748 === (5))){
var state_8747__$1 = state_8747;
var statearr_8752_8910 = state_8747__$1;
(statearr_8752_8910[(2)] = null);

(statearr_8752_8910[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8748 === (6))){
var state_8747__$1 = state_8747;
var statearr_8753_8911 = state_8747__$1;
(statearr_8753_8911[(2)] = null);

(statearr_8753_8911[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8748 === (7))){
var inst_8743 = (state_8747[(2)]);
var state_8747__$1 = state_8747;
var statearr_8754_8912 = state_8747__$1;
(statearr_8754_8912[(2)] = inst_8743);

(statearr_8754_8912[(1)] = (3));


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
});})(__8903,c__8341__auto___8906,G__8734_8904,n__27256__auto___8902,jobs,results,process,async))
;
return ((function (__8903,switch__8229__auto__,c__8341__auto___8906,G__8734_8904,n__27256__auto___8902,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0 = (function (){
var statearr_8758 = [null,null,null,null,null,null,null];
(statearr_8758[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__);

(statearr_8758[(1)] = (1));

return statearr_8758;
});
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1 = (function (state_8747){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_8747);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e8759){if((e8759 instanceof Object)){
var ex__8233__auto__ = e8759;
var statearr_8760_8913 = state_8747;
(statearr_8760_8913[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_8747);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e8759;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8914 = state_8747;
state_8747 = G__8914;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__ = function(state_8747){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1.call(this,state_8747);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__;
})()
;})(__8903,switch__8229__auto__,c__8341__auto___8906,G__8734_8904,n__27256__auto___8902,jobs,results,process,async))
})();
var state__8343__auto__ = (function (){var statearr_8761 = f__8342__auto__.call(null);
(statearr_8761[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___8906);

return statearr_8761;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(__8903,c__8341__auto___8906,G__8734_8904,n__27256__auto___8902,jobs,results,process,async))
);


break;
case "async":
var c__8341__auto___8915 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__8903,c__8341__auto___8915,G__8734_8904,n__27256__auto___8902,jobs,results,process,async){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (__8903,c__8341__auto___8915,G__8734_8904,n__27256__auto___8902,jobs,results,process,async){
return (function (state_8774){
var state_val_8775 = (state_8774[(1)]);
if((state_val_8775 === (1))){
var state_8774__$1 = state_8774;
var statearr_8776_8916 = state_8774__$1;
(statearr_8776_8916[(2)] = null);

(statearr_8776_8916[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8775 === (2))){
var state_8774__$1 = state_8774;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8774__$1,(4),jobs);
} else {
if((state_val_8775 === (3))){
var inst_8772 = (state_8774[(2)]);
var state_8774__$1 = state_8774;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8774__$1,inst_8772);
} else {
if((state_val_8775 === (4))){
var inst_8764 = (state_8774[(2)]);
var inst_8765 = async.call(null,inst_8764);
var state_8774__$1 = state_8774;
if(cljs.core.truth_(inst_8765)){
var statearr_8777_8917 = state_8774__$1;
(statearr_8777_8917[(1)] = (5));

} else {
var statearr_8778_8918 = state_8774__$1;
(statearr_8778_8918[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8775 === (5))){
var state_8774__$1 = state_8774;
var statearr_8779_8919 = state_8774__$1;
(statearr_8779_8919[(2)] = null);

(statearr_8779_8919[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8775 === (6))){
var state_8774__$1 = state_8774;
var statearr_8780_8920 = state_8774__$1;
(statearr_8780_8920[(2)] = null);

(statearr_8780_8920[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8775 === (7))){
var inst_8770 = (state_8774[(2)]);
var state_8774__$1 = state_8774;
var statearr_8781_8921 = state_8774__$1;
(statearr_8781_8921[(2)] = inst_8770);

(statearr_8781_8921[(1)] = (3));


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
});})(__8903,c__8341__auto___8915,G__8734_8904,n__27256__auto___8902,jobs,results,process,async))
;
return ((function (__8903,switch__8229__auto__,c__8341__auto___8915,G__8734_8904,n__27256__auto___8902,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0 = (function (){
var statearr_8785 = [null,null,null,null,null,null,null];
(statearr_8785[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__);

(statearr_8785[(1)] = (1));

return statearr_8785;
});
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1 = (function (state_8774){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_8774);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e8786){if((e8786 instanceof Object)){
var ex__8233__auto__ = e8786;
var statearr_8787_8922 = state_8774;
(statearr_8787_8922[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_8774);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e8786;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8923 = state_8774;
state_8774 = G__8923;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__ = function(state_8774){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1.call(this,state_8774);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__;
})()
;})(__8903,switch__8229__auto__,c__8341__auto___8915,G__8734_8904,n__27256__auto___8902,jobs,results,process,async))
})();
var state__8343__auto__ = (function (){var statearr_8788 = f__8342__auto__.call(null);
(statearr_8788[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___8915);

return statearr_8788;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(__8903,c__8341__auto___8915,G__8734_8904,n__27256__auto___8902,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__8924 = (__8903 + (1));
__8903 = G__8924;
continue;
} else {
}
break;
}

var c__8341__auto___8925 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___8925,jobs,results,process,async){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___8925,jobs,results,process,async){
return (function (state_8810){
var state_val_8811 = (state_8810[(1)]);
if((state_val_8811 === (1))){
var state_8810__$1 = state_8810;
var statearr_8812_8926 = state_8810__$1;
(statearr_8812_8926[(2)] = null);

(statearr_8812_8926[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8811 === (2))){
var state_8810__$1 = state_8810;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8810__$1,(4),from);
} else {
if((state_val_8811 === (3))){
var inst_8808 = (state_8810[(2)]);
var state_8810__$1 = state_8810;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8810__$1,inst_8808);
} else {
if((state_val_8811 === (4))){
var inst_8791 = (state_8810[(7)]);
var inst_8791__$1 = (state_8810[(2)]);
var inst_8792 = (inst_8791__$1 == null);
var state_8810__$1 = (function (){var statearr_8813 = state_8810;
(statearr_8813[(7)] = inst_8791__$1);

return statearr_8813;
})();
if(cljs.core.truth_(inst_8792)){
var statearr_8814_8927 = state_8810__$1;
(statearr_8814_8927[(1)] = (5));

} else {
var statearr_8815_8928 = state_8810__$1;
(statearr_8815_8928[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8811 === (5))){
var inst_8794 = cljs.core.async.close_BANG_.call(null,jobs);
var state_8810__$1 = state_8810;
var statearr_8816_8929 = state_8810__$1;
(statearr_8816_8929[(2)] = inst_8794);

(statearr_8816_8929[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8811 === (6))){
var inst_8796 = (state_8810[(8)]);
var inst_8791 = (state_8810[(7)]);
var inst_8796__$1 = cljs.core.async.chan.call(null,(1));
var inst_8797 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_8798 = [inst_8791,inst_8796__$1];
var inst_8799 = (new cljs.core.PersistentVector(null,2,(5),inst_8797,inst_8798,null));
var state_8810__$1 = (function (){var statearr_8817 = state_8810;
(statearr_8817[(8)] = inst_8796__$1);

return statearr_8817;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_8810__$1,(8),jobs,inst_8799);
} else {
if((state_val_8811 === (7))){
var inst_8806 = (state_8810[(2)]);
var state_8810__$1 = state_8810;
var statearr_8818_8930 = state_8810__$1;
(statearr_8818_8930[(2)] = inst_8806);

(statearr_8818_8930[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8811 === (8))){
var inst_8796 = (state_8810[(8)]);
var inst_8801 = (state_8810[(2)]);
var state_8810__$1 = (function (){var statearr_8819 = state_8810;
(statearr_8819[(9)] = inst_8801);

return statearr_8819;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_8810__$1,(9),results,inst_8796);
} else {
if((state_val_8811 === (9))){
var inst_8803 = (state_8810[(2)]);
var state_8810__$1 = (function (){var statearr_8820 = state_8810;
(statearr_8820[(10)] = inst_8803);

return statearr_8820;
})();
var statearr_8821_8931 = state_8810__$1;
(statearr_8821_8931[(2)] = null);

(statearr_8821_8931[(1)] = (2));


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
});})(c__8341__auto___8925,jobs,results,process,async))
;
return ((function (switch__8229__auto__,c__8341__auto___8925,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0 = (function (){
var statearr_8825 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_8825[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__);

(statearr_8825[(1)] = (1));

return statearr_8825;
});
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1 = (function (state_8810){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_8810);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e8826){if((e8826 instanceof Object)){
var ex__8233__auto__ = e8826;
var statearr_8827_8932 = state_8810;
(statearr_8827_8932[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_8810);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e8826;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8933 = state_8810;
state_8810 = G__8933;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__ = function(state_8810){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1.call(this,state_8810);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___8925,jobs,results,process,async))
})();
var state__8343__auto__ = (function (){var statearr_8828 = f__8342__auto__.call(null);
(statearr_8828[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___8925);

return statearr_8828;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___8925,jobs,results,process,async))
);


var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__,jobs,results,process,async){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__,jobs,results,process,async){
return (function (state_8866){
var state_val_8867 = (state_8866[(1)]);
if((state_val_8867 === (7))){
var inst_8862 = (state_8866[(2)]);
var state_8866__$1 = state_8866;
var statearr_8868_8934 = state_8866__$1;
(statearr_8868_8934[(2)] = inst_8862);

(statearr_8868_8934[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (20))){
var state_8866__$1 = state_8866;
var statearr_8869_8935 = state_8866__$1;
(statearr_8869_8935[(2)] = null);

(statearr_8869_8935[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (1))){
var state_8866__$1 = state_8866;
var statearr_8870_8936 = state_8866__$1;
(statearr_8870_8936[(2)] = null);

(statearr_8870_8936[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (4))){
var inst_8831 = (state_8866[(7)]);
var inst_8831__$1 = (state_8866[(2)]);
var inst_8832 = (inst_8831__$1 == null);
var state_8866__$1 = (function (){var statearr_8871 = state_8866;
(statearr_8871[(7)] = inst_8831__$1);

return statearr_8871;
})();
if(cljs.core.truth_(inst_8832)){
var statearr_8872_8937 = state_8866__$1;
(statearr_8872_8937[(1)] = (5));

} else {
var statearr_8873_8938 = state_8866__$1;
(statearr_8873_8938[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (15))){
var inst_8844 = (state_8866[(8)]);
var state_8866__$1 = state_8866;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_8866__$1,(18),to,inst_8844);
} else {
if((state_val_8867 === (21))){
var inst_8857 = (state_8866[(2)]);
var state_8866__$1 = state_8866;
var statearr_8874_8939 = state_8866__$1;
(statearr_8874_8939[(2)] = inst_8857);

(statearr_8874_8939[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (13))){
var inst_8859 = (state_8866[(2)]);
var state_8866__$1 = (function (){var statearr_8875 = state_8866;
(statearr_8875[(9)] = inst_8859);

return statearr_8875;
})();
var statearr_8876_8940 = state_8866__$1;
(statearr_8876_8940[(2)] = null);

(statearr_8876_8940[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (6))){
var inst_8831 = (state_8866[(7)]);
var state_8866__$1 = state_8866;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8866__$1,(11),inst_8831);
} else {
if((state_val_8867 === (17))){
var inst_8852 = (state_8866[(2)]);
var state_8866__$1 = state_8866;
if(cljs.core.truth_(inst_8852)){
var statearr_8877_8941 = state_8866__$1;
(statearr_8877_8941[(1)] = (19));

} else {
var statearr_8878_8942 = state_8866__$1;
(statearr_8878_8942[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (3))){
var inst_8864 = (state_8866[(2)]);
var state_8866__$1 = state_8866;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8866__$1,inst_8864);
} else {
if((state_val_8867 === (12))){
var inst_8841 = (state_8866[(10)]);
var state_8866__$1 = state_8866;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8866__$1,(14),inst_8841);
} else {
if((state_val_8867 === (2))){
var state_8866__$1 = state_8866;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8866__$1,(4),results);
} else {
if((state_val_8867 === (19))){
var state_8866__$1 = state_8866;
var statearr_8879_8943 = state_8866__$1;
(statearr_8879_8943[(2)] = null);

(statearr_8879_8943[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (11))){
var inst_8841 = (state_8866[(2)]);
var state_8866__$1 = (function (){var statearr_8880 = state_8866;
(statearr_8880[(10)] = inst_8841);

return statearr_8880;
})();
var statearr_8881_8944 = state_8866__$1;
(statearr_8881_8944[(2)] = null);

(statearr_8881_8944[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (9))){
var state_8866__$1 = state_8866;
var statearr_8882_8945 = state_8866__$1;
(statearr_8882_8945[(2)] = null);

(statearr_8882_8945[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (5))){
var state_8866__$1 = state_8866;
if(cljs.core.truth_(close_QMARK_)){
var statearr_8883_8946 = state_8866__$1;
(statearr_8883_8946[(1)] = (8));

} else {
var statearr_8884_8947 = state_8866__$1;
(statearr_8884_8947[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (14))){
var inst_8844 = (state_8866[(8)]);
var inst_8846 = (state_8866[(11)]);
var inst_8844__$1 = (state_8866[(2)]);
var inst_8845 = (inst_8844__$1 == null);
var inst_8846__$1 = cljs.core.not.call(null,inst_8845);
var state_8866__$1 = (function (){var statearr_8885 = state_8866;
(statearr_8885[(8)] = inst_8844__$1);

(statearr_8885[(11)] = inst_8846__$1);

return statearr_8885;
})();
if(inst_8846__$1){
var statearr_8886_8948 = state_8866__$1;
(statearr_8886_8948[(1)] = (15));

} else {
var statearr_8887_8949 = state_8866__$1;
(statearr_8887_8949[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (16))){
var inst_8846 = (state_8866[(11)]);
var state_8866__$1 = state_8866;
var statearr_8888_8950 = state_8866__$1;
(statearr_8888_8950[(2)] = inst_8846);

(statearr_8888_8950[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (10))){
var inst_8838 = (state_8866[(2)]);
var state_8866__$1 = state_8866;
var statearr_8889_8951 = state_8866__$1;
(statearr_8889_8951[(2)] = inst_8838);

(statearr_8889_8951[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (18))){
var inst_8849 = (state_8866[(2)]);
var state_8866__$1 = state_8866;
var statearr_8890_8952 = state_8866__$1;
(statearr_8890_8952[(2)] = inst_8849);

(statearr_8890_8952[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8867 === (8))){
var inst_8835 = cljs.core.async.close_BANG_.call(null,to);
var state_8866__$1 = state_8866;
var statearr_8891_8953 = state_8866__$1;
(statearr_8891_8953[(2)] = inst_8835);

(statearr_8891_8953[(1)] = (10));


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
});})(c__8341__auto__,jobs,results,process,async))
;
return ((function (switch__8229__auto__,c__8341__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0 = (function (){
var statearr_8895 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_8895[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__);

(statearr_8895[(1)] = (1));

return statearr_8895;
});
var cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1 = (function (state_8866){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_8866);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e8896){if((e8896 instanceof Object)){
var ex__8233__auto__ = e8896;
var statearr_8897_8954 = state_8866;
(statearr_8897_8954[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_8866);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e8896;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8955 = state_8866;
state_8866 = G__8955;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__ = function(state_8866){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1.call(this,state_8866);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__8230__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__,jobs,results,process,async))
})();
var state__8343__auto__ = (function (){var statearr_8898 = f__8342__auto__.call(null);
(statearr_8898[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_8898;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__,jobs,results,process,async))
);

return c__8341__auto__;
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
var args8956 = [];
var len__27348__auto___8959 = arguments.length;
var i__27349__auto___8960 = (0);
while(true){
if((i__27349__auto___8960 < len__27348__auto___8959)){
args8956.push((arguments[i__27349__auto___8960]));

var G__8961 = (i__27349__auto___8960 + (1));
i__27349__auto___8960 = G__8961;
continue;
} else {
}
break;
}

var G__8958 = args8956.length;
switch (G__8958) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8956.length)].join('')));

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
var args8963 = [];
var len__27348__auto___8966 = arguments.length;
var i__27349__auto___8967 = (0);
while(true){
if((i__27349__auto___8967 < len__27348__auto___8966)){
args8963.push((arguments[i__27349__auto___8967]));

var G__8968 = (i__27349__auto___8967 + (1));
i__27349__auto___8967 = G__8968;
continue;
} else {
}
break;
}

var G__8965 = args8963.length;
switch (G__8965) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8963.length)].join('')));

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
var args8970 = [];
var len__27348__auto___9023 = arguments.length;
var i__27349__auto___9024 = (0);
while(true){
if((i__27349__auto___9024 < len__27348__auto___9023)){
args8970.push((arguments[i__27349__auto___9024]));

var G__9025 = (i__27349__auto___9024 + (1));
i__27349__auto___9024 = G__9025;
continue;
} else {
}
break;
}

var G__8972 = args8970.length;
switch (G__8972) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8970.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__8341__auto___9027 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___9027,tc,fc){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___9027,tc,fc){
return (function (state_8998){
var state_val_8999 = (state_8998[(1)]);
if((state_val_8999 === (7))){
var inst_8994 = (state_8998[(2)]);
var state_8998__$1 = state_8998;
var statearr_9000_9028 = state_8998__$1;
(statearr_9000_9028[(2)] = inst_8994);

(statearr_9000_9028[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8999 === (1))){
var state_8998__$1 = state_8998;
var statearr_9001_9029 = state_8998__$1;
(statearr_9001_9029[(2)] = null);

(statearr_9001_9029[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8999 === (4))){
var inst_8975 = (state_8998[(7)]);
var inst_8975__$1 = (state_8998[(2)]);
var inst_8976 = (inst_8975__$1 == null);
var state_8998__$1 = (function (){var statearr_9002 = state_8998;
(statearr_9002[(7)] = inst_8975__$1);

return statearr_9002;
})();
if(cljs.core.truth_(inst_8976)){
var statearr_9003_9030 = state_8998__$1;
(statearr_9003_9030[(1)] = (5));

} else {
var statearr_9004_9031 = state_8998__$1;
(statearr_9004_9031[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8999 === (13))){
var state_8998__$1 = state_8998;
var statearr_9005_9032 = state_8998__$1;
(statearr_9005_9032[(2)] = null);

(statearr_9005_9032[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8999 === (6))){
var inst_8975 = (state_8998[(7)]);
var inst_8981 = p.call(null,inst_8975);
var state_8998__$1 = state_8998;
if(cljs.core.truth_(inst_8981)){
var statearr_9006_9033 = state_8998__$1;
(statearr_9006_9033[(1)] = (9));

} else {
var statearr_9007_9034 = state_8998__$1;
(statearr_9007_9034[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8999 === (3))){
var inst_8996 = (state_8998[(2)]);
var state_8998__$1 = state_8998;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8998__$1,inst_8996);
} else {
if((state_val_8999 === (12))){
var state_8998__$1 = state_8998;
var statearr_9008_9035 = state_8998__$1;
(statearr_9008_9035[(2)] = null);

(statearr_9008_9035[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8999 === (2))){
var state_8998__$1 = state_8998;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8998__$1,(4),ch);
} else {
if((state_val_8999 === (11))){
var inst_8975 = (state_8998[(7)]);
var inst_8985 = (state_8998[(2)]);
var state_8998__$1 = state_8998;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_8998__$1,(8),inst_8985,inst_8975);
} else {
if((state_val_8999 === (9))){
var state_8998__$1 = state_8998;
var statearr_9009_9036 = state_8998__$1;
(statearr_9009_9036[(2)] = tc);

(statearr_9009_9036[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8999 === (5))){
var inst_8978 = cljs.core.async.close_BANG_.call(null,tc);
var inst_8979 = cljs.core.async.close_BANG_.call(null,fc);
var state_8998__$1 = (function (){var statearr_9010 = state_8998;
(statearr_9010[(8)] = inst_8978);

return statearr_9010;
})();
var statearr_9011_9037 = state_8998__$1;
(statearr_9011_9037[(2)] = inst_8979);

(statearr_9011_9037[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8999 === (14))){
var inst_8992 = (state_8998[(2)]);
var state_8998__$1 = state_8998;
var statearr_9012_9038 = state_8998__$1;
(statearr_9012_9038[(2)] = inst_8992);

(statearr_9012_9038[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8999 === (10))){
var state_8998__$1 = state_8998;
var statearr_9013_9039 = state_8998__$1;
(statearr_9013_9039[(2)] = fc);

(statearr_9013_9039[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8999 === (8))){
var inst_8987 = (state_8998[(2)]);
var state_8998__$1 = state_8998;
if(cljs.core.truth_(inst_8987)){
var statearr_9014_9040 = state_8998__$1;
(statearr_9014_9040[(1)] = (12));

} else {
var statearr_9015_9041 = state_8998__$1;
(statearr_9015_9041[(1)] = (13));

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
});})(c__8341__auto___9027,tc,fc))
;
return ((function (switch__8229__auto__,c__8341__auto___9027,tc,fc){
return (function() {
var cljs$core$async$state_machine__8230__auto__ = null;
var cljs$core$async$state_machine__8230__auto____0 = (function (){
var statearr_9019 = [null,null,null,null,null,null,null,null,null];
(statearr_9019[(0)] = cljs$core$async$state_machine__8230__auto__);

(statearr_9019[(1)] = (1));

return statearr_9019;
});
var cljs$core$async$state_machine__8230__auto____1 = (function (state_8998){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_8998);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e9020){if((e9020 instanceof Object)){
var ex__8233__auto__ = e9020;
var statearr_9021_9042 = state_8998;
(statearr_9021_9042[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_8998);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e9020;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__9043 = state_8998;
state_8998 = G__9043;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$state_machine__8230__auto__ = function(state_8998){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__8230__auto____1.call(this,state_8998);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__8230__auto____0;
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__8230__auto____1;
return cljs$core$async$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___9027,tc,fc))
})();
var state__8343__auto__ = (function (){var statearr_9022 = f__8342__auto__.call(null);
(statearr_9022[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___9027);

return statearr_9022;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___9027,tc,fc))
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
var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__){
return (function (state_9107){
var state_val_9108 = (state_9107[(1)]);
if((state_val_9108 === (7))){
var inst_9103 = (state_9107[(2)]);
var state_9107__$1 = state_9107;
var statearr_9109_9130 = state_9107__$1;
(statearr_9109_9130[(2)] = inst_9103);

(statearr_9109_9130[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9108 === (1))){
var inst_9087 = init;
var state_9107__$1 = (function (){var statearr_9110 = state_9107;
(statearr_9110[(7)] = inst_9087);

return statearr_9110;
})();
var statearr_9111_9131 = state_9107__$1;
(statearr_9111_9131[(2)] = null);

(statearr_9111_9131[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9108 === (4))){
var inst_9090 = (state_9107[(8)]);
var inst_9090__$1 = (state_9107[(2)]);
var inst_9091 = (inst_9090__$1 == null);
var state_9107__$1 = (function (){var statearr_9112 = state_9107;
(statearr_9112[(8)] = inst_9090__$1);

return statearr_9112;
})();
if(cljs.core.truth_(inst_9091)){
var statearr_9113_9132 = state_9107__$1;
(statearr_9113_9132[(1)] = (5));

} else {
var statearr_9114_9133 = state_9107__$1;
(statearr_9114_9133[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9108 === (6))){
var inst_9094 = (state_9107[(9)]);
var inst_9090 = (state_9107[(8)]);
var inst_9087 = (state_9107[(7)]);
var inst_9094__$1 = f.call(null,inst_9087,inst_9090);
var inst_9095 = cljs.core.reduced_QMARK_.call(null,inst_9094__$1);
var state_9107__$1 = (function (){var statearr_9115 = state_9107;
(statearr_9115[(9)] = inst_9094__$1);

return statearr_9115;
})();
if(inst_9095){
var statearr_9116_9134 = state_9107__$1;
(statearr_9116_9134[(1)] = (8));

} else {
var statearr_9117_9135 = state_9107__$1;
(statearr_9117_9135[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9108 === (3))){
var inst_9105 = (state_9107[(2)]);
var state_9107__$1 = state_9107;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_9107__$1,inst_9105);
} else {
if((state_val_9108 === (2))){
var state_9107__$1 = state_9107;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_9107__$1,(4),ch);
} else {
if((state_val_9108 === (9))){
var inst_9094 = (state_9107[(9)]);
var inst_9087 = inst_9094;
var state_9107__$1 = (function (){var statearr_9118 = state_9107;
(statearr_9118[(7)] = inst_9087);

return statearr_9118;
})();
var statearr_9119_9136 = state_9107__$1;
(statearr_9119_9136[(2)] = null);

(statearr_9119_9136[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9108 === (5))){
var inst_9087 = (state_9107[(7)]);
var state_9107__$1 = state_9107;
var statearr_9120_9137 = state_9107__$1;
(statearr_9120_9137[(2)] = inst_9087);

(statearr_9120_9137[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9108 === (10))){
var inst_9101 = (state_9107[(2)]);
var state_9107__$1 = state_9107;
var statearr_9121_9138 = state_9107__$1;
(statearr_9121_9138[(2)] = inst_9101);

(statearr_9121_9138[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9108 === (8))){
var inst_9094 = (state_9107[(9)]);
var inst_9097 = cljs.core.deref.call(null,inst_9094);
var state_9107__$1 = state_9107;
var statearr_9122_9139 = state_9107__$1;
(statearr_9122_9139[(2)] = inst_9097);

(statearr_9122_9139[(1)] = (10));


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
});})(c__8341__auto__))
;
return ((function (switch__8229__auto__,c__8341__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__8230__auto__ = null;
var cljs$core$async$reduce_$_state_machine__8230__auto____0 = (function (){
var statearr_9126 = [null,null,null,null,null,null,null,null,null,null];
(statearr_9126[(0)] = cljs$core$async$reduce_$_state_machine__8230__auto__);

(statearr_9126[(1)] = (1));

return statearr_9126;
});
var cljs$core$async$reduce_$_state_machine__8230__auto____1 = (function (state_9107){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_9107);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e9127){if((e9127 instanceof Object)){
var ex__8233__auto__ = e9127;
var statearr_9128_9140 = state_9107;
(statearr_9128_9140[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_9107);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e9127;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__9141 = state_9107;
state_9107 = G__9141;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__8230__auto__ = function(state_9107){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__8230__auto____1.call(this,state_9107);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__8230__auto____0;
cljs$core$async$reduce_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__8230__auto____1;
return cljs$core$async$reduce_$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__))
})();
var state__8343__auto__ = (function (){var statearr_9129 = f__8342__auto__.call(null);
(statearr_9129[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_9129;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__))
);

return c__8341__auto__;
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
var args9142 = [];
var len__27348__auto___9194 = arguments.length;
var i__27349__auto___9195 = (0);
while(true){
if((i__27349__auto___9195 < len__27348__auto___9194)){
args9142.push((arguments[i__27349__auto___9195]));

var G__9196 = (i__27349__auto___9195 + (1));
i__27349__auto___9195 = G__9196;
continue;
} else {
}
break;
}

var G__9144 = args9142.length;
switch (G__9144) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9142.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__){
return (function (state_9169){
var state_val_9170 = (state_9169[(1)]);
if((state_val_9170 === (7))){
var inst_9151 = (state_9169[(2)]);
var state_9169__$1 = state_9169;
var statearr_9171_9198 = state_9169__$1;
(statearr_9171_9198[(2)] = inst_9151);

(statearr_9171_9198[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9170 === (1))){
var inst_9145 = cljs.core.seq.call(null,coll);
var inst_9146 = inst_9145;
var state_9169__$1 = (function (){var statearr_9172 = state_9169;
(statearr_9172[(7)] = inst_9146);

return statearr_9172;
})();
var statearr_9173_9199 = state_9169__$1;
(statearr_9173_9199[(2)] = null);

(statearr_9173_9199[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9170 === (4))){
var inst_9146 = (state_9169[(7)]);
var inst_9149 = cljs.core.first.call(null,inst_9146);
var state_9169__$1 = state_9169;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_9169__$1,(7),ch,inst_9149);
} else {
if((state_val_9170 === (13))){
var inst_9163 = (state_9169[(2)]);
var state_9169__$1 = state_9169;
var statearr_9174_9200 = state_9169__$1;
(statearr_9174_9200[(2)] = inst_9163);

(statearr_9174_9200[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9170 === (6))){
var inst_9154 = (state_9169[(2)]);
var state_9169__$1 = state_9169;
if(cljs.core.truth_(inst_9154)){
var statearr_9175_9201 = state_9169__$1;
(statearr_9175_9201[(1)] = (8));

} else {
var statearr_9176_9202 = state_9169__$1;
(statearr_9176_9202[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9170 === (3))){
var inst_9167 = (state_9169[(2)]);
var state_9169__$1 = state_9169;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_9169__$1,inst_9167);
} else {
if((state_val_9170 === (12))){
var state_9169__$1 = state_9169;
var statearr_9177_9203 = state_9169__$1;
(statearr_9177_9203[(2)] = null);

(statearr_9177_9203[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9170 === (2))){
var inst_9146 = (state_9169[(7)]);
var state_9169__$1 = state_9169;
if(cljs.core.truth_(inst_9146)){
var statearr_9178_9204 = state_9169__$1;
(statearr_9178_9204[(1)] = (4));

} else {
var statearr_9179_9205 = state_9169__$1;
(statearr_9179_9205[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9170 === (11))){
var inst_9160 = cljs.core.async.close_BANG_.call(null,ch);
var state_9169__$1 = state_9169;
var statearr_9180_9206 = state_9169__$1;
(statearr_9180_9206[(2)] = inst_9160);

(statearr_9180_9206[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9170 === (9))){
var state_9169__$1 = state_9169;
if(cljs.core.truth_(close_QMARK_)){
var statearr_9181_9207 = state_9169__$1;
(statearr_9181_9207[(1)] = (11));

} else {
var statearr_9182_9208 = state_9169__$1;
(statearr_9182_9208[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9170 === (5))){
var inst_9146 = (state_9169[(7)]);
var state_9169__$1 = state_9169;
var statearr_9183_9209 = state_9169__$1;
(statearr_9183_9209[(2)] = inst_9146);

(statearr_9183_9209[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9170 === (10))){
var inst_9165 = (state_9169[(2)]);
var state_9169__$1 = state_9169;
var statearr_9184_9210 = state_9169__$1;
(statearr_9184_9210[(2)] = inst_9165);

(statearr_9184_9210[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9170 === (8))){
var inst_9146 = (state_9169[(7)]);
var inst_9156 = cljs.core.next.call(null,inst_9146);
var inst_9146__$1 = inst_9156;
var state_9169__$1 = (function (){var statearr_9185 = state_9169;
(statearr_9185[(7)] = inst_9146__$1);

return statearr_9185;
})();
var statearr_9186_9211 = state_9169__$1;
(statearr_9186_9211[(2)] = null);

(statearr_9186_9211[(1)] = (2));


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
});})(c__8341__auto__))
;
return ((function (switch__8229__auto__,c__8341__auto__){
return (function() {
var cljs$core$async$state_machine__8230__auto__ = null;
var cljs$core$async$state_machine__8230__auto____0 = (function (){
var statearr_9190 = [null,null,null,null,null,null,null,null];
(statearr_9190[(0)] = cljs$core$async$state_machine__8230__auto__);

(statearr_9190[(1)] = (1));

return statearr_9190;
});
var cljs$core$async$state_machine__8230__auto____1 = (function (state_9169){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_9169);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e9191){if((e9191 instanceof Object)){
var ex__8233__auto__ = e9191;
var statearr_9192_9212 = state_9169;
(statearr_9192_9212[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_9169);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e9191;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__9213 = state_9169;
state_9169 = G__9213;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$state_machine__8230__auto__ = function(state_9169){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__8230__auto____1.call(this,state_9169);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__8230__auto____0;
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__8230__auto____1;
return cljs$core$async$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__))
})();
var state__8343__auto__ = (function (){var statearr_9193 = f__8342__auto__.call(null);
(statearr_9193[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_9193;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__))
);

return c__8341__auto__;
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
var x__27096__auto__ = (((_ == null))?null:_);
var m__27097__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,_);
} else {
var m__27097__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,_);
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
var x__27096__auto__ = (((m == null))?null:m);
var m__27097__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__27097__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,m,ch,close_QMARK_);
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
var x__27096__auto__ = (((m == null))?null:m);
var m__27097__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,m,ch);
} else {
var m__27097__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,m,ch);
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
var x__27096__auto__ = (((m == null))?null:m);
var m__27097__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,m);
} else {
var m__27097__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,m);
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
if(typeof cljs.core.async.t_cljs$core$async9439 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async9439 = (function (mult,ch,cs,meta9440){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta9440 = meta9440;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async9439.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_9441,meta9440__$1){
var self__ = this;
var _9441__$1 = this;
return (new cljs.core.async.t_cljs$core$async9439(self__.mult,self__.ch,self__.cs,meta9440__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async9439.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_9441){
var self__ = this;
var _9441__$1 = this;
return self__.meta9440;
});})(cs))
;

cljs.core.async.t_cljs$core$async9439.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async9439.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async9439.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t_cljs$core$async9439.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async9439.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async9439.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async9439.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta9440","meta9440",-1849807553,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async9439.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async9439.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async9439";

cljs.core.async.t_cljs$core$async9439.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__27047__auto__,writer__27048__auto__,opt__27049__auto__){
return cljs.core._write.call(null,writer__27048__auto__,"cljs.core.async/t_cljs$core$async9439");
});})(cs))
;

cljs.core.async.__GT_t_cljs$core$async9439 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async9439(mult__$1,ch__$1,cs__$1,meta9440){
return (new cljs.core.async.t_cljs$core$async9439(mult__$1,ch__$1,cs__$1,meta9440));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async9439(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
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
var c__8341__auto___9664 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___9664,cs,m,dchan,dctr,done){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___9664,cs,m,dchan,dctr,done){
return (function (state_9576){
var state_val_9577 = (state_9576[(1)]);
if((state_val_9577 === (7))){
var inst_9572 = (state_9576[(2)]);
var state_9576__$1 = state_9576;
var statearr_9578_9665 = state_9576__$1;
(statearr_9578_9665[(2)] = inst_9572);

(statearr_9578_9665[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (20))){
var inst_9475 = (state_9576[(7)]);
var inst_9487 = cljs.core.first.call(null,inst_9475);
var inst_9488 = cljs.core.nth.call(null,inst_9487,(0),null);
var inst_9489 = cljs.core.nth.call(null,inst_9487,(1),null);
var state_9576__$1 = (function (){var statearr_9579 = state_9576;
(statearr_9579[(8)] = inst_9488);

return statearr_9579;
})();
if(cljs.core.truth_(inst_9489)){
var statearr_9580_9666 = state_9576__$1;
(statearr_9580_9666[(1)] = (22));

} else {
var statearr_9581_9667 = state_9576__$1;
(statearr_9581_9667[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (27))){
var inst_9444 = (state_9576[(9)]);
var inst_9519 = (state_9576[(10)]);
var inst_9524 = (state_9576[(11)]);
var inst_9517 = (state_9576[(12)]);
var inst_9524__$1 = cljs.core._nth.call(null,inst_9517,inst_9519);
var inst_9525 = cljs.core.async.put_BANG_.call(null,inst_9524__$1,inst_9444,done);
var state_9576__$1 = (function (){var statearr_9582 = state_9576;
(statearr_9582[(11)] = inst_9524__$1);

return statearr_9582;
})();
if(cljs.core.truth_(inst_9525)){
var statearr_9583_9668 = state_9576__$1;
(statearr_9583_9668[(1)] = (30));

} else {
var statearr_9584_9669 = state_9576__$1;
(statearr_9584_9669[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (1))){
var state_9576__$1 = state_9576;
var statearr_9585_9670 = state_9576__$1;
(statearr_9585_9670[(2)] = null);

(statearr_9585_9670[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (24))){
var inst_9475 = (state_9576[(7)]);
var inst_9494 = (state_9576[(2)]);
var inst_9495 = cljs.core.next.call(null,inst_9475);
var inst_9453 = inst_9495;
var inst_9454 = null;
var inst_9455 = (0);
var inst_9456 = (0);
var state_9576__$1 = (function (){var statearr_9586 = state_9576;
(statearr_9586[(13)] = inst_9456);

(statearr_9586[(14)] = inst_9453);

(statearr_9586[(15)] = inst_9455);

(statearr_9586[(16)] = inst_9454);

(statearr_9586[(17)] = inst_9494);

return statearr_9586;
})();
var statearr_9587_9671 = state_9576__$1;
(statearr_9587_9671[(2)] = null);

(statearr_9587_9671[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (39))){
var state_9576__$1 = state_9576;
var statearr_9591_9672 = state_9576__$1;
(statearr_9591_9672[(2)] = null);

(statearr_9591_9672[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (4))){
var inst_9444 = (state_9576[(9)]);
var inst_9444__$1 = (state_9576[(2)]);
var inst_9445 = (inst_9444__$1 == null);
var state_9576__$1 = (function (){var statearr_9592 = state_9576;
(statearr_9592[(9)] = inst_9444__$1);

return statearr_9592;
})();
if(cljs.core.truth_(inst_9445)){
var statearr_9593_9673 = state_9576__$1;
(statearr_9593_9673[(1)] = (5));

} else {
var statearr_9594_9674 = state_9576__$1;
(statearr_9594_9674[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (15))){
var inst_9456 = (state_9576[(13)]);
var inst_9453 = (state_9576[(14)]);
var inst_9455 = (state_9576[(15)]);
var inst_9454 = (state_9576[(16)]);
var inst_9471 = (state_9576[(2)]);
var inst_9472 = (inst_9456 + (1));
var tmp9588 = inst_9453;
var tmp9589 = inst_9455;
var tmp9590 = inst_9454;
var inst_9453__$1 = tmp9588;
var inst_9454__$1 = tmp9590;
var inst_9455__$1 = tmp9589;
var inst_9456__$1 = inst_9472;
var state_9576__$1 = (function (){var statearr_9595 = state_9576;
(statearr_9595[(13)] = inst_9456__$1);

(statearr_9595[(18)] = inst_9471);

(statearr_9595[(14)] = inst_9453__$1);

(statearr_9595[(15)] = inst_9455__$1);

(statearr_9595[(16)] = inst_9454__$1);

return statearr_9595;
})();
var statearr_9596_9675 = state_9576__$1;
(statearr_9596_9675[(2)] = null);

(statearr_9596_9675[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (21))){
var inst_9498 = (state_9576[(2)]);
var state_9576__$1 = state_9576;
var statearr_9600_9676 = state_9576__$1;
(statearr_9600_9676[(2)] = inst_9498);

(statearr_9600_9676[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (31))){
var inst_9524 = (state_9576[(11)]);
var inst_9528 = done.call(null,null);
var inst_9529 = cljs.core.async.untap_STAR_.call(null,m,inst_9524);
var state_9576__$1 = (function (){var statearr_9601 = state_9576;
(statearr_9601[(19)] = inst_9528);

return statearr_9601;
})();
var statearr_9602_9677 = state_9576__$1;
(statearr_9602_9677[(2)] = inst_9529);

(statearr_9602_9677[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (32))){
var inst_9519 = (state_9576[(10)]);
var inst_9516 = (state_9576[(20)]);
var inst_9518 = (state_9576[(21)]);
var inst_9517 = (state_9576[(12)]);
var inst_9531 = (state_9576[(2)]);
var inst_9532 = (inst_9519 + (1));
var tmp9597 = inst_9516;
var tmp9598 = inst_9518;
var tmp9599 = inst_9517;
var inst_9516__$1 = tmp9597;
var inst_9517__$1 = tmp9599;
var inst_9518__$1 = tmp9598;
var inst_9519__$1 = inst_9532;
var state_9576__$1 = (function (){var statearr_9603 = state_9576;
(statearr_9603[(10)] = inst_9519__$1);

(statearr_9603[(20)] = inst_9516__$1);

(statearr_9603[(22)] = inst_9531);

(statearr_9603[(21)] = inst_9518__$1);

(statearr_9603[(12)] = inst_9517__$1);

return statearr_9603;
})();
var statearr_9604_9678 = state_9576__$1;
(statearr_9604_9678[(2)] = null);

(statearr_9604_9678[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (40))){
var inst_9544 = (state_9576[(23)]);
var inst_9548 = done.call(null,null);
var inst_9549 = cljs.core.async.untap_STAR_.call(null,m,inst_9544);
var state_9576__$1 = (function (){var statearr_9605 = state_9576;
(statearr_9605[(24)] = inst_9548);

return statearr_9605;
})();
var statearr_9606_9679 = state_9576__$1;
(statearr_9606_9679[(2)] = inst_9549);

(statearr_9606_9679[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (33))){
var inst_9535 = (state_9576[(25)]);
var inst_9537 = cljs.core.chunked_seq_QMARK_.call(null,inst_9535);
var state_9576__$1 = state_9576;
if(inst_9537){
var statearr_9607_9680 = state_9576__$1;
(statearr_9607_9680[(1)] = (36));

} else {
var statearr_9608_9681 = state_9576__$1;
(statearr_9608_9681[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (13))){
var inst_9465 = (state_9576[(26)]);
var inst_9468 = cljs.core.async.close_BANG_.call(null,inst_9465);
var state_9576__$1 = state_9576;
var statearr_9609_9682 = state_9576__$1;
(statearr_9609_9682[(2)] = inst_9468);

(statearr_9609_9682[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (22))){
var inst_9488 = (state_9576[(8)]);
var inst_9491 = cljs.core.async.close_BANG_.call(null,inst_9488);
var state_9576__$1 = state_9576;
var statearr_9610_9683 = state_9576__$1;
(statearr_9610_9683[(2)] = inst_9491);

(statearr_9610_9683[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (36))){
var inst_9535 = (state_9576[(25)]);
var inst_9539 = cljs.core.chunk_first.call(null,inst_9535);
var inst_9540 = cljs.core.chunk_rest.call(null,inst_9535);
var inst_9541 = cljs.core.count.call(null,inst_9539);
var inst_9516 = inst_9540;
var inst_9517 = inst_9539;
var inst_9518 = inst_9541;
var inst_9519 = (0);
var state_9576__$1 = (function (){var statearr_9611 = state_9576;
(statearr_9611[(10)] = inst_9519);

(statearr_9611[(20)] = inst_9516);

(statearr_9611[(21)] = inst_9518);

(statearr_9611[(12)] = inst_9517);

return statearr_9611;
})();
var statearr_9612_9684 = state_9576__$1;
(statearr_9612_9684[(2)] = null);

(statearr_9612_9684[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (41))){
var inst_9535 = (state_9576[(25)]);
var inst_9551 = (state_9576[(2)]);
var inst_9552 = cljs.core.next.call(null,inst_9535);
var inst_9516 = inst_9552;
var inst_9517 = null;
var inst_9518 = (0);
var inst_9519 = (0);
var state_9576__$1 = (function (){var statearr_9613 = state_9576;
(statearr_9613[(10)] = inst_9519);

(statearr_9613[(20)] = inst_9516);

(statearr_9613[(27)] = inst_9551);

(statearr_9613[(21)] = inst_9518);

(statearr_9613[(12)] = inst_9517);

return statearr_9613;
})();
var statearr_9614_9685 = state_9576__$1;
(statearr_9614_9685[(2)] = null);

(statearr_9614_9685[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (43))){
var state_9576__$1 = state_9576;
var statearr_9615_9686 = state_9576__$1;
(statearr_9615_9686[(2)] = null);

(statearr_9615_9686[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (29))){
var inst_9560 = (state_9576[(2)]);
var state_9576__$1 = state_9576;
var statearr_9616_9687 = state_9576__$1;
(statearr_9616_9687[(2)] = inst_9560);

(statearr_9616_9687[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (44))){
var inst_9569 = (state_9576[(2)]);
var state_9576__$1 = (function (){var statearr_9617 = state_9576;
(statearr_9617[(28)] = inst_9569);

return statearr_9617;
})();
var statearr_9618_9688 = state_9576__$1;
(statearr_9618_9688[(2)] = null);

(statearr_9618_9688[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (6))){
var inst_9508 = (state_9576[(29)]);
var inst_9507 = cljs.core.deref.call(null,cs);
var inst_9508__$1 = cljs.core.keys.call(null,inst_9507);
var inst_9509 = cljs.core.count.call(null,inst_9508__$1);
var inst_9510 = cljs.core.reset_BANG_.call(null,dctr,inst_9509);
var inst_9515 = cljs.core.seq.call(null,inst_9508__$1);
var inst_9516 = inst_9515;
var inst_9517 = null;
var inst_9518 = (0);
var inst_9519 = (0);
var state_9576__$1 = (function (){var statearr_9619 = state_9576;
(statearr_9619[(10)] = inst_9519);

(statearr_9619[(20)] = inst_9516);

(statearr_9619[(30)] = inst_9510);

(statearr_9619[(29)] = inst_9508__$1);

(statearr_9619[(21)] = inst_9518);

(statearr_9619[(12)] = inst_9517);

return statearr_9619;
})();
var statearr_9620_9689 = state_9576__$1;
(statearr_9620_9689[(2)] = null);

(statearr_9620_9689[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (28))){
var inst_9516 = (state_9576[(20)]);
var inst_9535 = (state_9576[(25)]);
var inst_9535__$1 = cljs.core.seq.call(null,inst_9516);
var state_9576__$1 = (function (){var statearr_9621 = state_9576;
(statearr_9621[(25)] = inst_9535__$1);

return statearr_9621;
})();
if(inst_9535__$1){
var statearr_9622_9690 = state_9576__$1;
(statearr_9622_9690[(1)] = (33));

} else {
var statearr_9623_9691 = state_9576__$1;
(statearr_9623_9691[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (25))){
var inst_9519 = (state_9576[(10)]);
var inst_9518 = (state_9576[(21)]);
var inst_9521 = (inst_9519 < inst_9518);
var inst_9522 = inst_9521;
var state_9576__$1 = state_9576;
if(cljs.core.truth_(inst_9522)){
var statearr_9624_9692 = state_9576__$1;
(statearr_9624_9692[(1)] = (27));

} else {
var statearr_9625_9693 = state_9576__$1;
(statearr_9625_9693[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (34))){
var state_9576__$1 = state_9576;
var statearr_9626_9694 = state_9576__$1;
(statearr_9626_9694[(2)] = null);

(statearr_9626_9694[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (17))){
var state_9576__$1 = state_9576;
var statearr_9627_9695 = state_9576__$1;
(statearr_9627_9695[(2)] = null);

(statearr_9627_9695[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (3))){
var inst_9574 = (state_9576[(2)]);
var state_9576__$1 = state_9576;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_9576__$1,inst_9574);
} else {
if((state_val_9577 === (12))){
var inst_9503 = (state_9576[(2)]);
var state_9576__$1 = state_9576;
var statearr_9628_9696 = state_9576__$1;
(statearr_9628_9696[(2)] = inst_9503);

(statearr_9628_9696[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (2))){
var state_9576__$1 = state_9576;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_9576__$1,(4),ch);
} else {
if((state_val_9577 === (23))){
var state_9576__$1 = state_9576;
var statearr_9629_9697 = state_9576__$1;
(statearr_9629_9697[(2)] = null);

(statearr_9629_9697[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (35))){
var inst_9558 = (state_9576[(2)]);
var state_9576__$1 = state_9576;
var statearr_9630_9698 = state_9576__$1;
(statearr_9630_9698[(2)] = inst_9558);

(statearr_9630_9698[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (19))){
var inst_9475 = (state_9576[(7)]);
var inst_9479 = cljs.core.chunk_first.call(null,inst_9475);
var inst_9480 = cljs.core.chunk_rest.call(null,inst_9475);
var inst_9481 = cljs.core.count.call(null,inst_9479);
var inst_9453 = inst_9480;
var inst_9454 = inst_9479;
var inst_9455 = inst_9481;
var inst_9456 = (0);
var state_9576__$1 = (function (){var statearr_9631 = state_9576;
(statearr_9631[(13)] = inst_9456);

(statearr_9631[(14)] = inst_9453);

(statearr_9631[(15)] = inst_9455);

(statearr_9631[(16)] = inst_9454);

return statearr_9631;
})();
var statearr_9632_9699 = state_9576__$1;
(statearr_9632_9699[(2)] = null);

(statearr_9632_9699[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (11))){
var inst_9453 = (state_9576[(14)]);
var inst_9475 = (state_9576[(7)]);
var inst_9475__$1 = cljs.core.seq.call(null,inst_9453);
var state_9576__$1 = (function (){var statearr_9633 = state_9576;
(statearr_9633[(7)] = inst_9475__$1);

return statearr_9633;
})();
if(inst_9475__$1){
var statearr_9634_9700 = state_9576__$1;
(statearr_9634_9700[(1)] = (16));

} else {
var statearr_9635_9701 = state_9576__$1;
(statearr_9635_9701[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (9))){
var inst_9505 = (state_9576[(2)]);
var state_9576__$1 = state_9576;
var statearr_9636_9702 = state_9576__$1;
(statearr_9636_9702[(2)] = inst_9505);

(statearr_9636_9702[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (5))){
var inst_9451 = cljs.core.deref.call(null,cs);
var inst_9452 = cljs.core.seq.call(null,inst_9451);
var inst_9453 = inst_9452;
var inst_9454 = null;
var inst_9455 = (0);
var inst_9456 = (0);
var state_9576__$1 = (function (){var statearr_9637 = state_9576;
(statearr_9637[(13)] = inst_9456);

(statearr_9637[(14)] = inst_9453);

(statearr_9637[(15)] = inst_9455);

(statearr_9637[(16)] = inst_9454);

return statearr_9637;
})();
var statearr_9638_9703 = state_9576__$1;
(statearr_9638_9703[(2)] = null);

(statearr_9638_9703[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (14))){
var state_9576__$1 = state_9576;
var statearr_9639_9704 = state_9576__$1;
(statearr_9639_9704[(2)] = null);

(statearr_9639_9704[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (45))){
var inst_9566 = (state_9576[(2)]);
var state_9576__$1 = state_9576;
var statearr_9640_9705 = state_9576__$1;
(statearr_9640_9705[(2)] = inst_9566);

(statearr_9640_9705[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (26))){
var inst_9508 = (state_9576[(29)]);
var inst_9562 = (state_9576[(2)]);
var inst_9563 = cljs.core.seq.call(null,inst_9508);
var state_9576__$1 = (function (){var statearr_9641 = state_9576;
(statearr_9641[(31)] = inst_9562);

return statearr_9641;
})();
if(inst_9563){
var statearr_9642_9706 = state_9576__$1;
(statearr_9642_9706[(1)] = (42));

} else {
var statearr_9643_9707 = state_9576__$1;
(statearr_9643_9707[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (16))){
var inst_9475 = (state_9576[(7)]);
var inst_9477 = cljs.core.chunked_seq_QMARK_.call(null,inst_9475);
var state_9576__$1 = state_9576;
if(inst_9477){
var statearr_9644_9708 = state_9576__$1;
(statearr_9644_9708[(1)] = (19));

} else {
var statearr_9645_9709 = state_9576__$1;
(statearr_9645_9709[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (38))){
var inst_9555 = (state_9576[(2)]);
var state_9576__$1 = state_9576;
var statearr_9646_9710 = state_9576__$1;
(statearr_9646_9710[(2)] = inst_9555);

(statearr_9646_9710[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (30))){
var state_9576__$1 = state_9576;
var statearr_9647_9711 = state_9576__$1;
(statearr_9647_9711[(2)] = null);

(statearr_9647_9711[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (10))){
var inst_9456 = (state_9576[(13)]);
var inst_9454 = (state_9576[(16)]);
var inst_9464 = cljs.core._nth.call(null,inst_9454,inst_9456);
var inst_9465 = cljs.core.nth.call(null,inst_9464,(0),null);
var inst_9466 = cljs.core.nth.call(null,inst_9464,(1),null);
var state_9576__$1 = (function (){var statearr_9648 = state_9576;
(statearr_9648[(26)] = inst_9465);

return statearr_9648;
})();
if(cljs.core.truth_(inst_9466)){
var statearr_9649_9712 = state_9576__$1;
(statearr_9649_9712[(1)] = (13));

} else {
var statearr_9650_9713 = state_9576__$1;
(statearr_9650_9713[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (18))){
var inst_9501 = (state_9576[(2)]);
var state_9576__$1 = state_9576;
var statearr_9651_9714 = state_9576__$1;
(statearr_9651_9714[(2)] = inst_9501);

(statearr_9651_9714[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (42))){
var state_9576__$1 = state_9576;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_9576__$1,(45),dchan);
} else {
if((state_val_9577 === (37))){
var inst_9444 = (state_9576[(9)]);
var inst_9535 = (state_9576[(25)]);
var inst_9544 = (state_9576[(23)]);
var inst_9544__$1 = cljs.core.first.call(null,inst_9535);
var inst_9545 = cljs.core.async.put_BANG_.call(null,inst_9544__$1,inst_9444,done);
var state_9576__$1 = (function (){var statearr_9652 = state_9576;
(statearr_9652[(23)] = inst_9544__$1);

return statearr_9652;
})();
if(cljs.core.truth_(inst_9545)){
var statearr_9653_9715 = state_9576__$1;
(statearr_9653_9715[(1)] = (39));

} else {
var statearr_9654_9716 = state_9576__$1;
(statearr_9654_9716[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_9577 === (8))){
var inst_9456 = (state_9576[(13)]);
var inst_9455 = (state_9576[(15)]);
var inst_9458 = (inst_9456 < inst_9455);
var inst_9459 = inst_9458;
var state_9576__$1 = state_9576;
if(cljs.core.truth_(inst_9459)){
var statearr_9655_9717 = state_9576__$1;
(statearr_9655_9717[(1)] = (10));

} else {
var statearr_9656_9718 = state_9576__$1;
(statearr_9656_9718[(1)] = (11));

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
});})(c__8341__auto___9664,cs,m,dchan,dctr,done))
;
return ((function (switch__8229__auto__,c__8341__auto___9664,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__8230__auto__ = null;
var cljs$core$async$mult_$_state_machine__8230__auto____0 = (function (){
var statearr_9660 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_9660[(0)] = cljs$core$async$mult_$_state_machine__8230__auto__);

(statearr_9660[(1)] = (1));

return statearr_9660;
});
var cljs$core$async$mult_$_state_machine__8230__auto____1 = (function (state_9576){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_9576);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e9661){if((e9661 instanceof Object)){
var ex__8233__auto__ = e9661;
var statearr_9662_9719 = state_9576;
(statearr_9662_9719[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_9576);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e9661;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__9720 = state_9576;
state_9576 = G__9720;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__8230__auto__ = function(state_9576){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__8230__auto____1.call(this,state_9576);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__8230__auto____0;
cljs$core$async$mult_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__8230__auto____1;
return cljs$core$async$mult_$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___9664,cs,m,dchan,dctr,done))
})();
var state__8343__auto__ = (function (){var statearr_9663 = f__8342__auto__.call(null);
(statearr_9663[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___9664);

return statearr_9663;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___9664,cs,m,dchan,dctr,done))
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
var args9721 = [];
var len__27348__auto___9724 = arguments.length;
var i__27349__auto___9725 = (0);
while(true){
if((i__27349__auto___9725 < len__27348__auto___9724)){
args9721.push((arguments[i__27349__auto___9725]));

var G__9726 = (i__27349__auto___9725 + (1));
i__27349__auto___9725 = G__9726;
continue;
} else {
}
break;
}

var G__9723 = args9721.length;
switch (G__9723) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9721.length)].join('')));

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
var x__27096__auto__ = (((m == null))?null:m);
var m__27097__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,m,ch);
} else {
var m__27097__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,m,ch);
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
var x__27096__auto__ = (((m == null))?null:m);
var m__27097__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,m,ch);
} else {
var m__27097__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,m,ch);
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
var x__27096__auto__ = (((m == null))?null:m);
var m__27097__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,m);
} else {
var m__27097__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,m);
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
var x__27096__auto__ = (((m == null))?null:m);
var m__27097__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,m,state_map);
} else {
var m__27097__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,m,state_map);
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
var x__27096__auto__ = (((m == null))?null:m);
var m__27097__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,m,mode);
} else {
var m__27097__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__27351__auto__ = [];
var len__27348__auto___9738 = arguments.length;
var i__27349__auto___9739 = (0);
while(true){
if((i__27349__auto___9739 < len__27348__auto___9738)){
args__27351__auto__.push((arguments[i__27349__auto___9739]));

var G__9740 = (i__27349__auto___9739 + (1));
i__27349__auto___9739 = G__9740;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((3) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__27352__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__9732){
var map__9733 = p__9732;
var map__9733__$1 = ((((!((map__9733 == null)))?((((map__9733.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9733.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9733):map__9733);
var opts = map__9733__$1;
var statearr_9735_9741 = state;
(statearr_9735_9741[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4657__auto__ = cljs.core.async.do_alts.call(null,((function (map__9733,map__9733__$1,opts){
return (function (val){
var statearr_9736_9742 = state;
(statearr_9736_9742[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__9733,map__9733__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4657__auto__)){
var cb = temp__4657__auto__;
var statearr_9737_9743 = state;
(statearr_9737_9743[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq9728){
var G__9729 = cljs.core.first.call(null,seq9728);
var seq9728__$1 = cljs.core.next.call(null,seq9728);
var G__9730 = cljs.core.first.call(null,seq9728__$1);
var seq9728__$2 = cljs.core.next.call(null,seq9728__$1);
var G__9731 = cljs.core.first.call(null,seq9728__$2);
var seq9728__$3 = cljs.core.next.call(null,seq9728__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__9729,G__9730,G__9731,seq9728__$3);
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
if(typeof cljs.core.async.t_cljs$core$async9909 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async9909 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta9910){
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
this.meta9910 = meta9910;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async9909.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_9911,meta9910__$1){
var self__ = this;
var _9911__$1 = this;
return (new cljs.core.async.t_cljs$core$async9909(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta9910__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async9909.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_9911){
var self__ = this;
var _9911__$1 = this;
return self__.meta9910;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async9909.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async9909.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async9909.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t_cljs$core$async9909.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async9909.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async9909.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async9909.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async9909.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
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

cljs.core.async.t_cljs$core$async9909.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta9910","meta9910",-657461287,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async9909.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async9909.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async9909";

cljs.core.async.t_cljs$core$async9909.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__27047__auto__,writer__27048__auto__,opt__27049__auto__){
return cljs.core._write.call(null,writer__27048__auto__,"cljs.core.async/t_cljs$core$async9909");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t_cljs$core$async9909 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async9909(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta9910){
return (new cljs.core.async.t_cljs$core$async9909(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta9910));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async9909(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__8341__auto___10074 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___10074,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___10074,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_10011){
var state_val_10012 = (state_10011[(1)]);
if((state_val_10012 === (7))){
var inst_9927 = (state_10011[(2)]);
var state_10011__$1 = state_10011;
var statearr_10013_10075 = state_10011__$1;
(statearr_10013_10075[(2)] = inst_9927);

(statearr_10013_10075[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (20))){
var inst_9939 = (state_10011[(7)]);
var state_10011__$1 = state_10011;
var statearr_10014_10076 = state_10011__$1;
(statearr_10014_10076[(2)] = inst_9939);

(statearr_10014_10076[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (27))){
var state_10011__$1 = state_10011;
var statearr_10015_10077 = state_10011__$1;
(statearr_10015_10077[(2)] = null);

(statearr_10015_10077[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (1))){
var inst_9915 = (state_10011[(8)]);
var inst_9915__$1 = calc_state.call(null);
var inst_9917 = (inst_9915__$1 == null);
var inst_9918 = cljs.core.not.call(null,inst_9917);
var state_10011__$1 = (function (){var statearr_10016 = state_10011;
(statearr_10016[(8)] = inst_9915__$1);

return statearr_10016;
})();
if(inst_9918){
var statearr_10017_10078 = state_10011__$1;
(statearr_10017_10078[(1)] = (2));

} else {
var statearr_10018_10079 = state_10011__$1;
(statearr_10018_10079[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (24))){
var inst_9962 = (state_10011[(9)]);
var inst_9985 = (state_10011[(10)]);
var inst_9971 = (state_10011[(11)]);
var inst_9985__$1 = inst_9962.call(null,inst_9971);
var state_10011__$1 = (function (){var statearr_10019 = state_10011;
(statearr_10019[(10)] = inst_9985__$1);

return statearr_10019;
})();
if(cljs.core.truth_(inst_9985__$1)){
var statearr_10020_10080 = state_10011__$1;
(statearr_10020_10080[(1)] = (29));

} else {
var statearr_10021_10081 = state_10011__$1;
(statearr_10021_10081[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (4))){
var inst_9930 = (state_10011[(2)]);
var state_10011__$1 = state_10011;
if(cljs.core.truth_(inst_9930)){
var statearr_10022_10082 = state_10011__$1;
(statearr_10022_10082[(1)] = (8));

} else {
var statearr_10023_10083 = state_10011__$1;
(statearr_10023_10083[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (15))){
var inst_9956 = (state_10011[(2)]);
var state_10011__$1 = state_10011;
if(cljs.core.truth_(inst_9956)){
var statearr_10024_10084 = state_10011__$1;
(statearr_10024_10084[(1)] = (19));

} else {
var statearr_10025_10085 = state_10011__$1;
(statearr_10025_10085[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (21))){
var inst_9961 = (state_10011[(12)]);
var inst_9961__$1 = (state_10011[(2)]);
var inst_9962 = cljs.core.get.call(null,inst_9961__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_9963 = cljs.core.get.call(null,inst_9961__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_9964 = cljs.core.get.call(null,inst_9961__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_10011__$1 = (function (){var statearr_10026 = state_10011;
(statearr_10026[(13)] = inst_9963);

(statearr_10026[(9)] = inst_9962);

(statearr_10026[(12)] = inst_9961__$1);

return statearr_10026;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_10011__$1,(22),inst_9964);
} else {
if((state_val_10012 === (31))){
var inst_9993 = (state_10011[(2)]);
var state_10011__$1 = state_10011;
if(cljs.core.truth_(inst_9993)){
var statearr_10027_10086 = state_10011__$1;
(statearr_10027_10086[(1)] = (32));

} else {
var statearr_10028_10087 = state_10011__$1;
(statearr_10028_10087[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (32))){
var inst_9970 = (state_10011[(14)]);
var state_10011__$1 = state_10011;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10011__$1,(35),out,inst_9970);
} else {
if((state_val_10012 === (33))){
var inst_9961 = (state_10011[(12)]);
var inst_9939 = inst_9961;
var state_10011__$1 = (function (){var statearr_10029 = state_10011;
(statearr_10029[(7)] = inst_9939);

return statearr_10029;
})();
var statearr_10030_10088 = state_10011__$1;
(statearr_10030_10088[(2)] = null);

(statearr_10030_10088[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (13))){
var inst_9939 = (state_10011[(7)]);
var inst_9946 = inst_9939.cljs$lang$protocol_mask$partition0$;
var inst_9947 = (inst_9946 & (64));
var inst_9948 = inst_9939.cljs$core$ISeq$;
var inst_9949 = (inst_9947) || (inst_9948);
var state_10011__$1 = state_10011;
if(cljs.core.truth_(inst_9949)){
var statearr_10031_10089 = state_10011__$1;
(statearr_10031_10089[(1)] = (16));

} else {
var statearr_10032_10090 = state_10011__$1;
(statearr_10032_10090[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (22))){
var inst_9971 = (state_10011[(11)]);
var inst_9970 = (state_10011[(14)]);
var inst_9969 = (state_10011[(2)]);
var inst_9970__$1 = cljs.core.nth.call(null,inst_9969,(0),null);
var inst_9971__$1 = cljs.core.nth.call(null,inst_9969,(1),null);
var inst_9972 = (inst_9970__$1 == null);
var inst_9973 = cljs.core._EQ_.call(null,inst_9971__$1,change);
var inst_9974 = (inst_9972) || (inst_9973);
var state_10011__$1 = (function (){var statearr_10033 = state_10011;
(statearr_10033[(11)] = inst_9971__$1);

(statearr_10033[(14)] = inst_9970__$1);

return statearr_10033;
})();
if(cljs.core.truth_(inst_9974)){
var statearr_10034_10091 = state_10011__$1;
(statearr_10034_10091[(1)] = (23));

} else {
var statearr_10035_10092 = state_10011__$1;
(statearr_10035_10092[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (36))){
var inst_9961 = (state_10011[(12)]);
var inst_9939 = inst_9961;
var state_10011__$1 = (function (){var statearr_10036 = state_10011;
(statearr_10036[(7)] = inst_9939);

return statearr_10036;
})();
var statearr_10037_10093 = state_10011__$1;
(statearr_10037_10093[(2)] = null);

(statearr_10037_10093[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (29))){
var inst_9985 = (state_10011[(10)]);
var state_10011__$1 = state_10011;
var statearr_10038_10094 = state_10011__$1;
(statearr_10038_10094[(2)] = inst_9985);

(statearr_10038_10094[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (6))){
var state_10011__$1 = state_10011;
var statearr_10039_10095 = state_10011__$1;
(statearr_10039_10095[(2)] = false);

(statearr_10039_10095[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (28))){
var inst_9981 = (state_10011[(2)]);
var inst_9982 = calc_state.call(null);
var inst_9939 = inst_9982;
var state_10011__$1 = (function (){var statearr_10040 = state_10011;
(statearr_10040[(15)] = inst_9981);

(statearr_10040[(7)] = inst_9939);

return statearr_10040;
})();
var statearr_10041_10096 = state_10011__$1;
(statearr_10041_10096[(2)] = null);

(statearr_10041_10096[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (25))){
var inst_10007 = (state_10011[(2)]);
var state_10011__$1 = state_10011;
var statearr_10042_10097 = state_10011__$1;
(statearr_10042_10097[(2)] = inst_10007);

(statearr_10042_10097[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (34))){
var inst_10005 = (state_10011[(2)]);
var state_10011__$1 = state_10011;
var statearr_10043_10098 = state_10011__$1;
(statearr_10043_10098[(2)] = inst_10005);

(statearr_10043_10098[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (17))){
var state_10011__$1 = state_10011;
var statearr_10044_10099 = state_10011__$1;
(statearr_10044_10099[(2)] = false);

(statearr_10044_10099[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (3))){
var state_10011__$1 = state_10011;
var statearr_10045_10100 = state_10011__$1;
(statearr_10045_10100[(2)] = false);

(statearr_10045_10100[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (12))){
var inst_10009 = (state_10011[(2)]);
var state_10011__$1 = state_10011;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10011__$1,inst_10009);
} else {
if((state_val_10012 === (2))){
var inst_9915 = (state_10011[(8)]);
var inst_9920 = inst_9915.cljs$lang$protocol_mask$partition0$;
var inst_9921 = (inst_9920 & (64));
var inst_9922 = inst_9915.cljs$core$ISeq$;
var inst_9923 = (inst_9921) || (inst_9922);
var state_10011__$1 = state_10011;
if(cljs.core.truth_(inst_9923)){
var statearr_10046_10101 = state_10011__$1;
(statearr_10046_10101[(1)] = (5));

} else {
var statearr_10047_10102 = state_10011__$1;
(statearr_10047_10102[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (23))){
var inst_9970 = (state_10011[(14)]);
var inst_9976 = (inst_9970 == null);
var state_10011__$1 = state_10011;
if(cljs.core.truth_(inst_9976)){
var statearr_10048_10103 = state_10011__$1;
(statearr_10048_10103[(1)] = (26));

} else {
var statearr_10049_10104 = state_10011__$1;
(statearr_10049_10104[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (35))){
var inst_9996 = (state_10011[(2)]);
var state_10011__$1 = state_10011;
if(cljs.core.truth_(inst_9996)){
var statearr_10050_10105 = state_10011__$1;
(statearr_10050_10105[(1)] = (36));

} else {
var statearr_10051_10106 = state_10011__$1;
(statearr_10051_10106[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (19))){
var inst_9939 = (state_10011[(7)]);
var inst_9958 = cljs.core.apply.call(null,cljs.core.hash_map,inst_9939);
var state_10011__$1 = state_10011;
var statearr_10052_10107 = state_10011__$1;
(statearr_10052_10107[(2)] = inst_9958);

(statearr_10052_10107[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (11))){
var inst_9939 = (state_10011[(7)]);
var inst_9943 = (inst_9939 == null);
var inst_9944 = cljs.core.not.call(null,inst_9943);
var state_10011__$1 = state_10011;
if(inst_9944){
var statearr_10053_10108 = state_10011__$1;
(statearr_10053_10108[(1)] = (13));

} else {
var statearr_10054_10109 = state_10011__$1;
(statearr_10054_10109[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (9))){
var inst_9915 = (state_10011[(8)]);
var state_10011__$1 = state_10011;
var statearr_10055_10110 = state_10011__$1;
(statearr_10055_10110[(2)] = inst_9915);

(statearr_10055_10110[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (5))){
var state_10011__$1 = state_10011;
var statearr_10056_10111 = state_10011__$1;
(statearr_10056_10111[(2)] = true);

(statearr_10056_10111[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (14))){
var state_10011__$1 = state_10011;
var statearr_10057_10112 = state_10011__$1;
(statearr_10057_10112[(2)] = false);

(statearr_10057_10112[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (26))){
var inst_9971 = (state_10011[(11)]);
var inst_9978 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_9971);
var state_10011__$1 = state_10011;
var statearr_10058_10113 = state_10011__$1;
(statearr_10058_10113[(2)] = inst_9978);

(statearr_10058_10113[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (16))){
var state_10011__$1 = state_10011;
var statearr_10059_10114 = state_10011__$1;
(statearr_10059_10114[(2)] = true);

(statearr_10059_10114[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (38))){
var inst_10001 = (state_10011[(2)]);
var state_10011__$1 = state_10011;
var statearr_10060_10115 = state_10011__$1;
(statearr_10060_10115[(2)] = inst_10001);

(statearr_10060_10115[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (30))){
var inst_9963 = (state_10011[(13)]);
var inst_9962 = (state_10011[(9)]);
var inst_9971 = (state_10011[(11)]);
var inst_9988 = cljs.core.empty_QMARK_.call(null,inst_9962);
var inst_9989 = inst_9963.call(null,inst_9971);
var inst_9990 = cljs.core.not.call(null,inst_9989);
var inst_9991 = (inst_9988) && (inst_9990);
var state_10011__$1 = state_10011;
var statearr_10061_10116 = state_10011__$1;
(statearr_10061_10116[(2)] = inst_9991);

(statearr_10061_10116[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (10))){
var inst_9915 = (state_10011[(8)]);
var inst_9935 = (state_10011[(2)]);
var inst_9936 = cljs.core.get.call(null,inst_9935,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_9937 = cljs.core.get.call(null,inst_9935,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_9938 = cljs.core.get.call(null,inst_9935,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_9939 = inst_9915;
var state_10011__$1 = (function (){var statearr_10062 = state_10011;
(statearr_10062[(16)] = inst_9937);

(statearr_10062[(17)] = inst_9936);

(statearr_10062[(18)] = inst_9938);

(statearr_10062[(7)] = inst_9939);

return statearr_10062;
})();
var statearr_10063_10117 = state_10011__$1;
(statearr_10063_10117[(2)] = null);

(statearr_10063_10117[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (18))){
var inst_9953 = (state_10011[(2)]);
var state_10011__$1 = state_10011;
var statearr_10064_10118 = state_10011__$1;
(statearr_10064_10118[(2)] = inst_9953);

(statearr_10064_10118[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (37))){
var state_10011__$1 = state_10011;
var statearr_10065_10119 = state_10011__$1;
(statearr_10065_10119[(2)] = null);

(statearr_10065_10119[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10012 === (8))){
var inst_9915 = (state_10011[(8)]);
var inst_9932 = cljs.core.apply.call(null,cljs.core.hash_map,inst_9915);
var state_10011__$1 = state_10011;
var statearr_10066_10120 = state_10011__$1;
(statearr_10066_10120[(2)] = inst_9932);

(statearr_10066_10120[(1)] = (10));


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
});})(c__8341__auto___10074,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__8229__auto__,c__8341__auto___10074,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__8230__auto__ = null;
var cljs$core$async$mix_$_state_machine__8230__auto____0 = (function (){
var statearr_10070 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_10070[(0)] = cljs$core$async$mix_$_state_machine__8230__auto__);

(statearr_10070[(1)] = (1));

return statearr_10070;
});
var cljs$core$async$mix_$_state_machine__8230__auto____1 = (function (state_10011){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_10011);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e10071){if((e10071 instanceof Object)){
var ex__8233__auto__ = e10071;
var statearr_10072_10121 = state_10011;
(statearr_10072_10121[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10011);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10071;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10122 = state_10011;
state_10011 = G__10122;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__8230__auto__ = function(state_10011){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__8230__auto____1.call(this,state_10011);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__8230__auto____0;
cljs$core$async$mix_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__8230__auto____1;
return cljs$core$async$mix_$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___10074,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__8343__auto__ = (function (){var statearr_10073 = f__8342__auto__.call(null);
(statearr_10073[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___10074);

return statearr_10073;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___10074,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
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
var x__27096__auto__ = (((p == null))?null:p);
var m__27097__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__27097__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,p,v,ch,close_QMARK_);
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
var x__27096__auto__ = (((p == null))?null:p);
var m__27097__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,p,v,ch);
} else {
var m__27097__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var args10123 = [];
var len__27348__auto___10126 = arguments.length;
var i__27349__auto___10127 = (0);
while(true){
if((i__27349__auto___10127 < len__27348__auto___10126)){
args10123.push((arguments[i__27349__auto___10127]));

var G__10128 = (i__27349__auto___10127 + (1));
i__27349__auto___10127 = G__10128;
continue;
} else {
}
break;
}

var G__10125 = args10123.length;
switch (G__10125) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10123.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__27096__auto__ = (((p == null))?null:p);
var m__27097__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,p);
} else {
var m__27097__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,p);
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
var x__27096__auto__ = (((p == null))?null:p);
var m__27097__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__27096__auto__)]);
if(!((m__27097__auto__ == null))){
return m__27097__auto__.call(null,p,v);
} else {
var m__27097__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__27097__auto____$1 == null))){
return m__27097__auto____$1.call(null,p,v);
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
var args10131 = [];
var len__27348__auto___10256 = arguments.length;
var i__27349__auto___10257 = (0);
while(true){
if((i__27349__auto___10257 < len__27348__auto___10256)){
args10131.push((arguments[i__27349__auto___10257]));

var G__10258 = (i__27349__auto___10257 + (1));
i__27349__auto___10257 = G__10258;
continue;
} else {
}
break;
}

var G__10133 = args10131.length;
switch (G__10133) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10131.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__26817__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__26817__auto__,mults){
return (function (p1__10130_SHARP_){
if(cljs.core.truth_(p1__10130_SHARP_.call(null,topic))){
return p1__10130_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__10130_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__26817__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t_cljs$core$async10134 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10134 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta10135){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta10135 = meta10135;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async10134.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_10136,meta10135__$1){
var self__ = this;
var _10136__$1 = this;
return (new cljs.core.async.t_cljs$core$async10134(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta10135__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async10134.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_10136){
var self__ = this;
var _10136__$1 = this;
return self__.meta10135;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async10134.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t_cljs$core$async10134.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async10134.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t_cljs$core$async10134.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async10134.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
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

cljs.core.async.t_cljs$core$async10134.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async10134.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async10134.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta10135","meta10135",1108784927,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async10134.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async10134.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10134";

cljs.core.async.t_cljs$core$async10134.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__27047__auto__,writer__27048__auto__,opt__27049__auto__){
return cljs.core._write.call(null,writer__27048__auto__,"cljs.core.async/t_cljs$core$async10134");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t_cljs$core$async10134 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async10134(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta10135){
return (new cljs.core.async.t_cljs$core$async10134(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta10135));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async10134(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__8341__auto___10260 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___10260,mults,ensure_mult,p){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___10260,mults,ensure_mult,p){
return (function (state_10208){
var state_val_10209 = (state_10208[(1)]);
if((state_val_10209 === (7))){
var inst_10204 = (state_10208[(2)]);
var state_10208__$1 = state_10208;
var statearr_10210_10261 = state_10208__$1;
(statearr_10210_10261[(2)] = inst_10204);

(statearr_10210_10261[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (20))){
var state_10208__$1 = state_10208;
var statearr_10211_10262 = state_10208__$1;
(statearr_10211_10262[(2)] = null);

(statearr_10211_10262[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (1))){
var state_10208__$1 = state_10208;
var statearr_10212_10263 = state_10208__$1;
(statearr_10212_10263[(2)] = null);

(statearr_10212_10263[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (24))){
var inst_10187 = (state_10208[(7)]);
var inst_10196 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_10187);
var state_10208__$1 = state_10208;
var statearr_10213_10264 = state_10208__$1;
(statearr_10213_10264[(2)] = inst_10196);

(statearr_10213_10264[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (4))){
var inst_10139 = (state_10208[(8)]);
var inst_10139__$1 = (state_10208[(2)]);
var inst_10140 = (inst_10139__$1 == null);
var state_10208__$1 = (function (){var statearr_10214 = state_10208;
(statearr_10214[(8)] = inst_10139__$1);

return statearr_10214;
})();
if(cljs.core.truth_(inst_10140)){
var statearr_10215_10265 = state_10208__$1;
(statearr_10215_10265[(1)] = (5));

} else {
var statearr_10216_10266 = state_10208__$1;
(statearr_10216_10266[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (15))){
var inst_10181 = (state_10208[(2)]);
var state_10208__$1 = state_10208;
var statearr_10217_10267 = state_10208__$1;
(statearr_10217_10267[(2)] = inst_10181);

(statearr_10217_10267[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (21))){
var inst_10201 = (state_10208[(2)]);
var state_10208__$1 = (function (){var statearr_10218 = state_10208;
(statearr_10218[(9)] = inst_10201);

return statearr_10218;
})();
var statearr_10219_10268 = state_10208__$1;
(statearr_10219_10268[(2)] = null);

(statearr_10219_10268[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (13))){
var inst_10163 = (state_10208[(10)]);
var inst_10165 = cljs.core.chunked_seq_QMARK_.call(null,inst_10163);
var state_10208__$1 = state_10208;
if(inst_10165){
var statearr_10220_10269 = state_10208__$1;
(statearr_10220_10269[(1)] = (16));

} else {
var statearr_10221_10270 = state_10208__$1;
(statearr_10221_10270[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (22))){
var inst_10193 = (state_10208[(2)]);
var state_10208__$1 = state_10208;
if(cljs.core.truth_(inst_10193)){
var statearr_10222_10271 = state_10208__$1;
(statearr_10222_10271[(1)] = (23));

} else {
var statearr_10223_10272 = state_10208__$1;
(statearr_10223_10272[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (6))){
var inst_10139 = (state_10208[(8)]);
var inst_10187 = (state_10208[(7)]);
var inst_10189 = (state_10208[(11)]);
var inst_10187__$1 = topic_fn.call(null,inst_10139);
var inst_10188 = cljs.core.deref.call(null,mults);
var inst_10189__$1 = cljs.core.get.call(null,inst_10188,inst_10187__$1);
var state_10208__$1 = (function (){var statearr_10224 = state_10208;
(statearr_10224[(7)] = inst_10187__$1);

(statearr_10224[(11)] = inst_10189__$1);

return statearr_10224;
})();
if(cljs.core.truth_(inst_10189__$1)){
var statearr_10225_10273 = state_10208__$1;
(statearr_10225_10273[(1)] = (19));

} else {
var statearr_10226_10274 = state_10208__$1;
(statearr_10226_10274[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (25))){
var inst_10198 = (state_10208[(2)]);
var state_10208__$1 = state_10208;
var statearr_10227_10275 = state_10208__$1;
(statearr_10227_10275[(2)] = inst_10198);

(statearr_10227_10275[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (17))){
var inst_10163 = (state_10208[(10)]);
var inst_10172 = cljs.core.first.call(null,inst_10163);
var inst_10173 = cljs.core.async.muxch_STAR_.call(null,inst_10172);
var inst_10174 = cljs.core.async.close_BANG_.call(null,inst_10173);
var inst_10175 = cljs.core.next.call(null,inst_10163);
var inst_10149 = inst_10175;
var inst_10150 = null;
var inst_10151 = (0);
var inst_10152 = (0);
var state_10208__$1 = (function (){var statearr_10228 = state_10208;
(statearr_10228[(12)] = inst_10150);

(statearr_10228[(13)] = inst_10152);

(statearr_10228[(14)] = inst_10151);

(statearr_10228[(15)] = inst_10174);

(statearr_10228[(16)] = inst_10149);

return statearr_10228;
})();
var statearr_10229_10276 = state_10208__$1;
(statearr_10229_10276[(2)] = null);

(statearr_10229_10276[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (3))){
var inst_10206 = (state_10208[(2)]);
var state_10208__$1 = state_10208;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10208__$1,inst_10206);
} else {
if((state_val_10209 === (12))){
var inst_10183 = (state_10208[(2)]);
var state_10208__$1 = state_10208;
var statearr_10230_10277 = state_10208__$1;
(statearr_10230_10277[(2)] = inst_10183);

(statearr_10230_10277[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (2))){
var state_10208__$1 = state_10208;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10208__$1,(4),ch);
} else {
if((state_val_10209 === (23))){
var state_10208__$1 = state_10208;
var statearr_10231_10278 = state_10208__$1;
(statearr_10231_10278[(2)] = null);

(statearr_10231_10278[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (19))){
var inst_10139 = (state_10208[(8)]);
var inst_10189 = (state_10208[(11)]);
var inst_10191 = cljs.core.async.muxch_STAR_.call(null,inst_10189);
var state_10208__$1 = state_10208;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10208__$1,(22),inst_10191,inst_10139);
} else {
if((state_val_10209 === (11))){
var inst_10163 = (state_10208[(10)]);
var inst_10149 = (state_10208[(16)]);
var inst_10163__$1 = cljs.core.seq.call(null,inst_10149);
var state_10208__$1 = (function (){var statearr_10232 = state_10208;
(statearr_10232[(10)] = inst_10163__$1);

return statearr_10232;
})();
if(inst_10163__$1){
var statearr_10233_10279 = state_10208__$1;
(statearr_10233_10279[(1)] = (13));

} else {
var statearr_10234_10280 = state_10208__$1;
(statearr_10234_10280[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (9))){
var inst_10185 = (state_10208[(2)]);
var state_10208__$1 = state_10208;
var statearr_10235_10281 = state_10208__$1;
(statearr_10235_10281[(2)] = inst_10185);

(statearr_10235_10281[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (5))){
var inst_10146 = cljs.core.deref.call(null,mults);
var inst_10147 = cljs.core.vals.call(null,inst_10146);
var inst_10148 = cljs.core.seq.call(null,inst_10147);
var inst_10149 = inst_10148;
var inst_10150 = null;
var inst_10151 = (0);
var inst_10152 = (0);
var state_10208__$1 = (function (){var statearr_10236 = state_10208;
(statearr_10236[(12)] = inst_10150);

(statearr_10236[(13)] = inst_10152);

(statearr_10236[(14)] = inst_10151);

(statearr_10236[(16)] = inst_10149);

return statearr_10236;
})();
var statearr_10237_10282 = state_10208__$1;
(statearr_10237_10282[(2)] = null);

(statearr_10237_10282[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (14))){
var state_10208__$1 = state_10208;
var statearr_10241_10283 = state_10208__$1;
(statearr_10241_10283[(2)] = null);

(statearr_10241_10283[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (16))){
var inst_10163 = (state_10208[(10)]);
var inst_10167 = cljs.core.chunk_first.call(null,inst_10163);
var inst_10168 = cljs.core.chunk_rest.call(null,inst_10163);
var inst_10169 = cljs.core.count.call(null,inst_10167);
var inst_10149 = inst_10168;
var inst_10150 = inst_10167;
var inst_10151 = inst_10169;
var inst_10152 = (0);
var state_10208__$1 = (function (){var statearr_10242 = state_10208;
(statearr_10242[(12)] = inst_10150);

(statearr_10242[(13)] = inst_10152);

(statearr_10242[(14)] = inst_10151);

(statearr_10242[(16)] = inst_10149);

return statearr_10242;
})();
var statearr_10243_10284 = state_10208__$1;
(statearr_10243_10284[(2)] = null);

(statearr_10243_10284[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (10))){
var inst_10150 = (state_10208[(12)]);
var inst_10152 = (state_10208[(13)]);
var inst_10151 = (state_10208[(14)]);
var inst_10149 = (state_10208[(16)]);
var inst_10157 = cljs.core._nth.call(null,inst_10150,inst_10152);
var inst_10158 = cljs.core.async.muxch_STAR_.call(null,inst_10157);
var inst_10159 = cljs.core.async.close_BANG_.call(null,inst_10158);
var inst_10160 = (inst_10152 + (1));
var tmp10238 = inst_10150;
var tmp10239 = inst_10151;
var tmp10240 = inst_10149;
var inst_10149__$1 = tmp10240;
var inst_10150__$1 = tmp10238;
var inst_10151__$1 = tmp10239;
var inst_10152__$1 = inst_10160;
var state_10208__$1 = (function (){var statearr_10244 = state_10208;
(statearr_10244[(12)] = inst_10150__$1);

(statearr_10244[(13)] = inst_10152__$1);

(statearr_10244[(14)] = inst_10151__$1);

(statearr_10244[(16)] = inst_10149__$1);

(statearr_10244[(17)] = inst_10159);

return statearr_10244;
})();
var statearr_10245_10285 = state_10208__$1;
(statearr_10245_10285[(2)] = null);

(statearr_10245_10285[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (18))){
var inst_10178 = (state_10208[(2)]);
var state_10208__$1 = state_10208;
var statearr_10246_10286 = state_10208__$1;
(statearr_10246_10286[(2)] = inst_10178);

(statearr_10246_10286[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10209 === (8))){
var inst_10152 = (state_10208[(13)]);
var inst_10151 = (state_10208[(14)]);
var inst_10154 = (inst_10152 < inst_10151);
var inst_10155 = inst_10154;
var state_10208__$1 = state_10208;
if(cljs.core.truth_(inst_10155)){
var statearr_10247_10287 = state_10208__$1;
(statearr_10247_10287[(1)] = (10));

} else {
var statearr_10248_10288 = state_10208__$1;
(statearr_10248_10288[(1)] = (11));

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
});})(c__8341__auto___10260,mults,ensure_mult,p))
;
return ((function (switch__8229__auto__,c__8341__auto___10260,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__8230__auto__ = null;
var cljs$core$async$state_machine__8230__auto____0 = (function (){
var statearr_10252 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_10252[(0)] = cljs$core$async$state_machine__8230__auto__);

(statearr_10252[(1)] = (1));

return statearr_10252;
});
var cljs$core$async$state_machine__8230__auto____1 = (function (state_10208){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_10208);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e10253){if((e10253 instanceof Object)){
var ex__8233__auto__ = e10253;
var statearr_10254_10289 = state_10208;
(statearr_10254_10289[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10208);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10253;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10290 = state_10208;
state_10208 = G__10290;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$state_machine__8230__auto__ = function(state_10208){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__8230__auto____1.call(this,state_10208);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__8230__auto____0;
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__8230__auto____1;
return cljs$core$async$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___10260,mults,ensure_mult,p))
})();
var state__8343__auto__ = (function (){var statearr_10255 = f__8342__auto__.call(null);
(statearr_10255[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___10260);

return statearr_10255;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___10260,mults,ensure_mult,p))
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
var args10291 = [];
var len__27348__auto___10294 = arguments.length;
var i__27349__auto___10295 = (0);
while(true){
if((i__27349__auto___10295 < len__27348__auto___10294)){
args10291.push((arguments[i__27349__auto___10295]));

var G__10296 = (i__27349__auto___10295 + (1));
i__27349__auto___10295 = G__10296;
continue;
} else {
}
break;
}

var G__10293 = args10291.length;
switch (G__10293) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10291.length)].join('')));

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
var args10298 = [];
var len__27348__auto___10301 = arguments.length;
var i__27349__auto___10302 = (0);
while(true){
if((i__27349__auto___10302 < len__27348__auto___10301)){
args10298.push((arguments[i__27349__auto___10302]));

var G__10303 = (i__27349__auto___10302 + (1));
i__27349__auto___10302 = G__10303;
continue;
} else {
}
break;
}

var G__10300 = args10298.length;
switch (G__10300) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10298.length)].join('')));

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
var args10305 = [];
var len__27348__auto___10376 = arguments.length;
var i__27349__auto___10377 = (0);
while(true){
if((i__27349__auto___10377 < len__27348__auto___10376)){
args10305.push((arguments[i__27349__auto___10377]));

var G__10378 = (i__27349__auto___10377 + (1));
i__27349__auto___10377 = G__10378;
continue;
} else {
}
break;
}

var G__10307 = args10305.length;
switch (G__10307) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10305.length)].join('')));

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
var c__8341__auto___10380 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___10380,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___10380,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_10346){
var state_val_10347 = (state_10346[(1)]);
if((state_val_10347 === (7))){
var state_10346__$1 = state_10346;
var statearr_10348_10381 = state_10346__$1;
(statearr_10348_10381[(2)] = null);

(statearr_10348_10381[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10347 === (1))){
var state_10346__$1 = state_10346;
var statearr_10349_10382 = state_10346__$1;
(statearr_10349_10382[(2)] = null);

(statearr_10349_10382[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10347 === (4))){
var inst_10310 = (state_10346[(7)]);
var inst_10312 = (inst_10310 < cnt);
var state_10346__$1 = state_10346;
if(cljs.core.truth_(inst_10312)){
var statearr_10350_10383 = state_10346__$1;
(statearr_10350_10383[(1)] = (6));

} else {
var statearr_10351_10384 = state_10346__$1;
(statearr_10351_10384[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10347 === (15))){
var inst_10342 = (state_10346[(2)]);
var state_10346__$1 = state_10346;
var statearr_10352_10385 = state_10346__$1;
(statearr_10352_10385[(2)] = inst_10342);

(statearr_10352_10385[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10347 === (13))){
var inst_10335 = cljs.core.async.close_BANG_.call(null,out);
var state_10346__$1 = state_10346;
var statearr_10353_10386 = state_10346__$1;
(statearr_10353_10386[(2)] = inst_10335);

(statearr_10353_10386[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10347 === (6))){
var state_10346__$1 = state_10346;
var statearr_10354_10387 = state_10346__$1;
(statearr_10354_10387[(2)] = null);

(statearr_10354_10387[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10347 === (3))){
var inst_10344 = (state_10346[(2)]);
var state_10346__$1 = state_10346;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10346__$1,inst_10344);
} else {
if((state_val_10347 === (12))){
var inst_10332 = (state_10346[(8)]);
var inst_10332__$1 = (state_10346[(2)]);
var inst_10333 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_10332__$1);
var state_10346__$1 = (function (){var statearr_10355 = state_10346;
(statearr_10355[(8)] = inst_10332__$1);

return statearr_10355;
})();
if(cljs.core.truth_(inst_10333)){
var statearr_10356_10388 = state_10346__$1;
(statearr_10356_10388[(1)] = (13));

} else {
var statearr_10357_10389 = state_10346__$1;
(statearr_10357_10389[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10347 === (2))){
var inst_10309 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_10310 = (0);
var state_10346__$1 = (function (){var statearr_10358 = state_10346;
(statearr_10358[(7)] = inst_10310);

(statearr_10358[(9)] = inst_10309);

return statearr_10358;
})();
var statearr_10359_10390 = state_10346__$1;
(statearr_10359_10390[(2)] = null);

(statearr_10359_10390[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10347 === (11))){
var inst_10310 = (state_10346[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_10346,(10),Object,null,(9));
var inst_10319 = chs__$1.call(null,inst_10310);
var inst_10320 = done.call(null,inst_10310);
var inst_10321 = cljs.core.async.take_BANG_.call(null,inst_10319,inst_10320);
var state_10346__$1 = state_10346;
var statearr_10360_10391 = state_10346__$1;
(statearr_10360_10391[(2)] = inst_10321);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10346__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10347 === (9))){
var inst_10310 = (state_10346[(7)]);
var inst_10323 = (state_10346[(2)]);
var inst_10324 = (inst_10310 + (1));
var inst_10310__$1 = inst_10324;
var state_10346__$1 = (function (){var statearr_10361 = state_10346;
(statearr_10361[(7)] = inst_10310__$1);

(statearr_10361[(10)] = inst_10323);

return statearr_10361;
})();
var statearr_10362_10392 = state_10346__$1;
(statearr_10362_10392[(2)] = null);

(statearr_10362_10392[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10347 === (5))){
var inst_10330 = (state_10346[(2)]);
var state_10346__$1 = (function (){var statearr_10363 = state_10346;
(statearr_10363[(11)] = inst_10330);

return statearr_10363;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10346__$1,(12),dchan);
} else {
if((state_val_10347 === (14))){
var inst_10332 = (state_10346[(8)]);
var inst_10337 = cljs.core.apply.call(null,f,inst_10332);
var state_10346__$1 = state_10346;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10346__$1,(16),out,inst_10337);
} else {
if((state_val_10347 === (16))){
var inst_10339 = (state_10346[(2)]);
var state_10346__$1 = (function (){var statearr_10364 = state_10346;
(statearr_10364[(12)] = inst_10339);

return statearr_10364;
})();
var statearr_10365_10393 = state_10346__$1;
(statearr_10365_10393[(2)] = null);

(statearr_10365_10393[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10347 === (10))){
var inst_10314 = (state_10346[(2)]);
var inst_10315 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_10346__$1 = (function (){var statearr_10366 = state_10346;
(statearr_10366[(13)] = inst_10314);

return statearr_10366;
})();
var statearr_10367_10394 = state_10346__$1;
(statearr_10367_10394[(2)] = inst_10315);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10346__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10347 === (8))){
var inst_10328 = (state_10346[(2)]);
var state_10346__$1 = state_10346;
var statearr_10368_10395 = state_10346__$1;
(statearr_10368_10395[(2)] = inst_10328);

(statearr_10368_10395[(1)] = (5));


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
});})(c__8341__auto___10380,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__8229__auto__,c__8341__auto___10380,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__8230__auto__ = null;
var cljs$core$async$state_machine__8230__auto____0 = (function (){
var statearr_10372 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_10372[(0)] = cljs$core$async$state_machine__8230__auto__);

(statearr_10372[(1)] = (1));

return statearr_10372;
});
var cljs$core$async$state_machine__8230__auto____1 = (function (state_10346){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_10346);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e10373){if((e10373 instanceof Object)){
var ex__8233__auto__ = e10373;
var statearr_10374_10396 = state_10346;
(statearr_10374_10396[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10346);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10373;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10397 = state_10346;
state_10346 = G__10397;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$state_machine__8230__auto__ = function(state_10346){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__8230__auto____1.call(this,state_10346);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__8230__auto____0;
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__8230__auto____1;
return cljs$core$async$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___10380,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__8343__auto__ = (function (){var statearr_10375 = f__8342__auto__.call(null);
(statearr_10375[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___10380);

return statearr_10375;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___10380,chs__$1,out,cnt,rets,dchan,dctr,done))
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
var args10399 = [];
var len__27348__auto___10457 = arguments.length;
var i__27349__auto___10458 = (0);
while(true){
if((i__27349__auto___10458 < len__27348__auto___10457)){
args10399.push((arguments[i__27349__auto___10458]));

var G__10459 = (i__27349__auto___10458 + (1));
i__27349__auto___10458 = G__10459;
continue;
} else {
}
break;
}

var G__10401 = args10399.length;
switch (G__10401) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10399.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__8341__auto___10461 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___10461,out){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___10461,out){
return (function (state_10433){
var state_val_10434 = (state_10433[(1)]);
if((state_val_10434 === (7))){
var inst_10412 = (state_10433[(7)]);
var inst_10413 = (state_10433[(8)]);
var inst_10412__$1 = (state_10433[(2)]);
var inst_10413__$1 = cljs.core.nth.call(null,inst_10412__$1,(0),null);
var inst_10414 = cljs.core.nth.call(null,inst_10412__$1,(1),null);
var inst_10415 = (inst_10413__$1 == null);
var state_10433__$1 = (function (){var statearr_10435 = state_10433;
(statearr_10435[(7)] = inst_10412__$1);

(statearr_10435[(8)] = inst_10413__$1);

(statearr_10435[(9)] = inst_10414);

return statearr_10435;
})();
if(cljs.core.truth_(inst_10415)){
var statearr_10436_10462 = state_10433__$1;
(statearr_10436_10462[(1)] = (8));

} else {
var statearr_10437_10463 = state_10433__$1;
(statearr_10437_10463[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10434 === (1))){
var inst_10402 = cljs.core.vec.call(null,chs);
var inst_10403 = inst_10402;
var state_10433__$1 = (function (){var statearr_10438 = state_10433;
(statearr_10438[(10)] = inst_10403);

return statearr_10438;
})();
var statearr_10439_10464 = state_10433__$1;
(statearr_10439_10464[(2)] = null);

(statearr_10439_10464[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10434 === (4))){
var inst_10403 = (state_10433[(10)]);
var state_10433__$1 = state_10433;
return cljs.core.async.ioc_alts_BANG_.call(null,state_10433__$1,(7),inst_10403);
} else {
if((state_val_10434 === (6))){
var inst_10429 = (state_10433[(2)]);
var state_10433__$1 = state_10433;
var statearr_10440_10465 = state_10433__$1;
(statearr_10440_10465[(2)] = inst_10429);

(statearr_10440_10465[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10434 === (3))){
var inst_10431 = (state_10433[(2)]);
var state_10433__$1 = state_10433;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10433__$1,inst_10431);
} else {
if((state_val_10434 === (2))){
var inst_10403 = (state_10433[(10)]);
var inst_10405 = cljs.core.count.call(null,inst_10403);
var inst_10406 = (inst_10405 > (0));
var state_10433__$1 = state_10433;
if(cljs.core.truth_(inst_10406)){
var statearr_10442_10466 = state_10433__$1;
(statearr_10442_10466[(1)] = (4));

} else {
var statearr_10443_10467 = state_10433__$1;
(statearr_10443_10467[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10434 === (11))){
var inst_10403 = (state_10433[(10)]);
var inst_10422 = (state_10433[(2)]);
var tmp10441 = inst_10403;
var inst_10403__$1 = tmp10441;
var state_10433__$1 = (function (){var statearr_10444 = state_10433;
(statearr_10444[(10)] = inst_10403__$1);

(statearr_10444[(11)] = inst_10422);

return statearr_10444;
})();
var statearr_10445_10468 = state_10433__$1;
(statearr_10445_10468[(2)] = null);

(statearr_10445_10468[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10434 === (9))){
var inst_10413 = (state_10433[(8)]);
var state_10433__$1 = state_10433;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10433__$1,(11),out,inst_10413);
} else {
if((state_val_10434 === (5))){
var inst_10427 = cljs.core.async.close_BANG_.call(null,out);
var state_10433__$1 = state_10433;
var statearr_10446_10469 = state_10433__$1;
(statearr_10446_10469[(2)] = inst_10427);

(statearr_10446_10469[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10434 === (10))){
var inst_10425 = (state_10433[(2)]);
var state_10433__$1 = state_10433;
var statearr_10447_10470 = state_10433__$1;
(statearr_10447_10470[(2)] = inst_10425);

(statearr_10447_10470[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10434 === (8))){
var inst_10412 = (state_10433[(7)]);
var inst_10413 = (state_10433[(8)]);
var inst_10403 = (state_10433[(10)]);
var inst_10414 = (state_10433[(9)]);
var inst_10417 = (function (){var cs = inst_10403;
var vec__10408 = inst_10412;
var v = inst_10413;
var c = inst_10414;
return ((function (cs,vec__10408,v,c,inst_10412,inst_10413,inst_10403,inst_10414,state_val_10434,c__8341__auto___10461,out){
return (function (p1__10398_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__10398_SHARP_);
});
;})(cs,vec__10408,v,c,inst_10412,inst_10413,inst_10403,inst_10414,state_val_10434,c__8341__auto___10461,out))
})();
var inst_10418 = cljs.core.filterv.call(null,inst_10417,inst_10403);
var inst_10403__$1 = inst_10418;
var state_10433__$1 = (function (){var statearr_10448 = state_10433;
(statearr_10448[(10)] = inst_10403__$1);

return statearr_10448;
})();
var statearr_10449_10471 = state_10433__$1;
(statearr_10449_10471[(2)] = null);

(statearr_10449_10471[(1)] = (2));


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
});})(c__8341__auto___10461,out))
;
return ((function (switch__8229__auto__,c__8341__auto___10461,out){
return (function() {
var cljs$core$async$state_machine__8230__auto__ = null;
var cljs$core$async$state_machine__8230__auto____0 = (function (){
var statearr_10453 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_10453[(0)] = cljs$core$async$state_machine__8230__auto__);

(statearr_10453[(1)] = (1));

return statearr_10453;
});
var cljs$core$async$state_machine__8230__auto____1 = (function (state_10433){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_10433);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e10454){if((e10454 instanceof Object)){
var ex__8233__auto__ = e10454;
var statearr_10455_10472 = state_10433;
(statearr_10455_10472[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10433);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10454;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10473 = state_10433;
state_10433 = G__10473;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$state_machine__8230__auto__ = function(state_10433){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__8230__auto____1.call(this,state_10433);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__8230__auto____0;
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__8230__auto____1;
return cljs$core$async$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___10461,out))
})();
var state__8343__auto__ = (function (){var statearr_10456 = f__8342__auto__.call(null);
(statearr_10456[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___10461);

return statearr_10456;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___10461,out))
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
var args10474 = [];
var len__27348__auto___10523 = arguments.length;
var i__27349__auto___10524 = (0);
while(true){
if((i__27349__auto___10524 < len__27348__auto___10523)){
args10474.push((arguments[i__27349__auto___10524]));

var G__10525 = (i__27349__auto___10524 + (1));
i__27349__auto___10524 = G__10525;
continue;
} else {
}
break;
}

var G__10476 = args10474.length;
switch (G__10476) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10474.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__8341__auto___10527 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___10527,out){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___10527,out){
return (function (state_10500){
var state_val_10501 = (state_10500[(1)]);
if((state_val_10501 === (7))){
var inst_10482 = (state_10500[(7)]);
var inst_10482__$1 = (state_10500[(2)]);
var inst_10483 = (inst_10482__$1 == null);
var inst_10484 = cljs.core.not.call(null,inst_10483);
var state_10500__$1 = (function (){var statearr_10502 = state_10500;
(statearr_10502[(7)] = inst_10482__$1);

return statearr_10502;
})();
if(inst_10484){
var statearr_10503_10528 = state_10500__$1;
(statearr_10503_10528[(1)] = (8));

} else {
var statearr_10504_10529 = state_10500__$1;
(statearr_10504_10529[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10501 === (1))){
var inst_10477 = (0);
var state_10500__$1 = (function (){var statearr_10505 = state_10500;
(statearr_10505[(8)] = inst_10477);

return statearr_10505;
})();
var statearr_10506_10530 = state_10500__$1;
(statearr_10506_10530[(2)] = null);

(statearr_10506_10530[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10501 === (4))){
var state_10500__$1 = state_10500;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10500__$1,(7),ch);
} else {
if((state_val_10501 === (6))){
var inst_10495 = (state_10500[(2)]);
var state_10500__$1 = state_10500;
var statearr_10507_10531 = state_10500__$1;
(statearr_10507_10531[(2)] = inst_10495);

(statearr_10507_10531[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10501 === (3))){
var inst_10497 = (state_10500[(2)]);
var inst_10498 = cljs.core.async.close_BANG_.call(null,out);
var state_10500__$1 = (function (){var statearr_10508 = state_10500;
(statearr_10508[(9)] = inst_10497);

return statearr_10508;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10500__$1,inst_10498);
} else {
if((state_val_10501 === (2))){
var inst_10477 = (state_10500[(8)]);
var inst_10479 = (inst_10477 < n);
var state_10500__$1 = state_10500;
if(cljs.core.truth_(inst_10479)){
var statearr_10509_10532 = state_10500__$1;
(statearr_10509_10532[(1)] = (4));

} else {
var statearr_10510_10533 = state_10500__$1;
(statearr_10510_10533[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10501 === (11))){
var inst_10477 = (state_10500[(8)]);
var inst_10487 = (state_10500[(2)]);
var inst_10488 = (inst_10477 + (1));
var inst_10477__$1 = inst_10488;
var state_10500__$1 = (function (){var statearr_10511 = state_10500;
(statearr_10511[(10)] = inst_10487);

(statearr_10511[(8)] = inst_10477__$1);

return statearr_10511;
})();
var statearr_10512_10534 = state_10500__$1;
(statearr_10512_10534[(2)] = null);

(statearr_10512_10534[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10501 === (9))){
var state_10500__$1 = state_10500;
var statearr_10513_10535 = state_10500__$1;
(statearr_10513_10535[(2)] = null);

(statearr_10513_10535[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10501 === (5))){
var state_10500__$1 = state_10500;
var statearr_10514_10536 = state_10500__$1;
(statearr_10514_10536[(2)] = null);

(statearr_10514_10536[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10501 === (10))){
var inst_10492 = (state_10500[(2)]);
var state_10500__$1 = state_10500;
var statearr_10515_10537 = state_10500__$1;
(statearr_10515_10537[(2)] = inst_10492);

(statearr_10515_10537[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10501 === (8))){
var inst_10482 = (state_10500[(7)]);
var state_10500__$1 = state_10500;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10500__$1,(11),out,inst_10482);
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
});})(c__8341__auto___10527,out))
;
return ((function (switch__8229__auto__,c__8341__auto___10527,out){
return (function() {
var cljs$core$async$state_machine__8230__auto__ = null;
var cljs$core$async$state_machine__8230__auto____0 = (function (){
var statearr_10519 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_10519[(0)] = cljs$core$async$state_machine__8230__auto__);

(statearr_10519[(1)] = (1));

return statearr_10519;
});
var cljs$core$async$state_machine__8230__auto____1 = (function (state_10500){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_10500);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e10520){if((e10520 instanceof Object)){
var ex__8233__auto__ = e10520;
var statearr_10521_10538 = state_10500;
(statearr_10521_10538[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10500);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10520;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10539 = state_10500;
state_10500 = G__10539;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$state_machine__8230__auto__ = function(state_10500){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__8230__auto____1.call(this,state_10500);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__8230__auto____0;
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__8230__auto____1;
return cljs$core$async$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___10527,out))
})();
var state__8343__auto__ = (function (){var statearr_10522 = f__8342__auto__.call(null);
(statearr_10522[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___10527);

return statearr_10522;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___10527,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async10547 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10547 = (function (map_LT_,f,ch,meta10548){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta10548 = meta10548;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async10547.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10549,meta10548__$1){
var self__ = this;
var _10549__$1 = this;
return (new cljs.core.async.t_cljs$core$async10547(self__.map_LT_,self__.f,self__.ch,meta10548__$1));
});

cljs.core.async.t_cljs$core$async10547.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10549){
var self__ = this;
var _10549__$1 = this;
return self__.meta10548;
});

cljs.core.async.t_cljs$core$async10547.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async10547.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async10547.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async10547.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async10547.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t_cljs$core$async10550 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10550 = (function (map_LT_,f,ch,meta10548,_,fn1,meta10551){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta10548 = meta10548;
this._ = _;
this.fn1 = fn1;
this.meta10551 = meta10551;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async10550.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_10552,meta10551__$1){
var self__ = this;
var _10552__$1 = this;
return (new cljs.core.async.t_cljs$core$async10550(self__.map_LT_,self__.f,self__.ch,self__.meta10548,self__._,self__.fn1,meta10551__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async10550.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_10552){
var self__ = this;
var _10552__$1 = this;
return self__.meta10551;
});})(___$1))
;

cljs.core.async.t_cljs$core$async10550.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t_cljs$core$async10550.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async10550.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
});})(___$1))
;

cljs.core.async.t_cljs$core$async10550.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__10540_SHARP_){
return f1.call(null,(((p1__10540_SHARP_ == null))?null:self__.f.call(null,p1__10540_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async10550.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta10548","meta10548",573327075,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async10547","cljs.core.async/t_cljs$core$async10547",-520511327,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta10551","meta10551",-751863530,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async10550.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async10550.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10550";

cljs.core.async.t_cljs$core$async10550.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__27047__auto__,writer__27048__auto__,opt__27049__auto__){
return cljs.core._write.call(null,writer__27048__auto__,"cljs.core.async/t_cljs$core$async10550");
});})(___$1))
;

cljs.core.async.__GT_t_cljs$core$async10550 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async10550(map_LT___$1,f__$1,ch__$1,meta10548__$1,___$2,fn1__$1,meta10551){
return (new cljs.core.async.t_cljs$core$async10550(map_LT___$1,f__$1,ch__$1,meta10548__$1,___$2,fn1__$1,meta10551));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async10550(self__.map_LT_,self__.f,self__.ch,self__.meta10548,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__26809__auto__ = ret;
if(cljs.core.truth_(and__26809__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__26809__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async10547.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async10547.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async10547.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta10548","meta10548",573327075,null)], null);
});

cljs.core.async.t_cljs$core$async10547.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async10547.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10547";

cljs.core.async.t_cljs$core$async10547.cljs$lang$ctorPrWriter = (function (this__27047__auto__,writer__27048__auto__,opt__27049__auto__){
return cljs.core._write.call(null,writer__27048__auto__,"cljs.core.async/t_cljs$core$async10547");
});

cljs.core.async.__GT_t_cljs$core$async10547 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async10547(map_LT___$1,f__$1,ch__$1,meta10548){
return (new cljs.core.async.t_cljs$core$async10547(map_LT___$1,f__$1,ch__$1,meta10548));
});

}

return (new cljs.core.async.t_cljs$core$async10547(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t_cljs$core$async10556 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10556 = (function (map_GT_,f,ch,meta10557){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta10557 = meta10557;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async10556.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10558,meta10557__$1){
var self__ = this;
var _10558__$1 = this;
return (new cljs.core.async.t_cljs$core$async10556(self__.map_GT_,self__.f,self__.ch,meta10557__$1));
});

cljs.core.async.t_cljs$core$async10556.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10558){
var self__ = this;
var _10558__$1 = this;
return self__.meta10557;
});

cljs.core.async.t_cljs$core$async10556.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async10556.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async10556.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async10556.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async10556.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async10556.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async10556.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta10557","meta10557",657391391,null)], null);
});

cljs.core.async.t_cljs$core$async10556.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async10556.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10556";

cljs.core.async.t_cljs$core$async10556.cljs$lang$ctorPrWriter = (function (this__27047__auto__,writer__27048__auto__,opt__27049__auto__){
return cljs.core._write.call(null,writer__27048__auto__,"cljs.core.async/t_cljs$core$async10556");
});

cljs.core.async.__GT_t_cljs$core$async10556 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async10556(map_GT___$1,f__$1,ch__$1,meta10557){
return (new cljs.core.async.t_cljs$core$async10556(map_GT___$1,f__$1,ch__$1,meta10557));
});

}

return (new cljs.core.async.t_cljs$core$async10556(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t_cljs$core$async10562 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async10562 = (function (filter_GT_,p,ch,meta10563){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta10563 = meta10563;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t_cljs$core$async10562.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_10564,meta10563__$1){
var self__ = this;
var _10564__$1 = this;
return (new cljs.core.async.t_cljs$core$async10562(self__.filter_GT_,self__.p,self__.ch,meta10563__$1));
});

cljs.core.async.t_cljs$core$async10562.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_10564){
var self__ = this;
var _10564__$1 = this;
return self__.meta10563;
});

cljs.core.async.t_cljs$core$async10562.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t_cljs$core$async10562.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async10562.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async10562.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t_cljs$core$async10562.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async10562.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t_cljs$core$async10562.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async10562.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta10563","meta10563",1207779979,null)], null);
});

cljs.core.async.t_cljs$core$async10562.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async10562.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async10562";

cljs.core.async.t_cljs$core$async10562.cljs$lang$ctorPrWriter = (function (this__27047__auto__,writer__27048__auto__,opt__27049__auto__){
return cljs.core._write.call(null,writer__27048__auto__,"cljs.core.async/t_cljs$core$async10562");
});

cljs.core.async.__GT_t_cljs$core$async10562 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async10562(filter_GT___$1,p__$1,ch__$1,meta10563){
return (new cljs.core.async.t_cljs$core$async10562(filter_GT___$1,p__$1,ch__$1,meta10563));
});

}

return (new cljs.core.async.t_cljs$core$async10562(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
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
var args10565 = [];
var len__27348__auto___10609 = arguments.length;
var i__27349__auto___10610 = (0);
while(true){
if((i__27349__auto___10610 < len__27348__auto___10609)){
args10565.push((arguments[i__27349__auto___10610]));

var G__10611 = (i__27349__auto___10610 + (1));
i__27349__auto___10610 = G__10611;
continue;
} else {
}
break;
}

var G__10567 = args10565.length;
switch (G__10567) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10565.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__8341__auto___10613 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___10613,out){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___10613,out){
return (function (state_10588){
var state_val_10589 = (state_10588[(1)]);
if((state_val_10589 === (7))){
var inst_10584 = (state_10588[(2)]);
var state_10588__$1 = state_10588;
var statearr_10590_10614 = state_10588__$1;
(statearr_10590_10614[(2)] = inst_10584);

(statearr_10590_10614[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10589 === (1))){
var state_10588__$1 = state_10588;
var statearr_10591_10615 = state_10588__$1;
(statearr_10591_10615[(2)] = null);

(statearr_10591_10615[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10589 === (4))){
var inst_10570 = (state_10588[(7)]);
var inst_10570__$1 = (state_10588[(2)]);
var inst_10571 = (inst_10570__$1 == null);
var state_10588__$1 = (function (){var statearr_10592 = state_10588;
(statearr_10592[(7)] = inst_10570__$1);

return statearr_10592;
})();
if(cljs.core.truth_(inst_10571)){
var statearr_10593_10616 = state_10588__$1;
(statearr_10593_10616[(1)] = (5));

} else {
var statearr_10594_10617 = state_10588__$1;
(statearr_10594_10617[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10589 === (6))){
var inst_10570 = (state_10588[(7)]);
var inst_10575 = p.call(null,inst_10570);
var state_10588__$1 = state_10588;
if(cljs.core.truth_(inst_10575)){
var statearr_10595_10618 = state_10588__$1;
(statearr_10595_10618[(1)] = (8));

} else {
var statearr_10596_10619 = state_10588__$1;
(statearr_10596_10619[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10589 === (3))){
var inst_10586 = (state_10588[(2)]);
var state_10588__$1 = state_10588;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10588__$1,inst_10586);
} else {
if((state_val_10589 === (2))){
var state_10588__$1 = state_10588;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10588__$1,(4),ch);
} else {
if((state_val_10589 === (11))){
var inst_10578 = (state_10588[(2)]);
var state_10588__$1 = state_10588;
var statearr_10597_10620 = state_10588__$1;
(statearr_10597_10620[(2)] = inst_10578);

(statearr_10597_10620[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10589 === (9))){
var state_10588__$1 = state_10588;
var statearr_10598_10621 = state_10588__$1;
(statearr_10598_10621[(2)] = null);

(statearr_10598_10621[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10589 === (5))){
var inst_10573 = cljs.core.async.close_BANG_.call(null,out);
var state_10588__$1 = state_10588;
var statearr_10599_10622 = state_10588__$1;
(statearr_10599_10622[(2)] = inst_10573);

(statearr_10599_10622[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10589 === (10))){
var inst_10581 = (state_10588[(2)]);
var state_10588__$1 = (function (){var statearr_10600 = state_10588;
(statearr_10600[(8)] = inst_10581);

return statearr_10600;
})();
var statearr_10601_10623 = state_10588__$1;
(statearr_10601_10623[(2)] = null);

(statearr_10601_10623[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10589 === (8))){
var inst_10570 = (state_10588[(7)]);
var state_10588__$1 = state_10588;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10588__$1,(11),out,inst_10570);
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
});})(c__8341__auto___10613,out))
;
return ((function (switch__8229__auto__,c__8341__auto___10613,out){
return (function() {
var cljs$core$async$state_machine__8230__auto__ = null;
var cljs$core$async$state_machine__8230__auto____0 = (function (){
var statearr_10605 = [null,null,null,null,null,null,null,null,null];
(statearr_10605[(0)] = cljs$core$async$state_machine__8230__auto__);

(statearr_10605[(1)] = (1));

return statearr_10605;
});
var cljs$core$async$state_machine__8230__auto____1 = (function (state_10588){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_10588);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e10606){if((e10606 instanceof Object)){
var ex__8233__auto__ = e10606;
var statearr_10607_10624 = state_10588;
(statearr_10607_10624[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10588);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10606;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10625 = state_10588;
state_10588 = G__10625;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$state_machine__8230__auto__ = function(state_10588){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__8230__auto____1.call(this,state_10588);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__8230__auto____0;
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__8230__auto____1;
return cljs$core$async$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___10613,out))
})();
var state__8343__auto__ = (function (){var statearr_10608 = f__8342__auto__.call(null);
(statearr_10608[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___10613);

return statearr_10608;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___10613,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var args10626 = [];
var len__27348__auto___10629 = arguments.length;
var i__27349__auto___10630 = (0);
while(true){
if((i__27349__auto___10630 < len__27348__auto___10629)){
args10626.push((arguments[i__27349__auto___10630]));

var G__10631 = (i__27349__auto___10630 + (1));
i__27349__auto___10630 = G__10631;
continue;
} else {
}
break;
}

var G__10628 = args10626.length;
switch (G__10628) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10626.length)].join('')));

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
var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__){
return (function (state_10798){
var state_val_10799 = (state_10798[(1)]);
if((state_val_10799 === (7))){
var inst_10794 = (state_10798[(2)]);
var state_10798__$1 = state_10798;
var statearr_10800_10841 = state_10798__$1;
(statearr_10800_10841[(2)] = inst_10794);

(statearr_10800_10841[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (20))){
var inst_10764 = (state_10798[(7)]);
var inst_10775 = (state_10798[(2)]);
var inst_10776 = cljs.core.next.call(null,inst_10764);
var inst_10750 = inst_10776;
var inst_10751 = null;
var inst_10752 = (0);
var inst_10753 = (0);
var state_10798__$1 = (function (){var statearr_10801 = state_10798;
(statearr_10801[(8)] = inst_10753);

(statearr_10801[(9)] = inst_10751);

(statearr_10801[(10)] = inst_10750);

(statearr_10801[(11)] = inst_10775);

(statearr_10801[(12)] = inst_10752);

return statearr_10801;
})();
var statearr_10802_10842 = state_10798__$1;
(statearr_10802_10842[(2)] = null);

(statearr_10802_10842[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (1))){
var state_10798__$1 = state_10798;
var statearr_10803_10843 = state_10798__$1;
(statearr_10803_10843[(2)] = null);

(statearr_10803_10843[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (4))){
var inst_10739 = (state_10798[(13)]);
var inst_10739__$1 = (state_10798[(2)]);
var inst_10740 = (inst_10739__$1 == null);
var state_10798__$1 = (function (){var statearr_10804 = state_10798;
(statearr_10804[(13)] = inst_10739__$1);

return statearr_10804;
})();
if(cljs.core.truth_(inst_10740)){
var statearr_10805_10844 = state_10798__$1;
(statearr_10805_10844[(1)] = (5));

} else {
var statearr_10806_10845 = state_10798__$1;
(statearr_10806_10845[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (15))){
var state_10798__$1 = state_10798;
var statearr_10810_10846 = state_10798__$1;
(statearr_10810_10846[(2)] = null);

(statearr_10810_10846[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (21))){
var state_10798__$1 = state_10798;
var statearr_10811_10847 = state_10798__$1;
(statearr_10811_10847[(2)] = null);

(statearr_10811_10847[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (13))){
var inst_10753 = (state_10798[(8)]);
var inst_10751 = (state_10798[(9)]);
var inst_10750 = (state_10798[(10)]);
var inst_10752 = (state_10798[(12)]);
var inst_10760 = (state_10798[(2)]);
var inst_10761 = (inst_10753 + (1));
var tmp10807 = inst_10751;
var tmp10808 = inst_10750;
var tmp10809 = inst_10752;
var inst_10750__$1 = tmp10808;
var inst_10751__$1 = tmp10807;
var inst_10752__$1 = tmp10809;
var inst_10753__$1 = inst_10761;
var state_10798__$1 = (function (){var statearr_10812 = state_10798;
(statearr_10812[(8)] = inst_10753__$1);

(statearr_10812[(9)] = inst_10751__$1);

(statearr_10812[(14)] = inst_10760);

(statearr_10812[(10)] = inst_10750__$1);

(statearr_10812[(12)] = inst_10752__$1);

return statearr_10812;
})();
var statearr_10813_10848 = state_10798__$1;
(statearr_10813_10848[(2)] = null);

(statearr_10813_10848[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (22))){
var state_10798__$1 = state_10798;
var statearr_10814_10849 = state_10798__$1;
(statearr_10814_10849[(2)] = null);

(statearr_10814_10849[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (6))){
var inst_10739 = (state_10798[(13)]);
var inst_10748 = f.call(null,inst_10739);
var inst_10749 = cljs.core.seq.call(null,inst_10748);
var inst_10750 = inst_10749;
var inst_10751 = null;
var inst_10752 = (0);
var inst_10753 = (0);
var state_10798__$1 = (function (){var statearr_10815 = state_10798;
(statearr_10815[(8)] = inst_10753);

(statearr_10815[(9)] = inst_10751);

(statearr_10815[(10)] = inst_10750);

(statearr_10815[(12)] = inst_10752);

return statearr_10815;
})();
var statearr_10816_10850 = state_10798__$1;
(statearr_10816_10850[(2)] = null);

(statearr_10816_10850[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (17))){
var inst_10764 = (state_10798[(7)]);
var inst_10768 = cljs.core.chunk_first.call(null,inst_10764);
var inst_10769 = cljs.core.chunk_rest.call(null,inst_10764);
var inst_10770 = cljs.core.count.call(null,inst_10768);
var inst_10750 = inst_10769;
var inst_10751 = inst_10768;
var inst_10752 = inst_10770;
var inst_10753 = (0);
var state_10798__$1 = (function (){var statearr_10817 = state_10798;
(statearr_10817[(8)] = inst_10753);

(statearr_10817[(9)] = inst_10751);

(statearr_10817[(10)] = inst_10750);

(statearr_10817[(12)] = inst_10752);

return statearr_10817;
})();
var statearr_10818_10851 = state_10798__$1;
(statearr_10818_10851[(2)] = null);

(statearr_10818_10851[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (3))){
var inst_10796 = (state_10798[(2)]);
var state_10798__$1 = state_10798;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10798__$1,inst_10796);
} else {
if((state_val_10799 === (12))){
var inst_10784 = (state_10798[(2)]);
var state_10798__$1 = state_10798;
var statearr_10819_10852 = state_10798__$1;
(statearr_10819_10852[(2)] = inst_10784);

(statearr_10819_10852[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (2))){
var state_10798__$1 = state_10798;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10798__$1,(4),in$);
} else {
if((state_val_10799 === (23))){
var inst_10792 = (state_10798[(2)]);
var state_10798__$1 = state_10798;
var statearr_10820_10853 = state_10798__$1;
(statearr_10820_10853[(2)] = inst_10792);

(statearr_10820_10853[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (19))){
var inst_10779 = (state_10798[(2)]);
var state_10798__$1 = state_10798;
var statearr_10821_10854 = state_10798__$1;
(statearr_10821_10854[(2)] = inst_10779);

(statearr_10821_10854[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (11))){
var inst_10764 = (state_10798[(7)]);
var inst_10750 = (state_10798[(10)]);
var inst_10764__$1 = cljs.core.seq.call(null,inst_10750);
var state_10798__$1 = (function (){var statearr_10822 = state_10798;
(statearr_10822[(7)] = inst_10764__$1);

return statearr_10822;
})();
if(inst_10764__$1){
var statearr_10823_10855 = state_10798__$1;
(statearr_10823_10855[(1)] = (14));

} else {
var statearr_10824_10856 = state_10798__$1;
(statearr_10824_10856[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (9))){
var inst_10786 = (state_10798[(2)]);
var inst_10787 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_10798__$1 = (function (){var statearr_10825 = state_10798;
(statearr_10825[(15)] = inst_10786);

return statearr_10825;
})();
if(cljs.core.truth_(inst_10787)){
var statearr_10826_10857 = state_10798__$1;
(statearr_10826_10857[(1)] = (21));

} else {
var statearr_10827_10858 = state_10798__$1;
(statearr_10827_10858[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (5))){
var inst_10742 = cljs.core.async.close_BANG_.call(null,out);
var state_10798__$1 = state_10798;
var statearr_10828_10859 = state_10798__$1;
(statearr_10828_10859[(2)] = inst_10742);

(statearr_10828_10859[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (14))){
var inst_10764 = (state_10798[(7)]);
var inst_10766 = cljs.core.chunked_seq_QMARK_.call(null,inst_10764);
var state_10798__$1 = state_10798;
if(inst_10766){
var statearr_10829_10860 = state_10798__$1;
(statearr_10829_10860[(1)] = (17));

} else {
var statearr_10830_10861 = state_10798__$1;
(statearr_10830_10861[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (16))){
var inst_10782 = (state_10798[(2)]);
var state_10798__$1 = state_10798;
var statearr_10831_10862 = state_10798__$1;
(statearr_10831_10862[(2)] = inst_10782);

(statearr_10831_10862[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10799 === (10))){
var inst_10753 = (state_10798[(8)]);
var inst_10751 = (state_10798[(9)]);
var inst_10758 = cljs.core._nth.call(null,inst_10751,inst_10753);
var state_10798__$1 = state_10798;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10798__$1,(13),out,inst_10758);
} else {
if((state_val_10799 === (18))){
var inst_10764 = (state_10798[(7)]);
var inst_10773 = cljs.core.first.call(null,inst_10764);
var state_10798__$1 = state_10798;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10798__$1,(20),out,inst_10773);
} else {
if((state_val_10799 === (8))){
var inst_10753 = (state_10798[(8)]);
var inst_10752 = (state_10798[(12)]);
var inst_10755 = (inst_10753 < inst_10752);
var inst_10756 = inst_10755;
var state_10798__$1 = state_10798;
if(cljs.core.truth_(inst_10756)){
var statearr_10832_10863 = state_10798__$1;
(statearr_10832_10863[(1)] = (10));

} else {
var statearr_10833_10864 = state_10798__$1;
(statearr_10833_10864[(1)] = (11));

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
});})(c__8341__auto__))
;
return ((function (switch__8229__auto__,c__8341__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__8230__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__8230__auto____0 = (function (){
var statearr_10837 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_10837[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__8230__auto__);

(statearr_10837[(1)] = (1));

return statearr_10837;
});
var cljs$core$async$mapcat_STAR__$_state_machine__8230__auto____1 = (function (state_10798){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_10798);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e10838){if((e10838 instanceof Object)){
var ex__8233__auto__ = e10838;
var statearr_10839_10865 = state_10798;
(statearr_10839_10865[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10798);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10838;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10866 = state_10798;
state_10798 = G__10866;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__8230__auto__ = function(state_10798){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__8230__auto____1.call(this,state_10798);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__8230__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__8230__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__))
})();
var state__8343__auto__ = (function (){var statearr_10840 = f__8342__auto__.call(null);
(statearr_10840[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_10840;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__))
);

return c__8341__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var args10867 = [];
var len__27348__auto___10870 = arguments.length;
var i__27349__auto___10871 = (0);
while(true){
if((i__27349__auto___10871 < len__27348__auto___10870)){
args10867.push((arguments[i__27349__auto___10871]));

var G__10872 = (i__27349__auto___10871 + (1));
i__27349__auto___10871 = G__10872;
continue;
} else {
}
break;
}

var G__10869 = args10867.length;
switch (G__10869) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10867.length)].join('')));

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
var args10874 = [];
var len__27348__auto___10877 = arguments.length;
var i__27349__auto___10878 = (0);
while(true){
if((i__27349__auto___10878 < len__27348__auto___10877)){
args10874.push((arguments[i__27349__auto___10878]));

var G__10879 = (i__27349__auto___10878 + (1));
i__27349__auto___10878 = G__10879;
continue;
} else {
}
break;
}

var G__10876 = args10874.length;
switch (G__10876) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10874.length)].join('')));

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
var args10881 = [];
var len__27348__auto___10932 = arguments.length;
var i__27349__auto___10933 = (0);
while(true){
if((i__27349__auto___10933 < len__27348__auto___10932)){
args10881.push((arguments[i__27349__auto___10933]));

var G__10934 = (i__27349__auto___10933 + (1));
i__27349__auto___10933 = G__10934;
continue;
} else {
}
break;
}

var G__10883 = args10881.length;
switch (G__10883) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10881.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__8341__auto___10936 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___10936,out){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___10936,out){
return (function (state_10907){
var state_val_10908 = (state_10907[(1)]);
if((state_val_10908 === (7))){
var inst_10902 = (state_10907[(2)]);
var state_10907__$1 = state_10907;
var statearr_10909_10937 = state_10907__$1;
(statearr_10909_10937[(2)] = inst_10902);

(statearr_10909_10937[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10908 === (1))){
var inst_10884 = null;
var state_10907__$1 = (function (){var statearr_10910 = state_10907;
(statearr_10910[(7)] = inst_10884);

return statearr_10910;
})();
var statearr_10911_10938 = state_10907__$1;
(statearr_10911_10938[(2)] = null);

(statearr_10911_10938[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10908 === (4))){
var inst_10887 = (state_10907[(8)]);
var inst_10887__$1 = (state_10907[(2)]);
var inst_10888 = (inst_10887__$1 == null);
var inst_10889 = cljs.core.not.call(null,inst_10888);
var state_10907__$1 = (function (){var statearr_10912 = state_10907;
(statearr_10912[(8)] = inst_10887__$1);

return statearr_10912;
})();
if(inst_10889){
var statearr_10913_10939 = state_10907__$1;
(statearr_10913_10939[(1)] = (5));

} else {
var statearr_10914_10940 = state_10907__$1;
(statearr_10914_10940[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10908 === (6))){
var state_10907__$1 = state_10907;
var statearr_10915_10941 = state_10907__$1;
(statearr_10915_10941[(2)] = null);

(statearr_10915_10941[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10908 === (3))){
var inst_10904 = (state_10907[(2)]);
var inst_10905 = cljs.core.async.close_BANG_.call(null,out);
var state_10907__$1 = (function (){var statearr_10916 = state_10907;
(statearr_10916[(9)] = inst_10904);

return statearr_10916;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10907__$1,inst_10905);
} else {
if((state_val_10908 === (2))){
var state_10907__$1 = state_10907;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10907__$1,(4),ch);
} else {
if((state_val_10908 === (11))){
var inst_10887 = (state_10907[(8)]);
var inst_10896 = (state_10907[(2)]);
var inst_10884 = inst_10887;
var state_10907__$1 = (function (){var statearr_10917 = state_10907;
(statearr_10917[(10)] = inst_10896);

(statearr_10917[(7)] = inst_10884);

return statearr_10917;
})();
var statearr_10918_10942 = state_10907__$1;
(statearr_10918_10942[(2)] = null);

(statearr_10918_10942[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10908 === (9))){
var inst_10887 = (state_10907[(8)]);
var state_10907__$1 = state_10907;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10907__$1,(11),out,inst_10887);
} else {
if((state_val_10908 === (5))){
var inst_10884 = (state_10907[(7)]);
var inst_10887 = (state_10907[(8)]);
var inst_10891 = cljs.core._EQ_.call(null,inst_10887,inst_10884);
var state_10907__$1 = state_10907;
if(inst_10891){
var statearr_10920_10943 = state_10907__$1;
(statearr_10920_10943[(1)] = (8));

} else {
var statearr_10921_10944 = state_10907__$1;
(statearr_10921_10944[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10908 === (10))){
var inst_10899 = (state_10907[(2)]);
var state_10907__$1 = state_10907;
var statearr_10922_10945 = state_10907__$1;
(statearr_10922_10945[(2)] = inst_10899);

(statearr_10922_10945[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10908 === (8))){
var inst_10884 = (state_10907[(7)]);
var tmp10919 = inst_10884;
var inst_10884__$1 = tmp10919;
var state_10907__$1 = (function (){var statearr_10923 = state_10907;
(statearr_10923[(7)] = inst_10884__$1);

return statearr_10923;
})();
var statearr_10924_10946 = state_10907__$1;
(statearr_10924_10946[(2)] = null);

(statearr_10924_10946[(1)] = (2));


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
});})(c__8341__auto___10936,out))
;
return ((function (switch__8229__auto__,c__8341__auto___10936,out){
return (function() {
var cljs$core$async$state_machine__8230__auto__ = null;
var cljs$core$async$state_machine__8230__auto____0 = (function (){
var statearr_10928 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_10928[(0)] = cljs$core$async$state_machine__8230__auto__);

(statearr_10928[(1)] = (1));

return statearr_10928;
});
var cljs$core$async$state_machine__8230__auto____1 = (function (state_10907){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_10907);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e10929){if((e10929 instanceof Object)){
var ex__8233__auto__ = e10929;
var statearr_10930_10947 = state_10907;
(statearr_10930_10947[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10907);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e10929;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__10948 = state_10907;
state_10907 = G__10948;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$state_machine__8230__auto__ = function(state_10907){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__8230__auto____1.call(this,state_10907);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__8230__auto____0;
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__8230__auto____1;
return cljs$core$async$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___10936,out))
})();
var state__8343__auto__ = (function (){var statearr_10931 = f__8342__auto__.call(null);
(statearr_10931[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___10936);

return statearr_10931;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___10936,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var args10949 = [];
var len__27348__auto___11019 = arguments.length;
var i__27349__auto___11020 = (0);
while(true){
if((i__27349__auto___11020 < len__27348__auto___11019)){
args10949.push((arguments[i__27349__auto___11020]));

var G__11021 = (i__27349__auto___11020 + (1));
i__27349__auto___11020 = G__11021;
continue;
} else {
}
break;
}

var G__10951 = args10949.length;
switch (G__10951) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10949.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__8341__auto___11023 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___11023,out){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___11023,out){
return (function (state_10989){
var state_val_10990 = (state_10989[(1)]);
if((state_val_10990 === (7))){
var inst_10985 = (state_10989[(2)]);
var state_10989__$1 = state_10989;
var statearr_10991_11024 = state_10989__$1;
(statearr_10991_11024[(2)] = inst_10985);

(statearr_10991_11024[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10990 === (1))){
var inst_10952 = (new Array(n));
var inst_10953 = inst_10952;
var inst_10954 = (0);
var state_10989__$1 = (function (){var statearr_10992 = state_10989;
(statearr_10992[(7)] = inst_10953);

(statearr_10992[(8)] = inst_10954);

return statearr_10992;
})();
var statearr_10993_11025 = state_10989__$1;
(statearr_10993_11025[(2)] = null);

(statearr_10993_11025[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10990 === (4))){
var inst_10957 = (state_10989[(9)]);
var inst_10957__$1 = (state_10989[(2)]);
var inst_10958 = (inst_10957__$1 == null);
var inst_10959 = cljs.core.not.call(null,inst_10958);
var state_10989__$1 = (function (){var statearr_10994 = state_10989;
(statearr_10994[(9)] = inst_10957__$1);

return statearr_10994;
})();
if(inst_10959){
var statearr_10995_11026 = state_10989__$1;
(statearr_10995_11026[(1)] = (5));

} else {
var statearr_10996_11027 = state_10989__$1;
(statearr_10996_11027[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10990 === (15))){
var inst_10979 = (state_10989[(2)]);
var state_10989__$1 = state_10989;
var statearr_10997_11028 = state_10989__$1;
(statearr_10997_11028[(2)] = inst_10979);

(statearr_10997_11028[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10990 === (13))){
var state_10989__$1 = state_10989;
var statearr_10998_11029 = state_10989__$1;
(statearr_10998_11029[(2)] = null);

(statearr_10998_11029[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10990 === (6))){
var inst_10954 = (state_10989[(8)]);
var inst_10975 = (inst_10954 > (0));
var state_10989__$1 = state_10989;
if(cljs.core.truth_(inst_10975)){
var statearr_10999_11030 = state_10989__$1;
(statearr_10999_11030[(1)] = (12));

} else {
var statearr_11000_11031 = state_10989__$1;
(statearr_11000_11031[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10990 === (3))){
var inst_10987 = (state_10989[(2)]);
var state_10989__$1 = state_10989;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_10989__$1,inst_10987);
} else {
if((state_val_10990 === (12))){
var inst_10953 = (state_10989[(7)]);
var inst_10977 = cljs.core.vec.call(null,inst_10953);
var state_10989__$1 = state_10989;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10989__$1,(15),out,inst_10977);
} else {
if((state_val_10990 === (2))){
var state_10989__$1 = state_10989;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_10989__$1,(4),ch);
} else {
if((state_val_10990 === (11))){
var inst_10969 = (state_10989[(2)]);
var inst_10970 = (new Array(n));
var inst_10953 = inst_10970;
var inst_10954 = (0);
var state_10989__$1 = (function (){var statearr_11001 = state_10989;
(statearr_11001[(7)] = inst_10953);

(statearr_11001[(8)] = inst_10954);

(statearr_11001[(10)] = inst_10969);

return statearr_11001;
})();
var statearr_11002_11032 = state_10989__$1;
(statearr_11002_11032[(2)] = null);

(statearr_11002_11032[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10990 === (9))){
var inst_10953 = (state_10989[(7)]);
var inst_10967 = cljs.core.vec.call(null,inst_10953);
var state_10989__$1 = state_10989;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_10989__$1,(11),out,inst_10967);
} else {
if((state_val_10990 === (5))){
var inst_10962 = (state_10989[(11)]);
var inst_10953 = (state_10989[(7)]);
var inst_10954 = (state_10989[(8)]);
var inst_10957 = (state_10989[(9)]);
var inst_10961 = (inst_10953[inst_10954] = inst_10957);
var inst_10962__$1 = (inst_10954 + (1));
var inst_10963 = (inst_10962__$1 < n);
var state_10989__$1 = (function (){var statearr_11003 = state_10989;
(statearr_11003[(12)] = inst_10961);

(statearr_11003[(11)] = inst_10962__$1);

return statearr_11003;
})();
if(cljs.core.truth_(inst_10963)){
var statearr_11004_11033 = state_10989__$1;
(statearr_11004_11033[(1)] = (8));

} else {
var statearr_11005_11034 = state_10989__$1;
(statearr_11005_11034[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10990 === (14))){
var inst_10982 = (state_10989[(2)]);
var inst_10983 = cljs.core.async.close_BANG_.call(null,out);
var state_10989__$1 = (function (){var statearr_11007 = state_10989;
(statearr_11007[(13)] = inst_10982);

return statearr_11007;
})();
var statearr_11008_11035 = state_10989__$1;
(statearr_11008_11035[(2)] = inst_10983);

(statearr_11008_11035[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10990 === (10))){
var inst_10973 = (state_10989[(2)]);
var state_10989__$1 = state_10989;
var statearr_11009_11036 = state_10989__$1;
(statearr_11009_11036[(2)] = inst_10973);

(statearr_11009_11036[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_10990 === (8))){
var inst_10962 = (state_10989[(11)]);
var inst_10953 = (state_10989[(7)]);
var tmp11006 = inst_10953;
var inst_10953__$1 = tmp11006;
var inst_10954 = inst_10962;
var state_10989__$1 = (function (){var statearr_11010 = state_10989;
(statearr_11010[(7)] = inst_10953__$1);

(statearr_11010[(8)] = inst_10954);

return statearr_11010;
})();
var statearr_11011_11037 = state_10989__$1;
(statearr_11011_11037[(2)] = null);

(statearr_11011_11037[(1)] = (2));


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
});})(c__8341__auto___11023,out))
;
return ((function (switch__8229__auto__,c__8341__auto___11023,out){
return (function() {
var cljs$core$async$state_machine__8230__auto__ = null;
var cljs$core$async$state_machine__8230__auto____0 = (function (){
var statearr_11015 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11015[(0)] = cljs$core$async$state_machine__8230__auto__);

(statearr_11015[(1)] = (1));

return statearr_11015;
});
var cljs$core$async$state_machine__8230__auto____1 = (function (state_10989){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_10989);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e11016){if((e11016 instanceof Object)){
var ex__8233__auto__ = e11016;
var statearr_11017_11038 = state_10989;
(statearr_11017_11038[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_10989);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11016;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11039 = state_10989;
state_10989 = G__11039;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$state_machine__8230__auto__ = function(state_10989){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__8230__auto____1.call(this,state_10989);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__8230__auto____0;
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__8230__auto____1;
return cljs$core$async$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___11023,out))
})();
var state__8343__auto__ = (function (){var statearr_11018 = f__8342__auto__.call(null);
(statearr_11018[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___11023);

return statearr_11018;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___11023,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var args11040 = [];
var len__27348__auto___11114 = arguments.length;
var i__27349__auto___11115 = (0);
while(true){
if((i__27349__auto___11115 < len__27348__auto___11114)){
args11040.push((arguments[i__27349__auto___11115]));

var G__11116 = (i__27349__auto___11115 + (1));
i__27349__auto___11115 = G__11116;
continue;
} else {
}
break;
}

var G__11042 = args11040.length;
switch (G__11042) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11040.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__8341__auto___11118 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___11118,out){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___11118,out){
return (function (state_11084){
var state_val_11085 = (state_11084[(1)]);
if((state_val_11085 === (7))){
var inst_11080 = (state_11084[(2)]);
var state_11084__$1 = state_11084;
var statearr_11086_11119 = state_11084__$1;
(statearr_11086_11119[(2)] = inst_11080);

(statearr_11086_11119[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11085 === (1))){
var inst_11043 = [];
var inst_11044 = inst_11043;
var inst_11045 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_11084__$1 = (function (){var statearr_11087 = state_11084;
(statearr_11087[(7)] = inst_11045);

(statearr_11087[(8)] = inst_11044);

return statearr_11087;
})();
var statearr_11088_11120 = state_11084__$1;
(statearr_11088_11120[(2)] = null);

(statearr_11088_11120[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11085 === (4))){
var inst_11048 = (state_11084[(9)]);
var inst_11048__$1 = (state_11084[(2)]);
var inst_11049 = (inst_11048__$1 == null);
var inst_11050 = cljs.core.not.call(null,inst_11049);
var state_11084__$1 = (function (){var statearr_11089 = state_11084;
(statearr_11089[(9)] = inst_11048__$1);

return statearr_11089;
})();
if(inst_11050){
var statearr_11090_11121 = state_11084__$1;
(statearr_11090_11121[(1)] = (5));

} else {
var statearr_11091_11122 = state_11084__$1;
(statearr_11091_11122[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11085 === (15))){
var inst_11074 = (state_11084[(2)]);
var state_11084__$1 = state_11084;
var statearr_11092_11123 = state_11084__$1;
(statearr_11092_11123[(2)] = inst_11074);

(statearr_11092_11123[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11085 === (13))){
var state_11084__$1 = state_11084;
var statearr_11093_11124 = state_11084__$1;
(statearr_11093_11124[(2)] = null);

(statearr_11093_11124[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11085 === (6))){
var inst_11044 = (state_11084[(8)]);
var inst_11069 = inst_11044.length;
var inst_11070 = (inst_11069 > (0));
var state_11084__$1 = state_11084;
if(cljs.core.truth_(inst_11070)){
var statearr_11094_11125 = state_11084__$1;
(statearr_11094_11125[(1)] = (12));

} else {
var statearr_11095_11126 = state_11084__$1;
(statearr_11095_11126[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11085 === (3))){
var inst_11082 = (state_11084[(2)]);
var state_11084__$1 = state_11084;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_11084__$1,inst_11082);
} else {
if((state_val_11085 === (12))){
var inst_11044 = (state_11084[(8)]);
var inst_11072 = cljs.core.vec.call(null,inst_11044);
var state_11084__$1 = state_11084;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11084__$1,(15),out,inst_11072);
} else {
if((state_val_11085 === (2))){
var state_11084__$1 = state_11084;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_11084__$1,(4),ch);
} else {
if((state_val_11085 === (11))){
var inst_11052 = (state_11084[(10)]);
var inst_11048 = (state_11084[(9)]);
var inst_11062 = (state_11084[(2)]);
var inst_11063 = [];
var inst_11064 = inst_11063.push(inst_11048);
var inst_11044 = inst_11063;
var inst_11045 = inst_11052;
var state_11084__$1 = (function (){var statearr_11096 = state_11084;
(statearr_11096[(11)] = inst_11064);

(statearr_11096[(7)] = inst_11045);

(statearr_11096[(8)] = inst_11044);

(statearr_11096[(12)] = inst_11062);

return statearr_11096;
})();
var statearr_11097_11127 = state_11084__$1;
(statearr_11097_11127[(2)] = null);

(statearr_11097_11127[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11085 === (9))){
var inst_11044 = (state_11084[(8)]);
var inst_11060 = cljs.core.vec.call(null,inst_11044);
var state_11084__$1 = state_11084;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_11084__$1,(11),out,inst_11060);
} else {
if((state_val_11085 === (5))){
var inst_11052 = (state_11084[(10)]);
var inst_11048 = (state_11084[(9)]);
var inst_11045 = (state_11084[(7)]);
var inst_11052__$1 = f.call(null,inst_11048);
var inst_11053 = cljs.core._EQ_.call(null,inst_11052__$1,inst_11045);
var inst_11054 = cljs.core.keyword_identical_QMARK_.call(null,inst_11045,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_11055 = (inst_11053) || (inst_11054);
var state_11084__$1 = (function (){var statearr_11098 = state_11084;
(statearr_11098[(10)] = inst_11052__$1);

return statearr_11098;
})();
if(cljs.core.truth_(inst_11055)){
var statearr_11099_11128 = state_11084__$1;
(statearr_11099_11128[(1)] = (8));

} else {
var statearr_11100_11129 = state_11084__$1;
(statearr_11100_11129[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11085 === (14))){
var inst_11077 = (state_11084[(2)]);
var inst_11078 = cljs.core.async.close_BANG_.call(null,out);
var state_11084__$1 = (function (){var statearr_11102 = state_11084;
(statearr_11102[(13)] = inst_11077);

return statearr_11102;
})();
var statearr_11103_11130 = state_11084__$1;
(statearr_11103_11130[(2)] = inst_11078);

(statearr_11103_11130[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11085 === (10))){
var inst_11067 = (state_11084[(2)]);
var state_11084__$1 = state_11084;
var statearr_11104_11131 = state_11084__$1;
(statearr_11104_11131[(2)] = inst_11067);

(statearr_11104_11131[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_11085 === (8))){
var inst_11052 = (state_11084[(10)]);
var inst_11048 = (state_11084[(9)]);
var inst_11044 = (state_11084[(8)]);
var inst_11057 = inst_11044.push(inst_11048);
var tmp11101 = inst_11044;
var inst_11044__$1 = tmp11101;
var inst_11045 = inst_11052;
var state_11084__$1 = (function (){var statearr_11105 = state_11084;
(statearr_11105[(14)] = inst_11057);

(statearr_11105[(7)] = inst_11045);

(statearr_11105[(8)] = inst_11044__$1);

return statearr_11105;
})();
var statearr_11106_11132 = state_11084__$1;
(statearr_11106_11132[(2)] = null);

(statearr_11106_11132[(1)] = (2));


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
});})(c__8341__auto___11118,out))
;
return ((function (switch__8229__auto__,c__8341__auto___11118,out){
return (function() {
var cljs$core$async$state_machine__8230__auto__ = null;
var cljs$core$async$state_machine__8230__auto____0 = (function (){
var statearr_11110 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_11110[(0)] = cljs$core$async$state_machine__8230__auto__);

(statearr_11110[(1)] = (1));

return statearr_11110;
});
var cljs$core$async$state_machine__8230__auto____1 = (function (state_11084){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_11084);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e11111){if((e11111 instanceof Object)){
var ex__8233__auto__ = e11111;
var statearr_11112_11133 = state_11084;
(statearr_11112_11133[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_11084);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e11111;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__11134 = state_11084;
state_11084 = G__11134;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
cljs$core$async$state_machine__8230__auto__ = function(state_11084){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__8230__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__8230__auto____1.call(this,state_11084);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__8230__auto____0;
cljs$core$async$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__8230__auto____1;
return cljs$core$async$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___11118,out))
})();
var state__8343__auto__ = (function (){var statearr_11113 = f__8342__auto__.call(null);
(statearr_11113[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___11118);

return statearr_11113;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___11118,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;


//# sourceMappingURL=async.js.map?rel=1468744499293