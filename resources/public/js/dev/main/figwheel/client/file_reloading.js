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
return cljs.core.set.call(null,cljs.core.filter.call(null,(function (p1__16315_SHARP_){
return cljs.core.not.call(null,figwheel.client.file_reloading.immutable_ns_QMARK_.call(null,p1__16315_SHARP_));
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
var seq__16320 = cljs.core.seq.call(null,figwheel.client.file_reloading.path__GT_name.call(null,k));
var chunk__16321 = null;
var count__16322 = (0);
var i__16323 = (0);
while(true){
if((i__16323 < count__16322)){
var n = cljs.core._nth.call(null,chunk__16321,i__16323);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__16324 = seq__16320;
var G__16325 = chunk__16321;
var G__16326 = count__16322;
var G__16327 = (i__16323 + (1));
seq__16320 = G__16324;
chunk__16321 = G__16325;
count__16322 = G__16326;
i__16323 = G__16327;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16320);
if(temp__4657__auto__){
var seq__16320__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16320__$1)){
var c__27200__auto__ = cljs.core.chunk_first.call(null,seq__16320__$1);
var G__16328 = cljs.core.chunk_rest.call(null,seq__16320__$1);
var G__16329 = c__27200__auto__;
var G__16330 = cljs.core.count.call(null,c__27200__auto__);
var G__16331 = (0);
seq__16320 = G__16328;
chunk__16321 = G__16329;
count__16322 = G__16330;
i__16323 = G__16331;
continue;
} else {
var n = cljs.core.first.call(null,seq__16320__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,k_SINGLEQUOTE_,n);

var G__16332 = cljs.core.next.call(null,seq__16320__$1);
var G__16333 = null;
var G__16334 = (0);
var G__16335 = (0);
seq__16320 = G__16332;
chunk__16321 = G__16333;
count__16322 = G__16334;
i__16323 = G__16335;
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

var seq__16386_16397 = cljs.core.seq.call(null,deps);
var chunk__16387_16398 = null;
var count__16388_16399 = (0);
var i__16389_16400 = (0);
while(true){
if((i__16389_16400 < count__16388_16399)){
var dep_16401 = cljs.core._nth.call(null,chunk__16387_16398,i__16389_16400);
topo_sort_helper_STAR_.call(null,dep_16401,(depth + (1)),state);

var G__16402 = seq__16386_16397;
var G__16403 = chunk__16387_16398;
var G__16404 = count__16388_16399;
var G__16405 = (i__16389_16400 + (1));
seq__16386_16397 = G__16402;
chunk__16387_16398 = G__16403;
count__16388_16399 = G__16404;
i__16389_16400 = G__16405;
continue;
} else {
var temp__4657__auto___16406 = cljs.core.seq.call(null,seq__16386_16397);
if(temp__4657__auto___16406){
var seq__16386_16407__$1 = temp__4657__auto___16406;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16386_16407__$1)){
var c__27200__auto___16408 = cljs.core.chunk_first.call(null,seq__16386_16407__$1);
var G__16409 = cljs.core.chunk_rest.call(null,seq__16386_16407__$1);
var G__16410 = c__27200__auto___16408;
var G__16411 = cljs.core.count.call(null,c__27200__auto___16408);
var G__16412 = (0);
seq__16386_16397 = G__16409;
chunk__16387_16398 = G__16410;
count__16388_16399 = G__16411;
i__16389_16400 = G__16412;
continue;
} else {
var dep_16413 = cljs.core.first.call(null,seq__16386_16407__$1);
topo_sort_helper_STAR_.call(null,dep_16413,(depth + (1)),state);

var G__16414 = cljs.core.next.call(null,seq__16386_16407__$1);
var G__16415 = null;
var G__16416 = (0);
var G__16417 = (0);
seq__16386_16397 = G__16414;
chunk__16387_16398 = G__16415;
count__16388_16399 = G__16416;
i__16389_16400 = G__16417;
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
return (function figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_(p__16390){
var vec__16394 = p__16390;
var seq__16395 = cljs.core.seq.call(null,vec__16394);
var first__16396 = cljs.core.first.call(null,seq__16395);
var seq__16395__$1 = cljs.core.next.call(null,seq__16395);
var x = first__16396;
var xs = seq__16395__$1;
if((x == null)){
return cljs.core.List.EMPTY;
} else {
return cljs.core.cons.call(null,x,figwheel$client$file_reloading$build_topo_sort_$_elim_dups_STAR_.call(null,cljs.core.map.call(null,((function (vec__16394,seq__16395,first__16396,seq__16395__$1,x,xs,get_deps__$1){
return (function (p1__16336_SHARP_){
return clojure.set.difference.call(null,p1__16336_SHARP_,x);
});})(vec__16394,seq__16395,first__16396,seq__16395__$1,x,xs,get_deps__$1))
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
var seq__16430 = cljs.core.seq.call(null,provides);
var chunk__16431 = null;
var count__16432 = (0);
var i__16433 = (0);
while(true){
if((i__16433 < count__16432)){
var prov = cljs.core._nth.call(null,chunk__16431,i__16433);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__16434_16442 = cljs.core.seq.call(null,requires);
var chunk__16435_16443 = null;
var count__16436_16444 = (0);
var i__16437_16445 = (0);
while(true){
if((i__16437_16445 < count__16436_16444)){
var req_16446 = cljs.core._nth.call(null,chunk__16435_16443,i__16437_16445);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_16446,prov);

var G__16447 = seq__16434_16442;
var G__16448 = chunk__16435_16443;
var G__16449 = count__16436_16444;
var G__16450 = (i__16437_16445 + (1));
seq__16434_16442 = G__16447;
chunk__16435_16443 = G__16448;
count__16436_16444 = G__16449;
i__16437_16445 = G__16450;
continue;
} else {
var temp__4657__auto___16451 = cljs.core.seq.call(null,seq__16434_16442);
if(temp__4657__auto___16451){
var seq__16434_16452__$1 = temp__4657__auto___16451;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16434_16452__$1)){
var c__27200__auto___16453 = cljs.core.chunk_first.call(null,seq__16434_16452__$1);
var G__16454 = cljs.core.chunk_rest.call(null,seq__16434_16452__$1);
var G__16455 = c__27200__auto___16453;
var G__16456 = cljs.core.count.call(null,c__27200__auto___16453);
var G__16457 = (0);
seq__16434_16442 = G__16454;
chunk__16435_16443 = G__16455;
count__16436_16444 = G__16456;
i__16437_16445 = G__16457;
continue;
} else {
var req_16458 = cljs.core.first.call(null,seq__16434_16452__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_16458,prov);

var G__16459 = cljs.core.next.call(null,seq__16434_16452__$1);
var G__16460 = null;
var G__16461 = (0);
var G__16462 = (0);
seq__16434_16442 = G__16459;
chunk__16435_16443 = G__16460;
count__16436_16444 = G__16461;
i__16437_16445 = G__16462;
continue;
}
} else {
}
}
break;
}

var G__16463 = seq__16430;
var G__16464 = chunk__16431;
var G__16465 = count__16432;
var G__16466 = (i__16433 + (1));
seq__16430 = G__16463;
chunk__16431 = G__16464;
count__16432 = G__16465;
i__16433 = G__16466;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__16430);
if(temp__4657__auto__){
var seq__16430__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16430__$1)){
var c__27200__auto__ = cljs.core.chunk_first.call(null,seq__16430__$1);
var G__16467 = cljs.core.chunk_rest.call(null,seq__16430__$1);
var G__16468 = c__27200__auto__;
var G__16469 = cljs.core.count.call(null,c__27200__auto__);
var G__16470 = (0);
seq__16430 = G__16467;
chunk__16431 = G__16468;
count__16432 = G__16469;
i__16433 = G__16470;
continue;
} else {
var prov = cljs.core.first.call(null,seq__16430__$1);
figwheel.client.file_reloading.path_to_name_BANG_.call(null,path,prov);

var seq__16438_16471 = cljs.core.seq.call(null,requires);
var chunk__16439_16472 = null;
var count__16440_16473 = (0);
var i__16441_16474 = (0);
while(true){
if((i__16441_16474 < count__16440_16473)){
var req_16475 = cljs.core._nth.call(null,chunk__16439_16472,i__16441_16474);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_16475,prov);

var G__16476 = seq__16438_16471;
var G__16477 = chunk__16439_16472;
var G__16478 = count__16440_16473;
var G__16479 = (i__16441_16474 + (1));
seq__16438_16471 = G__16476;
chunk__16439_16472 = G__16477;
count__16440_16473 = G__16478;
i__16441_16474 = G__16479;
continue;
} else {
var temp__4657__auto___16480__$1 = cljs.core.seq.call(null,seq__16438_16471);
if(temp__4657__auto___16480__$1){
var seq__16438_16481__$1 = temp__4657__auto___16480__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16438_16481__$1)){
var c__27200__auto___16482 = cljs.core.chunk_first.call(null,seq__16438_16481__$1);
var G__16483 = cljs.core.chunk_rest.call(null,seq__16438_16481__$1);
var G__16484 = c__27200__auto___16482;
var G__16485 = cljs.core.count.call(null,c__27200__auto___16482);
var G__16486 = (0);
seq__16438_16471 = G__16483;
chunk__16439_16472 = G__16484;
count__16440_16473 = G__16485;
i__16441_16474 = G__16486;
continue;
} else {
var req_16487 = cljs.core.first.call(null,seq__16438_16481__$1);
figwheel.client.file_reloading.name_to_parent_BANG_.call(null,req_16487,prov);

var G__16488 = cljs.core.next.call(null,seq__16438_16481__$1);
var G__16489 = null;
var G__16490 = (0);
var G__16491 = (0);
seq__16438_16471 = G__16488;
chunk__16439_16472 = G__16489;
count__16440_16473 = G__16490;
i__16441_16474 = G__16491;
continue;
}
} else {
}
}
break;
}

var G__16492 = cljs.core.next.call(null,seq__16430__$1);
var G__16493 = null;
var G__16494 = (0);
var G__16495 = (0);
seq__16430 = G__16492;
chunk__16431 = G__16493;
count__16432 = G__16494;
i__16433 = G__16495;
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
var seq__16500_16504 = cljs.core.seq.call(null,figwheel.client.file_reloading.get_all_dependencies.call(null,src));
var chunk__16501_16505 = null;
var count__16502_16506 = (0);
var i__16503_16507 = (0);
while(true){
if((i__16503_16507 < count__16502_16506)){
var ns_16508 = cljs.core._nth.call(null,chunk__16501_16505,i__16503_16507);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_16508);

var G__16509 = seq__16500_16504;
var G__16510 = chunk__16501_16505;
var G__16511 = count__16502_16506;
var G__16512 = (i__16503_16507 + (1));
seq__16500_16504 = G__16509;
chunk__16501_16505 = G__16510;
count__16502_16506 = G__16511;
i__16503_16507 = G__16512;
continue;
} else {
var temp__4657__auto___16513 = cljs.core.seq.call(null,seq__16500_16504);
if(temp__4657__auto___16513){
var seq__16500_16514__$1 = temp__4657__auto___16513;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__16500_16514__$1)){
var c__27200__auto___16515 = cljs.core.chunk_first.call(null,seq__16500_16514__$1);
var G__16516 = cljs.core.chunk_rest.call(null,seq__16500_16514__$1);
var G__16517 = c__27200__auto___16515;
var G__16518 = cljs.core.count.call(null,c__27200__auto___16515);
var G__16519 = (0);
seq__16500_16504 = G__16516;
chunk__16501_16505 = G__16517;
count__16502_16506 = G__16518;
i__16503_16507 = G__16519;
continue;
} else {
var ns_16520 = cljs.core.first.call(null,seq__16500_16514__$1);
figwheel.client.file_reloading.unprovide_BANG_.call(null,ns_16520);

var G__16521 = cljs.core.next.call(null,seq__16500_16514__$1);
var G__16522 = null;
var G__16523 = (0);
var G__16524 = (0);
seq__16500_16504 = G__16521;
chunk__16501_16505 = G__16522;
count__16502_16506 = G__16523;
i__16503_16507 = G__16524;
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
var G__16525__delegate = function (args){
cljs.core.apply.call(null,figwheel.client.file_reloading.addDependency,args);

return cljs.core.apply.call(null,goog.addDependency_figwheel_backup_,args);
};
var G__16525 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__16526__i = 0, G__16526__a = new Array(arguments.length -  0);
while (G__16526__i < G__16526__a.length) {G__16526__a[G__16526__i] = arguments[G__16526__i + 0]; ++G__16526__i;}
  args = new cljs.core.IndexedSeq(G__16526__a,0);
} 
return G__16525__delegate.call(this,args);};
G__16525.cljs$lang$maxFixedArity = 0;
G__16525.cljs$lang$applyTo = (function (arglist__16527){
var args = cljs.core.seq(arglist__16527);
return G__16525__delegate(args);
});
G__16525.cljs$core$IFn$_invoke$arity$variadic = G__16525__delegate;
return G__16525;
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
figwheel.client.file_reloading.reload_file_STAR_ = (function (){var pred__16529 = cljs.core._EQ_;
var expr__16530 = figwheel.client.utils.host_env_QMARK_.call(null);
if(cljs.core.truth_(pred__16529.call(null,new cljs.core.Keyword(null,"node","node",581201198),expr__16530))){
var path_parts = ((function (pred__16529,expr__16530){
return (function (p1__16528_SHARP_){
return clojure.string.split.call(null,p1__16528_SHARP_,/[\/\\]/);
});})(pred__16529,expr__16530))
;
var sep = (cljs.core.truth_(cljs.core.re_matches.call(null,/win.*/,process.platform))?"\\":"/");
var root = clojure.string.join.call(null,sep,cljs.core.pop.call(null,cljs.core.pop.call(null,path_parts.call(null,__dirname))));
return ((function (path_parts,sep,root,pred__16529,expr__16530){
return (function (request_url,callback){

var cache_path = clojure.string.join.call(null,sep,cljs.core.cons.call(null,root,path_parts.call(null,figwheel.client.file_reloading.fix_node_request_url.call(null,request_url))));
(require.cache[cache_path] = null);

return callback.call(null,(function (){try{return require(cache_path);
}catch (e16532){if((e16532 instanceof Error)){
var e = e16532;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(cache_path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e16532;

}
}})());
});
;})(path_parts,sep,root,pred__16529,expr__16530))
} else {
if(cljs.core.truth_(pred__16529.call(null,new cljs.core.Keyword(null,"html","html",-998796897),expr__16530))){
return ((function (pred__16529,expr__16530){
return (function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),{"cleanupWhenDone": true});
deferred.addCallback(((function (deferred,pred__16529,expr__16530){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred,pred__16529,expr__16530))
);

return deferred.addErrback(((function (deferred,pred__16529,expr__16530){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred,pred__16529,expr__16530))
);
});
;})(pred__16529,expr__16530))
} else {
return ((function (pred__16529,expr__16530){
return (function (a,b){
throw "Reload not defined for this platform";
});
;})(pred__16529,expr__16530))
}
}
})();
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__16533,callback){
var map__16536 = p__16533;
var map__16536__$1 = ((((!((map__16536 == null)))?((((map__16536.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16536.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16536):map__16536);
var file_msg = map__16536__$1;
var request_url = cljs.core.get.call(null,map__16536__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Attempting to load "),cljs.core.str(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__16536,map__16536__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Successfully loaded "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__16536,map__16536__$1,file_msg,request_url))
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
figwheel.client.file_reloading.reloader_loop = (function (){var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__){
return (function (state_16560){
var state_val_16561 = (state_16560[(1)]);
if((state_val_16561 === (7))){
var inst_16556 = (state_16560[(2)]);
var state_16560__$1 = state_16560;
var statearr_16562_16582 = state_16560__$1;
(statearr_16562_16582[(2)] = inst_16556);

(statearr_16562_16582[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16561 === (1))){
var state_16560__$1 = state_16560;
var statearr_16563_16583 = state_16560__$1;
(statearr_16563_16583[(2)] = null);

(statearr_16563_16583[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16561 === (4))){
var inst_16540 = (state_16560[(7)]);
var inst_16540__$1 = (state_16560[(2)]);
var state_16560__$1 = (function (){var statearr_16564 = state_16560;
(statearr_16564[(7)] = inst_16540__$1);

return statearr_16564;
})();
if(cljs.core.truth_(inst_16540__$1)){
var statearr_16565_16584 = state_16560__$1;
(statearr_16565_16584[(1)] = (5));

} else {
var statearr_16566_16585 = state_16560__$1;
(statearr_16566_16585[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16561 === (6))){
var state_16560__$1 = state_16560;
var statearr_16567_16586 = state_16560__$1;
(statearr_16567_16586[(2)] = null);

(statearr_16567_16586[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16561 === (3))){
var inst_16558 = (state_16560[(2)]);
var state_16560__$1 = state_16560;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16560__$1,inst_16558);
} else {
if((state_val_16561 === (2))){
var state_16560__$1 = state_16560;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16560__$1,(4),figwheel.client.file_reloading.reload_chan);
} else {
if((state_val_16561 === (11))){
var inst_16552 = (state_16560[(2)]);
var state_16560__$1 = (function (){var statearr_16568 = state_16560;
(statearr_16568[(8)] = inst_16552);

return statearr_16568;
})();
var statearr_16569_16587 = state_16560__$1;
(statearr_16569_16587[(2)] = null);

(statearr_16569_16587[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16561 === (9))){
var inst_16544 = (state_16560[(9)]);
var inst_16546 = (state_16560[(10)]);
var inst_16548 = inst_16546.call(null,inst_16544);
var state_16560__$1 = state_16560;
var statearr_16570_16588 = state_16560__$1;
(statearr_16570_16588[(2)] = inst_16548);

(statearr_16570_16588[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16561 === (5))){
var inst_16540 = (state_16560[(7)]);
var inst_16542 = figwheel.client.file_reloading.blocking_load.call(null,inst_16540);
var state_16560__$1 = state_16560;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16560__$1,(8),inst_16542);
} else {
if((state_val_16561 === (10))){
var inst_16544 = (state_16560[(9)]);
var inst_16550 = cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,cljs.core.conj,inst_16544);
var state_16560__$1 = state_16560;
var statearr_16571_16589 = state_16560__$1;
(statearr_16571_16589[(2)] = inst_16550);

(statearr_16571_16589[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16561 === (8))){
var inst_16546 = (state_16560[(10)]);
var inst_16540 = (state_16560[(7)]);
var inst_16544 = (state_16560[(2)]);
var inst_16545 = cljs.core.deref.call(null,figwheel.client.file_reloading.on_load_callbacks);
var inst_16546__$1 = cljs.core.get.call(null,inst_16545,inst_16540);
var state_16560__$1 = (function (){var statearr_16572 = state_16560;
(statearr_16572[(9)] = inst_16544);

(statearr_16572[(10)] = inst_16546__$1);

return statearr_16572;
})();
if(cljs.core.truth_(inst_16546__$1)){
var statearr_16573_16590 = state_16560__$1;
(statearr_16573_16590[(1)] = (9));

} else {
var statearr_16574_16591 = state_16560__$1;
(statearr_16574_16591[(1)] = (10));

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
});})(c__8341__auto__))
;
return ((function (switch__8229__auto__,c__8341__auto__){
return (function() {
var figwheel$client$file_reloading$state_machine__8230__auto__ = null;
var figwheel$client$file_reloading$state_machine__8230__auto____0 = (function (){
var statearr_16578 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_16578[(0)] = figwheel$client$file_reloading$state_machine__8230__auto__);

(statearr_16578[(1)] = (1));

return statearr_16578;
});
var figwheel$client$file_reloading$state_machine__8230__auto____1 = (function (state_16560){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_16560);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e16579){if((e16579 instanceof Object)){
var ex__8233__auto__ = e16579;
var statearr_16580_16592 = state_16560;
(statearr_16580_16592[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16560);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16579;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16593 = state_16560;
state_16560 = G__16593;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
figwheel$client$file_reloading$state_machine__8230__auto__ = function(state_16560){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$state_machine__8230__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$state_machine__8230__auto____1.call(this,state_16560);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$state_machine__8230__auto____0;
figwheel$client$file_reloading$state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$state_machine__8230__auto____1;
return figwheel$client$file_reloading$state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__))
})();
var state__8343__auto__ = (function (){var statearr_16581 = f__8342__auto__.call(null);
(statearr_16581[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_16581;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__))
);

return c__8341__auto__;
})();
}
figwheel.client.file_reloading.queued_file_reload = (function figwheel$client$file_reloading$queued_file_reload(url){
return cljs.core.async.put_BANG_.call(null,figwheel.client.file_reloading.reload_chan,url);
});
figwheel.client.file_reloading.require_with_callback = (function figwheel$client$file_reloading$require_with_callback(p__16594,callback){
var map__16597 = p__16594;
var map__16597__$1 = ((((!((map__16597 == null)))?((((map__16597.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16597.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16597):map__16597);
var file_msg = map__16597__$1;
var namespace = cljs.core.get.call(null,map__16597__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var request_url = figwheel.client.file_reloading.resolve_ns.call(null,namespace);
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.assoc,request_url,((function (request_url,map__16597,map__16597__$1,file_msg,namespace){
return (function (file_msg_SINGLEQUOTE_){
cljs.core.swap_BANG_.call(null,figwheel.client.file_reloading.on_load_callbacks,cljs.core.dissoc,request_url);

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.merge.call(null,file_msg,cljs.core.select_keys.call(null,file_msg_SINGLEQUOTE_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375)], null)))], null));
});})(request_url,map__16597,map__16597__$1,file_msg,namespace))
);

return figwheel.client.file_reloading.figwheel_require.call(null,cljs.core.name.call(null,namespace),true);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__16599){
var map__16602 = p__16599;
var map__16602__$1 = ((((!((map__16602 == null)))?((((map__16602.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16602.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16602):map__16602);
var file_msg = map__16602__$1;
var namespace = cljs.core.get.call(null,map__16602__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

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
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__16604,callback){
var map__16607 = p__16604;
var map__16607__$1 = ((((!((map__16607 == null)))?((((map__16607.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16607.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16607):map__16607);
var file_msg = map__16607__$1;
var request_url = cljs.core.get.call(null,map__16607__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__16607__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

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
var c__8341__auto___16711 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto___16711,out){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto___16711,out){
return (function (state_16693){
var state_val_16694 = (state_16693[(1)]);
if((state_val_16694 === (1))){
var inst_16667 = cljs.core.seq.call(null,files);
var inst_16668 = cljs.core.first.call(null,inst_16667);
var inst_16669 = cljs.core.next.call(null,inst_16667);
var inst_16670 = files;
var state_16693__$1 = (function (){var statearr_16695 = state_16693;
(statearr_16695[(7)] = inst_16669);

(statearr_16695[(8)] = inst_16668);

(statearr_16695[(9)] = inst_16670);

return statearr_16695;
})();
var statearr_16696_16712 = state_16693__$1;
(statearr_16696_16712[(2)] = null);

(statearr_16696_16712[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16694 === (2))){
var inst_16676 = (state_16693[(10)]);
var inst_16670 = (state_16693[(9)]);
var inst_16675 = cljs.core.seq.call(null,inst_16670);
var inst_16676__$1 = cljs.core.first.call(null,inst_16675);
var inst_16677 = cljs.core.next.call(null,inst_16675);
var inst_16678 = (inst_16676__$1 == null);
var inst_16679 = cljs.core.not.call(null,inst_16678);
var state_16693__$1 = (function (){var statearr_16697 = state_16693;
(statearr_16697[(10)] = inst_16676__$1);

(statearr_16697[(11)] = inst_16677);

return statearr_16697;
})();
if(inst_16679){
var statearr_16698_16713 = state_16693__$1;
(statearr_16698_16713[(1)] = (4));

} else {
var statearr_16699_16714 = state_16693__$1;
(statearr_16699_16714[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16694 === (3))){
var inst_16691 = (state_16693[(2)]);
var state_16693__$1 = state_16693;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_16693__$1,inst_16691);
} else {
if((state_val_16694 === (4))){
var inst_16676 = (state_16693[(10)]);
var inst_16681 = figwheel.client.file_reloading.reload_js_file.call(null,inst_16676);
var state_16693__$1 = state_16693;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_16693__$1,(7),inst_16681);
} else {
if((state_val_16694 === (5))){
var inst_16687 = cljs.core.async.close_BANG_.call(null,out);
var state_16693__$1 = state_16693;
var statearr_16700_16715 = state_16693__$1;
(statearr_16700_16715[(2)] = inst_16687);

(statearr_16700_16715[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16694 === (6))){
var inst_16689 = (state_16693[(2)]);
var state_16693__$1 = state_16693;
var statearr_16701_16716 = state_16693__$1;
(statearr_16701_16716[(2)] = inst_16689);

(statearr_16701_16716[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_16694 === (7))){
var inst_16677 = (state_16693[(11)]);
var inst_16683 = (state_16693[(2)]);
var inst_16684 = cljs.core.async.put_BANG_.call(null,out,inst_16683);
var inst_16670 = inst_16677;
var state_16693__$1 = (function (){var statearr_16702 = state_16693;
(statearr_16702[(12)] = inst_16684);

(statearr_16702[(9)] = inst_16670);

return statearr_16702;
})();
var statearr_16703_16717 = state_16693__$1;
(statearr_16703_16717[(2)] = null);

(statearr_16703_16717[(1)] = (2));


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
});})(c__8341__auto___16711,out))
;
return ((function (switch__8229__auto__,c__8341__auto___16711,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__8230__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__8230__auto____0 = (function (){
var statearr_16707 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_16707[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__8230__auto__);

(statearr_16707[(1)] = (1));

return statearr_16707;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__8230__auto____1 = (function (state_16693){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_16693);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e16708){if((e16708 instanceof Object)){
var ex__8233__auto__ = e16708;
var statearr_16709_16718 = state_16693;
(statearr_16709_16718[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_16693);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e16708;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__16719 = state_16693;
state_16693 = G__16719;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__8230__auto__ = function(state_16693){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__8230__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__8230__auto____1.call(this,state_16693);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__8230__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__8230__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto___16711,out))
})();
var state__8343__auto__ = (function (){var statearr_16710 = f__8342__auto__.call(null);
(statearr_16710[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto___16711);

return statearr_16710;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto___16711,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__16720,opts){
var map__16724 = p__16720;
var map__16724__$1 = ((((!((map__16724 == null)))?((((map__16724.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16724.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16724):map__16724);
var eval_body__$1 = cljs.core.get.call(null,map__16724__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__16724__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
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
}catch (e16726){var e = e16726;
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
return (function (p1__16727_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__16727_SHARP_),n);
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
return cljs.core.map.call(null,(function (p__16736){
var vec__16737 = p__16736;
var k = cljs.core.nth.call(null,vec__16737,(0),null);
var v = cljs.core.nth.call(null,vec__16737,(1),null);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"namespace","namespace",-377510372),k,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"namespace","namespace",-377510372)], null);
}),cljs.core.filter.call(null,(function (p__16740){
var vec__16741 = p__16740;
var k = cljs.core.nth.call(null,vec__16741,(0),null);
var v = cljs.core.nth.call(null,vec__16741,(1),null);
return new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.deref.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas)));
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__16747,p__16748){
var map__16995 = p__16747;
var map__16995__$1 = ((((!((map__16995 == null)))?((((map__16995.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16995.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16995):map__16995);
var opts = map__16995__$1;
var before_jsload = cljs.core.get.call(null,map__16995__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__16995__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var reload_dependents = cljs.core.get.call(null,map__16995__$1,new cljs.core.Keyword(null,"reload-dependents","reload-dependents",-956865430));
var map__16996 = p__16748;
var map__16996__$1 = ((((!((map__16996 == null)))?((((map__16996.cljs$lang$protocol_mask$partition0$ & (64))) || (map__16996.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__16996):map__16996);
var msg = map__16996__$1;
var files = cljs.core.get.call(null,map__16996__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var figwheel_meta = cljs.core.get.call(null,map__16996__$1,new cljs.core.Keyword(null,"figwheel-meta","figwheel-meta",-225970237));
var recompile_dependents = cljs.core.get.call(null,map__16996__$1,new cljs.core.Keyword(null,"recompile-dependents","recompile-dependents",523804171));
if(cljs.core.empty_QMARK_.call(null,figwheel_meta)){
} else {
cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.figwheel_meta_pragmas,figwheel_meta);
}

var c__8341__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
var f__8342__auto__ = (function (){var switch__8229__auto__ = ((function (c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (state_17149){
var state_val_17150 = (state_17149[(1)]);
if((state_val_17150 === (7))){
var inst_17011 = (state_17149[(7)]);
var inst_17010 = (state_17149[(8)]);
var inst_17012 = (state_17149[(9)]);
var inst_17013 = (state_17149[(10)]);
var inst_17018 = cljs.core._nth.call(null,inst_17011,inst_17013);
var inst_17019 = figwheel.client.file_reloading.eval_body.call(null,inst_17018,opts);
var inst_17020 = (inst_17013 + (1));
var tmp17151 = inst_17011;
var tmp17152 = inst_17010;
var tmp17153 = inst_17012;
var inst_17010__$1 = tmp17152;
var inst_17011__$1 = tmp17151;
var inst_17012__$1 = tmp17153;
var inst_17013__$1 = inst_17020;
var state_17149__$1 = (function (){var statearr_17154 = state_17149;
(statearr_17154[(7)] = inst_17011__$1);

(statearr_17154[(8)] = inst_17010__$1);

(statearr_17154[(9)] = inst_17012__$1);

(statearr_17154[(11)] = inst_17019);

(statearr_17154[(10)] = inst_17013__$1);

return statearr_17154;
})();
var statearr_17155_17241 = state_17149__$1;
(statearr_17155_17241[(2)] = null);

(statearr_17155_17241[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (20))){
var inst_17053 = (state_17149[(12)]);
var inst_17061 = figwheel.client.file_reloading.sort_files.call(null,inst_17053);
var state_17149__$1 = state_17149;
var statearr_17156_17242 = state_17149__$1;
(statearr_17156_17242[(2)] = inst_17061);

(statearr_17156_17242[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (27))){
var state_17149__$1 = state_17149;
var statearr_17157_17243 = state_17149__$1;
(statearr_17157_17243[(2)] = null);

(statearr_17157_17243[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (1))){
var inst_17002 = (state_17149[(13)]);
var inst_16999 = before_jsload.call(null,files);
var inst_17000 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_17001 = (function (){return ((function (inst_17002,inst_16999,inst_17000,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__16744_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__16744_SHARP_);
});
;})(inst_17002,inst_16999,inst_17000,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_17002__$1 = cljs.core.filter.call(null,inst_17001,files);
var inst_17003 = cljs.core.not_empty.call(null,inst_17002__$1);
var state_17149__$1 = (function (){var statearr_17158 = state_17149;
(statearr_17158[(13)] = inst_17002__$1);

(statearr_17158[(14)] = inst_16999);

(statearr_17158[(15)] = inst_17000);

return statearr_17158;
})();
if(cljs.core.truth_(inst_17003)){
var statearr_17159_17244 = state_17149__$1;
(statearr_17159_17244[(1)] = (2));

} else {
var statearr_17160_17245 = state_17149__$1;
(statearr_17160_17245[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (24))){
var state_17149__$1 = state_17149;
var statearr_17161_17246 = state_17149__$1;
(statearr_17161_17246[(2)] = null);

(statearr_17161_17246[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (39))){
var inst_17103 = (state_17149[(16)]);
var state_17149__$1 = state_17149;
var statearr_17162_17247 = state_17149__$1;
(statearr_17162_17247[(2)] = inst_17103);

(statearr_17162_17247[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (46))){
var inst_17144 = (state_17149[(2)]);
var state_17149__$1 = state_17149;
var statearr_17163_17248 = state_17149__$1;
(statearr_17163_17248[(2)] = inst_17144);

(statearr_17163_17248[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (4))){
var inst_17047 = (state_17149[(2)]);
var inst_17048 = cljs.core.List.EMPTY;
var inst_17049 = cljs.core.reset_BANG_.call(null,figwheel.client.file_reloading.dependencies_loaded,inst_17048);
var inst_17050 = (function (){return ((function (inst_17047,inst_17048,inst_17049,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__16745_SHARP_){
var and__26809__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__16745_SHARP_);
if(cljs.core.truth_(and__26809__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__16745_SHARP_));
} else {
return and__26809__auto__;
}
});
;})(inst_17047,inst_17048,inst_17049,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_17051 = cljs.core.filter.call(null,inst_17050,files);
var inst_17052 = figwheel.client.file_reloading.get_figwheel_always.call(null);
var inst_17053 = cljs.core.concat.call(null,inst_17051,inst_17052);
var state_17149__$1 = (function (){var statearr_17164 = state_17149;
(statearr_17164[(17)] = inst_17049);

(statearr_17164[(12)] = inst_17053);

(statearr_17164[(18)] = inst_17047);

return statearr_17164;
})();
if(cljs.core.truth_(reload_dependents)){
var statearr_17165_17249 = state_17149__$1;
(statearr_17165_17249[(1)] = (16));

} else {
var statearr_17166_17250 = state_17149__$1;
(statearr_17166_17250[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (15))){
var inst_17037 = (state_17149[(2)]);
var state_17149__$1 = state_17149;
var statearr_17167_17251 = state_17149__$1;
(statearr_17167_17251[(2)] = inst_17037);

(statearr_17167_17251[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (21))){
var inst_17063 = (state_17149[(19)]);
var inst_17063__$1 = (state_17149[(2)]);
var inst_17064 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_17063__$1);
var state_17149__$1 = (function (){var statearr_17168 = state_17149;
(statearr_17168[(19)] = inst_17063__$1);

return statearr_17168;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_17149__$1,(22),inst_17064);
} else {
if((state_val_17150 === (31))){
var inst_17147 = (state_17149[(2)]);
var state_17149__$1 = state_17149;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_17149__$1,inst_17147);
} else {
if((state_val_17150 === (32))){
var inst_17103 = (state_17149[(16)]);
var inst_17108 = inst_17103.cljs$lang$protocol_mask$partition0$;
var inst_17109 = (inst_17108 & (64));
var inst_17110 = inst_17103.cljs$core$ISeq$;
var inst_17111 = (inst_17109) || (inst_17110);
var state_17149__$1 = state_17149;
if(cljs.core.truth_(inst_17111)){
var statearr_17169_17252 = state_17149__$1;
(statearr_17169_17252[(1)] = (35));

} else {
var statearr_17170_17253 = state_17149__$1;
(statearr_17170_17253[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (40))){
var inst_17124 = (state_17149[(20)]);
var inst_17123 = (state_17149[(2)]);
var inst_17124__$1 = cljs.core.get.call(null,inst_17123,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_17125 = cljs.core.get.call(null,inst_17123,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_17126 = cljs.core.not_empty.call(null,inst_17124__$1);
var state_17149__$1 = (function (){var statearr_17171 = state_17149;
(statearr_17171[(21)] = inst_17125);

(statearr_17171[(20)] = inst_17124__$1);

return statearr_17171;
})();
if(cljs.core.truth_(inst_17126)){
var statearr_17172_17254 = state_17149__$1;
(statearr_17172_17254[(1)] = (41));

} else {
var statearr_17173_17255 = state_17149__$1;
(statearr_17173_17255[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (33))){
var state_17149__$1 = state_17149;
var statearr_17174_17256 = state_17149__$1;
(statearr_17174_17256[(2)] = false);

(statearr_17174_17256[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (13))){
var inst_17023 = (state_17149[(22)]);
var inst_17027 = cljs.core.chunk_first.call(null,inst_17023);
var inst_17028 = cljs.core.chunk_rest.call(null,inst_17023);
var inst_17029 = cljs.core.count.call(null,inst_17027);
var inst_17010 = inst_17028;
var inst_17011 = inst_17027;
var inst_17012 = inst_17029;
var inst_17013 = (0);
var state_17149__$1 = (function (){var statearr_17175 = state_17149;
(statearr_17175[(7)] = inst_17011);

(statearr_17175[(8)] = inst_17010);

(statearr_17175[(9)] = inst_17012);

(statearr_17175[(10)] = inst_17013);

return statearr_17175;
})();
var statearr_17176_17257 = state_17149__$1;
(statearr_17176_17257[(2)] = null);

(statearr_17176_17257[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (22))){
var inst_17063 = (state_17149[(19)]);
var inst_17066 = (state_17149[(23)]);
var inst_17067 = (state_17149[(24)]);
var inst_17071 = (state_17149[(25)]);
var inst_17066__$1 = (state_17149[(2)]);
var inst_17067__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_17066__$1);
var inst_17068 = (function (){var all_files = inst_17063;
var res_SINGLEQUOTE_ = inst_17066__$1;
var res = inst_17067__$1;
return ((function (all_files,res_SINGLEQUOTE_,res,inst_17063,inst_17066,inst_17067,inst_17071,inst_17066__$1,inst_17067__$1,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p1__16746_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__16746_SHARP_));
});
;})(all_files,res_SINGLEQUOTE_,res,inst_17063,inst_17066,inst_17067,inst_17071,inst_17066__$1,inst_17067__$1,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_17069 = cljs.core.filter.call(null,inst_17068,inst_17066__$1);
var inst_17070 = cljs.core.deref.call(null,figwheel.client.file_reloading.dependencies_loaded);
var inst_17071__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_17070);
var inst_17072 = cljs.core.not_empty.call(null,inst_17071__$1);
var state_17149__$1 = (function (){var statearr_17177 = state_17149;
(statearr_17177[(23)] = inst_17066__$1);

(statearr_17177[(26)] = inst_17069);

(statearr_17177[(24)] = inst_17067__$1);

(statearr_17177[(25)] = inst_17071__$1);

return statearr_17177;
})();
if(cljs.core.truth_(inst_17072)){
var statearr_17178_17258 = state_17149__$1;
(statearr_17178_17258[(1)] = (23));

} else {
var statearr_17179_17259 = state_17149__$1;
(statearr_17179_17259[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (36))){
var state_17149__$1 = state_17149;
var statearr_17180_17260 = state_17149__$1;
(statearr_17180_17260[(2)] = false);

(statearr_17180_17260[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (41))){
var inst_17124 = (state_17149[(20)]);
var inst_17128 = cljs.core.comp.call(null,figwheel.client.file_reloading.name__GT_path,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var inst_17129 = cljs.core.map.call(null,inst_17128,inst_17124);
var inst_17130 = cljs.core.pr_str.call(null,inst_17129);
var inst_17131 = [cljs.core.str("figwheel-no-load meta-data: "),cljs.core.str(inst_17130)].join('');
var inst_17132 = figwheel.client.utils.log.call(null,inst_17131);
var state_17149__$1 = state_17149;
var statearr_17181_17261 = state_17149__$1;
(statearr_17181_17261[(2)] = inst_17132);

(statearr_17181_17261[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (43))){
var inst_17125 = (state_17149[(21)]);
var inst_17135 = (state_17149[(2)]);
var inst_17136 = cljs.core.not_empty.call(null,inst_17125);
var state_17149__$1 = (function (){var statearr_17182 = state_17149;
(statearr_17182[(27)] = inst_17135);

return statearr_17182;
})();
if(cljs.core.truth_(inst_17136)){
var statearr_17183_17262 = state_17149__$1;
(statearr_17183_17262[(1)] = (44));

} else {
var statearr_17184_17263 = state_17149__$1;
(statearr_17184_17263[(1)] = (45));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (29))){
var inst_17063 = (state_17149[(19)]);
var inst_17066 = (state_17149[(23)]);
var inst_17069 = (state_17149[(26)]);
var inst_17067 = (state_17149[(24)]);
var inst_17071 = (state_17149[(25)]);
var inst_17103 = (state_17149[(16)]);
var inst_17099 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_17102 = (function (){var all_files = inst_17063;
var res_SINGLEQUOTE_ = inst_17066;
var res = inst_17067;
var files_not_loaded = inst_17069;
var dependencies_that_loaded = inst_17071;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_17063,inst_17066,inst_17069,inst_17067,inst_17071,inst_17103,inst_17099,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__17101){
var map__17185 = p__17101;
var map__17185__$1 = ((((!((map__17185 == null)))?((((map__17185.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17185.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17185):map__17185);
var namespace = cljs.core.get.call(null,map__17185__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
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
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_17063,inst_17066,inst_17069,inst_17067,inst_17071,inst_17103,inst_17099,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_17103__$1 = cljs.core.group_by.call(null,inst_17102,inst_17069);
var inst_17105 = (inst_17103__$1 == null);
var inst_17106 = cljs.core.not.call(null,inst_17105);
var state_17149__$1 = (function (){var statearr_17187 = state_17149;
(statearr_17187[(28)] = inst_17099);

(statearr_17187[(16)] = inst_17103__$1);

return statearr_17187;
})();
if(inst_17106){
var statearr_17188_17264 = state_17149__$1;
(statearr_17188_17264[(1)] = (32));

} else {
var statearr_17189_17265 = state_17149__$1;
(statearr_17189_17265[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (44))){
var inst_17125 = (state_17149[(21)]);
var inst_17138 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_17125);
var inst_17139 = cljs.core.pr_str.call(null,inst_17138);
var inst_17140 = [cljs.core.str("not required: "),cljs.core.str(inst_17139)].join('');
var inst_17141 = figwheel.client.utils.log.call(null,inst_17140);
var state_17149__$1 = state_17149;
var statearr_17190_17266 = state_17149__$1;
(statearr_17190_17266[(2)] = inst_17141);

(statearr_17190_17266[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (6))){
var inst_17044 = (state_17149[(2)]);
var state_17149__$1 = state_17149;
var statearr_17191_17267 = state_17149__$1;
(statearr_17191_17267[(2)] = inst_17044);

(statearr_17191_17267[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (28))){
var inst_17069 = (state_17149[(26)]);
var inst_17096 = (state_17149[(2)]);
var inst_17097 = cljs.core.not_empty.call(null,inst_17069);
var state_17149__$1 = (function (){var statearr_17192 = state_17149;
(statearr_17192[(29)] = inst_17096);

return statearr_17192;
})();
if(cljs.core.truth_(inst_17097)){
var statearr_17193_17268 = state_17149__$1;
(statearr_17193_17268[(1)] = (29));

} else {
var statearr_17194_17269 = state_17149__$1;
(statearr_17194_17269[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (25))){
var inst_17067 = (state_17149[(24)]);
var inst_17083 = (state_17149[(2)]);
var inst_17084 = cljs.core.not_empty.call(null,inst_17067);
var state_17149__$1 = (function (){var statearr_17195 = state_17149;
(statearr_17195[(30)] = inst_17083);

return statearr_17195;
})();
if(cljs.core.truth_(inst_17084)){
var statearr_17196_17270 = state_17149__$1;
(statearr_17196_17270[(1)] = (26));

} else {
var statearr_17197_17271 = state_17149__$1;
(statearr_17197_17271[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (34))){
var inst_17118 = (state_17149[(2)]);
var state_17149__$1 = state_17149;
if(cljs.core.truth_(inst_17118)){
var statearr_17198_17272 = state_17149__$1;
(statearr_17198_17272[(1)] = (38));

} else {
var statearr_17199_17273 = state_17149__$1;
(statearr_17199_17273[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (17))){
var state_17149__$1 = state_17149;
var statearr_17200_17274 = state_17149__$1;
(statearr_17200_17274[(2)] = recompile_dependents);

(statearr_17200_17274[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (3))){
var state_17149__$1 = state_17149;
var statearr_17201_17275 = state_17149__$1;
(statearr_17201_17275[(2)] = null);

(statearr_17201_17275[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (12))){
var inst_17040 = (state_17149[(2)]);
var state_17149__$1 = state_17149;
var statearr_17202_17276 = state_17149__$1;
(statearr_17202_17276[(2)] = inst_17040);

(statearr_17202_17276[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (2))){
var inst_17002 = (state_17149[(13)]);
var inst_17009 = cljs.core.seq.call(null,inst_17002);
var inst_17010 = inst_17009;
var inst_17011 = null;
var inst_17012 = (0);
var inst_17013 = (0);
var state_17149__$1 = (function (){var statearr_17203 = state_17149;
(statearr_17203[(7)] = inst_17011);

(statearr_17203[(8)] = inst_17010);

(statearr_17203[(9)] = inst_17012);

(statearr_17203[(10)] = inst_17013);

return statearr_17203;
})();
var statearr_17204_17277 = state_17149__$1;
(statearr_17204_17277[(2)] = null);

(statearr_17204_17277[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (23))){
var inst_17063 = (state_17149[(19)]);
var inst_17066 = (state_17149[(23)]);
var inst_17069 = (state_17149[(26)]);
var inst_17067 = (state_17149[(24)]);
var inst_17071 = (state_17149[(25)]);
var inst_17074 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these dependencies");
var inst_17076 = (function (){var all_files = inst_17063;
var res_SINGLEQUOTE_ = inst_17066;
var res = inst_17067;
var files_not_loaded = inst_17069;
var dependencies_that_loaded = inst_17071;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_17063,inst_17066,inst_17069,inst_17067,inst_17071,inst_17074,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__17075){
var map__17205 = p__17075;
var map__17205__$1 = ((((!((map__17205 == null)))?((((map__17205.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17205.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17205):map__17205);
var request_url = cljs.core.get.call(null,map__17205__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
return clojure.string.replace.call(null,request_url,goog.basePath,"");
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_17063,inst_17066,inst_17069,inst_17067,inst_17071,inst_17074,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_17077 = cljs.core.reverse.call(null,inst_17071);
var inst_17078 = cljs.core.map.call(null,inst_17076,inst_17077);
var inst_17079 = cljs.core.pr_str.call(null,inst_17078);
var inst_17080 = figwheel.client.utils.log.call(null,inst_17079);
var state_17149__$1 = (function (){var statearr_17207 = state_17149;
(statearr_17207[(31)] = inst_17074);

return statearr_17207;
})();
var statearr_17208_17278 = state_17149__$1;
(statearr_17208_17278[(2)] = inst_17080);

(statearr_17208_17278[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (35))){
var state_17149__$1 = state_17149;
var statearr_17209_17279 = state_17149__$1;
(statearr_17209_17279[(2)] = true);

(statearr_17209_17279[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (19))){
var inst_17053 = (state_17149[(12)]);
var inst_17059 = figwheel.client.file_reloading.expand_files.call(null,inst_17053);
var state_17149__$1 = state_17149;
var statearr_17210_17280 = state_17149__$1;
(statearr_17210_17280[(2)] = inst_17059);

(statearr_17210_17280[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (11))){
var state_17149__$1 = state_17149;
var statearr_17211_17281 = state_17149__$1;
(statearr_17211_17281[(2)] = null);

(statearr_17211_17281[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (9))){
var inst_17042 = (state_17149[(2)]);
var state_17149__$1 = state_17149;
var statearr_17212_17282 = state_17149__$1;
(statearr_17212_17282[(2)] = inst_17042);

(statearr_17212_17282[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (5))){
var inst_17012 = (state_17149[(9)]);
var inst_17013 = (state_17149[(10)]);
var inst_17015 = (inst_17013 < inst_17012);
var inst_17016 = inst_17015;
var state_17149__$1 = state_17149;
if(cljs.core.truth_(inst_17016)){
var statearr_17213_17283 = state_17149__$1;
(statearr_17213_17283[(1)] = (7));

} else {
var statearr_17214_17284 = state_17149__$1;
(statearr_17214_17284[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (14))){
var inst_17023 = (state_17149[(22)]);
var inst_17032 = cljs.core.first.call(null,inst_17023);
var inst_17033 = figwheel.client.file_reloading.eval_body.call(null,inst_17032,opts);
var inst_17034 = cljs.core.next.call(null,inst_17023);
var inst_17010 = inst_17034;
var inst_17011 = null;
var inst_17012 = (0);
var inst_17013 = (0);
var state_17149__$1 = (function (){var statearr_17215 = state_17149;
(statearr_17215[(7)] = inst_17011);

(statearr_17215[(8)] = inst_17010);

(statearr_17215[(9)] = inst_17012);

(statearr_17215[(10)] = inst_17013);

(statearr_17215[(32)] = inst_17033);

return statearr_17215;
})();
var statearr_17216_17285 = state_17149__$1;
(statearr_17216_17285[(2)] = null);

(statearr_17216_17285[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (45))){
var state_17149__$1 = state_17149;
var statearr_17217_17286 = state_17149__$1;
(statearr_17217_17286[(2)] = null);

(statearr_17217_17286[(1)] = (46));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (26))){
var inst_17063 = (state_17149[(19)]);
var inst_17066 = (state_17149[(23)]);
var inst_17069 = (state_17149[(26)]);
var inst_17067 = (state_17149[(24)]);
var inst_17071 = (state_17149[(25)]);
var inst_17086 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_17088 = (function (){var all_files = inst_17063;
var res_SINGLEQUOTE_ = inst_17066;
var res = inst_17067;
var files_not_loaded = inst_17069;
var dependencies_that_loaded = inst_17071;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_17063,inst_17066,inst_17069,inst_17067,inst_17071,inst_17086,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (p__17087){
var map__17218 = p__17087;
var map__17218__$1 = ((((!((map__17218 == null)))?((((map__17218.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17218.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17218):map__17218);
var namespace = cljs.core.get.call(null,map__17218__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__17218__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.name__GT_path.call(null,cljs.core.name.call(null,namespace));
} else {
return file;
}
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_17063,inst_17066,inst_17069,inst_17067,inst_17071,inst_17086,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_17089 = cljs.core.map.call(null,inst_17088,inst_17067);
var inst_17090 = cljs.core.pr_str.call(null,inst_17089);
var inst_17091 = figwheel.client.utils.log.call(null,inst_17090);
var inst_17092 = (function (){var all_files = inst_17063;
var res_SINGLEQUOTE_ = inst_17066;
var res = inst_17067;
var files_not_loaded = inst_17069;
var dependencies_that_loaded = inst_17071;
return ((function (all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_17063,inst_17066,inst_17069,inst_17067,inst_17071,inst_17086,inst_17088,inst_17089,inst_17090,inst_17091,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,res_SINGLEQUOTE_,res,files_not_loaded,dependencies_that_loaded,inst_17063,inst_17066,inst_17069,inst_17067,inst_17071,inst_17086,inst_17088,inst_17089,inst_17090,inst_17091,state_val_17150,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var inst_17093 = setTimeout(inst_17092,(10));
var state_17149__$1 = (function (){var statearr_17220 = state_17149;
(statearr_17220[(33)] = inst_17091);

(statearr_17220[(34)] = inst_17086);

return statearr_17220;
})();
var statearr_17221_17287 = state_17149__$1;
(statearr_17221_17287[(2)] = inst_17093);

(statearr_17221_17287[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (16))){
var state_17149__$1 = state_17149;
var statearr_17222_17288 = state_17149__$1;
(statearr_17222_17288[(2)] = reload_dependents);

(statearr_17222_17288[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (38))){
var inst_17103 = (state_17149[(16)]);
var inst_17120 = cljs.core.apply.call(null,cljs.core.hash_map,inst_17103);
var state_17149__$1 = state_17149;
var statearr_17223_17289 = state_17149__$1;
(statearr_17223_17289[(2)] = inst_17120);

(statearr_17223_17289[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (30))){
var state_17149__$1 = state_17149;
var statearr_17224_17290 = state_17149__$1;
(statearr_17224_17290[(2)] = null);

(statearr_17224_17290[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (10))){
var inst_17023 = (state_17149[(22)]);
var inst_17025 = cljs.core.chunked_seq_QMARK_.call(null,inst_17023);
var state_17149__$1 = state_17149;
if(inst_17025){
var statearr_17225_17291 = state_17149__$1;
(statearr_17225_17291[(1)] = (13));

} else {
var statearr_17226_17292 = state_17149__$1;
(statearr_17226_17292[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (18))){
var inst_17057 = (state_17149[(2)]);
var state_17149__$1 = state_17149;
if(cljs.core.truth_(inst_17057)){
var statearr_17227_17293 = state_17149__$1;
(statearr_17227_17293[(1)] = (19));

} else {
var statearr_17228_17294 = state_17149__$1;
(statearr_17228_17294[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (42))){
var state_17149__$1 = state_17149;
var statearr_17229_17295 = state_17149__$1;
(statearr_17229_17295[(2)] = null);

(statearr_17229_17295[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (37))){
var inst_17115 = (state_17149[(2)]);
var state_17149__$1 = state_17149;
var statearr_17230_17296 = state_17149__$1;
(statearr_17230_17296[(2)] = inst_17115);

(statearr_17230_17296[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_17150 === (8))){
var inst_17023 = (state_17149[(22)]);
var inst_17010 = (state_17149[(8)]);
var inst_17023__$1 = cljs.core.seq.call(null,inst_17010);
var state_17149__$1 = (function (){var statearr_17231 = state_17149;
(statearr_17231[(22)] = inst_17023__$1);

return statearr_17231;
})();
if(inst_17023__$1){
var statearr_17232_17297 = state_17149__$1;
(statearr_17232_17297[(1)] = (10));

} else {
var statearr_17233_17298 = state_17149__$1;
(statearr_17233_17298[(1)] = (11));

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
});})(c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents))
;
return ((function (switch__8229__auto__,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__8230__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__8230__auto____0 = (function (){
var statearr_17237 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_17237[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__8230__auto__);

(statearr_17237[(1)] = (1));

return statearr_17237;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__8230__auto____1 = (function (state_17149){
while(true){
var ret_value__8231__auto__ = (function (){try{while(true){
var result__8232__auto__ = switch__8229__auto__.call(null,state_17149);
if(cljs.core.keyword_identical_QMARK_.call(null,result__8232__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__8232__auto__;
}
break;
}
}catch (e17238){if((e17238 instanceof Object)){
var ex__8233__auto__ = e17238;
var statearr_17239_17299 = state_17149;
(statearr_17239_17299[(5)] = ex__8233__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_17149);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e17238;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__8231__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__17300 = state_17149;
state_17149 = G__17300;
continue;
} else {
return ret_value__8231__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__8230__auto__ = function(state_17149){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__8230__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__8230__auto____1.call(this,state_17149);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__8230__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__8230__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__8230__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__8230__auto__;
})()
;})(switch__8229__auto__,c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents))
})();
var state__8343__auto__ = (function (){var statearr_17240 = f__8342__auto__.call(null);
(statearr_17240[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__8341__auto__);

return statearr_17240;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__8343__auto__);
});})(c__8341__auto__,map__16995,map__16995__$1,opts,before_jsload,on_jsload,reload_dependents,map__16996,map__16996__$1,msg,files,figwheel_meta,recompile_dependents))
);

return c__8341__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str(location.protocol),cljs.core.str("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__17303,link){
var map__17306 = p__17303;
var map__17306__$1 = ((((!((map__17306 == null)))?((((map__17306.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17306.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17306):map__17306);
var file = cljs.core.get.call(null,map__17306__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4657__auto__ = link.href;
if(cljs.core.truth_(temp__4657__auto__)){
var link_href = temp__4657__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4657__auto__,map__17306,map__17306__$1,file){
return (function (p1__17301_SHARP_,p2__17302_SHARP_){
if(cljs.core._EQ_.call(null,p1__17301_SHARP_,p2__17302_SHARP_)){
return p1__17301_SHARP_;
} else {
return false;
}
});})(link_href,temp__4657__auto__,map__17306,map__17306__$1,file))
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
var temp__4657__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__17312){
var map__17313 = p__17312;
var map__17313__$1 = ((((!((map__17313 == null)))?((((map__17313.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17313.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17313):map__17313);
var match_length = cljs.core.get.call(null,map__17313__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__17313__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__17308_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__17308_SHARP_);
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
var args17315 = [];
var len__27348__auto___17318 = arguments.length;
var i__27349__auto___17319 = (0);
while(true){
if((i__27349__auto___17319 < len__27348__auto___17318)){
args17315.push((arguments[i__27349__auto___17319]));

var G__17320 = (i__27349__auto___17319 + (1));
i__27349__auto___17319 = G__17320;
continue;
} else {
}
break;
}

var G__17317 = args17315.length;
switch (G__17317) {
case 1:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args17315.length)].join('')));

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
return cljs.core.vals.call(null,cljs.core.reduce.call(null,(function (p1__17322_SHARP_,p2__17323_SHARP_){
return cljs.core.assoc.call(null,p1__17322_SHARP_,cljs.core.get.call(null,p2__17323_SHARP_,key),p2__17323_SHARP_);
}),cljs.core.PersistentArrayMap.EMPTY,seqq));
});
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(p__17324){
var map__17327 = p__17324;
var map__17327__$1 = ((((!((map__17327 == null)))?((((map__17327.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17327.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17327):map__17327);
var f_data = map__17327__$1;
var file = cljs.core.get.call(null,map__17327__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4657__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4657__auto__)){
var link = temp__4657__auto__;
return figwheel.client.file_reloading.add_link_to_doc.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href));
} else {
return null;
}
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__17329,files_msg){
var map__17336 = p__17329;
var map__17336__$1 = ((((!((map__17336 == null)))?((((map__17336.cljs$lang$protocol_mask$partition0$ & (64))) || (map__17336.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__17336):map__17336);
var opts = map__17336__$1;
var on_cssload = cljs.core.get.call(null,map__17336__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var seq__17338_17342 = cljs.core.seq.call(null,figwheel.client.file_reloading.distictify.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg)));
var chunk__17339_17343 = null;
var count__17340_17344 = (0);
var i__17341_17345 = (0);
while(true){
if((i__17341_17345 < count__17340_17344)){
var f_17346 = cljs.core._nth.call(null,chunk__17339_17343,i__17341_17345);
figwheel.client.file_reloading.reload_css_file.call(null,f_17346);

var G__17347 = seq__17338_17342;
var G__17348 = chunk__17339_17343;
var G__17349 = count__17340_17344;
var G__17350 = (i__17341_17345 + (1));
seq__17338_17342 = G__17347;
chunk__17339_17343 = G__17348;
count__17340_17344 = G__17349;
i__17341_17345 = G__17350;
continue;
} else {
var temp__4657__auto___17351 = cljs.core.seq.call(null,seq__17338_17342);
if(temp__4657__auto___17351){
var seq__17338_17352__$1 = temp__4657__auto___17351;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17338_17352__$1)){
var c__27200__auto___17353 = cljs.core.chunk_first.call(null,seq__17338_17352__$1);
var G__17354 = cljs.core.chunk_rest.call(null,seq__17338_17352__$1);
var G__17355 = c__27200__auto___17353;
var G__17356 = cljs.core.count.call(null,c__27200__auto___17353);
var G__17357 = (0);
seq__17338_17342 = G__17354;
chunk__17339_17343 = G__17355;
count__17340_17344 = G__17356;
i__17341_17345 = G__17357;
continue;
} else {
var f_17358 = cljs.core.first.call(null,seq__17338_17352__$1);
figwheel.client.file_reloading.reload_css_file.call(null,f_17358);

var G__17359 = cljs.core.next.call(null,seq__17338_17352__$1);
var G__17360 = null;
var G__17361 = (0);
var G__17362 = (0);
seq__17338_17342 = G__17359;
chunk__17339_17343 = G__17360;
count__17340_17344 = G__17361;
i__17341_17345 = G__17362;
continue;
}
} else {
}
}
break;
}

return setTimeout(((function (map__17336,map__17336__$1,opts,on_cssload){
return (function (){
return on_cssload.call(null,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg));
});})(map__17336,map__17336__$1,opts,on_cssload))
,(100));
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map?rel=1468744503822