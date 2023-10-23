import Attribute from './Attribute.js';
import Relation from './Relation.js';
import Priority from './Priority.js';
import VisualFormat from './VisualFormat.js';
import View from './View.js';
import SubView from './SubView.js';
declare var AutoLayout: {
    Attribute: {
        CONST: string;
        NOTANATTRIBUTE: string;
        VARIABLE: string;
        LEFT: string;
        RIGHT: string;
        TOP: string;
        BOTTOM: string;
        WIDTH: string;
        HEIGHT: string;
        CENTERX: string;
        CENTERY: string;
        ZINDEX: string;
    };
    Relation: {
        LEQ: string;
        EQU: string;
        GEQ: string;
    };
    Priority: {
        REQUIRED: number;
        DEFAULTHIGH: number;
        DEFAULTLOW: number;
    };
    VisualFormat: typeof VisualFormat;
    View: typeof View;
    SubView: typeof SubView;
};
export default AutoLayout;
export { Attribute, Relation, Priority, VisualFormat, View, SubView };
//# sourceMappingURL=AutoLayout.d.ts.map