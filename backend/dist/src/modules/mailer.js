"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const path_1 = __importDefault(require("path"));
const mail_1 = __importDefault(require("../config/mail"));
const { host, port, secure, user, pass, ciphers } = mail_1.default;
const transport = nodemailer_1.default.createTransport({
    host: String(host),
    port: Number(port),
    secure,
    auth: {
        user: String(user),
        pass: String(pass)
    },
    tls: {
        ciphers
    }
});
const handlebarOptions = {
    viewEngine: {
        extName: '.html',
        partialsDir: path_1.default.resolve('./src/resources/mail/auth/'),
        layoutsDir: path_1.default.resolve('./src/resources/mail/auth/'),
        defaultLayout: 'esqueci_minha_senha.html'
    },
    viewPath: path_1.default.resolve('./src/resources/mail/auth/'),
    extName: '.html'
};
transport.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarOptions));
exports.default = transport;
