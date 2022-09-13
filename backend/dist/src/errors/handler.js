"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const yup_1 = require("yup");
const s3 = new aws_sdk_1.default.S3();
const errorHandler = (error, request, response, next) => {
    if (error instanceof yup_1.ValidationError) {
        const errors = {};
        error.inner.forEach(err => {
            errors[`${err.path}`] = err.errors;
        });
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
        return response.status(400).json({ message: 'Validation fails', errors });
    }
    if (error instanceof multer_1.default.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            if (request.file) {
                const { key: imagem } = request.file;
                process.env.STORAGE_TYPE === 'local'
                    ? (0, util_1.promisify)(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', `uploads/${imagem}`))
                    : s3.deleteObject({
                        Bucket: 'roseestetica-upload',
                        Key: imagem
                    }).promise();
            }
            return response.status(400).json({
                erro: 'O arquivo não pode ter mais que 2mb.'
            });
        }
    }
    if (error.message === 'Tipo de arquivo inválido.') {
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
        return response.status(400).json({ erro: 'Tipo de arquivo inválido.' });
    }
    return response.status(500).json({ message: 'Internal server error' });
};
exports.default = errorHandler;
