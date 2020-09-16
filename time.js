"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
function parse_yyyy_mm_dd(yyyy_mm_dd) {
    assert_yyyy_mm_dd(yyyy_mm_dd);
    var parts = yyyy_mm_dd.split('-').map(function (v) { return parseInt(v); });
    return parts;
}
exports.parse_yyyy_mm_dd = parse_yyyy_mm_dd;
function to_yyyy_mm_dd(y, m, d) {
    if (m === undefined && d === undefined) {
        var timestamp = y;
        if (timestamp < 10000)
            throw new Error("value for timestamp is too low, probably an error");
        var date = new Date(timestamp);
        return to_yyyy_mm_dd(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
    }
    else if (m !== undefined && d !== undefined) {
        if (m < 0 || m > 12)
            throw new Error("invalid month " + m);
        if (d < 0 || d > 31)
            throw new Error("invalid day " + d);
        return y + "-" + (m < 10 ? '0' + m : m) + "-" + (d < 10 ? '0' + d : d);
    }
    else {
        throw new Error("invalid usage of to_yyyy_mm_dd");
    }
}
exports.to_yyyy_mm_dd = to_yyyy_mm_dd;
function to_yyyy_mm_dd_hh_mm_ss(timestamp) {
    if (timestamp < 10000)
        throw new Error("value for timestamp is too low, probably an error");
    var date = new Date(timestamp);
    var year = date.getUTCFullYear(), month = date.getUTCMonth() + 1, day = date.getUTCDate();
    var hour = date.getUTCHours(), min = date.getUTCMinutes(), sec = date.getUTCSeconds();
    return year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day) +
        (" " + (hour < 10 ? '0' + hour : hour) + ":" + (min < 10 ? '0' + min : min) + ":" + (sec < 10 ? '0' + sec : sec));
}
exports.to_yyyy_mm_dd_hh_mm_ss = to_yyyy_mm_dd_hh_mm_ss;
function yyyy_mm_to_y_m(yyyy_mm) {
    assert_yyyy_mm(yyyy_mm);
    var parts = yyyy_mm.split('-').map(function (v) { return parseInt(v); });
    return parts;
}
exports.yyyy_mm_to_y_m = yyyy_mm_to_y_m;
function yyyy_mm_dd_to_y_m_d(yyyy_mm_dd) {
    assert_yyyy_mm_dd(yyyy_mm_dd);
    var parts = yyyy_mm_dd.split('-').map(function (v) { return parseInt(v); });
    return parts;
}
exports.yyyy_mm_dd_to_y_m_d = yyyy_mm_dd_to_y_m_d;
function yyyy_mm_to_m(yyyy_mm, base_year) {
    var _a = __read(yyyy_mm_to_y_m(yyyy_mm), 2), y = _a[0], m = _a[1];
    if (y < base_year)
        throw new Error("year should be >= " + base_year);
    return 12 * (y - base_year) + m;
}
exports.yyyy_mm_to_m = yyyy_mm_to_m;
function m_to_yyyy_mm(m, base_year) {
    return to_yyyy_mm(base_year + Math.floor(m / 12), 1 + (m % 12));
}
exports.m_to_yyyy_mm = m_to_yyyy_mm;
function yyyy_mm_to_ms(yyyy_mm) {
    var _a = __read(yyyy_mm_to_y_m(yyyy_mm), 2), y = _a[0], m = _a[1];
    return Date.UTC(y, m - 1);
}
exports.yyyy_mm_to_ms = yyyy_mm_to_ms;
function yyyy_mm_dd_to_ms(yyyy_mm_dd) {
    var _a = __read(yyyy_mm_dd_to_y_m_d(yyyy_mm_dd), 3), y = _a[0], m = _a[1], d = _a[2];
    return Date.UTC(y, m - 1, d);
}
exports.yyyy_mm_dd_to_ms = yyyy_mm_dd_to_ms;
function assert_yyyy_mm(yyyy_mm) {
    if (!/\d\d\d\d-\d\d/.test(yyyy_mm))
        throw new Error("date format is not yyyy-mm '" + yyyy_mm + "'");
}
exports.assert_yyyy_mm = assert_yyyy_mm;
function assert_yyyy_mm_dd(yyyy_mm_dd) {
    if (!/\d\d\d\d-\d\d-\d\d/.test(yyyy_mm_dd))
        throw new Error("date format is not yyyy-mm-dd '" + yyyy_mm_dd + "'");
}
exports.assert_yyyy_mm_dd = assert_yyyy_mm_dd;
function to_yyyy_mm(y, m) {
    if (m === undefined) {
        var timestamp = y;
        if (timestamp < 10000)
            throw new Error("value for timestamp is too low, probably an error");
        var date = new Date(timestamp);
        return to_yyyy_mm(date.getUTCFullYear(), date.getUTCMonth() + 1);
    }
    else {
        if (m < 0 || m > 12)
            throw new Error("invalid month " + m);
        return y + "-" + (m < 10 ? '0' + m : m);
    }
}
exports.to_yyyy_mm = to_yyyy_mm;
function current_yyyy_mm() {
    var now = new Date(Date.now());
    return to_yyyy_mm(now.getUTCFullYear(), now.getUTCMonth() + 1);
}
exports.current_yyyy_mm = current_yyyy_mm;
function current_yyyy_mm_dd() {
    var now = new Date(Date.now());
    return to_yyyy_mm_dd(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate());
}
exports.current_yyyy_mm_dd = current_yyyy_mm_dd;
// parse_month ---------------------------------------------------------------------------
var month_names = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];
var short_month_names = month_names.map(function (name) { return base_1.take(name, 3); });
var month_names_map = new Map();
var short_month_names_map = new Map();
for (var i = 0; i < month_names.length; i++) {
    month_names_map.set(month_names[i], i + 1);
    short_month_names_map.set(short_month_names[i], i + 1);
}
function parse_month(month) {
    var month_l = month.toLowerCase();
    var n = month_names_map.get(month_l) || short_month_names_map.get(month_l);
    if (n === undefined)
        throw new Error("invalid month name '" + month + "'");
    return n;
}
exports.parse_month = parse_month;
//# sourceMappingURL=time.js.map