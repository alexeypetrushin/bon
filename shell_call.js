"use strict";
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var json_output_token = "shell_call_json_output:";
function on_shell_call(_a) {
    var before = _a.before, process = _a.process, after = _a.after;
    return __awaiter(this, void 0, void 0, function () {
        var data, before_output, _b, e_1, results, _c, _d, input, value, e_2, e_3_1, e_4;
        var e_3, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    data = JSON.parse(global.process.argv[2]);
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 3, , 4]);
                    _b = { is_error: false };
                    return [4 /*yield*/, before(data.before)];
                case 2:
                    before_output = (_b.value = _f.sent(), _b);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _f.sent();
                    before_output = { is_error: true, error: base_1.ensure_error(e_1).message };
                    return [3 /*break*/, 4];
                case 4:
                    // Processing
                    base_1.assert(Array.isArray(data.inputs), "inputs should be an array");
                    results = [];
                    if (!before_output.is_error) return [3 /*break*/, 5];
                    results = data.inputs.map(function () { return before_output; });
                    return [3 /*break*/, 14];
                case 5:
                    _f.trys.push([5, 12, 13, 14]);
                    _c = __values(data.inputs), _d = _c.next();
                    _f.label = 6;
                case 6:
                    if (!!_d.done) return [3 /*break*/, 11];
                    input = _d.value;
                    _f.label = 7;
                case 7:
                    _f.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, process(before_output.value, input)];
                case 8:
                    value = _f.sent();
                    results.push({ is_error: false, value: value });
                    return [3 /*break*/, 10];
                case 9:
                    e_2 = _f.sent();
                    results.push({ is_error: true, error: base_1.ensure_error(e_2).message });
                    return [3 /*break*/, 10];
                case 10:
                    _d = _c.next();
                    return [3 /*break*/, 6];
                case 11: return [3 /*break*/, 14];
                case 12:
                    e_3_1 = _f.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 14];
                case 13:
                    try {
                        if (_d && !_d.done && (_e = _c.return)) _e.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 14:
                    _f.trys.push([14, 16, , 17]);
                    return [4 /*yield*/, after(before_output.is_error ? undefined : before_output.value, data.after)];
                case 15:
                    _f.sent();
                    return [3 /*break*/, 17];
                case 16:
                    e_4 = _f.sent();
                    results = data.inputs.map(function () { return ({ is_error: true, error: base_1.ensure_error(e_4).message }); });
                    return [3 /*break*/, 17];
                case 17:
                    global.process.stdout.write(json_output_token + JSON.stringify(results));
                    global.process.exit();
                    return [2 /*return*/];
            }
        });
    });
}
exports.on_shell_call = on_shell_call;
//# sourceMappingURL=shell_call.js.map