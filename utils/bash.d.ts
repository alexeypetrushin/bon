/// <reference types="node" />
import { SpawnOptions } from 'child_process';
export declare function run(cmd: string, args?: string[], options?: SpawnOptions): Promise<{
    out: string;
    stdout: string;
    stderr: string;
}>;
