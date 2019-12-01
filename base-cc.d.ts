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
export declare const inlineTest: InlineTest;
interface HttpCallOptions {
    method?: 'post' | 'get';
    headers?: {
        [key: string]: string | undefined;
    };
    timeout?: number;
}
export declare function httpCall<T>(url: string, body?: unknown, options?: HttpCallOptions): Promise<T>;
export declare function buildUrl(url: string, query?: {
    [key: string]: string | number | undefined | null;
}): string;
export declare function sleep(ms: number): Promise<void>;
export interface Assert {
    (condition: boolean, message?: string | (() => string)): void;
    warn(condition: boolean, message?: string | (() => string)): void;
    equal(a: unknown, b: unknown, message?: string | (() => string)): void;
}
export declare const assert: Assert;
export declare function deepCloneAndSort(obj: something): something;
export declare function stableJsonStringify(obj: unknown): string;
export declare function isEqual(a: unknown, b: unknown): boolean;
export declare function deepMap(obj: something, map: (o: something) => something): something;
declare let md5: (s: string) => string;
export { md5 };
export declare const debugEnabled: boolean;
export declare type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export interface Log {
    (message: string, short?: something, detailed?: something): void;
    (level: LogLevel, message: string, short?: something, detailed?: something): void;
}
export declare function getFormattedTime(time: number, withSeconds?: boolean): string;
export declare let inspect: (o: something) => void;
declare function log(level: LogLevel, message: string, short?: something, detailed?: something): string;
export { log };
export declare function logWithUser(level: LogLevel, user: string, message: string, short?: something, detailed?: something): string;
export declare function timer(): () => number;
export declare let cleanStack: (stack: string) => string;
export declare function once<F extends Function>(f: F): F;
declare type Predicate<V, K> = (value: V, key: K) => boolean;
declare type OMap<T> = {
    [key: string]: T;
};
export declare function length<T>(o: Array<T> | OMap<T> | String | string): number;
export declare function isEmpty<T>(o: Array<T> | OMap<T> | String | string): boolean;
export declare function take<T>(list: Array<T>, n: number): T[];
export declare function last<T>(list: Array<T>): T;
declare function each<T>(list: T[], f: (v: T, i: number) => void): void;
declare function each<M extends {}, K extends keyof M>(map: M, f: (v: M[K], k: K) => void): void;
export { each };
declare function partition<T>(list: Array<T>, f: Predicate<T, number>): [Array<T>, Array<T>];
declare function partition<T>(list: Array<T>, keys: number[]): [Array<T>, Array<T>];
declare function partition<M extends {}, K extends keyof M>(map: M, f: Predicate<M[keyof M], keyof M>): [M, M];
declare function partition<M extends {}, K extends keyof M>(map: M, keys: (keyof M)[]): [Pick<M, K>, Exclude<M, K>];
export { partition };
declare function sort<T>(list: Array<T>, compareFn?: (a: T, b: T) => number): Array<T>;
export { sort };
declare function select<T>(list: Array<T>, f: Predicate<T, number>): Array<T>;
declare function select<T>(list: Array<T>, keys: number[]): Array<T>;
declare function select<M extends {}>(map: M, f: Predicate<M[keyof M], keyof M>): M;
declare function select<M extends {}, K extends keyof M>(map: M, keys: (keyof M)[]): Pick<M, K>;
export { select };
export declare function uniq<T>(list: Array<T>): Array<T>;
declare function remove<T>(list: Array<T>, i: number): T | undefined;
declare function remove<T>(list: Array<T>, f: Predicate<T, number>): Array<T>;
declare function remove<T>(map: OMap<T>, i: string): T | undefined;
declare function remove<T>(map: OMap<T>, f: Predicate<T, string>): OMap<T>;
export { remove };
declare function reduce<A, T>(list: T[], accumulator: A, f: (accumulator: A, v: T, key: number) => A): A;
declare function reduce<A, T>(map: OMap<T>, accumulator: A, f: (accumulator: A, v: T, key: string) => A): A;
export { reduce };
declare function keys<T>(list: Array<T>): number[];
declare function keys<T, O extends OMap<T>>(map: O): (keyof O)[];
export { keys };
declare function map<T, R>(list: T[], f: (v: T, i: number) => R): R[];
declare function map<M extends {}, K extends keyof M, R>(map: M, f: (v: M[K], k: K) => R): {
    [key in K]: R;
};
export { map };
export declare function round(v: number, digits?: number): number;
export declare function shuffle<T>(list: T[], seed?: number | string): T[];
declare let seedrandom: (seed: number | string) => (() => number);
export { seedrandom };
