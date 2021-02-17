const request = require('supertest');
const app = require('../../../src/app');
const connection = require('../../../src/database/connection');

describe('O cliente', () => {
  afterAll(async () => {
    await connection.destroy();
  });

  it('deve inserir o token que foi enviado para seu e-mail para recuperar sua senha', async () => {
    const response = await request(app)
      .put('/atualizar_senha')
      .send({ 
        email: "rafaela1@gmail.com",
        token: "49d93390697ee13d3429907285a1784c08fb7c9d",
        senha: "rafaela1"
      });

      console.log(response.body);

      expect(response.status).toBe(201);
  });
});