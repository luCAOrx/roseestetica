import { Knex } from 'knex'

export async function up(knex: Knex) {
  return await knex.schema.createTable('cidades', table => {
    table.increments('id').primary()

    table.string('cidade').notNullable()
  })
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('cidades')
}
