const connection = require('../database/connection');

module.exports = {
  async listarCidades(request, response, next) {
      const cidades = await connection('cidades').select('*');

      return response.send(cidades)
  },
}