const connection = require('../database/connection');

module.exports = {
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

  async listarAgendamentosDoCliente(request, response, next) {
    try {
      const { cliente_id, page = 1 } = request.query;
      
      const agendamento = connection('agendamentos')
      .limit(5)
      .offset((page - 1) * 5)
      
      const countObjeto = connection('agendamentos').count();
      
      if(cliente_id){
        agendamento
        .where({ cliente_id })
        .join('procedimentos', 'procedimentos.id', '=', 'agendamentos.procedimento_id')
        .join('horarios', 'horarios.id', '=', 'agendamentos.horario_id')
        .select([
          'agendamentos.id',
          'agendamentos.data',
          'horarios.horario',
          'procedimentos.procedimento',
          'procedimentos.preco',
          'agendamentos.agendado_em'
        ])
        
        countObjeto
        .where({ cliente_id })
      };
      
      const [count] = await countObjeto;
      response.header('X-Total-Count', count['count(*)']);

      const resultado = await agendamento;

      return response.send(resultado);

    } catch (erro) {
      next(response.status(400).send({ erro: 'Falha ao listar agendamento!' }));
    }
  },

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
      next(response.status(400).send({ erro: 'Falha ao agendar!' }));
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
      next(response.status(400).send({ erro: 'Falha ao remarcar agendamento.' }));
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
      next(response.status(400).send({ erro: 'Falha ao remarcar agendamento.' }));
    }
  },

  async cancelar(request, response, next) {
    const { id } = request.params;

    try {
      await connection('agendamentos').where('id', id).del();

      return response.status(204).send();

    } catch (erro) {
      next(response.status(400).send({ erro: 'Falha ao cancelar agendamento.' }));
    }
  }
}