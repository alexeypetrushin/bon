import { something } from '../base';
export declare function cache_fn<Fn extends (...args: something) => something>(fn: Fn, to_key?: ((...args: Parameters<Fn>) => (number | boolean | string)[])): Fn;
export declare function cache_fs<Fn extends Function>(key: string, fn: Fn, options: {
    cache_path: string;
    expiration?: number;
}): any;
