"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonReader = void 0;
var lodash_1 = __importDefault(require("lodash"));
var loadJson_1 = require("./utils/loadJson");
var parseUrl = require("parse-url");
function commonReader(filePath) {
    var obj = loadJson_1.loadJsonFile(filePath);
    var endPoints = obj.ServiceEndpoints;
    var services = [];
    lodash_1.default.keys(endPoints).forEach(function (k) {
        var _a;
        var paserUrlObj = parseUrl(endPoints[k].BaseAddress);
        services.push({
            name: k,
            protocol: paserUrlObj.protocol,
            domain: paserUrlObj.resource,
            port: (_a = paserUrlObj.port) !== null && _a !== void 0 ? _a : 80
        });
    });
    return {
        fileName: filePath,
        services: services
    };
}
exports.commonReader = commonReader;
