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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarbonHTTP = void 0;
var url_1 = require("url");
var util_1 = require("util");
var http_1 = require("http");
var https_1 = require("https");
var http_2 = require("./http");
var CarbonHTTP = /** @class */ (function () {
    function CarbonHTTP(client) {
        this.forcedClient = false;
        this.client = http_1.request;
        if (client) {
            this.client = client;
            this.forcedClient = true;
        }
    }
    CarbonHTTP.prototype.response = function (dataBlocks, status) {
        var result = Buffer
            .concat(dataBlocks)
            .toString();
        return {
            status: status,
            json: function () {
                return JSON.parse(result);
            },
            text: function () {
                return result;
            },
        };
    };
    CarbonHTTP.prototype.request = function (url, opt) {
        return __awaiter(this, void 0, void 0, function () {
            var urlAPI, nodeReqOpt;
            var _this = this;
            return __generator(this, function (_a) {
                urlAPI = new url_1.URL(url);
                nodeReqOpt = {
                    method: (opt === null || opt === void 0 ? void 0 : opt.method) || http_2.HttpMethod.GET,
                    path: "" + urlAPI.pathname + (urlAPI.search || ''),
                    body: new util_1.TextEncoder().encode(opt === null || opt === void 0 ? void 0 : opt.body),
                    port: (opt === null || opt === void 0 ? void 0 : opt.port) ? opt.port : urlAPI.port,
                };
                if (opt === null || opt === void 0 ? void 0 : opt.headers) {
                    nodeReqOpt.headers = opt.headers;
                }
                if (urlAPI.protocol === http_2.HttpProtocol.SecureHTTP) {
                    if (!this.forcedClient) {
                        this.client = https_1.request;
                    }
                    nodeReqOpt.hostname = urlAPI.hostname;
                }
                else {
                    nodeReqOpt.host = urlAPI.host;
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var req = _this.client(nodeReqOpt, function (res) {
                            var dataCollection = [];
                            res.on('data', function (data) {
                                dataCollection.push(data);
                            });
                            res.on('error', function (err) {
                                reject(err);
                            });
                            res.on('end', function () {
                                resolve(_this.response(dataCollection, res.statusCode || http_2.HttpStatusCode.OK));
                            });
                        });
                        req.write((opt === null || opt === void 0 ? void 0 : opt.body) || '');
                        req.end();
                    })];
            });
        });
    };
    return CarbonHTTP;
}());
exports.CarbonHTTP = CarbonHTTP;
//# sourceMappingURL=carbon.js.map