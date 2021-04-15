import { Request, Response, NextFunction } from 'express';

import connection from '../database/connection';

import { compare, hashSync } from 'bcryptjs';

import { sign } from 'jsonwebtoken';

import { randomBytes } from 'crypto';

import mailer from '../modules/mailer';

import authConfig from '../config/auth';

function gerarToken(params: {}) {
  return sign(params, authConfig.secret, {
    expiresIn: 86400 * 1000
  });
}

export default {
  async autenticar(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, senha } = request.body;
  
      const cliente = await connection('clientes').where({ email }).select('*').first();
  
      if (!cliente)
        return response.status(400).json({ erro: 'E-mail ou senha inválido.' });

      const senhaSalvaNoBancoDeDados = await compare(senha, cliente.senha);
  
      if (!senhaSalvaNoBancoDeDados)
        return response.status(400).json({ erro: 'E-mail ou senha inválido.' });
  
      cliente.senha = undefined;
      cliente.token_reset_senha = undefined;
      cliente.expiracao_reset_senha = undefined;
      cliente.criado_em = undefined;
      cliente.atualizado_em = undefined;
  
      response.json({
        cliente,
        token: gerarToken({ id: cliente.id }),
      });
  
    } catch (erro) {
      return response.status(400).json({ erro: 'Erro em se autenticar.' });
    }
  },

  async listarDadosPessoais(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
  
      const cliente = await connection('clientes')
        .join('sexos', 'sexos.id', '=', 'clientes.sexo_id')
        .join('cidades', 'cidades.id', '=', 'clientes.cidade_id')
        .where('clientes.id', id)
        .select([
          'clientes.nome',
          'clientes.cpf',
          'sexos.sexo',
          'clientes.telefone',
          'clientes.celular',
          'cidades.cidade',
          'clientes.bairro',
          'clientes.logradouro',
          'clientes.numero',
          'clientes.complemento',
          'clientes.cep',
          'clientes.email',
        ])
        .first();
  
      return response.json(cliente);
  
    } catch (erro) {
      return response.status(400).json({ erro: 'Erro ao listar dados pessoais.' });
    }
  },

  async cadastrar(request: Request, response: Response, next: NextFunction) {
    try {
      const senha = hashSync(request.body.senha, 8);
  
      const {
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
        cidade_id,
      } = request.body;

      const dataEhoraDeAgora = new Date();

      const cpfExistente = await connection('clientes')
      .where({ cpf }).select('cpf').first();

      const emailExistente = await connection('clientes')
      .where({ email }).select('email').first();
  
      if (cpfExistente)
        return response.status(400).json({ erro: 'Esse cpf ja existe.' });
  
      if (emailExistente)
        return response.status(400).json({ erro: 'Esse e-mail ja existe.' });
  
      await connection('clientes').insert({
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
      });
  
      const cliente = await connection('clientes')
      .where({ cpf }).select('*').first();
  
      cliente.senha = undefined;
      cliente.token_reset_senha = undefined;
      cliente.expiracao_reset_senha = undefined;
      cliente.criado_em = undefined;
      cliente.atualizado_em = undefined;
  
      return response.status(201).json({
        cliente,
        token: gerarToken({ id: cliente.id }),
      });
    } catch (erro) {
      return response.status(400).json({ erro: 'Falha ao se cadastrar.' })
    }
  },

  async atualizarDadosPessoais(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
  
      const dataEhoraDeAgora = new Date();
  
      const {
        nome,
        telefone,
        celular,
        sexo_id,
        cidade_id,
        bairro,
        logradouro,
        numero,
        complemento,
        cep
      } = request.body;
  
      await connection('clientes')
        .update({
          nome,
          telefone,
          celular,
          sexo_id,
          cidade_id,
          bairro,
          logradouro,
          numero,
          complemento,
          cep,
          atualizado_em: dataEhoraDeAgora
        })
        .where({ id });
  
      return response.status(201).json({ mensagem: 'Dados pessoais atualizados com sucesso.' });
  
    } catch (erro) {
      return response.status(400).json({ erro: 'Erro ao atualizar dados pessoais.' });
    }
  },

  async atualizarDadosDeLogin(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const { email } = request.body;
  
      const dataEhoraDeAgora = new Date();

      const emailExistente = await connection('clientes')
      .where({ email }).select('email').first();
  
      if (emailExistente)
        return response.status(400).json({ erro: 'Esse e-mail já existe.' });
  
      await connection('clientes')
      .update({ email, atualizado_em: dataEhoraDeAgora }).where({ id });
  
      return response.status(201).json({ mensagem: 'Seu login foi atualizado com sucesso.' });
  
    } catch (erro) {
      return response.status(400).json({ erro: 'Erro ao atualizar login.' });
    }
  },

  async esqueciMinhaSenha(request: Request, response: Response, next: NextFunction) {
    try {
      const { email } = request.body;
      
      const cliente = await connection('clientes')
      .where({ email }).select('email').first();
  
      if (!cliente)
        return response.status(400).json({ erro: 'E-mail inválido.' });
  
      const token = randomBytes(20).toString('hex');
  
      const expiracaoResetSenha = new Date();
      expiracaoResetSenha.setHours(expiracaoResetSenha.getHours() + 1);
  
      await connection('clientes')
        .update({
          token_reset_senha: token,
          expiracao_reset_senha: expiracaoResetSenha
        }).where({ email });

      const mail = {
        subject: 'Recuperar senha',
        from: 'suporte@roseestetica.com',
        to: email,
        template: 'esqueci_minha_senha',
        context: { token },
      }
  
      mailer.sendMail(mail, async (erro) => {
        if(erro)
          return response.status(400).json({ 
            erro: 'Não foi possível enviar o email para recuperação de senha.' 
          });

        return response.status(200).json({
          mensagem: 'Um token foi enviado para o seu e-mail, vizualize sua caixa de entrada,span ou lixeira.'
        });
      });
      
    } catch (erro) {
      return response.status(400).json({ 
        erro: 'Não foi possível enviar o email para recuperação de senha.' 
      });
    }
  },

  async atualizarSenha(request: Request, response: Response, next: NextFunction) {
    
      const { email, token } = request.body;
    
      const senha = hashSync(request.body.senha, 8);

      const cliente = await connection('clientes')
        .where({ email })
        .select('token_reset_senha', 'expiracao_reset_senha')
        .first();

      if (!cliente)
        return response.status(400).json({ erro: 'E-mail inválido.' });
  
      if (token !== cliente.token_reset_senha)
        return response.status(400).json({ erro: 'Token inválido.' });
  
      const dataEhoraDeAgora = new Date();
  
      if (dataEhoraDeAgora > cliente.expiracao_reset_senha)
        return response.status(400).json({ erro: 'O token expirou, gere um novo.' });
  
      await connection('clientes').update({ 
        senha,
        atualizado_em: dataEhoraDeAgora
      }).where({ email });
  
      response.status(201).json({ mensagem: 'Sua senha foi alterada com sucesso.' });
  
  },

  async deletar(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
  
      await connection('clientes').where({ id }).del();
  
      return response.status(204).json();
  
    } catch (error) {
      next(response.status(400).json({ erro: 'Erro em deletar usuário.' }));
    }
  }
};