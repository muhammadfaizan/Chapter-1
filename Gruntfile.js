'use strict';

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var config = {};
    config['clean'] = {
        build: {
            files: [{
                dot: true, // true to include hidden files
                src: [
                    'dist/*',
                    '!dist/.git'
                ]
            }]
        }
    };

    //you should clean the HTML file index.html.
    config['htmlmin'] = {
        build: {
            options: {
                collabseBooleanAttributes: true, //Note that the collapseBooleanAttributes option will aid in removing unnecessary attribute assignments for Boolean attributes
                removeAttributesQuotes: true, //removeAttributeQuotes option will remove quotes from attribute assignments where possible
                removeReduntantAttributes: true, //turning the removeRedundantAttributes option on, you can remove attributes such as type="text/javascript".
                removeEmptyAttributes: true //turn on removeEmptyAttributes to remove attributes assigned with empty strings
            },
            files: [{
                expand: true,
                cwd: 'src',
                src: '{,*/}*.html',
                dest: 'dist'
            }]
        }
    };
    //The grunt-usemin plugin will be used to minimize and concatenate all JavaScript files involved in this project.
    config['useminPrepare'] = {
        options: {
            dest: 'dist'
        },
        html: 'src/index.html'
    };

    config['usemin'] = {
        options: {
            dirs: ['dist']
        },
        html: ['dist/{,*/}*.html']
    };

    config['uglify'] = {
        options: {
            mangle: false
        }
    };

    //its hash will subsequently be updated, causing an update to the filename. This is effectively cache busting the browser
    config['rev'] = {
        files: {
            src: [
                'dist/scripts/{,*/}*.js',
            ]
        }
    };

    grunt.initConfig(config);

    //you can complete the Gruntfile
    //These are the tasks that will run synchronously when the 'grunt build' command is run
    var tasks = [
        'clean',
        'useminPrepare',
        'htmlmin',
        'concat',
        'uglify',
        'rev',
        'usemin'
    ];


    grunt.registerTask('build', tasks);
};