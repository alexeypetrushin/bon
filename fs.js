var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { assert, ensure_error } from './base';
import * as nodefs from 'fs';
import * as nodepath from 'path';
import * as fsextra from 'fs-extra';
import { promisify } from 'util';
import * as os from 'os';
// resolve -------------------------------------------------------------------------------
export function resolve(...paths) { return require('path').resolve(...paths); }
// read_directory ------------------------------------------------------------------------
export function read_directory(path, filter) {
    return __awaiter(this, void 0, void 0, function* () {
        const names = (yield promisify(nodefs.readdir)(path));
        const entries = [];
        for (const name of names)
            entries.push({ type: yield get_type(resolve(path, name)), name });
        return filter ? entries.filter(filter) : entries;
    });
}
function read_file(path, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield promisify(nodefs.readFile)(path, options);
        }
        catch (e) {
            // Because node.js error doesn't have stack trace
            throw new Error(`can't read file '${path}' because of '${ensure_error(e).message}'`);
        }
    });
}
export { read_file };
function read_file_sync(path, options) {
    try {
        return nodefs.readFileSync(path, options);
    }
    catch (e) {
        // Because node.js error doesn't have stack trace
        throw new Error(`can't read file '${path}' because of '${ensure_error(e).message}'`);
    }
}
export { read_file_sync };
// write_file ----------------------------------------------------------------------------
// Creates parent directory automatically
export function write_file(path, data, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Creating parent directory for to if it's not exist.
        // Could be speed up by handling exception instead of checking for existance.
        const directory = nodepath.dirname(path);
        if (!(yield exists(directory)))
            yield make_directory(directory);
        options = Object.assign({}, options);
        options.encoding = options.encoding || 'utf8';
        yield promisify(nodefs.writeFile)(path, data, options);
    });
}
export function write_file_sync(path, data, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Creating parent directory for to if it's not exist.
        // Could be speed up by handling exception instead of checking for existance.
        const directory = nodepath.dirname(path);
        if (!(yield exists(directory)))
            yield make_directory(directory);
        options = Object.assign({}, options);
        options.encoding = options.encoding || 'utf8';
        yield promisify(nodefs.writeFile)(path, data, options);
    });
}
// Creates parent directory automatically
export function append_to_file(path, data, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Creating parent directory for to if it's not exist.
        // Could be speed up by handling exception instead of checking for existance.
        const directory = nodepath.dirname(path);
        if (!(yield exists(directory)))
            yield make_directory(directory);
        options = Object.assign({}, options);
        options.encoding = options.encoding || 'utf8';
        yield promisify(nodefs.appendFile)(path, data, options);
    });
}
export function read_json(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return JSON.parse(yield read_file(path, { encoding: 'utf8' }));
    });
}
export function write_json(path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield write_file(path, JSON.stringify(data), { encoding: 'utf8' });
    });
}
export function rename(from, to, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Checking if to file already exist
        if ((yield exists(to)) && !(options && options.overwrite))
            throw new Error(`file ${to} already exists`);
        // Creating parent directory for to if it's not exist
        const to_parent_directory = nodepath.dirname(to);
        if (!(yield exists(to_parent_directory)))
            yield make_directory(to_parent_directory);
        yield promisify(nodefs.rename)(from, to);
    });
}
// Creates parent directory automatically
export function copy_file(from, to) {
    return __awaiter(this, void 0, void 0, function* () {
        // Creating parent directory for to if it's not exist.
        // Could be speed up by handling exception instead of checking for existance.
        const directory = nodepath.dirname(to);
        if (!(yield exists(directory)))
            yield make_directory(directory);
        yield promisify(nodefs.copyFile)(from, to);
    });
}
// Creates parent directory automatically
export function copy_directory(from, to) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = yield read_directory(from);
        for (const { type, name } of entries) {
            if (type == 'file')
                yield copy_file(resolve(from, name), resolve(to, name));
            else if (type == 'directory')
                yield copy_directory(resolve(from, name), resolve(to, name));
            else
                throw new Error(`unsupported entry type '${type}'`);
        }
    });
}
// Creates parent directory automatically
export function make_directory(path) {
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
export function exists_sync(path) {
    try {
        nodefs.statSync(path);
        return true;
    }
    catch (e) {
        return false;
    }
}
export function delete_file(path) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check for existance is optional, probably could be removed
        if (!(yield exists(path)))
            return;
        yield promisify(nodefs.unlink)(path);
    });
}
export function delete_directory(path, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Reqursive flag requiret for safety.
        if (!(yield exists(path)))
            return;
        try {
            yield promisify(options && options.recursive ? fsextra.remove : nodefs.rmdir)(path);
        }
        catch (e) {
            // Because node fs errors doesn't have stack trace information
            // https://stackoverflow.com/questions/61155350/why-theres-no-stack-trace-in-node-fs-rmdir-error
            throw new Error(`can't delete directory '${path}' because of '${ensure_error(e).message}'`);
        }
    });
}
export function is_tmp_directory(path) {
    return /tmp|temp/i.test(path.toLowerCase());
}
export const not_tmp_directory_message = `temp directory expected to have 'tmp' or 'temp' term in its path`;
export function delete_tmp_directory(path) {
    return __awaiter(this, void 0, void 0, function* () {
        // `t` in path required for safety so you don't accidentally delete non temp directory.
        assert(is_tmp_directory(path), not_tmp_directory_message);
        delete_directory(path, { recursive: true });
    });
}
export function create_tmp_directory(prefix) {
    // return promisify(nodefs.mkdtemp)(nodepath.join(os.tmpdir(), prefix))
    return nodepath.join(os.tmpdir(), prefix);
}
export function get_type(path) {
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
//# sourceMappingURL=fs.js.map