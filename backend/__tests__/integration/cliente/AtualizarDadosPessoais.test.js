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

  it('deve ser capaz de atualizar seus dados pessoais', async () => {
    const response = await request(app)
      .put('/atualizar_dados_pessoais/2')
      .set('Authorization' ,`Bearer ${gerarToken()}`)
      .send({
        nome: "Rafaela Santos",
        telefone: "8434345050",
        celular: "84955443323",
        cidade_id: 1,
        bairro: "Candelária",
        logradouro: "Av.das bandeiras",
        numero: "145",
        complemento: "Bloco Moinhos de Vento, Apt 120",
        cep: "48123769"
      });

      console.log(response.body);

      expect(response.status).toBe(201);
  });
});