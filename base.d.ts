export declare type something = any;
declare let uniglobal: something;
export { uniglobal };
export declare const kb = 1024, mb: number;
export declare const sec = 1000, min: number, hour: number, day: number;
export declare const environment: 'development' | 'production' | 'test';
export declare function p(...args: something): void;
export interface InlineTest {
    (fn: () => void): void;
    run(): void;
}
export declare const inline_test: InlineTest;
interface HttpCallOptions {
    method?: 'post' | 'get';
    headers?: {
        [key: string]: string | undefined;
    };
    timeout?: number;
}
export declare function http_call<T>(url: string, body?: unknown, options?: HttpCallOptions): Promise<T>;
export declare function build_url(url: string, query?: {
    [key: string]: string | number | undefined | null;
}): string;
export declare function sleep(ms: number): Promise<void>;
export interface Assert {
    (condition: boolean, message?: string | (() => string)): void;
    warn(condition: boolean, message?: string | (() => string)): void;
    equal(a: unknown, b: unknown, message?: string | (() => string)): void;
}
export declare const assert: Assert;
export declare function deep_clone_and_sort(obj: something): something;
export declare function stable_json_stringify(obj: unknown): string;
export declare function is_equal(a: unknown, b: unknown): boolean;
export declare function deep_map(obj: something, map: (o: something) => something): something;
declare let md5: (s: string) => string;
export { md5 };
export declare const debug_enabled: boolean;
export declare type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export interface Log {
    (message: string, short?: something, detailed?: something): void;
    (level: LogLevel, message: string, short?: something, detailed?: something): void;
}
export declare function get_formatted_time(time: number, withSeconds?: boolean): string;
export declare let inspect: (o: something) => void;
declare function log(level: LogLevel, message: string, short?: something, detailed?: something): string;
export { log };
export declare function timer(): () => number;
export declare let clean_stack: (stack: string) => string;
export declare function once<F extends Function>(f: F): F;
declare type Predicate<V, K> = (value: V, key: K) => boolean;
export declare function length<T>(o: Array<T> | {
    [key: string]: T;
} | String | string): number;
export declare function is_empty<T>(o: Array<T> | {
    [key: string]: T;
} | String | string): boolean;
declare function take<T>(s: string, n: number): string;
declare function take<T>(list: Array<T>, n: number): Array<T>;
export { take };
export declare function last<T>(list: Array<T>): T;
export declare function last<T>(list: Array<T>, n: number): T[];
declare function each<T>(list: T[], f: (v: T, i: number) => void): void;
declare function each<M extends {}, K extends keyof M>(map: M, f: (v: M[K], k: K) => void): void;
export { each };
declare function find<T>(list: T[], v: T): T | undefined;
declare function find<T>(list: T[], f: (v: T, i: number) => boolean): T | undefined;
declare function find<T>(map: {
    [key: string]: T;
}, f: (v: T, k: string) => boolean): T | undefined;
export { find };
declare function has<T>(list: T[], v: T): boolean;
declare function has<T>(list: T[], f: (v: T, i: number) => boolean): boolean;
declare function has<T>(map: {
    [key: string]: T;
}, f: (v: T, k: string) => boolean): boolean;
export { has };
declare function partition<T>(list: Array<T>, f: Predicate<T, number>): [Array<T>, Array<T>];
declare function partition<T>(list: Array<T>, keys: number[]): [Array<T>, Array<T>];
declare function partition<M extends {}, K extends keyof M>(map: M, f: Predicate<M[keyof M], keyof M>): [M, M];
declare function partition<M extends {}, K extends keyof M>(map: M, keys: (keyof M)[]): [Pick<M, K>, Exclude<M, K>];
export { partition };
declare function sort<T>(list: Array<T>, compare_fn?: (a: T, b: T) => number): Array<T>;
export { sort };
declare function select<T>(list: Array<T>, f: Predicate<T, number>): Array<T>;
declare function select<T>(list: Array<T>, keys: number[]): Array<T>;
declare function select<T>(map: {
    [key: string]: T;
}, f: Predicate<T, string>): {
    [key: string]: T;
};
declare function select<T>(map: {
    [key: string]: T;
}, keys: string[]): {
    [key: string]: T;
};
export { select };
declare function reject<T>(list: Array<T>, f: Predicate<T, number>): Array<T>;
declare function reject<T>(list: Array<T>, keys: number[]): Array<T>;
declare function reject<T>(map: {
    [key: string]: T;
}, f: Predicate<T, string>): {
    [key: string]: T;
};
declare function reject<T>(map: {
    [key: string]: T;
}, keys: string[]): {
    [key: string]: T;
};
export { reject };
export declare function uniq<T>(list: Array<T>): Array<T>;
declare function remove<T>(list: Array<T>, i: number): T | undefined;
declare function remove<T>(list: Array<T>, f: Predicate<T, number>): Array<T>;
declare function remove<T>(map: {
    [key: string]: T;
}, i: string): T | undefined;
declare function remove<T>(map: {
    [key: string]: T;
}, f: Predicate<T, string>): {
    [key: string]: T;
};
export { remove };
declare function reduce<A, T>(list: T[], accumulator: A, f: (accumulator: A, v: T, key: number) => A): A;
declare function reduce<A, T>(map: {
    [key: string]: T;
}, accumulator: A, f: (accumulator: A, v: T, key: string) => A): A;
export { reduce };
declare function keys<T>(list: Array<T>): number[];
declare function keys<T, O extends {
    [key: string]: T;
}>(map: O): (keyof O & string)[];
export { keys };
declare function values<T>(list: Array<T>): T[];
declare function values<T>(map: {
    [key: string]: T;
}): T[];
export { values };
declare function map<T, R>(list: T[], f: (v: T, i: number) => R): R[];
declare function map<M extends {}, K extends keyof M, R>(map: M, f: (v: M[K], k: K) => R): {
    [key in K]: R;
};
export { map };
export declare function round(v: number, digits?: number): number;
export declare function shuffle<T>(list: T[], seed?: number | string): T[];
declare let seedrandom: (seed: number | string) => (() => number);
export { seedrandom };
export declare class CustomError extends Error {
    constructor(message: string);
}
