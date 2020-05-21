export declare function median(values: number[], is_sorted?: boolean): number;
export declare function mean(values: number[]): number;
export declare function quantile(values: number[], q: number, is_sorted?: boolean): number;
export declare function min_max_norm(values: number[], min: number, max: number): number[];
export declare function map_with_rank<V, R>(list: V[], order_by: (v: V) => number, map: (v: V, rank: number) => R): R[];
