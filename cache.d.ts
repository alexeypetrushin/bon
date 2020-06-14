declare type SimpleTypes = number | string | boolean;
export declare function cache_fn<T>(fn: () => T): () => T;
export declare function cache_fn<A1, T>(fn: (a1: A1) => T): (a1: A1) => T;
export declare function cache_fn<A1 extends SimpleTypes, A2 extends SimpleTypes, T>(fn: (a1: A1, a2: A2) => T): (a1: A1, a2: A2) => T;
export {};
