module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Builds Sass
        sass: {
            dev: {
                options: {
                    includePaths: ['govuk_components/public/sass'],
                    outputStyle: 'compressed',
                    imagePath: '../images'
                },
                files: {
                    'dist/stylesheets/dvsa.css': 'src/stylesheets/dvsa.scss',
                    'dist/stylesheets/dvsa-ie6.css': 'src/stylesheets/dvsa-ie6.scss',
                    'dist/stylesheets/dvsa-ie7.css': 'src/stylesheets/dvsa-ie7.scss',
                    'dist/stylesheets/dvsa-ie8.css': 'src/stylesheets/dvsa-ie8.scss'
                }
            }
        },

        scsslint: {
            dev: [
                'src/**/*.scss'
            ],
            options: {
              bundleExec: false,
              config: 'scss-lint.yml',
              colorizeOutput: true
            },
        },

        imagemin: {
            options: {
                optimizationLevel: 3
            },
            dist: {
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'src/images/', // Src matches are relative to this path
                    src: ['**/*.{png,jpg,jpeg,gif}'], // Actual patterns to match
                    dest: 'dist/images/' // Destination path prefix
                }]
            }
        },

        watch: {
            css: {
                files: 'src/scss/**/*.scss',
                tasks: ['build:css'],
                options: {
                    interrupt: true,
                    livereload: true,
                },
            },
            js: {
                files: ['src/javascripts/dvsa.js','src/javascripts/dvsa/*.js', 'src/javascripts/main.js'],
                tasks: ['build:js'],
                options: {
                    interrupt: true,
                    livereload: true,
                }
            }
        },

        concat: {
            js: {
                src: [
                    'src/javascripts/dvsa.js',
                    'src/javascripts/dvsa/*.js',
                    // main.js always last !
                    'src/javascripts/main.js',
                ],
                dest: 'dist/javascripts/dvsa.js'
            }
        },

        // Options are in the .jshintrc
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                // See https://jslinterrors.com
                '-W083': true, // Functions in loop error.
                '-W004': true, // {a} already defined. This is happening whether we are checking for option config object.
            },
            beforeconcat: ['src/javascripts/dvsa.js', 'src/javascripts/dvsa/*.js', 'src/javascripts/main.js'],
            afterconcat: ['dist/javascripts/dvsa.js']
        },

        shell: {
            options: {
                stderr: false
            },
            wraith: {
                command: 'wraith capture tests/wraith/configs/config.yaml && open tests/wraith/shots/gallery.html'
            }
        },

        uglify: {
            authentication: {
                options: {
                    mangle: false,
                    sourceMap: false,
                    compress: {
                        drop_console: true
                    },
                    // the banner is inserted at the top of the output
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'dist/javascripts/authentication.js': ['src/javascripts/dvsa/authentication.js']
                }
            },
            viewScripts: {
                options: {
                    mangle: false,
                    sourceMap: false,
                    compress: {
                        drop_console: true
                    },
                    // the banner is inserted at the top of the output
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'dist/javascripts/dataTables.events.min.js': ['src/javascripts/viewScripts/dataTables.events.js']
                }
            },
            mainScripts: {
                options: {
                    mangle: false,
                    sorceMap: false,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'dist/javascripts/dvsa.js': ['dist/javascripts/dvsa.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');

    // Build assets from src files
    grunt.registerTask('build:css', [ 'sass:dev']);
    grunt.registerTask('build:img', ['imagemin:dist']);
    grunt.registerTask('build:js', ['jshint:beforeconcat', 'concat:js', 'jshint:afterconcat', 'uglify:authentication', 'uglify:viewScripts']);

    grunt.registerTask('build:no-lint', ['sass:dev', 'build:img', 'concat:js', 'uglify:authentication', 'uglify:viewScripts']);
    grunt.registerTask('build', ['build:css', 'build:img', 'build:js']);

    grunt.registerTask('watcher', ['watch']);

    // Copy assets to dist folder
    grunt.registerTask('dist', ['uglify:mainScripts', 'copy:todist']);
    grunt.registerTask('test:integration', ['shell:wraith']);

    // Default task that happens during development
    grunt.registerTask('default', ['build:css', 'build:js']);

    // Lint only task to output error in terminal
    grunt.registerTask('lint:scss', ['scsslint']);

};
