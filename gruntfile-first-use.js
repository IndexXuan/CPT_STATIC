module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    
    grunt.initConfig( {

        pkg: grunt.file.readJSON('package.json'),

        watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },

            js: {
                files: ['assets/js/*.js'],
                tasks: ['uglify', 'concat']
            },

            css: {
                files: ['assets/sass/*.scss'],
                tasks: ['buildcss']
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

        uglify: {
            build: {
                files: {
                    'build/js/base.js': ['assets/js/base-debug.js'],
                    'build/js/common.js': ['assets/js/common-debug.js']
                }
            }
        },

        concat: {
            dist: {  
                src: ['build/js/common.js', 'build/js/base.js'],  
                dest: 'build/script/app.js' 
            }  
        },

        cssc: {
            build: {
                options: {
                    consolidateViaDeclarations: true,
                    consolidateViaSelectors:    true,
                    consolidateMediaQueries:    true
                },
                files: {
                    'build/css/xx_layout_v1.css': 'build/css/xx_layout_v1.css',
                    'build/css/common.css': 'build/css/common.css',
                    'build/css/base.css': 'build/css/base.css',
                }
            }
        },
         
        cssmin: {
            minify: {
                expand: true,
                cwd: 'assets/sass/',
                src: ['*.scss'],
                dest: 'build/css/',
                ext: '.min.css'
            },
            combine: {
                files: {
                  'css/style.min.css': ['build/css/xx_layout_v1.min.css', 'build/css/common.min.css']
                }
            }
        },
         
        sass: {
            build: {
                files: {
                    'build/css/xx_layout_v1.css': 'assets/sass/xx_layout_v1.scss',
                    'build/css/common.css': 'assets/sass/common.scss',
                    'build/css/master.css': 'assets/sass/master.scss',
                }
            }
        }

    });
 
    grunt.registerTask('default', []);
    grunt.registerTask('buildcss',  ['sass', 'cssc', 'cssmin', 'concat']);
 
};