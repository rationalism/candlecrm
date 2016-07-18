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

var seq__17545_17549 = cljs.core.seq.call(null,type.call(null,spectra_cljs.table.entity_attrs));
var chunk__17546_17550 = null;
var count__17547_17551 = (0);
var i__17548_17552 = (0);
while(true){
if((i__17548_17552 < count__17547_17551)){
var attr_17553 = cljs.core._nth.call(null,chunk__17546_17550,i__17548_17552);
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974),attr_17553], null),new cljs.core.PersistentArrayMap(null, 1, [(0),""], null));

var G__17554 = seq__17545_17549;
var G__17555 = chunk__17546_17550;
var G__17556 = count__17547_17551;
var G__17557 = (i__17548_17552 + (1));
seq__17545_17549 = G__17554;
chunk__17546_17550 = G__17555;
count__17547_17551 = G__17556;
i__17548_17552 = G__17557;
continue;
} else {
var temp__4657__auto___17558 = cljs.core.seq.call(null,seq__17545_17549);
if(temp__4657__auto___17558){
var seq__17545_17559__$1 = temp__4657__auto___17558;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__17545_17559__$1)){
var c__27319__auto___17560 = cljs.core.chunk_first.call(null,seq__17545_17559__$1);
var G__17561 = cljs.core.chunk_rest.call(null,seq__17545_17559__$1);
var G__17562 = c__27319__auto___17560;
var G__17563 = cljs.core.count.call(null,c__27319__auto___17560);
var G__17564 = (0);
seq__17545_17549 = G__17561;
chunk__17546_17550 = G__17562;
count__17547_17551 = G__17563;
i__17548_17552 = G__17564;
continue;
} else {
var attr_17565 = cljs.core.first.call(null,seq__17545_17559__$1);
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974),attr_17565], null),new cljs.core.PersistentArrayMap(null, 1, [(0),""], null));

var G__17566 = cljs.core.next.call(null,seq__17545_17559__$1);
var G__17567 = null;
var G__17568 = (0);
var G__17569 = (0);
seq__17545_17549 = G__17566;
chunk__17546_17550 = G__17567;
count__17547_17551 = G__17568;
i__17548_17552 = G__17569;
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),(function (){var pred__17573 = cljs.core._EQ_;
var expr__17574 = attr;
if(cljs.core.truth_(pred__17573.call(null,spectra_cljc.schema.s_name,expr__17574))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_link,person,attr], null);
} else {
if(cljs.core.truth_(pred__17573.call(null,spectra_cljc.schema.website,expr__17574))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_site,person,attr], null);
} else {
return spectra_cljs.util.get_first.call(null,person,attr);
}
}
})()], null);
});
spectra_cljs.table.person_row = (function spectra_cljs$table$person_row(person){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27292__auto__ = (function spectra_cljs$table$person_row_$_iter__17580(s__17581){
return (new cljs.core.LazySeq(null,(function (){
var s__17581__$1 = s__17581;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__17581__$1);
if(temp__4657__auto__){
var s__17581__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__17581__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__17581__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__17583 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__17582 = (0);
while(true){
if((i__17582 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__17582);
cljs.core.chunk_append.call(null,b__17583,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_cell,person,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__17584 = (i__17582 + (1));
i__17582 = G__17584;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17583),spectra_cljs$table$person_row_$_iter__17580.call(null,cljs.core.chunk_rest.call(null,s__17581__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17583),null);
}
} else {
var attr = cljs.core.first.call(null,s__17581__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_cell,person,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$person_row_$_iter__17580.call(null,cljs.core.rest.call(null,s__17581__$2)));
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
}),new cljs.core.Keyword(null,"id","id",-1388402092),"add-new-person",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-button"], null),"Add new person"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),(cljs.core.truth_(spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"loading","loading",-737050189)))?"  (Loading...)":"")], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-table",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-table pure-table-horizontal"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-header"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27292__auto__ = (function spectra_cljs$table$people_table_$_iter__17593(s__17594){
return (new cljs.core.LazySeq(null,(function (){
var s__17594__$1 = s__17594;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__17594__$1);
if(temp__4657__auto__){
var s__17594__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__17594__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__17594__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__17596 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__17595 = (0);
while(true){
if((i__17595 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__17595);
cljs.core.chunk_append.call(null,b__17596,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.get.call(null,spectra_cljc.schema.attr_names,cljs.core.second.call(null,attr))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__17601 = (i__17595 + (1));
i__17595 = G__17601;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17596),spectra_cljs$table$people_table_$_iter__17593.call(null,cljs.core.chunk_rest.call(null,s__17594__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17596),null);
}
} else {
var attr = cljs.core.first.call(null,s__17594__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.get.call(null,spectra_cljc.schema.attr_names,cljs.core.second.call(null,attr))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$people_table_$_iter__17593.call(null,cljs.core.rest.call(null,s__17594__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljc.schema.person.call(null,spectra_cljs.table.entity_attrs)));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-rows"], null),(function (){var iter__27292__auto__ = (function spectra_cljs$table$people_table_$_iter__17597(s__17598){
return (new cljs.core.LazySeq(null,(function (){
var s__17598__$1 = s__17598;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__17598__$1);
if(temp__4657__auto__){
var s__17598__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__17598__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__17598__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__17600 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__17599 = (0);
while(true){
if((i__17599 < size__27291__auto__)){
var p_row = cljs.core._nth.call(null,c__27290__auto__,i__17599);
cljs.core.chunk_append.call(null,b__17600,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_row,cljs.core.second.call(null,p_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,p_row)], null)));

var G__17602 = (i__17599 + (1));
i__17599 = G__17602;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17600),spectra_cljs$table$people_table_$_iter__17597.call(null,cljs.core.chunk_rest.call(null,s__17598__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17600),null);
}
} else {
var p_row = cljs.core.first.call(null,s__17598__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_row,cljs.core.second.call(null,p_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,p_row)], null)),spectra_cljs$table$people_table_$_iter__17597.call(null,cljs.core.rest.call(null,s__17598__$2)));
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27292__auto__ = (function spectra_cljs$table$email_row_$_iter__17607(s__17608){
return (new cljs.core.LazySeq(null,(function (){
var s__17608__$1 = s__17608;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__17608__$1);
if(temp__4657__auto__){
var s__17608__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__17608__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__17608__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__17610 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__17609 = (0);
while(true){
if((i__17609 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__17609);
cljs.core.chunk_append.call(null,b__17610,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_cell,email,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__17611 = (i__17609 + (1));
i__17609 = G__17611;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17610),spectra_cljs$table$email_row_$_iter__17607.call(null,cljs.core.chunk_rest.call(null,s__17608__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17610),null);
}
} else {
var attr = cljs.core.first.call(null,s__17608__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_cell,email,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$email_row_$_iter__17607.call(null,cljs.core.rest.call(null,s__17608__$2)));
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
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.prev_next_box,counter,update_fn,cljs.core.count.call(null,cljs.core.apply.call(null,spectra_cljs.state.look,row_keys)),new cljs.core.Keyword(null,"email","email",1415816706)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-table",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-table pure-table-horizontal"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-header"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__27292__auto__ = (function spectra_cljs$table$email_table_$_iter__17620(s__17621){
return (new cljs.core.LazySeq(null,(function (){
var s__17621__$1 = s__17621;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__17621__$1);
if(temp__4657__auto__){
var s__17621__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__17621__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__17621__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__17623 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__17622 = (0);
while(true){
if((i__17622 < size__27291__auto__)){
var attr = cljs.core._nth.call(null,c__27290__auto__,i__17622);
cljs.core.chunk_append.call(null,b__17623,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__17628 = (i__17622 + (1));
i__17622 = G__17628;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17623),spectra_cljs$table$email_table_$_iter__17620.call(null,cljs.core.chunk_rest.call(null,s__17621__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17623),null);
}
} else {
var attr = cljs.core.first.call(null,s__17621__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$email_table_$_iter__17620.call(null,cljs.core.rest.call(null,s__17621__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljs.table.email_attrs));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-rows"], null),(function (){var iter__27292__auto__ = (function spectra_cljs$table$email_table_$_iter__17624(s__17625){
return (new cljs.core.LazySeq(null,(function (){
var s__17625__$1 = s__17625;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__17625__$1);
if(temp__4657__auto__){
var s__17625__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__17625__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__17625__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__17627 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__17626 = (0);
while(true){
if((i__17626 < size__27291__auto__)){
var e_row = cljs.core._nth.call(null,c__27290__auto__,i__17626);
cljs.core.chunk_append.call(null,b__17627,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_row,cljs.core.second.call(null,e_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,e_row)], null)));

var G__17629 = (i__17626 + (1));
i__17626 = G__17629;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17627),spectra_cljs$table$email_table_$_iter__17624.call(null,cljs.core.chunk_rest.call(null,s__17625__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__17627),null);
}
} else {
var e_row = cljs.core.first.call(null,s__17625__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_row,cljs.core.second.call(null,e_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,e_row)], null)),spectra_cljs$table$email_table_$_iter__17624.call(null,cljs.core.rest.call(null,s__17625__$2)));
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

//# sourceMappingURL=table.js.map?rel=1468801589416