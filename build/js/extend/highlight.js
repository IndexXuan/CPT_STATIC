!function($){function dismiss(){var cls=$el.attr("hl-cls");clearTimeout(timer),$el.removeClass(cls).removeAttr("hl-cls"),$el=null,$doc.off("touchend touchmove touchcancel",dismiss)}var $el,timer,$doc=$(document);$.fn.highlight=function(className,selector){return this.each(function(){var $this=$(this);$this.css("-webkit-tap-highlight-color","rgba(255,255,255,0)").off("touchstart.hl"),className&&$this.on("touchstart.hl",function(e){var match;$el=selector?(match=$(e.target).closest(selector,this))&&match.length&&match:$this,$el&&($el.attr("hl-cls",className),timer=setTimeout(function(){$el.addClass(className)},100),$doc.on("touchend touchmove touchcancel",dismiss))})})}}(Zepto);