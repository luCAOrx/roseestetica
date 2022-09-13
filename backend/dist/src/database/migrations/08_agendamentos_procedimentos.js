"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return await knex.schema.createTable('agendamentos_procedimentos', table => {
        table.increments('id').primary();
        table.integer('agendamento_id').unsigned().notNullable();
        table.integer('procedimento_id').unsigned().notNullable();
        table.timestamp('procedimento_alterado_em').nullable().defaultTo(null);
        table.foreign('agendamento_id')
            .references('id')
            .inTable('agendamentos')
            .onDelete('CASCADE');
        table.foreign('procedimento_id')
            .references('id')
            .inTable('procedimentos');
    });
}
exports.up = up;
async function down(knex) {
    return await knex.schema.dropTable('agendamentos_procedimentos');
}
exports.down = down;
