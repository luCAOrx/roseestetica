"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return await knex.schema.createTable('refresh_token', table => {
        table.string('id').primary();
        table.integer('espira_em').notNullable();
        table.integer('cliente_id').unsigned().notNullable();
        table.foreign('cliente_id')
            .references('id')
            .inTable('clientes')
            .onDelete('CASCADE');
    });
}
exports.up = up;
async function down(knex) {
    return await knex.schema.dropTable('refresh_token');
}
exports.down = down;
