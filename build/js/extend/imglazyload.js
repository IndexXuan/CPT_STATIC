!function($){var pedding=[];$.fn.imglazyload=function(opts){function isInViewport(offset){var viewOffset=isWindow?window:$viewPort.offset(),viewTop=viewOffset[OFFSET.win[0]],viewHeight=viewOffset[OFFSET.win[1]];return viewTop>=offset[OFFSET.img[0]]-opts.threshold-viewHeight&&viewTop<=offset[OFFSET.img[0]]+offset[OFFSET.img[1]]}function _load(div){var $div=$(div),attrObj={},$img=$div;isImg||($.each($div.get(0).attributes,function(){~this.name.indexOf("data-")&&(attrObj[this.name]=this.value)}),$img=$("<img />").attr(attrObj)),$div.trigger("startload"),$img.on("load",function(){!isImg&&$div.replaceWith($img),$div.trigger("loadcomplete"),$img.off("load")}).on("error",function(){var errorEvent=$.Event("error");$div.trigger(errorEvent),errorEvent.defaultPrevented||pedding.push(div),$img.off("error").remove()}).attr("src",$div.attr(opts.urlName))}function _detect(){var i,$image,offset,div;for(i=pedding.length;i--;)$image=$(div=pedding[i]),offset=$image.offset(),isInViewport(offset)&&(splice.call(pedding,i,1),_load(div))}function _addPlsHolder(){!isImg&&$plsHolder&&$(pedding).append($plsHolder)}var splice=Array.prototype.splice,opts=$.extend({threshold:0,container:window,urlName:"data-url",placeHolder:"",eventName:"scrollStop",innerScroll:!1,isVertical:!0},opts),$viewPort=$(opts.container),isVertical=opts.isVertical,isWindow=$.isWindow($viewPort.get(0)),OFFSET={win:[isVertical?"scrollY":"scrollX",isVertical?"innerHeight":"innerWidth"],img:[isVertical?"top":"left",isVertical?"height":"width"]},$plsHolder=$(opts.placeHolder).length?$(opts.placeHolder):null,isImg=$(this).is("img");return!isWindow&&(OFFSET.win=OFFSET.img),pedding=Array.prototype.slice.call($(pedding.reverse()).add(this),0).reverse(),$.isFunction($.fn.imglazyload.detect)?(_addPlsHolder(),this):($(document).ready(function(){_addPlsHolder(),_detect()}),!opts.innerScroll&&$(window).on(opts.eventName+" ortchange",function(){_detect()}),$.fn.imglazyload.detect=_detect,this)}}(Zepto);