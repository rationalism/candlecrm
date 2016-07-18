// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.node');
goog.require('cljs.core');
goog.require('spectra_cljs.update');
goog.require('spectra_cljs.state');
goog.require('spectra_cljs.table');
goog.require('spectra_cljc.schema');
goog.require('spectra_cljs.util');
goog.require('clojure.string');
goog.require('spectra_cljs.regex');
spectra_cljs.node.display_fields = cljs.core.PersistentArrayMap.fromArray([spectra_cljc.schema.person,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.s_name,spectra_cljc.schema.email_addr,spectra_cljc.schema.phone_num,spectra_cljc.schema.website,spectra_cljc.schema.org_member], null),spectra_cljc.schema.email,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.email_sent,spectra_cljc.schema.email_from,spectra_cljc.schema.email_to,spectra_cljc.schema.email_body], null),spectra_cljc.schema.organization,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.s_name,spectra_cljc.schema.email_addr,spectra_cljc.schema.phone_num,spectra_cljc.schema.website,spectra_cljc.schema.org_member], null),spectra_cljc.schema.location,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.s_name,spectra_cljc.schema.zipcode,spectra_cljc.schema.email_mentions], null),spectra_cljc.schema.event,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.s_name,spectra_cljc.schema.date_time,spectra_cljc.schema.event_type,spectra_cljc.schema.website,spectra_cljc.schema.event_features,spectra_cljc.schema.email_mentions], null),spectra_cljc.schema.building,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.street_addr,spectra_cljc.schema.email_mentions], null)], true, false);
spectra_cljs.node.title_field = cljs.core.PersistentArrayMap.fromArray([spectra_cljc.schema.person,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.s_name,spectra_cljc.schema.email_addr,"(No name)"], null),spectra_cljc.schema.email,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.email_subject,"(No subject)"], null),spectra_cljc.schema.organization,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.s_name,spectra_cljc.schema.email_addr,"(No name)"], null),spectra_cljc.schema.location,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.s_name,"(No name)"], null),spectra_cljc.schema.building,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.street_addr,"(No address)"], null),spectra_cljc.schema.event,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.s_name,"(No name)"], null)], true, false);
spectra_cljs.node.get_title = (function spectra_cljs$node$get_title(node){
var fields = spectra_cljs.node.title_field.call(null,spectra_cljc.schema.type_label.call(null,new cljs.core.Keyword(null,"center-node","center-node",1511034476).cljs$core$IFn$_invoke$arity$1(node)));
var f = fields;
while(true){
if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,f))){
return cljs.core.first.call(null,f);
} else {
if(cljs.core.truth_(spectra_cljs.util.get_first.call(null,new cljs.core.Keyword(null,"center-node","center-node",1511034476).cljs$core$IFn$_invoke$arity$1(node),cljs.core.first.call(null,f)))){
return spectra_cljs.util.get_first.call(null,new cljs.core.Keyword(null,"center-node","center-node",1511034476).cljs$core$IFn$_invoke$arity$1(node),cljs.core.first.call(null,f));
} else {
var G__13027 = cljs.core.rest.call(null,fields);
f = G__13027;
continue;

}
}
break;
}
});
spectra_cljs.node.split_regex = (function spectra_cljs$node$split_regex(s,break$){
return clojure.string.split.call(null,s,cljs.core.re_pattern.call(null,spectra_cljs.regex.regex_escape.call(null,break$)));
});
spectra_cljs.node.insert_breaks = (function spectra_cljs$node$insert_breaks(strs,break$){
return cljs.core.drop_last.call(null,cljs.core.interleave.call(null,strs,cljs.core.repeat.call(null,cljs.core.count.call(null,strs),break$)));
});
spectra_cljs.node.split_coll = (function spectra_cljs$node$split_coll(strs,break$){
return cljs.core.flatten.call(null,cljs.core.map.call(null,(function (p1__13029_SHARP_){
return spectra_cljs.node.insert_breaks.call(null,p1__13029_SHARP_,break$);
}),cljs.core.map.call(null,(function (p1__13028_SHARP_){
return spectra_cljs.node.split_regex.call(null,p1__13028_SHARP_,break$);
}),strs)));
});
spectra_cljs.node.ids_if_coll = (function spectra_cljs$node$ids_if_coll(type,m){
var id_fn = (function (p1__13030_SHARP_){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.vec.call(null,cljs.core.map.call(null,cljs.core.vec,spectra_cljs.util.add_ids.call(null,p1__13030_SHARP_))));
});
return cljs.core.reduce.call(null,((function (id_fn){
return (function (p1__13031_SHARP_,p2__13032_SHARP_){
return cljs.core.update.call(null,p1__13031_SHARP_,p2__13032_SHARP_,id_fn);
});})(id_fn))
,m,cljs.core.vec.call(null,cljs.core.keep.call(null,cljs.core.set.call(null,type.call(null,spectra_cljs.table.entity_attrs)),cljs.core.set.call(null,cljs.core.keys.call(null,m)))));
});
spectra_cljs.node.edit_entity_switch = (function spectra_cljs$node$edit_entity_switch(type){
spectra_cljs.state.update_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current-node","current-node",-814308842),new cljs.core.Keyword(null,"center-node","center-node",1511034476)], null),cljs.core.partial.call(null,spectra_cljs.node.ids_if_coll,type));

return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tabid","tabid",-720881418)], null),(8));
});
spectra_cljs.node.delete_entity_switch = (function spectra_cljs$node$delete_entity_switch(){
spectra_cljs.update.delete_entity_BANG_.call(null);

return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tabid","tabid",-720881418)], null),(1));
});
spectra_cljs.node.split_many = (function spectra_cljs$node$split_many(s,breaks){
return cljs.core.reduce.call(null,spectra_cljs.node.split_coll,(new cljs.core.PersistentVector(null,1,(5),cljs.core.PersistentVector.EMPTY_NODE,[s],null)),breaks);
});
spectra_cljs.node.text_keys = (function spectra_cljs$node$text_keys(parsed){
return cljs.core.apply.call(null,cljs.core.merge,cljs.core.map.call(null,(function (p1__13033_SHARP_){
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"original","original",-445386197).cljs$core$IFn$_invoke$arity$1(p1__13033_SHARP_)],[p1__13033_SHARP_]);
}),parsed));
});
spectra_cljs.node.swap_item = (function spectra_cljs$node$swap_item(item,parsed){
if(cljs.core.contains_QMARK_.call(null,parsed,item)){
return cljs.core.get.call(null,parsed,item);
} else {
return item;
}
});
spectra_cljs.node.link_items = (function spectra_cljs$node$link_items(item){
var parsed = spectra_cljs.node.text_keys.call(null,spectra_cljs.regex.links_parse.call(null,item));
return cljs.core.map.call(null,((function (parsed){
return (function (p1__13034_SHARP_){
return spectra_cljs.node.swap_item.call(null,p1__13034_SHARP_,parsed);
});})(parsed))
,spectra_cljs.node.split_many.call(null,item,cljs.core.keys.call(null,parsed)));
});
spectra_cljs.node.add_newlines = (function spectra_cljs$node$add_newlines(piece){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),(function (){var n = spectra_cljs.util.add_ids.call(null,clojure.string.split.call(null,piece,/\n/));
var iter__27292__auto__ = ((function (n){
return (function spectra_cljs$node$add_newlines_$_iter__13039(s__13040){
return (new cljs.core.LazySeq(null,((function (n){
return (function (){
var s__13040__$1 = s__13040;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__13040__$1);
if(temp__4657__auto__){
var s__13040__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__13040__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__13040__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__13042 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__13041 = (0);
while(true){
if((i__13041 < size__27291__auto__)){
var ln = cljs.core._nth.call(null,c__27290__auto__,i__13041);
cljs.core.chunk_append.call(null,b__13042,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),cljs.core.second.call(null,ln),((((cljs.core.count.call(null,n) - (1)) > cljs.core.first.call(null,ln)))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null):null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,ln)], null)));

var G__13043 = (i__13041 + (1));
i__13041 = G__13043;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13042),spectra_cljs$node$add_newlines_$_iter__13039.call(null,cljs.core.chunk_rest.call(null,s__13040__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13042),null);
}
} else {
var ln = cljs.core.first.call(null,s__13040__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),cljs.core.second.call(null,ln),((((cljs.core.count.call(null,n) - (1)) > cljs.core.first.call(null,ln)))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null):null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,ln)], null)),spectra_cljs$node$add_newlines_$_iter__13039.call(null,cljs.core.rest.call(null,s__13040__$2)));
}
} else {
return null;
}
break;
}
});})(n))
,null,null));
});})(n))
;
return iter__27292__auto__.call(null,n);
})()], null);
});
spectra_cljs.node.is_last_QMARK_ = (function spectra_cljs$node$is_last_QMARK_(item,members){
return cljs.core._EQ_.call(null,item,cljs.core.last.call(null,members));
});
spectra_cljs.node.last_append = (function spectra_cljs$node$last_append(is_last,text){
if(cljs.core.truth_(is_last)){
return text;
} else {
return [cljs.core.str(text),cljs.core.str(", ")].join('');
}
});
spectra_cljs.node.body_link = (function spectra_cljs$node$body_link(piece){
if(typeof piece === 'string'){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.add_newlines,piece], null);
} else {
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.util.key_link,new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(piece),new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(piece),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(piece)], null);
}
});
spectra_cljs.node.body_links = (function spectra_cljs$node$body_links(item){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p#email-body","p#email-body",-1350448734),(function (){var iter__27292__auto__ = (function spectra_cljs$node$body_links_$_iter__13048(s__13049){
return (new cljs.core.LazySeq(null,(function (){
var s__13049__$1 = s__13049;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__13049__$1);
if(temp__4657__auto__){
var s__13049__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__13049__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__13049__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__13051 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__13050 = (0);
while(true){
if((i__13050 < size__27291__auto__)){
var piece = cljs.core._nth.call(null,c__27290__auto__,i__13050);
cljs.core.chunk_append.call(null,b__13051,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.body_link,cljs.core.second.call(null,piece)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,piece)], null)));

var G__13052 = (i__13050 + (1));
i__13050 = G__13052;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13051),spectra_cljs$node$body_links_$_iter__13048.call(null,cljs.core.chunk_rest.call(null,s__13049__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13051),null);
}
} else {
var piece = cljs.core.first.call(null,s__13049__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.body_link,cljs.core.second.call(null,piece)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,piece)], null)),spectra_cljs$node$body_links_$_iter__13048.call(null,cljs.core.rest.call(null,s__13049__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljs.node.link_items.call(null,item)));
})()], null);
});
spectra_cljs.node.see_more = (function spectra_cljs$node$see_more(attr){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"prop-filters","prop-filters",-775500019),attr], null),(1));
})], null),"(See more)"], null);
});
spectra_cljs.node.see_all = (function spectra_cljs$node$see_all(attr){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"prop-filters","prop-filters",-775500019),attr], null),(2));
})], null),"(See all)"], null);
});
spectra_cljs.node.ask_more = (function spectra_cljs$node$ask_more(attr){
var temp__4655__auto__ = spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"prop-filters","prop-filters",-775500019),attr);
if(cljs.core.truth_(temp__4655__auto__)){
var filter_level = temp__4655__auto__;
var pred__13056 = cljs.core._EQ_;
var expr__13057 = filter_level;
if(cljs.core.truth_(pred__13056.call(null,(1),expr__13057))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.see_all,attr], null);
} else {
if(cljs.core.truth_(pred__13056.call(null,(2),expr__13057))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632)], null);
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632)], null);
}
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.see_more,attr], null);
}
});
spectra_cljs.node.map_link = (function spectra_cljs$node$map_link(item){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.util.node_link,(function (){var text_key = cljs.core.dissoc.call(null,item,new cljs.core.Keyword(null,"id","id",-1388402092),spectra_cljc.schema.type_label);
return cljs.core.ffirst.call(null,cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,cljs.core.first.call(null,cljs.core.vals.call(null,text_key))));
})(),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(item),spectra_cljc.schema.type_label.call(null,item)], null);
});
spectra_cljs.node.display_item = (function spectra_cljs$node$display_item(is_last,item){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),((cljs.core.map_QMARK_.call(null,item))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.map_link,item], null):[cljs.core.str(item)].join('')),spectra_cljs.node.last_append.call(null,is_last,"")], null);
});
spectra_cljs.node.string_item = (function spectra_cljs$node$string_item(item,prop){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([prop], true),spectra_cljc.schema.date_times))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.util.date_display,item], null):((cljs.core._EQ_.call(null,prop,spectra_cljc.schema.email_body))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.body_links,cljs.core.first.call(null,item)], null):((cljs.core.coll_QMARK_.call(null,item))?(function (){var iter__27292__auto__ = (function spectra_cljs$node$string_item_$_iter__13063(s__13064){
return (new cljs.core.LazySeq(null,(function (){
var s__13064__$1 = s__13064;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__13064__$1);
if(temp__4657__auto__){
var s__13064__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__13064__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__13064__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__13066 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__13065 = (0);
while(true){
if((i__13065 < size__27291__auto__)){
var list_member = cljs.core._nth.call(null,c__27290__auto__,i__13065);
cljs.core.chunk_append.call(null,b__13066,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.display_item,spectra_cljs.node.is_last_QMARK_.call(null,list_member,spectra_cljs.util.add_ids.call(null,item)),cljs.core.second.call(null,list_member)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,list_member)], null)));

var G__13067 = (i__13065 + (1));
i__13065 = G__13067;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13066),spectra_cljs$node$string_item_$_iter__13063.call(null,cljs.core.chunk_rest.call(null,s__13064__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13066),null);
}
} else {
var list_member = cljs.core.first.call(null,s__13064__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.display_item,spectra_cljs.node.is_last_QMARK_.call(null,list_member,spectra_cljs.util.add_ids.call(null,item)),cljs.core.second.call(null,list_member)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,list_member)], null)),spectra_cljs$node$string_item_$_iter__13063.call(null,cljs.core.rest.call(null,s__13064__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,item));
})():item
)))," ",(cljs.core.truth_((function (){var and__26928__auto__ = item;
if(cljs.core.truth_(and__26928__auto__)){
return (cljs.core.coll_QMARK_.call(null,item)) && (!(cljs.core.empty_QMARK_.call(null,item))) && ((cljs.core.count.call(null,item) > (1)));
} else {
return and__26928__auto__;
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.ask_more,prop], null):null)], null);
});
spectra_cljs.node.str_item = (function spectra_cljs$node$str_item(n,k,v){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"strong","strong",269529000),[cljs.core.str(n),cljs.core.str(": ")].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.string_item,v,k], null)], null);
});
spectra_cljs.node.get_filter_limit = (function spectra_cljs$node$get_filter_limit(attr){
var temp__4655__auto__ = spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"prop-filters","prop-filters",-775500019),attr);
if(cljs.core.truth_(temp__4655__auto__)){
var filter_level = temp__4655__auto__;
var pred__13071 = cljs.core._EQ_;
var expr__13072 = filter_level;
if(cljs.core.truth_(pred__13071.call(null,(1),expr__13072))){
return -0.3333;
} else {
if(cljs.core.truth_(pred__13071.call(null,(2),expr__13072))){
return -1.0;
} else {
return -9999.0;
}
}
} else {
return 0.3333;
}
});
spectra_cljs.node.filtered_list = (function spectra_cljs$node$filtered_list(attr,item){
var limit = spectra_cljs.node.get_filter_limit.call(null,attr);
return cljs.core.map.call(null,cljs.core.first,cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,cljs.core.filter.call(null,((function (limit){
return (function (p1__13074_SHARP_){
return (cljs.core.second.call(null,p1__13074_SHARP_) > limit);
});})(limit))
,cljs.core.get.call(null,item,attr))));
});
spectra_cljs.node.info_items = (function spectra_cljs$node$info_items(attrs,item){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),cljs.core.doall.call(null,(function (){var iter__27292__auto__ = (function spectra_cljs$node$info_items_$_iter__13080(s__13081){
return (new cljs.core.LazySeq(null,(function (){
var s__13081__$1 = s__13081;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__13081__$1);
if(temp__4657__auto__){
var s__13081__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__13081__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__13081__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__13083 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__13082 = (0);
while(true){
if((i__13082 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__13082);
cljs.core.chunk_append.call(null,b__13083,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.infoitem","div.infoitem",-1000244188),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.str_item,spectra_cljc.schema.attr_names.call(null,cljs.core.second.call(null,attr)),cljs.core.second.call(null,attr),spectra_cljs.node.filtered_list.call(null,cljs.core.second.call(null,attr),item)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__13084 = (i__13082 + (1));
i__13082 = G__13084;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13083),spectra_cljs$node$info_items_$_iter__13080.call(null,cljs.core.chunk_rest.call(null,s__13081__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13083),null);
}
} else {
var attr = cljs.core.first.call(null,s__13081__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.infoitem","div.infoitem",-1000244188),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.str_item,spectra_cljc.schema.attr_names.call(null,cljs.core.second.call(null,attr)),cljs.core.second.call(null,attr),spectra_cljs.node.filtered_list.call(null,cljs.core.second.call(null,attr),item)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$node$info_items_$_iter__13080.call(null,cljs.core.rest.call(null,s__13081__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,cljs.core.filter.call(null,((function (iter__27292__auto__){
return (function (p1__13075_SHARP_){
return cljs.core.contains_QMARK_.call(null,item,p1__13075_SHARP_);
});})(iter__27292__auto__))
,attrs)));
})())], null);
});
spectra_cljs.node.type_name = cljs.core.PersistentArrayMap.fromArray([spectra_cljc.schema.person,"Person",spectra_cljc.schema.email,"Email",spectra_cljc.schema.organization,"Organization",spectra_cljc.schema.location,"Location",spectra_cljc.schema.event,"Event",spectra_cljc.schema.building,"Building"], true, false);
spectra_cljs.node.node_aux = (function spectra_cljs$node$node_aux(node_name,item){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),((cljs.core._EQ_.call(null,spectra_cljc.schema.type_label.call(null,item),spectra_cljc.schema.person))?new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3.infotitle","h3.infotitle",1224264902),[cljs.core.str("Emails to "),cljs.core.str(node_name)].join('')], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_table,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current-node","current-node",-814308842),spectra_cljc.schema.email_to], null),spectra_cljc.schema.email_to,cljs.core.partial.call(null,spectra_cljs.update.update_emails_person_BANG_,spectra_cljc.schema.email_to)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3.infotitle","h3.infotitle",1224264902),[cljs.core.str("Emails from "),cljs.core.str(node_name)].join('')], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_table,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current-node","current-node",-814308842),spectra_cljc.schema.email_from], null),spectra_cljc.schema.email_from,cljs.core.partial.call(null,spectra_cljs.update.update_emails_person_BANG_,spectra_cljc.schema.email_from)], null)], null):null)], null);
});
spectra_cljs.node.show_node = (function spectra_cljs$node$show_node(node_name,item,aux_QMARK_){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3.infotitle","h3.infotitle",1224264902),[cljs.core.str(node_name),cljs.core.str(" ("),cljs.core.str(spectra_cljs.node.type_name.call(null,spectra_cljc.schema.type_label.call(null,item))),cljs.core.str(") ")].join(''),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return spectra_cljs.node.edit_entity_switch.call(null,spectra_cljc.schema.type_label.call(null,item));
})], null),"(Edit)"], null)," ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),spectra_cljs.node.delete_entity_switch], null),"(Delete)"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.info_items,spectra_cljs.node.display_fields.call(null,spectra_cljc.schema.type_label.call(null,item)),item], null),(cljs.core.truth_(aux_QMARK_)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.node_aux,node_name,item], null):null)], null);
});

//# sourceMappingURL=node.js.map?rel=1468799095780