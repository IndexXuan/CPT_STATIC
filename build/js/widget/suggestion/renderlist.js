!function($){$.extend(gmu.Suggestion.options,{isHistory:!0,usePlus:!1,listCount:5,renderlist:null}),gmu.Suggestion.option("renderlist",function(){return"function"!==$.type(this._options.renderlist)},function(){var me=this,$xssElem=$("<div></div>"),_xssFilter=function(str){return $xssElem.text(str).html()},_createList=function(query,sugs){var sug,len,i,opts=me._options,html=[],str="";if(!sugs||!sugs.length)return me.hide(),html;for(sugs=sugs.slice(0,opts.listCount),query=_xssFilter(query||""),i=0,len=sugs.length;len>i;i++)str=_xssFilter(sug=sugs[i]),query&&(str=$.trim(sug).replace(query,"<span>"+query+"</span>")),opts.usePlus&&(str+='<div class="ui-suggestion-plus" data-item="'+sug+'"></div>'),html.push("<li>"+str+"</li>");return html};me.on("ready",function(){var me=this,ns=me.eventNs,$form=$(me._options.form||me.getEl().closest("form"));$form.size()&&(me.$form=$form.on("submit"+ns,function(e){var submitEvent=gmu.Event("submit");me._options.isHistory&&me._localStorage(me.value()),me.trigger(submitEvent),submitEvent.isDefaultPrevented()&&e.preventDefault()})),me.$content.on("touchstart"+ns,function(e){e.preventDefault()}),me.$content.on("tap"+ns,function(e){var $input=me.getEl(),$elem=$(e.target);$elem.hasClass("ui-suggestion-plus")?$input.val($elem.attr("data-item")):$.contains(me.$content.get(0),$elem.get(0))&&setTimeout(function(){$input.val($elem.text()),me.trigger("select",$elem).hide().$form.submit()},400)}).highlight("ui-suggestion-highlight"),me.on("destroy",function(){$form.size()&&$form.off(ns),me.$content.off()})}),me.on("renderlist",function(e,data,query,callback){var ret=_createList(query,data);return callback(ret.length?"<ul>"+ret.join(" ")+"</ul>":"")})})}(gmu.$);