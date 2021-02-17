const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

const authConfig = require('../config/auth.json');

function gerarToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

module.exports = {
  async autenticar(request, response, next) {
    try {
      const { email, senha } = request.body;

      const cliente = await connection('clientes').where({ email }).select('*').first();

      if(!cliente)
        return response.status(400).send({ erro: 'E-mail inválido.' });
        
      if(!await bcrypt.compare(senha, cliente.senha))
        return response.status(400).send({ erro: 'Senha inválida.' });

      cliente.senha = undefined;
      cliente.token_reset_senha = undefined;
      cliente.expiracao_reset_senha = undefined;
      cliente.criado_em = undefined;
      cliente.atualizado_em = undefined;

      response.send({ 
        cliente, 
        token: gerarToken({ id: cliente.id }),
      });

    } catch (erro) {
        next(response.status(400).send({ erro: 'Erro em se autenticar.' }));
    }
  },

  async listarDadosPessoais(request, response, next) {
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

      return response.send(cliente)
      
    } catch (erro) {
        next(response.status(400).send({ erro: 'Erro ao listar dados pessoais.' }));
    }
  },

  async cadastrar(request, response, next) {
    try {
      const senha = bcrypt.hashSync(request.body.senha, 10);
      
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

      if(await connection('clientes').where({ cpf }).select('cpf').first())
        return response.status(400).send({ erro: 'Esse cpf ja existe.' });

      if(await connection('clientes').where({ email }).select('email').first()) 
        return response.status(400).send({ erro: 'Esse e-mail ja existe.' })
              
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
      });

      const cliente = await connection('clientes').where('cpf' ,request.body.cpf).select('*').first();

      cliente.senha = undefined;
      cliente.token_reset_senha = undefined;
      cliente.expiracao_reset_senha = undefined;
      cliente.criado_em = undefined;
      cliente.atualizado_em = undefined;
      
      return response.status(201).send({ 
        cliente, 
        token: gerarToken({ id: cliente.id }),
      });
      
    } catch (erro) {
        next(response.status(400).send({ erro: 'Erro ao se cadastrar.' }));
      }
  },

  async atualizarDadosPessoais(request, response, next) {
    try {
      const { id } = request.params;

      const dataEhoraDeAgora = new Date();
      dataEhoraDeAgora.setHours(dataEhoraDeAgora.getHours());
      dataEhoraDeAgora.setDate(dataEhoraDeAgora.getDate());
      
      const {
        nome,
        telefone, 
        celular, 
        bairro, 
        logradouro, 
        numero, 
        complemento, 
        cep,
        cidade_id,
      } = request.body;

      await connection('clientes')
      .update({
        nome,
        telefone, 
        celular, 
        bairro, 
        logradouro, 
        numero, 
        complemento, 
        cep,
        atualizado_em: dataEhoraDeAgora,
        cidade_id,
      })
      .where('id', id);

      return response.status(201).send({ mensagem: 'Dados pessoais atualizados com sucesso.' });

    } catch (erro) {
      next(response.status(400).send({ erro: 'Erro ao atualizar dados pessoais.' }));
    }
  },

  async atualizarDadosDeLogin(request, response, next) {
    try {
      const { id } = request.params;
      const { email } = request.body;

      const dataEhoraDeAgora = new Date();
      dataEhoraDeAgora.setHours(dataEhoraDeAgora.getHours());
      dataEhoraDeAgora.setDate(dataEhoraDeAgora.getDate());

      if(await connection('clientes').where({ email }).select('email').first())
        return response.status(400).send({ erro: 'Esse e-mail ja existe.' })

      await connection('clientes').update({ email, atualizado_em: dataEhoraDeAgora }).where('id', id);

      return response.status(201).send({ mensagem: 'Seu login foi atualizado com sucesso.' });

    } catch (erro) {
      next(response.status(400).send({ erro: 'Erro ao atualizar login.' }));
    }
  },

  async esqueciMinhaSenha(request, response, next) {
    const { email} = request.body;

    try {
      const cliente = await connection('clientes').where('email', email).select('email').first();

      if(!cliente)
        return response.status(400).send({ erro: 'E-mail inválido.' });

      const token = crypto.randomBytes(20).toString('hex');

      const horaDeAgora = new Date();
      horaDeAgora.setHours(horaDeAgora.getHours() + 1);

      await connection('clientes')
      .update({
        token_reset_senha: token,
        expiracao_reset_senha: horaDeAgora
      })
      .where({ email })

      mailer.sendMail({
        to: email,
        from: 'lucaorx@protonmail.com',
        template: 'esqueci_minha_senha',
        context: { token },
      }, (erro) => {
        if(erro)
        return response.status(400).send({ erro: 'Não foi possível enviar o email para recuperação de senha.' });

        return response.status(200).send({
          mensagem: 'Um token foi enviado para o seu e-mail, vizualize sua caixa de entrada,span ou lixeira.'
        });
      });

    } catch (erro) {
      console.log(erro)
      next(response.status(400).send({ erro: 'Erro ao tentar enviar e-mail para recuperar senha.' }))
    }
  },

  async atualizarSenha(request, response, next) {
    const { email, token} = request.body;

    const senha = bcrypt.hashSync(request.body.senha, 10);

    try {
      const cliente = await connection('clientes')
      .where('email', email)
      .select('email', 'senha', 'token_reset_senha', 'expiracao_reset_senha')
      .first();

      if(!cliente)
        return response.status(400).send({ erro: 'E-mail inválido.' });
      
      if(token !== cliente.token_reset_senha)
        return response.status(400).send({ erro: 'Token inválido.' });

      const horaDeAgora = new Date();

      if(horaDeAgora > cliente.expiracao_reset_senha)
        return response.status(400),send({ erro: 'O token expirou, gere um novo.' });

      cliente.senha = senha;

      await connection('clientes').update({ senha}).where({ email });

      response.status(201).send({ mensagem: 'Sua senha foi alterada com sucesso.' });

    } catch (erro) {
      next(response.status(400).send({ erro: 'Erro ao tentar recuperar senha.' }));
    }
  },

  async deletar(request, response, next) {
    try {
      const { id } = request.params;

      await connection('clientes').where({ id }).del();

      return response.status(204).send();

    } catch (error) {
      next(response.status(400).send({ erro: 'Erro em deletar usuário.' }));
    }
  }
};