$(function(){
    function emlSticTop(){
        //滚动时导航条停留顶部
        var elm = $('#navbar');
        var startPos = $(elm).offset().top;//200较之原来的$(elm).offset().top好，原来的代码一滚动就到顶固定
        $.event.add(window, "scroll", function() {
            var otop = $(window).scrollTop();
            $(elm).css('position',((otop) > startPos) ? 'fixed' : 'static');
        });
    }
    if($('#navbar').length>0){
        emlSticTop();
    }
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
    if($('.nt').html()>0 || $('.pm').html()>0){
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
    $('.diary-sign').click(function(){
        $.get(signUrl,function(json){
            if(json.status==1){
                dialog('succeed',json.info);
                $('.diary-sign').html('今日已签到');
            }else{
                dialog('error',json.info);
            }
        })
    });
    $('.signd').click(function(){
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
    $(".check-all").click(function(){
        $(".ids").prop("checked", this.checked);
    });
    $(".ids").click(function(){
        var option = $(".ids");
        option.each(function(i){
            if(!this.checked){
                $(".check-all").prop("checked", false);
                return false;
            }else{
                $(".check-all").prop("checked", true);
            }
        });
    });

    //ajax get请求
    $('.ajax-get').click(function(){
        var target;
        var that = this;
        if ( $(this).hasClass('confirm') ) {
            if(!confirm('确认要执行该操作吗?')){
                return false;
            }
        }
        if ( (target = $(this).attr('href')) || (target = $(this).attr('url')) ) {
            $.get(target).success(function(data){
                if (data.status==1) {
                    if (data.url) {
                        dialog('succeed',data.info + ' 页面即将自动跳转~');
                    }else{
                        dialog('succeed',data.info);
                    }
                    setTimeout(function(){
                        if (data.url) {
                            location.href=data.url;
                        }else if( $(that).hasClass('no-refresh')){
                            $('#top-alert').find('button').click();
                        }else{
                            location.reload();
                        }
                    },1500);
                }else{
                    dialog('error',data.info);
                    setTimeout(function(){
                        if (data.url) {
                            location.href=data.url;
                        }else{
                            $('#top-alert').find('button').click();
                        }
                    },1500);
                }
            });

        }
        return false;
    });

    //ajax post submit请求
    $('.ajax-post').click(function(){
        if(form_elem_check!=1) return;
        var target,query,form;
        var target_form = $(this).attr('target-form');
        var that = this;
        var nead_confirm=false;
        if( ($(this).attr('type')=='submit') || (target = $(this).attr('href')) || (target = $(this).attr('url')) ){
            form = $('.'+target_form);

            if ($(this).attr('hide-data') === 'true'){//无数据时也可以使用的功能
                form = $('.hide-data');
                query = form.serialize();
            }else if (form.get(0)==undefined){
                return false;
            }else if ( form.get(0).nodeName=='FORM' ){
                if ( $(this).hasClass('confirm') ) {
                    if(!confirm('确认要执行该操作吗?')){
                        return false;
                    }
                }
                if($(this).attr('url') !== undefined){
                    target = $(this).attr('url');
                }else{
                    target = form.get(0).action;
                }
                query = form.serialize();
            }else if( form.get(0).nodeName=='INPUT' || form.get(0).nodeName=='SELECT' || form.get(0).nodeName=='TEXTAREA') {
                form.each(function(k,v){
                    if(v.type=='checkbox' && v.checked==true){
                        nead_confirm = true;
                    }
                })
                if ( nead_confirm && $(this).hasClass('confirm') ) {
                    if(!confirm('确认要执行该操作吗?')){
                        return false;
                    }
                }
                query = form.serialize();
            }else{
                if ( $(this).hasClass('confirm') ) {
                    if(!confirm('确认要执行该操作吗?')){
                        return false;
                    }
                }
                query = form.find('input,select,textarea').serialize();
            }
            $(that).addClass('disabled').attr('autocomplete','off').prop('disabled',true);
            $.post(target,query).success(function(data){
                if (data.status==1) {
                    if (data.url) {
                        dialog('succeed',data.info + ' 页面即将自动跳转~');
                    }else{
                        dialog('succeed',data.info);
                    }
                    setTimeout(function(){
                        if (data.url) {
                            location.href=data.url;
                        }else if( $(that).hasClass('no-refresh')){
                            $('#top-alert').find('button').click();
                            $(that).removeClass('disabled').prop('disabled',false);
                        }else{
                            location.reload();
                        }
                    },1500);
                }else{
                    dialog('error',data.info);
                    setTimeout(function(){
                        if (data.url) {
                            location.href=data.url;
                        }else{
                            $('#top-alert').find('button').click();
                            $(that).removeClass('disabled').prop('disabled',false);
                        }
                    },1500);
                }
            });
        }
        return false;
    });
    function fastLogin(){
        art.dialog({
            title: '加入吃破天!',
            content: "<a href='http://www.chipotian.com/User/login/type/sina.html'><div class='fast_login_sina'></div></a><a href='http://www.chipotian.com/User/login/type/qq.html'><div  class='fast_login_qq'></div></a>",
            fixed: true,
            top: '40%'
        });

    }
    $('.fastLogin').click(function(){
        fastLogin();
    })
});

