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
var args6675 = [];
var len__27348__auto___6678 = arguments.length;
var i__27349__auto___6679 = (0);
while(true){
if((i__27349__auto___6679 < len__27348__auto___6678)){
args6675.push((arguments[i__27349__auto___6679]));

var G__6680 = (i__27349__auto___6679 + (1));
i__27349__auto___6679 = G__6680;
continue;
} else {
}
break;
}

var G__6677 = args6675.length;
switch (G__6677) {
case 1:
return jayq.core.$.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.$.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6675.length)].join('')));

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
var or__26817__auto__ = this$__$1.slice(k,(k + (1)));
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
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
var G__6683 = null;
var G__6683__2 = (function (self__,k){
var self____$1 = this;
var this$ = self____$1;
return cljs.core._lookup.call(null,this$,k);
});
var G__6683__3 = (function (self__,k,not_found){
var self____$1 = this;
var this$ = self____$1;
return cljs.core._lookup.call(null,this$,k,not_found);
});
G__6683 = function(self__,k,not_found){
switch(arguments.length){
case 2:
return G__6683__2.call(this,self__,k);
case 3:
return G__6683__3.call(this,self__,k,not_found);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__6683.cljs$core$IFn$_invoke$arity$2 = G__6683__2;
G__6683.cljs$core$IFn$_invoke$arity$3 = G__6683__3;
return G__6683;
})()
;

jQuery.prototype.apply = (function (self__,args6682){
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone.call(null,args6682)));
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
var args__27351__auto__ = [];
var len__27348__auto___6691 = arguments.length;
var i__27349__auto___6692 = (0);
while(true){
if((i__27349__auto___6692 < len__27348__auto___6691)){
args__27351__auto__.push((arguments[i__27349__auto___6692]));

var G__6693 = (i__27349__auto___6692 + (1));
i__27349__auto___6692 = G__6693;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((2) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((2)),(0),null)):null);
return jayq.core.anim.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27352__auto__);
});

jayq.core.anim.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,props,p__6687){
var vec__6688 = p__6687;
var speed = cljs.core.nth.call(null,vec__6688,(0),null);
var on_finish = cljs.core.nth.call(null,vec__6688,(1),null);
return $elem.animate(cljs.core.clj__GT_js.call(null,props),speed,on_finish);
});

jayq.core.anim.cljs$lang$maxFixedArity = (2);

jayq.core.anim.cljs$lang$applyTo = (function (seq6684){
var G__6685 = cljs.core.first.call(null,seq6684);
var seq6684__$1 = cljs.core.next.call(null,seq6684);
var G__6686 = cljs.core.first.call(null,seq6684__$1);
var seq6684__$2 = cljs.core.next.call(null,seq6684__$1);
return jayq.core.anim.cljs$core$IFn$_invoke$arity$variadic(G__6685,G__6686,seq6684__$2);
});

jayq.core.text = (function jayq$core$text(var_args){
var args6694 = [];
var len__27348__auto___6697 = arguments.length;
var i__27349__auto___6698 = (0);
while(true){
if((i__27349__auto___6698 < len__27348__auto___6697)){
args6694.push((arguments[i__27349__auto___6698]));

var G__6699 = (i__27349__auto___6698 + (1));
i__27349__auto___6698 = G__6699;
continue;
} else {
}
break;
}

var G__6696 = args6694.length;
switch (G__6696) {
case 1:
return jayq.core.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6694.length)].join('')));

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
var args6701 = [];
var len__27348__auto___6704 = arguments.length;
var i__27349__auto___6705 = (0);
while(true){
if((i__27349__auto___6705 < len__27348__auto___6704)){
args6701.push((arguments[i__27349__auto___6705]));

var G__6706 = (i__27349__auto___6705 + (1));
i__27349__auto___6705 = G__6706;
continue;
} else {
}
break;
}

var G__6703 = args6701.length;
switch (G__6703) {
case 2:
return jayq.core.css.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.css.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6701.length)].join('')));

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
var args6708 = [];
var len__27348__auto___6711 = arguments.length;
var i__27349__auto___6712 = (0);
while(true){
if((i__27349__auto___6712 < len__27348__auto___6711)){
args6708.push((arguments[i__27349__auto___6712]));

var G__6713 = (i__27349__auto___6712 + (1));
i__27349__auto___6712 = G__6713;
continue;
} else {
}
break;
}

var G__6710 = args6708.length;
switch (G__6710) {
case 3:
return jayq.core.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return jayq.core.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6708.length)].join('')));

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
var args6715 = [];
var len__27348__auto___6718 = arguments.length;
var i__27349__auto___6719 = (0);
while(true){
if((i__27349__auto___6719 < len__27348__auto___6718)){
args6715.push((arguments[i__27349__auto___6719]));

var G__6720 = (i__27349__auto___6719 + (1));
i__27349__auto___6719 = G__6720;
continue;
} else {
}
break;
}

var G__6717 = args6715.length;
switch (G__6717) {
case 3:
return jayq.core.prop.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return jayq.core.prop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6715.length)].join('')));

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
var args6722 = [];
var len__27348__auto___6725 = arguments.length;
var i__27349__auto___6726 = (0);
while(true){
if((i__27349__auto___6726 < len__27348__auto___6725)){
args6722.push((arguments[i__27349__auto___6726]));

var G__6727 = (i__27349__auto___6726 + (1));
i__27349__auto___6726 = G__6727;
continue;
} else {
}
break;
}

var G__6724 = args6722.length;
switch (G__6724) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6722.length)].join('')));

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
var args6729 = [];
var len__27348__auto___6732 = arguments.length;
var i__27349__auto___6733 = (0);
while(true){
if((i__27349__auto___6733 < len__27348__auto___6732)){
args6729.push((arguments[i__27349__auto___6733]));

var G__6734 = (i__27349__auto___6733 + (1));
i__27349__auto___6733 = G__6734;
continue;
} else {
}
break;
}

var G__6731 = args6729.length;
switch (G__6731) {
case 1:
return jayq.core.remove_class.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.remove_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6729.length)].join('')));

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
var args6736 = [];
var len__27348__auto___6739 = arguments.length;
var i__27349__auto___6740 = (0);
while(true){
if((i__27349__auto___6740 < len__27348__auto___6739)){
args6736.push((arguments[i__27349__auto___6740]));

var G__6741 = (i__27349__auto___6740 + (1));
i__27349__auto___6740 = G__6741;
continue;
} else {
}
break;
}

var G__6738 = args6736.length;
switch (G__6738) {
case 2:
return jayq.core.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return jayq.core.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6736.length)].join('')));

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
var args__27351__auto__ = [];
var len__27348__auto___6749 = arguments.length;
var i__27349__auto___6750 = (0);
while(true){
if((i__27349__auto___6750 < len__27348__auto___6749)){
args__27351__auto__.push((arguments[i__27349__auto___6750]));

var G__6751 = (i__27349__auto___6750 + (1));
i__27349__auto___6750 = G__6751;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return jayq.core.hide.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

jayq.core.hide.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__6745){
var vec__6746 = p__6745;
var speed = cljs.core.nth.call(null,vec__6746,(0),null);
var on_finish = cljs.core.nth.call(null,vec__6746,(1),null);
return $elem.hide(speed,on_finish);
});

jayq.core.hide.cljs$lang$maxFixedArity = (1);

jayq.core.hide.cljs$lang$applyTo = (function (seq6743){
var G__6744 = cljs.core.first.call(null,seq6743);
var seq6743__$1 = cljs.core.next.call(null,seq6743);
return jayq.core.hide.cljs$core$IFn$_invoke$arity$variadic(G__6744,seq6743__$1);
});

jayq.core.show = (function jayq$core$show(var_args){
var args__27351__auto__ = [];
var len__27348__auto___6758 = arguments.length;
var i__27349__auto___6759 = (0);
while(true){
if((i__27349__auto___6759 < len__27348__auto___6758)){
args__27351__auto__.push((arguments[i__27349__auto___6759]));

var G__6760 = (i__27349__auto___6759 + (1));
i__27349__auto___6759 = G__6760;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return jayq.core.show.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

jayq.core.show.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__6754){
var vec__6755 = p__6754;
var speed = cljs.core.nth.call(null,vec__6755,(0),null);
var on_finish = cljs.core.nth.call(null,vec__6755,(1),null);
return $elem.show(speed,on_finish);
});

jayq.core.show.cljs$lang$maxFixedArity = (1);

jayq.core.show.cljs$lang$applyTo = (function (seq6752){
var G__6753 = cljs.core.first.call(null,seq6752);
var seq6752__$1 = cljs.core.next.call(null,seq6752);
return jayq.core.show.cljs$core$IFn$_invoke$arity$variadic(G__6753,seq6752__$1);
});

jayq.core.toggle = (function jayq$core$toggle(var_args){
var args__27351__auto__ = [];
var len__27348__auto___6767 = arguments.length;
var i__27349__auto___6768 = (0);
while(true){
if((i__27349__auto___6768 < len__27348__auto___6767)){
args__27351__auto__.push((arguments[i__27349__auto___6768]));

var G__6769 = (i__27349__auto___6768 + (1));
i__27349__auto___6768 = G__6769;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return jayq.core.toggle.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

jayq.core.toggle.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__6763){
var vec__6764 = p__6763;
var speed = cljs.core.nth.call(null,vec__6764,(0),null);
var on_finish = cljs.core.nth.call(null,vec__6764,(1),null);
return $elem.toggle(speed,on_finish);
});

jayq.core.toggle.cljs$lang$maxFixedArity = (1);

jayq.core.toggle.cljs$lang$applyTo = (function (seq6761){
var G__6762 = cljs.core.first.call(null,seq6761);
var seq6761__$1 = cljs.core.next.call(null,seq6761);
return jayq.core.toggle.cljs$core$IFn$_invoke$arity$variadic(G__6762,seq6761__$1);
});

jayq.core.fade_out = (function jayq$core$fade_out(var_args){
var args__27351__auto__ = [];
var len__27348__auto___6776 = arguments.length;
var i__27349__auto___6777 = (0);
while(true){
if((i__27349__auto___6777 < len__27348__auto___6776)){
args__27351__auto__.push((arguments[i__27349__auto___6777]));

var G__6778 = (i__27349__auto___6777 + (1));
i__27349__auto___6777 = G__6778;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return jayq.core.fade_out.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

jayq.core.fade_out.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__6772){
var vec__6773 = p__6772;
var speed = cljs.core.nth.call(null,vec__6773,(0),null);
var on_finish = cljs.core.nth.call(null,vec__6773,(1),null);
return $elem.fadeOut(speed,on_finish);
});

jayq.core.fade_out.cljs$lang$maxFixedArity = (1);

jayq.core.fade_out.cljs$lang$applyTo = (function (seq6770){
var G__6771 = cljs.core.first.call(null,seq6770);
var seq6770__$1 = cljs.core.next.call(null,seq6770);
return jayq.core.fade_out.cljs$core$IFn$_invoke$arity$variadic(G__6771,seq6770__$1);
});

jayq.core.fade_in = (function jayq$core$fade_in(var_args){
var args__27351__auto__ = [];
var len__27348__auto___6785 = arguments.length;
var i__27349__auto___6786 = (0);
while(true){
if((i__27349__auto___6786 < len__27348__auto___6785)){
args__27351__auto__.push((arguments[i__27349__auto___6786]));

var G__6787 = (i__27349__auto___6786 + (1));
i__27349__auto___6786 = G__6787;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return jayq.core.fade_in.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

jayq.core.fade_in.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__6781){
var vec__6782 = p__6781;
var speed = cljs.core.nth.call(null,vec__6782,(0),null);
var on_finish = cljs.core.nth.call(null,vec__6782,(1),null);
return $elem.fadeIn(speed,on_finish);
});

jayq.core.fade_in.cljs$lang$maxFixedArity = (1);

jayq.core.fade_in.cljs$lang$applyTo = (function (seq6779){
var G__6780 = cljs.core.first.call(null,seq6779);
var seq6779__$1 = cljs.core.next.call(null,seq6779);
return jayq.core.fade_in.cljs$core$IFn$_invoke$arity$variadic(G__6780,seq6779__$1);
});

jayq.core.slide_up = (function jayq$core$slide_up(var_args){
var args__27351__auto__ = [];
var len__27348__auto___6794 = arguments.length;
var i__27349__auto___6795 = (0);
while(true){
if((i__27349__auto___6795 < len__27348__auto___6794)){
args__27351__auto__.push((arguments[i__27349__auto___6795]));

var G__6796 = (i__27349__auto___6795 + (1));
i__27349__auto___6795 = G__6796;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return jayq.core.slide_up.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

jayq.core.slide_up.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__6790){
var vec__6791 = p__6790;
var speed = cljs.core.nth.call(null,vec__6791,(0),null);
var on_finish = cljs.core.nth.call(null,vec__6791,(1),null);
return $elem.slideUp(speed,on_finish);
});

jayq.core.slide_up.cljs$lang$maxFixedArity = (1);

jayq.core.slide_up.cljs$lang$applyTo = (function (seq6788){
var G__6789 = cljs.core.first.call(null,seq6788);
var seq6788__$1 = cljs.core.next.call(null,seq6788);
return jayq.core.slide_up.cljs$core$IFn$_invoke$arity$variadic(G__6789,seq6788__$1);
});

jayq.core.slide_down = (function jayq$core$slide_down(var_args){
var args__27351__auto__ = [];
var len__27348__auto___6803 = arguments.length;
var i__27349__auto___6804 = (0);
while(true){
if((i__27349__auto___6804 < len__27348__auto___6803)){
args__27351__auto__.push((arguments[i__27349__auto___6804]));

var G__6805 = (i__27349__auto___6804 + (1));
i__27349__auto___6804 = G__6805;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return jayq.core.slide_down.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

jayq.core.slide_down.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,p__6799){
var vec__6800 = p__6799;
var speed = cljs.core.nth.call(null,vec__6800,(0),null);
var on_finish = cljs.core.nth.call(null,vec__6800,(1),null);
return $elem.slideDown(speed,on_finish);
});

jayq.core.slide_down.cljs$lang$maxFixedArity = (1);

jayq.core.slide_down.cljs$lang$applyTo = (function (seq6797){
var G__6798 = cljs.core.first.call(null,seq6797);
var seq6797__$1 = cljs.core.next.call(null,seq6797);
return jayq.core.slide_down.cljs$core$IFn$_invoke$arity$variadic(G__6798,seq6797__$1);
});

jayq.core.siblings = (function jayq$core$siblings(var_args){
var args6806 = [];
var len__27348__auto___6809 = arguments.length;
var i__27349__auto___6810 = (0);
while(true){
if((i__27349__auto___6810 < len__27348__auto___6809)){
args6806.push((arguments[i__27349__auto___6810]));

var G__6811 = (i__27349__auto___6810 + (1));
i__27349__auto___6810 = G__6811;
continue;
} else {
}
break;
}

var G__6808 = args6806.length;
switch (G__6808) {
case 1:
return jayq.core.siblings.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.siblings.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6806.length)].join('')));

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
var args6813 = [];
var len__27348__auto___6816 = arguments.length;
var i__27349__auto___6817 = (0);
while(true){
if((i__27349__auto___6817 < len__27348__auto___6816)){
args6813.push((arguments[i__27349__auto___6817]));

var G__6818 = (i__27349__auto___6817 + (1));
i__27349__auto___6817 = G__6818;
continue;
} else {
}
break;
}

var G__6815 = args6813.length;
switch (G__6815) {
case 1:
return jayq.core.parents.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.parents.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6813.length)].join('')));

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
var args6820 = [];
var len__27348__auto___6823 = arguments.length;
var i__27349__auto___6824 = (0);
while(true){
if((i__27349__auto___6824 < len__27348__auto___6823)){
args6820.push((arguments[i__27349__auto___6824]));

var G__6825 = (i__27349__auto___6824 + (1));
i__27349__auto___6824 = G__6825;
continue;
} else {
}
break;
}

var G__6822 = args6820.length;
switch (G__6822) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6820.length)].join('')));

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
var args6827 = [];
var len__27348__auto___6830 = arguments.length;
var i__27349__auto___6831 = (0);
while(true){
if((i__27349__auto___6831 < len__27348__auto___6830)){
args6827.push((arguments[i__27349__auto___6831]));

var G__6832 = (i__27349__auto___6831 + (1));
i__27349__auto___6831 = G__6832;
continue;
} else {
}
break;
}

var G__6829 = args6827.length;
switch (G__6829) {
case 2:
return jayq.core.children.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.children.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6827.length)].join('')));

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
var args6834 = [];
var len__27348__auto___6837 = arguments.length;
var i__27349__auto___6838 = (0);
while(true){
if((i__27349__auto___6838 < len__27348__auto___6837)){
args6834.push((arguments[i__27349__auto___6838]));

var G__6839 = (i__27349__auto___6838 + (1));
i__27349__auto___6838 = G__6839;
continue;
} else {
}
break;
}

var G__6836 = args6834.length;
switch (G__6836) {
case 1:
return jayq.core.next.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.next.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6834.length)].join('')));

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
var args6841 = [];
var len__27348__auto___6844 = arguments.length;
var i__27349__auto___6845 = (0);
while(true){
if((i__27349__auto___6845 < len__27348__auto___6844)){
args6841.push((arguments[i__27349__auto___6845]));

var G__6846 = (i__27349__auto___6845 + (1));
i__27349__auto___6845 = G__6846;
continue;
} else {
}
break;
}

var G__6843 = args6841.length;
switch (G__6843) {
case 1:
return jayq.core.prev.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.prev.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6841.length)].join('')));

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
var args6848 = [];
var len__27348__auto___6851 = arguments.length;
var i__27349__auto___6852 = (0);
while(true){
if((i__27349__auto___6852 < len__27348__auto___6851)){
args6848.push((arguments[i__27349__auto___6852]));

var G__6853 = (i__27349__auto___6852 + (1));
i__27349__auto___6852 = G__6853;
continue;
} else {
}
break;
}

var G__6850 = args6848.length;
switch (G__6850) {
case 1:
return jayq.core.next_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.next_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6848.length)].join('')));

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
var args6855 = [];
var len__27348__auto___6858 = arguments.length;
var i__27349__auto___6859 = (0);
while(true){
if((i__27349__auto___6859 < len__27348__auto___6858)){
args6855.push((arguments[i__27349__auto___6859]));

var G__6860 = (i__27349__auto___6859 + (1));
i__27349__auto___6859 = G__6860;
continue;
} else {
}
break;
}

var G__6857 = args6855.length;
switch (G__6857) {
case 1:
return jayq.core.prev_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.prev_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6855.length)].join('')));

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
var args6862 = [];
var len__27348__auto___6865 = arguments.length;
var i__27349__auto___6866 = (0);
while(true){
if((i__27349__auto___6866 < len__27348__auto___6865)){
args6862.push((arguments[i__27349__auto___6866]));

var G__6867 = (i__27349__auto___6866 + (1));
i__27349__auto___6866 = G__6867;
continue;
} else {
}
break;
}

var G__6864 = args6862.length;
switch (G__6864) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6862.length)].join('')));

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
var args6869 = [];
var len__27348__auto___6872 = arguments.length;
var i__27349__auto___6873 = (0);
while(true){
if((i__27349__auto___6873 < len__27348__auto___6872)){
args6869.push((arguments[i__27349__auto___6873]));

var G__6874 = (i__27349__auto___6873 + (1));
i__27349__auto___6873 = G__6874;
continue;
} else {
}
break;
}

var G__6871 = args6869.length;
switch (G__6871) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6869.length)].join('')));

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
var args__27351__auto__ = [];
var len__27348__auto___6883 = arguments.length;
var i__27349__auto___6884 = (0);
while(true){
if((i__27349__auto___6884 < len__27348__auto___6883)){
args__27351__auto__.push((arguments[i__27349__auto___6884]));

var G__6885 = (i__27349__auto___6884 + (1));
i__27349__auto___6884 = G__6885;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((2) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((2)),(0),null)):null);
return jayq.core.closest.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27352__auto__);
});

jayq.core.closest.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,selector,p__6879){
var vec__6880 = p__6879;
var context = cljs.core.nth.call(null,vec__6880,(0),null);
return $elem.closest(jayq.core.__GT_selector.call(null,selector),context);
});

jayq.core.closest.cljs$lang$maxFixedArity = (2);

jayq.core.closest.cljs$lang$applyTo = (function (seq6876){
var G__6877 = cljs.core.first.call(null,seq6876);
var seq6876__$1 = cljs.core.next.call(null,seq6876);
var G__6878 = cljs.core.first.call(null,seq6876__$1);
var seq6876__$2 = cljs.core.next.call(null,seq6876__$1);
return jayq.core.closest.cljs$core$IFn$_invoke$arity$variadic(G__6877,G__6878,seq6876__$2);
});

jayq.core.clone = (function jayq$core$clone($elem){
return $elem.clone();
});
jayq.core.html = (function jayq$core$html(var_args){
var args6886 = [];
var len__27348__auto___6889 = arguments.length;
var i__27349__auto___6890 = (0);
while(true){
if((i__27349__auto___6890 < len__27348__auto___6889)){
args6886.push((arguments[i__27349__auto___6890]));

var G__6891 = (i__27349__auto___6890 + (1));
i__27349__auto___6890 = G__6891;
continue;
} else {
}
break;
}

var G__6888 = args6886.length;
switch (G__6888) {
case 2:
return jayq.core.html.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.html.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6886.length)].join('')));

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
var args6893 = [];
var len__27348__auto___6896 = arguments.length;
var i__27349__auto___6897 = (0);
while(true){
if((i__27349__auto___6897 < len__27348__auto___6896)){
args6893.push((arguments[i__27349__auto___6897]));

var G__6898 = (i__27349__auto___6897 + (1));
i__27349__auto___6897 = G__6898;
continue;
} else {
}
break;
}

var G__6895 = args6893.length;
switch (G__6895) {
case 2:
return jayq.core.val.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.val.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6893.length)].join('')));

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
var args6900 = [];
var len__27348__auto___6903 = arguments.length;
var i__27349__auto___6904 = (0);
while(true){
if((i__27349__auto___6904 < len__27348__auto___6903)){
args6900.push((arguments[i__27349__auto___6904]));

var G__6905 = (i__27349__auto___6904 + (1));
i__27349__auto___6904 = G__6905;
continue;
} else {
}
break;
}

var G__6902 = args6900.length;
switch (G__6902) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6900.length)].join('')));

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
var args6907 = [];
var len__27348__auto___6910 = arguments.length;
var i__27349__auto___6911 = (0);
while(true){
if((i__27349__auto___6911 < len__27348__auto___6910)){
args6907.push((arguments[i__27349__auto___6911]));

var G__6912 = (i__27349__auto___6911 + (1));
i__27349__auto___6911 = G__6912;
continue;
} else {
}
break;
}

var G__6909 = args6907.length;
switch (G__6909) {
case 2:
return jayq.core.dequeue.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.dequeue.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6907.length)].join('')));

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
jayq.core.preprocess_request = (function jayq$core$preprocess_request(p__6916){
var map__6919 = p__6916;
var map__6919__$1 = ((((!((map__6919 == null)))?((((map__6919.cljs$lang$protocol_mask$partition0$ & (64))) || (map__6919.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__6919):map__6919);
var request = map__6919__$1;
var data = cljs.core.get.call(null,map__6919__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var contentType = cljs.core.get.call(null,map__6919__$1,new cljs.core.Keyword(null,"contentType","contentType",-1462509576));
var ct = jayq.core.__GT_content_type.call(null,contentType);
return ((function (ct,map__6919,map__6919__$1,request,data,contentType){
return (function (p1__6915_SHARP_){
if(cljs.core.truth_((function (){var and__26809__auto__ = ct;
if(cljs.core.truth_(and__26809__auto__)){
return jayq.core.clj_content_type_QMARK_.call(null,ct);
} else {
return and__26809__auto__;
}
})())){
return cljs.core.assoc.call(null,p1__6915_SHARP_,new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.pr_str.call(null,data));
} else {
return p1__6915_SHARP_;
}
});})(ct,map__6919,map__6919__$1,request,data,contentType))
.call(null,((function (ct,map__6919,map__6919__$1,request,data,contentType){
return (function (p1__6914_SHARP_){
if(cljs.core.truth_(ct)){
return cljs.core.assoc.call(null,p1__6914_SHARP_,new cljs.core.Keyword(null,"contentType","contentType",-1462509576),ct);
} else {
return p1__6914_SHARP_;
}
});})(ct,map__6919,map__6919__$1,request,data,contentType))
.call(null,request));
});
jayq.core.__GT_ajax_settings = (function jayq$core$__GT_ajax_settings(request){
return cljs.core.clj__GT_js.call(null,jayq.core.preprocess_request.call(null,request));
});
jayq.core.ajax = (function jayq$core$ajax(var_args){
var args6921 = [];
var len__27348__auto___6924 = arguments.length;
var i__27349__auto___6925 = (0);
while(true){
if((i__27349__auto___6925 < len__27348__auto___6924)){
args6921.push((arguments[i__27349__auto___6925]));

var G__6926 = (i__27349__auto___6925 + (1));
i__27349__auto___6925 = G__6926;
continue;
} else {
}
break;
}

var G__6923 = args6921.length;
switch (G__6923) {
case 2:
return jayq.core.ajax.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.ajax.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6921.length)].join('')));

}
});

jayq.core.ajax.cljs$core$IFn$_invoke$arity$2 = (function (url,settings){
return jQuery.ajax(url,jayq.core.__GT_ajax_settings.call(null,settings));
});

jayq.core.ajax.cljs$core$IFn$_invoke$arity$1 = (function (settings){
return jQuery.ajax(jayq.core.__GT_ajax_settings.call(null,settings));
});

jayq.core.ajax.cljs$lang$maxFixedArity = 2;

jayq.core.xhr = (function jayq$core$xhr(p__6928,content,callback){
var vec__6932 = p__6928;
var method = cljs.core.nth.call(null,vec__6932,(0),null);
var uri = cljs.core.nth.call(null,vec__6932,(1),null);
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
var args__27351__auto__ = [];
var len__27348__auto___6942 = arguments.length;
var i__27349__auto___6943 = (0);
while(true){
if((i__27349__auto___6943 < len__27348__auto___6942)){
args__27351__auto__.push((arguments[i__27349__auto___6943]));

var G__6944 = (i__27349__auto___6943 + (1));
i__27349__auto___6943 = G__6944;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((2) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((2)),(0),null)):null);
return jayq.core.unbind.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27352__auto__);
});

jayq.core.unbind.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,ev,p__6938){
var vec__6939 = p__6938;
var func = cljs.core.nth.call(null,vec__6939,(0),null);
return $elem.unbind(cljs.core.name.call(null,ev),func);
});

jayq.core.unbind.cljs$lang$maxFixedArity = (2);

jayq.core.unbind.cljs$lang$applyTo = (function (seq6935){
var G__6936 = cljs.core.first.call(null,seq6935);
var seq6935__$1 = cljs.core.next.call(null,seq6935);
var G__6937 = cljs.core.first.call(null,seq6935__$1);
var seq6935__$2 = cljs.core.next.call(null,seq6935__$1);
return jayq.core.unbind.cljs$core$IFn$_invoke$arity$variadic(G__6936,G__6937,seq6935__$2);
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
var args__27351__auto__ = [];
var len__27348__auto___6952 = arguments.length;
var i__27349__auto___6953 = (0);
while(true){
if((i__27349__auto___6953 < len__27348__auto___6952)){
args__27351__auto__.push((arguments[i__27349__auto___6953]));

var G__6954 = (i__27349__auto___6953 + (1));
i__27349__auto___6953 = G__6954;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((2) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((2)),(0),null)):null);
return jayq.core.on.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27352__auto__);
});

jayq.core.on.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,events,p__6948){
var vec__6949 = p__6948;
var sel = cljs.core.nth.call(null,vec__6949,(0),null);
var data = cljs.core.nth.call(null,vec__6949,(1),null);
var handler = cljs.core.nth.call(null,vec__6949,(2),null);
return $elem.on(jayq.core.__GT_event.call(null,events),jayq.core.__GT_selector.call(null,sel),data,handler);
});

jayq.core.on.cljs$lang$maxFixedArity = (2);

jayq.core.on.cljs$lang$applyTo = (function (seq6945){
var G__6946 = cljs.core.first.call(null,seq6945);
var seq6945__$1 = cljs.core.next.call(null,seq6945);
var G__6947 = cljs.core.first.call(null,seq6945__$1);
var seq6945__$2 = cljs.core.next.call(null,seq6945__$1);
return jayq.core.on.cljs$core$IFn$_invoke$arity$variadic(G__6946,G__6947,seq6945__$2);
});

jayq.core.one = (function jayq$core$one(var_args){
var args__27351__auto__ = [];
var len__27348__auto___6962 = arguments.length;
var i__27349__auto___6963 = (0);
while(true){
if((i__27349__auto___6963 < len__27348__auto___6962)){
args__27351__auto__.push((arguments[i__27349__auto___6963]));

var G__6964 = (i__27349__auto___6963 + (1));
i__27349__auto___6963 = G__6964;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((2) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((2)),(0),null)):null);
return jayq.core.one.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27352__auto__);
});

jayq.core.one.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,events,p__6958){
var vec__6959 = p__6958;
var sel = cljs.core.nth.call(null,vec__6959,(0),null);
var data = cljs.core.nth.call(null,vec__6959,(1),null);
var handler = cljs.core.nth.call(null,vec__6959,(2),null);
return $elem.one(jayq.core.__GT_event.call(null,events),jayq.core.__GT_selector.call(null,sel),data,handler);
});

jayq.core.one.cljs$lang$maxFixedArity = (2);

jayq.core.one.cljs$lang$applyTo = (function (seq6955){
var G__6956 = cljs.core.first.call(null,seq6955);
var seq6955__$1 = cljs.core.next.call(null,seq6955);
var G__6957 = cljs.core.first.call(null,seq6955__$1);
var seq6955__$2 = cljs.core.next.call(null,seq6955__$1);
return jayq.core.one.cljs$core$IFn$_invoke$arity$variadic(G__6956,G__6957,seq6955__$2);
});

jayq.core.off = (function jayq$core$off(var_args){
var args__27351__auto__ = [];
var len__27348__auto___6972 = arguments.length;
var i__27349__auto___6973 = (0);
while(true){
if((i__27349__auto___6973 < len__27348__auto___6972)){
args__27351__auto__.push((arguments[i__27349__auto___6973]));

var G__6974 = (i__27349__auto___6973 + (1));
i__27349__auto___6973 = G__6974;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((2) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((2)),(0),null)):null);
return jayq.core.off.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__27352__auto__);
});

jayq.core.off.cljs$core$IFn$_invoke$arity$variadic = (function ($elem,events,p__6968){
var vec__6969 = p__6968;
var sel = cljs.core.nth.call(null,vec__6969,(0),null);
var handler = cljs.core.nth.call(null,vec__6969,(1),null);
return $elem.off(jayq.core.__GT_event.call(null,events),jayq.core.__GT_selector.call(null,sel),handler);
});

jayq.core.off.cljs$lang$maxFixedArity = (2);

jayq.core.off.cljs$lang$applyTo = (function (seq6965){
var G__6966 = cljs.core.first.call(null,seq6965);
var seq6965__$1 = cljs.core.next.call(null,seq6965);
var G__6967 = cljs.core.first.call(null,seq6965__$1);
var seq6965__$2 = cljs.core.next.call(null,seq6965__$1);
return jayq.core.off.cljs$core$IFn$_invoke$arity$variadic(G__6966,G__6967,seq6965__$2);
});

jayq.core.prevent = (function jayq$core$prevent(e){
return e.preventDefault();
});
jayq.core.height = (function jayq$core$height(var_args){
var args6975 = [];
var len__27348__auto___6978 = arguments.length;
var i__27349__auto___6979 = (0);
while(true){
if((i__27349__auto___6979 < len__27348__auto___6978)){
args6975.push((arguments[i__27349__auto___6979]));

var G__6980 = (i__27349__auto___6979 + (1));
i__27349__auto___6979 = G__6980;
continue;
} else {
}
break;
}

var G__6977 = args6975.length;
switch (G__6977) {
case 2:
return jayq.core.height.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.height.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6975.length)].join('')));

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
var args6982 = [];
var len__27348__auto___6985 = arguments.length;
var i__27349__auto___6986 = (0);
while(true){
if((i__27349__auto___6986 < len__27348__auto___6985)){
args6982.push((arguments[i__27349__auto___6986]));

var G__6987 = (i__27349__auto___6986 + (1));
i__27349__auto___6986 = G__6987;
continue;
} else {
}
break;
}

var G__6984 = args6982.length;
switch (G__6984) {
case 2:
return jayq.core.width.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.width.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6982.length)].join('')));

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
var args6989 = [];
var len__27348__auto___6992 = arguments.length;
var i__27349__auto___6993 = (0);
while(true){
if((i__27349__auto___6993 < len__27348__auto___6992)){
args6989.push((arguments[i__27349__auto___6993]));

var G__6994 = (i__27349__auto___6993 + (1));
i__27349__auto___6993 = G__6994;
continue;
} else {
}
break;
}

var G__6991 = args6989.length;
switch (G__6991) {
case 2:
return jayq.core.offset.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return jayq.core.offset.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6989.length)].join('')));

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
var args6996 = [];
var len__27348__auto___6999 = arguments.length;
var i__27349__auto___7000 = (0);
while(true){
if((i__27349__auto___7000 < len__27348__auto___6999)){
args6996.push((arguments[i__27349__auto___7000]));

var G__7001 = (i__27349__auto___7000 + (1));
i__27349__auto___7000 = G__7001;
continue;
} else {
}
break;
}

var G__6998 = args6996.length;
switch (G__6998) {
case 1:
return jayq.core.scroll_left.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.scroll_left.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args6996.length)].join('')));

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
var args7003 = [];
var len__27348__auto___7006 = arguments.length;
var i__27349__auto___7007 = (0);
while(true){
if((i__27349__auto___7007 < len__27348__auto___7006)){
args7003.push((arguments[i__27349__auto___7007]));

var G__7008 = (i__27349__auto___7007 + (1));
i__27349__auto___7007 = G__7008;
continue;
} else {
}
break;
}

var G__7005 = args7003.length;
switch (G__7005) {
case 1:
return jayq.core.scroll_top.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return jayq.core.scroll_top.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args7003.length)].join('')));

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
var args7010 = [];
var len__27348__auto___7013 = arguments.length;
var i__27349__auto___7014 = (0);
while(true){
if((i__27349__auto___7014 < len__27348__auto___7013)){
args7010.push((arguments[i__27349__auto___7014]));

var G__7015 = (i__27349__auto___7014 + (1));
i__27349__auto___7014 = G__7015;
continue;
} else {
}
break;
}

var G__7012 = args7010.length;
switch (G__7012) {
case 3:
return jayq.core.then.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return jayq.core.then.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args7010.length)].join('')));

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
var args__27351__auto__ = [];
var len__27348__auto___7019 = arguments.length;
var i__27349__auto___7020 = (0);
while(true){
if((i__27349__auto___7020 < len__27348__auto___7019)){
args__27351__auto__.push((arguments[i__27349__auto___7020]));

var G__7021 = (i__27349__auto___7020 + (1));
i__27349__auto___7020 = G__7021;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return jayq.core.done.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

jayq.core.done.cljs$core$IFn$_invoke$arity$variadic = (function (deferred,fns_args){
return deferred.done.apply(deferred,cljs.core.clj__GT_js.call(null,fns_args));
});

jayq.core.done.cljs$lang$maxFixedArity = (1);

jayq.core.done.cljs$lang$applyTo = (function (seq7017){
var G__7018 = cljs.core.first.call(null,seq7017);
var seq7017__$1 = cljs.core.next.call(null,seq7017);
return jayq.core.done.cljs$core$IFn$_invoke$arity$variadic(G__7018,seq7017__$1);
});

jayq.core.fail = (function jayq$core$fail(var_args){
var args__27351__auto__ = [];
var len__27348__auto___7024 = arguments.length;
var i__27349__auto___7025 = (0);
while(true){
if((i__27349__auto___7025 < len__27348__auto___7024)){
args__27351__auto__.push((arguments[i__27349__auto___7025]));

var G__7026 = (i__27349__auto___7025 + (1));
i__27349__auto___7025 = G__7026;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return jayq.core.fail.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

jayq.core.fail.cljs$core$IFn$_invoke$arity$variadic = (function (deferred,fns_args){
return deferred.fail.apply(deferred,cljs.core.clj__GT_js.call(null,fns_args));
});

jayq.core.fail.cljs$lang$maxFixedArity = (1);

jayq.core.fail.cljs$lang$applyTo = (function (seq7022){
var G__7023 = cljs.core.first.call(null,seq7022);
var seq7022__$1 = cljs.core.next.call(null,seq7022);
return jayq.core.fail.cljs$core$IFn$_invoke$arity$variadic(G__7023,seq7022__$1);
});

jayq.core.progress = (function jayq$core$progress(deferred,fns_args){
return deferred.progress(cljs.core.clj__GT_js.call(null,fns_args));
});
jayq.core.promise = (function jayq$core$promise(var_args){
var args7027 = [];
var len__27348__auto___7030 = arguments.length;
var i__27349__auto___7031 = (0);
while(true){
if((i__27349__auto___7031 < len__27348__auto___7030)){
args7027.push((arguments[i__27349__auto___7031]));

var G__7032 = (i__27349__auto___7031 + (1));
i__27349__auto___7031 = G__7032;
continue;
} else {
}
break;
}

var G__7029 = args7027.length;
switch (G__7029) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args7027.length)].join('')));

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
var args__27351__auto__ = [];
var len__27348__auto___7036 = arguments.length;
var i__27349__auto___7037 = (0);
while(true){
if((i__27349__auto___7037 < len__27348__auto___7036)){
args__27351__auto__.push((arguments[i__27349__auto___7037]));

var G__7038 = (i__27349__auto___7037 + (1));
i__27349__auto___7037 = G__7038;
continue;
} else {
}
break;
}

var argseq__27352__auto__ = ((((1) < args__27351__auto__.length))?(new cljs.core.IndexedSeq(args__27351__auto__.slice((1)),(0),null)):null);
return jayq.core.always.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__27352__auto__);
});

jayq.core.always.cljs$core$IFn$_invoke$arity$variadic = (function (deferred,fns_args){
return deferred.always.apply(deferred,cljs.core.clj__GT_js.call(null,fns_args));
});

jayq.core.always.cljs$lang$maxFixedArity = (1);

jayq.core.always.cljs$lang$applyTo = (function (seq7034){
var G__7035 = cljs.core.first.call(null,seq7034);
var seq7034__$1 = cljs.core.next.call(null,seq7034);
return jayq.core.always.cljs$core$IFn$_invoke$arity$variadic(G__7035,seq7034__$1);
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
var args7039 = [];
var len__27348__auto___7042 = arguments.length;
var i__27349__auto___7043 = (0);
while(true){
if((i__27349__auto___7043 < len__27348__auto___7042)){
args7039.push((arguments[i__27349__auto___7043]));

var G__7044 = (i__27349__auto___7043 + (1));
i__27349__auto___7043 = G__7044;
continue;
} else {
}
break;
}

var G__7041 = args7039.length;
switch (G__7041) {
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
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args7039.length)].join('')));

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

//# sourceMappingURL=core.js.map?rel=1468744497481