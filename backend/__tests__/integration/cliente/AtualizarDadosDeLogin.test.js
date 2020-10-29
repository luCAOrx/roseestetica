const request = require('supertest');
const app = require('../../../src/app');
const connection = require('../../../src/database/connection');
const jwt = require('jsonwebtoken');
const authConfig = require('../../../src/config/auth.json');

function gerarToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

describe('O cliente', () => {
  afterAll(async () => {
    await connection.destroy();
  });

  it('deve ser capaz de atualizar seus dados de login', async () => {
    const response = await request(app)
      .put('/atualizar_login/2')
      .set('Authorization' ,`Bearer ${gerarToken()}`)
      .send({ email: "rafaela1@gmail.com" });

      console.log(response.body);

      expect(response.status).toBe(201);
  });
});