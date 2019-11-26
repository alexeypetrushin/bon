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
try {
    exports.uniglobal = uniglobal = window;
}
catch (e) {
    exports.uniglobal = uniglobal = global;
}
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
function mapToJsonIfDefined(v) { return v && v.toJSON ? v.toJSON() : v; }
function p() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, args.map(function (v) { return deepMap(v, mapToJsonIfDefined); }));
}
exports.p = p;
var inlineTests = [];
exports.inlineTest = function (fn) { inlineTests.push(fn); };
exports.inlineTest.run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _i, inlineTests_1, test, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                _i = 0, inlineTests_1 = inlineTests;
                _a.label = 1;
            case 1:
                if (!(_i < inlineTests_1.length)) return [3 /*break*/, 4];
                test = inlineTests_1[_i];
                return [4 /*yield*/, test()];
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
                console.error(e_1);
                uniglobal.process && uniglobal.process.exit();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var runInlineTests = (uniglobal.process && uniglobal.process.env && uniglobal.process.env.inlineTest) == 'true';
if (runInlineTests)
    uniglobal.setTimeout(exports.inlineTest.run, 0);
function httpCall(url, body, options) {
    if (body === void 0) { body = {}; }
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        function callWithoutTimeout() {
            return __awaiter(this, void 0, void 0, function () {
                var copiedOptions, fetch, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            copiedOptions = __assign({ method: 'post' }, options);
                            delete copiedOptions.timeout;
                            fetch = uniglobal.fetch || require('node-fetch');
                            if (!fetch)
                                throw new Error('global.fetch not defined');
                            return [4 /*yield*/, fetch(url, __assign(__assign({}, copiedOptions), { body: copiedOptions.method == 'get' ? undefined : JSON.stringify(body) }))];
                        case 1:
                            result = _a.sent();
                            if (!result.ok)
                                throw new Error("can't call " + url + " " + result.status + " " + result.statusText);
                            return [4 /*yield*/, result.json()];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    if (options.timeout)
                        uniglobal.setTimeout(function () { return reject(new Error("request timed out " + url)); }, options.timeout);
                    callWithoutTimeout().then(resolve, reject);
                })];
        });
    });
}
exports.httpCall = httpCall;
// buildUrl -----------------------------------------------------------------------
function buildUrl(url, query) {
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
exports.buildUrl = buildUrl;
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
    var messageString = message ? (message instanceof Function ? message() : message) : 'Assertion error!';
    if (!condition)
        throw new Error(messageString);
};
exports.assert.warn = function (condition, message) { if (!condition)
    console.warn(message || 'Assertion error!'); };
exports.assert.equal = function (a, b, message) {
    if (!isEqual(a, b)) {
        var messageString = message ? (message instanceof Function ? message() : message) :
            "Assertion error: " + stableJsonStringify(a) + " != " + stableJsonStringify(b);
        throw new Error(messageString);
    }
};
// deepCloneAndSort ---------------------------------------------------------------
// Clone object with object properties sorted, including for nested objects
function deepCloneAndSort(obj) {
    if (obj === null || typeof obj !== 'object')
        return obj;
    else if (Array.isArray(obj))
        return obj.map(deepCloneAndSort);
    else if ('toJSON' in obj)
        return deepCloneAndSort(obj.toJSON());
    else
        return Object.assign.apply(Object, __spreadArrays([{}], Object.entries(obj)
            .sort(function (_a, _b) {
            var keyA = _a[0];
            var keyB = _b[0];
            return keyA.localeCompare(keyB);
        })
            .map(function (_a) {
            var _b;
            var k = _a[0], v = _a[1];
            return (_b = {}, _b[k] = deepCloneAndSort(v), _b);
        })));
}
exports.deepCloneAndSort = deepCloneAndSort;
// stableJsonStringify ------------------------------------------------------------
// https://stackoverflow.com/questions/42491226/is-json-stringify-deterministic-in-v8
function stableJsonStringify(obj) { return JSON.stringify(deepCloneAndSort(obj)); }
exports.stableJsonStringify = stableJsonStringify;
// isEqual ------------------------------------------------------------------------
function isEqual(a, b) {
    return stableJsonStringify(a) === stableJsonStringify(b);
}
exports.isEqual = isEqual;
// deepMap ------------------------------------------------------------------------
function deepMap(obj, map) {
    obj = map(obj);
    if (obj === null || typeof obj !== 'object')
        return obj;
    else if ('map' in obj)
        return obj.map(function (v) { return deepMap(v, map); });
    else
        return Object.assign.apply(Object, __spreadArrays([{}], Object.entries(obj)
            .map(function (_a) {
            var _b;
            var k = _a[0], v = _a[1];
            return (_b = {}, _b[k] = deepMap(v, map), _b);
        })));
}
exports.deepMap = deepMap;
exports.inlineTest(function () {
    var Wrapper = /** @class */ (function () {
        function Wrapper(v) {
            this.v = v;
        }
        Wrapper.prototype.toJSON = function () { return this.v; };
        return Wrapper;
    }());
    var a = new Wrapper([1, 2]);
    exports.assert.equal(deepMap(a, mapToJsonIfDefined), [1, 2]);
    var aL2 = new Wrapper([a, 3]);
    exports.assert.equal(deepMap(aL2, mapToJsonIfDefined), [[1, 2], 3]);
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
exports.debugEnabled = (uniglobal.process && uniglobal.process.env && uniglobal.process.env.debug) == 'true';
function pad0(v) { return v.toString().length < 2 ? '0' + v : v; }
function getFormattedTime(time, withSeconds) {
    if (withSeconds === void 0) { withSeconds = true; }
    var date = new Date(time);
    // year = date.getFullYear()
    return pad0(date.getMonth() + 1) + "/" + pad0(date.getDate()) + " "
        + (pad0(date.getHours()) + ":" + pad0(date.getMinutes()) + (withSeconds ? ':' + pad0(date.getSeconds()) : ''));
}
exports.getFormattedTime = getFormattedTime;
function pad(v, n) { return v.substring(0, n).padEnd(n); }
try {
    var util_1 = require('util');
    exports.inspect = function (o) { return util_1.inspect(o, { depth: null, breakLength: Infinity }).replace(/^'|'$/g, ''); };
}
catch (e) {
    exports.inspect = function (o) { return o; };
}
var levelReplacements = { debug: 'debug', info: '     ', warn: 'warn ', error: 'error' };
function errorToData(error) { return { message: error.message, stack: exports.cleanStack(error.stack || '') }; }
function log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var level = ['info', 'warn', 'error', 'debug'].includes(args[0]) ? args.shift() : 'info';
    if (level == 'debug' && !exports.debugEnabled)
        return '';
    var message = args[0], short = args[1], detailed = args[2];
    // user = user || ''
    var buff = [levelReplacements[level]];
    // buff.push(pad(user, 8))
    if (exports.environment != 'development')
        buff.push(getFormattedTime(Date.now()));
    buff.push(message);
    // Handling errors
    var error = null;
    if (short instanceof Error) {
        error = short;
        if (exports.environment != 'development')
            buff.push(exports.inspect(errorToData(error)));
    }
    else if (short !== null && short !== undefined)
        buff.push(exports.inspect(short));
    if (detailed instanceof Error) {
        error = detailed;
        if (exports.environment != 'development')
            buff.push(exports.inspect(errorToData(error)));
    }
    else if (detailed !== null && detailed !== undefined && exports.environment != 'development')
        buff.push(exports.inspect(detailed));
    buff = buff.map(function (v) { return deepMap(v, mapToJsonIfDefined); });
    // Adding full username in production
    // if (environment != 'development') buff.push(user)
    // Generating id
    var id = '';
    if (level != 'info') {
        id = md5(stableJsonStringify(args)).substr(0, 6);
        buff.push(id);
    }
    // Printing
    ;
    uniglobal.console[level].apply(uniglobal.console, buff);
    // Printing error in development
    if (exports.environment == 'development' && error) {
        var cleanError = new Error(error.message);
        cleanError.stack = exports.cleanStack(error.stack || '');
        console.log('');
        console.error(cleanError);
        console.log('');
    }
    return id;
}
exports.log = log;
function logWithUser(level, user, message, short, detailed) { return log(level, pad(user, 8) + " " + message, short, detailed); }
exports.logWithUser = logWithUser;
// Timer
function timer() {
    var start = Date.now();
    return function () { return Date.now() - start; };
}
exports.timer = timer;
{
    var stackSkipRe_1 = new RegExp([
        '/node_modules/',
        'internal/(modules|bootstrap|process)',
        'at new Promise \\(<anonymous>\\)',
        'at Object.next \\(',
        'at step \\(',
        'at __awaiter \\(',
        'at Object.exports.assert \\('
    ].join('|'));
    exports.cleanStack = function (stack) {
        var lines = stack
            .split("\n")
            .filter(function (line) {
            return !stackSkipRe_1.test(line);
        })
            .map(function (line, i) {
            return i == 0 ? line : line.replace(/([^\/]*).*(\/[^\/]+\/[^\/]+\/[^\/]+)/, function (_match, s1, s2) { return s1 + '...' + s2; });
        });
        return lines.join("\n");
    };
}
uniglobal.process && uniglobal.process.on('uncaughtException', function (error) {
    error.stack = exports.cleanStack(error.stack);
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
// isEmpty ------------------------------------------------------------------------
function isEmpty(o) { return length(o) == 0; }
exports.isEmpty = isEmpty;
// take ---------------------------------------------------------------------------
function take(list, n) { return list.slice(0, n); }
exports.take = take;
// last ---------------------------------------------------------------------------
function last(list) {
    if (list.length == 0)
        throw new Error("can't get last on empty list");
    else
        return list[list.length - 1];
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
function partition(o, fOrList) {
    if (o instanceof Array) {
        var selected_1 = new Array(), rejected_1 = new Array();
        var f_1 = fOrList instanceof Function ? fOrList : function (_v, i) { return fOrList.includes(i); };
        each(o, function (v, i) { return f_1(v, i) ? selected_1.push(v) : rejected_1.push(v); });
        return [selected_1, rejected_1];
    }
    else {
        var selected_2 = {}, rejected_2 = {};
        var f_2 = fOrList instanceof Function ? fOrList : function (_v, k) { return fOrList.includes(k); };
        each(o, function (v, k) { return f_2(v, k) ? selected_2[k] = v : rejected_2[k] = v; });
        return [selected_2, rejected_2];
    }
}
exports.partition = partition;
// sort ---------------------------------------------------------------------------
function sort(list, compareFn) {
    list = __spreadArrays(list);
    list.sort(compareFn);
    return list;
}
exports.sort = sort;
function select(o, f) { return partition(o, f)[0]; }
exports.select = select;
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
// seedrandom ---------------------------------------------------------------------
var seedrandom;
exports.seedrandom = seedrandom;
{
    var seedrandomLib_1 = undefined;
    exports.seedrandom = seedrandom = function (seed) {
        // Code for proper random generator is not simple, the library needed
        if (seedrandomLib_1 === undefined)
            seedrandomLib_1 = require('seedrandom');
        return seedrandomLib_1('' + seed);
    };
}
//# sourceMappingURL=base.js.map