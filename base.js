var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export * from './map';
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
export const million = 1000000, billion = 1000 * million;
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
export function pretty_print(v, colors = false) {
    v = deep_map(v, map_to_json_if_defined);
    return typeof v == 'object' ? util_inspect(v, { breakLength: 80, colors }) : v;
}
export function p(...args) {
    if (has_windows)
        console.log(...args);
    else {
        const formatted = args.map((v) => pretty_print(v, true));
        // It won't printed properly for multiple arguments
        args.length == 1 ? console.log(...formatted) : console.log(...args);
    }
}
const fetch = uniglobal.fetch || require('node-fetch');
const focused_tests = [];
const tests = [];
export const test = function (...args) {
    const [name, fn] = args.length == 1 ? [undefined, args[0]] : args;
    tests.push([name, fn]);
};
test.focus = function (...args) {
    const [name, fn] = args.length == 1 ? [undefined, args[0]] : args;
    focused_tests.push([name, fn]);
};
test.run = () => __awaiter(void 0, void 0, void 0, function* () {
    const list = focused_tests.length > 0 ? focused_tests : tests;
    for (const [name, test] of list) {
        try {
            yield test();
        }
        catch (e) {
            log('error', `test failed ${name ? ` '${name}'` : ''}`, e);
            uniglobal.process && uniglobal.process.exit();
        }
    }
    log('info', 'tests passed');
});
export const run_tests = (uniglobal.process && uniglobal.process.env && uniglobal.process.env.test) == 'true';
if (run_tests)
    uniglobal.setTimeout(test.run, 0);
export const all_docs = [];
export function doc(...docs) {
    all_docs.push(...(docs.map((d) => typeof d === 'function' ? d() : d)));
}
export function as_code(code) { return "\`\`\`\n" + code + "\n\`\`\`"; }
export function http_call(url, body = {}, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        function call_without_timeout() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    // const copied_options1 = { ...{ method: 'post' }, ...options }
                    // delete copied_options.timeout
                    const fetch = uniglobal.fetch || require('node-fetch');
                    if (!fetch)
                        throw new Error('global.fetch not defined');
                    const url_with_params = options.params ? build_url(url, options.params) : url;
                    const method = options.method ? options.method : 'post';
                    const result = yield fetch(url_with_params, {
                        method,
                        headers: options.headers ? options.headers : { 'Content-Type': 'application/json' },
                        body: method != 'get' ? JSON.stringify(body) : undefined
                    });
                    if (!result.ok)
                        throw new Error(`can't ${method} ${url} ${result.status} ${result.statusText}`);
                    return yield result.json();
                }
                catch (e) {
                    throw e;
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
// is_number -----------------------------------------------------------------------------
export function is_number(n) {
    // isNumber is broken, it returns true for NaN
    return typeof n == 'number' ? Number.isFinite(n) : false;
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
assert.approx_equal = (a, b, message, delta_relative) => {
    delta_relative = delta_relative || 0.001;
    const average = (Math.abs(a) + Math.abs(b)) / 2;
    const delta_absolute = average * delta_relative;
    if (Math.abs(a - b) > delta_absolute) {
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
export function stable_json_stringify(obj, pretty = true) {
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
test(() => {
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
export function first(list, n) {
    if (n === undefined) {
        if (list.length < 1)
            throw new Error(`can't get first elements from empty list`);
        return list[0];
    }
    else {
        if (list.length < n)
            throw new Error(`can't get first ${n} elements from list of length ${list.length}`);
        else
            return list.slice(0, n);
    }
}
// reverse -------------------------------------------------------------------------------
export function reverse(list) {
    list = [...list];
    list.reverse();
    return list;
}
function each(o, f) {
    if (o instanceof Array)
        for (let i = 0; i < o.length; i++)
            f(o[i], i);
    else if (o instanceof Map)
        for (const [k, v] of o)
            f(v, k);
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
function ensure_find(o, finder, on_error) {
    const found = find(o, finder);
    if (found === undefined)
        throw new Error(on_error ? (typeof on_error == 'function' ? on_error() : on_error) : `element not found!`);
    return found;
}
export { ensure_find };
function find_index(list, finder) {
    const predicate = finder instanceof Function ? finder : (v) => v == finder;
    for (let i = 0; i < list.length; i++)
        if (predicate(list[i], i))
            return i;
    return undefined;
}
export { find_index };
function find_last_index(list, finder) {
    const predicate = finder instanceof Function ? finder : (v) => v == finder;
    for (let i = list.length - 1; i >= 0; i--)
        if (predicate(list[i], i))
            return i;
    return undefined;
}
export { find_last_index };
function group_by(list, f) {
    return reduce(list, new Map(), (acc, v, i) => {
        const key = f(v, i);
        let group = acc.get(key);
        if (!group) {
            group = [];
            acc.set(key, group);
        }
        group.push(v);
        return acc;
    });
}
export { group_by };
// group_by_n --------------------------------------------------------------------------------------
export function group_by_n(list, n) {
    const result = [];
    let i = 0;
    while (true) {
        const group = [];
        if (i < list.length)
            result.push(group);
        for (let j = 0; j < n; j++) {
            if ((i + j) < list.length)
                group.push(list[i + j]);
            else
                return result;
        }
        i += n;
    }
}
test("group_by_n", () => {
    assert.equal(group_by_n([1, 2, 3], 2), [[1, 2], [3]]);
    assert.equal(group_by_n([1, 2], 2), [[1, 2]]);
    assert.equal(group_by_n([1], 2), [[1]]);
    assert.equal(group_by_n([], 2), []);
});
// execute_async -----------------------------------------------------------------------------------
export function execute_async(tasks, process, workers_count) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = {};
        let i = 0;
        function worker() {
            return __awaiter(this, void 0, void 0, function* () {
                while (i < tasks.length) {
                    const task_i = i++;
                    const task = tasks[task_i];
                    results[task_i] = yield process(task);
                }
            });
        }
        const promises = [];
        for (let i = 0; i < workers_count; i++)
            promises.push(worker());
        for (const promise of promises)
            yield promise;
        return map(tasks, (_v, i) => results[i]);
    });
}
function entries(map) {
    return map instanceof Map ? Array.from(map) : Object.entries(map);
}
export { entries };
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
function sort(list, comparator) {
    if (list.length == 0)
        return list;
    else {
        if (comparator) {
            list = [...list];
            list.sort(comparator);
            return list;
        }
        else {
            if (typeof list[0] == 'number')
                comparator = function (a, b) { return a - b; };
            else if (typeof list[0] == 'string')
                comparator = function (a, b) { return a.localeCompare(b); };
            else
                throw new Error(`the 'comparator' required to sort a list of non numbers or strings`);
            list = [...list];
            list.sort(comparator);
            return list;
        }
    }
}
export { sort };
function sort_by(list, by) {
    if (list.length == 0)
        return list;
    else {
        let comparator;
        if (typeof by(list[0]) == 'number')
            comparator = function (a, b) { return by(a) - by(b); };
        else if (typeof by(list[0]) == 'string')
            comparator = function (a, b) { return by(a).localeCompare(by(b)); };
        else
            throw new Error(`invalid return type for 'by'`);
        list = [...list];
        list.sort(comparator);
        return list;
    }
}
export { sort_by };
function filter_map(o, f) {
    if (o instanceof Array) {
        const filtered = [];
        each(o, (v, k) => {
            const r = f(v, k);
            if (r !== false)
                filtered.push(r);
        });
        return filtered;
    }
    else if (o instanceof Map) {
        const filtered = new Map();
        each(o, (v, k) => {
            const r = f(v, k);
            if (r !== false)
                filtered.set(k, r);
        });
        return filtered;
    }
    else {
        const filtered = {};
        each(o, (v, k) => {
            const r = f(v, k);
            if (r !== false)
                filtered[k] = r;
        });
        return filtered;
    }
}
export { filter_map };
// fill ---------------------------------------------------------------------------------
export function fill(size, v) {
    const f = typeof v == 'function' ? v : () => v;
    const list = [];
    for (let i = 0; i < size; i++)
        list.push(f(i));
    return list;
}
// fill ---------------------------------------------------------------------------------
export function skip_undefined(list) {
    return filter_map(list, (v) => v !== undefined ? v : false);
}
function reject(o, f) { return partition(o, f)[1]; }
export { reject };
// uniq ---------------------------------------------------------------------------
export function unique(list, to_key) {
    const set = new Set();
    const _to_key = to_key || ((v) => v);
    return list.filter((v) => {
        const key = _to_key(v);
        if (set.has(key))
            return false;
        else {
            set.add(key);
            return true;
        }
    });
}
function pick(o, keys) {
    return partition(o, (_v, i) => keys.includes(i))[0];
}
export { pick };
test(() => {
    assert.equal(pick({ a: 1, b: 2 }, ['a']), { a: 1 });
});
// ensure --------------------------------------------------------------------------------
export function ensure(value, info) {
    if ((typeof value == 'object') && ('found' in value)) {
        if (!value.found)
            throw new Error(value.message || `value${info ? ' ' + info : ''} not found`);
        else
            return value.value;
    }
    else {
        if (value === undefined)
            throw new Error(`value${info ? ' ' + info : ''} not defined`);
        else
            return value;
    }
}
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
// flatten -------------------------------------------------------------------------------
export function flatten(list) {
    return reduce(list, [], (acc, v) => { acc.push(...v); return acc; });
}
// sum -----------------------------------------------------------------------------------
export function sum(list) {
    return reduce(list, 0, (sum, v) => sum + v);
}
function map(o, f) {
    if (o instanceof Array) {
        return o.map(f);
    }
    else if (o instanceof Map) {
        const mapped = new Map();
        each(o, (v, k) => mapped.set(k, f(v, k)));
        return mapped;
    }
    else {
        const mapped = {};
        each(o, (v, k) => mapped[k] = f(v, k));
        return mapped;
    }
}
export { map };
// round --------------------------------------------------------------------------
export function round(v, digits = 0) {
    return digits == 0 ?
        Math.round(v) :
        Math.round((v + Number.EPSILON) * Math.pow(10, digits)) / Math.pow(10, digits);
}
test(() => {
    assert.equal(round(0.05860103881518906, 2), 0.06);
});
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
;
Error.prototype.toJSON = function () {
    return { message: this.message, stack: this.stack };
};
Map.prototype.toJSON = function () {
    return reduce(this, {}, (map, v, k) => { map[k] = v; return map; });
};
//# sourceMappingURL=base.js.map