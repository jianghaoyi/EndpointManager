"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var lodash_1 = __importDefault(require("lodash"));
var path = __importStar(require("path"));
var commonAppConfigReader_1 = require("./commonAppConfigReader");
var configFilesPath = path.resolve('./config');
var allServiceMap = {};
function listAllConfigFiles(dir) {
    var files = fs_1.readdirSync(dir);
    files.forEach(function (fileName) {
        if (lodash_1.default.startsWith(fileName, 'appsettings') && lodash_1.default.endsWith(fileName, '.json') && !lodash_1.default.endsWith(fileName, '.template.json')) {
            var serviceObj = commonAppConfigReader_1.commonReader(path.resolve(configFilesPath, fileName));
            allServiceMap[serviceObj.fileName] = serviceObj.services;
        }
    });
}
listAllConfigFiles(path.resolve('./config'));
console.log(allServiceMap);
