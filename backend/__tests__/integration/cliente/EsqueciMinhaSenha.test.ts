import request from 'supertest';
import app from '../../../src/app';
import connection from '../../../src/database/connection';

describe('O cliente', () => {
  afterAll(async () => {
    await connection.destroy();
  });

  it('deve enviar um e-mail para receber um token e recuperar sua senha', async () => {
    const response = await request(app)
      .post('/esqueci_minha_senha')
      .send({ email: "rafaela@gmail.com" });

      console.log(response.body);

      expect(response.status).toBe(200);
  });
});