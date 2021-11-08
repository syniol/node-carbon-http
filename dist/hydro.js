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
var _HydroHTTP_forcedClient, _HydroHTTP_client;
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const util_1 = require("util");
const http_1 = require("http");
const https_1 = require("https");
const http_2 = require("./http");
const worker_threads_1 = require("worker_threads");
class HydroHTTP {
    constructor(client) {
        _HydroHTTP_forcedClient.set(this, void 0);
        _HydroHTTP_client.set(this, void 0);
        if (client) {
            __classPrivateFieldSet(this, _HydroHTTP_client, client, "f");
            __classPrivateFieldSet(this, _HydroHTTP_forcedClient, true, "f");
        }
        __classPrivateFieldSet(this, _HydroHTTP_client, http_1.request, "f");
        __classPrivateFieldSet(this, _HydroHTTP_forcedClient, false, "f");
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
            headers: context === null || context === void 0 ? void 0 : context.headers,
            path: `${urlObject.pathname}${urlObject.search || ''}`,
            body: new util_1.TextEncoder().encode(context === null || context === void 0 ? void 0 : context.body),
            port: urlObject.port,
        };
        if ((urlObject === null || urlObject === void 0 ? void 0 : urlObject.protocol) === 'https:') {
            if (!__classPrivateFieldGet(this, _HydroHTTP_forcedClient, "f")) {
                __classPrivateFieldSet(this, _HydroHTTP_client, https_1.request, "f");
            }
            Object.assign(opt, { hostname: urlObject.hostname });
        }
        else {
            Object.assign(opt, { host: urlObject.host });
        }
        return new Promise((resolve, reject) => {
            const req = __classPrivateFieldGet(this, _HydroHTTP_client, "f").call(this, opt, (res) => {
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
    requestConcurrently(url, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (worker_threads_1.isMainThread) {
                return new Promise((resolve, reject) => {
                    const worker = new worker_threads_1.Worker(__filename, {
                        workerData: {
                            url,
                            context,
                        },
                    });
                    worker.on('message', message => resolve(message));
                    worker.on('error', err => reject(err));
                });
            }
            else {
                console.log('worker data is:', worker_threads_1.workerData);
                worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage('Done');
            }
        });
    }
}
exports.default = HydroHTTP;
_HydroHTTP_forcedClient = new WeakMap(), _HydroHTTP_client = new WeakMap();
