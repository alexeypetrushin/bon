export declare class PersistentVariable<T extends {}> {
    protected readonly fname: string;
    protected readonly defaultValue: T;
    constructor(fname: string, defaultValue: T);
    read(): Promise<T>;
    delete(): Promise<void>;
    write(value: T): Promise<void>;
}
