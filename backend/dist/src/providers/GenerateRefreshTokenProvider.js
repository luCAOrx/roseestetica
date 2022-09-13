"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const dayjs_1 = __importDefault(require("dayjs"));
const connection_1 = __importDefault(require("../database/connection"));
exports.default = {
    async generateRefreshToken(cliente_id) {
        const espira_em = (0, dayjs_1.default)().add(15, 'second').unix();
        const id = crypto_1.default.randomBytes(15).toString('hex');
        await (0, connection_1.default)('refresh_token').insert({
            id,
            espira_em,
            cliente_id
        });
        const dados = {
            id,
            espira_em,
            cliente_id
        };
        return dados;
    }
};
