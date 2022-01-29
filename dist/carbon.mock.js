"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./http");
const buffer_1 = require("buffer");
class CarbonHTTPMock {
    constructor(arg, statusCode) {
        this.client = (_, callback) => {
            if (typeof callback === 'function') {
                const res = {
                    on: (e, listener) => {
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
                        return this;
                    },
                    statusCode: statusCode ||
                        (arg instanceof Error
                            ? http_1.HttpStatusCode.BAD_REQUEST
                            : http_1.HttpStatusCode.OK),
                };
                callback(res);
            }
            return {
                write: () => true,
                end: () => undefined,
            };
        };
    }
}
exports.default = CarbonHTTPMock;
//# sourceMappingURL=carbon.mock.js.map