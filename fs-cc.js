var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assert } from './base-cc';
import * as nodefs from 'fs';
import * as nodepath from 'path';
import * as fsextra from 'fs-extra';
import { promisify } from 'util';
export function resolve(...paths) { return require('path').resolve(...paths); }
export function readDirectory(path, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const list = (yield promisify(nodefs.readdir)(path)).map((name) => resolve(path, name));
        if (!type)
            return list;
        const filtered = [];
        for (const path of list)
            if ((yield getType(path)) == type)
                filtered.push(path);
        return filtered;
    });
}
function readFile(path, options) {
    return promisify(nodefs.readFile)(path, options);
}
export { readFile };
// Creates parent directory automatically
export function writeFile(path, data, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Creating parent directory for to if it's not exist.
        // Could be speed up by handling exception instead of checking for existance.
        const directory = nodepath.dirname(path);
        if (!(yield exists(directory)))
            yield makeDirectory(directory);
        options = Object.assign({}, options);
        options.encoding = options.encoding || 'utf8';
        yield promisify(nodefs.writeFile)(path, data, options);
    });
}
export function rename(from, to, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Checking if to file already exist
        if ((yield exists(to)) && !(options && options.overwrite))
            throw new Error(`file ${to} already exists`);
        // Creating parent directory for to if it's not exist
        const toParentDirectory = nodepath.dirname(to);
        if (!(yield exists(toParentDirectory)))
            yield makeDirectory(toParentDirectory);
        yield promisify(nodefs.rename)(from, to);
    });
}
// Creates parent directory automatically
export function makeDirectory(path) {
    return __awaiter(this, void 0, void 0, function* () {
        // Could be speed up by handling exception instead of checking for existance.
        if ((yield exists(path)))
            return;
        yield promisify(fsextra.ensureDir)(path);
    });
}
export function exists(path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promisify(nodefs.stat)(path);
            return true;
        }
        catch (e) {
            return false;
        }
    });
}
export function deleteFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check for existance is optional, probably could be removed
        if (!(yield exists(path)))
            return;
        yield promisify(nodefs.unlink)(path);
    });
}
export function deleteDirectory(path, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Reqursive flag requiret for safety.
        if (!(yield exists(path)))
            return;
        yield promisify(options && options.recursive ? fsextra.remove : nodefs.rmdir)(path);
    });
}
export function deleteTmpDirectory(path) {
    return __awaiter(this, void 0, void 0, function* () {
        // `tmp` in path required for safety so you don't accidentally delete non temp directory.
        assert(/tmp|temp/i.test(path), `temp directory expected to have tmp or temp term in its path`);
        deleteDirectory(path, { recursive: true });
    });
}
export function getType(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const stat = yield promisify(nodefs.lstat)(path);
        if (stat.isFile())
            return 'file';
        else if (stat.isDirectory())
            return 'directory';
        else if (stat.isSymbolicLink())
            return 'link';
        else
            throw new Error(`unknown fs entry type for '${path}'`);
    });
}
//# sourceMappingURL=fs-cc.js.map