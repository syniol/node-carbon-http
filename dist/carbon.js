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
        const result = Buffer
            .concat(dataBlocks)
            .toString();
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
    request(url, opt) {
        return __awaiter(this, void 0, void 0, function* () {
            const urlAPI = new url_1.URL(url);
            const nodeReqOpt = {
                method: (opt === null || opt === void 0 ? void 0 : opt.method) || http_2.HttpMethod.GET,
                path: `${urlAPI.pathname}${urlAPI.search || ''}`,
                body: new util_1.TextEncoder().encode(opt === null || opt === void 0 ? void 0 : opt.body),
                port: (opt === null || opt === void 0 ? void 0 : opt.port) ? opt.port : urlAPI.port,
            };
            if (opt === null || opt === void 0 ? void 0 : opt.headers) {
                nodeReqOpt.headers = opt.headers;
            }
            if (urlAPI.protocol === http_2.HttpProtocol.SecureHTTP) {
                if (!__classPrivateFieldGet(this, _CarbonHTTP_forcedClient, "f")) {
                    __classPrivateFieldSet(this, _CarbonHTTP_client, https_1.request, "f");
                }
                nodeReqOpt.hostname = urlAPI.hostname;
            }
            else {
                nodeReqOpt.host = urlAPI.host;
            }
            return new Promise((resolve, reject) => {
                const req = __classPrivateFieldGet(this, _CarbonHTTP_client, "f").call(this, nodeReqOpt, (res) => {
                    const dataCollection = [];
                    res.on('data', (data) => {
                        dataCollection.push(data);
                    });
                    res.on('error', (err) => {
                        reject(err);
                    });
                    res.on('end', () => {
                        resolve(this.response(dataCollection, res.statusCode || http_2.HttpStatusCode.OK));
                    });
                });
                req.write((opt === null || opt === void 0 ? void 0 : opt.body) || '');
                req.end();
            });
        });
    }
}
exports.default = CarbonHTTP;
_CarbonHTTP_forcedClient = new WeakMap(), _CarbonHTTP_client = new WeakMap();
//# sourceMappingURL=carbon.js.map