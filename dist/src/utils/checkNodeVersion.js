"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNodeVersion = void 0;
var semver_1 = __importDefault(require("semver"));
exports.checkNodeVersion = function (expectedVersion, id) {
    if (!semver_1.default.satisfies(process.version, expectedVersion, { includePrerelease: true })) {
        process.exit(1);
    }
};
