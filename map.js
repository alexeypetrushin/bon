"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hash = /** @class */ (function () {
    function Hash(collection, to_key) {
        this.length = 0;
        this._map = new Map();
        if (collection) {
            if (Array.isArray(collection)) {
                if (to_key) {
                    var list = collection;
                    for (var i = 0; i < list.length; i++)
                        this._map.set(to_key(list[i]), list[i]);
                }
                else {
                    var list = collection;
                    for (var i = 0; i < list.length; i++)
                        this._map.set(list[i][0], list[i][1]);
                }
            }
            else {
                for (var k in collection)
                    this._map.set(k, collection[k]);
            }
        }
    }
    Hash.prototype.has = function (k) { return this._map.has(k); };
    Hash.prototype.get = function (k, dv) {
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
    Hash.prototype.ensure_get = function (k) {
        var v = this._map.get(k);
        if (v === undefined)
            throw new Error("map expected to have key '" + k + "'");
        return v;
    };
    Hash.prototype.set = function (k, v) {
        this._map.set(k, v);
        this.length = this._map.size;
    };
    Hash.prototype.delete = function (k) {
        var v = this.get(k);
        this._map.delete(k);
        this.length = this._map.size;
        return v;
    };
    Hash.prototype.each = function (f) { this._map.forEach(f); };
    Hash.prototype.map = function (f) {
        var r = new Hash();
        this.each(function (v, k) { return r.set(k, f(v, k)); });
        return r;
    };
    Hash.prototype.entries = function () { return Array.from(this._map); };
    Hash.prototype.keys = function () { return Array.from(this._map.keys()); };
    Hash.prototype.values = function () { return Array.from(this._map.values()); };
    Hash.prototype.toJSON = function () { return this._map.toJSON(); };
    return Hash;
}());
exports.Hash = Hash;
//# sourceMappingURL=map.js.map