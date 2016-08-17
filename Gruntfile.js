/*global module:false*/
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        shell: {
            thin: {
                options: {
                    stdout: true,
                    stderr: true,
                    failOnError: true
                },
                command: 'ruby web.rb'
            }
        },
        browserify: {
            development: {
                files: {
                    'views/js/app/main.js': ['views/js/main.js']
                }
            }
        },
        concat:{
            css:{
                src:[
                    'views/css/bootstrap.min.css',
                    'views/css/jquery-ui.css',
                    'views/css/main.css'
                ],
                dest: 'views/css/app.min.css'
            },
            js: {
                src: [
                    'views/js/jquery.min.js',
                    'views/js/bootstrap.min.js',
                    'views/js/jquery-ui.js',
                    'views/js/knockout-3.3.0.js',
                    'views/js/app/main.js'
                ],
                dest: 'views/js/app.min.js'
            }
        }
    });
    grunt.registerTask('build', ['concat:css'])
    grunt.registerTask('dev', ['concat:css', 'shell:thin'])
    grunt.registerTask('r', ['shell:thin'])
};
