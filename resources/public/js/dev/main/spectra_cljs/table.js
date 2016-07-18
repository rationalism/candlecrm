// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.table');
goog.require('cljs.core');
goog.require('spectra_cljs.update');
goog.require('spectra_cljs.state');
goog.require('spectra_cljc.schema');
goog.require('spectra_cljs.util');
goog.require('clojure.string');
spectra_cljs.table.entity_attrs = cljs.core.PersistentArrayMap.fromArray([spectra_cljc.schema.person,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljc.schema.s_name,spectra_cljc.schema.email_addr,spectra_cljc.schema.phone_num,spectra_cljc.schema.website], null)], true, false);
spectra_cljs.table.email_attrs = cljs.core.PersistentArrayMap.fromArray([spectra_cljc.schema.email_sent,"Date",spectra_cljc.schema.email_subject,"Subject"], true, false);
spectra_cljs.table.person_link = (function spectra_cljs$table$person_link(person,attr){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.util.node_link,(function (){var temp__4655__auto__ = spectra_cljs.util.get_first.call(null,person,attr);
if(cljs.core.truth_(temp__4655__auto__)){
var name = temp__4655__auto__;
return name;
} else {
return "(No name)";
}
})(),person.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),spectra_cljc.schema.person], null);
});
spectra_cljs.table.new_entity_switch = (function spectra_cljs$table$new_entity_switch(type){
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input-meta","input-meta",623357967),new cljs.core.Keyword(null,"type","type",1174270348)], null),type);

spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input-meta","input-meta",623357967),new cljs.core.Keyword(null,"attr-list","attr-list",-231339907)], null),type.call(null,spectra_cljs.table.entity_attrs));

var seq__24962_24966 = cljs.core.seq.call(null,type.call(null,spectra_cljs.table.entity_attrs));
var chunk__24963_24967 = null;
var count__24964_24968 = (0);
var i__24965_24969 = (0);
while(true){
if((i__24965_24969 < count__24964_24968)){
var attr_24970 = cljs.core._nth.call(null,chunk__24963_24967,i__24965_24969);
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974),attr_24970], null),new cljs.core.PersistentArrayMap(null, 1, [(0),""], null));

var G__24971 = seq__24962_24966;
var G__24972 = chunk__24963_24967;
var G__24973 = count__24964_24968;
var G__24974 = (i__24965_24969 + (1));
seq__24962_24966 = G__24971;
chunk__24963_24967 = G__24972;
count__24964_24968 = G__24973;
i__24965_24969 = G__24974;
continue;
} else {
var temp__4657__auto___24975 = cljs.core.seq.call(null,seq__24962_24966);
if(temp__4657__auto___24975){
var seq__24962_24976__$1 = temp__4657__auto___24975;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__24962_24976__$1)){
var c__27319__auto___24977 = cljs.core.chunk_first.call(null,seq__24962_24976__$1);
var G__24978 = cljs.core.chunk_rest.call(null,seq__24962_24976__$1);
var G__24979 = c__27319__auto___24977;
var G__24980 = cljs.core.count.call(null,c__27319__auto___24977);
var G__24981 = (0);
seq__24962_24966 = G__24978;
chunk__24963_24967 = G__24979;
count__24964_24968 = G__24980;
i__24965_24969 = G__24981;
continue;
} else {
var attr_24982 = cljs.core.first.call(null,seq__24962_24976__$1);
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974),attr_24982], null),new cljs.core.PersistentArrayMap(null, 1, [(0),""], null));

var G__24983 = cljs.core.next.call(null,seq__24962_24976__$1);
var G__24984 = null;
var G__24985 = (0);
var G__24986 = (0);
seq__24962_24966 = G__24983;
chunk__24963_24967 = G__24984;
count__24964_24968 = G__24985;
i__24965_24969 = G__24986;
continue;
}
} else {
}
}
break;
}

return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tabid","tabid",-720881418)], null),(7));
});
spectra_cljs.table.person_site = (function spectra_cljs$table$person_site(person,attr){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"href","href",-793805698),spectra_cljs.util.get_first.call(null,person,attr)], null),spectra_cljs.util.get_first.call(null,person,attr)], null);
});
spectra_cljs.table.person_cell = (function spectra_cljs$table$person_cell(person,attr){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),(function (){var pred__24990 = cljs.core._EQ_;
var expr__24991 = attr;
if(cljs.core.truth_(pred__24990.call(null,spectra_cljc.schema.s_name,expr__24991))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_link,person,attr], null);
} else {
if(cljs.core.truth_(pred__24990.call(null,spectra_cljc.schema.website,expr__24991))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_site,person,attr], null);
} else {
return spectra_cljs.util.get_first.call(null,person,attr);
}
}
})()], null);
});
spectra_cljs.table.person_row = (function spectra_cljs$table$person_row(person){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27292__auto__ = (function spectra_cljs$table$person_row_$_iter__24997(s__24998){
return (new cljs.core.LazySeq(null,(function (){
var s__24998__$1 = s__24998;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__24998__$1);
if(temp__4657__auto__){
var s__24998__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__24998__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__24998__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__25000 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__24999 = (0);
while(true){
if((i__24999 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__24999);
cljs.core.chunk_append.call(null,b__25000,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_cell,person,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__25001 = (i__24999 + (1));
i__24999 = G__25001;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25000),spectra_cljs$table$person_row_$_iter__24997.call(null,cljs.core.chunk_rest.call(null,s__24998__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25000),null);
}
} else {
var attr = cljs.core.first.call(null,s__24998__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_cell,person,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$person_row_$_iter__24997.call(null,cljs.core.rest.call(null,s__24998__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljc.schema.person.call(null,spectra_cljs.table.entity_attrs)));
})()], null);
});
spectra_cljs.table.prev_next_box = (function spectra_cljs$table$prev_next_box(counter,update_fn,num_rows,row_type){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.prev-next","div.prev-next",-1078656250),(((spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"counters","counters",33475982),counter) > (0)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),spectra_cljs.update.prev_fetch_BANG_.call(null,counter,update_fn),new cljs.core.Keyword(null,"class","class",-2030961996),"prev-email-page pure-button"], null),"<-- Previous"], null):null),((cljs.core._EQ_.call(null,num_rows,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"page-lengths","page-lengths",-746189067),row_type)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),spectra_cljs.update.next_fetch_BANG_.call(null,counter,update_fn),new cljs.core.Keyword(null,"class","class",-2030961996),"next-email-page pure-button"], null),"Next -->"], null):null)], null);
});
spectra_cljs.table.people_table = (function spectra_cljs$table$people_table(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.prev_next_box,new cljs.core.Keyword(null,"people","people",1443537404),spectra_cljs.update.update_people_BANG_,cljs.core.count.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"people-rows","people-rows",1287247959))),new cljs.core.Keyword(null,"people","people",1443537404)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return spectra_cljs.table.new_entity_switch.call(null,spectra_cljc.schema.person);
}),new cljs.core.Keyword(null,"id","id",-1388402092),"add-new-person",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-button"], null),"Add new person"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),(cljs.core.truth_(spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"loading","loading",-737050189)))?"  (Loading...)":"")], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-table",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-table pure-table-horizontal"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-header"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27292__auto__ = (function spectra_cljs$table$people_table_$_iter__25010(s__25011){
return (new cljs.core.LazySeq(null,(function (){
var s__25011__$1 = s__25011;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__25011__$1);
if(temp__4657__auto__){
var s__25011__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__25011__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__25011__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__25013 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__25012 = (0);
while(true){
if((i__25012 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__25012);
cljs.core.chunk_append.call(null,b__25013,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.get.call(null,spectra_cljc.schema.attr_names,cljs.core.second.call(null,attr))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__25018 = (i__25012 + (1));
i__25012 = G__25018;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25013),spectra_cljs$table$people_table_$_iter__25010.call(null,cljs.core.chunk_rest.call(null,s__25011__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25013),null);
}
} else {
var attr = cljs.core.first.call(null,s__25011__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.get.call(null,spectra_cljc.schema.attr_names,cljs.core.second.call(null,attr))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$people_table_$_iter__25010.call(null,cljs.core.rest.call(null,s__25011__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljc.schema.person.call(null,spectra_cljs.table.entity_attrs)));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-rows"], null),(function (){var iter__27292__auto__ = (function spectra_cljs$table$people_table_$_iter__25014(s__25015){
return (new cljs.core.LazySeq(null,(function (){
var s__25015__$1 = s__25015;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__25015__$1);
if(temp__4657__auto__){
var s__25015__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__25015__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__25015__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__25017 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__25016 = (0);
while(true){
if((i__25016 < size__27291__auto__)){
var p_row = cljs.core._nth.call(null,c__27290__auto__,i__25016);
cljs.core.chunk_append.call(null,b__25017,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_row,cljs.core.second.call(null,p_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,p_row)], null)));

var G__25019 = (i__25016 + (1));
i__25016 = G__25019;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25017),spectra_cljs$table$people_table_$_iter__25014.call(null,cljs.core.chunk_rest.call(null,s__25015__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25017),null);
}
} else {
var p_row = cljs.core.first.call(null,s__25015__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_row,cljs.core.second.call(null,p_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,p_row)], null)),spectra_cljs$table$people_table_$_iter__25014.call(null,cljs.core.rest.call(null,s__25015__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"people-rows","people-rows",1287247959))));
})()], null)], null)], null);
});
spectra_cljs.table.email_link = (function spectra_cljs$table$email_link(email,attr){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.util.node_link,cljs.core.ffirst.call(null,cljs.core.sort_by.call(null,cljs.core.second,cljs.core._GT_,attr.call(null,email))),email.call(null,new cljs.core.Keyword(null,"id","id",-1388402092)),spectra_cljc.schema.email], null);
});
spectra_cljs.table.email_cell = (function spectra_cljs$table$email_cell(email,attr){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),((cljs.core._EQ_.call(null,spectra_cljc.schema.email_subject,attr))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_link,email,attr], null):(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([attr], true),spectra_cljc.schema.date_times))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.util.date_display,spectra_cljs.util.get_first.call(null,email,attr)], null):spectra_cljs.util.get_first.call(null,email,attr)
))], null);
});
spectra_cljs.table.email_row = (function spectra_cljs$table$email_row(email){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27292__auto__ = (function spectra_cljs$table$email_row_$_iter__25024(s__25025){
return (new cljs.core.LazySeq(null,(function (){
var s__25025__$1 = s__25025;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__25025__$1);
if(temp__4657__auto__){
var s__25025__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__25025__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__25025__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__25027 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__25026 = (0);
while(true){
if((i__25026 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__25026);
cljs.core.chunk_append.call(null,b__25027,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_cell,email,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__25028 = (i__25026 + (1));
i__25026 = G__25028;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25027),spectra_cljs$table$email_row_$_iter__25024.call(null,cljs.core.chunk_rest.call(null,s__25025__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25027),null);
}
} else {
var attr = cljs.core.first.call(null,s__25025__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_cell,email,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$email_row_$_iter__25024.call(null,cljs.core.rest.call(null,s__25025__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,cljs.core.keys.call(null,spectra_cljs.table.email_attrs)));
})()], null);
});
spectra_cljs.table.email_table = (function spectra_cljs$table$email_table(row_keys,counter,update_fn){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.prev_next_box,counter,update_fn,cljs.core.count.call(null,cljs.core.apply.call(null,spectra_cljs.state.look,row_keys)),new cljs.core.Keyword(null,"email","email",1415816706)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-table",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-table pure-table-horizontal"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-header"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27292__auto__ = (function spectra_cljs$table$email_table_$_iter__25037(s__25038){
return (new cljs.core.LazySeq(null,(function (){
var s__25038__$1 = s__25038;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__25038__$1);
if(temp__4657__auto__){
var s__25038__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__25038__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__25038__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__25040 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__25039 = (0);
while(true){
if((i__25039 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__25039);
cljs.core.chunk_append.call(null,b__25040,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__25045 = (i__25039 + (1));
i__25039 = G__25045;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25040),spectra_cljs$table$email_table_$_iter__25037.call(null,cljs.core.chunk_rest.call(null,s__25038__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25040),null);
}
} else {
var attr = cljs.core.first.call(null,s__25038__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$email_table_$_iter__25037.call(null,cljs.core.rest.call(null,s__25038__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljs.table.email_attrs));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-rows"], null),(function (){var iter__27292__auto__ = (function spectra_cljs$table$email_table_$_iter__25041(s__25042){
return (new cljs.core.LazySeq(null,(function (){
var s__25042__$1 = s__25042;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__25042__$1);
if(temp__4657__auto__){
var s__25042__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__25042__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__25042__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__25044 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__25043 = (0);
while(true){
if((i__25043 < size__27291__auto__)){
var e_row = cljs.core._nth.call(null,c__27290__auto__,i__25043);
cljs.core.chunk_append.call(null,b__25044,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_row,cljs.core.second.call(null,e_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,e_row)], null)));

var G__25046 = (i__25043 + (1));
i__25043 = G__25046;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25044),spectra_cljs$table$email_table_$_iter__25041.call(null,cljs.core.chunk_rest.call(null,s__25042__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__25044),null);
}
} else {
var e_row = cljs.core.first.call(null,s__25042__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_row,cljs.core.second.call(null,e_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,e_row)], null)),spectra_cljs$table$email_table_$_iter__25041.call(null,cljs.core.rest.call(null,s__25042__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,cljs.core.apply.call(null,spectra_cljs.state.look,row_keys)));
})()], null)], null)], null);
});

//# sourceMappingURL=table.js.map?rel=1468803654515