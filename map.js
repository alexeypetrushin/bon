"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Map = /** @class */ (function () {
    function Map() {
        this.length = 0;
        this._map = new global.Map();
    }
    Map.prototype.has = function (k) { return this._map.has(k); };
    Map.prototype.get = function (k, dv) {
        var v = this._map.get(k);
        if (v !== undefined)
            return v;
        if (dv !== undefined) {
            v = typeof dv == 'function' ? dv(k) : dv;
            this._map.set(k, v);
            return v;
        }
        return undefined;
    };
    Map.prototype.set = function (k, v) {
        this._map.set(k, v);
        this.length = this._map.size;
    };
    Map.prototype.delete = function (k) {
        var v = this.get(k);
        this._map.delete(k);
        this.length = this._map.size;
        return v;
    };
    Map.prototype.each = function (f) { this._map.forEach(f); };
    Map.prototype.map = function (f) {
        var r = new Map();
        this.each(function (v, k) { return r.set(k, f(v, k)); });
        return r;
    };
    Map.prototype.entries = function () { return Array.from(this._map); };
    Map.prototype.keys = function () { return Array.from(this._map.keys()); };
    Map.prototype.values = function () { return Array.from(this._map.values()); };
    return Map;
}());
exports.Map = Map;
//# sourceMappingURL=map.js.map