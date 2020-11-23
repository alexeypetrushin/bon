import { md5, hour, stable_json_stringify } from '../base';
import * as fs from '../fs';
import { MultiMap } from '../multi_map';
// cache_fn ------------------------------------------------------------------------------
// Function should have simple arguments like string, number, boolean
export function cache_fn(fn, to_key) {
    const cache = new MultiMap();
    let no_args_cashe = undefined;
    return ((...args) => {
        if (args.length == 0) {
            if (!no_args_cashe)
                no_args_cashe = fn();
            return no_args_cashe;
        }
        else {
            const key = to_key ? to_key(...args) : args;
            let value = cache.get(key);
            if (!value) {
                // Ensuring args are of simple types, null or undefined are not allowed
                key.map((arg) => {
                    const type = typeof arg;
                    if (type != 'string' && type != 'boolean' && type != 'number')
                        throw new Error(`arguments for function ${fn.name} cached with cache_fn should be of simple types` +
                            ` but it's '${type}'`);
                });
                value = fn(...args);
                cache.set(key, value);
            }
            return value;
        }
    });
}
export function cache_fs(key, fn, options) {
    let value = undefined;
    return ((...args) => {
        if (value === undefined) {
            const expiration = options.expiration || 1 * hour;
            const path = fs.resolve(options.cache_path, 'cache', key + '_' + md5(stable_json_stringify(args)));
            // Reading value from file if exists
            if (fs.exists_sync(path)) {
                const data = JSON.parse(fs.read_file_sync(path, { encoding: 'utf8' }));
                if ((data.timestamp + expiration) > Date.now())
                    value = data.value;
            }
            // If value doesn't exists on fs - calculating and saving
            if (!value) {
                value = fn(...args);
                const data = { value, timestamp: Date.now() };
                // Writing without waiting for success
                fs.write_file(path, JSON.stringify(data));
            }
        }
        return value;
    });
}
//# sourceMappingURL=cache.js.map