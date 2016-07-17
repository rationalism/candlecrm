// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.search');
goog.require('cljs.core');
goog.require('spectra_cljs.update');
goog.require('spectra_cljs.state');
goog.require('spectra_cljc.schema');
goog.require('spectra_cljs.node');
goog.require('spectra_cljs.util');
goog.require('clojure.string');
spectra_cljs.search.search_key = (function spectra_cljs$search$search_key(e){
if(cljs.core._EQ_.call(null,(13),e.charCode)){
return spectra_cljs.update.run_search_BANG_.call(null);
} else {
return null;
}
});
spectra_cljs.search.search_box = (function spectra_cljs$search$search_box(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fieldset","fieldset",-1949770816),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-form"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"id","id",-1388402092),"search-box",new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"name","name",1843675177),"search-box",new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),"Search",new cljs.core.Keyword(null,"on-change","on-change",-732046149),spectra_cljs.util.set_field_BANG_.call(null,new cljs.core.Keyword(null,"search","search",1564939822)),new cljs.core.Keyword(null,"value","value",305978217),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"search","search",1564939822)),new cljs.core.Keyword(null,"on-key-press","on-key-press",-399563677),spectra_cljs.search.search_key], null)], null)], null);
});
spectra_cljs.search.result_row = (function spectra_cljs$search$result_row(res){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3.infotitle","h3.infotitle",1224264902),[cljs.core.str("Result #"),cljs.core.str((cljs.core.first.call(null,res) + (1)))].join('')], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.show_node,spectra_cljs.node.get_title.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"center-node","center-node",1511034476),cljs.core.second.call(null,res)], null)),cljs.core.second.call(null,res),false], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.util.node_link,[cljs.core.str("Link to "),cljs.core.str(spectra_cljs.node.get_title.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"center-node","center-node",1511034476),cljs.core.second.call(null,res)], null)))].join(''),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,res)),spectra_cljc.schema.type_label.call(null,cljs.core.second.call(null,res))], null)], null)], null);
});
spectra_cljs.search.search_results = (function spectra_cljs$search$search_results(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"Search Results"], null),(function (){var iter__7027__auto__ = (function spectra_cljs$search$search_results_$_iter__8778(s__8779){
return (new cljs.core.LazySeq(null,(function (){
var s__8779__$1 = s__8779;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__8779__$1);
if(temp__4657__auto__){
var s__8779__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8779__$2)){
var c__7025__auto__ = cljs.core.chunk_first.call(null,s__8779__$2);
var size__7026__auto__ = cljs.core.count.call(null,c__7025__auto__);
var b__8781 = cljs.core.chunk_buffer.call(null,size__7026__auto__);
if((function (){var i__8780 = (0);
while(true){
if((i__8780 < size__7026__auto__)){
var id_res = cljs.core._nth.call(null,c__7025__auto__,i__8780);
cljs.core.chunk_append.call(null,b__8781,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.search.result_row,id_res], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,id_res)], null)));

var G__8782 = (i__8780 + (1));
i__8780 = G__8782;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8781),spectra_cljs$search$search_results_$_iter__8778.call(null,cljs.core.chunk_rest.call(null,s__8779__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8781),null);
}
} else {
var id_res = cljs.core.first.call(null,s__8779__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.search.result_row,id_res], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,id_res)], null)),spectra_cljs$search$search_results_$_iter__8778.call(null,cljs.core.rest.call(null,s__8779__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7027__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"search-results","search-results",306464634))));
})()], null);
});

//# sourceMappingURL=search.js.map