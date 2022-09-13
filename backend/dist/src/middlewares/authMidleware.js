"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const auth_1 = __importDefault(require("../config/auth"));
const s3 = new aws_sdk_1.default.S3();
function authentication(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        const { key: imagem } = request.file;
        if (process.env.STORAGE_TYPE === 'local') {
            (0, util_1.promisify)(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', `uploads/${imagem}`));
        }
        else {
            s3.deleteObject({
                Bucket: 'roseestetica-upload',
                Key: imagem
            }).promise();
        }
        return response.status(401).send({ erro: 'Nenhum token fornecido!' });
    }
    const parts = authHeader.split(' ');
    if (Number(parts.length === 0) === 2) {
        const { key: imagem } = request.file;
        if (process.env.STORAGE_TYPE === 'local') {
            (0, util_1.promisify)(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', `uploads/${imagem}`));
        }
        else {
            s3.deleteObject({
                Bucket: 'roseestetica-upload',
                Key: imagem
            }).promise();
        }
        return response.status(401).send({ erro: 'Erro de token!' });
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        const { key: imagem } = request.file;
        if (process.env.STORAGE_TYPE === 'local') {
            (0, util_1.promisify)(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', `uploads/${imagem}`));
        }
        else {
            s3.deleteObject({
                Bucket: 'roseestetica-upload',
                Key: imagem
            }).promise();
        }
        return response.status(401).send({ erro: 'Token mal formatado!' });
    }
    jsonwebtoken_1.default.verify(token, String(auth_1.default.secret), async (err, decoded) => {
        if (err != null) {
            if (request.file) {
                const { key: imagem } = request.file;
                if (process.env.STORAGE_TYPE === 'local') {
                    (0, util_1.promisify)(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', `uploads/${imagem}`));
                }
                else {
                    s3.deleteObject({
                        Bucket: 'roseestetica-upload',
                        Key: imagem
                    }).promise();
                }
            }
            return response.status(401).send({ erro: 'Token inválido!' });
        }
        request.clientId = decoded.id;
        return next();
    });
}
exports.default = authentication;
