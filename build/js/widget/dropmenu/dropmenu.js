!function(gmu,$){gmu.define("Dropmenu",{options:{content:null},template:{item:'<li><a <% if ( href ) { %>href="<%= href %>"<% } %>><% if ( icon ) { %><span class="ui-icon ui-icon-<%= icon %>"></span><% } %><%= text %></a></li>',divider:'<li class="divider"></li>',wrap:"<ul>"},_init:function(){var me=this;me.on("done.dom",function(e,$root){me.$list=$root.find("ul").first().addClass("ui-dropmenu-items").highlight("ui-state-hover",".ui-dropmenu-items>li:not(.divider)")})},_create:function(){var me=this,opts=me._options,content="";"array"===$.type(opts.content)&&(opts.content.forEach(function(item){item=$.extend({href:"",icon:"",text:""},"string"==typeof item?{text:item}:item),content+=me.tpl2html("divider"===item.text?"divider":"item",item)}),opts.content=$(me.tpl2html("wrap")).append(content)),me.$super("_create"),me.$list.on("click"+me.eventNs,".ui-dropmenu-items>li:not(.ui-state-disable):not(.divider)",function(e){var evt=gmu.Event("itemclick",e);me.trigger(evt,this),evt.isDefaultPrevented()||me.hide()})}},gmu.Popover)}(gmu,gmu.$);