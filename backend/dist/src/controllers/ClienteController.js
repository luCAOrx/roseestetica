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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const bcryptjs_1 = __importStar(require("bcryptjs"));
const crypto_1 = require("crypto");
const dayjs_1 = __importDefault(require("dayjs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const connection_1 = __importDefault(require("../database/connection"));
const mailer_1 = __importDefault(require("../modules/mailer"));
const GenerateRefreshTokenProvider_1 = __importDefault(require("../providers/GenerateRefreshTokenProvider"));
const GenerateTokenProvider_1 = __importDefault(require("../providers/GenerateTokenProvider"));
const s3 = new aws_sdk_1.default.S3();
exports.default = {
    async autenticar(request, response) {
        try {
            const { email, senha } = request.body;
            const cliente = await (0, connection_1.default)('clientes').where({ email }).select('*').first();
            if (!cliente) {
                return response.status(400).json({ erro: 'E-mail ou senha inválido.' });
            }
            const senhaSalvaNoBancoDeDados = await (0, bcryptjs_1.compare)(senha, cliente.senha);
            if (!senhaSalvaNoBancoDeDados) {
                return response.status(400).json({ erro: 'E-mail ou senha inválido.' });
            }
            const clientes = await (0, connection_1.default)('clientes')
                .join('sexos', 'sexos.id', '=', 'clientes.sexo_id')
                .join('cidades', 'cidades.id', '=', 'clientes.cidade_id')
                .where({ email })
                .select([
                'clientes.id',
                'clientes.nome',
                'clientes.cpf',
                'clientes.sexo_id',
                'sexos.sexo',
                'clientes.telefone',
                'clientes.celular',
                'clientes.cidade_id',
                'cidades.cidade',
                'clientes.bairro',
                'clientes.logradouro',
                'clientes.numero',
                'clientes.complemento',
                'clientes.cep',
                'clientes.email'
            ])
                .first();
            const imagens = await (0, connection_1.default)('imagens')
                .where('cliente_id', cliente.id)
                .select(['imagem', 'imagem_aws_url'])
                .first();
            const dados = {
                clientes,
                imagens
            };
            const clienteSerializado = Object.assign(Object.assign({}, dados), { imagem_local_url: `${process.env.APP_URL}/uploads/${imagens.imagem}` });
            cliente.senha = undefined;
            cliente.token_reset_senha = undefined;
            cliente.expiracao_reset_senha = undefined;
            cliente.criado_em = undefined;
            cliente.atualizado_em = undefined;
            const token = await GenerateTokenProvider_1.default.generateToken({ id: cliente.id });
            await (0, connection_1.default)('refresh_token').where({ cliente_id: cliente.id }).del();
            const refreshToken = await GenerateRefreshTokenProvider_1.default.generateRefreshToken(cliente.id);
            return response.json({
                cliente: clienteSerializado.clientes,
                imagem_url: process.env.STORAGE_TYPE === 'local'
                    ? clienteSerializado.imagem_local_url
                    : clienteSerializado.imagens.imagem_aws_url,
                token,
                refreshToken
            });
        }
        catch (erro) {
            return response.status(400).json({ erro: 'Erro em se autenticar.' });
        }
    },
    async refreshToken(request, response) {
        try {
            const { refresh_token } = request.body;
            const refreshToken = await (0, connection_1.default)('refresh_token')
                .where({ id: refresh_token })
                .select('*')
                .first();
            if (!refreshToken) {
                return response.status(400).json({ erro: 'Refresh token inválido.' });
            }
            const refreshTokenExpirou = (0, dayjs_1.default)().isAfter(dayjs_1.default.unix(refreshToken.espira_em));
            const token = await GenerateTokenProvider_1.default.generateToken({ id: refreshToken.cliente_id });
            if (refreshTokenExpirou) {
                await (0, connection_1.default)('refresh_token')
                    .where({ cliente_id: refreshToken.cliente_id })
                    .del();
                const novoRefreshToken = await GenerateRefreshTokenProvider_1.default.generateRefreshToken(refreshToken.cliente_id);
                return response.json({ token, refreshToken: novoRefreshToken });
            }
            return response.json({ token });
        }
        catch (error) {
            return response.status(400).json({ erro: 'Erro ao gerar o refresh token.' });
        }
    },
    async cadastrar(request, response) {
        try {
            const senha = await bcryptjs_1.default.hash(request.body.senha, 8);
            let { nome, cpf, telefone, celular, bairro, logradouro, numero, complemento, cep, email, sexo_id, cidade_id } = request.body;
            const { key: imagem, location: imagem_aws_url = '' } = request.file;
            const dataEhoraDeAgora = new Date();
            const cpfExiste = await (0, connection_1.default)('clientes')
                .where({ cpf }).select('cpf').first();
            const emailExiste = await (0, connection_1.default)('clientes')
                .where({ email }).select('email').first();
            if (cpfExiste) {
                process.env.STORAGE_TYPE === 'local'
                    ? (0, util_1.promisify)(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', `uploads/${imagem}`))
                    : s3.deleteObject({
                        Bucket: 'roseestetica-upload',
                        Key: imagem
                    }).promise();
                return response.status(400).json({ erro: 'Esse cpf já existe.' });
            }
            if (emailExiste) {
                process.env.STORAGE_TYPE === 'local'
                    ? (0, util_1.promisify)(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', `uploads/${imagem}`))
                    : s3.deleteObject({
                        Bucket: 'roseestetica-upload',
                        Key: imagem
                    }).promise();
                return response.status(400).json({ erro: 'Esse e-mail já existe.' });
            }
            nome = nome.trim();
            cpf = cpf.trim();
            telefone = telefone.trim();
            celular = celular.trim();
            bairro = bairro.trim();
            logradouro = logradouro.trim();
            numero = numero.trim();
            complemento = complemento.trim();
            cep = cep.trim();
            email = email.trim();
            const transaction = await connection_1.default.transaction();
            const idInserido = await transaction('clientes').insert({
                nome,
                cpf,
                telefone,
                celular,
                bairro,
                logradouro,
                numero,
                complemento,
                cep,
                email,
                senha,
                sexo_id,
                cidade_id,
                criado_em: dataEhoraDeAgora
            }).returning('*');
            const id = idInserido[0].id;
            await transaction('imagens').insert({
                imagem,
                imagem_aws_url,
                cliente_id: id,
                criado_em: dataEhoraDeAgora
            });
            await transaction.commit();
            const dados = {
                cliente: {
                    nome,
                    cpf,
                    telefone,
                    celular,
                    bairro,
                    logradouro,
                    numero,
                    complemento,
                    cep,
                    email,
                    sexo_id,
                    cidade_id
                },
                imagem_aws_url
            };
            const clienteSerializado = Object.assign(Object.assign({}, dados), { imagem_local_url: `${process.env.APP_URL}/uploads/${imagem}` });
            return response.status(201).json({
                cliente: clienteSerializado.cliente,
                imagem_url: process.env.STORAGE_TYPE === 'local'
                    ? clienteSerializado.imagem_local_url
                    : clienteSerializado.imagem_aws_url
            });
        }
        catch (erro) {
            if (!request.file) {
                return response.status(400).json({ erro: 'O campo foto é obrigatório.' });
            }
            if (request.file) {
                const { key: imagem } = request.file;
                process.env.STORAGE_TYPE === 'local'
                    ? (0, util_1.promisify)(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', `uploads/${imagem}`))
                    : s3.deleteObject({
                        Bucket: 'roseestetica-upload',
                        Key: imagem
                    }).promise();
            }
            return response.status(400).json({ erro: 'Falha ao se cadastrar.' });
        }
    },
    async atualizarDadosPessoais(request, response) {
        try {
            const { id } = request.params;
            const dataEhoraDeAgora = new Date();
            let { nome, telefone, celular } = request.body;
            nome = nome.trim();
            telefone = telefone.trim();
            celular = celular.trim();
            await (0, connection_1.default)('clientes')
                .update({
                nome,
                telefone,
                celular,
                atualizado_em: dataEhoraDeAgora
            })
                .where({ id });
            const clientes = await (0, connection_1.default)('clientes')
                .join('sexos', 'sexos.id', '=', 'clientes.sexo_id')
                .join('cidades', 'cidades.id', '=', 'clientes.cidade_id')
                .where('clientes.id', id)
                .select([
                'clientes.id',
                'clientes.nome',
                'clientes.cpf',
                'clientes.sexo_id',
                'sexos.sexo',
                'clientes.telefone',
                'clientes.celular',
                'clientes.cidade_id',
                'cidades.cidade',
                'clientes.bairro',
                'clientes.logradouro',
                'clientes.numero',
                'clientes.complemento',
                'clientes.cep',
                'clientes.email'
            ])
                .first();
            const imagens = await (0, connection_1.default)('imagens')
                .where('cliente_id', id)
                .select(['imagem', 'imagem_aws_url'])
                .first();
            const dados = {
                clientes,
                imagens
            };
            const clienteSerializado = Object.assign(Object.assign({}, dados), { imagem_local_url: `${process.env.APP_URL}/uploads/${imagens.imagem}` });
            return response.status(201).json({
                cliente: clienteSerializado.clientes,
                imagem_url: process.env.STORAGE_TYPE === 'local'
                    ? clienteSerializado.imagem_local_url
                    : clienteSerializado.imagens.imagem_aws_url
            });
        }
        catch (erro) {
            return response.status(400).json({ erro: 'Erro ao atualizar dados pessoais.' });
        }
    },
    async atualizarEndereço(request, response) {
        try {
            const { id } = request.params;
            const dataEhoraDeAgora = new Date();
            let { cidade_id, bairro, logradouro, numero, complemento, cep } = request.body;
            bairro = bairro.trim();
            logradouro = logradouro.trim();
            numero = numero.trim();
            complemento = complemento.trim();
            cep = cep.trim();
            await (0, connection_1.default)('clientes')
                .update({
                cidade_id,
                bairro,
                logradouro,
                numero,
                complemento,
                cep,
                atualizado_em: dataEhoraDeAgora
            })
                .where({ id });
            const clientes = await (0, connection_1.default)('clientes')
                .join('sexos', 'sexos.id', '=', 'clientes.sexo_id')
                .join('cidades', 'cidades.id', '=', 'clientes.cidade_id')
                .where('clientes.id', id)
                .select([
                'clientes.id',
                'clientes.nome',
                'clientes.cpf',
                'clientes.sexo_id',
                'sexos.sexo',
                'clientes.telefone',
                'clientes.celular',
                'clientes.cidade_id',
                'cidades.cidade',
                'clientes.bairro',
                'clientes.logradouro',
                'clientes.numero',
                'clientes.complemento',
                'clientes.cep',
                'clientes.email'
            ])
                .first();
            const imagens = await (0, connection_1.default)('imagens')
                .where('cliente_id', id)
                .select(['imagem', 'imagem_aws_url'])
                .first();
            const dados = {
                clientes,
                imagens
            };
            const clienteSerializado = Object.assign(Object.assign({}, dados), { imagem_local_url: `${process.env.APP_URL}/uploads/${imagens.imagem}` });
            return response.status(201).json({
                cliente: clienteSerializado.clientes,
                imagem_url: process.env.STORAGE_TYPE === 'local'
                    ? clienteSerializado.imagem_local_url
                    : clienteSerializado.imagens.imagem_aws_url
            });
        }
        catch (erro) {
            return response.status(400).json({ erro: 'Erro ao atualizar dados pessoais.' });
        }
    },
    async atualizarLogin(request, response) {
        try {
            const { id } = request.params;
            let { email } = request.body;
            email = email.trim();
            const dataEhoraDeAgora = new Date();
            const emailExiste = await (0, connection_1.default)('clientes')
                .where({ email })
                .select('email')
                .first();
            if (emailExiste) {
                return response.status(400).json({ erro: 'Esse e-mail já existe.' });
            }
            await (0, connection_1.default)('clientes')
                .update({
                email,
                atualizado_em: dataEhoraDeAgora
            })
                .where({ id });
            const clientes = await (0, connection_1.default)('clientes')
                .join('sexos', 'sexos.id', '=', 'clientes.sexo_id')
                .join('cidades', 'cidades.id', '=', 'clientes.cidade_id')
                .where('clientes.id', id)
                .select([
                'clientes.id',
                'clientes.nome',
                'clientes.cpf',
                'clientes.sexo_id',
                'sexos.sexo',
                'clientes.telefone',
                'clientes.celular',
                'clientes.cidade_id',
                'cidades.cidade',
                'clientes.bairro',
                'clientes.logradouro',
                'clientes.numero',
                'clientes.complemento',
                'clientes.cep',
                'clientes.email'
            ])
                .first();
            const imagens = await (0, connection_1.default)('imagens')
                .where('cliente_id', id)
                .select(['imagem', 'imagem_aws_url'])
                .first();
            const dados = {
                clientes,
                imagens
            };
            const clienteSerializado = Object.assign(Object.assign({}, dados), { imagem_local_url: `${process.env.APP_URL}/uploads/${imagens.imagem}` });
            return response.status(201).json({
                cliente: clienteSerializado.clientes,
                imagem_url: process.env.STORAGE_TYPE === 'local'
                    ? clienteSerializado.imagem_local_url
                    : clienteSerializado.imagens.imagem_aws_url
            });
        }
        catch (erro) {
            return response.status(400).json({ erro: 'Erro ao atualizar login.' });
        }
    },
    async atualizarFoto(request, response) {
        try {
            const { id } = request.params;
            const { key: imagem, location: imagem_aws_url = '' } = request.file;
            const dataEhoraDeAgora = new Date();
            const imagemNoBancoDeDados = await (0, connection_1.default)('imagens')
                .where('cliente_id', id)
                .select(['imagem', 'imagem_aws_url'])
                .first();
            if (process.env.STORAGE_TYPE === 'local') {
                (0, util_1.promisify)(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', `uploads/${imagemNoBancoDeDados.imagem}`));
            }
            else {
                s3.deleteObject({
                    Bucket: 'roseestetica-upload',
                    Key: imagemNoBancoDeDados.imagem
                }).promise();
            }
            await (0, connection_1.default)('imagens')
                .update({
                imagem,
                imagem_aws_url,
                atualizado_em: dataEhoraDeAgora
            })
                .where('cliente_id', id);
            const imagemAtualizada = await (0, connection_1.default)('imagens')
                .where('cliente_id', id)
                .select(['imagem', 'imagem_aws_url'])
                .first();
            const clienteSerializado = {
                imagemAtualizada,
                imagem_local_url: `${process.env.APP_URL}/uploads/${imagemAtualizada.imagem}`
            };
            return response.status(201).json({
                imagem_url: process.env.STORAGE_TYPE === 'local'
                    ? clienteSerializado.imagem_local_url
                    : clienteSerializado.imagemAtualizada.imagem_aws_url
            });
        }
        catch (error) {
            if (!request.file) {
                return response.status(400).json({ erro: 'O campo foto é obrigatório.' });
            }
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
            return response.status(400).json({ erro: 'Erro ao atualizar a foto.' });
        }
    },
    async esqueciMinhaSenha(request, response) {
        try {
            let { email } = request.body;
            email = email.trim();
            const cliente = await (0, connection_1.default)('clientes')
                .where({ email }).select('email').first();
            if (!cliente) {
                return response.status(400).json({ erro: 'E-mail inválido.' });
            }
            const token = (0, crypto_1.randomBytes)(5).toString('hex');
            const expiracaoResetSenha = new Date();
            expiracaoResetSenha.setHours(expiracaoResetSenha.getHours() + 1);
            await (0, connection_1.default)('clientes')
                .update({
                token_reset_senha: token,
                expiracao_reset_senha: expiracaoResetSenha
            }).where({ email });
            const mail = {
                subject: `Recuperar senha, seu código é: ${token}`,
                from: '"Rose estética" <lucaorxrx@gmail.com>',
                to: email,
                template: 'esqueci_minha_senha',
                context: { token }
            };
            mailer_1.default.sendMail(mail, async (erro) => {
                if (erro != null) {
                    return response.status(400).json({
                        mailerError: 'Não foi possível enviar o email para recuperação de senha.'
                    });
                }
                return response.status(200).json({
                    mensagem: 'Um token foi enviado para o seu e-mail, vizualize sua caixa de entrada,span ou lixeira.'
                });
            });
        }
        catch (erro) {
            return response.status(400).json({
                erro: 'Não foi possível enviar o email para recuperação de senha.'
            });
        }
    },
    async atualizarSenha(request, response) {
        const { email, token } = request.body;
        const senha = await bcryptjs_1.default.hash(request.body.senha, 8);
        const cliente = await (0, connection_1.default)('clientes')
            .where({ email })
            .select('token_reset_senha', 'expiracao_reset_senha')
            .first();
        if (!cliente) {
            return response.status(400).json({ EmailError: 'E-mail inválido.' });
        }
        if (token !== cliente.token_reset_senha) {
            return response.status(400).json({ TokenError: 'Token inválido.' });
        }
        const dataEhoraDeAgora = new Date();
        if (dataEhoraDeAgora > cliente.expiracao_reset_senha) {
            return response.status(400).json({ erro: 'O token expirou, gere um novo.' });
        }
        await (0, connection_1.default)('clientes').update({
            senha,
            atualizado_em: dataEhoraDeAgora
        }).where({ email });
        await (0, connection_1.default)('clientes').update({
            token_reset_senha: null,
            expiracao_reset_senha: null
        }).where({ email });
        return response.status(201).json({ mensagem: 'Sua senha foi alterada com sucesso.' });
    },
    async deletar(request, response) {
        try {
            const { id } = request.params;
            const imagem = await (0, connection_1.default)('imagens')
                .where('cliente_id', id)
                .first();
            if (process.env.STORAGE_TYPE === 'local') {
                (0, util_1.promisify)(fs_1.default.unlink)(path_1.default.resolve(__dirname, '..', '..', `uploads/${imagem.imagem}`));
            }
            else {
                s3.deleteObject({
                    Bucket: 'roseestetica-upload',
                    Key: imagem.imagem
                }).promise();
            }
            await (0, connection_1.default)('clientes').where({ id }).del();
            return response.status(204).json();
        }
        catch (error) {
            return response.status(400).json({ erro: 'Erro ao deletar usuário.' });
        }
    }
};
