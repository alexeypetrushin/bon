export declare function cache_fn<Fn extends Function>(fn: Fn): Fn;
export declare function cache_fs<Fn extends Function>(key: string, fn: Fn, options: {
    cache_path: string;
    expiration?: number;
}): any;
