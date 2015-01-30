/*!
 * headroom.js v0.4.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */
!function(window,document){"use strict";function Debouncer(callback){this.callback=callback,this.ticking=!1}function extend(object){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var key,i,result=object||{};for(i=1;i<arguments.length;i++){var replacement=arguments[i]||{};for(key in replacement)result[key]="object"==typeof result[key]?extend(result[key],replacement[key]):result[key]||replacement[key]}return result}function Headroom(elem,options){options=extend(options,Headroom.options),this.lastKnownScrollY=0,this.elem=elem,this.debouncer=new Debouncer(this.update.bind(this)),this.tolerance=options.tolerance,this.classes=options.classes,this.offset=options.offset,this.initialised=!1,this.onPin=options.onPin,this.onUnpin=options.onUnpin}var features={bind:!!function(){}.bind,classList:"classList"in document.documentElement,rAF:!!(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame)};window.requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,Debouncer.prototype={constructor:Debouncer,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},Headroom.prototype={constructor:Headroom,init:function(){return Headroom.cutsTheMustard?(this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var classes=this.classes;this.initialised=!1,window.removeEventListener("scroll",this.debouncer,!1),this.elem.classList.remove(classes.unpinned,classes.pinned,classes.initial)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,window.addEventListener("scroll",this.debouncer,!1))},unpin:function(){var classList=this.elem.classList,classes=this.classes;(classList.contains(classes.pinned)||!classList.contains(classes.unpinned))&&(classList.add(classes.unpinned),classList.remove(classes.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var classList=this.elem.classList,classes=this.classes;classList.contains(classes.unpinned)&&(classList.remove(classes.unpinned),classList.add(classes.pinned),this.onPin&&this.onPin.call(this))},getScrollY:function(){return void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop},getViewportHeight:function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},getDocumentHeight:function(){var body=document.body,documentElement=document.documentElement;return Math.max(body.scrollHeight,documentElement.scrollHeight,body.offsetHeight,documentElement.offsetHeight,body.clientHeight,documentElement.clientHeight)},isOutOfBounds:function(currentScrollY){var pastTop=0>currentScrollY,pastBottom=currentScrollY+this.getViewportHeight()>this.getDocumentHeight();return pastTop||pastBottom},toleranceExceeded:function(currentScrollY){return Math.abs(currentScrollY-this.lastKnownScrollY)>=this.tolerance},shouldUnpin:function(currentScrollY,toleranceExceeded){var scrollingDown=currentScrollY>this.lastKnownScrollY,pastOffset=currentScrollY>=this.offset;return scrollingDown&&pastOffset&&toleranceExceeded},shouldPin:function(currentScrollY,toleranceExceeded){var scrollingUp=currentScrollY<this.lastKnownScrollY,pastOffset=currentScrollY<=this.offset;return scrollingUp&&toleranceExceeded||pastOffset},update:function(){var currentScrollY=this.getScrollY(),toleranceExceeded=this.toleranceExceeded(currentScrollY);this.isOutOfBounds(currentScrollY)||(this.shouldUnpin(currentScrollY,toleranceExceeded)?this.unpin():this.shouldPin(currentScrollY,toleranceExceeded)&&this.pin(),this.lastKnownScrollY=currentScrollY)}},Headroom.options={tolerance:0,offset:0,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",initial:"headroom"}},Headroom.cutsTheMustard="undefined"!=typeof features&&features.rAF&&features.bind&&features.classList,window.Headroom=Headroom}(window,document);