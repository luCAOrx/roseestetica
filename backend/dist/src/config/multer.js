"use strict";
// Caso tenha criado um bucket no AmazonS3,
// descomente as linhas comentadas abaixo.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { S3Client } from '@aws-sdk/client-s3'
const crypto_1 = __importDefault(require("crypto"));
const multer_1 = __importDefault(require("multer"));
// import multerS3 from 'multer-s3'
const path_1 = __importDefault(require("path"));
const doisMB = 2 * 1024 * 1024;
const tiposArmazenados = {
    local: multer_1.default.diskStorage({
        destination: path_1.default.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            const hash = crypto_1.default.randomBytes(6).toString('hex');
            file.key = `${hash}-${file.originalname}`;
            callback(null, file.key);
        }
    })
    // s3: multerS3({
    //   s3: new S3Client({
    //     credentials: {
    //       accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    //       secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY)
    //     },
    //     region: String(process.env.AWS_DEFAULT_REGION)
    //   }),
    //   bucket: String(process.env.AWS_BUCKET_NAME),
    //   contentType: multerS3.AUTO_CONTENT_TYPE,
    //   acl: 'public-read',
    //   key: (request, file: Express.MulterS3.File, callback) => {
    //     const hash = crypto.randomBytes(6).toString('hex')
    //     const fileName = `${hash}-${file.originalname}`
    //     callback(null, fileName)
    //   }
    // })
};
exports.default = {
    destination: path_1.default.resolve(__dirname, '..', '..', 'uploads'),
    // storage: process.env.STORAGE_TYPE === 'local' ? tiposArmazenados.local : tiposArmazenados.s3,
    storage: tiposArmazenados.local,
    limits: {
        fileSize: doisMB
    },
    fileFilter(request, file, callback) {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/jpg'
        ];
        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        }
        else {
            callback(null, false);
            callback(new Error('Tipo de arquivo inválido.'));
        }
    }
};
