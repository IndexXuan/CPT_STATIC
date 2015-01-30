$(function() {
    
    /*个人资料*/
    $('.userLogd').qtip({
        content: $('.user_acts').html(),
        position: {
            my: 'top center',
            at: 'bottom center'
        },
        style: {
            classes: 'qtip-light',
            tip:{
                corner: false
            }
        },
        hide: {
            fixed: true,
            delay: 150
        }
    });
    /*每日签到*/
    $('.userSign').qtip({
        content: $('.sign_info').html(),
        position: {
            my: 'top center',
            at: 'bottom left'
        },
        style: {
            classes: 'qtip-light',
            tip:{
                corner: false
            }
        },
        hide: {
            fixed: true,
            delay: 150
        }
    });
    $('.user_msg').qtip({
        content: $('.msgbox').html(),
        position: {
            my: 'top center',
            at: 'bottom center'
        },
        style: {
            classes: 'qtip-light',
            tip:{
                corner: false
            }
        },
        hide: {
            fixed: true,
            delay: 150
        },
        show:{
            ready: false
        }
    });
    if( $('.nt').html() > 0 || $('.pm').html() > 0 ) {
        $('.user_msg').qtip({
            content: $('.msgbox').html(),
            position: {
                my: 'top center',
                at: 'bottom center'
            },
            style: {
                tip:{
                    corner: false
                }
            },
            hide: false,
            show:{
                ready: true
            }
        });
    }
    /*获取新消息*/
 /*   function get_new_msg(){
        $.get(getmsgurl,function(data){
            if(data.num>0){
                new_message_arrived(data.num);
            }
        });
    }
    get_new_msg();
    function new_message_arrived(num){
        $('.user_msg').qtip({
            content: "<a href='http://www.chipotian.com/message.html'>您有"+num+"条未读消息</a>",
            show: {
                ready: true
            },
            hide: false,
            style: {
                classes: 'qtip-light',
                tip:{
                    corner: false
                }
            }
        });
    }*/
    //每日签到
    $('.diary-sign').click(function() {
        $.get(signUrl, function( json ) {
            if ( json.status == 1 ) {
                dialog('succeed', json.info);
                $('.diary-sign').html('今日已签到');
            } else {
                dialog('error',json.info);
            }
        })
    });
    $('.signd').click(function() {
        art.dialog({
            lock: true,
            background: '#000', // 背景色
            opacity: 0.85,	// 透明度
            content: "<p align='center'>您今天已经签过到了，"+$('.total_sign').html()+"<br><br><button class='btn btn-warning btn-use-jf'>立即使用积分</button></p>",
            title:'每日签到送积分',
            width:380,
            fixed: true
        });
    });
    //全选的实现
    $(".check-all").click(function() {
        $(".ids").prop("checked", this.checked);
    });
    $(".ids").click(function() {
        var option = $(".ids");
        option.each(function(i){
            if ( !this.checked ) {
                $(".check-all").prop("checked", false);
                return false;
            }else{
                $(".check-all").prop("checked", true);
            }
        });
    });

    //ajax get请求
    $('.ajax-get').click(function() {
        var target;
        var that = this;
        if ( $(this).hasClass('confirm') ) {
            if ( !confirm('确认要执行该操作吗?') ) {
                return false;
            }
        }
        if ( (target = $(this).attr('href')) || (target = $(this).attr('url')) ) {
            $.get(target).success(function(data){
                if (data.status == 1 ) {
                    if ( data.url ) {
                        dialog('succeed',data.info + ' 页面即将自动跳转~');
                    } else {
                        dialog('succeed',data.info);
                    }
                    setTimeout(function(){
                        if ( data.url ) {
                            location.href = data.url;
                        } else if ( $(that).hasClass('no-refresh') ) {
                            $('#top-alert').find('button').click();
                        } else {
                            location.reload();
                        }
                    }, 1500);
                } else {
                    dialog('error', data.info);
                    setTimeout(function() {
                        if ( data.url ) {
                            location.href = data.url;
                        } else {
                            $('#top-alert').find('button').click();
                        }
                    }, 1500);
                }
            });

        }

        return false;
    });

    //ajax post submit请求
    $('.ajax-post').click(function() {
        if( form_elem_check != 1 ) return;
        var target, query,form;
        var target_form = $(this).attr('target-form');
        var that = this;
        var nead_confirm = false;
        if( ($(this).attr('type')=='submit') || (target = $(this).attr('href')) || (target = $(this).attr('url')) ) {
            form = $('.'+target_form);

            if ( $(this).attr('hide-data') === 'true'){//无数据时也可以使用的功能
                form = $('.hide-data');
                query = form.serialize();
            } else if ( form.get(0) == undefined) {
                return false;
            } else if ( form.get(0).nodeName == 'FORM' ) {
                if ( $(this).hasClass('confirm') ) {
                    if ( !confirm('确认要执行该操作吗?') ) {
                        return false;
                    }
                }
                if ( $(this).attr('url') !== undefined ) {
                    target = $(this).attr('url');
                } else {
                    target = form.get(0).action;
                }
                query = form.serialize();
            }else if( form.get(0).nodeName=='INPUT' || form.get(0).nodeName=='SELECT' || form.get(0).nodeName=='TEXTAREA' ) {
                form.each(function(k, v) {
                    if ( v.type == 'checkbox' && v.checked == true ) {
                        nead_confirm = true;
                    }
                })
                if ( nead_confirm && $(this).hasClass('confirm') ) {
                    if ( !confirm('确认要执行该操作吗?') ) {
                        return false;
                    }
                }
                query = form.serialize();
            } else {
                if ( $(this).hasClass('confirm') ) {
                    if ( !confirm('确认要执行该操作吗?') ) {
                        return false;
                    }
                }
                query = form.find('input,select,textarea').serialize();
            }
            $(that).addClass('disabled').attr('autocomplete','off').prop('disabled',true);
            $.post(target,query).success(function(data) {
                if ( data.status == 1 ) {
                    if ( data.url ) {
                        dialog('succeed',data.info + ' 页面即将自动跳转~');
                    } else {
                        dialog('succeed',data.info);
                    }
                    setTimeout(function() {
                        if ( data.url ) {
                            location.href=data.url;
                        } else if ( $(that).hasClass('no-refresh') ) {
                            $('#top-alert').find('button').click();
                            $(that).removeClass('disabled').prop('disabled',false);
                        } else {
                            location.reload();
                        }
                    }, 1500);
                } else {
                    dialog('error',data.info);
                    setTimeout(function() {
                        if ( data.url ) {
                            location.href = data.url;
                        } else {
                            $('#top-alert').find('button').click();
                            $(that).removeClass('disabled').prop('disabled',false);
                        }
                    }, 1500);
                }
            });
        }
        return false;
    });

    function fastLogin() { /* 快捷登陆 */
        art.dialog({
            title: '加入吃破天!',
            content: "<a href='http://www.chipotian.com/User/login/type/sina.html'><div class='fast_login_sina'></div></a><a href='http://www.chipotian.com/User/login/type/qq.html'><div  class='fast_login_qq'></div></a>",
            fixed: true,
            top: '40%'
        });

    }
    $('.fastLogin').click(function() {
        fastLogin();
    })

    //全局图片懒加载
   $(function() {
       $('img.lazy').lazyload({
           placeholder : "http://s.imchuke.com/static/img/pet.gif",
           effect : "fadeIn",
           threshold : 280 //敏感度，还差npx load
       });
   });
          /*
   *  方法；全屏浏览
   *  @param trigger     ->   激活全屏的按钮元素
   *  @param fullTarget  ->   全屏的元素
   */
   (function(trigger, fullTarget) {

       var runPrefixMethod = function(element, method) {
           var usablePrefixMethod;
           ["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
               if (usablePrefixMethod) return;
               if (prefix === "") {
                   // 无前缀，方法首字母小写
                   method = method.slice(0,1).toLowerCase() +  method.slice(1);

               }
               var typePrefixMethod = typeof element[prefix + method];
               if (typePrefixMethod + "" !== "undefined") {
                   if (typePrefixMethod === "function") {
                       usablePrefixMethod = element[prefix + method]();
                   } else {
                       usablePrefixMethod = element[prefix + method];
                   }
               }
           });

           return usablePrefixMethod;
       };

       if (typeof window.screenX === "number") {

           trigger.addEventListener("click", function(e) {
               if (runPrefixMethod(document, "FullScreen") || runPrefixMethod(document, "IsFullScreen")) {
                   runPrefixMethod(document, "CancelFullScreen");
               } else if (runPrefixMethod(fullTarget, "RequestFullScreen")) {
                   //...
               }
           });
           fullTarget.addEventListener("click", function(e) {
               if (runPrefixMethod(document, "FullScreen") || runPrefixMethod(document, "IsFullScreen")) {
                   runPrefixMethod(document, "CancelFullScreen");
                   $('.full-screen-trigger-btn').toggleClass('icon-exit-full-screen'); //click body, should also toggle ui
               }
           });

       } else {
           //console.log("爷，现在是年轻人的时代，您就暂且休息去吧~~");
       }
   })( document.getElementById('full-screen-trigger-btn'), document.getElementsByTagName('body')[0] ); //此处传参,ie不支持
   
   //ui toggle for full screen and exit fn.
   $('.full-screen-trigger-btn').on('click', function(e) {
       $(this).toggleClass('icon-exit-full-screen');
       e.stopPropagation(); //no bubble to body evt
   })

});



