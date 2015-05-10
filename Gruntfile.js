	module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON('package.json'),

		// Banner definitions
		meta: {
			banner: '/*\n' +
				' *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n' +
				' *  <%= pkg.description %>\n' +
				' *  <%= pkg.homepage %>\n' +
				' *\n' +
				' *  Made by <%= pkg.author.name %>\n' +
				' *  Under <%= pkg.licenses[0].type %> License\n' +
				' */\n'
		},

		// Lint definitions
		jshint: {
			files: ['src/formatbox.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Copy definitions
		copy: {
		  demo: {
		    files: [
		      {
		      	expand: true,
		      	flatten: true,
		      	src: ['node_modules/jquery/dist/jquery.js', 'tmp/formatbox.js'],
		      	dest: 'demo/public/js'
		      }
		    ]
		  },
		  tests: {
		    files: [
		      {
		      	expand: true,
		      	flatten: true,
		      	src: ['node_modules/qunit/node_modules/qunitjs/qunit/qunit.js',
		      				'node_modules/jquery/dist/jquery.js'],
		      	dest: 'tests'
		      }
		    ]
		  },
		  src: {
		    files: [
		      {
		      	expand: true,
		      	flatten: true,
		      	src: ['tmp/formatbox.js'],
		      	dest: 'dist'
		      }
		    ]
		  }
		},

		concat: {
      dependencies: {
        src: ['node_modules/is_js/is.js',
        			'node_modules/moment/moment.js',
        			'bower_components/formatter/dist/formatter.js',
        			'src/formatbox.js'],
        dest: 'tmp/formatbox.js'
      }
    },

		// Minify definitions
		uglify: {
			dist: {
				options: {
					banner: '<%= meta.banner %>'
				},
				src: ['tmp/formatbox.js'],
				dest: 'dist/formatbox.min.js'
			},
			options: {
				mangle: false,
				sourceMap: true
			}
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
	    files: ['src/*'],
	    tasks: ['default']
		}

	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'copy']);
};
