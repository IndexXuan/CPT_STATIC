!function(gmu){gmu.Slider.template.item='<div class="ui-slider-item"><a href="<%= href %>"><img lazyload="<%= pic %>" alt="" /></a><% if( title ) { %><p><%= title %></p><% } %></div>',gmu.Slider.register("lazyloadimg",{_init:function(){this.on("ready slide",this._loadItems)},_loadItems:function(){var i,len,opts=this._options,loop=opts.loop,viewNum=opts.viewNum||1,index=this.index;for(i=index-viewNum,len=index+2*viewNum;len>i;i++)this.loadImage(loop?this._circle(i):i)},loadImage:function(index){var images,item=this._items[index];return item&&(images=gmu.staticCall(item,"find","img[lazyload]"),images.length)?void images.each(function(){this.src=this.getAttribute("lazyload"),this.removeAttribute("lazyload")}):this}})}(gmu);