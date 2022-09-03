import { Knex } from 'knex'

export async function up(knex: Knex) {
  return await knex.schema.createTable('sexos', table => {
    table.increments('id').primary()

    table.string('sexo').notNullable()
  })
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('sexos')
}
