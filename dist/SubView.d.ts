/**
 * A SubView is automatically generated when constraints are added to a View.
 *
 * @namespace SubView
 */
declare class SubView {
    _name: any;
    _type: any;
    _solver: any;
    _attr: any;
    _intrinsicWidth: number;
    _intrinsicHeight: number;
    constructor(options: any);
    toJSON(): {
        name: any;
        left: any;
        top: any;
        width: any;
        height: any;
    };
    toString(): void;
    /**
     * Name of the sub-view.
     * @readonly
     * @type {String}
     */
    get name(): any;
    /**
     * Left value (`Attribute.LEFT`).
     * @readonly
     * @type {Number}
     */
    get left(): any;
    /**
     * Right value (`Attribute.RIGHT`).
     * @readonly
     * @type {Number}
     */
    get right(): any;
    /**
     * Width value (`Attribute.WIDTH`).
     * @type {Number}
     */
    get width(): any;
    /**
     * Height value (`Attribute.HEIGHT`).
     * @readonly
     * @type {Number}
     */
    get height(): any;
    /**
     * Intrinsic width of the sub-view.
     *
     * Use this property to explicitely set the width of the sub-view, e.g.:
     * ```javascript
     * var view = new AutoLayout.View(AutoLayout.VisualFormat.parse('|[child1][child2]|'), {
     *   width: 500
     * });
     * view.subViews.child1.intrinsicWidth = 100;
     * console.log('child2 width: ' + view.subViews.child2.width); // 400
     * ```
     *
     * @type {Number}
     */
    get intrinsicWidth(): number;
    set intrinsicWidth(value: number);
    /**
     * Intrinsic height of the sub-view.
     *
     * See `intrinsicWidth`.
     *
     * @type {Number}
     */
    get intrinsicHeight(): number;
    set intrinsicHeight(value: number);
    /**
     * Top value (`Attribute.TOP`).
     * @readonly
     * @type {Number}
     */
    get top(): any;
    /**
     * Bottom value (`Attribute.BOTTOM`).
     * @readonly
     * @type {Number}
     */
    get bottom(): any;
    /**
     * Horizontal center (`Attribute.CENTERX`).
     * @readonly
     * @type {Number}
     */
    get centerX(): any;
    /**
     * Vertical center (`Attribute.CENTERY`).
     * @readonly
     * @type {Number}
     */
    get centerY(): any;
    /**
     * Z-index (`Attribute.ZINDEX`).
     * @readonly
     * @type {Number}
     */
    get zIndex(): any;
    /**
     * Returns the type of the sub-view.
     * @readonly
     * @type {String}
     */
    get type(): any;
    /**
     * Gets the value of one of the attributes.
     *
     * @param {String|Attribute} attr Attribute name (e.g. 'right', 'centerY', Attribute.TOP).
     * @return {Number} value or `undefined`
     */
    getValue(attr: any): any;
    /**
     * @private
     */
    _getAttr(attr: any): any;
    /**
     * @private
     */
    _getAttrValue(attr: any): any;
}
export default SubView;
//# sourceMappingURL=SubView.d.ts.map