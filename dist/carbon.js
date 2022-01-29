"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _CarbonHTTP_forcedClient, _CarbonHTTP_client;
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const util_1 = require("util");
const http_1 = require("http");
const https_1 = require("https");
const http_2 = require("./http");
class CarbonHTTP {
    constructor(client) {
        _CarbonHTTP_forcedClient.set(this, void 0);
        _CarbonHTTP_client.set(this, void 0);
        __classPrivateFieldSet(this, _CarbonHTTP_forcedClient, false, "f");
        __classPrivateFieldSet(this, _CarbonHTTP_client, http_1.request, "f");
        if (client) {
            __classPrivateFieldSet(this, _CarbonHTTP_client, client, "f");
            __classPrivateFieldSet(this, _CarbonHTTP_forcedClient, true, "f");
        }
    }
    response(dataBlocks, status) {
        const result = Buffer.concat(dataBlocks).toString();
        return {
            status: status,
            json() {
                return JSON.parse(result);
            },
            text() {
                return result;
            },
        };
    }
    request(url, context) {
        const urlObject = new url_1.URL(url);
        const opt = {
            method: (context === null || context === void 0 ? void 0 : context.method) || http_2.HttpMethod.GET,
            path: `${urlObject.pathname}${urlObject.search || ''}`,
            body: new util_1.TextEncoder().encode(context === null || context === void 0 ? void 0 : context.body),
            port: (context === null || context === void 0 ? void 0 : context.port) ? context.port : urlObject.port,
        };
        if (context === null || context === void 0 ? void 0 : context.headers) {
            opt.headers = context.headers;
        }
        if ((urlObject === null || urlObject === void 0 ? void 0 : urlObject.protocol) === 'https:') {
            if (!__classPrivateFieldGet(this, _CarbonHTTP_forcedClient, "f")) {
                __classPrivateFieldSet(this, _CarbonHTTP_client, https_1.request, "f");
            }
            opt.hostname = urlObject.hostname;
        }
        else {
            opt.host = urlObject.host;
        }
        return new Promise((resolve, reject) => {
            const req = __classPrivateFieldGet(this, _CarbonHTTP_client, "f").call(this, opt, (res) => {
                const dataCollection = [];
                res.on('data', (data) => {
                    dataCollection.push(data);
                });
                res.on('error', (err) => {
                    reject(err);
                });
                res.on('end', () => {
                    resolve(this.response(dataCollection, (res === null || res === void 0 ? void 0 : res.statusCode) || http_2.HttpStatusCode.OK));
                });
            });
            req.write((context === null || context === void 0 ? void 0 : context.body) || '');
            req.end();
        });
    }
}
exports.default = CarbonHTTP;
_CarbonHTTP_forcedClient = new WeakMap(), _CarbonHTTP_client = new WeakMap();
//# sourceMappingURL=carbon.js.map