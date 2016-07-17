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

var seq__7085_7089 = cljs.core.seq.call(null,type.call(null,spectra_cljs.table.entity_attrs));
var chunk__7086_7090 = null;
var count__7087_7091 = (0);
var i__7088_7092 = (0);
while(true){
if((i__7088_7092 < count__7087_7091)){
var attr_7093 = cljs.core._nth.call(null,chunk__7086_7090,i__7088_7092);
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974),attr_7093], null),new cljs.core.PersistentArrayMap(null, 1, [(0),""], null));

var G__7094 = seq__7085_7089;
var G__7095 = chunk__7086_7090;
var G__7096 = count__7087_7091;
var G__7097 = (i__7088_7092 + (1));
seq__7085_7089 = G__7094;
chunk__7086_7090 = G__7095;
count__7087_7091 = G__7096;
i__7088_7092 = G__7097;
continue;
} else {
var temp__4657__auto___7098 = cljs.core.seq.call(null,seq__7085_7089);
if(temp__4657__auto___7098){
var seq__7085_7099__$1 = temp__4657__auto___7098;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7085_7099__$1)){
var c__27200__auto___7100 = cljs.core.chunk_first.call(null,seq__7085_7099__$1);
var G__7101 = cljs.core.chunk_rest.call(null,seq__7085_7099__$1);
var G__7102 = c__27200__auto___7100;
var G__7103 = cljs.core.count.call(null,c__27200__auto___7100);
var G__7104 = (0);
seq__7085_7089 = G__7101;
chunk__7086_7090 = G__7102;
count__7087_7091 = G__7103;
i__7088_7092 = G__7104;
continue;
} else {
var attr_7105 = cljs.core.first.call(null,seq__7085_7099__$1);
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974),attr_7105], null),new cljs.core.PersistentArrayMap(null, 1, [(0),""], null));

var G__7106 = cljs.core.next.call(null,seq__7085_7099__$1);
var G__7107 = null;
var G__7108 = (0);
var G__7109 = (0);
seq__7085_7089 = G__7106;
chunk__7086_7090 = G__7107;
count__7087_7091 = G__7108;
i__7088_7092 = G__7109;
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),(function (){var pred__7113 = cljs.core._EQ_;
var expr__7114 = attr;
if(cljs.core.truth_(pred__7113.call(null,spectra_cljc.schema.s_name,expr__7114))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_link,person,attr], null);
} else {
if(cljs.core.truth_(pred__7113.call(null,spectra_cljc.schema.website,expr__7114))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_site,person,attr], null);
} else {
return spectra_cljs.util.get_first.call(null,person,attr);
}
}
})()], null);
});
spectra_cljs.table.person_row = (function spectra_cljs$table$person_row(person){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27173__auto__ = (function spectra_cljs$table$person_row_$_iter__7120(s__7121){
return (new cljs.core.LazySeq(null,(function (){
var s__7121__$1 = s__7121;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__7121__$1);
if(temp__4657__auto__){
var s__7121__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__7121__$2)){
var c__27171__auto__ = cljs.core.chunk_first.call(null,s__7121__$2);
var size__27172__auto__ = cljs.core.count.call(null,c__27171__auto__);
var b__7123 = cljs.core.chunk_buffer.call(null,size__27172__auto__);
if((function (){var i__7122 = (0);
while(true){
if((i__7122 < size__27172__auto__)){
var attr = cljs.core._nth.call(null,c__27171__auto__,i__7122);
cljs.core.chunk_append.call(null,b__7123,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_cell,person,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__7124 = (i__7122 + (1));
i__7122 = G__7124;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7123),spectra_cljs$table$person_row_$_iter__7120.call(null,cljs.core.chunk_rest.call(null,s__7121__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7123),null);
}
} else {
var attr = cljs.core.first.call(null,s__7121__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_cell,person,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$person_row_$_iter__7120.call(null,cljs.core.rest.call(null,s__7121__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27173__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljc.schema.person.call(null,spectra_cljs.table.entity_attrs)));
})()], null);
});
spectra_cljs.table.prev_next_box = (function spectra_cljs$table$prev_next_box(counter,update_fn,num_rows,row_type){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.prev-next","div.prev-next",-1078656250),(((spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"counters","counters",33475982),counter) > (0)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),spectra_cljs.update.prev_fetch_BANG_.call(null,counter,update_fn),new cljs.core.Keyword(null,"class","class",-2030961996),"prev-email-page pure-button"], null),"<-- Previous"], null):null),((cljs.core._EQ_.call(null,num_rows,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"page-lengths","page-lengths",-746189067),row_type)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),spectra_cljs.update.next_fetch_BANG_.call(null,counter,update_fn),new cljs.core.Keyword(null,"class","class",-2030961996),"next-email-page pure-button"], null),"Next -->"], null):null)], null);
});
spectra_cljs.table.people_table = (function spectra_cljs$table$people_table(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.prev_next_box,new cljs.core.Keyword(null,"people","people",1443537404),spectra_cljs.update.update_people_BANG_,cljs.core.count.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"people-rows","people-rows",1287247959))),new cljs.core.Keyword(null,"people","people",1443537404)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return spectra_cljs.table.new_entity_switch.call(null,spectra_cljc.schema.person);
}),new cljs.core.Keyword(null,"id","id",-1388402092),"add-new-person",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-button"], null),"Add new person"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),(cljs.core.truth_(spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"loading","loading",-737050189)))?"  (Loading...)":"")], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-table",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-table pure-table-horizontal"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-header"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27173__auto__ = (function spectra_cljs$table$people_table_$_iter__7133(s__7134){
return (new cljs.core.LazySeq(null,(function (){
var s__7134__$1 = s__7134;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__7134__$1);
if(temp__4657__auto__){
var s__7134__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__7134__$2)){
var c__27171__auto__ = cljs.core.chunk_first.call(null,s__7134__$2);
var size__27172__auto__ = cljs.core.count.call(null,c__27171__auto__);
var b__7136 = cljs.core.chunk_buffer.call(null,size__27172__auto__);
if((function (){var i__7135 = (0);
while(true){
if((i__7135 < size__27172__auto__)){
var attr = cljs.core._nth.call(null,c__27171__auto__,i__7135);
cljs.core.chunk_append.call(null,b__7136,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.get.call(null,spectra_cljc.schema.attr_names,cljs.core.second.call(null,attr))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__7141 = (i__7135 + (1));
i__7135 = G__7141;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7136),spectra_cljs$table$people_table_$_iter__7133.call(null,cljs.core.chunk_rest.call(null,s__7134__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7136),null);
}
} else {
var attr = cljs.core.first.call(null,s__7134__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.get.call(null,spectra_cljc.schema.attr_names,cljs.core.second.call(null,attr))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$people_table_$_iter__7133.call(null,cljs.core.rest.call(null,s__7134__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27173__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljc.schema.person.call(null,spectra_cljs.table.entity_attrs)));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-rows"], null),(function (){var iter__27173__auto__ = (function spectra_cljs$table$people_table_$_iter__7137(s__7138){
return (new cljs.core.LazySeq(null,(function (){
var s__7138__$1 = s__7138;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__7138__$1);
if(temp__4657__auto__){
var s__7138__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__7138__$2)){
var c__27171__auto__ = cljs.core.chunk_first.call(null,s__7138__$2);
var size__27172__auto__ = cljs.core.count.call(null,c__27171__auto__);
var b__7140 = cljs.core.chunk_buffer.call(null,size__27172__auto__);
if((function (){var i__7139 = (0);
while(true){
if((i__7139 < size__27172__auto__)){
var p_row = cljs.core._nth.call(null,c__27171__auto__,i__7139);
cljs.core.chunk_append.call(null,b__7140,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_row,cljs.core.second.call(null,p_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,p_row)], null)));

var G__7142 = (i__7139 + (1));
i__7139 = G__7142;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7140),spectra_cljs$table$people_table_$_iter__7137.call(null,cljs.core.chunk_rest.call(null,s__7138__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7140),null);
}
} else {
var p_row = cljs.core.first.call(null,s__7138__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_row,cljs.core.second.call(null,p_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,p_row)], null)),spectra_cljs$table$people_table_$_iter__7137.call(null,cljs.core.rest.call(null,s__7138__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27173__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"people-rows","people-rows",1287247959))));
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27173__auto__ = (function spectra_cljs$table$email_row_$_iter__7147(s__7148){
return (new cljs.core.LazySeq(null,(function (){
var s__7148__$1 = s__7148;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__7148__$1);
if(temp__4657__auto__){
var s__7148__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__7148__$2)){
var c__27171__auto__ = cljs.core.chunk_first.call(null,s__7148__$2);
var size__27172__auto__ = cljs.core.count.call(null,c__27171__auto__);
var b__7150 = cljs.core.chunk_buffer.call(null,size__27172__auto__);
if((function (){var i__7149 = (0);
while(true){
if((i__7149 < size__27172__auto__)){
var attr = cljs.core._nth.call(null,c__27171__auto__,i__7149);
cljs.core.chunk_append.call(null,b__7150,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_cell,email,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__7151 = (i__7149 + (1));
i__7149 = G__7151;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7150),spectra_cljs$table$email_row_$_iter__7147.call(null,cljs.core.chunk_rest.call(null,s__7148__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7150),null);
}
} else {
var attr = cljs.core.first.call(null,s__7148__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_cell,email,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$email_row_$_iter__7147.call(null,cljs.core.rest.call(null,s__7148__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27173__auto__.call(null,spectra_cljs.util.add_ids.call(null,cljs.core.keys.call(null,spectra_cljs.table.email_attrs)));
})()], null);
});
spectra_cljs.table.email_table = (function spectra_cljs$table$email_table(row_keys,counter,update_fn){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.prev_next_box,counter,update_fn,cljs.core.count.call(null,cljs.core.apply.call(null,spectra_cljs.state.look,row_keys)),new cljs.core.Keyword(null,"email","email",1415816706)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-table",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-table pure-table-horizontal"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-header"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27173__auto__ = (function spectra_cljs$table$email_table_$_iter__7160(s__7161){
return (new cljs.core.LazySeq(null,(function (){
var s__7161__$1 = s__7161;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__7161__$1);
if(temp__4657__auto__){
var s__7161__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__7161__$2)){
var c__27171__auto__ = cljs.core.chunk_first.call(null,s__7161__$2);
var size__27172__auto__ = cljs.core.count.call(null,c__27171__auto__);
var b__7163 = cljs.core.chunk_buffer.call(null,size__27172__auto__);
if((function (){var i__7162 = (0);
while(true){
if((i__7162 < size__27172__auto__)){
var attr = cljs.core._nth.call(null,c__27171__auto__,i__7162);
cljs.core.chunk_append.call(null,b__7163,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__7168 = (i__7162 + (1));
i__7162 = G__7168;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7163),spectra_cljs$table$email_table_$_iter__7160.call(null,cljs.core.chunk_rest.call(null,s__7161__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7163),null);
}
} else {
var attr = cljs.core.first.call(null,s__7161__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$email_table_$_iter__7160.call(null,cljs.core.rest.call(null,s__7161__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27173__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljs.table.email_attrs));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-rows"], null),(function (){var iter__27173__auto__ = (function spectra_cljs$table$email_table_$_iter__7164(s__7165){
return (new cljs.core.LazySeq(null,(function (){
var s__7165__$1 = s__7165;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__7165__$1);
if(temp__4657__auto__){
var s__7165__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__7165__$2)){
var c__27171__auto__ = cljs.core.chunk_first.call(null,s__7165__$2);
var size__27172__auto__ = cljs.core.count.call(null,c__27171__auto__);
var b__7167 = cljs.core.chunk_buffer.call(null,size__27172__auto__);
if((function (){var i__7166 = (0);
while(true){
if((i__7166 < size__27172__auto__)){
var e_row = cljs.core._nth.call(null,c__27171__auto__,i__7166);
cljs.core.chunk_append.call(null,b__7167,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_row,cljs.core.second.call(null,e_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,e_row)], null)));

var G__7169 = (i__7166 + (1));
i__7166 = G__7169;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7167),spectra_cljs$table$email_table_$_iter__7164.call(null,cljs.core.chunk_rest.call(null,s__7165__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__7167),null);
}
} else {
var e_row = cljs.core.first.call(null,s__7165__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_row,cljs.core.second.call(null,e_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,e_row)], null)),spectra_cljs$table$email_table_$_iter__7164.call(null,cljs.core.rest.call(null,s__7165__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27173__auto__.call(null,spectra_cljs.util.add_ids.call(null,cljs.core.apply.call(null,spectra_cljs.state.look,row_keys)));
})()], null)], null)], null);
});

//# sourceMappingURL=table.js.map?rel=1468744497683