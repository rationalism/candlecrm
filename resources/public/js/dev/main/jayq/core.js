// Compiled by ClojureScript 1.9.93 {}
goog.provide('jayq.core');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('cljs.reader');
jayq.core.crate_meta = (function jayq$core$crate_meta(func){
return func.prototype._crateGroup;
});
jayq.core.__GT_selector = (function jayq$core$__GT_selector(sel){
if(typeof sel === 'string'){
return sel;
} else {
if(cljs.core.fn_QMARK_.call(null,sel)){
var temp__4655__auto__ = jayq.core.crate_meta.call(null,sel);
if(cljs.core.truth_(temp__4655__auto__)){
var cm = temp__4655__auto__;
return [cljs.core.str("[crateGroup="),cljs.core.str(cm),cljs.core.str("]")].join('');
} else {
return sel;
}
} else {
if((sel instanceof cljs.core.Keyword)){
return cljs.core.name.call(null,sel);
} else {
return sel;

}
}
}
});
jayq.core.$ = (function jayq$core$$(var_args){
var args8217 = [];
var len__7322__auto___8220 = arguments.length;
var i__7323__auto___8221 = (0);
while(true){
if((i__7323__auto___8221 < len__7322__auto___8220)){
args8217.push((arguments[i__7323__auto___8221]));

var G__8222 = (i__7323__auto___8221 + (1));
i__7323__auto___8221 = G__8222;
continue;
} else {
}
break;
}

var G__8219 = args8217.length;
switch (G__8219) {
case 1:
return jayq.core.$.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.$.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8217.length)].join('')));

}
});

jayq.core.$.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return jQuery(jayq.core.__GT_selector.call(null,sel));
});

jayq.core.$.cljs$core$IFn$_invoke$arity$2 = (function (sel,context){
return jQuery(jayq.core.__GT_selector.call(null,sel),context);
});

jayq.core.$.cljs$lang$maxFixedArity = 2;

jQuery.prototype.cljs$core$ISeqable$ = true;

jQuery.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var this$__$1 = this;
if(cljs.core.truth_(this$__$1.get((0)))){
return this$__$1;
} else {
return null;
}
});

jQuery.prototype.cljs$core$ISeq$ = true;

jQuery.prototype.cljs$core$ISeq$_first$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.get((0));
});

jQuery.prototype.cljs$core$ISeq$_rest$arity$1 = (function (this$){
var this$__$1 = this;
if((cljs.core.count.call(null,this$__$1) > (1))){
return this$__$1.slice((1));
} else {
return cljs.core.List.EMPTY;
}
});

jQuery.prototype.cljs$core$ICounted$ = true;

jQuery.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1.length;
});

jQuery.prototype.cljs$core$IIndexed$ = true;

jQuery.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var this$__$1 = this;
if((n < cljs.core.count.call(null,this$__$1))){
return this$__$1.slice(n,(n + (1)));
} else {
return null;
}
});

jQuery.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var this$__$1 = this;
if((n < cljs.core.count.call(null,this$__$1))){
return this$__$1.slice(n,(n + (1)));
} else {
if((void 0 === not_found)){
return null;
} else {
return not_found;
}
}
});

jQuery.prototype.cljs$core$ISequential$ = true;

jQuery.prototype.cljs$core$ILookup$ = true;

jQuery.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this$,k){
var this$__$1 = this;
var or__6247__auto__ = this$__$1.slice(k,(k + (1)));
if(cljs.core.truth_(or__6247__auto__)){
return or__6247__auto__;
} else {
return null;
}
});

jQuery.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this$,k,not_found){
var this$__$1 = this;
return cljs.core._nth.call(null,this$__$1,k,not_found);
});

jQuery.prototype.cljs$core$IReduce$ = true;

jQuery.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (this$,f){
var this$__$1 = this;
return cljs.core.ci_reduce.call(null,this$__$1,f);
});

jQuery.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (this$,f,start){
var this$__$1 = this;
return cljs.core.ci_reduce.call(null,this$__$1,f,start);
});

jQuery.prototype.cljs$core$IFn$ = true;

jQuery.prototype.call = (function() {
var G__8225 = null;
var G__8225__2 = (function (self__,k){
var self____$1 = this;
var this$ = self____$1;
return cljs.core._lookup.call(null,this$,k);
});
var G__8225__3 = (function (self__,k,not_found){
var self____$1 = this;
var this$ = self____$1;
return cljs.core._lookup.call(null,this$,k,not_found);
});
G__8225 = function(self__,k,not_found){
switch(arguments.length){
case 2:
return G__8225__2.call(this,self__,k);
case 3:
return G__8225__3.call(this,self__,k,not_found);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__8225.cljs$core$IFn$_invoke$arity$2 = G__8225__2;
G__8225.cljs$core$IFn$_invoke$arity$3 = G__8225__3;
return G__8225;
})()
;

jQuery.prototype.apply = (function (self__,args8224){
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args8224)));
});

jQuery.prototype.cljs$core$IFn$_invoke$arity$1 = (function (k){
var this$ = this;
return cljs.core._lookup.call(null,this$,k);
});

jQuery.prototype.cljs$core$IFn$_invoke$arity$2 = (function (k,not_found){
var this$ = this;
return cljs.core._lookup.call(null,this$,k,not_found);
});
jayq.core.anim = (function jayq$core$anim(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8233 = arguments.length;
var i__7323__auto___8234 = (0);
while(true){
if((i__7323__auto___8234 < len__7322__auto___8233)){
args__7329__auto__.push((arguments[i__7323__auto___8234]));

var G__8235 = (i__7323__auto___8234 + (1));
i__7323__auto___8234 = G__8235;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((2) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((2)),(0),null)):null);
return jayq.core.anim.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7330__auto__);
});

jayq.core.anim.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,props,p__8229){
var vec__8230 = p__8229;
var speed = cljs.core.nth.call(null,vec__8230,(0),null);
var on_finish = cljs.core.nth.call(null,vec__8230,(1),null);
return $elem.animate(cljs.core.clj__GT_js.call(null,props),speed,on_finish);
});

jayq.core.anim.cljs$lang$maxFixedArity = (2);

jayq.core.anim.cljs$lang$applyTo = (function (seq8226){
var G__8227 = cljs.core.first.call(null,seq8226);
var seq8226__$1 = cljs.core.next.call(null,seq8226);
var G__8228 = cljs.core.first.call(null,seq8226__$1);
var seq8226__$2 = cljs.core.next.call(null,seq8226__$1);
return jayq.core.anim.cljs$core$IFn$_invoke$arity$variadic(G__8227,G__8228,seq8226__$2);
});

jayq.core.text = (function jayq$core$text(var_args){
var args8236 = [];
var len__7322__auto___8239 = arguments.length;
var i__7323__auto___8240 = (0);
while(true){
if((i__7323__auto___8240 < len__7322__auto___8239)){
args8236.push((arguments[i__7323__auto___8240]));

var G__8241 = (i__7323__auto___8240 + (1));
i__7323__auto___8240 = G__8241;
continue;
} else {
}
break;
}

var G__8238 = args8236.length;
switch (G__8238) {
case 1:
return jayq.core.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8236.length)].join('')));

}
});

jayq.core.text.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.text();
});

jayq.core.text.cljs$core$IFn$_invoke$arity$2 = (function ($elem,txt){
return $elem.text(txt);
});

jayq.core.text.cljs$lang$maxFixedArity = 2;

jayq.core.css = (function jayq$core$css(var_args){
var args8243 = [];
var len__7322__auto___8246 = arguments.length;
var i__7323__auto___8247 = (0);
while(true){
if((i__7323__auto___8247 < len__7322__auto___8246)){
args8243.push((arguments[i__7323__auto___8247]));

var G__8248 = (i__7323__auto___8247 + (1));
i__7323__auto___8247 = G__8248;
continue;
} else {
}
break;
}

var G__8245 = args8243.length;
switch (G__8245) {
case 2:
return jayq.core.css.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.css.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8243.length)].join('')));

}
});

jayq.core.css.cljs$core$IFn$_invoke$arity$2 = (function ($elem,opts){
return $elem.css(cljs.core.clj__GT_js.call(null,opts));
});

jayq.core.css.cljs$core$IFn$_invoke$arity$3 = (function ($elem,p,v){
return $elem.css(cljs.core.name.call(null,p),v);
});

jayq.core.css.cljs$lang$maxFixedArity = 3;

jayq.core.attr = (function jayq$core$attr(var_args){
var args8250 = [];
var len__7322__auto___8253 = arguments.length;
var i__7323__auto___8254 = (0);
while(true){
if((i__7323__auto___8254 < len__7322__auto___8253)){
args8250.push((arguments[i__7323__auto___8254]));

var G__8255 = (i__7323__auto___8254 + (1));
i__7323__auto___8254 = G__8255;
continue;
} else {
}
break;
}

var G__8252 = args8250.length;
switch (G__8252) {
case 3:
return jayq.core.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return jayq.core.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8250.length)].join('')));

}
});

jayq.core.attr.cljs$core$IFn$_invoke$arity$3 = (function ($elem,n,v){
return $elem.attr(cljs.core.name.call(null,n),v);
});

jayq.core.attr.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.attr(cljs.core.clj__GT_js.call(null,x));
});

jayq.core.attr.cljs$lang$maxFixedArity = 3;

jayq.core.prop = (function jayq$core$prop(var_args){
var args8257 = [];
var len__7322__auto___8260 = arguments.length;
var i__7323__auto___8261 = (0);
while(true){
if((i__7323__auto___8261 < len__7322__auto___8260)){
args8257.push((arguments[i__7323__auto___8261]));

var G__8262 = (i__7323__auto___8261 + (1));
i__7323__auto___8261 = G__8262;
continue;
} else {
}
break;
}

var G__8259 = args8257.length;
switch (G__8259) {
case 3:
return jayq.core.prop.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return jayq.core.prop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8257.length)].join('')));

}
});

jayq.core.prop.cljs$core$IFn$_invoke$arity$3 = (function ($elem,n,v){
return $elem.prop(cljs.core.name.call(null,n),v);
});

jayq.core.prop.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.prop(cljs.core.clj__GT_js.call(null,x));
});

jayq.core.prop.cljs$lang$maxFixedArity = 3;

jayq.core.remove_attr = (function jayq$core$remove_attr($elem,a){
return $elem.removeAttr(cljs.core.name.call(null,a));
});
jayq.core.remove_prop = (function jayq$core$remove_prop($elem,a){
return $elem.removeProp(cljs.core.name.call(null,a));
});
jayq.core.data = (function jayq$core$data(var_args){
var args8264 = [];
var len__7322__auto___8267 = arguments.length;
var i__7323__auto___8268 = (0);
while(true){
if((i__7323__auto___8268 < len__7322__auto___8267)){
args8264.push((arguments[i__7323__auto___8268]));

var G__8269 = (i__7323__auto___8268 + (1));
i__7323__auto___8268 = G__8269;
continue;
} else {
}
break;
}

var G__8266 = args8264.length;
switch (G__8266) {
case 1:
return jayq.core.data.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.data.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.data.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8264.length)].join('')));

}
});

jayq.core.data.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.data();
});

jayq.core.data.cljs$core$IFn$_invoke$arity$2 = (function ($elem,k){
return $elem.data(cljs.core.clj__GT_js.call(null,k));
});

jayq.core.data.cljs$core$IFn$_invoke$arity$3 = (function ($elem,k,v){
return $elem.data(cljs.core.name.call(null,k),cljs.core.clj__GT_js.call(null,v));
});

jayq.core.data.cljs$lang$maxFixedArity = 3;

jayq.core.add_class = (function jayq$core$add_class($elem,cl){
return $elem.addClass(cljs.core.name.call(null,cl));
});
jayq.core.remove_class = (function jayq$core$remove_class(var_args){
var args8271 = [];
var len__7322__auto___8274 = arguments.length;
var i__7323__auto___8275 = (0);
while(true){
if((i__7323__auto___8275 < len__7322__auto___8274)){
args8271.push((arguments[i__7323__auto___8275]));

var G__8276 = (i__7323__auto___8275 + (1));
i__7323__auto___8275 = G__8276;
continue;
} else {
}
break;
}

var G__8273 = args8271.length;
switch (G__8273) {
case 1:
return jayq.core.remove_class.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.remove_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8271.length)].join('')));

}
});

jayq.core.remove_class.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.removeClass();
});

jayq.core.remove_class.cljs$core$IFn$_invoke$arity$2 = (function ($elem,cl){
return $elem.removeClass(cljs.core.name.call(null,cl));
});

jayq.core.remove_class.cljs$lang$maxFixedArity = 2;

jayq.core.toggle_class = (function jayq$core$toggle_class(var_args){
var args8278 = [];
var len__7322__auto___8281 = arguments.length;
var i__7323__auto___8282 = (0);
while(true){
if((i__7323__auto___8282 < len__7322__auto___8281)){
args8278.push((arguments[i__7323__auto___8282]));

var G__8283 = (i__7323__auto___8282 + (1));
i__7323__auto___8282 = G__8283;
continue;
} else {
}
break;
}

var G__8280 = args8278.length;
switch (G__8280) {
case 2:
return jayq.core.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8278.length)].join('')));

}
});

jayq.core.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function ($elem,cl){
return $elem.toggleClass(cljs.core.name.call(null,cl));
});

jayq.core.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function ($elem,cl,switch$){
return $elem.toggleClass(cljs.core.name.call(null,cl),cljs.core.boolean$.call(null,switch$));
});

jayq.core.toggle_class.cljs$lang$maxFixedArity = 3;

jayq.core.has_class = (function jayq$core$has_class($elem,cl){
return $elem.hasClass(cljs.core.name.call(null,cl));
});
jayq.core.is = (function jayq$core$is($elem,selector){
return $elem.is(jayq.core.__GT_selector.call(null,selector));
});
jayq.core.after = (function jayq$core$after($elem,content){
return $elem.after(content);
});
jayq.core.before = (function jayq$core$before($elem,content){
return $elem.before(content);
});
jayq.core.append = (function jayq$core$append($elem,content){
return $elem.append(content);
});
jayq.core.prepend = (function jayq$core$prepend($elem,content){
return $elem.prepend(content);
});
jayq.core.append_to = (function jayq$core$append_to($elem,target){
return $elem.appendTo(jayq.core.__GT_selector.call(null,target));
});
jayq.core.prepend_to = (function jayq$core$prepend_to($elem,target){
return $elem.prependTo(jayq.core.__GT_selector.call(null,target));
});
jayq.core.insert_before = (function jayq$core$insert_before($elem,target){
return $elem.insertBefore(jayq.core.__GT_selector.call(null,target));
});
jayq.core.insert_after = (function jayq$core$insert_after($elem,target){
return $elem.insertAfter(jayq.core.__GT_selector.call(null,target));
});
jayq.core.replace_with = (function jayq$core$replace_with($elem,content){
return $elem.replaceWith(content);
});
jayq.core.remove = (function jayq$core$remove($elem){
return $elem.remove();
});
jayq.core.hide = (function jayq$core$hide(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8291 = arguments.length;
var i__7323__auto___8292 = (0);
while(true){
if((i__7323__auto___8292 < len__7322__auto___8291)){
args__7329__auto__.push((arguments[i__7323__auto___8292]));

var G__8293 = (i__7323__auto___8292 + (1));
i__7323__auto___8292 = G__8293;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return jayq.core.hide.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

jayq.core.hide.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__8287){
var vec__8288 = p__8287;
var speed = cljs.core.nth.call(null,vec__8288,(0),null);
var on_finish = cljs.core.nth.call(null,vec__8288,(1),null);
return $elem.hide(speed,on_finish);
});

jayq.core.hide.cljs$lang$maxFixedArity = (1);

jayq.core.hide.cljs$lang$applyTo = (function (seq8285){
var G__8286 = cljs.core.first.call(null,seq8285);
var seq8285__$1 = cljs.core.next.call(null,seq8285);
return jayq.core.hide.cljs$core$IFn$_invoke$arity$variadic(G__8286,seq8285__$1);
});

jayq.core.show = (function jayq$core$show(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8300 = arguments.length;
var i__7323__auto___8301 = (0);
while(true){
if((i__7323__auto___8301 < len__7322__auto___8300)){
args__7329__auto__.push((arguments[i__7323__auto___8301]));

var G__8302 = (i__7323__auto___8301 + (1));
i__7323__auto___8301 = G__8302;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return jayq.core.show.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

jayq.core.show.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__8296){
var vec__8297 = p__8296;
var speed = cljs.core.nth.call(null,vec__8297,(0),null);
var on_finish = cljs.core.nth.call(null,vec__8297,(1),null);
return $elem.show(speed,on_finish);
});

jayq.core.show.cljs$lang$maxFixedArity = (1);

jayq.core.show.cljs$lang$applyTo = (function (seq8294){
var G__8295 = cljs.core.first.call(null,seq8294);
var seq8294__$1 = cljs.core.next.call(null,seq8294);
return jayq.core.show.cljs$core$IFn$_invoke$arity$variadic(G__8295,seq8294__$1);
});

jayq.core.toggle = (function jayq$core$toggle(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8309 = arguments.length;
var i__7323__auto___8310 = (0);
while(true){
if((i__7323__auto___8310 < len__7322__auto___8309)){
args__7329__auto__.push((arguments[i__7323__auto___8310]));

var G__8311 = (i__7323__auto___8310 + (1));
i__7323__auto___8310 = G__8311;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return jayq.core.toggle.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

jayq.core.toggle.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__8305){
var vec__8306 = p__8305;
var speed = cljs.core.nth.call(null,vec__8306,(0),null);
var on_finish = cljs.core.nth.call(null,vec__8306,(1),null);
return $elem.toggle(speed,on_finish);
});

jayq.core.toggle.cljs$lang$maxFixedArity = (1);

jayq.core.toggle.cljs$lang$applyTo = (function (seq8303){
var G__8304 = cljs.core.first.call(null,seq8303);
var seq8303__$1 = cljs.core.next.call(null,seq8303);
return jayq.core.toggle.cljs$core$IFn$_invoke$arity$variadic(G__8304,seq8303__$1);
});

jayq.core.fade_out = (function jayq$core$fade_out(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8318 = arguments.length;
var i__7323__auto___8319 = (0);
while(true){
if((i__7323__auto___8319 < len__7322__auto___8318)){
args__7329__auto__.push((arguments[i__7323__auto___8319]));

var G__8320 = (i__7323__auto___8319 + (1));
i__7323__auto___8319 = G__8320;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return jayq.core.fade_out.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

jayq.core.fade_out.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__8314){
var vec__8315 = p__8314;
var speed = cljs.core.nth.call(null,vec__8315,(0),null);
var on_finish = cljs.core.nth.call(null,vec__8315,(1),null);
return $elem.fadeOut(speed,on_finish);
});

jayq.core.fade_out.cljs$lang$maxFixedArity = (1);

jayq.core.fade_out.cljs$lang$applyTo = (function (seq8312){
var G__8313 = cljs.core.first.call(null,seq8312);
var seq8312__$1 = cljs.core.next.call(null,seq8312);
return jayq.core.fade_out.cljs$core$IFn$_invoke$arity$variadic(G__8313,seq8312__$1);
});

jayq.core.fade_in = (function jayq$core$fade_in(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8327 = arguments.length;
var i__7323__auto___8328 = (0);
while(true){
if((i__7323__auto___8328 < len__7322__auto___8327)){
args__7329__auto__.push((arguments[i__7323__auto___8328]));

var G__8329 = (i__7323__auto___8328 + (1));
i__7323__auto___8328 = G__8329;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return jayq.core.fade_in.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

jayq.core.fade_in.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__8323){
var vec__8324 = p__8323;
var speed = cljs.core.nth.call(null,vec__8324,(0),null);
var on_finish = cljs.core.nth.call(null,vec__8324,(1),null);
return $elem.fadeIn(speed,on_finish);
});

jayq.core.fade_in.cljs$lang$maxFixedArity = (1);

jayq.core.fade_in.cljs$lang$applyTo = (function (seq8321){
var G__8322 = cljs.core.first.call(null,seq8321);
var seq8321__$1 = cljs.core.next.call(null,seq8321);
return jayq.core.fade_in.cljs$core$IFn$_invoke$arity$variadic(G__8322,seq8321__$1);
});

jayq.core.slide_up = (function jayq$core$slide_up(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8336 = arguments.length;
var i__7323__auto___8337 = (0);
while(true){
if((i__7323__auto___8337 < len__7322__auto___8336)){
args__7329__auto__.push((arguments[i__7323__auto___8337]));

var G__8338 = (i__7323__auto___8337 + (1));
i__7323__auto___8337 = G__8338;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return jayq.core.slide_up.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

jayq.core.slide_up.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__8332){
var vec__8333 = p__8332;
var speed = cljs.core.nth.call(null,vec__8333,(0),null);
var on_finish = cljs.core.nth.call(null,vec__8333,(1),null);
return $elem.slideUp(speed,on_finish);
});

jayq.core.slide_up.cljs$lang$maxFixedArity = (1);

jayq.core.slide_up.cljs$lang$applyTo = (function (seq8330){
var G__8331 = cljs.core.first.call(null,seq8330);
var seq8330__$1 = cljs.core.next.call(null,seq8330);
return jayq.core.slide_up.cljs$core$IFn$_invoke$arity$variadic(G__8331,seq8330__$1);
});

jayq.core.slide_down = (function jayq$core$slide_down(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8345 = arguments.length;
var i__7323__auto___8346 = (0);
while(true){
if((i__7323__auto___8346 < len__7322__auto___8345)){
args__7329__auto__.push((arguments[i__7323__auto___8346]));

var G__8347 = (i__7323__auto___8346 + (1));
i__7323__auto___8346 = G__8347;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return jayq.core.slide_down.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

jayq.core.slide_down.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__8341){
var vec__8342 = p__8341;
var speed = cljs.core.nth.call(null,vec__8342,(0),null);
var on_finish = cljs.core.nth.call(null,vec__8342,(1),null);
return $elem.slideDown(speed,on_finish);
});

jayq.core.slide_down.cljs$lang$maxFixedArity = (1);

jayq.core.slide_down.cljs$lang$applyTo = (function (seq8339){
var G__8340 = cljs.core.first.call(null,seq8339);
var seq8339__$1 = cljs.core.next.call(null,seq8339);
return jayq.core.slide_down.cljs$core$IFn$_invoke$arity$variadic(G__8340,seq8339__$1);
});

jayq.core.siblings = (function jayq$core$siblings(var_args){
var args8348 = [];
var len__7322__auto___8351 = arguments.length;
var i__7323__auto___8352 = (0);
while(true){
if((i__7323__auto___8352 < len__7322__auto___8351)){
args8348.push((arguments[i__7323__auto___8352]));

var G__8353 = (i__7323__auto___8352 + (1));
i__7323__auto___8352 = G__8353;
continue;
} else {
}
break;
}

var G__8350 = args8348.length;
switch (G__8350) {
case 1:
return jayq.core.siblings.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.siblings.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8348.length)].join('')));

}
});

jayq.core.siblings.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.siblings();
});

jayq.core.siblings.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.siblings(cljs.core.name.call(null,selector));
});

jayq.core.siblings.cljs$lang$maxFixedArity = 2;

jayq.core.parent = (function jayq$core$parent($elem){
return $elem.parent();
});
jayq.core.parents = (function jayq$core$parents(var_args){
var args8355 = [];
var len__7322__auto___8358 = arguments.length;
var i__7323__auto___8359 = (0);
while(true){
if((i__7323__auto___8359 < len__7322__auto___8358)){
args8355.push((arguments[i__7323__auto___8359]));

var G__8360 = (i__7323__auto___8359 + (1));
i__7323__auto___8359 = G__8360;
continue;
} else {
}
break;
}

var G__8357 = args8355.length;
switch (G__8357) {
case 1:
return jayq.core.parents.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.parents.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8355.length)].join('')));

}
});

jayq.core.parents.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.parents();
});

jayq.core.parents.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.parents(cljs.core.name.call(null,selector));
});

jayq.core.parents.cljs$lang$maxFixedArity = 2;

jayq.core.parents_until = (function jayq$core$parents_until(var_args){
var args8362 = [];
var len__7322__auto___8365 = arguments.length;
var i__7323__auto___8366 = (0);
while(true){
if((i__7323__auto___8366 < len__7322__auto___8365)){
args8362.push((arguments[i__7323__auto___8366]));

var G__8367 = (i__7323__auto___8366 + (1));
i__7323__auto___8366 = G__8367;
continue;
} else {
}
break;
}

var G__8364 = args8362.length;
switch (G__8364) {
case 1:
return jayq.core.parents_until.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.parents_until.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.parents_until.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8362.length)].join('')));

}
});

jayq.core.parents_until.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.parentsUntil();
});

jayq.core.parents_until.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.parentsUntil(jayq.core.__GT_selector.call(null,selector));
});

jayq.core.parents_until.cljs$core$IFn$_invoke$arity$3 = (function ($elem,selector,filtr){
return $elem.parentsUntil(jayq.core.__GT_selector.call(null,selector),cljs.core.name.call(null,filtr));
});

jayq.core.parents_until.cljs$lang$maxFixedArity = 3;

jayq.core.children = (function jayq$core$children(var_args){
var args8369 = [];
var len__7322__auto___8372 = arguments.length;
var i__7323__auto___8373 = (0);
while(true){
if((i__7323__auto___8373 < len__7322__auto___8372)){
args8369.push((arguments[i__7323__auto___8373]));

var G__8374 = (i__7323__auto___8373 + (1));
i__7323__auto___8373 = G__8374;
continue;
} else {
}
break;
}

var G__8371 = args8369.length;
switch (G__8371) {
case 2:
return jayq.core.children.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.children.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8369.length)].join('')));

}
});

jayq.core.children.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.children(cljs.core.name.call(null,selector));
});

jayq.core.children.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.children();
});

jayq.core.children.cljs$lang$maxFixedArity = 2;

jayq.core.next = (function jayq$core$next(var_args){
var args8376 = [];
var len__7322__auto___8379 = arguments.length;
var i__7323__auto___8380 = (0);
while(true){
if((i__7323__auto___8380 < len__7322__auto___8379)){
args8376.push((arguments[i__7323__auto___8380]));

var G__8381 = (i__7323__auto___8380 + (1));
i__7323__auto___8380 = G__8381;
continue;
} else {
}
break;
}

var G__8378 = args8376.length;
switch (G__8378) {
case 1:
return jayq.core.next.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.next.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8376.length)].join('')));

}
});

jayq.core.next.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.next();
});

jayq.core.next.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.next(cljs.core.name.call(null,selector));
});

jayq.core.next.cljs$lang$maxFixedArity = 2;

jayq.core.prev = (function jayq$core$prev(var_args){
var args8383 = [];
var len__7322__auto___8386 = arguments.length;
var i__7323__auto___8387 = (0);
while(true){
if((i__7323__auto___8387 < len__7322__auto___8386)){
args8383.push((arguments[i__7323__auto___8387]));

var G__8388 = (i__7323__auto___8387 + (1));
i__7323__auto___8387 = G__8388;
continue;
} else {
}
break;
}

var G__8385 = args8383.length;
switch (G__8385) {
case 1:
return jayq.core.prev.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.prev.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8383.length)].join('')));

}
});

jayq.core.prev.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.prev();
});

jayq.core.prev.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.prev(cljs.core.name.call(null,selector));
});

jayq.core.prev.cljs$lang$maxFixedArity = 2;

jayq.core.next_all = (function jayq$core$next_all(var_args){
var args8390 = [];
var len__7322__auto___8393 = arguments.length;
var i__7323__auto___8394 = (0);
while(true){
if((i__7323__auto___8394 < len__7322__auto___8393)){
args8390.push((arguments[i__7323__auto___8394]));

var G__8395 = (i__7323__auto___8394 + (1));
i__7323__auto___8394 = G__8395;
continue;
} else {
}
break;
}

var G__8392 = args8390.length;
switch (G__8392) {
case 1:
return jayq.core.next_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.next_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8390.length)].join('')));

}
});

jayq.core.next_all.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.nextAll();
});

jayq.core.next_all.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.nextAll(cljs.core.name.call(null,selector));
});

jayq.core.next_all.cljs$lang$maxFixedArity = 2;

jayq.core.prev_all = (function jayq$core$prev_all(var_args){
var args8397 = [];
var len__7322__auto___8400 = arguments.length;
var i__7323__auto___8401 = (0);
while(true){
if((i__7323__auto___8401 < len__7322__auto___8400)){
args8397.push((arguments[i__7323__auto___8401]));

var G__8402 = (i__7323__auto___8401 + (1));
i__7323__auto___8401 = G__8402;
continue;
} else {
}
break;
}

var G__8399 = args8397.length;
switch (G__8399) {
case 1:
return jayq.core.prev_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.prev_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8397.length)].join('')));

}
});

jayq.core.prev_all.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.prevAll();
});

jayq.core.prev_all.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.prevAll(cljs.core.name.call(null,selector));
});

jayq.core.prev_all.cljs$lang$maxFixedArity = 2;

jayq.core.next_until = (function jayq$core$next_until(var_args){
var args8404 = [];
var len__7322__auto___8407 = arguments.length;
var i__7323__auto___8408 = (0);
while(true){
if((i__7323__auto___8408 < len__7322__auto___8407)){
args8404.push((arguments[i__7323__auto___8408]));

var G__8409 = (i__7323__auto___8408 + (1));
i__7323__auto___8408 = G__8409;
continue;
} else {
}
break;
}

var G__8406 = args8404.length;
switch (G__8406) {
case 1:
return jayq.core.next_until.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.next_until.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.next_until.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8404.length)].join('')));

}
});

jayq.core.next_until.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.nextUntil();
});

jayq.core.next_until.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.nextUntil(jayq.core.__GT_selector.call(null,selector));
});

jayq.core.next_until.cljs$core$IFn$_invoke$arity$3 = (function ($elem,selector,filtr){
return $elem.nextUntil(jayq.core.__GT_selector.call(null,selector),cljs.core.name.call(null,filtr));
});

jayq.core.next_until.cljs$lang$maxFixedArity = 3;

jayq.core.prev_until = (function jayq$core$prev_until(var_args){
var args8411 = [];
var len__7322__auto___8414 = arguments.length;
var i__7323__auto___8415 = (0);
while(true){
if((i__7323__auto___8415 < len__7322__auto___8414)){
args8411.push((arguments[i__7323__auto___8415]));

var G__8416 = (i__7323__auto___8415 + (1));
i__7323__auto___8415 = G__8416;
continue;
} else {
}
break;
}

var G__8413 = args8411.length;
switch (G__8413) {
case 1:
return jayq.core.prev_until.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.prev_until.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.prev_until.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8411.length)].join('')));

}
});

jayq.core.prev_until.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.prevUntil();
});

jayq.core.prev_until.cljs$core$IFn$_invoke$arity$2 = (function ($elem,selector){
return $elem.prevUntil(jayq.core.__GT_selector.call(null,selector));
});

jayq.core.prev_until.cljs$core$IFn$_invoke$arity$3 = (function ($elem,selector,filtr){
return $elem.prevUntil(jayq.core.__GT_selector.call(null,selector),cljs.core.name.call(null,filtr));
});

jayq.core.prev_until.cljs$lang$maxFixedArity = 3;

jayq.core.find = (function jayq$core$find($elem,selector){
return $elem.find(cljs.core.name.call(null,selector));
});
jayq.core.closest = (function jayq$core$closest(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8425 = arguments.length;
var i__7323__auto___8426 = (0);
while(true){
if((i__7323__auto___8426 < len__7322__auto___8425)){
args__7329__auto__.push((arguments[i__7323__auto___8426]));

var G__8427 = (i__7323__auto___8426 + (1));
i__7323__auto___8426 = G__8427;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((2) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((2)),(0),null)):null);
return jayq.core.closest.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7330__auto__);
});

jayq.core.closest.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,selector,p__8421){
var vec__8422 = p__8421;
var context = cljs.core.nth.call(null,vec__8422,(0),null);
return $elem.closest(jayq.core.__GT_selector.call(null,selector),context);
});

jayq.core.closest.cljs$lang$maxFixedArity = (2);

jayq.core.closest.cljs$lang$applyTo = (function (seq8418){
var G__8419 = cljs.core.first.call(null,seq8418);
var seq8418__$1 = cljs.core.next.call(null,seq8418);
var G__8420 = cljs.core.first.call(null,seq8418__$1);
var seq8418__$2 = cljs.core.next.call(null,seq8418__$1);
return jayq.core.closest.cljs$core$IFn$_invoke$arity$variadic(G__8419,G__8420,seq8418__$2);
});

jayq.core.clone = (function jayq$core$clone($elem){
return $elem.clone();
});
jayq.core.html = (function jayq$core$html(var_args){
var args8428 = [];
var len__7322__auto___8431 = arguments.length;
var i__7323__auto___8432 = (0);
while(true){
if((i__7323__auto___8432 < len__7322__auto___8431)){
args8428.push((arguments[i__7323__auto___8432]));

var G__8433 = (i__7323__auto___8432 + (1));
i__7323__auto___8432 = G__8433;
continue;
} else {
}
break;
}

var G__8430 = args8428.length;
switch (G__8430) {
case 2:
return jayq.core.html.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.html.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8428.length)].join('')));

}
});

jayq.core.html.cljs$core$IFn$_invoke$arity$2 = (function ($elem,v){
return $elem.html(v);
});

jayq.core.html.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.html();
});

jayq.core.html.cljs$lang$maxFixedArity = 2;

jayq.core.inner = jayq.core.html;
jayq.core.empty = (function jayq$core$empty($elem){
return $elem.empty();
});
jayq.core.val = (function jayq$core$val(var_args){
var args8435 = [];
var len__7322__auto___8438 = arguments.length;
var i__7323__auto___8439 = (0);
while(true){
if((i__7323__auto___8439 < len__7322__auto___8438)){
args8435.push((arguments[i__7323__auto___8439]));

var G__8440 = (i__7323__auto___8439 + (1));
i__7323__auto___8439 = G__8440;
continue;
} else {
}
break;
}

var G__8437 = args8435.length;
switch (G__8437) {
case 2:
return jayq.core.val.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.val.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8435.length)].join('')));

}
});

jayq.core.val.cljs$core$IFn$_invoke$arity$2 = (function ($elem,v){
return $elem.val(v);
});

jayq.core.val.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.val();
});

jayq.core.val.cljs$lang$maxFixedArity = 2;

jayq.core.serialize = (function jayq$core$serialize($elem){
return $elem.serialize();
});
jayq.core.queue = (function jayq$core$queue(var_args){
var args8442 = [];
var len__7322__auto___8445 = arguments.length;
var i__7323__auto___8446 = (0);
while(true){
if((i__7323__auto___8446 < len__7322__auto___8445)){
args8442.push((arguments[i__7323__auto___8446]));

var G__8447 = (i__7323__auto___8446 + (1));
i__7323__auto___8446 = G__8447;
continue;
} else {
}
break;
}

var G__8444 = args8442.length;
switch (G__8444) {
case 3:
return jayq.core.queue.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return jayq.core.queue.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.queue.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8442.length)].join('')));

}
});

jayq.core.queue.cljs$core$IFn$_invoke$arity$3 = (function ($elem,x,y){
return $elem.queue(x,y);
});

jayq.core.queue.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.queue(x);
});

jayq.core.queue.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.queue();
});

jayq.core.queue.cljs$lang$maxFixedArity = 3;

jayq.core.dequeue = (function jayq$core$dequeue(var_args){
var args8449 = [];
var len__7322__auto___8452 = arguments.length;
var i__7323__auto___8453 = (0);
while(true){
if((i__7323__auto___8453 < len__7322__auto___8452)){
args8449.push((arguments[i__7323__auto___8453]));

var G__8454 = (i__7323__auto___8453 + (1));
i__7323__auto___8453 = G__8454;
continue;
} else {
}
break;
}

var G__8451 = args8449.length;
switch (G__8451) {
case 2:
return jayq.core.dequeue.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.dequeue.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8449.length)].join('')));

}
});

jayq.core.dequeue.cljs$core$IFn$_invoke$arity$2 = (function ($elem,queue_name){
return $elem.dequeue(queue_name);
});

jayq.core.dequeue.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.dequeue();
});

jayq.core.dequeue.cljs$lang$maxFixedArity = 2;

jayq.core.document_ready = (function jayq$core$document_ready(func){
return jayq.core.$.call(null,document).ready(func);
});
jayq.core.mimetype_converter = (function jayq$core$mimetype_converter(s){
return cljs.reader.read_string.call(null,[cljs.core.str(s)].join(''));
});
jQuery.ajaxSetup(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"accepts","accepts",1429714104),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"edn","edn",1317840885),"application/edn, text/edn",new cljs.core.Keyword(null,"clojure","clojure",438975815),"application/clojure, text/clojure"], null),new cljs.core.Keyword(null,"contents","contents",-1567174023),new cljs.core.PersistentArrayMap(null, 1, ["clojure",/edn|clojure/], null),new cljs.core.Keyword(null,"converters","converters",195533259),new cljs.core.PersistentArrayMap(null, 2, ["text edn",jayq.core.mimetype_converter,"text clojure",jayq.core.mimetype_converter], null)], null)));
jayq.core.clj_content_type_QMARK_ = (function jayq$core$clj_content_type_QMARK_(x){
return cljs.core.re_find.call(null,/^(text|application)\/(clojure|edn)/,x);
});
jayq.core.__GT_content_type = (function jayq$core$__GT_content_type(ct){
if(typeof ct === 'string'){
return ct;
} else {
if((ct instanceof cljs.core.Keyword)){
return cljs.core.subs.call(null,[cljs.core.str(ct)].join(''),(1));
} else {
return null;
}
}
});
jayq.core.preprocess_request = (function jayq$core$preprocess_request(p__8458){
var map__8461 = p__8458;
var map__8461__$1 = ((((!((map__8461 == null)))?((((map__8461.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8461.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8461):map__8461);
var request = map__8461__$1;
var data = cljs.core.get.call(null,map__8461__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var contentType = cljs.core.get.call(null,map__8461__$1,new cljs.core.Keyword(null,"contentType","contentType",-1462509576));
var ct = jayq.core.__GT_content_type.call(null,contentType);
return ((function (ct,map__8461,map__8461__$1,request,data,contentType){
return (function (p1__8457_SHARP_){
if(cljs.core.truth_((function (){var and__6235__auto__ = ct;
if(cljs.core.truth_(and__6235__auto__)){
return jayq.core.clj_content_type_QMARK_.call(null,ct);
} else {
return and__6235__auto__;
}
})())){
return cljs.core.assoc.call(null,p1__8457_SHARP_,new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.pr_str.call(null,data));
} else {
return p1__8457_SHARP_;
}
});})(ct,map__8461,map__8461__$1,request,data,contentType))
.call(null,((function (ct,map__8461,map__8461__$1,request,data,contentType){
return (function (p1__8456_SHARP_){
if(cljs.core.truth_(ct)){
return cljs.core.assoc.call(null,p1__8456_SHARP_,new cljs.core.Keyword(null,"contentType","contentType",-1462509576),ct);
} else {
return p1__8456_SHARP_;
}
});})(ct,map__8461,map__8461__$1,request,data,contentType))
.call(null,request));
});
jayq.core.__GT_ajax_settings = (function jayq$core$__GT_ajax_settings(request){
return cljs.core.clj__GT_js.call(null,jayq.core.preprocess_request.call(null,request));
});
jayq.core.ajax = (function jayq$core$ajax(var_args){
var args8463 = [];
var len__7322__auto___8466 = arguments.length;
var i__7323__auto___8467 = (0);
while(true){
if((i__7323__auto___8467 < len__7322__auto___8466)){
args8463.push((arguments[i__7323__auto___8467]));

var G__8468 = (i__7323__auto___8467 + (1));
i__7323__auto___8467 = G__8468;
continue;
} else {
}
break;
}

var G__8465 = args8463.length;
switch (G__8465) {
case 2:
return jayq.core.ajax.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.ajax.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8463.length)].join('')));

}
});

jayq.core.ajax.cljs$core$IFn$_invoke$arity$2 = (function (url,settings){
return jQuery.ajax(url,jayq.core.__GT_ajax_settings.call(null,settings));
});

jayq.core.ajax.cljs$core$IFn$_invoke$arity$1 = (function (settings){
return jQuery.ajax(jayq.core.__GT_ajax_settings.call(null,settings));
});

jayq.core.ajax.cljs$lang$maxFixedArity = 2;

jayq.core.xhr = (function jayq$core$xhr(p__8470,content,callback){
var vec__8474 = p__8470;
var method = cljs.core.nth.call(null,vec__8474,(0),null);
var uri = cljs.core.nth.call(null,vec__8474,(1),null);
var params = cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),clojure.string.upper_case.call(null,cljs.core.name.call(null,method)),new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.clj__GT_js.call(null,content),new cljs.core.Keyword(null,"success","success",1890645906),callback], null));
return jQuery.ajax(uri,params);
});
/**
 * Reads clojure data from element content (preferably a script tag with type=edn/clojure)
 */
jayq.core.read = (function jayq$core$read($elem){
return cljs.reader.read_string.call(null,jayq.core.html.call(null,$elem));
});
jayq.core.$contains = jQuery.contains;
jayq.core.bind = (function jayq$core$bind($elem,ev,func){
return $elem.bind(cljs.core.name.call(null,ev),func);
});
jayq.core.unbind = (function jayq$core$unbind(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8484 = arguments.length;
var i__7323__auto___8485 = (0);
while(true){
if((i__7323__auto___8485 < len__7322__auto___8484)){
args__7329__auto__.push((arguments[i__7323__auto___8485]));

var G__8486 = (i__7323__auto___8485 + (1));
i__7323__auto___8485 = G__8486;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((2) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((2)),(0),null)):null);
return jayq.core.unbind.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7330__auto__);
});

jayq.core.unbind.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,ev,p__8480){
var vec__8481 = p__8480;
var func = cljs.core.nth.call(null,vec__8481,(0),null);
return $elem.unbind(cljs.core.name.call(null,ev),func);
});

jayq.core.unbind.cljs$lang$maxFixedArity = (2);

jayq.core.unbind.cljs$lang$applyTo = (function (seq8477){
var G__8478 = cljs.core.first.call(null,seq8477);
var seq8477__$1 = cljs.core.next.call(null,seq8477);
var G__8479 = cljs.core.first.call(null,seq8477__$1);
var seq8477__$2 = cljs.core.next.call(null,seq8477__$1);
return jayq.core.unbind.cljs$core$IFn$_invoke$arity$variadic(G__8478,G__8479,seq8477__$2);
});

jayq.core.trigger = (function jayq$core$trigger($elem,ev){
return $elem.trigger(cljs.core.name.call(null,ev));
});
jayq.core.delegate = (function jayq$core$delegate($elem,sel,ev,func){
return $elem.delegate(jayq.core.__GT_selector.call(null,sel),cljs.core.name.call(null,ev),func);
});
jayq.core.__GT_event = (function jayq$core$__GT_event(e){
if(cljs.core.coll_QMARK_.call(null,e)){
return clojure.string.join.call(null," ",cljs.core.map.call(null,cljs.core.name,e));
} else {
return cljs.core.clj__GT_js.call(null,e);
}
});
jayq.core.on = (function jayq$core$on(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8494 = arguments.length;
var i__7323__auto___8495 = (0);
while(true){
if((i__7323__auto___8495 < len__7322__auto___8494)){
args__7329__auto__.push((arguments[i__7323__auto___8495]));

var G__8496 = (i__7323__auto___8495 + (1));
i__7323__auto___8495 = G__8496;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((2) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((2)),(0),null)):null);
return jayq.core.on.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7330__auto__);
});

jayq.core.on.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,events,p__8490){
var vec__8491 = p__8490;
var sel = cljs.core.nth.call(null,vec__8491,(0),null);
var data = cljs.core.nth.call(null,vec__8491,(1),null);
var handler = cljs.core.nth.call(null,vec__8491,(2),null);
return $elem.on(jayq.core.__GT_event.call(null,events),jayq.core.__GT_selector.call(null,sel),data,handler);
});

jayq.core.on.cljs$lang$maxFixedArity = (2);

jayq.core.on.cljs$lang$applyTo = (function (seq8487){
var G__8488 = cljs.core.first.call(null,seq8487);
var seq8487__$1 = cljs.core.next.call(null,seq8487);
var G__8489 = cljs.core.first.call(null,seq8487__$1);
var seq8487__$2 = cljs.core.next.call(null,seq8487__$1);
return jayq.core.on.cljs$core$IFn$_invoke$arity$variadic(G__8488,G__8489,seq8487__$2);
});

jayq.core.one = (function jayq$core$one(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8504 = arguments.length;
var i__7323__auto___8505 = (0);
while(true){
if((i__7323__auto___8505 < len__7322__auto___8504)){
args__7329__auto__.push((arguments[i__7323__auto___8505]));

var G__8506 = (i__7323__auto___8505 + (1));
i__7323__auto___8505 = G__8506;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((2) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((2)),(0),null)):null);
return jayq.core.one.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7330__auto__);
});

jayq.core.one.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,events,p__8500){
var vec__8501 = p__8500;
var sel = cljs.core.nth.call(null,vec__8501,(0),null);
var data = cljs.core.nth.call(null,vec__8501,(1),null);
var handler = cljs.core.nth.call(null,vec__8501,(2),null);
return $elem.one(jayq.core.__GT_event.call(null,events),jayq.core.__GT_selector.call(null,sel),data,handler);
});

jayq.core.one.cljs$lang$maxFixedArity = (2);

jayq.core.one.cljs$lang$applyTo = (function (seq8497){
var G__8498 = cljs.core.first.call(null,seq8497);
var seq8497__$1 = cljs.core.next.call(null,seq8497);
var G__8499 = cljs.core.first.call(null,seq8497__$1);
var seq8497__$2 = cljs.core.next.call(null,seq8497__$1);
return jayq.core.one.cljs$core$IFn$_invoke$arity$variadic(G__8498,G__8499,seq8497__$2);
});

jayq.core.off = (function jayq$core$off(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8514 = arguments.length;
var i__7323__auto___8515 = (0);
while(true){
if((i__7323__auto___8515 < len__7322__auto___8514)){
args__7329__auto__.push((arguments[i__7323__auto___8515]));

var G__8516 = (i__7323__auto___8515 + (1));
i__7323__auto___8515 = G__8516;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((2) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((2)),(0),null)):null);
return jayq.core.off.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__7330__auto__);
});

jayq.core.off.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,events,p__8510){
var vec__8511 = p__8510;
var sel = cljs.core.nth.call(null,vec__8511,(0),null);
var handler = cljs.core.nth.call(null,vec__8511,(1),null);
return $elem.off(jayq.core.__GT_event.call(null,events),jayq.core.__GT_selector.call(null,sel),handler);
});

jayq.core.off.cljs$lang$maxFixedArity = (2);

jayq.core.off.cljs$lang$applyTo = (function (seq8507){
var G__8508 = cljs.core.first.call(null,seq8507);
var seq8507__$1 = cljs.core.next.call(null,seq8507);
var G__8509 = cljs.core.first.call(null,seq8507__$1);
var seq8507__$2 = cljs.core.next.call(null,seq8507__$1);
return jayq.core.off.cljs$core$IFn$_invoke$arity$variadic(G__8508,G__8509,seq8507__$2);
});

jayq.core.prevent = (function jayq$core$prevent(e){
return e.preventDefault();
});
jayq.core.height = (function jayq$core$height(var_args){
var args8517 = [];
var len__7322__auto___8520 = arguments.length;
var i__7323__auto___8521 = (0);
while(true){
if((i__7323__auto___8521 < len__7322__auto___8520)){
args8517.push((arguments[i__7323__auto___8521]));

var G__8522 = (i__7323__auto___8521 + (1));
i__7323__auto___8521 = G__8522;
continue;
} else {
}
break;
}

var G__8519 = args8517.length;
switch (G__8519) {
case 2:
return jayq.core.height.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.height.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8517.length)].join('')));

}
});

jayq.core.height.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.height(x);
});

jayq.core.height.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.height();
});

jayq.core.height.cljs$lang$maxFixedArity = 2;

jayq.core.width = (function jayq$core$width(var_args){
var args8524 = [];
var len__7322__auto___8527 = arguments.length;
var i__7323__auto___8528 = (0);
while(true){
if((i__7323__auto___8528 < len__7322__auto___8527)){
args8524.push((arguments[i__7323__auto___8528]));

var G__8529 = (i__7323__auto___8528 + (1));
i__7323__auto___8528 = G__8529;
continue;
} else {
}
break;
}

var G__8526 = args8524.length;
switch (G__8526) {
case 2:
return jayq.core.width.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.width.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8524.length)].join('')));

}
});

jayq.core.width.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.width(x);
});

jayq.core.width.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.width();
});

jayq.core.width.cljs$lang$maxFixedArity = 2;

jayq.core.inner_height = (function jayq$core$inner_height($elem){
return $elem.innerHeight();
});
jayq.core.inner_width = (function jayq$core$inner_width($elem){
return $elem.innerWidth();
});
jayq.core.outer_height = (function jayq$core$outer_height($elem){
return $elem.outerHeight();
});
jayq.core.outer_width = (function jayq$core$outer_width($elem){
return $elem.outerWidth();
});
jayq.core.offset = (function jayq$core$offset(var_args){
var args8531 = [];
var len__7322__auto___8534 = arguments.length;
var i__7323__auto___8535 = (0);
while(true){
if((i__7323__auto___8535 < len__7322__auto___8534)){
args8531.push((arguments[i__7323__auto___8535]));

var G__8536 = (i__7323__auto___8535 + (1));
i__7323__auto___8535 = G__8536;
continue;
} else {
}
break;
}

var G__8533 = args8531.length;
switch (G__8533) {
case 2:
return jayq.core.offset.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.offset.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8531.length)].join('')));

}
});

jayq.core.offset.cljs$core$IFn$_invoke$arity$2 = (function ($elem,coords){
return cljs.core.clj__GT_js.call(null,coords).offset();
});

jayq.core.offset.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return cljs.core.js__GT_clj.call(null,$elem.offset(),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
});

jayq.core.offset.cljs$lang$maxFixedArity = 2;

jayq.core.offset_parent = (function jayq$core$offset_parent($elem){
return $elem.offsetParent();
});
jayq.core.position = (function jayq$core$position($elem){
return cljs.core.js__GT_clj.call(null,$elem.position(),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true);
});
jayq.core.scroll_left = (function jayq$core$scroll_left(var_args){
var args8538 = [];
var len__7322__auto___8541 = arguments.length;
var i__7323__auto___8542 = (0);
while(true){
if((i__7323__auto___8542 < len__7322__auto___8541)){
args8538.push((arguments[i__7323__auto___8542]));

var G__8543 = (i__7323__auto___8542 + (1));
i__7323__auto___8542 = G__8543;
continue;
} else {
}
break;
}

var G__8540 = args8538.length;
switch (G__8540) {
case 1:
return jayq.core.scroll_left.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.scroll_left.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8538.length)].join('')));

}
});

jayq.core.scroll_left.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.scrollLeft();
});

jayq.core.scroll_left.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.scrollLeft(x);
});

jayq.core.scroll_left.cljs$lang$maxFixedArity = 2;

jayq.core.scroll_top = (function jayq$core$scroll_top(var_args){
var args8545 = [];
var len__7322__auto___8548 = arguments.length;
var i__7323__auto___8549 = (0);
while(true){
if((i__7323__auto___8549 < len__7322__auto___8548)){
args8545.push((arguments[i__7323__auto___8549]));

var G__8550 = (i__7323__auto___8549 + (1));
i__7323__auto___8549 = G__8550;
continue;
} else {
}
break;
}

var G__8547 = args8545.length;
switch (G__8547) {
case 1:
return jayq.core.scroll_top.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.scroll_top.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8545.length)].join('')));

}
});

jayq.core.scroll_top.cljs$core$IFn$_invoke$arity$1 = (function ($elem){
return $elem.scrollTop();
});

jayq.core.scroll_top.cljs$core$IFn$_invoke$arity$2 = (function ($elem,x){
return $elem.scrollTop(x);
});

jayq.core.scroll_top.cljs$lang$maxFixedArity = 2;

jayq.core.$deferred = jQuery.Deferred;
jayq.core.$when = jQuery.when;
jayq.core.then = (function jayq$core$then(var_args){
var args8552 = [];
var len__7322__auto___8555 = arguments.length;
var i__7323__auto___8556 = (0);
while(true){
if((i__7323__auto___8556 < len__7322__auto___8555)){
args8552.push((arguments[i__7323__auto___8556]));

var G__8557 = (i__7323__auto___8556 + (1));
i__7323__auto___8556 = G__8557;
continue;
} else {
}
break;
}

var G__8554 = args8552.length;
switch (G__8554) {
case 3:
return jayq.core.then.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return jayq.core.then.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8552.length)].join('')));

}
});

jayq.core.then.cljs$core$IFn$_invoke$arity$3 = (function (deferred,done_fn,fail_fn){
return deferred.then(cljs.core.clj__GT_js.call(null,done_fn),cljs.core.clj__GT_js.call(null,fail_fn));
});

jayq.core.then.cljs$core$IFn$_invoke$arity$4 = (function (deferred,done_fn,fail_fn,progress_fn){
return deferred.then(cljs.core.clj__GT_js.call(null,done_fn),cljs.core.clj__GT_js.call(null,fail_fn),cljs.core.clj__GT_js.call(null,progress_fn));
});

jayq.core.then.cljs$lang$maxFixedArity = 4;

jayq.core.done = (function jayq$core$done(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8561 = arguments.length;
var i__7323__auto___8562 = (0);
while(true){
if((i__7323__auto___8562 < len__7322__auto___8561)){
args__7329__auto__.push((arguments[i__7323__auto___8562]));

var G__8563 = (i__7323__auto___8562 + (1));
i__7323__auto___8562 = G__8563;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return jayq.core.done.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

jayq.core.done.cljs$core$IFn$_invoke$arity$variadic = (function (deferred,fns_args){
return deferred.done.apply(deferred,cljs.core.clj__GT_js.call(null,fns_args));
});

jayq.core.done.cljs$lang$maxFixedArity = (1);

jayq.core.done.cljs$lang$applyTo = (function (seq8559){
var G__8560 = cljs.core.first.call(null,seq8559);
var seq8559__$1 = cljs.core.next.call(null,seq8559);
return jayq.core.done.cljs$core$IFn$_invoke$arity$variadic(G__8560,seq8559__$1);
});

jayq.core.fail = (function jayq$core$fail(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8566 = arguments.length;
var i__7323__auto___8567 = (0);
while(true){
if((i__7323__auto___8567 < len__7322__auto___8566)){
args__7329__auto__.push((arguments[i__7323__auto___8567]));

var G__8568 = (i__7323__auto___8567 + (1));
i__7323__auto___8567 = G__8568;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return jayq.core.fail.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

jayq.core.fail.cljs$core$IFn$_invoke$arity$variadic = (function (deferred,fns_args){
return deferred.fail.apply(deferred,cljs.core.clj__GT_js.call(null,fns_args));
});

jayq.core.fail.cljs$lang$maxFixedArity = (1);

jayq.core.fail.cljs$lang$applyTo = (function (seq8564){
var G__8565 = cljs.core.first.call(null,seq8564);
var seq8564__$1 = cljs.core.next.call(null,seq8564);
return jayq.core.fail.cljs$core$IFn$_invoke$arity$variadic(G__8565,seq8564__$1);
});

jayq.core.progress = (function jayq$core$progress(deferred,fns_args){
return deferred.progress(cljs.core.clj__GT_js.call(null,fns_args));
});
jayq.core.promise = (function jayq$core$promise(var_args){
var args8569 = [];
var len__7322__auto___8572 = arguments.length;
var i__7323__auto___8573 = (0);
while(true){
if((i__7323__auto___8573 < len__7322__auto___8572)){
args8569.push((arguments[i__7323__auto___8573]));

var G__8574 = (i__7323__auto___8573 + (1));
i__7323__auto___8573 = G__8574;
continue;
} else {
}
break;
}

var G__8571 = args8569.length;
switch (G__8571) {
case 1:
return jayq.core.promise.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.promise.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.promise.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8569.length)].join('')));

}
});

jayq.core.promise.cljs$core$IFn$_invoke$arity$1 = (function (deferred){
return deferred.promise();
});

jayq.core.promise.cljs$core$IFn$_invoke$arity$2 = (function (deferred,type){
return deferred.promise(type);
});

jayq.core.promise.cljs$core$IFn$_invoke$arity$3 = (function (deferred,type,target){
return deferred.promise(type,target);
});

jayq.core.promise.cljs$lang$maxFixedArity = 3;

jayq.core.always = (function jayq$core$always(var_args){
var args__7329__auto__ = [];
var len__7322__auto___8578 = arguments.length;
var i__7323__auto___8579 = (0);
while(true){
if((i__7323__auto___8579 < len__7322__auto___8578)){
args__7329__auto__.push((arguments[i__7323__auto___8579]));

var G__8580 = (i__7323__auto___8579 + (1));
i__7323__auto___8579 = G__8580;
continue;
} else {
}
break;
}

var argseq__7330__auto__ = ((((1) < args__7329__auto__.length))?(new cljs.core.IndexedSeq(args__7329__auto__.slice((1)),(0),null)):null);
return jayq.core.always.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__7330__auto__);
});

jayq.core.always.cljs$core$IFn$_invoke$arity$variadic = (function (deferred,fns_args){
return deferred.always.apply(deferred,cljs.core.clj__GT_js.call(null,fns_args));
});

jayq.core.always.cljs$lang$maxFixedArity = (1);

jayq.core.always.cljs$lang$applyTo = (function (seq8576){
var G__8577 = cljs.core.first.call(null,seq8576);
var seq8576__$1 = cljs.core.next.call(null,seq8576);
return jayq.core.always.cljs$core$IFn$_invoke$arity$variadic(G__8577,seq8576__$1);
});

jayq.core.reject = (function jayq$core$reject(deferred,args){
return deferred.reject(args);
});
jayq.core.reject_with = (function jayq$core$reject_with(deferred,context,args){
return deferred.rejectWith(context,args);
});
jayq.core.notify = (function jayq$core$notify(deferred,args){
return deferred.notify(args);
});
jayq.core.notify_with = (function jayq$core$notify_with(deferred,context,args){
return deferred.notifyWith(context,args);
});
jayq.core.resolve = (function jayq$core$resolve(deferred,args){
return deferred.resolve(args);
});
jayq.core.resolve_with = (function jayq$core$resolve_with(deferred,context,args){
return deferred.resolveWith(context,args);
});
jayq.core.pipe = (function jayq$core$pipe(var_args){
var args8581 = [];
var len__7322__auto___8584 = arguments.length;
var i__7323__auto___8585 = (0);
while(true){
if((i__7323__auto___8585 < len__7322__auto___8584)){
args8581.push((arguments[i__7323__auto___8585]));

var G__8586 = (i__7323__auto___8585 + (1));
i__7323__auto___8585 = G__8586;
continue;
} else {
}
break;
}

var G__8583 = args8581.length;
switch (G__8583) {
case 2:
return jayq.core.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return jayq.core.pipe.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8581.length)].join('')));

}
});

jayq.core.pipe.cljs$core$IFn$_invoke$arity$2 = (function (deferred,done_filter){
return deferred.pipe(done_filter);
});

jayq.core.pipe.cljs$core$IFn$_invoke$arity$3 = (function (deferred,done_filter,fail_filter){
return deferred.pipe(done_filter,fail_filter);
});

jayq.core.pipe.cljs$core$IFn$_invoke$arity$4 = (function (deferred,done_filter,fail_filter,progress_filter){
return deferred.pipe(done_filter,fail_filter,progress_filter);
});

jayq.core.pipe.cljs$lang$maxFixedArity = 4;

jayq.core.state = (function jayq$core$state(deferred){
return cljs.core.keyword.call(null,deferred.state());
});
jayq.core.deferred_m = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"return","return",-1891502105),jayq.core.$when,new cljs.core.Keyword(null,"bind","bind",-113428417),(function (x,f){
var dfd = jayq.core.$deferred.call(null);
jayq.core.done.call(null,x,((function (dfd){
return (function (v){
return jayq.core.done.call(null,f.call(null,v),cljs.core.partial.call(null,jayq.core.resolve,dfd));
});})(dfd))
);

return jayq.core.promise.call(null,dfd);
}),new cljs.core.Keyword(null,"zero","zero",-858964576),cljs.core.identity], null);
jayq.core.ajax_m = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"return","return",-1891502105),cljs.core.identity,new cljs.core.Keyword(null,"bind","bind",-113428417),(function (x,f){
return jayq.core.done.call(null,jayq.core.ajax.call(null,x),f);
}),new cljs.core.Keyword(null,"zero","zero",-858964576),cljs.core.identity], null);

//# sourceMappingURL=core.js.map