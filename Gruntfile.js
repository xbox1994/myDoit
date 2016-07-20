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
    });
    grunt.registerTask('development', ['browserify', 'shell:thin']);
    grunt.registerTask('dev', ['development']);
};
