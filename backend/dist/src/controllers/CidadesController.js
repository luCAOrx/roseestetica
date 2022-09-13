"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
exports.default = {
    async listarCidades(request, response, next) {
        const cidades = await (0, connection_1.default)('cidades').select('*');
        return response.send(cidades);
    }
};
