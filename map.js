"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Map2 = /** @class */ (function () {
    function Map2() {
        this.length = 0;
        this._map = new Map();
    }
    Map2.prototype.has = function (k) { return this._map.has(k); };
    Map2.prototype.get = function (k, dv) {
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
    Map2.prototype.set = function (k, v) {
        this._map.set(k, v);
        this.length = this._map.size;
    };
    Map2.prototype.delete = function (k) {
        var v = this.get(k);
        this._map.delete(k);
        this.length = this._map.size;
        return v;
    };
    Map2.prototype.each = function (f) { this._map.forEach(f); };
    Map2.prototype.map = function (f) {
        var r = new Map2();
        this.each(function (v, k) { return r.set(k, f(v, k)); });
        return r;
    };
    Map2.prototype.entries = function () { return Array.from(this._map); };
    Map2.prototype.keys = function () { return Array.from(this._map.keys()); };
    Map2.prototype.values = function () { return Array.from(this._map.values()); };
    Map2.prototype.toJSON = function () { return this._map.toJSON(); };
    return Map2;
}());
exports.Map = Map2;
//# sourceMappingURL=map.js.map