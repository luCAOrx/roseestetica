"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
exports.default = {
    async listarProcedimentos(request, response, next) {
        const procedimentos = await (0, connection_1.default)('procedimentos').select('*');
        return response.send(procedimentos);
    }
};
