export declare type something = any;
declare let uniglobal: something;
export { uniglobal };
export declare const kb = 1024, mb: number;
export declare const sec = 1000, min: number, hour: number, day: number;
export declare const million = 1000000, billion: number;
export declare const environment: 'development' | 'production' | 'test';
export declare function pretty_print(v: something, colors?: boolean): any;
export declare function p(...args: something): void;
export interface InlineTest {
    (fn: () => void): void;
    (name: string, fn: (() => void)): void;
    focus: {
        (fn: () => void): void;
        (name: string, fn: (() => void)): void;
    };
    run(): void;
}
export declare const inline_test: InlineTest;
export interface TextDoc {
    readonly tags?: string[];
    readonly title: string;
    readonly text: string;
}
export interface TodoDoc {
    readonly priority?: 'low' | 'normal' | 'high';
    readonly tags?: string[];
    readonly todo: string;
}
export declare type Doc = TextDoc | TodoDoc;
export declare const all_docs: Doc[];
export declare function doc(...docs: (Doc | (() => Doc))[]): void;
export declare function as_code(code: string): string;
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
export declare function is_number(n: number | undefined | null): n is number;
export interface Assert {
    (condition: boolean, message?: string | (() => string)): void;
    warn(condition: boolean, message?: string | (() => string)): void;
    equal(a: unknown, b: unknown, message?: string | (() => string)): void;
    approx_equal(a: number, b: number, message?: string | (() => string), delta_relative?: number): void;
}
export declare const assert: Assert;
export declare function deep_clone_and_sort(obj: something): something;
export declare function stable_json_stringify(obj: unknown, pretty?: boolean): string;
export declare function is_equal(a: unknown, b: unknown): boolean;
export declare function deep_map(obj: something, map: (o: something) => something): something;
declare let md5: (s: string) => string;
export { md5 };
export declare const debug_enabled: boolean;
export declare type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export declare function get_formatted_time(time: number, withSeconds?: boolean): string;
export declare let inspect: (o: something) => string;
declare function log(message: string, short?: something, detailed?: something): string;
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
export declare function first<T>(list: Array<T>): T;
export declare function first<T>(list: Array<T>, n: number): T[];
export declare function reverse<T>(list: T[]): T[];
declare function each<T>(list: T[], f: (v: T, i: number) => void): void;
declare function each<K, V>(map: Map<K, V>, f: (v: V, k: K) => void): void;
declare function each<M extends {}, K extends keyof M>(map: M, f: (v: M[K], k: K) => void): void;
export { each };
declare function find<T>(list: T[], v: T): T | undefined;
declare function find<T>(list: T[], f: (v: T, i: number) => boolean): T | undefined;
declare function find<T>(map: {
    [key: string]: T;
}, f: (v: T, k: string) => boolean): T | undefined;
export { find };
declare function find_index<T>(list: T[], v: T): number | undefined;
declare function find_index<T>(list: T[], f: (v: T, i: number) => boolean): number | undefined;
export { find_index };
declare function find_last_index<T>(list: T[], v: T): number | undefined;
declare function find_last_index<T>(list: T[], f: (v: T, i: number) => boolean): number | undefined;
export { find_last_index };
declare function group_by<V>(list: V[], f: (v: V, i: number) => number): Map<number, V[]>;
declare function group_by<V>(list: V[], f: (v: V, i: number) => string): Map<string, V[]>;
export { group_by };
declare function entries<K, V>(map: Map<K, V>): [K, V][];
declare function entries<V>(map: {
    [key: string]: V;
}): [string, V][];
export { entries };
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
declare function sort(list: string[], comparator?: (a: string, b: string) => number): string[];
declare function sort(list: number[], comparator?: (a: number, b: number) => number): number[];
export { sort };
declare function sort_by<V>(list: V[], by: (v: V) => string): V[];
declare function sort_by<V>(list: V[], by: (v: V) => number): V[];
export { sort_by };
declare function filter_map<V, S>(list: V[], f: (v: V, i: number) => S | false): S[];
declare function filter_map<V, S>(map: Map<number, V>, f: (v: V, k: number) => S | false): Map<number, S>;
declare function filter_map<V, S>(map: Map<string, V>, f: (v: V, k: string) => S | false): Map<string, S>;
declare function filter_map<V, S>(map: {
    [key: string]: V;
}, f: (v: V, k: string) => S | false): {
    [key: string]: S;
};
export { filter_map };
export declare function fill<V>(size: number, v: V | ((i: number) => V)): V[];
export declare function skip_undefined<V>(list: (V | undefined)[]): V[];
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
export declare function unique<V, Key>(list: Array<V>, to_key?: (v: V) => Key): Array<V>;
declare function reduce<A, V>(list: V[], accumulator: A, f: (accumulator: A, v: V, key: number) => A): A;
declare function reduce<A, V, K>(map: Map<K, V>, accumulator: A, f: (accumulator: A, v: V, key: number) => A): A;
declare function reduce<A, V>(map: {
    [key: string]: V;
}, accumulator: A, f: (accumulator: A, v: V, key: string) => A): A;
export { reduce };
declare function keys<V>(list: Array<V>): number[];
declare function keys<V, K>(map: Map<K, V>): K[];
declare function keys<T, O extends {
    [key: string]: T;
}>(map: O): (keyof O & string)[];
export { keys };
declare function values<T>(list: Array<T>): T[];
declare function values<T>(map: {
    [key: string]: T;
}): T[];
export { values };
export declare function sum(list: number[]): number;
declare function map<V, R>(list: V[], f: (v: V, i: number) => R): R[];
declare function map<K, V, R>(map: Map<K, V>, f: (v: V, k: K) => R): Map<K, R>;
declare function map<M extends {}, K extends keyof M, R>(map: M, f: (v: M[K], k: K) => R): {
    [key in K]: R;
};
export { map };
export declare function round(v: number, digits?: number): number;
export declare function shuffle<T>(list: T[], seed?: number | string): T[];
export declare function debounce<F extends ((...args: something[]) => void)>(fn: F, timeout: number): F;
declare let seedrandom: (seed: number | string) => (() => number);
export { seedrandom };
export declare class CustomError extends Error {
    constructor(message: string);
}
export declare class NeverError extends Error {
    constructor(message: never);
}
export declare function ensure_error(error: something, default_message?: string): Error;
export declare function test(title: string, fn: () => Promise<void> | void): Promise<void>;
