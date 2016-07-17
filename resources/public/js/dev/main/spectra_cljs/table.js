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

var seq__8627_8631 = cljs.core.seq.call(null,type.call(null,spectra_cljs.table.entity_attrs));
var chunk__8628_8632 = null;
var count__8629_8633 = (0);
var i__8630_8634 = (0);
while(true){
if((i__8630_8634 < count__8629_8633)){
var attr_8635 = cljs.core._nth.call(null,chunk__8628_8632,i__8630_8634);
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974),attr_8635], null),new cljs.core.PersistentArrayMap(null, 1, [(0),""], null));

var G__8636 = seq__8627_8631;
var G__8637 = chunk__8628_8632;
var G__8638 = count__8629_8633;
var G__8639 = (i__8630_8634 + (1));
seq__8627_8631 = G__8636;
chunk__8628_8632 = G__8637;
count__8629_8633 = G__8638;
i__8630_8634 = G__8639;
continue;
} else {
var temp__4657__auto___8640 = cljs.core.seq.call(null,seq__8627_8631);
if(temp__4657__auto___8640){
var seq__8627_8641__$1 = temp__4657__auto___8640;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__8627_8641__$1)){
var c__7058__auto___8642 = cljs.core.chunk_first.call(null,seq__8627_8641__$1);
var G__8643 = cljs.core.chunk_rest.call(null,seq__8627_8641__$1);
var G__8644 = c__7058__auto___8642;
var G__8645 = cljs.core.count.call(null,c__7058__auto___8642);
var G__8646 = (0);
seq__8627_8631 = G__8643;
chunk__8628_8632 = G__8644;
count__8629_8633 = G__8645;
i__8630_8634 = G__8646;
continue;
} else {
var attr_8647 = cljs.core.first.call(null,seq__8627_8641__$1);
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974),attr_8647], null),new cljs.core.PersistentArrayMap(null, 1, [(0),""], null));

var G__8648 = cljs.core.next.call(null,seq__8627_8641__$1);
var G__8649 = null;
var G__8650 = (0);
var G__8651 = (0);
seq__8627_8631 = G__8648;
chunk__8628_8632 = G__8649;
count__8629_8633 = G__8650;
i__8630_8634 = G__8651;
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),(function (){var pred__8655 = cljs.core._EQ_;
var expr__8656 = attr;
if(cljs.core.truth_(pred__8655.call(null,spectra_cljc.schema.s_name,expr__8656))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_link,person,attr], null);
} else {
if(cljs.core.truth_(pred__8655.call(null,spectra_cljc.schema.website,expr__8656))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_site,person,attr], null);
} else {
return spectra_cljs.util.get_first.call(null,person,attr);
}
}
})()], null);
});
spectra_cljs.table.person_row = (function spectra_cljs$table$person_row(person){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__7027__auto__ = (function spectra_cljs$table$person_row_$_iter__8662(s__8663){
return (new cljs.core.LazySeq(null,(function (){
var s__8663__$1 = s__8663;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__8663__$1);
if(temp__4657__auto__){
var s__8663__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8663__$2)){
var c__7025__auto__ = cljs.core.chunk_first.call(null,s__8663__$2);
var size__7026__auto__ = cljs.core.count.call(null,c__7025__auto__);
var b__8665 = cljs.core.chunk_buffer.call(null,size__7026__auto__);
if((function (){var i__8664 = (0);
while(true){
if((i__8664 < size__7026__auto__)){
var attr = cljs.core._nth.call(null,c__7025__auto__,i__8664);
cljs.core.chunk_append.call(null,b__8665,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_cell,person,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__8666 = (i__8664 + (1));
i__8664 = G__8666;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8665),spectra_cljs$table$person_row_$_iter__8662.call(null,cljs.core.chunk_rest.call(null,s__8663__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8665),null);
}
} else {
var attr = cljs.core.first.call(null,s__8663__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_cell,person,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$person_row_$_iter__8662.call(null,cljs.core.rest.call(null,s__8663__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7027__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljc.schema.person.call(null,spectra_cljs.table.entity_attrs)));
})()], null);
});
spectra_cljs.table.prev_next_box = (function spectra_cljs$table$prev_next_box(counter,update_fn,num_rows,row_type){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.prev-next","div.prev-next",-1078656250),(((spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"counters","counters",33475982),counter) > (0)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),spectra_cljs.update.prev_fetch_BANG_.call(null,counter,update_fn),new cljs.core.Keyword(null,"class","class",-2030961996),"prev-email-page pure-button"], null),"<-- Previous"], null):null),((cljs.core._EQ_.call(null,num_rows,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"page-lengths","page-lengths",-746189067),row_type)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),spectra_cljs.update.next_fetch_BANG_.call(null,counter,update_fn),new cljs.core.Keyword(null,"class","class",-2030961996),"next-email-page pure-button"], null),"Next -->"], null):null)], null);
});
spectra_cljs.table.people_table = (function spectra_cljs$table$people_table(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.prev_next_box,new cljs.core.Keyword(null,"people","people",1443537404),spectra_cljs.update.update_people_BANG_,cljs.core.count.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"people-rows","people-rows",1287247959))),new cljs.core.Keyword(null,"people","people",1443537404)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return spectra_cljs.table.new_entity_switch.call(null,spectra_cljc.schema.person);
}),new cljs.core.Keyword(null,"id","id",-1388402092),"add-new-person",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-button"], null),"Add new person"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),(cljs.core.truth_(spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"loading","loading",-737050189)))?"  (Loading...)":"")], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-table",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-table pure-table-horizontal"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-header"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__7027__auto__ = (function spectra_cljs$table$people_table_$_iter__8675(s__8676){
return (new cljs.core.LazySeq(null,(function (){
var s__8676__$1 = s__8676;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__8676__$1);
if(temp__4657__auto__){
var s__8676__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8676__$2)){
var c__7025__auto__ = cljs.core.chunk_first.call(null,s__8676__$2);
var size__7026__auto__ = cljs.core.count.call(null,c__7025__auto__);
var b__8678 = cljs.core.chunk_buffer.call(null,size__7026__auto__);
if((function (){var i__8677 = (0);
while(true){
if((i__8677 < size__7026__auto__)){
var attr = cljs.core._nth.call(null,c__7025__auto__,i__8677);
cljs.core.chunk_append.call(null,b__8678,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.get.call(null,spectra_cljc.schema.attr_names,cljs.core.second.call(null,attr))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__8683 = (i__8677 + (1));
i__8677 = G__8683;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8678),spectra_cljs$table$people_table_$_iter__8675.call(null,cljs.core.chunk_rest.call(null,s__8676__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8678),null);
}
} else {
var attr = cljs.core.first.call(null,s__8676__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.get.call(null,spectra_cljc.schema.attr_names,cljs.core.second.call(null,attr))], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$people_table_$_iter__8675.call(null,cljs.core.rest.call(null,s__8676__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7027__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljc.schema.person.call(null,spectra_cljs.table.entity_attrs)));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"people-rows"], null),(function (){var iter__7027__auto__ = (function spectra_cljs$table$people_table_$_iter__8679(s__8680){
return (new cljs.core.LazySeq(null,(function (){
var s__8680__$1 = s__8680;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__8680__$1);
if(temp__4657__auto__){
var s__8680__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8680__$2)){
var c__7025__auto__ = cljs.core.chunk_first.call(null,s__8680__$2);
var size__7026__auto__ = cljs.core.count.call(null,c__7025__auto__);
var b__8682 = cljs.core.chunk_buffer.call(null,size__7026__auto__);
if((function (){var i__8681 = (0);
while(true){
if((i__8681 < size__7026__auto__)){
var p_row = cljs.core._nth.call(null,c__7025__auto__,i__8681);
cljs.core.chunk_append.call(null,b__8682,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_row,cljs.core.second.call(null,p_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,p_row)], null)));

var G__8684 = (i__8681 + (1));
i__8681 = G__8684;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8682),spectra_cljs$table$people_table_$_iter__8679.call(null,cljs.core.chunk_rest.call(null,s__8680__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8682),null);
}
} else {
var p_row = cljs.core.first.call(null,s__8680__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.person_row,cljs.core.second.call(null,p_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,p_row)], null)),spectra_cljs$table$people_table_$_iter__8679.call(null,cljs.core.rest.call(null,s__8680__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7027__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"people-rows","people-rows",1287247959))));
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
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__7027__auto__ = (function spectra_cljs$table$email_row_$_iter__8689(s__8690){
return (new cljs.core.LazySeq(null,(function (){
var s__8690__$1 = s__8690;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__8690__$1);
if(temp__4657__auto__){
var s__8690__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8690__$2)){
var c__7025__auto__ = cljs.core.chunk_first.call(null,s__8690__$2);
var size__7026__auto__ = cljs.core.count.call(null,c__7025__auto__);
var b__8692 = cljs.core.chunk_buffer.call(null,size__7026__auto__);
if((function (){var i__8691 = (0);
while(true){
if((i__8691 < size__7026__auto__)){
var attr = cljs.core._nth.call(null,c__7025__auto__,i__8691);
cljs.core.chunk_append.call(null,b__8692,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_cell,email,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__8693 = (i__8691 + (1));
i__8691 = G__8693;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8692),spectra_cljs$table$email_row_$_iter__8689.call(null,cljs.core.chunk_rest.call(null,s__8690__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8692),null);
}
} else {
var attr = cljs.core.first.call(null,s__8690__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_cell,email,cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$email_row_$_iter__8689.call(null,cljs.core.rest.call(null,s__8690__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7027__auto__.call(null,spectra_cljs.util.add_ids.call(null,cljs.core.keys.call(null,spectra_cljs.table.email_attrs)));
})()], null);
});
spectra_cljs.table.email_table = (function spectra_cljs$table$email_table(row_keys,counter,update_fn){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.prev_next_box,counter,update_fn,cljs.core.count.call(null,cljs.core.apply.call(null,spectra_cljs.state.look,row_keys)),new cljs.core.Keyword(null,"email","email",1415816706)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table","table",-564943036),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-table",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-table pure-table-horizontal"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-header"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),(function (){var iter__7027__auto__ = (function spectra_cljs$table$email_table_$_iter__8702(s__8703){
return (new cljs.core.LazySeq(null,(function (){
var s__8703__$1 = s__8703;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__8703__$1);
if(temp__4657__auto__){
var s__8703__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8703__$2)){
var c__7025__auto__ = cljs.core.chunk_first.call(null,s__8703__$2);
var size__7026__auto__ = cljs.core.count.call(null,c__7025__auto__);
var b__8705 = cljs.core.chunk_buffer.call(null,size__7026__auto__);
if((function (){var i__8704 = (0);
while(true){
if((i__8704 < size__7026__auto__)){
var attr = cljs.core._nth.call(null,c__7025__auto__,i__8704);
cljs.core.chunk_append.call(null,b__8705,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__8710 = (i__8704 + (1));
i__8704 = G__8710;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8705),spectra_cljs$table$email_table_$_iter__8702.call(null,cljs.core.chunk_rest.call(null,s__8703__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8705),null);
}
} else {
var attr = cljs.core.first.call(null,s__8703__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),cljs.core.second.call(null,attr)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$table$email_table_$_iter__8702.call(null,cljs.core.rest.call(null,s__8703__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7027__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljs.table.email_attrs));
})()], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),"email-rows"], null),(function (){var iter__7027__auto__ = (function spectra_cljs$table$email_table_$_iter__8706(s__8707){
return (new cljs.core.LazySeq(null,(function (){
var s__8707__$1 = s__8707;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__8707__$1);
if(temp__4657__auto__){
var s__8707__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8707__$2)){
var c__7025__auto__ = cljs.core.chunk_first.call(null,s__8707__$2);
var size__7026__auto__ = cljs.core.count.call(null,c__7025__auto__);
var b__8709 = cljs.core.chunk_buffer.call(null,size__7026__auto__);
if((function (){var i__8708 = (0);
while(true){
if((i__8708 < size__7026__auto__)){
var e_row = cljs.core._nth.call(null,c__7025__auto__,i__8708);
cljs.core.chunk_append.call(null,b__8709,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_row,cljs.core.second.call(null,e_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,e_row)], null)));

var G__8711 = (i__8708 + (1));
i__8708 = G__8711;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8709),spectra_cljs$table$email_table_$_iter__8706.call(null,cljs.core.chunk_rest.call(null,s__8707__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8709),null);
}
} else {
var e_row = cljs.core.first.call(null,s__8707__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_row,cljs.core.second.call(null,e_row)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,e_row)], null)),spectra_cljs$table$email_table_$_iter__8706.call(null,cljs.core.rest.call(null,s__8707__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7027__auto__.call(null,spectra_cljs.util.add_ids.call(null,cljs.core.apply.call(null,spectra_cljs.state.look,row_keys)));
})()], null)], null)], null);
});

//# sourceMappingURL=table.js.map