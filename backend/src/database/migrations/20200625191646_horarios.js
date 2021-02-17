exports.up = function(knex) {
  return knex.schema.createTable('horarios', function(table) {
    table.increments('id');
    
    table.time('horario').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('horarios');
};
