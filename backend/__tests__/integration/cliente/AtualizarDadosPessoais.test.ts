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

  it('deve ser capaz de atualizar seus dados pessoais', async () => {
    const response = await request(app)
      .put('/atualizar_dados_pessoais/2')
      .set('Authorization' ,`Bearer ${gerarToken()}`)
      .send({
        nome: "Rafaela Santos",
        telefone: "8434345050",
        celular: "84955443323",
        cidade_id: 2,
        bairro: "Candelária",
        logradouro: "Av das bandeiras",
        numero: "145",
        complemento: "Bloco Moinhos de Vento, Apt 120",
        cep: "48123769"
      });

      console.log(response.body);

      expect(response.status).toBe(201);
  });
});