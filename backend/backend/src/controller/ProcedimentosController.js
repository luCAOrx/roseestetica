const connection = require('../database/connection');

module.exports = {
  async listarProcedimentos(request, response, next) {
      const procedimentos = await connection('procedimentos').select('*');

      return response.send(procedimentos)
  },
}