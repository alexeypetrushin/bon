export declare class PersistentVariable<T extends {}> {
    protected readonly fname: string;
    protected readonly default_value: () => T;
    constructor(fname: string, default_value: () => T);
    read(): Promise<T>;
    delete(): Promise<void>;
    write(value: T): Promise<void>;
}
