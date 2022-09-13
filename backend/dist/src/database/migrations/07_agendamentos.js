"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return await knex.schema.createTable('agendamentos', table => {
        table.increments('id').primary();
        table.date('data').notNullable();
        table.string('situacao').notNullable();
        table.timestamp('agendado_em').nullable().defaultTo(null);
        table.timestamp('remarcado_em').nullable().defaultTo(null);
        table.integer('horario_id').unsigned().notNullable();
        table.integer('cliente_id').unsigned().notNullable();
        table.foreign('horario_id')
            .references('id')
            .inTable('horarios');
        table.foreign('cliente_id')
            .references('id')
            .inTable('clientes')
            .onDelete('CASCADE');
    });
}
exports.up = up;
async function down(knex) {
    return await knex.schema.dropTable('agendamentos');
}
exports.down = down;
