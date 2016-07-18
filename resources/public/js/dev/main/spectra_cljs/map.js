// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.map');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('spectra_cljs.state');
goog.require('reagent.core');
goog.require('jayq.core');
goog.require('spectra_cljc.schema');
goog.require('spectra_cljs.util');
goog.require('clojure.string');
spectra_cljs.map.event_info_window = (function spectra_cljs$map$event_info_window(){
var marker = spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"map-markers","map-markers",-1522832471),new cljs.core.Keyword(null,"clicked","clicked",114423720));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#markerinfo>h3","div#markerinfo>h3",285287813),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.util.node_link,new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(marker),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(marker),spectra_cljc.schema.building], null)], null);
});
spectra_cljs.map.render_window = (function spectra_cljs$map$render_window(){
return reagent.core.render.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spectra_cljs.map.event_info_window], null),goog.dom.getElement("window-info"));
});
spectra_cljs.map.map_window = (function spectra_cljs$map$map_window(){
var window = (new google.maps.InfoWindow(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 1, ["content","<div id='window-info'></div>"], null))));
window.addListener("domready",spectra_cljs.map.render_window);

return window;
});
spectra_cljs.map.window_open = (function spectra_cljs$map$window_open(marker,vars){
return (function (){
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-markers","map-markers",-1522832471),new cljs.core.Keyword(null,"clicked","clicked",114423720)], null),vars);

return spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"map-markers","map-markers",-1522832471),new cljs.core.Keyword(null,"window","window",724519534)).open(spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"map-obj","map-obj",-1129422030)),marker);
});
});
spectra_cljs.map.map_marker = (function spectra_cljs$map$map_marker(vars){
var marker = (new google.maps.Marker(cljs.core.clj__GT_js.call(null,vars)));
marker.addListener("click",spectra_cljs.map.window_open.call(null,marker,vars));

return marker;
});
spectra_cljs.map.wipe_markers = (function spectra_cljs$map$wipe_markers(markers){
return cljs.core.clj__GT_js.call(null,cljs.core.remove.call(null,cljs.core.nil_QMARK_,cljs.core.map.call(null,(function (){
return cljs.core.constantly.call(null,null);
}),cljs.core.map.call(null,(function (p1__26969_SHARP_){
return p1__26969_SHARP_.setMap(null);
}),markers))));
});
spectra_cljs.map.new_markers = (function spectra_cljs$map$new_markers(markers){
return cljs.core.clj__GT_js.call(null,cljs.core.map.call(null,spectra_cljs.map.map_marker,cljs.core.map.call(null,(function (p1__26970_SHARP_){
return cljs.core.assoc.call(null,p1__26970_SHARP_,new cljs.core.Keyword(null,"map","map",1371690461),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"map-obj","map-obj",-1129422030)));
}),spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"map-markers","map-markers",-1522832471),new cljs.core.Keyword(null,"data","data",-232669377)))));
});
spectra_cljs.map.markers_update = (function spectra_cljs$map$markers_update(){
spectra_cljs.state.update_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-markers","map-markers",-1522832471),new cljs.core.Keyword(null,"objs","objs",-1810725634)], null),spectra_cljs.map.wipe_markers);

spectra_cljs.state.update_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-markers","map-markers",-1522832471),new cljs.core.Keyword(null,"objs","objs",-1810725634)], null),spectra_cljs.map.new_markers);

return spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-markers","map-markers",-1522832471),new cljs.core.Keyword(null,"updated","updated",-1627192056)], null),true);
});
spectra_cljs.map.map_did_mount = (function spectra_cljs$map$map_did_mount(this$){
spectra_cljs.state.set_BANG_.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-obj","map-obj",-1129422030)], null),(new google.maps.Map(reagent.core.dom_node.call(null,this$),cljs.core.clj__GT_js.call(null,cljs.core.zipmap.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"center","center",-748944368),new cljs.core.Keyword(null,"zoom","zoom",-1827487038)], null),cljs.core.map.call(null,spectra_cljs.state.look,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-center","map-center",770153511),new cljs.core.Keyword(null,"map-zoom","map-zoom",1543291337)], null)))))));

spectra_cljs.state.update_BANG_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map-markers","map-markers",-1522832471),new cljs.core.Keyword(null,"window","window",724519534)], null),spectra_cljs.map.map_window);

spectra_cljs.map.markers_update.call(null);

return spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"map-obj","map-obj",-1129422030));
});
spectra_cljs.map.location_html = (function spectra_cljs$map$location_html(){
if(cljs.core._EQ_.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"tabid","tabid",-720881418)),(4))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#mapbox","div#mapbox",-1335690217),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"height","height",1025178622),"600px",new cljs.core.Keyword(null,"width","width",-384071477),"1000px"], null)], null)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#mapbox","div#mapbox",-1335690217),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"height","height",1025178622),"599px",new cljs.core.Keyword(null,"width","width",-384071477),"999px"], null)], null)], null);
}
});
spectra_cljs.map.resize_map = (function spectra_cljs$map$resize_map(this$){
if(cljs.core.truth_(spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"map-markers","map-markers",-1522832471),new cljs.core.Keyword(null,"updated","updated",-1627192056)))){
} else {
spectra_cljs.map.markers_update.call(null);
}

return google.maps.event.trigger(document.getElementById("mapbox"),"resize");
});
spectra_cljs.map.map_box = (function spectra_cljs$map$map_box(){
return reagent.core.create_class.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),spectra_cljs.map.location_html,new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),spectra_cljs.map.map_did_mount,new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),spectra_cljs.map.resize_map], null));
});

//# sourceMappingURL=map.js.map?rel=1468804319721