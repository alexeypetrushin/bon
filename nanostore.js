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
var preact_1 = require("preact");
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
// buildConnect -------------------------------------------------------------------
function buildConnect(getState, subscribe) {
    var _getState = getState;
    return function connect(mapStateProps, Element) {
        var ConnectedWrapper = /** @class */ (function (_super) {
            __extends(ConnectedWrapper, _super);
            function ConnectedWrapper(props) {
                var _this = _super.call(this, props) || this;
                _this.currentStateSize = 0;
                _this.state = mapStateProps instanceof Function ? mapStateProps(getState()) : mapStateProps;
                _this.currentStateSize = Object.keys(_this.state).length;
                return _this;
            }
            ConnectedWrapper.prototype.componentDidMount = function () {
                var _this = this;
                this.unsubscribe = subscribe(function () {
                    var newProps = mapStateProps instanceof Function ? mapStateProps(getState()) : mapStateProps;
                    var currentState = _this.state;
                    // Checking for changes
                    var changed = false, newSize = 0;
                    for (var k in newProps) {
                        if (newProps[k] !== currentState[k])
                            changed = true;
                        newSize += 1;
                    }
                    changed = changed || (newSize != _this.currentStateSize);
                    _this.currentStateSize = newSize;
                    if (changed)
                        _this.setState(newProps);
                });
            };
            ConnectedWrapper.prototype.componentWillUnmount = function () { if (this.unsubscribe)
                this.unsubscribe(); };
            ConnectedWrapper.prototype.render = function () {
                var props = this.props;
                return preact_1.h(Element, __assign(__assign({}, this.props), this.state));
            };
            return ConnectedWrapper;
        }(preact_1.Component));
        return ConnectedWrapper;
    };
}
exports.buildConnect = buildConnect;
//# sourceMappingURL=nanostore.js.map