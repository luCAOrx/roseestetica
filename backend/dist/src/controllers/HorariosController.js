"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
exports.default = {
    async listarHorarios(request, response, next) {
        const horarios = await (0, connection_1.default)('horarios').select('*');
        return response.json(horarios);
    }
};
