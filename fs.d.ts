/// <reference types="node" />
import { something } from './base';
export declare type EntryType = 'directory' | 'file' | 'link';
export declare type Entry = {
    type: EntryType;
    name: string;
};
export declare function resolve(...paths: string[]): string;
export declare function read_directory(path: string): Promise<Entry[]>;
declare function read_file(path: string): Promise<Buffer>;
declare function read_file(path: string, options: {
    encoding: BufferEncoding;
}): Promise<string>;
export { read_file };
export declare function write_file(path: string, data: something, options?: {
    encoding?: BufferEncoding;
    flag?: string;
}): Promise<void>;
export declare function append_to_file(path: string, data: something, options?: {
    encoding?: BufferEncoding;
    mode?: number;
}): Promise<void>;
export declare function read_json<T = something>(path: string): Promise<T>;
export declare function write_json<T>(path: string, data: T): Promise<void>;
export declare function rename(from: string, to: string, options?: {
    overwrite: boolean;
}): Promise<void>;
export declare function copy_file(from: string, to: something): Promise<void>;
export declare function copy_directory(from: string, to: something): Promise<void>;
export declare function make_directory(path: string): Promise<void>;
export declare function exists(path: string): Promise<boolean>;
export declare function delete_file(path: string): Promise<void>;
export declare function delete_directory(path: string, options?: {
    recursive?: boolean;
}): Promise<void>;
export declare function is_tmp_directory(path: string): boolean;
export declare const not_tmp_directory_message = "temp directory expected to have 'tmp' or 'temp' term in its path";
export declare function delete_tmp_directory(path: string): Promise<void>;
export declare function create_tmp_directory(prefix: string): string;
export declare function get_type(path: string): Promise<EntryType>;
