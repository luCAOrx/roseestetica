const request = require('supertest');
const app = require('../../../src/app');
const connection = require('../../../src/database/connection');

describe('O cliente', () => {
  afterAll(async () => {
    await connection.destroy();
  });

  it('deve ser capaz de se autenticar se as credencias forem validas', async () => {
    const response = await request(app).post('/login').send({
      email: "rafaela1@gmail.com",
      senha: "rafaela1"
    });

    console.log(response.body);

    expect(response.status).toBe(200);
  });
});