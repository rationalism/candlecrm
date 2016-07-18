// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.pages');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('spectra_cljs.user');
goog.require('spectra_cljs.map');
goog.require('spectra_cljs.search');
goog.require('spectra_cljs.update');
goog.require('spectra_cljs.state');
goog.require('reagent.core');
goog.require('spectra_cljs.table');
goog.require('jayq.core');
goog.require('spectra_cljs.edit');
goog.require('goog.events');
goog.require('spectra_cljc.schema');
goog.require('spectra_cljs.node');
goog.require('spectra_cljs.calendar');
goog.require('spectra_cljs.util');
spectra_cljs.pages.user_welcome = (function spectra_cljs$pages$user_welcome(username){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3","h3",2067611163),[cljs.core.str("Welcome. Your email is: "),cljs.core.str(username)].join('')], null)], null);
});
spectra_cljs.pages.home_content = (function spectra_cljs$pages$home_content(var_args){
var args__27470__auto__ = [];
var len__27467__auto___13130 = arguments.length;
var i__27468__auto___13131 = (0);
while(true){
if((i__27468__auto___13131 < len__27467__auto___13130)){
args__27470__auto__.push((arguments[i__27468__auto___13131]));

var G__13132 = (i__27468__auto___13131 + (1));
i__27468__auto___13131 = G__13132;
continue;
} else {
}
break;
}

var argseq__27471__auto__ = ((((0) < args__27470__auto__.length))?(new cljs.core.IndexedSeq(args__27470__auto__.slice((0)),(0),null)):null);
return spectra_cljs.pages.home_content.cljs$core$IFn$_invoke$arity$variadic(argseq__27471__auto__);
});

spectra_cljs.pages.home_content.cljs$core$IFn$_invoke$arity$variadic = (function (content){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-g"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-u-1-12"], null)], null),cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-u-5-6"], null)], null),content)], null);
});

spectra_cljs.pages.home_content.cljs$lang$maxFixedArity = (0);

spectra_cljs.pages.home_content.cljs$lang$applyTo = (function (seq13129){
return spectra_cljs.pages.home_content.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq13129));
});

spectra_cljs.pages.person_option = (function spectra_cljs$pages$person_option(person){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"option","option",65132272),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(person)], null),[cljs.core.str(spectra_cljs.util.get_first.call(null,person,spectra_cljc.schema.s_name)),cljs.core.str(" ("),cljs.core.str(spectra_cljs.util.get_first.call(null,person,spectra_cljc.schema.email_addr)),cljs.core.str(")")].join('')], null);
});
spectra_cljs.pages.people_ranks = (function spectra_cljs$pages$people_ranks(rel_type){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div>span","div>span",1935879500),"Select a person: ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"form","form",-1624062471),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-form"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"select","select",1147833503),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),[cljs.core.str("people-list-"),cljs.core.str(rel_type),cljs.core.str(" pure-input-1-2")].join(''),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__13133_SHARP_){
return spectra_cljs.update.rel_switch.call(null,p1__13133_SHARP_.target.value,rel_type);
})], null),(function (){var iter__27292__auto__ = (function spectra_cljs$pages$people_ranks_$_iter__13138(s__13139){
return (new cljs.core.LazySeq(null,(function (){
var s__13139__$1 = s__13139;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__13139__$1);
if(temp__4657__auto__){
var s__13139__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__13139__$2)){
var c__27290__auto__ = cljs.core.chunk_first.call(null,s__13139__$2);
var size__27291__auto__ = cljs.core.count.call(null,c__27290__auto__);
var b__13141 = cljs.core.chunk_buffer.call(null,size__27291__auto__);
if((function (){var i__13140 = (0);
while(true){
if((i__13140 < size__27291__auto__)){
var person = cljs.core._nth.call(null,c__27290__auto__,i__13140);
cljs.core.chunk_append.call(null,b__13141,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.person_option,cljs.core.second.call(null,person)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,person)], null)));

var G__13142 = (i__13140 + (1));
i__13140 = G__13142;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13141),spectra_cljs$pages$people_ranks_$_iter__13138.call(null,cljs.core.chunk_rest.call(null,s__13139__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13141),null);
}
} else {
var person = cljs.core.first.call(null,s__13139__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.person_option,cljs.core.second.call(null,person)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.first.call(null,person)], null)),spectra_cljs$pages$people_ranks_$_iter__13138.call(null,cljs.core.rest.call(null,s__13139__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__27292__auto__.call(null,spectra_cljs.util.add_ids.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"rank-lists","rank-lists",-1169790414),rel_type)));
})()], null)], null)], null);
});
spectra_cljs.pages.calendar = (function spectra_cljs$pages$calendar(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#calendar","div#calendar",1405703584),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.people_ranks,spectra_cljc.schema.event], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.calendar.calendar_box], null)], null);
});
spectra_cljs.pages.locations = (function spectra_cljs$pages$locations(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#locations","div#locations",-2115791342),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.people_ranks,spectra_cljc.schema.location], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"br","br",934104792)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.map.map_box], null)], null);
});
spectra_cljs.pages.filter_display = (function spectra_cljs$pages$filter_display(attrs){
return cljs.core.filter.call(null,(function (p1__13143_SHARP_){
return spectra_cljc.schema.attr_names.call(null,cljs.core.key.call(null,p1__13143_SHARP_));
}),attrs);
});
spectra_cljs.pages.set_tab_fn = (function spectra_cljs$pages$set_tab_fn(tab_num){
return (function (){
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tabid","tabid",-720881418)], null),tab_num);

return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current-node","current-node",-814308842)], null),null);
});
});
spectra_cljs.pages.tab_class = (function spectra_cljs$pages$tab_class(num){
if(cljs.core._EQ_.call(null,num,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"tabid","tabid",-720881418)))){
return "pure-menu-item pure-menu-selected";
} else {
return "pure-menu-item";
}
});
spectra_cljs.pages.header_tab = (function spectra_cljs$pages$header_tab(num,name){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),spectra_cljs.pages.tab_class.call(null,num)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h3>a","h3>a",1469022792),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"href","href",-793805698),"#",new cljs.core.Keyword(null,"class","class",-2030961996),"pure-menu-link",new cljs.core.Keyword(null,"on-click","on-click",1632826543),spectra_cljs.pages.set_tab_fn.call(null,num),new cljs.core.Keyword(null,"id","id",-1388402092),[cljs.core.str("set-tab-"),cljs.core.str(num)].join('')], null),name], null)], null);
});
spectra_cljs.pages.home_header = (function spectra_cljs$pages$home_header(){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#menu-bar","div#menu-bar",869362260),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-g"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-u-1-12"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-u-7-12"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-menu pure-menu-horizontal menu-icons"], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-menu-list"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.header_tab,(1),"People"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.header_tab,(2),"Emails"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.header_tab,(3),"Calendar"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.header_tab,(4),"Locations"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.header_tab,(5),"My Account"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#right-menu","div#right-menu",1598224332),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-u-1-4"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"pure-menu pure-menu-horizontal menu-icons"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.search.search_box], null)], null)], null)], null);
});
spectra_cljs.pages.my_account = (function spectra_cljs$pages$my_account(){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),"My Account"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.user_welcome,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"user","user",1532431356),new cljs.core.Keyword(null,"email-addr","email-addr",-1230441989))], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.user.user_footer], null)], null);
});
spectra_cljs.pages.all_email_table = (function spectra_cljs$pages$all_email_table(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.email_table,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"email-rows","email-rows",1852197731)], null),new cljs.core.Keyword(null,"email","email",1415816706),spectra_cljs.update.update_emails_BANG_], null)], null);
});
spectra_cljs.pages.show_node = (function spectra_cljs$pages$show_node(node){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.node.show_node,spectra_cljs.node.get_title.call(null,node),new cljs.core.Keyword(null,"center-node","center-node",1511034476).cljs$core$IFn$_invoke$arity$1(node),true], null);
});
spectra_cljs.pages.main_page = (function spectra_cljs$pages$main_page(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(function (){var pred__13147 = cljs.core._EQ_;
var expr__13148 = spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"tabid","tabid",-720881418));
if(cljs.core.truth_(pred__13147.call(null,(1),expr__13148))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#tab1.tab-show","div#tab1.tab-show",1947091214),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.table.people_table], null)], null);
} else {
if(cljs.core.truth_(pred__13147.call(null,(2),expr__13148))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#tab2.tab-show","div#tab2.tab-show",110962777),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.all_email_table], null)], null);
} else {
if(cljs.core.truth_(pred__13147.call(null,(3),expr__13148))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#tab3.tab-show","div#tab3.tab-show",1795265971),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.calendar], null)], null);
} else {
if(cljs.core.truth_(pred__13147.call(null,(4),expr__13148))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#tab4.tab-show","div#tab4.tab-show",1314802874),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.locations], null)], null);
} else {
if(cljs.core.truth_(pred__13147.call(null,(5),expr__13148))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#tab5.tab-show","div#tab5.tab-show",-1373694082),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.my_account], null)], null);
} else {
if(cljs.core.truth_(pred__13147.call(null,(6),expr__13148))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.show_node,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"current-node","current-node",-814308842))], null);
} else {
if(cljs.core.truth_(pred__13147.call(null,(7),expr__13148))){
return spectra_cljs.edit.add_form.call(null);
} else {
if(cljs.core.truth_(pred__13147.call(null,(8),expr__13148))){
return spectra_cljs.edit.edit_form.call(null);
} else {
if(cljs.core.truth_(pred__13147.call(null,(9),expr__13148))){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.search.search_results], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Error: Page not found."], null);
}
}
}
}
}
}
}
}
}
})()], null);
});
spectra_cljs.pages.homepage = (function spectra_cljs$pages$homepage(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.home_header], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.home_content,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),""], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.main_page], null)], null)], null);
});
spectra_cljs.pages.insert_rows_BANG_ = (function spectra_cljs$pages$insert_rows_BANG_(table,n){
var n__27375__auto__ = n;
var i = (0);
while(true){
if((i < n__27375__auto__)){
table.insertRow((-1)).insertCell((-1)).innerHTML = i;

var G__13150 = (i + (1));
i = G__13150;
continue;
} else {
return null;
}
break;
}
});
spectra_cljs.pages.render_all_BANG_ = (function spectra_cljs$pages$render_all_BANG_(){
return reagent.core.render.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.pages.homepage], null),goog.dom.getElement("content"));
});

//# sourceMappingURL=pages.js.map?rel=1468799095934