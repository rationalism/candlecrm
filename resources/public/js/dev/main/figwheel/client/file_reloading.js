// Compiled by ClojureScript 1.9.93 {}
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('goog.Uri');
goog.require('goog.net.jsloader');
goog.require('cljs.core.async');
goog.require('goog.object');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('figwheel.client.utils');
if(typeof figwheel.client.file_reloading.figwheel_meta_pragmas !== 'undefined'){
} else {
figwheel.client.file_reloading.figwheel_meta_pragmas = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
figwheel.client.file_reloading.on_jsload_custom_event = (function figwheel$client$file_reloading$on_jsload_custom_event(url){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.js-reload",url);
});
figwheel.client.file_reloading.before_jsload_custom_event = (function figwheel$client$file_reloading$before_jsload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.before-js-reload",files);
});
figwheel.client.file_reloading.namespace_file_map_QMARK_ = (function figwheel$client$file_reloading$namespace_file_map_QMARK_(m){
var or__26817__auto__ = (cljs.core.map_QMARK_.call(null,m)) && (typeof new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (((new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) == null)) || (typeof new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) === 'string')) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"namespace","namespace",-377510372)));
if(or__26817__auto__){
return or__26817__auto__;
} else {
cljs.core.println.call(null,"Error not namespace-file-map",cljs.core.pr_str.call(null,m));

return false;
}
});
figwheel.client.file_reloading.add_cache_buster = (function figwheel$client$file_reloading$add_cache_buster(url){

return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.name__GT_path = (function figwheel$client$file_reloading$name__GT_path(ns){

return (goog.dependencies_.nameToPath[ns]);
});
figwheel.client.file_reloading.provided_QMARK_ = (function figwheel$client$file_reloading$provided_QMARK_(ns){
return (goog.dependencies_.written[figwheel.client.file_reloading.name__GT_path.call(null,ns)]);
});
figwheel.client.file_reloading.fix_node_request_url = (function figwheel$client$file_reloading$fix_node_request_url(url){

if(cljs.core.truth_(goog.string.startsWith(url,"../"))){
return clojure.string.replace.call(null,url,"../","");
} else {
return [cljs.core.str("goog/"),cljs.core.str(url)].join('');
}
});
figwheel.client.file_reloading.immutable_ns_QMARK_ = (function figwheel$client$file_reloading$immutable_ns_QMARK_(name){
var or__26817__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 9, ["svgpan.SvgPan",null,"far.out",null,"testDep.bar",null,"someprotopackage.TestPackageTypes",null,"goog",null,"an.existing.path",null,"cljs.core",null,"ns",null,"dup.base",null], null), null).call(null,name);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return cljs.core.some.call(null,cljs.core.partial.call(null,goog.string.startsWith,name),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["goog.","cljs.","clojure.","fake.","proto2."], null));
}
});
figwheel.client.file_reloading.get_requires = (function figwheel$client$file_reloading$get_requires(ns){
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__7525_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__7525_SHARP_));
}),goog.object.getKeys((goog.dependencies_.requires[figwheel.client.file_reloading.name__GT_path.call(null,ns)]))));
});
if(typeof figwheel.client.file_reloading.dependency_data !== 'undefined'){
} else {
figwheel.client.file_reloading.dependency_data = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"dependents","dependents",136812837),cljs.core.PersistentArrayMap.EMPTY], null));
}
figwheel.client.file_reloading.path_to_name_BANG_ = (function figwheel$client$file_reloading$path_to_name_BANG_(path,name){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.fromArray([name], true));
});
/**
 * Setup a path to name dependencies map.
 * That goes from path -> #{ ns-names }
 */
figwheel.client.file_reloading.setup_path__GT_name_BANG_ = (function figwheel$client$file_reloading$setup_path__GT_name_BANG_(){
var nameToPath = goog.object.filter(goog.dependencies_.nameToPath,(function (v,k,o){
return goog.string.startsWith(v,"../");
}));
return goog.object.forEach(nameToPath,((function (nameToPath){
return (function (v,k,o){
return figwheel.client.file_reloading.path_to_name_BANG_.call(null,v,k);
});})(nameToPath))
);
});
/**
 * returns a set of namespaces defined by a path
 */
figwheel.client.file_reloading.path__GT_name = (function figwheel$client$file_reloading$path__GT_name(path){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pathToName","pathToName",-1236616181),path], null));
});
figwheel.client.file_reloading.name_to_parent_BANG_ = (function figwheel$client$file_reloading$name_to_parent_BANG_(ns,parent_ns){
return cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependency_data,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null),cljs.core.fnil.call(null,clojure.set.union,cljs.core.PersistentHashSet.EMPTY),cljs.core.PersistentHashSet.fromArray([parent_ns], true));
});
/**
 * This reverses the goog.dependencies_.requires for looking up ns-dependents.
 */
figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_ = (function figwheel$client$file_reloading$setup_ns__GT_dependents_BANG_(){
var requires = goog.object.filter(goog.dependencies_.requires,(function (v,k,o){
return goog.string.startsWith(k,"../");
}));
return goog.object.forEach(requires,((function (requires){
return (function (v,k,_){
return goog.object.forEach(v,((function (requires){
return (function (v_SINGLEQUOTE_,k_SINGLEQUOTE_,___$1){
var seq__7530 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__7531 = null;
var count__7532 = (0);
var i__7533 = (0);
while(true){
if((i__7533 < count__7532)){
var n = cljs.core._nth.call(null,chunk__7531,i__7533);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__7534 = seq__7530;
var G__7535 = chunk__7531;
var G__7536 = count__7532;
var G__7537 = (i__7533 + (1));
seq__7530 = G__7534;
chunk__7531 = G__7535;
count__7532 = G__7536;
i__7533 = G__7537;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__7530);
if(temp__4657__auto__){
var seq__7530__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7530__$1)){
var c__27200__auto__ = cljs.core.chunk_first.call(null,seq__7530__$1);
var G__7538 = cljs.core.chunk_rest.call(null,seq__7530__$1);
var G__7539 = c__27200__auto__;
var G__7540 = cljs.core.count.call(null,c__27200__auto__);
var G__7541 = (0);
seq__7530 = G__7538;
chunk__7531 = G__7539;
count__7532 = G__7540;
i__7533 = G__7541;
continue;
} else {
var n = cljs.core.first.call(null,seq__7530__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__7542 = cljs.core.next.call(null,seq__7530__$1);
var G__7543 = null;
var G__7544 = (0);
var G__7545 = (0);
seq__7530 = G__7542;
chunk__7531 = G__7543;
count__7532 = G__7544;
i__7533 = G__7545;
continue;
}
} else {
return null;
}
}
break;
}
});})(requires))
);
});})(requires))
);
});
figwheel.client.file_reloading.ns__GT_dependents = (function figwheel$client$file_reloading$ns__GT_dependents(ns){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.dependency_data),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dependents","dependents",136812837),ns], null));
});
figwheel.client.file_reloading.build_topo_sort = (function figwheel$client$file_reloading$build_topo_sort(get_deps){
var get_deps__$1 = cljs.core.memoize.call(null,get_deps);
var topo_sort_helper_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_topo_sort_helper_STAR_(x,depth,state){
var deps = get_deps__$1.call(null,x);
if(cljs.core.empty_QMARK_.call(null,deps)){
return null;
} else {
return topo_sort_STAR_.call(null,deps,depth,state);
}
});})(get_deps__$1))
;
var topo_sort_STAR_ = ((function (get_deps__$1){
return (function() {
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = null;
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1 = (function (deps){
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.call(null,deps,(0),cljs.core.atom.call(null,cljs.core.sorted_map.call(null)));
});
var figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3 = (function (deps,depth,state){
cljs.core.swap_BANG_.call(null,state,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [depth], null),cljs.core.fnil.call(null,cljs.core.into,cljs.core.PersistentHashSet.EMPTY),deps);

var seq__7596_7607 = cljs.core.seq.call(null,deps);
var chunk__7597_7608 = null;
var count__7598_7609 = (0);
var i__7599_7610 = (0);
while(true){
if((i__7599_7610 < count__7598_7609)){
var dep_7611 = cljs.core._nth.call(null,chunk__7597_7608,i__7599_7610);
topo_sort_helper_STAR_.call(null,dep_7611,(depth + (1)),state);

var G__7612 = seq__7596_7607;
var G__7613 = chunk__7597_7608;
var G__7614 = count__7598_7609;
var G__7615 = (i__7599_7610 + (1));
seq__7596_7607 = G__7612;
chunk__7597_7608 = G__7613;
count__7598_7609 = G__7614;
i__7599_7610 = G__7615;
continue;
} else {
var temp__4657__auto___7616 = cljs.core.seq.call(null,seq__7596_7607);
if(temp__4657__auto___7616){
var seq__7596_7617__$1 = temp__4657__auto___7616;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7596_7617__$1)){
var c__27200__auto___7618 = cljs.core.chunk_first.call(null,seq__7596_7617__$1);
var G__7619 = cljs.core.chunk_rest.call(null,seq__7596_7617__$1);
var G__7620 = c__27200__auto___7618;
var G__7621 = cljs.core.count.call(null,c__27200__auto___7618);
var G__7622 = (0);
seq__7596_7607 = G__7619;
chunk__7597_7608 = G__7620;
count__7598_7609 = G__7621;
i__7599_7610 = G__7622;
continue;
} else {
var dep_7623 = cljs.core.first.call(null,seq__7596_7617__$1);
topo_sort_helper_STAR_.call(null,dep_7623,(depth + (1)),state);

var G__7624 = cljs.core.next.call(null,seq__7596_7617__$1);
var G__7625 = null;
var G__7626 = (0);
var G__7627 = (0);
seq__7596_7607 = G__7624;
chunk__7597_7608 = G__7625;
count__7598_7609 = G__7626;
i__7599_7610 = G__7627;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,depth,(0))){
return elim_dups_STAR_.call(null,cljs.core.reverse.call(null,cljs.core.vals.call(null,cljs.core.deref.call(null,state))));
} else {
return null;
}
});
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_ = function(deps,depth,state){
switch(arguments.length){
case 1:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1.call(this,deps);
case 3:
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3.call(this,deps,depth,state);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___1;
figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_.cljs$core$IFn$_invoke$arity$3 = figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR___3;
return figwheel$client$file_reloading$build_topo_sort_$_topo_sort_STAR_;
})()
;})(get_deps__$1))
;
var elim_dups_STAR_ = ((function (get_deps__$1){
return (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__7600){
var vec__7604 = p__7600;
var seq__7605 = cljs.core.seq.call(null,vec__7604);
var first__7606 = cljs.core.first.call(null,seq__7605);
var seq__7605__$1 = cljs.core.next.call(null,seq__7605);
var x = first__7606;
var xs = seq__7605__$1;
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,((function (vec__7604,seq__7605,first__7606,seq__7605__$1,x,xs,get_deps__$1){
return (function (p1__7546_SHARP_){
return clojure.set.difference.call(null,p1__7546_SHARP_,x);
});})(vec__7604,seq__7605,first__7606,seq__7605__$1,x,xs,get_deps__$1))
,xs)));
}
});})(get_deps__$1))
;
return topo_sort_STAR_;
});
figwheel.client.file_reloading.get_all_dependencies = (function figwheel$client$file_reloading$get_all_dependencies(ns){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.get_requires);
return cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns], null))));
});
figwheel.client.file_reloading.get_all_dependents = (function figwheel$client$file_reloading$get_all_dependents(nss){
var topo_sort_SINGLEQUOTE_ = figwheel.client.file_reloading.build_topo_sort.call(null,figwheel.client.file_reloading.ns__GT_dependents);
return cljs.core.reverse.call(null,cljs.core.apply.call(null,cljs.core.concat,topo_sort_SINGLEQUOTE_.call(null,cljs.core.set.call(null,nss))));
});
figwheel.client.file_reloading.unprovide_BANG_ = (function figwheel$client$file_reloading$unprovide_BANG_(ns){
var path = figwheel.client.file_reloading.name__GT_path.call(null,ns);
goog.object.remove(goog.dependencies_.visited,path);

goog.object.remove(goog.dependencies_.written,path);

return goog.object.remove(goog.dependencies_.written,[cljs.core.str(goog.basePath),cljs.core.str(path)].join(''));
});
figwheel.client.file_reloading.resolve_ns = (function figwheel$client$file_reloading$resolve_ns(ns){
return [cljs.core.str(goog.basePath),cljs.core.str(figwheel.client.file_reloading.name__GT_path.call(null,ns))].join('');
});
figwheel.client.file_reloading.addDependency = (function figwheel$client$file_reloading$addDependency(path,provides,requires){
var seq__7640 = cljs.core.seq.call(null,provides);
var chunk__7641 = null;
var count__7642 = (0);
var i__7643 = (0);
while(true){
if((i__7643 < count__7642)){
var prov = cljs.core._nth.call(null,chunk__7641,i__7643);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__7644_7652 = cljs.core.seq.call(null,requires);
var chunk__7645_7653 = null;
var count__7646_7654 = (0);
var i__7647_7655 = (0);
while(true){
if((i__7647_7655 < count__7646_7654)){
var req_7656 = cljs.core._nth.call(null,chunk__7645_7653,i__7647_7655);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_7656,prov);

var G__7657 = seq__7644_7652;
var G__7658 = chunk__7645_7653;
var G__7659 = count__7646_7654;
var G__7660 = (i__7647_7655 + (1));
seq__7644_7652 = G__7657;
chunk__7645_7653 = G__7658;
count__7646_7654 = G__7659;
i__7647_7655 = G__7660;
continue;
} else {
var temp__4657__auto___7661 = cljs.core.seq.call(null,seq__7644_7652);
if(temp__4657__auto___7661){
var seq__7644_7662__$1 = temp__4657__auto___7661;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7644_7662__$1)){
var c__27200__auto___7663 = cljs.core.chunk_first.call(null,seq__7644_7662__$1);
var G__7664 = cljs.core.chunk_rest.call(null,seq__7644_7662__$1);
var G__7665 = c__27200__auto___7663;
var G__7666 = cljs.core.count.call(null,c__27200__auto___7663);
var G__7667 = (0);
seq__7644_7652 = G__7664;
chunk__7645_7653 = G__7665;
count__7646_7654 = G__7666;
i__7647_7655 = G__7667;
continue;
} else {
var req_7668 = cljs.core.first.call(null,seq__7644_7662__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_7668,prov);

var G__7669 = cljs.core.next.call(null,seq__7644_7662__$1);
var G__7670 = null;
var G__7671 = (0);
var G__7672 = (0);
seq__7644_7652 = G__7669;
chunk__7645_7653 = G__7670;
count__7646_7654 = G__7671;
i__7647_7655 = G__7672;
continue;
}
} else {
}
}
break;
}

var G__7673 = seq__7640;
var G__7674 = chunk__7641;
var G__7675 = count__7642;
var G__7676 = (i__7643 + (1));
seq__7640 = G__7673;
chunk__7641 = G__7674;
count__7642 = G__7675;
i__7643 = G__7676;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__7640);
if(temp__4657__auto__){
var seq__7640__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7640__$1)){
var c__27200__auto__ = cljs.core.chunk_first.call(null,seq__7640__$1);
var G__7677 = cljs.core.chunk_rest.call(null,seq__7640__$1);
var G__7678 = c__27200__auto__;
var G__7679 = cljs.core.count.call(null,c__27200__auto__);
var G__7680 = (0);
seq__7640 = G__7677;
chunk__7641 = G__7678;
count__7642 = G__7679;
i__7643 = G__7680;
continue;
} else {
var prov = cljs.core.first.call(null,seq__7640__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__7648_7681 = cljs.core.seq.call(null,requires);
var chunk__7649_7682 = null;
var count__7650_7683 = (0);
var i__7651_7684 = (0);
while(true){
if((i__7651_7684 < count__7650_7683)){
var req_7685 = cljs.core._nth.call(null,chunk__7649_7682,i__7651_7684);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_7685,prov);

var G__7686 = seq__7648_7681;
var G__7687 = chunk__7649_7682;
var G__7688 = count__7650_7683;
var G__7689 = (i__7651_7684 + (1));
seq__7648_7681 = G__7686;
chunk__7649_7682 = G__7687;
count__7650_7683 = G__7688;
i__7651_7684 = G__7689;
continue;
} else {
var temp__4657__auto___7690__$1 = cljs.core.seq.call(null,seq__7648_7681);
if(temp__4657__auto___7690__$1){
var seq__7648_7691__$1 = temp__4657__auto___7690__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7648_7691__$1)){
var c__27200__auto___7692 = cljs.core.chunk_first.call(null,seq__7648_7691__$1);
var G__7693 = cljs.core.chunk_rest.call(null,seq__7648_7691__$1);
var G__7694 = c__27200__auto___7692;
var G__7695 = cljs.core.count.call(null,c__27200__auto___7692);
var G__7696 = (0);
seq__7648_7681 = G__7693;
chunk__7649_7682 = G__7694;
count__7650_7683 = G__7695;
i__7651_7684 = G__7696;
continue;
} else {
var req_7697 = cljs.core.first.call(null,seq__7648_7691__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_7697,prov);

var G__7698 = cljs.core.next.call(null,seq__7648_7691__$1);
var G__7699 = null;
var G__7700 = (0);
var G__7701 = (0);
seq__7648_7681 = G__7698;
chunk__7649_7682 = G__7699;
count__7650_7683 = G__7700;
i__7651_7684 = G__7701;
continue;
}
} else {
}
}
break;
}

var G__7702 = cljs.core.next.call(null,seq__7640__$1);
var G__7703 = null;
var G__7704 = (0);
var G__7705 = (0);
seq__7640 = G__7702;
chunk__7641 = G__7703;
count__7642 = G__7704;
i__7643 = G__7705;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.file_reloading.figwheel_require = (function figwheel$client$file_reloading$figwheel_require(src,reload){
goog.require = figwheel$client$file_reloading$figwheel_require;

if(cljs.core._EQ_.call(null,reload,"reload-all")){
var seq__7710_7714 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__7711_7715 = null;
var count__7712_7716 = (0);
var i__7713_7717 = (0);
while(true){
if((i__7713_7717 < count__7712_7716)){
var ns_7718 = cljs.core._nth.call(null,chunk__7711_7715,i__7713_7717);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_7718);

var G__7719 = seq__7710_7714;
var G__7720 = chunk__7711_7715;
var G__7721 = count__7712_7716;
var G__7722 = (i__7713_7717 + (1));
seq__7710_7714 = G__7719;
chunk__7711_7715 = G__7720;
count__7712_7716 = G__7721;
i__7713_7717 = G__7722;
continue;
} else {
var temp__4657__auto___7723 = cljs.core.seq.call(null,seq__7710_7714);
if(temp__4657__auto___7723){
var seq__7710_7724__$1 = temp__4657__auto___7723;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7710_7724__$1)){
var c__27200__auto___7725 = cljs.core.chunk_first.call(null,seq__7710_7724__$1);
var G__7726 = cljs.core.chunk_rest.call(null,seq__7710_7724__$1);
var G__7727 = c__27200__auto___7725;
var G__7728 = cljs.core.count.call(null,c__27200__auto___7725);
var G__7729 = (0);
seq__7710_7714 = G__7726;
chunk__7711_7715 = G__7727;
count__7712_7716 = G__7728;
i__7713_7717 = G__7729;
continue;
} else {
var ns_7730 = cljs.core.first.call(null,seq__7710_7724__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_7730);

var G__7731 = cljs.core.next.call(null,seq__7710_7724__$1);
var G__7732 = null;
var G__7733 = (0);
var G__7734 = (0);
seq__7710_7714 = G__7731;
chunk__7711_7715 = G__7732;
count__7712_7716 = G__7733;
i__7713_7717 = G__7734;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(reload)){
figwheel.client.file_reloading.unprovide_BANG_.call(null,src);
} else {
}

return goog.require_figwheel_backup_(src);
});
/**
 * Reusable browser REPL bootstrapping. Patches the essential functions
 *   in goog.base to support re-loading of namespaces after page load.
 */
figwheel.client.file_reloading.bootstrap_goog_base = (function figwheel$client$file_reloading$bootstrap_goog_base(){
if(cljs.core.truth_(COMPILED)){
return null;
} else {
goog.require_figwheel_backup_ = (function (){var or__26817__auto__ = goog.require__;
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
return goog.require;
}
})();

goog.isProvided_ = (function (name){
return false;
});

figwheel.client.file_reloading.setup_path__GT_name_BANG_.call(null);

figwheel.client.file_reloading.setup_ns__GT_dependents_BANG_.call(null);

goog.addDependency_figwheel_backup_ = goog.addDependency;

goog.addDependency = (function() { 
var G__7735__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__7735 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__7736__i = 0, G__7736__a = new Array(arguments.length -  0);
while (G__7736__i < G__7736__a.length) {G__7736__a[G__7736__i] = arguments[G__7736__i + 0]; ++G__7736__i;}
  args = new cljs.core.IndexedSeq(G__7736__a,0);
} 
return G__7735__delegate.call(this,args);};
G__7735.cljs$lang$maxFixedArity = 0;
G__7735.cljs$lang$applyTo = (function (arglist__7737){
var args = cljs.core.seq(arglist__7737);
return G__7735__delegate(args);
});
G__7735.cljs$core$IFn$_invoke$arity$variadic = G__7735__delegate;
return G__7735;
})()
;

goog.constructNamespace_("cljs.user");

goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.queued_file_reload;

return goog.require = figwheel.client.file_reloading.figwheel_require;
}
});
figwheel.client.file_reloading.patch_goog_base = (function figwheel$client$file_reloading$patch_goog_base(){
if(typeof figwheel.client.file_reloading.bootstrapped_cljs !== 'undefined'){
return null;
} else {
figwheel.client.file_reloading.bootstrapped_cljs = (function (){
figwheel.client.file_reloading.bootstrap_goog_base.call(null);

return true;
})()
;
}
});
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__7739 = cljs.core._EQ_;
var expr__7740 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__7739.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__7740))){
var path_parts = ((function (pred__7739,expr__7740){
return (function (p1__7738_SHARP_){
return clojure.string.split.call(null,p1__7738_SHARP_,/[\/\\]/);
});})(pred__7739,expr__7740))
;
var sep = (cljs.core.truth_(cljs.core.re_matches.call(null,/win.*/,process.platform))?"\\":"/");
var root = clojure.string.join.call(null,sep,cljs.core.pop.call(null,cljs.core.pop.call(null,path_parts.call(null,__dirname))));
return ((function (path_parts,sep,root,pred__7739,expr__7740){
return (function (request_url,callback){

var cache_path = clojure.string.join.call(null,sep,cljs.core.cons.call(null,root,path_parts.call(null,figwheel.client.file_reloading.fix_node_request_url.call(null,request_url))));
(require.cache[cache_path] = null);

return callback.call(null,(function (){try{return require(cache_path);
}catch (e7742){if((e7742 instanceof Error)){
var e = e7742;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(cache_path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e7742;

}
}})());
});
;})(path_parts,sep,root,pred__7739,expr__7740))
} else {
if(cljs.core.truth_(pred__7739.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__7740))){
return ((function (pred__7739,expr__7740){
return (function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),{"cleanupWhenDone": true});
deferred.addCallback(((function (deferred,pred__7739,expr__7740){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred,pred__7739,expr__7740))
);

return deferred.addErrback(((function (deferred,pred__7739,expr__7740){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred,pred__7739,expr__7740))
);
});
;})(pred__7739,expr__7740))
} else {
return ((function (pred__7739,expr__7740){
return (function (a,b){
throw "Reload not defined for this platform";
});
;})(pred__7739,expr__7740))
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__7743,callback){
var map__7746 = p__7743;
var map__7746__$1 = ((((!((map__7746 == null)))?((((map__7746.cljs$lang$protocol_mask$partition0$ & (64))) || (map__7746.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__7746):map__7746);
var file_msg = map__7746__$1;
var request_url = cljs.core.get.call(null,map__7746__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Attempting to load "),cljs.core.str(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__7746,map__7746__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Successfully loaded "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__7746,map__7746__$1,file_msg,request_url))
);
});
if(typeof figwheel.client.file_reloading.reload_chan !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_chan = cljs.core.async.chan.call(null);
}
if(typeof figwheel.client.file_reloading.on_load_callbacks !== 'undefined'){
} else {
figwheel.client.file_reloading.on_load_callbacks = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
if(typeof figwheel.client.file_reloading.dependencies_loaded !== 'undefined'){
} else {
figwheel.client.file_reloading.dependencies_loaded = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
}
figwheel.client.file_reloading.blocking_load = (function figwheel$client$file_reloading$blocking_load(url){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.reload_file.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"request-url","request-url",2100346596),url], null),((function (out){
return (function (file_msg){
cljs.core.async.put_BANG_.call(null,out,file_msg);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
if(typeof figwheel.client.file_reloading.reloader_loop !== 'undefined'){
} else {
figwheel.client.file_reloading.reloader_loop = (function (){var c__7446__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7446__auto__){
return (function (){
var f__7447__auto__ = (function (){var switch__7425__auto__ = ((function (c__7446__auto__){
return (function (state_7770){
var state_val_7771 = (state_7770[(1)]);
if((state_val_7771 === (7))){
var inst_7766 = (state_7770[(2)]);
var state_7770__$1 = state_7770;
var statearr_7772_7792 = state_7770__$1;
(statearr_7772_7792[(2)] = inst_7766);

(statearr_7772_7792[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7771 === (1))){
var state_7770__$1 = state_7770;
var statearr_7773_7793 = state_7770__$1;
(statearr_7773_7793[(2)] = null);

(statearr_7773_7793[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7771 === (4))){
var inst_7750 = (state_7770[(7)]);
var inst_7750__$1 = (state_7770[(2)]);
var state_7770__$1 = (function (){var statearr_7774 = state_7770;
(statearr_7774[(7)] = inst_7750__$1);

return statearr_7774;
})();
if(cljs.core.truth_(inst_7750__$1)){
var statearr_7775_7794 = state_7770__$1;
(statearr_7775_7794[(1)] = (5));

} else {
var statearr_7776_7795 = state_7770__$1;
(statearr_7776_7795[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7771 === (6))){
var state_7770__$1 = state_7770;
var statearr_7777_7796 = state_7770__$1;
(statearr_7777_7796[(2)] = null);

(statearr_7777_7796[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7771 === (3))){
var inst_7768 = (state_7770[(2)]);
var state_7770__$1 = state_7770;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_7770__$1,inst_7768);
} else {
if((state_val_7771 === (2))){
var state_7770__$1 = state_7770;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_7770__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_7771 === (11))){
var inst_7762 = (state_7770[(2)]);
var state_7770__$1 = (function (){var statearr_7778 = state_7770;
(statearr_7778[(8)] = inst_7762);

return statearr_7778;
})();
var statearr_7779_7797 = state_7770__$1;
(statearr_7779_7797[(2)] = null);

(statearr_7779_7797[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7771 === (9))){
var inst_7756 = (state_7770[(9)]);
var inst_7754 = (state_7770[(10)]);
var inst_7758 = inst_7756.call(null,inst_7754);
var state_7770__$1 = state_7770;
var statearr_7780_7798 = state_7770__$1;
(statearr_7780_7798[(2)] = inst_7758);

(statearr_7780_7798[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7771 === (5))){
var inst_7750 = (state_7770[(7)]);
var inst_7752 = figwheel.client.file_reloading.blocking_load.call(null,inst_7750);
var state_7770__$1 = state_7770;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_7770__$1,(8),inst_7752);
} else {
if((state_val_7771 === (10))){
var inst_7754 = (state_7770[(10)]);
var inst_7760 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_7754);
var state_7770__$1 = state_7770;
var statearr_7781_7799 = state_7770__$1;
(statearr_7781_7799[(2)] = inst_7760);

(statearr_7781_7799[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7771 === (8))){
var inst_7756 = (state_7770[(9)]);
var inst_7750 = (state_7770[(7)]);
var inst_7754 = (state_7770[(2)]);
var inst_7755 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_7756__$1 = cljs.core.get.call(null,inst_7755,inst_7750);
var state_7770__$1 = (function (){var statearr_7782 = state_7770;
(statearr_7782[(9)] = inst_7756__$1);

(statearr_7782[(10)] = inst_7754);

return statearr_7782;
})();
if(cljs.core.truth_(inst_7756__$1)){
var statearr_7783_7800 = state_7770__$1;
(statearr_7783_7800[(1)] = (9));

} else {
var statearr_7784_7801 = state_7770__$1;
(statearr_7784_7801[(1)] = (10));

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
});})(c__7446__auto__))
;
return ((function (switch__7425__auto__,c__7446__auto__){
return (function() {
var figwheel$client$file_reloading$state_machine__7426__auto__ = null;
var figwheel$client$file_reloading$state_machine__7426__auto____0 = (function (){
var statearr_7788 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_7788[(0)] = figwheel$client$file_reloading$state_machine__7426__auto__);

(statearr_7788[(1)] = (1));

return statearr_7788;
});
var figwheel$client$file_reloading$state_machine__7426__auto____1 = (function (state_7770){
while(true){
var ret_value__7427__auto__ = (function (){try{while(true){
var result__7428__auto__ = switch__7425__auto__.call(null,state_7770);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7428__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7428__auto__;
}
break;
}
}catch (e7789){if((e7789 instanceof Object)){
var ex__7429__auto__ = e7789;
var statearr_7790_7802 = state_7770;
(statearr_7790_7802[(5)] = ex__7429__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_7770);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e7789;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7427__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__7803 = state_7770;
state_7770 = G__7803;
continue;
} else {
return ret_value__7427__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__7426__auto__ = function(state_7770){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__7426__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__7426__auto____1.call(this,state_7770);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__7426__auto____0;
figwheel$client$file_reloading$state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__7426__auto____1;
return figwheel$client$file_reloading$state_machine__7426__auto__;
})()
;})(switch__7425__auto__,c__7446__auto__))
})();
var state__7448__auto__ = (function (){var statearr_7791 = f__7447__auto__.call(null);
(statearr_7791[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7446__auto__);

return statearr_7791;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7448__auto__);
});})(c__7446__auto__))
);

return c__7446__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(url){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,url);
});
figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__7804,callback){
var map__7807 = p__7804;
var map__7807__$1 = ((((!((map__7807 == null)))?((((map__7807.cljs$lang$protocol_mask$partition0$ & (64))) || (map__7807.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__7807):map__7807);
var file_msg = map__7807__$1;
var namespace = cljs.core.get.call(null,map__7807__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,((function (request_url,map__7807,map__7807__$1,file_msg,namespace){
return (function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
});})(request_url,map__7807,map__7807__$1,file_msg,namespace))
);

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__7809){
var map__7812 = p__7809;
var map__7812__$1 = ((((!((map__7812 == null)))?((((map__7812.cljs$lang$protocol_mask$partition0$ & (64))) || (map__7812.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__7812):map__7812);
var file_msg = map__7812__$1;
var namespace = cljs.core.get.call(null,map__7812__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

var meta_pragmas = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
var and__26809__auto__ = cljs.core.not.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_pragmas));
if(and__26809__auto__){
var or__26817__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__26817__auto__)){
return or__26817__auto__;
} else {
var or__26817__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_pragmas);
if(cljs.core.truth_(or__26817__auto____$1)){
return or__26817__auto____$1;
} else {
return figwheel.client.file_reloading.provided_QMARK_.call(null,cljs.core.name.call(null,namespace));
}
}
} else {
return and__26809__auto__;
}
});
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__7814,callback){
var map__7817 = p__7814;
var map__7817__$1 = ((((!((map__7817 == null)))?((((map__7817.cljs$lang$protocol_mask$partition0$ & (64))) || (map__7817.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__7817):map__7817);
var file_msg = map__7817__$1;
var request_url = cljs.core.get.call(null,map__7817__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__7817__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

if(cljs.core.truth_(figwheel.client.file_reloading.reload_file_QMARK_.call(null,file_msg))){
return figwheel.client.file_reloading.require_with_callback.call(null,file_msg,callback);
} else {
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Figwheel: Not trying to load file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function figwheel$client$file_reloading$reload_js_file(file_msg){
var out = cljs.core.async.chan.call(null);
figwheel.client.file_reloading.js_reload.call(null,file_msg,((function (out){
return (function (url){
cljs.core.async.put_BANG_.call(null,out,url);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);

return out;
});
/**
 * Returns a chanel with one collection of loaded filenames on it.
 */
figwheel.client.file_reloading.load_all_js_files = (function figwheel$client$file_reloading$load_all_js_files(files){
var out = cljs.core.async.chan.call(null);
var c__7446__auto___7921 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7446__auto___7921,out){
return (function (){
var f__7447__auto__ = (function (){var switch__7425__auto__ = ((function (c__7446__auto___7921,out){
return (function (state_7903){
var state_val_7904 = (state_7903[(1)]);
if((state_val_7904 === (1))){
var inst_7877 = cljs.core.seq.call(null,files);
var inst_7878 = cljs.core.first.call(null,inst_7877);
var inst_7879 = cljs.core.next.call(null,inst_7877);
var inst_7880 = files;
var state_7903__$1 = (function (){var statearr_7905 = state_7903;
(statearr_7905[(7)] = inst_7880);

(statearr_7905[(8)] = inst_7878);

(statearr_7905[(9)] = inst_7879);

return statearr_7905;
})();
var statearr_7906_7922 = state_7903__$1;
(statearr_7906_7922[(2)] = null);

(statearr_7906_7922[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7904 === (2))){
var inst_7880 = (state_7903[(7)]);
var inst_7886 = (state_7903[(10)]);
var inst_7885 = cljs.core.seq.call(null,inst_7880);
var inst_7886__$1 = cljs.core.first.call(null,inst_7885);
var inst_7887 = cljs.core.next.call(null,inst_7885);
var inst_7888 = (inst_7886__$1 == null);
var inst_7889 = cljs.core.not.call(null,inst_7888);
var state_7903__$1 = (function (){var statearr_7907 = state_7903;
(statearr_7907[(11)] = inst_7887);

(statearr_7907[(10)] = inst_7886__$1);

return statearr_7907;
})();
if(inst_7889){
var statearr_7908_7923 = state_7903__$1;
(statearr_7908_7923[(1)] = (4));

} else {
var statearr_7909_7924 = state_7903__$1;
(statearr_7909_7924[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7904 === (3))){
var inst_7901 = (state_7903[(2)]);
var state_7903__$1 = state_7903;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_7903__$1,inst_7901);
} else {
if((state_val_7904 === (4))){
var inst_7886 = (state_7903[(10)]);
var inst_7891 = figwheel.client.file_reloading.reload_js_file.call(null,inst_7886);
var state_7903__$1 = state_7903;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_7903__$1,(7),inst_7891);
} else {
if((state_val_7904 === (5))){
var inst_7897 = cljs.core.async.close_BANG_.call(null,out);
var state_7903__$1 = state_7903;
var statearr_7910_7925 = state_7903__$1;
(statearr_7910_7925[(2)] = inst_7897);

(statearr_7910_7925[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7904 === (6))){
var inst_7899 = (state_7903[(2)]);
var state_7903__$1 = state_7903;
var statearr_7911_7926 = state_7903__$1;
(statearr_7911_7926[(2)] = inst_7899);

(statearr_7911_7926[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_7904 === (7))){
var inst_7887 = (state_7903[(11)]);
var inst_7893 = (state_7903[(2)]);
var inst_7894 = cljs.core.async.put_BANG_.call(null,out,inst_7893);
var inst_7880 = inst_7887;
var state_7903__$1 = (function (){var statearr_7912 = state_7903;
(statearr_7912[(7)] = inst_7880);

(statearr_7912[(12)] = inst_7894);

return statearr_7912;
})();
var statearr_7913_7927 = state_7903__$1;
(statearr_7913_7927[(2)] = null);

(statearr_7913_7927[(1)] = (2));


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
});})(c__7446__auto___7921,out))
;
return ((function (switch__7425__auto__,c__7446__auto___7921,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__7426__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__7426__auto____0 = (function (){
var statearr_7917 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_7917[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__7426__auto__);

(statearr_7917[(1)] = (1));

return statearr_7917;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__7426__auto____1 = (function (state_7903){
while(true){
var ret_value__7427__auto__ = (function (){try{while(true){
var result__7428__auto__ = switch__7425__auto__.call(null,state_7903);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7428__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7428__auto__;
}
break;
}
}catch (e7918){if((e7918 instanceof Object)){
var ex__7429__auto__ = e7918;
var statearr_7919_7928 = state_7903;
(statearr_7919_7928[(5)] = ex__7429__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_7903);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e7918;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7427__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__7929 = state_7903;
state_7903 = G__7929;
continue;
} else {
return ret_value__7427__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__7426__auto__ = function(state_7903){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__7426__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__7426__auto____1.call(this,state_7903);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__7426__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__7426__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__7426__auto__;
})()
;})(switch__7425__auto__,c__7446__auto___7921,out))
})();
var state__7448__auto__ = (function (){var statearr_7920 = f__7447__auto__.call(null);
(statearr_7920[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7446__auto___7921);

return statearr_7920;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7448__auto__);
});})(c__7446__auto___7921,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__7930,opts){
var map__7934 = p__7930;
var map__7934__$1 = ((((!((map__7934 == null)))?((((map__7934.cljs$lang$protocol_mask$partition0$ & (64))) || (map__7934.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__7934):map__7934);
var eval_body__$1 = cljs.core.get.call(null,map__7934__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__7934__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_((function (){var and__26809__auto__ = eval_body__$1;
if(cljs.core.truth_(and__26809__auto__)){
return typeof eval_body__$1 === 'string';
} else {
return and__26809__auto__;
}
})())){
var code = eval_body__$1;
try{figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Evaling file "),cljs.core.str(file)].join(''));

return figwheel.client.utils.eval_helper.call(null,code,opts);
}catch (e7936){var e = e7936;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Unable to evaluate "),cljs.core.str(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.expand_files = (function figwheel$client$file_reloading$expand_files(files){
var deps = figwheel.client.file_reloading.get_all_dependents.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,cljs.core.not,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["figwheel.connect",null], null), null),new cljs.core.Keyword(null,"namespace","namespace",-377510372)),cljs.core.map.call(null,((function (deps){
return (function (n){
var temp__4655__auto__ = cljs.core.first.call(null,cljs.core.filter.call(null,((function (deps){
return (function (p1__7937_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__7937_SHARP_),n);
});})(deps))
,files));
if(cljs.core.truth_(temp__4655__auto__)){
var file_msg = temp__4655__auto__;
return file_msg;
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372),new cljs.core.Keyword(null,"namespace","namespace",-377510372),n], null);
}
});})(deps))
,deps));
});
figwheel.client.file_reloading.sort_files = (function figwheel$client$file_reloading$sort_files(files){
if((cljs.core.count.call(null,files) <= (1))){
return files;
} else {
var keep_files = cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372),files));
return cljs.core.filter.call(null,cljs.core.comp.call(null,keep_files,new cljs.core.Keyword(null,"namespace","namespace",-377510372)),figwheel.client.file_reloading.expand_files.call(null,files));
}
});
figwheel.client.file_reloading.get_figwheel_always = (function figwheel$client$file_reloading$get_figwheel_always(){
return cljs.core.map.call(null,(function (p__7946){
var vec__7947 = p__7946;
var k = cljs.core.nth.call(null,vec__7947,(0),null);
var v = cljs.core.nth.call(null,vec__7947,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__7950){
var vec__7951 = p__7950;
var k = cljs.core.nth.call(null,vec__7951,(0),null);
var v = cljs.core.nth.call(null,vec__7951,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__7957,p__7958){
var map__8205 = p__7957;
var map__8205__$1 = ((((!((map__8205 == null)))?((((map__8205.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8205.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8205):map__8205);
var opts = map__8205__$1;
var before_jsload = cljs.core.get.call(null,map__8205__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__8205__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__8205__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__8206 = p__7958;
var map__8206__$1 = ((((!((map__8206 == null)))?((((map__8206.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8206.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8206):map__8206);
var msg = map__8206__$1;
var files = cljs.core.get.call(null,map__8206__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__8206__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__8206__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__7446__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
var f__7447__auto__ = (function (){var switch__7425__auto__ = ((function (c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (state_8359){
var state_val_8360 = (state_8359[(1)]);
if((state_val_8360 === (7))){
var inst_8221 = (state_8359[(7)]);
var inst_8223 = (state_8359[(8)]);
var inst_8222 = (state_8359[(9)]);
var inst_8220 = (state_8359[(10)]);
var inst_8228 = cljs.core._nth.call(null,inst_8221,inst_8223);
var inst_8229 = figwheel.client.file_reloading.eval_body.call(null,inst_8228,opts);
var inst_8230 = (inst_8223 + (1));
var tmp8361 = inst_8221;
var tmp8362 = inst_8222;
var tmp8363 = inst_8220;
var inst_8220__$1 = tmp8363;
var inst_8221__$1 = tmp8361;
var inst_8222__$1 = tmp8362;
var inst_8223__$1 = inst_8230;
var state_8359__$1 = (function (){var statearr_8364 = state_8359;
(statearr_8364[(11)] = inst_8229);

(statearr_8364[(7)] = inst_8221__$1);

(statearr_8364[(8)] = inst_8223__$1);

(statearr_8364[(9)] = inst_8222__$1);

(statearr_8364[(10)] = inst_8220__$1);

return statearr_8364;
})();
var statearr_8365_8451 = state_8359__$1;
(statearr_8365_8451[(2)] = null);

(statearr_8365_8451[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (20))){
var inst_8263 = (state_8359[(12)]);
var inst_8271 = figwheel.client.file_reloading.sort_files.call(null,inst_8263);
var state_8359__$1 = state_8359;
var statearr_8366_8452 = state_8359__$1;
(statearr_8366_8452[(2)] = inst_8271);

(statearr_8366_8452[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (27))){
var state_8359__$1 = state_8359;
var statearr_8367_8453 = state_8359__$1;
(statearr_8367_8453[(2)] = null);

(statearr_8367_8453[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (1))){
var inst_8212 = (state_8359[(13)]);
var inst_8209 = before_jsload.call(null,files);
var inst_8210 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_8211 = (function (){return ((function (inst_8212,inst_8209,inst_8210,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__7954_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__7954_SHARP_);
});
;})(inst_8212,inst_8209,inst_8210,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_8212__$1 = cljs.core.filter.call(null,inst_8211,files);
var inst_8213 = cljs.core.not_empty.call(null,inst_8212__$1);
var state_8359__$1 = (function (){var statearr_8368 = state_8359;
(statearr_8368[(14)] = inst_8209);

(statearr_8368[(15)] = inst_8210);

(statearr_8368[(13)] = inst_8212__$1);

return statearr_8368;
})();
if(cljs.core.truth_(inst_8213)){
var statearr_8369_8454 = state_8359__$1;
(statearr_8369_8454[(1)] = (2));

} else {
var statearr_8370_8455 = state_8359__$1;
(statearr_8370_8455[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (24))){
var state_8359__$1 = state_8359;
var statearr_8371_8456 = state_8359__$1;
(statearr_8371_8456[(2)] = null);

(statearr_8371_8456[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (39))){
var inst_8313 = (state_8359[(16)]);
var state_8359__$1 = state_8359;
var statearr_8372_8457 = state_8359__$1;
(statearr_8372_8457[(2)] = inst_8313);

(statearr_8372_8457[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (46))){
var inst_8354 = (state_8359[(2)]);
var state_8359__$1 = state_8359;
var statearr_8373_8458 = state_8359__$1;
(statearr_8373_8458[(2)] = inst_8354);

(statearr_8373_8458[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (4))){
var inst_8257 = (state_8359[(2)]);
var inst_8258 = cljs.core.List.EMPTY;
var inst_8259 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_8258);
var inst_8260 = (function (){return ((function (inst_8257,inst_8258,inst_8259,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__7955_SHARP_){
var and__26809__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__7955_SHARP_);
if(cljs.core.truth_(and__26809__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__7955_SHARP_));
} else {
return and__26809__auto__;
}
});
;})(inst_8257,inst_8258,inst_8259,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_8261 = cljs.core.filter.call(null,inst_8260,files);
var inst_8262 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_8263 = cljs.core.concat.call(null,inst_8261,inst_8262);
var state_8359__$1 = (function (){var statearr_8374 = state_8359;
(statearr_8374[(17)] = inst_8259);

(statearr_8374[(12)] = inst_8263);

(statearr_8374[(18)] = inst_8257);

return statearr_8374;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_8375_8459 = state_8359__$1;
(statearr_8375_8459[(1)] = (16));

} else {
var statearr_8376_8460 = state_8359__$1;
(statearr_8376_8460[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (15))){
var inst_8247 = (state_8359[(2)]);
var state_8359__$1 = state_8359;
var statearr_8377_8461 = state_8359__$1;
(statearr_8377_8461[(2)] = inst_8247);

(statearr_8377_8461[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (21))){
var inst_8273 = (state_8359[(19)]);
var inst_8273__$1 = (state_8359[(2)]);
var inst_8274 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_8273__$1);
var state_8359__$1 = (function (){var statearr_8378 = state_8359;
(statearr_8378[(19)] = inst_8273__$1);

return statearr_8378;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_8359__$1,(22),inst_8274);
} else {
if((state_val_8360 === (31))){
var inst_8357 = (state_8359[(2)]);
var state_8359__$1 = state_8359;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_8359__$1,inst_8357);
} else {
if((state_val_8360 === (32))){
var inst_8313 = (state_8359[(16)]);
var inst_8318 = inst_8313.cljs$lang$protocol_mask$partition0$;
var inst_8319 = (inst_8318 & (64));
var inst_8320 = inst_8313.cljs$core$ISeq$;
var inst_8321 = (inst_8319) || (inst_8320);
var state_8359__$1 = state_8359;
if(cljs.core.truth_(inst_8321)){
var statearr_8379_8462 = state_8359__$1;
(statearr_8379_8462[(1)] = (35));

} else {
var statearr_8380_8463 = state_8359__$1;
(statearr_8380_8463[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (40))){
var inst_8334 = (state_8359[(20)]);
var inst_8333 = (state_8359[(2)]);
var inst_8334__$1 = cljs.core.get.call(null,inst_8333,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_8335 = cljs.core.get.call(null,inst_8333,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_8336 = cljs.core.not_empty.call(null,inst_8334__$1);
var state_8359__$1 = (function (){var statearr_8381 = state_8359;
(statearr_8381[(21)] = inst_8335);

(statearr_8381[(20)] = inst_8334__$1);

return statearr_8381;
})();
if(cljs.core.truth_(inst_8336)){
var statearr_8382_8464 = state_8359__$1;
(statearr_8382_8464[(1)] = (41));

} else {
var statearr_8383_8465 = state_8359__$1;
(statearr_8383_8465[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (33))){
var state_8359__$1 = state_8359;
var statearr_8384_8466 = state_8359__$1;
(statearr_8384_8466[(2)] = false);

(statearr_8384_8466[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (13))){
var inst_8233 = (state_8359[(22)]);
var inst_8237 = cljs.core.chunk_first.call(null,inst_8233);
var inst_8238 = cljs.core.chunk_rest.call(null,inst_8233);
var inst_8239 = cljs.core.count.call(null,inst_8237);
var inst_8220 = inst_8238;
var inst_8221 = inst_8237;
var inst_8222 = inst_8239;
var inst_8223 = (0);
var state_8359__$1 = (function (){var statearr_8385 = state_8359;
(statearr_8385[(7)] = inst_8221);

(statearr_8385[(8)] = inst_8223);

(statearr_8385[(9)] = inst_8222);

(statearr_8385[(10)] = inst_8220);

return statearr_8385;
})();
var statearr_8386_8467 = state_8359__$1;
(statearr_8386_8467[(2)] = null);

(statearr_8386_8467[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (22))){
var inst_8273 = (state_8359[(19)]);
var inst_8277 = (state_8359[(23)]);
var inst_8276 = (state_8359[(24)]);
var inst_8281 = (state_8359[(25)]);
var inst_8276__$1 = (state_8359[(2)]);
var inst_8277__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_8276__$1);
var inst_8278 = (function (){var all_files = inst_8273;
var res_SINGLEQUOTE_ = inst_8276__$1;
var res = inst_8277__$1;
return ((function (all_files,res_SINGLEQUOTE_,res,inst_8273,inst_8277,inst_8276,inst_8281,inst_8276__$1,inst_8277__$1,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__7956_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__7956_SHARP_));
});
;})(all_files,res_SINGLEQUOTE_,res,inst_8273,inst_8277,inst_8276,inst_8281,inst_8276__$1,inst_8277__$1,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_8279 = cljs.core.filter.call(null,inst_8278,inst_8276__$1);
var inst_8280 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_8281__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_8280);
var inst_8282 = cljs.core.not_empty.call(null,inst_8281__$1);
var state_8359__$1 = (function (){var statearr_8387 = state_8359;
(statearr_8387[(23)] = inst_8277__$1);

(statearr_8387[(24)] = inst_8276__$1);

(statearr_8387[(25)] = inst_8281__$1);

(statearr_8387[(26)] = inst_8279);

return statearr_8387;
})();
if(cljs.core.truth_(inst_8282)){
var statearr_8388_8468 = state_8359__$1;
(statearr_8388_8468[(1)] = (23));

} else {
var statearr_8389_8469 = state_8359__$1;
(statearr_8389_8469[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (36))){
var state_8359__$1 = state_8359;
var statearr_8390_8470 = state_8359__$1;
(statearr_8390_8470[(2)] = false);

(statearr_8390_8470[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (41))){
var inst_8334 = (state_8359[(20)]);
var inst_8338 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_8339 = cljs.core.map.call(null,inst_8338,inst_8334);
var inst_8340 = cljs.core.pr_str.call(null,inst_8339);
var inst_8341 = [cljs.core.str("figwheel-no-load meta-data: "),cljs.core.str(inst_8340)].join('');
var inst_8342 = figwheel.client.utils.log.call(null,inst_8341);
var state_8359__$1 = state_8359;
var statearr_8391_8471 = state_8359__$1;
(statearr_8391_8471[(2)] = inst_8342);

(statearr_8391_8471[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (43))){
var inst_8335 = (state_8359[(21)]);
var inst_8345 = (state_8359[(2)]);
var inst_8346 = cljs.core.not_empty.call(null,inst_8335);
var state_8359__$1 = (function (){var statearr_8392 = state_8359;
(statearr_8392[(27)] = inst_8345);

return statearr_8392;
})();
if(cljs.core.truth_(inst_8346)){
var statearr_8393_8472 = state_8359__$1;
(statearr_8393_8472[(1)] = (44));

} else {
var statearr_8394_8473 = state_8359__$1;
(statearr_8394_8473[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (29))){
var inst_8273 = (state_8359[(19)]);
var inst_8277 = (state_8359[(23)]);
var inst_8276 = (state_8359[(24)]);
var inst_8281 = (state_8359[(25)]);
var inst_8313 = (state_8359[(16)]);
var inst_8279 = (state_8359[(26)]);
var inst_8309 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_8312 = (function (){var all_files = inst_8273;
var res_SINGLEQUOTE_ = inst_8276;
var res = inst_8277;
var files_not_loaded = inst_8279;
var dependencies_that_loaded = inst_8281;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_8273,inst_8277,inst_8276,inst_8281,inst_8313,inst_8279,inst_8309,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__8311){
var map__8395 = p__8311;
var map__8395__$1 = ((((!((map__8395 == null)))?((((map__8395.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8395.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8395):map__8395);
var namespace = cljs.core.get.call(null,map__8395__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_data = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas),cljs.core.name.call(null,namespace));
if((meta_data == null)){
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);
} else {
if(cljs.core.truth_(meta_data.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179)))){
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179);
} else {
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);

}
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_8273,inst_8277,inst_8276,inst_8281,inst_8313,inst_8279,inst_8309,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_8313__$1 = cljs.core.group_by.call(null,inst_8312,inst_8279);
var inst_8315 = (inst_8313__$1 == null);
var inst_8316 = cljs.core.not.call(null,inst_8315);
var state_8359__$1 = (function (){var statearr_8397 = state_8359;
(statearr_8397[(28)] = inst_8309);

(statearr_8397[(16)] = inst_8313__$1);

return statearr_8397;
})();
if(inst_8316){
var statearr_8398_8474 = state_8359__$1;
(statearr_8398_8474[(1)] = (32));

} else {
var statearr_8399_8475 = state_8359__$1;
(statearr_8399_8475[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (44))){
var inst_8335 = (state_8359[(21)]);
var inst_8348 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_8335);
var inst_8349 = cljs.core.pr_str.call(null,inst_8348);
var inst_8350 = [cljs.core.str("not required: "),cljs.core.str(inst_8349)].join('');
var inst_8351 = figwheel.client.utils.log.call(null,inst_8350);
var state_8359__$1 = state_8359;
var statearr_8400_8476 = state_8359__$1;
(statearr_8400_8476[(2)] = inst_8351);

(statearr_8400_8476[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (6))){
var inst_8254 = (state_8359[(2)]);
var state_8359__$1 = state_8359;
var statearr_8401_8477 = state_8359__$1;
(statearr_8401_8477[(2)] = inst_8254);

(statearr_8401_8477[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (28))){
var inst_8279 = (state_8359[(26)]);
var inst_8306 = (state_8359[(2)]);
var inst_8307 = cljs.core.not_empty.call(null,inst_8279);
var state_8359__$1 = (function (){var statearr_8402 = state_8359;
(statearr_8402[(29)] = inst_8306);

return statearr_8402;
})();
if(cljs.core.truth_(inst_8307)){
var statearr_8403_8478 = state_8359__$1;
(statearr_8403_8478[(1)] = (29));

} else {
var statearr_8404_8479 = state_8359__$1;
(statearr_8404_8479[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (25))){
var inst_8277 = (state_8359[(23)]);
var inst_8293 = (state_8359[(2)]);
var inst_8294 = cljs.core.not_empty.call(null,inst_8277);
var state_8359__$1 = (function (){var statearr_8405 = state_8359;
(statearr_8405[(30)] = inst_8293);

return statearr_8405;
})();
if(cljs.core.truth_(inst_8294)){
var statearr_8406_8480 = state_8359__$1;
(statearr_8406_8480[(1)] = (26));

} else {
var statearr_8407_8481 = state_8359__$1;
(statearr_8407_8481[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (34))){
var inst_8328 = (state_8359[(2)]);
var state_8359__$1 = state_8359;
if(cljs.core.truth_(inst_8328)){
var statearr_8408_8482 = state_8359__$1;
(statearr_8408_8482[(1)] = (38));

} else {
var statearr_8409_8483 = state_8359__$1;
(statearr_8409_8483[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (17))){
var state_8359__$1 = state_8359;
var statearr_8410_8484 = state_8359__$1;
(statearr_8410_8484[(2)] = recompile_dependents);

(statearr_8410_8484[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (3))){
var state_8359__$1 = state_8359;
var statearr_8411_8485 = state_8359__$1;
(statearr_8411_8485[(2)] = null);

(statearr_8411_8485[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (12))){
var inst_8250 = (state_8359[(2)]);
var state_8359__$1 = state_8359;
var statearr_8412_8486 = state_8359__$1;
(statearr_8412_8486[(2)] = inst_8250);

(statearr_8412_8486[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (2))){
var inst_8212 = (state_8359[(13)]);
var inst_8219 = cljs.core.seq.call(null,inst_8212);
var inst_8220 = inst_8219;
var inst_8221 = null;
var inst_8222 = (0);
var inst_8223 = (0);
var state_8359__$1 = (function (){var statearr_8413 = state_8359;
(statearr_8413[(7)] = inst_8221);

(statearr_8413[(8)] = inst_8223);

(statearr_8413[(9)] = inst_8222);

(statearr_8413[(10)] = inst_8220);

return statearr_8413;
})();
var statearr_8414_8487 = state_8359__$1;
(statearr_8414_8487[(2)] = null);

(statearr_8414_8487[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (23))){
var inst_8273 = (state_8359[(19)]);
var inst_8277 = (state_8359[(23)]);
var inst_8276 = (state_8359[(24)]);
var inst_8281 = (state_8359[(25)]);
var inst_8279 = (state_8359[(26)]);
var inst_8284 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_8286 = (function (){var all_files = inst_8273;
var res_SINGLEQUOTE_ = inst_8276;
var res = inst_8277;
var files_not_loaded = inst_8279;
var dependencies_that_loaded = inst_8281;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_8273,inst_8277,inst_8276,inst_8281,inst_8279,inst_8284,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__8285){
var map__8415 = p__8285;
var map__8415__$1 = ((((!((map__8415 == null)))?((((map__8415.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8415.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8415):map__8415);
var request_url = cljs.core.get.call(null,map__8415__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_8273,inst_8277,inst_8276,inst_8281,inst_8279,inst_8284,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_8287 = cljs.core.reverse.call(null,inst_8281);
var inst_8288 = cljs.core.map.call(null,inst_8286,inst_8287);
var inst_8289 = cljs.core.pr_str.call(null,inst_8288);
var inst_8290 = figwheel.client.utils.log.call(null,inst_8289);
var state_8359__$1 = (function (){var statearr_8417 = state_8359;
(statearr_8417[(31)] = inst_8284);

return statearr_8417;
})();
var statearr_8418_8488 = state_8359__$1;
(statearr_8418_8488[(2)] = inst_8290);

(statearr_8418_8488[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (35))){
var state_8359__$1 = state_8359;
var statearr_8419_8489 = state_8359__$1;
(statearr_8419_8489[(2)] = true);

(statearr_8419_8489[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (19))){
var inst_8263 = (state_8359[(12)]);
var inst_8269 = figwheel.client.file_reloading.expand_files.call(null,inst_8263);
var state_8359__$1 = state_8359;
var statearr_8420_8490 = state_8359__$1;
(statearr_8420_8490[(2)] = inst_8269);

(statearr_8420_8490[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (11))){
var state_8359__$1 = state_8359;
var statearr_8421_8491 = state_8359__$1;
(statearr_8421_8491[(2)] = null);

(statearr_8421_8491[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (9))){
var inst_8252 = (state_8359[(2)]);
var state_8359__$1 = state_8359;
var statearr_8422_8492 = state_8359__$1;
(statearr_8422_8492[(2)] = inst_8252);

(statearr_8422_8492[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (5))){
var inst_8223 = (state_8359[(8)]);
var inst_8222 = (state_8359[(9)]);
var inst_8225 = (inst_8223 < inst_8222);
var inst_8226 = inst_8225;
var state_8359__$1 = state_8359;
if(cljs.core.truth_(inst_8226)){
var statearr_8423_8493 = state_8359__$1;
(statearr_8423_8493[(1)] = (7));

} else {
var statearr_8424_8494 = state_8359__$1;
(statearr_8424_8494[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (14))){
var inst_8233 = (state_8359[(22)]);
var inst_8242 = cljs.core.first.call(null,inst_8233);
var inst_8243 = figwheel.client.file_reloading.eval_body.call(null,inst_8242,opts);
var inst_8244 = cljs.core.next.call(null,inst_8233);
var inst_8220 = inst_8244;
var inst_8221 = null;
var inst_8222 = (0);
var inst_8223 = (0);
var state_8359__$1 = (function (){var statearr_8425 = state_8359;
(statearr_8425[(7)] = inst_8221);

(statearr_8425[(8)] = inst_8223);

(statearr_8425[(9)] = inst_8222);

(statearr_8425[(32)] = inst_8243);

(statearr_8425[(10)] = inst_8220);

return statearr_8425;
})();
var statearr_8426_8495 = state_8359__$1;
(statearr_8426_8495[(2)] = null);

(statearr_8426_8495[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (45))){
var state_8359__$1 = state_8359;
var statearr_8427_8496 = state_8359__$1;
(statearr_8427_8496[(2)] = null);

(statearr_8427_8496[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (26))){
var inst_8273 = (state_8359[(19)]);
var inst_8277 = (state_8359[(23)]);
var inst_8276 = (state_8359[(24)]);
var inst_8281 = (state_8359[(25)]);
var inst_8279 = (state_8359[(26)]);
var inst_8296 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_8298 = (function (){var all_files = inst_8273;
var res_SINGLEQUOTE_ = inst_8276;
var res = inst_8277;
var files_not_loaded = inst_8279;
var dependencies_that_loaded = inst_8281;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_8273,inst_8277,inst_8276,inst_8281,inst_8279,inst_8296,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__8297){
var map__8428 = p__8297;
var map__8428__$1 = ((((!((map__8428 == null)))?((((map__8428.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8428.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8428):map__8428);
var namespace = cljs.core.get.call(null,map__8428__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__8428__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_8273,inst_8277,inst_8276,inst_8281,inst_8279,inst_8296,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_8299 = cljs.core.map.call(null,inst_8298,inst_8277);
var inst_8300 = cljs.core.pr_str.call(null,inst_8299);
var inst_8301 = figwheel.client.utils.log.call(null,inst_8300);
var inst_8302 = (function (){var all_files = inst_8273;
var res_SINGLEQUOTE_ = inst_8276;
var res = inst_8277;
var files_not_loaded = inst_8279;
var dependencies_that_loaded = inst_8281;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_8273,inst_8277,inst_8276,inst_8281,inst_8279,inst_8296,inst_8298,inst_8299,inst_8300,inst_8301,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_8273,inst_8277,inst_8276,inst_8281,inst_8279,inst_8296,inst_8298,inst_8299,inst_8300,inst_8301,state_val_8360,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_8303 = setTimeout(inst_8302,(10));
var state_8359__$1 = (function (){var statearr_8430 = state_8359;
(statearr_8430[(33)] = inst_8296);

(statearr_8430[(34)] = inst_8301);

return statearr_8430;
})();
var statearr_8431_8497 = state_8359__$1;
(statearr_8431_8497[(2)] = inst_8303);

(statearr_8431_8497[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (16))){
var state_8359__$1 = state_8359;
var statearr_8432_8498 = state_8359__$1;
(statearr_8432_8498[(2)] = reload_dependents);

(statearr_8432_8498[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (38))){
var inst_8313 = (state_8359[(16)]);
var inst_8330 = cljs.core.apply.call(null,cljs.core.hash_map,inst_8313);
var state_8359__$1 = state_8359;
var statearr_8433_8499 = state_8359__$1;
(statearr_8433_8499[(2)] = inst_8330);

(statearr_8433_8499[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (30))){
var state_8359__$1 = state_8359;
var statearr_8434_8500 = state_8359__$1;
(statearr_8434_8500[(2)] = null);

(statearr_8434_8500[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (10))){
var inst_8233 = (state_8359[(22)]);
var inst_8235 = cljs.core.chunked_seq_QMARK_.call(null,inst_8233);
var state_8359__$1 = state_8359;
if(inst_8235){
var statearr_8435_8501 = state_8359__$1;
(statearr_8435_8501[(1)] = (13));

} else {
var statearr_8436_8502 = state_8359__$1;
(statearr_8436_8502[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (18))){
var inst_8267 = (state_8359[(2)]);
var state_8359__$1 = state_8359;
if(cljs.core.truth_(inst_8267)){
var statearr_8437_8503 = state_8359__$1;
(statearr_8437_8503[(1)] = (19));

} else {
var statearr_8438_8504 = state_8359__$1;
(statearr_8438_8504[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (42))){
var state_8359__$1 = state_8359;
var statearr_8439_8505 = state_8359__$1;
(statearr_8439_8505[(2)] = null);

(statearr_8439_8505[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (37))){
var inst_8325 = (state_8359[(2)]);
var state_8359__$1 = state_8359;
var statearr_8440_8506 = state_8359__$1;
(statearr_8440_8506[(2)] = inst_8325);

(statearr_8440_8506[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_8360 === (8))){
var inst_8233 = (state_8359[(22)]);
var inst_8220 = (state_8359[(10)]);
var inst_8233__$1 = cljs.core.seq.call(null,inst_8220);
var state_8359__$1 = (function (){var statearr_8441 = state_8359;
(statearr_8441[(22)] = inst_8233__$1);

return statearr_8441;
})();
if(inst_8233__$1){
var statearr_8442_8507 = state_8359__$1;
(statearr_8442_8507[(1)] = (10));

} else {
var statearr_8443_8508 = state_8359__$1;
(statearr_8443_8508[(1)] = (11));

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
});})(c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents))
;
return ((function (switch__7425__auto__,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__7426__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__7426__auto____0 = (function (){
var statearr_8447 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_8447[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__7426__auto__);

(statearr_8447[(1)] = (1));

return statearr_8447;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__7426__auto____1 = (function (state_8359){
while(true){
var ret_value__7427__auto__ = (function (){try{while(true){
var result__7428__auto__ = switch__7425__auto__.call(null,state_8359);
if(cljs.core.keyword_identical_QMARK_.call(null,result__7428__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__7428__auto__;
}
break;
}
}catch (e8448){if((e8448 instanceof Object)){
var ex__7429__auto__ = e8448;
var statearr_8449_8509 = state_8359;
(statearr_8449_8509[(5)] = ex__7429__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_8359);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e8448;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__7427__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__8510 = state_8359;
state_8359 = G__8510;
continue;
} else {
return ret_value__7427__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__7426__auto__ = function(state_8359){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__7426__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__7426__auto____1.call(this,state_8359);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__7426__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__7426__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__7426__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__7426__auto__;
})()
;})(switch__7425__auto__,c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var state__7448__auto__ = (function (){var statearr_8450 = f__7447__auto__.call(null);
(statearr_8450[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__7446__auto__);

return statearr_8450;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__7448__auto__);
});})(c__7446__auto__,map__8205,map__8205__$1,opts,before_jsload,on_jsload,reload_dependents,map__8206,map__8206__$1,msg,files,figwheel_meta,recompile_dependents))
);

return c__7446__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str(location.protocol),cljs.core.str("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__8513,link){
var map__8516 = p__8513;
var map__8516__$1 = ((((!((map__8516 == null)))?((((map__8516.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8516.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8516):map__8516);
var file = cljs.core.get.call(null,map__8516__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4657__auto__ = link.href;
if(cljs.core.truth_(temp__4657__auto__)){
var link_href = temp__4657__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4657__auto__,map__8516,map__8516__$1,file){
return (function (p1__8511_SHARP_,p2__8512_SHARP_){
if(cljs.core._EQ_.call(null,p1__8511_SHARP_,p2__8512_SHARP_)){
return p1__8511_SHARP_;
} else {
return false;
}
});})(link_href,temp__4657__auto__,map__8516,map__8516__$1,file))
,cljs.core.reverse.call(null,clojure.string.split.call(null,file,"/")),cljs.core.reverse.call(null,clojure.string.split.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href),"/")))));
var match_length = cljs.core.count.call(null,match);
var file_name_length = cljs.core.count.call(null,cljs.core.last.call(null,clojure.string.split.call(null,file,"/")));
if((match_length >= file_name_length)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"link","link",-1769163468),link,new cljs.core.Keyword(null,"link-href","link-href",-250644450),link_href,new cljs.core.Keyword(null,"match-length","match-length",1101537310),match_length,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083),cljs.core.count.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href))], null);
} else {
return null;
}
} else {
return null;
}
});
figwheel.client.file_reloading.get_correct_link = (function figwheel$client$file_reloading$get_correct_link(f_data){
var temp__4657__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__8522){
var map__8523 = p__8522;
var map__8523__$1 = ((((!((map__8523 == null)))?((((map__8523.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8523.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8523):map__8523);
var match_length = cljs.core.get.call(null,map__8523__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__8523__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__8518_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__8518_SHARP_);
}),figwheel.client.file_reloading.current_links.call(null))));
if(cljs.core.truth_(temp__4657__auto__)){
var res = temp__4657__auto__;
return new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(res);
} else {
return null;
}
});
figwheel.client.file_reloading.clone_link = (function figwheel$client$file_reloading$clone_link(link,url){
var clone = document.createElement("link");
clone.rel = "stylesheet";

clone.media = link.media;

clone.disabled = link.disabled;

clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return clone;
});
figwheel.client.file_reloading.create_link = (function figwheel$client$file_reloading$create_link(url){
var link = document.createElement("link");
link.rel = "stylesheet";

link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return link;
});
figwheel.client.file_reloading.add_link_to_doc = (function figwheel$client$file_reloading$add_link_to_doc(var_args){
var args8525 = [];
var len__27348__auto___8528 = arguments.length;
var i__27349__auto___8529 = (0);
while(true){
if((i__27349__auto___8529 < len__27348__auto___8528)){
args8525.push((arguments[i__27349__auto___8529]));

var G__8530 = (i__27349__auto___8529 + (1));
i__27349__auto___8529 = G__8530;
continue;
} else {
}
break;
}

var G__8527 = args8525.length;
switch (G__8527) {
case 1:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args8525.length)].join('')));

}
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1 = (function (new_link){
return (document.getElementsByTagName("head")[(0)]).appendChild(new_link);
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2 = (function (orig_link,klone){
var parent = orig_link.parentNode;
if(cljs.core._EQ_.call(null,orig_link,parent.lastChild)){
parent.appendChild(klone);
} else {
parent.insertBefore(klone,orig_link.nextSibling);
}

return setTimeout(((function (parent){
return (function (){
return parent.removeChild(orig_link);
});})(parent))
,(300));
});

figwheel.client.file_reloading.add_link_to_doc.cljs$lang$maxFixedArity = 2;

figwheel.client.file_reloading.distictify = (function figwheel$client$file_reloading$distictify(key,seqq){
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__8532_SHARP_,p2__8533_SHARP_){
return cljs.core.assoc.call(null,p1__8532_SHARP_,cljs.core.get.call(null,p2__8533_SHARP_,key),p2__8533_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(p__8534){
var map__8537 = p__8534;
var map__8537__$1 = ((((!((map__8537 == null)))?((((map__8537.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8537.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8537):map__8537);
var f_data = map__8537__$1;
var file = cljs.core.get.call(null,map__8537__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4657__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4657__auto__)){
var link = temp__4657__auto__;
return figwheel.client.file_reloading.add_link_to_doc.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href));
} else {
return null;
}
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__8539,files_msg){
var map__8546 = p__8539;
var map__8546__$1 = ((((!((map__8546 == null)))?((((map__8546.cljs$lang$protocol_mask$partition0$ & (64))) || (map__8546.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8546):map__8546);
var opts = map__8546__$1;
var on_cssload = cljs.core.get.call(null,map__8546__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var seq__8548_8552 = cljs.core.seq.call(null,figwheel.client.file_reloading.distictify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg)));
var chunk__8549_8553 = null;
var count__8550_8554 = (0);
var i__8551_8555 = (0);
while(true){
if((i__8551_8555 < count__8550_8554)){
var f_8556 = cljs.core._nth.call(null,chunk__8549_8553,i__8551_8555);
figwheel.client.file_reloading.reload_css_file.call(null,f_8556);

var G__8557 = seq__8548_8552;
var G__8558 = chunk__8549_8553;
var G__8559 = count__8550_8554;
var G__8560 = (i__8551_8555 + (1));
seq__8548_8552 = G__8557;
chunk__8549_8553 = G__8558;
count__8550_8554 = G__8559;
i__8551_8555 = G__8560;
continue;
} else {
var temp__4657__auto___8561 = cljs.core.seq.call(null,seq__8548_8552);
if(temp__4657__auto___8561){
var seq__8548_8562__$1 = temp__4657__auto___8561;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__8548_8562__$1)){
var c__27200__auto___8563 = cljs.core.chunk_first.call(null,seq__8548_8562__$1);
var G__8564 = cljs.core.chunk_rest.call(null,seq__8548_8562__$1);
var G__8565 = c__27200__auto___8563;
var G__8566 = cljs.core.count.call(null,c__27200__auto___8563);
var G__8567 = (0);
seq__8548_8552 = G__8564;
chunk__8549_8553 = G__8565;
count__8550_8554 = G__8566;
i__8551_8555 = G__8567;
continue;
} else {
var f_8568 = cljs.core.first.call(null,seq__8548_8562__$1);
figwheel.client.file_reloading.reload_css_file.call(null,f_8568);

var G__8569 = cljs.core.next.call(null,seq__8548_8562__$1);
var G__8570 = null;
var G__8571 = (0);
var G__8572 = (0);
seq__8548_8552 = G__8569;
chunk__8549_8553 = G__8570;
count__8550_8554 = G__8571;
i__8551_8555 = G__8572;
continue;
}
} else {
}
}
break;
}

return setTimeout(((function (map__8546,map__8546__$1,opts,on_cssload){
return (function (){
return on_cssload.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg));
});})(map__8546,map__8546__$1,opts,on_cssload))
,(100));
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map?rel=1468751000937