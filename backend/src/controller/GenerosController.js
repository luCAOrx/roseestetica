const connection = require('../database/connection');

module.exports = {
  async listarGeneros(request, response, next) {
      const generos = await connection('sexos').select('*');

      return response.send(generos)
  },
}