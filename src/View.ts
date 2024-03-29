import * as kiwi from '@lume/kiwi'
import Attribute from './Attribute.js'
import Relation from './Relation.js'
import SubView from './SubView.js'

const defaultPriorityStrength = kiwi.Strength.create(0, 1000, 1000)

/**
 * AutoLayout API reference.
 *
 * ### Index
 *
 * |Entity|Type|Description|
 * |---|---|---|
 * |[AutoLayout](#autolayout)|`namespace`|Top level AutoLayout object.|
 * |[VisualFormat](#autolayoutvisualformat--object)|`namespace`|Parses VFL into constraints.|
 * |[View](#autolayoutview)|`class`|Main entity for adding & evaluating constraints.|
 * |[SubView](#autolayoutsubview--object)|`class`|SubView's are automatically created when constraints are added to views. They give access to the evaluated results.|
 * |[Attribute](#autolayoutattribute--enum)|`enum`|Attribute types that are supported when adding constraints.|
 * |[Relation](#autolayoutrelation--enum)|`enum`|Relationship types that are supported when adding constraints.|
 * |[Priority](#autolayoutpriority--enum)|`enum`|Default priority values for when adding constraints.|
 *
 * ### AutoLayout
 *
 * @module AutoLayout
 */
class View {
	declare _solver: kiwi.Solver
	declare _subViews: {}
	declare _parentSubView: SubView
	declare _spacing?: number | number[]
	declare _spacingVars?: kiwi.Variable[]
	declare _spacingExpr?: kiwi.Expression[]

	/**
	 * @class View
	 * @param {Object} [options] Configuration options.
	 * @param {Number} [options.width] Initial width of the view.
	 * @param {Number} [options.height] Initial height of the view.
	 * @param {Number|Object} [options.spacing] Spacing for the view (default: 8) (see `setSpacing`).
	 * @param {Array} [options.constraints] One or more constraint definitions (see `addConstraints`).
	 */
	constructor(options) {
		this._solver = new kiwi.Solver()
		this._subViews = {}
		this._parentSubView = new SubView({
			solver: this._solver,
		})
		this.setSpacing(options && options.spacing !== undefined ? options.spacing : 8)
		//this.constraints = [];
		if (options) {
			if (options.width !== undefined || options.height !== undefined) {
				this.setSize(options.width, options.height)
			}
			if (options.constraints) {
				this.addConstraints(options.constraints)
			}
		}
	}

	/**
	 * Sets the width and height of the view.
	 *
	 * @param {Number} width Width of the view.
	 * @param {Number} height Height of the view.
	 * @return {View} this
	 */
	setSize(width, height /*, depth*/) {
		this._parentSubView.intrinsicWidth = width
		this._parentSubView.intrinsicHeight = height
		return this
	}

	/**
	 * Width that was set using `setSize`.
	 * @readonly
	 * @type {Number}
	 */
	get width() {
		return this._parentSubView.intrinsicWidth
	}

	/**
	 * Height that was set using `setSize`.
	 * @readonly
	 * @type {Number}
	 */
	get height() {
		return this._parentSubView.intrinsicHeight
	}

	/**
	 * Width that is calculated from the constraints and the `.intrinsicWidth` of
	 * the sub-views.
	 *
	 * When the width has been explicitely set using `setSize`, the fittingWidth
	 * will **always** be the same as the explicitely set width. To calculate the size
	 * based on the content, use:
	 * ```javascript
	 * var view = new AutoLayout.View({
	 *   constraints: VisualFormat.parse('|-[view1]-[view2]-'),
	 *   spacing: 20
	 * });
	 * view.subViews.view1.intrinsicWidth = 100;
	 * view.subViews.view2.intrinsicWidth = 100;
	 * console.log('fittingWidth: ' + view.fittingWidth); // 260
	 * ```
	 *
	 * @readonly
	 * @type {Number}
	 */
	get fittingWidth() {
		return this._parentSubView.width
	}

	/**
	 * Height that is calculated from the constraints and the `.intrinsicHeight` of
	 * the sub-views.
	 *
	 * See `.fittingWidth`.
	 *
	 * @readonly
	 * @type {Number}
	 */
	get fittingHeight() {
		return this._parentSubView.height
	}

	/**
	 * Sets the spacing for the view.
	 *
	 * The spacing can be set for 7 different variables:
	 * `top`, `right`, `bottom`, `left`, `width`, `height` and `zIndex`. The `left`-spacing is
	 * used when a spacer is used between the parent-view and a sub-view (e.g. `|-[subView]`).
	 * The same is true for the `right`, `top` and `bottom` spacers. The `width` and `height` are
	 * used for spacers in between sub-views (e.g. `[view1]-[view2]`).
	 *
	 * Instead of using the full spacing syntax, it is also possible to use shorthand notations:
	 *
	 * |Syntax|Type|Description|
	 * |---|---|---|
	 * |`[top, right, bottom, left, width, height, zIndex]`|Array(7)|Full syntax including z-index **(clockwise order)**.|
	 * |`[top, right, bottom, left, width, height]`|Array(6)|Full horizontal & vertical spacing syntax (no z-index) **(clockwise order)**.|
	 * |`[horizontal, vertical, zIndex]`|Array(3)|Horizontal = left, right, width, vertical = top, bottom, height.|
	 * |`[horizontal, vertical]`|Array(2)|Horizontal = left, right, width, vertical = top, bottom, height, z-index = 1.|
	 * |`spacing`|Number|Horizontal & vertical spacing are all the same, z-index = 1.|
	 *
	 * Examples:
	 * ```javascript
	 * view.setSpacing(10); // horizontal & vertical spacing 10
	 * view.setSpacing([10, 15, 2]); // horizontal spacing 10, vertical spacing 15, z-axis spacing 2
	 * view.setSpacing([10, 20, 10, 20, 5, 5]); // top, right, bottom, left, horizontal, vertical
	 * view.setSpacing([10, 20, 10, 20, 5, 5, 1]); // top, right, bottom, left, horizontal, vertical, z
	 * ```
	 *
	 * @param {Number|Array} spacing
	 * @return {View} this
	 */
	setSpacing(spacing: number | number[]) {
		if (!Array.isArray(spacing)) {
			spacing = [spacing, spacing, spacing, spacing, spacing, spacing, 1]
		} else {
			// normalize spacing into array: [top, right, bottom, left, horz, vert, z-index]
			switch (spacing.length) {
				case 1:
					spacing = [spacing[0], spacing[0], spacing[0], spacing[0], spacing[0], spacing[0], 1]
					break
				case 2:
					spacing = [spacing[1], spacing[0], spacing[1], spacing[0], spacing[0], spacing[1], 1]
					break
				case 3:
					spacing = [spacing[1], spacing[0], spacing[1], spacing[0], spacing[0], spacing[1], spacing[2]]
					break
				case 6:
					spacing = [spacing[0], spacing[1], spacing[2], spacing[3], spacing[4], spacing[5], 1]
					break
				case 7:
					break
				default:
					throw 'Invalid spacing syntax'
			}
		}
		if (!this._compareSpacing(this._spacing, spacing)) {
			this._spacing = spacing
			// update spacing variables
			if (this._spacingVars) {
				for (var i = 0; i < this._spacingVars.length; i++) {
					if (this._spacingVars[i]) {
						this._solver.suggestValue(this._spacingVars[i], this._spacing![i])
					}
				}
				this._solver.updateVariables()
			}
		}
		return this
	}

	_compareSpacing(old, newz) {
		if (old === newz) {
			return true
		}
		if (!old || !newz) {
			return false
		}
		for (var i = 0; i < 7; i++) {
			if (old[i] !== newz[i]) {
				return false
			}
		}
		return true
	}

	/**
	 * Adds a constraint definition.
	 *
	 * A constraint definition has the following format:
	 *
	 * ```javascript
	 * constraint: {
	 *   view1: {String},
	 *   attr1: {AutoLayout.Attribute},
	 *   relation: {AutoLayout.Relation},
	 *   view2: {String},
	 *   attr2: {AutoLayout.Attribute},
	 *   multiplier: {Number},
	 *   constant: {Number},
	 *   priority: {Number}(0..1000)
	 * }
	 * ```
	 * @param {Object} constraint Constraint definition.
	 * @return {View} this
	 */
	addConstraint(constraint) {
		this._addConstraint(constraint)
		this._solver.updateVariables()
		return this
	}

	/**
	 * Adds one or more constraint definitions.
	 *
	 * A constraint definition has the following format:
	 *
	 * ```javascript
	 * constraint: {
	 *   view1: {String},
	 *   attr1: {AutoLayout.Attribute},
	 *   relation: {AutoLayout.Relation},
	 *   view2: {String},
	 *   attr2: {AutoLayout.Attribute},
	 *   multiplier: {Number},
	 *   constant: {Number},
	 *   priority: {Number}(0..1000)
	 * }
	 * ```
	 * @param {Array} constraints One or more constraint definitions.
	 * @return {View} this
	 */
	addConstraints(constraints) {
		for (var j = 0; j < constraints.length; j++) {
			this._addConstraint(constraints[j])
		}
		this._solver.updateVariables()
		return this
	}

	_addConstraint(constraint) {
		//this.constraints.push(constraint);
		let relation
		const multiplier = constraint.multiplier !== undefined ? constraint.multiplier : 1
		let constant = constraint.constant !== undefined ? constraint.constant : 0
		if (constant === 'default') {
			constant = this._getSpacing(constraint)
		}
		const attr1 = this._getSubView(constraint.view1)._getAttr(constraint.attr1)
		let attr2
		if (constraint.attr2 === Attribute.CONST) {
			attr2 = this._getConst(undefined, constraint.constant)
		} else {
			attr2 = this._getSubView(constraint.view2)._getAttr(constraint.attr2)
			if (multiplier !== 1 && constant) {
				attr2 = attr2.multiply(multiplier).plus(constant)
			} else if (constant) {
				attr2 = attr2.plus(constant)
			} else if (multiplier !== 1) {
				attr2 = attr2.multiply(multiplier)
			}
		}
		const strength =
			constraint.priority !== undefined && constraint.priority < 1000
				? kiwi.Strength.create(0, constraint.priority, 1000)
				: defaultPriorityStrength
		switch (constraint.relation) {
			case Relation.EQU:
				relation = new kiwi.Constraint(attr1, kiwi.Operator.Eq, attr2, strength)
				break
			case Relation.GEQ:
				relation = new kiwi.Constraint(attr1, kiwi.Operator.Ge, attr2, strength)
				break
			case Relation.LEQ:
				relation = new kiwi.Constraint(attr1, kiwi.Operator.Le, attr2, strength)
				break
			default:
				throw 'Invalid relation specified: ' + constraint.relation
		}
		this._solver.addConstraint(relation)
	}

	_getSpacing(constraint) {
		let index = 4
		if (!constraint.view1 && constraint.attr1 === 'left') {
			index = 3
		} else if (!constraint.view1 && constraint.attr1 === 'top') {
			index = 0
		} else if (!constraint.view2 && constraint.attr2 === 'right') {
			index = 1
		} else if (!constraint.view2 && constraint.attr2 === 'bottom') {
			index = 2
		} else {
			switch (constraint.attr1) {
				case 'left':
				case 'right':
				case 'centerX':
				case 'leading':
				case 'trailing':
					index = 4
					break
				case 'zIndex':
					index = 6
					break
				default:
					index = 5
			}
		}
		this._spacingVars = this._spacingVars || new Array(7)
		this._spacingExpr = this._spacingExpr || new Array(7)
		if (!this._spacingVars[index]) {
			this._spacingVars[index] = new kiwi.Variable()
			this._solver.addEditVariable(this._spacingVars[index], kiwi.Strength.create(999, 1000, 1000))
			this._spacingExpr[index] = this._spacingVars[index].multiply(-1)
			this._solver.suggestValue(this._spacingVars[index], this._spacing![index])
		}
		return this._spacingExpr[index]
	}

	_getSubView(viewName) {
		if (!viewName) {
			return this._parentSubView
		} else if (viewName.name) {
			this._subViews[viewName.name] =
				this._subViews[viewName.name] ||
				new SubView({
					name: viewName.name,
					solver: this._solver,
				})
			this._subViews[viewName.name]._type = this._subViews[viewName.name]._type || viewName.type
			return this._subViews[viewName.name]
		} else {
			this._subViews[viewName] =
				this._subViews[viewName] ||
				new SubView({
					name: viewName,
					solver: this._solver,
				})
			return this._subViews[viewName]
		}
	}

	_getConst(name, value) {
		const vr = new kiwi.Variable()
		this._solver.addConstraint(new kiwi.Constraint(vr, kiwi.Operator.Eq, value))
		return vr
	}

	/**
	 * Dictionary of `SubView` objects that have been created when adding constraints.
	 * @readonly
	 * @type {Object.SubView}
	 */
	get subViews() {
		return this._subViews
	}

	/**
	 * Checks whether the constraints incompletely specify the location
	 * of the subViews.
	 * @private
	 */
	//get hasAmbiguousLayout() {
	// Todo
	//}
}

export default View
