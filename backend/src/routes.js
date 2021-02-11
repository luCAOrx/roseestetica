const express = require('express');
const routes = express.Router();
const { Joi, Segments, celebrate } = require('celebrate');

const authMiddleware = require('./midllewares/auth');

const HorariosController = require('./controller/HorariosController');

const ClienteController = require('./controller/ClienteController');
const ClienteValidation = require('./validation/ClienteValidation');

const AgendamentoController = require('./controller/AgendamentoController');
const AgendamentoValidation = require('./validation/AgendamentoValidation');

const AdminController = require('./controller/AdminController');
const AdminValidation = require('./validation/AdminValidation');

// VALIDAÇÕES PARA QUERY PARAMS E PARAMS
const paramsIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().messages({
      "number.base": `O parâmetro "id" não permite letras.`,
      "number.empty": `O parâmetro "id" não pode ficar vazio.`,
      "any.required": `O parâmetro "id" é obrigatório.`
    }).required()
  })
});

const paramsClienteIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().messages({
      "number.base": `O parâmetro "id" não permite letras.`,
      "number.empty": `O parâmetro "id" não pode ficar vazio.`,
      "any.required": `O parâmetro "id" é obrigatório.`
    }).required(),

    cliente_id: Joi.number().messages({
      "number.base": `O parâmetro "cliente_id" não permite letras.`,
      "number.empty": `O parâmetro "cliente_id" não pode ficar vazio.`,
      "any.required": `O parâmetro "cliente_id" é obrigatório.`
    }).required()
  })
});

const queryPageAgendamentoValidation = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().messages({
      "number.base": `O parâmetro "page" não permite letras.`,
      "number.empty": `O parâmtro "page" não pode ficar vazio.`,
      "any.required": `"page" é obrigatório.`
    }).required(),

    cliente_id: Joi.number().messages({
      "number.base": `O parâmetro "cliente_id" não permite letras.`,
      "number.empty": ` O parâmetro "cliente_id" não pode ficar vazio.`,
      "any.required": `O parâmetro"cliente_id" é um campo obrigatório.`
    }).required()
  })
});

routes.get('/horarios', HorariosController.listarHorarios);

// INICIANDO ROTAS PARA CLIENTE
routes.post('/login',
ClienteController.autenticar
);

routes.post('/cadastro', 
ClienteValidation.cadastrar,
ClienteController.cadastrar
);

routes.get('/perfil/:id',
authMiddleware,
paramsIdValidation,
ClienteController.listarDadosPessoais
);

routes.put('/atualizar_dados_pessoais/:id',
authMiddleware,
paramsIdValidation,
ClienteValidation.atualizarDadosPessoais,
ClienteController.atualizarDadosPessoais
);

routes.put('/atualizar_login/:id',
authMiddleware,
paramsIdValidation,
ClienteValidation.atualizarDadosDeLogin,
ClienteController.atualizarDadosDeLogin
);

routes.post('/esqueci_minha_senha/',
ClienteValidation.esqueciMinhaSenha,
ClienteController.esqueciMinhaSenha
);

routes.put('/atualizar_senha/',
ClienteValidation.atualizarSenha,
ClienteController.atualizarSenha
);

routes.delete('/deletar/:id',
authMiddleware,
paramsIdValidation,
ClienteController.deletar);

// AGENDAMENTOS PARA O CLIENTE
routes.get('/agendamentos_disponiveis',
authMiddleware,
AgendamentoController.listarHorariosDisponiveis
);

routes.get('/meus_agendamentos',
authMiddleware,
queryPageAgendamentoValidation,
AgendamentoController.listarAgendamentosDoCliente
);

routes.post('/agendar/:id',
authMiddleware,
paramsIdValidation,
AgendamentoValidation.agendar,
AgendamentoController.agendar
);

routes.put('/remarcar/:id/:cliente_id',
authMiddleware,
paramsClienteIdValidation,
AgendamentoValidation.remarcar,
AgendamentoController.remarcar
);

routes.put('/alterar_procedimento/:id/:cliente_id',
authMiddleware,
paramsClienteIdValidation,
AgendamentoValidation.alterarProcedimento,
AgendamentoController.alterarProcedimento
);

routes.delete('/cancelar/:id',
authMiddleware,
paramsIdValidation,
AgendamentoController.cancelar
);

// INICIANDO ROTAS PARA ADMIN
routes.post('/admin_login',
AdminController.autenticacao
);

routes.post('/admin_cadastro',
AdminValidation.cadastrar,
AdminController.cadastrar
);

routes.put('/admin_atualizar_login/:id',
authMiddleware,
paramsIdValidation,
AdminValidation.atualizarDadosDeLogin,
AdminController.atualizarDadosDeLogin
);

routes.post('/admin_esqueci_minha_senha',
AdminValidation.esqueciMinhaSenha,
AdminController.esqueciMinhaSenha
);

routes.put('/admin_atualizar_senha',
AdminValidation.atualizarSenha,
AdminController.atualizarSenha
);

routes.get('/admin_agendamentos_do_dia',
authMiddleware,
AdminController.listarAgendamentoDoDia
);

routes.get('/admin_listar_todos_clientes',
authMiddleware,
AdminController.listarTodosClientes
);

routes.get('/admin_buscar_clientes',
authMiddleware,
AdminController.buscarClientes
);

routes.get('/admin_listar_agendamentos',
authMiddleware,
AdminController.listarAgendamentos
);

routes.get('/admin_buscar_agendamentos',
authMiddleware,
AdminController.buscarAgendamentos
);
// CLIENTE
routes.post('/admin_cadastro_cliente',
AdminValidation.cadastrarCliente,
AdminController.cadastrarCliente
);

routes.delete('/admin_deletar_cliente/:id',
authMiddleware,
paramsIdValidation,
AdminController.deletarCliente);
// AGENDAMENTOS
routes.post('/admin_agendar/:id',
authMiddleware,
paramsIdValidation,
AdminValidation.agendar,
AdminController.agendar
);

routes.put('/admin_remarcar/:id/:cliente_id',
authMiddleware,
paramsClienteIdValidation,
AdminValidation.remarcar,
AdminController.remarcar
);

routes.put('/admin_alterar_procedimento/:id/:cliente_id',
authMiddleware,
paramsClienteIdValidation,
AdminValidation.alterarProcedimento,
AdminController.alterarProcedimento
);

routes.get('/admin_agendamentos_disponiveis',
authMiddleware,
AdminController.listarHorariosDisponiveis
);

routes.delete('/admin_cancelar/:id',
authMiddleware,
paramsIdValidation,
AdminController.cancelar
);

module.exports = routes;