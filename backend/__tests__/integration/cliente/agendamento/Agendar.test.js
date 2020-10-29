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

  it('deve ser capaz de se agendar', async () => {
    const response = await request(app)
      .post('/agendar/2')
      .send({
        data: 20200723,
        procedimento_id: 2,
        horario_id: 3
      })
      .set('Authorization' ,`Bearer ${gerarToken()}`);

      console.log(response.body);

      expect(response.status).toBe(201);
  });
});