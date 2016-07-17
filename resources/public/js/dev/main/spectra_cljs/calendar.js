// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.calendar');
goog.require('cljs.core');
goog.require('spectra_cljs.update');
goog.require('spectra_cljs.state');
goog.require('reagent.core');
goog.require('spectra_cljc.schema');
goog.require('jayq.core');
goog.require('spectra_cljs.util');
goog.require('clojure.string');
spectra_cljs.calendar.cal_adjust = (function spectra_cljs$calendar$cal_adjust(var_args){
var args7265 = [];
var len__27348__auto___7268 = arguments.length;
var i__27349__auto___7269 = (0);
while(true){
if((i__27349__auto___7269 < len__27348__auto___7268)){
args7265.push((arguments[i__27349__auto___7269]));

var G__7270 = (i__27349__auto___7269 + (1));
i__27349__auto___7269 = G__7270;
continue;
} else {
}
break;
}

var G__7267 = args7265.length;
switch (G__7267) {
case 1:
return spectra_cljs.calendar.cal_adjust.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return spectra_cljs.calendar.cal_adjust.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args7265.length)].join('')));

}
});

spectra_cljs.calendar.cal_adjust.cljs$core$IFn$_invoke$arity$1 = (function (param){
return jayq.core.$.call(null,new cljs.core.Keyword(null,"#calendarbox","#calendarbox",712502163)).fullCalendar(param);
});

spectra_cljs.calendar.cal_adjust.cljs$core$IFn$_invoke$arity$2 = (function (param1,param2){
return jayq.core.$.call(null,new cljs.core.Keyword(null,"#calendarbox","#calendarbox",712502163)).fullCalendar(param1,param2);
});

spectra_cljs.calendar.cal_adjust.cljs$lang$maxFixedArity = 2;

spectra_cljs.calendar.day_click = (function spectra_cljs$calendar$day_click(date,jsevent,view){
if(cljs.core._EQ_.call(null,"basicDay",view.name)){
spectra_cljs.calendar.cal_adjust.call(null,"changeView","month");
} else {
spectra_cljs.calendar.cal_adjust.call(null,"changeView","basicDay");
}

return spectra_cljs.calendar.cal_adjust.call(null,"gotoDate",date);
});
spectra_cljs.calendar.event_click = (function spectra_cljs$calendar$event_click(event,jsevent,view){
return spectra_cljs.update.go_node_BANG_.call(null,event.id,spectra_cljc.schema.event);
});
spectra_cljs.calendar.event_source = (function spectra_cljs$calendar$event_source(start,end,timezone,callback){
return callback.call(null,cljs.core.clj__GT_js.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"cal-events","cal-events",2030438409))));
});
spectra_cljs.calendar.cal_params = (function spectra_cljs$calendar$cal_params(){
return cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"events","events",1792552201),spectra_cljs.calendar.event_source,new cljs.core.Keyword(null,"dayClick","dayClick",-1376592651),spectra_cljs.calendar.day_click,new cljs.core.Keyword(null,"eventClick","eventClick",-2113452491),spectra_cljs.calendar.event_click], null));
});
spectra_cljs.calendar.cal_add_BANG_ = (function spectra_cljs$calendar$cal_add_BANG_(this$){
return spectra_cljs.calendar.cal_adjust.call(null,spectra_cljs.calendar.cal_params.call(null));
});
spectra_cljs.calendar.cal_render_BANG_ = (function spectra_cljs$calendar$cal_render_BANG_(this$){
spectra_cljs.calendar.cal_adjust.call(null,"render");

if(cljs.core._EQ_.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"tabid","tabid",-720881418)),(3))){
return spectra_cljs.calendar.cal_adjust.call(null,"refetchEvents");
} else {
return null;
}
});
spectra_cljs.calendar.cal_html = (function spectra_cljs$calendar$cal_html(){
if(cljs.core._EQ_.call(null,spectra_cljs.state.look.call(null,new cljs.core.Keyword(null,"tabid","tabid",-720881418)),(3))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#calendarbox","div#calendarbox",-19589578),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"height","height",1025178622),"600px",new cljs.core.Keyword(null,"width","width",-384071477),"1000px"], null)], null)], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#calendarbox","div#calendarbox",-19589578),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"height","height",1025178622),"599px",new cljs.core.Keyword(null,"width","width",-384071477),"999px"], null)], null)], null);
}
});
spectra_cljs.calendar.calendar_box = (function spectra_cljs$calendar$calendar_box(){
return reagent.core.create_class.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),spectra_cljs.calendar.cal_add_BANG_,new cljs.core.Keyword(null,"component-did-update","component-did-update",-1468549173),spectra_cljs.calendar.cal_render_BANG_,new cljs.core.Keyword(null,"display-name","display-name",694513143),"calendar-tab",new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),spectra_cljs.calendar.cal_html], null));
});

//# sourceMappingURL=calendar.js.map?rel=1468744497851