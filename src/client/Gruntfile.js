var path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({
        appFolder: 'www',
        buildFolder: 'build',
        jshint: {
            all: {
                options: {
                    multistr: true
                },
                files: {
                    src: ['Gruntfile.js', '<%= appFolder %>/js/**/*.js', 'test/**/*.js']
                }
            }
        },
        compass: {
            build: {
                options: {
                    sassDir: '<%= appFolder %>/sass',
                    cssDir: '<%= buildFolder %>/css',
                    images: '<%= appFolder %>/img',
                    config: 'config_prod.rb'
                }
            }
        },
        clean: {
            build: ['<%= buildFolder %>/'],
            preCompress: ['<%= buildFolder %>/vendor'],
            fonts: ['<%= appFolder %>/fonts']
        },
        copy: {
            fonts: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: __dirname,
                    src: ['<%= appFolder %>/bower_components/ionic/release/fonts/*'],
                    dest: '<%= appFolder %>/fonts/'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    flatten: false,
                    cwd: __dirname + '/<%= appFolder %>/',
                    src: ['image/**', 'fonts/**', 'phonegap/**', 'js/admob.js'],
                    dest: '<%= buildFolder %>/'
                }]
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "<%= appFolder %>/js",
                    mainConfigFile: '<%= appFolder %>/js/main.js',
                    paths: {},
                    shim: {},
                    findNestedDependencies: true,
                    waitSeconds: 45,
                    optimizeAllPluginResources: true,
                    //How to optimize all the JS files in the build output directory.
                    //Right now only the following values
                    //are supported:
                    //- "uglify": (default) uses UglifyJS to minify the code.
                    //- "uglify2": in version 2.1.2+. Uses UglifyJS2.
                    //- "closure": uses Google's Closure Compiler in simple optimization
                    //mode to minify the code. Only available if running the optimizer using
                    //Java.
                    //- "closure.keepLines": Same as closure option, but keeps line returns
                    //in the minified files.
                    //- "none": no minification will be done.
                    optimize: 'none',
                    uglify: {
                        beautify: false,
                        no_mangle: false,
                        no_mangle_functions: false,
                        no_squeeze: false,
                        mangle_toplevel: true,
                        no_copyright: true
                    },
                    name: 'main',
                    // modules: [{
                    //     name: 'main'
                    // }, {
                    //     name: 'index/bootstrap',
                    //     exclude: ['main']
                    // }, {
                    //     name: 'admin/bootstrap',
                    //     exclude: ['main']
                    // }],
                    // dir: "<%= buildFolder %>"
                    out: "<%= buildFolder %>/js/main.js"
                }
            }
        },
        uglify: {
            build: {
                src: ['<%= appFolder %>/bower_components/requirejs/require.js'],
                dest: '<%= buildFolder %>/bower_components/requirejs/require.js'
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'dist/dist.zip'
                },
                files: [{
                    src: ['<%= buildFolder %>/**']
                }]
            }
        },
        concurrent: {
            build: ['compass:build', 'requirejs:compile', 'copy:build', 'uglify'],
            preBuild: [ /*'jshint', */ 'clean:build' /*, 'docco'*/ ]
        },
        ngtemplates: {
            'mySales.template': {
                src: '<%= appFolder %>/js/**/*.html',
                dest: '<%= appFolder %>/js/template.js',
                options: {
                    url: function(url) {
                        // remove "<%= appFolder %>/" from URLs
                        return url.substr(4);
                    },
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    },
                    standalone: true
                }
            }
        },
        nggettext_extract: {
            pot: {
                files: {
                    'locale/template.pot': ['<%= appFolder %>/js/**/*.html', '<%= appFolder %>/js/**/*.js']
                }
            }
        },
        nggettext_compile: {
            all: {
                options: {
                    // module: 'wedia.finance.index.locale'
                },
                files: [{
                    expand: true,
                    src: 'locale/*.po',
                    dest: '<%= appFolder %>/js',
                    ext: '.js'
                }]
            }
        },
        karma: {
            unit: {
                configFile: 'config/karma.conf.js'
            }
        },
        htmlbuild: {
            indexHtmlForPhonegap: {
                src: '<%= appFolder %>/index.html',
                dest: '<%= buildFolder %>/index.html',
                options: {
                    beautify: true,
                    relative: false,
                    scripts: {
                        bundle: {
                            cwd: '<%= buildFolder %>/phonegap',
                            files: [
                                'cordova.js'
                            ]
                        }
                    },
                    data: {
                        weinre: {}
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-angular-gettext');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-html-build');

    grunt.registerTask('default', ['jshint', 'karma']);
    grunt.registerTask('init', ['clean:fonts', 'copy:fonts']);
    grunt.registerTask('lang', ['nggettext_extract', 'nggettext_compile']);
    grunt.registerTask('template', ['ngtemplates']);
    grunt.registerTask('build', ['init', 'ngtemplates', 'concurrent:preBuild', 'concurrent:build', 'htmlbuild:indexHtmlForPhonegap', 'clean:preCompress']);
};