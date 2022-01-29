"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
var url_1 = require("url");
var util_1 = require("util");
var http_1 = require("http");
var https_1 = require("https");
var http_2 = require("./http");
function response(dataBlocks, status) {
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
}
function Request(url, opt, clientService) {
    var urlAPI = new url_1.URL(url);
    var nodeReqOpt = {
        method: (opt === null || opt === void 0 ? void 0 : opt.method) || http_2.HttpMethod.GET,
        path: "" + urlAPI.pathname + (urlAPI.search || ''),
        body: new util_1.TextEncoder().encode(opt === null || opt === void 0 ? void 0 : opt.body),
        port: (opt === null || opt === void 0 ? void 0 : opt.port) ? opt.port : urlAPI.port,
    };
    if (opt === null || opt === void 0 ? void 0 : opt.headers) {
        nodeReqOpt.headers = opt.headers;
    }
    var client = http_1.request;
    if (clientService) {
        client = clientService;
    }
    if (urlAPI.protocol === http_2.HttpProtocol.SecureHTTP) {
        if (!clientService) {
            client = https_1.request;
        }
        nodeReqOpt.hostname = urlAPI.hostname;
    }
    else {
        nodeReqOpt.host = urlAPI.host;
    }
    return new Promise(function (resolve, reject) {
        var req = client(nodeReqOpt, function (res) {
            var dataCollection = [];
            res.on('data', function (data) {
                dataCollection.push(data);
            });
            res.on('error', function (err) {
                reject(err);
            });
            res.on('end', function () {
                resolve(response(dataCollection, res.statusCode || http_2.HttpStatusCode.OK));
            });
        });
        req.write((opt === null || opt === void 0 ? void 0 : opt.body) || '');
        req.end();
    });
}
exports.Request = Request;
//# sourceMappingURL=carbon.js.map