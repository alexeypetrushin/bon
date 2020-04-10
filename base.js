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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
function p() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (has_windows)
        console.log.apply(console, args);
    else {
        var formatted = args.map(function (v) {
            v = deep_map(v, map_to_json_if_defined);
            return typeof v == 'object' ? util_inspect(v, { breakLength: 80, colors: true }) : v;
        });
        console.log.apply(console, formatted);
    }
}
exports.p = p;
var fetch = uniglobal.fetch || require('node-fetch');
var inline_tests = [];
exports.inline_test = function (fn) { inline_tests.push(fn); };
exports.inline_test.run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, inline_tests_1, test_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                _i = 0, inline_tests_1 = inline_tests;
                _a.label = 1;
            case 1:
                if (!(_i < inline_tests_1.length)) return [3 /*break*/, 4];
                test_1 = inline_tests_1[_i];
                return [4 /*yield*/, test_1()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                log('info', 'inline tests passed');
                return [3 /*break*/, 6];
            case 5:
                e_1 = _a.sent();
                log('error', e_1);
                uniglobal.process && uniglobal.process.exit();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var run_inline_tests = (uniglobal.process && uniglobal.process.env &&
    uniglobal.process.env.inline_test) == 'true';
if (run_inline_tests)
    uniglobal.setTimeout(exports.inline_test.run, 0);
function http_call(url, body, options) {
    if (body === void 0) { body = {}; }
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        function call_without_timeout() {
            return __awaiter(this, void 0, void 0, function () {
                var copied_ptions, fetch_1, result, e_2;
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
                            e_2 = _a.sent();
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
        return Object.assign.apply(Object, __spreadArrays([{}], Object.entries(obj)
            .sort(function (_a, _b) {
            var key_a = _a[0];
            var key_b = _b[0];
            return key_a.localeCompare(key_b);
        })
            .map(function (_a) {
            var _b;
            var k = _a[0], v = _a[1];
            return (_b = {}, _b[k] = deep_clone_and_sort(v), _b);
        })));
}
exports.deep_clone_and_sort = deep_clone_and_sort;
// stable_json_stringify ----------------------------------------------------------
// https://stackoverflow.com/questions/42491226/is-json-stringify-deterministic-in-v8
function stable_json_stringify(obj, pretty) {
    if (pretty === void 0) { pretty = false; }
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
        return Object.assign.apply(Object, __spreadArrays([{}], Object.entries(obj)
            .map(function (_a) {
            var _b;
            var k = _a[0], v = _a[1];
            return (_b = {}, _b[k] = deep_map(v, map), _b);
        })));
}
exports.deep_map = deep_map;
exports.inline_test(function () {
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
    var message = args[0], short = args[1], detailed = args[2];
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
    console[level].apply(console, buff);
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
    console[level].apply(console, buff);
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
function each(o, f) {
    if (o instanceof Array)
        for (var i = 0; i < o.length; i++)
            f(o[i], i);
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
// sort ---------------------------------------------------------------------------
function sort(list, compare_fn) {
    list = __spreadArrays(list);
    list.sort(compare_fn);
    return list;
}
exports.sort = sort;
function select(o, f) { return partition(o, f)[0]; }
exports.select = select;
function reject(o, f) { return partition(o, f)[1]; }
exports.reject = reject;
// uniq ---------------------------------------------------------------------------
function uniq(list) { return list.filter(function (v, i, a) { return a.indexOf(v) === i; }); }
exports.uniq = uniq;
function remove(o, f) {
    if (o instanceof Array) {
        if (f instanceof Function) {
            var _a = partition(o, f), deleted = _a[0], remained = _a[1];
            o.splice.apply(o, __spreadArrays([0, remained.length], remained));
            return deleted;
        }
        else {
            if (f >= o.length)
                return undefined;
            var v = o[f];
            o.splice(f, 1);
            return v;
        }
    }
    else {
        if (f instanceof Function) {
            var deleted = partition(o, f)[0];
            each(deleted, function (_v, k) { return delete o[k]; });
            return deleted;
        }
        else {
            if (!o.hasOwnProperty(f))
                return undefined;
            var v = o[f];
            delete o[f];
            return v;
        }
    }
}
exports.remove = remove;
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
function map(o, f) {
    if (o instanceof Array)
        return o.map(f);
    else {
        var mapped_1 = {};
        each(o, function (v, k) { return mapped_1[k] = f(v, k); });
        return mapped_1;
    }
}
exports.map = map;
// round --------------------------------------------------------------------------
function round(v, digits) {
    if (digits === void 0) { digits = 0; }
    return digits == 0 ? Math.round(v) : Math.round(v * Math.pow(10, digits)) / Math.pow(10, digits);
}
exports.round = round;
// shuffle ------------------------------------------------------------------------
function shuffle(list, seed) {
    var _a;
    var random = seed !== undefined ? seedrandom(seed) : function () { return Math.random(); };
    list = __spreadArrays(list);
    for (var i = list.length - 1; i > 0; i--) {
        var j = Math.floor(random() * (i + 1));
        _a = [list[j], list[i]], list[i] = _a[0], list[j] = _a[1];
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
        timer = setTimeout(function () { return fn.apply(void 0, args); }, timeout);
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
Error.prototype.toJSON = function () {
    return { message: this.message, stack: this.stack };
};
// Test ---------------------------------------------------------------------------
function test(title, fn) {
    return __awaiter(this, void 0, void 0, function () {
        var e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fn()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    log('error', title);
                    throw e_3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.test = test;
//# sourceMappingURL=base.js.map