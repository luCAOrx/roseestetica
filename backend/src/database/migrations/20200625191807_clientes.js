exports.up = function(knex) {
  return knex.schema.createTable('clientes', function(table) {
    table.increments('id');

    table.string('nome').notNullable();
    table.string('cpf').notNullable().unique();
    table.integer('sexo_id').unsigned().notNullable();
    table.string('telefone');
    table.string('celular').notNullable();
    table.integer('cidade_id').unsigned().notNullable();
    table.string('bairro').notNullable();
    table.string('logradouro').notNullable();
    table.string('numero').notNullable();
    table.string('complemento');
    table.string('cep').notNullable();
    table.string('email').notNullable().unique();
    table.string('senha').notNullable();
    table.string('token_reset_senha');
    table.timestamp('expiracao_reset_senha').defaultTo(knex.fn.now());
    table.timestamp('criado_em').defaultTo(knex.fn.now());
    table.timestamp('atualizado_em').defaultTo(knex.fn.now());

    table.foreign('sexo_id').references('id').inTable('sexos');
    table.foreign('cidade_id').references('id').inTable('cidades');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('clientes');
};
