exports.up = function(knex) {
  return knex.schema.createTable('sexos', function (table) {
    table.increments('id');
    
    table.string('sexo').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sexos');
};