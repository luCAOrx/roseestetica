"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return await knex.schema.createTable('sexos', table => {
        table.increments('id').primary();
        table.string('sexo').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return await knex.schema.dropTable('sexos');
}
exports.down = down;
