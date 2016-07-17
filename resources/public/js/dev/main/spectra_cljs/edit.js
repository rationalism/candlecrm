// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.edit');
goog.require('cljs.core');
goog.require('spectra_cljs.update');
goog.require('spectra_cljs.state');
goog.require('spectra_cljs.table');
goog.require('spectra_cljc.schema');
goog.require('spectra_cljs.util');
goog.require('clojure.string');
spectra_cljs.edit.submit_new_entity = (function spectra_cljs$edit$submit_new_entity(type){
return (function (){
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974),spectra_cljc.schema.type_label], null),type);

return spectra_cljs.update.add_entity_BANG_.call(null);
});
});
spectra_cljs.edit.add_message = (function spectra_cljs$edit$add_message(){
var resp = spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"new-entity-msg","new-entity-msg",-206356551));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),[cljs.core.str("New "),cljs.core.str(cljs.core.name.call(null,spectra_cljc.schema.type_label.call(null,resp))),cljs.core.str(" created. ")].join(''),spectra_cljs.util.node_link.call(null,"Go to page",new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(resp),spectra_cljc.schema.type_label.call(null,resp))], null);
});
spectra_cljs.edit.edit_message = (function spectra_cljs$edit$edit_message(){
var resp = spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"new-entity-msg","new-entity-msg",-206356551));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),[cljs.core.str("Edit of "),cljs.core.str(cljs.core.name.call(null,spectra_cljc.schema.type_label.call(null,resp))),cljs.core.str(" successful. ")].join(''),spectra_cljs.util.node_link.call(null,"Go to page",new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(resp),spectra_cljc.schema.type_label.call(null,resp))], null);
});
spectra_cljs.edit.count_cells = (function spectra_cljs$edit$count_cells(attr,cache){
return cljs.core.count.call(null,cljs.core.keys.call(null,cljs.core.apply.call(null,spectra_cljs.state.look,cljs.core.concat.call(null,cache,(new cljs.core.PersistentVector(null,1,(5),cljs.core.PersistentVector.EMPTY_NODE,[attr],null))))));
});
spectra_cljs.edit.input_cell = (function spectra_cljs$edit$input_cell(id_attr,cache){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-control-group"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),((cljs.core._EQ_.call(null,(0),cljs.core.first.call(null,id_attr)))?cljs.core.second.call(null,id_attr).call(null,spectra_cljc.schema.attr_names):"")], null),(function (){var attr = cljs.core.second.call(null,id_attr);
var params = cljs.core.concat.call(null,cache,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attr], null),(new cljs.core.PersistentVector(null,1,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.first.call(null,id_attr)],null))));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"name","name",1843675177),[cljs.core.str(attr),cljs.core.str(cljs.core.first.call(null,id_attr))].join(''),new cljs.core.Keyword(null,"on-change","on-change",-732046149),cljs.core.apply.call(null,spectra_cljs.util.set_field_BANG_,params),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.apply.call(null,spectra_cljs.state.look,params)], null)], null);
})(),(function (){var attr = cljs.core.second.call(null,id_attr);
if(cljs.core._EQ_.call(null,(0),cljs.core.first.call(null,id_attr))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a.new-link","a.new-link",-1830999340),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (attr){
return (function (){
return spectra_cljs.state.set_BANG_.call(null,cljs.core.concat.call(null,cljs.core.concat.call(null,cache,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attr], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.edit.count_cells.call(null,attr,cache)], null)),"");
});})(attr))
], null),"Add new"], null);
} else {
return null;
}
})()], null);
});
spectra_cljs.edit.count_attr_cells = (function spectra_cljs$edit$count_attr_cells(attr,cache){
return spectra_cljs.util.add_ids.call(null,cljs.core.repeat.call(null,spectra_cljs.edit.count_cells.call(null,attr,cache),attr));
});
spectra_cljs.edit.input_block = (function spectra_cljs$edit$input_block(attr,cache){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(function (){var iter__7027__auto__ = (function spectra_cljs$edit$input_block_$_iter__8789(s__8790){
return (new cljs.core.LazySeq(null,(function (){
var s__8790__$1 = s__8790;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__8790__$1);
if(temp__4657__auto__){
var s__8790__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8790__$2)){
var c__7025__auto__ = cljs.core.chunk_first.call(null,s__8790__$2);
var size__7026__auto__ = cljs.core.count.call(null,c__7025__auto__);
var b__8792 = cljs.core.chunk_buffer.call(null,size__7026__auto__);
if((function (){var i__8791 = (0);
while(true){
if((i__8791 < size__7026__auto__)){
var id_attr = cljs.core._nth.call(null,c__7025__auto__,i__8791);
cljs.core.chunk_append.call(null,b__8792,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.edit.input_cell,id_attr,cache], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,id_attr)], null)));

var G__8793 = (i__8791 + (1));
i__8791 = G__8793;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8792),spectra_cljs$edit$input_block_$_iter__8789.call(null,cljs.core.chunk_rest.call(null,s__8790__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8792),null);
}
} else {
var id_attr = cljs.core.first.call(null,s__8790__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.edit.input_cell,id_attr,cache], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,id_attr)], null)),spectra_cljs$edit$input_block_$_iter__8789.call(null,cljs.core.rest.call(null,s__8790__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7027__auto__.call(null,spectra_cljs.edit.count_attr_cells.call(null,attr,cache));
})()], null);
});
spectra_cljs.edit.entity_form = (function spectra_cljs$edit$entity_form(legend,attrs,cache,onclick,msg){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-form pure-form-aligned"], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fieldset","fieldset",-1949770816),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"legend>h3","legend>h3",-690557068),legend], null),(function (){var iter__7027__auto__ = (function spectra_cljs$edit$entity_form_$_iter__8798(s__8799){
return (new cljs.core.LazySeq(null,(function (){
var s__8799__$1 = s__8799;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__8799__$1);
if(temp__4657__auto__){
var s__8799__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__8799__$2)){
var c__7025__auto__ = cljs.core.chunk_first.call(null,s__8799__$2);
var size__7026__auto__ = cljs.core.count.call(null,c__7025__auto__);
var b__8801 = cljs.core.chunk_buffer.call(null,size__7026__auto__);
if((function (){var i__8800 = (0);
while(true){
if((i__8800 < size__7026__auto__)){
var attr = cljs.core._nth.call(null,c__7025__auto__,i__8800);
cljs.core.chunk_append.call(null,b__8801,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.edit.input_block,cljs.core.second.call(null,attr),cache], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)));

var G__8802 = (i__8800 + (1));
i__8800 = G__8802;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8801),spectra_cljs$edit$entity_form_$_iter__8798.call(null,cljs.core.chunk_rest.call(null,s__8799__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8801),null);
}
} else {
var attr = cljs.core.first.call(null,s__8799__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.edit.input_block,cljs.core.second.call(null,attr),cache], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,attr)], null)),spectra_cljs$edit$entity_form_$_iter__8798.call(null,cljs.core.rest.call(null,s__8799__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7027__auto__.call(null,attrs);
})(),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"button",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-button pure-button-primary",new cljs.core.Keyword(null,"on-click","on-click",1632826543),onclick], null),"Submit"], null)], null)], null),msg], null);
});
spectra_cljs.edit.add_form = (function spectra_cljs$edit$add_form(){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.edit.entity_form,[cljs.core.str("Edit "),cljs.core.str(cljs.core.name.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"current-node","current-node",-814308842),new cljs.core.Keyword(null,"type","type",1174270348)))),cljs.core.str(" named "),cljs.core.str(cljs.core.second.call(null,cljs.core.first.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"current-node","current-node",-814308842),new cljs.core.Keyword(null,"center-node","center-node",1511034476),spectra_cljc.schema.s_name))))].join(''),spectra_cljs.util.add_ids.call(null,spectra_cljc.schema.person.call(null,spectra_cljs.table.entity_attrs)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current-node","current-node",-814308842),new cljs.core.Keyword(null,"center-node","center-node",1511034476)], null),(function (){
return spectra_cljs.update.edit_entity_BANG_.call(null);
}),(cljs.core.truth_(spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"edit-entity-msg","edit-entity-msg",-503473694)))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.edit.edit_message], null):null)], null);
});
spectra_cljs.edit.edit_form = (function spectra_cljs$edit$edit_form(){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.edit.entity_form,"Add new person",spectra_cljs.util.add_ids.call(null,spectra_cljc.schema.person.call(null,spectra_cljs.table.entity_attrs)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974)], null),spectra_cljs.edit.submit_new_entity.call(null,spectra_cljc.schema.person),(cljs.core.truth_(spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"new-entity-msg","new-entity-msg",-206356551)))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.edit.add_message], null):null)], null);
});

//# sourceMappingURL=edit.js.map