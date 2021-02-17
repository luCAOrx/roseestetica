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
  // ADMIN
  async autenticacao(request, response, next) {
    try {
      const { email, senha } = request.body;

      const admin = await connection('admins').where({ email }).select('*').first();
  
      if(!admin) {
        return response.status(400).send({ erro: 'E-mail inválido.' });

      }
  
      if(!await bcrypt.compare(senha, admin.senha)) {
        return response.status(400).send({ erro: 'Senha inválida.' });

      }

      admin.senha = undefined;
      admin.token_reset_senha = undefined;
      admin.expiracao_reset_senha = undefined;
      admin.criado_em = undefined;
      admin.atualizado_em = undefined;

      response.send({ 
        admin, 
        token: gerarToken({ id: admin.id }),
      });

    } catch (erro) {
        next(response.status(400).send({ erro: 'Erro em se autenticar.' }));
    }
  },
  
  async cadastrar(request, response, next) {
    try {
      const senha = bcrypt.hashSync(request.body.senha, 10);
      
      const { email } = request.body;

      if(await connection('admins').where({ email }).select('email').first()) 
        return response.status(400).send({ erro: 'Esse email ja existe.' });
              
      await connection('admins').insert({ email, senha });

      
      const admin = await connection('admins').where('email' ,request.body.email).select('*').first();
      
      admin.senha = undefined;
      admin.token_reset_senha = undefined;
      admin.expiracao_reset_senha = undefined;
      admin.criado_em = undefined;
      admin.atualizado_em = undefined;

      return response.status(201).send({ 
        admin, 
        token: gerarToken({ id: admin.id })
      });
      
    } catch (erro) {
      next(response.status(400).send({ erro: 'Erro ao se cadastrar.' }));
    }
  },

  async atualizarDadosDeLogin(request, response, next) {
    try {
      const { id } = request.params;
      const { email } = request.body;

      const dataEhoraDeAgora = new Date();
      dataEhoraDeAgora.setHours(dataEhoraDeAgora.getHours());
      dataEhoraDeAgora.setDate(dataEhoraDeAgora.getDate());

      if(await connection('admins').where({ email }).select('email').first())
        return response.status(400).send({ erro: 'Esse e-mail ja existe.' })

      await connection('admins').update({ email, atualizado_em: dataEhoraDeAgora }).where('id', id);

      return response.status(201).send({ mensagem: 'Seu login foi atualizado com sucesso.' });

    } catch (erro) {
      next(response.status(400).send({ erro: 'Erro ao atualizar login.' }));
    }
  },

  async esqueciMinhaSenha(request, response, next) {
    const { email } = request.body;

    try {
      const admin = await connection('admins').where('email', email).select('email').first();

      if(!admin)
        return response.status(400).send({ erro: 'Email inválido.' });

      const token = crypto.randomBytes(20).toString('hex');

      const horaDeAgora = new Date();
      horaDeAgora.setHours(horaDeAgora.getHours() + 1);

      await connection('admins')
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
      next(response.status(400).send({ erro: 'Erro ao tentar recuperar senha.' }))
    }
  },

  async atualizarSenha(request, response, next) {
    const { email, token} = request.body;

    const senha = bcrypt.hashSync(request.body.senha, 10);

    try {
      const admin = await connection('admins')
      .where('email', email)
      .select('email', 'senha', 'token_reset_senha', 'expiracao_reset_senha')
      .first();

      if(!admin)
        return response.status(400).send({ erro: 'Email inválido.' });
      
      if(token !== admin.token_reset_senha)
        return response.status(400).send({ erro: 'Token inválido.' });

      const horaDeAgora = new Date();

      if(horaDeAgora > admin.expiracao_reset_senha)
        return response.status(400),send({ erro: 'O token expirou, gere um novo.' });

      admin.senha = senha;

      await connection('admins').update({ senha }).where({ email });

      response.status(201).send({ mensagem: 'Sua senha foi alterada com sucesso.' });

    } catch (erro) {
      next(response.status(400).send({ erro: 'Erro ao tentar atualizar sua senha.' }));
    }
  },
  // OPERAÇÕES DO ADMIN
  async listarTodosClientes(request, response, next) {
    try {
      const { page = 1 } = request.query;

      const [count] = await connection('clientes').count();

      const clientes = await connection('clientes')
      .limit(5)
      .offset((page - 1) * 5)
      .join('sexos', 'sexos.id', '=', 'clientes.sexo_id')
      .join('cidades', 'cidades.id', '=', 'clientes.cidade_id')
      .select([
        'clientes.id',
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
        'clientes.criado_em',
        'clientes.atualizado_em',
      ]);

      response.header('X-Total-Count', count['count(*)']);

      return response.send(clientes);

    } catch (erro) {
        next(response.status(400).send({ erro: 'Erro em listar clientes.' }))
    }
  },

  async buscarClientes(request, response, next) {
    try {
      const { 
        page = 1,
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
        sexo,
        cidade,
      } = request.query;

      const clientes = await connection('clientes')
      .limit(5)
      .offset((page - 1) * 5)
      .join('sexos', 'sexos.id', '=', 'clientes.sexo_id')
      .join('cidades', 'cidades.id', '=', 'clientes.cidade_id')
      .where('nome', 'like', `%${nome}%`)
      .orWhere('cpf', 'like', `%${cpf}%`)
      .orWhere('telefone', 'like', `%${telefone}%`)
      .orWhere('celular', 'like', `%${celular}%`)
      .orWhere('bairro', 'like', `%${bairro}%`)
      .orWhere('logradouro', 'like', `%${logradouro}%`)
      .orWhere('numero', 'like', `%${numero}%`)
      .orWhere('complemento', 'like', `%${complemento}%`)
      .orWhere('cep', 'like', `%${cep}%`)
      .orWhere('email', 'like', `%${email}%`)
      .orWhere('sexo', 'like', `%${sexo}%`)
      .orWhere('cidade', 'like', `%${cidade}%`)
      .select([
        'clientes.id',
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
        'clientes.criado_em',
        'clientes.atualizado_em',
      ]);

      return response.send(clientes);

    } catch (erro) {
      console.log(erro)
        next(response.status(400).send({ erro: 'Erro em buscar clientes.' }))
    }
  },

  async listarAgendamentoDoDia(request, response, next) {
    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth();
    const ano = data.getFullYear();
    const dataDoDia = new Date(ano, mes, dia);

    try {
      const agendamentoDoDia = await connection('agendamentos')
      .from('horarios')
      .leftJoin('agendamentos', 'horarios.id', 'agendamentos.horario_id')
      .join('procedimentos', 'procedimentos.id', '=', 'agendamentos.procedimento_id')
      .join('clientes', 'clientes.id', '=', 'agendamentos.cliente_id')
      .select(
        'agendamentos.id',
        'clientes.nome',
        'data',
        'horario',
        'procedimentos.procedimento',
        'procedimentos.preco',
        )
      .where('data', dataDoDia)

      return response.send(agendamentoDoDia)

    } catch (erro) {
      next(response.status(400).send({ erro: 'Erro ao listar agendamento do dia.' }))
    }
  },

  async listarAgendamentos(request, response, next) {
    try {
      const { page = 1 } = request.query;

      const [count] = await connection('clientes').count();
      
      const agendamentos = await connection('agendamentos')
      .limit(5)
      .offset((page - 1) * 5)
      .join('procedimentos', 'procedimentos.id', '=', 'agendamentos.procedimento_id')
      .join('horarios', 'horarios.id', '=', 'agendamentos.horario_id')
      .join('clientes', 'clientes.id', '=', 'agendamentos.cliente_id')
      .select([
        'agendamentos.id',
        'clientes.nome',
        'agendamentos.data',
        'horarios.horario',
        'procedimentos.procedimento',
        'procedimentos.preco',
        'agendamentos.situacao',
        'agendamentos.agendado_em',
        'agendamentos.remarcado_em'
      ]);

      response.header('X-Total-Count', count['count(*)']);

      return response.send(agendamentos);

    } catch (erro) {
      next(response.status(400).send({ erro: 'Falha ao listar agendamentos!' }));
    }
  },

  async buscarAgendamentos(request, response, next) {
    try {
      const { page = 1, nome, data, horario, procedimento, preco, situacao} = request.query;

      const agendamentos = await connection('agendamentos')
      .limit(5)
      .offset((page - 1) * 5)
      .join('procedimentos', 'procedimentos.id', '=', 'agendamentos.procedimento_id')
      .join('horarios', 'horarios.id', '=', 'agendamentos.horario_id')
      .join('clientes', 'clientes.id', '=', 'agendamentos.cliente_id')
      .where('nome', 'like', `%${nome}%`)
      .orWhere('data', 'like', `%${data}%`)
      .orWhere('horario', 'like', `%${horario}%`)
      .orWhere('procedimento', 'like', `%${procedimento}%`)
      .orWhere('preco', 'like', `%${preco}%`)
      .orWhere('situacao', 'like', `%${situacao}%`)
      .select([
        'agendamentos.id',
        'clientes.nome',
        'agendamentos.data',
        'horarios.horario',
        'procedimentos.procedimento',
        'procedimentos.preco',
        'agendamentos.situacao',
        'agendamentos.agendado_em',
        'agendamentos.remarcado_em'
      ]);

      return response.send(agendamentos);

    } catch (erro) {
        next(response.status(400).send({ erro: 'Erro em buscar agendamento.' }))
    }
  },
  // CLIENTE
  async cadastrarCliente(request, response, next) {
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

      return response.status(201).send({ mensagem: 'Cliente cadastrado com sucesso.' });
      
    } catch (erro) {
        next(response.status(400).send({ erro: 'Erro em cadastrar cliente.' }));
      }
  },

  async deletarCliente(request, response, next) {
    try {
      const { id } = request.params;

      await connection('clientes').where({ id }).del();

      return response.status(204).send();

    } catch (error) {
      next(response.status(400).send({ erro: 'Erro em deletar cliente.' }));
    }
  },
  // AGENDAMENTO DO CLIENTE
  async agendar(request, response, next) {
    const { data, procedimento_id, horario_id} = request.body;
    const { id } = request.params;
    const ocupado = 'ocupado';

    try {
      if (await connection('agendamentos').where({ horario_id: horario_id, data: data }).select('horario_id').first())
        return response.status(400).send({ mensagem: 'Horário indisponível,agende para outro dia/horário.' })

      await connection('agendamentos')
      .where('id', id)
      .insert({
        data, situacao: ocupado, procedimento_id, cliente_id: id, horario_id
      });

      return response.status(201).send({ mensagem: 'Atendimento agendado com sucesso!' });

    } catch (erro) {
      console.log(erro)
      next(response.status(400).send({ erro: 'Erro ao agendar cliente!' }));
    }
  },

  async remarcar(request, response, next) {
    const dataEhoraDeAgora = new Date();
    dataEhoraDeAgora.setHours(dataEhoraDeAgora.getHours());
    dataEhoraDeAgora.setDate(dataEhoraDeAgora.getDate());

    const { data, horario_id} = request.body;
    const { id, cliente_id } = request.params;

    try {
      if(await connection('agendamentos').where({ horario_id: horario_id, data: data }).select('horario_id').first())
        return response.status(400).send({ mensagem: 'Horário indisponível,agende para outro dia/horário.' });
        
        await connection('agendamentos')
        .update({
          data, horario_id, remarcado_em: dataEhoraDeAgora
        })
        .where('id', id).andWhere('cliente_id', cliente_id);

        return response.status(201).send({ mensagem: 'Atendimento remarcado com sucesso.' });

    } catch (erro) {
      next(response.status(400).send({ erro: 'Erro ao remarcar agendamento do cliente.' }));
    }
  },

  async alterarProcedimento(request, response, next) {
    const { procedimento_id } = request.body;
    const { id, cliente_id } = request.params;

    try {
      await connection('agendamentos')
      .update({
        procedimento_id
      })
      .where('id', id).andWhere('cliente_id', cliente_id);

      return response.status(201).send({ mensagem: 'Procedimento alterado com sucesso.' });

    } catch (erro) {
      next(response.status(400).send({ erro: 'Erro ao remarcar agendamento do cliente.' }));
    }
  },

  async listarHorariosDisponiveis(request, response, next) {
    const { data } = request.query;

    try {
      const horariosDisponiveis = await connection('agendamentos')
      .from('horarios')
      .leftJoin('agendamentos', 'horarios.id', 'agendamentos.horario_id')
      .select(
        'agendamentos.id',
        'data',
        'horario',
        'situacao'
      )
      .where('data', data)

      return response.send(horariosDisponiveis)

    } catch (erro) {
      next(response.status(400).send({ erro: 'Erro ao listar agendamentos disponíveis.' }))
    }
  },

  async cancelar(request, response, next) {
    const { id } = request.params;

    try {
      await connection('agendamentos').where('id', id).del();

      return response.status(204).send();

    } catch (erro) {
      next(response.status(400).send({ erro: 'Falha ao cancelar agendamento do cliente.' }));
    }
  }
}