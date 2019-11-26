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
function resolve() {
    var _a;
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    return (_a = require('path')).resolve.apply(_a, paths);
}
exports.resolve = resolve;
function readDirectory(path, type) {
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
                    return [4 /*yield*/, getType(path_1)];
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
exports.readDirectory = readDirectory;
function readFile(path, options) {
    return util_1.promisify(nodefs.readFile)(path, options);
}
exports.readFile = readFile;
// Creates parent directory automatically
function writeFile(path, data, options) {
    return __awaiter(this, void 0, void 0, function () {
        var directory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    directory = nodepath.dirname(path);
                    return [4 /*yield*/, exists(directory)];
                case 1:
                    if (!!(_a.sent())) return [3 /*break*/, 3];
                    return [4 /*yield*/, makeDirectory(directory)];
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
exports.writeFile = writeFile;
function rename(from, to, options) {
    return __awaiter(this, void 0, void 0, function () {
        var toParentDirectory;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exists(to)];
                case 1:
                    // Checking if to file already exist
                    if ((_a.sent()) && !(options && options.overwrite))
                        throw new Error("file " + to + " already exists");
                    toParentDirectory = nodepath.dirname(to);
                    return [4 /*yield*/, exists(toParentDirectory)];
                case 2:
                    if (!!(_a.sent())) return [3 /*break*/, 4];
                    return [4 /*yield*/, makeDirectory(toParentDirectory)];
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
function makeDirectory(path) {
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
exports.makeDirectory = makeDirectory;
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
function deleteFile(path) {
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
exports.deleteFile = deleteFile;
function deleteDirectory(path, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exists(path)];
                case 1:
                    // Reqursive flag requiret for safety.
                    if (!(_a.sent()))
                        return [2 /*return*/];
                    return [4 /*yield*/, util_1.promisify(options && options.recursive ? fsextra.remove : nodefs.rmdir)(path)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteDirectory = deleteDirectory;
function deleteTmpDirectory(path) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // `tmp` in path required for safety so you don't accidentally delete non temp directory.
            base_1.assert(/tmp|temp/i.test(path), "temp directory expected to have tmp or temp term in its path");
            deleteDirectory(path, { recursive: true });
            return [2 /*return*/];
        });
    });
}
exports.deleteTmpDirectory = deleteTmpDirectory;
function getType(path) {
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
exports.getType = getType;
//# sourceMappingURL=fs.js.map