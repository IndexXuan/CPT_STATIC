!function(gmu,$,undefined){gmu.define("Navigator",{options:{content:null,event:"click"},template:{list:"<ul>",item:'<li><a<% if( href ) { %> href="<%= href %>"<% } %>><%= text %></a></li>'},_create:function(){var renderer,html,me=this,opts=me._options,$el=me.getEl(),$list=$el.find("ul").first(),name="ui-"+me.widgetName;!$list.length&&opts.content?($list=$(me.tpl2html("list")),renderer=me.tpl2html("item"),html="",opts.content.forEach(function(item){item=$.extend({href:"",text:""},"string"==typeof item?{text:item}:item),html+=renderer(item)}),$list.append(html).appendTo($el)):($el.is("ul, ol")&&($list=$el.wrap("<div>"),$el=$el.parent()),opts.index===undefined&&(opts.index=$list.find(".ui-state-active").index(),~opts.index||(opts.index=0))),me.$list=$list.addClass(name+"-list"),me.trigger("done.dom",$el.addClass(name),opts),$list.highlight("ui-state-hover","li"),$list.on(opts.event+me.eventNs,"li:not(.ui-state-disable)>a",function(e){me._switchTo($(this).parent().index(),e)}),me.index=-1,me.switchTo(opts.index)},_switchTo:function(to,e){if(to!==this.index){var cur,me=this,list=me.$list.children(),evt=gmu.Event("beforeselect",e);if(me.trigger(evt,list.get(to)),!evt.isDefaultPrevented())return cur=list.removeClass("ui-state-active").eq(to).addClass("ui-state-active"),me.index=to,me.trigger("select",to,cur[0])}},switchTo:function(to){return this._switchTo(~~to)},unselect:function(){this.index=-1,this.$list.children().removeClass("ui-state-active")},getIndex:function(){return this.index}})}(gmu,gmu.$);