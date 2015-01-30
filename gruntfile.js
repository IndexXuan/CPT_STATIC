module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        watch: {
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
    //grunt.registerTask('buildcss',  ['cssmin']);
 
};