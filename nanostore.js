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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var breact_1 = require("./breact");
// Store --------------------------------------------------------------------------
var Nanostore = /** @class */ (function () {
    function Nanostore(state) {
        var _this = this;
        this.state = state;
        this.listeners = [];
        this.get = function () { return _this.state; };
        this.set = function (state) {
            _this.state = __assign(__assign({}, _this.state), state);
            for (var _i = 0, _a = _this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener();
            }
        };
        this.subscribe = function (listener) {
            _this.listeners.push(listener);
            return function () { return _this.listeners = _this.listeners.filter(function (l) { return l != listener; }); };
        };
    }
    return Nanostore;
}());
exports.Nanostore = Nanostore;
// build_connect ------------------------------------------------------------------
function build_connect(get_state, subscribe) {
    var _get_state = get_state;
    return function connect(map_state_props, Element) {
        var ConnectedWrapper = /** @class */ (function (_super) {
            __extends(ConnectedWrapper, _super);
            function ConnectedWrapper(props) {
                var _this = _super.call(this, props) || this;
                _this.current_state_size = 0;
                _this.state = map_state_props instanceof Function ? map_state_props(get_state()) : map_state_props;
                _this.current_state_size = Object.keys(_this.state).length;
                return _this;
            }
            ConnectedWrapper.prototype.component_did_mount = function () {
                var _this = this;
                this.unsubscribe = subscribe(function () {
                    var new_props = map_state_props instanceof Function ? map_state_props(get_state()) : map_state_props;
                    var current_state = _this.state;
                    // Checking for changes
                    var changed = false, newSize = 0;
                    for (var k in new_props) {
                        if (new_props[k] !== current_state[k])
                            changed = true;
                        newSize += 1;
                    }
                    changed = changed || (newSize != _this.current_state_size);
                    _this.current_state_size = newSize;
                    if (changed)
                        _this.setState(new_props);
                });
            };
            ConnectedWrapper.prototype.component_will_unmount = function () { if (this.unsubscribe)
                this.unsubscribe(); };
            ConnectedWrapper.prototype.render = function () {
                return breact_1.h(Element, __assign(__assign({}, this.props), this.state));
            };
            return ConnectedWrapper;
        }(breact_1.Component));
        return ConnectedWrapper;
    };
}
exports.build_connect = build_connect;
//# sourceMappingURL=nanostore.js.map