/*global module:false*/
module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		peg: {
			parser: {
				src: 'src/parser/parser.peg',
				dest: 'src/parser/parser.js',
				options: {
					wrapper: function (src, parser) {
						return 'export default ' + parser + ';';
					},
				},
			},
			parserExt: {
				src: 'src/parser/parserExt.peg',
				dest: 'src/parser/parserExt.js',
				options: {
					wrapper: function (src, parser) {
						return 'export default ' + parser + ';';
					},
				},
			},
		},
		concat: {
			jsdoc2md: {
				src: [
					'dist/View.js',
					'dist/SubView.js',
					'dist/VisualFormat.js',
					'dist/Attribute.js',
					'dist/Relation.js',
					'dist/Priority.js',
				],
				dest: 'tmp/concat.js',
			},
		},
		jsdoc2md: {
			output: {
				options: {
					'global-index-format': 'none',
					'module-index-format': 'none',
				},
				src: 'tmp/concat.js',
				dest: 'docs/AutoLayout.md',
			},
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
	grunt.loadNpmTasks('grunt-peg');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Tasks
	grunt.registerTask('doc', ['concat', 'jsdoc2md']);
	grunt.registerTask('parser', ['peg']);
};
