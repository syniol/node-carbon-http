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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = exports.HttpMethod = void 0;
const http_1 = require("http");
const https_1 = require("https");
const url_1 = require("url");
const util_1 = require("util");
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["PATCH"] = "PATCH";
})(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
function NewHttpResponse(dataBlocks, status) {
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
function Request(url, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const urlObject = new url_1.URL(url);
        const opt = {
            method: (context === null || context === void 0 ? void 0 : context.method) || HttpMethod.GET,
            headers: context === null || context === void 0 ? void 0 : context.headers,
            path: `${urlObject.pathname}${urlObject.search || ''}`,
            body: new util_1.TextEncoder().encode(context === null || context === void 0 ? void 0 : context.body),
            port: urlObject.port,
        };
        let client = http_1.request;
        if ((urlObject === null || urlObject === void 0 ? void 0 : urlObject.protocol) === 'https:') {
            client = https_1.request;
            Object.assign(opt, { hostname: urlObject.hostname });
        }
        else {
            Object.assign(opt, { host: urlObject.host });
        }
        return new Promise((resolve, reject) => {
            const req = client(opt, (res) => {
                const dataCollection = [];
                res.on('data', (data) => {
                    dataCollection.push(data);
                });
                res.on('error', (err) => {
                    reject(err);
                });
                res.on('end', () => {
                    resolve(NewHttpResponse(dataCollection, (res === null || res === void 0 ? void 0 : res.statusCode) || 400));
                });
            });
            req.write((context === null || context === void 0 ? void 0 : context.body) || '');
            req.end();
        });
    });
}
exports.Request = Request;
