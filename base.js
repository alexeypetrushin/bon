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
let has_windows = false;
try {
    uniglobal = window;
    has_windows = true;
}
catch (e) {
    uniglobal = global;
}
export { uniglobal };
const console = uniglobal.console;
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
function map_to_json_if_defined(v) { return v && v.toJSON ? v.toJSON() : v; }
let util_inspect = (v, options) => {
    try {
        util_inspect = require('util').inspect;
    }
    catch (_e) { }
    return util_inspect(v, options);
};
export function p(...args) {
    if (has_windows)
        console.log(...args);
    else {
        const formatted = args.map((v) => {
            v = deep_map(v, map_to_json_if_defined);
            return typeof v == 'object' ? util_inspect(v, { breakLength: 80, colors: true }) : v;
        });
        console.log(...formatted);
    }
}
const fetch = uniglobal.fetch || require('node-fetch');
const inline_tests = [];
export const inline_test = function (fn) { inline_tests.push(fn); };
inline_test.run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const test of inline_tests)
            yield test();
        log('info', 'inline tests passed');
    }
    catch (e) {
        log('error', e);
        uniglobal.process && uniglobal.process.exit();
    }
});
const run_inline_tests = (uniglobal.process && uniglobal.process.env &&
    uniglobal.process.env.inline_test) == 'true';
if (run_inline_tests)
    uniglobal.setTimeout(inline_test.run, 0);
export function http_call(url, body = {}, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        function call_without_timeout() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const copied_ptions = Object.assign({ method: 'post' }, options);
                    delete copied_ptions.timeout;
                    const fetch = uniglobal.fetch || require('node-fetch');
                    if (!fetch)
                        throw new Error('global.fetch not defined');
                    const result = yield fetch(url, Object.assign(Object.assign({}, copied_ptions), { body: copied_ptions.method == 'get' ? undefined : JSON.stringify(body) }));
                    if (!result.ok)
                        throw new Error(`can't call ${url} ${result.status} ${result.statusText}`);
                    return yield result.json();
                }
                catch (e) {
                }
            });
        }
        return new Promise((resolve, reject) => {
            if (options.timeout)
                uniglobal.setTimeout(() => reject(new Error(`request timed out ${url}`)), options.timeout);
            call_without_timeout().then(resolve, reject);
        });
    });
}
// build_url ----------------------------------------------------------------------
export function build_url(url, query = {}) {
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
    const message_string = message ? (message instanceof Function ? message() : message) : 'Assertion error!';
    if (!condition)
        throw new Error(message_string);
};
assert.warn = (condition, message) => { if (!condition)
    log('warn', message || 'Assertion error!'); };
assert.equal = (a, b, message) => {
    if (!is_equal(a, b)) {
        const message_string = message ? (message instanceof Function ? message() : message) :
            `Assertion error: ${stable_json_stringify(a, true)} != ${stable_json_stringify(b, true)}`;
        throw new Error(message_string);
    }
};
// deep_clone_and_sort ------------------------------------------------------------
// Clone object with object properties sorted, including for nested objects
export function deep_clone_and_sort(obj) {
    if (obj === null || typeof obj !== 'object')
        return obj;
    else if (Array.isArray(obj))
        return obj.map(deep_clone_and_sort);
    else if ('toJSON' in obj)
        return deep_clone_and_sort(obj.toJSON());
    else
        return Object.assign({}, ...Object.entries(obj)
            .sort(([key_a], [key_b]) => key_a.localeCompare(key_b))
            .map(([k, v]) => ({ [k]: deep_clone_and_sort(v) })));
}
// stable_json_stringify ----------------------------------------------------------
// https://stackoverflow.com/questions/42491226/is-json-stringify-deterministic-in-v8
export function stable_json_stringify(obj, pretty = false) {
    return pretty ? JSON.stringify(deep_clone_and_sort(obj), null, 2) : JSON.stringify(deep_clone_and_sort(obj));
}
// is_equal -----------------------------------------------------------------------
export function is_equal(a, b) {
    return stable_json_stringify(a) === stable_json_stringify(b);
}
// deep_map -----------------------------------------------------------------------
export function deep_map(obj, map) {
    obj = map(obj);
    if (obj === null || typeof obj !== 'object')
        return obj;
    else if ('map' in obj)
        return obj.map((v) => deep_map(v, map));
    else
        return Object.assign({}, ...Object.entries(obj)
            .map(([k, v]) => ({ [k]: deep_map(v, map) })));
}
inline_test(() => {
    class Wrapper {
        constructor(v) {
            this.v = v;
        }
        toJSON() { return this.v; }
    }
    const a = new Wrapper([1, 2]);
    assert.equal(deep_map(a, map_to_json_if_defined), [1, 2]);
    const a_l2 = new Wrapper([a, 3]);
    assert.equal(deep_map(a_l2, map_to_json_if_defined), [[1, 2], 3]);
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
export const debug_enabled = (uniglobal.process && uniglobal.process.env && uniglobal.process.env.debug) == 'true';
// export interface Log {
//   (message: string, short?: something, detailed?: something): void
//   (level: LogLevel, message: string, short?: something, detailed?: something): void
// }
function pad0(v) { return v.toString().length < 2 ? '0' + v : v; }
export function get_formatted_time(time, withSeconds = true) {
    let date = new Date(time);
    // year = date.getFullYear()
    return `${pad0(date.getMonth() + 1)}/${pad0(date.getDate())} `
        + `${pad0(date.getHours())}:${pad0(date.getMinutes())}${withSeconds ? ':' + pad0(date.getSeconds()) : ''}`;
}
// function pad(v: string, n: number) { return v.substring(0, n).padEnd(n) }
export let inspect;
try {
    const util = require('util');
    inspect = (o) => util.inspect(o, { depth: null, breakLength: Infinity }).replace(/^'|'$/g, '');
}
catch (e) {
    inspect = (o) => JSON.stringify(o);
}
const level_replacements = { debug: 'debug', info: '     ', warn: 'warn ', error: 'error' };
const log_format = has_windows ? ((o) => o) : (o) => {
    if (o === null || o === undefined || typeof o == 'string' || typeof o == 'number')
        return o;
    return stable_json_stringify(o);
};
// Some errors may contain additional properties with huge data, stripping it
const log_clean_error = (error) => {
    const clean = new Error(error.message);
    clean.stack = error.stack;
    return clean;
};
function log(...args) {
    const level = ['info', 'warn', 'error', 'debug'].includes(args[0]) ? args.shift() : 'info';
    if (level == 'debug' && !debug_enabled)
        return '';
    const [message, short, detailed] = args;
    return environment == 'development' ?
        log_in_development(level, message, short, detailed) :
        log_not_in_development(level, message, short, detailed);
}
export { log };
function log_in_development(level, message, short, detailed) {
    let buff = [level_replacements[level]];
    buff.push(message);
    let error = undefined;
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
    let id = '';
    if (level != 'info') {
        id = md5(stable_json_stringify(arguments)).substr(0, 6);
        buff.push(id);
    }
    console[level](...buff);
    // Printing error separately in development
    if (error) {
        const clean_error = ensure_error(error);
        clean_error.stack = clean_stack(error.stack || '');
        console.log('');
        console.error(clean_error);
        console.log('');
    }
    return id;
}
function log_not_in_development(level, message, short, detailed) {
    let buff = [level_replacements[level]];
    buff.push(get_formatted_time(Date.now()));
    buff.push(message);
    if (short !== null && short !== undefined)
        buff.push(log_format(short instanceof Error ? log_clean_error(short) : short));
    if (detailed !== null && detailed !== undefined)
        buff.push(log_format(short instanceof Error ? log_clean_error(detailed) : detailed));
    // Generating id
    let id = '';
    if (level != 'info') {
        id = md5(stable_json_stringify(arguments)).substr(0, 6);
        buff.push(id);
    }
    // Printing
    console[level](...buff);
    return id;
}
// export function logWithUser(
//   level: LogLevel, user: string, message: string, short?: something, detailed?: something
// ): string { return log(level, `${pad(user, 8)} ${message}`, short, detailed) }
// Timer
export function timer() {
    const start = Date.now();
    return function () { return Date.now() - start; };
}
// clean_stack --------------------------------------------------------------------
export let clean_stack;
{
    const stack_skip_re = new RegExp([
        '/node_modules/',
        'internal/(modules|bootstrap|process)',
        'at new Promise \\(<anonymous>\\)',
        'at Object.next \\(',
        'at step \\(',
        'at __awaiter \\(',
        'at Object.exports.assert \\('
    ].join('|'));
    clean_stack = (stack) => {
        const lines = stack
            .split("\n")
            .filter((line) => {
            return !stack_skip_re.test(line);
        })
            .map((line, i) => i == 0 ? line : line.replace(/([^\/]*).*(\/[^\/]+\/[^\/]+\/[^\/]+)/, (_match, s1, s2) => s1 + '...' + s2));
        return lines.join("\n");
    };
}
uniglobal.process && uniglobal.process.on('uncaughtException', function (error) {
    error.stack = clean_stack(error.stack);
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
// type OMap<T> = { [key: string]: T }
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
// is_empty -----------------------------------------------------------------------
export function is_empty(o) {
    return length(o) == 0;
}
function take(list, n) {
    return list.slice(0, n);
}
export { take };
export function last(list, n) {
    if (n === undefined) {
        if (list.length < 1)
            throw new Error(`can't get last elements from empty list`);
        return list[list.length - 1];
    }
    else {
        if (list.length < n)
            throw new Error(`can't get last ${n} elements from list of length ${list.length}`);
        else
            return list.slice(list.length - n, list.length);
    }
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
function find(o, finder) {
    const predicate = finder instanceof Function ? finder : (v) => v == finder;
    if (o instanceof Array)
        for (let i = 0; i < o.length; i++)
            if (predicate(o[i], i))
                return o[i];
            else
                for (const k in o)
                    if (o.hasOwnProperty(k))
                        if (predicate(o[k], k))
                            return o[k];
    return undefined;
}
export { find };
function has(o, finder) { return !!find(o, finder); }
export { has };
function partition(o, splitter) {
    if (o instanceof Array) {
        const selected = new Array(), rejected = new Array();
        const f = splitter instanceof Function ? splitter : (_v, i) => splitter.includes(i);
        each(o, (v, i) => f(v, i) ? selected.push(v) : rejected.push(v));
        return [selected, rejected];
    }
    else {
        const selected = {}, rejected = {};
        const f = splitter instanceof Function ? splitter : (_v, k) => splitter.includes(k);
        each(o, (v, k) => f(v, k) ? selected[k] = v : rejected[k] = v);
        return [selected, rejected];
    }
}
export { partition };
// sort ---------------------------------------------------------------------------
function sort(list, compare_fn) {
    list = [...list];
    list.sort(compare_fn);
    return list;
}
export { sort };
function select(o, f) { return partition(o, f)[0]; }
export { select };
function reject(o, f) { return partition(o, f)[1]; }
export { reject };
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
function values(o) {
    return reduce(o, [], (list, v) => { list.push(v); return list; });
}
export { values };
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
// debounce -----------------------------------------------------------------------
export function debounce(fn, timeout) {
    let timer = undefined;
    return ((...args) => {
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(() => fn(...args), timeout);
    });
}
// seedrandom ---------------------------------------------------------------------
let seedrandom;
{
    let seedrandom_lib = undefined;
    seedrandom = (seed) => {
        // Code for proper random generator is not simple, the library needed
        if (seedrandom_lib === undefined)
            seedrandom_lib = require('seedrandom');
        return seedrandom_lib('' + seed);
    };
}
export { seedrandom };
// CustomError --------------------------------------------------------------------
export class CustomError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
// NeverError ---------------------------------------------------------------------
export class NeverError extends Error {
    constructor(message) { super(`NeverError: ${message}`); }
}
// ensure_error -------------------------------------------------------------------
export function ensure_error(error, default_message = "Unknown error") {
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
// Error.toJSON -------------------------------------------------------------------
// Otherwise JSON will be empty `{}`
Error.prototype.toJSON = function () {
    return { message: this.message, stack: this.stack };
};
// Test ---------------------------------------------------------------------------
export function test(title, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fn();
        }
        catch (e) {
            log('error', title);
            throw e;
        }
    });
}
//# sourceMappingURL=base.js.map