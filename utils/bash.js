"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var string_decoder_1 = require("string_decoder");
function run(cmd, args, options) {
    if (args === void 0) { args = []; }
    if (options === void 0) { options = {}; }
    return new Promise(function (resolve, reject) {
        var outdecoder = new string_decoder_1.StringDecoder('utf8'), stdoutdecoder = new string_decoder_1.StringDecoder('utf8'), stderrdecoder = new string_decoder_1.StringDecoder('utf8');
        var out = [], stdout = [], stderr = [];
        var workers = child_process_1.spawn(cmd, args, options);
        workers.on('error', function (err) { return reject(err); });
        workers.on('close', function (code) {
            if (code == 0)
                resolve({ out: out.join(''), stdout: stdout.join(''), stderr: stderr.join('') });
            else
                reject(new Error(cmd + " " + args.join(' ') + " exited with " + code));
        });
        workers.stdout.on('data', function (data) {
            out.push(outdecoder.write(data));
            stdout.push(stdoutdecoder.write(data));
        });
        workers.stderr.on('data', function (data) {
            out.push(outdecoder.write(data));
            stderr.push(stderrdecoder.write(data));
        });
    });
}
exports.run = run;
//# sourceMappingURL=bash.js.map