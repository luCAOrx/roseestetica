import request from 'supertest';
import app from '../../../src/app';
import connection from '../../../src/database/connection';

describe('O cliente', () => {
  afterAll(async () => {
    await connection.destroy();
  });

  it('deve ser capaz de se autenticar se as credencias forem validas', async () => {
    const response = await request(app).post('/login').send({
      email: "rafaela2@gmail.com",
      senha: "12345678"
    });

    console.log(response.body);

    expect(response.status).toBe(200);
  });
});