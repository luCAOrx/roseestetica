exports.up = function(knex) {
  return knex.schema.createTable('cidades', function(table) {
    table.increments('id');
    
    table.string('cidade').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cidades');
};
