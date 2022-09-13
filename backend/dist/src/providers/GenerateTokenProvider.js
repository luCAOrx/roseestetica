"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
exports.default = {
    async generateToken(params) {
        return (0, jsonwebtoken_1.sign)(params, String(auth_1.default.secret), {
            expiresIn: '20s'
        });
    }
};
