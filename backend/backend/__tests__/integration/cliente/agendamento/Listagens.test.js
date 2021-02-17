const request = require('supertest');
const app = require('../../../../src/app');
const connection = require('../../../../src/database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../../../src/config/auth.json');

function gerarToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

describe('O cliente', () => {
  afterAll(async () => {
    await connection.destroy();
  });

  it('deve ser capaz de vizualizar horários disponíveis', async () => {
    const response = await request(app)
      .get('/agendamentos_disponiveis?data=20200723')
      .set('Authorization' ,`Bearer ${gerarToken()}`);

      console.log(response.body);

      expect(response.status).toBe(200);
  });

  it('deve ser capaz de vizualizar seu histórico de agendamentos', async () => {
    const response = await request(app)
      .get('/meus_agendamentos/?page=1&cliente_id=2')
      .set('Authorization' ,`Bearer ${gerarToken()}`);

      console.log(response.body);

      expect(response.status).toBe(200);
  });
});