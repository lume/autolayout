import {uglify} from 'rollup-plugin-uglify';

// we generate two output formats:
// - UMD in lib/AutoLayout.js
// - minified UMD in lib/AutoLayout.min.js

const umd = {
	input: 'es/AutoLayout.js',
	output: {
		file: 'lib/AutoLayout.js',
		format: 'umd',
		name: 'AutoLayout',
		exports: 'named',
	},
};
const minified = {
	...umd,
	output: {
		...umd.output,
		file: 'lib/AutoLayout.min.js',
	},
	plugins: [
		uglify({
			output: {
				preamble: '',
			},
		}),
	],
};

export default [umd, minified];
