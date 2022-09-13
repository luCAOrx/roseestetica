"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return await knex.schema.createTable('procedimentos', table => {
        table.increments('id').primary();
        table.string('procedimento').notNullable();
        table.string('preco').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return await knex.schema.dropTable('procedimentos');
}
exports.down = down;
