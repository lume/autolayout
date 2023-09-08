import * as kiwi from '@lume/kiwi';
import SubView from './SubView.js';
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
declare class View {
    _solver: kiwi.Solver;
    _subViews: {};
    _parentSubView: SubView;
    _spacing?: number | number[];
    _spacingVars?: kiwi.Variable[];
    _spacingExpr?: kiwi.Expression[];
    /**
     * @class View
     * @param {Object} [options] Configuration options.
     * @param {Number} [options.width] Initial width of the view.
     * @param {Number} [options.height] Initial height of the view.
     * @param {Number|Object} [options.spacing] Spacing for the view (default: 8) (see `setSpacing`).
     * @param {Array} [options.constraints] One or more constraint definitions (see `addConstraints`).
     */
    constructor(options: any);
    /**
     * Sets the width and height of the view.
     *
     * @param {Number} width Width of the view.
     * @param {Number} height Height of the view.
     * @return {View} this
     */
    setSize(width: any, height: any): this;
    /**
     * Width that was set using `setSize`.
     * @readonly
     * @type {Number}
     */
    get width(): number;
    /**
     * Height that was set using `setSize`.
     * @readonly
     * @type {Number}
     */
    get height(): number;
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
    get fittingWidth(): any;
    /**
     * Height that is calculated from the constraints and the `.intrinsicHeight` of
     * the sub-views.
     *
     * See `.fittingWidth`.
     *
     * @readonly
     * @type {Number}
     */
    get fittingHeight(): any;
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
    setSpacing(spacing: number | number[]): this;
    _compareSpacing(old: any, newz: any): boolean;
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
    addConstraint(constraint: any): this;
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
    addConstraints(constraints: any): this;
    _addConstraint(constraint: any): void;
    _getSpacing(constraint: any): kiwi.Expression;
    _getSubView(viewName: any): any;
    _getConst(name: any, value: any): kiwi.Variable;
    /**
     * Dictionary of `SubView` objects that have been created when adding constraints.
     * @readonly
     * @type {Object.SubView}
     */
    get subViews(): {};
}
export default View;
//# sourceMappingURL=View.d.ts.map