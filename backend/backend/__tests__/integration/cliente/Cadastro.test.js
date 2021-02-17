const request = require('supertest');
const app = require('../../../src/app');
const connection = require('../../../src/database/connection');

describe('O cliente', () => {
  // beforeAll(async () => {
  //   await connection.migrate.rollback();
  //   await connection.migrate.latest();
  //   await connection.seed.run();
  // });

  afterAll(async () => {
    await connection.destroy();
  });

  it('deve ser capaz de se cadastrar', async () => {
    const response = await request(app)
      .post('/cadastro')
      .send({
        nome: "Rafaela Santos",
        cpf: "30070060001",
        sexo_id: 2,
        telefone: "8434345050",
        celular: "84955443323",
        cidade_id: 1,
        bairro: "Capim macio",
        logradouro: "Rua amarelinha",
        numero: "66",
        complemento: "Bloco A, Apt 40",
        cep: "24456345",
        email: "rafaela@gmail.com",
        senha: "rafaela"
      });

      console.log(response.body);

      expect(response.status).toBe(201);
  });

  it('deve ser capaz de se autenticar depois de se cadastrar', async () => {
    const response = await request(app).post('/login').send({
      email: "rafaela@gmail.com",
      senha: "rafaela"
    });

    console.log(response.body);

    expect(response.status).toBe(200);
  });
});