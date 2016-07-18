// Compiled by ClojureScript 1.9.93 {}
goog.provide('spectra_cljs.regex');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('spectra_cljc.schema');
spectra_cljs.regex.node_param_regex = /\<node([^\>]+)\>/;
spectra_cljs.regex.node_regex = /\<node((.(?!node\>))+)\/node\>/;
spectra_cljs.regex.url_regex = /\<url((.(?!url\>))+)\/url\>/;
spectra_cljs.regex.bracket_regex = /\>(.+)\</;
spectra_cljs.regex.esc_char_regex = /\^|\[|\]|\.|\$|\{|\}|\(|\)|\\|\*|\+|\||\?|\<|\>/;
spectra_cljs.regex.node_map = (function spectra_cljs$regex$node_map(hypertext){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.second.call(null,cljs.core.first.call(null,cljs.core.re_seq.call(null,spectra_cljs.regex.bracket_regex,hypertext))),new cljs.core.Keyword(null,"link","link",-1769163468),cljs.core.subs.call(null,cljs.core.second.call(null,cljs.core.first.call(null,cljs.core.re_seq.call(null,spectra_cljs.regex.node_param_regex,hypertext))),(1)),new cljs.core.Keyword(null,"original","original",-445386197),hypertext,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"node","node",581201198)], null);
});
spectra_cljs.regex.url_truncate = (function spectra_cljs$regex$url_truncate(url){
if((cljs.core.count.call(null,url) > (30))){
return [cljs.core.str(cljs.core.subs.call(null,url,(0),(30))),cljs.core.str("...")].join('');
} else {
return url;
}
});
spectra_cljs.regex.url_map = (function spectra_cljs$regex$url_map(hypertext){
var url = cljs.core.second.call(null,cljs.core.first.call(null,cljs.core.re_seq.call(null,spectra_cljs.regex.bracket_regex,hypertext)));
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"text","text",-1790561697),spectra_cljs.regex.url_truncate.call(null,url),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"url","url",276297046),new cljs.core.Keyword(null,"link","link",-1769163468),url,new cljs.core.Keyword(null,"original","original",-445386197),hypertext], null);
});
spectra_cljs.regex.node_parse = (function spectra_cljs$regex$node_parse(text){
return cljs.core.map.call(null,spectra_cljs.regex.node_map,cljs.core.map.call(null,cljs.core.first,cljs.core.re_seq.call(null,spectra_cljs.regex.node_regex,text)));
});
spectra_cljs.regex.url_parse = (function spectra_cljs$regex$url_parse(text){
return cljs.core.map.call(null,spectra_cljs.regex.url_map,cljs.core.map.call(null,cljs.core.first,cljs.core.re_seq.call(null,spectra_cljs.regex.url_regex,text)));
});
spectra_cljs.regex.links_parse = (function spectra_cljs$regex$links_parse(text){
return cljs.core.apply.call(null,cljs.core.concat,cljs.core.juxt.call(null,spectra_cljs.regex.node_parse,spectra_cljs.regex.url_parse).call(null,text));
});
spectra_cljs.regex.regex_escape = (function spectra_cljs$regex$regex_escape(text){
return clojure.string.replace.call(null,text,spectra_cljs.regex.esc_char_regex,(function (p1__23546_SHARP_){
return [cljs.core.str("\\"),cljs.core.str(p1__23546_SHARP_)].join('');
}));
});

//# sourceMappingURL=regex.js.map?rel=1468803196595