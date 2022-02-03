"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewCarbonError = void 0;
function NewCarbonError(msg, stack, code) {
    var err = {
        name: 'Carbon HTTP(s) Error',
        message: msg,
    };
    if (stack) {
        err.stack = stack;
    }
    if (code) {
        err.code = code;
    }
    return err;
}
exports.NewCarbonError = NewCarbonError;
//# sourceMappingURL=error.js.map