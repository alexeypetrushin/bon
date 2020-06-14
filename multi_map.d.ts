declare type SimpleTypes = number | string | boolean;
export declare class MultiMap<V, K extends SimpleTypes[] = string[]> {
    readonly length = 0;
    protected readonly _map: Map<string | number | boolean, V>;
    set(keys: K, value: V): void;
    has(keys: K): boolean;
    get(keys: K): unknown;
    delete(keys: K): V | undefined;
}
export {};
