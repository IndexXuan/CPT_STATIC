!function($){$.extend($,{throttle:function(delay,fn,debounce_mode){function wrapper(){function exec(){last=Date.now(),fn.apply(that,args)}function clear(){timeId=void 0}var that=this,period=Date.now()-last,args=arguments;debounce_mode&&!timeId&&exec(),timeId&&clearTimeout(timeId),void 0===debounce_mode&&period>delay?exec():timeId=setTimeout(debounce_mode?clear:exec,void 0===debounce_mode?delay-period:delay)}var timeId,last=0;return"function"!=typeof fn&&(debounce_mode=fn,fn=delay,delay=250),wrapper._zid=fn._zid=fn._zid||$.proxy(fn)._zid,wrapper},debounce:function(delay,fn,t){return void 0===fn?$.throttle(250,delay,!1):$.throttle(delay,fn,void 0===t?!1:t!==!1)}})}(Zepto);