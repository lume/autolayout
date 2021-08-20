/*global describe, it*/
var assert = typeof window === 'undefined' ? require('assert') : window.chai.assert;

/** @type {Promise<typeof import('../es/AutoLayout.js').default>} */
var AutoLayout = Promise.resolve(
	typeof window === 'undefined' ? import('../es/AutoLayout.js').then(m => m.default) : window.AutoLayout,
);

describe('VisualFormat', function () {
	describe('parse', function () {
		it('should return 2 contraints for: ' + '|[child]|', async function () {
			var constraints = (await AutoLayout).VisualFormat.parse('|[child]|');
			assert.equal(2, constraints.length);
		});
		it('should return 1 contraint for: ' + '[child][child2]', async function () {
			var constraints = (await AutoLayout).VisualFormat.parse('[child][child2]');
			assert.equal(1, constraints.length);
		});
		it('should return 1 contraint for: ' + '[child(60)] with constant 60', async function () {
			var constraints = (await AutoLayout).VisualFormat.parse('[child(60)]');
			assert.equal(1, constraints.length);
			assert.equal(constraints[0].constant, 60);
		});
		it('should return 1 contraint for: ' + '[child(60.6666)] with constant 60.6666', async function () {
			var constraints = (await AutoLayout).VisualFormat.parse('[child(60.6666)]');
			assert.equal(1, constraints.length);
			assert.equal(constraints[0].constant, 60.6666);
		});
	});
});
