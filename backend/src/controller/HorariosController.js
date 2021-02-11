const connection = require('../database/connection');

module.exports = {
  async listarHorarios(request, response, next) {
      const horarios = await connection('horarios').select('*');

      return response.send(horarios)
  },
}