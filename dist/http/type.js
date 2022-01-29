"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpProtocol = exports.HttpMethod = void 0;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["PATCH"] = "PATCH";
    HttpMethod["HEAD"] = "HEAD";
    HttpMethod["CONNECT"] = "CONNECT";
    HttpMethod["OPTIONS"] = "OPTIONS";
    HttpMethod["TRACE"] = "TRACE";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
var HttpProtocol;
(function (HttpProtocol) {
    HttpProtocol["SecureHTTP"] = "https:";
    HttpProtocol["InSecureHTTP"] = "http:";
})(HttpProtocol = exports.HttpProtocol || (exports.HttpProtocol = {}));
//# sourceMappingURL=type.js.map