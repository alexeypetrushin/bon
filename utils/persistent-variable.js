var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from '../fs';
import { stable_json_stringify } from '../base';
export class PersistentVariable {
    constructor(fname, default_value) {
        this.fname = fname;
        this.default_value = default_value;
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const json = yield fs.read_file(this.fname, { encoding: 'utf8' });
                return JSON.parse(json);
            }
            catch (e) {
                // A new default value should be created every time, because
                // otherwise equality would fail `changed_value == await variable.read()`
                return this.default_value();
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () { yield fs.delete_file(this.fname); });
    }
    write(value) {
        return __awaiter(this, void 0, void 0, function* () { yield fs.write_file(this.fname, stable_json_stringify(value, true)); });
    }
}
//# sourceMappingURL=persistent-variable.js.map