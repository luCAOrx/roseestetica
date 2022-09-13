"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return await knex.schema.createTable('horarios', table => {
        table.increments('id').primary();
        table.string('horario').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return await knex.schema.dropTable('horarios');
}
exports.down = down;
