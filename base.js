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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./map"));
// Global variables for browser and node ------------------------------------------
var uniglobal;
exports.uniglobal = uniglobal;
var has_windows = false;
try {
    exports.uniglobal = uniglobal = window;
    has_windows = true;
}
catch (e) {
    exports.uniglobal = uniglobal = global;
}
var console = uniglobal.console;
// Useful constants ---------------------------------------------------------------
exports.kb = 1024, exports.mb = 1024 * exports.kb;
exports.sec = 1000, exports.min = 60 * exports.sec, exports.hour = 60 * exports.min, exports.day = 24 * exports.hour;
exports.million = 1000000, exports.billion = 1000 * exports.million;
// environment --------------------------------------------------------------------
exports.environment = (uniglobal.process && uniglobal.process.env && uniglobal.process.env.environment) ||
    (uniglobal.mono && uniglobal.mono.environment) ||
    'development';
if (!['development', 'production', 'test'].includes(exports.environment))
    throw new Error('invalid environment!');
// p ------------------------------------------------------------------------------
function map_to_json_if_defined(v) { return v && v.toJSON ? v.toJSON() : v; }
var util_inspect = function (v, options) {
    try {
        util_inspect = require('util').inspect;
    }
    catch (_e) { }
    return util_inspect(v, options);
};
function pretty_print(v, colors) {
    if (colors === void 0) { colors = false; }
    v = deep_map(v, map_to_json_if_defined);
    return typeof v == 'object' ? util_inspect(v, { breakLength: 80, colors: colors }) : v;
}
exports.pretty_print = pretty_print;
function p() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (has_windows)
        console.log.apply(console, __spread(args));
    else {
        var formatted = args.map(function (v) { return pretty_print(v, true); });
        // It won't printed properly for multiple arguments
        args.length == 1 ? console.log.apply(console, __spread(formatted)) : console.log.apply(console, __spread(args));
    }
}
exports.p = p;
var fetch = uniglobal.fetch || require('node-fetch');
var focused_tests = [];
var tests = [];
exports.test = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = __read(args.length == 1 ? [undefined, args[0]] : args, 2), name = _a[0], fn = _a[1];
    tests.push([name, fn]);
};
exports.test.focus = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var _a = __read(args.length == 1 ? [undefined, args[0]] : args, 2), name = _a[0], fn = _a[1];
    focused_tests.push([name, fn]);
};
exports.test.run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var list, list_1, list_1_1, _a, name_1, test_1, e_1, e_2_1;
    var e_2, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                list = focused_tests.length > 0 ? focused_tests : tests;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 8, 9, 10]);
                list_1 = __values(list), list_1_1 = list_1.next();
                _c.label = 2;
            case 2:
                if (!!list_1_1.done) return [3 /*break*/, 7];
                _a = __read(list_1_1.value, 2), name_1 = _a[0], test_1 = _a[1];
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, test_1()];
            case 4:
                _c.sent();
                return [3 /*break*/, 6];
            case 5:
                e_1 = _c.sent();
                log('error', "test failed " + (name_1 ? " '" + name_1 + "'" : ''), e_1);
                uniglobal.process && uniglobal.process.exit();
                return [3 /*break*/, 6];
            case 6:
                list_1_1 = list_1.next();
                return [3 /*break*/, 2];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_2_1 = _c.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (list_1_1 && !list_1_1.done && (_b = list_1.return)) _b.call(list_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 10:
                log('info', 'tests passed');
                return [2 /*return*/];
        }
    });
}); };
exports.run_tests = (uniglobal.process && uniglobal.process.env && uniglobal.process.env.test) == 'true';
if (exports.run_tests)
    uniglobal.setTimeout(exports.test.run, 0);
exports.all_docs = [];
function doc() {
    var docs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        docs[_i] = arguments[_i];
    }
    exports.all_docs.push.apply(exports.all_docs, __spread((docs.map(function (d) { return typeof d === 'function' ? d() : d; }))));
}
exports.doc = doc;
function as_code(code) { return "\`\`\`\n" + code + "\n\`\`\`"; }
exports.as_code = as_code;
function http_call(url, body, options) {
    if (body === void 0) { body = {}; }
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        function call_without_timeout() {
            return __awaiter(this, void 0, void 0, function () {
                var copied_ptions, fetch_1, result, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            copied_ptions = __assign({ method: 'post' }, options);
                            delete copied_ptions.timeout;
                            fetch_1 = uniglobal.fetch || require('node-fetch');
                            if (!fetch_1)
                                throw new Error('global.fetch not defined');
                            return [4 /*yield*/, fetch_1(url, __assign(__assign({}, copied_ptions), { body: copied_ptions.method == 'get' ? undefined : JSON.stringify(body) }))];
                        case 1:
                            result = _a.sent();
                            if (!result.ok)
                                throw new Error("can't call " + url + " " + result.status + " " + result.statusText);
                            return [4 /*yield*/, result.json()];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            e_3 = _a.sent();
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    if (options.timeout)
                        uniglobal.setTimeout(function () { return reject(new Error("request timed out " + url)); }, options.timeout);
                    call_without_timeout().then(resolve, reject);
                })];
        });
    });
}
exports.http_call = http_call;
// build_url ----------------------------------------------------------------------
function build_url(url, query) {
    if (query === void 0) { query = {}; }
    var querystring = [];
    for (var key in query) {
        var value = query[key];
        if (key !== null && key !== undefined && value !== null && value !== undefined)
            querystring.push(encodeURIComponent(key) + "=" + encodeURIComponent('' + query[key]));
    }
    if (querystring.length > 0)
        return "" + url + (url.includes('?') ? '&' : '?') + querystring.join('&');
    else
        return url;
}
exports.build_url = build_url;
// sleep --------------------------------------------------------------------------
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return uniglobal.setTimeout(resolve, ms); })];
        });
    });
}
exports.sleep = sleep;
// is_number -----------------------------------------------------------------------------
function is_number(n) {
    // isNumber is broken, it returns true for NaN
    return typeof n == 'number' ? Number.isFinite(n) : false;
}
exports.is_number = is_number;
exports.assert = function (condition, message) {
    var message_string = message ? (message instanceof Function ? message() : message) : 'Assertion error!';
    if (!condition)
        throw new Error(message_string);
};
exports.assert.warn = function (condition, message) { if (!condition)
    log('warn', message || 'Assertion error!'); };
exports.assert.equal = function (a, b, message) {
    if (!is_equal(a, b)) {
        var message_string = message ? (message instanceof Function ? message() : message) :
            "Assertion error: " + stable_json_stringify(a, true) + " != " + stable_json_stringify(b, true);
        throw new Error(message_string);
    }
};
exports.assert.approx_equal = function (a, b, message, delta_relative) {
    delta_relative = delta_relative || 0.001;
    var average = (Math.abs(a) + Math.abs(b)) / 2;
    var delta_absolute = average * delta_relative;
    if (Math.abs(a - b) > delta_absolute) {
        var message_string = message ? (message instanceof Function ? message() : message) :
            "Assertion error: " + stable_json_stringify(a, true) + " != " + stable_json_stringify(b, true);
        throw new Error(message_string);
    }
};
// deep_clone_and_sort ------------------------------------------------------------
// Clone object with object properties sorted, including for nested objects
function deep_clone_and_sort(obj) {
    if (obj === null || typeof obj !== 'object')
        return obj;
    else if (Array.isArray(obj))
        return obj.map(deep_clone_and_sort);
    else if ('toJSON' in obj)
        return deep_clone_and_sort(obj.toJSON());
    else
        return Object.assign.apply(Object, __spread([{}], Object.entries(obj)
            .sort(function (_a, _b) {
            var _c = __read(_a, 1), key_a = _c[0];
            var _d = __read(_b, 1), key_b = _d[0];
            return key_a.localeCompare(key_b);
        })
            .map(function (_a) {
            var _b;
            var _c = __read(_a, 2), k = _c[0], v = _c[1];
            return (_b = {}, _b[k] = deep_clone_and_sort(v), _b);
        })));
}
exports.deep_clone_and_sort = deep_clone_and_sort;
// stable_json_stringify ----------------------------------------------------------
// https://stackoverflow.com/questions/42491226/is-json-stringify-deterministic-in-v8
function stable_json_stringify(obj, pretty) {
    if (pretty === void 0) { pretty = true; }
    return pretty ? JSON.stringify(deep_clone_and_sort(obj), null, 2) : JSON.stringify(deep_clone_and_sort(obj));
}
exports.stable_json_stringify = stable_json_stringify;
// is_equal -----------------------------------------------------------------------
function is_equal(a, b) {
    return stable_json_stringify(a) === stable_json_stringify(b);
}
exports.is_equal = is_equal;
// deep_map -----------------------------------------------------------------------
function deep_map(obj, map) {
    obj = map(obj);
    if (obj === null || typeof obj !== 'object')
        return obj;
    else if ('map' in obj)
        return obj.map(function (v) { return deep_map(v, map); });
    else
        return Object.assign.apply(Object, __spread([{}], Object.entries(obj)
            .map(function (_a) {
            var _b;
            var _c = __read(_a, 2), k = _c[0], v = _c[1];
            return (_b = {}, _b[k] = deep_map(v, map), _b);
        })));
}
exports.deep_map = deep_map;
exports.test(function () {
    var Wrapper = /** @class */ (function () {
        function Wrapper(v) {
            this.v = v;
        }
        Wrapper.prototype.toJSON = function () { return this.v; };
        return Wrapper;
    }());
    var a = new Wrapper([1, 2]);
    exports.assert.equal(deep_map(a, map_to_json_if_defined), [1, 2]);
    var a_l2 = new Wrapper([a, 3]);
    exports.assert.equal(deep_map(a_l2, map_to_json_if_defined), [[1, 2], 3]);
});
// md5 ----------------------------------------------------------------------------
var md5;
exports.md5 = md5;
try {
    var createHash_1 = require('crypto').createHash;
    exports.md5 = md5 = function (data) { return createHash_1('md5').update(data).digest('hex'); };
}
catch (e) {
    exports.md5 = md5 = function () { throw new Error("md5 not implemented"); };
}
// log ----------------------------------------------------------------------------
exports.debug_enabled = (uniglobal.process && uniglobal.process.env && uniglobal.process.env.debug) == 'true';
// export interface Log {
//   (message: string, short?: something, detailed?: something): void
//   (level: LogLevel, message: string, short?: something, detailed?: something): void
// }
function pad0(v) { return v.toString().length < 2 ? '0' + v : v; }
function get_formatted_time(time, withSeconds) {
    if (withSeconds === void 0) { withSeconds = true; }
    var date = new Date(time);
    // year = date.getFullYear()
    return pad0(date.getMonth() + 1) + "/" + pad0(date.getDate()) + " "
        + (pad0(date.getHours()) + ":" + pad0(date.getMinutes()) + (withSeconds ? ':' + pad0(date.getSeconds()) : ''));
}
exports.get_formatted_time = get_formatted_time;
try {
    var util_1 = require('util');
    exports.inspect = function (o) { return util_1.inspect(o, { depth: null, breakLength: Infinity }).replace(/^'|'$/g, ''); };
}
catch (e) {
    exports.inspect = function (o) { return JSON.stringify(o); };
}
var level_replacements = { debug: 'debug', info: '     ', warn: 'warn ', error: 'error' };
var log_format = has_windows ? (function (o) { return o; }) : function (o) {
    if (o === null || o === undefined || typeof o == 'string' || typeof o == 'number')
        return o;
    return stable_json_stringify(o);
};
// Some errors may contain additional properties with huge data, stripping it
var log_clean_error = function (error) {
    var clean = new Error(error.message);
    clean.stack = error.stack;
    return clean;
};
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var level = ['info', 'warn', 'error', 'debug'].includes(args[0]) ? args.shift() : 'info';
    if (level == 'debug' && !exports.debug_enabled)
        return '';
    var _a = __read(args, 3), message = _a[0], short = _a[1], detailed = _a[2];
    return exports.environment == 'development' ?
        log_in_development(level, message, short, detailed) :
        log_not_in_development(level, message, short, detailed);
}
exports.log = log;
function log_in_development(level, message, short, detailed) {
    var buff = [level_replacements[level]];
    buff.push(message);
    var error = undefined;
    if (short !== null && short !== undefined) {
        if (short instanceof Error)
            error = log_clean_error(short);
        else
            buff.push(log_format(short));
    }
    if (detailed !== null && detailed !== undefined) {
        if (detailed instanceof Error)
            error = log_clean_error(detailed);
        else
            buff.push(log_format(detailed));
    }
    // buff = buff.map((v: something) => deep_map(v, map_to_json_if_defined))
    // Generating id
    var id = '';
    if (level != 'info') {
        id = md5(stable_json_stringify(arguments)).substr(0, 6);
        buff.push(id);
    }
    console[level].apply(console, __spread(buff));
    // Printing error separately in development
    if (error) {
        var clean_error = ensure_error(error);
        clean_error.stack = exports.clean_stack(error.stack || '');
        console.log('');
        console.error(clean_error);
        console.log('');
    }
    return id;
}
function log_not_in_development(level, message, short, detailed) {
    var buff = [level_replacements[level]];
    buff.push(get_formatted_time(Date.now()));
    buff.push(message);
    if (short !== null && short !== undefined)
        buff.push(log_format(short instanceof Error ? log_clean_error(short) : short));
    if (detailed !== null && detailed !== undefined)
        buff.push(log_format(short instanceof Error ? log_clean_error(detailed) : detailed));
    // Generating id
    var id = '';
    if (level != 'info') {
        id = md5(stable_json_stringify(arguments)).substr(0, 6);
        buff.push(id);
    }
    // Printing
    console[level].apply(console, __spread(buff));
    return id;
}
// export function logWithUser(
//   level: LogLevel, user: string, message: string, short?: something, detailed?: something
// ): string { return log(level, `${pad(user, 8)} ${message}`, short, detailed) }
// Timer
function timer() {
    var start = Date.now();
    return function () { return Date.now() - start; };
}
exports.timer = timer;
{
    var stack_skip_re_1 = new RegExp([
        '/node_modules/',
        'internal/(modules|bootstrap|process)',
        'at new Promise \\(<anonymous>\\)',
        'at Object.next \\(',
        'at step \\(',
        'at __awaiter \\(',
        'at Object.exports.assert \\('
    ].join('|'));
    exports.clean_stack = function (stack) {
        var lines = stack
            .split("\n")
            .filter(function (line) {
            return !stack_skip_re_1.test(line);
        })
            .map(function (line, i) {
            return i == 0 ? line : line.replace(/([^\/]*).*(\/[^\/]+\/[^\/]+\/[^\/]+)/, function (_match, s1, s2) { return s1 + '...' + s2; });
        });
        return lines.join("\n");
    };
}
uniglobal.process && uniglobal.process.on('uncaughtException', function (error) {
    error.stack = exports.clean_stack(error.stack);
    console.log('');
    console.error(error);
    process.exit();
});
// Promise ------------------------------------------------------------------------
function once(f) {
    var called = false, result = undefined;
    return function () {
        if (called)
            return result;
        result = f.apply(this, arguments);
        called = true;
    };
}
exports.once = once;
// Promise ------------------------------------------------------------------------
// For better logging, by default promise would be logged as `{}`
;
Promise.prototype.toJSON = function () { return 'Promise'; };
Object.defineProperty(Promise.prototype, "cmap", { configurable: false, enumerable: false });
// type OMap<T> = { [key: string]: T }
// length -------------------------------------------------------------------------
function length(o) {
    if (o instanceof Array)
        return o.length;
    else if (o instanceof String || typeof o == 'string')
        return o.length;
    else {
        var i = 0;
        for (var k in o)
            if (o.hasOwnProperty(k))
                i++;
        return i;
    }
}
exports.length = length;
// is_empty -----------------------------------------------------------------------
function is_empty(o) {
    return length(o) == 0;
}
exports.is_empty = is_empty;
function take(list, n) {
    return list.slice(0, n);
}
exports.take = take;
function last(list, n) {
    if (n === undefined) {
        if (list.length < 1)
            throw new Error("can't get last elements from empty list");
        return list[list.length - 1];
    }
    else {
        if (list.length < n)
            throw new Error("can't get last " + n + " elements from list of length " + list.length);
        else
            return list.slice(list.length - n, list.length);
    }
}
exports.last = last;
function first(list, n) {
    if (n === undefined) {
        if (list.length < 1)
            throw new Error("can't get first elements from empty list");
        return list[0];
    }
    else {
        if (list.length < n)
            throw new Error("can't get first " + n + " elements from list of length " + list.length);
        else
            return list.slice(0, n);
    }
}
exports.first = first;
// reverse -------------------------------------------------------------------------------
function reverse(list) {
    list = __spread(list);
    list.reverse();
    return list;
}
exports.reverse = reverse;
function each(o, f) {
    var e_4, _a;
    if (o instanceof Array)
        for (var i = 0; i < o.length; i++)
            f(o[i], i);
    else if (o instanceof Map)
        try {
            for (var o_1 = __values(o), o_1_1 = o_1.next(); !o_1_1.done; o_1_1 = o_1.next()) {
                var _b = __read(o_1_1.value, 2), k = _b[0], v = _b[1];
                f(v, k);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (o_1_1 && !o_1_1.done && (_a = o_1.return)) _a.call(o_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    else
        for (var k in o)
            if (o.hasOwnProperty(k))
                f(o[k], k);
}
exports.each = each;
function find(o, finder) {
    var predicate = finder instanceof Function ? finder : function (v) { return v == finder; };
    if (o instanceof Array)
        for (var i = 0; i < o.length; i++)
            if (predicate(o[i], i))
                return o[i];
            else
                for (var k in o)
                    if (o.hasOwnProperty(k))
                        if (predicate(o[k], k))
                            return o[k];
    return undefined;
}
exports.find = find;
function ensure_find(o, finder, on_error) {
    var found = find(o, finder);
    if (found === undefined)
        throw new Error(on_error ? (typeof on_error == 'function' ? on_error() : on_error) : "element not found!");
    return found;
}
exports.ensure_find = ensure_find;
function find_index(list, finder) {
    var predicate = finder instanceof Function ? finder : function (v) { return v == finder; };
    for (var i = 0; i < list.length; i++)
        if (predicate(list[i], i))
            return i;
    return undefined;
}
exports.find_index = find_index;
function find_last_index(list, finder) {
    var predicate = finder instanceof Function ? finder : function (v) { return v == finder; };
    for (var i = list.length - 1; i >= 0; i--)
        if (predicate(list[i], i))
            return i;
    return undefined;
}
exports.find_last_index = find_last_index;
function group_by(list, f) {
    return reduce(list, new Map(), function (acc, v, i) {
        var key = f(v, i);
        var group = acc.get(key);
        if (!group) {
            group = [];
            acc.set(key, group);
        }
        group.push(v);
        return acc;
    });
}
exports.group_by = group_by;
function entries(map) {
    return map instanceof Map ? Array.from(map) : Object.entries(map);
}
exports.entries = entries;
function has(o, finder) { return !!find(o, finder); }
exports.has = has;
function partition(o, splitter) {
    if (o instanceof Array) {
        var selected_1 = new Array(), rejected_1 = new Array();
        var f_1 = splitter instanceof Function ? splitter : function (_v, i) { return splitter.includes(i); };
        each(o, function (v, i) { return f_1(v, i) ? selected_1.push(v) : rejected_1.push(v); });
        return [selected_1, rejected_1];
    }
    else {
        var selected_2 = {}, rejected_2 = {};
        var f_2 = splitter instanceof Function ? splitter : function (_v, k) { return splitter.includes(k); };
        each(o, function (v, k) { return f_2(v, k) ? selected_2[k] = v : rejected_2[k] = v; });
        return [selected_2, rejected_2];
    }
}
exports.partition = partition;
function sort(list, comparator) {
    if (list.length == 0)
        return list;
    else {
        if (comparator) {
            list = __spread(list);
            list.sort(comparator);
            return list;
        }
        else {
            if (typeof list[0] == 'number')
                comparator = function (a, b) { return a - b; };
            else if (typeof list[0] == 'string')
                comparator = function (a, b) { return a.localeCompare(b); };
            else
                throw new Error("the 'comparator' required to sort a list of non numbers or strings");
            list = __spread(list);
            list.sort(comparator);
            return list;
        }
    }
}
exports.sort = sort;
function sort_by(list, by) {
    if (list.length == 0)
        return list;
    else {
        var comparator = void 0;
        if (typeof by(list[0]) == 'number')
            comparator = function (a, b) { return by(a) - by(b); };
        else if (typeof by(list[0]) == 'string')
            comparator = function (a, b) { return by(a).localeCompare(by(b)); };
        else
            throw new Error("invalid return type for 'by'");
        list = __spread(list);
        list.sort(comparator);
        return list;
    }
}
exports.sort_by = sort_by;
function filter_map(o, f) {
    if (o instanceof Array) {
        var filtered_1 = [];
        each(o, function (v, k) {
            var r = f(v, k);
            if (r !== false)
                filtered_1.push(r);
        });
        return filtered_1;
    }
    else if (o instanceof Map) {
        var filtered_2 = new Map();
        each(o, function (v, k) {
            var r = f(v, k);
            if (r !== false)
                filtered_2.set(k, r);
        });
        return filtered_2;
    }
    else {
        var filtered_3 = {};
        each(o, function (v, k) {
            var r = f(v, k);
            if (r !== false)
                filtered_3[k] = r;
        });
        return filtered_3;
    }
}
exports.filter_map = filter_map;
// fill ---------------------------------------------------------------------------------
function fill(size, v) {
    var f = typeof v == 'function' ? v : function () { return v; };
    var list = [];
    for (var i = 0; i < size; i++)
        list.push(f(i));
    return list;
}
exports.fill = fill;
// fill ---------------------------------------------------------------------------------
function skip_undefined(list) {
    return filter_map(list, function (v) { return v !== undefined ? v : false; });
}
exports.skip_undefined = skip_undefined;
function reject(o, f) { return partition(o, f)[1]; }
exports.reject = reject;
// uniq ---------------------------------------------------------------------------
function unique(list, to_key) {
    var set = new Set();
    var _to_key = to_key || (function (v) { return v; });
    return list.filter(function (v) {
        var key = _to_key(v);
        if (set.has(key))
            return false;
        else {
            set.add(key);
            return true;
        }
    });
}
exports.unique = unique;
function pick(o, keys) {
    return partition(o, function (_v, i) { return keys.includes(i); })[0];
}
exports.pick = pick;
exports.test(function () {
    exports.assert.equal(pick({ a: 1, b: 2 }, ['a']), { a: 1 });
});
function reduce(o, accumulator, f) {
    each(o, function (v, i) { return accumulator = f(accumulator, v, i); });
    return accumulator;
}
exports.reduce = reduce;
function keys(o) {
    return reduce(o, [], function (list, _v, k) { list.push(k); return list; });
}
exports.keys = keys;
function values(o) {
    return reduce(o, [], function (list, v) { list.push(v); return list; });
}
exports.values = values;
// flatten -------------------------------------------------------------------------------
function flatten(list) {
    return reduce(list, [], function (acc, v) { acc.push.apply(acc, __spread(v)); return acc; });
}
exports.flatten = flatten;
// sum -----------------------------------------------------------------------------------
function sum(list) {
    return reduce(list, 0, function (sum, v) { return sum + v; });
}
exports.sum = sum;
function map(o, f) {
    if (o instanceof Array) {
        return o.map(f);
    }
    else if (o instanceof Map) {
        var mapped_1 = new Map();
        each(o, function (v, k) { return mapped_1.set(k, f(v, k)); });
        return mapped_1;
    }
    else {
        var mapped_2 = {};
        each(o, function (v, k) { return mapped_2[k] = f(v, k); });
        return mapped_2;
    }
}
exports.map = map;
// round --------------------------------------------------------------------------
function round(v, digits) {
    if (digits === void 0) { digits = 0; }
    return digits == 0 ?
        Math.round(v) :
        Math.round((v + Number.EPSILON) * Math.pow(10, digits)) / Math.pow(10, digits);
}
exports.round = round;
exports.test(function () {
    exports.assert.equal(round(0.05860103881518906, 2), 0.06);
});
// shuffle ------------------------------------------------------------------------
function shuffle(list, seed) {
    var _a;
    var random = seed !== undefined ? seedrandom(seed) : function () { return Math.random(); };
    list = __spread(list);
    for (var i = list.length - 1; i > 0; i--) {
        var j = Math.floor(random() * (i + 1));
        _a = __read([list[j], list[i]], 2), list[i] = _a[0], list[j] = _a[1];
    }
    return list;
}
exports.shuffle = shuffle;
// debounce -----------------------------------------------------------------------
function debounce(fn, timeout) {
    var timer = undefined;
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(function () { return fn.apply(void 0, __spread(args)); }, timeout);
    });
}
exports.debounce = debounce;
// seedrandom ---------------------------------------------------------------------
var seedrandom;
exports.seedrandom = seedrandom;
{
    var seedrandom_lib_1 = undefined;
    exports.seedrandom = seedrandom = function (seed) {
        // Code for proper random generator is not simple, the library needed
        if (seedrandom_lib_1 === undefined)
            seedrandom_lib_1 = require('seedrandom');
        return seedrandom_lib_1('' + seed);
    };
}
// CustomError --------------------------------------------------------------------
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, CustomError.prototype);
        return _this;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
// NeverError ---------------------------------------------------------------------
var NeverError = /** @class */ (function (_super) {
    __extends(NeverError, _super);
    function NeverError(message) {
        return _super.call(this, "NeverError: " + message) || this;
    }
    return NeverError;
}(Error));
exports.NeverError = NeverError;
// ensure_error -------------------------------------------------------------------
function ensure_error(error, default_message) {
    if (default_message === void 0) { default_message = "Unknown error"; }
    if (error && (typeof error == 'object') && (error instanceof Error)) {
        if (!error.message)
            error.message = default_message;
        return error;
    }
    else {
        return new Error('' + (error || default_message));
    }
    // return '' + ((error && (typeof error == 'object') && error.message) || default_message)
}
exports.ensure_error = ensure_error;
// Error.toJSON -------------------------------------------------------------------
// Otherwise JSON will be empty `{}`
;
Error.prototype.toJSON = function () {
    return { message: this.message, stack: this.stack };
};
Map.prototype.toJSON = function () {
    return reduce(this, {}, function (map, v, k) { map[k] = v; return map; });
};
// Test ---------------------------------------------------------------------------
// export async function test(title: string, fn: () => Promise<void> | void): Promise<void> {
//   try       { await fn() }
//   catch (e) {
//     log('error', title)
//     throw e
//   }
// }
//# sourceMappingURL=base.js.map