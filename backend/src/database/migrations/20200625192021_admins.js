exports.up = function(knex) {
  return knex.schema.createTable('admins', function(table) {
    table.increments('id');

    table.string('email').notNullable().unique();
    table.string('senha').notNullable();
    table.string('token_reset_senha');
    table.timestamp('expiracao_reset_senha').defaultTo(knex.fn.now());
    table.timestamp('criado_em').defaultTo(knex.fn.now());
    table.timestamp('atualizado_em').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('admins');
};
