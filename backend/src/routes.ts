import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'
import AgendamentoController from './controllers/AgendamentoController'
import CidadesController from './controllers/CidadesController'
import ClienteController from './controllers/ClienteController'
import GenerosController from './controllers/GenerosController'
import HorariosController from './controllers/HorariosController'
import ProcedimentosController from './controllers/ProcedimentosController'
import authMiddleware from './middlewares/authMidleware'
import authMidlewareWithFile from './middlewares/authMidlewareWithFile'
import AgendamentoValidation from './validations/AgendamentoValidation'
import ClienteValidation from './validations/ClienteValidation'

const routes = Router()

const upload = multer(multerConfig)

routes.get('/horarios', HorariosController.listarHorarios)
routes.get('/generos', GenerosController.listarGeneros)
routes.get('/cidades', CidadesController.listarCidades)
routes.get('/procedimentos', ProcedimentosController.listarProcedimentos)

// ROTAS PARA CLIENTE
routes.post('/login',
  ClienteController.autenticar
)

routes.post('/refresh_token',
  ClienteController.refreshToken
)

routes.post('/cadastro',
  upload.single('foto'),
  ClienteValidation.cadastrar,
  ClienteController.cadastrar
)

routes.put('/atualizar_dados_pessoais/:id',
  authMiddleware,
  ClienteValidation.atualizarDadosPessoais,
  ClienteController.atualizarDadosPessoais
)

routes.put('/atualizar_endereco/:id',
  authMiddleware,
  ClienteValidation.atualizarEndereço,
  ClienteController.atualizarEndereço
)

routes.put('/atualizar_login/:id',
  authMiddleware,
  ClienteValidation.atualizarLogin,
  ClienteController.atualizarLogin
)

routes.post('/atualizar_foto/:id',
  upload.single('foto'),
  authMidlewareWithFile,
  ClienteController.atualizarFoto
)

routes.post('/esqueci_minha_senha/',
  ClienteValidation.esqueciMinhaSenha,
  ClienteController.esqueciMinhaSenha
)

routes.put('/atualizar_senha/',
  ClienteValidation.atualizarSenha,
  ClienteController.atualizarSenha
)

routes.delete('/deletar/:id',
  authMiddleware,
  ClienteController.deletar
)

// AGENDAMENTOS PARA O CLIENTE
routes.get('/agendamentos_disponiveis',
  authMiddleware,
  AgendamentoController.listarHorariosDisponiveis
)

routes.get('/meus_agendamentos/:cliente_id',
  authMiddleware,
  AgendamentoController.listarAgendamentosDoCliente
)

routes.get('/detalhes_do_agendamento/:id/:agendamento_id',
  authMiddleware,
  AgendamentoController.detalhesDoAgendamento
)

routes.post('/agendar/:id',
  authMiddleware,
  AgendamentoValidation.agendar,
  AgendamentoController.agendar
)

routes.put('/remarcar/:id/:cliente_id',
  authMiddleware,
  AgendamentoValidation.remarcar,
  AgendamentoController.remarcar
)

routes.put('/alterar_procedimento/:agendamento_id',
  authMiddleware,
  AgendamentoValidation.alterarProcedimento,
  AgendamentoController.alterarProcedimento
)

routes.delete('/cancelar/:id',
  authMiddleware,
  AgendamentoController.cancelar
)

export default routes
