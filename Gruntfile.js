	module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("sturdy-validator.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			dist: {
				src: ["src/sturdy-validator.js"],
				dest: "dist/sturdy-validator.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Copy definitions
		copy: {
		  main: {
		    files: [
		      {
		      	expand: true,
		      	flatten: true,
		      	src: ['node_modules/qunit/node_modules/qunitjs/qunit/qunit.js'],
		      	dest: 'tests/'
		      }
		    ],
		  },
		},

		// Lint definitions
		jshint: {
			files: ["src/sturdy-validator.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/sturdy-validator.js"],
				dest: "dist/sturdy-validator.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
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

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["jshint", "concat", "copy", "uglify"]);
	grunt.registerTask("travis", ["jshint"]);

};
