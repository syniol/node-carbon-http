"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarbonHTTPMock = void 0;
var http_1 = require("./http");
var buffer_1 = require("buffer");
var CarbonHTTPMock = /** @class */ (function () {
    function CarbonHTTPMock(arg, statusCode) {
        var _this = this;
        this.client = function (_, callback) {
            if (typeof callback === 'function') {
                var res = {
                    on: function (e, listener) {
                        switch (e) {
                            case 'data':
                                if (typeof arg === 'string') {
                                    listener(buffer_1.Buffer.from(arg, 'utf8'));
                                }
                                break;
                            case 'error':
                                if (arg instanceof Error) {
                                    listener(arg);
                                }
                                break;
                            default:
                                listener();
                        }
                        return _this;
                    },
                    statusCode: statusCode ||
                        (arg instanceof Error
                            ? http_1.HttpStatusCode.BAD_REQUEST
                            : http_1.HttpStatusCode.OK),
                };
                callback(res);
            }
            return {
                write: function () { return true; },
                end: function () { return undefined; },
            };
        };
    }
    return CarbonHTTPMock;
}());
exports.CarbonHTTPMock = CarbonHTTPMock;
//# sourceMappingURL=carbon.mock.js.map