import request from 'supertest';
import app from '../../../src/app';
import connection from '../../../src/database/connection';
import jwt from 'jsonwebtoken';
import authConfig from '../../../src/config/auth';

function gerarToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

describe('O cliente', () => {
  afterAll(async () => {
    await connection.destroy();
  });

  it('deve deletar sua conta', async () => {
    const response = await request(app).delete('/deletar/2')
    .set('Authorization' ,`Bearer ${gerarToken()}`);

    console.log(response.body);

    expect(response.status).toBe(204);
  });
});