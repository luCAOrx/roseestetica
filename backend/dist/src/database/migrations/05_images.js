"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return await knex.schema.createTable('imagens', table => {
        table.increments('id').primary();
        table.string('imagem').notNullable();
        table.string('imagem_aws_url').notNullable();
        table.integer('cliente_id').unsigned().notNullable();
        table.timestamp('criado_em').nullable().defaultTo(null);
        table.timestamp('atualizado_em').nullable().defaultTo(null);
        table.foreign('cliente_id')
            .references('id')
            .inTable('clientes')
            .onDelete('CASCADE');
    });
}
exports.up = up;
async function down(knex) {
    return await knex.schema.dropTable('imagens');
}
exports.down = down;
