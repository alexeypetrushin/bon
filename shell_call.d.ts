import { something } from "./base";
export declare function shell_call<BeforeOutput>({ before, process, after }: {
    before: (before_input: something) => Promise<BeforeOutput>;
    process: (before_oputput: BeforeOutput, input: something) => Promise<something>;
    after: (before_oputput: BeforeOutput | undefined, after_input: something) => Promise<void>;
}): Promise<void>;
