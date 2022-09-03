import { Knex } from 'knex'

export async function up(knex: Knex) {
  return await knex.schema.createTable('horarios', table => {
    table.increments('id').primary()

    table.string('horario').notNullable()
  })
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable('horarios')
}
