import { Request, Response, NextFunction } from 'express';
import connection from '../database/connection';

export default {
  async listarHorariosDisponiveis(request: Request, response: Response, next: NextFunction) {
    try {
      const { data } = request.query;

      const horariosDisponiveis = await connection('agendamentos')
      .from('horarios')
      .where({ data })
      .join('agendamentos', 'horarios.id', 'agendamentos.horario_id')
      .select(
        'agendamentos.id',
        'data',
        'horario',
        'situacao'
      );

      return response.json(horariosDisponiveis);

    } catch (erro) {
      return response.status(400).json({ erro: 'Erro ao listar agendamentos disponíveis.' });
    }
  },

  async listarAgendamentosDoCliente(request: Request, response: Response, next: NextFunction) {
    try {
      const { page = 1 } = request.query;

      const { cliente_id } = request.params
      
      const agendamento = connection('agendamentos')
      .limit(5)
      .offset((Number(page) - 1) * 5);
      
      const countObjeto = connection('agendamentos').count();
      
      if (cliente_id) {
        agendamento.where({ cliente_id })
        .join('horarios', 'horarios.id', '=', 'agendamentos.horario_id')
        .join(
          'agendamentos_procedimentos', 
          'agendamentos.id', 
          '=', 
          'agendamentos_procedimentos.agendamento_id'
        ).join(
          'procedimentos', 
          'procedimentos.id', 
          '=', 
          'agendamentos_procedimentos.procedimento_id'
        )
        .select(
          'agendamentos.id',
          'agendamentos.data',
          'procedimentos.procedimento',
          'procedimentos.preco',
          'horarios.horario',
          'agendamentos.agendado_em',
          'agendamentos.remarcado_em'
        );
      };
      
      const [count] = await countObjeto;
      
      response.header('X-Total-Count', String(count['count(*)']));

      const agendadamentosDoCliente = await agendamento;

      return response.json(agendadamentosDoCliente);

    } catch (erro) {
      return response.status(400).json({ erro: 'Falha ao listar agendamento!' });
    }
  },

  async agendar(request: Request, response: Response, next: NextFunction) {
    try {
      const { data, procedimento_id, horario_id} = request.body;

      const { id } = request.params;

      const ocupado = 'ocupado';

      const transaction = await connection.transaction();
      
      const horarioDisponivel = await transaction('agendamentos')
      .where({ horario_id, data })
      .select('horario_id')
      .first()

      if (horarioDisponivel)
        return response.status(400).json({ 
          mensagem: 'Horário indisponível,agende para outro dia/horário.' 
        });

      const dataEhoraDeAgora = new Date();

      const agendamento = {
        data, 
        situacao: ocupado, 
        cliente_id: id, 
        horario_id,
        agendado_em: dataEhoraDeAgora,
      }

      const idInserido = await transaction('agendamentos')
      .where('id', id)
      .insert(agendamento);

      const agendamento_id = idInserido[0];

      const agendamentosProcedimentos = procedimento_id.map((procedimento_id: number) => {
        return {
          agendamento_id,
          procedimento_id
        }
      });

      await transaction('agendamentos_procedimentos').insert(agendamentosProcedimentos);

      await transaction.commit();

      return response.status(201).json({ mensagem: 'Atendimento agendado com sucesso!' });

    } catch (erro) {
      console.log(erro)
      return response.status(400).json({ erro: 'Falha ao agendar!' });
    }
  },

  async remarcar(request: Request, response: Response, next: NextFunction) {
    try {
      const dataEhoraDeAgora = new Date();
  
      const { data, horario_id} = request.body;

      const { id, cliente_id } = request.params;

      const horarioDisponivel = await connection('agendamentos')
      .where({ horario_id, data })
      .select('horario_id')
      .first()

      if(horarioDisponivel)
        return response.status(400).json({ 
          mensagem: 'Horário indisponível,agende para outro dia/horário.' 
        });
        
      await connection('agendamentos')
      .update({
        data, horario_id, remarcado_em: dataEhoraDeAgora
      })
      .where('id', id).andWhere('cliente_id', cliente_id);

      return response.status(201).json({ mensagem: 'Atendimento remarcado com sucesso.' });

    } catch (erro) {
      return response.status(400).json({ erro: 'Falha ao remarcar agendamento.' });
    }
  },

  async alterarProcedimento(request: Request, response: Response, next: NextFunction) {
    try {
      const { procedimento_id } = request.body;

      const { agendamento_id } = request.params;

      const procedimentos = procedimento_id.map((procedimento_id: number) => {
        return {
          agendamento_id,
          procedimento_id
        }
      });

      const transaction = await connection.transaction();

      await transaction('agendamentos_procedimentos')
      .where({ agendamento_id })
      .delete();

      const dataEhoraDeAgora = new Date();

      await transaction('agendamentos_procedimentos').insert(procedimentos);

      await transaction('agendamentos_procedimentos').update({
        procedimento_alterado_em: dataEhoraDeAgora
      });

      transaction.commit();

      return response.status(201).json(procedimentos);

    } catch (erro) {
      console.log(erro)
      return response.status(400).json({ erro: 'Falha em alterar o procedimento.' });
    }
  },

  async cancelar(request: Request, response: Response, next: NextFunction) { 
    try {
      const { id } = request.params;
      await connection('agendamentos').where({ id }).del();

      return response.status(204).json();

    } catch (erro) {
      return response.status(400).json({ erro: 'Falha ao cancelar agendamento.' });
    }
  }
}