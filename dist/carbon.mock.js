"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarbonClientMock = void 0;
var node_buffer_1 = require("node:buffer");
var http_1 = require("./http");
function CarbonClientMock(arg, statusCode) {
    return function (_, callback) {
        if (typeof callback === 'function') {
            var res = {
                on: function (e, listener) {
                    switch (e) {
                        case 'data':
                            if (typeof arg === 'string') {
                                listener(node_buffer_1.Buffer.from(arg, 'utf8'));
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
exports.CarbonClientMock = CarbonClientMock;
//# sourceMappingURL=carbon.mock.js.map