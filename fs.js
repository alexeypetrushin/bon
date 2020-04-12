"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var nodefs = require("fs");
var nodepath = require("path");
var fsextra = require("fs-extra");
var util_1 = require("util");
var os = require("os");
function resolve() {
    var _a;
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    return (_a = require('path')).resolve.apply(_a, paths);
}
exports.resolve = resolve;
function read_directory(path, type) {
    return __awaiter(this, void 0, void 0, function () {
        var list, filtered, _i, list_1, path_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, util_1.promisify(nodefs.readdir)(path)];
                case 1:
                    list = (_a.sent()).map(function (name) { return resolve(path, name); });
                    if (!type)
                        return [2 /*return*/, list];
                    filtered = [];
                    _i = 0, list_1 = list;
                    _a.label = 2;
                case 2:
                    if (!(_i < list_1.length)) return [3 /*break*/, 5];
                    path_1 = list_1[_i];
                    return [4 /*yield*/, get_type(path_1)];
                case 3:
                    if ((_a.sent()) == type)
                        filtered.push(path_1);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, filtered];
            }
        });
    });
}
exports.read_directory = read_directory;
function read_file(path, options) {
    return util_1.promisify(nodefs.readFile)(path, options);
}
exports.read_file = read_file;
// Creates parent directory automatically
function write_file(path, data, options) {
    return __awaiter(this, void 0, void 0, function () {
        var directory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    directory = nodepath.dirname(path);
                    return [4 /*yield*/, exists(directory)];
                case 1:
                    if (!!(_a.sent())) return [3 /*break*/, 3];
                    return [4 /*yield*/, make_directory(directory)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    options = __assign({}, options);
                    options.encoding = options.encoding || 'utf8';
                    return [4 /*yield*/, util_1.promisify(nodefs.writeFile)(path, data, options)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.write_file = write_file;
function read_json(path) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, read_file(path, { encoding: 'utf8' })];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    });
}
exports.read_json = read_json;
function write_json(path, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, write_file(path, JSON.stringify(data), { encoding: 'utf8' })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.write_json = write_json;
function rename(from, to, options) {
    return __awaiter(this, void 0, void 0, function () {
        var to_parent_directory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exists(to)];
                case 1:
                    // Checking if to file already exist
                    if ((_a.sent()) && !(options && options.overwrite))
                        throw new Error("file " + to + " already exists");
                    to_parent_directory = nodepath.dirname(to);
                    return [4 /*yield*/, exists(to_parent_directory)];
                case 2:
                    if (!!(_a.sent())) return [3 /*break*/, 4];
                    return [4 /*yield*/, make_directory(to_parent_directory)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, util_1.promisify(nodefs.rename)(from, to)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.rename = rename;
// Creates parent directory automatically
function make_directory(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exists(path)];
                case 1:
                    // Could be speed up by handling exception instead of checking for existance.
                    if ((_a.sent()))
                        return [2 /*return*/];
                    return [4 /*yield*/, util_1.promisify(fsextra.ensureDir)(path)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.make_directory = make_directory;
function exists(path) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, util_1.promisify(nodefs.stat)(path)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
                case 2:
                    e_1 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.exists = exists;
function delete_file(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exists(path)];
                case 1:
                    // Check for existance is optional, probably could be removed
                    if (!(_a.sent()))
                        return [2 /*return*/];
                    return [4 /*yield*/, util_1.promisify(nodefs.unlink)(path)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.delete_file = delete_file;
function delete_directory(path, options) {
    return __awaiter(this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exists(path)];
                case 1:
                    // Reqursive flag requiret for safety.
                    if (!(_a.sent()))
                        return [2 /*return*/];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, util_1.promisify(options && options.recursive ? fsextra.remove : nodefs.rmdir)(path)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_2 = _a.sent();
                    // Because node fs errors doesn't have stack trace information
                    // https://stackoverflow.com/questions/61155350/why-theres-no-stack-trace-in-node-fs-rmdir-error
                    throw new Error("can't delete directory '" + path + "' because of '" + base_1.ensure_error(e_2).message + "'");
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.delete_directory = delete_directory;
function is_tmp_directory(path) {
    return /tmp|temp/i.test(path.toLowerCase());
}
exports.is_tmp_directory = is_tmp_directory;
exports.not_tmp_directory_message = "temp directory expected to have 'tmp' or 'temp' term in its path";
function delete_tmp_directory(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // `t` in path required for safety so you don't accidentally delete non temp directory.
            base_1.assert(is_tmp_directory(path), exports.not_tmp_directory_message);
            delete_directory(path, { recursive: true });
            return [2 /*return*/];
        });
    });
}
exports.delete_tmp_directory = delete_tmp_directory;
function create_tmp_directory(prefix) {
    // return promisify(nodefs.mkdtemp)(nodepath.join(os.tmpdir(), prefix))
    return nodepath.join(os.tmpdir(), prefix);
}
exports.create_tmp_directory = create_tmp_directory;
function get_type(path) {
    return __awaiter(this, void 0, void 0, function () {
        var stat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, util_1.promisify(nodefs.lstat)(path)];
                case 1:
                    stat = _a.sent();
                    if (stat.isFile())
                        return [2 /*return*/, 'file'];
                    else if (stat.isDirectory())
                        return [2 /*return*/, 'directory'];
                    else if (stat.isSymbolicLink())
                        return [2 /*return*/, 'link'];
                    else
                        throw new Error("unknown fs entry type for '" + path + "'");
                    return [2 /*return*/];
            }
        });
    });
}
exports.get_type = get_type;
//# sourceMappingURL=fs.js.map