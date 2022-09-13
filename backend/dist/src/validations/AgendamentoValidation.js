"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yup = __importStar(require("yup"));
exports.default = {
    async agendar(request, response, next) {
        const { data, procedimento_id, horario_id } = request.body;
        const dataRequest = { data, procedimento_id, horario_id };
        const schema = yup.object().shape({
            data: yup.date().required('O campo data é obrigatório.'),
            procedimento_id: yup.array().min(1, 'O campo procedimento é obrigatório.'),
            horario_id: yup.number().required('O campo horário é obrigatório.')
        });
        await schema.validate(dataRequest, {
            abortEarly: false
        });
        next();
    },
    async remarcar(request, response, next) {
        const { data, horario_id } = request.body;
        const dataRequest = { data, horario_id };
        const schema = yup.object().shape({
            data: yup.date().required('O campo data é obrigatório.'),
            horario_id: yup.number().required('O campo horário é obrigatório.')
        });
        await schema.validate(dataRequest, {
            abortEarly: false
        });
        next();
    },
    async alterarProcedimento(request, response, next) {
        const { procedimento_id } = request.body;
        const dataRequest = { procedimento_id };
        const schema = yup.object().shape({
            procedimento_id: yup.array().min(1, 'O campo procedimento é obrigatório.')
        });
        await schema.validate(dataRequest, {
            abortEarly: false
        });
        next();
    }
};
