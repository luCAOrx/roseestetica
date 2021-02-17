
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('procedimentos').del()
    .then(function () {
      // Inserts seed entries
      return knex('procedimentos').insert([
        { procedimento: 'Limpeza', preco: '35' },
        { procedimento: 'Tratamento', preco: '45' },
        { procedimento: 'Limpeza e Tratamento', preco: '60' }
      ]);
    });
};
