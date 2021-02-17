exports.up = function(knex) {
  return knex.schema.createTable('procedimentos', function (table) {
    table.increments('id');
    
    table.string('procedimento').notNullable();
    table.decimal('preco').notNullable();
  });  
};

exports.down = function(knex) {
  return knex.schema.dropTable('procedimentos');
};