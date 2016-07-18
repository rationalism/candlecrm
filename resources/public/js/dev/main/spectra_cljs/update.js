// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.update');
goog.require('cljs.core');
goog.require('clojure.set');
goog.require('spectra_cljs.state');
goog.require('spectra_cljc.schema');
spectra_cljs.update.timeout = spectra_cljs.update.timeout;
spectra_cljs.update.send_BANG_ = (function spectra_cljs$update$send_BANG_(req,update_fn){
return spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"ajax-chan","ajax-chan",1933808038)).call(null,req,(5000),update_fn);
});
spectra_cljs.update.people_req = (function spectra_cljs$update$people_req(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pages","fetch-people","pages/fetch-people",-507430857),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),spectra_cljs.state.person_pos.call(null),new cljs.core.Keyword(null,"limit","limit",-1355822363),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"page-lengths","page-lengths",-746189067),new cljs.core.Keyword(null,"people","people",1443537404))], null)], null);
});
spectra_cljs.update.update_people_BANG_ = (function spectra_cljs$update$update_people_BANG_(){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.people_req.call(null),(function (p1__26852_SHARP_){
return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"people-rows","people-rows",1287247959)], null),p1__26852_SHARP_);
}));
});
spectra_cljs.update.prev_fetch_BANG_ = (function spectra_cljs$update$prev_fetch_BANG_(counter,update_fn){
return (function (){
if((spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"counters","counters",33475982),counter) > (0))){
spectra_cljs.state.update_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"counters","counters",33475982),counter], null),cljs.core.dec);

return update_fn.call(null);
} else {
return null;
}
});
});
spectra_cljs.update.next_fetch_BANG_ = (function spectra_cljs$update$next_fetch_BANG_(counter,update_fn){
return (function (){
spectra_cljs.state.update_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"counters","counters",33475982),counter], null),cljs.core.inc);

return update_fn.call(null);
});
});
spectra_cljs.update.email_req = (function spectra_cljs$update$email_req(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pages","fetch-emails","pages/fetch-emails",-1011351340),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",-355208981),spectra_cljs.state.email_pos.call(null),new cljs.core.Keyword(null,"limit","limit",-1355822363),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"page-lengths","page-lengths",-746189067),new cljs.core.Keyword(null,"email","email",1415816706))], null)], null);
});
spectra_cljs.update.email_person_req = (function spectra_cljs$update$email_person_req(link_type){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pages","person-emails","pages/person-emails",-1657230398),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"person-id","person-id",1251942696),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"current-node","current-node",-814308842),new cljs.core.Keyword(null,"center-node","center-node",1511034476),new cljs.core.Keyword(null,"id","id",-1388402092)),new cljs.core.Keyword(null,"link","link",-1769163468),link_type,new cljs.core.Keyword(null,"start","start",-355208981),spectra_cljs.state.email_person_pos.call(null,link_type),new cljs.core.Keyword(null,"limit","limit",-1355822363),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"page-lengths","page-lengths",-746189067),new cljs.core.Keyword(null,"email","email",1415816706))], null)], null);
});
spectra_cljs.update.update_emails_BANG_ = (function spectra_cljs$update$update_emails_BANG_(){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.email_req.call(null),(function (p1__26853_SHARP_){
return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"email-rows","email-rows",1852197731)], null),p1__26853_SHARP_);
}));
});
spectra_cljs.update.email_callback = (function spectra_cljs$update$email_callback(link_type){
return (function (resp){
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current-node","current-node",-814308842),link_type], null),resp);

return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tabid","tabid",-720881418)], null),(6));
});
});
spectra_cljs.update.update_emails_person_BANG_ = (function spectra_cljs$update$update_emails_person_BANG_(link_type){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.email_person_req.call(null,link_type),spectra_cljs.update.email_callback.call(null,link_type));
});
spectra_cljs.update.update_user_BANG_ = (function spectra_cljs$update$update_user_BANG_(){
return spectra_cljs.update.send_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("update","user-data","update/user-data",1908960917)], null),(function (p1__26854_SHARP_){
return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"user","user",1532431356)], null),p1__26854_SHARP_);
}));
});
spectra_cljs.update.node_req = (function spectra_cljs$update$node_req(id,type){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("update","fetch-node","update/fetch-node",-1161251758),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),id,new cljs.core.Keyword(null,"type","type",1174270348),type], null)], null);
});
spectra_cljs.update.new_node = (function spectra_cljs$update$new_node(req,type){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"center-node","center-node",1511034476),req,new cljs.core.Keyword(null,"type","type",1174270348),type], null);
});
spectra_cljs.update.update_node = (function spectra_cljs$update$update_node(){
return (function (req){
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current-node","current-node",-814308842)], null),spectra_cljs.update.new_node.call(null,req,spectra_cljc.schema.type_label.call(null,req)));

spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tabid","tabid",-720881418)], null),(6));

if(cljs.core._EQ_.call(null,spectra_cljc.schema.type_label.call(null,req),spectra_cljc.schema.person)){
spectra_cljs.update.update_emails_person_BANG_.call(null,spectra_cljc.schema.email_to);

return spectra_cljs.update.update_emails_person_BANG_.call(null,spectra_cljc.schema.email_from);
} else {
return null;
}
});
});
spectra_cljs.update.go_node_BANG_ = (function spectra_cljs$update$go_node_BANG_(id,type){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.node_req.call(null,id,type),spectra_cljs.update.update_node.call(null));
});
spectra_cljs.update.key_req = (function spectra_cljs$update$key_req(key){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("update","key-link","update/key-link",-267313105),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"current-node","current-node",-814308842),new cljs.core.Keyword(null,"center-node","center-node",1511034476),new cljs.core.Keyword(null,"id","id",-1388402092)),new cljs.core.Keyword(null,"key","key",-1516042587),key], null)], null);
});
spectra_cljs.update.go_key_BANG_ = (function spectra_cljs$update$go_key_BANG_(key){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.key_req.call(null,key),spectra_cljs.update.update_node.call(null));
});
spectra_cljs.update.rel_map = (function spectra_cljs$update$rel_map(rel_type){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"reltype","reltype",-2076353499),rel_type,new cljs.core.Keyword(null,"start","start",-355208981),(0),new cljs.core.Keyword(null,"limit","limit",-1355822363),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"page-lengths","page-lengths",-746189067),rel_type)], null);
});
spectra_cljs.update.people_ranked_req = (function spectra_cljs$update$people_ranked_req(rel_type){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pages","people-ranked","pages/people-ranked",1285568941),spectra_cljs.update.rel_map.call(null,rel_type)], null);
});
spectra_cljs.update.new_rank_lists_BANG_ = (function spectra_cljs$update$new_rank_lists_BANG_(rel_type){
return (function (new_ranks){
return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"rank-lists","rank-lists",-1169790414),rel_type], null),new_ranks);
});
});
spectra_cljs.update.fetch_ranks_BANG_ = (function spectra_cljs$update$fetch_ranks_BANG_(rel_type){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.people_ranked_req.call(null,rel_type),spectra_cljs.update.new_rank_lists_BANG_.call(null,rel_type));
});
spectra_cljs.update.person_event_req = (function spectra_cljs$update$person_event_req(person_id){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pages","person-events","pages/person-events",119399523),cljs.core.assoc.call(null,spectra_cljs.update.rel_map.call(null,spectra_cljc.schema.event),new cljs.core.Keyword(null,"person-id","person-id",1251942696),person_id)], null);
});
spectra_cljs.update.person_place_req = (function spectra_cljs$update$person_place_req(person_id){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("pages","person-places","pages/person-places",-552749019),cljs.core.assoc.call(null,spectra_cljs.update.rel_map.call(null,spectra_cljc.schema.building),new cljs.core.Keyword(null,"person-id","person-id",1251942696),person_id)], null);
});
spectra_cljs.update.normalize_cal = (function spectra_cljs$update$normalize_cal(cal){
return cljs.core.assoc.call(null,clojure.set.rename_keys.call(null,cal,cljs.core.PersistentArrayMap.fromArray([spectra_cljc.schema.event_begin,new cljs.core.Keyword(null,"start","start",-355208981),spectra_cljc.schema.event_end,new cljs.core.Keyword(null,"end","end",-268185958)], true, false)),new cljs.core.Keyword(null,"title","title",636505583),[cljs.core.str(new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(cal))].join(''));
});
spectra_cljs.update.update_cal_rows_BANG_ = (function spectra_cljs$update$update_cal_rows_BANG_(new_rows){
return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cal-events","cal-events",2030438409)], null),cljs.core.map.call(null,spectra_cljs.update.normalize_cal,new_rows));
});
spectra_cljs.update.normalize_loc = (function spectra_cljs$update$normalize_loc(loc){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"title","title",636505583),cljs.core.first.call(null,spectra_cljc.schema.s_name.call(null,loc)),new cljs.core.Keyword(null,"position","position",-2011731912),cljs.core.PersistentArrayMap.fromArray([spectra_cljc.schema.lat,parseFloat(spectra_cljc.schema.lat.call(null,loc)),spectra_cljc.schema.lng,parseFloat(spectra_cljc.schema.lng.call(null,loc))], true, false),new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(loc)], null);
});
spectra_cljs.update.update_loc_rows_BANG_ = (function spectra_cljs$update$update_loc_rows_BANG_(new_rows){
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-markers","map-markers",-1522832471),new cljs.core.Keyword(null,"data","data",-232669377)], null),cljs.core.map.call(null,spectra_cljs.update.normalize_loc,new_rows));

return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-markers","map-markers",-1522832471),new cljs.core.Keyword(null,"updated","updated",-1627192056)], null),false);
});
spectra_cljs.update.map_markers = (function spectra_cljs$update$map_markers(person_id){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.person_place_req.call(null,person_id),spectra_cljs.update.update_loc_rows_BANG_);
});
spectra_cljs.update.cal_events = (function spectra_cljs$update$cal_events(person_id){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.person_event_req.call(null,person_id),spectra_cljs.update.update_cal_rows_BANG_);
});
spectra_cljs.update.rel_switch = (function spectra_cljs$update$rel_switch(person_id,rel_type){
var pred__26858 = cljs.core._EQ_;
var expr__26859 = rel_type;
if(cljs.core.truth_(pred__26858.call(null,spectra_cljc.schema.event,expr__26859))){
return spectra_cljs.update.cal_events.call(null,person_id);
} else {
if(cljs.core.truth_(pred__26858.call(null,spectra_cljc.schema.building,expr__26859))){
return spectra_cljs.update.map_markers.call(null,person_id);
} else {
return null;
}
}
});
spectra_cljs.update.strip_ids = (function spectra_cljs$update$strip_ids(m){
return cljs.core.reduce.call(null,(function (p1__26861_SHARP_,p2__26862_SHARP_){
return cljs.core.update.call(null,p1__26861_SHARP_,p2__26862_SHARP_,cljs.core.vals);
}),m,cljs.core.remove.call(null,(function (p1__26863_SHARP_){
return cljs.core._EQ_.call(null,p1__26863_SHARP_,spectra_cljc.schema.type_label);
}),cljs.core.keys.call(null,m)));
});
spectra_cljs.update.add_req = (function spectra_cljs$update$add_req(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("edit","add-entity","edit/add-entity",1783932000),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fields","fields",-1932066230),spectra_cljs.update.strip_ids.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974)))], null)], null);
});
spectra_cljs.update.edit_req = (function spectra_cljs$update$edit_req(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("edit","edit-entity","edit/edit-entity",-173559196),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"fields","fields",-1932066230),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"current-node","current-node",-814308842),new cljs.core.Keyword(null,"center-node","center-node",1511034476))], null)], null);
});
spectra_cljs.update.new_entity_confirm_BANG_ = (function spectra_cljs$update$new_entity_confirm_BANG_(resp){
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity","new-entity",-1822418974)], null),cljs.core.PersistentArrayMap.EMPTY);

return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"new-entity-msg","new-entity-msg",-206356551)], null),resp);
});
spectra_cljs.update.add_entity_BANG_ = (function spectra_cljs$update$add_entity_BANG_(){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.add_req.call(null),spectra_cljs.update.new_entity_confirm_BANG_);
});
spectra_cljs.update.edit_entity_confirm_BANG_ = (function spectra_cljs$update$edit_entity_confirm_BANG_(resp){
return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"edit-entity-msg","edit-entity-msg",-503473694)], null),resp);
});
spectra_cljs.update.edit_entity_BANG_ = (function spectra_cljs$update$edit_entity_BANG_(){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.edit_req.call(null),spectra_cljs.update.edit_entity_confirm_BANG_);
});
spectra_cljs.update.search_req = (function spectra_cljs$update$search_req(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("update","search","update/search",256332123),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query","query",-1288509510),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"search","search",1564939822))], null)], null);
});
spectra_cljs.update.list_search_results_BANG_ = (function spectra_cljs$update$list_search_results_BANG_(resp){
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tabid","tabid",-720881418)], null),(9));

return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"search-results","search-results",306464634)], null),resp);
});
spectra_cljs.update.run_search_BANG_ = (function spectra_cljs$update$run_search_BANG_(){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.search_req.call(null),spectra_cljs.update.list_search_results_BANG_);
});
spectra_cljs.update.delete_account_req = (function spectra_cljs$update$delete_account_req(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("update","delete-account","update/delete-account",-45759284),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"confirmed","confirmed",-487126323),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"delete-account","delete-account",725157341),new cljs.core.Keyword(null,"confirm-button","confirm-button",1845692142))], null)], null);
});
spectra_cljs.update.delete_account_BANG_ = (function spectra_cljs$update$delete_account_BANG_(){
if(cljs.core._EQ_.call(null,"yes",spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"delete-account","delete-account",725157341),new cljs.core.Keyword(null,"confirm-button","confirm-button",1845692142)))){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.delete_account_req.call(null),cljs.core.identity);
} else {
return alert([cljs.core.str("Account not deleted. "),cljs.core.str("Please select Yes to delete your account.")].join(''));
}
});
spectra_cljs.update.delete_req = (function spectra_cljs$update$delete_req(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("update","delete-entity","update/delete-entity",1234985406),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"current-node","current-node",-814308842),new cljs.core.Keyword(null,"center-node","center-node",1511034476),new cljs.core.Keyword(null,"id","id",-1388402092)),new cljs.core.Keyword(null,"type","type",1174270348),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"current-node","current-node",-814308842),new cljs.core.Keyword(null,"center-node","center-node",1511034476),new cljs.core.Keyword(null,"type","type",1174270348))], null)], null);
});
spectra_cljs.update.confirm_delete = (function spectra_cljs$update$confirm_delete(resp){
return alert("Entity deleted");
});
spectra_cljs.update.delete_entity_BANG_ = (function spectra_cljs$update$delete_entity_BANG_(){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.delete_req.call(null),spectra_cljs.update.confirm_delete);
});
spectra_cljs.update.change_pwd_req = (function spectra_cljs$update$change_pwd_req(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("update","change-password","update/change-password",366620055),cljs.core.select_keys.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"change-pwd","change-pwd",2081790085)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"password","password",417022471),new cljs.core.Keyword(null,"confirm","confirm",-2004000608)], null))], null);
});
spectra_cljs.update.confirm_changed = (function spectra_cljs$update$confirm_changed(resp){
alert("Password changed");

return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tabid","tabid",-720881418)], null),(1));
});
spectra_cljs.update.change_password_BANG_ = (function spectra_cljs$update$change_password_BANG_(){
return spectra_cljs.update.send_BANG_.call(null,spectra_cljs.update.change_pwd_req.call(null),spectra_cljs.update.confirm_changed);
});

//# sourceMappingURL=update.js.map?rel=1468804319604