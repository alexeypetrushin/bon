"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
exports.h = preact_1.h;
exports.render = preact_1.render;
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Component.prototype.componentWillMount = function () { if (this.component_will_mount)
        this.component_will_mount(); };
    Component.prototype.componentDidMount = function () { if (this.component_did_mount)
        this.component_did_mount(); };
    Component.prototype.componentWillUnmount = function () { if (this.component_will_unmount)
        this.component_will_unmount(); };
    Component.prototype.componentWillReceiveProps = function (nextProps, nextContext) {
        if (this.component_will_receive_props)
            this.component_will_receive_props(nextProps, nextContext);
    };
    Component.prototype.set_state = function (state, callback) { this.setState(state, callback); };
    return Component;
}(preact_1.Component));
exports.Component = Component;
//# sourceMappingURL=breact.js.map