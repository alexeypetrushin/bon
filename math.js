"use strict";
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
// median --------------------------------------------------------------------------------
function median(values, is_sorted) {
    if (is_sorted === void 0) { is_sorted = false; }
    return quantile(values, .5, is_sorted);
    // if (values.length == 0 ) return 0
    // values = [...values]
    // values.sort(function(a, b) { return a-b })
    // const half = Math.floor(values.length / 2)
    // if (values.length % 2) return values[half]
    // else                   return (values[half - 1] + values[half]) / 2.0
}
exports.median = median;
// mean ----------------------------------------------------------------------------------
function mean(values) {
    var e_1, _a;
    var sum = 0;
    try {
        for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
            var v = values_1_1.value;
            sum += v;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return sum / values.length;
}
exports.mean = mean;
// quantile ------------------------------------------------------------------------------
function quantile(values, q, is_sorted) {
    if (is_sorted === void 0) { is_sorted = false; }
    var sorted = is_sorted ? values : __spread(values).sort(function (a, b) { return a - b; });
    var pos = (sorted.length - 1) * q;
    var base = Math.floor(pos);
    var rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    }
    else {
        return sorted[base];
    }
}
exports.quantile = quantile;
// min_max_norm --------------------------------------------------------------------------
function min_max_norm(values, min, max) {
    return values.map(function (v) { return (v - min) / (max - min); });
}
exports.min_max_norm = min_max_norm;
// map_with_rank -------------------------------------------------------------------------
// Attach to every element its rank in the ordered list, ordered according to `order_by` function.
function map_with_rank(list, order_by, map) {
    // Sorting accourding to rank
    var list_with_index = list.map(function (v, i) { return ({ v: v, original_i: i, order_by: order_by(v) }); });
    var sorted = base_1.sort_by(list_with_index, function (_a) {
        var order_by = _a.order_by;
        return order_by;
    });
    // Adding rank, if values returned by `order_by` are the same, the rank also the same
    var sorted_with_rank = [];
    var rank = 1;
    for (var i = 0; i < sorted.length; i++) {
        var current = sorted[i];
        if (i > 0 && current.order_by != sorted[i - 1].order_by)
            rank++;
        sorted_with_rank.push(__assign(__assign({}, current), { rank: rank }));
    }
    // Restoring original order and mapping
    var original_with_rank = base_1.sort_by(sorted_with_rank, function (_a) {
        var original_i = _a.original_i;
        return original_i;
    });
    return original_with_rank.map(function (_a) {
        var v = _a.v, rank = _a.rank;
        return map(v, rank);
    });
}
exports.map_with_rank = map_with_rank;
base_1.inline_test(function () {
    base_1.assert.equal(map_with_rank([4, 2, 3, 4, 5, 7, 5], function (v) { return v; }, function (v, r) { return [v, r]; }), [[4, 3], [2, 1], [3, 2], [4, 3], [5, 4], [7, 5], [5, 4]]);
});
//# sourceMappingURL=math.js.map