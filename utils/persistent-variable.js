var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from '../fs-cc';
export class PersistentVariable {
    constructor(fname, defaultValue) {
        this.fname = fname;
        this.defaultValue = defaultValue;
    }
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const json = yield fs.readFile(this.fname, { encoding: 'utf8' });
                return JSON.parse(json);
            }
            catch (e) {
                return this.defaultValue;
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () { yield fs.deleteFile(this.fname); });
    }
    write(value) {
        return __awaiter(this, void 0, void 0, function* () { yield fs.writeFile(this.fname, JSON.stringify(value, null, 2)); });
    }
}
//# sourceMappingURL=persistent-variable.js.map