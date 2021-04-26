import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('imagens', table => {
    table.increments('id').primary();

    table.string('chave_da_imagem').notNullable();
    table.integer('cliente_id').unsigned().notNullable();
    table.timestamp('criado_em').nullable().defaultTo(null);
    table.timestamp('atualizado_em').nullable().defaultTo(null);

    table.foreign('cliente_id').references('id').inTable('clientes').onDelete('CASCADE');
  });
};

export async function down(knex: Knex) {
  return knex.schema.dropTable('imagens');
};