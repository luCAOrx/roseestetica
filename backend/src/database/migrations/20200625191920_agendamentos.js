exports.up = function(knex) {
  return knex.schema.createTable('agendamentos', function(table) {
    table.increments('id');

    table.date('data').notNullable();
    table.string('situacao').notNullable();
    table.timestamp('agendado_em').defaultTo(knex.fn.now());
    table.timestamp('remarcado_em').defaultTo(knex.fn.now());

    table.integer('procedimento_id').unsigned().notNullable();
    table.integer('horario_id').unsigned().notNullable();
    table.integer('cliente_id').unsigned().notNullable();

    table.foreign('procedimento_id').references('id').inTable('procedimentos');
    table.foreign('horario_id').references('id').inTable('horarios');
    table.foreign('cliente_id').onDelete('CASCADE').references('id').inTable('clientes');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('agendamentos');
};
