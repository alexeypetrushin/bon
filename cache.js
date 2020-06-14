"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hash_1 = require("./hash");
function cache_fn(fn) {
    if (fn.length == 0) {
        // When arity == 0 - special case with minimum checks, for efficiency
        var cached_1 = undefined;
        return function () {
            if (cached_1 === undefined)
                cached_1 = fn();
            return cached_1;
        };
    }
    else {
        var cached1_1 = new hash_1.Hash();
        return function (a1, a2) {
            var cached2 = cached1_1.get(a1);
            if (!cached2) {
                cached2 = new hash_1.Hash();
                cached1_1.set(a1, cached2);
            }
            var value = cached2.get(a2);
            if (!value) {
                value = fn(a1, a2);
                cached2.set(a2, value);
            }
            return value;
        };
    }
}
exports.cache_fn = cache_fn;
//# sourceMappingURL=cache.js.map