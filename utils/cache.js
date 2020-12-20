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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("../base");
var fs = require("../fs");
var multi_map_1 = require("../multi_map");
// cache_fn ------------------------------------------------------------------------------
// Function should have simple arguments like string, number, boolean
function cache_fn(fn, to_key) {
    var cache = new multi_map_1.MultiMap();
    var no_args_cashe = undefined;
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length == 0) {
            if (!no_args_cashe)
                no_args_cashe = fn();
            return no_args_cashe;
        }
        else {
            var key = to_key ? to_key.apply(void 0, __spread(args)) : args;
            var value = cache.get(key);
            if (!value) {
                // Ensuring args are of simple types, null or undefined are not allowed
                key.map(function (arg) {
                    var type = typeof arg;
                    if (type != 'string' && type != 'boolean' && type != 'number')
                        throw new Error("arguments for function " + fn.name + " cached with cache_fn should be of simple types" +
                            (" but it's '" + type + "'"));
                });
                value = fn.apply(void 0, __spread(args));
                cache.set(key, value);
            }
            return value;
        }
    });
}
exports.cache_fn = cache_fn;
function cache_fs(key, fn, options) {
    var value = undefined;
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (value === undefined) {
            var expiration = options.expiration || 1 * base_1.hour;
            var path = fs.resolve(options.cache_path, 'cache', key + '_' + base_1.md5(base_1.stable_json_stringify(args)));
            // Reading value from file if exists
            if (fs.exists_sync(path)) {
                var data = JSON.parse(fs.read_file_sync(path, { encoding: 'utf8' }));
                if ((data.timestamp + expiration) > Date.now())
                    value = data.value;
            }
            // If value doesn't exists on fs - calculating and saving
            if (!value) {
                value = fn.apply(void 0, __spread(args));
                var data = { value: value, timestamp: Date.now() };
                // Writing without waiting for success
                fs.write_file(path, JSON.stringify(data));
            }
        }
        return value;
    });
}
exports.cache_fs = cache_fs;
//# sourceMappingURL=cache.js.map