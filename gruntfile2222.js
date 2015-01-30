module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

     // LiveReload的默认端口号，你也可以改成你想要的端口号
    var lrPort = 8000;
    // 使用connect-livereload模块，生成一个与LiveReload脚本
    // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
    var lrSnippet = require('connect-livereload')({ port: lrPort });
    // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
    var lrMiddleware = function(connect, options) {
        return [
            // 把脚本，注入到静态文件中
            lrSnippet,
            // 静态文件服务器的路径
            connect.static(options.base),
            // 启用目录浏览(相当于IIS中的目录浏览)
            connect.directory(options.base)
        ];
    };
    
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        connect: {
            options: {
                // 服务器端口号
                port: 8000,
                // 服务器地址(可以使用主机名localhost，也能使用IP)
                hostname: 'localhost',
                // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
                base: '.'
            },
            livereload: {
                options: {
                    // 通过LiveReload脚本，让页面重新加载。
                    middleware: lrMiddleware
                }
            }
        },

        watch: {
            options: {
                livereload: lrPort
            },
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },

            js: {
                files: ['assets/js/**/*.js', 'assets/js/*.js'],
                tasks: ['uglify', 'concat:js']
            },

            css: {
                files: ['assets/css/*.css'],
                tasks: ['cssmin','concat:css']
            }
        },

        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['index.html']
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'assets/css/',
                src: ['*.css'],
                dest: 'build/css/',
                ext: '.min.css'
            }
        },

        uglify: {
            options: {
                //banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n'//添加banner
            },
            buildall: {//按原文件结构压缩js文件夹内所有JS文件
                options: {
                    mangle: false, //不混淆变量名
                    preserveComments: 'some', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                },
                files: [{
                    expand: true,
                    cwd: 'assets/js',//js目录下
                    src: '**/*.js',//所有js文件
                    dest: 'build/js'//输出到此目录下
                }]
            }
        },

        concat: {
            options: {
                mangle: false, //不混淆变量名
                preserveComments: 'some', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                banner:'/*! \n  Project  Name: <%= pkg.name %> \n  Last Modified: <%= grunt.template.today("yyyy-mm-dd") %>\n*/\n'//添加banner
            },
            js: {  
                src: [
                    'build/js/core/gmu.js',
                    'build/js/core/event.js',
                    'build/js/core/widget.js',
                    'build/js/extend/imglazyload.js',
                    'build/js/extend/touch.js',
                    'build/js/extend/matchMedia.js',
                    'build/js/extend/event.ortchange.js',
                    'build/js/extend/parseTpl.js',
                    'build/js/extend/iscroll.js',
                    'build/js/extend/fix.js',
                    'build/js/extend/throttle.js',
                    'build/js/extend/event.scrollStop.js',
                    'build/js/widget/slider/slider.js',
                    'build/js/widget/slider/arrow.js',
                    'build/js/widget/slider/dots.js',
                    'build/js/widget/slider/$touch.js',
                    'build/js/widget/slider/$autoplay.js',
                    'build/js/widget/gotop/gotop.js',
                    'build/js/widget/refresh/refresh.js',
                    'build/js/widget/refresh/$lite.js',
                    'build/js/widget/panel/panel.js',
                    'build/js/extend/highlight.js',
                    'build/js/extend/offset.js',
                    'build/js/extend/position.js',
                    'build/js/widget/dialog/dialog.js',
                    'build/js/widget/dialog/$position.js',
                    'build/js/widget/navigator/navigator.js',
                    'build/js/widget/navigator/scrolltonext.js',
                    'build/js/widget/navigator/$scrollable.js',
                    'build/js/widget/navigator/evenness.js'
                ],  
                dest: 'build/script/app-build.js' 
            },  

            css : {
                src: ['build/css/bs_form.min.css', 'build/css/bs_alert.min.css', 'build/css/bs_btn.min.css', 'build/css/xx_layout.min.css', 'build/css/app1.min.css'],
                dest:'build/stylesheet/app-build.css'
            }
        },

    });
 
    grunt.registerTask('default', []);
    grunt.registerTask('live', ['connect', 'watch']);
    //grunt.registerTask('buildcss',  ['cssmin']);
 
};