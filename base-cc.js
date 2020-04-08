var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Global variables for browser and node ------------------------------------------
let uniglobal;
try {
    uniglobal = window;
}
catch (e) {
    uniglobal = global;
}
export { uniglobal };
// Useful constants ---------------------------------------------------------------
export const kb = 1024, mb = 1024 * kb;
export const sec = 1000, min = 60 * sec, hour = 60 * min, day = 24 * hour;
// environment --------------------------------------------------------------------
export const environment = (uniglobal.process && uniglobal.process.env && uniglobal.process.env.environment) ||
    (uniglobal.mono && uniglobal.mono.environment) ||
    'development';
if (!['development', 'production', 'test'].includes(environment))
    throw new Error('invalid environment!');
// p ------------------------------------------------------------------------------
function mapToJsonIfDefined(v) { return v && v.toJSON ? v.toJSON() : v; }
export function p(...args) {
    console.log(...args.map((v) => deepMap(v, mapToJsonIfDefined)));
}
const inlineTests = [];
export const inlineTest = function (fn) { inlineTests.push(fn); };
inlineTest.run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const test of inlineTests)
            yield test();
        log('info', 'inline tests passed');
    }
    catch (e) {
        console.error(e);
        uniglobal.process && uniglobal.process.exit();
    }
});
const runInlineTests = (uniglobal.process && uniglobal.process.env && uniglobal.process.env.inlineTest) == 'true';
if (runInlineTests)
    uniglobal.setTimeout(inlineTest.run, 0);
export function httpCall(url, body = {}, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        function callWithoutTimeout() {
            return __awaiter(this, void 0, void 0, function* () {
                const copiedOptions = Object.assign({ method: 'post' }, options);
                delete copiedOptions.timeout;
                const fetch = uniglobal.fetch || require('node-fetch');
                if (!fetch)
                    throw new Error('global.fetch not defined');
                const result = yield fetch(url, Object.assign(Object.assign({}, copiedOptions), { body: copiedOptions.method == 'get' ? undefined : JSON.stringify(body) }));
                if (!result.ok)
                    throw new Error(`can't call ${url} ${result.status} ${result.statusText}`);
                return yield result.json();
            });
        }
        return new Promise((resolve, reject) => {
            if (options.timeout)
                uniglobal.setTimeout(() => reject(new Error(`request timed out ${url}`)), options.timeout);
            callWithoutTimeout().then(resolve, reject);
        });
    });
}
// buildUrl -----------------------------------------------------------------------
export function buildUrl(url, query = {}) {
    const querystring = [];
    for (const key in query) {
        const value = query[key];
        if (key !== null && key !== undefined && value !== null && value !== undefined)
            querystring.push(`${encodeURIComponent(key)}=${encodeURIComponent('' + query[key])}`);
    }
    if (querystring.length > 0)
        return `${url}${url.includes('?') ? '&' : '?'}${querystring.join('&')}`;
    else
        return url;
}
// sleep --------------------------------------------------------------------------
export function sleep(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => uniglobal.setTimeout(resolve, ms));
    });
}
export const assert = function (condition, message) {
    const messageString = message ? (message instanceof Function ? message() : message) : 'Assertion error!';
    if (!condition)
        throw new Error(messageString);
};
assert.warn = (condition, message) => { if (!condition)
    console.warn(message || 'Assertion error!'); };
assert.equal = (a, b, message) => {
    if (!isEqual(a, b)) {
        const messageString = message ? (message instanceof Function ? message() : message) :
            `Assertion error: ${stableJsonStringify(a)} != ${stableJsonStringify(b)}`;
        throw new Error(messageString);
    }
};
// deepCloneAndSort ---------------------------------------------------------------
// Clone object with object properties sorted, including for nested objects
export function deepCloneAndSort(obj) {
    if (obj === null || typeof obj !== 'object')
        return obj;
    else if (Array.isArray(obj))
        return obj.map(deepCloneAndSort);
    else if ('toJSON' in obj)
        return deepCloneAndSort(obj.toJSON());
    else
        return Object.assign({}, ...Object.entries(obj)
            .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
            .map(([k, v]) => ({ [k]: deepCloneAndSort(v) })));
}
// stableJsonStringify ------------------------------------------------------------
// https://stackoverflow.com/questions/42491226/is-json-stringify-deterministic-in-v8
export function stableJsonStringify(obj) { return JSON.stringify(deepCloneAndSort(obj)); }
// isEqual ------------------------------------------------------------------------
export function isEqual(a, b) {
    return stableJsonStringify(a) === stableJsonStringify(b);
}
// deepMap ------------------------------------------------------------------------
export function deepMap(obj, map) {
    obj = map(obj);
    if (obj === null || typeof obj !== 'object')
        return obj;
    else if ('map' in obj)
        return obj.map((v) => deepMap(v, map));
    else
        return Object.assign({}, ...Object.entries(obj)
            .map(([k, v]) => ({ [k]: deepMap(v, map) })));
}
inlineTest(() => {
    class Wrapper {
        constructor(v) {
            this.v = v;
        }
        toJSON() { return this.v; }
    }
    const a = new Wrapper([1, 2]);
    assert.equal(deepMap(a, mapToJsonIfDefined), [1, 2]);
    const aL2 = new Wrapper([a, 3]);
    assert.equal(deepMap(aL2, mapToJsonIfDefined), [[1, 2], 3]);
});
// md5 ----------------------------------------------------------------------------
let md5;
try {
    const { createHash } = require('crypto');
    md5 = (data) => createHash('md5').update(data).digest('hex');
}
catch (e) {
    md5 = () => { throw new Error("md5 not implemented"); };
}
export { md5 };
// log ----------------------------------------------------------------------------
export const debugEnabled = (uniglobal.process && uniglobal.process.env && uniglobal.process.env.debug) == 'true';
function pad0(v) { return v.toString().length < 2 ? '0' + v : v; }
export function getFormattedTime(time, withSeconds = true) {
    let date = new Date(time);
    // year = date.getFullYear()
    return `${pad0(date.getMonth() + 1)}/${pad0(date.getDate())} `
        + `${pad0(date.getHours())}:${pad0(date.getMinutes())}${withSeconds ? ':' + pad0(date.getSeconds()) : ''}`;
}
function pad(v, n) { return v.substring(0, n).padEnd(n); }
export let inspect;
try {
    const util = require('util');
    inspect = (o) => util.inspect(o, { depth: null, breakLength: Infinity }).replace(/^'|'$/g, '');
}
catch (e) {
    inspect = (o) => o;
}
const levelReplacements = { debug: 'debug', info: '     ', warn: 'warn ', error: 'error' };
function errorToData(error) { return { message: error.message, stack: cleanStack(error.stack || '') }; }
function log(...args) {
    const level = ['info', 'warn', 'error', 'debug'].includes(args[0]) ? args.shift() : 'info';
    if (level == 'debug' && !debugEnabled)
        return '';
    let [message, short, detailed] = args;
    // user = user || ''
    let buff = [levelReplacements[level]];
    // buff.push(pad(user, 8))
    if (environment != 'development')
        buff.push(getFormattedTime(Date.now()));
    buff.push(message);
    // Handling errors
    let error = null;
    if (short instanceof Error) {
        error = short;
        if (environment != 'development')
            buff.push(inspect(errorToData(error)));
    }
    else if (short !== null && short !== undefined)
        buff.push(inspect(short));
    if (detailed instanceof Error) {
        error = detailed;
        if (environment != 'development')
            buff.push(inspect(errorToData(error)));
    }
    else if (detailed !== null && detailed !== undefined && environment != 'development')
        buff.push(inspect(detailed));
    buff = buff.map((v) => deepMap(v, mapToJsonIfDefined));
    // Adding full username in production
    // if (environment != 'development') buff.push(user)
    // Generating id
    let id = '';
    if (level != 'info') {
        id = md5(stableJsonStringify(args)).substr(0, 6);
        buff.push(id);
    }
    // Printing
    ;
    uniglobal.console[level].apply(uniglobal.console, buff);
    // Printing error in development
    if (environment == 'development' && error) {
        const cleanError = new Error(error.message);
        cleanError.stack = cleanStack(error.stack || '');
        console.log('');
        console.error(cleanError);
        console.log('');
    }
    return id;
}
export { log };
export function logWithUser(level, user, message, short, detailed) { return log(level, `${pad(user, 8)} ${message}`, short, detailed); }
// Timer
export function timer() {
    const start = Date.now();
    return function () { return Date.now() - start; };
}
// cleanStack ---------------------------------------------------------------------
export let cleanStack;
{
    const stackSkipRe = new RegExp([
        '/node_modules/',
        'internal/(modules|bootstrap|process)',
        'at new Promise \\(<anonymous>\\)',
        'at Object.next \\(',
        'at step \\(',
        'at __awaiter \\(',
        'at Object.exports.assert \\('
    ].join('|'));
    cleanStack = (stack) => {
        const lines = stack
            .split("\n")
            .filter((line) => {
            return !stackSkipRe.test(line);
        })
            .map((line, i) => i == 0 ? line : line.replace(/([^\/]*).*(\/[^\/]+\/[^\/]+\/[^\/]+)/, (_match, s1, s2) => s1 + '...' + s2));
        return lines.join("\n");
    };
}
uniglobal.process && uniglobal.process.on('uncaughtException', function (error) {
    error.stack = cleanStack(error.stack);
    console.log('');
    console.error(error);
    process.exit();
});
// Promise ------------------------------------------------------------------------
export function once(f) {
    let called = false, result = undefined;
    return function () {
        if (called)
            return result;
        result = f.apply(this, arguments);
        called = true;
    };
}
// Promise ------------------------------------------------------------------------
// For better logging, by default promise would be logged as `{}`
;
Promise.prototype.toJSON = function () { return 'Promise'; };
Object.defineProperty(Promise.prototype, "cmap", { configurable: false, enumerable: false });
// length -------------------------------------------------------------------------
export function length(o) {
    if (o instanceof Array)
        return o.length;
    else if (o instanceof String || typeof o == 'string')
        return o.length;
    else {
        let i = 0;
        for (const k in o)
            if (o.hasOwnProperty(k))
                i++;
        return i;
    }
}
// isEmpty ------------------------------------------------------------------------
export function isEmpty(o) { return length(o) == 0; }
// take ---------------------------------------------------------------------------
export function take(list, n) { return list.slice(0, n); }
// last ---------------------------------------------------------------------------
export function last(list) {
    if (list.length == 0)
        throw new Error("can't get last on empty list");
    else
        return list[list.length - 1];
}
function each(o, f) {
    if (o instanceof Array)
        for (let i = 0; i < o.length; i++)
            f(o[i], i);
    else
        for (const k in o)
            if (o.hasOwnProperty(k))
                f(o[k], k);
}
export { each };
function partition(o, fOrList) {
    if (o instanceof Array) {
        const selected = new Array(), rejected = new Array();
        const f = fOrList instanceof Function ? fOrList : (_v, i) => fOrList.includes(i);
        each(o, (v, i) => f(v, i) ? selected.push(v) : rejected.push(v));
        return [selected, rejected];
    }
    else {
        const selected = {}, rejected = {};
        const f = fOrList instanceof Function ? fOrList : (_v, k) => fOrList.includes(k);
        each(o, (v, k) => f(v, k) ? selected[k] = v : rejected[k] = v);
        return [selected, rejected];
    }
}
export { partition };
// sort ---------------------------------------------------------------------------
function sort(list, compareFn) {
    list = [...list];
    list.sort(compareFn);
    return list;
}
export { sort };
function select(o, f) { return partition(o, f)[0]; }
export { select };
// uniq ---------------------------------------------------------------------------
export function uniq(list) { return list.filter((v, i, a) => a.indexOf(v) === i); }
function remove(o, f) {
    if (o instanceof Array) {
        if (f instanceof Function) {
            const [deleted, remained] = partition(o, f);
            o.splice(0, remained.length, ...remained);
            return deleted;
        }
        else {
            if (f >= o.length)
                return undefined;
            const v = o[f];
            o.splice(f, 1);
            return v;
        }
    }
    else {
        if (f instanceof Function) {
            const [deleted] = partition(o, f);
            each(deleted, (_v, k) => delete o[k]);
            return deleted;
        }
        else {
            if (!o.hasOwnProperty(f))
                return undefined;
            const v = o[f];
            delete o[f];
            return v;
        }
    }
}
export { remove };
function reduce(o, accumulator, f) {
    each(o, (v, i) => accumulator = f(accumulator, v, i));
    return accumulator;
}
export { reduce };
function keys(o) {
    return reduce(o, [], (list, _v, k) => { list.push(k); return list; });
}
export { keys };
function map(o, f) {
    if (o instanceof Array)
        return o.map(f);
    else {
        const mapped = {};
        each(o, (v, k) => mapped[k] = f(v, k));
        return mapped;
    }
}
export { map };
// round --------------------------------------------------------------------------
export function round(v, digits = 0) {
    return digits == 0 ? Math.round(v) : Math.round(v * Math.pow(10, digits)) / Math.pow(10, digits);
}
// shuffle ------------------------------------------------------------------------
export function shuffle(list, seed) {
    const random = seed !== undefined ? seedrandom(seed) : () => Math.random();
    list = [...list];
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}
// seedrandom ---------------------------------------------------------------------
let seedrandom;
{
    let seedrandomLib = undefined;
    seedrandom = (seed) => {
        // Code for proper random generator is not simple, the library needed
        if (seedrandomLib === undefined)
            seedrandomLib = require('seedrandom');
        return seedrandomLib('' + seed);
    };
}
export { seedrandom };
//# sourceMappingURL=base-cc.js.map