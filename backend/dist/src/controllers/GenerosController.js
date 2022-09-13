"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
exports.default = {
    async listarGeneros(request, response, next) {
        const generos = await (0, connection_1.default)('sexos').select('*');
        return response.send(generos);
    }
};
