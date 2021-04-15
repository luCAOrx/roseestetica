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

  it('deve ser capaz de vizualizar horários disponíveis', async () => {
    const response = await request(app)
      .get('/agendamentos_disponiveis?data=20210414')
      .set('Authorization' ,`Bearer ${gerarToken()}`);

      expect(response.status).toBe(200);

      console.log(response.body);
  });

  it('deve ser capaz de vizualizar seu histórico de agendamentos', async () => {
    const response = await request(app)
      .get('/meus_agendamentos/2/?page=1')
      .set('Authorization' ,`Bearer ${gerarToken()}`);

      expect(response.status).toBe(200);

      console.log(response.body);
  });
});