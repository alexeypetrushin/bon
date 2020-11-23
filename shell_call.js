var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assert, ensure_error } from "./base";
const json_output_token = "shell_call_json_output:";
export function on_shell_call({ before, process, after }) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = JSON.parse(global.process.argv[2]);
        // Calling before
        let before_output;
        try {
            before_output = { is_error: false, value: yield before(data.before) };
        }
        catch (e) {
            before_output = { is_error: true, error: ensure_error(e).message };
        }
        // Processing
        assert(Array.isArray(data.inputs), "inputs should be an array");
        let results = [];
        if (before_output.is_error) {
            results = data.inputs.map(() => before_output);
        }
        else {
            for (let input of data.inputs) {
                try {
                    let value = yield process(before_output.value, input);
                    results.push({ is_error: false, value });
                }
                catch (e) {
                    results.push({ is_error: true, error: ensure_error(e).message });
                }
            }
        }
        // After
        try {
            yield after(before_output.is_error ? undefined : before_output.value, data.after);
        }
        catch (e) {
            results = data.inputs.map(() => ({ is_error: true, error: ensure_error(e).message }));
        }
        global.process.stdout.write(json_output_token + JSON.stringify(results));
        global.process.exit();
    });
}
//# sourceMappingURL=shell_call.js.map