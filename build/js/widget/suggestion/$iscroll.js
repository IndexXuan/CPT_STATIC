!function(gmu,$){gmu.Suggestion.register("iscroll",{_init:function(){var me=this;return me.on("ready",function(){me.$scroller=$('<div class="ui-suggestion-scroller"></div>'),me.$content.wrapInner(me.$scroller).iScroll({hScroll:!1,onRefresh:function(){this.y&&this.scrollTo(0,0)}}),me.on("destroy",function(){me.$content.iScroll("destroy")})}),me},_fillWrapper:function(listHtml){return this.$clearBtn[this.value()?"hide":"show"](),listHtml?(this.show().$scroller.html(listHtml),this.$content.iScroll("refresh")):this.hide(),this}})}(gmu,gmu.$);