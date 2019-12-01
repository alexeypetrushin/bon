/// <reference types="node" />
import { something } from './base-cc';
export declare type EntryType = 'directory' | 'file' | 'link';
export declare function resolve(...paths: string[]): string;
export declare function readDirectory(path: string, type?: EntryType): Promise<string[]>;
declare function readFile(path: string): Promise<Buffer>;
declare function readFile(path: string, options: {
    encoding: BufferEncoding;
}): Promise<string>;
export { readFile };
export declare function writeFile(path: string, data: something, options?: {
    encoding?: BufferEncoding;
    flag?: string;
}): Promise<void>;
export declare function rename(from: string, to: string, options?: {
    overwrite: boolean;
}): Promise<void>;
export declare function makeDirectory(path: string): Promise<void>;
export declare function exists(path: string): Promise<boolean>;
export declare function deleteFile(path: string): Promise<void>;
export declare function deleteDirectory(path: string, options?: {
    recursive?: boolean;
}): Promise<void>;
export declare function deleteTmpDirectory(path: string): Promise<void>;
export declare function getType(path: string): Promise<EntryType>;
