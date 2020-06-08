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
function linear_regression_wrong(x_y_r) {
    var xyr = x_y_r.map(function (_a) {
        var _b = __read(_a, 3), x = _b[0], y = _b[1], r = _b[2];
        return [x, y, r === undefined ? 1 : r];
    });
    var i, x, y, r, sumx = 0, sumy = 0, sumx2 = 0, sumy2 = 0, sumxy = 0, sumr = 0, a, b;
    for (i = 0; i < xyr.length; i++) {
        // this is our data pair
        x = xyr[i][0], y = xyr[i][1];
        // this is the weight for that pair
        // set to 1 (and simplify code accordingly, ie, sumr becomes xy.length) if weighting is not needed
        r = xyr[i][2];
        // consider checking for NaN in the x, y and r variables here
        // (add a continue statement in that case)
        sumr += r;
        sumx += r * x;
        sumx2 += r * (x * x);
        sumy += r * y;
        sumy2 += r * (y * y);
        sumxy += r * (x * y);
    }
    // note: the denominator is the variance of the random variable X
    // the only case when it is 0 is the degenerate case X==constant
    b = (sumy * sumx2 - sumx * sumxy) / (sumr * sumx2 - sumx * sumx);
    a = (sumr * sumxy - sumx * sumy) / (sumr * sumx2 - sumx * sumx);
    return [a, b];
}
exports.linear_regression = linear_regression_wrong;
// differentiate -------------------------------------------------------------------------
// Calculating differences for sparce values
function differentiate(sparce_values) {
    var diffs = base_1.fill(sparce_values.length, undefined);
    // Converting sparce values to list of defined values and its indices
    var values = base_1.filter_map(sparce_values, function (v, i) { return v !== undefined ? [i, v] : false; });
    var index_consistency_check = values[0][0];
    for (var j = 0; j < values.length - 1; j++) {
        var _a = __read(values[j], 2), i1 = _a[0], v1 = _a[1], _b = __read(values[j + 1], 2), i2 = _b[0], v2 = _b[1];
        // Calculating the diff for the whole `i1-i2` span and diff for every i
        var span_diff = v2 / v1;
        if (span_diff <= 0)
            throw new Error("differentiate expect positive values");
        var diff_i = Math.pow(span_diff, 1 / (i2 - i1));
        for (var i = i1; i < i2; i++) {
            base_1.assert.equal(index_consistency_check, i);
            diffs[i + 1] = diff_i;
            index_consistency_check += 1;
        }
    }
    base_1.assert(diffs[0] === undefined, "first element of diff serie should always be undefined");
    return diffs;
}
exports.differentiate = differentiate;
base_1.inline_test(function () {
    var u = undefined;
    base_1.assert.equal(differentiate([
        u, 1, u, u, 8, u, u, 1, u
    ]), [
        u, u, 2, 2, 2, 0.5, 0.5, 0.5, u
    ]);
    base_1.assert.equal(differentiate([
        u, 1, u, u, 8
    ]), [
        u, u, 2, 2, 2
    ]);
    // Annual revenues
    base_1.assert.equal(differentiate([
        //  1,     2,     3,     4,     5,     6,     7,     8,     9,    10,    11,    12
        u, u, u, u, u, 1, u, u, u, u, u, u,
        u, u, u, u, u, 1.1, u, u, u, u, u, u,
        u, u, u, u, u, 1.2 // 2002-06
    ]).map(function (v) { return v ? base_1.round(v, 3) : v; }), [
        //  1,     2,     3,     4,     5,     6,     7,     8,     9,    10,    11,    12
        u, u, u, u, u, u, 1.008, 1.008, 1.008, 1.008, 1.008, 1.008,
        1.008, 1.008, 1.008, 1.008, 1.008, 1.008, 1.007, 1.007, 1.007, 1.007, 1.007, 1.007,
        1.007, 1.007, 1.007, 1.007, 1.007, 1.007
    ]);
    // Should check for negative values
    var error_message = undefined;
    try {
        differentiate([u, 1, u, -1]);
    }
    catch (e) {
        error_message = e.message;
    }
    base_1.assert.equal(error_message, "differentiate expect positive values");
});
// integrate -----------------------------------------------------------------------------
// Calculating integral, gaps not allowed
function integrate(diffs, base) {
    if (base === void 0) { base = 1; }
    base_1.assert(diffs[0] === undefined, "first element of diff serie should always be undefined");
    var values = base_1.fill(diffs.length, undefined);
    var first_defined_i = base_1.find_index(diffs, function (v) { return v !== undefined; });
    if (!first_defined_i)
        throw new Error("the whole diffs serie is undefined");
    values[first_defined_i - 1] = base;
    for (var i = first_defined_i; i < diffs.length - 1; i++) {
        var di = diffs[i];
        if (di === undefined)
            break;
        var previous_v = values[i - 1];
        if (previous_v === undefined)
            throw new Error('internal error, there could be no undefined spans in values');
        values[i] = previous_v * di;
    }
    return values;
}
exports.integrate = integrate;
base_1.inline_test(function () {
    var u = undefined;
    base_1.assert.equal(integrate([
        u, u, 2, 2, 2, 0.5, 0.5, 0.5, u
    ]), [
        u, 1, 2, 4, 8, 4, 2, 1, u
    ]);
});
// // mean_absolute_deviation ---------------------------------------------------------------
// export function mean_absolute_deviation(values: number[]) {
//   const m = mean(values)
//   return mean(values.map((v) => m - v))
// }
//# sourceMappingURL=math.js.map