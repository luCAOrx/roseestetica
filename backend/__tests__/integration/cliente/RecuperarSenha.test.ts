import request from 'supertest';
import app from '../../../src/app';
import connection from '../../../src/database/connection';

describe('O cliente', () => {
  afterAll(async () => {
    await connection.destroy();
  });

  it('deve inserir o token que foi enviado para seu e-mail para recuperar sua senha', async () => {
    const response = await request(app)
      .put('/atualizar_senha')
      .send({ 
        email: "rafaela@gmail.com",
        token: "00ee8deaff4caf497813267910efbb68c86ab12c",
        senha: "123456789"
      });

      console.log(response.body);

      expect(response.status).toBe(201);
  });
});