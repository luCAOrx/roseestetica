"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return await knex.schema.createTable('clientes', table => {
        table.increments('id').primary();
        table.string('nome', 90).notNullable();
        table.string('cpf', 11).notNullable().unique();
        table.integer('sexo_id').unsigned().notNullable();
        table.string('telefone', 10);
        table.string('celular', 11).notNullable();
        table.integer('cidade_id').unsigned().notNullable();
        table.string('bairro', 90).notNullable();
        table.string('logradouro', 90).notNullable();
        table.string('numero', 6).notNullable();
        table.string('complemento', 90);
        table.string('cep', 8).notNullable();
        table.string('email', 80).notNullable().unique();
        table.string('senha').notNullable();
        table.string('token_reset_senha');
        table.timestamp('expiracao_reset_senha').nullable().defaultTo(null);
        table.timestamp('criado_em').nullable().defaultTo(null);
        table.timestamp('atualizado_em').nullable().defaultTo(null);
        table.foreign('sexo_id').references('id').inTable('sexos');
        table.foreign('cidade_id').references('id').inTable('cidades');
    });
}
exports.up = up;
async function down(knex) {
    return await knex.schema.dropTable('clientes');
}
exports.down = down;
