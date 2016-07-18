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

var seq__23455_23459 = cljs.core.seq.call(null,type.call(null,spectra_cljs.table.entity_attrs));
var chunk__23456_23460 = null;
var count__23457_23461 = (0);
var i__23458_23462 = (0);
while(true){
if((i__23458_23462 < count__23457_23461)){
var attr_23463 = cljs.core._nth.call(null,chunk__23456_23460,i__23458_23462);
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974),attr_23463], null),new cljs.core.PersistentArrayMap(null, 1, [(0),""], null));

var G__23464 = seq__23455_23459;
var G__23465 = chunk__23456_23460;
var G__23466 = count__23457_23461;
var G__23467 = (i__23458_23462 + (1));
seq__23455_23459 = G__23464;
chunk__23456_23460 = G__23465;
count__23457_23461 = G__23466;
i__23458_23462 = G__23467;
continue;
} else {
var temp__4657__auto___23468 = cljs.core.seq.call(null,seq__23455_23459);
if(temp__4657__auto___23468){
var seq__23455_23469__$1 = temp__4657__auto___23468;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__23455_23469__$1)){
var c__27319__auto___23470 = cljs.core.chunk_first.call(null,seq__23455_23469__$1);
var G__23471 = cljs.core.chunk_rest.call(null,seq__23455_23469__$1);
var G__23472 = c__27319__auto___23470;
var G__23473 = cljs.core.count.call(null,c__27319__auto___23470);
var G__23474 = (0);
seq__23455_23459 = G__23471;
chunk__23456_23460 = G__23472;
count__23457_23461 = G__23473;
i__23458_23462 = G__23474;
continue;
} else {
var attr_23475 = cljs.core.first.call(null,seq__23455_23469__$1);
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974),attr_23475], null),new cljs.core.PersistentArrayMap(null, 1, [(0),""], null));

var G__23476 = cljs.core.next.call(null,seq__23455_23469__$1);
var G__23477 = null;
var G__23478 = (0);
var G__23479 = (0);
seq__23455_23459 = G__23476;
chunk__23456_23460 = G__23477;
count__23457_23461 = G__23478;
i__23458_23462 = G__23479;
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),(function (){var pred__23483 = cljs.core._EQ_;
var expr__23484 = attr;
if(cljs.core.truth_(pred__23483.call(null,spectra_cljc.schema.s_name,expr__23484))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_link,person,attr], null);
} else {
if(cljs.core.truth_(pred__23483.call(null,spectra_cljc.schema.website,expr__23484))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_site,person,attr], null);
} else {
return spectra_cljs.util.get_first.call(null,person,attr);
}
}
})()], null);
});
spectra_cljs.table.person_row = (function spectra_cljs$table$person_row(person){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27292__auto__ = (function spectra_cljs$table$person_row_$_iter__23490(s__23491){
return (new cljs.core.LazySeq(null,(function (){
var s__23491__$1 = s__23491;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__23491__$1);
if(temp__4657__auto__){
var s__23491__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__23491__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__23491__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__23493 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__23492 = (0);
while(true){
if((i__23492 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__23492);
cljs.core.chunk_append.call(null,b__23493,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_cell,person,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__23494 = (i__23492 + (1));
i__23492 = G__23494;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23493),spectra_cljs$table$person_row_$_iter__23490.call(null,cljs.core.chunk_rest.call(null,s__23491__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23493),null);
}
} else {
var attr = cljs.core.first.call(null,s__23491__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_cell,person,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$person_row_$_iter__23490.call(null,cljs.core.rest.call(null,s__23491__$2)));
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
}),new cljs.core.Keyword(null,"id","id",-1388402092),"add-new-person",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-button"], null),"Add new person"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),(cljs.core.truth_(spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"loading","loading",-737050189)))?"  (Loading...)":"")], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-table",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-table pure-table-horizontal"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-header"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27292__auto__ = (function spectra_cljs$table$people_table_$_iter__23503(s__23504){
return (new cljs.core.LazySeq(null,(function (){
var s__23504__$1 = s__23504;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__23504__$1);
if(temp__4657__auto__){
var s__23504__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__23504__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__23504__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__23506 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__23505 = (0);
while(true){
if((i__23505 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__23505);
cljs.core.chunk_append.call(null,b__23506,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.get.call(null,spectra_cljc.schema.attr_names,cljs.core.second.call(null,attr))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__23511 = (i__23505 + (1));
i__23505 = G__23511;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23506),spectra_cljs$table$people_table_$_iter__23503.call(null,cljs.core.chunk_rest.call(null,s__23504__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23506),null);
}
} else {
var attr = cljs.core.first.call(null,s__23504__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.get.call(null,spectra_cljc.schema.attr_names,cljs.core.second.call(null,attr))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$people_table_$_iter__23503.call(null,cljs.core.rest.call(null,s__23504__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljc.schema.person.call(null,spectra_cljs.table.entity_attrs)));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-rows"], null),(function (){var iter__27292__auto__ = (function spectra_cljs$table$people_table_$_iter__23507(s__23508){
return (new cljs.core.LazySeq(null,(function (){
var s__23508__$1 = s__23508;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__23508__$1);
if(temp__4657__auto__){
var s__23508__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__23508__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__23508__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__23510 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__23509 = (0);
while(true){
if((i__23509 < size__27291__auto__)){
var p_row = cljs.core._nth.call(null,c__27290__auto__,i__23509);
cljs.core.chunk_append.call(null,b__23510,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_row,cljs.core.second.call(null,p_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,p_row)], null)));

var G__23512 = (i__23509 + (1));
i__23509 = G__23512;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23510),spectra_cljs$table$people_table_$_iter__23507.call(null,cljs.core.chunk_rest.call(null,s__23508__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23510),null);
}
} else {
var p_row = cljs.core.first.call(null,s__23508__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_row,cljs.core.second.call(null,p_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,p_row)], null)),spectra_cljs$table$people_table_$_iter__23507.call(null,cljs.core.rest.call(null,s__23508__$2)));
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27292__auto__ = (function spectra_cljs$table$email_row_$_iter__23517(s__23518){
return (new cljs.core.LazySeq(null,(function (){
var s__23518__$1 = s__23518;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__23518__$1);
if(temp__4657__auto__){
var s__23518__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__23518__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__23518__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__23520 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__23519 = (0);
while(true){
if((i__23519 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__23519);
cljs.core.chunk_append.call(null,b__23520,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_cell,email,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__23521 = (i__23519 + (1));
i__23519 = G__23521;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23520),spectra_cljs$table$email_row_$_iter__23517.call(null,cljs.core.chunk_rest.call(null,s__23518__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23520),null);
}
} else {
var attr = cljs.core.first.call(null,s__23518__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_cell,email,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$email_row_$_iter__23517.call(null,cljs.core.rest.call(null,s__23518__$2)));
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
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.prev_next_box,counter,update_fn,cljs.core.count.call(null,cljs.core.apply.call(null,spectra_cljs.state.look,row_keys)),new cljs.core.Keyword(null,"email","email",1415816706)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-table",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-table pure-table-horizontal"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-header"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27292__auto__ = (function spectra_cljs$table$email_table_$_iter__23530(s__23531){
return (new cljs.core.LazySeq(null,(function (){
var s__23531__$1 = s__23531;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__23531__$1);
if(temp__4657__auto__){
var s__23531__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__23531__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__23531__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__23533 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__23532 = (0);
while(true){
if((i__23532 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__23532);
cljs.core.chunk_append.call(null,b__23533,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__23538 = (i__23532 + (1));
i__23532 = G__23538;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23533),spectra_cljs$table$email_table_$_iter__23530.call(null,cljs.core.chunk_rest.call(null,s__23531__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23533),null);
}
} else {
var attr = cljs.core.first.call(null,s__23531__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$email_table_$_iter__23530.call(null,cljs.core.rest.call(null,s__23531__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljs.table.email_attrs));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-rows"], null),(function (){var iter__27292__auto__ = (function spectra_cljs$table$email_table_$_iter__23534(s__23535){
return (new cljs.core.LazySeq(null,(function (){
var s__23535__$1 = s__23535;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__23535__$1);
if(temp__4657__auto__){
var s__23535__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__23535__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__23535__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__23537 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__23536 = (0);
while(true){
if((i__23536 < size__27291__auto__)){
var e_row = cljs.core._nth.call(null,c__27290__auto__,i__23536);
cljs.core.chunk_append.call(null,b__23537,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_row,cljs.core.second.call(null,e_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,e_row)], null)));

var G__23539 = (i__23536 + (1));
i__23536 = G__23539;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23537),spectra_cljs$table$email_table_$_iter__23534.call(null,cljs.core.chunk_rest.call(null,s__23535__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23537),null);
}
} else {
var e_row = cljs.core.first.call(null,s__23535__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_row,cljs.core.second.call(null,e_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,e_row)], null)),spectra_cljs$table$email_table_$_iter__23534.call(null,cljs.core.rest.call(null,s__23535__$2)));
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

//# sourceMappingURL=table.js.map?rel=1468803196557