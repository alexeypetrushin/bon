declare type SimpleTypes = number | string;
export declare class Hash<V, K extends SimpleTypes = string> {
    readonly length = 0;
    private readonly _map;
    constructor();
    constructor(map: {
        [key in K]: V;
    });
    constructor(list: [K, V][]);
    constructor(list: V[], to_k: (v: V) => K);
    has(k: K): boolean;
    get(k: K): V | undefined;
    get(k: K, dv: V): V;
    get(k: K, dv: (k: K) => V): V;
    ensure_get(k: K): V;
    set(k: K, v: V): void;
    delete(k: K): V | undefined;
    each(f: (v: V, k: K) => void): void;
    map<R>(f: (v: V, k: K) => R): Hash<R, K>;
    entries(): [K, V][];
    keys(): K[];
    values(): V[];
    toJSON(): any;
}
export {};
