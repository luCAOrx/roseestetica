import request from 'supertest';
import app from '../../../../src/app';
import connection from '../../../../src/database/connection';
import jwt from 'jsonwebtoken';
import authConfig from '../../../../src/config/auth';

function gerarToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

describe('O cliente', () => {
  afterAll(async () => {
    await connection.destroy();
  });

  it('deve ser capaz de remarcar seu agendamento', async () => {
    const response = await request(app)
      .put('/remarcar/5/5')
      .send({
        data: 20210414,
        horario_id: 1
      })
      .set('Authorization' ,`Bearer ${gerarToken()}`);

      console.log(response.body);

      expect(response.status).toBe(201);
  });
});