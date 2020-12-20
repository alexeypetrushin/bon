"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Map where keys could be an array of simple types.
var MultiMap = /** @class */ (function () {
    function MultiMap() {
        this.length = 0;
        this._map = new Map();
    }
    MultiMap.prototype.set = function (keys, value) { set(0, keys, value, this._map, this); };
    MultiMap.prototype.has = function (keys) { return has(0, keys, this._map); };
    MultiMap.prototype.get = function (keys) { return get(0, keys, this._map); };
    MultiMap.prototype.delete = function (keys) { return del(0, keys, this._map, this); };
    return MultiMap;
}());
exports.MultiMap = MultiMap;
function set(i, keys, value, store, mmap) {
    var key = keys[i];
    if (i == keys.length - 1) {
        if (!store.has(key))
            mmap.length += 1;
        store.set(key, value);
    }
    else {
        var next_store = store.get(key);
        if (next_store === undefined) {
            next_store = new Map();
            store.set(key, next_store);
        }
        set(i + 1, keys, value, next_store, mmap);
    }
}
function has(i, keys, store) {
    if (i == keys.length - 1)
        return store.has(keys[i]);
    else {
        var next_store = store.get(keys[i]);
        return next_store !== undefined ? has(i + 1, keys, next_store) : false;
    }
}
function get(i, keys, store) {
    if (i == keys.length - 1)
        return store.get(keys[i]);
    else {
        var next_store = store.get(keys[i]);
        return next_store !== undefined ? get(i + 1, keys, next_store) : undefined;
    }
}
function del(i, keys, store, mmap) {
    var key = keys[i];
    if (i == keys.length - 1) {
        var v = store.get(key);
        if (v !== undefined) {
            store.delete(keys[i]);
            mmap.length -= 1;
        }
        return v;
    }
    else {
        var next_store = store.get(key);
        if (next_store === undefined)
            return undefined;
        var v = del(i + 1, keys, next_store, mmap);
        if (next_store.length == 0)
            store.delete(key);
        return v;
    }
}
// Test ----------------------------------------------------------------------------------
// const mm = new MultiMap<number>()
// mm.set(['a', 'b'], 1)
// console.log(mm.length)
// console.log(mm.get(['a', 'b']))
// mm.delete(['a', 'b'])
// console.log(mm.get(['a', 'b']))
// console.log(mm.length)
//# sourceMappingURL=multi_map.js.map