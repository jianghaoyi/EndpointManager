"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadJsonFile = void 0;
var requireJSON5 = require('require-json5');
function loadJsonFile(filePath) {
    return requireJSON5(filePath);
}
exports.loadJsonFile = loadJsonFile;
