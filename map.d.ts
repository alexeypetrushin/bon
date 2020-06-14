declare type SimpleTypes = number | string | boolean;
export declare class Map<V, K extends SimpleTypes = string> {
    readonly length = 0;
    private readonly _map;
    has(k: K): boolean;
    get(k: K): V | undefined;
    get(k: K, dv: V): V;
    get(k: K, dv: (k: K) => V): V;
    set(k: K, v: V): void;
    delete(k: K): V | undefined;
    each(f: (v: V, k: K) => void): void;
    map<R>(f: (v: V, k: K) => R): Map<R, K>;
    entries(): [K, V][];
    keys(): K[];
    values(): V[];
}
export {};
